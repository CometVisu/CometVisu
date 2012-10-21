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
 * @requires    Schema.js
 */

/**
 * loader
 * 
 * @param   filename    string  full name of the configuration file
 */
var Configuration = function (filename) {
    if (filename == undefined || filename == '' || !filename.match(/\.xml$/)) {
        throw 'no, empty or invalid filename given, can not instantiate without one';
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
                success: function (data) {
                    $xml = $(data);
                    
                    // parse the data, to have at least a list of root-level-elements
                    parseXML();
                    
                    // tell everyone that we are done!
                    $(document).trigger('configuration_loaded');
                }
            }
        );
    }
    
    /**
     * get the filename of the schema/xsd associated with this Configuration
     * 
     * @return  string  filename (including path) to the schema/xsd
     */
    _config.getSchemaFilename = function () {
        // extract schema-name
        var schemaName = $xml.children().attr('xsi:noNamespaceSchemaLocation');
        
        if (schemaName == undefined || schemaName == '') {
            throw 'no schema/xsd found in root-level-element, can not run without one';
        }
        
        // path is the same as the one from the configuration, so let's throw out the filename, and voila, path.
        var schemaPath = _filename.replace(/\/[^\/]*$/, '');
        
        var schemaFilename = schemaPath + '/' + schemaName;
        
        return schemaFilename;
        
    }
    
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
    }
    
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
    }
    
    /**
     * Parse the already loaded XML
     */
    var parseXML = function () {
        
        // start with the root-nodes, and then go down through all of the configuration ...
        // the going-down-part is done by ConfigurationElement itself
        $xml.children().each(function () {
            var node = new ConfigurationElement(this, _config);
            _config.rootNodes.push(node);
        });
    }
    
    _config.load();
    
}

// @TODO: need a way to find a SchemaElement for a ConfigurationElement, no matter where we are.
// maybe make ConfigurationElement remember parent, and go up the tree?

/**
 * a single element from a configuration
 * 
 * @param   node    object  DOMNode
 * @param   config  object  Configuration-object this node belongs to
 */
var ConfigurationElement = function (node, config) {
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
    }
    
    /**
     * extract the children for this element.
     * creates new ConfigurationElement-objects for each child, so this goes recursive.
     * 
     * @return  array   list of set children
     */
    var getChildren = function () {
        var children = [];
        
        $n.children().each(function () {
            var child = new ConfigurationElement(this, _config);
            
            children.push(child);
        });
        
        return children;
    }
    
    /**
     * get the immediate text of this element
     * 
     * @return  string  the value of this element
     */
    var getValue = function () {
        return $n.clone().find("*").remove().end().text();
    }
    
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
                    throw 'xsd does not match this configuration, or configuration is not valid';
                }
                
                // and set it.
                child.setSchemaElement(childSchemaElement);
            });
        }
    }
    
    /**
     * get the current SchemaElement
     * 
     * @return  SchemaElement
     */
    _element.getSchemaElement = function () {
        return _schemaElement;
    }
    
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

        // if we have children, check them, too.
        if (_element.children.length > 0) {
            
            // list of all of our children
            var allSubElements = [];
            
            // go over list of all elements, and see if some are not valid
            // that's it
            $.each(_element.children, function (i, child) {
                var childName = child.name;
                isValid = isValid && _schemaElement.isChildElementAllowed(childName);
                
                if (isValid == false) {
                    return;
                }
                
                // go recursive.
                isValid = isValid && child.isValid();
            });
            
            // @TODO: check bounds?
        }
        
        if (_element.children.length == 0 || _schemaElement.isMixed) {
            // if this element has no children, it appears to be a text-node
            // also, if it may be of mixed value
            // alas: check for validity
            
            var value = getValue();
            
            if (value != '') {
                // only inspect elements with actual content. Empty nodes are deemed valid.
                // @TODO: check if there might be nodes this does not apply for. sometime.
                isValid = isValid && _schemaElement.isValueValid(value);
            }
        }
        
        return isValid;
    }
    
    /**
     * the Configuration-object this element belongs to
     * @var object
     */
    var _config = config;
    
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
    
}