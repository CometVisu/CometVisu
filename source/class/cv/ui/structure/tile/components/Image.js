/**
 * Shows an image.
 *
 * HINT: Proxy mode needs an PHP environment with php-curl installed.
 */
qx.Class.define('cv.ui.structure.tile.components.Image', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _downloadedImage: null,
    _url: null,
    _headers: null,
    _request: null,

    _init() {
      const element = this._element;
      let img = element.querySelector(':scope > img');
      if (!img) {
        img = document.createElement('img');
        element.appendChild(img);
      }
      element.addEventListener('click', () => this.refresh());
      let src = element.getAttribute('src');
      let base = window.location.origin;
      if (src.substring(0, 1) !== '/' && src.substring(0, 4) !== 'http') {
        // relative url
        base += window.location.pathname;
      }
      this._url = new URL(src, base);
      const useProxy = element.hasAttribute('proxy') && element.getAttribute('proxy') === 'true';
      if (useProxy) {
        this._url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
        this._url.searchParams.set('url', element.getAttribute('src'));
      }
      this._headers = {};
      if (element.hasAttribute('auth-type')) {
        switch (element.getAttribute('auth-type').toLowerCase()) {
          case 'basic':
            if (useProxy) {
              this._url.searchParams.set('authorization', 'Basic ' + window.btoa(element.getAttribute('username') + ':' + element.getAttribute('password')));
            } else {
              this._headers['Authorization'] = 'Basic ' + window.btoa(element.getAttribute('username') + ':' + element.getAttribute('password'));
            }
            break;
        }
      }
      this._loadImage();
      if (element.hasAttribute('refresh')) {
        this.setRefresh(parseInt(element.getAttribute('refresh')));
      }
    },

    _loadImage() {
      let img = this._element.querySelector(':scope > img');
      if (Object.keys(this._headers).length > 0) {
        let request = new XMLHttpRequest();
        request.responseType = 'blob';
        request.open('get', this._url.toString(), true);
        Object.keys(this._headers).forEach(name => {
          request.setRequestHeader(name, this._headers[name]);
        });
        request.onreadystatechange = e => {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            img.src = URL.createObjectURL(request.response);
            img.onload = () => {
              URL.revokeObjectURL(img.src);
            };
          }
        };
        request.send(null);
      } else {
        img.src = this._url.toString();
      }
    },

    refresh() {
      let img = this._element.querySelector(':scope > img');
      if (img) {
        this._url.searchParams.set('r', '' + Math.random());
        this._loadImage();
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     */
    onStateUpdate(ev) {
      if (!this.base(arguments, ev)) {
        if (ev.detail.target === 'refresh') {
          if (ev.detail.state) {
            this.refresh();
          }
        } else {
          this.debug('unhandled address target', ev.detail.target);
        }
      }
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'image', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
