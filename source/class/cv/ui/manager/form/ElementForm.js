/**
 *
 */
qx.Class.define("cv.ui.manager.form.ElementForm", {
  extend: qxl.dialog.Form,

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
    },

    blockerOpacity: {
      refine: true,
      init: 0.9
    },

    blockerColor: {
      refine: true,
      init: "#585858"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __mappedKeys: null,
    __hints: null,
    _rootListenerId: null,

    _applyFormData: function (formData, old) {
      this.__mappedKeys = {
        map: {},
        inverse: {}
      };
      let firstWidget;
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
        let i = 0;
        let mappedKey = key.replaceAll(/[-_\.#]+([a-z])/g, (match, p1) => p1.toUpperCase()) + i++;
        while (Object.prototype.hasOwnProperty.call(modelData, mappedKey)) {
          mappedKey = mappedKey.substr(0, mappedKey.length - 1) + i++;
        }
        if (mappedKey !== key) {
          this.__mappedKeys.map[mappedKey] = key;
          this.__mappedKeys.inverse[key] = mappedKey;
        }
        modelData[mappedKey] = formData[key].value !== undefined ?
          formData[key].value :
          null;
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
      let i = 0;
      let loadingStatus; let atom;
      for (let key of Object.getOwnPropertyNames(formData)) {
        const mappedKey = this.__mappedKeys.inverse[key];
        let fieldData = formData[key];
        let formElement = null;
        switch (fieldData.type.toLowerCase()) {
          case "groupheader":
            this._form.addGroupHeader(fieldData.value);
            break;
          case "textarea":
            formElement = new qx.ui.form.TextArea();
            formElement.setMinimalLineHeight(fieldData.lines);
            if (fieldData.autoSize === true) {
              formElement.setAutoSize(true);
              formElement.setMinHeight(fieldData.lines * 16);
            } else {
              formElement.setHeight(fieldData.lines * 16);
            }
            formElement.setLiveUpdate(true);
            break;
          case "textfield":
            formElement = new qx.ui.form.TextField();
            if (fieldData.maxLength) {
 formElement.setMaxLength(fieldData.maxLength); 
}
            formElement.setLiveUpdate(true);
            break;
          case "sourceeditor":
            formElement = new cv.ui.manager.form.SourceCodeField("", fieldData.language);
            if (fieldData.autoSize === true) {
              formElement.setAutoSize(true);
              formElement.setMinHeight(fieldData.lines * 16);
            } else {
              formElement.setHeight(fieldData.lines * 16);
            }
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
            const parseComboOptions = function (options) {
              if (Array.isArray(options)) {
                options.forEach(function (item) {
                  let listItem = new qx.ui.form.ListItem(item.label, item.icon);
                  formElement.add(listItem);
                });
              } else if (typeof options === "object") {
                // grouped options
                Object.keys(options).forEach(groupName => {
                  let groupItem = new qx.ui.form.ListItem(groupName);
                  groupItem.set({
                    anonymous: true,
                    appearance: "optiongroup"
                  });
                  formElement.add(groupItem);
                  options[groupName].forEach(function (item) {
                    let listItem = new qx.ui.form.ListItem(item.label, item.icon, item.value);
                    formElement.add(listItem);
                  });
                });
              }
            };
            if (fieldData.options instanceof Promise) {
              formElement.setPlaceholder(this.tr("Loading..."));
              fieldData.options.then(options => {
                formElement.setPlaceholder(fieldData.placeholder);
                parseComboOptions(options);
              }, this).catch(err => {
                this.error(err);
                formElement.setPlaceholder(this.tr("Possible values could no be retrieved, please check browser console for error details"));
              }, this);
            } else {
              parseComboOptions(fieldData.options);
            }
            break;
          case "virtualcombobox":
            formElement = new qx.ui.form.VirtualComboBox();
            formElement.set({
              iconPath: "icon",
              labelPath: "value"
            });
            if (fieldData.validation) {
              formElement.getChildControl("textfield").setLiveUpdate(true);
            }
            const selection = formElement.getChildControl("dropdown").getSelection();
            selection.addListener("change", function(ev) {
              const selected = selection.getItem(0);
              if (selected && selected instanceof cv.ui.manager.form.Option) {
                this.__hints = selected.getHints();
              } else {
                this.__hints = null;
              }
            }, this);
            model = new qx.data.Array();
            const parseVComboOptions = function (options) {
              if (Array.isArray(options)) {
                options.forEach(item => {
                  model.push(new cv.ui.manager.form.Option(item.label + (item.value ? ` (${item.value})` : ""), item.icon, item.value, item.hints));
                });
              } else if (typeof options === "object") {
                Object.keys(options).forEach(groupName => {
                  const groupModel = new cv.ui.manager.form.Option(groupName);
                  groupModel.setType("group");
                  model.push(groupModel);
                  options[groupName].forEach(function (item) {
                    model.push(new cv.ui.manager.form.Option(item.label + (item.value ? ` (${item.value})` : ""), item.icon, item.value, item.hints));
                  });
                });
              }
            };
            if (fieldData.options instanceof Promise) {
              formElement.setPlaceholder(this.tr("Loading..."));
              fieldData.options.then(options => {
                formElement.setPlaceholder(fieldData.placeholder);
                parseVComboOptions(options);
              }, this).catch(err => {
                this.error(err);
                formElement.setPlaceholder(this.tr("Possible values could no be retrieved, please check browser console for error details"));
              }, this);
            } else {
              parseVComboOptions(fieldData.options);
            }

            formElement.setDelegate({
              createItem: function() {
                return new cv.ui.manager.form.ListItem();
              },
              bindItem:  function (controller, item, index) {
                controller.bindProperty("icon", "icon", null, item, index);
                controller.bindProperty("label", "label", null, item, index);
                controller.bindProperty("type", "appearance", {
                  converter: function (value) {
                    switch (value) {
                      case "state":
                        return "state-option";
                      case "error":
                        return "error-option";
                      case "group":
                        return "optiongroup";
                      default:
                        return "listitem";
                    }
                  }
                }, item, index);
                controller.bindProperty("type", "anonymous", {
                  converter: function (value) {
                    return value === "group";
                  }
                }, item, index);
              }
            });
            formElement.setModel(model);
            break;
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            if (fieldData.options instanceof Promise) {
              atom = formElement.getChildControl("atom");
              atom.setLabel(this.tr("Loading..."));
              atom.addState("loading");
              fieldData.options.then(options => {
                const atom = formElement.getChildControl("atom");
                atom.resetLabel();
                atom.removeState("loading");
                model = qx.data.marshal.Json.createModel(options);
                new qx.data.controller.List(model, formElement, "label");
              }, this).catch(err => {
                this.error(err);
                const atom = formElement.getChildControl("atom");
                atom.setLabel(this.tr("Possible values could no be retrieved, please check browser console for error details"));
                atom.removeState("loading");
                atom.addState("error");
              }, this);
            } else {
              model = qx.data.marshal.Json.createModel(fieldData.options);
              new qx.data.controller.List(model, formElement, "label");
            }
            break;
          case "virtualselectbox":
            formElement = new cv.ui.manager.form.VirtualSelectBox();
            model = new qx.data.Array();
            if (fieldData.options) {
              if (fieldData.options instanceof Promise) {
                atom = formElement.getChildControl("atom");
                atom.setLabel(this.tr("Loading..."));
                atom.addState("loading");
                fieldData.options.then(options => {
                  const atom = formElement.getChildControl("atom");
                  atom.resetLabel();
                  atom.removeState("loading");
                  options.forEach(item => {
                    model.push(new cv.ui.manager.form.Option(item.label, item.icon, item.value));
                  });
                }).catch(err => {
                  this.error(err);
                  const atom = formElement.getChildControl("atom");
                  atom.setLabel(this.tr("Possible values could no be retrieved, please check browser console for error details"));
                  atom.removeState("loading");
                  atom.addState("error");
                }, this);
              } else {
                fieldData.options.forEach(item => {
                  model.push(new cv.ui.manager.form.Option(item.label, item.icon, item.value));
                });
              }
            }
            formElement.setDelegate({
              createItem: function() {
                return new cv.ui.manager.form.ListItem();
              },
              bindItem:  function (controller, item, index) {
                controller.bindDefaultProperties(item, index);
                controller.bindProperty("value", "model", null, item, index);
              }
            });
            formElement.set({
              labelPath: "label",
              iconPath: "icon",
              iconOptions: {
                converter: function (value) {
                  if (typeof value === "function") {
                    return value().trim();
                  }
                  return value;
                }
              },
              model: model
            });
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
            formElement = new cv.ui.manager.form.CheckBox();
            formElement.setTriState(true);
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
              let fd = fieldData.fractionsDigits;
              let nf = new qx.util.format.NumberFormat();
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
            this.error("Invalid form field type:" + fieldData.type);
        }
        formElement.setUserData("key", key);
        formElement.setUserData("mappedKey", mappedKey);
        if (i === 0) {
          firstWidget = formElement;
        }
        i++;
        if (typeof fieldData.type == "string") {
          switch (fieldData.type.toLowerCase()) {
            case "textarea":
            case "textfield":
            case "passwordfield":
            case "combobox":
            case "virtualcombobox":
            case "datefield":
            case "spinner":
            case "sourceeditor":
              this._formController.addTarget(formElement, "value", mappedKey, true, null, {
                converter: function (value) {
                  this.getValidationManager().validate();
                  return value;
                }.bind(this._form)
              });
              break;
            case "virtualselectbox":
              this._formController.addTarget(formElement, "value", mappedKey, true, {
                converter: function (value) {
                  if (typeof value === "string") {
                    let option;
                    this.getModel().some(item => {
                      if (item.getValue() === value) {
                        option = item;
                        return true;
                      }
                    });
                    return option;
                  }
                  return value;
                }.bind(formElement)
              }, {
                converter: function (option) {
                  this.getValidationManager().validate();
                  return option ? option.getValue() : null;
                }.bind(this._form)
              });
              break;
            case "checkbox":
              this._formController.addTarget(formElement, "value", mappedKey, true, null);
              break;
            case "selectbox":
              this._formController.addTarget(formElement, "selection", mappedKey, true, {
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
              this._formController.addTarget(formElement, "selection", mappedKey, true, {
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
              eval("proxy = " + proxy + ";");
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
                    validatorObj.setValid(valid, message || this.tr("Value is invalid"));
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
      });
      view.setAllowGrowX(true);
      const scroll = new qx.ui.container.Scroll(view);
      scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      this._rootListenerId = qx.core.Init.getApplication().getRoot().addListener("resize", function () {
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      });

      view.bind("width", scroll, "width");
      view.bind("height", scroll, "height");
      this._formContainer.add(scroll);
      this._form.getValidationManager().validate();
      if (firstWidget) {
        qx.event.Timer.once(() => {
          firstWidget.focus();
        }, this, 200);
      }
    },

    _handleOk: function () {
      this.hide();
      if (this.getCallback()) {
        const data = qx.util.Serializer.toNativeObject(this.getModel());
        const mappedNames = Object.keys(this.__mappedKeys.map);
        mappedNames.forEach(mappedKey => {
          if (Object.prototype.hasOwnProperty.call(data, mappedKey)) {
            data[this.__mappedKeys.map[mappedKey]] = data[mappedKey];
            delete data[mappedKey];
          }
        });
        if (this.__hints) {
          Object.keys(this.__hints).forEach(name => data[name] = this.__hints[name]);
        }
        this.getCallback().call(
          this.getContext(),
          data
        );
      }
      this.resetCallback();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this._rootListenerId) {
      qx.core.Init.getApplication().getRoot().removeListenerById(this._rootListenerId);
      this._rootListenerId = null;
    }
  }
});
