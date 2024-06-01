(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.test.ui.list.MAssert": {
        "require": true
      },
      "qx.ui.list.List": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.list.AbstractListTest", {
    type: "abstract",
    extend: qx.test.ui.LayoutTestCase,
    include: [qx.test.ui.list.MAssert],
    members: {
      _model: null,
      _list: null,
      setUp: function setUp() {
        qx.test.ui.list.AbstractListTest.superclass.prototype.setUp.call(this);
        this._model = this.createModelData();
        this._list = new qx.ui.list.List(this._model);
        this.configureList();
        this.getRoot().add(this._list);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.list.AbstractListTest.superclass.prototype.tearDown.call(this);
        this._list.dispose();
        this._list = null;
        this._model.dispose();
        this._model = null;
      },
      createModelData: function createModelData() {
        throw new Error("Abstract 'createModelData' method call!");
      },
      configureList: function configureList() {}
    }
  });
  qx.test.ui.list.AbstractListTest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractListTest.js.map?dt=1717235394882