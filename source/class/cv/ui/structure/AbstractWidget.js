/* AbstractWidget.js 
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


//noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,JSHint
/**
 * This class defines all the building blocks for a Visu in the "Pure" design
 */
qx.Class.define('cv.ui.structure.AbstractWidget', {
  extend: cv.ui.structure.AbstractBasicWidget,
  include: cv.ui.common.HasStyling,
  type: "abstract",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    var parts = this.getPath().split("_"); parts.shift();
    // var prio = parseInt(parts.join(""))*-1;
    // var broker = cv.MessageBroker.getInstance();
    if (cv.TemplateEngine.getInstance().isDomFinished()) {
      this._onDomFinished();
    } else {
      qx.event.message.Bus.subscribe("setup.dom.finished", this._onDomFinished, this);
    }

    // this.debug(props.$$type+" INIT ["+props.path+"]");
    // bind visibility to parent page
    new qx.util.DeferredCall(function() {
      if (cv.Config.lazyLoading === true && !this.getParentWidget()) {
        // initialize the ancestors
        var parentData = cv.util.Tree.getParentData(props.path);
        if (parentData) {
          // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + props.$$type + " (" + props.path + ")");
          var parent = cv.ui.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
          this.setParentWidget(parent);
        }
      }
      var parentPage = this.get$$type() === "page" || this.get$$type() === "navbar" ? null : this.getParentPage();
      if (parentPage) {
        parentPage.bind("visible", this, "visible");
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
    anonymous : {
      check: "Boolean",
      init: false
    },
    flavour           : { check: "String", init: '', nullable: true },
    layout            : { check: "Object", nullable: true},
    label             : { check: "String", init: '', nullable: true },
    bindClickToWidget : { check: "Boolean", init: false },
    mapping           : { check: "String", nullable: true },
    align             : { check: "String", nullable: true },
    classes           : { check: "String", init: '', nullable: true },
    style             : { check: "String", init: ''},
    colspan           : { check: "Number", init: 6, transform: "string2number" },
    colspanM          : { check: "Number", init: 6, transform: "string2number" },
    colspanS          : { check: "Number", init: 6, transform: "string2number" },
    rowspanClass      : { check: "String", init: "" },
    containerClass    : { check: "String", nullable: true },
    visible           : {
      check: "Boolean",
      init: false,
      event: "changeVisible",
      apply: "_applyVisible"
    }
  },

  /*
  ******************************************************
    EVENTS
  ******************************************************
  */
  events: {
    "domReady": "qx.event.type.Event"
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    $$domReady: null,

    // property apply
    _applyVisible: function(value, old) {
    },

    /**
     * Property transformaon helper
     * @param value {String}
     * @return {Number}
     */
    string2number: function(value) {
      return parseFloat(value);
    },

    /**
     * Default action for pointerdown events, does nothing but can be overridden
     * by subclasses
     * @param ev {Event} pointerdown event
     */
    downaction: function(ev) {}, // jshint ignore:line

    /**
     * Default action for tap events, does nothing but can be overridden
     * by subclasses
     * @param ev {Event} tap event
     */
    action: function(ev) {}, // jshint ignore:line

    /**
     * Triggered by the <code>setup.dom.finished</code> bus event
     */
    _onDomFinished: function() {
      if (!this.isVisible()) {
        this.addListenerOnce("changeVisible", this._onDomFinished, this);
        return;
      }
      this._onDomReady();
    },

    /**
     * Called when all widgets are available in the DOM tree
     */
    _onDomReady: function() {
      if (!this.$$domReady) {
        this.initListeners();
        this.fireEvent("domReady");
        this.$$domReady = true;
      }
    },

    /**
     * Return the widgets actor element
     * @return {Element}
     */
    getActor: function() {
      return qx.bom.Selector.query('.actor', this.getDomElement())[0];
    },

    /**
     * Return the widgets value element
     * @return {Element}
     */
    getValueElement: function() {
      return qx.bom.Selector.query(".value", this.getDomElement())[0];
    },

    /**
     * Return the widgets widget element
     * @return {Element}
     */
    getWidgetElement: function() {
      return qx.bom.Selector.query('.widget', this.getDomElement())[0];
    },

    /**
     * Return the element which should be used to attach listeners too.
     * Unsually this would be the actor but if bindClickToWidget is true
     * it would be the DomElement (aka widget-container)
     * @return {Element}
     */
    getInteractionElement: function() {
      return this.isBindClickToWidget() ? this.getDomElement() : this.getActor();
    },

    /**
     * Initialize the widgets listeners
     */
    initListeners: function() {
      this.addElementListener("tap", this.action, this);
    },

    /**
     * Add a listener to the widgets interaction element
     * @param type {String} event type to listen to
     * @param callback {Function} called when the event occurs
     * @param context {Object} this context for the callback
     * @return {var} the listener id
     */
    addElementListener: function(type, callback, context) {
      if (this.isAnonymous()) { return; }
      var widget = this.getInteractionElement();
      if (widget) {
        return qx.event.Registration.addListener(widget, type, callback, context);
      }
      return null;
    },

    /**
     * Generates the DOM string for this widget
     *
     * @return {String} The widgets DOM representation as string
     */
    getDomString : function() {
      return '<div class="'+this.getClasses()+'" ' + this.getStyle() + '>' + this.getLabel() +
        this._getInnerDomString() +'</div>';
    },

    /**
     * Return the inner DOM string for this widget
     * @return {String} HTML code as string
     */
    _getInnerDomString: function() {
      return "";
    }
  }
});