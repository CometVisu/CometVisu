/* Router.js
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

/**
 * Global notification handler that routes messages topic-dependent to different {@link cv.core.notifications.IHandler}
 * (e.g. NotificationCenter, Dialog, Toast, console.log, native notification, internal message bus ...)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.core.notifications.Router", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
    super();
    this.__routes = {};
    this.debug("new router");

    this.__dateFormat = new qx.util.format.DateFormat(
      qx.locale.Date.getDateFormat("short")
    );
    this.__timeFormat = new qx.util.format.DateFormat(
      qx.locale.Date.getTimeFormat("short")
    );
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Evaluate the message condition, default to true is message has no condition set
     * @param message {Map}
     * @returns {Boolean}
     */
    evaluateCondition(message) {
      if (!Object.prototype.hasOwnProperty.call(message, "condition")) {
        // nothing to evaluate
        return true;
      } else if (typeof message.condition === "boolean") {
        return message.condition;
      } else if (typeof message.condition === "function") {
        return message.condition();
      }
      qx.log.Logger.error(
        this,
        "unhandled message condition type: " + message.condition
      );
      return false;
    },

    /**
     * Shortcut to {@link cv.core.notifications.Router#dispatchMessage}
     * @param topic
     * @param message
     * @param target
     */
    dispatchMessage(topic, message, target) {
      return this.getInstance().dispatchMessage(topic, message, target);
    },

    /**
     * Converts a target name to the related target object/function.
     *
     * @param name {String} target name, e.g. popup, notificationCenter, etc.
     * @return {Object|Function|null} the target that can handle messages
     */
    getTarget(name) {
      switch (name) {
        case "popup":
          return cv.ui.PopupHandler;
        case "notificationCenter":
          return cv.ui.NotificationCenter.getInstance();
        case "speech":
          if (!window.speechSynthesis) {
            // not supported
            qx.log.Logger.warn(
              this,
              "this browser does not support the Web Speech API"
            );
            return null;
          }
          return cv.core.notifications.SpeechHandler.getInstance();
        case "toast":
          return cv.ui.ToastManager.getInstance();
      }

      return null;
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __routes: null,
    __stateMessageConfig: null,
    __dateFormat: null,
    __timeFormat: null,

    getStateMessageConfig() {
      return this.__stateMessageConfig;
    },

    /**
     * Register state update handler for one or more addresses.
     *
     * <h4>Config Map explanation:</h4>
     * <pre class="javascript">
     * {
     *   <address>: [{
     *    topic: "cv.state.<address>", // message topic used for routing
     *    target: "popup", // where to show the message
     *    severity: "normal", // message severity e.g. high, normal, low
     *    skipInitial: true, // do not show message for initial state update
     *    deletable: true, // user can delete this message
     *    unique: true, // show message once at a time
     *    valueMapping: "mapping-name", // optional mapping for value
     *    addressMapping: "mapping-name", // optional mapping name for address
     *    titleTemplate: "Kitchen light on", // title template of the message
     *    messageTemplate: "turned on at {{ time }} o'clock", // message content template
     *    condition: 1 // show only when the value equals the condition value
     *   }]
     * }
     * </pre>
     *
     * @param config {Map}
     */
    registerStateUpdateHandler(config) {
      this.__stateMessageConfig = config;
      Object.getOwnPropertyNames(this.__stateMessageConfig).forEach(function (
        address
      ) {
        cv.data.Model.getInstance().addUpdateListener(
          address,
          this._onIncomingData,
          this
        );
      },
      this);
    },

    /**
     * Unregister state update listeners for a list of addresses
     * @param addresses {Array}
     */
    unregisterStateUpdatehandler(addresses) {
      addresses.forEach(function (address) {
        cv.data.Model.getInstance().removeUpdateListener(
          address,
          this._onIncomingData,
          this
        );
        if (this.__stateMessageConfig[address]) {
          delete this.__stateMessageConfig[address];
        }
      }, this);
    },

    /**
     * Register a handler for a list of topics
     * @param handler {cv.core.notifications.IHandler}
     * @param topics {Map} map of topics as key and configuration-maps as values
     */
    registerMessageHandler(handler, topics) {
      Object.getOwnPropertyNames(topics).forEach(function (topic) {
        const segments = topic.split(".");
        const firstSegment = segments.shift();
        let currentSegment = this.__routes[firstSegment];
        if (!currentSegment) {
          this.__routes[firstSegment] = { __handlers__: [] };
          currentSegment = this.__routes[firstSegment];
        }
        segments.forEach(function (segment) {
          if (!currentSegment[segment]) {
            currentSegment[segment] = { __handlers__: [] };
          }
          currentSegment = currentSegment[segment];
        }, this);

        currentSegment.__handlers__.push({
          handler: handler,
          config: topics[topic]
        });
      }, this);
    },

    /**
     * Handle address state updates and show them as message
     * @param address {String} GA or openHAB item name
     * @param state {var} received State
     * @param initial {Boolean} true id this is the first state update for this address
     * @param changed {Boolean} true if the incoming state update differs from the last one
     * @protected
     */
    _onIncomingData(address, state, initial, changed) {
      if (!this.__stateMessageConfig[address]) {
        return;
      }

      const now = new Date();
      const formattedDate = this.__dateFormat.format(now);
      const formattedTime = this.__timeFormat.format(now);

      this.__stateMessageConfig[address].forEach(function (config) {
        if (
          (initial === true && config.skipInitial === true) ||
          changed === false
        ) {
          // do not handle the first update
          return;
        }

        // process value
        state = cv.Transform.decode(config.addressConfig, state);

        const templateData = {
          address: address,
          value: state,
          date: formattedDate,
          time: formattedTime
        };

        // transform the raw value to a JavaScript type
        templateData.value = cv.Transform.decode(
          config.addressConfig,
          templateData.value
        );
        if (config.valueMapping) {
          // apply mapping
          templateData.value = cv.ui.common.BasicUpdate.applyMapping(
            templateData.value,
            config.valueMapping
          );
        }
        if (config.addressMapping) {
          templateData.address = cv.ui.common.BasicUpdate.applyMapping(
            templateData.address,
            config.addressMapping
          );
        }

        const message = {
          topic: Object.prototype.hasOwnProperty.call(config, "topic")
            ? config.topic
            : "cv.state.update." + address,
          title: qx.bom.Template.render(
            "" + config.titleTemplate,
            templateData
          ),
          message: qx.bom.Template.render(
            "" + config.messageTemplate,
            templateData
          ),
          deletable: Object.prototype.hasOwnProperty.call(config, "deletable")
            ? config.deletable
            : true,
          unique: Object.prototype.hasOwnProperty.call(config, "unique")
            ? config.unique
            : false,
          severity: config.severity
        };

        if (Object.prototype.hasOwnProperty.call(config, "condition")) {
          message.condition = state == config.condition; // jshint ignore:line
        }
        if (config.icon) {
          message.icon = config.icon;
          if (config.iconClasses) {
            message.iconClasses = config.iconClasses;
          }
        }
        this.dispatchMessage(message.topic, message, config.target);
      }, this);
    },

    __collectHandlers(topic) {
      const handlers = new qx.data.Array();
      const segments = topic.split(".");
      const firstSegment = segments.shift();
      let currentSegment = this.__routes[firstSegment];
      const last = segments.length - 1;
      segments.some(function (segmentName, idx) {
        if (!currentSegment) {
          // segment does not exists, stop searching
          return true;
        } else if (segmentName === "*") {
          // collect all
          this.__collectAllFromSegment(currentSegment, handlers);
          return true;
        }
        if (currentSegment["*"]) {
          handlers.append(currentSegment["*"].__handlers__);
        }
        if (currentSegment[segmentName]) {
          if (idx === last) {
            handlers.append(currentSegment[segmentName].__handlers__);
          }
          currentSegment = currentSegment[segmentName];
        } else {
          // stop searching
          return true;
        }
        return false;
      }, this);
      return handlers;
    },

    __collectAllFromSegment(segment, handlers) {
      handlers.append(segment.__handlers__);
      Object.getOwnPropertyNames(segment).forEach(function (segmentName) {
        if (segmentName !== "__handlers__") {
          this.__collectAllFromSegment(segment[segmentName], handlers);
        }
      }, this);
      return handlers;
    },

    dispatchMessage(topic, message, target) {
      if (message.target && !target) {
        target = cv.core.notifications.Router.getTarget(message.target);
      }
      if (target && target.handleMessage) {
        this.debug("dispatching '" + topic + "' message to handler: " + target);
        target.handleMessage(message, {});
      } else {
        this.__collectHandlers(topic).forEach(function (entry) {
          this.debug(
            "dispatching '" + topic + "' message to handler: " + entry.handler
          );
          entry.handler.handleMessage(message, entry.config);
        }, this);
      }
    },

    clear() {
      this.__routes = {};
      this.__stateMessageConfig = {};
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    this.clear();
    this._disposeObjects("__dateFormat", "__timeFormat");
  }
});
