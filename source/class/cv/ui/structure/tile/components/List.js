/* List.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

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
    _modelInstance: null,

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

      // if we have top level write addresses, we need to listen to sendState Events from the list items
      for (let address of element.querySelectorAll(':scope > cv-address')) {
        if (address.getAttribute('mode') !== 'read') {
          element.addEventListener('sendState', ev => {
            // forward event copy (dispatching the same is not possible) to all write addresses
            const evCopy = new CustomEvent('sendState', {
              bubbles: ev.bubbles,
              cancelable: ev.cancelable,
              detail: ev.detail
            });
            for (let a of element.querySelectorAll(':scope > cv-address')) {
              a.dispatchEvent(evCopy);
            }
          });
          break;
        }
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
      if (model.hasAttribute('src') || model.hasAttribute('config-section')) {
        // fetch from url
        this._getModel = async () => {
          const options = {
            ttl: this.getRefresh()
          };
          for (const proxyParam of ['self-signed', 'config-section', 'auth-type']) {
            if (model.hasAttribute(proxyParam)) {
              options[proxyParam] = model.getAttribute(proxyParam);
            }
          }
          const res = await cv.io.Fetch.cachedFetch(model.getAttribute('src'), options, model.getAttribute('proxy') === 'true');
          return res;
        };
      } else if (model.hasAttribute('class')) {
        // initialize internal class instance that implements cv.io.listmodel.IListModel
        const Clazz = cv.io.listmodel.Registry.get(model.getAttribute('class'));
        if (Clazz) {
          const modelInstance = new Clazz();
          if (model.hasAttribute('parameters')) {
            const props = {};
            for (let entry of model.getAttribute('parameters').split(',')) {
              const [name, value] = entry.split('=').map(n => n.trim());
              props[name] = value.startsWith('\'') ? value.substring(1, value.length-1) : value;
            }
            modelInstance.set(props);
          }
          this._getModel = async () => {
            await modelInstance.refresh();
            return modelInstance.getModel();
          };
        } else {
          this.error(`clazz "cv.io.listmodel.${model.getAttribute('class')}" not found`);
        }
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
          this.error(
            'cv-list > model must have at least one read address, src-attribute, cv-data child or a script that fills the model.'
          );

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
        super.onStateUpdate(ev);
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
        try {
          newModel = await newModel;
        } catch (e) {
          this.error('error refreshing async model:', e);
        }
      }
      let target = element.querySelector(':scope > ul');
      if (template.getAttribute('wrap') === 'false') {
        target = element;
      } else if (template.hasAttribute('target')) {
        switch (template.getAttribute('target')) {
          case 'parent':
            target = element.parentElement;
            // we do not need the list to be visible then
            element.style.display = 'none';
            break;
          default:
            throw new Error('invalid target: ' + template.getAttribute('target'));
        }
      } else if (!target) {
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
            while (target.firstElementChild && target.firstElementChild.hasAttribute('data-row')) {
              target.removeChild(target.firstElementChild);
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

        const getValue = (name, entry) => {
          let index = -1;
          if (name.endsWith(']')) {
            // array access
            index = parseInt(name.substring(name.indexOf('[') + 1, name.length - 1));
            if (isNaN(index)) {
              this.error(
                'error parsing array index from ' + name,
                name.substring(name.indexOf('[') + 1, name.length - 1)
              );
              return '';
            }
            name = name.substring(0, name.indexOf('['));
          }
          if (Object.prototype.hasOwnProperty.call(entry, name)) {
            let val = entry[name];
            if (index >= 0 && Array.isArray(val)) {
              return val[index];
            }
            return val;
          }
          return '';
        };
        newModel.forEach((entry, i) => {
          const elem = target.querySelector(`:scope > [data-row="${i}"]`);
          const html = template.innerHTML.replaceAll(/\${([^}]+)}/g, (match, content) => {
            if (content === 'index') {
              return '' + i;
            }
            if (content.includes('||')) {
              // elements are or'ed use the first one with value
              let val = '';
              for (let name of content.split('||').map(n => n.trim())) {
                val = getValue(name, entry);
                if (val) {
                  return val;
                }
              }
            }
            return getValue(content, entry);
          });

          itemTemplate.innerHTML = html;
          // check for elements with when attributes
          itemTemplate.content.firstElementChild.querySelectorAll('[when]').forEach(elem => {
            const [leftVal, rightVal] = elem
              .getAttribute('when')
              .split('=')
              .map(n => n.trim());
            // noinspection EqualityComparisonWithCoercionJS
            if (leftVal != rightVal) {
              elem.parentElement.removeChild(elem);
            } else {
              elem.removeAttribute('when');
            }
          });
          if (elem) {
            // update existing
            elem.innerHTML = itemTemplate.content.firstElementChild.innerHTML;
            elem.setAttribute('data-row', '' + i);
          } else {
            // append new child
            itemTemplate.content.firstElementChild.setAttribute('data-row', '' + i);

            target.appendChild(itemTemplate.content.cloneNode(true));
          }
        });
        this._model = newModel;
      } else {
        this.error('model must be an array', newModel);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeObjects('_modelInstance', '_timer');
    this._model = null;
    this._filterModel = null;
    this._sortModel = null;
    this._target = null;
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'list',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
