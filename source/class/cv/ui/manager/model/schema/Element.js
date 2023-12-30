/* Element.js
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
 * a single element from the schema
 */
qx.Class.define('cv.ui.manager.model.schema.Element', {
  extend: cv.ui.manager.model.schema.Base,
  include: cv.ui.manager.model.schema.MAnnotation,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(node, schema) {
    super(node, schema);
    this.parse();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Get the name of a schema-element
     * @param e object  element to find the name of
     * @param schema
     * @return  string          name of the element
     * @throws  if the name can not be found
     */
    getElementName(e, schema) {
      if (e.hasAttribute('name')) {
        return e.getAttribute('name');
      }

      if (e.hasAttribute('ref')) {
        // it's a ref, seek other element!
        const refName = e.getAttribute('ref');
        const ref = schema.getReferencedNode('element', refName);

        if (ref.length !== 1) {
          throw new Error('schema/xsd appears to be invalid, can not find element ' + refName);
        }

        return ref.getAttribute('name');
      }

      return 'unknown';
    },

    /**
     * find the type-node for this element
     * @param node
     * @param schema
     * @return  object  object of the type-Node
     */
    getTypeNode(node, schema) {
      let type;

      if (node.hasAttribute('type')) {
        if (node.getAttribute('type').match(/^xsd:/)) {
          // if it starts with xsd:, it's actually a simple type
          // does not start with
          type = node;
        } else {
          // otherwise, the element is linked to a complexType
          type = schema.getTypeNode('complex', node.getAttribute('type'));
        }
      } else if (node.hasAttribute('ref')) {
        // the link is a reference to another element, which means it does not even have it's own name.
        // this one is most certainly deprecated, as we do not have many root-level-elements, and only those can
        // be ref'ed
      } else if (node.localName === 'complexType') {
        // the element is a type
        type = node;
      } else {
        // the element is it's own type
        type = node.querySelector(':scope > complexType');
      }

      return type;
    },

    sortChildNodes(sorting) {
      /**
       * the comparison-function that helps the sorting
       *
       * @param   a   mixed   whatever sort gives us
       * @param   b   mixed   whatever sort gives us
       * @return  integer     -1, 0, 1 - depending on sort-order
       */
      return function (a, b) {
        let aSortvalue = sorting[a.name];
        let bSortvalue = sorting[b.name];

        if (aSortvalue === undefined || bSortvalue === undefined) {
          // undefined means: no sorting available
          return 0;
        }

        if (aSortvalue === bSortvalue) {
          // identical means 'no sorting necessary'
          return 0;
        }

        // we need to go through the complete list of values the sorting is composed of,
        // to find the first one that distinguishes a from b

        // first, typecast to string!
        if (typeof aSortvalue !== 'string') {
          aSortvalue = aSortvalue.toString();
        }
        if (typeof bSortvalue !== 'string') {
          bSortvalue = bSortvalue.toString();
        }

        let aSortvaluesList = aSortvalue.split('.');
        let bSortvaluesList = bSortvalue.split('.');

        for (let i = 0; i < aSortvaluesList.length; ++i) {
          if (aSortvaluesList[i] < bSortvaluesList[i]) {
            return -1;
          } else if (aSortvaluesList[i] > bSortvaluesList[i]) {
            return 1;
          }
        }

        // if nothing else matched, then they are treated equal
        return 0;
      };
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      refine: true,
      init: 'element'
    },

    name: {
      check: 'String',
      init: ''
    },

    defaultValue: {
      check: 'String',
      nullable: true
    },

    sortable: {
      check: 'Boolean',
      init: false,
      event: 'changeSortable'
    },

    mixed: {
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
    __allowedContentLoaded: false,
    __allowedContent: null,
    __allowedAttributes: null,
    __textNodeSchemaElement: null,
    __extendedElement: undefined,

    /**
     * get and set the type-node for the element
     * @var object  Type-Node (most certainly a complexType)
     */
    _type: null,

    parse() {
      super.parse();
      const node = this.getNode();
      const schema = this.getSchema();

      this._type = cv.ui.manager.model.schema.Element.getTypeNode(node, schema);
      this.setName(cv.ui.manager.model.schema.Element.getElementName(node, schema));

      if (node.hasAttribute('default')) {
        this.setDefaultValue(node.getAttribute('default'));
      }
      this.setMixed(this._type.hasAttribute('mixed') && this._type.getAttribute('mixed') === 'true');
    },

    getExtendedElement() {
      if (this.__extendedElement === undefined) {
        this.__extendedElement = null;
        if (this._type.querySelectorAll(':scope > complexContent').length > 0) {
          const complex = this._type.querySelector(':scope > complexContent');
          const extension = complex.querySelector(':scope > extension');
          if (extension) {
            const schema = this.getSchema();
            const baseType = extension.getAttribute('base');
            const extendedNode = schema.getReferencedNode('complexType', baseType);
            if (extendedNode) {
              this.__extendedElement = new cv.ui.manager.model.schema.Element(extendedNode, schema);
            }
          }
        }
      }
      return this.__extendedElement;
    },

    /**
     * get a list of allowed elements for this element
     *
     * @return  object  object of SchemaElement-elements, key is the name
     */
    getAllowedContent() {
      if (this.__allowedContent !== null) {
        // if we have parsed this already, we can simply return the 'cache'
        return this.__allowedContent;
      }
      const schema = this.getSchema();

      const allowedContent = {
        _grouping: undefined,
        _text: false
      };

      // allowed sub-elements
      // can be either simpleContent, or (choice|sequence|group|all)?
      // 'all' is not supported yet.

      if (this._type.querySelectorAll(':scope > simpleContent').length > 0) {
        // it's simpleContent? Then it's either extension or restriction
        // anyway, we will handle it, as if it were a simpleType
        allowedContent._text = new cv.ui.manager.model.schema.SimpleType(
          this._type.querySelector(':scope > simpleContent'),
          schema
        );
      } else if (this._type.querySelectorAll(':scope > complexContent').length > 0) {
        const complex = this._type.querySelector(':scope > complexContent');
        const extension = complex.querySelector(':scope > extension');
        if (extension) {
          allowedContent._grouping = this._parseGrouping(extension, schema);
        }
      } else if (
        this._type.querySelectorAll('complexType > choice, complexType > sequence, complexType > group').length > 0
      ) {
        // we have a choice, group or sequence. great
        // as per the W3C, only one of these may appear per element/type
        let complexType = this._type.localName === 'complexType' ? this._type : this._type.querySelector('complexType');
        allowedContent._grouping = this._parseGrouping(complexType, schema);
      } else if (this._type.hasAttribute('type') && this._type.getAttribute('type').match(/^xsd:/)) {
        // this is a really simple node that defines its own baseType
        allowedContent._text = new cv.ui.manager.model.schema.SimpleType(this._type, schema);
      } else {
        // no type, no children, no choice - this is an element with NO allowed content/children
        this.__allowedContent = allowedContent;
        return allowedContent;
      }

      const children = Array.from(this._type.querySelectorAll(':scope > element'));

      children.forEach(sub => {
        const subElement = new cv.ui.manager.model.schema.Element(sub, schema);
        allowedContent[subElement.getName()] = subElement;
      });

      // fill the cache
      this.__allowedContent = allowedContent;

      return allowedContent;
    },

    _parseGrouping(node, schema) {
      let tmpDOMGrouping = node.querySelector(
        ':scope > choice, :scope > sequence, :scope > group'
      );
      if (!tmpDOMGrouping) {
        return null;
      }

      // create the appropriate Schema*-object and append it to this very element
      switch (tmpDOMGrouping.nodeName) {
        case 'xsd:choice':
        case 'choice':
          return new cv.ui.manager.model.schema.Choice(tmpDOMGrouping, schema);

        case 'xsd:sequence':
        case 'sequence':
          return new cv.ui.manager.model.schema.Sequence(tmpDOMGrouping, schema);

        case 'xsd:group':
        case 'group':
          return new cv.ui.manager.model.schema.Group(tmpDOMGrouping, schema);

        case 'xsd:any':
        case 'any':
          return new cv.ui.manager.model.schema.Any(tmpDOMGrouping, schema);
      }

      return null;
    },

    /**
     * get and set the list of allowed attributes
     * @var array   List of SchemaAttribute-objects
     */
    getAllowedAttributes() {
      if (this.__allowedAttributes === null) {
        const allowedAttributes = {};

        const attributes = [];
        const attributeGroups = [];
        const extendedElement = this.getExtendedElement();
        if (extendedElement) {
          Object.assign(allowedAttributes, extendedElement.getAllowedAttributes());
        }

        // allowed attributes
        for (const attr of this._type.querySelectorAll(':scope > attribute, :scope > simpleContent > extension > attribute, :scope > complexContent > extension > attribute')) {
          attributes.push(attr);
        }

        // now add any attribute that comes from an attribute-group
        for (const aGroup of this._type.querySelectorAll(':scope > attributeGroup, :scope > simpleContent > extension > attributeGroup, :scope > complexContent > extension > attributeGroup')) {
          attributeGroups.push(aGroup);
        }

        attributeGroups.forEach(aGroup => {
          // get group itself, by reference if necessary
          // then extract all attributes, and add them to the list of already know attributes

          let attributeGroup = {};
          if (aGroup.hasAttribute('ref')) {
            // we do have a reffed group
            attributeGroup = this.getSchema().getReferencedNode('attributeGroup', aGroup.getAttribute('ref'));
          } else {
            attributeGroup = aGroup;
          }

          Array.from(attributeGroup.querySelectorAll(':scope > attribute')).forEach(child => {
            attributes.push(child);
          });
        });

        // convert all allowed attributes to a more object-oriented approach
        attributes.forEach(attr => {
          const attribute = new cv.ui.manager.model.schema.Attribute(attr, this.getSchema());

          allowedAttributes[attribute.getName()] = attribute;
        });

        this.__allowedAttributes = allowedAttributes;
      }
      return this.__allowedAttributes;
    },

    /**
     * are these elements children sortable? this is not the case if a sequence is used, e.g.
     *
     * @return  boolean     are children sortable?
     */
    areChildrenSortable() {
      const allowedContent = this.getAllowedContent();

      if (!allowedContent._grouping) {
        return true;
      }

      // the inverse of "do the elements have a given order?"
      return !allowedContent._grouping.getElementsHaveOrder();
    },

    /**
     * get a list of required elements.
     * if an element is required multiple times, it is listed multiple times
     *
     * @return  array   list of required elements
     */
    getRequiredElements() {
      const allowedContent = this.getAllowedContent();

      const required = [];

      const extendedElement = this.getExtendedElement();
      if (extendedElement) {
        for (const r of extendedElement.getRequiredElements()) {
          required.push(r);
        }
      }

      if (allowedContent._grouping) {
        // we do have a grouping as a child
        for (const r of allowedContent._grouping.getRequiredElements()) {
          required.push(r);
        }
      }

      // there is no grouping, hence no elements defined as children
      return required;
    },

    /**
     * get a list of all allowed elements for this element
     * @param excludeComment
     * @return  object  list of SchemaElement-elements, key is the name
     */
    getAllowedElements(excludeComment) {
      const allowedContent = this.getAllowedContent();

      let allowedElements = {};
      const extendedElement = this.getExtendedElement();
      if (extendedElement) {
        Object.assign(allowedElements, extendedElement.getAllowedElements(excludeComment));
      }
      if (allowedContent._grouping) {
        Object.assign(allowedElements, allowedContent._grouping.getAllowedElements());
      }

      let textOnly = false;
      if (this.isMixed()) {
        // mixed elements are allowed to have #text-nodes
        allowedElements['#text'] = this.getSchema().getTextNodeSchemaElement();
      } else if (allowedContent._text && !allowedContent._grouping) {
        // text only
        allowedElements['#text'] = allowedContent._text;
        textOnly = true;
      }

      if (!textOnly && !excludeComment) {
        // although its basically allowed to add comments in a text-only content, we do not allow it
        allowedElements['#comment'] = this.getSchema().getCommentNodeSchemaElement();
      }

      return allowedElements;
    },

    /**
     * get the sorting of the allowed elements.
     *
     * @return  object              list of allowed elements, with their sort-number as value
     */
    getAllowedElementsSorting() {
      const allowedContent = this.getAllowedContent();

      if (allowedContent._grouping) {
        return allowedContent._grouping.getAllowedElementsSorting();
      }

      return undefined;
    },

    getFirstLevelElementSorting() {
      const allowedSorting = this.getAllowedElementsSorting();
      if (allowedSorting) {
        // we only care about the first level here
        Object.keys(allowedSorting).forEach(name => {
          let sort = allowedSorting[name];
          if (typeof sort === 'string') {
            sort = parseInt(sort.split('.')[0]);
          }
          allowedSorting[name] = sort;
        });
      }
      return allowedSorting;
    },

    /**
     * get the bounds for this elements children (as defined by a choice)
     *
     * @return  object  bounds ({min: x, max: y})
     */
    getChildBounds() {
      const allowedContent = this.getAllowedContent();

      if (!allowedContent._grouping) {
        // no choice = no idea about bounds
        return undefined;
      }

      if (allowedContent._grouping.hasMultiLevelBounds() === true) {
        // if our choice has sub-choices, then we have not fucking clue about bounds (or we can not process them)
        return undefined;
      }

      return allowedContent._grouping.getBounds();
    },

    /**
     * get the bounds for a specific element-name
     * will go through all of the groupings-tree to find out, just how many elements of this may appear
     *
     * @param   childName   string  name of the child-to-be
     * @return  object              {min: x, max: y}
     */
    getBoundsForElementName(childName) {
      const allowedContent = this.getAllowedContent();

      return allowedContent._grouping.getBoundsForElementName(childName);
    },

    /**
     * check if a text-only-node is allowed ...
     *
     * @return  boolean
     */
    isTextContentAllowed() {
      if (this.isMixed()) {
        // mixed means that we allow for text-content
        return true;
      }

      // first, get a list of allowed content (don't worry, it's cached)
      const allowedContent = this.getAllowedContent();

      if (allowedContent._text !== undefined && allowedContent._text !== false) {
        // if _text is defined and there, we assume that text-content is allowed
        return true;
      }

      // had no reason to allow text-content, so gtfoml!
      return false;
    },

    isTextContentRequired() {
      if (this.isTextContentAllowed()) {
        return !this.isMixed() && !this.getAllowedContent()._text.isValueValid('');
      }
      return false;
    },

    /**
     * check if an element (specified by its name) is allowed as one of our immediate children
     * Goes recursive if we have choices.
     *
     * @param   child   string  name of the element we want to check
     * @return  boolean         is this element allowed?
     */
    isChildElementAllowed(child) {
      if (child === '#text' || child === '#cdata-section') {
        // text-nodes are somewhat special :)
        return this.isTextContentAllowed();
      } else if (child === '#comment') {
        return true;
      }

      // first, get a list of allowed content (don't worry, it's cached)
      const allowedContent = this.getAllowedContent();

      const extendedElement = this.getExtendedElement();
      if (extendedElement && extendedElement.isChildElementAllowed(child)) {
        return true;
      }

      if (!allowedContent._grouping) {
        // when there is no choice, then there is no allowed element
        return false;
      }
      // see, if this child is allowed with our choice
      return allowedContent._grouping.isElementAllowed(child);
    },

    /**
     * get the SchemaElement-object for a certain element-name.
     * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
     *
     * @param   elementName string  name of the element to find the SchemaElement for
     * @return  object              SchemaElement-object, or undefined if none is found
     */
    getSchemaElementForElementName(elementName) {
      // first, get a list of allowed content (don't worry, it's cached)
      const allowedContent = this.getAllowedContent();

      if (elementName === '#text' || elementName === '#cdata-section') {
        // no special handling for mixed nodes, they do have a #text-SchemaElement already!
        // text-nodes may be allowed. we will see ...
        if (this.isTextContentAllowed() === false) {
          return undefined;
        }

        if (!this.__textNodeSchemaElement) {
          const tmpXML = this.getSchema().getSchemaDOM().createElement('element');
          tmpXML.setAttribute('name', '#text');
          tmpXML.setAttribute('type', 'xsd:string');
          this.__textNodeSchemaElement = new cv.ui.manager.model.schema.Element(tmpXML, this.getSchema());

          if (allowedContent._text) {
            this.__textNodeSchemaElement.getAllowedContent()._text = allowedContent._text;
          } else if (this.isMixed()) {
            this.__textNodeSchemaElement.getAllowedContent._text = this.getSchema().getTextNodeSchemaElement();
          }
        }
        return this.__textNodeSchemaElement;
      } else if (elementName === '#comment') {
        // comments are always allowed
        return this.getSchema().getCommentNodeSchemaElement();
      }

      const extendedElement = this.getExtendedElement();
      if (extendedElement && extendedElement.isElementAllowed(elementName)) {
        return extendedElement.getSchemaElementForElementName(elementName);
      }

      if (!allowedContent._grouping) {
        // when there is no choice, then there is no allowed element
        return undefined;
      }

      // go over our choice, if the element is allowed with it
      if (allowedContent._grouping.isElementAllowed(elementName)) {
        // only look in this tree, if the element is allowed there.
        return allowedContent._grouping.getSchemaElementForElementName(elementName);
      }

      return undefined;
    },

    /**
     * return the DOM this Schema is based on
     *
     * @return  object  DOM of $xsd
     */
    getSchemaDOM() {
      return this.getSchema().getSchemaDOM();
    },

    /**
     * check if a given value is valid for this element
     *
     * @param   value   string  value to check
     * @return  boolean         is it valid?
     */
    isValueValid(value) {
      if (this.isTextContentAllowed() === false) {
        // if no text-content is allowed, then it can not be valid
        return false;
      }

      if (this.isMixed()) {
        // mixed is always good!
        return true;
      }

      const allowedContent = this.getAllowedContent();

      return allowedContent._text.isValueValid(value);
    },

    /**
     * create and retrieve the part of a regular expression which describes this very element
     *
     * @param   separator   string  the string used to separate different elements, e.g. ';'
     * @param   nocapture   bool    when set to true non capturing groups are used
     * @return  string
     */
    getRegex(separator, nocapture) {
      if (typeof separator === 'undefined' || separator === undefined) {
        // default to an empty string
        separator = '';
      }

      let regexString = '(';
      if (nocapture) {
        regexString += '?:';
      }

      // start with the name of the element
      regexString += this.getName() + separator + ')';

      // append bounds
      let boundsMin = '';
      let boundsMax = '';
      const bounds = this.getBounds();
      if (bounds.min !== undefined) {
        boundsMin = bounds.min;
      }

      if (bounds.max !== undefined) {
        if (bounds.max !== Number.POSITIVE_INFINITY) {
          boundsMax = bounds.max;
        }
      }

      if (boundsMin !== '' || boundsMax !== '') {
        // append bounds to the regex-string
        regexString += '{' + boundsMin + ',' + boundsMax + '}';
      }

      // and thats all
      return regexString;
    },

    /**
     * create a full-blown regular expression that describes this elements immediate children
     * @param separator   string  the string used to separate different elements, e.g. ';'
     * @param nocapture
     * @return  string              the regular expression
     */
    getChildrenRegex(separator, nocapture) {
      if (typeof separator == 'undefined' || separator === undefined) {
        // default to an empty string
        separator = '';
      }

      const allowedContent = this.getAllowedContent();

      if (!allowedContent._grouping) {
        // not really something to match
        return '^';
      }

      return allowedContent._grouping.getRegex(separator, nocapture);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeMap('__allowedAttributes');
    this._disposeMap('__allowedContent');
    this._disposeObjects('__textNodeSchemaElement', '__extendedElement');
  }
});
