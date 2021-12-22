/**
 * Shows an image
 */
qx.Class.define('cv.ui.structure.tile.components.Image', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

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
    _downloadedImage: null,
    _url: null,

    _init() {
      const element = this._element;
      let img = element.querySelector(':scope > img');
      if (!img) {
        img = document.createElement('img');
        element.appendChild(img);
      }
      this._url = new URL(element.getAttribute('src'), window.location.origin);
      img.src = element.getAttribute('src');
      if (element.hasAttribute('refresh')) {
        this.setRefresh(parseInt(element.getAttribute('refresh')));
      }
    },

    _applyRefresh(value) {
      if (value === 0) {
        if (this._refreshTimer) {
          this._refreshTimer.stop();
        }
      } else if (!this._refreshTimer) {
        this._refreshTimer = new qx.event.Timer(value * 1000);
        this._refreshTimer.addListener('interval', this._onRefresh, this);
        this._refreshTimer.start();
      } else {
        this._refreshTimer.restartWith(value * 1000);
      }
    },

    _onRefresh() {
      let img = this._element.querySelector(':scope > img');
      if (img) {
        this._url.searchParams.set('r', '' + Math.random());
        img.src = this._url.toString();
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
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'image', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
