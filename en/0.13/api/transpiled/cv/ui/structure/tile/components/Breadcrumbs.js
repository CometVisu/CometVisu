function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
      "qx.event.message.Bus": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Menu.js
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
   * Generates breadcrumb navigation bar down to the currently shown page.
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Breadcrumbs', {
    extend: cv.ui.structure.tile.components.AbstractComponent,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {},

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _init: function _init() {
        qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._update, this);
      },
      _update: function _update() {
        var _list;

        var list = this._element.querySelector(':scope > ul');

        if (!list) {
          list = document.createElement('ul');

          this._element.appendChild(list);
        }

        var listItems = [];
        var activePage = document.body.querySelector('cv-page.active');
        var startPage = document.body.querySelector('main > cv-page:first-of-type');

        if (activePage && activePage !== startPage) {
          var currentPage = activePage;

          while (currentPage) {
            var li = this._createListItem(currentPage.getAttribute('id'), currentPage.getAttribute('name'));

            listItems.unshift(li);
            var parent = currentPage.parentElement;

            while (parent) {
              if (parent.localName === 'cv-page') {
                currentPage = parent;
                break;
              }

              parent = parent.parentElement;
            }

            if (!parent || currentPage === startPage) {
              break;
            }
          }
        }

        var start = list.querySelector(':scope > li.start');

        if (!start) {
          start = this._createListItem(startPage.getAttribute('id'), startPage.getAttribute('name'));
          start.classList.add('start');
        }

        listItems.unshift(start);

        (_list = list).replaceChildren.apply(_list, listItems);
      },
      _createListItem: function _createListItem(pageId, text) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', '#' + pageId);
        a.textContent = text;
        li.appendChild(a);
        return li;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this._update, this);
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'breadcrumbs', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Breadcrumbs.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Breadcrumbs.js.map?dt=1685978101580