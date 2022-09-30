function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "construct": true,
        "require": true
      },
      "cv.Application": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Mapping.js 
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
   * Mapping maps a value to another value that can be used to show e.g. the current state.
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.elements.Mapping', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.elements.AbstractCustomElement.constructor.call(this, element);
      this.__P_83_0 = {};
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_83_0: null,
      _applyConnected: function _applyConnected(value, oldValue, name) {
        cv.ui.structure.tile.elements.Mapping.superclass.prototype._applyConnected.call(this, value, oldValue, name); // avoid adding styling elements here as they inherit this method but call the super method too


        if (this._element.tagName.toLowerCase().endsWith('mapping')) {
          if (value) {
            cv.Application.structureController.addMapping(this._element.getAttribute('name'), this);
          } else {
            cv.Application.structureController.removeMapping(this._element.getAttribute('name'));
          }
        }
      },

      /**
       *
       * @param val {variant}
       * @param store {Map<string, variant>?} optional stored values from other addresses
       * @return {string|*|string}
       */
      mapValue: function mapValue(val, store) {
        var _this = this;

        if (Object.prototype.hasOwnProperty.call(this.__P_83_0, val)) {
          return this.__P_83_0[val];
        }

        var mappedValue = '' + val;

        var exactMatch = this._element.querySelector(':scope > entry[value="' + val + '"]');

        var type = this._element.hasAttribute('type') ? this._element.getAttribute('type') : 'string';

        if (exactMatch) {
          mappedValue = this._convert(exactMatch.innerHTML.trim(), type);
          this.__P_83_0[val] = mappedValue;
          return mappedValue;
        }

        var formula = this._element.querySelector(':scope > formula');

        if (formula) {
          if (!formula._formula) {
            var content = formula.textContent;
            formula._formula = new Function('x', 'store', 'let y;' + content + '; return y;');
          }

          mappedValue = this._convert(formula._formula(val, store), type);
          return mappedValue;
        }

        var entries = this._element.querySelectorAll(':scope > entry');

        var defaultValue = null;
        var mapped = Array.from(entries).some(function (entry) {
          var matches = false;
          var isDefaultValue = entry.hasAttribute('default') && entry.getAttribute('default') === 'true';

          if (entry.hasAttribute('value')) {
            var value = entry.getAttribute('value');

            if (value === (val ? val : 'NULL') || value === '*') {
              mappedValue = _this._convert(entry.innerHTML.trim(), type);
              matches = true;
            }

            if (isDefaultValue) {
              defaultValue = _this._convert(value, type);
            }
          } else if (entry.hasAttribute('range-min')) {
            var rangeMin = parseFloat(entry.getAttribute('range-min'));
            var rangeMax = entry.hasAttribute('range-max') ? parseFloat(entry.getAttribute('range-max')) : Number.POSITIVE_INFINITY;
            var floatValue = parseFloat(val);

            if (rangeMin <= floatValue && floatValue <= rangeMax) {
              mappedValue = _this._convert(entry.innerHTML.trim(), type);
              matches = true;
            }

            if (isDefaultValue) {
              defaultValue = rangeMin;
            }
          }

          return matches;
        });

        if (!mapped && defaultValue !== null) {
          mappedValue = this.mapValue(defaultValue);
        }

        this.__P_83_0[val] = mappedValue;
        return mappedValue;
      },
      _convert: function _convert(value, type) {
        switch (type.toLowerCase()) {
          case 'boolean':
            return value === 'true';

          case 'integer':
            return parseInt(value);

          case 'float':
            return parseFloat(value);

          default:
            return value;
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_83_0 = null;
    },
    defer: function defer(Clazz) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'mapping', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, Clazz);
        }

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.Mapping.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mapping.js.map?dt=1664560747800