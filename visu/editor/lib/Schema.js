/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Javascript-Representation of an XSD/Schema
 *
 * The classes in this file are able to load an XML-Schema/XSD from a give URL, and
 * create an object-oriented representation of it. This includes the ability to check for validity of
 * values, as well as having a tree-like structure of allowed elements and attributes.
 *
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    editor
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2012 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2012-10-03
 * @requires    Messages.js
 */


// @TODO: read and parse annotations (documentation, xml: lang); use separate Class? (MS5+)

/**
 * starting-point for a javascript-representation of the XSD
 * 
 * @param   filename    string  filename of the schema, including a relative path
 */
var Schema = function (filename) {
    if (filename == undefined || filename == '' || !filename.match(/\.xsd$/)) {
        throw 'no, empty or invalid filename given, can not instantiate without one';
    }
    
    var _schema = this;
    var _filename = filename;
    
    /**
     * jQuery-object of the schema/xsd
     * @var object
     */
    var $xsd = {};
    
    /**
     * object of allowed root-level elements
     * @var object
     */
    _schema.allowedRootElements = {};
    
    /**
     * load and cache the xsd from the server
     */
    var cacheXSD = function () {
        $.ajax(_filename,
            {
                dataType: 'xml',
                cache: false, // do not allow caching of the xsd, it might have changed
                success: function (data) {
                    $xsd = $(data);
                    
                    // parse the data, to have at least a list of root-level-elements
                    parseXSD();
                    
                    // tell everyone that we are done!
                    $(document).trigger('schema_loaded');
                }
            }
        );
    }
    
    /**
     * parse the schema once
     */
    var parseXSD = function () {
        // make a list of root-level elements
        var selector = fixNamespace('xsd\\:schema > xsd\\:element');
        $(selector, $xsd).each(function () {
            var name = $(this).attr('name');
            _schema.allowedRootElements[name] = new SchemaElement(this, _schema);
        });
    }
    
    /**
     * dive into the schema and find the element that is being pulled in by a ref.
     * Do so recursively.
     * referenced nodes can be top-level-nodes only!
     * 
     * @param   type    string  Type of the node (e.g. element, attributeGroup, ...)
     * @param   refName string  Name as per the ref-attribute
     * @return  object          jQuery-object of the ref'ed element
     */
    _schema.getReferencedNode = function (type, refName) {
        var selector = 'xsd\\:schema > xsd\\:' + type + '[name="' + refName + '"]';
        selector = fixNamespace(selector);
        var $ref = $(selector, $xsd);

        if ($ref.is('[ref]')) {
            // do it recursively, if necessary
            $ref = _schema.getReferencedNode(type, $ref.attr('ref'));
        }

        return $ref;
    }
    
    /**
     * get the definition of a type, be it complex or simple
     * 
     * @param   type    string  Type of type to find (either simple or complex)
     * @param   name    string  Name of the type to find
     */
    _schema.getTypeNode = function (type, name) {
        var selector = fixNamespace('xsd\\:' + type + 'Type[name="' + name + '"]');
        var $type = $(selector, $xsd);
        
        if ($type.length != 1) {
            throw 'schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found';
        }
        
        return $type;
    }
    
    /**
     * get the DOM for this Schema
     * 
     * @return  object  DOM
     */
    _schema.getSchemaDOM = function () {
        return $xsd;
    }
    
    cacheXSD();
}

/**
 * a single SimpleType from the schema.
 * Should be useable for SimpleContent, too.
 * Is usable for attributes, too.
 * 
 * @param   node    DOMNode the DOMNode this SimpleType is
 * @param   schema  object  a Schema-object of where this node comes from
 */
var SchemaSimpleType = function (node, schema) {
    if (typeof node == 'undefined' || node == undefined) {
        throw 'can not proceed, have problem with unset node';
    }
    
    var _type = this;
    
    /**
     * parse a node, find it's data (restrictions, extensions, bases ... whatever)
     * 
     * @param   node    DOMNode the node to parse
     */
    var fillNodeData = function (node) {
        var $n = $(node);
        
        if ($n.is(fixNamespace('xsd\\:attribute[ref]'))) {
            // it's a ref, seek other element!
            var refName = $n.attr('ref');
            $n = _schema.getReferencedNode('attribute', refName);
            
            if ($n.length != 1) {
                throw 'schema/xsd appears to be invalid, can not find element ' + refName;
            }
        }
        
        if ($n.is(fixNamespace('xsd\\:attribute[type], xsd\\:element[type], [name=#text][type]'))) {
            // hacked: allow this to be used for attributes
            var baseType = $n.attr('type');
            nodeData.bases.push(baseType);
            _type.baseType = baseType;

            // is this attribute optional?
            nodeData.isOptional = $n.is('[use="optional"]');

            return;
        }
        
        var subNodes = $n.find(fixNamespace('> xsd\\:restriction, > xsd\\:extension, > xsd\\:simpleType > xsd\\:restriction, > xsd\\:simpleType > xsd\\:extension'));
        
        subNodes.each(function () {
            var baseType = $(this).attr('base');
            nodeData.bases.push(baseType);
            
            if (!baseType.match(/^xsd:/)) {
                // don't dive in for default-types, they simply can not be found
                var subnode = _schema.getReferencedNode('simpleType', baseType)
                fillNodeData(subnode);
            } else {
                _type.baseType = baseType;
            }

        });
        
        subNodes.find(fixNamespace('> xsd\\:pattern')).each(function () {
            var pattern = $(this).attr('value');
            nodeData.pattern.push(pattern);
        });


        subNodes.find(fixNamespace('> xsd\\:enumeration')).each(function () {
            var value = $(this).attr('value');
            nodeData.enumerations.push(value);
        });

    }
    
    /**
     * check if a given value is valid for this type
     * 
     * @param   value   mixed   the value to check
     * @return  boolean         if the value is valid
     */
    _type.isValueValid = function (value) {
        
        if (_type.baseType == undefined) {
            throw 'something is wrong, do not have a baseType for type';
        }
        
        if (value == '' && nodeData.isOptional == true) {
            // empty values are valid if this node is optional!
            return true;
        }
        
        if (-1 == _type.baseType.search(/^xsd:/)) {
            // created our own type, will need to find and use it.
            var typeNode = _schema.getTypeNode('simple', _type.baseType);
            var subType = new SchemaSimpleType(typeNode, _schema);
            return subType.isValueValid(value);
        } else {
            // xsd:-namespaces types, those are the originals
            switch (_type.baseType) {
                case 'xsd:string':
                    if (!(typeof(value) == 'string')) {
                        // it's not a string, but it should be.
                        // pretty much any input a user gives us is string, so this is pretty much moot.
                        return false;
                    }
                    break;
                case 'xsd:decimal':
                    if (!value.match(/^[-+]?[0-9]*(\.[0-9]+)?$/)) {
                        return false;
                    }
                    break;
                case 'xsd:integer':
                    if (!value.match(/^[-+]?[0-9]+$/)) {
                        return false;
                    }
                    break;
                case 'xsd:float':
                    if (!value.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
                        return false;
                    }
                    break;
                case 'xsd:boolean':
                    if (!value.match(/^(true|false|0|1)$/)) {
                        return false;
                    }
                    break;
                default:
                    throw 'not implemented baseType ' + _self.baseType;
            }
        }
        
        // check if the value is in our list of valid values, if there is such a list
        if (nodeData.enumerations.length > 0) {
            if (-1 == $.inArray(value, nodeData.enumerations)) {
                return false;
            }
        }
        
        // check if the value matches any given pattern
        if (nodeData.pattern.length > 0) {
            // start with assuming it's valid
            var boolValid = true;
            
            $.each(nodeData.pattern, function (i, item) {
                // create a regex from the pattern; mind ^ an $ - XSD has them implicitly (XSD Datatpes, Appenix G)
                // so for our purpose, we need to add them
                var mypattern = regexFromString('^' + item + '$');
                
                if (false == mypattern.test(value)) {
                    // regular expression did not match
                    // bad bad value!
                    boolValid = false;
                }
            });
            
            // if the value has been marked invalid by a regex, return invalid.
            if (false == boolValid) {
                return false;
            }
        }
        
        // if no check said the value is invalid, then it is not invalid
        return true;
    }
    
    /**
     * get this elements enumeration (if there is any)
     * 
     * @return  array   list of allowed values (if there are any)
     */
    _type.getEnumeration = function () {
        if (_type.baseType == 'xsd:boolean') {
            // special handling for boolean, as we KNOW it to be an enumeration
            return ['true', 'false'];
        }
        
        return nodeData.enumerations;
    }
    
    /**
     * set this node to be optional.
     * Will always activate optional if isOptional == true
     * Will deactivate optional ONLY if this type itself is also not optional.
     * 
     * Needed if our parent is optional, thus we are optional too (e.g. with referenced attributes)
     * 
     * @param   isOptional  boolean isOptional?
     */
    _type.setIsOptional = function (isOptional) {
        nodeData.isOptional = nodeData.isOptional || isOptional;
    };


    /**
     * this is us. well, our node.
     * @var object  jQuery-representation of our node
     */
    var $n = $(node);
    
    /**
     * the schema where this element comes from
     * @var object  Schema
     */
    var _schema = schema;
    if (_schema == undefined) {
        throw 'programming error, schema is not defined';
    }
    
    /**
     * the nodes essential data
     * @var object  data
     */
    var nodeData = {
                    pattern: [],
                    enumerations: [],
                    bases:  [],
                    isOptional: undefined,
                    };

    /**
     * the baseType of this element, which is one of the xsd-namespaced types (like 'string')
     * @var string
     */
    _type.baseType = undefined;

    // now load this nodes Data!
    fillNodeData($n);
}

/**
 * a single attribute from the schema.
 *
 * @param   node    DOMNode     the DOMNode this attribute is
 * @param   schema  object      a Schema-object of where this node comes from
 */
var SchemaAttribute = function (node, schema) {
    var _attribute = this;
    
    /**
     * Get the name of a schema-node
     * 
     * @param   node    object  node to find the name of
     * @return  string          name of the node
     * @throws  if the name can not be found
     */
    var getAttributeName = function (node) {
        var $n = $(node);
        
        if ($n.is('[name]')) {
            return $n.attr('name');
        }
        
        if ($n.is('[ref]')) {
            // it's a ref, seek other element!
            var refName = $n.attr('ref');
            var $ref = _schema.getReferencedNode('attribute', refName);
            
            if ($ref.length != 1) {
                throw 'schema/xsd appears to be invalid, can not find element ' + refName;
            }
            
            return $ref.attr('name');
        }
        
        return 'unknown';
    }
    
    /**
     * check if a given value is valid for this attribute
     * 
     * @param   value   mixed   the value to check
     * @return  boolean         if the value is valid
     */
    _attribute.isValueValid = function (value) {
        return type.isValueValid(value);
    }
    
    /**
     * get a simple string telling us, what type of content is allowed
     * 
     * @return  string  description of allowed values, almost user-readable :)
     */
    _attribute.getTypeString = function () {
        var description = type.baseType;
        
        if (description.match(/xsd\:/)) {
            return description.replace(/xsd\:/, '');
        }
        
        return Messages.schema.complexType;
    }
    
    /**
     * get the list of values that are valid for this attribute, if it is an enumeration
     * 
     * @return  array   list of string of valid values
     */
    _attribute.getEnumeration = function () {
        return type.getEnumeration();
    }
    
    /**
     * the original node from the Schema
     * @var object  jQuery-enhanced DOM-node
     */
    var $node = $(node);
    
    /**
     * the schema where this attribute comes from
     * @var object  Schema
     */
    var _schema = schema;
    if (_schema == undefined) {
        throw 'programming error, schema is not defined';
    }
    
    /**
     * is this attribute optional?
     * @var boolean is it optional?
     */
    _attribute.isOptional = ($node.attr('use') == 'required' ? false : true);
    
    /**
     * the name of this attribute
     * @var string  the name
     */
    _attribute.name = getAttributeName($node);
    
    /**
     * we have our own type
     * @var object  SchemaSimpleType of the attribute, for validating purposes
     */
    var type = new SchemaSimpleType($node, _schema);
    type.setIsOptional(_attribute.isOptional);
}

/**
 * a single element from the schema
 * 
 * @param   node    DOMNode the DOMNode this element is
 * @param   schema  object  a Schema-object of where this node comes from
 */
var SchemaElement = function (node, schema) {
    var _element = this;
    
    /**
     * Get the name of a schema-element
     * 
     * @param   element object  element to find the name of
     * @return  string          name of the element
     * @throws  if the name can not be found
     */
    var getElementName = function (element) {
        var $e = $(element);
        
        if ($e.is('[name]')) {
            return $e.attr('name');
        }
        
        if ($e.is('[ref]')) {
            // it's a ref, seek other element!
            var refName = $e.attr('ref');
            var $ref = _schema.getReferencedNode('element', refName);
            
            if ($ref.length != 1) {
                throw 'schema/xsd appears to be invalid, can not find element ' + refName;
            }
            
            return $ref.attr('name');
        }
        
        return 'unknown';
    }
    
    /**
     * find the type-node for this element
     * 
     * @return  object  jQuery-fied object of the type-Node
     */
    var getTypeNode = function () {
        var $type;
        
        if ($e.is('[type]')) {
            
            if ($e.attr('type').match(/^xsd:/)) {
                // if it starts with xsd:, it's actually a simple type
                // does not start with 
                $type = $e;
            } else {
                // otherwiese, the element is linked to a complexType
                $type = _schema.getTypeNode('complex', $e.attr('type'));
            }
        } else if ($e.is('[ref]')) {
            // the link is a reference to another element, which means it does not even have it's own name.
            // this one is most certainly deprecated, as we do not have many root-level-elements, and only those can
            // be ref'ed
        } else {
            // the element is it's own type
            $type = $e.find(fixNamespace('> xsd\\:complexType'));
        }
        
        return $type;
    }
    
    /**
     * get a list of allowed elements for this element
     * 
     * @return  object  object of SchemaElement-elements, key is the name
     */
    _element.getAllowedContent = function () {
        if (true === allowedContentLoaded) {
            // if we have parsed this already, we can simply return the 'cache'
            return allowedContent;
        }
        
        // allowed sub-elements
        // can be either choice, simpleContent or sequence (the latter is not supported)
        
        if ($type.children(fixNamespace('xsd\\:simpleContent')).length > 0) {
            // it's simpleContent? Then it's either extension or restriction
            // anyways, we will handle it, as if it were a simpleType
            allowedContent._text = new SchemaSimpleType($type.children(fixNamespace('xsd\\:simpleContent')), _schema);
        } else if ($type.children(fixNamespace('xsd\\:choice')).length > 0) {
            // we have a choice. great
            // as per the W3C, choice may only appear once per element/type
            var tmpDOMChoice = $type.children(fixNamespace('xsd\\:choice')).get(0);

            allowedContent._choice = new SchemaChoice(tmpDOMChoice, _schema);
            delete tmpDOMChoice;
        } else if ($type.children(fixNamespace('xsd\\:group')).length > 0) {
            // we have a group
            // as per the W3C, group may only appear once per element/type (not true for group in choices!)
            // also, a group and a choice can not BOTH appear in an element/type

            var tmpDOMGroup = $type.children(fixNamespace('xsd\\:group'))[0];
            
            var subGroup = new SchemaGroup(tmpDOMGroup, _schema);
            
            if (true === subGroup.hasChoice()) {
                allowedContent._choice = subGroup.getChoice();
            }

            delete tmpDOMGroup;
            delete subGroup;
            
        } else if ($type.is('[type]') && $type.attr('type').match(/^xsd:/)) {
            // this is a really simple node that defines its own baseType
            allowedContent._text = new SchemaSimpleType($type, _schema);
        } else if ($type.children(fixNamespace('xsd\\:sequence')).length > 0) {
            // sequence is not yet supported
            throw 'schema/xsd is not compatible, unsupported node ' + $e;
        } else {
            // no type, no children, no choice - this is an element with NO allowed content/children
            return allowedContent;
        }
        
        
        var children = $type.find(fixNamespace('> xsd\\:element'), $e);
        children.each(function () {
            var subElement = new SchemaElement(this);
            var name = subElement.name;
            allowedContent[name] = subElement;
        });
        
        // remember that we parsed it already!
        allowedContentLoaded = true;
        
        return allowedContent;
    }
    
    /**
     * get a list of all allowed elements for this element
     * 
     * @return  object  list of SchemaElement-elements, key is the name
     */
    _element.getAllowedElements = function () {
        var allowedContent = _element.getAllowedContent();
        
        var allowedElements = {};
        if (allowedContent._choice != undefined) {
            $.extend(allowedElements, allowedContent._choice.getAllowedElements(true));
        }

        
        if (true === _element.isMixed) {
            // mixed elements are allowed to have #text-nodes
            var tmpXML = $('<element />', _schema.getSchemaDOM()).attr({name: '#text', type: 'xsd:string'});
            var tmpSchemaElement = new SchemaElement(tmpXML, _schema);
            allowedElements['#text'] = tmpSchemaElement;
        }

        return allowedElements;
    }
    
    /**
     * get the bounds for this elements children (as defined by a choice)
     * 
     * @return  object  bounds ({min: x, max: y})
     */
    _element.getChildBounds = function () {
        if (allowedContent._choice == undefined) {
            // no choice = no idea about bounds
            return undefined;
        }
        
        if (true === allowedContent._choice.hasSubChoice()) {
            // if our choice has sub-choices, then we have not fucking clue about bounds (or we can not process them)
            return undefined;
        }
        
        return allowedContent._choice.bounds;
    }

    
    /**
     * get this elements bounds (bounds defined FOR THIS ELEMENT)
     * 
     * @return  object  {min: x, max: y}
     */
    _element.getBounds = function () {
        return bounds;
    }
    

    /**
     * get a list of allowed attributes for this element
     * 
     * @return  array   list of SchemaAttributes
     */
    var getAllowedAttributes = function () {
        var allowedAttributes = {};
        
        // allowed attributes
        var attributes = $type.find(fixNamespace('> xsd\\:attribute, > xsd\\:simpleContent > xsd\\:extension > xsd\\:attribute'));
               
        // now add any attribute that comes from an attribute-group
        var attributeGroups = $type.find(fixNamespace('> xsd\\:attributeGroup, > xsd\\:simpleContent > xsd\\:extension > xsd\\:attributeGroup'));
        
        attributeGroups.each(function () {
            // get get group itself, by reference if necessary
            // then extract all attributes, and add them to the list of already know attributes

            var $attributeGroup = {};
            if ($(this).is('[ref]')) {
                // we do have a reffed group
                $attributeGroup = _schema.getReferencedNode('attributeGroup', $(this).attr('ref'));
            } else {
                $attributeGroup = $(this);
            }
            
            $attributeGroup.children(fixNamespace('xsd\\:attribute')).each(function () {
                attributes.push(this);
            });
        });

        // convert all allowed attributes to a more object-oriented approach
        attributes.each(function() {
            var attribute = new SchemaAttribute(this, _schema);
            allowedAttributes[attribute.name] = attribute;
        });
        
        return allowedAttributes;
    }
    
    /**
     * check if a text-only-node is allowed ...
     * 
     * @return  boolean
     */
    var isTextContentAllowed = function () {
        if (_element.isMixed == true) {
            // mixed means that we allow for text-content
            return true;
        }
        
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._text != undefined && allowedContent._text != false) {
            // if _text is defined and there, we assume that text-content is allowed
            return true;
        }
        
        // had no reason to allow text-content, so gtfoml!
        return false;
    }
    
    /**
     * check if an element (specified by its name) is allowed as one of our immediate children
     * Goes recursive if we have choices.
     * 
     * @param   child   string  name of the element we want to check
     * @return  boolean         is this element allowed?
     */
    _element.isChildElementAllowed = function (child) {
        if (child == '#text') {
            // text-nodes are somewhat special :)
            return isTextContentAllowed();
        }
        
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._choice == undefined) {
            // when there is no choice, then there is no allowed element
            return false;
        }
        
        // see, if this child is allowed with our choice
        if (allowedContent._choice != undefined) {
            return allowedContent._choice.isElementAllowed(child);
        }
        
        // no reason why we should have allowed this element.
        return false;
    }

    /**
     * get the SchemaElement-object for a certain element-name.
     * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
     * 
     * @param   elementName string  name of the element to find the SchemaElement for
     * @return  object              SchemaElement-object, or undefined if none is found
     */
    _element.getSchemaElementForElementName = function (elementName) {
        if (elementName == '#text') {
            // no special handling for mixed nodes, they do have a #text-SchemaElement already!
            // text-nodes may be allowed. we will see ...
            if (false === isTextContentAllowed()) {
                return undefined;
            }

            // text-content is always a simple string
            var tmpXML = $('<element />', _schema.getSchemaDOM()).attr({name: '#text', type: 'xsd:string'});
            var tmpSchemaElement = new SchemaElement(tmpXML, _schema);
            return tmpSchemaElement;
        }
        
        
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._choice == undefined) {
            // when there is no choice, then there is no allowed element
            return undefined;
        }
        
        // go over our choice, if the element is allowed with it
        if (allowedContent._choice.isElementAllowed(elementName)) {
            // only look in this tree, if the element is allowed there.
            return allowedContent._choice.getSchemaElementForElementName(elementName);
        }
        
        return undefined;
    };
    
    /**
     * return the DOM this Schema is based on
     * 
     * @return  object  DOM of $xsd
     */
    _element.getSchemaDOM = function () {
        return _schema.getSchemaDOM();
    }
    
    /**
     * check if a given value is valid for this element
     * 
     * @param   value   string  value to check
     * @return  boolean         is it valid?
     */
    _element.isValueValid = function (value) {
        if (false == isTextContentAllowed()) {
            // if no text-content is allowed, then it can not be valid
            return false;
        }
        
        if (true === _element.isMixed) {
            // mixed is always good!
            return true;
        }
        
        return allowedContent._text.isValueValid(value);
    }
    
    
    /**
     * the schema where this element comes from
     * @var object  Schema
     */
    var _schema = schema;
    if (_schema == undefined) {
        throw 'programming error, schema is not defined';
    }
    
    /**
     * the original node from the Schema
     * @var object  jQuery-enhanced DOM-node
     */
    var $e = $(node);    
    
    /**
     * get and set the type-node for the element
     * @var object  Type-Node (most certainly a complexType)
     */
    var $type = getTypeNode();
    

    /**
     * get and set the name of the node
     * @var string  Name of the element
     */
    _element.name = getElementName($e);
    
    /**
     * get and set the list of allowed attributes
     * @var array   List of SchemaAttribute-objects
     */
    _element.allowedAttributes = getAllowedAttributes();
    
    /**
     * can the node have immediate content?
     * @var object  list of allowed contents
     */
    var allowedContent = {
                                _choice: undefined,
                                _text: false,
                                };
                                
    var bounds = {
                    min: $e.attr('minOccurs') != undefined ? $e.attr('minOccurs') : 0,
                    max: $e.attr('maxOccurs') != undefined ? $e.attr('maxOccurs') : 'unbounded',
                    };

                                
    /**
     * is this element of mixed nature (text and nodes as value)
     * @var boolean
     */
    _element.isMixed = $type.is('[mixed=true]');
                                
    /**
     * has allowedContent already been parsed?
     * @var boolean has it?
     */
    var allowedContentLoaded = false;
}

/**
 * a group of elements
 * 
 * @param   node    DOMNode the group-node
 * @param   schema  Schema  the corresponding schema
 */
var SchemaGroup = function (node, schema) {
    /*
     * us
     * @var object
     */
    var _group = this;
    
    /**
     * our node
     * @var object
     */
    var $n = $(node);
    
    /**
     * the schema we belong to
     * @var object
     */
    var _schema = schema;
    if (_schema == undefined) {
        throw 'programming error, schema is not defined';
    }
    
    /**
     * does this group have a choice?
     * 
     * @return  boolean
     */
    _group.hasChoice = function () {
        return $n.children(fixNamespace('xsd\\:choice')).length == 1;
    }
    
    /**
     * get the SchemaChoice-Element of this group
     * 
     * @return  object  SchemaChoice-object, or undefined if none
     */
    _group.getChoice = function () {
        if (false === _group.hasChoice) {
            return undefined;
        }
        
        var choiceNode = $n.children(fixNamespace('xsd\\:choice'))[0];
        var choice = new SchemaChoice(choiceNode, _schema);
        
        return choice;
    }
}


/**
 * a single choice.
 * may be recursive
 * 
 * @param   node    DOMNode the choice-node
 * @param   schema  Schema  the corresponding schema
 */
var SchemaChoice = function (node, schema) {
    /**
     * us
     * @var object
     */
    var _choice = this;
    
    /**
     * parse a list of elements in a choice, even go deep down for sub-choices
     * 
     * @param   choiceNode  object  the node to parse
     * @return  object              the data of said choide-node
     */
    var parseChoice = function () {
        _choice.bounds = {
                        min: $n.attr('minOccurs') != undefined ? $n.attr('minOccurs') : 1, // default is 1
                        max: $n.attr('maxOccurs') != undefined ? $n.attr('maxOccurs') : 1, // default is 1
                        };
        
        var subElements = $n.find(fixNamespace('> xsd\\:element'));
        subElements.each(function () {
            var subElement = new SchemaElement(this, _schema);
            var name = subElement.name;
            allowedElements[name] = subElement;
        });
        
        var subChoices = $n.find(fixNamespace('> xsd\\:choice'));
        if (subChoices.length > 0) {
            // choice may appear only once as per the recommendation of the W3C for XSD
            subChoice = new SchemaChoice(subChoices.get(), _schema);
        }
        
        // each choice may have elements of type group, which themselves may carry choices
        var groups = $n.find(fixNamespace('> xsd\\:group'));
        $.each(groups, function (k, groupNode) {
            groupNode = $(groupNode);
            if (groupNode.is('[ref]')) {
                // find the node refereced by the element.
                groupNode = _schema.getReferencedNode('group', groupNode.attr('ref'));
            }
            
            var $group = new SchemaGroup(groupNode, _schema);
            
            if (true === $group.hasChoice()) {
                // this group has a choice, so we need to add its elements to ourselves
                // this is not really clean, but as we do not honour maxOccurs/minOccurs that closely, it is ok for now
                $.extend(allowedElements, $group.getChoice().getAllowedElements(true));
            }
        });
    }
    
    /**
     * is an element (specified by its name) allowed in this choice?
     * Goes recursive.
     * Does NOT check bounds! Does NOT check dependencies!
     * 
     * @param   element string  the element we check for
     * @return  boolean         is it allowed?
     */
    _choice.isElementAllowed = function (element) {
        if (typeof allowedElements[element] != 'undefined') {
            // this element is immediately allowed
            return true;
        }
        
        // go over the list of sub-choices and check, if the element is allowed with them
        var result = false;
        if (subChoice != undefined) {
            result = result || subChoice.isElementAllowed(element);
        }
        
        return result;
    }
    
    /**
     * get the SchemaElement-object for a certain element-name.
     * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
     * 
     * @param   elementName string  name of the element to find the SchemaElement for
     * @return  object              SchemaElement-object, or undefined if none is found
     */
    _choice.getSchemaElementForElementName = function (elementName) {
        if (typeof allowedElements[elementName] != 'undefined') {
            // this element is immediately allowed
            return allowedElements[elementName];
        }
        
        // go over the list of sub-choices and check, if the element is allowed with them
        if (subChoice != undefined) {
            if (subChoice.isElementAllowed(elementName)) {
                // only look in this tree, if the element is allowed there.
                return subChoice.getSchemaElementForElementName(elementName);
            }
        }

        // can not find any reason why elementName is allowed with us...
        return undefined;
    }
    
    /**
     * get the elements allowed for this choice
     * 
     * @param   recursive   boolean recursive?
     * @return  object      list of allowed elements, key is the name
     */
    _choice.getAllowedElements = function (recursive) {
        var myAllowedElements = allowedElements;
        
        if (true == recursive) {
            if (subChoice != undefined) {
                var subAllowedElements = subChoice.getAllowedElements(recursive);
                $.extend(myAllowedElements, subAllowedElements);
            }
        }
        
        return myAllowedElements;
    }
    
    /**
     * tell us, if this choice has children.
     * If so, other parts of the programming may need to change their behaviour concerning bounds
     * 
     * @return  boolean
     */
    _choice.hasSubChoice = function () {
        return (subChoice != undefined);
    }
    
    /**
     * our node
     * @var object
     */
    var $n = $(node);
    
    /**
     * the schema we belong to
     * @var object
     */
    var _schema = schema;
    if (_schema == undefined) {
        throw 'programming error, schema is not defined';
    }
    
    /**
     * list of elements that are allowed as per our own definition
     * @var object
     */
    var allowedElements = {};
    
    /**
     * array of sub-choices that are defined
     * @var array
     */
    var subChoice = undefined;
    
    /**
     * bounds for this choice
     * @var object
     */
    _choice.bounds = {  
                        min: undefined,
                        max: undefined
                    };
           
    // fill ourselves with data
    parseChoice();
}

/**
 * create a regex-object from a pattern
 * 
 * For some obscure reason, this may not be inside a classes method, or else that class is not instantiateable
 * 
 * @param   input       string  the pattern to match (without //)
 * @param   modifiers   string  modifiers, if any
 * @return  object              RegExp-object
 */
var regexFromString = function (input, modifiers) {
    if (modifiers == undefined) {
        modifiers = '';
    }
    
    return new RegExp(input, modifiers);
}

/**
 * parse a selector and change it, if the underlying browser fiddles with namespaces.
 * 
 * This function will REMOVE the namespace from the selector, if the current browser expects no namespaces.
 * Known for webkit. In some obscure circumstances.
 * 
 * @param   selector    string  the selector to parse
 */
var fixNamespace = function (selector) {
    if (true == $.browser.webkit) {
        // jquery 1.8.2 on webkit expects namespaces in selectors in some cases, and not in others.
        // from my understanding, it expects none when jquery does take care of the selection.
        // this goes for anything with ancestry (>-selector) and anything with defined attributes (e.g. [ref=name])
        // and it is true for selectors with multiple selections, comma-separated.
        // told you, it is bizarre.
        // this is a test-driven result, not knowledge! prone to fail in a future version of jquery :(
        
        if (!selector.match(',')) {
            // only rewrite selector if it is not a list of multiple selections
            selector = selector.replace(/(>\s*)xsd\\:(\S*)/g, '$1$2');
            selector = selector.replace(/xsd\\:(\S*[=]+[^\s,$]*)(\s|,|$)/g, '$1$2');
        }
        
    }
    
    return selector;
}