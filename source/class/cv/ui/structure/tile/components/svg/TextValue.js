/**
 * TextValue shows an element that contains of an icon, an optional tile
 * and a value-text.
 *
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Class.define('cv.ui.structure.tile.components.svg.TextValue', {
  extend: cv.ui.structure.tile.components.Value,
  include: cv.ui.structure.tile.components.svg.MGraphicsElement,

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

    color: {
      check: 'String',
      init: 'var(--primaryText)',
      apply: '_applyColor'
    },

    iconColor: {
      check: 'String',
      init: 'var(--primaryText)',
      apply: '_applyIconColor'
    },

    title: {
      check: 'String',
      init: '',
      apply: '_applyTitle'
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

    getSvg() {
      return this._svg;
    },

    getParentSvg() {
      return this._svg ? this._svg.ownerSVGElement : null;
    },

    _init() {
      super._init();
      const element = this._element;
      this._findParentGridLayout();
      const parent = this._parentGridLayout ? this._parentGridLayout.SVG : element;
      this._iconSize = 24;

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

      this._applyPosition();
      this._applyTitle(this.getTitle());
    },

    _updateValue(mappedValue, value) {
      const target = this._target.querySelector('.value');
      target.textContent = mappedValue;
      this._debouncedDetectOverflow();
    },

    _applyTitle(title) {
      if (this._target) {
        if (title) {
          let text = this._target.querySelector('text.title');
          if (!text) {
            text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '0');
            text.setAttribute('y', '16');
            text.setAttribute('alignment-baseline', 'central');
            text.classList.add('title');
            this._target.appendChild(text);
          }
          text.textContent = title;
        } else {
          let text = this._target.querySelector('text.title');
          if (text) {
            text.remove();
          }
        }
      }
    },

    _applyColor(color) {
      if (this._target) {
        const target = this._target.querySelector('.value');
        if (color) {
          target.setAttribute('fill', color);
        } else {
          target.removeAttribute('fill');
        }
      }
    },

    _applyIconColor(color) {
      const icon = this._target ? this._target.querySelector('cv-icon') : null;
      if (icon) {
        icon.style.color = color || 'inherit';
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
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'svg-text-value',
      class extends QxConnector {
        static observedAttributes = ['icon', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'radius', 'stroke', 'title'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});