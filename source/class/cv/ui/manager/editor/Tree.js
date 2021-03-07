/**
 * New XML-Editor base on a node truee
 */
qx.Class.define('cv.ui.manager.editor.Tree', {
  extend: cv.ui.manager.editor.AbstractEditor,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());
    this._handledActions = ['save'];

    // init schema
    this._schema = cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
    this._schema.onLoaded(function () {
      this._draw();
    }, this);
    this.__modifiedElements = [];
    this.__unDos = new qx.data.Array();
    this.__reDos = new qx.data.Array();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /^(demo)?\/?visu_config.*\.xml/,
    TITLE: qx.locale.Manager.tr('Xml-editor'),
    ICON: cv.theme.dark.Images.getIcon('xml', 18)
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    // show expert level settings
    expert: {
      check: 'Boolean',
      init: false
    },

    selected: {
      check: 'cv.ui.manager.model.XmlElement',
      nullable: true,
      apply: '_applySelected'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _schema: null,
    __modifiedElements: null,
    _workerWrapper: null,
    __unDos: null,
    __reDos: null,

    addUndo: function (elementChange) {
      this.assertInstance(elementChange, cv.ui.manager.model.ElementChange);
      this.__unDos.push(elementChange);
    },

    undo: function () {
      if (this.__unDos.length > 0) {
        const elementChange = this.__unDos.pop();
        if (elementChange.undo()) {
          this.__reDos.push(elementChange);
        } else {
          this.error("could not undo " + elementChange.getTitle());
          this.__unDos.push(elementChange);
        }
      }
    },

    redo: function () {
      if (this.__reDos.length > 0) {
        const elementChange = this.__reDos.pop();
        if (elementChange.redo()) {
          this.__unDos.push(elementChange);
        } else {
          this.error("could not redo " + elementChange.getTitle());
          this.__reDos.push(elementChange);
        }
      }
    },

    clearUnDosReDos: function () {
      this.__unDos.removeAll().forEach(elem => elem.dispose());
      this.clearReDos();
    },

    clearReDos: function () {
      this.__reDos.removeAll().forEach(elem => elem.dispose());
    },

    _initWorker: function () {
      this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
    },

    _loadFile: function (file, old) {
      if (old && this._workerWrapper) {
        this._workerWrapper.close(old);
      }
      if (file && file.getType() === 'file' && this.isSupported(file)) {
        this.base(arguments, file, old);
      } else {
        this.base(arguments, null, old);
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       var control;

       switch (id) {
         case 'splitpane':
           control = new qx.ui.splitpane.Pane();
           this._add(control);
           break;

         case 'left':
           control = new qx.ui.container.Composite(new qx.ui.layout.VBox());
           this.getChildControl('splitpane').add(control, 0);
           break;

         case 'preview':
           control = new cv.ui.manager.viewer.Config();
           control.set({
             target: 'iframe',
             minWidth: 600
           });
           this.getChildControl('splitpane').add(control, 1);
           break;

         case 'add-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('new-folder', 16));
           control.setEnabled(this.getFile() && this.getFile().isWriteable());
           control.setDraggable(true);
           this.getChildControl('toolbar').add(control);
           break;

         case 'edit-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('edit', 16));
           control.setEnabled(false);
           control.addListener('execute', this._onEdit, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'undo-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('undo', 16));
           control.setEnabled(false);
           this.__unDos.addListener('changeLength', () => {
             if (this.__unDos.length > 0) {
               control.setEnabled(true);
               control.setToolTipText(this.tr("Undo: %1", this.__unDos.getItem(this.__unDos.length - 1).getTitle()));
             } else {
               control.setEnabled(false);
               control.resetToolTipText();
             }
           }, this);
           control.addListener('execute', this.undo, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'redo-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('redo', 16));
           control.setEnabled(false);
           this.__reDos.addListener('changeLength', () => {
             if (this.__reDos.length > 0) {
               control.setEnabled(true);
               control.setToolTipText(this.tr("Redo: %1", this.__reDos.getItem(this.__reDos.length - 1).getTitle()));
             } else {
               control.setEnabled(false);
               control.resetToolTipText();
             }
           }, this);
           control.addListener('execute', this.redo, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'delete-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('delete', 16));
           control.setEnabled(false);
           control.addListener('execute', this._onDelete, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'toggle-expert':
           control = new qx.ui.toolbar.CheckBox(this.tr("Expertview"),
             cv.theme.dark.Images.getIcon('expert', 16));
           control.addListener('execute', function () {
             this.toggleExpert();
           }, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'toolbar':
           control = new qx.ui.toolbar.ToolBar();
           this.getChildControl('left').addAt(control, 0);
           break;

         case 'tree':
           control = new qx.ui.tree.VirtualTree(null, 'displayName', 'children');
           control.set({
             selectionMode: 'single',
             width: 350,
             openMode: 'tap'
           });
           control.setDelegate({
             createItem: function () {
               const item = new cv.ui.manager.tree.VirtualElementItem();
               let waiting = null;
               item.addListener('tap', (ev) => {
                 const current = this.getSelected();
                 if (current === item.getModel()) {
                   ev.stopPropagation();
                   // defer deselect to avoid deselection on dbltap
                   if (!waiting) {
                     waiting = qx.event.Timer.once(() => {
                       if (control.isNodeOpen(current)) {
                         control.closeNode(current);
                       } else {
                         control.openNode(current);
                       }
                       waiting = null;
                     }, this, qx.event.handler.GestureCore.DOUBLETAP_TIME);
                   }
                 } else {
                   this.setSelected(item.getModel());
                 }
               }, this);
               item.addListener('dbltap', () => {
                 if (waiting) {
                   waiting.stop();
                   waiting.dispose();
                   waiting = null;
                 }
                 this._onEdit();
               }, this);
               return item;
             }.bind(this),

             // Bind properties from the item to the tree-widget and vice versa
             bindItem: function (controller, item, index) {
               controller.bindProperty("", "model", null, item, index);
               controller.bindProperty("displayName", "label", null, item, index);
               controller.bindPropertyReverse("open", "open", null, item, index);
               controller.bindProperty("open", "open", null, item, index);
               controller.bindProperty("showEditButton", "editable", null, item, index);
               controller.bindProperty("sortable", "sortable", null, item, index);
               controller.bindProperty("icon", "icon", null, item, index);
               controller.bindProperty("valid", 'status', {
                 converter: function (value) {
                   return value === true ? 'valid' : 'error';
                 }
               }, item, index);
               //controller.bindProperty("icon", "icon", null, item, index);
             }
           });
           control.getSelection().addListener("change", this._onChangeTreeSelection, this);
           this.getChildControl('left').addAt(control, 1, {flex: 1});
           break;
       }

       return control || this.base(arguments, id);
    },

    _onChangeTreeSelection: function (ev) {
      const data = ev.getData();
      if (data.added.length === 1) {
        this.setSelected(data.added[0]);
      } else {
        this.resetSelected();
      }
    },

    __getAttributeFormDefinition: function (element, attribute) {
      const docs = attribute.getDocumentation();
      const def = {
        type: "TextField",
        label: attribute.getName(),
        placeholder: " - " + this.tr("not set") + " - ",
        help: docs.join("<br/>"),
        value: element.getAttribute(attribute.getName()) || attribute.getDefaultValue(),
        validation: {
          required: !attribute.isOptional(),
          validator: function (value) {
            if (value instanceof qx.ui.form.ListItem) {
              value = value.getModel().getValue();
            }
            return attribute.isValueValid(value);
          }
        }
      }
      switch (attribute.getTypeString()) {
        case 'boolean':
          def.type = "CheckBox";
          def.value = def.value === '' || def.value === null || def.value === undefined ? null : def.value === 'true';
          delete def.placeholder;
          break;

        case 'string':
          const enums = attribute.getEnumeration();
          if (enums.length > 0) {
            def.type = "SelectBox";
            delete def.placeholder;
            def.options = [];
            enums.forEach(name => {
              def.options.push({label: name, value: name});
            });
            if (attribute.isOptional()) {
              // allow empty value
              def.options.unshift({label: " - " + this.tr("not set") + " - ", value: ""});
            }
          } else {
            // check if we have a dataprovider for this
            this.__checkProvider(element.getName() + "@" + attribute.getName(), def, element.getNode());
          }
          break;
      }
      return def;
    },

    __checkProvider: function (id, formData, element) {
      const provider = cv.ui.manager.editor.data.Provider.get(id);
      if (provider) {
        formData.type = provider.userInputAllowed ? "ComboBox" : "SelectBox";
        if (typeof provider.live === 'function') {
          formData.options = provider.live(element);
        } else if (provider.data) {
          formData.options = provider.data;
        } else {
          this.error("misconfigured provider found for " + id);
        }
      } else if (["mapping", "styling"].includes(id.split("@").pop())) {
        const type = id.split("@").pop();
        // these are directly filled from data inside the currently used config
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        formData.type = "SelectBox";
        formData.options = [];
        rootNode.querySelectorAll("meta > " + type + "s > " + type).forEach(element => {
          const name = element.getAttribute("name");
          formData.options.push({label: name, value: name});
        });
      }
      if (formData.type === 'SelectBox') {
        // not allowed here
        delete formData.placeholder;
        if (!formData.validation.required) {
          if (formData.options instanceof Promise) {
            formData.options.then(res => res.unshift({label: " - " + this.tr("not set") + " - ", value: ""}));
          } else {
            formData.options.unshift({label: " - " + this.tr("not set") + " - ", value: ""});
          }
        }
      }
    },

    _onEdit: function () {
      const element = this.getSelected();
      element.load();
      const formData = {};
      const promises = [];
      const typeElement = element.getSchemaElement();
      if (element.getNode().nodeType === Node.ELEMENT_NODE) {
        const allowed = typeElement.getAllowedAttributes();
        Object.keys(allowed).forEach(name => {
          const attribute = allowed[name];
          if (!this.getExpert()) {
            const appInfo = attribute.getAppinfo();
            if (appInfo.includes('level:expert')) {
              // do not this this attribute
              return;
            }
          }
          formData[name] = this.__getAttributeFormDefinition(element, attribute);
          if (formData[name].options && formData[name].options instanceof Promise) {
            promises.push(formData[name].options);
            formData[name].options.then((res) => {
              formData[name].options = res;
            })
          }
        });
      } else if (element.getNode().nodeType === Node.TEXT_NODE) {
        // only in text-only mode we can add text editing to the form
        const docs = typeElement.getDocumentation();
        formData['#text'] = {
          type: "TextField",
          label: this.tr("Content"),
          placeholder: this.tr("not set"),
          help: docs.join("<br/>"),
          value: element.getTextContent(),
          validation: {
            validator: function (value) {
              if (value instanceof qx.ui.form.ListItem) {
                value = value.getModel().getValue();
              }
              return typeElement.isValueValid(value);
            }
          }
        }
        this.__checkProvider(element.getParent().getName() + "@" + element.getName(), formData['#text'], element.getNode());
        if (formData['#text'].options && formData['#text'].options instanceof Promise) {
          promises.push(formData['#text'].options);
          formData['#text'].options.then((res) => {
            formData['#text'].options = res;
          })
        }
      }
      Promise.all(promises).then(() => {
        const formDialog = new cv.ui.manager.form.ElementForm({
          allowCancel: true,
          context: this,
          caption:  "",
          message: this.tr("Edit %1", element.getName()),
          formData: formData,
          callback: function (data) {
            if (data) {
              // save changes
              element.setAttributes(data);
              this.clearReDos();
            }
            formDialog.destroy();
          }
        }).show();
      });
    },

    _onDelete: function () {
      const element = this.getSelected();
      if (element) {
        // TODO: Check if we can delete this element without creating an invalid config
        element.remove();
        this.clearReDos();
      }
    },

    updateModified: function (element) {
      const index = this.__modifiedElements.indexOf(element);
      if (element.isModified()) {
        if (index === -1) {
          this.__modifiedElements.push(element);
        }
      } else if (index >= 0) {
        this.__modifiedElements.splice(index, 1);
      }
      this.getFile().setModified(this.__modifiedElements.length > 0);
      this._onContentChanged();
    },

    _draw: function () {
      const toolbar = this.getChildControl('toolbar');
      this._createChildControl('add-button');
      toolbar.addSeparator();
      this._createChildControl('undo-button');
      this._createChildControl('redo-button');
      toolbar.addSeparator();
      this._createChildControl('edit-button');
      this._createChildControl('delete-button');
      toolbar.addSpacer();
      this._createChildControl('toggle-expert');

      this._createChildControl('tree');
      this._createChildControl('preview');
    },

    _applySelected: function (value) {
      if (value) {
        this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
        this.getChildControl('delete-button').setEnabled(this.getFile().isWriteable() && !value.isRequired());
      } else {
        this.getChildControl('edit-button').setEnabled(false);
        this.getChildControl('delete-button').setEnabled(false);
      }
    },

    _applyContent: function(value) {
      const file = this.getFile();
      if (!file) {
        return;
      }
      if (value) {
        const tree = this.getChildControl('tree');
        const document = qx.xml.Document.fromString(value);
        const schemaElement = this._schema.getElementNode(document.documentElement.nodeName);
        const rootNode = new cv.ui.manager.model.XmlElement(document.documentElement, schemaElement, this);
        rootNode.setEditable(this.getFile().getWriteable());
        rootNode.load();
        tree.setModel(rootNode);
        this.getChildControl('add-button').setEnabled(this.getFile().getWriteable());

        if (this._workerWrapper) {
          this._workerWrapper.open(file, value);
        }
        const preview = this.getChildControl('preview');
        if (!preview.getFile()) {
          const previewConfig = new cv.ui.manager.model.FileItem('visu_config_previewtemp.xml', '/', this.getFile().getParent());
          preview.setFile(previewConfig);
        }
        this._updatePreview(value);
      } else {
        this.getChildControl('add-button').setEnabled(false);
      }
    },

    _onContentChanged: function () {
      const content = this.getCurrentContent();
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), content);
      }
      this._updatePreview(content);
    },

    _updatePreview: function (content) {
      const previewFile = this.getChildControl('preview').getFile();
      if (previewFile) {
        this._client.updateSync({
          path: previewFile.getFullPath(),
          hash: 'ignore'
        }, content, () => {
          qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
            type: 'contentChanged',
            file: previewFile,
            data: content,
            source: this
          });
        }, this);
      }
    },

    getCurrentContent: function () {
      const tree = this.getChildControl('tree');
      const rootNode = tree.getModel().getNode();
      return new XMLSerializer().serializeToString(rootNode.ownerDocument);
    },

    _onSaved: function () {
      this.base(arguments);
      this.__modifiedElements.forEach(elem => elem.onSaved());
      this.clearUnDosReDos();
    },

    isSupported: function (file) {
      return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName()) && file.isWriteable();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._schema = null;
    this._workerWrapper = null;
    this._disposeArray('__modifiedElements', '__unDos', '__reDos');
  }
});
