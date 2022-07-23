/**
 * Shows a round progress bar (partially filled circle).
 * This component must be used inside a cv-value component, it is not meant to be used standalone.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.RoundProgress', {
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
    },
    min: {
      check: 'Number',
      init: 0
    },
    max: {
      check: 'Number',
      init: 100
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
    __label: null,
    __canvas: null,
    __availableLabelWidth: null,
    __defaultLabelFontSize: null,

    _init() {
      const element = this._element;
      const style = document.querySelector(':root').style;
      const hasFixedRadius = element.hasAttribute('radius');
      const radius = this.__radius = element.getAttribute('radius') || parseInt(style.getPropertyValue('--tileCellWidth')) || 56;
      const strokeWidth = element.getAttribute('stroke') || 8;
      const normalizedRadius = this.__normalizedRadius = radius - strokeWidth / 2;
      this.__circumference = normalizedRadius * 2 * Math.PI;

      if (element.hasAttribute('min')) {
        const min = parseInt(element.getAttribute('min'));
        if (!isNaN(min)) {
          this.setMin(min);
        }
      }

      if (element.hasAttribute('max')) {
        const max = parseInt(element.getAttribute('max'));
        if (!isNaN(max)) {
          this.setMax(max);
        }
      }

      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      const type = this.getType();
      let height = type === 'semiCircle' ? radius : radius * 2;
      let code = `<svg height="${height}" width="${radius * 2}" type="${type}">`;
      if (type === 'circle') {
        if (!element.hasAttribute('no-background')) {
          code += `<circle class="bg" 
                r="${normalizedRadius}" 
                cx="50%" 
                cy="50%" 
                fill="transparent" 
                stroke-width="${strokeWidth}"/>`;
        }
        code += `<circle class="bar" 
              r="${normalizedRadius}" 
              cx="50%" 
              cy="50%" 
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

      this.__availableLabelWidth = radius * 2 - strokeWidth * 2 - 24;

      if (!hasFixedRadius) {
        qx.event.message.Bus.subscribe('cv.design.tile.cellWidthChanged', ev => {
          this.__radius = ev.getData();
          this.__normalizedRadius = this.__radius - strokeWidth / 2;
          this.__circumference = this.__normalizedRadius * 2 * Math.PI;
          height = type === 'semiCircle' ? this.__radius : this.__radius * 2;
          const svg = element.querySelector(':scope > svg');
          svg.setAttribute('height', '' + height);
          svg.setAttribute('width', '' + this.__radius * 2);
          if (type === 'circle') {
            this._element.querySelectorAll(':scope > svg > circle').forEach(circle => {
              circle.setAttribute('r', '' + this.__normalizedRadius);
              if (circle.classList.contains('bar')) {
                circle.setAttribute('stroke-dasharray', this.__circumference + ' ' + this.__circumference);
                circle.setAttribute('stroke-dashoffset', '' + this.__circumference);
              }
            });
          } else if (type === 'semiCircle') {
            this.__start.y = this.__radius;
            const bg = this._element.querySelector(':scope > svg > path.bg');
            if (bg) {
              bg.setAttribute('d', `M ${strokeWidth / 2} ${this.__radius} A ${this.__normalizedRadius} ${this.__normalizedRadius} 0 0 1 ${this.__radius * 2 - strokeWidth / 2} ${this.__radius}`);
            }
          }
          this._applyProgress(this.isPropertyInitialized('progress') ? this.getProgress() : 0);
        });
      }
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
        let valueInRange = value - this.getMin();
        let percent = Math.max(0, Math.min(100, (100 / (this.getMax() - this.getMin())) * valueInRange));
        switch (this.getType()) {
          case 'circle':
            valueElement = this._element.querySelector(':scope > svg > circle.bar');
            valueElement.setAttribute('stroke-dashoffset', '' + this.__circumference - percent / 100 * this.__circumference);
            break;

          case 'semiCircle':
            valueElement = this._element.querySelector(':scope > svg > path.bar');
            end = this.__convert(180/100 * percent);
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
        if (!this.__label) {
          this.__label = this._element.querySelector(':scope > label');
          this.__canvas = document.createElement('canvas');
          this.__context = this.__canvas.getContext('2d');
          const compStyle = window.getComputedStyle(this.__label);
          this.__context.font = compStyle.getPropertyValue('font');
          this.__defaultLabelFontSize = compStyle.getPropertyValue('font-size');
        }
        this.__label.innerText = value;
        const metrics = this.__context.measureText(value);
        if (metrics.width > this.__availableLabelWidth) {
          // adjust font-size
          const factor = this.__availableLabelWidth / metrics.width;
          this.__label.style.fontSize = Math.floor(parseInt(this.__defaultLabelFontSize) * factor) + 'px';
        } else {
          this.__label.style.fontSize = this.__defaultLabelFontSize;
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__label = null;
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'round-progress', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
