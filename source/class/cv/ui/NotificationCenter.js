/* NotificationCenter.js 
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


/**
 * The NotificationCenter shows messages in a list. Messages are Maps which can have the following structure:
 *
 * <pre>
 * {
 *   topic: {String} Topic of the message
 *   title: {String} Title of the message
 *   message: {String} The message content
 *   deletable: {Boolean} Flag to determine if the user can delete the message
 *   severity: {String} one of "low", "normal", "high", "urgent"
 *   action: {
 *     callback: {Function} Called when the action gets executed (when the user clicks on the message)
 *     params {Array?} Additional parameters for the callback
 *     needsConfirmation: {Boolean} If true the execution of the action must be confirmed by the user
 *   }
 *   unique: {Boolean} If true there can be only one message of that topic at once
 *   condition: {Boolean|Function} if true this unique message gets removed
 * }
 * </pre>
 *
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.ui.NotificationCenter", {
  extend: qx.core.Object,
  implement: cv.core.notifications.IHandler,
  type: "singleton",

  /*
 *****************************************************************************
    CONSTRUCTOR
 *****************************************************************************
 */
  construct: function () {
    this.base(arguments);

    this.__messages = new qx.data.Array();

    // register to topics
    cv.core.notifications.Router.getInstance().registerMessageHandler(this, {
      'cv.*': {}
    });

    qx.event.Registration.addListener(window, "resize", this._onResize, this);

    this.debouncedHide = new qx.util.Function.debounce(this.hide.bind(this), 5000, false);

    // severities in order of importance -> more important
    this.__severities = ["low", "normal", "high", "urgent"];

    this._init();
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    SLIDE: {
      duration: 350,
      timing: "linear",
      origin: "bottom center",
      keyFrames : {
        0: {
          translate : ["0px"]
        },
        100: {
          translate : ["-300px"]
        }
      }
    },

    BLINK: {
      duration: 1000,
      timing: "ease-in-out",
      origin: "bottom center",
      keyFrames : {
        0: {
          backgroundColor : ["rgba(61, 61, 61, 0.9)"]
        },
        50:{
          backgroundColor : ["rgba(255, 121, 0, 0.9)"]
        },
        100: {
          backgroundColor : ["rgba(61, 61, 61, 0.9)"]
        }
      }
    },

    /**
     * Delete a message by index
     * @param index {Number}
     */
    deleteMessage: function(index) {
      this.getInstance().deleteMessage(index);
    },

    clear: function() {
      this.getInstance().clear();
    },

    hide: function() {
      this.getInstance().hide();
    },

    performAction: function(messageId) {
      this.getInstance().performAction(messageId);
    }
  },


  /*
 *****************************************************************************
    PROPERTIES
 *****************************************************************************
 */
  properties: {
    /**
     * Maximum allowed messages
     */
    maxEntries: {
      check: "Number",
      init: 50,
      event: "_applyMaxEntries"
    },

    /**
     * Current amount of messages
     */
    counter: {
      check: "Number",
      init: 0,
      event: "changeCounter"
    },

    /**
     * Highest severity of the messages
     */
    globalSeverity: {
      check: ["low", "normal", "high", "urgent"],
      init: "normal",
      event: "changeGlobalSeverity"
    }
  },

  /*
*****************************************************************************
   MEMBERS
*****************************************************************************
*/
  members: {
    __messages : null,
    __element: null,
    __messagesContainer: null,
    __list: null,
    __visible: false,
    __blocker: null,
    __badge: null,
    __severities: null,
    __favico: null,

    getSeverities: function() {
      return this.__severities;
    },

    disableBadge: function(value) {
      if (value) {
        qx.bom.element.Class.add(this.__badge, "hidden");
      } else {
        qx.bom.element.Class.remove(this.__badge, "hidden");
      }
    },

    _onResize: function() {
      var height = qx.bom.Viewport.getHeight();
      qx.bom.element.Style.setStyles(this.__element, {
        left: qx.bom.Viewport.getWidth()+"px",
        height: height+"px"
      }, false);

      // get header+footer heights
      var messageBoxHeight = height -
          qx.bom.element.Dimension.getHeight(qx.bom.Selector.query("> header", this.__element)[0]) -
          qx.bom.element.Dimension.getHeight(qx.bom.Selector.query("> footer", this.__element)[0]);
      qx.bom.element.Style.setStyles(this.__messagesContainer, {
        height: messageBoxHeight+"px"
      }, false);
    },

    /**
     * Attach to dom element and style it
     * @private
     */
    _init: function() {
      var body = qx.bom.Selector.query("body")[0];
      
      this.__blocker = cv.ui.BodyBlocker.getInstance();

      this.__favico = new Favico({
        animation:'fade',
        bgColor: "#1C391C"
      });

      // create new element
      var elem = this.__element = qx.dom.Element.create("div", {
        id: "notification-center",
        html: '<div class="badge"></div><header><h3>'+qx.locale.Manager.tr("Message center")+'<div class="action hide"><a href="#" onclick="cv.ui.NotificationCenter.hide()">X</a></div></h3></header><section class="messages"></section><footer class="action clear" onclick="cv.ui.NotificationCenter.clear()">'+qx.locale.Manager.tr("Delete all")+'</footer>'
      });
      qx.dom.Element.insertEnd(elem, body);

      this.__messagesContainer = qx.bom.Selector.query("section.messages", elem)[0];
      this.__badge = qx.bom.Selector.query(".badge", elem)[0];
      qx.event.Registration.addListener(this.__badge, "tap", this.toggleVisibility, this);

      // add HTML template for messages to header

      var template = qx.dom.Element.create("script", {
        id: "MessageTemplate",
        type: "text/template",
        html: '<div class="message {{severity}}" title="{{severity}}" id="notification_{{ id }}"{{#action}} onclick="cv.ui.NotificationCenter.performAction({{id}})"{{/action}}>{{#title}}<header><h4>{{ title }}</h4></header>{{/title}}<div class="content">{{&message}} {{#deletable}}<div class="action delete"><a href="#" onclick="cv.ui.NotificationCenter.deleteMessage({{ id }})">x</a></div>{{/deletable}}</div></div>'
      });
      qx.dom.Element.insertEnd(template, body);
      this.__list = new qx.data.controller.website.List(this.__messages, this.__messagesContainer, "MessageTemplate");

      // connect badge content
      this.__messages.addListener("changeLength", this.__updateBadge, this);

      // update dimensions
      new qx.util.DeferredCall(this._onResize, this).schedule();
    },

    __updateBadge: function() {
      var currentContent = parseInt(qx.bom.element.Attribute.get(this.__badge, "html"));
      this.setCounter(this.__messages.length);
      if (currentContent < this.__messages.length) {
        // blink to get the users attention for the new message
        qx.bom.element.Animation.animate(this.__badge, cv.ui.NotificationCenter.BLINK);
      }
      if (this.__messages.length) {
        qx.bom.element.Attribute.set(this.__badge, "html", ""+this.__messages.length);
      } else{
        qx.bom.element.Attribute.set(this.__badge, "html", "");
      }
      // get the highest severity
      var severityRank = -1;
      this.__messages.forEach(function(message) {
        if (message.severity && this.__severities.indexOf(message.severity) > severityRank) {
          severityRank = this.__severities.indexOf(message.severity);
        }
      }, this);
      qx.bom.element.Class.removeClasses(this.__badge, this.__severities);
      if (severityRank >= 0) {
        this.setGlobalSeverity(this.__severities[severityRank]);
        qx.bom.element.Class.add(this.__badge, this.__severities[severityRank]);
      } else {
        this.resetGlobalSeverity();
      }

      // update favicon badge
      this.__favico.badge(this.__messages.length, {
        bgColor: this.__getSeverityColor(this.__severities[severityRank])
      });
    },

    __getSeverityColor: function(severity) {
      switch(severity) {
        case "urgent":
          return "#FF0000";
        case "high":
          return "#FF7900";
        default:
          return "#1C391C";
      }
    },

    /**
     * Show the NotificationCenter
     */
    show: function() {
      if (!this.__visible) {
        this.__visible = true;
        this.__blocker.block();
        qx.event.Registration.addListener(this.__blocker.getBlockerElement(), "tap", this.hide, this);
        var anim = qx.bom.element.Animation.animate(this.__element, cv.ui.NotificationCenter.SLIDE);
        anim.on("end", function () {
          qx.bom.element.Transform.translate(this.__element, "-300px");
        }, this);
      }
    },

    /**
     * Toggle the NotificationCenter visibility
     */
    toggleVisibility: function() {
      if (this.__visible) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * Hide the NotificationCenter
     */
    hide: function() {
      if (this.__visible) {
        this.__visible = false;
        qx.event.Registration.removeListener(this.__blocker.getBlockerElement(), "tap", this.hide, this);
        var anim = qx.bom.element.Animation.animateReverse(this.__element, cv.ui.NotificationCenter.SLIDE);
        anim.on("end", function () {
          qx.bom.element.Transform.translate(this.__element, "-0px");
          this.__blocker.unblock();
        }, this);
      }
    },

    _applyMaxEntries: function(value) {
      this.__messages.setMaxEntries(value);
    },

    handleMessage: function(message) {
      var found = null;
      if (message.unique) {
        // check if message is already shown
        this.__messages.some(function(msg, index) {
          if (message.topic === msg.topic) {
            // replace message
            found = msg;
            message.id = this.__messages.length;
            if (!message.hasOwnProperty("deletable")) {
              message.deletable = true;
            }
            if (cv.core.notifications.Router.evaluateCondition(message)) {
              this.__messages.setItem(index, message);
            } else{
              this.__messages.removeAt(index);
            }
            // stop search
            return true;
          }
        }, this);
      }
      if (!found) {
        if (cv.core.notifications.Router.evaluateCondition(message)) {
          message.id = this.__messages.length;
          if (!message.hasOwnProperty("deletable")) {
            message.deletable = true;
          }
          this.__messages.push(message);
        }
      } else {
        // refresh list
        this.__list.update();
      }
    },

    clear: function() {
      // collect all deletable messages
      var deletable = this.__messages.filter(function(message) {
        return message.deletable === true;
      }, this);
      this.__messages.exclude(deletable);
    },

    /**
     * Delete a message by index
     * @param index {Number}
     */
    deleteMessage: function(index) {
      var message = this.__messages.getItem(index);
      if (message.deletable === true) {
        this.__messages.removeAt(index);
      }
    },

    performAction: function(messageId) {
      var message = this.__messages.getItem(messageId);
      var action = message.action;
      if (action.needsConfirmation) {
        // TODO: open confirm dialog
      } else {
        this.__performAction(action);
      }
    },

    __performAction: function(action) {
      if (action.callback) {
        action.callback.call(action.callback || this, action.params);
      }
    }
  },

  /*
 *****************************************************************************
    DESTRUCTOR
 *****************************************************************************
 */
  destruct: function () {
    qx.event.Registration.removeListener(window, "resize", this._onResize, this);
    qx.event.Registration.removeListener(this.__blocker.getBlockerElement(), "tap", this.hide, this);
    this._disposeObjects("__blocker");
  }
});
