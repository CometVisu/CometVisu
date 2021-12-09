/**
 * Shows a round progress bar (partially filled circle)
 */
qx.Class.define('cv.ui.structure.tile.components.RoundProgress', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    progress: {
      check: 'Number',
      apply: '_applyProgress'
    },
    text: {
      check: 'String',
      apply: '_applyText'
    },
    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __writeAddresses: null,
    __circumference: null,

    _init() {
      const element = this._element;
      const radius = element.getAttribute('radius') || 64;
      const strokeWidth = element.getAttribute('stroke') || 8;
      const normalizedRadius = radius - strokeWidth / 2;
      this.__circumference = normalizedRadius * 2 * Math.PI;
      let code = `<svg height="${radius * 2}" width="${radius * 2}">`;
      if (!element.hasAttribute('no-background')) {
       code += `<circle class="bg" 
              r="${normalizedRadius}" 
              cx="${radius}" 
              cy="${radius}" 
              fill="transparent" 
              stroke-width="${strokeWidth}"/>`;
      }
      code += `<circle class="bar" 
            r="${normalizedRadius}" 
            cx="${radius}" 
            cy="${radius}" 
            stroke-width="${strokeWidth}" 
            stroke-dasharray="${this.__circumference} ${this.__circumference}" 
            stroke-dashoffset="${this.__circumference}"/>
   </svg><label></label>`;

      element.innerHTML = code;
    },

    _applyProgress(value) {
      if (this.isConnected()) {
        const progressCircle = this._element.querySelector(':scope > svg > circle.bar');
        progressCircle.style.strokeDashoffset = this.__circumference - value / 100 * this.__circumference;
      }
    },

    _applyText(value) {
      if (this.isConnected()) {
        const label = this._element.querySelector(':scope > label');
        label.innerText = value;
      }
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'round-progress', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
