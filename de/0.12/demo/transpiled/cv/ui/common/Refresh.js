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
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
  qx.Mixin.define("cv.ui.common.Refresh", {
    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct() {
      if (cv.TemplateEngine.getInstance().isDomFinished()) {
        this.setupRefreshAction();
      } else {
        qx.event.message.Bus.subscribe("setup.dom.finished", function () {
          this.setupRefreshAction();
        }, this);
      }

      this.addListener("changeVisible", this._maintainTimerState, this);
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
      _applyRestartOnVisible: function _applyRestartOnVisible(value) {
        if (value) {
          this._maintainTimerState();
        }
      },

      /**
       * Stop the while invisible
       */
      _maintainTimerState: function _maintainTimerState() {
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
            var delta = this.getRefresh() - (Date.now() - this.__lastRun);

            if (delta <= 0) {
              // run immediately
              this.debug('immediate refresh because refresh time has been reached ' + this.getPath());

              this._timer.start();

              this._timer.fireEvent('interval');
            } else {
              this.debug('starting refresh ' + this.getPath() + ' in ' + delta + 'ms'); // start when interval is finished

              this.__restartTimer = qx.event.Timer.once(function () {
                this._timer.start();

                this._timer.fireEvent('interval');

                this.__restartTimer = null;
              }, this, delta);
            }
          } else if (this._timer.isEnabled()) {
            this.debug('stop refreshing ' + this.getPath());

            this._timer.stop();
          }
        }
      },
      setupRefreshAction: function setupRefreshAction() {
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
              this._timer.addListener('interval', function () {
                this.__lastRun = Date.now();
              }, this);
            }
          } else if (!this._timer || !this._timer.isEnabled()) {
            var element = this.getDomElement();
            var target = element.querySelector('img') || element.querySelector('iframe');
            var src = target.getAttribute("src");

            if (src.indexOf('?') < 0 && (target.nodeName === 'IMG' && this.getCachecontrol() === 'full' || target.nodeName !== 'IMG')) {
              src += '?';
            }

            this._timer = new qx.event.Timer(this.getRefresh());

            this._timer.addListener("interval", function () {
              this.refreshAction(target, src);
            }, this);

            this._timer.start();
          }

          if (this._timer && this._timer.isEnabled()) {
            this.__lastRun = Date.now();
            this.setRestartOnVisible(true);
          }
        }
      },
      refreshAction: function refreshAction(target, src) {
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
          var parenthost = window.location.protocol + "//" + window.location.host;

          if (target.nodeName === "IFRAME" && src.indexOf(parenthost) !== 0) {
            target.setAttribute("src", "");
            qx.event.Timer.once(function () {
              target.setAttribute("src", src);
            }, this, 0);
          } else {
            var cachecontrol = this.getCachecontrol(); // force is only implied for images

            if (target.nodeName !== 'IMG' && cachecontrol === 'force') {
              cachecontrol = 'full';
            }

            switch (cachecontrol) {
              case 'full':
                target.setAttribute("src", qx.util.Uri.appendParamsToUrl(src, "" + new Date().getTime()));
                break;

              case 'weak':
                target.setAttribute("src", src + '#' + new Date().getTime());
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
    destruct: function destruct() {
      if (this._timer) {
        this._timer.stop();

        this._disposeObjects("_timer");
      }
    },

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      // based on https://stackoverflow.com/questions/1077041/refresh-image-with-a-new-one-at-the-same-url
      __forceImgReload: function __forceImgReload(src, twostage) {
        var step = 0,
            // step: 0 - started initial load, 1 - wait before proceeding (twostage mode only), 2 - started forced reload, 3 - cancelled
        elements = document.querySelectorAll('img[src="' + src + '"]'),
            canvases = [],
            imgReloadBlank = function imgReloadBlank() {
          elements.forEach(function (elem) {
            // place a canvas above the image to prevent a flicker on the 
            // screen when the image src is reset
            var canvas = window.document.createElement('canvas');
            canvas.width = elem.width;
            canvas.height = elem.height;
            canvas.style = 'position:fixed';
            canvas.getContext('2d').drawImage(elem, 0, 0);
            canvases.push(canvas);
            elem.width = elem.width;
            elem.height = elem.height;
            elem.parentNode.insertBefore(canvas, elem);
            elem.removeAttribute("src");
          });
        },
            imgReloadRestore = function imgReloadRestore() {
          elements.forEach(function (elem) {
            elem.setAttribute("src", src);
            elem.removeAttribute('width');
            elem.removeAttribute('height');
          });
          canvases.forEach(function (elem) {
            elem.parentNode.removeChild(elem);
          });
        },
            iframe = window.document.createElement('iframe'),
            // Hidden iframe, in which to perform the load+reload.
        doc,
            loadCallback = function loadCallback(e) // Callback function, called after iframe load+reload completes (or fails).
        {
          // Will be called TWICE unless twostage-mode process is cancelled. (Once after load, once after reload).
          if (!step) // initial load just completed.  Note that it doesn't actually matter if this load succeeded or not!
            {
              if (twostage) {
                step = 1; // wait for twostage-mode proceed or cancel; don't do anything else just yet
              } else {
                step = 2; // initiate forced-reload

                imgReloadBlank();
                iframe.contentWindow.location.reload(true);
              }
            } else if (step === 2) // forced re-load is done
            {
              imgReloadRestore((e || window.event).type === "error"); // last parameter checks whether loadCallback was called from the "load" or the "error" event.

              if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
              }
            }
        };

        iframe.style.display = 'none';
        window.parent.document.body.appendChild(iframe);
        iframe.addEventListener('load', loadCallback, false);
        iframe.addEventListener('error', loadCallback, false);
        doc = iframe.contentWindow.document;
        doc.open();
        doc.write('<html><head><title></title></head><body><img src="' + src + '"></body></html>');
        doc.close();

        if (twostage) {
          return function (proceed) {
            if (!twostage) {
              return;
            }

            twostage = false;

            if (proceed) {
              if (step === 1) {
                step = 2;
                imgReloadBlank();
                iframe.contentWindow.location.reload(true);
              }
            } else {
              step = 3;

              if (iframe.contentWindow.stop) {
                iframe.contentWindow.stop();
              }

              if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
              }
            }
          };
        }

        return null;
      }
    }
  });
  cv.ui.common.Refresh.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Refresh.js.map?dt=1590928415304