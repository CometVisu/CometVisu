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
  construct: function (node, schemaElement, editor, parent) {
    this.base(arguments);
    this._node = node;
    const children = new qx.data.Array();
    if (node) {
      this.assert(node.nodeType === Node.ELEMENT_NODE);
      this.setSchemaElement(schemaElement);
      this.initName(node.nodeName);
      if (this.hasChildren()) {
        // we have to add a fake node to the children to show the tree that this node has children
        // it will be removed when the real children are loaded
        children.push(new cv.ui.manager.model.XmlElement());
      }
      if (editor) {
        this.setEditor(editor);
      }
      if (parent) {
        this.setParent(parent);
      }
    } else {
      // this is a fake node needed for children simulation
      this.initName('#temp');
    }
    this.initChildren(children);
    this._initialAttributes = new Map();
    this.bind('editor.file.writeable', this, 'editable');
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    // the current editor this element os shown in
    editor: {
      check: 'cv.ui.manager.editor.Tree',
      nullable: true,
      event: 'changeEditor'
    },
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
      event: 'changeEditable',
      apply: '_updateShowEditButton'
    },

    sortable: {
      check: 'Boolean',
      init: true,
      event: 'changeSortable'
    },

    modified: {
      check: 'Boolean',
      init: false,
      apply: '_applyModified'
    },

    showEditButton: {
      check: 'Boolean',
      init: true,
      event: 'changeShowEditButton'
    },
    parent: {
      check: 'cv.ui.manager.model.XmlElement',
      nullable: true
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
    _initialChildNames: null,

    _updateShowEditButton: function () {
      this.setShowEditButton(this.isEditable() && (this.getSchemaElement().isTextContentAllowed() || Object.keys(this.getSchemaElement().getAllowedAttributes()).length > 0));
    },

    getNode: function () {
      return this._node;
    },

    remove: function (skipUndo) {
      const parent = this.getParent();
      if (parent) {
        const changes = [{
          index: parent.getChildren().indexOf(this),
          parent: parent,
          child: this
        }];
        this._node.remove();
        parent.getChildren().remove(this);
        parent.updateModified();
        if (!skipUndo) {
          const editor = this.getEditor();
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Remove %1", this.getDisplayName()), this, changes, 'deleted');
            editor.addUndo(change);
          }
        }
      }
    },

    insertChild: function (xmlElement, index, skipUndo) {
      const children = this.getChildren();
      let success = false;
      if (index >= children.length) {
        // append
        this._node.appendChild(xmlElement.getNode());
        children.push(xmlElement);
        success = true;
      } else if (index === 0) {
        // add before first child
        this._node.insertBefore(xmlElement.getNode(), this._node.children.getItem(0));
        children.shift(xmlElement);
        success = true;
      } else {
        const previousChild = children.getItem(index);
        if (previousChild) {
          previousChild.getNode().before(xmlElement.getNode());
          children.insertBefore(previousChild, xmlElement);
          success = true;
        }
      }
      if (success) {
        xmlElement.setParent(this);
        this.updateModified();
      }
      if (!skipUndo) {
        const editor = this.getEditor();
        if (editor) {
          const changes = [{
            index: index,
            parent: this,
            child: xmlElement
          }];
          const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Add %1", this.getDisplayName()), this, changes, 'created');
          editor.addUndo(change);
        }
      }
    },

    getText: function () {
      if (this.getSchemaElement().isTextContentAllowed()) {
        return this._node.textContent;
      } else {
        return null;
      }
    },

    setText: function (text) {
      let changed = false;
      let newValue = text;
      let oldValue = '';
      if (this.getSchemaElement().isTextContentAllowed()) {
        oldValue = this._node.textContent;
        if (this.getSchemaElement().isValueValid(text)) {
          if (this._node.textContent !== text) {
            this._node.textContent = text;
            changed = true;
          }
        } else {
          this.error("'"+text+"' is no valid text content for a '"+this.getName() + "' element");
        }
      } else {
        this.error("text content is not allowed for a '"+this.getName() + "' element");
      }
      return {
        changed: changed,
        attribute: '#text',
        value: newValue,
        old: oldValue
      }
    },

    getAttribute: function (name) {
      return this._node.getAttribute(name);
    },

    setAttribute: function (name, value) {
      if (name === '#text') {
        return this.setText(value);
      }
      const attribute = this.getSchemaElement().getAllowedAttributes()[name];
      let changed = false;
      let newValue = value;
      let oldValue = this._node.hasAttribute(name) ? this._node.getAttribute(name) : '';
      if (attribute) {
        if (value === null || value === undefined) {
          value = '';
        } else {
          value = '' + value;
        }
        newValue = value;
        if (attribute.isValueValid(value)) {
          if (oldValue !== value) {
            if (!value || value === attribute.getDefaultValue()) {
              this._node.removeAttribute(name);
              newValue = '';
            } else {
              this._node.setAttribute(name, value);
            }
            if (name === "name") {
              this._updateDisplayName();
            }
            changed = true;
          }
        } else {
          this.error("'" + value + "' is not allowed for attribute '" + name + "'");
        }
      } else {
        this.error("'"+ name+ "' is no allowed attribute for a '"+this.getName() + "' element");
      }
      return {
        changed: changed,
        attribute: name,
        value: newValue,
        old: oldValue
      }
    },

    setAttributes: function (data) {
      const changes = [];
      let change;
      Object.keys(data).forEach(attrName => {
        change = this.setAttribute(attrName, data[attrName]);
        if (change.changed) {
          changes.push(change);
        }
      });
      const editor = this.getEditor();
      if (editor && changes.length > 0) {
        editor.addUndo(new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Change %1", this.getDisplayName()), this, changes));
      }
      this.updateModified();
    },

    _applySchemaElement: function (schemaElement) {
      schemaElement.bind('sortable', this, 'sortable');
      this._updateShowEditButton();
    },

    _onOpen: function (value) {
      if (value && !this.isLoaded()) {
        this.load();
      }
    },

    _applyModified: function () {
      this._updateDisplayName();
      const editor = this.getEditor();
      if (editor) {
        editor.updateModified(this);
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

    load: function (force) {
      if (!this.isLoaded() || force) {
        const children = this.getChildren();
        children.removeAll();
        if (this._node) {
          // read children
          const schemaElement = this.getSchemaElement();
          this._initialChildNames = [];
          for (let i = 0; i < this._node.childNodes.length; i++) {
            const childNode = this._node.childNodes.item(i);
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              const childSchemaElement = schemaElement.getSchemaElementForElementName(childNode.nodeName);
              if (childSchemaElement) {
                const child = new cv.ui.manager.model.XmlElement(childNode, childSchemaElement, this.getEditor(), this);
                children.push(child);
                this._initialChildNames.push(childNode.nodeName);
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
          if (schemaElement.isTextContentAllowed()) {
            this._initialAttributes.set('#text', this._node.textContent);
          }
        }
        this.setLoaded(true);
      }
    },

    updateModified: function () {
      const initial = this._initialAttributes;
      const hasText = initial.has('#text');
      const currentChildNames = this._currentChildNames();
      if (this._node.attributes.length !== (hasText ? initial.size - 1 : initial.size)) {
        this.setModified(true);
      } else if (currentChildNames.length !== this._initialChildNames.length || currentChildNames.join("") !== this._initialChildNames.join("")) {
        this.setModified(true);
      } else {
        for (const [key, value] of initial) {
          if (key === '#text') {
            if (this._node.textContent !== value) {
              this.setModified(true);
              return
            }
          } else if (!this._node.hasAttribute(key) || this._node.getAttribute(key) !== value) {
            this.setModified(true);
            return
          }
        }
        this.setModified(false);
      }
    },

    onSaved: function () {
      // read attributes
      this._initialAttributes.clear();
      for (let i = 0; i < this._node.attributes.length; i++) {
        const attr = this._node.attributes.item(i);
        this._initialAttributes.set(attr.name, attr.value);
      }
      if (this.getSchemaElement().isTextContentAllowed()) {
        this._initialAttributes.set('#text', this._node.textContent);
      }
      this._initialChildNames = this._currentChildNames();
      this.setModified(false);
    },

    _currentChildNames: function () {
      const names = [];
      for (let i = 0; i < this._node.childNodes.length; i++) {
        const childNode = this._node.childNodes.item(i);
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          names.push(childNode.nodeName);
        }
      }
      return names;
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
