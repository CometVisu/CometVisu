(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.Class": {
        "construct": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "construct": true
      },
      "qx.event.Timer": {},
      "qx.util.Function": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* MRefresh.js
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
   * Adds a refresh attribute that triggers a 'refresh' method which must be implemented by classes including this mixin.
   */
  qx.Mixin.define('cv.ui.structure.tile.MRefresh', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      this.__P_75_0 = qx.core.Init.getApplication() || null;
      if (this.__P_75_0) {
        this.__P_75_0.addListener('changeActive', this.__P_75_1, this);
      }
      if (qx.Class.hasMixin(this.constructor, cv.ui.structure.tile.MVisibility)) {
        this.addListener('changeVisible', this.__P_75_2, this);
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      refresh: {
        check: 'Number',
        init: 0,
        apply: '_applyRefresh'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_75_0: null,
      _refreshTimer: null,
      _lastRefresh: null,
      _applyRefresh: function _applyRefresh(value) {
        if (value === 0) {
          if (this._refreshTimer) {
            this._refreshTimer.stop();
            this._refreshTimer = null;
          }
        } else if (!this._refreshTimer) {
          this._refreshTimer = new qx.event.Timer(value * 1000);
          this._refreshTimer.addListener('interval', this.__P_75_3, this);
          if (this.__P_75_4()) {
            this._refreshTimer.start();
          }
        } else if (!this.__P_75_4()) {
          this._refreshTimer.stop();
        } else {
          this._refreshTimer.restartWith(value * 1000);
        }
      },
      __P_75_2: function __P_75_2(ev) {
        if (ev.getData()) {
          this.__P_75_5();
        } else {
          this.__P_75_6();
        }
      },
      __P_75_1: function __P_75_1(ev) {
        if (ev.getData()) {
          this.__P_75_5();
        } else {
          this.__P_75_6();
        }
      },
      __P_75_4: function __P_75_4() {
        return this.__P_75_7() && (typeof this.isVisible !== 'function' || this.isVisible());
      },
      __P_75_7: function __P_75_7() {
        return !this.__P_75_0 || this.__P_75_0.isActive();
      },
      __P_75_5: function __P_75_5() {
        if (!this.__P_75_4()) {
          return;
        }
        if (this._refreshTimer) {
          this._refreshTimer.start();
          if (!this._lastRefresh || Date.now() - this._lastRefresh >= this._refreshTimer.getInterval()) {
            // last execution time too old, refresh now
            this.__P_75_3();
          }
        } else if (!this._lastRefresh) {
          // refresh once when the item becomes visible or the app becomes active again
          this.__P_75_3();
        }
      },
      __P_75_6: function __P_75_6() {
        if (this._refreshTimer) {
          this._refreshTimer.stop();
        }
      },
      __P_75_3: function __P_75_3() {
        if (typeof this.refresh === 'function') {
          this.refresh();
          this._lastRefresh = Date.now();
        } else {
          this.error('refresh method must be implemented!');
        }
      },
      /**
       * Creates a debounced refresh method (created with qx.util.Function.debounce) that is called after the given delay.
       * The refresh method must be implemented by the class including this mixin.
       *
       * The debounced refresh can then be called with this.debouncedRefresh();
       * @param delay {number} delay in milliseconds
       */
      setDebouncedRefresh: function setDebouncedRefresh(delay) {
        var _this = this;
        if (typeof this.refresh === 'function') {
          this.debouncedRefresh = qx.util.Function.debounce(function () {
            if (typeof _this.isConnected === 'function' && !_this.isConnected() || _this.isDisposed()) {
              return;
            }
            _this.refresh();
          }, delay);
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      if (this.__P_75_0) {
        this.__P_75_0.removeListener('changeActive', this.__P_75_1, this);
        this.__P_75_0 = null;
      }
      this._disposeObjects('_refreshTimer');
    }
  });
  cv.ui.structure.tile.MRefresh.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MRefresh.js.map?dt=1782967140932