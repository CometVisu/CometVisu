/* NotificationCenter.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * Global notification handler that routes messages topic-dependent to different {@link cv.data.INotificationHandler}
 * (e.g. NotificationCenter, Dialog, Toast, console.log, native notification, internal message bus ...)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.data.NotificationRouter", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.base(arguments);
    this.__routes = {};

    this.__dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat("short"));
    this.__timeFormat = new qx.util.format.DateFormat(qx.locale.Date.getTimeFormat("short"));
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
    evaluateCondition: function(message) {
      if (!message.hasOwnProperty("condition")) {
        // nothing to evaluate
        return true;
      } else if (qx.lang.Type.isBoolean(message.condition)) {
        return message.condition;
      } else if (qx.lang.Type.isFunction()) {
        return message.condition();
      } else {
        this.error("unhandled message condition type: %o", message.condition);
      }
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

    registerStateUpdateHandler: function(config) {
      this.__stateMessageConfig = config;
      Object.getOwnPropertyNames(this.__stateMessageConfig).forEach(function(address) {
        cv.data.Model.getInstance().addUpdateListener(address, this._onIncomingData, this);
      }, this);
    },

    /**
     * Register a handler for a list of topics
     * @param handler {cv.ui.INotificationHandler}
     * @param topics {Map} map of topics as key and configuration-maps as values
     */
    registerMessageHandler: function(handler, topics) {
      Object.getOwnPropertyNames(topics).forEach(function(topic) {
        var segments = topic.split(".");
        var firstSegment = segments.shift();
        var currentSegment = this.__routes[firstSegment];
        if (!currentSegment) {
          this.__routes[firstSegment] = {'__handlers__': []};
          currentSegment = this.__routes[firstSegment];
        }
        segments.forEach(function(segment) {
          if (!currentSegment[segment]) {
            currentSegment[segment] = {'__handlers__': []};
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
     * @protected
     */
    _onIncomingData: function(address, state, initial) {
      var now = new Date();
      var templateData = {
        address: address,
        value: state,
        date: this.__dateFormat.format(now),
        time: this.__timeFormat.format(now)
      };

      this.__stateMessageConfig[address].forEach(function(config) {
        if (initial === true && config.skipInitial === true) {
          // do not handle the first update
          return;
        }
        var message = {
          topic: config.hasOwnProperty("topic") ? config.topic : "cv.state.update."+address,
          title: qx.bom.Template.render(""+config.titleTemplate, templateData),
          message: qx.bom.Template.render(""+config.messageTemplate,templateData),
          deletable: config.hasOwnProperty("deletable") ? config.deletable : true,
          unique: config.hasOwnProperty("unique") ? config.unique : false,
          severity: config.severity
        };
        if (config.hasOwnProperty("condition")){
          message.condition = state === config.condition;
        }
        this.dispatchMessage(message.topic, message, config.target);
      }, this);

    },

    __collectHandlers: function(topic) {
      var handlers = new qx.data.Array();
      var segments = topic.split(".");
      var firstSegment = segments.shift();
      var currentSegment = this.__routes[firstSegment];
      var last = segments.length-1;
      segments.some(function(segmentName, idx) {
        if (!currentSegment) {
          // segment does not exists, stop searching
          return true;
        } else if (segmentName === "*") {
          // collect all
          this.__collectAllFromSegment(currentSegment, handlers);
          return true;
        } else {
          if (currentSegment["*"]) {
            handlers.append(currentSegment["*"].__handlers__);
          }
          if (currentSegment[segmentName]) {
            if (idx === last) {
              handlers.append(currentSegment[segmentName].__handlers__);
            }
            currentSegment = currentSegment[segmentName];
          } else{
            // stop searching
            return true;
          }
        }
      }, this);
      return handlers;
    },

    __collectAllFromSegment: function(segment, handlers) {
      Object.getOwnPropertyNames(segment).forEach(function(segmentName) {
        handlers.append(segment[segmentName].__handlers__);
        this.__collectAllFromSegment(segment[segmentName], handlers);
      }, this);
      return handlers;
    },

    dispatchMessage: function(topic, message, target) {
      if (target && target.handleMessage) {
        this.debug("dispatching '" + topic + "' message to handler: " + target);
        target.handleMessage(message, {});
      } else {
        this.__collectHandlers(topic).forEach(function (entry) {
          this.debug("dispatching '" + topic + "' message to handler: " + entry.handler);
          entry.handler.handleMessage(message, entry.config);
        }, this);
      }
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this._disposeMap("__routes");
  }
});
