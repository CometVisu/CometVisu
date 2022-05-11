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
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.lang.Type": {},
      "qx.lang.Object": {},
      "qx.core.ValidationError": {},
      "qx.type.BaseError": {},
      "qx.ui.form.validation.AsyncValidator": {},
      "qx.ui.form.IForm": {},
      "qx.ui.core.ISingleSelection": {},
      "qx.data.controller.ISelection": {}
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
   * This validation manager is responsible for validation of forms.
   *
   * @ignore(qx.ui.tooltip)
   * @ignore(qx.ui.tooltip.Manager.*)
   */
  qx.Class.define("qx.ui.form.validation.Manager", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this); // storage for all form items

      this.__P_329_0 = []; // storage for all results of async validation calls

      this.__P_329_1 = {}; // set the default required field message

      this.setRequiredFieldMessage(qx.locale.Manager.tr("This field is required"));
    },
    events: {
      /**
       * Change event for the valid state.
       */
      "changeValid": "qx.event.type.Data",

      /**
       * Signals that the validation is done. This is not needed on synchronous
       * validation (validation is done right after the call) but very important
       * in the case an asynchronous validator will be used.
       */
      "complete": "qx.event.type.Event"
    },
    properties: {
      /**
       * The validator of the form itself. You can set a function (for
       * synchronous validation) or a {@link qx.ui.form.validation.AsyncValidator}.
       * In both cases, the function can have all added form items as first
       * argument and the manager as a second argument. The manager should be used
       * to set the {@link #invalidMessage}.
       *
       * Keep in mind that the validator is optional if you don't need the
       * validation in the context of the whole form.
       * @type {Function | AsyncValidator}
       */
      validator: {
        check: "value instanceof Function || qx.Class.isSubClassOf(value.constructor, qx.ui.form.validation.AsyncValidator)",
        init: null,
        nullable: true
      },

      /**
       * The invalid message should store the message why the form validation
       * failed. It will be added to the array returned by
       * {@link #getInvalidMessages}.
       */
      invalidMessage: {
        check: "String",
        init: ""
      },

      /**
       * This message will be shown if a required field is empty and no individual
       * {@link qx.ui.form.MForm#requiredInvalidMessage} is given.
       */
      requiredFieldMessage: {
        check: "String",
        init: ""
      },

      /**
       * The context for the form validation.
       */
      context: {
        nullable: true
      }
    },
    members: {
      __P_329_0: null,
      __P_329_2: null,
      __P_329_1: null,
      __P_329_3: null,

      /**
       * Add a form item to the validation manager.
       *
       * The form item has to implement at least two interfaces:
       * <ol>
       *   <li>The {@link qx.ui.form.IForm} Interface</li>
       *   <li>One of the following interfaces:
       *     <ul>
       *       <li>{@link qx.ui.form.IBooleanForm}</li>
       *       <li>{@link qx.ui.form.IColorForm}</li>
       *       <li>{@link qx.ui.form.IDateForm}</li>
       *       <li>{@link qx.ui.form.INumberForm}</li>
       *       <li>{@link qx.ui.form.IStringForm}</li>
       *     </ul>
       *   </li>
       * </ol>
       * The validator can be a synchronous or asynchronous validator. In
       * both cases the validator can either returns a boolean or fire an
       * {@link qx.core.ValidationError}. For synchronous validation, a plain
       * JavaScript function should be used. For all asynchronous validations,
       * a {@link qx.ui.form.validation.AsyncValidator} is needed to wrap the
       * plain function.
       *
       * @param formItem {qx.ui.core.Widget} The form item to add.
       * @param validator {Function | qx.ui.form.validation.AsyncValidator}
       *   The validator.
       * @param context {var?null} The context of the validator.
       */
      add: function add(formItem, validator, context) {
        // check for the form API
        if (!this.__P_329_4(formItem)) {
          throw new Error("Added widget not supported.");
        } // check for the data type


        if (this.__P_329_5(formItem) && !formItem.getValue) {
          // check for a validator
          if (validator != null) {
            throw new Error("Widgets supporting selection can only be validated in the form validator");
          }
        }

        var dataEntry = {
          item: formItem,
          validator: validator,
          valid: null,
          context: context
        };

        this.__P_329_0.push(dataEntry);
      },

      /**
       * Remove a form item from the validation manager.
       *
       * @param formItem {qx.ui.core.Widget} The form item to remove.
       * @return {qx.ui.core.Widget?null} The removed form item or
       *  <code>null</code> if the item could not be found.
       */
      remove: function remove(formItem) {
        var items = this.__P_329_0;

        for (var i = 0, len = items.length; i < len; i++) {
          if (formItem === items[i].item) {
            items.splice(i, 1);
            return formItem;
          }
        }

        return null;
      },

      /**
       * Returns registered form items from the validation manager.
       *
       * @return {Array} The form items which will be validated.
       */
      getItems: function getItems() {
        var items = [];

        for (var i = 0; i < this.__P_329_0.length; i++) {
          items.push(this.__P_329_0[i].item);
        }

        ;
        return items;
      },

      /**
       * Invokes the validation. If only synchronous validators are set, the
       * result of the whole validation is available at the end of the method
       * and can be returned. If an asynchronous validator is set, the result
       * is still unknown at the end of this method so nothing will be returned.
       * In both cases, a {@link #complete} event will be fired if the validation
       * has ended. The result of the validation can then be accessed with the
       * {@link #getValid} method.
       *
       * @return {Boolean|undefined} The validation result, if available.
       */
      validate: function validate() {
        var valid = true;
        this.__P_329_3 = true; // collaboration of all synchronous validations

        var items = []; // check all validators for the added form items

        for (var i = 0; i < this.__P_329_0.length; i++) {
          var formItem = this.__P_329_0[i].item;
          var validator = this.__P_329_0[i].validator; // store the items in case of form validation

          items.push(formItem); // ignore all form items without a validator

          if (validator == null) {
            // check for the required property
            var validatorResult = this._validateRequired(formItem);

            valid = valid && validatorResult;
            this.__P_329_3 = validatorResult && this.__P_329_3;
            continue;
          }

          var validatorResult = this._validateItem(this.__P_329_0[i], formItem.getValue()); // keep that order to ensure that null is returned on async cases


          valid = validatorResult && valid;

          if (validatorResult != null) {
            this.__P_329_3 = validatorResult && this.__P_329_3;
          }
        } // check the form validator (be sure to invoke it even if the form
        // items are already false, so keep the order!)


        var formValid = this.__P_329_6(items);

        if (qx.lang.Type.isBoolean(formValid)) {
          this.__P_329_3 = formValid && this.__P_329_3;
        }

        valid = formValid && valid;

        this._setValid(valid);

        if (qx.lang.Object.isEmpty(this.__P_329_1)) {
          this.fireEvent("complete");
        }

        return valid;
      },

      /**
       * Checks if the form item is required. If so, the value is checked
       * and the result will be returned. If the form item is not required, true
       * will be returned.
       *
       * @param formItem {qx.ui.core.Widget} The form item to check.
       * @return {var} Validation result
       */
      _validateRequired: function _validateRequired(formItem) {
        if (formItem.getRequired()) {
          var validatorResult; // if its a widget supporting the selection

          if (this.__P_329_5(formItem)) {
            validatorResult = !!formItem.getSelection()[0];
          } else if (this.__P_329_7(formItem)) {
            validatorResult = formItem.getSelection().getLength() > 0;
          } else {
            var value = formItem.getValue();
            validatorResult = !!value || value === 0;
          }

          formItem.setValid(validatorResult);
          var individualMessage = formItem.getRequiredInvalidMessage();
          var message = individualMessage ? individualMessage : this.getRequiredFieldMessage();
          formItem.setInvalidMessage(message);
          return validatorResult;
        }

        return true;
      },

      /**
       * Validates a form item. This method handles the differences of
       * synchronous and asynchronous validation and returns the result of the
       * validation if possible (synchronous cases). If the validation is
       * asynchronous, null will be returned.
       *
       * @param dataEntry {Object} The map stored in {@link #add}
       * @param value {var} The currently set value
       * @return {Boolean|null} Validation result or <code>null</code> for async
       * validation
       */
      _validateItem: function _validateItem(dataEntry, value) {
        var formItem = dataEntry.item;
        var context = dataEntry.context;
        var validator = dataEntry.validator; // check for asynchronous validation

        if (this.__P_329_8(validator)) {
          // used to check if all async validations are done
          this.__P_329_1[formItem.toHashCode()] = null;
          validator.validate(formItem, formItem.getValue(), this, context);
          return null;
        }

        var validatorResult = null;

        try {
          var validatorResult = validator.call(context || this, value, formItem);

          if (validatorResult === undefined) {
            validatorResult = true;
          }
        } catch (e) {
          if (e instanceof qx.core.ValidationError) {
            validatorResult = false;

            if (e.message && e.message != qx.type.BaseError.DEFAULTMESSAGE) {
              var invalidMessage = e.message;
            } else {
              var invalidMessage = e.getComment();
            }

            formItem.setInvalidMessage(invalidMessage);
          } else {
            throw e;
          }
        }

        formItem.setValid(validatorResult);
        dataEntry.valid = validatorResult;
        return validatorResult;
      },

      /**
       * Validates the form. It checks for asynchronous validation and handles
       * the differences to synchronous validation. If no form validator is given,
       * true will be returned. If a synchronous validator is given, the
       * validation result will be returned. In asynchronous cases, null will be
       * returned cause the result is not available.
       *
       * @param items {qx.ui.core.Widget[]} An array of all form items.
       * @return {Boolean|null} description
       */
      __P_329_6: function __P_329_6(items) {
        var formValidator = this.getValidator();
        var context = this.getContext() || this;

        if (formValidator == null) {
          return true;
        } // reset the invalidMessage


        this.setInvalidMessage("");

        if (this.__P_329_8(formValidator)) {
          this.__P_329_1[this.toHashCode()] = null;
          formValidator.validateForm(items, this, context);
          return null;
        }

        try {
          var formValid = formValidator.call(context, items, this);

          if (formValid === undefined) {
            formValid = true;
          }
        } catch (e) {
          if (e instanceof qx.core.ValidationError) {
            formValid = false;

            if (e.message && e.message != qx.type.BaseError.DEFAULTMESSAGE) {
              var invalidMessage = e.message;
            } else {
              var invalidMessage = e.getComment();
            }

            this.setInvalidMessage(invalidMessage);
          } else {
            throw e;
          }
        }

        return formValid;
      },

      /**
       * Helper function which checks, if the given validator is synchronous
       * or asynchronous.
       *
       * @param validator {Function|qx.ui.form.validation.AsyncValidator}
       *   The validator to check.
       * @return {Boolean} True, if the given validator is asynchronous.
       */
      __P_329_8: function __P_329_8(validator) {
        var async = false;

        if (!qx.lang.Type.isFunction(validator)) {
          async = qx.Class.isSubClassOf(validator.constructor, qx.ui.form.validation.AsyncValidator);
        }

        return async;
      },

      /**
       * Returns true, if the given item implements the {@link qx.ui.form.IForm}
       * interface.
       *
       * @param formItem {qx.core.Object} The item to check.
       * @return {Boolean} true, if the given item implements the
       *   necessary interface.
       */
      __P_329_4: function __P_329_4(formItem) {
        var clazz = formItem.constructor;
        return qx.Class.hasInterface(clazz, qx.ui.form.IForm);
      },

      /**
       * Returns true, if the given item implements the
       * {@link qx.ui.core.ISingleSelection} interface.
       *
       * @param formItem {qx.core.Object} The item to check.
       * @return {Boolean} true, if the given item implements the
       *   necessary interface.
       */
      __P_329_5: function __P_329_5(formItem) {
        var clazz = formItem.constructor;
        return qx.Class.hasInterface(clazz, qx.ui.core.ISingleSelection);
      },

      /**
       * Returns true, if the given item implements the
       * {@link qx.data.controller.ISelection} interface.
       *
       * @param formItem {qx.core.Object} The item to check.
       * @return {Boolean} true, if the given item implements the
       *   necessary interface.
       */
      __P_329_7: function __P_329_7(formItem) {
        var clazz = formItem.constructor;
        return qx.Class.hasInterface(clazz, qx.data.controller.ISelection);
      },

      /**
       * Sets the valid state of the manager. It generates the event if
       * necessary and stores the new value.
       *
       * @param value {Boolean|null} The new valid state of the manager.
       */
      _setValid: function _setValid(value) {
        this._showToolTip(value);

        var oldValue = this.__P_329_2;
        this.__P_329_2 = value; // check for the change event

        if (oldValue != value) {
          this.fireDataEvent("changeValid", value, oldValue);
        }
      },

      /**
       * Responsible for showing a tooltip in case the validation is done for
       * widgets based on qx.ui.core.Widget.
       * @param valid {Boolean} <code>false</code>, if the tooltip should be shown
       */
      _showToolTip: function _showToolTip(valid) {
        // ignore if we don't have a tooltip manager e.g. mobile apps
        if (!qx.ui.tooltip || !qx.ui.tooltip.Manager) {
          return;
        }

        var tooltip = qx.ui.tooltip.Manager.getInstance().getSharedErrorTooltip();

        if (!valid) {
          var firstInvalid;

          for (var i = 0; i < this.__P_329_0.length; i++) {
            var item = this.__P_329_0[i].item;

            if (!item.isValid()) {
              firstInvalid = item; // only for desktop widgets

              if (!item.getContentLocation) {
                return;
              } // only consider items on the screen


              if (item.isSeeable() === false) {
                continue;
              }

              tooltip.setLabel(item.getInvalidMessage());

              if (tooltip.getPlaceMethod() == "mouse") {
                var location = item.getContentLocation();
                var top = location.top - tooltip.getOffsetTop();
                tooltip.placeToPoint({
                  left: location.right,
                  top: top
                });
              } else {
                tooltip.placeToWidget(item);
              }

              tooltip.show();
              return;
            }
          }
        } else {
          tooltip.exclude();
        }
      },

      /**
       * Returns the valid state of the manager.
       *
       * @return {Boolean|null} The valid state of the manager.
       */
      getValid: function getValid() {
        return this.__P_329_2;
      },

      /**
       * Returns the valid state of the manager.
       *
       * @return {Boolean|null} The valid state of the manager.
       */
      isValid: function isValid() {
        return this.getValid();
      },

      /**
       * Returns an array of all invalid messages of the invalid form items and
       * the form manager itself.
       *
       * @return {String[]} All invalid messages.
       */
      getInvalidMessages: function getInvalidMessages() {
        var messages = []; // combine the messages of all form items

        for (var i = 0; i < this.__P_329_0.length; i++) {
          var formItem = this.__P_329_0[i].item;

          if (!formItem.getValid()) {
            messages.push(formItem.getInvalidMessage());
          }
        } // add the forms fail message


        if (this.getInvalidMessage() != "") {
          messages.push(this.getInvalidMessage());
        }

        return messages;
      },

      /**
       * Selects invalid form items
       *
       * @return {Array} invalid form items
       */
      getInvalidFormItems: function getInvalidFormItems() {
        var res = [];

        for (var i = 0; i < this.__P_329_0.length; i++) {
          var formItem = this.__P_329_0[i].item;

          if (!formItem.getValid()) {
            res.push(formItem);
          }
        }

        return res;
      },

      /**
       * Resets the validator.
       */
      reset: function reset() {
        // reset all form items
        for (var i = 0; i < this.__P_329_0.length; i++) {
          var dataEntry = this.__P_329_0[i]; // set the field to valid

          dataEntry.item.setValid(true);
        } // set the manager to its initial valid value


        this.__P_329_2 = null;

        this._showToolTip(true);
      },

      /**
       * Internal helper method to set the given item to valid for asynchronous
       * validation calls. This indirection is used to determinate if the
       * validation process is completed or if other asynchronous validators
       * are still validating. {@link #__checkValidationComplete} checks if the
       * validation is complete and will be called at the end of this method.
       *
       * @param formItem {qx.ui.core.Widget} The form item to set the valid state.
       * @param valid {Boolean} The valid state for the form item.
       *
       * @internal
       */
      setItemValid: function setItemValid(formItem, valid) {
        // store the result
        this.__P_329_1[formItem.toHashCode()] = valid;
        formItem.setValid(valid);

        this.__P_329_9();
      },

      /**
       * Internal helper method to set the form manager to valid for asynchronous
       * validation calls. This indirection is used to determinate if the
       * validation process is completed or if other asynchronous validators
       * are still validating. {@link #__checkValidationComplete} checks if the
       * validation is complete and will be called at the end of this method.
       *
       * @param valid {Boolean} The valid state for the form manager.
       *
       * @internal
       */
      setFormValid: function setFormValid(valid) {
        this.__P_329_1[this.toHashCode()] = valid;

        this.__P_329_9();
      },

      /**
       * Checks if all asynchronous validators have validated so the result
       * is final and the {@link #complete} event can be fired. If that's not
       * the case, nothing will happen in the method.
       */
      __P_329_9: function __P_329_9() {
        var valid = this.__P_329_3; // check if all async validators are done

        for (var hash in this.__P_329_1) {
          var currentResult = this.__P_329_1[hash];
          valid = currentResult && valid; // the validation is not done so just do nothing

          if (currentResult == null) {
            return;
          }
        } // set the actual valid state of the manager


        this._setValid(valid); // reset the results


        this.__P_329_1 = {}; // fire the complete event (no entry in the results with null)

        this.fireEvent("complete");
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._showToolTip(true);

      this.__P_329_0 = null;
    }
  });
  qx.ui.form.validation.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1652287868251