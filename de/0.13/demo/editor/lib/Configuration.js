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
 * @requires    Schema.js, Messages.js, Result.js, ListenerEvent.js
 */

/**
 * loader
 * 
 * @param   filename    string  full name of the configuration file
 * @param   isDemo      bool    true when consig is a demo config
 */
var Configuration = function (filename, isDemo) {
  if (filename === undefined || filename === '' || !filename.match(/\.xml$/)) {
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
   * mark objects of this class as being the Master of a configuration
   * @var boolean
   */
  _config.isMaster = true;
    
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
   * send the configuration to the server for saving
   * 
   * @param   filename    string  the filename to save to (optional, e.g. for saving to a temporary file)
   * @return  boolean success
   */
  _config.save = function (filename) {
    if( isDemo ) {
      var message = 'demo configs can not be saved';
      var result = new Result(false, Messages.configuration.savingError, [message]);
      $(document).trigger('configuration_saving_error', [result]);
      return;
    }
        
    var data = _config.getAsSerializable();
    if (window.saveFromIframe) {
      window.saveFromIframe(data, filename, function (err) {
        if (err) {
          var result = new Result(false, Messages.configuration.savingErrorServer, [err.status, err.statusText]);
          $(document).trigger('configuration_saving_error', [result]);
        } else {
          $(document).trigger('configuration_saving_success');
        }
      });
    } else {
      if (filename === undefined) {
        // if no filename is given, use the one that we had for loading the file
        filename = _filename;
      }
      $.ajax('editor/bin/save_config.php',
        {
          dataType: 'json',
          data: {
            config: filename,
            data: JSON.stringify(data),
          },
          type: 'POST',
          cache: false,
          success: function (data) {
            if (data === undefined || typeof data.success === 'undefined') {
              // some weird generic error
              var result = new Result(false, Messages.configuration.savingErrorUnknown);
              $(document).trigger('configuration_saving_error', [result]);

              return;
            }

            if (data.success === false) {
              // we have an error.
              var message;

              if (typeof data.message !== 'undefined') {
                message = data.message;
              }

              var result = new Result(false, Messages.configuration.savingError, [message]);
              $(document).trigger('configuration_saving_error', [result]);

              return;
            }

            // everything is pretty cool.
            $(document).trigger('configuration_saving_success');

          },
          error: function (jqXHR, textStatus, errorThrown) {
            var result = new Result(false, Messages.configuration.savingErrorServer, [textStatus, errorThrown]);
            $(document).trigger('configuration_saving_error', [result]);
          },
        }
      );
    }
  };
    
  /**
   * get the filename of the schema/xsd associated with this Configuration
   * 
   * @return  string  filename (including path) to the schema/xsd
   */
  _config.getSchemaFilename = function () {
    // extract schema-name
    var schemaName = $xml.children().attr('xsi:noNamespaceSchemaLocation');
        
    if (schemaName === undefined || schemaName === '') {
      throw Messages.configuration.schemaNotFound;
    }
        
    // path is the same as the one from the configuration, so let's throw out the filename, and voila, path.
    // might not have a path component (aka no /), then throw out everything
    var schemaPath = '';
    if (-1 !== _filename.lastIndexOf('/')) {
      schemaPath = _filename.substring(0, _filename.lastIndexOf('/') + 1);
    }
        
    return schemaPath + schemaName;
        
  };
    
  /**
   * set the Schema-object for this configuration
   * 
   * @param   schema  object  Schema-object
   */
  _config.setSchema = function (schema) {
    if (schema === undefined || typeof schema !== 'object') {
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
   * get a serializable object of this element, recursive
   * 
   * @return  object
   */
  _config.getAsSerializable = function () {
    var data = [];
        
    //  parse children
    $.each(_config.rootNodes, function (i, child) {
      data.push(child.getAsSerializable());
    });
        
    return data;
  };


  /**
   * append an event listener to this ConfigurationElement.
   * The Listener must have a function called 'ConfigurationElementEventListener'
   * That function gets called on any interesting event (like isValid = false)
   * 
   * @param   listener    object  Listener
   */
  _config.attachGlobalListener = function (listener) {
    if (typeof listener.ConfigurationElementEventListener !== 'function') {
      throw 'programming error: listener is not compatible';
    }
        
    listeners.push(listener);
  };

  /**
   * inform all attached listeners (if any) of an event.
   * Events are instances of Result.
   * 
   * @param   event   string  name of the event
   * @param   params  object  list of additional params, optional
   */
  _config.informGlobalListeners = function (event, params) {
    if (listeners.length === 0) {
      // no listeners means nothing to do.
      return;
    }
        
    var listenerEvent = new ListenerEvent(event, params);
        
    // go over all listeners and inform them
    $.each(listeners, function (i, listener) {
      listener.ConfigurationElementEventListener(listenerEvent);
    });
  };
    
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
  };
    
  _config.load();
    
  var listeners = [];
};


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
        
    if ($n[0].nodeType !== 1) {
      // this is a text-only node!
      return attributes;
    }
        
    // get the node, and use plain-old-javascript to get a list of its attributes
    // there is jQuery-equivalent to this (as of 2012-10-10, that is)
    var node = $n.get(0);
        
    if (typeof node.attributes !== 'undefined') {
      $.each(node.attributes, function (index, e) {
        // attributes with a colon are ignored, we expect them to be of xsd-nature.
        if (!e.name.match(/:/)) {
          attributes[e.name] = e.value;
        } else {
          _element.systemAttributes[e.name] = e.value;
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

    if ($n[0].nodeType !== 1) {
      // this is a text-only node!
      return children;
    }

    $n.contents().each(function () {
      if (this.nodeType !== 1) {
        if (this.nodeValue.trim() === '') {
          // empty text elements are not interesting
          return;
        }
                
        if (this.nodeType === 8) {
          // just keep comments as they are so that they are not forgotten
          children.push(this);
        }
      }

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
   * return an id unique to this element
   * 
   * @return  integer the unique id
   */
  _element.getUID = function () {
    return _uid;
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

    if (schemaElement.isMixed === false) {
      // clean up #text-nodes, they are not needed in a non-mixed node!
      $.each(_element.children, function (i, child) {
        if (child !== undefined && child.name === '#text') {
          child.remove();
        }
      });
    }
        


    // if we have children, check them, too.
    if (_element.children.length > 0) {

      // go over all of our children, and set their SchemaElement
      $.each(_element.children, function (i, child) {
        if( '#comment' === child.nodeName ) {
          // skip over comments
          return;
        }

        var childName = child.name;
        // find the SchemaElement for this child
        var childSchemaElement = schemaElement.getSchemaElementForElementName(childName);
        if (childSchemaElement === undefined && schemaElement.name==='custom') {
          // custom element allows any content so we just re-use the schemeElement here
          childSchemaElement = schemaElement;
        }

        if (childSchemaElement === undefined) {
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
      if (typeof _schemaElement.allowedAttributes[name] === 'undefined') {
        informListeners('invalid', {type: 'attribute_disallowed', item: name});
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
      if (false === attribute.isOptional) {
        if (typeof _element.attributes[name] === 'undefined' || _element.attributes[name] === undefined) {
          // missing required attribute ... too bad ...
          informListeners('invalid', {type: 'attribute_missing', item: name});
          isValid = false;
        }
      }
    });

    if (false === isValid) {
      // bail out, if we already know that we failed
      return false;
    }
        
      
    var regexString = _schemaElement.getChildrenRegex(';',true); // nocaputure = true as we will only test()
    var regExp = regexFromString(regexString);
        
    var childrenString = '';
    for( var i = 0, len = _element.children.length; i < len; i++ ) {
      var child = _element.children[i];
      if ('#comment' === child.nodeName) {
        // this is a comment
        continue;
      }
      if (child.name === '#text') {
        // this is a text
        if (false === _schemaElement.isMixed && false === _schemaElement.isTextContentAllowed()) {
          informListeners('invalid', {type: 'text_not_allowed'});
          isValid = false;
          return;
        }
        // #text-nodes are not part of the string to match
                
      } else {
        childrenString += child.name + ';';
      }
            
      // do the recursion
      if (false === child.isValid()) {
        isValid = false;
        return;
      }
    }
        
    if (false === regExp.test(childrenString)) {
      // the children of this element do not match what the regex says is valid
      informListeners('invalid', {type: 'regex_not_matched', regex: regexString, children: childrenString});
      return false;
    }
        
    if (_element.children.length === 0 || _schemaElement.isMixed) {
      // if this element has no children, it appears to be a text-node
      // also, if it may be of mixed value
      // alas: check for validity
            
      var value = getValue();
            
      if (value.trim() !== '') {
        // only inspect elements with actual content. Empty nodes are deemed valid.
        // @TODO: check if there might be nodes this does not apply for. sometime. MS5 or after bugreport.
        isValid = isValid && _schemaElement.isValueValid(value);
                
        if (isValid === false) {
          informListeners('invalid', {type: 'value_invalid'});
        }
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

    if( _schemaElement.allowedAttributes[name].isOptional && value === undefined ) {
      // overrule isValid when the value is "unset" and it is optional
      isValid = true;
    }
        
    if (false === isValid) {
      // this value is not valid, so we do not accept it, and say so!
      var typeDescription = _schemaElement.allowedAttributes[name].getTypeString();
      return new Result(false, Messages.validity.valueInvalidForType, [typeDescription]);
    }
        
    _element.attributes[name] = value;
        
    informListeners('attributeChangedValue', {item: name, newValue: value});
        
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
        
    if (false === isValid) {
      // this value is not valid, so we do not accept it, and say so!
      return new Result(false, Messages.validity.valueInvalid);
    }
        
    _element.value = value;
        
    informListeners('elementChangedValue', {newValue: value});
        
    return new Result(true);
  };  
    
  /**
   * remove a child-nodes
   * 
   * @param   child   object  the child-node to remove
   */
  _element.removeChildNode = function (child) {
    var index = $.inArray(child, _element.children);
        
    if (index !== -1) {
      // remove the child ...
      _element.children.splice(index, 1);
    }
  };
    
  /**
   * remove this node for good.
   */
  _element.remove = function () {
    if (typeof _parentElement.isMaster !== 'undefined' && _parentElement.isMaster === true) {
      // do not work on the Master
      return;
    }
    _parentElement.removeChildNode(_element);
  };

  /**
   * append a node
   * 
   * @param   childNode   object  new ConfigurationElement to be added at the end of the list
   */
  _element.appendChildNode = function (childNode) {
    if (_element === childNode) {
      throw 'programming error: self and new-node are identical';
    }
        
    _element.children.push(childNode);
        
    // set the parent of the new child!
    if ('#comment' !== childNode.nodeName) {
      childNode.setParentNode(_element);
    }
        
    // sort the child-nodes
    sortChildNodes();
  };
    
  /**
   * the list of sort-values for our children; needed and filled by sortChildNodes*
   * @var object
   */
  var childSortValues = undefined;
    
  /**
   * re-sort child-elements based on a given sorting we might have from our schema
   */
  var sortChildNodes = function () {
    // make a copy of the children-list
    var tmpChildren = $.extend([], _element.children);
        
    // get the sortValues once
    if (childSortValues === undefined) {
      childSortValues = _schemaElement.getAllowedElementsSorting();
    }
        
    // do the actual sorting
    tmpChildren.sort(sortChildNodesHelper);
        
    // set the children-list to the newly created, sorted, one
    _element.children = tmpChildren;
  };
    
  /**
   * the comparison-function that helps the sorting
   * 
   * @param   a   mixed   whatever sort gives us
   * @param   b   mixed   whatever sort gives us
   * @return  integer     -1, 0, 1 - depending on sort-order
   */
  var sortChildNodesHelper = function (a, b) {
    var aSortvalue = childSortValues[a.name];
    var bSortvalue = childSortValues[b.name];
        
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
        
    var aSortvaluesList = aSortvalue.split('.');
    var bSortvaluesList = bSortvalue.split('.');
        
    for (var i = 0; i < aSortvaluesList.length; ++i) {
      if (aSortvaluesList[i] < bSortvaluesList[i]) {
        return -1;
      } else if (aSortvaluesList[i] > bSortvaluesList[i]) {
        return 1;
      }
    }
        
    // if nothing else matched, then they are treated equal
    return 0;
  };
    
  /**
   * set the parent of this element.
   * Needed for duplication, as we need to re-set the parent
   * 
   * @param   parentNode  object  ConfigurationElement of the new parent
   */
  _element.setParentNode = function (parentNode) {
    _parentElement = parentNode;
  };
    
  /**
   * get the children of this element.
   * 
   * Returns a reference to the children-object!
   * 
   * @return  array   list of children
   */
  _element.getChildren = function () {
        
    return _element.children;
  };
    
  /**
   * set all child-nodes at once.
   * This is necessary so an outside function can re-arrange our children
   * 
   * @param   children    array   list of children in new order
   */
  _element.setChildren = function (children) {
    _element.children = children;
  };
    
  /**
   * insert a child at an arbitrary position.
   * 
   * @param   child       object  the child to insert
   * @param   position    integer the array-index at which to insert the child
   */
  _element.addChildAtPosition = function (child, position) {
    // the position is ignoring comments, so calculate the real position
    var finalPosition = position;
    for (var i = 0; i < finalPosition && finalPosition <= _element.children.length; i++ )
    {
      if ('#comment' === _element.children[i].nodeName) {
        finalPosition++;
      }
    }

    // add the child
    _element.children.splice(finalPosition, 0, child);
        
    // we need to sort it afterwards, maybe the arbitrary position was too arbitrary :)
    sortChildNodes();
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
    var $pseudoNode;
        
    if (childName === '#text') {
      // text-nodes are not actual nodes, they are strings, so we will work with a text-node.
      $pseudoNode = document.createTextNode('');
    } else {
      // most nodes are actual nodes ...
      $pseudoNode = $('<' + childName + ' />', _schemaElement.getSchemaDOM())
    }
        
    // create a new ConfigurationElement
    var childNode = new ConfigurationElement($pseudoNode, _element);
        
    // give the element its schemaElement
    childNode.setSchemaElement(_schemaElement.getSchemaElementForElementName(childName));
        
    // auto-populate the new child
    childNode.initFromScratch();
        
    // add this new child-node to our list of children
    _element.appendChildNode(childNode);

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
    var myChildBounds = _schemaElement.getBoundsForElementName(childName);
        
    var childCount = 0;
        
    $.each(_element.children, function (i, child) {
      if (child.name === childName) {
        ++childCount;
      }
    });

    if (myChildBounds !== undefined && myChildBounds.max <= childCount) {
      // no more children are allowed.
      // sorry, you can not enter
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
        
    // set the default-value, if one is given
    if (_schemaElement.defaultValue !== undefined) {
      _element.setTextValue(_schemaElement.defaultValue);
    }
        
    // set the default-value to the attributes, if given
    $.each(_schemaElement.allowedAttributes, function (attributeName, attributeSchema) {
      if (attributeSchema.defaultValue !== undefined) {
        _element.setAttributeValue(attributeName, attributeSchema.defaultValue);
      }
    });
        
    // empty our list of children (this is init, after all)
    _element.children = [];
        
    var requiredElements = _schemaElement.getRequiredElements();
        
    // create elements for all items with min-occurences
    $.each(requiredElements, function (i, name) {
      // create a new child; this auto-recurses!
      _element.createChildNode(name);
    });
  };
    
  /**
   * get an object of allowed elements
   * 
   * @return  object  all allowed elements
   */
  _element.getAllowedElements = function () {
    if (_schemaElement === undefined) {
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
    if (_parentElement === undefined || (typeof _parentElement.isMaster !== 'undefined' && _parentElement.isMaster === true)) {
      // we have no parent. do not remove us!
      return false;
    }
        
    var siblingsAndSelf = _parentElement.children;

    var parentBounds = _parentElement.getSchemaElement().getChildBounds();
    var elementBounds = _schemaElement.getBounds();
        
    var minBound = 1;
        
    // check bounds of parents choice
    if (parentBounds !== undefined) {
      minBound = parentBounds.min;
    }
        
    // we need at least as many elements as parent times element requires
    minBound = minBound * elementBounds.min;

    // count the number of elements of this type our parent has
    var count = 0;
    $.each(siblingsAndSelf, function (i, item) {
      if (item.name === _element.name) {
        ++count;
      }
    });
        
    if (minBound >= count) {
      // there are less or exactly as many elements of this type as needed
      // we can not allow even less! deny! deny!
      return false;
    }
        
    // if we had no reason to dis-allow it, we will allow
    return true;
  };    
    
    
  /**
   * append an event listener to this ConfigurationElement.
   * The Listener must have a function called 'ConfigurationElementEventListener'
   * That function gets called on any interesting event (like isValid = false)
   * 
   * @param   listener    object  Listener
   */
  _element.attachListener = function (listener) {
    if (typeof listener.ConfigurationElementEventListener !== 'function') {
      throw 'programming error: listener is not compatible';
    }
        
    listeners.push(listener);
  };
    
  /**
   * clear the list of attached listeners; needed if you duplicate this element
   */
  _element.clearListeners = function () {
    listeners = [];
  };
    
  /**
   * set self; after duplication, we need to re-set _element, otherwise we still reference our old instance!
   * 
   * @param   self    object  the new self
   */
  _element.setSelf = function (self) {
    _element = self;
  };
    
  /**
   * inform all attached listeners (if any) of an event.
   * Events are instances of Result.
   * 
   * @param   event   string  name of the event
   * @param   params  object  list of additional params, optional
   */
  var informListeners = function (event, params) {
    // inform global listeners, if there are any ...
    _parentElement.informGlobalListeners(event, params);

    if (listeners.length === 0) {
      // no listeners means nothing to do.
      return;
    }
        
    var listenerEvent = new ListenerEvent(event, params);
        
    // go over all listeners and inform them
    $.each(listeners, function (i, listener) {
      listener.ConfigurationElementEventListener(listenerEvent);
    });
  };
    
  /**
   * inform global listeners.
   * Same idea as informListeners, but only walks up the tree to our root-node, and inform the listeners
   * of the rootNode
   * 
   * @param   event   string  name of the event
   * @param   params  object  list of additional params, optional
   */
  _element.informGlobalListeners = function (event, params) {
    _parentElement.informGlobalListeners(event, params);
  };
    
  /**
   * get the parent element
   * 
   * @return  object  the parent element
   */
  _element.getParentElement = function () {
    return _parentElement;
  };
    
  /**
   * get a duplicate of this element
   * 
   * Clear listeners for the duplicate, everything else is kept in shape
   * 
   * @param   parent  object      the parent of the newly created node
   * @return  object  duplicate of this
   */
  _element.getDuplicateForParent = function (parent) {
    // deep-copy this element on our own ...
        
    var duplicate;
    // create new element

    // create a pseudo-node to use with "new ConfigurationElement()"-call
    var $pseudoNode;
        
    if (_element.name === '#text') {
      // text-nodes are not actual nodes, they are strings, so we will work with a text-node.
      $pseudoNode = document.createTextNode('');
    } else {
      // most nodes are actual nodes ...
      $pseudoNode = $('<' + _element.name + ' />', _schemaElement.getSchemaDOM())
    }
        
    // create a new ConfigurationElement
    duplicate = new ConfigurationElement($pseudoNode, parent);
        
    // give the element its schemaElement
    duplicate.setSchemaElement(_schemaElement);
        
    // add a copy of our attributes
    duplicate.attributes = $.extend({}, _element.attributes);
        
    // the value (if there is such a thing)
    duplicate.value = _element.value;
        
    // ignore SystemAttributes, they are only necessary for root-level elements
        
    // go over our children
    $.each(_element.children, function (childName, childNode) {

      var duplicateChild = childNode;

      // duplicate children
      if ('#comment' !== childNode.nodeName) {
        duplicateChild = childNode.getDuplicateForParent(duplicate);
      }

      // and append them to ourselves
      duplicate.appendChildNode(duplicateChild);
    });
        
    return duplicate;
  };
    
  /**
   * get a serializable object of this element, recursive
   * 
   * @return  object
   */
  _element.getAsSerializable = function () {
    var data = {};
        
    data.nodeName = _element.name;
    data.attributes = $.extend({}, _element.attributes, _element.systemAttributes);
        
    if (_element.children.length === 0) {
      // append the nodeValue ONLY if this element has no children!
      data.nodeValue = _element.value.trim();
    }
        
    data.children = [];
        
    // also parse children
    $.each(_element.children, function (i, child) {
      if ('#comment' === child.nodeName) {
        data.children.push({nodeName: '#comment', attributes: {}, nodeValue: child.textContent, children: []});
      } else {
        data.children.push(child.getAsSerializable());
      }
    });
        
    return data;
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
    
  if ($n.get(0).nodeType !== 1) {
    // if this is not an element node, it must be a text-node!
    _element.name = '#text';
  }
    
  /**
   * system-attributes. hidden from the user
   * @var object
   */
  _element.systemAttributes = {};
    
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
    
  /**
   * list of listeners
   * @var array
   */
  var listeners = [];
    
  /**
   * unique id
   * @var integer
   */
  var _uid = uniqueID();
    
};

/**
 * creator of unique IDs
 * source: http://arguments.callee.info/2008/10/31/generating-unique-ids-with-javascript/
 * no license mentioned.
 */
var uniqueID = (function() {
  var id = 1; // initial value
  return function() {
    return id++;
  }; // NOTE: return value is a function reference
})(); // execute immediately