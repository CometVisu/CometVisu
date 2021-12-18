/**
 * Shows a value from the backend, as label or image/icon
 */
qx.Class.define('cv.ui.structure.tile.components.Value', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _updateValue(mappedValue, value) {
      const target = this._element.querySelector('.value');
      if (target) {
        const tagName = target.tagName.toLowerCase();
        let roundProgress;
        switch (tagName) {
          case 'cv-icon':
            target._instance.setId(mappedValue);
            break;
          case 'meter':
          case 'progress':
            target.setAttribute('value', mappedValue);
            target.innerHTML = '' + mappedValue;
            break;
          case 'cv-round-progress':
            roundProgress = target.getQxInstance();
            roundProgress.setProgress(value);
            roundProgress.setText(mappedValue);
            break;
          case 'label':
            target.innerHTML = mappedValue;
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
