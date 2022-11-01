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
    MEMBERS
  ***********************************************
  */
  members: {
    async refresh() {}
  }
});
