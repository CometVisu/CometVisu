/* Handler.js
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
qx.Class.define('cv.event.Handler', {
  extend: cv.Object,
  
  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(templateEngine) {
    this.isTouchDevice = !!('ontouchstart' in window) ||    // works on most browsers
      !!('onmsgesturechange' in window); // works on ie10
    this.mouseEvent = templateEngine.handleMouseEvent = {
      moveFn: undefined,
      moveRestrict: true,
      actor: undefined,
      widget: undefined,
      widgetCreator: undefined,
      downtime: 0,
      alreadyCanceled: false
    };
    this.dispatcher = new cv.event.Dispatcher(this);
    this.dispatcher.register();
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    dispatcher: null,
    isTouchDevice: null,
    isWidget: false,
    scrollElement: null,
    mouseEvent:  null,
    navbarRegEx: /navbar/,
    // object to hold the coordinated of the current mouse / touch event
    touchStartX:  null,
    touchStartY:  null,
    
    // helper function to get the current actor and widget out of an event:
    getWidgetActor: function (element) {
      var actor, widget;

      while (element) {
        if (element.classList.contains('actor') || (element.classList.contains('group') && element.classList.contains('clickable'))) {
          actor = element;
        }
        widget = cv.structure.WidgetFactory.getInstanceById(qx.bom.element.Attribute.get(element, 'id'));
        if (element.classList.contains('widget_container')) {
          if (widget.action !== undefined) {
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
    },

    // helper function to determine the element to scroll (or undefined)
    getScrollElement: function (element) {
      while (element) {
        if (element.classList.contains('page')) {
          return this.navbarRegEx.test(element.id) ? undefined : element;
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
    },

    onPointerDown: function (event) {
      // search if a widget was hit
      var widgetActor = this.getWidgetActor(event.getTarget()),
        bindWidget = widgetActor.widget ? widgetActor.widget.getBindClickToWidget() : false;

      var touchobj;

      // if (event.changedTouches) {
      //   touchobj = event.changedTouches[0];
      //   this.touchStartX = parseInt(touchobj.getViewportLeft());
      //   this.touchStartY = parseInt(touchobj.clientY);
      // } else {
        this.touchStartX = parseInt(event.getViewportLeft());
        this.touchStartY = parseInt(event.getViewportTop());
      // }

      this.isWidget = widgetActor.widget !== undefined && (bindWidget || widgetActor.actor !== undefined);
      if (this.isWidget) {
        this.mouseEvent.actor = widgetActor.actor;
        this.mouseEvent.widget = widgetActor.widget;
        this.mouseEvent.widgetCreator = widgetActor.widget;
        this.mouseEvent.downtime = Date.now();
        this.mouseEvent.alreadyCanceled = false;

        var actionFn = this.mouseEvent.widgetCreator.downaction;

        if (actionFn !== undefined) {
          var moveFnInfo = actionFn.call(this.mouseEvent.widget, this.mouseEvent.widget.id, this.mouseEvent.actor, false, event);
          if (moveFnInfo) {
            this.mouseEvent.moveFn = moveFnInfo.callback;
            this.mouseEvent.moveRestrict = moveFnInfo.restrict !== undefined ? moveFnInfo.restrict : true;
          }
        }
      } else {
        this.mouseEvent.actor = undefined;
      }

      if (this.mouseEvent.moveRestrict) {
        this.scrollElement = this.getScrollElement(event.getTarget());
      }
      // stop the propagation if scrollable is at the end
      // inspired by
      if (this.scrollElement) {
        var startTopScroll = this.scrollElement.scrollTop;

        if (startTopScroll <= 0) {
          this.scrollElement.scrollTop = 1;
        }
        if (startTopScroll + this.scrollElement.offsetHeight >= this.scrollElement.scrollHeight) {
          this.scrollElement.scrollTop = this.scrollElement.scrollHeight - this.scrollElement.offsetHeight - 1;
        }
      }
    },

    onPointerUp: function (event) {
      if (this.isWidget) {
        var
          widgetActor = this.getWidgetActor(event.getTarget()),
          widget = this.mouseEvent.widget,
          actionFn = this.mouseEvent.widgetCreator.action,
          bindWidget = widget.getBindClickToWidget(),
          inCurrent = widgetActor.widget === widget && (bindWidget || widgetActor.actor === this.mouseEvent.actor);

        if (
          actionFn !== undefined &&
          inCurrent && !this.mouseEvent.alreadyCanceled
        ) {
          actionFn.call(widget, widget.getPath(), this.mouseEvent.actor, !inCurrent, event);
        }
        this.mouseEvent.moveFn = undefined;
        this.mouseEvent.moveRestrict = true;
        this.scrollElement = undefined;
        this.isWidget = false;
      }
    },

    /**
     * mouse move: let the user cancel an action by dragging the mouse outside
     * and reactivate it when the dragged cursor is returning
     * @param event {Event}
     * @private
     */
    _onPointerMoveNoTouch: function (event) {
      if (this.isWidget) {
        var
          actionFn = null,
          widgetActor = this.getWidgetActor(event.target),
          widget = this.mouseEvent.widget,
          bindWidget = widget.getBindClickToWidget(),
          inCurrent = !this.mouseEvent.moveRestrict || (widgetActor.widget === widget && (bindWidget || widgetActor.actor === this.mouseEvent.actor));

        if (inCurrent && this.mouseEvent.moveFn) {
          this.mouseEvent.moveFn(event);
        }

        if (inCurrent && this.mouseEvent.alreadyCanceled) { // reactivate
          this.mouseEvent.alreadyCanceled = false;
          actionFn = this.mouseEvent.widgetCreator.downaction;
          if (actionFn) {
            actionFn.call(widget, widget.id, this.mouseEvent.actor, false, event);
          }
        }
        else if ((!inCurrent && !this.mouseEvent.alreadyCanceled)) {
          // cancel
          this.mouseEvent.alreadyCanceled = true;
          actionFn = this.mouseEvent.widgetCreator.action;
          if (actionFn) {
            actionFn.call(widget, widget.id, this.mouseEvent.actor, true, event);
          }
        }
      }
    },

    /**
     * touch move: scroll when the finger is moving and cancel any pending
     * actions at the same time
     * @private
     */
    _onPointerMoveTouch: function (event) {
      if (this.isWidget) {
        var
          widget = this.mouseEvent.widget,
          touchobj = event.changedTouches[0];

        if (this.mouseEvent.moveFn) {
          this.mouseEvent.moveFn(event);
        }
        // cancel when finger moved more than 5px
        if (this.mouseEvent.moveRestrict && !this.mouseEvent.alreadyCanceled &&
          (Math.abs(this.touchStartX - parseInt(touchobj.clientX)) > 5 ||
          Math.abs(this.touchStartY - parseInt(touchobj.clientY)) > 5 )) { // cancel
          this.mouseEvent.alreadyCanceled = true;
          var actionFn = this.mouseEvent.widgetCreator.action;
          if (actionFn) {
            actionFn.call(widget, widget.id, this.mouseEvent.actor, true, event);
          }
        }
      }

      // take care to prevent overscroll
      if (this.scrollElement) {
        var scrollTop = this.scrollElement.scrollTop,
          scrollLeft = this.scrollElement.scrollLeft;
        // prevent scrolling of an element that takes full height and width
        // as it doesn't need scrolling
        if ((scrollTop <= 0) && (scrollTop + this.scrollElement.offsetHeight >= this.scrollElement.scrollHeight) &&
          (scrollLeft <= 0) && (scrollLeft + this.scrollElement.offsetWidth >= this.scrollElement.scrollWidth )) {
          return;
        }
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    }
  }
});