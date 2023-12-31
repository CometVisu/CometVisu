function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.svg.Connector": {},
      "cv.ui.structure.tile.components.energy.PowerEntity": {}
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
   * Mixin for all SVG based components that can be connected to each other.
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Mixin.define('cv.ui.structure.tile.components.energy.MConnectable', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      this._connections = [];
      this._inverseConnections = [];
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connectTo: {
        check: 'String',
        nullable: true,
        apply: '_applyConnectTo'
      },
      connectFrom: {
        check: 'String',
        nullable: true,
        apply: '_applyConnectFrom'
      },
      connectionPoints: {
        check: 'String',
        init: 'auto',
        apply: '_applyConnectionPoints'
      },
      useConnectionSum: {
        check: 'Boolean',
        init: false,
        apply: '_applyUseConnectionSum'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _connectorTo: null,
      _connectorFrom: null,
      _useConnectionsSumAsValue: null,
      /**
       * @type {Array<cv.ui.structure.tile.components.energy.PowerEntity>}
       */
      _connections: null,
      /**
       * @type {Array<cv.ui.structure.tile.components.energy.PowerEntity>}
       */
      _inverseConnections: null,
      /**
       * Adds an incoming connection from another PowerEntity
       * @param other {cv.ui.structure.tile.components.energy.PowerEntity} connected from other to this
       */
      addConnection: function addConnection(other) {
        if (!this._connections.includes(other)) {
          this._connections.push(other);
          if (this.getUseConnectionSum()) {
            other.addListener('changeValue', this._updateConnectionsSum, this);
          }
        }
      },
      /**
       * Adds an incoming inverse connection from another PowerEntity.
       * Inverse connection means that the sign of the other entity is flipped for summing all values
       * @param other {cv.ui.structure.tile.components.energy.PowerEntity} connected from other to this
       */
      addInverseConnection: function addInverseConnection(other) {
        if (!this._inverseConnections.includes(other)) {
          this._inverseConnections.push(other);
          if (this.getUseConnectionSum()) {
            other.addListener('changeValue', this._updateConnectionsSum, this);
          }
        }
      },
      /**
       * Remove an incoming connection from another PowerEntity
       * @param other {cv.ui.structure.tile.components.energy.PowerEntity}
       */
      removeConnection: function removeConnection(other) {
        if (this._connections.includes(other)) {
          this._connections.remove(other);
          if (this.getUseConnectionSum()) {
            other.removeListener('changeValue', this._updateConnectionsSum, this);
          }
        }
      },
      /**
       * Remove an incoming inverse connection from another PowerEntity
       * @param other {cv.ui.structure.tile.components.energy.PowerEntity}
       */
      removeInverseConnection: function removeInverseConnection(other) {
        if (this._inverseConnections.includes(other)) {
          this._inverseConnections.remove(other);
          if (this.getUseConnectionSum()) {
            other.removeListener('changeValue', this._updateConnectionsSum, this);
          }
        }
      },
      _applyUseConnectionSum: function _applyUseConnectionSum(value) {
        if (value) {
          var _iterator = _createForOfIteratorHelper(this._connections),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var other = _step.value;
              // refresh connections
              other.removeListener('changeValue', this._updateConnectionsSum, this);
              other.addListener('changeValue', this._updateConnectionsSum, this);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(this._inverseConnections),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _other = _step2.value;
              // refresh connections
              _other.removeListener('changeValue', this._updateConnectionsSum, this);
              _other.addListener('changeValue', this._updateConnectionsSum, this);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      },
      _updateConnectionsSum: function _updateConnectionsSum() {
        var sum = 0.0;
        var _iterator3 = _createForOfIteratorHelper(this._connections),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var other = _step3.value;
            sum += other.getValue();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        var _iterator4 = _createForOfIteratorHelper(this._inverseConnections),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _other2 = _step4.value;
            sum -= _other2.getValue();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        this.setValue(sum);
      },
      _updateDirection: function _updateDirection() {
        var value = Math.round(this.getValue());
        var connectors = [this._connectorTo, this._connectorFrom];
        for (var _i = 0, _connectors = connectors; _i < _connectors.length; _i++) {
          var connector = _connectors[_i];
          if (connector) {
            if (value < 0) {
              connector.setShowDirection('source');
            } else if (value > 0) {
              connector.setShowDirection('target');
            } else {
              connector.setShowDirection('none');
            }
          }
        }
      },
      _applyConnectTo: function _applyConnectTo(targetId) {
        if (this._svg && targetId) {
          var parent = this._element.parentElement;
          var target = parent.querySelector('#' + targetId);
          if (target && target.nodeName.toLowerCase() === 'cv-power-entity') {
            if (!this._connectorTo) {
              this._connectorTo = this._initConnection(this, target._instance);
              this._applyConnectionPoints(this.getConnectionPoints());
              this._updateDirection();
              // we are the power source for the target
              target._instance.addConnection(this);
            } else {
              this._connectorTo.setTarget(target._instance);
            }
          }
        }
        if (targetId) {
          this.registerPreMappingHook(this.preMappingHook, this);
        } else {
          this.unregisterPreMappingHook(this.preMappingHook);
        }
      },
      _applyConnectFrom: function _applyConnectFrom(sourceId) {
        if (this._svg && sourceId) {
          var parent = this._element.parentElement;
          var source = parent.querySelector('#' + sourceId);
          if (source && source.nodeName.toLowerCase() === 'cv-power-entity') {
            if (!this._connectorFrom) {
              this._connectorFrom = this._initConnection(source._instance, this);
              this._applyConnectionPoints(this.getConnectionPoints());
              this._updateDirection();
              // we take power from the target
              source._instance.addInverseConnection(this);
            } else {
              this._connectorFrom.setSource(source._instance);
            }
          }
        }
      },
      /**
       *
       * @param source {cv.ui.structure.tile.components.energy.PowerEntity}
       * @param target {cv.ui.structure.tile.components.energy.PowerEntity}
       * @returns {cv.ui.structure.tile.components.svg.Connector}
       * @private
       */
      _initConnection: function _initConnection(source, target) {
        var connector = new cv.ui.structure.tile.components.svg.Connector(source, target);
        if (source.hasNoValue()) {
          var targetId = target.getElement().getAttribute('id');
          var parentElement = this._element.parentElement.querySelector('#' + targetId);
          if (parentElement && parentElement._instance && parentElement._instance instanceof cv.ui.structure.tile.components.energy.PowerEntity && !parentElement._instance.hasNoValue()) {
            // use styleClass from target
            parentElement._instance.bind('styleClass', connector, 'styleClass');
          }
        } else {
          this.bind('styleClass', connector, 'styleClass');
        }
        return connector;
      },
      _applyConnectionPoints: function _applyConnectionPoints(value) {
        if (value) {
          var connectors = [];
          if (this._connectorTo) {
            connectors.push(this._connectorTo);
          }
          if (this._connectorFrom) {
            connectors.push(this._connectorFrom);
          }
          for (var _i2 = 0, _connectors2 = connectors; _i2 < _connectors2.length; _i2++) {
            var connector = _connectors2[_i2];
            if (value === 'auto') {
              connector.set({
                sourceConnectionPoint: 'auto',
                targetConnectionPoint: 'auto'
              });
            } else {
              var _value$split = value.split('-'),
                _value$split2 = _slicedToArray(_value$split, 2),
                source = _value$split2[0],
                target = _value$split2[1];
              connector.set({
                sourceConnectionPoint: source,
                targetConnectionPoint: target
              });
            }
          }
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      var source = this.getSource();
      var target = this.getTarget();
      if (target) {
        target.removeConnection(this);
      }
      if (source) {
        source.removeInverseConnection(this);
      }
      this._disposeObjects('_connectorTo', '_connectorFrom');
      this._connections.clear();
      this._inverseConnections.clear();
    }
  });
  cv.ui.structure.tile.components.energy.MConnectable.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MConnectable.js.map?dt=1704036753770