/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Javascript-Representation of a configuration
 *
 * These classes are used to load a visu-configuration, making it's attributes and nodes available in Javascript
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
 * @since       2012-10-10
 * @requires    Schema.js, Messages.js, Result.js
 */

/**
 * loader
 * 
 * @param   filename    string  full name of the configuration file
 */
var Configuration = function (filename) {
    if (filename == undefined || filename == '' || !filename.match(/\.xml$/)) {
        throw Messages.loader.filenameInvalid;
    }
    
    var _config = this;
    var _filename = filename;
    
    /**
     * the Schema-object associated with this Configuration
     * @var object
     */
    var _schema = {};
    
    /**
     * the configuration
     * @var object
     */
    var $xml = {};
    
    /**
     * a list of our child-nodes
     * @var array
     */
    _config.rootNodes = [];
    
    /**
     * load and cache the configuration/xml from the server
     */
    _config.load = function () {
        $.ajax(_filename,
            {
                dataType: 'xml',
                cache: false, // never ever allow caching for the configuration
                success: function (data) {
                    $xml = $(data);
                    
                    // parse the data, to have at least a list of root-level-elements
                    parseXML();
                    
                    // tell everyone that we are done!
                    $(document).trigger('configuration_loaded');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var result = new Result(false, Messages.configuration.loadingError, [textStatus, errorThrown]);
                    $(document).trigger('configuration_loading_error', [result]);
                }
            }
        );
    };
    
    /**
     * get the filename of the schema/xsd associated with this Configuration
     * 
     * @return  string  filename (including path) to the schema/xsd
     */
    _config.getSchemaFilename = function () {
        // extract schema-name
        var schemaName = $xml.children().attr('xsi:noNamespaceSchemaLocation');
        
        if (schemaName == undefined || schemaName == '') {
            throw Messages.configuration.schemaNotFound;
        }
        
        // path is the same as the one from the configuration, so let's throw out the filename, and voila, path.
        // might not have a path component (aka no /), then throw out everything
        var schemaPath = '';
        if (-1 != _filename.indexOf('/')) {
            schemaPath = _filename.replace(/\/[^\/]*$/, '');
        }
        
        var schemaFilename = schemaPath + schemaName;
        
        return schemaFilename;
        
    };
    
    /**
     * set the Schema-object for this configuration
     * 
     * @param   schema  object  Schema-object
     */
    _config.setSchema = function (schema) {
        if (schema == undefined || typeof schema != 'object') {
            throw 'internal problem: improper usage of Configuration (not an object)';
        }
        
        _schema = schema;


        $.each(_config.rootNodes, function (i, element) {
            var elementName = element.name;
            
            if (typeof _schema.allowedRootElements[elementName] == 'undefined') {
                throw 'schema is not valid for this configuration, can not find root-level element ' + elementName;
            }
            
            var childSchemaElement = _schema.allowedRootElements[elementName];
            element.setSchemaElement(childSchemaElement);
        });
    };
    
    /**
     * check and report if the loaded configuration is valid by the standards of an already set schema
     * 
     * @return  boolean valid?
     */
    _config.isValid = function () {
        if ($.isEmptyObject(_schema)) {
            throw 'internal problem: improper usage of Configuration (no schema set)';
        }
        
        var isValid = true;
        
        $.each(_config.rootNodes, function (i, element) {
            var elementName = element.name;
            // if no element of this name is allowed at root level, this config is not valid. period.
            if (typeof _schema.allowedRootElements[elementName] == 'undefined') {
                // not valid
                isValid = false;
                return;
            }
            
            // check this element for validity
            isValid = isValid && element.isValid();
        });
        
        return isValid;
    };
    
    /**
     * Parse the already loaded XML
     */
    var parseXML = function () {
        
        // start with the root-nodes, and then go down through all of the configuration ...
        // the going-down-part is done by ConfigurationElement itself
        $xml.children().each(function () {
            var node = new ConfigurationElement(this, undefined);
            _config.rootNodes.push(node);
        });
    };
    
    _config.load();
    
}


/**
 * a single element from a configuration
 * 
 * @param   node    object  DOMNode
 * @param   parent  object  our parents ConfigurationElement
 */
var ConfigurationElement = function (node, parent) {
    var _element = this;
    
    /**
     * extract the attributes for this element
     * 
     * @return  object  list of set attributes
     */
    var getAttributes = function () {
        var attributes = {};
        
        // get the node, and use plain-old-javascript to get a list of its attributes
        // there is jQuery-equivalent to this (as of 2012-10-10, that is)
        var node = $n.get(0);
        
        if (typeof node.attributes != 'undefined') {
            $.each(node.attributes, function (index, e) {
                // attributes with a colon are ignored, we expect them to be of xsd-nature.
                if (!e.name.match(/:/)) {
                    attributes[e.name] = e.value;
                }
            });
        }
        
        return attributes;
    };
    
    /**
     * extract the children for this element.
     * creates new ConfigurationElement-objects for each child, so this goes recursive.
     * 
     * @return  array   list of set children
     */
    var getChildren = function () {
        var children = [];
        
        $n.children().each(function () {
            var child = new ConfigurationElement(this, _element);
            
            children.push(child);
        });
        
        return children;
    };
    
    /**
     * get the immediate text of this element
     * 
     * @return  string  the value of this element
     */
    var getValue = function () {
        return $n.clone().find("*").remove().end().text();
    };
    
    /**
     * set the SchemaElement for this ConfigurationElement.
     * Goes recursive.
     * 
     * @param   schemaElement   object  SchemaElement for this ConfigurationElement
     */
    _element.setSchemaElement = function (schemaElement) {
        // set our own schemaElement
        _schemaElement = schemaElement;

        // if we have children, check them, too.
        if (_element.children.length > 0) {

            // go over all of our children, and set their SchemaElement
            $.each(_element.children, function (i, child) {
                var childName = child.name;
                // find the SchemaElement for this child
                var childSchemaElement = schemaElement.getSchemaElementForElementName(childName);
                
                if (childSchemaElement == undefined) {
                    // the xsd does not match, we are invalid
                    throw 'xsd does not match this configuration, or configuration is not valid for ' + childName;
                }
                
                // and set it.
                child.setSchemaElement(childSchemaElement);
            });
        }
    };
    
    /**
     * get the current SchemaElement
     * 
     * @return  SchemaElement
     */
    _element.getSchemaElement = function () {
        return _schemaElement;
    };
    
    /**
     * check if this element, its attributes and its children are valid, when compared to a given schemaElement
     * 
     * @return  boolean valid?
     */
    _element.isValid = function () {
        
        var isValid = true;
        
        // first, check if our attributes are good
        $.each(_element.attributes, function (name, value) {
            // check if this attribute is allowed, at all
            if (typeof _schemaElement.allowedAttributes[name] == 'undefined') {
                isValid = false;
                return;
            }
            
            // if we are good, check if the value is valid
            isValid = isValid && _schemaElement.allowedAttributes[name].isValueValid(value);
        });
        
        if (false === isValid) {
            // bail out, if we already know that we failed
            return false;
        }
        
        // check for missing required attributes
        $.each(_schemaElement.allowedAttributes, function (name, attribute) {
            if (false == attribute.isOptional) {
                if (typeof _element.attributes[name] == 'undefined' || _element.attributes[name] == undefined) {
                    // missing required attribute ... too bad ...
                    isValid = false;
                }
            }
        });

        if (false === isValid) {
            // bail out, if we already know that we failed
            return false;
        }
        

        // counting all our sub-elements
        var allSubElements = {};

        // populate this list with all allowed elements (with a counting of 0 (zero))
        var allowedSubElements = _schemaElement.getAllowedElements();
        if (allowedSubElements != undefined) {
            $.each(allowedSubElements, function (name, item) {
                allSubElements[name] = 0;
            });
        }
        delete allowedSubElements;


        if (_element.children.length > 0) {
            // if we have children, check them
            
            // go over list of all elements, and see if some are not valid
            // that's it
            $.each(_element.children, function (i, child) {
                var childName = child.name;
                isValid = isValid && _schemaElement.isChildElementAllowed(childName);
                
                if (isValid == false) {
                    return;
                }
                
                // count the number of occurences for this element
                if (undefined == allSubElements[childName]) {
                    allSubElements[childName] = 0;
                }
                ++allSubElements[childName];
                
                // go recursive.
                isValid = isValid && child.isValid();
            });
        }
        
        // check all allowed and used elements against their personal bounds.
        $.each(allSubElements, function (name, count) {
            var bounds = _schemaElement.getSchemaElementForElementName(name).getBounds();
            
            if (bounds.min > count) {
                // this element does not appear often enough
                isValid = false;
            }
            
            if (bounds.max < count) {
                // this element does not appear often enough
                isValid = false;
            }
        });

        // secondly, check with the bounds of their parent (i.e. their 'choice')
        // is NOT capable of multi-dimensional-choice-bounds (like in complexType mapping)
        var bounds = _schemaElement.getChildBounds();
        if (bounds != undefined) {
            // check bounds only if we have them :)
            if (bounds.min > _element.children.length) {
                // less elements than defined by the bounds
                isValid = false;
            }
            
            if (bounds.max != 'unbounded') {
                if (bounds.max < _element.children.length) {
                    // more elements than defined by the bounds
                    isValid = false;
                }
            }
        }
        
        if (_element.children.length == 0 || _schemaElement.isMixed) {
            // if this element has no children, it appears to be a text-node
            // also, if it may be of mixed value
            // alas: check for validity
            
            var value = getValue();
            
            if (value != '') {
                // only inspect elements with actual content. Empty nodes are deemed valid.
                // @TODO: check if there might be nodes this does not apply for. sometime. MS4 or after bugreport.
                isValid = isValid && _schemaElement.isValueValid(value);
            }
        }
        
        return isValid;
    };
    
    /**
     * set the value for an attribute
     * 
     * @param   name    string  name of the attribute to 'edit'
     * @param   value   string  value to set for that attribute
     * @return  boolean         was the value valid and set?
     */
    _element.setAttributeValue = function (name, value) {
        var isValid = _schemaElement.allowedAttributes[name].isValueValid(value);
        
        if (false == isValid) {
            // this value is not valid, so we do not accept it, and say so!
            var typeDescription = _schemaElement.allowedAttributes[name].getTypeString();
            return new Result(false, Messages.validity.valueInvalidForType, [typeDescription]);
        }
        
        _element.attributes[name] = value;
        
        return new Result(true);
    };
    
    
    /**
     * set the text-value for this element
     * 
     * @param   value   string  value to set for that attribute
     * @return  boolean         was the value valid and set?
     */
    _element.setTextValue = function (value) {
        value = $.trim(value);
        
        var isValid = _schemaElement.isValueValid(value);
        
        if (false == isValid) {
            // this value is not valid, so we do not accept it, and say so!
            return new Result(false, Messages.validity.valueInvalid);
        }
        
        _element.value = value;
        
        return new Result(true);
    };  
    
    /**
     * remove a child-nodes
     * 
     * @param   child   object  the child-node to remove
     */
    _element.removeChildNode = function (child) {
        var index = $.inArray(child, _element.children);
        
        if (index != -1) {
            // remove the child ...
            _element.children.splice(index, 1);
        }
    };
    
    /**
     * remove this node for good.
     */
    _element.remove = function () {
        _parentElement.removeChildNode(_element);
    };
    
    /**
     * create a new child, append it to this element
     * auto-create necessary children recursive
     * 
     * @param   childName   string  type of the new element
     * @return  object              new ConfigurationElement created
     * @throws
     */
    _element.createChildNode = function (childName) {
        if (false === _schemaElement.isChildElementAllowed(childName)) {
            throw 'element ' + _element.name + ' does not allow child of type ' + childName;
        }
        
        // create a pseudo-node to use with "new ConfigurationElement()"-call
        var $pseudoNode = $('<' + childName + ' />', _schemaElement.getSchemaDOM());
        
        // create a new ConfigurationElement
        var childNode = new ConfigurationElement($pseudoNode, _element);
        
        // give the element its schemaElement
        childNode.setSchemaElement(_schemaElement.getSchemaElementForElementName(childName))
        
        // auto-populate the new child
        childNode.initFromScratch();
        
        // add this new child-node to our list of children
        _element.children.push(childNode);

        // aaaand ... we're done.
        return childNode;
    };
    
    /**
     * find out if an element of a certain type is creatable with us.
     * This also checks bounds!
     * 
     * @param   childName   string  type of the child-to-be
     * @return  boolean             is this allowed?
     */
    _element.isChildCreatable = function (childName) {
        if (false === _schemaElement.isChildElementAllowed(childName)) {
            // this child is not allowed AT ALL
            return false;
        }

        // the bounds of ourself, this means the maximum number of children as defined by a choice
        var myChildBounds = _schemaElement.getChildBounds();
        if (myChildBounds != undefined && myChildBounds.max >= _element.children.length) {
            // no more children are allowed.
            // sorry, you can not enter
            return false;
        }

        // the bounds of the specific element (child-to-be)
        var typeBounds = _schemaElement.getSchemaElementForElementName(childName).getBounds();
        
        // count the number of elements of this type we already have
        var count = 0;
        $.each(_element.children, function (i, item) {
            if (item.name == childName) {
                ++count;
            }
        });
        
        if (count >= typeBounds.max) {
            // if there are more elements of this type than allowed, then we're not ok
            return false;
        }
        
        // no reason why to disallow the child-to-be
        return true;
    };
    
    /**
     * initialize a newly created ConfigurationElement.
     * Only needed when an element was freshly created FROM SCRATCH.
     * 
     * creates children as needed.
     */
    _element.initFromScratch = function () {
        
        // empty our list of children (this is init, after all)
        _element.children = [];
        
        // create a list of all elements that define their own min-occurences
        var neededElements = {};
        var allowedSubElements = _schemaElement.getAllowedElements();
        if (allowedSubElements != undefined) {
            $.each(allowedSubElements, function (name, item) {
                var bounds = item.getBounds();
                
                if (bounds.min > 0) {
                    neededElements[name] = bounds.min;
                }
            });
        }
        delete allowedSubElements;

        // create elements for all items with min-occurences
        $.each(neededElements, function (name, count) {
            // create the appropriate amount of children of each needed type
            for (var i = 0; i < count; ++i) {
                // create a new child; this auto-recurses!
                _element.createChildNode(name);
            }
        });
    };
    
    /**
     * get an object of allowed elements
     * 
     * @return  object  all allowed elements
     */
    _element.getAllowedElements = function () {
        if (_schemaElement == undefined) {
            return undefined;
        }
        
        return _schemaElement.getAllowedElements();
    };
    
    /**
     * can this element be removed from the configuration, schema-wise speaking?
     * 
     * @return  boolean can it be removed?
     */
    _element.isRemovable = function () {
        if (_parentElement == undefined) {
            // we have no parent. do not remove us!
            return false;
        }
        
        
        var siblingsAndSelf = _parentElement.children;

        var parentBounds = _parentElement.getSchemaElement().getChildBounds();
        
        // check bounds of parents choice
        if (parentBounds != undefined && parentBounds.min >= siblingsAndSelf.length) {
            // our parent only has the necessary amount of elements, not more.
            // this means, we can not be removed
            return false;
        }

        var myBounds = _schemaElement.getBounds();
        
        // count the number of elements of this type our parent has
        var count = 0;
        $.each(siblingsAndSelf, function (i, item) {
            if (item.name == _element.name) {
                ++count;
            }
        });
        
        if (myBounds.min >= count) {
            // there are less or exactly as many elements of this type as needed
            // we can not allow even less! deny! deny!
            return false;
        }
        
        // if we had no reason to dis-allow it, we will allow
        return true;
    };    
    
    /**
     * the Configuration-object this element belongs to
     * @var object
     */
    var _parentElement = parent;
    
    /**
     * the node this element represents
     * @var object
     */
    var $n = $(node);
    
    /**
     * our SchemaElement, if schema was set
     * @var object
     */
    var _schemaElement = undefined;
    
    /**
     * the name of this element
     * @var string
     */
    _element.name = $n.get(0).nodeName;
    
    /**
     * get and store a list of this elements set attributes
     * @var object
     */
    _element.attributes = getAttributes();
    
    /**
     * get and store a list of this elements children
     * @var array
     */
    _element.children = getChildren();
    
    /**
     * the text-content of this node (if any)
     * @var string
     */
    _element.value = getValue();
    
};
