/**
 * Shows a value from the backend, as label or image/icon
 * @author Tobias Bräutigam
 * @since 2022
 * @ignore ResizeObserver
 */
qx.Class.define('cv.ui.structure.tile.components.Value', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      this.base(arguments);
      const target = this._element.querySelector('.value');
      if (target.tagName.toLowerCase() === 'label') {
        // check for overflowing text
        new ResizeObserver(() => {
          this._detectOverflow();
        }).observe(target);
      }
    },

    _detectOverflow() {
      const target = this._element.querySelector('.value');
      if (target.clientWidth > target.parentElement.clientWidth) {
        target.classList.add('scroll');
      } else {
        target.classList.remove('scroll');
      }
    },

    _updateValue(mappedValue, value) {
      const target = this._element.querySelector('.value');
      let styleClass = '';
      if (target) {
        const tagName = target.tagName.toLowerCase();
        switch (tagName) {
          case 'cv-icon':
            target._instance.setId(mappedValue);
            if (this._element.hasAttribute('styling')) {
              styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value, this.__store);
            }
            target._instance.setStyleClass(styleClass);
            break;
          case 'meter':
            target.setAttribute('value', mappedValue);
            target.innerHTML = '' + mappedValue;
            break;
          case 'cv-round-progress':
            if (typeof value === 'string') {
              value = parseInt(value);
            }
            target._instance.setProgress(value);
            target._instance.setText('' + mappedValue);
            break;
          case 'label':
            target.innerHTML = mappedValue;
            this._detectOverflow();
            break;
        }
      }
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'value', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
