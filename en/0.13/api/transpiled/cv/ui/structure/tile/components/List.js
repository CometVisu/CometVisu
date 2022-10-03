function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MRefresh": {
        "require": true
      },
      "cv.io.Fetch": {},
      "qx.data.Array": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* List.js 
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
   * Generates a list of items. A &lt;template&gt;-element defines the content of the list-items and a model is used to
   * generate those items and apply the models content to the list-items.
   * It allows custom Javascript code in a &lt;script&gt;-Element to fill the model or address-Elements as model source.
   * The model can be refreshed in a time defined interval, which is set by the 'refresh' attribute.
   *
   * @widgetexample <settings>
   *    <caption>Example list</caption>
   *    <screenshot name="list_simple"/>
   *  </settings>
      <cv-list refresh="10">
        <model>
          <script><![CDATA[
           for (let i = 0; i < Math.round(Math.random()*10); i++) {
             model.push({
               label: 'This is list item no ' + i,
               subLabel: 'Sublabel number ' + i
             })
           }
           ]]>
           </script>
         </model>
         <template>
           <li>
             <label class="primary">${label}</label>
             <label class="secondary">${subLabel}</label>
           </li>
         </template>
         <template when="empty">
           <li>
             <label class="primary">Model is empty!</label>
           </li>
         </template>
     </cv-list>
   */
  qx.Class.define('cv.ui.structure.tile.components.List', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      value: {
        refine: true,
        init: []
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _target: null,
      _timer: null,
      _model: null,
      _getModel: null,
      _filterModel: null,
      _sortModel: null,
      _limit: null,
      _init: function _init() {
        var _this = this;

        var element = this._element;
        this._model = [];
        var refreshOnUpdate = false;
        var model = element.querySelector('model');

        if (!model) {
          this.error('cv-list needs a model');
          return;
        }

        if (model.hasAttribute('filter')) {
          this._filterModel = new Function('item', 'index', '"use strict"; return ' + model.getAttribute('filter'));
        }

        if (model.hasAttribute('limit')) {
          this._limit = parseInt(model.getAttribute('limit'));
        }

        var readAddresses = model.querySelectorAll(':scope > cv-address:not([mode="write"])');

        if (model.hasAttribute('sort-by')) {
          var sortBy = model.getAttribute('sort-by'); // reverse order in 'desc' sort mode

          var sortModifier = model.getAttribute('sort-mode') === 'desc' ? -1 : 1;

          this._sortModel = function (left, right) {
            var leftVal = left[sortBy];
            var rightVal = right[sortBy];

            if (leftVal === rightVal) {
              return 0;
            } else if (_typeof(leftVal) === _typeof(rightVal)) {
              switch (_typeof(leftVal)) {
                case 'number':
                  return (leftVal - rightVal) * sortModifier;

                case 'boolean':
                  return (leftVal ? -1 : 1) * sortModifier;

                case 'string':
                  return leftVal.localeCompare(rightVal) * sortModifier;

                default:
                  return JSON.stringify(leftVal).localeCompare(JSON.stringify(rightVal)) * sortModifier;
              }
            } else if (leftVal === undefined || leftVal === null) {
              return 1 * sortModifier;
            } else if (rightVal === undefined || rightVal === null) {
              return -1 * sortModifier;
            }

            return 0;
          };
        }

        if (model.hasAttribute('src')) {
          // fetch from url
          this._getModel = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return cv.io.Fetch.fetch(model.getAttribute('src'), null, model.getAttribute('proxy') === 'true');

                  case 2:
                    res = _context.sent;
                    return _context.abrupt("return", res);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        } else {
          var script = model.querySelector(':scope > script');
          var data = model.querySelectorAll(':scope > cv-data');

          if (script) {
            this._getModel = new Function('"use strict";let model = []; ' + script.innerText.trim() + '; return model');
            this._model = this._getModel();
          } else if (readAddresses.length > 0) {
            // model has an address that triggers a refresh on update, so we just have to read the model from the updated value
            this._getModel = this.getValue;
            refreshOnUpdate = true;
          } else if (data.length > 0) {
            this._model = [];

            this._getModel = function () {
              return _this._model;
            };

            data.forEach(function (elem, i) {
              var d = {
                index: i
              };

              var _iterator = _createForOfIteratorHelper(elem.attributes),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var a = _step.value;
                  d[a.name] = a.value;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              _this._model.push(d);
            });
          } else {
            this.error('cv-list > model must have at least one read address, src-attribute, cv-data child or a script that fills the model.');
            return;
          }
        }

        if (readAddresses.length > 0) {
          element.addEventListener('stateUpdate', function (ev) {
            return _this.onStateUpdate(ev);
          });
        }

        if (!refreshOnUpdate) {
          if (this.isVisible()) {
            // only load when visible
            this.refresh();
          }

          if (element.hasAttribute('refresh')) {
            this.setRefresh(parseInt(element.getAttribute('refresh')));
          }
        }
      },
      onStateUpdate: function onStateUpdate(ev) {
        if (ev.detail.target === 'refresh') {
          if (this.isVisible()) {
            // only load when visible
            this.refresh();
          } else {
            // reset lastRefresh to that the refresh get called when this item gets visible
            this._lastRefresh = null;
          }
        } else {
          cv.ui.structure.tile.components.List.superclass.prototype.onStateUpdate.call(this, ev);
        } // cancel event here


        ev.stopPropagation();
      },
      _applyValue: function _applyValue() {
        // reset last refresh, because with new data its obsolete
        this._lastRefresh = 0;
        this.refresh();
      },
      refresh: function refresh() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var element, template, newModel, target, whenEmptyTemplate, emptyModel, emptyElem, itemTemplate, i, elem;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  element = _this2._element;
                  template = element.querySelector(':scope > template:not([when])');
                  newModel = [];

                  if (typeof _this2._getModel === 'function') {
                    newModel = _this2._getModel();
                  }

                  if (!(newModel instanceof Promise)) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.next = 7;
                  return newModel;

                case 7:
                  newModel = _context2.sent;

                case 8:
                  target = element.querySelector(':scope > ul');

                  if (!(template.getAttribute('wrap') === 'false')) {
                    _context2.next = 13;
                    break;
                  }

                  target = element;
                  _context2.next = 24;
                  break;

                case 13:
                  if (!template.hasAttribute('target')) {
                    _context2.next = 23;
                    break;
                  }

                  _context2.t0 = template.getAttribute('target');
                  _context2.next = _context2.t0 === 'parent' ? 17 : 20;
                  break;

                case 17:
                  target = element.parentElement; // we do not need the list to be visible then

                  element.style.display = 'none';
                  return _context2.abrupt("break", 21);

                case 20:
                  throw new Error('invalid target: ' + template.getAttribute('target'));

                case 21:
                  _context2.next = 24;
                  break;

                case 23:
                  if (!target) {
                    target = document.createElement('ul');
                    target.classList.add('content');
                    element.appendChild(target);
                  }

                case 24:
                  _this2.debug('refreshing with new model length', newModel.length);

                  if (!(Array.isArray(newModel) || newModel instanceof qx.data.Array)) {
                    _context2.next = 47;
                    break;
                  }

                  if (typeof _this2._filterModel === 'function') {
                    newModel = newModel.filter(_this2._filterModel);
                  }

                  if (typeof _this2._sortModel === 'function') {
                    newModel.sort(_this2._sortModel);
                  }

                  if (_this2._limit) {
                    newModel = newModel.slice(0, _this2._limit);
                  }

                  if (!(newModel.length === 0)) {
                    _context2.next = 39;
                    break;
                  }

                  whenEmptyTemplate = element.querySelector(':scope > template[when="empty"]');

                  if (!(whenEmptyTemplate && !target.querySelector(':scope > .empty-model'))) {
                    _context2.next = 37;
                    break;
                  }

                  while (target.firstChild && target.hasAttribute('data-row')) {
                    target.removeChild(target.lastChild);
                  }

                  emptyModel = whenEmptyTemplate.content.firstElementChild.cloneNode(true);
                  emptyModel.classList.add('empty-model');
                  target.appendChild(emptyModel);
                  return _context2.abrupt("return");

                case 37:
                  _context2.next = 41;
                  break;

                case 39:
                  emptyElem = target.querySelector(':scope > .empty-model');

                  if (emptyElem) {
                    emptyElem.remove();
                  }

                case 41:
                  itemTemplate = document.createElement('template'); // remove entries we do not need anymore

                  for (i = newModel.length; i < _this2._model.length; i++) {
                    elem = target.querySelector(":scope > [data-row=\"".concat(i, "\"]"));

                    if (elem) {
                      elem.remove();
                    }
                  }

                  newModel.forEach(function (entry, i) {
                    var elem = target.querySelector(":scope > [data-row=\"".concat(i, "\"]"));
                    var html = template.innerHTML.replaceAll(/\${([^}\[]+)\[?(\d+)?\]?}/g, function (match, p1, p2) {
                      if (Object.prototype.hasOwnProperty.call(entry, p1)) {
                        var val = entry[p1];

                        if (p2 && Array.isArray(val)) {
                          return val[parseInt(p2)];
                        }

                        return val;
                      } else if (p1 === 'index') {
                        return '' + i;
                      }

                      return '';
                    });
                    itemTemplate.innerHTML = html;

                    if (elem) {
                      // update existing
                      elem.innerHTML = itemTemplate.content.firstElementChild.innerHTML;
                      elem.setAttribute('data-row', '' + i);
                    } else {
                      // append new child
                      itemTemplate.content.firstElementChild.setAttribute('data-row', '' + i);
                      target.appendChild(itemTemplate.content.cloneNode(true));
                    }
                  });
                  _this2._model = newModel;
                  _context2.next = 48;
                  break;

                case 47:
                  _this2.error('model must be an array', newModel);

                case 48:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1664784615315