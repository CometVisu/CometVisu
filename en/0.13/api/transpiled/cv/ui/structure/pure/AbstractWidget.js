(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractBasicWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.HasStyling": {
        "require": true
      },
      "cv.TemplateEngine": {
        "construct": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "cv.Config": {
        "construct": true
      },
      "cv.util.Tree": {
        "construct": true
      },
      "cv.ui.structure.WidgetFactory": {
        "construct": true
      },
      "cv.ui.structure.pure.layout.Manager": {},
      "qx.event.Registration": {},
      "cv.ui.common.HandleLongpress": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractWidget.js
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

  //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,JSHint
  /**
   * This class defines all the building blocks for a Visu in the "Pure" design
   */
  qx.Class.define('cv.ui.structure.pure.AbstractWidget', {
    extend: cv.ui.structure.pure.AbstractBasicWidget,
    include: cv.ui.common.HasStyling,
    type: 'abstract',
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      cv.ui.structure.pure.AbstractBasicWidget.constructor.call(this, props);
      var parts = this.getPath().split('_');
      parts.shift();
      // var prio = parseInt(parts.join(""))*-1;
      // var broker = cv.MessageBroker.getInstance();
      if (cv.TemplateEngine.getInstance().isDomFinished()) {
        this._onDomFinished();
      } else {
        qx.event.message.Bus.subscribe('setup.dom.finished', this._onDomFinished, this);
      }

      // this.debug(props.$$type+" INIT ["+props.path+"]");
      // bind visibility to parent page
      new qx.util.DeferredCall(function () {
        if (cv.Config.lazyLoading === true && !this.getParentWidget()) {
          // initialize the ancestors
          var parentData = cv.util.Tree.getParentData(props.path);
          if (parentData) {
            // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + props.$$type + " (" + props.path + ")");
            var parent = cv.ui.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
            this.setParentWidget(parent);
          }
        }
        var parentPage = this.get$$type() === 'page' || this.get$$type() === 'navbar' ? null : this.getVisibilityParent();
        if (parentPage) {
          parentPage.bind('visible', this, 'visible');
        }
      }, this).schedule();
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      /**
       * If true this widget does not automatically apply any listeners
       */
      anonymous: {
        check: 'Boolean',
        init: false
      },
      flavour: {
        check: 'String',
        init: '',
        nullable: true
      },
      layout: {
        check: 'Object',
        nullable: true
      },
      label: {
        check: 'String',
        init: '',
        nullable: true
      },
      bindClickToWidget: {
        check: 'Boolean',
        init: false
      },
      mapping: {
        check: 'String',
        nullable: true
      },
      align: {
        check: 'String',
        nullable: true
      },
      classes: {
        check: 'String',
        init: '',
        nullable: true
      },
      style: {
        check: 'String',
        init: ''
      },
      colspan: {
        check: 'Number',
        init: 6,
        transform: 'string2number'
      },
      colspanM: {
        check: 'Number',
        init: 6,
        transform: 'string2number'
      },
      colspanS: {
        check: 'Number',
        init: 6,
        transform: 'string2number'
      },
      rowspanClass: {
        check: 'String',
        init: ''
      },
      containerClass: {
        check: 'String',
        nullable: true
      },
      visible: {
        check: 'Boolean',
        init: false,
        event: 'changeVisible',
        apply: '_applyVisible'
      },
      responsive: {
        check: 'Boolean',
        init: false
      }
    },
    /*
    ******************************************************
      EVENTS
    ******************************************************
    */
    events: {
      domReady: 'qx.event.type.Event'
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      $$domReady: null,
      __P_57_0: null,
      __P_57_1: null,
      _skipNextEvent: null,
      __P_57_2: null,
      __P_57_3: null,
      // property apply
      _applyVisible: function _applyVisible(value, old) {},
      getResponsiveLayout: function getResponsiveLayout(width) {
        if (!this.isResponsive()) {
          return this.getLayout();
        }
        if (!width) {
          width = cv.ui.structure.pure.layout.Manager.getAvailableWidth();
        }
        var layout = this.getLayout();
        var suffix = cv.ui.structure.pure.layout.Manager.getLayoutSuffix(width);
        if (suffix) {
          var l = {};
          ['x', 'y', 'width', 'scale'].forEach(function (prop) {
            if (layout[prop]) {
              // use default value
              l[prop] = layout[prop];
            }
            if (layout[prop + suffix]) {
              // override default value
              l[prop] = layout[prop + suffix];
            }
          });
          return l;
        }
        return layout;
      },
      /**
       * Property transformaon helper
       * @param value {String}
       * @return {Number}
       */
      string2number: function string2number(value) {
        return parseFloat(value);
      },
      /**
       * Default action for pointerdown events, does nothing but can be overridden
       * by subclasses
       * @param ev {Event} pointerdown event
       */
      downaction: function downaction(ev) {},
      /**
       * Default action for tap events, does nothing but can be overridden
       * by subclasses
       * @param ev {Event} tap event
       */
      action: function action(ev) {},
      /**
       * Triggered by the <code>setup.dom.finished</code> bus event
       */
      _onDomFinished: function _onDomFinished() {
        if (!this.isVisible()) {
          this.addListenerOnce('changeVisible', this._onDomFinished, this);
          return;
        }
        this._onDomReady();
      },
      /**
       * Called when all widgets are available in the DOM tree
       */
      _onDomReady: function _onDomReady() {
        if (!this.$$domReady) {
          this.initListeners();
          this.fireEvent('domReady');
          this.$$domReady = true;
        }
      },
      /**
       * Return the widgets actor element
       * @return {Element}
       */
      getActor: function getActor() {
        var elem = this.getDomElement();
        if (elem) {
          return elem.querySelector('.actor');
        }
        this.error('no dom element found for', this.get$$type(), this.getPath());
        return null;
      },
      /**
       * Return the widgets value element
       * @return {Element}
       */
      getValueElement: function getValueElement() {
        var elem = this.getDomElement();
        if (elem) {
          return elem.querySelector('.value');
        }
        return null;
      },
      /**
       * Return the widgets widget element
       * @return {Element}
       */
      getWidgetElement: function getWidgetElement() {
        var elem = this.getDomElement();
        if (elem) {
          return elem.querySelector('.widget');
        }
        return null;
      },
      /**
       * Return the element which should be used to attach listeners too.
       * Unsually this would be the actor but if bindClickToWidget is true
       * it would be the DomElement (aka widget-container)
       * @return {Element}
       */
      getInteractionElement: function getInteractionElement() {
        return this.isBindClickToWidget() ? this.getDomElement() : this.getActor();
      },
      /**
       * Initialize the widgets listeners
       */
      initListeners: function initListeners() {
        this.addElementListener('tap', this.action, this);

        // we need to listen to pointerdown to detect taps with
        if (this.buttonPressed) {
          this.addElementListener('pointerdown', this._onPointerDown, this);
          this.addElementListener('contextmenu', this._cancelEvent, this);
        }
      },
      _cancelEvent: function _cancelEvent(ev) {
        ev.preventDefault();
        ev.stopPropagation();
      },
      _onPointerDown: function _onPointerDown(ev) {
        // listen to pointerup globally
        this.__P_57_0 = ev.getCurrentTarget();
        this.__P_57_1 = Date.now();
        if (this.__P_57_2) {
          this.__P_57_2.stop();
          this.__P_57_2 = null;
        }
        qx.event.Registration.addListener(document, 'pointerup', this._onPointerUp, this);
        if (this._onLongTap && qx.Class.hasMixin(this.constructor, cv.ui.common.HandleLongpress) && !this.isSendLongOnRelease() && this.getShortThreshold() > 0) {
          var clonedEv = ev.clone();
          this.__P_57_2 = qx.event.Timer.once(function () {
            this._onLongTap(clonedEv);
            this._skipNextEvent = 'tap';
            this.__P_57_4();
          }, this, this.getShortThreshold());
          this.__P_57_3 = {
            x: ev.getDocumentLeft(),
            y: ev.getDocumentTop()
          };

          // also listen to move events to detect if the pointer is moved away from the widget (or scrolled)
          qx.event.Registration.addListener(document, 'pointermove', this._onPointerMove, this);
        }
      },
      __P_57_4: function __P_57_4() {
        qx.event.Registration.removeListener(document, 'pointerup', this._onPointerUp, this);
        qx.event.Registration.removeListener(document, 'pointermove', this._onPointerMove, this);
        this.__P_57_1 = null;
        this.__P_57_3 = null;
        if (this.__P_57_2) {
          this.__P_57_2.stop();
          this.__P_57_2 = null;
        }
      },
      _onPointerMove: function _onPointerMove(ev) {
        var upElement = ev.getTarget();
        var distance = Math.max(Math.abs(this.__P_57_3.x - ev.getDocumentLeft()), Math.abs(this.__P_57_3.y - ev.getDocumentTop()));
        var abort = distance > 5;
        if (!abort) {
          while (upElement && upElement !== this.__P_57_0) {
            upElement = upElement.parentNode;
            if (upElement === this.getDomElement()) {
              break;
            }
          }
          abort = !upElement || upElement !== this.__P_57_0;
        }
        if (abort) {
          this.__P_57_4();
        }
      },
      _onPointerUp: function _onPointerUp(ev) {
        if (this.__P_57_1 === null) {
          // ignore pointer ups when the pointerdown has not set a start time
          return;
        }
        var upElement = ev.getTarget();
        while (upElement && upElement !== this.__P_57_0) {
          upElement = upElement.parentNode;
          if (upElement === this.getDomElement()) {
            break;
          }
        }
        if (upElement && upElement === this.__P_57_0) {
          this._skipNextEvent = 'tap';
          // both events happened on the same element
          ev.setCurrentTarget(upElement);
          if (this._onLongTap && qx.Class.hasMixin(this.constructor, cv.ui.common.HandleLongpress) && this.getShortThreshold() > 0 && Date.now() - this.__P_57_1 >= this.getShortThreshold()) {
            // this is a longpress
            this._onLongTap(ev);
          } else {
            this.action(ev);
          }
        }
        this.__P_57_4();
      },
      /**
       * Add a listener to the widgets interaction element
       * @param type {String} event type to listen to
       * @param callback {Function} called when the event occurs
       * @param context {Object} this context for the callback
       * @return {var} the listener id
       */
      addElementListener: function addElementListener(type, callback, context) {
        if (this.isAnonymous()) {
          return null;
        }
        var widget = this.getInteractionElement();
        if (widget) {
          widget.dataset['longtapable'] = type !== 'longtap';
          return qx.event.Registration.addListener(widget, type, callback, context);
        }
        return null;
      },
      /**
       * Remove a listener from the widgets interaction element
       * @param type {String} event type
       * @param callback {Function}
       * @param context {Object} this context
       * @return {Boolean} Whether the event was removed..
       */
      removeElementListener: function removeElementListener(type, callback, context) {
        if (this.isAnonymous()) {
          return false;
        }
        var widget = this.getInteractionElement();
        if (widget) {
          return qx.event.Registration.removeListener(widget, type, callback, context);
        }
        return false;
      },
      /**
       * Generates the DOM string for this widget
       *
       * @return {String} The widgets DOM representation as string
       */
      getDomString: function getDomString() {
        return '<div class="' + this.getClasses() + '" ' + this.getStyle() + '>' + this.getLabel() + this._getInnerDomString() + '</div>';
      },
      /**
       * Return the inner DOM string for this widget
       * @return {String} HTML code as string
       */
      _getInnerDomString: function _getInnerDomString() {
        return '';
      }
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      qx.event.Registration.removeListener(document, 'pointerup', this._onPointerUp, this);
    }
  });
  cv.ui.structure.pure.AbstractWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractWidget.js.map?dt=1702901288933