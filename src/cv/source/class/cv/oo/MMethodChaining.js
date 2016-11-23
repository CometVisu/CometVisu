/**
 * MMethodChaining
 *
 * @author tobiasb
 * @since 2016
 */

qx.Mixin.define('cv.oo.MMethodChaining', {

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __chain: {
      before: {},
      after: {}
    },

    addBeforeMethod: function(name, callback, context) {
      this.__addMethod("before", name, callback, context);
    },

    addAfterMethod: function(name, callback, context) {
      this.__addMethod("after", name, callback, context);
    },

    __addMethod: function(type, name, callback, context) {
      if (!this.__chain[type][name]) {
        this.__chain[type][name] = [];
      }
      this.__chain[type][name].push([callback, context]);
    },

    processBeforeChain: function(name) {
      this.__processChain("before", name);
    },

    processAfterChain: function(name) {
      this.__processChain("after", name);
    },

    __processChain: function() {
      var type = [].splice.call(arguments, 0, 1);
      var name = [].splice.call(arguments, 0, 1);
      var args = arguments;
      this.__chain[type][name] && this.__chain[type][name].forEach(function(entry) {
        entry[0].apply(entry[1] || this, args);
      }, this);
    }
  }
});