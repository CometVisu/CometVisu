/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Draws a line between two SVGGraphicsElements.
 */
qx.Class.define('cv.ui.structure.tile.components.svg.Connector', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(source, target) {
    super();
    this._updatePosition = this.__updatePosition.bind(this);
    this._debouncedUpdatePosition = qx.util.Function.debounce(this._updatePosition, 50);
    this._sourceObserver = new MutationObserver(this._onMutation.bind(this));
    this._targetObserver = new MutationObserver(this._onMutation.bind(this));
    this.setSource(source);
    this.setTarget(target);
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    C: 0,
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    id: {
      check: 'String',
      nullable: true
    },
    source: {
      check: 'SVGGraphicsElement',
      apply: '_applySource',
      nullable: true,
    },
    target: {
      check: 'SVGGraphicsElement',
      apply: '_applyTarget',
      nullable: true
    },
    root: {
      check: 'SVGSVGElement',
      apply: '_applyRoot',
      nullable: true
    },
    sourceConnectionPoint: {
      check: ['top', 'right', 'bottom', 'left', 'auto'],
      init: 'auto',
      apply: '__updatePosition',
      validate : '_validateConnectionPoint'
    },
    targetConnectionPoint: {
      check: ['top', 'right', 'bottom', 'left', 'auto'],
      init: 'auto',
      apply: '__updatePosition',
      validate : '_validateConnectionPoint'
    },
    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass'
    },

    showDirection: {
      check: ['none', 'source', 'target', 'both'],
      init: 'none',
      apply: '_applyShowDirection'
    },

    inverted: {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _path: null,
    /**
     * @type {MutationObserver}
     */
    _sourceObserver: null,
    /**
     * @type {MutationObserver}
     */
    _targetObserver: null,

    _applySource(value, oldValue) {
      if (oldValue) {
        this._sourceObserver.disconnect();
      }
      if (value) {
        this._init();
        this._sourceObserver.observe(value, {attributes: true});
      }
    },

    _applyTarget(value, oldValue) {
      if (oldValue) {
        this._targetObserver.disconnect();
      }
      if (value) {
        this._init();
        this._targetObserver.observe(value, {attributes: true});
      }
    },

    _init() {
      const source = this.getSource();
      const target = this.getTarget();

      if (source && target) {
        // find common root
        let sourceRoot = source.ownerSVGElement;
        let targetRoot = target.ownerSVGElement;
        while (sourceRoot !== targetRoot) {
          let changed = false;
          if (sourceRoot.ownerSVGElement) {
            sourceRoot = sourceRoot.ownerSVGElement;
            changed = true;
          }
          if (targetRoot.ownerSVGElement) {
            targetRoot = targetRoot.ownerSVGElement;
            changed = true;
          }
          if (!changed) {
            break;
          }
        }
        const root = sourceRoot || targetRoot;
        this.setRoot(root);

        let id = '';
        let appendC = false;
        if (source.hasAttribute('id')) {
          id += source.getAttribute('id');
        } else {
          id += source.nodeName;
          appendC = true;
        }
        id += '-';
        if (target.hasAttribute('id')) {
          id += target.getAttribute('id');
        } else {
          id += target.nodeName;
          appendC = true;
        }
        if (appendC) {
          id += cv.ui.structure.tile.components.svg.Connector.C++;
        }

        let path = root.querySelector('#' + id);
        this.setId(id);
        if (!path) {
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('id', id);
          path.setAttribute('stroke', 'var(--borderColor)');
          path.setAttribute('fill', 'transparent');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('class', 'connection');
          root.insertBefore(path, root.firstChild);
        }
        this._path = path;
        setTimeout(() => {
          this.__updatePosition();
        }, 1000);
      }
    },

    _onMutation(records, observer) {
      for (const mutation of records) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'x' || mutation.attributeName === 'y')) {
          this._debouncedUpdatePosition();
        }
      }
    },

    __updatePosition() {
      const source = this.getSource();
      const target = this.getTarget();

      if (source && target && this._path) {
        let sourceCoord = cv.util.Svg.getBBox(source);
        let targetCoord = cv.util.Svg.getBBox(target);

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        let sourceConnectionPoint = this.getSourceConnectionPoint();
        let targetConnectionPoint = this.getTargetConnectionPoint();
        if (sourceConnectionPoint === 'auto' || targetConnectionPoint === 'auto') {
          if (Math.abs(sourceCoord.x - targetCoord.x) < Math.abs(sourceCoord.y - targetCoord.y)) {
            // connection mainly on Y axis
            if (sourceConnectionPoint === 'auto') {
              sourceConnectionPoint = sourceCoord.y < targetCoord.y ? 'bottom' : 'top';
            }
            if (targetConnectionPoint === 'auto') {
              targetConnectionPoint = sourceCoord.y < targetCoord.y ? 'top' : 'bottom';
            }
          } else {
            // connection mainly on X axis
            if (sourceConnectionPoint === 'auto') {
              sourceConnectionPoint = sourceCoord.x < targetCoord.x ? 'right' : 'left';
            }
            if (targetConnectionPoint === 'auto') {
              targetConnectionPoint = sourceCoord.x < targetCoord.x ? 'left' : 'right';
            }
          }
        }

        switch (sourceConnectionPoint) {
          case 'bottom':
            startX = sourceCoord.cx;
            startY = sourceCoord.y + sourceCoord.height;
            break;

          case 'top':
            startX = sourceCoord.cx;
            startY = sourceCoord.y;
            break;

          case 'right':
            startX = sourceCoord.x + sourceCoord.width;
            startY = sourceCoord.cy;
            break;

          case 'left':
            startX = sourceCoord.x;
            startY = sourceCoord.cy;
            break;
        }

        switch (targetConnectionPoint) {
          case 'bottom':
            endX = targetCoord.cx;
            endY = targetCoord.y + targetCoord.height;
            break;

          case 'top':
            endX = targetCoord.cx;
            endY = targetCoord.y;
            break;

          case 'right':
            endX = targetCoord.x + targetCoord.width;
            endY = targetCoord.cy;
            break;

          case 'left':
            endX = targetCoord.x;
            endY = targetCoord.cy;
            break;
        }

        // make sure that we always draw the path from left to right
        if (startX > endX) {
          this.drawPath(this._path, endX, endY, startX, startY);
          this.setInverted(true);
        } else {
          this.drawPath(this._path, startX, startY, endX, endY);
        }
      }
    },

    drawPath(path, startX, startY, endX, endY) {
      const deltaX = (endX - startX) * 0.15;
      const deltaY = (endY - startY) * 0.15;
      // for further calculations which ever is the shortest distance
      const delta  =  deltaY < Math.abs(deltaX) ? deltaY : Math.abs(deltaX);

      let arc1 = 0;
      let arc2 = 1;
      if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
      }

      // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
      path.setAttribute('d',  'M'  + startX + ' ' + startY +
        ' V' + (startY + delta) +
        ' A' + delta + ' ' +  delta + ' 0 0 ' + arc1 + ' ' + (startX + delta*Math.sign(deltaX)) + ' ' + (startY + 2*delta) +
        ' H' + (endX - delta*Math.sign(deltaX)) +
        ' A' + delta + ' ' +  delta + ' 0 0 ' + arc2 + ' ' + endX + ' ' + (startY + 3*delta) +
        ' V' + endY);
    },

    _applyRoot(root, oldRoot) {
      if (oldRoot) {
        oldRoot.removeEventListener('resize', this._updatePosition);
      }
      if (root) {
        root.addEventListener('resize', this._updatePosition);
        this._initArrowMarkers(root);
      }
    },

    _applyStyleClass(value, oldValue) {
      if (this._path) {
        if (oldValue) {
          this._path.classList.remove(oldValue);
        }
        if (value) {
          this._path.classList.add(value);
        }
      }
    },

    _applyShowDirection(value) {
      let markerId = '';
      if (value === 'none') {
        this._path.removeAttribute('marker-start');
        this._path.removeAttribute('marker-end');
      } else if (value === 'both') {
        markerId = this.__getMarkerId();
        this._path.setAttribute('marker-start', `url(#${markerId})`);
        this._path.setAttribute('marker-end', `url(#${markerId})`);
      } else if (value === 'source' || this.isInverted()) {
        markerId = this.__getMarkerId();
        this._path.setAttribute('marker-start', `url(#${markerId})`);
        this._path.removeAttribute('marker-end');
      } else if (value === 'target' || this.isInverted()) {
        markerId = this.__getMarkerId();
        this._path.removeAttribute('marker-start');
        this._path.setAttribute('marker-end', `url(#${markerId})`);
      }
    },

    __getMarkerId() {
      const styleClass = this.getStyleClass();
      const arrowId = 'arrow';
      if (styleClass) {
        const id = `${arrowId}-${styleClass}`;
        // check if we have a marker with this ID
        const root = this.getRoot();
        try {
          let marker = root.querySelector(`#${id}`);
          if (!marker) {
            const baseMarker = root.querySelector(`#${arrowId}`);
            const newMarker = baseMarker.cloneNode(true);
            newMarker.removeAttribute('fill');
            newMarker.setAttribute('class', 'connection ' + styleClass);
            newMarker.setAttribute('id', id);
            root.querySelector('defs').appendChild(newMarker);
          }
        } catch (e) {
          this.log.error('error getting arrow:', e.errorMessage);
        }
        return id;
      }
      return arrowId;
    },

    _validateConnectionPoint(value) {
      if (!['top', 'right', 'bottom', 'left', 'auto'].includes(value)) {
        throw new qx.core.ValidationError(
          'Validation Error: ', value + ' is no valid connection point.'
        );
      }
    },

    _initArrowMarkers(svg) {
      let defs = svg.querySelector('defs');
      const ns = 'http://www.w3.org/2000/svg';
      if (!defs) {
        defs = document.createElementNS(ns, 'defs');
        svg.appendChild(defs);
      }

      // define paths for re-use
      let arrowPath = defs.querySelector('#h-arrow-path');
      if (!arrowPath) {
        arrowPath = document.createElementNS(ns, 'path');
        arrowPath.setAttribute('id', 'h-arrow-path');
        arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        defs.appendChild(arrowPath);
      }

      let vertArrowPath = defs.querySelector('#v-arrow-path');
      if (!vertArrowPath) {
        vertArrowPath = document.createElementNS(ns, 'path');
        vertArrowPath.setAttribute('id', 'v-arrow-path');
        vertArrowPath.setAttribute('d', 'M 0 10 L 10 10 L 5 0 z');
        defs.appendChild(vertArrowPath);
      }

      let arrow = defs.querySelector('#arrow');
      if (!arrow) {
        arrow = document.createElementNS(ns, 'marker');
        arrow.setAttribute('id', 'arrow');
        arrow.setAttribute('viewBox', '0 0 10 10');
        arrow.setAttribute('refX', '10');
        arrow.setAttribute('refY', '5');
        arrow.setAttribute('markerWidth', '5');
        arrow.setAttribute('markerHeight', '5');
        arrow.setAttribute('fill', 'var(--borderColor)');
        arrow.setAttribute('orient', 'auto-start-reverse');
        let use = document.createElementNS(ns, 'use');
        use.setAttribute('href', '#h-arrow-path');
        arrow.appendChild(use);
        defs.appendChild(arrow);
      }

      let vertArrow = defs.querySelector('#vertical-arrow');
      if (!vertArrow) {
        const vertArrow = arrow.cloneNode(true);
        vertArrow.setAttribute('id', 'vertical-arrow');
        vertArrow.setAttribute('orient', '270');
        defs.appendChild(vertArrow);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._path = null;
    this._sourceObserver.disconnect();
    this._sourceObserver = null;
    this._targetObserver.disconnect();
    this._targetObserver = null;
  }
});
