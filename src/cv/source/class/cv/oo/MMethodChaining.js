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
    __chain: {},

    addBeforeMethod: function(name, callback, context) {
      if (!this.__chain[name]) {
        this.__chain[name] = [];
      }
      this.__chain[name].push([callback, context]);
    },

    processBeforeChain: function() {
      var name = [].splice.call(arguments, 0, 1);
      this.__chain[name] && this.__chain[name].forEach(function(entry) {
        entry[0].apply(entry[1] || this, arguments);
      }, this);
    }
  }
});