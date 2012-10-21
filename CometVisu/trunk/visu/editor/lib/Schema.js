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
 */


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
        $('xsd\\:schema > xsd\\:element', $xsd).each(function () {
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
        var $ref = $('xsd\\:schema > xsd\\:' + type + '[name="' + refName + '"]', $xsd);

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
        var $type = $('xsd\\:' + type + 'Type[name="' + name + '"]', $xsd);
        
        if ($type.length != 1) {
            throw 'schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found';
        }
        
        return $type;
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
    var _type = this;
    
    /**
     * parse a node, find it's data (restrictions, extensions, bases ... whatever)
     * 
     * @param   node    DOMNode the node to parse
     */
    var fillNodeData = function (node) {
        var $n = $(node);
        
        if ($n.is('xsd\\:attribute[ref]')) {
            // it's a ref, seek other element!
            var refName = $n.attr('ref');
            $n = _schema.getReferencedNode('attribute', refName);
            
            if ($n.length != 1) {
                throw 'schema/xsd appears to be invalid, can not find element ' + refName;
            }
        }
        
        if ($n.is('xsd\\:attribute[type], xsd\\:element[type]')) {
            // hacked: allow this to be used for attributes
            var baseType = $n.attr('type');
            nodeData.bases.push(baseType);
            _type.baseType = baseType;
            return;
        }
        
        var subNodes = $n.find('> xsd\\:restriction, > xsd\\:extension');
        
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
        
        subNodes.find('> xsd\\:pattern').each(function () {
            var pattern = $(this).attr('value');
            nodeData.pattern.push(pattern);
        });


        subNodes.find('> xsd\\:enumeration').each(function () {
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
        
        if (-1 == _type.baseType.search(/^xsd:/)) {
            // created our own type, will need to find and use it.
            var typeNode = _schema.getTypeNode('simple', _type.baseType);
            var subType = new SchemaSimpleType(typeNode, _schema);
            return subType.isValueValid(value);
        } else {
            // xsd:-namespaces types, those are the originals
            switch (_type.baseType) {
                case 'xsd:string':
                    if (! (typeof(value) == 'string')) {
                        // it's not a string, but it should be.
                        // pretty much any input a user gives us is string, so this is pretty much moot.
                        return false;
                    }
                    break;
                case 'xsd:decimal':
                    if (!value.match(/^[-+]?[0-9]+(\.[0-9]+)?$/)) {
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
    this.isValueValid = function (value) {
        return type.isValueValid(value);
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
    _attribute.isOptional = ($node.attr('use') == 'optional' ? true : false);
    
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
            var $ref = _schema.getReferencedNode('element', $e.attr('ref'));
            
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
            $type = $e.find('xsd\\:complexType');
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
        
        if ($type.children('xsd\\:simpleContent').length > 0) {
            // it's simpleContent? Then it's either extension or restriction
            // anyways, we will handle it, as if it were a simpleType
            allowedContent._text = new SchemaSimpleType($type.children('xsd\\:simpleContent'), _schema);
        } else if ($type.children('xsd\\:choice').length > 0) {
            // we have a choice. or some choices. great
            $type.children('xsd\\:choice').each(function () {
                allowedContent._choice.push(new SchemaChoice(this, _schema));
            });
        } else if ($type.is('[type]') && $type.attr('type').match(/^xsd:/)) {
            // this is a really simple node that defines its own baseType
            allowedContent._text = new SchemaSimpleType($type, _schema);
        } else if ($type.children('xsd\\:sequence').length > 0) {
            // sequence is not yet supported
            throw 'schema/xsd is not compatible, unsupported node ' + $e;
        } else {
            // no type, no children, no choice - this is an element with NO allowed content/children
            return allowedContent;
        }
        
        
        var children = $type.find('> xsd\\:element', $e);
        children.each(function () {
            allowedContent[name] = new SchemaElement(this);
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
        if (allowedContent._choice.length > 0) {
            $.each(allowedContent._choice, function (i, subChoice) {
                $.extend(allowedElements, subChoice.getAllowedElements(true));
            });
        }
        
        return allowedElements;
    }
    
    /**
     * get a list of allowed attributes for this element
     * 
     * @return  array   list of SchemaAttributes
     */
    var getAllowedAttributes = function () {
        var allowedAttributes = {};
        
        // allowed attributes
        var attributes = $type.find('> xsd\\:attribute, > xsd\\:simpleContent > xsd\\:extension > xsd\\:attribute');
               
        // now add any attribute that comes from an attribute-group
        var attributeGroups = $type.find('> xsd\\:attributeGroup, > xsd\\:simpleContent > xsd\\:extension > xsd\\:attributeGroup')
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
            
            $attributeGroup.children('xsd\\:attribute').each(function () {
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
     * check if an element (specified by its name) is allowed as one of our immediate children
     * Goes recursive if we have choices.
     * 
     * @param   child   string  name of the element we want to check
     * @return  boolean         is this element allowed?
     */
    _element.isChildElementAllowed = function (child) {
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._choice == undefined || allowedContent._choice.length == 0) {
            // when there is no choice, then there is no allowed element
            return false;
        }
        
        // go over all choices, and see, if this child is allowed
        var result = false;
        $.each(allowedContent._choice, function (i, choice) {
            result = result || choice.isElementAllowed(child);
        })
        
        return result;
    }

    /**
     * get the SchemaElement-object for a certain element-name.
     * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
     * 
     * @param   elementName string  name of the element to find the SchemaElement for
     * @return  object              SchemaElement-object, or undefined if none is found
     */
    _element.getSchemaElementForElementName = function (elementName) {
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._choice == undefined || allowedContent._choice.length == 0) {
            // when there is no choice, then there is no allowed element
            return undefined;
        }
        
        // go over the list of sub-choices and check, if the element is allowed with them
        var element = undefined;
        $.each(allowedContent._choice, function (i, choice) {
            if (element) {
                // don't look any further if we already have our element
                return;
            }
            
            if (choice.isElementAllowed(elementName)) {
                // only look in this tree, if the element is allowed there.
                element = choice.getSchemaElementForElementName(elementName);
            }
        });
        
        return element;
    }

    /**
     * check if a given value is valid for this element
     * 
     * @param   value   string  value to check
     * @return  boolean         is it valid?
     */
    _element.isValueValid = function (value) {
        if (_element.isMixed == true) {
            // mixed follows no rules!
            return true;
        }
        
        // first, get a list of allowed content (don't worry, it's cached)
        var allowedContent = _element.getAllowedContent();
        
        if (allowedContent._text == undefined || allowedContent._text == false) {
            // if no text is allowed, the it can not be valid. period.
            return false;
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
                                _choice: [],
                                _text: false,
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
                        min: $n.attr('minOccurs'),
                        max: $n.attr('maxOccurs'),
                        };
        
        var subElements = $n.find('> xsd\\:element');
        subElements.each(function () {
            var subElement = new SchemaElement(this, _schema);
            var name = subElement.name;
            allowedElements[name] = subElement;
        });
        
        var subChoices = $n.find('> xsd\\:choice');
        subChoices.each(function () {
            var subChoice = new SchemaChoice(this, _schema);
            allowedSubChoices.push(subChoice);
        })
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
        $.each(allowedSubChoices, function (i, subChoice) {
            result = result || subChoice.isElementAllowed(element);
        });
        
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
        var element = undefined;
        $.each(allowedSubChoices, function (i, subChoice) {
            if (element) {
                // don't look any further if we already have our element
                return;
            }
            
            if (subChoice.isElementAllowed(elementName)) {
                // only look in this tree, if the element is allowed there.
                element = subChoice.getSchemaElementForElementName(elementName);
            }
        });
        
        return element;
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
            $.each(allowedSubChoices, function (i, subChoice) {
                var subAllowedElements = subChoice.getAllowedElements(recursive);
                
                $.extend(myAllowedElements, subAllowedElements);
            });
        }
        
        return myAllowedElements;
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
    var allowedSubChoices = [];
    
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
function regexFromString(input, modifiers) {
    if (modifiers == undefined) {
        modifiers = '';
    }
    
    return new RegExp(input, modifiers);
}