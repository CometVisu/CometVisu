(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.model.schema.Base": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.model.schema.MAnnotation": {
        "require": true
      },
      "cv.ui.manager.model.schema.SimpleType": {},
      "cv.ui.manager.model.schema.Choice": {},
      "cv.ui.manager.model.schema.Sequence": {},
      "cv.ui.manager.model.schema.Group": {},
      "cv.ui.manager.model.schema.Any": {},
      "cv.ui.manager.model.schema.Attribute": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(node, schema) {
      cv.ui.manager.model.schema.Base.constructor.call(this, node, schema);
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
      getElementName: function getElementName(e, schema) {
        if (e.hasAttribute('name')) {
          return e.getAttribute('name');
        }

        if (e.hasAttribute('ref')) {
          // it's a ref, seek other element!
          var refName = e.getAttribute('ref');
          var ref = schema.getReferencedNode('element', refName);

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
      getTypeNode: function getTypeNode(node, schema) {
        var type;

        if (node.hasAttribute('type')) {
          if (node.getAttribute('type').match(/^xsd:/)) {
            // if it starts with xsd:, it's actually a simple type
            // does not start with
            type = node;
          } else {
            // otherwise, the element is linked to a complexType
            type = schema.getTypeNode('complex', node.getAttribute('type'));
          }
        } else if (node.hasAttribute('ref')) {// the link is a reference to another element, which means it does not even have it's own name.
          // this one is most certainly deprecated, as we do not have many root-level-elements, and only those can
          // be ref'ed
        } else {
          // the element is it's own type
          type = node.querySelector(':scope > complexType');
        }

        return type;
      },
      sortChildNodes: function sortChildNodes(sorting) {
        /**
         * the comparison-function that helps the sorting
         *
         * @param   a   mixed   whatever sort gives us
         * @param   b   mixed   whatever sort gives us
         * @return  integer     -1, 0, 1 - depending on sort-order
         */
        return function (a, b) {
          var aSortvalue = sorting[a.name];
          var bSortvalue = sorting[b.name];

          if (aSortvalue === undefined || bSortvalue === undefined) {
            // undefined means: no sorting available
            return 0;
          }

          if (aSortvalue === bSortvalue) {
            // identical means 'no sorting necessary'
            return 0;
          } // we need to go through the complete list of values the sorting is composed of,
          // to find the first one that distinguishes a from b
          // first, typecast to string!


          if (typeof aSortvalue !== 'string') {
            aSortvalue = aSortvalue.toString();
          }

          if (typeof bSortvalue !== 'string') {
            bSortvalue = bSortvalue.toString();
          }

          var aSortvaluesList = aSortvalue.split('.');
          var bSortvaluesList = bSortvalue.split('.');

          for (var i = 0; i < aSortvaluesList.length; ++i) {
            if (aSortvaluesList[i] < bSortvaluesList[i]) {
              return -1;
            } else if (aSortvaluesList[i] > bSortvaluesList[i]) {
              return 1;
            }
          } // if nothing else matched, then they are treated equal


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
      __P_46_0: false,
      __P_46_1: null,
      __P_46_2: null,
      __P_46_3: null,

      /**
       * get and set the type-node for the element
       * @var object  Type-Node (most certainly a complexType)
       */
      _type: null,
      parse: function parse() {
        cv.ui.manager.model.schema.Element.superclass.prototype.parse.call(this);
        var node = this.getNode();
        var schema = this.getSchema();
        this._type = cv.ui.manager.model.schema.Element.getTypeNode(node, schema);
        this.setName(cv.ui.manager.model.schema.Element.getElementName(node, schema));

        if (node.hasAttribute('default')) {
          this.setDefaultValue(node.getAttribute('default'));
        }

        this.setMixed(this._type.hasAttribute('mixed') && this._type.getAttribute('mixed') === 'true');
      },

      /**
       * get a list of allowed elements for this element
       *
       * @return  object  object of SchemaElement-elements, key is the name
       */
      getAllowedContent: function getAllowedContent() {
        if (this.__P_46_1 !== null) {
          // if we have parsed this already, we can simply return the 'cache'
          return this.__P_46_1;
        }

        var schema = this.getSchema();
        var allowedContent = {
          _grouping: undefined,
          _text: false
        }; // allowed sub-elements
        // can be either simpleContent, or (choice|sequence|group|all)?
        // 'all' is not supported yet.

        if (this._type.querySelectorAll(':scope > simpleContent').length > 0) {
          // it's simpleContent? Then it's either extension or restriction
          // anyways, we will handle it, as if it were a simpleType
          allowedContent._text = new cv.ui.manager.model.schema.SimpleType(this._type.querySelector(':scope > simpleContent'), schema);
        } else if (this._type.querySelectorAll('complexType > choice, complexType> sequence, complexType > group').length > 0) {
          // we have a choice, group or sequence. great
          // as per the W3C, only one of these may appear per element/type
          var tmpDOMGrouping = this._type.querySelector('complexType > choice, complexType > sequence, complexType > group'); // create the appropriate Schema*-object and append it to this very element


          switch (tmpDOMGrouping.nodeName) {
            case 'xsd:choice':
            case 'choice':
              allowedContent._grouping = new cv.ui.manager.model.schema.Choice(tmpDOMGrouping, schema);
              break;

            case 'xsd:sequence':
            case 'sequence':
              allowedContent._grouping = new cv.ui.manager.model.schema.Sequence(tmpDOMGrouping, schema);
              break;

            case 'xsd:group':
            case 'group':
              allowedContent._grouping = new cv.ui.manager.model.schema.Group(tmpDOMGrouping, schema);
              break;

            case 'xsd:any':
            case 'any':
              allowedContent._grouping = new cv.ui.manager.model.schema.Any(tmpDOMGrouping, schema);
              break;
          }
        } else if (this._type.hasAttribute('type') && this._type.getAttribute('type').match(/^xsd:/)) {
          // this is a really simple node that defines its own baseType
          allowedContent._text = new cv.ui.manager.model.schema.SimpleType(this._type, schema);
        } else {
          // no type, no children, no choice - this is an element with NO allowed content/children
          this.__P_46_1 = allowedContent;
          return allowedContent;
        }

        var children = Array.from(this._type.querySelectorAll(':scope > element'));
        children.forEach(function (sub) {
          var subElement = new cv.ui.manager.model.schema.Element(sub, schema);
          allowedContent[subElement.getName()] = subElement;
        }); // fill the cache

        this.__P_46_1 = allowedContent;
        return allowedContent;
      },

      /**
       * get and set the list of allowed attributes
       * @var array   List of SchemaAttribute-objects
       */
      getAllowedAttributes: function getAllowedAttributes() {
        var _this = this;

        if (this.__P_46_2 === null) {
          var allowedAttributes = {}; // allowed attributes

          var attributes = Array.from(this._type.querySelectorAll(':scope > attribute, :scope > simpleContent > extension > attribute')); // now add any attribute that comes from an attribute-group

          var attributeGroups = Array.from(this._type.querySelectorAll(':scope > attributeGroup, :scope > simpleContent > extension > attributeGroup'));
          attributeGroups.forEach(function (aGroup) {
            // get get group itself, by reference if necessary
            // then extract all attributes, and add them to the list of already know attributes
            var attributeGroup = {};

            if (aGroup.hasAttribute('ref')) {
              // we do have a reffed group
              attributeGroup = _this.getSchema().getReferencedNode('attributeGroup', aGroup.getAttribute('ref'));
            } else {
              attributeGroup = aGroup;
            }

            Array.from(attributeGroup.querySelectorAll(':scope > attribute')).forEach(function (child) {
              attributes.push(child);
            });
          }); // convert all allowed attributes to a more object-oriented approach

          attributes.forEach(function (attr) {
            var attribute = new cv.ui.manager.model.schema.Attribute(attr, _this.getSchema());
            allowedAttributes[attribute.getName()] = attribute;
          });
          this.__P_46_2 = allowedAttributes;
        }

        return this.__P_46_2;
      },

      /**
       * are this elements children sortable? this is not the case if a sequence is used, e.g.
       *
       * @return  boolean     are children sortable?
       */
      areChildrenSortable: function areChildrenSortable() {
        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping === undefined) {
          return true;
        } // the inverse of "do the elements have a given order?"


        return !allowedContent._grouping.getElementsHaveOrder();
      },

      /**
       * get a list of required elements.
       * if an element is required multiple times, it is listed multiple times
       *
       * @return  array   list of required elements
       */
      getRequiredElements: function getRequiredElements() {
        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping !== undefined) {
          // we do have a grouping as a child
          return allowedContent._grouping.getRequiredElements();
        } // there is no grouping, hence no elements defined as children


        return [];
      },

      /**
       * get a list of all allowed elements for this element
       * @param excludeComment
       * @return  object  list of SchemaElement-elements, key is the name
       */
      getAllowedElements: function getAllowedElements(excludeComment) {
        var allowedContent = this.getAllowedContent();
        var allowedElements = {};

        if (allowedContent._grouping !== undefined) {
          Object.assign(allowedElements, allowedContent._grouping.getAllowedElements());
        }

        var textOnly = false;

        if (this.isMixed()) {
          // mixed elements are allowed to have #text-nodes
          allowedElements['#text'] = this.getSchema().getTextNodeSchemaElement();
        } else if (allowedContent._text && allowedContent._grouping === undefined) {
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
      getAllowedElementsSorting: function getAllowedElementsSorting() {
        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping !== undefined) {
          return allowedContent._grouping.getAllowedElementsSorting();
        }

        return undefined;
      },
      getFirstLevelElementSorting: function getFirstLevelElementSorting() {
        var allowedSorting = this.getAllowedElementsSorting();

        if (allowedSorting) {
          // we only care about the first level here
          Object.keys(allowedSorting).forEach(function (name) {
            var sort = allowedSorting[name];

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
      getChildBounds: function getChildBounds() {
        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping === undefined) {
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
      getBoundsForElementName: function getBoundsForElementName(childName) {
        var allowedContent = this.getAllowedContent();
        return allowedContent._grouping.getBoundsForElementName(childName);
      },

      /**
       * check if a text-only-node is allowed ...
       *
       * @return  boolean
       */
      isTextContentAllowed: function isTextContentAllowed() {
        if (this.isMixed()) {
          // mixed means that we allow for text-content
          return true;
        } // first, get a list of allowed content (don't worry, it's cached)


        var allowedContent = this.getAllowedContent();

        if (allowedContent._text !== undefined && allowedContent._text !== false) {
          // if _text is defined and there, we assume that text-content is allowed
          return true;
        } // had no reason to allow text-content, so gtfoml!


        return false;
      },
      isTextContentRequired: function isTextContentRequired() {
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
      isChildElementAllowed: function isChildElementAllowed(child) {
        if (child === '#text' || child === '#cdata-section') {
          // text-nodes are somewhat special :)
          return this.isTextContentAllowed();
        } else if (child === '#comment') {
          return true;
        } // first, get a list of allowed content (don't worry, it's cached)


        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping === undefined) {
          // when there is no choice, then there is no allowed element
          return false;
        } // see, if this child is allowed with our choice


        return allowedContent._grouping.isElementAllowed(child);
      },

      /**
       * get the SchemaElement-object for a certain element-name.
       * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
       *
       * @param   elementName string  name of the element to find the SchemaElement for
       * @return  object              SchemaElement-object, or undefined if none is found
       */
      getSchemaElementForElementName: function getSchemaElementForElementName(elementName) {
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = this.getAllowedContent();

        if (elementName === '#text' || elementName === '#cdata-section') {
          // no special handling for mixed nodes, they do have a #text-SchemaElement already!
          // text-nodes may be allowed. we will see ...
          if (this.isTextContentAllowed() === false) {
            return undefined;
          }

          if (!this.__P_46_3) {
            var tmpXML = this.getSchema().getSchemaDOM().createElement('element');
            tmpXML.setAttribute('name', '#text');
            tmpXML.setAttribute('type', 'xsd:string');
            this.__P_46_3 = new cv.ui.manager.model.schema.Element(tmpXML, this.getSchema());

            if (allowedContent._text) {
              this.__P_46_3.getAllowedContent()._text = allowedContent._text;
            } else if (this.isMixed()) {
              this.__P_46_3.getAllowedContent._text = this.getSchema().getTextNodeSchemaElement();
            }
          }

          return this.__P_46_3;
        } else if (elementName === '#comment') {
          // comments are always allowed
          return this.getSchema().getCommentNodeSchemaElement();
        }

        if (allowedContent._grouping === undefined) {
          // when there is no choice, then there is no allowed element
          return undefined;
        } // go over our choice, if the element is allowed with it


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
      getSchemaDOM: function getSchemaDOM() {
        return this.getSchema().getSchemaDOM();
      },

      /**
       * check if a given value is valid for this element
       *
       * @param   value   string  value to check
       * @return  boolean         is it valid?
       */
      isValueValid: function isValueValid(value) {
        if (this.isTextContentAllowed() === false) {
          // if no text-content is allowed, then it can not be valid
          return false;
        }

        if (this.isMixed()) {
          // mixed is always good!
          return true;
        }

        var allowedContent = this.getAllowedContent();
        return allowedContent._text.isValueValid(value);
      },

      /**
       * create and retrieve the part of a regular expression which describes this very element
       *
       * @param   separator   string  the string used to separate different elements, e.g. ';'
       * @param   nocapture   bool    when set to true non capturing groups are used
       * @return  string
       */
      getRegex: function getRegex(separator, nocapture) {
        if (typeof separator === 'undefined' || separator === undefined) {
          // default to an empty string
          separator = '';
        }

        var regexString = '(';

        if (nocapture) {
          regexString += '?:';
        } // start with the name of the element


        regexString += this.getName() + separator + ')'; // append bounds

        var boundsMin = '';
        var boundsMax = '';
        var bounds = this.getBounds();

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
        } // and thats all


        return regexString;
      },

      /**
       * create a full-blown regular expression that describes this elements immediate children
       * @param separator   string  the string used to separate different elements, e.g. ';'
       * @param nocapture
       * @return  string              the regular expression
       */
      getChildrenRegex: function getChildrenRegex(separator, nocapture) {
        if (typeof separator == 'undefined' || separator === undefined) {
          // default to an empty string
          separator = '';
        }

        var allowedContent = this.getAllowedContent();

        if (allowedContent._grouping === undefined) {
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
    destruct: function destruct() {
      this._disposeMap("__P_46_2");

      this._disposeMap("__P_46_1");

      this._disposeObjects("__P_46_3");
    }
  });
  cv.ui.manager.model.schema.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1664789568641