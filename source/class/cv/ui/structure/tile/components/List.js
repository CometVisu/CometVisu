/**
 * Generates a list of items. A &lt;template&gt;-element defines the content of the list-items and a model is used to
 * generate those items and apply the models content to the list-items.
 * It allows custom Javascript code in a &lt;script&gt;-Element to fill the model or address-Elements as model source.
 * The model can be refreshed in a time defined interval, which is set by the 'refresh' attribute.
 *
 * @widgetexample <settings>
 *    <caption>Example list</caption>
 *    <screenshot name="list_simple"/>
 *  </settings>
    <cv-list refresh="10">
      <model>
        <script><![CDATA[
         for (let i = 0; i < Math.round(Math.random()*10); i++) {
           model.push({
             label: 'This is list item no ' + i,
             subLabel: 'Sublabel number ' + i
           })
         }
         ]]>
         </script>
       </model>
       <template>
         <li>
           <label class="primary">${label}</label>
           <label class="secondary">${subLabel}</label>
         </li>
       </template>
       <template when="empty">
         <li>
           <label class="primary">Model is empty!</label>
         </li>
       </template>
   </cv-list>
 * @ignore(fetch, proxyFetch)
 */
qx.Class.define('cv.ui.structure.tile.components.List', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    value: {
      refine: true,
      init: []
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _target: null,
    _timer: null,
    _model: null,
    _getModel: null,
    _filterModel: null,
    _sortModel: null,
    _limit: null,

    _init() {
      const element = this._element;
      this._model = [];
      let refreshOnUpdate = false;
      const model = element.querySelector('model');
      if (!model) {
        this.error('cv-list needs a model');
        return;
      }
      if (model.hasAttribute('filter')) {
        this._filterModel = new Function('item', 'index', '"use strict"; return ' + model.getAttribute('filter'));
      }
      if (model.hasAttribute('limit')) {
        this._limit = parseInt(model.getAttribute('limit'));
      }
      const readAddresses = model.querySelectorAll(':scope > cv-address:not([mode="write"])');
      if (model.hasAttribute('sort-by')) {
        const sortBy = model.getAttribute('sort-by');
        // reverse order in 'desc' sort mode
        const sortModifier = model.getAttribute('sort-mode') === 'desc' ? -1 : 1;
        this._sortModel = (left, right) => {
          const leftVal = left[sortBy];
          const rightVal = right[sortBy];
          if (leftVal === rightVal) {
            return 0;
          } else if (typeof leftVal === typeof rightVal) {
            switch (typeof leftVal) {
              case 'number':
                return (leftVal - rightVal) * sortModifier;

              case 'boolean':
                return (leftVal ? -1 : 1) * sortModifier;

              case 'string':
                return leftVal.localeCompare(rightVal) * sortModifier;

              default:
                return JSON.stringify(leftVal).localeCompare(JSON.stringify(rightVal)) * sortModifier;
            }
          } else if (leftVal === undefined || leftVal === null) {
            return 1 * sortModifier;
          } else if (rightVal === undefined || rightVal === null) {
            return -1 * sortModifier;
          }
          return 0;
        };
      }
      if (model.hasAttribute('src')) {
        // fetch from url
        this._getModel = async () => {
          // eslint-disable-next-line no-undef
          const f = model.getAttribute('proxy') === 'true' ? proxyFetch : fetch;
          const res = await f(model.getAttribute('src'));
          return res.ok ? res.json() : [];
        };
      } else {
        const script = model.querySelector(':scope > script');
        const data = model.querySelectorAll(':scope > cv-data');
        if (script) {
          this._getModel = new Function('"use strict";let model = []; ' + script.innerText.trim() + '; return model');
          this._model = this._getModel();
        } else if (readAddresses.length > 0) {
          // model has an address that triggers a refresh on update, so we just have to read the model from the updated value
          this._getModel = this.getValue;
          refreshOnUpdate = true;
        } else if (data.length > 0) {
          this._model = [];
          this._getModel = () => this._model;
          data.forEach((elem, i) => {
            const d = {
              index: i
            };
            for (const a of elem.attributes) {
              d[a.name] = a.value;
            }
            this._model.push(d);
          });
        } else {
          this.error('cv-list > model must have at least one read address, src-attribute, cv-data child or a script that fills the model.');
          return;
        }
      }
      if (readAddresses.length > 0) {
        element.addEventListener('stateUpdate', ev => this.onStateUpdate(ev));
      }
      if (!refreshOnUpdate) {
        if (this.isVisible()) {
          // only load when visible
          this.refresh();
        }
        if (element.hasAttribute('refresh')) {
          this.setRefresh(parseInt(element.getAttribute('refresh')));
        }
      }
    },

    onStateUpdate(ev) {
      if (ev.detail.target === 'refresh') {
        if (this.isVisible()) {
          // only load when visible
          this.refresh();
        } else {
          // reset lastRefresh to that the refresh get called when this item gets visible
          this._lastRefresh = null;
        }
      } else {
        this.base(arguments, ev);
      }
      // cancel event here
      ev.stopPropagation();
    },

    _applyValue() {
      // reset last refresh, because with new data its obsolete
      this._lastRefresh = 0;
      this.refresh();
    },

    async refresh() {
      const element = this._element;
      const template = element.querySelector(':scope > template:not([when])');
      let newModel = [];
      if (typeof this._getModel === 'function') {
        newModel = this._getModel();
      }
      if (newModel instanceof Promise) {
        newModel = await newModel;
      }
      let target = element.querySelector(':scope > ul');
      if (!target) {
        target = document.createElement('ul');
        target.classList.add('content');
        element.appendChild(target);
      }
      this.debug('refreshing with new model length', newModel.length);
      if (Array.isArray(newModel) || newModel instanceof qx.data.Array) {
        if (typeof this._filterModel === 'function') {
          newModel = newModel.filter(this._filterModel);
        }
        if (typeof this._sortModel === 'function') {
          newModel.sort(this._sortModel);
        }
        if (this._limit) {
          newModel = newModel.slice(0, this._limit);
        }
        if (newModel.length === 0) {
          const whenEmptyTemplate = element.querySelector(':scope > template[when="empty"]');
          if (whenEmptyTemplate && !target.querySelector(':scope > .empty-model')) {
            while (target.firstChild) {
              target.removeChild(target.lastChild);
            }
            const emptyModel = whenEmptyTemplate.content.firstElementChild.cloneNode(true);
            emptyModel.classList.add('empty-model');
            target.appendChild(emptyModel);
            return;
          }
        } else {
          const emptyElem = target.querySelector(':scope > .empty-model');
          if (emptyElem) {
            emptyElem.remove();
          }
        }
        const itemTemplate = document.createElement('template');
        // remove entries we do not need anymore
        for (let i = newModel.length; i < this._model.length; i++) {
          const elem = target.querySelector(`:scope > [data-row="${i}"]`);
          if (elem) {
            elem.remove();
          }
        }

        newModel.forEach((entry, i) => {
          const elem = target.querySelector(`:scope > [data-row="${i}"]`);
          const html = template.innerHTML.replaceAll(/\${([^}\[]+)\[?(\d+)?\]?}/g, (match, p1, p2) => {
            if (Object.prototype.hasOwnProperty.call(entry, p1)) {
              let val = entry[p1];
              if (p2 && Array.isArray(val)) {
                return val[parseInt(p2)];
              }
              return val;
            } else if (p1 === 'index') {
              return '' + i;
            }
            return '';
          });
          itemTemplate.innerHTML = html;
          if (elem) {
            // update existing
            elem.innerHTML = itemTemplate.content.firstElementChild.innerHTML;
            elem.setAttribute('data-row', ''+i);
          } else {
            // append new child
            itemTemplate.content.firstElementChild.setAttribute('data-row', ''+i);
            target.appendChild(itemTemplate.content.cloneNode(true));
          }
        });
        this._model = newModel;
      } else {
        this.error('model must be an array', newModel);
      }
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
