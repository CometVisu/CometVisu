(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* MRefresh.js 
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
   * Adds a refresh attribute that triggers a 'refresh' method which must be implemented by classes including this mixin.
   */
  qx.Mixin.define('cv.ui.structure.tile.MRefresh', {
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
      _refreshTimer: null,
      _lastRefresh: null,
      _applyRefresh: function _applyRefresh(value) {
        if (value === 0) {
          if (this._refreshTimer) {
            this._refreshTimer.stop();
          }
        } else if (!this._refreshTimer) {
          this._refreshTimer = new qx.event.Timer(value * 1000);

          this._refreshTimer.addListener('interval', this.__P_71_0, this);

          if (typeof this.isVisible === 'function') {
            if (this.isVisible()) {
              this._refreshTimer.start();
            }
          } else {
            this._refreshTimer.start();
          }
        } else {
          this._refreshTimer.restartWith(value * 1000);
        }
      },
      _applyVisible: function _applyVisible(isVisible) {
        if (isVisible) {
          if (this._refreshTimer) {
            this._refreshTimer.start();

            if (!this._lastRefresh || Date.now() - this._lastRefresh >= this._refreshTimer.getInterval()) {
              // last execution time too old, refresh now
              this.__P_71_0();
            }
          } else if (!this._lastRefresh) {
            // refresh once when the item becomes visible
            this.__P_71_0();
          }
        } else if (this._refreshTimer) {
          this._refreshTimer.stop();
        }
      },
      __P_71_0: function __P_71_0() {
        if (typeof this.refresh === 'function') {
          this.refresh();
          this._lastRefresh = Date.now();
        } else {
          this.error('refresh method must be implemented!');
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_refreshTimer');
    }
  });
  cv.ui.structure.tile.MRefresh.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MRefresh.js.map?dt=1664613607280