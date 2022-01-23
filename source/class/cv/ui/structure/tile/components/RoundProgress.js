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
    },
    type: {
      check: ['circle', 'semiCircle'],
      init: 'circle'
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
    __start: null,
    __normalizedRadius: null,
    __radius: null,

    _init() {
      const element = this._element;
      const radius = this.__radius = element.getAttribute('radius') || 64;
      const strokeWidth = element.getAttribute('stroke') || 8;
      const normalizedRadius = this.__normalizedRadius = radius - strokeWidth / 2;
      this.__circumference = normalizedRadius * 2 * Math.PI;

      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      const type = this.getType();
      const height = type === 'semiCircle' ? radius : radius * 2;
      let code = `<svg height="${height}" width="${radius * 2}" type="${type}">`;
      if (type === 'circle') {
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
              stroke-dashoffset="${this.__circumference}"/>`;
      } else if (type === 'semiCircle') {
        if (!element.hasAttribute('no-background')) {
          code += `<path class="bg" d="M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}" fill="transparent" stroke-width="${strokeWidth}"/>`;
        }
        this.__start = {
          x: strokeWidth / 2,
          y: radius
        };
        code += `<path class="bar" d="M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 0 ${strokeWidth / 2} ${radius}" fill="transparent" stroke-width="${strokeWidth}"/>`;
      }
      code += '</svg><label></label>';
      element.innerHTML = code;
    },

    __convert(angle) {
      const angleRad = angle * (Math.PI / 180.0);
      return {
        x: this.__radius - (this.__normalizedRadius * Math.cos(angleRad)),
        y: this.__radius - (this.__normalizedRadius * Math.sin(angleRad))
      };
    },

    _applyProgress(value) {
      if (this.isConnected()) {
        let valueElement;
        let end;
        switch (this.getType()) {
          case 'circle':
            valueElement = this._element.querySelector(':scope > svg > circle.bar');
            valueElement.setAttribute('stroke-dashoffset', ''+this.__circumference - value / 100 * this.__circumference);
            break;

          case 'semiCircle':
            valueElement = this._element.querySelector(':scope > svg > path.bar');
            end = this.__convert(180/100 * value);
            valueElement.setAttribute('d', [
              'M', this.__start.x, this.__start.y,
              'A', this.__normalizedRadius, this.__normalizedRadius, 0, 0, 1, end.x, end.y
            ].join(' '));
            break;
        }
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
