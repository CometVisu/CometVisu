/**
 * Interface for Listmodel sources.
 */
qx.Interface.define('cv.io.listmodel.IListModel', {
  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: 'qx.data.Array',
      deferredInit: true
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    // this event is sent when the model itself wants to trigger a list refresh.
    refresh: 'qx.event.type.Event'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    async refresh() {},

    /**
     * handles event from the list
     * @param ev {Event}
     * @param data {object} contains a map of all "data-" prefixed attributes of the event source, contains at least data.action
     * @param model {object} model of the clicked list item
     * @returns {boolean} if the event has been handled
     */
    handleEvent(ev, data, model) {}
  }
});
