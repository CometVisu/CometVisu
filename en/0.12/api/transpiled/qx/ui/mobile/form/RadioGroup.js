(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.RadioGroup": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The Radio button group for mobile usage.
   *
   * *Example*
   *
   * <pre class='javascript'>
   *    var form = new qx.ui.mobile.form.Form();
   *
   *    var radio1 = new qx.ui.mobile.form.RadioButton();
   *    var radio2 = new qx.ui.mobile.form.RadioButton();
   *    var radio3 = new qx.ui.mobile.form.RadioButton();
   *
   *    var radiogroup = new qx.ui.mobile.form.RadioGroup(radio1, radio2, radio3);
  
   *    form.add(radio1, "Germany");
   *    form.add(radio2, "UK");
   *    form.add(radio3, "USA");
   *
   *    this.getRoot.add(new qx.ui.mobile.form.renderer.Single(form));
   * </pre>
   *
   *
   */
  qx.Class.define("qx.ui.mobile.form.RadioGroup", {
    extend: qx.ui.form.RadioGroup
  });
  qx.ui.mobile.form.RadioGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioGroup.js.map?dt=1614015662987