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

    _applyVisible(isVisible) {
      if (isVisible) {
        if (this._refreshTimer) {
          this._refreshTimer.start();
          if (!this._lastRefresh || (Date.now() - this._lastRefresh) >= this._refreshTimer.getInterval()) {
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
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('_refreshTimer');
  }
});
