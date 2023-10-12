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
    },

    radius: {
      check: 'Number',
      init: 28,
      apply: '_applyRadius'
    },

    stroke: {
      check: 'Number',
      init: 3,
      apply: '_applyStroke'
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
    _parentGridLayout: null,

    getSvg() {
      return this._svg;
    },

    _init() {
      super._init();
      const element = this._element;
      //const style = document.querySelector(':root').style;
      /*const radius = (this._radius =
        element.getAttribute('radius') || (parseInt(style.getPropertyValue('--tileCellWidth')) || 56) / 2);*/
      const radius = this.getRadius();
      const strokeWidth = this.getStroke();
      //const normalizedRadius = (this.__normalizedRadius = radius - strokeWidth / 2);
      let parent = element;
      let parentInstance = null;
      let p = element.parentElement;
      while (p && !parentInstance) {
        if (p.nodeName.toLowerCase().startsWith('cv-') && p._instance && qx.Class.hasOwnMixin(p._instance.constructor, cv.ui.structure.tile.components.svg.MSvgGrid) ) {
          parentInstance = p._instance;
          parent = parentInstance.SVG;
        } else if (p.nodeName.toLowerCase() === 'cv-page') {
          // do not look outside the page
          break;
        } else {
          p = p.parentElement;
        }
      }
      this._parentGridLayout = parentInstance;
      if (this._parentGridLayout) {
        this._debouncedUpdateRadius = qx.util.Function.debounce(this._updateRadius.bind(this), 10);
        this._parentGridLayout.addListener('changeSize', this._debouncedUpdateRadius, this);
      }

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

      this._applyRadius(radius);


      if (!element.hasAttribute('no-background')) {
        const bg = document.createElementNS(ns, 'circle');
        bg.classList.add('bg');
        if (this.__normalizedRadius) {
          bg.setAttribute('r', '' + this.__normalizedRadius);
        }
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

    _updateRadius() {
      if (this._parentGridLayout) {
        const newRadius = Math.floor((Math.min(this._parentGridLayout.getCellWidth(), this._parentGridLayout.getCellHeight()) - this._parentGridLayout.getSpacing()) / 2);
        if (this.getRadius() !== newRadius) {
          console.log(newRadius);
          this._element.setAttribute('radius', '' + newRadius);
        }
      }
    },

    _applyRadius(radius) {
      this._updateNormalizedRadius();
      this._iconSize = Math.round(radius / 1.5) + 'px';
      const icon = this._target.querySelector('text.icon');
      if (icon) {
        icon.style.fontSize = this._iconSize;
      }
      if (this._svg) {
        this._svg.setAttribute('height', '' + (radius * 2));
        this._svg.setAttribute('width', '' + (radius * 2));
      }
    },

    _applyStroke(stroke) {
      this._updateNormalizedRadius();
      if (this._target) {
        this._target.setAttribute('stroke-width', stroke);
      }
    },

    _updateNormalizedRadius() {
      if (this._target) {
        const newValue = this.getRadius() - this.getStroke() / 2;
        if (this.__normalizedRadius !== newValue) {
          this.__normalizedRadius = newValue;
          const bg = this._target.querySelector('circle.bg');
          if (bg) {
            bg.setAttribute('r', '' + this.__normalizedRadius);
          }

          const bar = this._target.querySelector('circle.bar');
          if (bar) {
            bar.setAttribute('r', '' + this.__normalizedRadius);
          }
        }
      }
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
      if (oldValue && classes.contains(oldValue)) {
        classes.remove(oldValue);
      }
      if (value) {
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
        static observedAttributes = ['icon', 'x', 'y', 'radius', 'stroke'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
