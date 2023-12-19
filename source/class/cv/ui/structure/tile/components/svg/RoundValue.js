/**
 * RoundValue shows an element that contains of an icon and a value-text inside
 * a colored circle. The circle can also show a progress value in another color.
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Class.define('cv.ui.structure.tile.components.svg.RoundValue', {
  extend: cv.ui.structure.tile.components.Value,
  include: cv.ui.structure.tile.components.svg.MGraphicsElement,

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

    radius: {
      check: 'Number',
      init: 30,
      apply: '_applyRadius',
      transform: '_parseInt'
    },

    stroke: {
      check: 'Number',
      init: 2,
      apply: '_applyStroke',
      transform: '_parseFloat'
    },

    amount: {
      check: 'Number',
      init: 0,
      apply: '_applyAmount'
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
    _iconOffset: null,
    _fixedRadius: null,

    getSvg() {
      return this._svg;
    },

    getParentSvg() {
      return this._svg ? this._svg.ownerSVGElement : null;
    },

    _init() {
      super._init();
      const element = this._element;
      this._fixedRadius = element.hasAttribute('radius');
      const radius = this.getRadius();
      const strokeWidth = this.getStroke();
      this._findParentGridLayout();
      if (this._parentGridLayout && !this._fixedRadius) {
        this._debouncedUpdateRadius = qx.util.Function.debounce(this._updateRadius.bind(this), 10);
        this._parentGridLayout.addListener('changeSize', this._debouncedUpdateRadius, this);
      }
      const parent = this._parentGridLayout ? this._parentGridLayout.getSvg() : element;

      const ns = 'http://www.w3.org/2000/svg';

      // add surrounding svg node
      const svg = this._svg = document.createElementNS(ns, 'svg');
      this.setHeight(radius * 2);
      this.setWidth(radius * 2);
      svg.setAttribute('type', 'circle');
      for (const name of ['x', 'y']) {
        if (element.hasAttribute(name)) {
          svg.setAttribute(name, element.getAttribute(name));
        }
      }
      parent.appendChild(svg);

      const group = document.createElementNS(ns, 'g');
      group.classList.add('round-value');
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

      this.setShowProgress(element.querySelectorAll(':scope > cv-address[target="progress"], :scope > cv-address-group[target="progress"]').length > 0);

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
      value.style.fontSize = `${this._iconSize-4}px`;
      this._target.appendChild(value);

      this._updateHeight();
      this._updateWidth();

      // check if we have a sum of multiple addresses, then show the amount
      let sumGroup = element.querySelector(':scope > cv-address-group[operator="+"]');
      if (sumGroup) {
        if (!sumGroup._instance) {
          window.requestAnimationFrame(() => {
            sumGroup._instance.bind('nonZeroValues', this, 'amount');
          });
        } else {
          sumGroup._instance.bind('nonZeroValues', this, 'amount');
        }
      } else {
        this.setAmount(element.querySelectorAll(':scope > cv-address:not([target])').length);
      }

      this._applyPosition();
      this._applyTitle(this.getTitle());
    },

    _updateRadius() {
      if (this._parentGridLayout) {
        const newRadius = Math.floor((Math.min(this._parentGridLayout.getCellWidth(), this._parentGridLayout.getCellHeight())) / 2);
        if (this.getRadius() !== newRadius) {
          this._element.setAttribute('radius', '' + newRadius);
        }
      }
    },

    _applyAmount(value) {
      let amount = this._target.querySelector('text.amount');
      let updateIconPosition = false;
      if (value > 1) {
        // show it
        if (!amount) {
          amount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          amount.setAttribute('text-anchor', 'right');
          amount.setAttribute('alignment-baseline', 'central');
          amount.setAttribute('fill', 'var(--primaryText)');
          amount.classList.add('amount');
          amount.style.fontSize = `${this._iconSize - 5}px`;
          this._target.appendChild(amount);
          this.__updateAmountPosition();
        }
        if (this._iconOffset !== 5) {
          this._iconOffset = 5;
          updateIconPosition = true;
        }
        amount.textContent = value + 'x';
      } else if (amount) {
        amount.remove();
        if (this._iconOffset !== 0) {
          this._iconOffset = 0;
          updateIconPosition = true;
        }
      }
      if (updateIconPosition) {
        this.__updateIconPosition();
      }
    },

    __updateAmountPosition() {
      let amount = this._target.querySelector('text.amount');
      if (amount) {
        const radius = this.getRadius();
        const halfSize = this._iconSize / 2;
        const x = radius * 0.8 - halfSize;
        const y = radius * 0.85 - halfSize;
        amount.setAttribute('x', `${x}`);
        amount.setAttribute('y', `${y}`);
      }
    },

    __updateIconPosition() {
      const icon = this._target.querySelector('cv-icon');
      if (icon) {
        icon.style.fontSize = this._iconSize + 'px';
      }
      const iconContainer = this._target.querySelector('foreignObject.icon-container');
      if (iconContainer) {
        const radius = this.getRadius();
        const halfSize = this._iconSize / 2;
        const x = radius - halfSize + this._iconOffset;
        const y = radius * 0.6 - halfSize;
        iconContainer.setAttribute('x', `${x}`);
        iconContainer.setAttribute('y', `${y}`);
        iconContainer.setAttribute('width', this._iconSize + '');
        iconContainer.setAttribute('height', this._iconSize + '');
      }
    },

    _applyRadius(radius) {
      this._updateNormalizedRadius();
      this._iconSize = Math.round(radius / 2);
      if (this._target) {
        this.__updateIconPosition();
        const value = this._target.querySelector('.value');
        if (value) {
          value.style.fontSize = `${this._iconSize - 4}px`;
        }
        this.__updateAmountPosition();
      }
      if (this._svg) {
        this.setHeight(radius * 2);
        this.setWidth(radius * 2);
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
      if (this._target) {
        const target = this._target.querySelector('.value');
        if (target) {
          target.textContent = mappedValue;
          this._debouncedDetectOverflow();
        }
      }
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

    _applyIcon(iconName) {
      if (!this._target) {
        return;
      }
      let icon = this._target.querySelector('cv-icon');
      if (iconName) {
        if (!icon) {
          const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
          fo.setAttribute('class', 'icon-container');
          fo.style.textAlign = 'center';

          icon = document.createElement('cv-icon');
          icon.classList.add(iconName);
          icon.style.fontSize = this._iconSize + 'px';
          fo.appendChild(icon);
          this._target.appendChild(fo);
          this.__updateIconPosition();
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
      cv.ui.structure.tile.Controller.PREFIX + 'svg-round-value',
      class extends QxConnector {
        static observedAttributes = ['icon', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'radius', 'stroke', 'title'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
