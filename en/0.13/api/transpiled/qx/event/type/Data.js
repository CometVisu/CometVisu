(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Event object for data holding event or data changes.
   */
  qx.Class.define("qx.event.type.Data", {
    extend: qx.event.type.Event,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_230_0: null,
      __P_230_1: null,
      /**
       * Initializes an event object.
       *
       * @param data {var} The event's new data
       * @param old {var?null} The event's old data (optional)
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @return {qx.event.type.Data} the initialized instance.
       */
      init: function init(data, old, cancelable) {
        qx.event.type.Data.superclass.prototype.init.call(this, false, cancelable);
        this.__P_230_0 = data;
        this.__P_230_1 = old;
        return this;
      },
      /**
       * Get a copy of this object
       *
       * @param embryo {qx.event.type.Data?null} Optional event class, which will
       *     be configured using the data of this event instance. The event must be
       *     an instance of this event class. If the data is <code>null</code>,
       *     a new pooled instance is created.
       * @return {qx.event.type.Data} a copy of this object
       */
      clone: function clone(embryo) {
        var clone = qx.event.type.Data.superclass.prototype.clone.call(this, embryo);
        clone.__P_230_0 = this.__P_230_0;
        clone.__P_230_1 = this.__P_230_1;
        return clone;
      },
      /**
       * The new data of the event sending this data event.
       * The return data type is the same as the event data type.
       *
       * @return {var} The new data of the event
       */
      getData: function getData() {
        return this.__P_230_0;
      },
      /**
       * The old data of the event sending this data event.
       * The return data type is the same as the event data type.
       *
       * @return {var} The old data of the event
       */
      getOldData: function getOldData() {
        return this.__P_230_1;
      }
    }
  });
  qx.event.type.Data.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Data.js.map?dt=1691935420467