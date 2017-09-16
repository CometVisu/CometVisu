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
 *   icon: {String} icon name (KNX-UF icon)
 *   iconClasses: {String} CSS classes that should be added to the icon element
 *   deletable: {Boolean} Flag to determine if the user can delete the message
 *   severity: {String} one of "low", "normal", "high", "urgent"
 *   tooltip: {String} Tooltip for the message
 *   progress: {Integer} indicates a progress state in percent of some long running process.
 *   action: {
 *     actionType {String}: {
 *      action: {Function} Called when the action gets executed (when the user clicks on the message)
 *      params: {Array?} Additional parameters for the callback
 *      needsConfirmation: {Boolean} If true the execution of the action must be confirmed by the user
 *      deleteMessageAfterExecution: {Boolean} If true the message gets deleted after action execution
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
     * Shortcut to {@link cv.ui.NotificationCenter#deleteMessage}
     * @param index {Number}
     * @param ev {Event}
     * @see cv.ui.NotificationCenter#deleteMessage
     */
    deleteMessage: function(index, ev) {
      this.getInstance().deleteMessage(index, ev);
    },

    /**
     * Shortcut to {@link cv.ui.NotificationCenter#clear}
     * @param force {Boolean}
     * @see cv.ui.NotificationCenter#clear
     */
    clear: function(force) {
      this.getInstance().clear(force);
    },

    /**
     * Shortcut to {@link cv.ui.NotificationCenter#hide}
     * @see cv.ui.NotificationCenter#hide
     */
    hide: function() {
      this.getInstance().hide();
    },

    /**
     * Shortcut to {@link cv.ui.NotificationCenter#performAction}
     * @param messageId {Number}
     * @param ev {Event}
     * @see cv.ui.NotificationCenter#performAction
     */
    performAction: function(messageId, ev) {
      this.getInstance().performAction(messageId, ev);
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
        html: '<div class="message {{severity}}{{#actions}} selectable{{/actions}}" title="{{tooltip}}" id="notification_{{ id }}">{{#title}}<header><h4>{{ title }}</h4></header>{{/title}}{{#deletable}}<div class="action delete">x</div>{{/deletable}}<div class="content">{{&message}}</div></div>'
      });
      qx.dom.Element.insertEnd(template, body);
      this.__list = new qx.data.controller.website.List(this.__messages, this.__messagesContainer, "MessageTemplate");
      qx.event.Registration.addListener(this.__messagesContainer, "tap", this._onListTap, this);

      // connect badge content
      this.__messages.addListener("changeLength", this.__updateBadge, this);

      // update dimensions
      new qx.util.DeferredCall(this._onResize, this).schedule();
    },

    _onListTap: function(ev) {
      // lets find the real target
      var target = ev.getTarget();
      var deleteTarget = null;
      var messageId = null;
      var id = qx.bom.element.Attribute.get(target, "id");
      while (!id || !id.startsWith("notification-center")) {
        if (qx.bom.element.Class.has(target, "delete")) {
          deleteTarget = target;
        }
        if (id && id.startsWith("notification_")) {
          // found the message container, get message id and stop
          messageId = parseInt(id.replace("notification_", ""));
          break;
        }
        target = target.parentNode;
        if (!target) {
          break;
        }
        id = qx.bom.element.Attribute.get(target, "id");
      }
      if (messageId >= 0) {
        if (deleteTarget) {
          this.deleteMessage(messageId, ev);
        } else {
          this.performAction(messageId, ev);
        }
      }
    },

    __updateBadge: function() {
      var currentContent = parseInt(qx.bom.element.Attribute.get(this.__badge, "html"));
      this.setCounter(this.__messages.length);
      if (this.__messages.length === 0) {
        // close center if empty
        qx.event.Timer.once(function() {
          // still empty
          if (this.__messages.length === 0) {
            this.hide();
          }
        }, this, 1000);
      }
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
      if (this.__messages.getLength() > value) {
        this.__messages.splice(this.__messages.getLength() - value);
      }
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
            message.tooltip = this.__getTooltip(message);
            if (!message.hasOwnProperty("deletable")) {
              message.deletable = true;
            }
            if (cv.core.notifications.Router.evaluateCondition(message)) {
              var changed = msg.severity !== message.severity;
              this.__messages.setItem(index, message);
              if (changed) {
                this.__updateBadge();
              }
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
          message.tooltip = this.__getTooltip(message);
          if (!message.hasOwnProperty("deletable")) {
            message.deletable = true;
          }
          if (this.getMaxEntries() > 0) {
            if (this.__messages.getLength() >= this.getMaxEntries()) {
              this.__messages.splice(0, this.__messages.getLength() - this.getMaxEntries() + 1).forEach(this._disposeMap);
            }
          }
          this.__messages.push(message);
        }
      } else {
        // refresh list
        this.__list.update();
      }
    },

    __getTooltip: function(message) {
      var tooltip = message.severity;
      if (message.actions) {
        Object.getOwnPropertyNames(message.actions).forEach(function(type) {
          if (message.actions[type].title) {
            tooltip = message.actions[type].title;
          }
        });
      }
      return tooltip;
    },

    /**
     * Delete all messages.
     *
     * @param force {Boolean} if false: only delete "deletable" messages, if true: delete all messages
     */
    clear: function(force) {
      if (force) {
        this.__messages.removeAll();
      } else {
        // collect all deletable messages
        var deletable = this.__messages.filter(function (message) {
          return message.deletable === true;
        }, this);
        this.__messages.exclude(deletable);
      }
    },

    /**
     * Delete a message by index
     * @param ev {Event}
     * @param index {Number}
     */
    deleteMessage: function(index, ev) {
      if (ev) {
        ev.stopPropagation();
        ev.preventDefault();
      }
      var message = this.__messages.getItem(index);
      if (message.deletable === true) {
        this.__messages.removeAt(index);
      }
    },

    performAction: function(messageId, ev) {
      var message = this.__messages.getItem(messageId);
      if (!message || !message.actions) {
        return;
      }
      Object.getOwnPropertyNames(message.actions).forEach(function(type) {
        var typeActions = qx.lang.Type.isArray(message.actions[type]) ? message.actions[type] : [message.actions[type]];
        typeActions.forEach(function(action) {
          if (!action.needsConfirmation) {
            var handler = cv.core.notifications.ActionRegistry.getActionHandler(type, action);
            if (handler) {
              handler.handleAction(ev);
              if (action.deleteMessageAfterExecution) {
                this.deleteMessage(messageId);
              }
            }
          }
        }, this);
      }, this);
    }
  },

  /*
 *****************************************************************************
    DESTRUCTOR
 *****************************************************************************
 */
  destruct:  /* istanbul ignore next [destructor not called in singleton] */ function () {
    qx.event.Registration.removeListener(window, "resize", this._onResize, this);
    qx.event.Registration.removeListener(this.__blocker.getBlockerElement(), "tap", this.hide, this);
    qx.event.Registration.removeListener(this.__messagesContainer, "tap", this._onListTap, this);
    this._disposeObjects("__blocker", "__messagesContainer");
  }
});
