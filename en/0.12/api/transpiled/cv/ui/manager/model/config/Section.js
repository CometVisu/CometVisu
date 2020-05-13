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
      },
      "qx.data.Array": {
        "construct": true
      },
      "cv.ui.manager.model.config.Option": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.model.config.Section', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(name) {
      qx.core.Object.constructor.call(this);
      this.setName(name);
      this.initOptions(new qx.data.Array());
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      name: {
        check: 'String',
        event: 'changeName',
        init: ''
      },
      options: {
        check: 'qx.data.Array',
        deferredInit: true,
        event: 'changeOptions'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      addOption: function addOption(key, value) {
        var options = this.getOptions();
        var found = options.some(function (option) {
          if (option.getKey() === key) {
            option.setValue(value);
          }
        }, this);

        if (!found) {
          options.push(new cv.ui.manager.model.config.Option(key, value));
        }
      }
    }
  });
  cv.ui.manager.model.config.Section.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Section.js.map?dt=1589400484178