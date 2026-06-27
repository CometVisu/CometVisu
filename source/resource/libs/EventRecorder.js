/**
 * The EventRecorder patches the Window, HTMLDocument and Element prototypes addEventListener methods
 * to allow a man-in-the-middle injection to record events.
 *
 * Just add a function to the global EVENT_RECORDER variable and it gets called on every event.
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 */

var EVENT_RECORDER = null;

(function() {
  var WRID = 1;

  function patchEventListeners() {
    // patch addEventListener

    var addEventListener = function(type, listener, options) {
      // console.log("adding "+type+" event listener to %O", this);

      var wrapper = listener;

      // prevent mousewheel events from being wrapped, as the break the flot scaling
      var skipWrapping = (type === "mousewheel");

      if (!skipWrapping) {
        if (!listener.$$WRID) {
          listener.$$WRID = WRID++;
        }
        if (!this.$$wrappers) {
          this.$$wrappers = {};
        }
        if (!this.$$wrappers[type]) {
          this.$$wrappers[type] = {};
        }
        if (!this.$$wrappers[type][listener.$$WRID]) {
          wrapper = function (ev) {
            if (EVENT_RECORDER) {
              EVENT_RECORDER(ev);
            }
            listener.call(this, ev);
          };
          this.$$wrappers[type][listener.$$WRID] = wrapper;

        } else {
          // event already wrapped
          wrapper = this.$$wrappers[type][listener.$$WRID];
        }
      }
      if (this.addNativeEventListener) {
        this.addNativeEventListener(type, wrapper, options);
      } else if (this.attachEvent) {
        this.attachEvent("on" + type, wrapper);
      } else if (typeof this["on" + type] !== "undefined") {
        this["on" + type] = wrapper;
      }
    };

    if (Element.prototype.addEventListener) {
      Element.prototype.addNativeEventListener = Element.prototype.addEventListener;
    }
    Element.prototype.addEventListener = addEventListener;
    if (HTMLDocument.prototype.addEventListener) {
      HTMLDocument.prototype.addNativeEventListener = HTMLDocument.prototype.addEventListener;
    }
    HTMLDocument.prototype.addEventListener = addEventListener;
    if (Window) {
      if (Window.prototype.addEventListener) {
        Window.prototype.addNativeEventListener = Window.prototype.addEventListener;
      }
      Window.prototype.addEventListener = addEventListener;
    } else if (DOMWindow) { // Safari 5
      if (DOMWindow.prototype.addEventListener) {
        DOMWindow.prototype.addNativeEventListener = DOMWindow.prototype.addEventListener;
      }
      DOMWindow.prototype.addEventListener = addEventListener;
    }

    // patch removeEventListener
    var removeEventListener = function(type, listener, options) {
      var wrapper = listener;
      if (listener.$$WRID && this.$$wrappers[type] && this.$$wrappers[type][listener.$$WRID]) {
        wrapper = this.$$wrappers[type][listener.$$WRID];
        delete this.$$wrappers[type][listener.$$WRID];
      }
      if (this.removeNativeEventListener) {
        this.removeNativeEventListener(type, wrapper, options);
      }
      else if (this.detachEvent)
      {
        try {
          this.detachEvent("on" + type, listener);
        }
        catch(e)
        {
          // IE7 sometimes dispatches "unload" events on protected windows
          // Ignore the "permission denied" errors.
          if(e.number !== -2146828218) {
            throw e;
          }
        }
      }
      else if (typeof this["on" + type] !== "undefined")
      {
        this["on" + type] = null;
      }
    };

    if (Element.prototype.removeEventListener) {
      Element.prototype.removeNativeEventListener = Element.prototype.removeEventListener;
    }
    Element.prototype.removeEventListener = removeEventListener;
    if (HTMLDocument.prototype.removeEventListener) {
      HTMLDocument.prototype.removeNativeEventListener = HTMLDocument.prototype.removeEventListener;
    }
    HTMLDocument.prototype.removeEventListener = removeEventListener;
    if (Window) {
      if (Window.prototype.removeEventListener) {
        Window.prototype.removeNativeEventListener = Window.prototype.removeEventListener;
      }
      Window.prototype.removeEventListener = removeEventListener;
    } else if (DOMWindow) { // Safari 5
      if (DOMWindow.prototype.removeEventListener) {
        DOMWindow.prototype.removeNativeEventListener = DOMWindow.prototype.removeEventListener;
      }
      DOMWindow.prototype.removeEventListener = removeEventListener;
    }
  }

  // check if reporting is enabled and apply the patches
  if (/.+reporting=(true|1).*/.test(window.location.href)) {
    patchEventListeners();
  }
})();
