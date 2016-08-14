/* EventHandler.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

define([], function() {

  /**
   * General handler for all mouse and touch actions.
   *
   * The general flow of mouse actions are:
   * 1. mousedown                           - "button pressed"
   * 2. mouseout                            - "button released"
   * 3. mouseout (mouse moved inside again) - "button pressed"
   * 4. mouseup                             - "button released"
   *
   * 2. gets mapped to a action cancel event
   * 3. gets mapped to a mousedown event
   * 2. and 3. can be repeated unlimited - or also be left out.
   * 4. triggers the real action
   *
   * For touch it's a little different as a touchmove cancels the current
   * action and translates into a scroll.
   *
   * All of this is the default or when the mousemove callback is returning
   * restrict=true (or undefined).
   * When restrict=false the widget captures the mouse until it is released.
   */
  function EventHandler(templateEngine) {

    this._navbarRegEx = /navbar/;
    this._isTouchDevice = !!('ontouchstart' in window) ||    // works on most browsers
      !!('onmsgesturechange' in window); // works on ie10
    this._isWidget = false;
    this._scrollElement = null;
    // object to hold the coordinated of the current mouse / touch event
    this._mouseEvent = templateEngine.handleMouseEvent = {
      moveFn: undefined,
      moveRestrict: true,
      actor: undefined,
      widget: undefined,
      widgetCreator: undefined,
      downtime: 0,
      alreadyCanceled: false
    };
    this._touchStartX = null;
    this._touchStartY = null;

    // helper function to get the current actor and widget out of an event:
    this.getWidgetActor = function (element) {
      var actor, widget;

      while (element) {
        if (element.classList.contains('actor') || (element.classList.contains('group') && element.classList.contains('clickable'))) {
          actor = element;
        }

        if (element.classList.contains('widget_container')) {
          widget = element;
          if (templateEngine.design.creators[widget.dataset.type].action !== undefined) {
            return {actor: actor, widget: widget};
          }
        }
        if (element.classList.contains('page')) {
          // abort traversal
          return {actor: actor, widget: widget};
        }
        element = element.parentElement;
      }
      return false;
    };

    // helper function to determine the element to scroll (or undefined)
    this.getScrollElement = function (element) {
      while (element) {
        if (element.classList.contains('page')) {
          return this._navbarRegEx.test(element.id) ? undefined : element;
        }
        if (element.classList.contains('navbar')) {
          var parent = element.parentElement;
          if ('navbarTop' === parent.id || 'navbarBottom' === parent.id) {
            return element;
          }
          return;
        }

        element = element.parentElement;
      }
    };

    this.onPointerDown = function (event) {
      // search if a widget was hit
      var widgetActor = this.getWidgetActor(event.target),
        bindWidget = widgetActor.widget ? templateEngine.widgetDataGet(widgetActor.widget.id).bind_click_to_widget : false;

      var touchobj;

      if (event.changedTouches) {
        touchobj = event.changedTouches[0];
        this._touchStartX = parseInt(touchobj.clientX);
        this._touchStartY = parseInt(touchobj.clientY);
      } else {
        this._touchStartX = parseInt(event.clientX);
        this._touchStartY = parseInt(event.clientY);
      }

      this._isWidget = widgetActor.widget !== undefined && (bindWidget || widgetActor.actor !== undefined);
      if (this._isWidget) {
        this._mouseEvent.actor = widgetActor.actor;
        this._mouseEvent.widget = widgetActor.widget;
        this._mouseEvent.widgetCreator = templateEngine.design.creators[widgetActor.widget.dataset.type];
        this._mouseEvent.downtime = Date.now();
        this._mouseEvent.alreadyCanceled = false;

        var actionFn = this._mouseEvent.widgetCreator.downaction;

        if (actionFn !== undefined) {
          var moveFnInfo = actionFn.call(this._mouseEvent.widget, this._mouseEvent.widget.id, this._mouseEvent.actor, false, event);
          if (moveFnInfo) {
            this._mouseEvent.moveFn = moveFnInfo.callback;
            this._mouseEvent.moveRestrict = moveFnInfo.restrict !== undefined ? moveFnInfo.restrict : true;
          }
        }
      } else {
        this._mouseEvent.actor = undefined;
      }

      if (this._mouseEvent.moveRestrict) {
        this._scrollElement = this.getScrollElement(event.target);
      }
      // stop the propagation if scrollable is at the end
      // inspired by 
      if (this._scrollElement) {
        var startTopScroll = this._scrollElement.scrollTop;

        if (startTopScroll <= 0) {
          this._scrollElement.scrollTop = 1;
        }
        if (startTopScroll + this._scrollElement.offsetHeight >= this._scrollElement.scrollHeight) {
          this._scrollElement.scrollTop = this._scrollElement.scrollHeight - this._scrollElement.offsetHeight - 1;
        }
      }
    };

    this.onPointerUp = function (event) {
      if (this._isWidget) {
        var
          widgetActor = this.getWidgetActor(event.target),
          widget = this._mouseEvent.widget,
          actionFn = this._mouseEvent.widgetCreator.action,
          bindWidget = templateEngine.widgetDataGet(widget.id).bind_click_to_widget,
          inCurrent = widgetActor.widget === widget && (bindWidget || widgetActor.actor === this._mouseEvent.actor);

        if (
          actionFn !== undefined &&
          inCurrent && !this._mouseEvent.alreadyCanceled
        ) {
          actionFn.call(widget, widget.id, this._mouseEvent.actor, !inCurrent, event);
        }
        this._mouseEvent.moveFn = undefined;
        this._mouseEvent.moveRestrict = true;
        this._scrollElement = undefined;
        this._isWidget = false;
      }
    };

    /**
     * mouse move: let the user cancel an action by dragging the mouse outside
     * and reactivate it when the dragged cursor is returning
     * @param event {Event}
     * @private
     */
    this._onPointerMoveNoTouch = function (event) {
      if (this._isWidget) {
        var
          actionFn = null,
          widgetActor = this.getWidgetActor(event.target),
          widget = this._mouseEvent.widget,
          bindWidget = templateEngine.widgetDataGet(widget.id).bind_click_to_widget,
          inCurrent = !this._mouseEvent.moveRestrict || (widgetActor.widget === widget && (bindWidget || widgetActor.actor === this._mouseEvent.actor));

        if (inCurrent && this._mouseEvent.moveFn) {
          this._mouseEvent.moveFn(event);
        }

        if (inCurrent && this._mouseEvent.alreadyCanceled) { // reactivate
          this._mouseEvent.alreadyCanceled = false;
          actionFn = this._mouseEvent.widgetCreator.downaction;
          if (actionFn) {
            actionFn.call(widget, widget.id, this._mouseEvent.actor, false, event);
          }
        }
        else if ((!inCurrent && !this._mouseEvent.alreadyCanceled)) {
          // cancel
          this._mouseEvent.alreadyCanceled = true;
          actionFn = this._mouseEvent.widgetCreator.action;
          if (actionFn) {
            actionFn.call(widget, widget.id, this._mouseEvent.actor, true, event);
          }
        }
      }
    };

    /**
     * touch move: scroll when the finger is moving and cancel any pending
     * actions at the same time
     * @private
     */
    this._onPointerMoveTouch = function (event) {
      if (this._isWidget) {
        var
          widget = this._mouseEvent.widget,
          touchobj = event.changedTouches[0];

        if (this._mouseEvent.moveFn) {
          this._mouseEvent.moveFn(event);
        }
        // cancel when finger moved more than 5px
        if (this._mouseEvent.moveRestrict && !this._mouseEvent.alreadyCanceled &&
          (Math.abs(this._touchStartX - parseInt(touchobj.clientX)) > 5 ||
          Math.abs(this._touchStartY - parseInt(touchobj.clientY)) > 5 )) { // cancel
          this._mouseEvent.alreadyCanceled = true;
          var actionFn = this._mouseEvent.widgetCreator.action;
          if (actionFn) {
            actionFn.call(widget, widget.id, this._mouseEvent.actor, true, event);
          }
        }
      }

      // take care to prevent overscroll
      if (this._scrollElement) {
        var scrollTop = this._scrollElement.scrollTop,
          scrollLeft = this._scrollElement.scrollLeft;
        // prevent scrolling of an element that takes full height and width
        // as it doesn't need scrolling
        if ((scrollTop <= 0) && (scrollTop + this._scrollElement.offsetHeight >= this._scrollElement.scrollHeight) &&
          (scrollLeft <= 0) && (scrollLeft + this._scrollElement.offsetWidth >= this._scrollElement.scrollWidth )) {
          return;
        }
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    };

    /**
     * The dispatcher registers listeners for all relevant events to the window object
     * and dispatched the event to the EventHandler. The dispatcher listens to similar events
     * like touchstart and mousedown but makes sure that these events are not fired
     *
     * @param handler
     * @constructor
     */
    var Dispatcher = function(handler) {

      /**
       * register to all events
       */
      this.register = function() {
        window.addEventListener('mousedown', this._onDown);
        window.addEventListener('touchstart', this._onDown);

        window.addEventListener('mouseup', this._onUp);
        window.addEventListener('touchend', this._onUp);

        window.addEventListener('mousemove', this._onMove);
        window.addEventListener('touchmove', this._onMove);
      };

      this._onDown = function(event) {
        handler.onPointerDown(event);
      };

      this._onUp = function(event) {
        handler.onPointerUp(event);
        if (event.type === "touchend") {
          // prevent mouseup beeing fired
          event.preventDefault();
        }
      };

      this._onMove = function(event) {
        // dispatch by event type
        if (event.type === "mousemove") {
          handler._onPointerMoveNoTouch(event);
        } else if (event.type === "touchmove") {
          handler._onPointerMoveTouch(event);
        } else{
          console.error("onhandled event type "+event.type);
        }
      };
    };

    this.dispatcher = new Dispatcher(this);
    this.dispatcher.register();

  }
  return EventHandler;
});