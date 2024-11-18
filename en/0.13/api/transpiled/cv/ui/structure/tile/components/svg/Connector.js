function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.Function": {
        "construct": true
      },
      "cv.ui.structure.tile.components.energy.PowerEntity": {},
      "cv.util.Svg": {},
      "qx.core.ValidationError": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
   *
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.structure.tile.components.svg.Connector', {
    extend: qx.core.Object,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(source, target) {
      qx.core.Object.constructor.call(this);
      this._updatePosition = this.__P_89_0.bind(this);
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
      C: 0
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
        check: 'cv.ui.structure.tile.components.energy.PowerEntity',
        apply: '_applySource',
        nullable: true
      },
      target: {
        check: 'cv.ui.structure.tile.components.energy.PowerEntity',
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
        apply: "__P_89_0",
        validate: '_validateConnectionPoint'
      },
      targetConnectionPoint: {
        check: ['top', 'right', 'bottom', 'left', 'auto'],
        init: 'auto',
        apply: "__P_89_0",
        validate: '_validateConnectionPoint'
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
        init: false,
        apply: '_applyShowDirection'
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
      _applySource: function _applySource(value, oldValue) {
        if (oldValue) {
          this._sourceObserver.disconnect();
        }
        if (value) {
          this._init();
          this._sourceObserver.observe(value.getSvg(), {
            attributes: true
          });
        }
      },
      _applyTarget: function _applyTarget(value, oldValue) {
        if (oldValue) {
          this._targetObserver.disconnect();
        }
        if (value) {
          this._init();
          this._targetObserver.observe(value.getSvg(), {
            attributes: true
          });
        }
      },
      _init: function _init() {
        var _this = this;
        var sourceEntity = this.getSource();
        var targetEntity = this.getTarget();
        if (sourceEntity && targetEntity) {
          var source = sourceEntity.getSvg();
          var target = targetEntity.getSvg();
          // find common root
          var sourceRoot = source.ownerSVGElement;
          var targetRoot = target.ownerSVGElement;
          while (sourceRoot !== targetRoot) {
            var changed = false;
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
          var root = sourceRoot || targetRoot;
          this.setRoot(root);
          var id = '';
          var appendC = false;
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
          var path = root.querySelector('#' + id);
          this.setId(id);
          if (!path) {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path._instance = this;
            path.setAttribute('id', id);
            path.setAttribute('stroke', 'var(--borderColor)');
            path.setAttribute('fill', 'transparent');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('class', 'connection');
            root.insertBefore(path, root.firstChild);
          }
          this._path = path;
          setTimeout(function () {
            _this.__P_89_0();
          }, 1000);
        }
      },
      _onMutation: function _onMutation(records, observer) {
        var _iterator = _createForOfIteratorHelper(records),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            if (mutation.type === 'attributes' && (mutation.attributeName === 'x' || mutation.attributeName === 'y')) {
              this._debouncedUpdatePosition();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      __P_89_0: function __P_89_0() {
        var _this2 = this;
        var retried = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var sourceEntity = this.getSource();
        var targetEntity = this.getTarget();
        if (sourceEntity && targetEntity && this._path) {
          var source = sourceEntity.getSvg();
          var target = targetEntity.getSvg();
          var sourceCoord = cv.util.Svg.getBBox(source);
          var targetCoord = cv.util.Svg.getBBox(target);
          var startX = 0;
          var startY = 0;
          var endX = 0;
          var endY = 0;
          var sourceConnectionPoint = this.getSourceConnectionPoint();
          var targetConnectionPoint = this.getTargetConnectionPoint();
          if (sourceConnectionPoint === 'auto' || targetConnectionPoint === 'auto') {
            var dx = targetCoord.cx - sourceCoord.cx;
            var dy = targetCoord.cy - sourceCoord.cy;
            var l = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (l === 0) {
              if (!retried) {
                setTimeout(function () {
                  _this2._updatePosition(true);
                }, 1000);
              }
              return;
            }
            var rsl = sourceEntity.getRadius() / l;
            var rtl = targetEntity.getRadius() / l;
            var yS = sourceCoord.cy + dy * rsl;
            var yT = targetCoord.cy - dy * rtl;
            var xS = sourceCoord.cx + dx * rsl;
            var xT = targetCoord.cx - dx * rtl;
            this.debug(this.getId(), "(".concat(xS, ", ").concat(yS, ") -> (").concat(xT, ", ").concat(yT, ")"));
            if (sourceConnectionPoint === 'auto') {
              startX = xS;
              startY = yS;
            }
            if (targetConnectionPoint === 'auto') {
              endX = xT;
              endY = yT;
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
            this.setInverted(true);
            this.drawPath(this._path, endX, endY, startX, startY);
          } else {
            this.setInverted(false);
            this.drawPath(this._path, startX, startY, endX, endY);
          }
        }
      },
      drawPath: function drawPath(path, startX, startY, endX, endY) {
        /* const deltaX = (endX - startX) * 0.15;
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
         ' V' + endY);*/

        // draw straight line
        path.setAttribute('d', "M".concat(startX, " ").concat(startY, " L ").concat(endX, " ").concat(endY));
      },
      _applyRoot: function _applyRoot(root, oldRoot) {
        if (oldRoot) {
          oldRoot.removeEventListener('resize', this._updatePosition);
        }
        if (root) {
          root.addEventListener('resize', this._updatePosition);
          this._initArrowMarkers(root);
        }
      },
      _applyStyleClass: function _applyStyleClass(value, oldValue) {
        if (this._path) {
          if (oldValue) {
            this._path.classList.remove(oldValue);
          }
          if (value) {
            this._path.classList.add(value);
          }
          this._applyShowDirection();
        }
      },
      _applyShowDirection: function _applyShowDirection() {
        var value = this.getShowDirection();
        var markerId = '';
        if (value === 'none') {
          this._path.removeAttribute('marker-start');
          this._path.removeAttribute('marker-end');
        } else if (value === 'both') {
          markerId = this.__P_89_1();
          this._path.setAttribute('marker-start', "url(#".concat(markerId, ")"));
          this._path.setAttribute('marker-end', "url(#".concat(markerId, ")"));
        } else if (value === 'source' && !this.isInverted() || value === 'target' && this.isInverted()) {
          markerId = this.__P_89_1();
          this._path.setAttribute('marker-start', "url(#".concat(markerId, ")"));
          this._path.removeAttribute('marker-end');
        } else if (value === 'target' && !this.isInverted() || value === 'source' && this.isInverted()) {
          markerId = this.__P_89_1();
          this._path.removeAttribute('marker-start');
          this._path.setAttribute('marker-end', "url(#".concat(markerId, ")"));
        }
      },
      __P_89_1: function __P_89_1() {
        var arrowId = 'arrow';
        var styleClass = this.getStyleClass();
        if (styleClass) {
          var id = "".concat(arrowId, "-").concat(styleClass);
          // check if we have a marker with this ID
          var root = this.getRoot();
          try {
            var marker = root.querySelector("#".concat(id));
            if (!marker) {
              var baseMarker = root.querySelector("#".concat(arrowId));
              var newMarker = baseMarker.cloneNode(true);
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
      _validateConnectionPoint: function _validateConnectionPoint(value) {
        if (!['top', 'right', 'bottom', 'left', 'auto'].includes(value)) {
          throw new qx.core.ValidationError('Validation Error: ', value + ' is no valid connection point.');
        }
      },
      _initArrowMarkers: function _initArrowMarkers(svg) {
        var defs = svg.querySelector('defs');
        var ns = 'http://www.w3.org/2000/svg';
        if (!defs) {
          defs = document.createElementNS(ns, 'defs');
          svg.appendChild(defs);
        }

        // define paths for re-use
        var arrowPath = defs.querySelector('#h-arrow-path');
        if (!arrowPath) {
          arrowPath = document.createElementNS(ns, 'path');
          arrowPath.setAttribute('id', 'h-arrow-path');
          arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
          defs.appendChild(arrowPath);
        }
        /*
              let vertArrowPath = defs.querySelector('#v-arrow-path');
              if (!vertArrowPath) {
                vertArrowPath = document.createElementNS(ns, 'path');
                vertArrowPath.setAttribute('id', 'v-arrow-path');
                vertArrowPath.setAttribute('d', 'M 0 10 L 10 10 L 5 0 z');
                defs.appendChild(vertArrowPath);
              }*/

        var arrow = defs.querySelector('#arrow');
        if (!arrow) {
          arrow = document.createElementNS(ns, 'marker');
          arrow.setAttribute('id', 'arrow');
          arrow.setAttribute('viewBox', '0 0 10 10');
          arrow.setAttribute('refX', '10');
          arrow.setAttribute('refY', '5');
          arrow.setAttribute('markerWidth', '5');
          arrow.setAttribute('markerHeight', '5');
          arrow.setAttribute('markerUnits', 'strokeWidth');
          arrow.setAttribute('fill', 'var(--borderColor)');
          arrow.setAttribute('orient', 'auto-start-reverse');
          var use = document.createElementNS(ns, 'use');
          use.setAttribute('href', '#h-arrow-path');
          arrow.appendChild(use);
          defs.appendChild(arrow);
        }

        /*let vertArrow = defs.querySelector('#vertical-arrow');
        if (!vertArrow) {
          const vertArrow = arrow.cloneNode(true);
          vertArrow.setAttribute('id', 'vertical-arrow');
          vertArrow.setAttribute('orient', '270');
          defs.appendChild(vertArrow);
        }*/
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._path = null;
      this._sourceObserver.disconnect();
      this._sourceObserver = null;
      this._targetObserver.disconnect();
      this._targetObserver = null;
    }
  });
  cv.ui.structure.tile.components.svg.Connector.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Connector.js.map?dt=1731948097601