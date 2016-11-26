/**
 * This class defines all the building blocks for a Visu in the "Pure" design
 * @class cv.structure.pure.AbstractWidget
 */
qx.Class.define('cv.structure.pure.AbstractWidget', {
  extend: cv.structure.pure.AbstractBasicWidget,
  include: [cv.role.HasStyling],
  type: "abstract",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", this._onDomReady, this);
    // this.addPopup('unknown', {
    //   /**
    //    * Description
    //    * @method create
    //    * @param {} attributes
    //    * @return ret_val
    //    */
    //   create: function (attributes) {
    //     var reposition = false;
    //     var ret_val = $('<div class="popup" style="display:none"><div class="popup_close">X</div></div><div class="popup_background" style="display:none" />').appendTo('body');
    //     ret_val.addClass(this.type);
    //
    //     if (attributes.title) {
    //       ret_val.filter(".popup").append($('<div class="head" />').append(attributes.title));
    //     }
    //
    //     if (attributes.content) {
    //       ret_val.filter(".popup").append($('<div class="main" />').append(attributes.content));
    //     }
    //
    //     if (attributes.width) {
    //       ret_val.width(attributes.width);
    //       reposition = true;
    //     }
    //
    //     if (attributes.height) {
    //       ret_val.height(attributes.height);
    //       reposition = true;
    //     }
    //
    //     var anchor = {x: -1, y: -1, w: 0, h: 0};
    //     var align;
    //     if (attributes.position) {
    //       if (attributes.position.offset) {
    //         var offset = attributes.position.offset();
    //         anchor.x = offset.left;
    //         anchor.y = offset.top;
    //         anchor.w = attributes.position.width();
    //         anchor.h = attributes.position.height();
    //       } else {
    //         if (attributes.position.hasOwnProperty('x')) anchor.x = attributes.position.x;
    //         if (attributes.position.hasOwnProperty('y')) anchor.y = attributes.position.y;
    //         if (attributes.position.hasOwnProperty('w')) anchor.w = attributes.position.w;
    //         if (attributes.position.hasOwnProperty('h')) anchor.h = attributes.position.h;
    //         if (anchor.w == 0 && anchor.h == 0) align = 5;
    //       }
    //     }
    //     if (attributes.align !== undefined) align = attributes.align;
    //     var placement = placementStrategy(
    //       anchor,
    //       {w: ret_val.outerWidth(), h: ret_val.outerHeight()},
    //       {w: $(window).width(), h: $(window).height()},
    //       align
    //     );
    //     ret_val.css('left', placement.x);
    //     ret_val.css('top', placement.y);
    //
    //     ret_val.bind('close', this.close);
    //     ret_val.bind('click', function () {
    //       // note: this will call two events - one for the popup itself and
    //       //       one for the popup_background.
    //       ret_val.trigger('close');
    //       return false;
    //     });
    //     $('.popup_close').bind('touchend', function () {
    //       // note: this will call two events - one for the popup itself and
    //       //       one for the popup_background.
    //       ret_val.trigger('close');
    //       return false;
    //     });
    //
    //     ret_val.css('display', 'block');
    //     $('#centerContainer').addClass('inactiveMain');
    //     return ret_val;
    //   },
    //   /**
    //    * Description
    //    * @method close
    //    * @param {} event
    //    */
    //   close: function (event) {
    //     $('#centerContainer').removeClass('inactiveMain');
    //     event.currentTarget.remove();
    //   }
    // });
    //
    // this.addPopup('info', $.extend(true, {}, this.getPopup('unknown')));
    // this.addPopup('warning', $.extend(true, {}, this.getPopup('unknown')));
    // this.addPopup('error', $.extend(true, {}, this.getPopup('unknown')));
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {

    popups            : { init: {} },
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
    rowspanClass      : { check: "String" }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    downaction: function() {},
    action: function() {},

    _onDomReady: function() {
      this.initListeners();
      this.processAfterChain("_onDomReady");
    },

    getActor: function() {
      return qx.bom.Selector.query('.actor', this.getDomElement())[0];
    },

    getValueElement: function() {
      return qx.bom.Selector.query(".value", this.getDomElement())[0];
    },

    getWidgetElement: function() {
      return qx.bom.Selector.query('.widget', this.getDomElement())[0];
    },

    /**
     * Return the element which should be used to attach listeners too.
     * Unsually this would be the actor but if bindClickToWidget is true
     * it would be the DomElement (aka widget-container)
     */
    getInteractionElement: function() {
      return this.isBindClickToWidget() ? this.getDomElement() : this.getActor();
    },

    initListeners: function() {
      this.addListener("tap", this.action, this);
    },

    addListener: function(type, callback, context) {
      var widget = this.getInteractionElement();
      if (widget) {
        return qx.event.Registration.addListener(widget, type, callback, context);
      }
      return null;
    },

    /**
     * Generates the DOM string for this widget
     *
     * @method getDomString
     * @returns {string}
     */
    getDomString : function() {
      return '<div class="'+this.getClasses()+'" ' + this.getStyle() + '>' + this.getLabel() +
        (this._getInnerDomString ? this._getInnerDomString() : '') +'</div>';
    },

    getAddressListCallback: function() { return null; }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAddressListCallback: function() {
      return null;
    },

    /**
     * Returns a map with definitions for the XML Parser to map XML-Attribute values
     * to properties e.g
     * {
         *  <attribute-name>: {
         *    target: <property-name>,
         *    default: <default-value>,
         *    transform: <callback to transform the value to the desired value>
         *  }
         * }
     * @returns {Object}
     */
    getAttributeToPropertyMappings: function() {
      return null;
    },

    addPopup: function (name, object) {
      this.popups[name] = object;
      this.popups[name].type = name;
    },

    getPopup: function(name) {
      var p = this.popups[name];
      if (p === undefined) {
        return this.popups.unknown;
      }
      return this.popups[name];
    },

    /**
     * Figure out best placement of popup.
     * A preference can optionally be passed. The position is that of the numbers
     * on the numeric keypad. I.e. a value of "6" means centered above the anchor.
     * A value of "0" means centered to the page
     * @method placementStrategy
     * @param {} anchor
     * @param {} popup
     * @param {} page
     * @param {} preference
     * @return {Map}
     */
    placementStrategy: function( anchor, popup, page, preference ) {
      var position_order = [8, 2, 6, 4, 9, 3, 7, 1, 5, 0];
      if (preference !== undefined) position_order.unshift(preference);

      for (var pos in position_order) {
        var xy = {};
        switch (position_order[pos]) {
          case 0: // page center - will allways work
            return {x: (page.w - popup.w) / 2, y: (page.h - popup.h) / 2};

          case 1:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y + anchor.h;
            break;

          case 2:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y + anchor.h;
            break;

          case 3:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y + anchor.h;
            break;

          case 4:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 5:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 6:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 7:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y - popup.h;
            break;

          case 8:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y - popup.h;
            break;

          case 9:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y - popup.h;
            break;
        }

        // test if that solution is valid
        if (xy.x >= 0 && xy.y >= 0 && xy.x + popup.w <= page.w && xy.y + popup.h <= page.h)
          return xy;
      }

      return {x: 0, y: 0}; // sanity return
    }
  }
});