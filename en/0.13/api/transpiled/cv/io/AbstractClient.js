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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   *
   */
  qx.Class.define('cv.io.AbstractClient', {
    extend: qx.core.Object,
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this._resources = {};
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      resourcePathAdded: 'qx.event.type.Data'
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: false,
        event: 'changeConnected',
        apply: '_applyConnected'
      },
      dataReceived: {
        check: 'Boolean',
        init: false
      },
      name: {
        check: 'String',
        nullable: true
      },
      server: {
        check: 'String',
        nullable: true,
        event: 'changedServer'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _resources: null,
      setResourcePath: function setResourcePath(name, path) {
        this._resources[name] = path;
        this.fireDataEvent('resourcePathAdded', name);
      },
      _applyConnected: function _applyConnected(connected) {
        this.record('connected', connected);
      }
    }
  });
  cv.io.AbstractClient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractClient.js.map?dt=1717235424417