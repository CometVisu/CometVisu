(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "dialog.FormRenderer": {
        "require": true
      },
      "qx.util.Serializer": {
        "require": true
      },
      "qx.util.Validate": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "dialog.Dialog": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "dialog.FormTag": {},
      "qx.ui.layout.Grow": {},
      "qx.data.marshal.Json": {},
      "qx.ui.form.Form": {},
      "qx.data.controller.Object": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.form.SelectBox": {},
      "qx.data.controller.List": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.Spinner": {},
      "qx.util.format.NumberFormat": {},
      "qx.lang.Function": {},
      "qx.ui.form.validation.AsyncValidator": {},
      "qx.lang.Type": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "module.objectid": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/cboulanger/qx-contrib-Dialog
  
     Copyright:
       2007-2018 Christian Boulanger and others
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /* global qx dialog*/

  /* eslint-env es4 */

  /**
   * A dialog with a form that is constructed on-the-fly
   *
   * @require(dialog.FormRenderer)
   * @require(qx.util.Serializer)
   * @require(qx.util.Validate)
   */
  qx.Class.define("dialog.Form", {
    extend: dialog.Dialog,
    properties: {
      /**
       * Data to create a form with multiple fields.
       * So far implemented:
       *   TextField / TextArea
       *   ComboBox
       *   SelectBox
       *   RadioGroup
       *   CheckBox
       *
       * <pre>
       * {
       *  "username" : {
       *     'type'  : "TextField",
       *     'label' : "User Name",
       *     'value' : ""
       *   },
       *   "address" : {
       *     'type'  : "TextArea",
       *     'label' : "Address",
       *     'lines' : 3
       *   },
       *   "domain" : {
       *     'type'  : "SelectBox",
       *     'label' : "Domain",
       *     'value' : 1,
       *     'options' : [
       *       { 'label' : "Company", 'value' : 0 },
       *       { 'label' : "Home",    'value' : 1 }
       *     ]
       *   },
       *   "commands" : {
       *    'type'  : "ComboBox",
       *     'label' : "Shell command to execute",
       *     'options' : [
       *       { 'label' : "ln -s *" },
       *       { 'label' : "rm -Rf /" }
       *     ]
       *   }
       * }
       * </pre>
       *
       */
      formData: {
        check: "Map",
        nullable: true,
        event: "changeFormData",
        apply: "_applyFormData"
      },

      /**
       * The model of the result data
       */
      model: {
        check: "qx.core.Object",
        nullable: true,
        event: "changeModel"
      },

      /**
       * The default width of the column with the field labels
       */
      labelColumnWidth: {
        check: "Integer",
        nullable: false,
        init: 100
      }
    },
    members: {
      _formContainer: null,
      _form: null,
      _formValidator: null,
      _formController: null,

      /**
       * Return the form
       * @return {qx.ui.form.Form}
       */
      getForm: function getForm() {
        return this._form;
      },

      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = new qx.ui.container.Composite();
        container.setLayout(new qx.ui.layout.VBox(10));
        var hbox = new qx.ui.container.Composite();
        hbox.setLayout(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._message = new qx.ui.basic.Label();

        this._message.setRich(true);

        this._message.setMinWidth(200);

        this._message.setAllowStretchX(true);

        hbox.add(this._message, {
          flex: 1
        }); // wrap fields in form tag to avoid Chrome warnings, see https://github.com/cboulanger/qx-contrib-Dialog/issues/19

        var formTag = new dialog.FormTag();
        this._formContainer = new qx.ui.container.Composite();

        this._formContainer.setLayout(new qx.ui.layout.Grow());

        formTag.add(this._formContainer, {
          flex: 1
        });
        container.add(formTag, {
          flex: 1
        }); // buttons

        var buttonPane = this._createButtonPane();

        container.add(buttonPane);

        var okButton = this._createOkButton();

        buttonPane.add(okButton);

        var cancelButton = this._createCancelButton();

        buttonPane.add(cancelButton);
        this.add(container);
      },

      /**
       * Constructs the form on-the-fly
       * @param formData {Map} The form data map
       * @param old {Map|null} The old value
       * @lint ignoreDeprecated(alert,eval)
       */
      _applyFormData: function _applyFormData(formData, old) {
        var _this2 = this;

        if (this._formController) {
          try {
            this.getModel().removeAllBindings();

            this._formController.dispose();
          } catch (e) {}
        }

        if (this._form) {
          try {
            this._form.getValidationManager().removeAllBindings();

            this._form.dispose();
          } catch (e) {}
        }

        this._formContainer.removeAll();

        if (!formData) {
          return;
        }

        if (this.getModel()) {
          this.getModel().removeAllBindings();
          this.getModel().dispose();
        }

        var modelData = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.getOwnPropertyNames(formData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            modelData[key] = formData[key].value !== undefined ? formData[key].value : null;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var model = qx.data.marshal.Json.createModel(modelData);
        this.setModel(model); // form

        this._form = new qx.ui.form.Form();

        if (qx.core.Environment.get("module.objectid") === true) {
          this._form.setQxObjectId("form");

          this.addOwnedQxObject(this._form);
        }

        this._formController = new qx.data.controller.Object(this.getModel());

        this._onFormReady(this._form);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var key = _step2.value;
            var fieldData = formData[key];
            var formElement = null;

            switch (fieldData.type.toLowerCase()) {
              case "groupheader":
                _this2._form.addGroupHeader(fieldData.value);

                break;

              case "textarea":
                formElement = new qx.ui.form.TextArea();
                formElement.setHeight(fieldData.lines * 16);
                formElement.setLiveUpdate(true);
                break;

              case "textfield":
                formElement = new qx.ui.form.TextField();
                if (fieldData.maxLength) formElement.setMaxLength(fieldData.maxLength);
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
                  var listItem = new qx.ui.form.ListItem(item.label, item.icon);
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
                  var radioButton = new qx.ui.form.RadioButton(item.label);
                  radioButton.setUserData("value", item.value !== undefined ? item.value : item.label);
                  formElement.add(radioButton);
                }, _this2);
                break;

              case "label":
                formElement = new qx.ui.form.TextField(); // dummy

                formElement.setUserData("excluded", true);
                break;

              case "checkbox":
                formElement = new qx.ui.form.CheckBox(fieldData.label);
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

                if (fieldData.fractionsDigits) {
                  var fd = fieldData.fractionsDigits;
                  var nf = new qx.util.format.NumberFormat();

                  if (fd.min) {
                    nf.setMinimumFractionDigits(fd.min);
                  }

                  if (fd.max) {
                    nf.setMaximumFractionDigits(fd.max);
                  }

                  formElement.setNumberFormat(nf);
                }

                break;

              default:
                _this2.error("Invalid form field type:" + fieldData.type);

            }

            formElement.setUserData("key", key);
            var _this = _this2;

            if (typeof fieldData.type == "string") {
              switch (fieldData.type.toLowerCase()) {
                case "textarea":
                case "textfield":
                case "passwordfield":
                case "combobox":
                case "datefield":
                case "spinner":
                  _this2._formController.addTarget(formElement, "value", key, true, null, {
                    converter: function converter(value) {
                      _this._form.getValidationManager().validate();

                      return value;
                    }
                  });

                  break;

                case "checkbox":
                  _this2._formController.addTarget(formElement, "value", key, true, null);

                  break;

                case "selectbox":
                  _this2._formController.addTarget(formElement, "selection", key, true, {
                    converter: qx.lang.Function.bind(function (value) {
                      var selected = null;
                      var selectables = this.getSelectables();
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
                      var value = selection[0].getModel().getValue();
                      return value;
                    }, formElement)
                  });

                  break;

                case "radiogroup":
                  _this2._formController.addTarget(formElement, "selection", key, true, {
                    converter: qx.lang.Function.bind(function (value) {
                      var selectables = this.getSelectables();
                      var selection = [];

                      if (value) {
                        selectables.forEach(function (selectable) {
                          var sValue = selectable.getUserData("value");

                          if (sValue === value) {
                            selection = [selectable];
                          }
                        }, this);
                      }

                      return selection;
                    }, formElement)
                  }, {
                    converter: function converter(selection) {
                      var value = selection[0].getUserData("value");
                      return value;
                    }
                  });

                  break;
              }
            }
            /**
             * Validation
             */


            var validator = null;

            if (formElement && fieldData.validation) {
              // required field
              if (fieldData.validation.required) {
                formElement.setRequired(true);
              } // sync validation


              if (fieldData.validation.validator) {
                validator = fieldData.validation.validator;

                if (typeof validator == "string") {
                  if (qx.util.Validate[validator]) {
                    validator = qx.util.Validate[validator]();
                  } else if (validator.charAt(0) === "/") {
                    validator = qx.util.Validate.regExp(new RegExp(validator.substr(1, validator.length - 2)), fieldData.validation.errorMessage);
                  } else {
                    _this2.error("Invalid string validator.");
                  }
                } else if (!(validator instanceof qx.ui.form.validation.AsyncValidator) && typeof validator !== "function") {
                  _this2.error("Invalid validator.");
                }
              } // async validation


              if (qx.lang.Type.isString(fieldData.validation.proxy) && qx.lang.Type.isString(fieldData.validation.method)) {
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
                var proxy = fieldData.validation.proxy.replace(/;\n/g, "");

                try {
                  eval('proxy = ' + proxy + ';');
                } catch (e) {
                  _this2.warn("Invalid proxy name");
                }

                if (typeof proxy == "function") {
                  var method = fieldData.validation.method;
                  var message = fieldData.validation.invalidMessage;
                  var _this3 = _this2;

                  var validationFunc = function validationFunc(validatorObj, value) {
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
            /**
             * Events
             */


            if (qx.lang.Type.isObject(fieldData.events)) {
              for (var type in fieldData.events) {
                try {
                  var func = eval("(" + fieldData.events[type] + ")"); // eval is evil, I know.

                  if (!qx.lang.Type.isFunction(func)) {
                    throw new Error();
                  }

                  formElement.addListener(type, func, formElement);
                } catch (e) {
                  _this2.warn("Invalid '" + type + "' event handler for form element '" + key + "'.");
                }
              }
            } // Putting it all together


            var label = fieldData.label;

            _this2._form.add(formElement, label, validator); // Add the form elements as objects owned by the form widget


            if (qx.core.Environment.get("module.objectid") === true) {
              formElement.setQxObjectId(key);

              _this2._form.addOwnedQxObject(formElement);
            }
          };

          for (var _iterator2 = Object.getOwnPropertyNames(formData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var view = new dialog.FormRenderer(this._form);
        view.getLayout().setColumnFlex(0, 0);
        view.getLayout().setColumnMaxWidth(0, this.getLabelColumnWidth());
        view.getLayout().setColumnFlex(1, 1);
        view.setAllowGrowX(true);

        this._formContainer.add(view);

        this._form.getValidationManager().validate();
      },

      /**
       * Create OK Button
       * unlike our superclass, we do not add an appear listener to focus OK
       * @override
       * @return {qx.ui.form.Button}
       */
      _createOkButton: function _createOkButton() {
        return dialog.Form.prototype._createOkButton.base.call(this, true);
      },

      /**
       * Hook for subclasses to do something with the form, for example
       * in order to attach bindings to the validation manager.
       * Default behavior: bind the enabled state of the "OK" button to the
       * validity of the current form.
       * @param form {qx.ui.form.Form} The form to bind
       */
      _onFormReady: function _onFormReady(form) {
        form.getValidationManager().bind("valid", this._okButton, "enabled", {
          converter: function converter(value) {
            return value || false;
          }
        });
      },

      /**
       * Handle click on ok button. Calls callback with the result map
       * @override
       */
      _handleOk: function _handleOk() {
        this.hide();

        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), qx.util.Serializer.toNativeObject(this.getModel()));
        }

        this.resetCallback();
      }
    }
  });
  dialog.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1586897327923