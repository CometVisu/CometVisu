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
    this._openCommand = new qx.ui.command.Command("Ctrl+N");
    this._openCommand.addListener("execute", this.toggleVisibility, this);
    cv.TemplateEngine.getInstance().getCommands().add("open-notificationcenter", this._openCommand);

    qx.event.Registration.addListener(window, "resize", this._onResize, this);

    this.debouncedHide = new qx.util.Function.debounce(this.hide.bind(this), 5000, false);


    cv.TemplateEngine.getInstance().executeWhenDomFinished(this._init, this);

    this.addListener("changedGlobalSeverity", this._onSeverityChange, this);

    this.setDelegate({
      prepareMessage: function(message) {
        // resolve icon if there is one
        if (message.icon) {
          var iconClasses = message.iconClasses ? " "+message.iconClasses : "";
          message.icon = cv.util.IconTools.svgKUF(message.icon)(null, null, "icon" + iconClasses);
        }
      }.bind(this)
    });
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
      return this.getInstance().deleteMessage(index, ev);
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
        this.__badge.classList.add("hidden");
      } else {
        this.__badge.classList.remove("hidden");
      }
    },

    _onResize: function() {
      var height = document.documentElement.clientHeight;
      if (this.__element) {
        this.__element.style.left = document.documentElement.clientWidth + "px";
        this.__element.style.height = height + "px";
      }

      if (this.__messagesContainer) {
        // get header+footer heights
        var
          headerRect = this.__element.querySelector(":scope > header").getBoundingClientRect(),
          footerRect = this.__element.querySelector(":scope > footer").getBoundingClientRect(),
          messageBoxHeight = height -
            Math.round(headerRect.bottom - headerRect.top) -
            Math.round(footerRect.bottom - footerRect.top);
        this.__messagesContainer.style.height = messageBoxHeight + "px";
      }
    },

    /**
     * Attach to dom element and style it
     * @private
     */
    _init: function() {
      var body = document.querySelector("body");
      
      this.__blocker = cv.ui.BodyBlocker.getInstance();

      this.__favico = new Favico({
        animation:'fade',
        bgColor: "#1C391C"
      });

      // check if the element is already there (might have been cached)
      var elem = this.__element = document.querySelector(this.getRootElementId());

      if (!elem) {
        // create new element
        elem = this.__element = qx.dom.Element.create("div", {
          id: this.getRootElementId(),
          style: "visibility: hidden;",
          html: '<div class="badge"></div><header><h3>' + qx.locale.Manager.tr("Message center") + '<div class="action hide"><a href="#" onclick="cv.ui.NotificationCenter.hide()">X</a></div></h3></header><section class="messages"></section><footer><div class="action clear" onclick="cv.ui.NotificationCenter.clear()">' + qx.locale.Manager.tr("Delete all") + '<div></div></footer>'
        });
        body.appendChild(elem);

        // create the template
        var templateCode = '<div class="message {{severity}}{{#actions}} selectable{{/actions}}" title="{{tooltip}}" id="'+this.getMessageElementId()+'{{ id }}">';
        templateCode += '{{#icon}}{{ &icon }}{{/icon}}';
        templateCode += '{{#deletable}}<div class="action delete">x</div>{{/deletable}}';
        templateCode += '{{#title}}<header><h4>{{ title }}</h4></header>{{/title}}';
        templateCode += '<div class="content">{{&message}}</div></div>';

        var template = qx.dom.Element.create("script", {
          id: "MessageTemplate",
          type: "text/template",
          html: templateCode
        });
        body.appendChild(template);
      }

      this.__messagesContainer = elem.querySelector("section.messages");
      this.__badge = elem.querySelector(".badge");
      qx.event.Registration.addListener(this.__badge, "tap", this.toggleVisibility, this);

      // add HTML template for messages to header


      this._list = new qx.data.controller.website.List(this._messages, this.__messagesContainer, "MessageTemplate");
      qx.event.Registration.addListener(this.__messagesContainer, "tap", this._onListTap, this);

      // connect badge content
      this._messages.addListener("changeLength", this.__updateBadge, this);
      this.__updateBadge();

      // update dimensions
      new qx.util.DeferredCall(this._onResize, this).schedule();
    },

    __updateBadge: function() {
      var currentContent = parseInt(this.__badge.getAttribute("html"));
      if (isNaN(currentContent)) {
        currentContent = 0;
      }
      var messages = this.getMessages().getLength();

      var update = function() {
        // still empty
        if (this.getMessages().getLength() === 0) {
          this.hide();
        } else {
          this.__element.style.visibility = '';
          this._onSeverityChange();
        }
      }.bind(this);
      // close center if empty
      if (cv.ui.NotificationCenter.BLINK.duration > 0) {
        qx.event.Timer.once(update, this, cv.ui.NotificationCenter.BLINK.duration);
      } else {
        update();
      }
      if (currentContent < messages) {
        // blink to get the users attention for the new message
        qx.bom.element.Animation.animate(this.__badge, cv.ui.NotificationCenter.BLINK);
      }
      if (messages) {
        this.__badge.innerHTML = ""+messages;
      } else{
        this.__badge.innerHTML = "";
      }


    },

    _onSeverityChange: function() {
      var severity = this.getGlobalSeverity();
      if (this.__badge) {
        this.__badge.classList.remove.apply( this.__badge.classList, this._severities );
        this.__badge.classList.add(severity);
      }

      if (this.__favico) {
        // update favicon badge
        this.__favico.badge(this.getMessages().getLength(), {
          bgColor: this.getSeverityColor(severity)
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
        this.__element.style.visibility = '';
        qx.event.Registration.addListener(this.__blocker.getBlockerElement(), "tap", this.hide, this);
        if (cv.ui.NotificationCenter.SLIDE.duration > 0) {
          var anim = qx.bom.element.Animation.animate(this.__element, cv.ui.NotificationCenter.SLIDE);
          anim.on("end", function () {
            this.__element.style.transform = 'translate(-300px)';
          }, this);
        } else {
          this.__element.style.transform = 'translate(-300px)';
        }
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
        if (cv.ui.NotificationCenter.SLIDE.duration > 0) {
          var anim = qx.bom.element.Animation.animateReverse(this.__element, cv.ui.NotificationCenter.SLIDE);
          anim.on("end", function () {
            this.__element.style.transform = 'translate(-0px)';
            this.__blocker.unblock();
          }, this);
        } else {
          this.__element.style.transform = 'translate(-0px)';
          this.__blocker.unblock();
        }
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
