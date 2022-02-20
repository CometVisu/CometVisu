/**
 * Generates a list of items. A &lt;template&gt;-element defines the content of the list-items and a model is used to
 * generate those items and apply the models content to the list-items.
 * It allows custom Javascript code in a &lt;script&gt;-Element to fill the model.
 * The model can be refreshed in a time defined interval, which is set by the 'refresh' attribute.
 *
 * @widgetexample <settings>
 *    <caption>Example list</caption>
 *    <screenshot name="list_simple"/>
 *  </settings>
    <cv-list refresh="10">
      <script><![CDATA[
       for (let i = 0; i < Math.round(Math.random()*10); i++) {
         model.push({
           label: 'This is list item no ' + i,
           subLabel: 'Sublabel number ' + i
         })
       }
       ]]>
       </script>
       <template>
         <li>
           <label class="primary">${label}</label>
           <label class="secondary">${subLabel}</label>
         </li>
       </template>
   </cv-list>
 */
qx.Class.define('cv.ui.structure.tile.components.List', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [cv.ui.structure.tile.MVisibility],

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
    __lastRefresh: null,
    _filterModel: null,
    _sortModel: null,

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
      const script = model.querySelector(':scope > script');
      const readAddresses = model.querySelectorAll('cv-address:not([mode="write"])');
      if (script) {
        this._getModel = new Function('"use strict";const model = []; ' + script.innerText.trim()+ '; return model');
        this._model = this._getModel();
      } else if (readAddresses.length > 0) {
        // model has an address that triggers a refresh on update, so we just have to read the model from the updated value
        this._getModel = this.getValue;
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
        refreshOnUpdate = true;
      } else {
        this.error('cv-list > model must have at least one read address or a script that fills the model.');
        return;
      }
      if (!refreshOnUpdate) {
        if (this.isVisible()) {
          // only load when visible
          this.refresh();
        }
        if (element.hasAttribute('refresh')) {
          const interval = parseInt(element.getAttribute('refresh'));
          if (!isNaN(interval) && interval > 0) {
            this._timer = new qx.event.Timer(interval * 1000);
            this._timer.addListener('interval', this.refresh, this);
            if (this.isVisible()) {
              // when there is no offsetParent this item is not visible
              this._timer.start();
            }
          } else {
            this.error('invalid refresh value', interval);
          }
        }
      }
    },

    _applyValue() {
      // reset last refresh, because with new data its obsolete
      this.__lastRefresh = 0;
      this.refresh();
    },

    _applyVisible(isVisible) {
      this.debug('list visibility changed to', isVisible);
      if (isVisible) {
        if (this._timer) {
          this._timer.start();
          if (!this.__lastRefresh || (Date.now() - this.__lastRefresh) >= this._timer.getInterval()) {
            // last execution time too old, refresh now
            this.refresh();
          }
        } else if (!this.__lastRefresh) {
          // refresh once when the item becomes visible
          this.refresh();
        }
      } else if (this._timer) {
        this._timer.stop();
      }
    },

    refresh() {
      const element = this._element;
      const template = element.querySelector(':scope > template:not([when])');
      let newModel = [];
      if (typeof this._getModel === 'function') {
        newModel = this._getModel();
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
          itemTemplate.innerHTML = template.innerHTML.replaceAll(/\${(.+)}/g, (match, p1) => {
            if (Object.prototype.hasOwnProperty.call(entry, p1)) {
              return entry[p1];
            }
            return '';
          });
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
      this.__lastRefresh = Date.now();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('_timer');
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
