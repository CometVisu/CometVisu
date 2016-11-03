
define(['joose', 'lib/cv/Object'], function() {
  /**
   * The dispatcher registers listeners for all relevant events to the window object
   * and dispatched the event to the EventHandler. The dispatcher listens to similar events
   * like touchstart and mousedown but makes sure that these events are not fired
   *
   * @param handler
   * @constructor
   */
  Class('cv.event.Dispatcher', {
    isa: cv.Object,

    has: {
      handler: { is: 'rw', init: null }
    },

    methods: {
      /**
       * register to all events
       */
      register: function () {
        window.addEventListener('mousedown', this._onDown.bind(this));
        window.addEventListener('touchstart', this._onDown.bind(this));

        window.addEventListener('mouseup', this._onUp.bind(this));
        window.addEventListener('touchend', this._onUp.bind(this));

        window.addEventListener('mousemove', this._onMove.bind(this));
        window.addEventListener('touchmove', this._onMove.bind(this));
      },

      _onDown: function (event) {
        this.handler.onPointerDown(event);
      },

      _onUp: function (event) {
        this.handler.onPointerUp(event);
        if (event.type === "touchend") {
          // prevent mouseup beeing fired
          event.preventDefault();
        }
      },

      _onMove: function (event) {
        // dispatch by event type
        if (event.type === "mousemove") {
          this.handler._onPointerMoveNoTouch(event);
        } else if (event.type === "touchmove") {
          this.handler._onPointerMoveTouch(event);
        } else {
          console.error("onhandled event type " + event.type);
        }
      }
    }
  });
});