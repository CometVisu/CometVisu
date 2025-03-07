/* Refresh.js
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
 * @ignore(fetch)
 */
qx.Mixin.define('cv.ui.common.Refresh', {
  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct() {
    if (cv.TemplateEngine.getInstance().isDomFinished()) {
      this.setupRefreshAction();
    } else {
      qx.event.message.Bus.subscribe(
        'setup.dom.finished',
        function () {
          this.setupRefreshAction();
        },
        this
      );
    }

    this.addListener('changeVisible', this._maintainTimerState, this);
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    refresh: {
      check: 'Number',
      init: 0
    },

    cachecontrol: {
      check: 'String',
      init: 'full'
    },

    restartOnVisible: {
      check: 'Boolean',
      init: false,
      apply: '_applyRestartOnVisible'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _timer: null,
    __timerId: null,
    __setup: false,
    __lastRun: null,
    __restartTimer: null,
    __restartOnVisible: false,

    _applyRestartOnVisible(value) {
      if (value) {
        this._maintainTimerState();
      }
    },

    /**
     * Stop the while invisible
     */
    _maintainTimerState() {
      if (this.__restartTimer) {
        this.debug('aborting restart timer ' + this.getPath());
        this.__restartTimer.stop();
        this.__restartTimer.dispose();
        this.__restartTimer = null;
      }
      if (!this.isRestartOnVisible()) {
        return;
      }
      if (this._timer) {
        if (this.isVisible()) {
          const delta = this.getRefresh() - (Date.now() - this.__lastRun);
          if (delta <= 0) {
            // run immediately
            this.debug('immediate refresh because refresh time has been reached ' + this.getPath());

            this._timer.start();
            this._timer.fireEvent('interval');
          } else {
            this.debug('starting refresh ' + this.getPath() + ' in ' + delta + 'ms');

            // start when interval is finished
            this.__restartTimer = qx.event.Timer.once(
              function () {
                this._timer.start();
                this._timer.fireEvent('interval');
                this.__restartTimer = null;
              },
              this,
              delta
            );
          }
        } else if (this._timer.isEnabled()) {
          this.debug('stop refreshing ' + this.getPath());
          this._timer.stop();
        }
      }
    },

    setupRefreshAction() {
      if (this.getRefresh() && this.getRefresh() > 0) {
        if (this.__setup === true) {
          return;
        }
        this.__setup = true;
        if (this._setupRefreshAction) {
          // overridden by inheriting class
          this._setupRefreshAction();
          if (this._timer) {
            // listen to foreign timer to get the last execution time;
            this._timer.addListener('interval', () => {
              this.__lastRun = Date.now();
            });
          }
        } else if (!this._timer || !this._timer.isEnabled()) {
          const element = this.getDomElement();
          const target = element.querySelector('img') || element.querySelector('iframe');
          let src = target.getAttribute('src');
          if (
            src.indexOf('?') < 0 &&
            ((target.nodeName === 'IMG' && this.getCachecontrol() === 'full') || target.nodeName !== 'IMG')
          ) {
            src += '?';
          }
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener('interval', () => {
            this.refreshAction(target, src);
          });
          this._timer.start();
        }
        if (this._timer && this._timer.isEnabled()) {
          this.__lastRun = Date.now();
          this.setRestartOnVisible(true);
        }
      }
    },

    refreshAction(target, src) {
      this.__lastRun = Date.now();
      if (this._refreshAction) {
        this._refreshAction();
      } else {
        /*
         * Special treatment for (external) iframes: we need to clear it and reload
         * it in another thread as otherwise stays blank for some targets/sites and
         * src = src doesnt work anyway on external This creates though some
         * "flickering" so we avoid to use it on images, internal iframes and others
         */
        const parenthost = window.location.protocol + '//' + window.location.host;
        if (target.nodeName === 'IFRAME' && src.indexOf(parenthost) !== 0) {
          target.setAttribute('src', '');
          qx.event.Timer.once(
            function () {
              target.setAttribute('src', src);
            },
            this,
            0
          );
        } else {
          let cachecontrol = this.getCachecontrol();

          // force is only implied for images
          if (target.nodeName !== 'IMG' && cachecontrol === 'force') {
            cachecontrol = 'full';
          }

          switch (cachecontrol) {
            case 'full':
              target.setAttribute('src', qx.util.Uri.appendParamsToUrl(src, '' + new Date().getTime()));

              break;

            case 'weak':
              target.setAttribute('src', src + '#' + new Date().getTime());
              break;

            case 'force':
              cv.ui.common.Refresh.__forceImgReload(src);

            // not needed as those are NOP:
            // case 'none':
            // default:
          }
        }
      }
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    if (this._timer) {
      this._timer.stop();
      this._disposeObjects('_timer');
    }
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    // based on https://stackoverflow.com/questions/1077041/refresh-image-with-a-new-one-at-the-same-url
    __forceImgReload(src) {
      window
        .fetch(src, { cache: 'reload', mode: 'no-cors' })
        .then(() => document.body.querySelectorAll(`img[src='${src}']`).forEach(img => (img.src = src)));
    }
  }
});
