function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.fsm.State": {},
      "qx.core.ObjectRegistry": {},
      "qx.event.Registration": {},
      "qx.event.type.Data": {},
      "qx.event.type.Event": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006, 2007, 2011 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A finite state machine.
   *
   * See {@link qx.util.fsm.State} for details on creating States,
   * and {@link qx.util.fsm.Transition} for details on creating
   * transitions between states.
   */
  qx.Class.define("qx.util.fsm.FiniteStateMachine", {
    extend: qx.core.Object,

    /**
     * @param machineName {String} The name of this finite state machine
     */
    construct: function construct(machineName) {
      // Call our superclass' constructor
      qx.core.Object.constructor.call(this); // Save the machine name

      this.setName(machineName); // Initialize the states object

      this.__P_480_0 = {}; // The first state added will become the start state

      this.__P_480_1 = null; // Initialize the saved-states stack

      this.__P_480_2 = []; // Initialize the pending event queue

      this.__P_480_3 = []; // Initialize the blocked events queue

      this.__P_480_4 = []; // Create the friendlyToObject" object.  Each object has as its property
      // name, the friendly name of the object; and as its property value, the
      // object itself.

      this.__P_480_5 = {}; // Create the "friendlyToHash" object.  Each object has as its property
      // name, the friendly name of the object; and as its property value, the
      // hash code of the object.

      this.__P_480_6 = {}; // Create the "hashToFriendly" object.  Each object has as its property
      // name, the hash code of the object; and as its property value, the
      // friendly name of the object.

      this.__P_480_7 = {}; // Friendly names can be added to groups, for easy manipulation of
      // enabling and disabling groups of widgets.  Track which friendly names
      // are in which group.

      this.__P_480_8 = {}; // We also need to be able to map back from friendly name to the groups it
      // is in.

      this.__P_480_9 = {};
    },
    statics: {
      /**
       * Constants which may be values of the nextState member in the
       * transitionInfo parameter of the Transition constructor.
       */
      StateChange: {
        /** When used as a nextState value, means remain in current state */
        CURRENT_STATE: 1,

        /**
         * When used as a nextState value, means go to most-recently pushed state
         */
        POP_STATE_STACK: 2,

        /** When used as a nextState value, means terminate this state machine */
        TERMINATE: 3
      },

      /**
       * Constants for use in the events member of the transitionInfo parameter
       * of the Transition constructor.
       */
      EventHandling: {
        /**
         * This event is handled by this state, but the predicate of a transition
         * will determine whether to use that transition.
         */
        PREDICATE: 1,

        /** Enqueue this event for possible use by the next state */
        BLOCKED: 2
      },

      /**
       * Debug bitmask values.
       */
      DebugFlags: {
        /** Show events */
        EVENTS: 1,

        /** Show transitions */
        TRANSITIONS: 2,

        /** Show individual function invocations during transitions */
        FUNCTION_DETAIL: 4,

        /**
         * When object friendly names are referenced but not found, show message
         */
        OBJECT_NOT_FOUND: 8
      }
    },
    events: {
      /**
       * Fired when the finite state machine terminates. Data is the last state
       * before termination.
       */
      "terminated": "qx.event.type.Data"
    },
    properties: {
      /**
       * The name of this finite state machine (for debug messages)
       */
      name: {
        check: "String",
        nullable: true
      },

      /**
       * The current state of the finite state machine.
       */
      state: {
        check: "String",
        nullable: true
      },

      /**
       * The previous state of the finite state machine, i.e. the state from
       * which we most recently transitioned.  Note that this could be the same
       * as the current state if a successful transition brought us back to the
       * same state.
       */
      previousState: {
        check: "String",
        nullable: true
      },

      /**
       * The state to which we will be transitioning.  This property is valid
       * only during a Transition's ontransition function and a State's onexit
       * function.  At all other times, it is null.
       */
      nextState: {
        check: "String",
        nullable: true
      },

      /**
       * The maximum number of states which may pushed onto the state-stack.  It
       * is generally a poor idea to have very many states saved on a stack.
       * Following program logic becomes very difficult, and the code can be
       * highly unmaintainable.  The default should be more than adequate.
       * You've been warned.
       */
      maxSavedStates: {
        check: "Number",
        init: 2
      },

      /**
       * Debug flags, composed of the bitmask values in the DebugFlags constant.
       *
       * Set the debug flags from the application by or-ing together bits, akin
       * to this:
       *
       * <pre class='javascript'>
       * var FSM = qx.util.fsm.FiniteStateMachine;
       * fsm.setDebugFlags(FSM.DebugFlags.EVENTS |
       *                   FSM.DebugFlags.TRANSITIONS |
       *                   FSM.DebugFlags.FUNCTION_DETAIL |
       *                   FSM.DebugFlags.OBJECT_NOT_FOUND);
       * </pre>
       */
      debugFlags: {
        check: "Number",
        // Default:
        // (qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS |
        //  qx.util.fsm.FiniteStateMachine.DebugFlags.TRANSITIONS |
        //  qx.util.fsm.FiniteStateMachine.DebugFlags.OBJECT_NOT_FOUND)
        init: 7
      }
    },
    members: {
      __P_480_0: null,
      __P_480_1: null,
      __P_480_3: null,
      __P_480_4: null,
      __P_480_2: null,
      __P_480_5: null,
      __P_480_6: null,
      __P_480_7: null,
      __P_480_8: null,
      __P_480_9: null,
      __P_480_10: false,
      __P_480_11: true,

      /**
       * Checks whether the finite state machine is terminated or not.
       *
       * @return {Boolean} If the finite state machine is terminated.
       */
      isTerminated: function isTerminated() {
        return this.__P_480_11;
      },

      /**
       * Add a state to the finite state machine.
       *
       *
       * @param state {qx.util.fsm.State}
       *   An object of class qx.util.fsm.State representing a state which is to
       *   be a part of this finite state machine.
       *
       *
       * @throws {Error} If the given state is not an instanceof of qx.util.fsm.State.
       * @throws {Error} If the given state already exists.
       */
      addState: function addState(state) {
        // Ensure that we got valid state info
        if (!state instanceof qx.util.fsm.State) {
          throw new Error("Invalid state: not an instance of qx.util.fsm.State");
        } // Retrieve the name of this state


        var stateName = state.getName(); // Ensure that the state name doesn't already exist

        if (stateName in this.__P_480_0) {
          throw new Error("State " + stateName + " already exists");
        } // Is this the first state being added?


        if (this.__P_480_1 == null) {
          // Yup.  Save this state as the start state.
          this.__P_480_1 = stateName;
        } // Add the new state object to the finite state machine


        this.__P_480_0[stateName] = state;
      },

      /**
       * Replace a state in the finite state machine.  This is useful if
       * initially "dummy" states are created which load the real state table
       * for a series of operations (and possibly also load the gui associated
       * with the new states at the same time).  Having portions of the finite
       * state machine and their associated gui pages loaded at run time can
       * help prevent long delays at application start-up time.
       *
       *
       * @param state {qx.util.fsm.State}
       *   An object of class qx.util.fsm.State representing a state which is to
       *   be a part of this finite state machine.
       *
       * @param bDispose {Boolean}
       *   If <i>true</i>, then dispose the old state object.  If <i>false</i>,
       *   the old state object is returned for disposing by the caller.
       *
       * @return {Object}
       *   The old state object if it was not disposed; otherwise null.
       *
       * @throws {Error} If the given state is not an instanceof of qx.util.fsm.State.
       */
      replaceState: function replaceState(state, bDispose) {
        // Ensure that we got valid state info
        if (!state instanceof qx.util.fsm.State) {
          throw new Error("Invalid state: not an instance of qx.util.fsm.State");
        } // Retrieve the name of this state


        var stateName = state.getName(); // Save the old state object, so we can return it to be disposed

        var oldState = this.__P_480_0[stateName]; // Replace the old state with the new state object.

        this.__P_480_0[stateName] = state; // Did they request that the old state be disposed?

        if (bDispose) {
          // Yup.  Mark it to be disposed.
          oldState._bNeedDispose = true;
        }

        return oldState;
      },

      /**
       * Add an object (typically a widget) that is to be accessed during state
       * transitions, to the finite state machine.
       *
       *
       * @param friendlyName {String}
       *   The friendly name to used for access to the object being added.
       *
       * @param obj {Object}
       *   The object to associate with the specified friendly name
       *
       * @param groupNames {Array}
       *   An optional list of group names of which this object is a member.
       *
       */
      addObject: function addObject(friendlyName, obj, groupNames) {
        var hash = qx.core.ObjectRegistry.toHashCode(obj);
        this.__P_480_6[friendlyName] = hash;
        this.__P_480_7[hash] = friendlyName;
        this.__P_480_5[friendlyName] = obj; // If no groupNames are specified, we're done.

        if (!groupNames) {
          return;
        } // Allow either a single group name or an array of group names.  If the
        // former, we convert it to the latter to make the subsequent code
        // simpler.


        if (typeof groupNames == "string") {
          groupNames = [groupNames];
        } // For each group that this friendly name is to be a member of...


        for (var i = 0; i < groupNames.length; i++) {
          var groupName = groupNames[i]; // If the group name doesn't yet exist...

          if (!this.__P_480_8[groupName]) {
            // ... then create it.
            this.__P_480_8[groupName] = {};
          } // Add the friendly name to the list of names in this group


          this.__P_480_8[groupName][friendlyName] = true; // If the friendly name group mapping doesn't yet exist...

          if (!this.__P_480_9[friendlyName]) {
            // ... then create it.
            this.__P_480_9[friendlyName] = [];
          } // Append this group name to the list of groups this friendly name is
          // in


          this.__P_480_9[friendlyName].push(groupName);
        }
      },

      /**
       * Remove an object which had previously been added by {@link #addObject}.
       *
       *
       * @param friendlyName {String}
       *   The friendly name associated with an object, specifying which object
       *   is to be removed.
       *
       */
      removeObject: function removeObject(friendlyName) {
        var hash;
        var groupName;
        var objName;
        var bGroupEmpty;
        hash = this.__P_480_6[friendlyName]; // Delete references to any groups this friendly name was in

        if (this.__P_480_9[friendlyName]) {
          for (var i = 0; i < this.__P_480_9[friendlyName].length; i++) {
            groupName = this.__P_480_9[friendlyName][i];
            delete this.__P_480_8[groupName][friendlyName]; // Is the group empty now?

            bGroupEmpty = true;

            for (objName in this.__P_480_8[groupName]) {
              // The group is not empty. That's all we wanted to know.
              bGroupEmpty = false;
              break;
            } // If the group is empty...


            if (bGroupEmpty) {
              // ... then we can delete the entire entry
              delete this.__P_480_8[groupName];
            }
          }

          delete this.__P_480_9[friendlyName];
        } // Delete the friendly name


        delete this.__P_480_7[hash];
        delete this.__P_480_6[friendlyName];
        delete this.__P_480_5[friendlyName];
      },

      /**
       * Retrieve an object previously saved via {@link #addObject}, using its
       * Friendly Name.
       *
       *
       * @param friendlyName {String}
       *   The friendly name of the object to be retrieved.
       *
       * @return {Object}
       *   The object which has the specified friendly name, or undefined if no
       *   object has been associated with that name.
       */
      getObject: function getObject(friendlyName) {
        return this.__P_480_5[friendlyName];
      },

      /**
       * Get the friendly name of an object.
       *
       *
       * @param obj {Object}
       *   The object for which the friendly name is desired
       *
       * @return {String}
       *   If the object has been previously registered via {@link #addObject},
       *   then the friendly name of the object is returned; otherwise, null.
       */
      getFriendlyName: function getFriendlyName(obj) {
        var hash = obj ? qx.core.ObjectRegistry.toHashCode(obj) : null;
        return hash ? this.__P_480_7[hash] : null;
      },

      /**
       * Retrieve the list of objects which have registered, via {@link #addObject}
       * as being members of the specified group.
       *
       *
       * @param groupName {String}
       *   The name of the group for which the member list is desired.
       *
       * @return {Array}
       *   An array containing the friendly names of any objects which are
       *   members of the specified group.  The resultant array may be empty.
       */
      getGroupObjects: function getGroupObjects(groupName) {
        var a = [];

        for (var name in this.__P_480_8[groupName]) {
          a.push(name);
        }

        return a;
      },

      /**
       * Display all of the saved objects and their reverse mappings.
       *
       */
      displayAllObjects: function displayAllObjects() {
        for (var friendlyName in this.__P_480_6) {
          var hash = this.__P_480_6[friendlyName];
          var obj = this.getObject(friendlyName);
          this.debug(friendlyName + " => " + hash);
          this.debug("  " + hash + " => " + this.__P_480_7[hash]);
          this.debug("  " + friendlyName + " => " + this.getObject(friendlyName));
          this.debug("  " + this.getObject(friendlyName) + " => " + this.getFriendlyName(obj));
        }
      },

      /**
       * Get internal data for debugging
       *
       * @return {Map}
       *   A map containing the following:
       *     __states
       *     __startState
       *     __eventQueue
       *     __blockedEvents
       *     __savedStates
       *     __friendlyToObject
       *     __friendlyToHash
       *     __hashToFriendly
       *     __groupToFriendly
       *     __friendlyToGroups
       *     __bEventProcessingInProgress
       */
      _getInternalData: function _getInternalData() {
        return {
          "states": this.__P_480_0,
          "startState": this.__P_480_1,
          "eventQueue": this.__P_480_3,
          "blockedEvents": this.__P_480_4,
          "savedStates": this.__P_480_2,
          "friendlyToObject": this.__P_480_5,
          "friendlyToHash": this.__P_480_6,
          "hashToFriendly": this.__P_480_7,
          "groupToFriendly": this.__P_480_8,
          "friendlyToGroups": this.__P_480_9
        };
      },

      /**
       * Start (or restart, after it has terminated) the finite state machine
       * from the starting state.  The starting state is defined as the first
       * state added to the finite state machine.
       *
       * @throws {Error} If the machine stared with not available state.
       */
      start: function start() {
        this.__P_480_11 = false;
        var stateName = this.__P_480_1;

        if (stateName == null) {
          throw new Error("Machine started with no available states");
        } // Set the start state to be the first state which was added to the
        // machine


        this.setState(stateName);
        this.setPreviousState(null);
        this.setNextState(null);
        var debugFunctions = this.getDebugFlags() & qx.util.fsm.FiniteStateMachine.DebugFlags.FUNCTION_DETAIL; // Run the actionsBeforeOnentry actions for the initial state

        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#actionsBeforeOnentry");
        }

        this.__P_480_0[stateName].getAutoActionsBeforeOnentry()(this); // Run the entry function for the new state, if one is specified


        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#entry");
        }

        this.__P_480_0[stateName].getOnentry()(this, null); // Run the actionsAfterOnentry actions for the initial state


        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#actionsAfterOnentry");
        }

        this.__P_480_0[stateName].getAutoActionsAfterOnentry()(this);
      },

      /**
       * Save the current or previous state on the saved-state stack.  A future
       * transition can then provide, as its nextState value, the class
       * constant:
       *
       *   <code>
       *   qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK
       *   </code>
       *
       * which will cause the next state to be whatever is at the top of the
       * saved-state stack, and remove that top element from the saved-state
       * stack.
       *
       *
       * @param state {Boolean|String}
       *   When <i>true</i>, then push the current state onto the stack.  This
       *   might be used in a transition, before the state has changed.  When
       *   <i>false</i>, then push the previous state onto the stack.  This
       *   might be used in an on entry function to save the previous state to
       *   return to.  If this parameter is a string, it is taken to be the
       *   name of the state to transition to.
       *
       *
       * @throws {Error} If the saved-state stack is full.
       */
      pushState: function pushState(state) {
        // See if there's room on the state stack for a new state
        if (this.__P_480_2.length >= this.getMaxSavedStates()) {
          // Nope.  Programmer error.
          throw new Error("Saved-state stack is full");
        }

        if (state === true) {
          // Push the current state onto the saved-state stack
          this.__P_480_2.push(this.getState());
        } else if (state) {
          this.__P_480_2.push(state);
        } else {
          // Push the previous state onto the saved-state stack
          this.__P_480_2.push(this.getPreviousState());
        }
      },

      /**
       * Pop the saved state stack.
       *
       * @return {String|Boolean}
       *   The name of a state or a boolean flag that had most recently been
       *   pushed onto the saved-state stack.
       */
      popState: function popState() {
        // Is there anything on the saved-state stack?
        if (this.__P_480_2.length == 0) {
          // Nope. Programmer error.
          throw new Error("Saved-state stack is empty");
        }

        return this.__P_480_2.pop();
      },

      /**
       * Add the specified event to a list of events to be passed to the next
       * state following state transition.
       *
       *
       * @param event {qx.event.type.Event}
       *   The event to add to the event queue for processing after state change.
       *
       */
      postponeEvent: function postponeEvent(event) {
        // Add this event to the blocked event queue, so it will be passed to the
        // next state upon transition.
        this.__P_480_4.unshift(event);
      },

      /**
       * Enqueue an event for processing
       *
       *
       * @param event {qx.event.type.Event}
       *   The event to be enqueued
       *
       * @param bAddAtHead {Boolean}
       *   If <i>true</i>, put the event at the head of the queue for immediate
       *   processing.  If <i>false</i>, place the event at the tail of the
       *   queue so that it receives in-order processing.
       *
       */
      enqueueEvent: function enqueueEvent(event, bAddAtHead) {
        // Add the event to the event queue
        if (bAddAtHead) {
          // Put event at the head of the queue
          this.__P_480_3.push(event);
        } else {
          // Put event at the tail of the queue
          this.__P_480_3.unshift(event);
        }

        if (this.getDebugFlags() & qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS) {
          // Individual objects are listed.  Ensure target is a saved object
          var friendly = this.getFriendlyName(event.getTarget());

          if (bAddAtHead) {
            this.debug(this.getName() + ": Pushed event: " + event.getType() + (friendly ? " on " + friendly : ""));
          } else {
            this.debug(this.getName() + ": Queued event: " + event.getType() + (friendly ? " on " + friendly : ""));
          }
        }
      },

      /**
       * Event listener for all event types in the finite state machine
       *
       * @param event {qx.event.type.Event} The event that was dispatched.
       */
      eventListener: function eventListener(event) {
        if (this.__P_480_11) {
          this.debug(this.getName() + ": Cannot listen to event '" + event.getType() + "', because the finite state machine is not running.");
          return;
        } // Events are enqueued upon receipt.  Some events are then processed
        // immediately; other events get processed later.  We need to allow the
        // event dispatcher to free the source event upon our return, so we'll
        // clone it and enqueue our clone.  The source event can then be
        // disposed upon our return.


        var e = event.clone(); // Enqueue the new event on the tail of the queue

        this.enqueueEvent(e, false); // Process events

        this.__P_480_12();
      },

      /**
       * Create an event and send it immediately to the finite state machine.
       *
       * @param type {String}
       *   The type of event, e.g. "execute"
       *
       * @param target {qx.core.Object}
       *   The target of the event
       *
       * @param data {Object|null}
       *   The data, if any, to issue in the event.  If this parameter is null
       *   then a qx.event.type.Event is instantiated.  Otherwise, an event of
       *   type qx.event.type.Data is instantiated and this data is applied to
       *   it.
       *
       */
      fireImmediateEvent: function fireImmediateEvent(type, target, data) {
        if (this.__P_480_11) {
          this.debug(this.getName() + ": Cannot listen to event '" + type + "', because the finite state machine is not running.");
          return;
        }

        if (data) {
          var event = qx.event.Registration.createEvent(type, qx.event.type.Data, [data, null, false]);
        } else {
          var event = qx.event.Registration.createEvent(type, qx.event.type.Event, [false, false]);
        }

        event.setTarget(target);
        this.eventListener(event);
      },

      /**
       * Create and schedule an event to be sent to the finite state machine
       * "shortly".  This allows such things as letting a progress cursor
       * display prior to handling the event.
       *
       * @param type {String}
       *   The type of event, e.g. "execute"
       *
       * @param target {qx.core.Object}
       *   The target of the event
       *
       * @param data {Object|null}
       *   See {@link #fireImmediateEvent} for details.
       *
       * @param timeout {Integer|null}
       *   If provided, this is the number of milliseconds to wait before firing
       *   the event.  If not provided, a default short interval (on the order
       *   of 20 milliseconds) is used.
       *
       */
      scheduleEvent: function scheduleEvent(type, target, data, timeout) {
        qx.event.Timer.once(function () {
          this.fireImmediateEvent(type, target, data);
        }, this, timeout || 20);
      },

      /**
       * Process all of the events on the event queue.
       *
       */
      __P_480_12: function __P_480_12() {
        // eventListener() can potentially be called while we're processing
        // events
        if (this.__P_480_10) {
          // We were processing already, so don't process concurrently.
          return;
        } // Track that we're processing events


        this.__P_480_10 = true; // Process each of the events on the event queue

        while (this.__P_480_3.length > 0) {
          // Pull the next event from the pending event queue
          var event = this.__P_480_3.pop(); // Run the finite state machine with this event


          var bDispose = this.__P_480_13(event); // If we didn't block (and re-queue) the event, dispose it.


          if (bDispose) {
            event.dispose();
          }
        } // We're no longer processing events


        this.__P_480_10 = false;
      },

      /**
       * Run the finite state machine to process a single event.
       *
       *
       * @param event {qx.event.type.Event}
       *   An event that has been dispatched.  The event may be handled (if the
       *   current state handles this event type), queued (if the current state
       *   blocks this event type), or discarded (if the current state neither
       *   handles nor blocks this event type).
       *
       * @return {Boolean}
       *   Whether the event should be disposed.  If it was blocked, we've
       *   pushed it back onto the event queue, and it should not be disposed.
       *
       * @throws {Error} If the explicit transitions does not exist.
       * @throws {Error} If the transition returns an invalid value.
       * @throws {Error} If the next step will transit to an nonexistent state.
       * @throws {Error} If the state stack is empty and the next state is POP_STATE_STACK
       * @throws {Error} If the next state is invalid.
       */
      __P_480_13: function __P_480_13(event) {
        // For use in generated functions...
        // State name variables
        var thisState;
        var nextState;
        var prevState; // The current State object

        var currentState; // The transitions available in the current State

        var transitions; // Events handled by the current State

        var e; // The action to take place upon receipt of a particular event

        var action; // Get the debug flags

        var debugFlags = this.getDebugFlags(); // Allow slightly faster access to determine if debug is enabled

        var debugEvents = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS;
        var debugTransitions = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.TRANSITIONS;
        var debugFunctions = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.FUNCTION_DETAIL;
        var debugObjectNotFound = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.OBJECT_NOT_FOUND; // Individual objects are listed.  Ensure target is a saved object

        var friendly = this.getFriendlyName(event.getTarget());

        if (debugEvents) {
          this.debug(this.getName() + ": Process event: " + event.getType() + (friendly ? " on " + friendly : ""));
        } // Get the current state name


        thisState = this.getState(); // Get the current State object

        currentState = this.__P_480_0[thisState]; // Get a list of the transitions available from this state

        transitions = currentState.transitions; // Determine how to handle this event

        e = currentState.getEvents()[event.getType()]; // See if we actually found this event type

        if (!e) {
          if (debugEvents) {
            this.debug(this.getName() + ": Event '" + event.getType() + "'" + " not handled.  Ignoring.");
          }

          return true;
        } // We might have found a constant (PREDICATE or BLOCKED) or an object
        // with each property name being the friendly name of a saved object,
        // and the property value being one of the constants (PREDICATE or
        // BLOCKED).


        if (_typeof(e) == "object") {
          if (!friendly) {
            // Nope, it doesn't seem so.  Just discard it.
            if (debugObjectNotFound) {
              this.debug(this.getName() + ": Could not find friendly name for '" + event.getType() + "' on '" + event.getTarget() + "'");
            }

            return true;
          }

          action = e[friendly]; // Do we handle this event type for the widget from which it
          // originated?

          if (!action) {
            // Nope.
            if (debugEvents) {
              this.debug(this.getName() + ": Event '" + event.getType() + "'" + " not handled for target " + friendly + ".  Ignoring.");
            }

            return true;
          }
        } else {
          action = e;
        }

        switch (action) {
          case qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE:
            // Process this event.  One of the transitions should handle it.
            break;

          case qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED:
            // This event is blocked.  Enqueue it for later, and get outta here.
            if (debugEvents) {
              this.debug(this.getName() + ": Event '" + event.getType() + "'" + " blocked.  Re-queuing.");
            }

            this.__P_480_4.unshift(event);

            return false;

          default:
            // See if we've been given an explicit transition name
            if (typeof action == "string") {
              // Yup!  Ensure that it exists
              if (transitions[action]) {
                // Yup.  Create a transitions object containing only this
                // transition.
                var trans = transitions[action];
                transitions = {};
                transitions[action] = trans;
              } else {
                throw new Error("Explicit transition " + action + " does not exist");
              }

              break;
            }

        } // We handle the event.  Try each transition in turn until we find one
        // that is acceptable.


        for (var t in transitions) {
          var trans = transitions[t]; // Does the predicate allow use of this transition?

          switch (trans.getPredicate()(this, event)) {
            case true:
              // Transition is allowed.  Proceed.
              break;

            case false:
              // Transition is not allowed.  Try next transition.
              continue;

            case null:
              // Transition indicates not to try further transitions
              return true;

            default:
              throw new Error("Transition " + thisState + ":" + t + " returned a value other than " + "true, false, or null.");
          } // We think we can transition to the next state.  Set next state.


          nextState = trans.getNextState();

          if (typeof nextState == "string") {
            // We found a literal state name.  Ensure it exists.
            if (!nextState in this.__P_480_0) {
              throw new Error("Attempt to transition to nonexistent state " + nextState);
            } // It exists.  Track it being the next state.


            this.setNextState(nextState);
          } else {
            // If it's not a string, nextState must be a StateChange constant
            switch (nextState) {
              case qx.util.fsm.FiniteStateMachine.StateChange.CURRENT_STATE:
                // They want to remain in the same state.
                nextState = thisState;
                this.setNextState(nextState);
                break;

              case qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK:
                // Switch to the state at the top of the state stack.
                if (this.__P_480_2.length == 0) {
                  throw new Error("Attempt to transition to POP_STATE_STACK while state stack is empty.");
                } // Pop the state stack to retrieve the state to transition to


                nextState = this.__P_480_2.pop();
                this.setNextState(nextState);
                break;

              case qx.util.fsm.FiniteStateMachine.StateChange.TERMINATE:
                // Terminate fsm
                this.__P_480_11 = true;
                this.setNextState(null);
                break;

              default:
                throw new Error("Internal error: invalid nextState");
            }
          } // Run the actionsBeforeOntransition actions for this transition


          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#autoActionsBeforeOntransition");
          }

          trans.getAutoActionsBeforeOntransition()(this); // Run the 'ontransition' function

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#ontransition");
          }

          trans.getOntransition()(this, event); // Run the autoActionsAfterOntransition actions for this transition

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#autoActionsAfterOntransition");
          }

          trans.getAutoActionsAfterOntransition()(this); // Run the autoActionsBeforeOnexit actions for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsBeforeOnexit");
          }

          currentState.getAutoActionsBeforeOnexit()(this); // Run the exit function for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#exit");
          }

          currentState.getOnexit()(this, event); // Run the autoActionsAfterOnexit actions for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsAfterOnexit");
          }

          currentState.getAutoActionsAfterOnexit()(this); // If this state has been replaced and we're supposed to dispose it...

          if (currentState._bNeedDispose) {
            // ... then dispose it now that it's no longer in use
            currentState.dispose();
          } // It the fsm has terminated, stop right here


          if (this.__P_480_11) {
            if (debugFunctions) {
              this.debug(this.getName() + "#" + "TERMINATED");
            }

            this.fireDataEvent("terminated", thisState);
            return true;
          } // Reset currentState to the new state object


          currentState = this.__P_480_0[this.getNextState()]; // set previousState and state, and clear nextState, for transition

          this.setPreviousState(thisState);
          this.setState(this.getNextState());
          this.setNextState(null);
          prevState = thisState;
          thisState = nextState;
          nextState = undefined; // Run the autoActionsBeforeOnentry actions for the new state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsBeforeOnentry");
          }

          currentState.getAutoActionsBeforeOnentry()(this); // Run the entry function for the new state, if one is specified

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#entry");
          }

          currentState.getOnentry()(this, event); // Run the autoActionsAfterOnentry actions for the new state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsAfterOnentry");
          }

          currentState.getAutoActionsAfterOnentry()(this); // Add any blocked events back onto the pending event queue

          for (var i = 0; i < this.__P_480_4.length; i++) {
            e = this.__P_480_4.pop();

            this.__P_480_3.unshift(e);
          }

          if (debugTransitions) {
            this.debug(this.getName() + "#" + prevState + " => " + this.getName() + "#" + thisState);
          } // See ya!


          return true;
        }

        if (debugTransitions) {
          this.debug(this.getName() + "#" + thisState + ": event '" + event.getType() + "'" + ": no transition found.  No state change.");
        }

        return true;
      }
    },
    destruct: function destruct() {
      this._disposeArray("__P_480_3");

      this._disposeArray("__P_480_4");

      this.__P_480_2 = this.__P_480_0 = null;
    }
  });
  qx.util.fsm.FiniteStateMachine.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FiniteStateMachine.js.map?dt=1731946698620