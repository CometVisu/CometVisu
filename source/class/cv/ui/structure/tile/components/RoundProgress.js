/* RoundProgress.js
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
 * Shows a round progress bar (partially filled circle).
 * This component must be used inside a cv-value component, it is not meant to be used standalone.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.components.RoundProgress', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MVisibility,

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
    _queuedFitText: null,

    _init() {
      super._init();
      const element = this._element;
      const style = document.querySelector(':root').style;
      const hasFixedRadius = element.hasAttribute('radius');
      const radius = (this.__radius =
        element.getAttribute('radius') || parseInt(style.getPropertyValue('--tileCellWidth')) || 56);
      const strokeWidth = element.getAttribute('stroke') || 8;
      const normalizedRadius = (this.__normalizedRadius = radius - strokeWidth / 2);
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
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('height', height);
      svg.setAttribute('width', '' + (radius * 2));
      svg.setAttribute('type', type);
      //let code = `<svg height="${height}" width="${radius * 2}" type="${type}">`;
      if (type === 'circle') {
        if (!element.hasAttribute('no-background')) {
          const bg = document.createElementNS(ns, 'circle');
          bg.classList.add('bg');
          bg.setAttribute('r', '' +normalizedRadius);
          bg.setAttribute('cx', '50%');
          bg.setAttribute('cy', '50%');
          bg.setAttribute('fill', 'transparent');
          bg.setAttribute('stroke-width', strokeWidth);
          if (element.hasAttribute('background-color')) {
            bg.style.stroke = element.getAttribute('background-color');
          }
          svg.appendChild(bg);
        }
        const bar = document.createElementNS(ns, 'circle');
        bar.classList.add('bar');
        bar.setAttribute('r', '' +normalizedRadius);
        bar.setAttribute('cx', '50%');
        bar.setAttribute('cy', '50%');
        bar.setAttribute('stroke-width', strokeWidth);
        bar.setAttribute('stroke-dasharray', `${this.__circumference} ${this.__circumference}`);
        bar.setAttribute('stroke-dashoffset', this.__circumference);
        if (element.hasAttribute('foreground-color')) {
          bar.style.stroke = element.getAttribute('foreground-color');
        }
        svg.appendChild(bar);
      } else if (type === 'semiCircle') {
        if (!element.hasAttribute('no-background')) {
          const bg = document.createElementNS(ns, 'path');
          bg.classList.add('bg');
          bg.setAttribute('d', `M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2 - strokeWidth / 2
          } ${radius}`);
          bg.setAttribute('fill', 'transparent');
          bg.setAttribute('stroke-width', strokeWidth);
          if (element.hasAttribute('background-color')) {
            bg.style.stroke = element.getAttribute('background-color');
          }
          svg.appendChild(bg);
        }
        this.__start = {
          x: strokeWidth / 2,
          y: radius
        };
        const bar = document.createElementNS(ns, 'path');
        bar.classList.add('bar');
        bar.setAttribute('d', `M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 0 ${
          strokeWidth / 2
        } ${radius}`);
        bar.setAttribute('fill', 'transparent');
        bar.setAttribute('stroke-width', strokeWidth);
        if (element.hasAttribute('foreground-color')) {
          bar.style.stroke = element.getAttribute('foreground-color');
        }
        svg.appendChild(bar);
      }
      element.replaceChildren(svg, document.createElement('label'));

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
              bg.setAttribute(
                'd',
                `M ${strokeWidth / 2} ${this.__radius} A ${this.__normalizedRadius} ${this.__normalizedRadius} 0 0 1 ${
                  this.__radius * 2 - strokeWidth / 2
                } ${this.__radius}`
              );
            }
          }
          this._applyProgress(this.isPropertyInitialized('progress') ? this.getProgress() : 0);
        });
      }
    },

    __convert(angle) {
      const angleRad = angle * (Math.PI / 180.0);
      return {
        x: this.__radius - this.__normalizedRadius * Math.cos(angleRad),
        y: this.__radius - this.__normalizedRadius * Math.sin(angleRad)
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

            valueElement.setAttribute(
              'stroke-dashoffset',
              '' + this.__circumference - (percent / 100) * this.__circumference
            );

            break;

          case 'semiCircle':
            valueElement = this._element.querySelector(':scope > svg > path.bar');

            end = this.__convert((180 / 100) * percent);
            valueElement.setAttribute(
              'd',
              [
                'M',
                this.__start.x,
                this.__start.y,
                'A',
                this.__normalizedRadius,
                this.__normalizedRadius,
                0,
                0,
                1,
                end.x,
                end.y
              ].join(' ')
            );

            break;
        }
      }
    },

    _fitText() {
      if (this.__label && this.__label.textContent) {
        if (this.isVisible()) {
          if (!this.__canvas) {
            this.__canvas = document.createElement('canvas');
            this.__context = this.__canvas.getContext('2d');
            const compStyle = window.getComputedStyle(this.__label);
            this.__context.font = compStyle.getPropertyValue('font');
            this.__defaultLabelFontSize = compStyle.getPropertyValue('font-size');
          }
          const metrics = this.__context.measureText(this.__label.textContent);
          if (metrics.width > this.__availableLabelWidth) {
            // adjust font-size
            const factor = this.__availableLabelWidth / metrics.width;
            this.__label.style.fontSize = Math.floor(parseInt(this.__defaultLabelFontSize) * factor) + 'px';
          } else {
            this.__label.style.fontSize = this.__defaultLabelFontSize;
          }
          this._queuedFitText = false;
        } else {
          this._queuedFitText = true;
        }
      }
    },

    _applyVisible(visible) {
      if (visible && this._queuedFitText) {
        this._fitText();
      }
    },

    _applyText(value) {
      if (this.isConnected()) {
        if (!this.__label) {
          this.__label = this._element.querySelector(':scope > label');
        }
        this.__label.textContent = value;
        if (!value) {
          // empty text, just reset to default font size
          if (this.__defaultLabelFontSize) {
            this.__label.style.fontSize = this.__defaultLabelFontSize;
          }
        } else {
          this._fitText();
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__label = null;
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'round-progress',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
