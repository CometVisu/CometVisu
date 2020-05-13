(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * This class holds all states that are maintained by the {@link cv.ui.layout.ResizeHandler}.
   * Other classes can use the instance of this class {@link cv.ui.layout.ResizeHandler.states} to listen to changes
   * to the states.
   */
  qx.Class.define('cv.ui.layout.States', {
    extend: qx.core.Object,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      pageSizeInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changePageSizeInvalid'
      },
      backdropInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeBackdropInvalid'
      },
      navbarInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeNavbarInvalid'
      },
      rowspanInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeRowspanInvalid'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      resetAll: function resetAll() {
        ['pageSizeInvalid', 'backdropInvalid', 'navbarInvalid', 'rowspanInvalid'].forEach(this.reset, this);
      }
    }
  });
  cv.ui.layout.States.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=States.js.map?dt=1589396822042