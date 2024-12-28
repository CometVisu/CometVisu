(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.ui.form.IArrayForm": {},
      "qx.ui.form.IForm": {},
      "qx.ui.form.MForm": {},
      "qx.data.controller.Form": {},
      "qx.ui.form.Form": {},
      "qx.data.marshal.Json": {},
      "qx.ui.form.TextField": {},
      "qx.util.DisposeUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Martijn Evers, The Netherlands
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martijn Evers (mever)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.data.controller.fixture.ArrayField, qx.test.data.controller.fixture.ModelField)
   */

  qx.Class.define("qx.test.data.controller.FormWithArrayAndModel", {
    extend: qx.dev.unit.TestCase,
    members: {
      /** @type {qx.test.data.controller.fixture.ArrayField} */
      __P_329_0: null,
      /** @type {qx.test.data.controller.fixture.ModelField} */
      __P_329_1: null,
      /** @type {qx.ui.form.Form} */
      __P_329_2: null,
      /** @type {qx.core.Object} */
      __P_329_3: null,
      setUp: function setUp() {
        // imagine me being a table like widget containing two columns (e.g. an miniature todo-list)
        qx.Class.define("qx.test.data.controller.fixture.ArrayField", {
          extend: qx.ui.core.Widget,
          implement: [qx.ui.form.IArrayForm, qx.ui.form.IForm],
          include: [qx.ui.form.MForm],
          events: {
            changeValue: "qx.event.type.Data"
          },
          members: {
            /** @type {qx.data.Array|null} */
            __P_329_4: null,
            /**
             * @param value {qx.data.Array|null}
             */
            setValue: function setValue(value) {
              var oldValue = this.__P_329_4;
              this.__P_329_4 = value;
              this.fireDataEvent("changeValue", value, oldValue);
            },
            /**
             * @return {qx.data.Array|null}
             */
            getValue: function getValue() {
              return this.__P_329_4;
            },
            resetValue: function resetValue() {
              this.__P_329_4 = null;
            }
          }
        });

        // imagine me being a multi-field widget (e.g. address form embedded in user form)
        qx.Class.define("qx.test.data.controller.fixture.ModelField", {
          extend: qx.data.controller.Form,
          implement: [qx.ui.form.IArrayForm, qx.ui.form.IForm],
          include: [qx.ui.form.MForm],
          events: {
            changeValue: "qx.event.type.Data",
            // implement IForm interface
            changeEnabled: "qx.event.type.Data"
          },
          members: {
            // implement IForm interface
            setEnabled: function setEnabled() {},
            getEnabled: function getEnabled() {
              return true;
            },
            /**
             * @param value {qx.core.Object|null}
             */
            setValue: function setValue(value) {
              this.setModel(value);
            },
            /**
             * @return {qx.core.Object|null}
             */
            getValue: function getValue() {
              return this.getModel();
            },
            resetValue: function resetValue() {
              this.resetModel();
            },
            // overwritten
            _applyModel: function _applyModel(value, old) {
              qx.test.data.controller.fixture.ModelField.superclass.prototype._applyModel.call(this, value, old);
              this.fireDataEvent("changeValue", value, old);
            }
          }
        });
        this.__P_329_0 = new qx.test.data.controller.fixture.ArrayField();
        this.__P_329_1 = new qx.test.data.controller.fixture.ModelField();
        this.__P_329_2 = new qx.ui.form.Form();
        this.__P_329_2.add(this.__P_329_0, "One", null, "f1");
        this.__P_329_2.add(this.__P_329_1, "Two", null, "f2");
        this.__P_329_3 = qx.data.marshal.Json.createModel({
          f1: null,
          f2: null,
          f3: null
        });
      },
      tearDown: function tearDown() {
        this._disposeObjects("__P_329_0", "__P_329_1", "__P_329_2", "__P_329_3");
        qx.Class.undefine("qx.test.data.controller.fixture.ArrayField");
        qx.Class.undefine("qx.test.data.controller.fixture.ModelField");
      },
      /**
       * Reusable address form.
       *
       * @return {qx.ui.form.Form} Address form.
       */
      __P_329_5: function __P_329_5() {
        var houseNr = new qx.ui.form.TextField();
        var streetName = new qx.ui.form.TextField();
        var addressForm = new qx.ui.form.Form();
        addressForm.add(houseNr, "houseNr");
        addressForm.add(streetName, "streetName");
        qx.util.DisposeUtil.disposeTriggeredBy(houseNr, addressForm);
        qx.util.DisposeUtil.disposeTriggeredBy(streetName, addressForm);
        return addressForm;
      },
      "test self update: array": function test_self_update_array() {
        var arr = qx.data.marshal.Json.createModel([{
          c1: "1a1",
          c2: "1a2"
        }, {
          c1: "1b1",
          c2: "1b2"
        }]);
        arr.setAutoDisposeItems(true);
        this.__P_329_0.setValue(arr);

        // sync form and model, model (null) takes preference over form (arr)
        var ctrl = new qx.data.controller.Form(this.__P_329_3, this.__P_329_2, true);
        this.assertNull(this.__P_329_0.getValue());
        this.assertNull(this.__P_329_3.getF1());

        // user changes field and hits ok button
        this.__P_329_0.setValue(arr);
        ctrl.updateModel();
        this.assertIdentical(arr, this.__P_329_3.getF1());
        ctrl.dispose();
        arr.dispose();
      },
      "test self update: model": function test_self_update_model() {
        var addressForm = this.__P_329_5();
        this.__P_329_1.setTarget(addressForm);
        var ctrl = new qx.data.controller.Form(this.__P_329_3, this.__P_329_2, true);
        this.assertNull(this.__P_329_0.getValue());
        this.assertNull(this.__P_329_1.getValue());

        // let's make an address for this user (this.__model being a user now ;) )
        this.__P_329_1.createModel(false);
        addressForm.getItem("houseNr").setValue("42");
        addressForm.getItem("streetName").setValue("Nowhere Ln");
        ctrl.updateModel();

        // imagine f2 now being a user address
        this.assertIdentical("42", this.__P_329_3.getF2().getHouseNr());
        this.assertIdentical("Nowhere Ln", this.__P_329_3.getF2().getStreetName());
        ctrl.dispose();
        addressForm.dispose();
      },
      "test updating view": function test_updating_view() {
        var arr = qx.data.marshal.Json.createModel([{
          c1: "2a1",
          c2: "2a2"
        }, {
          c1: "2b1",
          c2: "2b2"
        }]);
        arr.setAutoDisposeItems(true);
        this.__P_329_0.setValue(arr);

        // sync form and model, model (null) takes preference over form (arr)
        var ctrl = new qx.data.controller.Form(this.__P_329_3, this.__P_329_2);
        this.assertNull(this.__P_329_0.getValue());
        this.assertNull(this.__P_329_3.getF1());

        // user changes field and hits ok button
        this.__P_329_0.setValue(arr);
        this.assertIdentical(arr, this.__P_329_3.getF1());
        ctrl.dispose();
        arr.dispose();
      },
      "test updating model: array field": function test_updating_model_array_field() {
        var arr = qx.data.marshal.Json.createModel([{
          c1: "2a1",
          c2: "2a2"
        }, {
          c1: "2b1",
          c2: "2b2"
        }]);
        arr.setAutoDisposeItems(true);
        var ctrl = new qx.data.controller.Form(this.__P_329_3, this.__P_329_2);

        // change model, view should follow
        this.__P_329_3.setF1(arr);
        this.assertIdentical(arr, this.__P_329_0.getValue());
        ctrl.dispose();
        arr.dispose();
      },
      "test updating model: model field": function test_updating_model_model_field() {
        var addressForm = this.__P_329_5();
        this.__P_329_1.setTarget(addressForm);
        var ctrl = new qx.data.controller.Form(this.__P_329_3, this.__P_329_2);
        this.assertNull(this.__P_329_0.getValue());
        this.assertNull(this.__P_329_1.getValue());
        this.__P_329_1.createModel(false);
        this.assertIdentical(this.__P_329_1.getModel(), this.__P_329_3.getF2());
        ctrl.dispose();
        addressForm.dispose();
      }
    }
  });
  qx.test.data.controller.FormWithArrayAndModel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormWithArrayAndModel.js.map?dt=1735383859888