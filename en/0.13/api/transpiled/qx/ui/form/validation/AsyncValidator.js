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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for validation in all asynchronous cases and
   * should always be used with {@link qx.ui.form.validation.Manager}.
   *
   *
   * It acts like a wrapper for asynchronous validation functions. These
   * validation function must be set in the constructor. The form manager will
   * invoke the validation and the validator function will be called with two
   * arguments:
   * <ul>
   *  <li>asyncValidator: A reference to the corresponding validator.</li>
   *  <li>value: The value of the assigned input field.</li>
   * </ul>
   * These two parameters are needed to set the validation status of the current
   * validator. {@link #setValid} is responsible for doing that.
   *
   *
   * *Warning:* Instances of this class can only be used with one input
   * field at a time. Multi usage is not supported!
   *
   * *Warning:* Calling {@link #setValid} synchronously does not work. If you
   * have an synchronous validator, please check
   * {@link qx.ui.form.validation.Manager#add}. If you have both cases, you have
   * to wrap the synchronous call in a timeout to make it asynchronous.
   */
  qx.Class.define("qx.ui.form.validation.AsyncValidator", {
    extend: qx.core.Object,

    /**
     * @param validator {Function} The validator function, which has to be
     *   asynchronous.
     */
    construct: function construct(validator) {
      qx.core.Object.constructor.call(this); // save the validator function

      this.__P_328_0 = validator;
    },
    members: {
      __P_328_0: null,
      __P_328_1: null,
      __P_328_2: null,
      __P_328_3: null,

      /**
       * The validate function should only be called by
       * {@link qx.ui.form.validation.Manager}.
       *
       * It stores the given information and calls the validation function set in
       * the constructor. The method is used for form fields only. Validating a
       * form itself will be invokes with {@link #validateForm}.
       *
       * @param item {qx.ui.core.Widget} The form item which should be validated.
       * @param value {var} The value of the form item.
       * @param manager {qx.ui.form.validation.Manager} A reference to the form
       *   manager.
       * @param context {var?null} The context of the validator.
       *
       * @internal
       */
      validate: function validate(item, value, manager, context) {
        // mark as item validator
        this.__P_328_3 = false; // store the item and the manager

        this.__P_328_1 = item;
        this.__P_328_2 = manager; // invoke the user set validator function

        this.__P_328_0.call(context || this, this, value);
      },

      /**
       * The validateForm function should only be called by
       * {@link qx.ui.form.validation.Manager}.
       *
       * It stores the given information and calls the validation function set in
       * the constructor. The method is used for forms only. Validating a
       * form item will be invokes with {@link #validate}.
       *
       * @param items {qx.ui.core.Widget[]} All form items of the form manager.
       * @param manager {qx.ui.form.validation.Manager} A reference to the form
       *   manager.
       * @param context {var?null} The context of the validator.
       *
       * @internal
       */
      validateForm: function validateForm(items, manager, context) {
        this.__P_328_3 = true;
        this.__P_328_2 = manager;

        this.__P_328_0.call(context, items, this);
      },

      /**
       * This method should be called within the asynchronous callback to tell the
       * validator the result of the validation.
       *
       * @param valid {Boolean} The boolean state of the validation.
       * @param message {String?} The invalidMessage of the validation.
       */
      setValid: function setValid(valid, message) {
        // valid processing
        if (this.__P_328_3) {
          // message processing
          if (message !== undefined) {
            this.__P_328_2.setInvalidMessage(message);
          }

          this.__P_328_2.setFormValid(valid);
        } else {
          // message processing
          if (message !== undefined) {
            this.__P_328_1.setInvalidMessage(message);
          }

          this.__P_328_2.setItemValid(this.__P_328_1, valid);
        }
      }
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__P_328_2 = this.__P_328_1 = null;
    }
  });
  qx.ui.form.validation.AsyncValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AsyncValidator.js.map?dt=1643469622967