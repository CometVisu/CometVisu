/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * The Browser-Represenation-Layer of the Editor.
 * 
 * Uses a Configuration-object to display and make editable a configuration in the browser
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
 * @since       2012-10-28
 * @requires    Schema.js, Configuration.js, Result.js, Messages.js
 */

/**
 * Editor-Class
 * 
 * @param   config  object  Configuration-object
 */
var Editor = function (config) {
    if (config == undefined || config == '' || !config.rootNodes) {
        throw 'no, empty or invalid Configuration given, can not instantiate without one';
    }
    
    /**
     * remember myself
     */
    var _editor = this;
    
    /**
     * remember the Configuration
     */
    var _config = config;
    
    /**
     * render the Editor.
     * Will render the editor in the specified DOMNode.
     * 
     * @param   selector    mixed   selector, jquery-element or DOMNode in which to render the Editor
     */
    _editor.render = function (selector) {
        var $target = $(selector);
        

        var container = $('<ul />').attr('id', 'config');
        
        $.each(_config.rootNodes, function (i, node) {
            var element = new EditorConfigurationElement(_editor, node);
            
            container.append(element.getAsHTML());
        });
        

        $target.append(container);
    };
}

/**
 * a single ConfigurationElement in the Editor
 * 
 * @param   parent  object  Editor-object / parent
 * @param   element object  ConfigurationElement
 */
var EditorConfigurationElement = function (parent, element) {
    var _self = this;
    
    /**
     * the Editor/parent
     * @var object
     */
    var _parent = parent;
    
    /**
     * ConfigurationElement we are.
     * @var object
     */
    var _element = element;
    
    /**
     * my HTML-node
     * @var object
     */
    var _html = undefined;
    
    var KEYCODE_ENTER = 13;
    var KEYCODE_ESCAPE = 27;
    
    /**
     * everything to do with buttons
     * @var object
     */
    var Buttons = {
        /**
         * return a generic button
         * 
         * @return  jquery-object   a generic button
         */
        getGenericButton: function () {
            return $('<span />').addClass('button').append($('<span />').addClass('image'));
        },
        /**
         * get the default buttons for an element
         * 
         * @param   settings    object  a hash of settings to obey
         * @return  jquery-object       the default top buttons for an element
         */
        getTopButtonHTML: function (settings) {
            var $html = $('<span />').addClass('buttons');

            settings = $.extend({
                                attributes: true,
                                children: true,
                                remove: true,
                                },
                                settings || {});

            // @TODO: implement (preview,  select (copy/move/paste), show only this) (MS3+)

            var $button = Buttons.getGenericButton();


            
            var $buttonAddChild = $button.clone().addClass('addchild');
            if (false === settings.children) {
                $buttonAddChild.addClass('disabled');
                $buttonAddChild.attr('title', Messages.editor.tooltips.buttons.disabled);
            } else {
                $buttonAddChild.click(Buttons.clickHandler);
                $buttonAddChild.attr('title', Messages.editor.tooltips.buttons.addChild);
            }
            $html.append($buttonAddChild);
            delete $buttonAddChild;

            //$html.append($button.clone().addClass('select').click(Buttons.clickHandler));
            
            var $buttonRemove = $button.clone().addClass('remove');
            if (false === settings.remove) {
                $buttonRemove.addClass('disabled');
                $buttonRemove.attr('title', Messages.editor.tooltips.buttons.disabled);
            } else {
                $buttonRemove.click(Buttons.clickHandler);
                $buttonRemove.attr('title', Messages.editor.tooltips.buttons.remove);
            }
            $html.append($buttonRemove);
            delete $buttonRemove;

            // Spacer
            $html.append($button.clone().addClass('spacer'));

            //$html.append($button.clone().addClass('preview').click(Buttons.clickHandler));

            if (settings.attributes) {
                var $buttonAttributes = $button.clone().addClass('attributes').click(Buttons.clickHandler);
                $buttonAttributes.attr('title', Messages.editor.tooltips.buttons.attributes);
                $html.append($buttonAttributes);
                delete $buttonAttributes;
            }


            if (settings.children) {
                var $buttonChildren = $button.clone().addClass('children').click(Buttons.clickHandler);
                $buttonChildren.attr('title', Messages.editor.tooltips.buttons.children);
                $html.append($buttonChildren);
                delete $buttonChildren;
            }

            //$html.append($button.clone().addClass('clipview').click(Buttons.clickHandler));
            delete $button;

            return $html;
        },

        /**
         * Generic Click-Handler for the buttons
         * 
         * @param   event   jQuery-event
         */
        clickHandler: function (event) {
            var $button = $(this);

            if ($button.is('.attributes')) {
                // Attributes-button was clicked
                $button.closest('span.element').find('> ul.attributes:not(.visible), > ul.attributes.visible li:not(.visible)').slideToggle('fast');
                $button.closest('span.element').find('> ul.attributes.visible').toggleClass('collapsed');
                $button.toggleClass('active');
            }

            if ($button.is('.addchild')) {
                // add a child element
                // we will need a list of valid child-elements to select from.
                // then we add that node
                var $selector = AddChild.getAsHTML();
                
                if ($selector == undefined) {
                    alert(Messages.validity.noMoreChildrenAllowed);
                    return;
                }
                
                $button.closest('.buttons').hide();
                $button.closest('span.element').find('> span.buttons').after($selector);
            }

            if ($button.is('.remove')) {
                // remove this element
                if (window.confirm('delete node?')) {
                    // check if remove is ok, maybe we have a problem with bounds?
                    if (false === _element.isRemovable()) {
                        // user-feedback
                        alert(Messages.editor.elementNotRemovable);
                        return;
                    }
                    
                    _element.remove();
                    $(_html).remove();
                    _parent.redrawChildrenButton();
                    delete _element;
                }
            }

            if ($button.is('.children')) {
                // children-button, let's toggle display of this elements children
                $button.closest('span.element').children('ul.children').slideToggle('fast');
                $button.toggleClass('active');
            }
        },
    };
    
    var AddChild = {
        settings: {
            textDefault: '- select -',
            valueDefault: '',
            cssClass: 'addChildContainer',
        },
        
        /**
         * get the HTML to add a single child to our element
         * 
         * @return  jquery-object   the DOM to add a child element
         */
        getAsHTML: function () {
            var $selector = $('<span />').addClass(AddChild.settings.cssClass);
            
            var validElements = _element.getAllowedElements();
            
            if (validElements == undefined) {
                throw 'no list of allowed elements available, programmer: no schemaElement?';
            }
            
            var $select = $('<select />');
            var $defaultOption = $('<option />');
            $defaultOption.attr('value', AddChild.settings.valueDefault);
            $defaultOption.html(AddChild.settings.textDefault)
            $select.append($defaultOption);
            delete $defaultOption;
            
            $.each(validElements, function (name, element) {
                // filter validElements - only show those that can be added
                if (true === _element.isChildCreatable(name)) {
                    // we are good to go
                    var $option = $('<option />');
                    $option.attr('value', name);
                    $option.html(name);

                    $select.append($option);
                }
            });
            
            if ($select.children().length == 1) {
                // there is nothing we could add ...
                // user-feedback. there is nothing we could add ... (MS2)
                return undefined;
            }

            $selector.append($select);
            
            // an "add"-button
            var $addButton = Buttons.getGenericButton();
            $addButton.addClass('addchild');
            $addButton.bind('click', AddChild.saveHandler);
            $selector.append($addButton);
            delete $addButton;

            // a "cancel"-button
            var $cancelButton = Buttons.getGenericButton();
            $cancelButton.addClass('cancel');
            $cancelButton.bind('click', AddChild.cancelHandler);
            $selector.append($cancelButton);
            delete $cancelButton;

            
            return $selector;
        },
        
        /**
         * create the new element and append it to the Editor
         */
        saveHandler: function () {
            var $select = $(this).closest('.' + AddChild.settings.cssClass).find('select');
            
            // get the name for the new element
            var name = $select.val();
            
            if (name == AddChild.settings.valueDefault) {
                // nothing added, nothing to be done
                return;
            }
            
            // create a new Configuration-Node
            var childNode = _element.createChildNode(name);
            
            // create a new Editor-Node
            var childEditorNode = new EditorConfigurationElement(_self, childNode);
            
            // append the EditorNodes HTML to the DOM
            $select.closest('.element').children('ul.children').first().append(childEditorNode.getAsHTML());
            
            // show the normal top-buttons again...
            $select.closest('.element').find('.buttons:hidden').first().show();
            
            // and kill the messenger.. uh, remove the select-list from view
            $select.closest('span.' + AddChild.settings.cssClass).remove();
            _self.redrawChildrenButton();
        },

        /**
         * cancel adding a child.
         */
        cancelHandler: function () {
            var $select = $(this).closest('.' + AddChild.settings.cssClass).find('select');

            // show the normal top-buttons again...
            $select.closest('.element').find('.buttons:hidden').first().show();
            
            // and kill the messenger.. uh, remove the select-list from view
            $select.closest('span.' + AddChild.settings.cssClass).remove();
        },
        
        
    };
    
    /**
     * everything about our attributes
     * @var object
     */
    var Attributes = {
        /**
         * get this elements HTML for its attributes
         * 
         * @return  jquery-object   the HTML for the attributes for this element only
         */
        getAsHTML: function () {
            // go over the attributes ...
            var allAttributes = $.extend({}, _element.attributes);

            var schemaElement = _element.getSchemaElement();
            if (schemaElement != undefined) {
                allAttributes = $.extend({}, schemaElement.allowedAttributes, _element.attributes);
            }

            var $attributes = $('<ul />').addClass('attributes');
            $.each(allAttributes, function (key, value) {
                var isOptional = undefined;
                
                if (schemaElement != undefined) {
                    var schemaAttribute = schemaElement.allowedAttributes[key];
                    isOptional = schemaAttribute.isOptional;
                }
                
                var $attribute = $('<li />').addClass('attribute');
                
                if (key == 'name') {
                    $attribute.addClass('visible');
                }

                // name of the attribute
                var $name = $('<span />').addClass('name').html(key);
                if (true === isOptional) {
                    $name.addClass('optional');
                } else {
                    $name.addClass('required');
                }
                $attribute.append($name);
                delete $name;

                // value of the attribute
                var $value;
                if (typeof value == 'string' && value.trim() != '') {
                    $value = $('<span />').addClass('value').html(value);
                } else {
                    // not set
                    $value = $('<span />').addClass('value').addClass('notset');
                }
                $value.attr('title', Messages.editor.tooltips.clickToEdit);
                $attribute.append($value);
                // attach a click-handler
                $value.bind('click', Attributes.clickHandler);
                delete $value;

                $attributes.append($attribute);
                delete $attribute;
            });
            delete allAttributes;

            if ($attributes.is(':empty')) {
                return undefined;
            }
            
            if ($attributes.find('.visible').length > 0) {
                $attributes.addClass('visible').addClass('collapsed');
                $attributes.find('li:not(.visible)').hide();
            } else {
                $attributes.hide();
            }

            return $attributes;
        },
        
        /**
         * Generic Click-Handler for the attributes/values
         * 
         * @param   event   jQuery-event
         */
        clickHandler: function (event) {
            var $value = $(this);
            var attributeValue = $value.html();

            $value.hide();

            var attributeName = $value.siblings('span.name').text();
            // get a list of valid values for this attribute, if it is an enumeration.
            var elementEnumeration = _element.getSchemaElement().allowedAttributes[attributeName].getEnumeration();
            var isOptional = _element.getSchemaElement().allowedAttributes[attributeName].isOptional;

            // @TODO: this will be the place to use dataproviders! (MS3+)
            // @TODO: type hinting or some kind of input-help (no MS yet)

            // build the input-element to be displayed.
            var $input = getInputForValueAndEnumeration(attributeValue, elementEnumeration, false, isOptional);
            // insert input-field into the DOM
            $value.after($input);

            // bind event handlers.
            $input.bind('cancel', Attributes.cancelHandler);
            $input.bind('blur', Attributes.saveHandler);
            $input.bind('keyup', Attributes.keypressHandler);

            // put the focus into this element
            $input.get(0).focus();
        },

        /**
         * listen to keypresses for an attribute
         * 
         * @var event   jQuery-event
         */
        keypressHandler: function (event) {
            if (event.which == KEYCODE_ENTER) {
                // enter pressed. save.
                $(this).triggerHandler('blur');
            }

            if (event.keyCode == KEYCODE_ESCAPE) {
                // escape-key was pressed. cancel.
                $(this).triggerHandler('cancel');
            }
        },

        /**
         * listen to cancel-events for an attribute
         * 
         * @var event   jQuery-event
         */
        cancelHandler: function (event) {
            // cancel has occured.
            // this means we remove the input, and re-display the old value. pretty simple.

            var $input = $(this);
            var $value = $input.siblings('span.value');

            $input.remove();
            $value.show();
        },
        
        /**
         * listen to blur for an attribute
         * 
         * @var event   jQuery-event
         */
        saveHandler: function (event) {
            // blur has occured.
            // this means we have to validate and save the value.

            var $input = $(this);
            var $value = $input.siblings('span.value');

            var inputValue = $input.val();
            var attributeName = $input.siblings('span.name').text();

            // save the value of the attribute, and check if it is valid at the same time.
            var tmpResult = _element.setAttributeValue(attributeName, inputValue);

            if (tmpResult.success !== true) {
                // the value is not valid, and thus could not be set.
                alert(tmpResult.message);
                return;
            }

            // set the value to the display-element
            $value.html(inputValue);

            // if no value is set, it has to be displayed differently
            if ($.trim(inputValue) == '') {
                $value.addClass('notset');
            } else {
                $value.removeClass('notset');
            }

            $input.remove();
            $value.show();
        },
    };
    
    /**
     * everything about our textContent (if any)
     * @var object
     */
    var TextContent = {
        /**
         * get the HTML-presentation of this elements text-content
         * 
         * @return jquery-object    the HTML
         */
        getAsHTML: function () {
            var text = _element.value;

            var $textContent = $('<span />').addClass('content');
            var $value = $('<span />').addClass('value').html(text);
            if ($.trim(text) == '') {
                $value.addClass('notset');
            }
            $value.attr('title', Messages.editor.tooltips.clickToEdit);

            $textContent.append($value);

            $value.bind('click', TextContent.clickHandler);

            return $textContent;
        },
        
        /**
         * Generic Click-Handler for the textContent
         * 
         * @param   event   jQuery-event
         */
        clickHandler: function (event) {
            var $value = $(this);
            var nodeValue = $value.html();

            $value.hide();

            var elementEnumeration = [];
            if (false == _element.getSchemaElement().isMixed) {
                // get a list of valid values for this node, if it is an enumeration.
                // only if not mixed, because mixed is un-bounded!
                elementEnumeration = _element.getSchemaElement().getAllowedContent()._text.getEnumeration();
            }


            // get the DOM for an input..
            var $input = getInputForValueAndEnumeration(nodeValue, elementEnumeration);
            // insert input-field into the DOM
            $value.after($input);

            // bind event handlers.
            $input.bind('cancel', TextContent.cancelHandler);
            $input.bind('blur', TextContent.saveHandler);
            $input.bind('keyup', TextContent.keypressHandler);

            // put the focus into this element
            $input.get(0).focus();
        },    

        /**
         * listen to keypresses for an attribute
         * 
         * @var event   jQuery-event
         */
        keypressHandler: function (event) {
            if (event.which == KEYCODE_ENTER) {
                // enter pressed. save.
                $(this).triggerHandler('blur');
            }

            if (event.keyCode == KEYCODE_ESCAPE) {
                // escape-key was pressed. cancel.
                $(this).triggerHandler('cancel');
            }
        },

        /**
         * listen to cancel-events for an attribute
         * 
         * @var event   jQuery-event
         */
        cancelHandler: function (event) {
            // cancel has occured.
            // this means we remove the input, and re-display the old value. pretty simple.

            var $input = $(this);
            var $value = $input.siblings('span.value');

            $input.remove();
            $value.show();
        },
        
        /**
         * listen to blur for an attribute
         * 
         * @var event   jQuery-event
         */
        saveHandler: function (event) {
            // blur has occured.
            // this means we have to validate and save the value.

            var $input = $(this);
            var $value = $input.siblings('span.value');

            var inputValue = $input.val();

            // save the value of the attribute, and check if it is valid at the same time.
            var tmpResult = _element.setTextValue(inputValue);

            if (tmpResult.success !== true) {
                // the value is not valid, and thus could not be set.
                alert(tmpResult.message);
                return;
            }

            // set the value to the display-element
            $value.html(inputValue);

            // if no value is set, it has to be displayed differently
            if ($.trim(inputValue) == '') {
                $value.addClass('notset');
            } else {
                $value.removeClass('notset');
            }

            $input.remove();
            $value.show();
        },
    };
    
    /**
     * create the DOM for an input-element
     * 
     * @param   value       string  the value of the input-field
     * @param   enumeration array   list of values, if the input is supposed to be a list
     * @param   userinput   boolean is user-input allowed as an alternative to the enumeration?
     * @param   isOptional  boolean is the value for this field optional?
     * @return  jquery-object       DOM of the input-element
     */
    var getInputForValueAndEnumeration = function (value, enumeration, userinput, isOptional) {
        // build the input-element to be displayed.
        var $input;
        if (typeof enumeration == 'undefined' || enumeration == undefined || enumeration.length == 0) {
            // there is no enumeration for this element
            $input = $('<input />').val(value);
        } else {
            // @TODO: obey userinput, make input user-definable (whoa, whoa! that means an input-field!) (MS3, dataproviders)
            
            // this attribute is an ENUM, so we need a select-list.
            $input = $('<select />');
            
            var tmpEnumeration = $.extend([], enumeration);
            if (true === isOptional) {
                tmpEnumeration.unshift('');
            }
            
            $.each(tmpEnumeration, function (i, enumEntry) {
                var $option = $('<option />');
                
                var enumLabel;
                var enumValue;
                
                if (typeof enumEntry == 'string') {
                    enumLabel = enumValue = enumEntry;
                }
                // @TODO: dataproviders will give us an object of data instead of a string, use that then (MS3)
                
                $option.attr('value', enumValue);
                $option.html(enumLabel);
                
                if (enumValue == value) {
                    // pre-select this value
                    $option.prop('selected', true);
                }
                
                $input.append($option);
            });
        }
        
        return $input
    };
    
    
    var defaultChildButtonDisplayStyle = undefined;
    /**
     * re-check if we have children, and show or hide the button accordingly
     */
    _self.redrawChildrenButton = function () {
        var hasChildren = _html.find('ul.children > li').length > 0;
        var buttonChildren = _html.find('.button.children').first();
        
        if (false === defaultChildButtonDisplayStyle) {
            // jQuery does not apply show() correctly on inline-block, and the code may not interfere with the layout
            // so we find out the original display-style, and remember it.
            defaultChildButtonDisplayStyle = buttonChildren.css('display');
        }
        
        if (hasChildren) {
            buttonChildren.css({display: defaultChildButtonDisplayStyle});
        } else {
            buttonChildren.css({display: 'none'});
        }
    }
    

    /**
     * get the current ConigurationElement
     * 
     * @return  ConfigurationElement
     */
    _self.getConfigurationElement = function () {
        return _element;
    };
    
    /**
     * create the html of us. recursive!
     * 
     * @return  jquery-object   the HTML to display for this node and its children
     */
    _self.getAsHTML = function () {
        // create this elements markup, divided into outer shell (container, tree) and inner part (text, buttons, ...)
        _html = $('<li />').addClass('element');
        _html.append($('<span />').addClass('tree').append($('<span />').addClass('image')));
        
        var $innerHTML = $('<span />').addClass('element');
        _html.append($innerHTML);
        
        var $name = $('<span />').addClass('name').html(_element.name);
        $innerHTML.append($name);
        delete $name;

        // get the html for our attributes (and those that are allowed but not set)
        // depending on that, we set/add buttons, that is why we do it so early
        var $attributes = Attributes.getAsHTML();

        // define, which buttons to show
        // attributes only, if there are some that are not immediately visible
        // children only if this element can have some
        // remove-button only if this element can be removed
        var schemaElement = _element.getSchemaElement();
        var allowedChildren = schemaElement.getAllowedElements();
        
        var buttonConfig = {
                            attributes: ($attributes != undefined && $attributes.find('li:not(.visible)').length > 0),
                            children:   !$.isEmptyObject(allowedChildren),
                            remove:     _element.isRemovable(),
                            };
        
        $innerHTML.append(Buttons.getTopButtonHTML(buttonConfig));
        delete buttonConfig;
        
        // does this element have text-value, and/or is it allowed to have?
        // do not display this for mixed elements!
        if (!schemaElement.isMixed && schemaElement.getAllowedContent()._text != false) {
            $innerHTML.append(TextContent.getAsHTML());
        }

        if ($attributes != undefined) {
            // this means we do have some attributes (set or unset)
            $innerHTML.append($attributes);
        }

        // append this elements children (immediate first, the recurse)
        var $children = $('<ul />').addClass('children').hide();

        $.each(_element.children, function (i, node) {
            var element = new EditorConfigurationElement(_self, node);

            $children.append(element.getAsHTML());
        });
        $innerHTML.append($children);
        delete $children;

        // redraw the toggle-children-display-button - maybe we have none
        _self.redrawChildrenButton();

        // append this element to the DOM - no reason yet why to do this
        //_html.data('EditorElement', _self);
        
        return _html;
    };
}
