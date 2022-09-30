(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "cv.core.notifications.Router": {},
      "cv.core.notifications.ActionRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* MHandleMessage.js 
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
   * MHandleMessage mixin provides a handleMessage method for most common use cases in message handling.
   * Holds a list of messages
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   */
  qx.Mixin.define('cv.ui.MHandleMessage', {
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      this._messages = new qx.data.Array(); // severities in order of importance -> more important

      this._severities = ['low', 'normal', 'high', 'urgent'];
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      /**
       * Maximum allowed messages
       */
      maxEntries: {
        check: 'Number',
        init: 50,
        event: '_applyMaxEntries'
      },

      /**
       * Current amount of messages
       */
      counter: {
        check: 'Number',
        init: 0,
        event: 'changedCounter'
      },

      /**
       * Highest severity of the messages
       */
      globalSeverity: {
        check: ['low', 'normal', 'high', 'urgent'],
        init: 'normal',
        event: 'changedGlobalSeverity'
      },

      /**
       * ID of the root element of this message handler (HTML attribute 'id' value)
       */
      rootElementId: {
        check: 'String',
        nullable: true
      },

      /**
       * Pattern id the message elements IDs (suffix without is,
       * e.g. messages get mes_1, mes_2, ... mes_ is the messageElementId)
       */
      messageElementId: {
        check: 'String',
        nullable: true
      },
      delegate: {
        check: 'Object',
        nullable: true
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _messages: null,
      _severities: null,
      _idCounter: 0,
      getIdCounter: function getIdCounter() {
        return this._idCounter;
      },
      getSeverities: function getSeverities() {
        return this._severities;
      },
      _updateHighestSeverity: function _updateHighestSeverity() {
        // get the highest severity
        var severityRank = -1;

        this._messages.forEach(function (message) {
          if (message.severity && this._severities.indexOf(message.severity) > severityRank) {
            severityRank = this._severities.indexOf(message.severity);
          }
        }, this);

        if (severityRank >= 0) {
          this.setGlobalSeverity(this._severities[severityRank]);
        } else {
          this.resetGlobalSeverity();
        }
      },
      getSeverityColor: function getSeverityColor(severity) {
        switch (severity) {
          case 'urgent':
            return '#FF0000';

          case 'high':
            return '#FF7900';

          default:
            return '#1C391C';
        }
      },
      // property apply
      _applyMaxEntries: function _applyMaxEntries(value) {
        if (this._messages.getLength() > value) {
          this._messages.splice(this._messages.getLength() - value);
        }

        this._messages.setMaxEntries(value);
      },

      /**
       * Handle messages from {@link cv.core.notifications.Router}
       * @param message {Map}
       * @param config {Map?} optional configuration of this message for the handler
       */
      handleMessage: function handleMessage(message, config) {
        var delegate = this.getDelegate() || {};

        if (delegate.prepareMessage) {
          delegate.prepareMessage(message, config);
        }

        var found = null;
        var postHookPayload = {};

        if (message.unique) {
          // check if message is already shown
          this._messages.some(function (msg, index) {
            if (message.topic === msg.topic) {
              // replace message
              found = msg;
              message.id = msg.id;
              message.tooltip = this._getTooltip(message);

              if (!Object.prototype.hasOwnProperty.call(message, 'deletable')) {
                message.deletable = true;
              }

              if (cv.core.notifications.Router.evaluateCondition(message)) {
                var changed = msg.severity !== message.severity;

                this._messages.setItem(index, message);

                postHookPayload.action = 'replaced';

                if (changed) {
                  this._updateHighestSeverity();
                }
              } else {
                var removedMessage = this._messages.removeAt(index);

                postHookPayload.action = 'removed';
                postHookPayload.message = removedMessage;

                if (removedMessage.severity === this.getGlobalSeverity()) {
                  this._updateHighestSeverity();
                }
              } // stop search


              return true;
            }

            return false;
          }, this);
        }

        if (!found) {
          if (cv.core.notifications.Router.evaluateCondition(message)) {
            message.id = this._idCounter;
            this._idCounter++;
            message.tooltip = this._getTooltip(message);

            if (!Object.prototype.hasOwnProperty.call(message, 'deletable')) {
              message.deletable = true;
            }

            if (this.getMaxEntries() > 0) {
              if (this._messages.getLength() >= this.getMaxEntries()) {
                this._messages.splice(0, this._messages.getLength() - this.getMaxEntries() + 1).forEach(this._disposeMap);
              }
            }

            postHookPayload.action = 'added';

            this._messages.push(message);

            this._updateHighestSeverity();
          }
        } else if (this._list) {
          // refresh list
          this._list.update();
        }

        this.setCounter(this._messages.getLength());

        if (delegate.postHandleMessage) {
          delegate.postHandleMessage(message, config, postHookPayload);
        }
      },

      /**
       * Finds the message the tap event has been triggered on an returns
       * an array [messageId, action], where action can be one of "delete", "action".
       *
       * @param ev {Event}
       * @return {Array} [messageId, action]
       */
      getMessageIdFromEvent: function getMessageIdFromEvent(ev) {
        // lets find the real target
        var target = ev.getTarget();
        var deleteTarget = null;
        var messageId = -1;
        var id = target.getAttribute('id');
        var rootId = this.getRootElementId();
        var messageElementId = this.getMessageElementId();

        while (!id || !id.startsWith(rootId)) {
          if (target.classList.contains('delete')) {
            deleteTarget = target;
          }

          if (id && id.startsWith(messageElementId)) {
            // found the message container, get message id and stop
            messageId = parseInt(id.replace(messageElementId, ''));
            break;
          }

          target = target.parentNode;

          if (!target) {
            break;
          }

          id = target.getAttribute('id');
        }

        return [messageId, deleteTarget ? 'delete' : 'action'];
      },
      _onListTap: function _onListTap(ev) {
        var result = this.getMessageIdFromEvent(ev);

        if (result[0] >= 0) {
          if (result[1] === 'delete') {
            this.deleteMessage(result[0], ev);
          } else {
            this.performAction(result[0], ev);
          }
        }
      },
      _getTooltip: function _getTooltip(message) {
        var tooltip = message.severity;

        if (message.actions) {
          Object.getOwnPropertyNames(message.actions).forEach(function (type) {
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
      clear: function clear(force) {
        if (force) {
          this._messages.removeAll();

          this._idCounter = 0;
        } else {
          // collect all deletable messages
          var deletable = this._messages.filter(function (message) {
            return message.deletable === true;
          }, this);

          this._messages.exclude(deletable);
        }

        this._updateHighestSeverity();
      },
      getMessage: function getMessage(index) {
        return this._messages.getItem(index);
      },
      getMessages: function getMessages() {
        return this._messages;
      },

      /**
       * Delete a message by index
       * @param index {Number}
       * @param ev {Event}
       */
      deleteMessage: function deleteMessage(index, ev) {
        if (ev) {
          ev.stopPropagation();
          ev.preventDefault();
        }

        var message = this._messages.toArray().find(function (msg) {
          return msg.id === index;
        });

        if (message && message.deletable === true) {
          this._messages.remove(message);

          if (message.severity === this.getGlobalSeverity()) {
            this._updateHighestSeverity();
          }

          return true;
        }

        return false;
      },
      performAction: function performAction(messageId, ev) {
        var message = this.getMessage(messageId);

        if (this._performAction && message) {
          var res = this._performAction(message);

          if (res === true) {
            // skip
            return;
          }
        }

        if (!message || !message.actions) {
          return;
        }

        Object.getOwnPropertyNames(message.actions).forEach(function (type) {
          var typeActions = Array.isArray(message.actions[type]) ? message.actions[type] : [message.actions[type]];
          typeActions.forEach(function (action) {
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
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_messages');
    }
  });
  cv.ui.MHandleMessage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MHandleMessage.js.map?dt=1664552192903