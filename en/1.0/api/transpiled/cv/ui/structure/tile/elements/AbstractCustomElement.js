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
      "cv.Config": {},
      "qx.event.message.Bus": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractCustomElement.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   *
   */
  qx.Class.define('cv.ui.structure.tile.elements.AbstractCustomElement', {
    extend: qx.core.Object,
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      qx.core.Object.constructor.call(this);
      this._element = element;
      this._initCounter = 0;
      this._deferInit = true; // activate deferred init handling by default; subclasses can set this to false if they do not support it
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: false,
        apply: '_applyConnected',
        event: 'changeConnected'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * @var {HTMLElement}
       */
      _element: null,
      /** 
       * @var {boolean} Whether this element supports deferring initialization until its page becomes active (true), does not support it (false)
       */
      _deferInit: null,
      _initialized: false,
      __P_97_0: null,
      _initCounter: null,
      _applyConnected: function _applyConnected(value) {
        var _this = this;
        if (value && !this._initialized) {
          var page = this._deferInit && !cv.Config.testMode ? this._element.closest('cv-page') : null;
          if (page && !page.classList.contains('active') && !page.classList.contains('sub-active')) {
            // Defer init until this page (or a sub-page of it) becomes active
            this.__P_97_0 = function (msg) {
              var activePage = msg.getData();
              if (page === activePage || page.contains(activePage)) {
                if (_this.__P_97_0) {
                  qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', _this.__P_97_0, _this);
                  _this.__P_97_0 = null;
                }
                _this._init();
                _this._initCounter++;
                _this._initialized = true;
                _this._postInit();
              }
            };
            qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this.__P_97_0, this);
          } else {
            this._init();
            this._initCounter++;
            this._initialized = true;
            this._postInit();
          }
        } else if (!value && this._initialized) {
          this._disconnected();
          this._initialized = false;
        } else if (!value && !this._initialized && this.__P_97_0) {
          // Disconnected before deferred init could run — clean up subscription
          qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this.__P_97_0, this);
          this.__P_97_0 = null;
        }
      },
      _init: function _init() {},
      _postInit: function _postInit() {},
      _disconnected: function _disconnected() {},
      getElement: function getElement() {
        return this._element;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      if (this.__P_97_0) {
        qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this.__P_97_0, this);
        this.__P_97_0 = null;
      }
      this._element = null;
    }
  });
  cv.ui.structure.tile.elements.AbstractCustomElement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractCustomElement.js.map?dt=1782705771732