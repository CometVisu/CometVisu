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
    _currentContent: null,
    _schema: null,

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
               controller.bindProperty("editable", "editable", null, item, index);
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
        placeholder: this.tr("not set"),
        help: docs.join("<br/>"),
        value: element.getAttribute(attribute.getName()) || attribute.getDefaultValue(),
        validation: {
          required: !attribute.isOptional(),
          validator: function (value) {
            if (value instanceof qx.ui.form.ListItem) {
              value = value.getModel().getValue();
            }
            if (value === undefined || value === "") {
              return true
            }
            return attribute.isValueValid('' + value);
          }
        }
      }
      switch (attribute.getTypeString()) {
        case 'boolean':
          def.type = "CheckBox";
          def.value = def.value === 'true';
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
              def.options.unshift({label: this.tr("- not set -"), value: ""});
            }
          }
          break;
      }

      return def;
    },

    _onEdit: function (ev) {
      const element = ev.getData();
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
        if (/^[a-zA-Z]+$/.test(name)) {
          formData[name] = this.__getAttributeFormDefinition(element, attribute);
        }
      });
      new cv.ui.manager.form.ElementForm({
        message: this.tr("Edit %1", element.getName()),
        formData: formData,
        allowCancel: true,
        callback: function (data) {
          console.log(data);
        },
        context: this,
        caption:  ""
      }).show();
    },

    _draw: function () {
      const tree = this.getChildControl('tree');
      const content = this.getChildControl('preview');
    },

    save: function (filename, callback) {
      if (filename) {

      }
    },

    _applyContent: function(value) {
      if (value) {
        const tree = this.getChildControl('tree');
        const document = qx.xml.Document.fromString(value);
        const schemaElement = this._schema.getElementNode(document.documentElement.nodeName);
        const rootNode = new cv.ui.manager.model.XmlElement(document.documentElement, schemaElement);
        rootNode.setEditable(this.getFile().getWriteable());
        rootNode.load();
        tree.setModel(rootNode);
      }
    },

    getCurrentContent: function () {
      return this._currentContent;
    },

    _onContentChanged: function () {
      this.getFile().setModified(true);
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
  }
});
