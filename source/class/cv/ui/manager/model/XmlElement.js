/**
 * Represents an Element in an XML document
 */
qx.Class.define('cv.ui.manager.model.XmlElement', {
  extend: qx.core.Object,
  include: [
    qx.data.marshal.MEventBubbling
  ],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (node, schemaElement) {
    this.base(arguments);
    this._node = node;
    const children = new qx.data.Array();
    if (node) {
      this.assert(node.nodeType === Node.ELEMENT_NODE);
      this.setSchemaElement(schemaElement);
      this.initName(node.nodeName);
      if (this.hasChildren()) {
        // we have t add a fake node to the children to show the tree that this node has children
        // it will be removed when the real children are loaded
        children.push(new cv.ui.manager.model.XmlElement());
      }

    } else {
      // this is a fake node needed for children simulation
      this.initName('#temp');
    }
    this.initChildren(children);
    this._initialAttributes = new Map();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    schemaElement: {
      check: 'cv.ui.manager.model.schema.Element',
      apply: '_applySchemaElement'
    },
    name: {
      check: 'String',
      deferredInit: true,
      event: 'changeName',
      apply: '_updateDisplayName'
    },
    displayName: {
      check: 'String',
      init: '',
      event: 'changeDisplayName'
    },
    open : {
      check : "Boolean",
      event : "changeOpen",
      init : false,
      apply : "_onOpen",
    },
    loaded : {
      check : "Boolean",
      event : "changeLoaded",
      init : false
    },
    children : {
      check : "qx.data.Array",
      event : "changeChildren",
      apply: "_applyEventPropagation",
      deferredInit : true
    },

    textContent: {
      check: 'String',
      nullable: true,
      event: 'changeTextContent'
    },
    /**
     * Temporary nodes are not save in the backend yet
     */
    temporary: {
      check: 'Boolean',
      init: false,
      event: 'changeTemporary'
    },

    /**
     * Validation result for this nodes content
     */
    valid: {
      check: 'Boolean',
      init: true,
      event: 'changeValid'
    },

    editable: {
      check: 'Boolean',
      init: true,
      event: 'changeEditable'
    },

    sortable: {
      check: 'Boolean',
      init: true,
      event: 'changeSortable'
    },

    modified: {
      check: 'Boolean',
      init: false,
      apply: '_updateDisplayName'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _node: null,
    _schema: null,
    _schemaElement: null,
    _initialAttributes: null,

    getNode: function () {
      return this._node;
    },

    getAttribute: function (name) {
      return this._node.getAttribute(name);
    },

    setAttribute: function (name, value) {
      const attribute = this.getSchemaElement().getAllowedAttributes()[name];
      if (attribute) {
        if (value === null || value === undefined) {
          value = '';
        } else {
          value = '' + value;
        }
        if (attribute.isValueValid(value)) {
          if (!value || value === attribute.getDefaultValue()) {
            this._node.removeAttribute(name);
          } else {
            this._node.setAttribute(name, value);
          }
          if (name === "name") {
            this._updateDisplayName();
          }
        } else {
          this.error("'" + value + "' is not allowed for attribute '" + name + "'");
        }
      } else {
        this.error("'"+ name+ "' is no allowed attribute for a '"+this.getName() + "' element");
      }
    },

    _applySchemaElement: function (schemaElement) {
      schemaElement.bind('sortable', this, 'sortable');
    },

    _onOpen: function (value) {
      if (value && !this.isLoaded()) {
        this.load();
      }
    },

    _updateDisplayName: function () {
      let displayName = this.getName();
      if (this._node && this._node.hasAttribute('name')) {
        const nameAttr = this._node.getAttribute('name');
        displayName += '\t"' + nameAttr + '"';
      }
      if (this.isModified()) {
        displayName += " *";
      }
      this.setDisplayName(displayName);
    },
    hasChildren: function() {
      if (this._node && this._node.hasChildNodes()) {
        for (let i = 0; i < this._node.childNodes.length; i++) {
          const childNode = this._node.childNodes.item(i);
          if (childNode.nodeType === Node.ELEMENT_NODE) {
            return true;
          }
        }
      }
      return false;
    },

    load: function () {
      if (!this.isLoaded()) {
        const children = this.getChildren();
        children.removeAll();
        if (this._node) {
          // read children
          const schemaElement = this.getSchemaElement();
          for (let i = 0; i < this._node.childNodes.length; i++) {
            const childNode = this._node.childNodes.item(i);
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              const childSchemaElement = schemaElement.getSchemaElementForElementName(childNode.nodeName);
              if (childSchemaElement) {
                const child = new cv.ui.manager.model.XmlElement(childNode, childSchemaElement);
                this.bind('editable', child, 'editable');
                children.push(child);
              } else {
                throw 'child element ' + childNode.nodeName + ' not allowed as child of ' + this.getname();
              }
            } else if (childNode.nodeType === Node.TEXT_NODE) {
              if (childNode.innerText) {
                this.setTextContent(childNode.innerText);
              }
            }
          }

          // read attributes
          this._initialAttributes.clear();
          for (let i = 0; i < this._node.attributes.length; i++) {
            const attr = this._node.attributes.item(i);
            this._initialAttributes.set(attr.name, attr.value);
          }
        }
        this.setLoaded(true);
      }
    },

    updateModified: function () {
      const initial = this._initialAttributes;
      if (this._node.attributes.length !== initial.size) {
        this.setModified(true);
      } else {
        for (const [key, value] of initial) {
          if (!this._node.hasAttribute(key) || this._node.getAttribute(key) !== value) {
            this.setModified(true);
            return
          }
        }
      }
      this.setModified(false);
    },

    onSaved: function () {
      // read attributes
      this._initialAttributes.clear();
      for (let i = 0; i < this._node.attributes.length; i++) {
        const attr = this._node.attributes.item(i);
        this._initialAttributes.set(attr.name, attr.value);
      }
      this.setModified(false);
    }
  },
  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._node = null;
    this._schema = null;
    this._initialAttributes = null;
    this._disposeObjects('_schemaElement');
  }
});
