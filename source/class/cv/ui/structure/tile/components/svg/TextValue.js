/**
 * TextValue shows an element that contains of an icon, an optional tile
 * and a value-text.
 *
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Class.define('cv.ui.structure.tile.components.svg.TextValue', {
  extend: cv.ui.structure.tile.components.Value,
  include: cv.ui.structure.tile.MStringTransforms,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
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

    rowspan: {
      check: 'Number',
      init: 1,
      apply: '_updateHeight',
      transform: '_parseFloat'
    },

    colspan: {
      check: 'Number',
      init: 1,
      apply: '_updateWidth',
      transform: '_parseFloat'
    },

    color: {
      check: 'String',
      init: 'var(--primaryText)',
      apply: '_applyColor'
    },

    iconColor: {
      check: 'String',
      init: 'var(--primaryText)',
      apply: '_applyIconColor'
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
    _iconSize: null,
    _iconPosition: null,
    _parentGridLayout: null,

    getSvg() {
      return this._svg;
    },

    getParentSvg() {
      return this._svg ? this._svg.ownerSVGElement : null;
    },

    _init() {
      super._init();
      const element = this._element;
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
      this._iconSize = 24;
      this._parentGridLayout = parentInstance;

      const ns = 'http://www.w3.org/2000/svg';

      // add surrounding svg node
      const svg = this._svg = document.createElementNS(ns, 'svg');
      svg.classList.add('text-value');
      for (const name of ['x', 'y']) {
        if (element.hasAttribute(name)) {
          svg.setAttribute(name, element.getAttribute(name));
        }
      }
      parent.appendChild(svg);
      this._target = svg;

      if (element.hasAttribute('icon')) {
        this._applyIcon(this.getIcon());
      }

      const value = document.createElementNS(ns, 'text');
      value.setAttribute('x', '0');
      value.setAttribute('y', '32');
      value.setAttribute('alignment-baseline', 'central');
      value.setAttribute('class', 'value');
      value.setAttribute('fill', this.getColor());
      this._target.appendChild(value);

      this._updateHeight();
      this._updateWidth();
    },

    _updateValue(mappedValue, value) {
      const target = this._target.querySelector('.value');
      target.textContent = mappedValue;
      this._debouncedDetectOverflow();
    },

    _applyColor(color) {
      if (this._target) {
        if (color) {
          this._target.setAttribute('fill', color);
        } else {
          this._target.removeAttribute('fill');
        }
      }
    },

    _applyIconColor(color) {
      const icon = this._target ? this._target.querySelector('cv-icon') : null;
      if (icon) {
        icon.style.color = color || 'inherit';
      }
    },

    _applyToSvg(val, oldVal, name) {
      if (this._svg) {
        this._svg.setAttribute(name, val);
      }
    },

    _updateWidth() {
      if (this._parentGridLayout) {
        const width = this._parentGridLayout.getCellWidth() * this.getColspan();
        this._svg.setAttribute('width', `${width}`);
      }
    },

    _updateHeight() {
      if (this._parentGridLayout) {
        const height = this._parentGridLayout.getCellHeight() * this.getRowspan();
        this._svg.setAttribute('height', `${height}`);
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
          fo.setAttribute('width', this._iconSize + 'px');
          fo.setAttribute('height', this._iconSize + 'px');
          fo.style.textAlign = 'center';

          icon = document.createElement('cv-icon');
          icon.classList.add(iconName);
          icon.style.fontSize = this._iconSize + 'px';
          if (this.getIconColor()) {
            icon.style.color = this.getIconColor();
          }
          fo.appendChild(icon);
          const value = this._target.querySelector('.value');
          if (value) {
            this._target.insertBefore(fo, value);
          } else {
            this._target.appendChild(fo);
          }
        }
      } else if (icon) {
        this._target.remove(icon);
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
        let width = 0;
        const wAttr = this._svg.getAttribute('width');
        if (wAttr) {
          width = parseInt(wAttr, 10);
        } else {
          const sizeReference = this._svg.getBBox();
          width = sizeReference.width;
        }
        this._queuedOverflowDetection = false;
        if (target.clientWidth > width) {
          target.classList.add('scroll');
        } else {
          target.classList.remove('scroll');
        }
      } else {
        this._queuedOverflowDetection = true;
      }
    },
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'svg-text-value',
      class extends QxConnector {
        static observedAttributes = ['icon', 'x', 'y', 'radius', 'stroke'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
