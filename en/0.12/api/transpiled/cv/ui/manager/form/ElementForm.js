function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Form": {
        "require": true
      },
      "qx.data.marshal.Json": {},
      "qx.ui.form.Form": {},
      "qx.data.controller.Object": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.form.TextField": {},
      "cv.ui.manager.form.SourceCodeField": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.form.VirtualComboBox": {},
      "cv.ui.manager.form.Option": {},
      "qx.data.Array": {},
      "cv.ui.manager.form.ListItem": {},
      "qx.ui.form.SelectBox": {},
      "qx.data.controller.List": {},
      "cv.ui.manager.form.VirtualSelectBox": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButton": {},
      "cv.ui.manager.form.CheckBox": {},
      "qx.ui.form.Spinner": {},
      "qx.util.format.NumberFormat": {},
      "qx.util.Validate": {},
      "qx.ui.form.validation.AsyncValidator": {},
      "qx.lang.Type": {},
      "qx.locale.Manager": {},
      "cv.ui.manager.form.ElementFormRenderer": {},
      "qx.ui.container.Scroll": {},
      "qx.bom.Document": {},
      "qx.core.Init": {},
      "qx.event.Timer": {},
      "qx.util.Serializer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "module.objectid": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ElementForm.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   *
   */
  qx.Class.define('cv.ui.manager.form.ElementForm', {
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
        init: '#585858'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_36_0: null,
      __P_36_1: null,
      _rootListenerId: null,
      _applyFormData: function _applyFormData(formData, old) {
        var _this = this;

        this.__P_36_0 = {
          map: {},
          inverse: {}
        };
        var firstWidget;

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

        var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(formData)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            var _i = 0;
            var mappedKey = key.replaceAll(/[-_\.#]+([a-z])/g, function (match, p1) {
              return p1.toUpperCase();
            }) + _i++;

            while (Object.prototype.hasOwnProperty.call(modelData, mappedKey)) {
              mappedKey = mappedKey.substr(0, mappedKey.length - 1) + _i++;
            }

            if (mappedKey !== key) {
              this.__P_36_0.map[mappedKey] = key;
              this.__P_36_0.inverse[key] = mappedKey;
            }

            modelData[mappedKey] = formData[key].value !== undefined ? formData[key].value : null;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var model = qx.data.marshal.Json.createModel(modelData);
        this.setModel(model); // form

        this._form = new qx.ui.form.Form();

        if (qx.core.Environment.get('module.objectid') === true) {
          this._form.setQxObjectId('form');

          this.addOwnedQxObject(this._form);
        }

        this._formController = new qx.data.controller.Object(model);

        this._onFormReady(this._form);

        var i = 0;
        var atom;

        var _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(formData)),
            _step2;

        try {
          var _loop = function _loop() {
            var key = _step2.value;
            var mappedKey = _this.__P_36_0.inverse[key];
            var fieldData = formData[key];
            var formElement = null;
            var elementModel = null;
            var elementModelReady = null;

            switch (fieldData.type.toLowerCase()) {
              case 'groupheader':
                _this._form.addGroupHeader(fieldData.value);

                break;

              case 'textarea':
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

              case 'textfield':
                formElement = new qx.ui.form.TextField();

                if (fieldData.maxLength) {
                  formElement.setMaxLength(fieldData.maxLength);
                }

                formElement.setLiveUpdate(true);
                break;

              case 'sourceeditor':
                formElement = new cv.ui.manager.form.SourceCodeField('', fieldData.language);

                if (fieldData.autoSize === true) {
                  formElement.setAutoSize(true);
                  formElement.setMinHeight(fieldData.lines * 16);
                } else {
                  formElement.setHeight(fieldData.lines * 16);
                }

                break;

              case 'datefield':
              case 'date':
                formElement = new qx.ui.form.DateField();

                if (fieldData.dateFormat) {
                  formElement.setDateFormat(fieldData.dateFormat);
                }

                break;

              case 'passwordfield':
              case 'password':
                formElement = new qx.ui.form.PasswordField();
                formElement.getContentElement().setAttribute('autocomplete', 'password');
                break;

              case 'combobox':
                {
                  formElement = new qx.ui.form.ComboBox();

                  var parseComboOptions = function parseComboOptions(options) {
                    if (Array.isArray(options)) {
                      options.forEach(function (item) {
                        var listItem = new qx.ui.form.ListItem(item.label, item.icon);
                        formElement.add(listItem);
                      });
                    } else if (_typeof(options) === 'object') {
                      // grouped options
                      Object.keys(options).forEach(function (groupName) {
                        var groupItem = new qx.ui.form.ListItem(groupName);
                        groupItem.set({
                          anonymous: true,
                          appearance: 'optiongroup'
                        });
                        formElement.add(groupItem);
                        options[groupName].forEach(function (item) {
                          var listItem = new qx.ui.form.ListItem(item.label, item.icon, item.value);
                          formElement.add(listItem);
                        });
                      });
                    }
                  };

                  if (fieldData.options instanceof Promise) {
                    formElement.setPlaceholder(_this.tr('Loading...'));
                    elementModelReady = fieldData.options.then(function (options) {
                      formElement.setPlaceholder(fieldData.placeholder);
                      parseComboOptions(options);
                      return true;
                    }, _this)["catch"](function (err) {
                      _this.error(err);

                      formElement.setPlaceholder(_this.tr('Possible values could no be retrieved, please check browser console for error details'));
                    }, _this);
                  } else {
                    parseComboOptions(fieldData.options);
                  }

                  break;
                }

              case 'virtualcombobox':
                {
                  formElement = new qx.ui.form.VirtualComboBox();
                  formElement.set({
                    iconPath: 'icon',
                    labelPath: 'value'
                  });

                  if (fieldData.validation) {
                    formElement.getChildControl('textfield').setLiveUpdate(true);
                  }

                  var selection = formElement.getChildControl('dropdown').getSelection();
                  selection.addListener('change', function (ev) {
                    var selected = selection.getItem(0);

                    if (selected && selected instanceof cv.ui.manager.form.Option) {
                      this.__P_36_1 = selected.getHints();
                    } else {
                      this.__P_36_1 = null;
                    }
                  }, _this);
                  elementModel = new qx.data.Array();

                  var parseVComboOptions = function parseVComboOptions(options) {
                    if (Array.isArray(options)) {
                      options.forEach(function (item) {
                        elementModel.push(new cv.ui.manager.form.Option(item.label + (item.value ? " (".concat(item.value, ")") : ''), item.icon, item.value, item.hints));
                      });
                    } else if (_typeof(options) === 'object') {
                      Object.keys(options).forEach(function (groupName) {
                        var groupModel = new cv.ui.manager.form.Option(groupName);
                        groupModel.setType('group');
                        elementModel.push(groupModel);
                        options[groupName].forEach(function (item) {
                          elementModel.push(new cv.ui.manager.form.Option(item.label + (item.value ? " (".concat(item.value, ")") : ''), item.icon, item.value, item.hints));
                        });
                      });
                    }
                  };

                  if (fieldData.options instanceof Promise) {
                    formElement.setPlaceholder(_this.tr('Loading...'));
                    fieldData.options.then(function (options) {
                      formElement.setPlaceholder(fieldData.placeholder);
                      parseVComboOptions(options);
                    }, _this)["catch"](function (err) {
                      _this.error(err);

                      formElement.setPlaceholder(_this.tr('Possible values could no be retrieved, please check browser console for error details'));
                    }, _this);
                  } else {
                    parseVComboOptions(fieldData.options);
                  }

                  formElement.setDelegate({
                    createItem: function createItem() {
                      return new cv.ui.manager.form.ListItem();
                    },
                    bindItem: function bindItem(controller, item, index) {
                      controller.bindProperty('icon', 'icon', null, item, index);
                      controller.bindProperty('label', 'label', null, item, index);
                      controller.bindProperty('type', 'appearance', {
                        converter: function converter(value) {
                          switch (value) {
                            case 'state':
                              return 'state-option';

                            case 'error':
                              return 'error-option';

                            case 'group':
                              return 'optiongroup';

                            default:
                              return 'listitem';
                          }
                        }
                      }, item, index);
                      controller.bindProperty('type', 'anonymous', {
                        converter: function converter(value) {
                          return value === 'group';
                        }
                      }, item, index);
                    }
                  });
                  formElement.setModel(elementModel);
                  break;
                }

              case 'selectbox':
                {
                  formElement = new qx.ui.form.SelectBox();

                  if (fieldData.options instanceof Promise) {
                    atom = formElement.getChildControl('atom');
                    atom.setLabel(_this.tr('Loading...'));
                    atom.addState('loading');
                    elementModelReady = fieldData.options.then(function (options) {
                      var atom = formElement.getChildControl('atom');
                      atom.resetLabel();
                      atom.removeState('loading'); // eslint-disable-next-line no-new

                      new qx.data.controller.List(qx.data.marshal.Json.createModel(options), formElement, 'label');
                      return true;
                    }, _this)["catch"](function (err) {
                      _this.error(err);

                      var atom = formElement.getChildControl('atom');
                      atom.setLabel(_this.tr('Possible values could no be retrieved, please check browser console for error details'));
                      atom.removeState('loading');
                      atom.addState('error');
                    }, _this);
                  } else {
                    // eslint-disable-next-line no-new
                    new qx.data.controller.List(qx.data.marshal.Json.createModel(fieldData.options), formElement, 'label');
                  }

                  break;
                }

              case 'virtualselectbox':
                formElement = new cv.ui.manager.form.VirtualSelectBox();
                elementModel = new qx.data.Array();

                if (fieldData.options) {
                  if (fieldData.options instanceof Promise) {
                    atom = formElement.getChildControl('atom');
                    atom.setLabel(_this.tr('Loading...'));
                    atom.addState('loading');
                    elementModelReady = fieldData.options.then(function (options) {
                      var atom = formElement.getChildControl('atom');
                      atom.resetLabel();
                      atom.removeState('loading');
                      options.forEach(function (item) {
                        elementModel.push(new cv.ui.manager.form.Option(item.label, item.icon, item.value));
                      });
                      return true;
                    })["catch"](function (err) {
                      _this.error(err);

                      var atom = formElement.getChildControl('atom');
                      atom.setLabel(_this.tr('Possible values could no be retrieved, please check browser console for error details'));
                      atom.removeState('loading');
                      atom.addState('error');
                    }, _this);
                  } else {
                    fieldData.options.forEach(function (item) {
                      elementModel.push(new cv.ui.manager.form.Option(item.label, item.icon, item.value));
                    });
                  }
                }

                formElement.setDelegate({
                  createItem: function createItem() {
                    return new cv.ui.manager.form.ListItem();
                  },
                  bindItem: function bindItem(controller, item, index) {
                    controller.bindDefaultProperties(item, index);
                    controller.bindProperty('value', 'model', null, item, index);
                  }
                });
                formElement.set({
                  labelPath: 'label',
                  iconPath: 'icon',
                  iconOptions: {
                    converter: function converter(value) {
                      if (typeof value === 'function') {
                        return value().trim();
                      }

                      return value;
                    }
                  },
                  model: elementModel
                });
                break;

              case 'radiogroup':
                formElement = new qx.ui.form.RadioGroup();

                if (fieldData.orientation) {
                  formElement.setUserData('orientation', fieldData.orientation);
                }

                fieldData.options.forEach(function (item) {
                  var radioButton = new qx.ui.form.RadioButton(item.label);
                  radioButton.setUserData('value', item.value !== undefined ? item.value : item.label);
                  formElement.add(radioButton);
                }, _this);
                break;

              case 'label':
                formElement = new qx.ui.form.TextField(); // dummy

                formElement.setUserData('excluded', true);
                break;

              case 'checkbox':
                formElement = new cv.ui.manager.form.CheckBox();
                formElement.setTriState(true);
                break;

              case 'spinner':
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
                _this.error('Invalid form field type:' + fieldData.type);

            }

            formElement.setUserData('key', key);
            formElement.setUserData('mappedKey', mappedKey);

            if (i === 0) {
              firstWidget = formElement;
            }

            i++;

            if (typeof fieldData.type == 'string') {
              var options = null;
              var reverseOptions = null;
              var bidirectional = true;
              var handled = false;

              switch (fieldData.type.toLowerCase()) {
                case 'textarea':
                case 'textfield':
                case 'passwordfield':
                case 'combobox':
                case 'virtualcombobox':
                case 'datefield':
                case 'spinner':
                case 'sourceeditor':
                  reverseOptions = {
                    converter: function (value) {
                      // just validate when the value has changed
                      this.getValidationManager().validate();
                      return value;
                    }.bind(_this._form)
                  };
                  break;

                case 'virtualselectbox':
                  options = {
                    converter: function (value) {
                      if (typeof value === 'string') {
                        var option;
                        this.getModel().some(function (item) {
                          if (item.getValue() === value) {
                            option = item;
                            return true;
                          }

                          return false;
                        });
                        return option;
                      }

                      return value;
                    }.bind(formElement)
                  };
                  reverseOptions = {
                    converter: function (option) {
                      this.getValidationManager().validate();
                      return option ? option.getValue() : null;
                    }.bind(_this._form)
                  };
                  break;

                case 'checkbox':
                  break;

                case 'selectbox':
                  // for some strange timing reason this only works, when addTarget is called here
                  _this._formController.addTarget(formElement, 'selection', mappedKey, true, {
                    converter: function (value) {
                      var selected = null;
                      var selectables = this.getSelectables();
                      selectables.some(function (selectable) {
                        if (selectable.getModel().getValue() === value) {
                          selected = selectable;
                          return true;
                        }

                        return false;
                      }, this);

                      if (!selected) {
                        return [selectables[0]];
                      }

                      return [selected];
                    }.bind(formElement)
                  }, {
                    converter: function converter(selection) {
                      return selection[0].getModel().getValue();
                    }
                  });

                  handled = true;
                  break;

                case 'radiogroup':
                  options = {
                    converter: function (value) {
                      var selectables = this.getSelectables();
                      var selection = [];

                      if (value) {
                        selectables.forEach(function (selectable) {
                          var sValue = selectable.getUserData('value');

                          if (sValue === value) {
                            selection = [selectable];
                          }
                        }, this);
                      }

                      return selection;
                    }.bind(formElement)
                  };
                  reverseOptions = {
                    converter: function converter(selection) {
                      return selection[0].getUserData('value');
                    }
                  };
                  break;
              }

              if (!handled) {
                if (elementModelReady) {
                  // do not add the binding before the model is there
                  elementModelReady.then(function () {
                    _this._formController.addTarget(formElement, 'value', mappedKey, bidirectional, options, reverseOptions);
                  });
                } else {
                  _this._formController.addTarget(formElement, 'value', mappedKey, bidirectional, options, reverseOptions);
                }
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

                if (typeof validator == 'string') {
                  if (qx.util.Validate[validator]) {
                    validator = qx.util.Validate[validator]();
                  } else if (validator.charAt(0) === '/') {
                    validator = qx.util.Validate.regExp(new RegExp(validator.substr(1, validator.length - 2)), fieldData.validation.errorMessage);
                  } else {
                    _this.error('Invalid string validator.');
                  }
                } else if (!(validator instanceof qx.ui.form.validation.AsyncValidator) && typeof validator !== 'function') {
                  _this.error('Invalid validator.');
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
                var proxy = fieldData.validation.proxy.replace(/;\n/g, '');

                try {
                  // eslint-disable-next-line no-eval
                  eval('proxy = ' + proxy + ';');
                } catch (e) {
                  _this.warn('Invalid proxy name');
                }

                if (typeof proxy == 'function') {
                  var method = fieldData.validation.method;
                  var message = fieldData.validation.invalidMessage;

                  var validationFunc = function validationFunc(validatorObj, value) {
                    if (!validatorObj.__P_36_2) {
                      validatorObj.__P_36_2 = true;
                      proxy(method, [value], function (valid) {
                        validatorObj.setValid(valid, message || qx.locale.Manager.tr('Value is invalid'));
                        validatorObj.__P_36_2 = false;
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
              formElement.setUserData('help', fieldData.help);
            }
            /**
             * Events
             */


            if (qx.lang.Type.isObject(fieldData.events)) {
              for (var type in fieldData.events) {
                try {
                  // eslint-disable-next-line no-eval
                  var func = eval('(' + fieldData.events[type] + ')'); // eval is evil, I know.

                  if (!qx.lang.Type.isFunction(func)) {
                    throw new Error();
                  }

                  formElement.addListener(type, func, formElement);
                } catch (e) {
                  _this.warn('Invalid \'' + type + '\' event handler for form element \'' + key + '\'.');
                }
              }
            } // Putting it all together


            var label = fieldData.label;

            _this._form.add(formElement, label, validator); // Add the form elements as objects owned by the form widget


            if (qx.core.Environment.get('module.objectid') === true) {
              formElement.setQxObjectId(key);

              _this._form.addOwnedQxObject(formElement);
            }
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var view = new cv.ui.manager.form.ElementFormRenderer(this._form);
        view.getLayout().setColumnFlex(0, 0);
        view.getLayout().setColumnMaxWidth(0, this.getLabelColumnWidth());
        view.getLayout().setColumnFlex(1, 1);
        view.getLayout().set({
          spacingX: 8
        });
        view.setAllowGrowX(true);
        var scroll = new qx.ui.container.Scroll(view);
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        this._rootListenerId = qx.core.Init.getApplication().getRoot().addListener('resize', function () {
          scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        });
        view.bind('width', scroll, 'width');
        view.bind('height', scroll, 'height');

        this._formContainer.add(scroll);

        this._form.getValidationManager().validate();

        if (firstWidget) {
          qx.event.Timer.once(function () {
            firstWidget.focus();
          }, this, 200);
        }
      },
      _handleOk: function _handleOk() {
        var _this2 = this;

        this.hide();

        if (this.getCallback()) {
          var data = qx.util.Serializer.toNativeObject(this.getModel());
          var mappedNames = Object.keys(this.__P_36_0.map);
          mappedNames.forEach(function (mappedKey) {
            if (Object.prototype.hasOwnProperty.call(data, mappedKey)) {
              data[_this2.__P_36_0.map[mappedKey]] = data[mappedKey];
              delete data[mappedKey];
            }
          });

          if (this.__P_36_1) {
            Object.keys(this.__P_36_1).forEach(function (name) {
              return data[name] = _this2.__P_36_1[name];
            });
          }

          this.getCallback().call(this.getContext(), data);
        }

        this.resetCallback();
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      if (this._rootListenerId) {
        qx.core.Init.getApplication().getRoot().removeListenerById(this._rootListenerId);
        this._rootListenerId = null;
      }
    }
  });
  cv.ui.manager.form.ElementForm.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ElementForm.js.map?dt=1660930398314