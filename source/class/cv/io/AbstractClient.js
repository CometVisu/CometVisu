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
    MEMBERS
  ***********************************************
  */
  members: {
    _resources: null,

    setResourcePath(name, path) {
      this._resources[name] = path;
      this.fireDataEvent('resourcePathAdded', name);
    }
  }
});
