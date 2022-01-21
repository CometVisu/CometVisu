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

var xsdNamespaceResolver = function(prefix) {
  if (prefix == "xsd")
    return "http://www.w3.org/2001/XMLSchema";
  if (prefix == "xml")
    return "http://www.w3.org/XML/1998/namespace";
  console.log("Unknown prefix: " + prefix);
}

/**
 * Object to translate references in the XSD annotation elements to link
 * to the online documentation.
 * @var object
 */
var documentationMapping;
if (typeof window.documentationMappingPrefix === 'undefined') {
  window.documentationMappingPrefix = "";
}
$.getJSON( window.documentationMappingPrefix+'lib/DocumentationMapping.json', function( json ){
  documentationMapping = json;
});

/**
 * starting-point for a javascript-representation of the XSD
 * 
 * @param   filename    string  filename of the schema, including a relative path
 */
var Schema = function (filename, content) {
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
   * cache for referenced nods
   * @var object
   */
  var referencedNodeCache = {};
    
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
    if (typeof referencedNodeCache[type] != 'undefined' && typeof referencedNodeCache[type][refName] != 'undefined') {
      return referencedNodeCache[type][refName];
    }
        
    var selector = 'xsd\\:schema > xsd\\:' + type + '[name="' + refName + '"]';
    selector = fixNamespace(selector);
    var $ref = $(selector, $xsd);

    if ($ref.is('[ref]')) {
      // do it recursively, if necessary
      $ref = _schema.getReferencedNode(type, $ref.attr('ref'));
    }

    if (typeof referencedNodeCache[type] == 'undefined') {
      referencedNodeCache[type] = {};
    }
        
    // fill the cache
    referencedNodeCache[type][refName] = $ref;

    return $ref;
  }
    
  /**
   * cache for getTypeNode
   * @var object
   */
  var typeNodeCache = {};
    
  /**
   * get the definition of a type, be it complex or simple
   * 
   * @param   type    string  Type of type to find (either simple or complex)
   * @param   name    string  Name of the type to find
   */
  _schema.getTypeNode = function (type, name) {

    if (typeof typeNodeCache[type] != 'undefined' && typeof typeNodeCache[type][name] != 'undefined') {
      return typeNodeCache[type][name];
    }

    var selector = fixNamespace('xsd\\:' + type + 'Type[name="' + name + '"]');
    var $type = $(selector, $xsd);
        
    if ($type.length != 1) {
      throw 'schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found';
    }

    if (typeof typeNodeCache[type] == 'undefined') {
      typeNodeCache[type] = {};
    }

    // fill the cache
    typeNodeCache[type][name] = $type;

    return $type;
  }
    
  /**
   * cache for #text-SchemaElement
   * @var object
   */
  var textNodeSchemaElement = undefined;
    
  /**
   * get a SchemaElement for a #text-node
   * 
   * @return  object  SchemaElement for #text-node
   */
  _schema.getTextNodeSchemaElement = function () {
    if (textNodeSchemaElement == undefined) {
      // text-content is always a simple string
      var tmpXML = $('<element />', _schema.getSchemaDOM()).attr({name: '#text', type: 'xsd:string'});
      textNodeSchemaElement = new SchemaElement(tmpXML, _schema);
    } 

    return textNodeSchemaElement;
  }
    
  /**
   * get the DOM for this Schema
   * 
   * @return  object  DOM
   */
  _schema.getSchemaDOM = function () {
    return $xsd;
  }

  if (!content) {
    cacheXSD();
  } else {
    $xsd = $(content);

    // parse the data, to have at least a list of root-level-elements
    parseXSD();

    // tell everyone that we are done!
    $(document).trigger('schema_loaded');
  }
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
            
      if (!baseType.match(/^xsd:/)) {
        // if it's not an xsd-default-basetype, we need to find out what it is
        var subnode = _schema.getReferencedNode('simpleType', baseType)
        fillNodeData(subnode);
      } else {
        _type.baseType = baseType;
      }
      // is this attribute optional?
      nodeData.isOptional = $n.is('[use="optional"]');

      return;
    }
        
    var subNodes = $n.find(fixNamespace('> xsd\\:restriction, > xsd\\:extension, > xsd\\:simpleType > xsd\\:restriction, > xsd\\:simpleType > xsd\\:extension'));
        
    subNodes.each(function () {
      var baseType = $(this).attr('base');
            
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

    if (_type.baseType == undefined) {
      _type.baseType = 'xsd:anyType';
    }
    nodeData.bases.push(_type.baseType);
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
        case 'xsd:anyURI':
        case 'xsd:anyType':
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
        case 'xsd:unsignedByte':
        case 'xsd:nonNegativeInteger':
          if (!value.match(/^[+]?[0-9]+$/)) {
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
          throw 'not implemented baseType ' + _type.baseType;
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
   * cache for getAppinfo
   * @var array
   */
  var appinfoCache = undefined;
    
  /**
   * get the appinfo information from the attribute, if any
   * 
   * @return  array   list of texts, or empty list if none
   */
  _attribute.getAppinfo = function () {
    if (undefined != appinfoCache) {
      return appinfoCache;
    }

    var appinfo = [];
        
    // any appinfo this element itself might carry
    $.each($node.xpath('xsd:annotation/xsd:appinfo', xsdNamespaceResolver), function (i, appinfoNode) {
      var appinfoNodeText = $(appinfoNode).text();
      appinfo.push(appinfoNodeText);
    });

    if ($node.is('[ref]')) {
      // the attribute is a reference, so take appinfo from there, too

      var refName = $node.attr('ref');
      var $ref = _schema.getReferencedNode('attribute', refName);

      $.each($ref.xpath('xsd:annotation/xsd:appinfo', xsdNamespaceResolver), function (i, appinfoNode) {
        var appinfoNodeText = $(appinfoNode).text();
        appinfo.push(appinfoNodeText);
      });
    }
        
    // fill the cache
    appinfoCache = appinfo;
        
    return appinfo;
  };  

  /**
   * cache for getDocumentation
   * @var array
   */
  var documentationCache = undefined;
  
  /**
   * Transform documentation text to link to the online documentation when it
   * contains a reference.
   * 
   * @return string The transformed input string.
   */
  function createDocumentationWebLinks( text )
  {
    return text.replace(new RegExp( ":ref:[`'](.+?)[`']", 'g'), function(match, contents){
      var 
        reference = contents.match( /^(.*?) *<([^<]*)>$/ ),
        label     = reference ? reference[1] : contents,
        key       = reference ? reference[2] : contents,
        language  = 'de'; // TODO handle other languages as well, don't hard code!
      
      return '<a class="doclink" target="_blank" href="' + documentationMapping._base + language + documentationMapping[key] + '">' + label + '</a>';
    });
  }
  
  /**
   * get the documentation information from the attribute, if any
   * 
   * @return  array   list of texts, or empty list if none
   */
  _attribute.getDocumentation = function () {
    if (undefined != documentationCache) {
      return documentationCache;
    }
        
    var documentation = [];
        
    var lang = Messages.language;
    var selector = 'xsd:annotation/xsd:documentation[@xml:lang=\'' + lang + '\']';
        
    // any appinfo this element itself might carry
    $.each($node.xpath(selector, xsdNamespaceResolver), function (i, documentationNode) {
      var documentationNodeText = $(documentationNode).text();
      documentation.push(createDocumentationWebLinks(documentationNodeText));
    });

    if ($node.is('[ref]')) {
      // the attribute is a reference, so take appinfo from there, too

      var refName = $node.attr('ref');
      var $ref = _schema.getReferencedNode('attribute', refName);

      $.each($ref.xpath(selector, xsdNamespaceResolver), function (i, documentationNode) {
        var documentationNodeText = $(documentationNode).text();
        documentation.push(createDocumentationWebLinks(documentationNodeText));
      });
    }
            
    // fill the cache
    documentationCache = documentation;
       
    return documentation;
  };  


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
   * a default-value for this element
   * defaults to undefined
   * @var string
   */
  _attribute.defaultValue = $node.attr('default');

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
   * type of this object
   * @var string
   */
  _element.type = 'element';
    
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
    // can be either simpleContent, or (choice|sequence|group|all)?
    // 'all' is not supported yet.
        
    if ($type.children(fixNamespace('xsd\\:simpleContent')).length > 0) {
      // it's simpleContent? Then it's either extension or restriction
      // anyways, we will handle it, as if it were a simpleType
      allowedContent._text = new SchemaSimpleType($type.children(fixNamespace('xsd\\:simpleContent')), _schema);
    } else if ($type.children(fixNamespace('xsd\\:choice, xsd\\:sequence, xsd\\:group')).length > 0) {
      // we have a choice, group or sequence. great
      // as per the W3C, only one of these may appear per element/type
            
      var tmpDOMGrouping = $type.children(fixNamespace('xsd\\:choice, xsd\\:sequence, xsd\\:group')).get(0);
            
      // create the appropriate Schema*-object and append it to this very element
      switch (tmpDOMGrouping.nodeName) {
        case 'xsd:choice':
        case 'choice':
          allowedContent._grouping = new SchemaChoice(tmpDOMGrouping, _schema);
          break;
        case 'xsd:sequence':
        case 'sequence':
          allowedContent._grouping = new SchemaSequence(tmpDOMGrouping, _schema);
          break;
        case 'xsd:group':
        case 'group':
          allowedContent._grouping = new SchemaGroup(tmpDOMGrouping, _schema);
          break;
        case 'xsd:any':
        case 'any':
          allowedContent._grouping = new SchemaAny(tmpDOMGrouping, _schema)
          break;
      }
            
      delete tmpDOMGrouping;
    } else if ($type.is('[type]') && $type.attr('type').match(/^xsd:/)) {
      // this is a really simple node that defines its own baseType
      allowedContent._text = new SchemaSimpleType($type, _schema);
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
   * is this element sortable?
   * This is not the case if this element is an immediate child of a sequence.
   * 
   * @param   sortable    boolean is sortable?
   */
  _element.setIsSortable = function (sortable) {
    isElementSortable = sortable;
  };

  /**
   * is this element sortable?
   * This is not the case if this element is an immediate child of a sequence.
   * 
   * @return  boolean is sortable?
   */
  _element.isSortable = function () {
    return isElementSortable;
  };
    
  /**
   * are this elements children sortable? this is not the case if a sequence is used, e.g.
   * 
   * @return  boolean     are children sortable?
   */
  _element.areChildrenSortable = function () {
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping == undefined) {
      return undefined;
    }
        
    // the inverse of "do the elements have a given order?"
    return !allowedContent._grouping.elementsHaveOrder;
  };

    
  /**
   * get a list of required elements.
   * if an element is required multiple times, it is listed multiple times
   * 
   * @return  array   list of required elements
   */
  _element.getRequiredElements = function () {
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping != undefined) {
      // we do have a grouping as a child
      return allowedContent._grouping.getRequiredElements();
    }
        
    // there is no grouping, hence no elements defined as children
    return [];
  }; 

  /**
   * get a list of all allowed elements for this element
   * 
   * @return  object  list of SchemaElement-elements, key is the name
   */
  _element.getAllowedElements = function () {
    var allowedContent = _element.getAllowedContent();
        
    var allowedElements = {};
    if (allowedContent._grouping != undefined) {
      $.extend(allowedElements, allowedContent._grouping.getAllowedElements());
    }

        
    if (true === _element.isMixed) {
      // mixed elements are allowed to have #text-nodes
      allowedElements['#text'] = _schema.getTextNodeSchemaElement();
    }

    return allowedElements;
  }
    
  /**
   * get the sorting of the allowed elements.
   * 
   * @return  object              list of allowed elements, with their sort-number as value
   */
  _element.getAllowedElementsSorting = function () {
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping != undefined) {
      return allowedContent._grouping.getAllowedElementsSorting();
    }

    return undefined;
  }    
    
  /**
   * get the bounds for this elements children (as defined by a choice)
   * 
   * @return  object  bounds ({min: x, max: y})
   */
  _element.getChildBounds = function () {
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping == undefined) {
      // no choice = no idea about bounds
      return undefined;
    }
        
    if (true === allowedContent._grouping.hasMultiLevelBounds()) {
      // if our choice has sub-choices, then we have not fucking clue about bounds (or we can not process them)
      return undefined;
    }
        
    return allowedContent._grouping.getBounds();
  }

  /**
   * get the bounds for a specific element-name
   * will go through all of the groupings-tree to find out, just how many elements of this may appear
   * 
   * @param   childName   string  name of the child-to-be
   * @return  object              {min: x, max: y}
   */
  _element.getBoundsForElementName = function (childName) {
    var allowedContent = _element.getAllowedContent();
        
    return allowedContent._grouping.getBoundsForElementName(childName);
  };
    
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
  _element.isTextContentAllowed = function () {
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
      return _element.isTextContentAllowed();
    }
        
    // first, get a list of allowed content (don't worry, it's cached)
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping == undefined) {
      // when there is no choice, then there is no allowed element
      return false;
    }
        
    // see, if this child is allowed with our choice
    if (allowedContent._grouping != undefined) {
      return allowedContent._grouping.isElementAllowed(child);
    }
        
    // no reason why we should have allowed this element.
    return false;
  }
    
  /**
   * cache for getAppinfo
   * @var array
   */
  var appinfoCache = undefined;
    
  /**
   * get the appinfo information from the element, if any
   * 
   * @return  array   list of texts, or empty list if none
   */
  _element.getAppinfo = function () {
    if (undefined != appinfoCache) {
      return appinfoCache;
    }
        
    var appinfo = [];
        
    // any appinfo this element itself might carry
    $.each($e.xpath('xsd:annotation/xsd:appinfo', xsdNamespaceResolver), function (i, appinfoNode) {
      var appinfoNodeText = $(appinfoNode).text();
      appinfo.push(appinfoNodeText);
    });
        
    // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
    if ($e.find(fixNamespace('> xsd\\:complexType')).length == 0) {
      $.each($type.xpath('xsd:annotation/xsd:appinfo', xsdNamespaceResolver), function (i, appinfoNode) {
        var appinfoNodeText = $(appinfoNode).text();
        appinfo.push(appinfoNodeText);
      });
    }
        
    // fill the cache
    appinfoCache = appinfo;
        
    return appinfo;
  };


  /**
   * cache for getDocumentation
   * @var array
   */
  var documentationCache = undefined;
   
  /**
   * get the documentation information from the element, if any
   * 
   * @return  array   list of texts, or empty list if none
   */
  _element.getDocumentation = function () {
    if (undefined != documentationCache) {
      return documentationCache;
    }
        
    var documentation = [];
        
    var lang = Messages.language;
    var selector = 'xsd:annotation/xsd:documentation[@xml:lang=\'' + lang + '\']';

    // any appinfo this element itself might carry
    $.each($e.xpath(selector, xsdNamespaceResolver), function (i, documentationNode) {
      var documentationNodeText = $(documentationNode).text();
      documentation.push(documentationNodeText);
    });
        
    // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
    if ($e.find(fixNamespace('> xsd\\:complexType')).length == 0) {
      $.each($type.xpath(selector, xsdNamespaceResolver), function (i, documentationNode) {
        var documentationNodeText = $(documentationNode).text();
        documentation.push(documentationNodeText);
      });
    }
        
    documentationCache = documentation;
        
    return documentation;        
  };  

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
      if (false === _element.isTextContentAllowed()) {
        return undefined;
      }

      return _schema.getTextNodeSchemaElement();
    }
        
        
    // first, get a list of allowed content (don't worry, it's cached)
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping == undefined) {
      // when there is no choice, then there is no allowed element
      return undefined;
    }
        
    // go over our choice, if the element is allowed with it
    if (allowedContent._grouping.isElementAllowed(elementName)) {
      // only look in this tree, if the element is allowed there.
      return allowedContent._grouping.getSchemaElementForElementName(elementName);
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
    if (false == _element.isTextContentAllowed()) {
      // if no text-content is allowed, then it can not be valid
      return false;
    }
        
    if (true === _element.isMixed) {
      // mixed is always good!
      return true;
    }
        
    var allowedContent = _element.getAllowedContent();
        
    return allowedContent._text.isValueValid(value);
  }
    
  /**
   * create and retrieve the part of a regular expression which describes this very element
   * 
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @param   nocapture   bool    when set to true non capturing groups are used
   * @return  string
   */
  _element.getRegex = function (separator, nocapture) {
    if (typeof separator == 'undefined' || separator == undefined) {
      // default to an empty string
      separator = '';
    }

    var regexString = '(';
    if( nocapture )
      regexString += '?:';
        
    // start with the name of the element
    regexString += _element.name + separator + ')';
        
    // append bounds
    var boundsMin = '';
    var boundsMax = '';
        
    if (bounds.min != undefined) {
      if (bounds.min != 'unbounded') {
        boundsMin = bounds.min;
      }
    }
        
    if (bounds.max != undefined) {
      if (bounds.max != 'unbounded') {
        boundsMax = bounds.max;
      }
    }
        
    if (boundsMin != '' || boundsMax != '') {
      // append bounds to the regex-string
      regexString += '{' + boundsMin + ',' + boundsMax + '}';
    }
        
    // and thats all
    return regexString;
  };
    
  /**
   * create a full-blown regular expression that describes this elements immediate children
   * 
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @return  string              the regular expression
   */
  _element.getChildrenRegex = function(separator, nocapture) {
    if (typeof separator == 'undefined' || separator == undefined) {
      // default to an empty string
      separator = '';
    }
        
    var allowedContent = _element.getAllowedContent();
        
    if (allowedContent._grouping == undefined) {
      // not really something to match
      return '^';
    }
        
    var regexString = allowedContent._grouping.getRegex(separator, nocapture);

    // now
    return regexString;
  };
    
    
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
    _grouping: undefined,
    _text: false,
  };
                                
  var bounds = {
    min: $e.attr('minOccurs') != undefined ? $e.attr('minOccurs') : 0,
    max: $e.attr('maxOccurs') != undefined ? $e.attr('maxOccurs') : 'unbounded',
  };

  /**
   * is this element sortable?
   * @var boolean
   */
  var isElementSortable = undefined;
                                
  /**
   * is this element of mixed nature (text and nodes as value)
   * @var boolean
   */
  _element.isMixed = $type.is('[mixed=true]');
    
  /**
   * a default-value for this element
   * defaults to undefined
   * @var string
   */
  _element.defaultValue = $e.attr('default');
                                
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
   * type of this object
   * @var string
   */
  _choice.type = 'choice';
    
  /**
   * elements in a choice do not need to be in a specific order
   * @var boolean
   */
  _choice.elementsHaveOrder = false;
    
  /**
   * parse a list of elements in this choice.
   * Choice is allowed (element|choice|sequence|group|any)* as per the definition.
   * We do all of those (except for 'any')
   */
  var parse = function () {
    bounds = {
      min: $n.attr('minOccurs') != undefined ? $n.attr('minOccurs') : 1, // default is 1
      max: $n.attr('maxOccurs') != undefined ? $n.attr('maxOccurs') : 1, // default is 1
    };
        
    var subElements = $n.find(fixNamespace('> xsd\\:element'));
    subElements.each(function () {
      var subElement = new SchemaElement(this, _schema);
      subElement.setIsSortable(true);
      var name = subElement.name;
      allowedElements[name] = subElement;
    });

    // choices
    $.each($n.find(fixNamespace('> xsd\\:choice')), function (i, grouping) {
      subGroupings.push(new SchemaChoice(grouping, _schema));
    });
        

    // sequences
    $.each($n.find(fixNamespace('> xsd\\:sequence')), function (i, grouping) {
      subGroupings.push(new SchemaSequence(grouping, _schema));
    });

    // groups
    $.each($n.find(fixNamespace('> xsd\\:group')), function (i, grouping) {
      subGroupings.push(new SchemaGroup(grouping, _schema));
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
        
    // go over the list of subGroupings and check, if the element is allowed with any of them
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(element)) {
        return true;
      }
    }
        
    return false;
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
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(elementName)) {
        // this element is allowed
        return subGroupings[i].getSchemaElementForElementName(elementName);
      }
    }

    // can not find any reason why elementName is allowed with us...
    return undefined;
  }
    
  /**
   * get a list of required elements.
   * if an element is required multiple times, it is listed multiple times
   * 
   * @return  array   list of required elements
   */
  _choice.getRequiredElements = function () {
    // a choice has no defined required elements
    // if you want required elements, use sequence or all
    return [];
  };
    
  /**
   * get the elements allowed for this choice
   * 
   * @return  object      list of allowed elements, key is the name
   */
  _choice.getAllowedElements = function () {
    var myAllowedElements = {};
        
    $.each(allowedElements, function (name, item) {
      myAllowedElements[name] = item;
    });
        
    // also the elements allowed by our sub-choices etc.
    $.each(subGroupings, function (i, grouping) {
      $.extend(myAllowedElements, grouping.getAllowedElements());
    });
        
    return myAllowedElements;
  }
    
    
  /**
   * get the sorting of the allowed elements.
   * For a choice, all elements have the same sorting, so they will all have the
   * same sortnumber
   * 
   * Warning: this only works if any element can have only ONE position in the parent.
   * 
   * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
   * @return  object              list of allowed elements, with their sort-number as value
   */
  _choice.getAllowedElementsSorting = function (sortnumber) {
        
    var namesWithSorting = {};
        
    // all elements allowed directly
    $.each(allowedElements, function (i, item) {
      var mySortnumber = 'x'; // for a choice, sortnumber is always the same
      if (sortnumber !== undefined) {
        mySortnumber = sortnumber + '.' + mySortnumber;
      }
            
      if (item.type == 'element') {
        namesWithSorting[item.name] = mySortnumber;
      } else {
        // go recursive
        var subSortedElements = item.getAllowedElementsSorting(mySortnumber);
        $.extend(namesWithSorting, subSortedElements);
      }
    });

    // all elements allowed by subGroupings
    $.each(subGroupings, function (i, item) {
      var mySortnumber = 'x'; // for a choice, sortnumber is always the same
      if (sortnumber !== undefined) {
        mySortnumber = sortnumber + '.' + mySortnumber;
      }
            
      if (item.type == 'element') {
        namesWithSorting[item.name] = mySortnumber;
      } else {
        // go recursive
        var subSortedElements = item.getAllowedElementsSorting(mySortnumber);
        $.extend(namesWithSorting, subSortedElements);
      }
    });


    return namesWithSorting;
  }
    
  /**
   * cache for getRegex
   * @var string
   */
  var regexCache = undefined;

  /**
   * get a regex (string) describing this choice
   * 
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @param   nocapture   bool    when set to true non capturing groups are used
   * @return  string  regex
   */
  _choice.getRegex = function (separator, nocapture) {
    if (regexCache != undefined) {
      // use the cache if primed
      return regexCache;
    }
        
    var regexString = '';
        
        
    // create list of allowed elements
    regexString = '(';
    if( nocapture )
      regexString += '?:';
        
    var elementRegexes = [];
        
    $.each(allowedElements, function (name, element) {
      elementRegexes.push(element.getRegex(separator, nocapture));
    });
        
    // also collect the regex for each and every grouping we might have
    $.each(subGroupings, function (i, grouping) {
      elementRegexes.push(grouping.getRegex(separator, nocapture));
    });

    regexString += elementRegexes.join('|');
        
    regexString += ')';


    // append bounds to regex
    regexString += '{';
    if (bounds.min != 'unbounded') {
      regexString += bounds.min == undefined ? 1 : bounds.min;
    }
    regexString += ',';
    if (bounds.max != 'unbounded') {
      regexString += bounds.max == undefined ? 1 : bounds.max;
    }
    regexString += '}';
        
    // fill the cache
    regexCache = regexString;
        
    // thats about it.
    return regexString;
  };
    
  /**
   * find out if this Grouping has multi-level-bounds, i.e. sub-groupings with bounds.
   * This makes it more or less impossible to know in advance which elements might be needed
   * 
   * @return  boolean does it?
   */
  _choice.hasMultiLevelBounds = function () {
    if (subGroupings.length > 0) {
      return true;
    }
        
    return false;
  };
    
  /**
   * get the bounds of this very grouping
   * 
   * @return  object  like {min: x, max: y}
   */
  _choice.getBounds = function () {
    return bounds;
  }
    
  /**
   * get bounds for a specific element.
   * Take into account the bounds of the element and/or our own bounds
   * 
   * @param   childName   string  name of the child-to-be
   * @return  object              {max: x, min: y}, or undefined if none found
   */
  _choice.getBoundsForElementName = function (childName) {
    // as we are a choice, we can define the number of occurences for children of ANY level
    if (true === _choice.isElementAllowed(childName)) {
      return _choice.getBounds();
    }
        
    return undefined;
    //        
    //        // if this element is our immediate child, we have to say about bounds
    //        if (typeof allowedElements[childName] !== 'undefined') {
    //            return _choice.getBounds();
    //        }
    //
    //        // though we are a child-element, our sub-grouping might have another saying than we do about the bounds
    //        var childBounds = undefined;
    //        
    //        $.each(subGroupings, function (i, subGroup) {
    //            if (typeof childBounds != 'undefined') {
    //                // do not look further if we already have bounds
    //                return;
    //            }
    //            
    //            // if the subGroup allows this element, we still use our own bounds, as they are superior, and we still
    //            // are a choice!
    //            if (true === subGroup.isElementAllowed(childName)) {
    //                childBounds = _choice.getBounds();
    //            }
    //            
    //        });
    //
    //
    //        return childBounds;
  };
    
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
   * array of sub-choices, -sequences, -groups that are defined
   * @var array
   */
  var subGroupings = [];
    
  /**
   * bounds for this choice
   * @var object
   */
  var bounds = {  
    min: undefined,
    max: undefined
  };
           
  // fill ourselves with data
  parse();
}


/**
 * a single group.
 * may be recursive
 * 
 * @param   node    DOMNode the group-node
 * @param   schema  Schema  the corresponding schema
 */
var SchemaGroup = function (node, schema) {
  /**
   * us
   * @var object
   */
  var _group = this;
    
  /**
   * type of this object
   * @var string
   */
  _group.type = 'group';
    

    
  /**
   * there are no elements in a group...
   * @var boolean
   */
  _group.elementsHaveOrder = undefined;

  /**
   * parse a list of elements in this group.
   * Group is allowed (all|choice|sequence)? as per the definition.
   * We do all of those (except for 'all')
   */
  var parse = function () {
    bounds = {
      min: $n.attr('minOccurs') != undefined ? $n.attr('minOccurs') : 1, // default is 1
      max: $n.attr('maxOccurs') != undefined ? $n.attr('maxOccurs') : 1, // default is 1
    };
        
    var $group = $n;
    if ($group.is('[ref]')) {
      // if this is a reference, unravel it.
      $group = _schema.getReferencedNode('group', $group.attr('ref'));
    }
        
    // we are allowed choice and sequence, but only ONE AT ALL is allowed
    $.each($group.find(fixNamespace('> xsd\\:choice')), function (i, grouping) {
      subGroupings.push(new SchemaChoice(grouping, _schema));
    });
        
    // sequences
    $.each($group.find(fixNamespace('> xsd\\:sequence')), function (i, grouping) {
      subGroupings.push(new SchemaSequence(grouping, _schema));
    });

    // there may be only one, so we simply us the first we found
    if (subGroupings.length > 0) {
      subGroupings = [subGroupings[0]];
    }
  }
    
  /**
   * is an element (specified by its name) allowed in this group?
   * Goes recursive.
   * Does NOT check bounds! Does NOT check dependencies!
   * 
   * @param   element string  the element we check for
   * @return  boolean         is it allowed?
   */
  _group.isElementAllowed = function (element) {
    // go over the list of subGroupings and check, if the element is allowed with any of them
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(element)) {
        return true;
      }
    }
        
    return false;
  }
    
  /**
   * get the SchemaElement-object for a certain element-name.
   * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
   * 
   * @param   elementName string  name of the element to find the SchemaElement for
   * @return  object              SchemaElement-object, or undefined if none is found
   */
  _group.getSchemaElementForElementName = function (elementName) {
    // go over the list of subGroupings and check, if the element is allowed with them
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(elementName)) {
        // this element is allowed
        return subGroupings[i].getSchemaElementForElementName(elementName);
      }
    }

    // can not find any reason why elementName is allowed with us...
    return undefined;
  }
    
    
  /**
   * get a list of required elements.
   * if an element is required multiple times, it is listed multiple times
   * 
   * @return  array   list of required elements
   */
  _group.getRequiredElements = function () {
    // well, maybe a group has required elements, but we have not implemented that
    // so we simple return what our child has to say
    return subGroupings[0].getRequiredElements();
  };    
    
  /**
   * get the elements allowed for this group
   * 
   * @return  object      list of allowed elements, key is the name
   */
  _group.getAllowedElements = function () {
    // we have non of ourselves, so we return what the child says
    return subGroupings[0].getAllowedElements();
  }

  /**
   * get the sorting of the allowed elements.
   * For a group, all elements have the same sorting, so they will all have the
   * same sortnumber
   * 
   * Warning: this only works if any element can have only ONE position in the parent.
   * 
   * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
   * @return  object              list of allowed elements, with their sort-number as value
   */
  _group.getAllowedElementsSorting = function (sortnumber) {
        
    var namesWithSorting = {};
        
    $.each(_group.getAllowedElements(), function (i, item) {
      var mySortnumber = 'x'; // for a group, sortnumber is always the same
      if (sortnumber !== undefined) {
        mySortnumber = sortnumber + '.' + mySortnumber;
      }
            
      if (item.type == 'element') {
        namesWithSorting[item.name] = mySortnumber;
      } else {
        // go recursive
        var subSortedElements = item.getAllowedElementsSorting(mySortnumber);
        $.extend(namesWithSorting, subSortedElements);
      }
    });
        
    return namesWithSorting;
  }
    
  /**
   * cache for getRegex
   * @var string
   */
  var regexCache = undefined;

  /**
   * get a regex (string) describing this choice
   * 
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @param   nocapture   bool    when set to true non capturing groups are used
   * @return  string  regex
   */
  _group.getRegex = function (separator, nocapture) {
    if (regexCache != undefined) {
      // use the cache if primed
      return regexCache;
    }

    var regexString = '';
        
    // collect the regex for each and every grouping we might have;
    // 'each and every' means 'the only ONE'
    $.each(subGroupings, function (i, grouping) {
      regexString = '(';
      if( nocapture )
        regexString += '?:';
      regexString += grouping.getRegex(separator, nocapture) + ')';
    });

    // append bounds to regex
    regexString += '{';
    if (bounds.min != 'unbounded') {
      regexString += bounds.min == undefined ? 1 : bounds.min;
    }
    regexString += ',';
    if (bounds.max != 'unbounded') {
      regexString += bounds.max == undefined ? 1 : bounds.max;
    }
    regexString += '}';
        
    // fill the cache
    regexCache = regexString;
        
    // thats about it.
    return regexString;
  };
    
    
  /**
   * find out if this Grouping has multi-level-bounds, i.e. sub-groupings with bounds.
   * This makes it more or less impossible to know in advance which elements might be needed
   * 
   * @return  boolean does it?
   */
  _group.hasMultiLevelBounds = function () {
    if (subGroupings.length > 0) {
      return true;
    }
        
    return false;
  };
 
     
  /**
   * get the bounds of this very grouping
   * 
   * @return  object  like {min: x, max: y}
   */
  _group.getBounds = function () {
    return bounds;
  }

    
  /**
   * get bounds for a specific element.
   * Take into account the bounds of the element and/or our own bounds
   * 
   * @param   childName   string  name of the child-to-be
   * @return  object              {max: x, min: y}, or undefined if none found
   */
  _group.getBoundsForElementName = function (childName) {
    // we are a group. we have no saying of ourselves
    // (@FIXME: by definition we do, but we do not take that into account)
    return subGroupings[0].getBoundsForElementName(childName);
  };

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
   * array of sub-choices, -sequences, -groups that are defined
   * @var array
   */
  var subGroupings = [];
    
  /**
   * bounds for this choice
   * @var object
   */
  var bounds = {  
    min: undefined,
    max: undefined
  };
           
  // fill ourselves with data
  parse();
}

/**
 * a single sequence.
 * may be recursive
 * 
 * @param   node    DOMNode the sequence-node
 * @param   schema  Schema  the corresponding schema
 */
var SchemaSequence = function (node, schema) {
  /**
   * us
   * @var object
   */
  var _sequence = this;

  /**
   * type of this object
   * @var string
   */
  _sequence.type = 'sequence';

    
  /**
   * elements in a sequence do need a specific order!
   * @var boolean
   */
  _sequence.elementsHaveOrder = true;


  /**
   * parse a list of elements in this sequence.
   * Sequence is allowed (element|choice|sequence|group|any)* as per the definition.
   * We do all of those (except for 'any')
   */
  var parse = function () {
    bounds = {
      min: $n.attr('minOccurs') != undefined ? $n.attr('minOccurs') : 1, // default is 1
      max: $n.attr('maxOccurs') != undefined ? $n.attr('maxOccurs') : 1, // default is 1
    };
        
    // for a sequence, we need to keep the order of the elements
    // so we have to use a 'mixed' approach in reading them
    var subNodes = $n.children();
        
    subNodes.each(function () {
      var $subNode = $(this);
            
      var subObject = undefined;
            
      switch (this.nodeName) {
        case 'xsd:element':
        case 'element':
          subObject = new SchemaElement(this, _schema);
          // sequences' children are non-sortable
          subObject.setIsSortable(false);
          allowedElements[subObject.name] = subObject;
          break;
        case 'xsd:choice':
        case 'choice':
          subObject = new SchemaChoice(this, _schema)
          subGroupings.push(subObject);
          break;
        case 'xsd:sequence':
        case 'sequence':
          subObject = new SchemaSequence(this, _schema)
          subGroupings.push(subObject);
          break;
        case 'xsd:group':
        case 'group':
          subObject = new SchemaGroup(this, _schema)
          subGroupings.push(subObject);
          break;
        case 'xsd:any':
        case 'any':
          subObject = new SchemaAny(this, _schema)
          subGroupings.push(subObject);
          break;
      }
            
      sortedContent.push(subObject);
    });
  };
    
  /**
   * is an element (specified by its name) allowed in this choice?
   * Goes recursive.
   * Does NOT check bounds! Does NOT check dependencies!
   * 
   * @param   element string  the element we check for
   * @return  boolean         is it allowed?
   */
  _sequence.isElementAllowed = function (element) {
    if (typeof allowedElements[element] != 'undefined') {
      // this element is immediately allowed
      return true;
    }
        
    // go over the list of subGroupings and check, if the element is allowed with any of them
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(element)) {
        return true;
      }
    }
        
    return false;
  }
    
  /**
   * get the SchemaElement-object for a certain element-name.
   * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
   * 
   * @param   elementName string  name of the element to find the SchemaElement for
   * @return  object              SchemaElement-object, or undefined if none is found
   */
  _sequence.getSchemaElementForElementName = function (elementName) {
    if (typeof allowedElements[elementName] != 'undefined') {
      // this element is immediately allowed
      return allowedElements[elementName];
    }
        
    // go over the list of sub-choices and check, if the element is allowed with them
    for (var i = 0; i < subGroupings.length; ++i) {
      if (true == subGroupings[i].isElementAllowed(elementName)) {
        // this element is allowed
        return subGroupings[i].getSchemaElementForElementName(elementName);
      }
    }

    // can not find any reason why elementName is allowed with us...
    return undefined;
  }
    
  /**
   * get a list of required elements.
   * if an element is required multiple times, it is listed multiple times.
   * Attention: elements are NOT sorted.
   * 
   * @return  array   list of required elements
   */
  _sequence.getRequiredElements = function () {
    // we do know what we require. might not be too easy to find out, but ok
        
    // if we have no lower bounds, then nothing is required
    if (bounds.min == 0) {
      return [];
    }
        
    var requiredElements = [];
        
    // my own elements
    $.each(allowedElements, function (name, item) {
      if (item.getBounds().min > 0) {
        for (var i = 0; i < item.getBounds().min; ++i) {
          requiredElements.push(name);
        }
      }
    });
        
    // elements of our sub-groupings, if any
    $.each(subGroupings, function (i, grouping) {
      var subRequiredElements = grouping.getRequiredElements();
            
      if (subRequiredElements.length > 0) {
        for (i = 0; i < subRequiredElements.length; ++i) {
          requiredElements.push(subRequiredElements[i]);
        }
      }
    });
        
    return requiredElements;
  };    
    
  /**
   * get the elements allowed for this choice
   * 
   * @return  object      list of allowed elements, key is the name
   */
  _sequence.getAllowedElements = function () {
    var myAllowedElements = {};
        
    $.each(allowedElements, function (name, item) {
      myAllowedElements[name] = item;
    });
        
    // also go over the sub-choices etc.
    $.each(subGroupings, function (i, grouping) {
      $.extend(myAllowedElements, grouping.getAllowedElements());
    });
        
    return myAllowedElements;
  }
    
  /**
   * get the sorting of the allowed elements
   * 
   * Warning: this only works if any element can have only ONE position in the parent.
   * 
   * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
   * @return  object              list of allowed elements, with their sort-number as value
   */
  _sequence.getAllowedElementsSorting = function (sortnumber) {
        
    var namesWithSorting = {};
        
    $.each(sortedContent, function (i, item) {
      var mySortnumber = i;
      if (sortnumber !== undefined) {
        mySortnumber = sortnumber + '.' + i;
      }
            
      if (item.type == 'element') {
        namesWithSorting[item.name] = mySortnumber;
      } else {
        // go recursive
        var subSortedElements = item.getAllowedElementsSorting(mySortnumber);
        $.extend(namesWithSorting, subSortedElements);
      }
    });
        
    return namesWithSorting;
  };
    
  /**
   * cache for getRegex
   * @var string
   */
  var regexCache;
    
  /**
   * get a regex (string) describing this sequence
   * 
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @param   nocapture   bool    when set to true non capturing groups are used
   * @return  string  regex
   */
  _sequence.getRegex = function (separator, nocapture) {

    if (regexCache != undefined) {
      // use the cache if primed
      return regexCache;
    }
        
    var regexString = '';
        
        
    // create list of allowed elements
    regexString = '(';
    if( nocapture )
      regexString += '?:';
        
    var elementRegexes = [];
        
    // this goes over ALL elements AND sub-groupings
    $.each(sortedContent, function (i, element) {
      elementRegexes.push(element.getRegex(separator, nocapture));
    });
        
    regexString += elementRegexes.join('');
        
    regexString += ')';


    // append bounds to regex
    regexString += '{';
    if (bounds.min != 'unbounded') {
      regexString += bounds.min == undefined ? 1 : bounds.min;
    }
    regexString += ',';
    if (bounds.max != 'unbounded') {
      regexString += bounds.max == undefined ? 1 : bounds.max;
    }
    regexString += '}';
        
    // fill the cache
    regexCache = regexString;
        
    // thats about it.
    return regexString;
  };

    
  /**
   * find out if this Grouping has multi-level-bounds, i.e. sub-groupings with bounds.
   * This makes it more or less impossible to know in advance which elements might be needed
   * 
   * @return  boolean does it?
   */
  _sequence.hasMultiLevelBounds = function () {
    if (subGroupings.length > 0) {
      return true;
    }
        
    return false;
  };
    
    
  /**
   * get the bounds of this very grouping
   * 
   * @return  object  like {min: x, max: y}
   */
  _sequence.getBounds = function () {
    return bounds;
  }    

  /**
   * get bounds for a specific element.
   * Take into account the bounds of the element and/or our own bounds
   * 
   * @param   childName   string  name of the child-to-be
   * @return  object              {max: x, min: y}, or undefined if none found
   */
  _sequence.getBoundsForElementName = function (childName) {
    // we are a sequence-element; there is actually a lot of sayings ...
    if (typeof allowedElements[childName] !== 'undefined') {
      var elementBounds = allowedElements[childName].getBounds();
      var sequenceBounds = _sequence.getBounds();
            
      var resultBounds = {
        min: 1,
        max: 1
      };

      if (elementBounds.min == 'unbounded' || sequenceBounds.min == 'unbounded') {
        // unbounded is the highest possible value
        resultBounds.min = 'unbounded';
      } else {
        // if it is bounded, we must duplicate element and sequence bounds
        // (an element may appear as often as the number of sequences times the number of elements
        // in each sequence - roughly)
        if (elementBounds.min != 'undefined') {
          resultBounds.min = elementBounds.min;
        }
                
        if (sequenceBounds.min != 'undefined') {
          resultBounds.min = resultBounds.min * sequenceBounds.min;
        }
      }

      if (elementBounds.max == 'unbounded' || sequenceBounds.max == 'unbounded') {
        resultBounds.max = 'unbounded';
      } else {
        if (elementBounds.max != 'undefined') {
          resultBounds.max = elementBounds.max;
        }
                
        if (sequenceBounds.max != 'undefined') {
          resultBounds.max = resultBounds.max * sequenceBounds.max;
        }
      }

      return resultBounds;
    }
        
    var childBounds = undefined;

    var tmpBounds;
        
    for (var i = 0; i < subGroupings.length; ++i) {
      tmpBounds = subGroupings[i].getBoundsForElementName(childName);
            
      if (undefined !== tmpBounds) {
        // once we find the first set of bounds, we return that
        childBounds = tmpBounds;
        break;
      }
    }
        
    return childBounds;
  };

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
   * the sorted listed of allowed elements and sub-groupings
   * @var array
   */
  var sortedContent = [];
    
  /**
   * array of sub-choices, -sequences, -groups that are defined
   * @var array
   */
  var subGroupings = [];
    
  /**
   * bounds for this choice
   * @var object
   */
  var bounds = {  
    min: undefined,
    max: undefined
  };
           
  // fill ourselves with data
  parse();
}


/**
 * any content.
 *
 * @param   node    DOMNode the group-node
 * @param   schema  Schema  the corresponding schema
 */
var SchemaAny = function (node, schema) {
  /**
   * us
   * @var object
   */
  var _group = this;

  /**
   * type of this object
   * @var string
   */
  _group.type = 'any';



  /**
   * there are no elements in a group...
   * @var boolean
   */
  _group.elementsHaveOrder = undefined;

  /**
   * parse a list of elements in this group.
   * Group is allowed (all|choice|sequence)? as per the definition.
   * We do all of those (except for 'all')
   */
  var parse = function () {
    bounds = {
      min: $n.attr('minOccurs') != undefined ? $n.attr('minOccurs') : 1, // default is 1
      max: $n.attr('maxOccurs') != undefined ? $n.attr('maxOccurs') : 1, // default is 1
    };

    var $group = $n;
    if ($group.is('[ref]')) {
      // if this is a reference, unravel it.
      $group = _schema.getReferencedNode('group', $group.attr('ref'));
    }

    // we are allowed choice and sequence, but only ONE AT ALL is allowed
    $.each($group.find(fixNamespace('> xsd\\:choice')), function (i, grouping) {
      subGroupings.push(new SchemaChoice(grouping, _schema));
    });

    // sequences
    $.each($group.find(fixNamespace('> xsd\\:sequence')), function (i, grouping) {
      subGroupings.push(new SchemaSequence(grouping, _schema));
    });

    // there may be only one, so we simply us the first we found
    if (subGroupings.length > 0) {
      subGroupings = [subGroupings[0]];
    }
  }

  /**
   * is an element (specified by its name) allowed in this group?
   * Goes recursive.
   * Does NOT check bounds! Does NOT check dependencies!
   *
   * @param   element string  the element we check for
   * @return  boolean         is it allowed?
   */
  _group.isElementAllowed = function (element) {
     return true;
  }

  /**
   * get the SchemaElement-object for a certain element-name.
   * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
   *
   * @param   elementName string  name of the element to find the SchemaElement for
   * @return  object              SchemaElement-object, or undefined if none is found
   */
  _group.getSchemaElementForElementName = function (elementName) {
    // can not find any reason why elementName is allowed with us...
    return undefined;
  }


  /**
   * get a list of required elements.
   * if an element is required multiple times, it is listed multiple times
   *
   * @return  array   list of required elements
   */
  _group.getRequiredElements = function () {
    return [];
  };

  /**
   * get the elements allowed for this group
   *
   * @return  object      list of allowed elements, key is the name
   */
  _group.getAllowedElements = function () {
    return [];
  }

  /**
   * get the sorting of the allowed elements.
   * For a group, all elements have the same sorting, so they will all have the
   * same sortnumber
   *
   * Warning: this only works if any element can have only ONE position in the parent.
   *
   * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
   * @return  object              list of allowed elements, with their sort-number as value
   */
  _group.getAllowedElementsSorting = function (sortnumber) {
    return {};
  }

  /**
   * cache for getRegex
   * @var string
   */
  var regexCache = undefined;

  /**
   * get a regex (string) describing this choice
   *
   * @param   separator   string  the string used to separate different elements, e.g. ';'
   * @param   nocapture   bool    when set to true non capturing groups are used
   * @return  string  regex
   */
  _group.getRegex = function (separator, nocapture) {
    return '.*';
  };


  /**
   * find out if this Grouping has multi-level-bounds, i.e. sub-groupings with bounds.
   * This makes it more or less impossible to know in advance which elements might be needed
   *
   * @return  boolean does it?
   */
  _group.hasMultiLevelBounds = function () {
    return true;
  };


  /**
   * get the bounds of this very grouping
   *
   * @return  object  like {min: x, max: y}
   */
  _group.getBounds = function () {
    return bounds;
  }


  /**
   * get bounds for a specific element.
   * Take into account the bounds of the element and/or our own bounds
   *
   * @param   childName   string  name of the child-to-be
   * @return  object              {max: x, min: y}, or undefined if none found
   */
  _group.getBoundsForElementName = function (childName) {
    return bounds;
  };

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
   * array of sub-choices, -sequences, -groups that are defined
   * @var array
   */
  var subGroupings = [];

  /**
   * bounds for this choice
   * @var object
   */
  var bounds = {
    min: undefined,
    max: undefined
  };

  // fill ourselves with data
  parse();
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
    
  return new RegExp(input.replace(/\\([\s\S])|(\$)/g, '\\$1$2'), modifiers);
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
  if (true === $.browser.webkit && parseInt($.browser.version) < 60) {
    // jquery 1.8.2 on webkit expects namespaces in selectors in some cases, and not in others.
    // from my understanding, it expects none when jquery does take care of the selection.
    // this goes for anything with ancestry (>-selector) and anything with defined attributes (e.g. [ref=name])
    // and it is true for selectors with multiple selections, comma-separated.
    // told you, it is bizarre.
    // this is a test-driven result, not knowledge! prone to fail in a future version of jquery :(

    // chrome in version 60 does not seem to need this workaround anymore

    if (!selector.match(',')) {
      // only rewrite selector if it is not a list of multiple selections
      selector = selector.replace(/(>\s*)xsd\\:(\S*)/g, '$1$2');
      selector = selector.replace(/xsd\\:(\S*[=]+[^\s,$]*)(\s|,|$)/g, '$1$2');
    }

  }
    
  return selector;
}