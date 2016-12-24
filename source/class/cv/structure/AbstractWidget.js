/* AbstractWidget.js 
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
 * This class defines all the building blocks for a Visu in the "Pure" design
 * @class cv.structure.AbstractWidget
 */
qx.Class.define('cv.structure.AbstractWidget', {
  extend: cv.structure.AbstractBasicWidget,
  include: [cv.role.HasStyling],
  type: "abstract",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    var parts = this.getPath().split("_"); parts.shift();
    var prio = parseInt(parts.join(""))*-1;
    var broker = cv.MessageBroker.getInstance();
    broker.subscribe("setup.dom.finished", this._onDomFinished, this, prio);

    // this.debug(props.$$type+" INIT ["+props.path+"]");
    // bind visibility to parent page
    new qx.util.DeferredCall(function() {
      if (cv.Config.lazyLoading === true && !this.getParentWidget()) {
        // initialize the ancestors
        var parentData = cv.util.Tree.getParentData(props.path);
        if (parentData) {
          // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + props.$$type + " (" + props.path + ")");
          var parent = cv.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
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
    visible           : {
      check: "Boolean",
      init: false,
      event: "changeVisible"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __init: null,

    /**
     * Default action for pointerdown events, does nothing but can be overridden
     * by subclasses
     * @param ev {Event} pointerdoen event
     */
    downaction: function(ev) {},

    /**
     * Default action for tap events, does nothing but can be overridden
     * by subclasses
     * @param ev {Event} tap event
     */
    action: function(ev) {},

    /**
     * Triggered by the {@link cv.MessageBroker} <code>setup.dom.finished</code> message
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
      if (!this.__init) {
        this.initListeners();
        this.processAfterChain("_onDomReady");
        this.__init = true;
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
      if (this.isAnonymous()) return;
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
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {

    /**
     * Returns a map with definitions for the XML Parser to map XML-Attribute values
     * to properties e.g
     * <pre>{
         *  <attribute-name>: {
         *    target: <property-name>,
         *    default: <default-value>,
         *    transform: <callback to transform the value to the desired value>
         *  }
         * }</pre>
     * @return {Object}
     */
    getAttributeToPropertyMappings: function() {
      return null;
    }
  }
});