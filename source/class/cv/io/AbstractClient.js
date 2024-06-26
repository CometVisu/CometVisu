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
  construct() {
    super();
    this._resources= {};
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

    setResourcePath(name, path) {
      this._resources[name] = path;
      this.fireDataEvent('resourcePathAdded', name);
    },

    _applyConnected(connected) {
      this.record('connected', connected);
    }
  }
});
