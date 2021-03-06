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
               item.addListener('edit', this._onEdit, this);
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
               controller.bindProperty("valid", 'status', {
                 converter: function (value) {
                   return value === true ? 'valid' : 'error';
                 }
               }, item, index);
               //controller.bindProperty("icon", "icon", null, item, index);
             }
           });
           control.getSelection().addListener("change", this._onChangeTreeSelection, this);
           this.getChildControl('splitpane').add(control, 0);
           break;

         case 'preview':
           control = new qx.ui.container.Composite(new qx.ui.layout.Grow());
           this.getChildControl('splitpane').add(control, 1);
           break;
       }

       return control || this.base(arguments, id);
    },

    _onChangeTreeSelection: function (ev) {
      console.log(ev.getData());
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
          }
          break;
      }

      return def;
    },

    _onEdit: function (ev) {
      const element = ev.getData();
      element.load();
      const typeElement = element.getSchemaElement();
      const allowed = typeElement.getAllowedAttributes();
      const formData = {};
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
      });
      if (typeElement.isTextContentAllowed()) {
        const docs = typeElement.getDocumentation();
        formData['0000text'] = {
          type: "TextField",
          label: this.tr("Content"),
          placeholder: this.tr("not set"),
          help: docs.join("<br/>"),
          value: element.getText(),
          validation: {
            validator: function (value) {
              if (value instanceof qx.ui.form.ListItem) {
                value = value.getModel().getValue();
              }
              return typeElement.isValueValid(value);
            }
          }
        }
      }
      new cv.ui.manager.form.ElementForm({
        message: this.tr("Edit %1", element.getName()),
        formData: formData,
        allowCancel: true,
        callback: function (data) {
          if (data) {
            // save changes
            Object.keys(data).forEach(attrName => {
              if (attrName === '0000text') {
                element.setText(data[attrName]);
              } else {
                element.setAttribute(attrName, data[attrName]);
              }
            });
            element.updateModified();
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
          }
        },
        context: this,
        caption:  ""
      }).show();
    },

    _draw: function () {
      const tree = this.getChildControl('tree');
      const content = this.getChildControl('preview');
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
        const rootNode = new cv.ui.manager.model.XmlElement(document.documentElement, schemaElement);
        rootNode.setEditable(this.getFile().getWriteable());
        rootNode.load();
        tree.setModel(rootNode);

        if (this._workerWrapper) {
          this._workerWrapper.open(file, value);
        }
      }
    },

    _onContentChanged: function () {
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), this.getCurrentContent());
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
    this._disposeArray('__modifiedElements');
  }
});
