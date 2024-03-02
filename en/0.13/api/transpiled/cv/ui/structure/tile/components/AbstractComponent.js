function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "qx.core.Init": {},
      "cv.Application": {},
      "cv.util.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractComponent.js
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
   * Base class for all components.
   */
  qx.Class.define('cv.ui.structure.tile.components.AbstractComponent', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.elements.AbstractCustomElement.constructor.call(this, element);
      this._preMappingHooks = [];
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      value: {
        apply: '_applyValue',
        init: null,
        nullable: true,
        event: 'changeValue'
      },
      styleClass: {
        check: 'String',
        nullable: true,
        apply: '_applyStyleClass',
        event: 'changeStyleClass'
      },
      enabled: {
        check: 'Boolean',
        init: true,
        apply: '_applyEnabled'
      },
      visibility: {
        check: ['visible', 'excluded', 'hidden'],
        init: 'visible',
        apply: '_applyVisibility',
        event: 'changeVisibility'
      },
      /**
       * True if this tile is the content of a template based widget
       */
      widget: {
        check: 'Boolean',
        init: false
      },
      /**
       * True if this tile is the content of a popup
       */
      inPopup: {
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
      _writeAddresses: null,
      _headerFooterParent: null,
      _preMappingHooks: null,
      _tileElement: null,
      __P_75_0: null,
      _checkEnvironment: function _checkEnvironment() {
        var inPopup = false;
        if (this._element.parentElement.localName === 'cv-popup') {
          this._headerFooterParent = this._element.parentElement;
          inPopup = true;
        } else {
          var tile = this._getTileParent();
          if (tile) {
            var parent = tile.parentElement;
            this._headerFooterParent = parent;
            if (parent.localName === 'cv-popup') {
              inPopup = true;
            }
          }
        }
        this.setInPopup(inPopup);
      },
      _getTileParent: function _getTileParent() {
        if (!this._tileElement) {
          var tile = this._element;
          var i = 0;
          while (tile && tile.localName !== 'cv-tile') {
            tile = tile.parentElement;
            i++;
            if (i > 2) {
              tile = null;
              break;
            }
          }
          if (tile && tile.localName === 'cv-tile') {
            this._tileElement = tile;
          }
        }
        return this._tileElement;
      },
      _init: function _init() {
        var _this = this;
        this._checkEnvironment();
        var element = this._element;
        var hasReadAddress = false;
        var writeAddresses = [];
        Array.prototype.forEach.call(element.querySelectorAll(':scope > cv-address'), function (address) {
          var mode = address.hasAttribute('mode') ? address.getAttribute('mode') : 'readwrite';
          switch (mode) {
            case 'readwrite':
              hasReadAddress = true;
              writeAddresses.push(address);
              break;
            case 'read':
              hasReadAddress = true;
              break;
            case 'write':
              writeAddresses.push(address);
              break;
          }
        });
        if (!hasReadAddress) {
          // address groups are read-only
          hasReadAddress = element.querySelectorAll(':scope > cv-address-group').length > 0;
        }
        this._writeAddresses = writeAddresses;
        if (hasReadAddress) {
          element.addEventListener('stateUpdate', function (ev) {
            _this.onStateUpdate(ev);
            // cancel event here
            ev.stopPropagation();
          });
        }

        // has mobile attributes
        this.__P_75_0 = [];
        var check = function check(element) {
          var _iterator = _createForOfIteratorHelper(element.getAttributeNames()),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var name = _step.value;
              if (name.startsWith('mobile-')) {
                var targetName = name.substring(7);
                _this.__P_75_0.push({
                  name: targetName,
                  mobile: element.getAttribute(name),
                  desktop: element.getAttribute(targetName),
                  target: element
                });
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };
        check(element);
        if (this._headerFooterParent && this._headerFooterParent.localName === 'cv-widget') {
          check(this._headerFooterParent);
        }
        if (this.__P_75_0.length > 0) {
          qx.core.Init.getApplication().addListener('changeMobile', this.__P_75_1, this);
        }
        if (document.body.classList.contains('mobile')) {
          this.__P_75_1();
        }
      },
      __P_75_1: function __P_75_1() {
        var isMobile = document.body.classList.contains('mobile');
        var _iterator2 = _createForOfIteratorHelper(this.__P_75_0),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entry = _step2.value;
            entry.target.setAttribute(entry.name, isMobile ? entry.mobile : entry.desktop);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      },
      getElement: function getElement() {
        return this._element;
      },
      /**
       * Append the given element to a header inside the widget this component is a direct child of.
       * If the header does not exist yet, it will be created.
       * Does nothing when this component is no direct child of a widget.
       * @param element {HTMLElement}
       * @param align {String} center (default), left or right
       */
      appendToHeader: function appendToHeader(element) {
        var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        if (this._headerFooterParent) {
          var header = this._headerFooterParent.querySelector(':scope > header');
          if (!header) {
            header = document.createElement('header');
            this._headerFooterParent.insertBefore(header, this._headerFooterParent.firstElementChild);
          }
          var targetParent = header;
          if (align) {
            targetParent = header.querySelector('.' + align);
            if (!targetParent) {
              targetParent = document.createElement('div');
              targetParent.classList.add(align);
            }
            header.appendChild(targetParent);
          }
          targetParent.appendChild(element);
        }
      },
      /**
       * Gets the header or an element inside it, if the selector is not empty
       * @param selector {String} css selector
       * @return {Element|null}
       */
      getHeader: function getHeader(selector) {
        if (this._headerFooterParent) {
          if (!selector) {
            return this._headerFooterParent.querySelector(':scope > header');
          }
          var header = this._headerFooterParent.querySelector(':scope > header');
          if (header) {
            return header.querySelector(selector);
          }
        }
        return null;
      },
      /**
       * Append the given element to a footer inside the widget this component is a direct child of.
       * If the footer does not exist yet, it will be created.
       * Does nothing when this component is no direct child of a widget.
       * @param element {HTMLElement}
       */
      appendToFooter: function appendToFooter(element) {
        if (this._headerFooterParent) {
          var footer = this._headerFooterParent.querySelector(':scope > footer');
          if (!footer) {
            footer = document.createElement('footer');
            this._headerFooterParent.appendChild(footer);
          }
          footer.appendChild(element);
        }
      },
      /**
       * Gets the footer or an element inside it, if the selector is not empty
       * @param selector {String} css selector
       * @return {Element|null}
       */
      getFooter: function getFooter(selector) {
        if (this._headerFooterParent) {
          if (!selector) {
            return this._headerFooterParent.querySelector(':scope > footer');
          }
          var footer = this._headerFooterParent.querySelector(':scope > footer');
          if (footer) {
            return footer.querySelector(selector);
          }
        }
        return null;
      },
      /**
       * Register hook function {Function(value: number) : number} that is called before the mapping gets applied.
       * It must return a number that is used as a new value for mapping.
       * @param callback {{(value: number) : number}}
       * @param context {object}
       */
      registerPreMappingHook: function registerPreMappingHook(callback, context) {
        var exists = this._preMappingHooks.some(function (e) {
          return e[0] === callback;
        });
        if (!exists) {
          this._preMappingHooks.push([callback, context || this]);
        }
      },
      /**
       * Unregister pre-mapping hook
       * @param callback {{(value: number) : number}}
       */
      unregisterPreMappingHook: function unregisterPreMappingHook(callback) {
        this._preMappingHooks = this._preMappingHooks.filter(function (e) {
          return e[0] !== callback;
        });
      },
      // property apply
      _applyValue: function _applyValue(value) {
        if (this.isConnected()) {
          this._element.setAttribute('value', value || '');
          var mappedValue = value;
          var _iterator3 = _createForOfIteratorHelper(this._preMappingHooks),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var hookEntry = _step3.value;
              mappedValue = hookEntry[0].call(hookEntry[1], mappedValue);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (mappedValue !== null) {
            if (this._element.hasAttribute('mapping') && this._element.getAttribute('mapping')) {
              mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), mappedValue);
            }
            if (this._element.hasAttribute('format') && this._element.getAttribute('format')) {
              mappedValue = cv.util.String.sprintf(this._element.getAttribute('format'), mappedValue instanceof Date ? mappedValue.toLocaleString() : mappedValue);
            }
          }
          this._updateValue(mappedValue, value);
          if (this._element.hasAttribute('styling') && this._element.getAttribute('styling')) {
            var styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value);
            this.setStyleClass(styleClass);
          }
        }
      },
      // needs to be implemented by inheriting classes
      _updateValue: function _updateValue(mappedValue, value) {},
      // property apply
      _applyStyleClass: function _applyStyleClass(value, oldValue) {
        var classes = this._element.classList;
        if (oldValue && classes.contains(oldValue)) {
          classes.remove(oldValue);
        }
        if (value) {
          classes.add(value);
        }
      },
      _applyEnabled: function _applyEnabled(value) {
        var blocker = this._element.querySelector(':scope > .blocker');
        if (!blocker) {
          blocker = document.createElement('div');
          blocker.classList.add('blocker');
          this._element.appendChild(blocker);
          blocker.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          });
          blocker.addEventListener('pointerdown', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          });
          blocker.addEventListener('pointerup', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          });
        }
        this._element.setAttribute('disabled', value === false ? 'true' : 'false');
        blocker.style.display = value === true ? 'none' : 'block';
      },
      _applyVisibility: function _applyVisibility(value, oldValue) {
        var target = this.isWidget() ? this._element.parentElement : this._element;
        if (oldValue === 'hidden') {
          target.style.opacity = '1.0';
        }
        switch (value) {
          case 'visible':
            target.style.display = null;
            break;
          case 'hidden':
            target.style.opacity = '0';
            break;
          case 'excluded':
            target.style.display = 'none';
            break;
        }
      },
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
       * @return {Boolean} true of the update has been handled
       */
      onStateUpdate: function onStateUpdate(ev) {
        switch (ev.detail.target) {
          case 'enabled':
            this.setEnabled(ev.detail.state === 1);
            ev.stopPropagation();
            return true;
          case 'show-exclude':
            this.setVisibility(ev.detail.state ? 'visible' : 'excluded');
            ev.stopPropagation();
            return true;
          case 'show-hide':
            this.setVisibility(ev.detail.state ? 'visible' : 'hidden');
            ev.stopPropagation();
            return true;
          case '':
            this.setValue(ev.detail.state);
            ev.stopPropagation();
            return true;
        }
        return false;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._writeAddresses = null;
      this._headerFooterParent = null;
      qx.core.Init.getApplication().removeListener('changeMobile', this.__P_75_1, this);
    }
  });
  cv.ui.structure.tile.components.AbstractComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractComponent.js.map?dt=1709410139901