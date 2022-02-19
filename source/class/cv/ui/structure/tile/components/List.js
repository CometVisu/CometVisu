/**
 * Generates a list of a model based on a template
 */
qx.Class.define('cv.ui.structure.tile.components.List', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

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

    _init() {
      const element = this._element;
      const script = element.querySelector('script');
      this._model = [];
      if (script) {
        this._getModel = Function('"use strict";const model = new qx.data.Array(); ' + script.innerText.trim()+ '; return model');
        this._model = this._getModel();
      }
      this.refresh();
      if (element.hasAttribute('refresh')) {
        const interval = parseInt(element.getAttribute('refresh'));
        if (!isNaN(interval) && interval > 0) {
          this._timer = new qx.event.Timer(interval * 1000);
          this._timer.addListener('interval', this.refresh, this);
          this._timer.start();
        } else {
          this.error('invalid refresh value', interval);
        }
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
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
