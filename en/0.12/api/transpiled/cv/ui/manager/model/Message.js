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
   * Model for Messages shown in Snackbar/Dialog (usually error, warnings or info messages).
   */
  qx.Class.define('cv.ui.manager.model.Message', {
    extend: qx.core.Object,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      title: {
        check: 'String',
        init: '',
        event: 'changeTitle'
      },
      content: {
        check: 'String',
        init: '',
        event: 'changeContent'
      },
      type: {
        check: ['alert', 'hint', 'warning', 'error'],
        nullable: true,
        event: 'changeType'
      },
      sticky: {
        check: 'Boolean',
        init: false,
        event: 'changeSticky'
      }
    }
  });
  cv.ui.manager.model.Message.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Message.js.map?dt=1612698460064