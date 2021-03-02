/**
 *
 */
qx.Class.define('cv.ui.manager.form.ElementForm', {
  extend: dialog.Form,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    labelColumnWidth: {
      refine: true,
      init: 300
    },

    useBlocker: {
      refine: true,
      init: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyFormData: function (formData, old) {
      if (this._formController) {
        try {
          this.getModel().removeAllBindings();
          this._formController.dispose();
        } catch (e) {
        }
      }
      if (this._form) {
        try {
          this._form.getValidationManager().removeAllBindings();
          this._form.dispose();
        } catch (e) {
        }
      }
      this._formContainer.removeAll();
      if (!formData) {
        return;
      }
      if (this.getModel()) {
        this.getModel().removeAllBindings();
        this.getModel().dispose();
      }
      let modelData = {};
      for (let key of Object.getOwnPropertyNames(formData)) {
        modelData[key] = formData[key].value !== undefined
          ? formData[key].value
          : null;
      }
      let model = qx.data.marshal.Json.createModel(modelData);
      this.setModel(model);
      // form
      this._form = new qx.ui.form.Form();
      if (qx.core.Environment.get("module.objectid") === true) {
        this._form.setQxObjectId("form");
        this.addOwnedQxObject(this._form);
      }
      this._formController = new qx.data.controller.Object(this.getModel());
      this._onFormReady(this._form);
      for (let key of Object.getOwnPropertyNames(formData)) {
        let fieldData = formData[key];
        let formElement = null;
        switch (fieldData.type.toLowerCase()) {
          case "groupheader":
            this._form.addGroupHeader(fieldData.value);
            break;
          case "textarea":
            formElement = new qx.ui.form.TextArea();
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;
          case "textfield":
            formElement = new qx.ui.form.TextField();
            if (fieldData.maxLength)
              formElement.setMaxLength(fieldData.maxLength);
            formElement.setLiveUpdate(true);
            break;
          case "datefield":
          case "date":
            formElement = new qx.ui.form.DateField();
            if (fieldData.dateFormat) {
              formElement.setDateFormat(fieldData.dateFormat);
            }
            break;
          case "passwordfield":
          case "password":
            formElement = new qx.ui.form.PasswordField();
            formElement.getContentElement().setAttribute("autocomplete", "password");
            break;
          case "combobox":
            formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function (item) {
              let listItem = new qx.ui.form.ListItem(item.label, item.icon);
              formElement.add(listItem);
            });
            break;
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            model = qx.data.marshal.Json.createModel(fieldData.options);
            new qx.data.controller.List(model, formElement, "label");
            break;
          case "radiogroup":
            formElement = new qx.ui.form.RadioGroup();
            if (fieldData.orientation) {
              formElement.setUserData("orientation", fieldData.orientation);
            }
            fieldData.options.forEach(function (item) {
              let radioButton = new qx.ui.form.RadioButton(item.label);
              radioButton.setUserData(
                "value",
                item.value !== undefined ? item.value : item.label
              );
              formElement.add(radioButton);
            }, this);
            break;
          case "label":
            formElement = new qx.ui.form.TextField(); // dummy
            formElement.setUserData("excluded", true);
            break;
          case "checkbox":
            formElement = new qx.ui.form.CheckBox();
            break;
          case "spinner":
            formElement = new qx.ui.form.Spinner();
            if (fieldData.min) {
              formElement.setMinimum(fieldData.min);
            }
            if (fieldData.max) {
              formElement.setMaximum(fieldData.max);
            }
            if (fieldData.step) {
              formElement.setSingleStep(fieldData.step);
            }
            if(fieldData.fractionsDigits) {
              let fd = fieldData.fractionsDigits;
              let nf = new qx.util.format.NumberFormat();
              if(fd.min) {
                nf.setMinimumFractionDigits(fd.min);
              }
              if(fd.max) {
                nf.setMaximumFractionDigits(fd.max);
              }
              formElement.setNumberFormat(nf);
            }
            break;
          default:
            this.error("Invalid form field type:" + fieldData.type);
        }
        formElement.setUserData("key", key);
        let _this = this;
        if (typeof fieldData.type == "string") {
          switch (fieldData.type.toLowerCase()) {
            case "textarea":
            case "textfield":
            case "passwordfield":
            case "combobox":
            case "datefield":
            case "spinner":
              this._formController.addTarget(formElement, "value", key, true, null, {
                converter: function (value) {
                  _this._form.getValidationManager().validate();
                  return value;
                }
              });
              break;
            case "checkbox":
              this._formController.addTarget(formElement, "value", key, true, null);
              break;
            case "selectbox":
              this._formController.addTarget(formElement, "selection", key, true, {
                converter: qx.lang.Function.bind(function (value) {
                  let selected = null;
                  let selectables = this.getSelectables();
                  selectables.forEach(function (selectable) {
                    if (selectable.getModel().getValue() === value) {
                      selected = selectable;
                    }
                  }, this);
                  if (!selected) {
                    return [selectables[0]];
                  }
                  return [selected];
                }, formElement)
              }, {
                converter: qx.lang.Function.bind(function (selection) {
                  let value = selection[0].getModel().getValue();
                  return value;
                }, formElement)
              });
              break;
            case "radiogroup":
              this._formController.addTarget(formElement, "selection", key, true, {
                converter: qx.lang.Function.bind(function (value) {
                  let selectables = this.getSelectables();
                  let selection = [];
                  if (value) {
                    selectables.forEach(function (selectable) {
                      let sValue = selectable.getUserData("value");
                      if (sValue === value) {
                        selection = [selectable];
                      }
                    }, this);
                  }
                  return selection;
                }, formElement)
              }, {
                converter: function (selection) {
                  let value = selection[0].getUserData("value");
                  return value;
                }
              });
              break;
          }
        }
        /**
         * Validation
         */
        let validator = null;
        if (formElement && fieldData.validation) {
          // required field
          if (fieldData.validation.required) {
            formElement.setRequired(true);
          }
          // sync validation
          if (fieldData.validation.validator) {
            validator = fieldData.validation.validator;
            if (typeof validator == "string") {
              if (qx.util.Validate[validator]) {
                validator = qx.util.Validate[validator]();
              } else if (validator.charAt(0) === "/") {
                validator = qx.util.Validate.regExp(
                  new RegExp(validator.substr(1, validator.length - 2)),
                  fieldData.validation.errorMessage
                );
              } else {
                this.error("Invalid string validator.");
              }
            } else if (!(validator instanceof qx.ui.form.validation.AsyncValidator) && typeof validator !== "function") {
              this.error("Invalid validator.");
            }
          }
          // async validation
          if (qx.lang.Type.isString(fieldData.validation.proxy) &&
            qx.lang.Type.isString(fieldData.validation.method)
          ) {
            /**
             * fieldData.validation.proxy
             * the name of a global variable (or path) to a function that acts as the proxy of
             * the 'send' or 'execute' function of a preconfigured JsonRpc client. The function
             * receives the following parameters: service method (string), parameters (array)
             * and callback (function). It proxies the parameters to the given JsonRpc method and
             * calls the callback with the result (true if valid, false if not) received from the
             * server. The JsonRpc service name is preconfigured by the server and cannot be
             * changed by the client.
             */
              // clean
            let proxy = fieldData.validation.proxy.replace(/;\n/g, "");
            try {
              eval('proxy = ' + proxy + ';');
            } catch (e) {
              this.warn("Invalid proxy name");
            }
            if (typeof proxy == "function") {
              let method = fieldData.validation.method;
              let message = fieldData.validation.invalidMessage;
              let _this = this;
              let validationFunc = function (validatorObj, value) {
                if (!validatorObj.__asyncInProgress) {
                  validatorObj.__asyncInProgress = true;
                  proxy(method, [value], function (valid) {
                    validatorObj.setValid(valid, message || this.tr('Value is invalid'));
                    validatorObj.__asyncInProgress = false;
                  });
                }
              };
              validator = new qx.ui.form.validation.AsyncValidator(validationFunc);
            }
          }
        }

        /**
         * other widget properties @todo: allow to set all properties
         */
        if (fieldData.width !== undefined) {
          formElement.setWidth(fieldData.width);
        }
        if (fieldData.placeholder !== undefined) {
          formElement.setPlaceholder(fieldData.placeholder);
        }
        if (fieldData.enabled !== undefined) {
          formElement.setEnabled(fieldData.enabled);
        }
        if (fieldData.help !== undefined) {
          formElement.setUserData("help", fieldData.help);
        }

        /**
         * Events
         */
        if (qx.lang.Type.isObject(fieldData.events)) {
          for (let type in fieldData.events) {
            try {
              let func = eval("(" + fieldData.events[type] + ")"); // eval is evil, I know.
              if (!qx.lang.Type.isFunction(func)) {
                throw new Error();
              }
              formElement.addListener(type, func, formElement);
            } catch (e) {
              this.warn("Invalid '" + type + "' event handler for form element '" + key + "'.");
            }
          }
        }

        // Putting it all together
        let label = fieldData.label;
        this._form.add(formElement, label, validator);
        // Add the form elements as objects owned by the form widget
        if (qx.core.Environment.get("module.objectid") === true) {
          formElement.setQxObjectId(key);
          this._form.addOwnedQxObject(formElement);
        }
      }


      let view = new cv.ui.manager.form.ElementFormRenderer(this._form);
      view.getLayout().setColumnFlex(0, 0);
      view.getLayout().setColumnMaxWidth(0, this.getLabelColumnWidth());
      view.getLayout().setColumnFlex(1, 1);
      view.getLayout().set({
        spacingX: 8
      })
      view.setAllowGrowX(true);
      this._formContainer.add(view);
      this._form.getValidationManager().validate();
    },
  },
});
