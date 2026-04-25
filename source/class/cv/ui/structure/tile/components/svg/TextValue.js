/* TextValue.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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

    scale: {
      check: 'Number',
      init: 1,
      apply: '_applyScale'
    },

    offsetY: {
      check: 'Number',
      init: 0,
      apply: '_applyOffsetY'
    },

    offsetX: {
      check: 'Number',
      init: 0,
      apply: '_applyOffsetX'
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
    _debouncedUpdateRSize: null,

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
      this._iconSize = 24 * this.getScale();
      let parent = element;
      if (this._parentGridLayout) {
        parent = this._parentGridLayout.getSvg();
        this._debouncedUpdateRSize = qx.util.Function.debounce(this._updateSize.bind(this), 10);
        this._parentGridLayout.addListener('changeSize', this._debouncedUpdateRSize, this);
      }

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

      const group = document.createElementNS(ns, 'g');
      svg.appendChild(group);
      this._target = group;

      if (element.hasAttribute('icon')) {
        this._applyIcon(this.getIcon());
      }

      const value = document.createElementNS(ns, 'text');
      value.setAttribute('x', this.getWidth() / 2);
      value.setAttribute('y', '32');
      value.setAttribute('alignment-baseline', 'central');
      value.setAttribute('class', 'value');
      value.setAttribute('fill', this.getColor());
      value.style.textAnchor = 'middle';
      this._target.appendChild(value);

      this.addListener('heightChanged', this._centerY, this);
      this.addListener('widthChanged', this._centerX, this);

      this._updateHeight();
      this._updateWidth();

      this._applyPosition();
      this._applyTitleOverride(this.getTitle());
    },

    _updateSize() {
      const newScale = Math.min(2.5, (Math.min(this._parentGridLayout.getCellWidth(), this._parentGridLayout.getCellHeight()) - this._parentGridLayout.getSpacing()) / cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize);
      if (newScale === 0.0) {
        return;
      }
      this.debug('new scale:', newScale);
      this.setScale(newScale);
    },

    _applyScale(scale) {
      if (this._target) {
        this._target.setAttribute('transform', `scale(${scale})`);
      }
      if (this._svg) {
        this.setHeight(cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize * scale * this.getRowspan());
        this.setWidth(cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize * scale * this.getColspan());
      }
    },

    _updateValue(mappedValue, value) {
      if (this._target) {
        const target = this._target.querySelector('.value');
        target.textContent = mappedValue;
        this._debouncedDetectOverflow();
      }
    },

    _centerY() {
      this.setOffsetY(this.getHeight() / 2 - this._svg.getBBox().height / 2);
    },

    _centerX() {
      let text = this._target.querySelector('text.value');
      if (text) {
        text.setAttribute('x', '' + (this.getWidth() / 2));
      }
      text = this._target.querySelector('text.title');
      if (text) {
        text.setAttribute('x', '' + (this.getWidth() / 2));
      }
    },

    _applyOffsetY(value) {
      const icon = this._target.querySelector('.icon-container');
      if (icon) {
        icon.setAttribute('y', `${value}`);
      }
      let text = this._target.querySelector('text.value');
      if (text) {
        text.setAttribute('y', '' + (value + this._iconSize + 12));
      }
      text = this._target.querySelector('text.title');
      if (text) {
        text.setAttribute('y', '' + (value + 16));
      }
    },

    _applyOffsetX() {      
    },

    _applyTitleOverride(title) {
      if (this._target) {
        if (title) {
          let text = this._target.querySelector('text.title');
          if (!text) {
            text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', this.getWidth() / 2);
            text.setAttribute('y', '16');
            text.setAttribute('alignment-baseline',  'central');
            text.classList.add('title');
            text.style.textAnchor = 'middle';
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
          fo.setAttribute('width', '100%');
          fo.setAttribute('height', '' + this._iconSize);
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
