/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.Switch', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    on: {
      check: 'Boolean',
      init: false,
      apply: '_applyOn'
    },
    onClass: {
      check: 'String',
      init: 'active'
    },
    offClass: {
      check: 'String',
      init: 'inactive'
    },
    onValue: {
      check: 'String',
      init: 'I'
    },
    offValue: {
      check: 'String',
      init: 'O'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __valueElement: null,

    _createDomElement() {
      const actorElement = this.__element = document.createElement('button');
      actorElement.classList.add('round-button', this.isOn() ? this.getOnClass() : this.getOffClass());
      const valueElement = this.__valueElement = this.__valueElement = document.createElement('span');
      valueElement.classList.add('value');
      valueElement.textContent = 'I';
      actorElement.appendChild(valueElement);
      return actorElement;
    },

    _applyOn(value) {
      const domElement = this.getDomElement();
      if (value) {
        domElement.classList.replace(this.getOffClass(), this.getOnClass());
      } else {
        domElement.classList.replace(this.getOnClass(), this.getOffClass());
      }
      this.__valueElement.textContent = this.isOn() ? this.getOnValue() : this.getOffValue();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this.__element) {
      this.__element.remove();
    }
    this.__element = null;
    this.__valueElement = null;
  }
});
