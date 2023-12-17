(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.TemplateEngine": {
        "construct": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "qx.event.Timer": {},
      "qx.util.Uri": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct() {
      if (cv.TemplateEngine.getInstance().isDomFinished()) {
        this.setupRefreshAction();
      } else {
        qx.event.message.Bus.subscribe('setup.dom.finished', function () {
          this.setupRefreshAction();
        }, this);
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
      __P_549_0: null,
      __P_549_1: false,
      __P_549_2: null,
      __P_549_3: null,
      __P_549_4: false,
      _applyRestartOnVisible: function _applyRestartOnVisible(value) {
        if (value) {
          this._maintainTimerState();
        }
      },
      /**
       * Stop the while invisible
       */
      _maintainTimerState: function _maintainTimerState() {
        if (this.__P_549_3) {
          this.debug('aborting restart timer ' + this.getPath());
          this.__P_549_3.stop();
          this.__P_549_3.dispose();
          this.__P_549_3 = null;
        }
        if (!this.isRestartOnVisible()) {
          return;
        }
        if (this._timer) {
          if (this.isVisible()) {
            var delta = this.getRefresh() - (Date.now() - this.__P_549_2);
            if (delta <= 0) {
              // run immediately
              this.debug('immediate refresh because refresh time has been reached ' + this.getPath());
              this._timer.start();
              this._timer.fireEvent('interval');
            } else {
              this.debug('starting refresh ' + this.getPath() + ' in ' + delta + 'ms');

              // start when interval is finished
              this.__P_549_3 = qx.event.Timer.once(function () {
                this._timer.start();
                this._timer.fireEvent('interval');
                this.__P_549_3 = null;
              }, this, delta);
            }
          } else if (this._timer.isEnabled()) {
            this.debug('stop refreshing ' + this.getPath());
            this._timer.stop();
          }
        }
      },
      setupRefreshAction: function setupRefreshAction() {
        var _this = this;
        if (this.getRefresh() && this.getRefresh() > 0) {
          if (this.__P_549_1 === true) {
            return;
          }
          this.__P_549_1 = true;
          if (this._setupRefreshAction) {
            // overridden by inheriting class
            this._setupRefreshAction();
            if (this._timer) {
              // listen to foreign timer to get the last execution time;
              this._timer.addListener('interval', function () {
                _this.__P_549_2 = Date.now();
              });
            }
          } else if (!this._timer || !this._timer.isEnabled()) {
            var element = this.getDomElement();
            var target = element.querySelector('img') || element.querySelector('iframe');
            var src = target.getAttribute('src');
            if (src.indexOf('?') < 0 && (target.nodeName === 'IMG' && this.getCachecontrol() === 'full' || target.nodeName !== 'IMG')) {
              src += '?';
            }
            this._timer = new qx.event.Timer(this.getRefresh());
            this._timer.addListener('interval', function () {
              _this.refreshAction(target, src);
            });
            this._timer.start();
          }
          if (this._timer && this._timer.isEnabled()) {
            this.__P_549_2 = Date.now();
            this.setRestartOnVisible(true);
          }
        }
      },
      refreshAction: function refreshAction(target, src) {
        this.__P_549_2 = Date.now();
        if (this._refreshAction) {
          this._refreshAction();
        } else {
          /*
           * Special treatment for (external) iframes: we need to clear it and reload
           * it in another thread as otherwise stays blank for some targets/sites and
           * src = src doesnt work anyway on external This creates though some
           * "flickering" so we avoid to use it on images, internal iframes and others
           */
          var parenthost = window.location.protocol + '//' + window.location.host;
          if (target.nodeName === 'IFRAME' && src.indexOf(parenthost) !== 0) {
            target.setAttribute('src', '');
            qx.event.Timer.once(function () {
              target.setAttribute('src', src);
            }, this, 0);
          } else {
            var cachecontrol = this.getCachecontrol();

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
                cv.ui.common.Refresh.__P_549_5(src);

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
    destruct: function destruct() {
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
      __P_549_5: function __P_549_5(src) {
        window.fetch(src, {
          cache: 'reload',
          mode: 'no-cors'
        }).then(function () {
          return document.body.querySelectorAll("img[src='".concat(src, "']")).forEach(function (img) {
            return img.src = src;
          });
        });
      }
    }
  });
  cv.ui.common.Refresh.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Refresh.js.map?dt=1702815243040