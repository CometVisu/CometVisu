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
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    if (qx.Class.hasMixin(this.constructor, cv.ui.structure.tile.MVisibility)) {
      this.addListener('changeVisible', this.__onVisibilityChange, this);
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
    _refreshTimer: null,
    _lastRefresh: null,

    _applyRefresh(value) {
      if (value === 0) {
        if (this._refreshTimer) {
          this._refreshTimer.stop();
        }
      } else if (!this._refreshTimer) {
        this._refreshTimer = new qx.event.Timer(value * 1000);
        this._refreshTimer.addListener('interval', this.__doRefresh, this);
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

    __onVisibilityChange(ev) {
      if (ev.getData()) {
        if (this._refreshTimer) {
          this._refreshTimer.start();
          if (!this._lastRefresh || Date.now() - this._lastRefresh >= this._refreshTimer.getInterval()) {
            // last execution time too old, refresh now
            this.__doRefresh();
          }
        } else if (!this._lastRefresh) {
          // refresh once when the item becomes visible
          this.__doRefresh();
        }
      } else if (this._refreshTimer) {
        this._refreshTimer.stop();
      }
    },

    __doRefresh() {
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
    setDebouncedRefresh(delay) {
      if (typeof this.refresh === 'function') {
        this.debouncedRefresh = qx.util.Function.debounce(this.refresh.bind(this), delay);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeObjects('_refreshTimer');
  }
});
