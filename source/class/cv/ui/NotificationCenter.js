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
  include: cv.ui.MHandleMessage,
  type: "singleton",

  /*
 *****************************************************************************
    CONSTRUCTOR
 *****************************************************************************
 */
  construct: function () {
    this.base(arguments);

    this.set({
      rootElementId: "notification-center",
      messageElementId: "notification_"
    });
    // register to topics
    cv.core.notifications.Router.getInstance().registerMessageHandler(this, {
      'cv.*': {}
    });
    this._openCommand = new qx.ui.command.Command("Ctrl+M");
    this._openCommand.addListener("execute", this.toggleVisibility, this);
    cv.TemplateEngine.getInstance().getCommands().add("open-notificationcenter", this._openCommand);

    qx.event.Registration.addListener(window, "resize", this._onResize, this);

    this.debouncedHide = new qx.util.Function.debounce(this.hide.bind(this), 5000, false);


    cv.TemplateEngine.getInstance().executeWhenDomFinished(this._init, this);

    this.addListener("changedGlobalSeverity", this._onSeverityChange, this);
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
   MEMBERS
*****************************************************************************
*/
  members: {
    _list: null,
    __element: null,
    __messagesContainer: null,
    __visible: false,
    __blocker: null,
    __badge: null,
    __favico: null,
    _openCommand: null,

    disableBadge: function(value) {
      if (value) {
        qx.bom.element.Class.add(this.__badge, "hidden");
      } else {
        qx.bom.element.Class.remove(this.__badge, "hidden");
      }
    },

    _onResize: function() {
      var height = qx.bom.Viewport.getHeight();
      if (this.__element) {
        qx.bom.element.Style.setStyles(this.__element, {
          left: qx.bom.Viewport.getWidth() + "px",
          height: height + "px"
        }, false);
      }

      if (this.__messagesContainer) {
        // get header+footer heights
        var messageBoxHeight = height -
          qx.bom.element.Dimension.getHeight(qx.bom.Selector.query("> header", this.__element)[0]) -
          qx.bom.element.Dimension.getHeight(qx.bom.Selector.query("> footer", this.__element)[0]);
        qx.bom.element.Style.setStyles(this.__messagesContainer, {
          height: messageBoxHeight + "px"
        }, false);
      }
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

      // check if the element is already there (might have been cached)
      var elem = this.__element = qx.bom.Selector.query(this.getRootElementId())[0];

      if (!elem) {
        // create new element
        elem = this.__element = qx.dom.Element.create("div", {
          id: this.getRootElementId(),
          style: "visibility: hidden;",
          html: '<div class="badge"></div><header><h3>' + qx.locale.Manager.tr("Message center") + '<div class="action hide"><a href="#" onclick="cv.ui.NotificationCenter.hide()">X</a></div></h3></header><section class="messages"></section><footer><div class="action clear" onclick="cv.ui.NotificationCenter.clear()">' + qx.locale.Manager.tr("Delete all") + '<div></div></footer>'
        });
        qx.dom.Element.insertEnd(elem, body);

        var template = qx.dom.Element.create("script", {
          id: "MessageTemplate",
          type: "text/template",
          html: '<div class="message {{severity}}{{#actions}} selectable{{/actions}}" title="{{tooltip}}" id="'+this.getMessageElementId()+'{{ id }}">{{#title}}<header><h4>{{ title }}</h4></header>{{/title}}{{#deletable}}<div class="action delete">x</div>{{/deletable}}<div class="content">{{&message}}</div></div>'
        });
        qx.dom.Element.insertEnd(template, body);
      }

      this.__messagesContainer = qx.bom.Selector.query("section.messages", elem)[0];
      this.__badge = qx.bom.Selector.query(".badge", elem)[0];
      qx.event.Registration.addListener(this.__badge, "tap", this.toggleVisibility, this);

      // add HTML template for messages to header


      this._list = new qx.data.controller.website.List(this._messages, this.__messagesContainer, "MessageTemplate");
      qx.event.Registration.addListener(this.__messagesContainer, "tap", this._onListTap, this);

      // connect badge content
      this._messages.addListener("changeLength", this.__updateBadge, this);

      // update dimensions
      new qx.util.DeferredCall(this._onResize, this).schedule();
    },

    __updateBadge: function() {
      var currentContent = parseInt(qx.bom.element.Attribute.get(this.__badge, "html"));
      var messages = this.getMessages().getLength();
      if (this.getMessages().length === 0) {
        // close center if empty
        qx.event.Timer.once(function() {
          // still empty
          if (messages === 0) {
            this.hide();
          }
        }, this, 1000);
      }
      if (currentContent < messages) {
        // blink to get the users attention for the new message
        qx.bom.element.Animation.animate(this.__badge, cv.ui.NotificationCenter.BLINK);
      }
      if (messages) {
        qx.bom.element.Attribute.set(this.__badge, "html", ""+messages);
      } else{
        qx.bom.element.Attribute.set(this.__badge, "html", "");
      }


    },

    _onSeverityChange: function(ev) {
      if (this.__badge) {
        qx.bom.element.Class.removeClasses(this.__badge, this._severities);
        qx.bom.element.Class.add(this.__badge, ev.getData());
      }

      if (this.__favico) {
        // update favicon badge
        this.__favico.badge(this.getMessages().getLength(), {
          bgColor: this.getSeverityColor(ev.getData())
        });
      }
    },

    /**
     * Show the NotificationCenter
     */
    show: function() {
      if (!this.__visible) {
        this.__visible = true;
        this.__blocker.block();
        qx.bom.element.Style.reset(this.__element, "visibility");
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
    this._disposeObjects("__blocker", "__messagesContainer", "_openCommand");
  }
});
