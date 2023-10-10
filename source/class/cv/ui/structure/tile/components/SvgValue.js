/**
 * SvgValue shows an element that contains of an icon and a value-text inside
 * a colored circle. The circle can also show a progress value in another color.
 */
qx.Class.define('cv.ui.structure.tile.components.SvgValue', {
  extend: cv.ui.structure.tile.components.Value,

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

    min: {
      check: 'Number',
      init: 0
    },

    max: {
      check: 'Number',
      init: 100
    },

    showProgress: {
      check: 'Boolean',
      init: false,
      apply: '_applyShowProgress'
    },

    icon: {
      check: 'String',
      nullable: true,
      apply: '_applyIcon'
    },

    x: {
      check: 'String',
      nullable: true,
      apply: '_applyToSvg'
    },
    y: {
      check: 'String',
      nullable: true,
      apply: '_applyToSvg'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _target: null,
    _svg: null,
    __normalizedRadius: null,
    _radius: null,
    _iconSize: null,
    _iconPosition: null,

    getSvg() {
      return this._svg;
    },

    _init() {
      super._init();
      const element = this._element;
      const style = document.querySelector(':root').style;
      const radius = (this._radius =
        element.getAttribute('radius') || (parseInt(style.getPropertyValue('--tileCellWidth')) || 56) / 2);
      const strokeWidth = element.getAttribute('stroke') || 3;
      const normalizedRadius = (this.__normalizedRadius = radius - strokeWidth / 2);
      let parent = element;
      if (element.parentElement.nodeName.toLowerCase().startsWith('cv-') && element.parentElement._instance) {
        // check if the parent component provides an own svg element that we can use as target
        parent = element.parentElement._instance.SVG;
      }

      this._iconSize = Math.round(this._radius / 1.5) + 'px';
      this._iconPosition = {
        x: '50%',
        y: '30%'
      };

      const ns = 'http://www.w3.org/2000/svg';

      // add surrounding svg node
      const svg = this._svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('height', '' + (radius * 2));
      svg.setAttribute('width', '' + (radius * 2));
      svg.setAttribute('type', 'circle');
      for (const name of ['x', 'y']) {
        if (element.hasAttribute(name)) {
          svg.setAttribute(name, element.getAttribute(name));
        }
      }
      parent.appendChild(svg);

      const group = document.createElementNS(ns, 'g');
      group.classList.add('svg-value');
      group.setAttribute('fill', 'transparent');
      group.setAttribute('stroke-width', strokeWidth);
      svg.appendChild(group);
      this._target = group;

      if (!element.hasAttribute('no-background')) {
        const bg = document.createElementNS(ns, 'circle');
        bg.classList.add('bg');
        bg.setAttribute('r', '' +normalizedRadius);
        bg.setAttribute('cx', '50%');
        bg.setAttribute('cy', '50%');
        if (element.hasAttribute('background-color')) {
          bg.style.stroke = element.getAttribute('background-color');
        }
        this._target.appendChild(bg);
      }

      this.setShowProgress(element.querySelectorAll(':scope > cv-address[target="progress"]').length > 0);

      if (element.hasAttribute('icon')) {
        this._applyIcon(this.getIcon());
      }

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

      const value = document.createElementNS(ns, 'text');
      value.setAttribute('text-anchor', 'middle');
      value.setAttribute('alignment-baseline', 'central');
      value.setAttribute('x', '50%');
      value.setAttribute('y', '70%');
      value.setAttribute('class', 'value');
      value.setAttribute('fill', 'var(--primaryText)');
      value.style.fontSize = '11px';
      this._target.appendChild(value);
    },

    _updateValue(mappedValue, value) {
      const target = this._target.querySelector('.value');
      target.textContent = mappedValue;
      this._debouncedDetectOverflow();
    },

    _applyShowProgress(value) {
      if (value) {
        let bar = this._target.querySelector('circle.bar');
        this._target.classList.add('shows-progress');
        if (!bar) {
          bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          bar.classList.add('bar');
          bar.setAttribute('r', '' + this.__normalizedRadius);
          bar.setAttribute('cx', '50%');
          bar.setAttribute('cy', '50%');
          bar.setAttribute('pathLength', '100');
          bar.setAttribute('stroke-dashoffset', '25');
          bar.setAttribute('stroke-dasharray', '0 100');
          if (this._element.hasAttribute('foreground-color')) {
            bar.style.stroke = this._element.getAttribute('foreground-color');
          }
          this._target.appendChild(bar);
        }
      } else {
        let bar = this._target.querySelector('circle.bar');
        if (bar) {
          this._target.removeChild(bar);
        }
        this._target.classList.remove('shows-progress');
      }
    },

    _applyToSvg(val, oldVal, name) {
      if (this._svg) {
        this._svg.setAttribute(name, val);
      }
    },

    _applyIcon(iconName) {
      if (!this._target) {
        return;
      }
      let icon = this._target.querySelector('text.icon');
      if (iconName) {
        if (!icon) {
          icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          icon.setAttribute('class', 'icon');
          icon.setAttribute('text-anchor', 'middle');
          icon.setAttribute('alignment-baseline', 'central');
          icon.setAttribute('x', this._iconPosition.x);
          icon.setAttribute('y', this._iconPosition.y);
          icon.setAttribute('fill', 'var(--primaryText)');
          icon.style.fontSize = this._iconSize;

          this._target.appendChild(icon);
        }
        const iconSet = iconName.split('-')[0];
        icon.classList.add(iconName);

        // css declarations of the icon fonts do not work in SVG text elements, we need to convert the charCode
        if (['knxuf', 'ri'].includes(iconSet)) {
          setTimeout(() => {
            const styles = window.getComputedStyle(icon, ':before');
            if (styles) {
              const content = styles['content'];
              icon.textContent = String.fromCharCode(content.charCodeAt(1));
              icon.classList.replace(iconName, iconSet + '-');
            }
          }, 50);
        }
      } else if (icon) {
        this._target.remove(icon);
      }
    },

    _applyProgress(value) {
      if (this.isConnected()) {
        let valueInRange = value - this.getMin();
        let percent = Math.max(0, Math.min(100, (100 / (this.getMax() - this.getMin())) * valueInRange));
        let title = this._target.querySelector(':scope > title');
        if (!title) {
          title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          this._target.appendChild(title);
        }
        title.textContent = percent + '%';

        const valueElement = this._target.querySelector('circle.bar');
        valueElement.setAttribute('stroke-dasharray', `${percent} ${100 - percent}`);
      }
    },

    _applyStyleClass(value, oldValue) {
      const classes = this._target.classList;
      if (oldValue) {
        if (classes.contains(oldValue)) {
          classes.replace(oldValue, value);
        } else {
          classes.add(value);
        }
      } else if (value) {
        classes.add(value);
      }
    },

    _detectOverflow() {
      if (this.isVisible()) {
        const target = this._target.querySelector('.value');
        const sizeReference = this._target.querySelector('circle.bg').getBBox();
        this._queuedOverflowDetection = false;
        if (target.clientWidth > sizeReference.width) {
          target.classList.add('scroll');
        } else {
          target.classList.remove('scroll');
        }
      } else {
        this._queuedOverflowDetection = true;
      }
    },

    onStateUpdate(ev) {
      if (ev.detail.target === 'progress') {
        this.setProgress(ev.detail.state);
        ev.stopPropagation();
        return true;
      }
      return super.onStateUpdate(ev);
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'svg-value',
      class extends QxConnector {
        static observedAttributes = ['icon', 'x', 'y'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
