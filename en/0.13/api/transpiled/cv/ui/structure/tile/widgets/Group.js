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
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "qx.event.Registration": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Group.js 
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
   * Creates a group of widgets that can be hidden (works like the <detail> HTML Element)
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.widgets.Group', {
    extend: cv.ui.structure.tile.components.AbstractComponent,

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      _init: function _init() {
        cv.ui.structure.tile.widgets.Group.superclass.prototype._init.call(this);

        var element = this._element;
        var label = null;
        var summary = null;
        var needsSummary = element.hasAttribute('name') || element.hasAttribute('icon');

        if (needsSummary) {
          summary = element.querySelector(':scope > summary');

          if (!summary) {
            summary = document.createElement('summary');
            element.insertBefore(summary, element.firstChild);
          }

          if (element.hasAttribute('name')) {
            label = element.querySelector(':scope > summary > label.title');

            if (!label) {
              label = document.createElement('label');
              label.classList.add('title');
              summary.insertBefore(label, summary.firstChild);
            }

            label.classList.add('last-of-title');
            label.textContent = element.getAttribute('name');
          }

          if (element.hasAttribute('icon')) {
            var icon = element.querySelector(':scope > summary > cv-icon.title');

            if (!icon) {
              icon = document.createElement('cv-icon');
              icon.classList.add('title');
              summary.insertBefore(icon, summary.firstChild);
            }

            if (!label) {
              icon.classList.add('last-of-title');
            }

            icon.classList.add(element.getAttribute('icon'));
          }
        }

        var empty = !element.querySelector(':scope > *:not(summary)');

        if (empty) {
          element.classList.add('empty');
        } else if (summary) {
          qx.event.Registration.addListener(summary, 'click', this._toggleOpen, this);
        }
      },
      _toggleOpen: function _toggleOpen() {
        if (this._element.hasAttribute('open')) {
          this._element.removeAttribute('open');
        } else {
          this._element.setAttribute('open', 'true');
        }
      },

      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        if (!cv.ui.structure.tile.widgets.Group.superclass.prototype.onStateUpdate.call(this, ev)) {
          if (ev.detail.target === 'summary') {
            var target = this._element.querySelector(':scope > summary > label.value');

            if (!target) {
              target = document.createElement('label');
              target.classList.add('value');

              var summary = this._element.querySelector(':scope > summary');

              summary.appendChild(target);
            }

            target.textContent = ev.detail.state;
          } else {
            this.debug('unhandled address target', ev.detail.target);
          }
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'group', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.widgets.Group.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Group.js.map?dt=1664788499392