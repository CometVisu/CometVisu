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
  construct: function () {
    if (cv.TemplateEngine.getInstance().isDomFinished()) {
      this.setupRefreshAction();
    } else {
      qx.event.message.Bus.subscribe("setup.dom.finished", function () {
        this.setupRefreshAction();
      }, this);
    }

    // Stop the while invisible
    this.addListener("changeVisible", function(ev) {
      if (this._timer && ev.getData() !== ev.getOldData() && this.__ownTimerId === this._timer.toHashCode()) {
        if (ev.getData()) {
          this._timer.start();
        } else {
          this._timer.stop();
        }
      }
    }, this);
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
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _timer: null,
    __setup: false,
    __ownTimerId: null,

    setupRefreshAction: function () {
      if (this.getRefresh() && this.getRefresh() > 0) {
        if (this.__setup === true) {
          return;
        }
        this.__setup = true;
        if (this._setupRefreshAction) {
          // overridden by inheriting class
          this._setupRefreshAction();
        } else if (!this._timer || !this._timer.isEnabled()) {
          var element = this.getDomElement();
          var target = qx.bom.Selector.query('img', element)[0] || qx.bom.Selector.query('iframe', element)[0];
          var src = qx.bom.element.Attribute.get(target, "src");
          if (src.indexOf('?') < 0 && ((target.nodeName === 'IMG' && this.getCachecontrol() === 'full') || target.nodeName !== 'IMG')) {
            src += '?';
          }
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener("interval", function () {
            this.refreshAction(target, src);
          }, this);
          this._timer.start();
          this.__ownTimerId = this._timer.toHashCode();
        }
      }
    },

    refreshAction: function (target, src) {
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
          qx.bom.element.Attribute.set(target, "src", "");
          qx.event.Timer.once(function () {
            qx.bom.element.Attribute.set(target, "src", src);
          }, this, 0);
        } else {
          var cachecontrol = this.getCachecontrol();
          
          // force is only implied for images
          if( target.nodeName !== 'IMG' && cachecontrol === 'force' )
          {
            cachecontrol = 'full';
          }
          
          switch( cachecontrol ) {
            case 'full':
              qx.bom.element.Attribute.set(target, "src", qx.util.Uri.appendParamsToUrl(src, ""+new Date().getTime()));
              break;
              
            case 'weak':
              qx.bom.element.Attribute.set(target, "src", src + '#' + new Date().getTime());
              break;
              
            case 'force':
              cv.ui.common.Refresh.__forceImgReload( src );
              
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
  destruct: function() {
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
    __forceImgReload: function(src, twostage) {
      var step = 0,                                       // step: 0 - started initial load, 1 - wait before proceeding (twostage mode only), 2 - started forced reload, 3 - cancelled
        elements = qx.bom.Selector.query('img[src="'+src+'"]'),
        canvases = [],
        imgReloadBlank = function(){
          elements.forEach(function(elem){
            // place a canvas above the image to prevent a flicker on the 
            // screen when the image src is reset
            var canvas = window.document.createElement('canvas');
            canvas.width = elem.width;
            canvas.height = elem.height;
            canvas.style = 'position:fixed';
            canvas.getContext('2d').drawImage(elem,0,0);
            canvases.push( canvas );
            elem.width = elem.width;
            elem.height = elem.height;
            elem.parentNode.insertBefore( canvas, elem );
            qx.bom.element.Attribute.reset(elem, "src"); 
          });
        },
        imgReloadRestore = function(){
          elements.forEach(function(elem){
            qx.bom.element.Attribute.set(elem, "src", src); 
            elem.removeAttribute('width');
            elem.removeAttribute('height');
          });
          canvases.forEach(function(elem){
            elem.parentNode.removeChild(elem);
          });
        },
        iframe = window.document.createElement('iframe'), // Hidden iframe, in which to perform the load+reload.
        doc,
        loadCallback = function(e)                        // Callback function, called after iframe load+reload completes (or fails).
        {                                                 // Will be called TWICE unless twostage-mode process is cancelled. (Once after load, once after reload).
          if( !step )                                     // initial load just completed.  Note that it doesn't actually matter if this load succeeded or not!
          {
            if( twostage )
            {
              step = 1;                                   // wait for twostage-mode proceed or cancel; don't do anything else just yet
            } else { 
              step = 2;                                   // initiate forced-reload
              imgReloadBlank(); 
              iframe.contentWindow.location.reload(true); 
            }
          }
          else if( step===2 )                             // forced re-load is done
          {
            imgReloadRestore((e||window.event).type==="error");    // last parameter checks whether loadCallback was called from the "load" or the "error" event.
            if(iframe.parentNode) 
            {
              iframe.parentNode.removeChild(iframe);
            }
          }
        };
      iframe.style.display = 'none';
      window.parent.document.body.appendChild(iframe);
      iframe.addEventListener('load',loadCallback,false);
      iframe.addEventListener('error',loadCallback,false);
      doc = iframe.contentWindow.document;
      doc.open();
      doc.write('<html><head><title></title></head><body><img src="' + src + '"></body></html>');
      doc.close();
      if( twostage )
      {
        return function( proceed )
        {
          if( !twostage ) 
          {
            return;
          }
          
          twostage = false;
          if( proceed )
          {
            if( step === 1 )
            { 
              step = 2; 
              imgReloadBlank(); 
              iframe.contentWindow.location.reload(true); 
            }
          } else {
            step = 3;
            if( iframe.contentWindow.stop )
            {
              iframe.contentWindow.stop();
            }
            if( iframe.parentNode )
            {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }
      }
      return null;
    }
  }
});
