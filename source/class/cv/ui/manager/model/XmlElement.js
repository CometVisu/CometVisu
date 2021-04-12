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
      this._node.$$widget = this;
      this.initName(node.nodeName);
      this.setSchemaElement(schemaElement);
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
      this._maintainStatus();
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
      event: 'changeValid',
      apply: '_maintainStatus'
    },

    status: {
      check: ['error', 'valid', 'comment'],
      init: 'valid',
      event: 'changeStatus'
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
    __addableChildren: null,

    clone: function () {
      return new cv.ui.manager.model.XmlElement(this.getNode(), this.getSchemaElement(), this.getEditor(), this.getParent());
    },

    _maintainStatus: function () {
      if (this._node.nodeType === Node.COMMENT_NODE) {
        this.setStatus('comment');
      } else if (!this.isValid()) {
        this.setStatus('error');
      } else {
        this.setStatus('valid');
      }
    },

    _maintainIcon: function () {
      if (this._node) {
        if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
          this.setIcon(cv.theme.dark.Images.getIcon('text-fields', 18));
          return;
        } else if (this._node.nodeType === Node.COMMENT_NODE) {
          this.setIcon(cv.theme.dark.Images.getIcon('comment-fields', 18));
          return;
        } else if (this.getName() === "icon" && this.getAttribute("name")) {
          const source = cv.IconHandler.getInstance().getIconSource(this.getAttribute("name"), 'tree-icon');
          this.setIcon(source);
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
      this.setShowEditButton(this.getSchemaElement().isTextContentAllowed() && this.getName().startsWith('#') || Object.keys(this.getSchemaElement().getAllowedAttributes()).length > 0);
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
        const editor = this.getEditor();
        this.$$removed = true;
        if (editor) {
          // editor should not consider the modifiecation state of removed elements
          editor.updateModified(this);
        }
        parent.updateModified();
        if (!skipUndo) {
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Remove %1", this.getDisplayName()), this, changes, 'deleted');
            editor.addUndo(change);
          }
        }
      }
    },

    /**
     * Move this node to a new position in relation to the target
     * @param target {cv.ui.manager.model.XmlElement} new direct sibling
     * @param before {Boolean} move before target if true, otherwise after target
     * @param skipUndo {Boolean} no not add an undo operation for this
     * @private
     */
    _move: function (target, before, skipUndo) {
      const parent = this.getParent();
      const children = parent.getChildren();
      const targetParent = target.getParent();
      const targetChildren = targetParent.getChildren();
      const changes = [{
        oldIndex: children.indexOf(this),
        oldParent: parent,
        parent: targetParent,
        child: this,
        index: targetChildren.indexOf(target) + (before ? 0 : 1)
      }];
      if (targetParent.isChildAllowedAtPosition(this, changes[0].index)) {
        children.remove(this);
        this.getNode().remove();

        targetParent.insertChild(this, changes[0].index, true);
        if (!skipUndo) {
          const editor = this.getEditor();
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Move %1", this.getDisplayName()), this, changes, 'moved');
            editor.addUndo(change);
          }
        }
        return true;
      }
      return false;
    },

    moveTo: function (newParent, index, skipUndo) {
      const parent = this.getParent();
      const children = parent.getChildren();
      const changes = [{
        oldIndex: children.indexOf(this),
        oldParent: parent,
        parent: newParent,
        child: this,
        index: index
      }];
      if (newParent.isChildAllowedAtPosition(this, index)) {
        children.remove(this);
        this.getNode().remove();

        newParent.insertChild(this, index, true);
        if (!skipUndo) {
          const editor = this.getEditor();
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Move %1", this.getDisplayName()), this, changes, 'moved');
            editor.addUndo(change);
          }
        }
        return true;
      }
      return false;
    },

    moveAfter: function (target, skipUndo) {
      return this._move(target, false, skipUndo);
    },

    moveBefore: function (target, skipUndo) {
      return this._move(target, true, skipUndo);
    },

    insertAfter: function (target, skipUndo) {
      const targetParent = target.getParent();
      const newIndex = targetParent.getChildren().indexOf(target) + 1;
      return targetParent.insertChild(this, newIndex, skipUndo);
    },

    insertBefore: function (target, skipUndo) {
      const targetParent = target.getParent();
      const newIndex = targetParent.getChildren().indexOf(target);
      return targetParent.insertChild(this, newIndex, skipUndo);
    },

    /**
     * Returns a list of element names that can be added to this element.
     * Checks the allowed elements and their bounds and the existing children
     * to find out if we can add more of them.
     * @param excludeComment {Boolean} exclude #comment child when set to true
     */
    getAddableChildren: function(excludeComment) {
      if (!this.__addableChildren) {
        if (this.getName().startsWith('#')) {
          this.__addableChildren = [];
        } else {
          const schemaElement = this.getSchemaElement();
          const allowed = schemaElement.getAllowedElements();
          const stillAllowed = [];
          const countExisting = {};
          if (!this.isLoaded()) {
            this.load();
          }
          this.getChildren().forEach(child => {
            if (!countExisting.hasOwnProperty(child.getName())) {
              countExisting[child.getName()] = 0;
            }
            countExisting[child.getName()]++;
          })

          Object.keys(allowed).forEach(elementName => {
            if (excludeComment === true && elementName === "#comment") {
              return;
            }
            if ((elementName === "#text" || elementName === "#cdata-section")) {
              if (schemaElement.isTextContentAllowed()) {
                if (schemaElement.isMixed()) {
                  // is a mixed content has only one text child and no other childs, we do not allow another text child -> avoid direct text siblings
                  let textNodes = 0;
                  let otherNodes = 0;
                  Object.keys(countExisting).forEach(key => {
                    if (key === '#text' || key === '#cdata-section') {
                      textNodes+=countExisting[key];
                    } else {
                      otherNodes+=countExisting[key];
                    }
                  });
                  if (textNodes<=otherNodes) {
                    // we do not allow more text nodes than other nodes (e.g. a sequence of #text, elem would allow another #text node after elem)
                    stillAllowed.push(elementName);
                  }
                } else if (!countExisting.hasOwnProperty('#text') && !countExisting.hasOwnProperty('#cdata-section')) {
                  stillAllowed.push(elementName);
                }
              }
              return;
            }
            const childBounds = schemaElement.getBoundsForElementName(elementName);
            const existing = countExisting.hasOwnProperty(elementName) ? countExisting[elementName] : 0;
            if (childBounds && childBounds.max > existing) {
              stillAllowed.push(elementName);
            }
          });
          this.__addableChildren = stillAllowed;
        }
      }
      return this.__addableChildren;
    },

    /**
     * Checks if a new child is allowed at the given position
     * @param xmlElement {cv.ui.manager.model.XmlElement|String} the element or an element name as string
     * @param index {Number} position to check, use Number.POSITIVE_INFINITY to check if the child is allowed to be appended
     * @returns {boolean}
     */
    isChildAllowedAtPosition: function (xmlElement, index) {
      const schemaElement = this.getSchemaElement();
      const nodeName = xmlElement instanceof cv.ui.manager.model.XmlElement ? xmlElement.getName() : xmlElement;
      if (!schemaElement.isChildElementAllowed(nodeName)) {
        this.debug(nodeName, "is not allowed as child of", this.getName());
        return false;
      }
      if (schemaElement.areChildrenSortable()) {
        // allowed at any position
        return true;
      }
      // check position
      const allowedSorting = schemaElement.getAllowedElementsSorting();
      if (!this.isLoaded()) {
        this.load();
      }
      const children = this.getChildren();
      let currentPosition = index;
      if (children.length > index) {
        currentPosition = allowedSorting[children.getItem(index).getName()];
      } else {
        currentPosition = children.length;
      }
      if (typeof currentPosition === "string") {
        currentPosition = currentPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
      } else {
        currentPosition = [currentPosition];
      }
      let targetPosition = allowedSorting[nodeName];
      if (typeof targetPosition === "string") {
        if (targetPosition === 'x') {
          // allowed anywhere
          return true;
        }
        targetPosition = targetPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
      } else {
        targetPosition = [targetPosition];
      }
      for (let i = 0; i < Math.min(currentPosition.length, targetPosition.length); i++) {
        if (currentPosition[i] === targetPosition[i]) {
          // no special position
          return true
        } else {
          // only allow if it can be inserted before
          const allowed = currentPosition[i] + 1 >= targetPosition[i];
          if (!allowed) {
            this.debug(nodeName, "is not allowed as child of", this.getName());
            return false;
          }
        }
      }
      return true;
    },

    findPositionForChild: function(newChild) {
      const schemaElement = this.getSchemaElement();
      if (schemaElement.isChildElementAllowed(newChild.getName())) {
        if (!this.isLoaded()) {
          this.load();
        }
        if (schemaElement.areChildrenSortable()) {
          // any position is fine, just append it to the end
          return this.getChildren().length;
        } else {
          const allowedSorting = schemaElement.getAllowedElementsSorting();
          const sorting = allowedSorting[newChild.getName()];
          if (typeof sorting === "string") {
            const start = sorting.split(".").shift();
            if (start === "x") {
              // any position is fine, just append it to the end
              return this.getChildren().length;
            } else {
              return parseInt(start);
            }
          } else if (typeof sorting === "number") {
            return sorting;
          }
        }
      }
      return -1;
    },

    /**
     * insert child at given index
     * @param xmlElement {cv.ui.manager.model.XmlElement} new child
     * @param index {Number} index to insert the child, if set to -1 insert it at any allowed position
     * @param skipUndo {Boolean} do not add an undo operation for this change
     * @return {Boolean} true if the child has been added
     */
    insertChild: function (xmlElement, index, skipUndo) {
      if (!this.isLoaded()) {
        this.load();
      }
      const children = this.getChildren();
      let success = false;
      if (index === -1) {
        index = this.findPositionForChild(xmlElement);
        if (index === -1) {
          // no valid position found
          return false
        }
      }
      if (this.isChildAllowedAtPosition(xmlElement, index)) {
        if (index >= children.length) {
          // append
          this._node.appendChild(xmlElement.getNode());
          children.push(xmlElement);
          success = true;
        } else if (index === 0) {
          // add before first child
          this._node.insertBefore(xmlElement.getNode(), this._node.children[0]);
          children.unshift(xmlElement);
          success = true;
        } else {
          const previousChild = children.getItem(index);
          if (previousChild) {
            previousChild.getNode().before(xmlElement.getNode());
            children.insertBefore(previousChild, xmlElement);
            success = true;
          }
        }
      }
      if (success) {
        const editor = this.getEditor();
        xmlElement.setParent(this);
        if (xmlElement.$$removed) {
          delete xmlElement.$$removed;
          if (editor) {
            editor.updateModified(xmlElement);
          }
        }
        this.updateModified();
        if (children.length === 1) {
          // first child added -> open it
          this.setOpen(true);
        }
        if (!skipUndo) {

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
      }
      return success;
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
          if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
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

    setText: function (text, nodeName) {
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
        attribute: nodeName || '#text',
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
                if (this.getName() === "icon") {
                  this._maintainIcon();
                }
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
      } else if (this._node.nodeType === Node.TEXT_NODE && name === '#text' || (this._node.nodeType === Node.CDATA_SECTION_NODE && name === '#cdata-section')) {
        return this.setText(value, name);
      } else if ((this._node.nodeType === Node.COMMENT_NODE && name === '#comment')) {
        const oldValue = this.getTextContent();
        const changed = value !== oldValue;
        this.setTextContent(value);
        return {
          changed: changed,
          attribute: name,
          value: value,
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
      const parentChanges = [];
      const isTextNode = (this.getName() === '#text' || this.getName() === '#cdata-section');
      const parent = this.getParent();
      Object.keys(data).forEach(attrName => {
        if (isTextNode && !attrName.startsWith('#')) {
          // special mode for editing text content from a data provider with hints, those hints must be applied to the parent
          change = parent.setAttribute(attrName, data[attrName])
          if (change.changed) {
            parentChanges.push(change);
          }
        } else {
          change = this.setAttribute(attrName, data[attrName]);
          if (change.changed) {
            changes.push(change);
          }
        }
      });
      const editor = this.getEditor();
      if (editor && changes.length > 0) {
        if (parentChanges.length > 0) {
          const parentChange = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Change %1", parent.getDisplayName()), parent, parentChanges);
          changes.push(parentChange);
          parent.updateModified();
        }
        editor.addUndo(new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr("Change %1", this.getDisplayName()), this, changes));
      }
      this.updateModified();
    },

    _applySchemaElement: function (schemaElement) {
      schemaElement.bind('sortable', this, 'sortable', {
        converter: function (value) {
          return this.isEditable() && value;
        }.bind(this)
      });
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
    },

    _updateDisplayName: function () {
      let displayName = this.getName();
      if (this._node) {
        if (this._node.nodeType === Node.ELEMENT_NODE) {
          if (this._node.hasAttribute('name')) {
            const nameAttr = this._node.getAttribute('name');
            displayName += ' "' + nameAttr + '"';
          } else if (this.getName() === "pages" && this._node.hasAttribute('design')) {
            const designAttr = this._node.getAttribute('design');
            displayName += ' "' + designAttr + '"';
          }
        } else if ((this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE || this._node.nodeType === Node.COMMENT_NODE) && this._node.nodeValue.trim()) {
          let textContent = this._node.nodeValue.trim();
          if (textContent.length > 26) {
            textContent = textContent.substring(0, 26) + "...";
          }
          displayName = textContent;
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
            if (childNode.nodeType === Node.ELEMENT_NODE
              || ((childNode.nodeType === Node.TEXT_NODE || childNode.nodeType === Node.CDATA_SECTION_NODE) && childNode.nodeValue.trim() !== "")) {
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
        children.removeListener('change', this._syncChildNodes, this);
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
                  this._initialChildNames.push(childNode.nodeName);
                } else if (childNode.nodeType === Node.TEXT_NODE || childNode.nodeType === Node.CDATA_SECTION_NODE) {
                  if (childNode.nodeValue.trim()) {
                    // do not use childSchemaElement here, because our schemeElement already knows how to validate text
                    const child = new cv.ui.manager.model.XmlElement(childNode, schemaElement, this.getEditor(), this);
                    if (schemaElement.isMixed()) {
                      // text nodes can be re-ordered in mixed content
                      child.setSortable(true);
                    }
                    children.push(child);
                    if (childNode.nodeValue.trim()) {
                      this._initialChildNames.push(childNode.nodeName);
                    }
                  }
                } else if (childNode.nodeType === Node.COMMENT_NODE) {
                  if (childNode.nodeValue) {
                    const child = new cv.ui.manager.model.XmlElement(childNode, childSchemaElement, this.getEditor(), this);
                    // comment nodes are allowed everywhere. but we do not allow them to be moved via drag&drop now
                    // because comments might contains template conditions, which will get invalid when moved and we cannot validate that
                    child.setSortable(false);
                    children.push(child);
                    if (childNode.nodeValue.trim()) {
                      this._initialChildNames.push(childNode.nodeName);
                    }
                  }
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
          } else if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
            this._initialTextContent = this._node.nodeValue;
            this.setTextContent(this._node.nodeValue);
          }
        }
        this.setLoaded(true);
        children.addListener('change', this._syncChildNodes, this);
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
      } else if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
        this.setModified(this._initialTextContent !== this.getTextContent());
      }
      const editor = this.getEditor();
      if (editor) {
        editor.updateModified(this);
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
      } else if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
        this._initialTextContent = this._node.nodeValue;
      }
      this.setModified(false);
    },

    _currentChildNames: function () {
      const names = [];
      for (let i = 0; i < this._node.childNodes.length; i++) {
        const childNode = this._node.childNodes.item(i);
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          names.push(childNode.nodeName);
        } else if ((childNode.nodeType === Node.TEXT_NODE || childNode.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) && childNode.nodeValue.trim()) {
          names.push(childNode.nodeName);
        }
      }
      return names;
    },

    _syncChildNodes: function (ev) {
      // children have changed clear cache
      this.__addableChildren = null;
    },

    getWidgetPath: function () {
      if (this.getName() === '#comment') {
        return '';
      }
      const widgets = this.getSchemaElement().getSchema().getWidgetNames();
      let current = this;
      while (current && !widgets.includes(current.getName())) {
        current = current.getParent();
      }
      if (!current) {
        return '';
      }
      if (current.getName() === 'navbar') {
        return 'navbar' + qx.lang.String.firstUp(current.getAttribute('position'));
      }

      const ids = [];
      let c = current;
      while (c) {
        const parent = c.getParent();
        if (parent.getName() === "pages") {
          ids.unshift('id');
          break;
        }
        let id = parent.getChildren().filter(child => child.getNode().nodeType === Node.ELEMENT_NODE && child.getName() !== 'layout').indexOf(c);
        ids.unshift(id);
        c = parent;
      }
      if (current.getName() === "page") {
        // make sure that the join ends with '_'
        ids.push('');
      }
      return ids.join('_');
    },

    // overridden
    clone: function() {
      return new cv.ui.manager.model.XmlElement(this._node.cloneNode(true), this.getSchemaElement(), this.getEditor());
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
    this.__addableChildren = null;
    this._disposeObjects('_schemaElement');
  }
});
