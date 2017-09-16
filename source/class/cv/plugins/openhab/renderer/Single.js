/**
 * {@link qx.ui.form.renderer.Single} with right column flexed.
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */

qx.Class.define("cv.plugins.openhab.renderer.Single", {
  extend: qx.ui.form.renderer.Single,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(form) {
    this.base(arguments, form);
    this._getLayout().setColumnFlex(0,0);
    this._getLayout().setColumnFlex(1,1);
  }
});