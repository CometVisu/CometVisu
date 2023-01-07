(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * The mixin contains all functionality to provide methods
   * for form elements to manipulate their state. [usually "valid" and "invalid"]
   *
   */
  qx.Mixin.define("qx.ui.mobile.form.MState", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * The states of the element
       */
      __P_399_0: null,
      /**
       * Adds a state to the element
       * @param state {String} the state to be added
       *
       */
      addState: function addState(state) {
        if (this.__P_399_0 === null) {
          this.__P_399_0 = {};
        }
        this.__P_399_0[state] = true;
        this.addCssClass(state);
      },
      /**
       * Checks whether the element has the state passed as argument
       * @param state {String} the state to be checked
       * @return {Boolean} true if the element has the state, false if it doesn't.
       *
       */
      hasState: function hasState(state) {
        return this.__P_399_0 !== null && this.__P_399_0[state];
      },
      /**
       * Removes a state from the element
       * @param state {String} the state to be removed
       *
       */
      removeState: function removeState(state) {
        if (this.hasState(state)) {
          delete this.__P_399_0[state];
          this.removeCssClass(state);
        }
      },
      /**
       * Replaces a state of the element with a new state.
       * If the element doesn't have the state to be removed, then th new state will
       * just be added.
       * @param oldState {String} the state to be replaced
       * @param newState {String} the state to get injected in the oldState's place
       *
       */
      replaceState: function replaceState(oldState, newState) {
        if (this.hasState(oldState)) {
          delete this.__P_399_0[oldState];
          this.__P_399_0[newState] = true;
          this.removeCssClass(oldState);
          this.addCssClass(newState);
        } else {
          this.addState(newState);
        }
      }
    }
  });
  qx.ui.mobile.form.MState.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MState.js.map?dt=1673093872083