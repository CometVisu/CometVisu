/**
 * Represents an Element or TextNode in an XML document
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
      this._maintainIcon();
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
      apply: '_applyTextContent',
      event: 'changeTextContent',
      validate: '_validateTextContent'
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
    },

    // icon to show in the tree
    icon: {
      check: 'String',
      nullable: true,
      event: 'changeIcon'
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
    _initialTextContent: null,
    __initializing: false,

    _maintainIcon: function () {
      if (this._node) {
        if (this._node.nodeType === Node.TEXT_NODE) {
          this.setIcon(cv.theme.dark.Images.getIcon('text-fields', 18));
          return;
        }
      }
      if (this.isOpen()) {
        this.setIcon(cv.theme.dark.Images.getIcon('folder-open', 18));
      } else {
        this.setIcon(cv.theme.dark.Images.getIcon('folder', 18));
      }
    },

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

    _validateTextContent: function (value) {
      if (this._node) {
        if (!this.getSchemaElement().isValueValid(value)) {
          throw new qx.core.ValidationError(this.tr("Invalid text content: %1", value));
        }
      } else {
        throw new qx.core.ValidationError(this.tr("Text content not allowed here"));
      }
    },

    _applyTextContent: function (value) {
      if (!this.__initializing) {
        if (this._node) {
          if (this._node.nodeType === Node.TEXT_NODE) {
            this._node.nodeValue = value;
            this._updateDisplayName();
          } else if (this._node.nodeType === Node.ELEMENT_NODE) {
            this._node.textContent = value;
          }
        }
      }
    },

    getText: function () {
      return this.getTextContent();
    },

    setText: function (text) {
      let changed = false;
      let newValue = text;
      let oldValue = '';
      if (this.getSchemaElement().isTextContentAllowed()) {
        oldValue = this.getTextContent();
        if (this.getSchemaElement().isValueValid(text)) {
          if (oldValue !== text) {
            this.setTextContent(text);
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
      if (this._node.nodeType === Node.ELEMENT_NODE) {
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
          this.error("'" + name + "' is no allowed attribute for a '" + this.getName() + "' element");
        }
        return {
          changed: changed,
          attribute: name,
          value: newValue,
          old: oldValue
        }
      }
    },

    /**
     * @return {Boolean} true if this element is a required child from its parent
     */
    isRequired: function () {
      const parent = this.getParent();
      if (parent) {
        const requiredFromParent = parent.getSchemaElement().getRequiredElements();
        return requiredFromParent.includes(this.getName());
      }
      // only root element has nor parent, and a root element is always required
      return true;
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
      this._maintainIcon();
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
      if (this._node) {
        if (this._node.nodeType === Node.ELEMENT_NODE && this._node.hasAttribute('name')) {
          const nameAttr = this._node.getAttribute('name');
          displayName += ' "' + nameAttr + '"';
        } else if (this._node.nodeType === Node.TEXT_NODE && this._node.nodeValue.trim()) {
          let textContent = this._node.nodeValue.trim();
          if (textContent.length > 20) {
            textContent = textContent.substring(0, 20) + "...";
          }
          displayName += ' "' + textContent + '"';
        }
      }
      if (this.isModified()) {
        displayName += " *";
      }
      this.setDisplayName(displayName);
    },
    hasChildren: function() {
      if (this._node.nodeType === Node.ELEMENT_NODE) {
        if (this._node && this._node.hasChildNodes()) {
          for (let i = 0; i < this._node.childNodes.length; i++) {
            const childNode = this._node.childNodes.item(i);
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              return true;
            }
          }
        }
      }
      return false;
    },

    load: function (force) {
      if (!this.isLoaded() || force) {
        this.__initializing = true;
        const children = this.getChildren();
        children.removeAll();
        if (this._node) {
          if (this._node.nodeType === Node.ELEMENT_NODE) {
            // read children
            const schemaElement = this.getSchemaElement();
            this._initialChildNames = [];
            for (let i = 0; i < this._node.childNodes.length; i++) {
              const childNode = this._node.childNodes.item(i);
              const childSchemaElement = schemaElement.getSchemaElementForElementName(childNode.nodeName);
              if (childSchemaElement) {
                if (childNode.nodeType === Node.ELEMENT_NODE) {
                  const child = new cv.ui.manager.model.XmlElement(childNode, childSchemaElement, this.getEditor(), this);
                  children.push(child);
                } else if (childNode.nodeType === Node.TEXT_NODE) {
                  if (childNode.nodeValue) {
                    const child = new cv.ui.manager.model.XmlElement(childNode, childSchemaElement, this.getEditor(), this);
                    if (schemaElement.isMixed()) {
                      // text nodes can be re-ordered in mixed content
                      child.setSortable(true);
                    }
                    children.push(child);
                  }
                  this._initialChildNames.push(childNode.nodeName);
                }
              } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                // only complain for real childs (no comments, textNodes)
                throw 'child element ' + childNode.nodeName + ' not allowed as child of ' + this.getName();
              }
            }

            // read attributes
            this._initialAttributes.clear();
            for (let i = 0; i < this._node.attributes.length; i++) {
              const attr = this._node.attributes.item(i);
              this._initialAttributes.set(attr.name, attr.value);
            }
          } else if (this._node.nodeType === Node.TEXT_NODE) {
            this._initialTextContent = this._node.nodeValue;
            this.setTextContent(this._node.nodeValue);
          }
        }
        this.setLoaded(true);
        this.__initializing = false;
      }
    },

    updateModified: function () {
      if (this._node.nodeType === Node.ELEMENT_NODE) {
        const initial = this._initialAttributes;
        const currentChildNames = this._currentChildNames();
        if (this._node.attributes.length !== initial.size) {
          this.setModified(true);
        } else if (currentChildNames.length !== this._initialChildNames.length || currentChildNames.join("") !== this._initialChildNames.join("")) {
          this.setModified(true);
        } else {
          for (const [key, value] of initial) {
            if (!this._node.hasAttribute(key) || this._node.getAttribute(key) !== value) {
              this.setModified(true);
              return
            }
          }
          this.setModified(false);
        }
      } else if (this._node.nodeType === Node.TEXT_NODE) {
        this.setModified(this._initialTextContent !== this.getTextContent());
      }
    },

    onSaved: function () {
      if (this._node.nodeType === Node.ELEMENT_NODE) {
        // read attributes
        this._initialAttributes.clear();
        for (let i = 0; i < this._node.attributes.length; i++) {
          const attr = this._node.attributes.item(i);
          this._initialAttributes.set(attr.name, attr.value);
        }
        this._initialChildNames = this._currentChildNames();
      } else if (this._node.nodeType === Node.TEXT_NODE) {
        this._initialTextContent = this._node.nodeValue;
      }
      this.setModified(false);
    },

    _currentChildNames: function () {
      const names = [];
      for (let i = 0; i < this._node.childNodes.length; i++) {
        const childNode = this._node.childNodes.item(i);
        names.push(childNode.nodeName);
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
