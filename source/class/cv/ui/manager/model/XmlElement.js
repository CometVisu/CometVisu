/* XmlElement.js 
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
      this.setSchemaElement(schemaElement);
      this.initName(node.nodeName);
      this._updateShowEditButton();
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
    STATICS
  ***********************************************
  */
  statics: {
    entityMap: {
      '&': '&amp;',
      '"': '&quot;',
      '\'': '&#39;',
      '`': '&#x60;'
    }
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
      apply: 'updateDisplayName'
    },
    displayName: {
      check: 'String',
      init: '',
      event: 'changeDisplayName'
    },
    open : {
      check : 'Boolean',
      event : 'changeOpen',
      init : false,
      apply : '_onOpen'
    },
    loaded : {
      check : 'Boolean',
      event : 'changeLoaded',
      init : false
    },
    children : {
      check : 'qx.data.Array',
      event : 'changeChildren',
      apply: '_applyEventPropagation',
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
      apply: '_applyValid'
    },

    invalidMessage: {
      check: 'String',
      init: '',
      event: 'changeInvalidMessage'
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
      apply: '_applyEditable'
    },

    sortable: {
      check: 'Boolean',
      init: true,
      event: 'changeSortable'
    },

    /**
     * true if this element can be deleted (either no bounds.min or more existing elements)
     */
    deletable: {
      check: 'Boolean',
      init: true,
      event: 'changeDeletable'
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
    },

    dragging: {
      check: 'Boolean',
      init: false,
      event: 'changeDragging'
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
    _structure: null,

    _maintainStatus: function () {
      if (this._node.nodeType === Node.COMMENT_NODE) {
        this.setStatus('comment');
      } else if (!this.isValid()) {
        this.setStatus('error');
      } else {
        this.setStatus('valid');
      }
    },

    _applyValid: function (value) {
      this._maintainStatus();
      if (value) {
        this.resetInvalidMessage();
      }
    },

    convertTextNodeType: function (newType) {
      if (this.isTextNode() && this._node.nodeType !== newType && (newType === Node.TEXT_NODE || newType === Node.CDATA_SECTION_NODE)) {
        const content = this.getText();
        const oldNode = this._node;
        const newTextNode = newType === Node.CDATA_SECTION_NODE ? this._node.ownerDocument.createCDATASection(content) : this._node.ownerDocument.createTextNode(content);
        if (oldNode.parentNode) {
          oldNode.parentNode.replaceChild(newTextNode, oldNode);
        }
        this._node = newTextNode;
        this.setName(this._node.nodeName);
        this.load(true);
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
        } else if (this.getName() === 'icon' && this.getAttribute('name') && this.getAttribute('name').indexOf('{{') === -1) {
          // try to use the configured icon (if its not set by a template variable)
          const source = cv.IconHandler.getInstance().getIconSource(this.getAttribute('name'), 'tree-icon');
          if (source) {
            this.setIcon(source);
          } else {
            this.setIcon(cv.theme.dark.Images.getIcon('image', 18));
          }
          return;
        }
      }
      if (this.isOpen()) {
        this.setIcon(cv.theme.dark.Images.getIcon('folder-open', 18));
      } else {
        this.setIcon(cv.theme.dark.Images.getIcon('folder', 18));
      }
    },

    _applyEditable: function () {
      this._updateShowEditButton();
      this.updateDeletable();
    },

    _updateShowEditButton: function () {
      const schemaElement = this.getSchemaElement();
      this.setShowEditButton(
        schemaElement.isTextContentAllowed() && this.getName().startsWith('#') ||
        Object.keys(schemaElement.getAllowedAttributes()).length > 0 ||
        schemaElement.isChildElementAllowed('*') // any element allowed, this is edited as text (outerHTML)
      );
    },

    updateDeletable: function () {
      if (!this.isEditable()) {
        this.setDeletable(false);
      } else {
        const parent = this.getParent();
        if (this.isTextNode()) {
          if (this.getSchemaElement().isTextContentRequired()) {
            const existing = parent.getChildren().filter(child => child.isTextNode()).length;
            this.setDeletable(existing > 1);
          } else {
            this.setDeletable(true);
          }
        } else {
          let deletable = false;
          if (parent) {
            const schemaElement = parent.getSchemaElement();
            const requiredFromParent = schemaElement.getRequiredElements();
            if (requiredFromParent.includes(this.getName())) {
              const bounds = schemaElement.getBoundsForElementName(this.getName());
              if (bounds) {
                const existing = parent.getChildren().filter(child => child.getName() === this.getName()).length;
                // check if we can afford to delete one
                deletable = (bounds.min <= existing - 1);
              } else {
                deletable = true;
              }
            } else {
              deletable = true;
            }
          } else {
            deletable = true;
          }
          this.setDeletable(deletable);
        }
      }
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
          // editor should not consider the modification state of removed elements
          editor.updateModified(this);
        }
        parent.updateModified();
        if (!skipUndo) {
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Remove %1', this.getDisplayName()), this, changes, 'deleted');
            editor.addUndo(change);
          }
        }
      }
    },

    /**
     * Check is this element is an ancestor of the given element
     * @param element {cv.ui.manager.model.XmlElement} element to check
     * @returns {boolean}
     */
    isAncestor: function (element) {
      let parent = element.getParent();
      while (parent) {
        if (parent === this) {
          return true;
        }
        parent = parent.getParent();
      }
      return false;
    },

    /**
     * Move this node to a new position in relation to the target
     * @param target {cv.ui.manager.model.XmlElement} new direct sibling
     * @param position {String} more 'before', 'after' or 'inside' target
     * @param skipUndo {Boolean} no not add an undo operation for this
     * @private
     */
    _move: function (target, position, skipUndo) {
      if (this.isAncestor(target)) {
        // we cannot move into ourselves descendants
        return false;
      }
      if (target === this) {
        // do not move ourselves before, after or inside ourselves
        return false;
      }
      const parent = this.getParent();
      const children = parent.getChildren();
      const targetParent = position === 'inside' ? target : target.getParent();
      const targetChildren = targetParent.getChildren();
      const changes = [{
        oldIndex: children.indexOf(this),
        oldParent: parent,
        parent: targetParent,
        child: this,
        index: targetChildren.indexOf(target) + (position === 'after' ? 1 : 0)
      }];
      if ((position === 'inside' && targetParent.getSchemaElement().isChildElementAllowed(this.getName())) || targetParent.isChildAllowedAtPosition(this, changes[0].index)) {
        children.remove(this);
        this.getNode().remove();
        if (targetParent === parent) {
          // target index might have changed by removing
          changes[0].index = targetChildren.indexOf(target) + (position === 'after' ? 1 : 0);
        }
        targetParent.insertChild(this, changes[0].index, true, 'moved');
        if (!skipUndo) {
          const editor = this.getEditor();
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Move %1', this.getDisplayName()), this, changes, 'moved');
            editor.addUndo(change);
          }
        }
        return true;
      }
      return false;
    },

    moveTo: function (newParent, index, skipUndo) {
      if (this.isAncestor(newParent)) {
        // we cannot move into ourselves descendants
        return false;
      }
      const parent = this.getParent();
      const children = parent.getChildren();
      const changes = [{
        oldIndex: children.indexOf(this),
        oldParent: parent,
        parent: newParent,
        child: this,
        index: index
      }];
      // save old target index because we are moving inside the same parent, and the target index might change after removing
      const target = newParent === parent && index < children.length ? children.getItem(index) : null;
      if (newParent.isChildAllowedAtPosition(this, index)) {
        children.remove(this);
        this.getNode().remove();

        if (target) {
          index = children.indexOf(target);
          changes[0].index = index;
        }
        newParent.insertChild(this, index, true, 'moved');
        if (!skipUndo) {
          const editor = this.getEditor();
          if (editor) {
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Move %1', this.getDisplayName()), this, changes, 'moved');
            editor.addUndo(change);
          }
        }
        return true;
      }
      return false;
    },

    moveAfter: function (target, skipUndo) {
      return this._move(target, 'after', skipUndo);
    },

    moveBefore: function (target, skipUndo) {
      return this._move(target, 'before', skipUndo);
    },

    moveInside: function (target, skipUndo) {
      return this._move(target, 'inside', skipUndo);
    },

    insertAfter: function (target, skipUndo) {
      const targetParent = target.getParent();
      const newIndex = targetParent.getChildren().indexOf(target) + 1;
      return targetParent.insertChild(this, newIndex, skipUndo, 'added');
    },

    insertBefore: function (target, skipUndo) {
      const targetParent = target.getParent();
      const newIndex = targetParent.getChildren().indexOf(target);
      return targetParent.insertChild(this, newIndex, skipUndo, 'added');
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
            if (!Object.prototype.hasOwnProperty.call(countExisting, child.getName())) {
              countExisting[child.getName()] = 0;
            }
            countExisting[child.getName()]++;
          });

          Object.keys(allowed).forEach(elementName => {
            if (excludeComment === true && elementName === '#comment') {
              return;
            }
            if ((elementName === '#text' || elementName === '#cdata-section')) {
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
                } else if (!Object.prototype.hasOwnProperty.call(countExisting, '#text') && !Object.prototype.hasOwnProperty.call(countExisting, '#cdata-section')) {
                  stillAllowed.push(elementName);
                }
              }
              return;
            }
            const childBounds = schemaElement.getBoundsForElementName(elementName);
            const existing = Object.prototype.hasOwnProperty.call(countExisting, elementName) ? countExisting[elementName] : 0;
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
        this.debug(nodeName, 'is not allowed as child of', this.getName());
        return false;
      }
      if (schemaElement.areChildrenSortable()) {
        // allowed at any position
        return true;
      }
      // check position
      const allowedSorting = schemaElement.getFirstLevelElementSorting();
      if (!this.isLoaded()) {
        this.load();
      }
      const children = this.getChildren();
      if (children.length === 0) {
        // no children yet, no position problem
        return true;
      }
      let currentPosition = index;
      if (children.length > index) {
        currentPosition = allowedSorting[children.getItem(index).getName()];
      } else {
        currentPosition = children.length;
      }
      let targetPosition = allowedSorting[nodeName];
      if (currentPosition === targetPosition || targetPosition >= children.length) {
        // no special position
        return true;
      } 
        // find the first previous sibling of a different type
        let previousSibling;
        if (index > 0) {
          for (let i = Math.min(index, children.length) - 1; i >= 0; i--) {
            if (children.getItem(i).getName() !== nodeName) {
              previousSibling = children.getItem(i).getName();
              break;
            }
          }
        }
        if (previousSibling) {
          currentPosition = allowedSorting[previousSibling];
        }
        // only allow if it can be inserted before
        const allowed = currentPosition + 1 >= targetPosition;
        if (!allowed) {
          this.debug(nodeName, 'is not allowed as child of', this.getName());
          return false;
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
        } 
          const allowedSorting = schemaElement.getFirstLevelElementSorting();
          if (allowedSorting && Object.prototype.hasOwnProperty.call(allowedSorting, newChild.getName())) {
            const position = allowedSorting[newChild.getName()];
            // search for the first sibling with a position > than the newChilds and insert it there
            let targetIndex = position;
            const found = this.getChildren().some((child, index) => {
              const childPos = allowedSorting[child.getName()];
              if (childPos > position) {
                targetIndex = index;
                return true;
              }
              return false;
            });
            if (!found) {
              // append to the end
              targetIndex = this.getChildren().length;
            }
            return targetIndex;
          }
      }
      return -1;
    },

    /**
     * insert child at given index
     * @param xmlElement {cv.ui.manager.model.XmlElement} new child
     * @param index {Number} index to insert the child, if set to -1 insert it at any allowed position
     * @param skipUndo {Boolean} do not add an undo operation for this change
     * @param internalOperation
     * @return {Boolean} true if the child has been added
     */
    insertChild: function (xmlElement, index, skipUndo, internalOperation) {
      if (!this.isLoaded()) {
        this.load();
      }
      const children = this.getChildren();
      let success = false;
      if (index === -1) {
        index = this.findPositionForChild(xmlElement);
        if (index === -1) {
          // no valid position found
          return false;
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
          this._node.insertBefore(xmlElement.getNode(), this._node.childNodes[0]);
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
          xmlElement.updateModified();
        } else if (!internalOperation || internalOperation === 'added') {
            xmlElement.$$added = true;
            xmlElement.updateModified();
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
            const change = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Add %1', this.getDisplayName()), this, changes, 'created');
            editor.addUndo(change);
          }
        }
      }
      return success;
    },

    _validateTextContent: function (value) {
      // do not validate content that is loaded from the actual node
      if (!this.__initializing) {
        if (this._node) {
          if (!this.getSchemaElement().isValueValid(value)) {
            throw new qx.core.ValidationError(qx.locale.Manager.tr('Invalid text content: \'%1\'', value));
          }
        } else {
          throw new qx.core.ValidationError(qx.locale.Manager.tr('Text content not allowed here'));
        }
      }
    },

    /**
     * Validate this element (and its parent when this is a text node)
     * @param recursive {Boolean} validate children too
     */
    validate: function (recursive) {
      const schemaElement = this.getSchemaElement();
      if (this.isTextNode()) {
        this.getParent().validate(false);
        this.setValid(schemaElement.isValueValid(this.getText()));
      } else if (this.isElement()) {
        const allowedAttributes = schemaElement.getAllowedAttributes();
        const errors = [];
        // check attribute values
        for (let i = 0; i < this._node.attributes.length; i++) {
          const attr = this._node.attributes.item(i);
          if (Object.prototype.hasOwnProperty.call(allowedAttributes, attr.name)) {
            if (!allowedAttributes[attr.name].isValueValid(attr.value)) {
              errors.push({
                attribute: attr.name,
                error: qx.locale.Manager.tr('Invalid value')
              });
            }
          } else {
            errors.push({
              attribute: attr.name,
              error: qx.locale.Manager.tr('Attribute \'%1\' not allowed', attr.name)
            });
          }
        }
        // check for missing required attributes
        Object.keys(allowedAttributes).filter(name => !allowedAttributes[name].isOptional()).forEach(name => {
          if (!this._node.hasAttribute(name)) {
            errors.push({
              attribute: name,
              error: qx.locale.Manager.tr('Attribute \'%1\' is required but missing', name)
            });
          }
        });
        if (schemaElement.isTextContentRequired()) {
          // check if we have at least one non empty #text child
          const found = this.getChildren().some(child => child.isTextNode() && child.getNode().nodeValue.trim() !== '');
          if (!found) {
            errors.push({
              attribute: '#text',
              error: qx.locale.Manager.tr('Text content is missing')
            });
          }
        }
        if (schemaElement.isTextContentAllowed()) {
          this.getChildren().forEach(child => {
            if (child.isTextNode()) {
              child.load();
              child.setValid(schemaElement.isValueValid(child.getText()));
              if (!child.isValid()) {
                child.setInvalidMessage(qx.locale.Manager.tr('Text content is invalid'));
              }
            }
          });
        }
        this.setInvalidMessage(errors.map(err => err.error).join('<br/>'));
        this.setValid(errors.length === 0);
      }
    },

    isTextNode: function () {
      return this.getName() === '#text' || this.getName() === '#cdata-section';
    },

    _applyTextContent: function (value) {
      if (!this.__initializing) {
        if (this._node) {
          if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
            this._node.nodeValue = value;
            const parent = this.getParent();
            if (parent.getName() === 'summary' && parent.getParent().getName() === 'cv-group') {
              parent.getParent().updateDisplayName();
            }
            this.updateDisplayName();
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
          this.error('\''+text+'\' is no valid text content for a \''+this.getName() + '\' element');
        }
      } else {
        this.error('text content is not allowed for a \''+this.getName() + '\' element');
      }
      return {
        changed: changed,
        attribute: nodeName || '#text',
        value: newValue,
        old: oldValue
      };
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
          value = value.replace(/[&"'`]/g, function (s) {
            return cv.ui.manager.model.XmlElement.entityMap[s];
          });
          newValue = value;
          if (attribute.isValueValid(value)) {
            if (oldValue !== value) {
              if (!value || value === attribute.getDefaultValue()) {
                this._node.removeAttribute(name);
                newValue = '';
              } else {
                this._node.setAttribute(name, value);
              }
              if (name === 'name') {
                this.updateDisplayName();
                if (this.getName() === 'icon') {
                  this._maintainIcon();
                }
              }
              changed = true;
            }
          } else {
            this.error('\'' + value + '\' is not allowed for attribute \'' + name + '\'');
          }
        } else {
          this.error('\'' + name + '\' is no allowed attribute for a \'' + this.getName() + '\' element');
        }
        return {
          changed: changed,
          attribute: name,
          value: newValue,
          old: oldValue
        };
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
        };
      }
      return null;
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
          change = parent.setAttribute(attrName, data[attrName]);
          if (change.changed) {
            parentChanges.push(change);
          }
        } else if (attrName === '#outerHTML' || attrName === '#innerHTML') {
          if (this.getSchemaElement().isChildElementAllowed('*')) {
            const dom = new DOMParser().parseFromString(data[attrName], 'text/xml');
            if (dom.getElementsByTagName('parsererror').length === 0) {
              const oldValue = attrName === '#outerHTML' ? this._node.outerHTML : this._node.innerHTML;
              const newNode = dom.documentElement;
              if (attrName === '#outerHTML') {
                const oldNode = this._node;
                oldNode.parentNode.replaceChild(newNode, oldNode);
                this._node = newNode;
                this.setName(this._node.nodeName);
              } else {
                this._node.innerHTML = data[attrName];
              }
              changes.push({
                changed: true,
                attribute: attrName,
                value: data[attrName],
                old: oldValue
              });
              this.load(true);
            }
          } else if (attrName === '#innerHTML' && !data[attrName]) {
            // allow empty values
            const oldValue = this._node.innerHTML;
            this._node.innerHTML = data[attrName];
            changes.push({
              changed: true,
              attribute: attrName,
              value: data[attrName],
              old: oldValue
            });
            this.load(true);
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
          const parentChange = new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Change %1', parent.getDisplayName()), parent, parentChanges);
          changes.push(parentChange);
          parent.updateModified();
        }
        editor.addUndo(new cv.ui.manager.model.ElementChange(qx.locale.Manager.tr('Change %1', this.getDisplayName()), this, changes));
      }
      this.updateModified();
    },

    _applySchemaElement: function (schemaElement) {
      if (schemaElement) {
        this._structure = schemaElement.getSchema().getStructure();
      } else {
        this._structure = null;
      }
      schemaElement.bind('sortable', this, 'sortable', {
        converter: function (value) {
          return this.isEditable() && value;
        }.bind(this)
      });
    },

    _onOpen: function (value) {
      if (value && !this.isLoaded()) {
        this.load();
      }
      this._maintainIcon();
    },

    _applyModified: function () {
      this.updateDisplayName();
    },

    updateDisplayName: function () {
      let displayName = this.getName();
      if (this._node) {
        if (this._node.nodeType === Node.ELEMENT_NODE) {
          if (this._node.hasAttribute('name')) {
            const nameAttr = this._node.getAttribute('name');
            displayName += ' "' + nameAttr + '"';
          } else if (this.getSchemaElement().getSchema().isRoot(this.getName()) && this._node.hasAttribute('design')) {
            const designAttr = this._node.getAttribute('design');
            displayName += ' "' + designAttr + '"';
          } else if (this.getName() === 'cv-group') {
            const summary = this._node.querySelector(':scope > summary');
            displayName += ' "' + summary.textContent.trim() + '"';
          }
        } else if ((this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE || this._node.nodeType === Node.COMMENT_NODE) && this._node.nodeValue.trim()) {
          let textContent = this._node.nodeValue.trim();
          if (textContent.length > 26) {
            textContent = textContent.substring(0, 26) + '...';
          }
          displayName = textContent;
        }
      }
      if (this.isModified()) {
        displayName += ' *';
      }
      this.setDisplayName(displayName);
    },
    hasChildren: function() {
      if (this._node.nodeType === Node.ELEMENT_NODE) {
        if (this._node && this._node.hasChildNodes()) {
          for (let i = 0; i < this._node.childNodes.length; i++) {
            const childNode = this._node.childNodes.item(i);
            if (childNode.nodeType === Node.ELEMENT_NODE ||
              ((childNode.nodeType === Node.TEXT_NODE || childNode.nodeType === Node.CDATA_SECTION_NODE) && childNode.nodeValue.trim() !== '')) {
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
                if (schemaElement.isChildElementAllowed(childNode.nodeName)) {
                  // allowed but no schema element
                  const child = new cv.ui.manager.model.XmlElement(childNode, schemaElement, this.getEditor(), this);
                  if (schemaElement.isMixed()) {
                    // text nodes can be re-ordered in mixed content
                    child.setSortable(true);
                  }
                  children.push(child);
                  this._initialChildNames.push(childNode.nodeName);
                } else {
                  // only complain for real childs (no comments, textNodes)
                  this.setValid(false);
                  let msg = this.getInvalidMessage();
                  msg = (msg ? msg + '<br/>' : '') + qx.locale.Manager.tr('Child element \'%1\' not allowed.', childNode.nodeName);
                  this.setInvalidMessage(msg);
                  this.setValid(false);
                }
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
            try {
              this.setTextContent(this._node.nodeValue);
            } catch (e) {
              this.appendInvalidMessage(e.toString());
            }
          }
        }
        this.setLoaded(true);
        children.addListener('change', this._syncChildNodes, this);
        this._updateChildrenDeletableFlags();
        this.__initializing = false;
      }
    },

    appendInvalidMessage: function (errorMsg) {
      if (errorMsg) {
        const existing = this.getInvalidMessage();
        this.setInvalidMessage(existing ? existing + '<br/>' + errorMsg : errorMsg);
      }
    },

    updateModified: function () {
      if (this.$$added) {
        this.setModified(true);
      } else if (this._node.nodeType === Node.ELEMENT_NODE) {
        const initial = this._initialAttributes;
        const currentChildNames = this._currentChildNames();
        if (this._node.attributes.length !== initial.size) {
          this.setModified(true);
        } else if (currentChildNames.length !== this._initialChildNames.length || currentChildNames.join('') !== this._initialChildNames.join('')) {
          this.setModified(true);
        } else {
          let modified = false;
          for (const [key, value] of initial) {
            if (!this._node.hasAttribute(key) || this._node.getAttribute(key) !== value) {
              modified = true;
              break;
            }
          }
          this.setModified(modified);
        }
      } else if (this._node.nodeType === Node.TEXT_NODE || this._node.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) {
        this.setModified(this._initialTextContent !== this.getTextContent());
      }
      const editor = this.getEditor();
      if (editor) {
        editor.updateModified(this);
      }
    },

    /**
     * Special check if this element has modified children (position, of length)
     * This is used to determine if the preview highlighting needs to be disabled because the xml structure has changed
     * @returns {*|boolean}
     */
    hasChildrenModified: function () {
      if (this._node.nodeType === Node.ELEMENT_NODE && this.isLoaded()) {
        const currentChildNames = this._currentChildNames();
        return this.isModified() && (currentChildNames.length !== this._initialChildNames.length || currentChildNames.join('') !== this._initialChildNames.join(''));
      }
      return false;
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
      if (this.$$added) {
        delete this.$$added;
      }
      this.setModified(false);
    },

    isElement: function () {
      return this._node.nodeType === Node.ELEMENT_NODE;
    },

    _currentChildNames: function () {
      const names = [];
      let name;
      let widget;
      for (let i = 0; i < this._node.childNodes.length; i++) {
        const childNode = this._node.childNodes.item(i);
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          widget = this._node.$$widget;
          name = widget ? widget.getDisplayName() : childNode.nodeName;
          names.push(name);
        } else if ((childNode.nodeType === Node.TEXT_NODE || childNode.nodeType === Node.COMMENT_NODE || this._node.nodeType === Node.CDATA_SECTION_NODE) && childNode.nodeValue.trim()) {
          names.push(childNode.nodeName);
        }
      }
      return names;
    },

    _syncChildNodes: function (ev) {
      // children have changed clear cache
      this.__addableChildren = null;
      // we have to update all deletable flags for this elements children, when their siblings changed
      this._updateChildrenDeletableFlags();
    },

    _updateChildrenDeletableFlags: function () {
      if (this.isEditable()) {
        this.getChildren().forEach(child => {
          if (child.isElement() || child.isTextNode()) {
            child.updateDeletable();
          }
        });
      }
    },

    getWidgetPath: function () {
      if (this.getName() === '#comment') {
        return '';
      }
      const schema = this.getSchemaElement().getSchema();
      const widgets = schema.getWidgetNames();
      let current = this;
      while (current && !widgets.includes(current.getName())) {
        current = current.getParent();
      }
      if (!current) {
        return '';
      }
      if (this._structure === 'pure') {
        if (current.getName() === 'navbar') {
          return 'navbar' + qx.lang.String.firstUp(current.getAttribute('position'));
        }

        const ids = [];
        let c = current;
        while (c) {
          const parent = c.getParent();
          if (parent.getName() === 'pages') {
            ids.unshift('id');
            break;
          }
          let id = parent.getChildren().filter(child => child.getNode().nodeType === Node.ELEMENT_NODE && child.getName() !== 'layout').indexOf(c);
          ids.unshift(id);
          c = parent;
        }
        if (current.getName() === 'page') {
          // make sure that the join ends with '_'
          ids.push('');
        }
        return '#' + ids.join('_');
      } else if (this._structure === 'tile') {
        let c = current.getNode();
        let index = 0;
        let selector = '';
        while (c) {
          const parent = c.parentElement;
          if (c.hasAttribute('id')) {
            selector = selector ? `#${c.getAttribute('id')} > ${selector}` : `#${c.getAttribute('id')}`;
            break;
          } else if (c.nodeName.toLowerCase() === 'config') {
            selector = selector ? `config > ${selector}` : 'config';
            break;
          } else {
            index = Array.prototype.indexOf.call(parent.children, c) + 1;
            selector = selector ? `*:nth-child(${index}) > ${selector}` : `*:nth-child(${index})`;
          }
          c = parent;
        }
        return selector;
      }
      return '';
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
