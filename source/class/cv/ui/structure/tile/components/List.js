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
    MEMBERS
  ***********************************************
  */
  members: {
    _target: null,
    _timer: null,
    _model: null,
    _getModel: null,
    __lastRefresh: null,

    _init() {
      const element = this._element;
      const script = element.querySelector('script');
      this._model = [];
      if (script) {
        this._getModel = Function('"use strict";const model = []; ' + script.innerText.trim()+ '; return model');
        this._model = this._getModel();
      }
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
      const template = element.querySelector(':scope > template');
      let newModel = [];
      if (typeof this._getModel === 'function') {
        newModel = this._getModel();
      }
      this.debug('refreshing with new model length', newModel.length);
      if (Array.isArray(newModel) || newModel instanceof qx.data.Array) {
        const itemTemplate = document.createElement('template');
        // remove entries we do not need anymore
        for (let i = newModel.length; i < this._model.length; i++) {
          const elem = element.querySelector(`:scope > [data-row="${i}"]`);
          if (elem) {
            elem.remove();
          }
        }

        newModel.forEach((entry, i) => {
          const elem = element.querySelector(`:scope > [data-row="${i}"]`);
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
            element.appendChild(itemTemplate.content.cloneNode(true));
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
