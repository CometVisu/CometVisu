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
 * @requires    Schema.js, Configuration.js, Result.js, Messages.js, DataProvider.js
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
     * filename-suffix for the preview-configuration
     * @var string
     */
    var _previewSuffix = 'previewtemp';
    
    /**
     * disable the feedback on a successful 'save configuration'
     * will be honoured once only, and then reset!
     * @var boolean
     */
    var savingPreview = false;
    
    /**
     * is the expert-mode active?
     * @var boolean
     */
    var isExpert = false;
    
    var clickHandler = function (event) {
        var $button = $(this);
        
        if ($button.is('.save')) {
            // save configuration
            if (false === _config.isValid()) {
                // configuration is not valid
                alert(Messages.editor.notSavingInvalidConfiguration);
                return;
            }

            // save the configuration
            _config.save();
        }
        
        if ($button.is('.preview')) {
            // preview configuration
            
            if ($('iframe#preview').length > 0) {
                // there already is a preview - so toggle back and return to editing
                $('iframe#preview').remove();
                $('ul#config').show();
                $('.menu .button.preview').removeClass('active');
                return;
            }

            if (false === _config.isValid()) {
                // configuration is not valid
                alert(Messages.editor.notSavingInvalidConfiguration);
                return;
            }

            savingPreview = true;
            $(document).one('configuration_saving_success', previewShowHandler);

            // save the configuration
            _config.save('visu_config_' + _previewSuffix + '.xml');
        }
        
        
        if ($button.is('.expert')) {
            // show/hide expert-attributes
            $('#config').find('.expert').toggle();
            $button.toggleClass('active');
            
            isExpert = $button.hasClass('active');
        }
    };
   

    /**
     * eventHandler
     * 
     * @param   event   jQuery-Event
     */
    var eventHandler = function (event, result) {
        switch (event.type) {
            case 'configuration_saving_error':
                // something went wrong
                // we can not fix it, so let's simply inform the user, and leave.
                alert(result.message);
                break;
            case 'configuration_saving_success':
                // everything is cool, configuration was saved
                // @TODO: maybe implement some sort of "traffic light" that goes to green when the configuration was saved?
                
                if (false === savingPreview) {
                    // only show feedback if this is not saving a preview ...
                    var tmpResult = new Result(false, Messages.configuration.saved);
                    alert(tmpResult.message);
                }
                
                break;
        }
        
        // re-enable saving success feedback to 'true'
        savingPreview = false;
    };
    
    /**
     * preview the configuration.
     * this handler is called AFTER the preview-configuration has already been saved
     */
    var previewShowHandler = function () {
        // remove a preview if there is one (should never happen, but better be safe than sorry)
        $('iframe#preview').remove();
        
        // mark the button as being active
        $('.menu .button.preview').addClass('active');


        // hide the editing-view
        $('ul#config').hide();
        
        // create, and render the preview
        var $preview = $('<iframe />')
        $preview.attr({id: 'preview', src: 'index.html?config=' + _previewSuffix});
        
        
        var height = $(window).height() - $('#editor .menu').height() - $('#editor .menu').position().top;
        
        $preview.css({width: '100%', height: height + 'px', border: 'none'});
        
        $('#editor').append($preview);
    };
    
    /**
     * render the Editor.
     * Will render the editor in the specified DOMNode.
     * 
     * @param   selector    mixed   selector, jquery-element or DOMNode in which to render the Editor
     */
    _editor.render = function (selector) {
        var $target = $(selector);
        

        var $container = $('<ul />').attr('id', 'config');
        
        $.each(_config.rootNodes, function (i, node) {
            var element = new EditorConfigurationElement(_editor, node);
            
            $container.append(element.getAsHTML());
        });
        
        $container.click(function () {
            // if no one else catched the event we hide all submenus; thats the least we can do :)
            $('.submenu:visible').hide();
            $('.toggleSubmenu.active').removeClass('active');
        });
        
        var $editor = $('<div />').attr('id', 'editor');
        
        var $menu = $('<div />').addClass('menu');
        var $save = $('<span />')
                        .addClass('button')
                        .addClass('save')
                        .html(Messages.editor.ui.save.text)
                        .attr('title', Messages.editor.ui.save.tooltip)
                        .click(clickHandler);
        $menu.append($save);

        var $expert = $('<span />')
                        .addClass('button')
                        .addClass('expert')
                        .html(Messages.editor.ui.expert.text)
                        .attr('title', Messages.editor.ui.expert.tooltip)
                        .click(clickHandler);
        $menu.append($expert);

        var $preview = $('<span />')
                        .addClass('button')
                        .addClass('preview')
                        .html(Messages.editor.ui.preview.text)
                        .attr('title', Messages.editor.ui.preview.tooltip)
                        .click(clickHandler);
        $menu.append($preview);

        $editor.append($menu);
        
        $editor.append($container);
        

        $target.append($editor);
        
        // register event-handlers
        $(document).bind('configuration_saving_error', eventHandler);
        $(document).bind('configuration_saving_success', eventHandler);
    };
    
    var rememberedElement = {
                                element: undefined,
                                options: undefined,
                            };
    
    /**
     * remember an element.
     * 
     * Used for cut, copy & paste
     * 
     * @param   element object  EditorConfigurationElement to remember
     * @param   options object  options to remember additionally
     */
    _editor.rememberElement = function (element, options) {
        rememberedElement.element = element;
        rememberedElement.options = options;
    }
    
    
    /**
     * get the remembered element
     * 
     * @return  object  the remembered element (or undefined if none)
     */
    _editor.getRememberedElement = function () {
        return rememberedElement.element;
    };
    
    
    /**
     * get the options that were stored alongside the remembered element
     * 
     * @return  object  the options
     */
    _editor.getRememberedElementOptions = function () {
        return rememberedElement.options;
    };

    /**
     * find out if expert attributes are to be visible
     * 
     * @return  boolean
     */
    _editor.areExpertAttributesVisible = function () {
        return isExpert;
    }
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
     * cache of children
     * @var array
     */
    var _childrenCache = {};
    
    /**
     * everything to do with buttons
     * @var object
     */
    var UIElements = {
        /**
         * element-cache
         * @var object
         */
        cache: {
            /**
             * submenu
             * @var object
             */
            $submenu: undefined,
        },

        /**
         * return a generic button
         * 
         * @return  jquery-object   a generic button
         */
        getGenericButton: function () {
            return $('<span />').addClass('button').append($('<span />').addClass('image'));
        },

        /**
         * get a button of a specified type, like 'children'
         * 
         * @param   type    string  type of the button
         * @return  jquery-object   the button
         */
        getButtonOfType: function (type) {
            var $button;
            switch (type) {
                case 'children':
                    $button = UIElements.getGenericButton().addClass('children').click(UIElements.clickHandler);
                    $button.attr('title', Messages.editor.ui.children.tooltip);
                    break;
                case 'toggleSubmenu':
                    $button = UIElements.getGenericButton().addClass('toggleSubmenu').click(UIElements.clickHandler);
                    $button.attr('title', Messages.editor.ui.toggleSubmenu.tooltip);
                    break;
                default:
                    throw 'programming error, no button of type known, type: ' + type;
            }
            
            return $button;
        },
        
        /**
         * get the default buttons for an element
         * 
         * @param   settings    object  a hash of settings to obey
         * @return  jquery-object       the default top buttons for an element
         */
        getSubMenuHTML: function (settings) {
            if (UIElements.cache.$submenu != undefined) {
                return UIElements.cache.$submenu;
            }
            
            var $html = $('<span />').addClass('submenu');

            settings = $.extend({
                                remove: true,
                                },
                                settings || {});

            // @TODO: implement (preview,  show only this) (MS5+)

            var $button = UIElements.getGenericButton();
            var $menuitem = $('<span />').addClass('menuitem');

            var $tmpItem;

            if (true === settings.children) {
                $tmpItem = $menuitem.clone();
                $tmpItem.addClass('addchild').click(UIElements.clickHandler);
                $tmpItem.attr('title', Messages.editor.ui.addChild.tooltip);
                $tmpItem.text(Messages.editor.ui.addChild.text);
                $html.append($tmpItem);
                delete $tmpItem;
            }
            
            $tmpItem = $menuitem.clone();
            $tmpItem.addClass('remove').click(UIElements.clickHandler);
            $tmpItem.attr('title', Messages.editor.ui.remove.tooltip);
            $tmpItem.text(Messages.editor.ui.remove.text);
            if (false === settings.remove) {
                $tmpItem.addClass('disabled');
            }
            $html.append($tmpItem);
            delete $tmpItem;
            
            // Spacer
            $html.append($menuitem.clone().addClass('spacer'));

            // cut, copy, paste
            $.each(['cut', 'copy', 'paste'], function (i, item) {
                $tmpItem = $menuitem.clone();
                $tmpItem.addClass(item).click(UIElements.clickHandler);
                $tmpItem.attr('title', Messages.editor.ui[item].tooltip);
                $tmpItem.text(Messages.editor.ui[item].text);
                $html.append($tmpItem);
                delete $tmpItem;
            });
            
            // sort (like move with same parent); only if the parent allows for sorting!
            // (check tyepof getConfigurationElement, as the root-element has no such thing)
            if (true === element.getSchemaElement().isSortable()) {
                $tmpItem = $menuitem.clone();
                $tmpItem.addClass('sort').click(UIElements.clickHandler);
                $tmpItem.attr('title', Messages.editor.ui['sort'].tooltip);
                $tmpItem.text(Messages.editor.ui['sort'].text);
                $html.append($tmpItem);
                delete $tmpItem;
            }


            // search for the paste-button, and tell it which elements to allow
            var $paste = $html.find('.menuitem.paste');
            $.each(_element.getAllowedElements(), function (name) {
                $paste.addClass('paste_allows_' + name);
            });


            // disable the paste button if there is currently no remembered element
            $paste.addClass('disabled');

            var rememberedOptions = _parent.getRememberedElementOptions();
            if (undefined != rememberedOptions) {
                if (rememberedOptions.type == 'copy' || rememberedOptions.type == 'cut') {
                    if (undefined != rememberedOptions && name == rememberedOptions.nodeType) {
                        // if the remembered element matches a compatible element, remove the disabled-flag
                        if ($paste.is('.paste_allows_' + rememberedOptions.nodeType)) {
                            $paste.removeClass('disabled');
                        }
                    }
                }
            }


            delete $paste;
            
            $html.hide();

            UIElements.cache.$submenu = $html;

            return $html;
        },
        
        /**
         * hide the submenu
         */
        hideSubMenu: function () {
            UIElements.cache.$submenu.hide();
        },
        
        /**
         * hide any visible submenu
         */
        hideAllSubMenus: function () {
            $('.submenu:visible').hide();
            $('.toggleSubmenu.active').removeClass('active');
        },
        
        /**
         * toggle the submenu
         */
        toggleSubMenu: function () {
            // hide all other submenus
            $('.submenu:visible').not(UIElements.cache.$submenu).hide();
            UIElements.cache.$submenu.slideToggle();
        },

        /**
         * Generic Click-Handler for the UIElements
         * 
         * @param   event   jQuery-event
         */
        clickHandler: function (event) {
            var $uiElement = $(this);
            
            // disabled elements are non-clickable. period.
            if ($uiElement.is('.disabled')) {
                return;
            }

            if ($uiElement.is('.toggleSubmenu')) {
                // button to display/hide the submenu
                UIElements.toggleSubMenu();
                $uiElement.addClass('active');
                event.stopPropagation();
            }

            if ($uiElement.is('.attributes')) {
                // Attributes-button was clicked
                Attributes.toggleDisplay();
                $uiElement.toggleClass('active');
            }

            if ($uiElement.is('.addchild')) {
                // add a child element
                // we will need a list of valid child-elements to select from.
                // then we add that node
                var $selector = AddChild.getAsHTML();
                
                if ($selector == undefined) {
                    alert(Messages.validity.noMoreChildrenAllowed);
                    return;
                }
                
                UIElements.cache.$submenu.hide();
                
                $uiElement.closest('span.element').find('> span.name').after($selector);
            }

            if ($uiElement.is('.remove')) {
                // remove this element
                UIElements.hideSubMenu();
                if (window.confirm('delete node?')) {
                    // check if remove is ok, maybe we have a problem with bounds?
                    _self.remove();
                }
            }

            if ($uiElement.is('.children')) {
                // children-button, let's toggle display of this elements children

                if (true === $uiElement.is('.disabled')) {
                    // nah!
                    return;
                }

                $uiElement.closest('li').find('span.element').first().children('ul.children').slideToggle('fast');
                $uiElement.toggleClass('active');
            }
            
            if ($uiElement.is('.copy')) {
                _parent.rememberElement(_self, {type: 'copy', nodeType: _element.name});
                // activate paste-buttons
                $('ul#config .paste.paste_allows_' + _element.name).removeClass('disabled');
                UIElements.hideSubMenu();
            }
            
            if ($uiElement.is('.cut')) {
                if (false === _element.isRemovable()) {
                    // if the element can not be removed, it can not be cut either!
                    // user-feedback
                    alert(Messages.editor.elementNotCuttable);
                    return;
                }
                
                // first, clean up a previous cut/sort that was not finished
                UIElements.cancelSort();
                UIElements.cancelCut();
                
                _parent.rememberElement(_self, {type: 'cut', nodeType: _element.name});

                // activate paste-buttons
                $('ul#config .paste.paste_allows_' + _element.name).removeClass('disabled');

                // mark this element as being cut-out, by css
                _html.addClass('cutout');
                UIElements.hideSubMenu();
            }
            
            if ($uiElement.is('.paste')) {
                if ($uiElement.is('.disabled')) {
                    return;
                }
                
                var originalEditorElement = _parent.getRememberedElement();
                var options = _parent.getRememberedElementOptions();
                
                if (originalEditorElement == undefined || options == undefined) {
                    return;
                }
                
                var originalElement = originalEditorElement.getConfigurationElement();

                // clone the ConfigurationElement, and create a new EditorConfigurationElement with that
                var newElement = originalElement.getDuplicateForParent(_element);
                _element.appendChildNode(newElement);
                
                _self.redrawHTML();
                
                if (options.type == 'cut') {
                    // remove the original element if type was cut
                    originalEditorElement.remove();
                }
                
                // clear rememberedElement afterwards
                _parent.rememberElement(undefined, undefined);

                // deactivate paste-buttons
                $('ul#config .paste').addClass('disabled');
                UIElements.hideSubMenu();
            }
            
            if ($uiElement.is('.sort')) {
                // sorting and cut may not happen at the same time! and no two sorting may happen at once
                UIElements.cancelSort();
                UIElements.cancelCut();
                
                // find my siblings
                var $siblings = _html.siblings().filter('.sortable');
                var $parent = _html.parent();
                
                // create and activate dropzones
                var $dropzone = $('<li />').addClass('dropzone');
                $dropzone.click(UIElements.clickHandler);

                // add dropzones arround my siblings (not arround myself!)
                $siblings.before($dropzone.clone(true));
                $parent.append($dropzone.clone(true));
                
                $parent.find('.dropzone + .dropzone').remove();
                _html.next('.dropzone').hide();
                
                _html.addClass('cutout');
                UIElements.hideSubMenu();
            }
            
            if ($uiElement.is('.dropzone')) {
                // find out position
                var position = $uiElement.parent().find('.dropzone').index($uiElement);

                // as non-sortables do not have a dropzone, we need to add that to the count for correct positioning
                var numberOfNonsortables = $uiElement.prevAll('.element:not(.sortable)').length;
                position += numberOfNonsortables;
                
                // clean up immediately, or the re-positioning will fail, as there are still the dropzones in the DOM
                UIElements.cancelSort();

                // create ourselves a new _self, by using the configurationElement of the old self.
                var sortableElement = _self.getConfigurationElement();

                // clone the ConfigurationElement, and create a new EditorConfigurationElement with that
                sortableElement.remove();
                var sortedElement = sortableElement.getDuplicateForParent(_element.getParentElement());
                _parent.getConfigurationElement().addChildAtPosition(sortedElement, position);
                
                // then: remove ourselves (the old node), before re-arranging the DOM (or this will fail)
                _self.remove();

                // redraw our parents HTML
                _parent.redrawHTML();

                // clear rememberedElement afterwards
                _parent.rememberElement(undefined, undefined);                
            }
        },
        
        /**
         * cancel a previous sorting-action which has not yet been fulfilled
         */
        cancelSort: function () {
            $('.cutout').removeClass('cutout');
            $('.dropzone').remove();
        },
        
        /**
         * cancel a previous cut call which has not yet been pasted
         */
        cancelCut: function () {
            var oldEditorElement = _parent.getRememberedElement();

            if (oldEditorElement != undefined) {
                // we had another element remembered
                // remove any 'cut'-markings from it, if there are any
                oldEditorElement.getAsHTML().removeClass('cutout');
            }

            // clear rememberedElement afterwards
            _parent.rememberElement(undefined, undefined);                
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
            
            // sort the elements in the select-list
            var $options = $select.find('option');
            
            $options.sort(function (a, b) {
                if (a.text > b.text) return 1;
                if (a.text < b.text) return -1;
                return 0;
            });
            
            // we need to re-append the items to the select-list
            $select.empty().append($options);
            delete $options;
            
            // select the 'select one'-entry
            $select.val(AddChild.settings.valueDefault);

            $selector.append($select);
            
            // an "add"-button
            var $addButton = UIElements.getGenericButton();
            $addButton.addClass('addchild');
            $addButton.bind('click', AddChild.saveHandler);
            $selector.append($addButton);
            delete $addButton;

            // a "cancel"-button
            var $cancelButton = UIElements.getGenericButton();
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
            _element.createChildNode(name);
            
            // and kill the messenger.. uh, remove the select-list from view
            $select.closest('span.' + AddChild.settings.cssClass).remove();

            // redraw the HTML
            _self.redrawHTML();
        },

        /**
         * cancel adding a child.
         */
        cancelHandler: function () {
            var $select = $(this).closest('.' + AddChild.settings.cssClass).find('select');

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
         * cache the html of the attributes
         */
        $attributes: undefined,
        
        /**
         * placeholder
         */
        $htmlPlaceholder: undefined,
        
        /**
         * get the placeholder so we can add the attributes later on to save time at startup
         * 
         * @return  jquery-object   the HTML-placeholder
         */
        getPlaceholderAsHTML: function () {
            if (typeof Attributes.$attributes != 'undefined') {
                // use the actual HTML if we have it already
                return Attributes.$attributes;
            }
            
            Attributes.$htmlPlaceholder = $('<span />');
            
            return Attributes.$htmlPlaceholder;
        },

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
                var isExpert = false;
                var attributeDocumentation = '';
                
                if (schemaElement != undefined) {
                    var schemaAttribute = schemaElement.allowedAttributes[key];
                    
                    if (typeof schemaAttribute == 'undefined') {
                        throw 'unknown attribute ' + key + ' for element ' + schemaElement.name; 
                    }
                    
                    isOptional = schemaAttribute.isOptional;
                    
                    var properties = schemaAttribute.getAppinfo();
                    isExpert = properties.indexOf('level:expert') != -1;
                    delete properties;
                    
                    var documentation = schemaAttribute.getDocumentation();
                    if (documentation.length > 0) {
                        attributeDocumentation = documentation[0];
                    }
                    delete documentation;
                }
                
                var $attribute = $('<li />').addClass('attribute');
                $attribute.addClass('attributeType_' + key);
                
                if (true === isExpert) {
                    $attribute.addClass('expert');
                    if (_parent.areExpertAttributesVisible() == false) {
                        $attribute.hide();
                    }
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
                $value.attr('title', Messages.editor.ui.clickToEdit.tooltip);
                
                $attribute.append($value);
                
                // if we have documentation for this attribute, append it
                if (attributeDocumentation != '') {
                    var $attributeDocumentation = $('<span />');
                    $attributeDocumentation.addClass('documentation');
                    $attributeDocumentation.html(attributeDocumentation);
                    $attribute.append($attributeDocumentation)
                    delete $attributeDocumentation;
                }
                
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

            $attributes.hide();
            
            // store in cache
            Attributes.$attributes = $attributes;

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

            var width = $value.width();
            var height = $value.height();
            $value.hide();

            var attributeName = $value.siblings('span.name').text();
            // get a list of valid values for this attribute, if it is an enumeration.
            var elementEnumeration = _element.getSchemaElement().allowedAttributes[attributeName].getEnumeration();
            var isOptional = _element.getSchemaElement().allowedAttributes[attributeName].isOptional;
            var isUserInputAllowed = false;

            // @TODO: type hinting or some kind of input-help? (no MS yet)
            
            // get the dataProvider for this element
            if (elementEnumeration == undefined || elementEnumeration.length == 0) {
                // only do this, if the XSD did not give us an enumeration!
                var dataProvider = DataProviderManager.getProvider(_element.name, attributeName);
                if (undefined != dataProvider) {
                    elementEnumeration = dataProvider.getEnumeration();
                    isUserInputAllowed = dataProvider.isUserInputAllowed();
                }
            }

            // build the input-element to be displayed.
            var $input = getInputForValueAndEnumeration(attributeValue, elementEnumeration, isUserInputAllowed, isOptional);
            // insert input-field into the DOM
            $value.before($input);
            
            $input.width(width);
            $input.height(height);
            

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

            var inputValue = $input.find('input, textarea, select').andSelf().filter('input, textarea, select').val();
            var attributeName = $input.siblings('span.name').text();

            if (false === Attributes.saveValue(attributeName, inputValue)) {
                return;
            }

            $input.remove();
            $value.show();
        },
        
        /**
         * save the value of an attribute
         * 
         * @param   attributeName   string  name of the attribute to set
         * @param   inputValue      string  the value to set the attribute to
         * @return  boolean                 success
         */
        saveValue: function (attributeName, inputValue) {
            var $attributes = Attributes.$attributes;
            var $attributeValue = $attributes.find('li.attribute.attributeType_' + attributeName).find('.value');
            
            if ($attributeValue.length == 0) {
                // we have not attribute of that name
                return false;
            }
            
            // save the value of the attribute, and check if it is valid at the same time.
            var tmpResult = _element.setAttributeValue(attributeName, inputValue);
            
            if (tmpResult.success !== true) {
                // the value is not valid, and thus could not be set.
                alert(tmpResult.message);
                return false;
            }
            
            // if no value is set, it has to be displayed differently
            if ($.trim(inputValue) == '') {
                $attributeValue.addClass('notset');
            } else {
                $attributeValue.removeClass('notset');
            }
            
            $attributeValue.html(inputValue);
            
            return true;
        },
        
        /**
         * actually insert the attributs-HTML into the DOM
         */
        renderHTML: function () {
            var $attributes = Attributes.$attributes;


            if (typeof $attributes == 'undefined') {
                // inject the actual HTML
                $attributes = Attributes.getAsHTML();
                Attributes.$htmlPlaceholder.replaceWith($attributes);
                Attributes.$htmlPlaceholder = undefined;
            }
        },
        
        /**
         * toggle show
         */
        toggleDisplay: function () {
            Attributes.renderHTML();
            var $attributes = Attributes.$attributes;
            
            // first hide
            if ($('ul.attributes:visible').not($attributes).length > 0) {
                // some other attributes are visible, we need to hide them first
                $('ul.attributes:visible').not($attributes)
                    .slideToggle('fast', function () {
                                if (typeof $attributes != 'undefined') {
                                    $attributes.slideToggle('fast');
                                }
                    });
            } else {
                // no other attributes are currently visible
                if (typeof $attributes != 'undefined') {
                    $attributes.slideToggle('fast');
                }
            }
            
            return;
        },
        
        /**
         * hide all visible attributes, whoever they may belong to
         */
        hideAll: function () {
            $('ul.attributes:visible').slideToggle('fast');
        },
        
        /**
         * mark an attribute as invalid.
         * 
         * @param   attributeName   string  name of the attribute
         */
        markAttributeInvalid: function (attributeName) {
            Attributes.renderHTML();
            var $attributes = Attributes.$attributes;
            
            var $invalidAttribute = $attributes.find('span.name:contains(' + attributeName + ')').closest('li.attribute');
            
            $attributes.parents('li.element').addClass('invalidChildAttribute');
            $attributes.closest('li.element').removeClass('invalidChildAttribute').addClass('invalidAttribute');
            
            $invalidAttribute.addClass('invalid');
            
            $invalidAttribute.bind('valid', Attributes.markAttributeValid);
        },
        
        
        /**
         * mark an attribute as valid.
         * 
         * Will be called from jQuery via event-handlers
         */
        markValueChanged: function (attributeName) {
            var $attributes = Attributes.$attributes;
            var $changedAttribute = $attributes.find('span.name:contains(' + attributeName + ')').closest('li.attribute');
            
            if (false === $changedAttribute.is('.invalid')) {
                // nothing to be done here
                return;
            }
            
            $changedAttribute.removeClass('invalid');
            
            if ($attributes.find('li.attribute.invalid').length > 0) {
                // there are still invalid attributes
                return;
            }
            
            
            // go over all parents, and check if the still need to have the 'invalid attributes'-class
            $attributes.parents('li.element').each(function () {
                if (0 == $(this).find('li.attribute.invalid').length) {
                    $(this).removeClass('invalidChildAttribute').removeClass('invalidAttribute');
                }
            });
        },    
        
        /**
         * update hinted attributes.
         * If an elements value was changed based on a dataProvider, the new value might carry hints
         * on other elements and their new respective value.
         * 
         * @param   changedAttributeName    string  name of the element that changed
         * @param   changedAttributeValue   string  the new value of the changed attribute
         */
        updateHintedAttributes: function (changedAttributeName, changedAttributeValue) {
            var dataProvider = DataProviderManager.getProvider(_element.name, changedAttributeName);
            if (undefined == dataProvider) {
                // no dataProvider = nothing to hint
                return;
            }
            
            var hints = dataProvider.getHintsForValue(changedAttributeValue);
            
            if (undefined == hints) {
                // no hints = no hints :)
                return;
            }
            
            $.each(hints, function (attributeName, attributeValue) {
                Attributes.saveValue(attributeName, attributeValue);
            });
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
            $value.attr('title', Messages.editor.ui.clickToEdit.tooltip);

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

            var width = $value.width();
            var height = $value.height();
            $value.hide();

            var elementEnumeration = [];
            var isUserInputAllowed;
            if (false == _element.getSchemaElement().isMixed) {
                // get a list of valid values for this node, if it is an enumeration.
                // only if not mixed, because mixed is un-bounded!
                elementEnumeration = _element.getSchemaElement().getAllowedContent()._text.getEnumeration();
                isUserInputAllowed = false;
            } else {
                isUserInputAllowed = true;
            }

            // get the dataProvider for this element
            if (elementEnumeration == undefined || elementEnumeration.length == 0) {
                // only do this, if the XSD did not give us an enumeration!
                var dataProvider = DataProviderManager.getProvider(_element.name, '_nodeValue');
                if (undefined != dataProvider) {
                    elementEnumeration = dataProvider.getEnumeration();
                    isUserInputAllowed = dataProvider.isUserInputAllowed();
                }
            }

            // get the DOM for an input..
            var $input = getInputForValueAndEnumeration(nodeValue, elementEnumeration, isUserInputAllowed);
            // insert input-field into the DOM
            $value.after($input);
            
            // adjust the size of the input
            $input.width(width);
            $input.height(height);

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

            var inputValue = $input.find('input, textarea, select').andSelf().filter('input, textarea, select').val();

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


        /**
         * update hinted attributes.
         * If an elements value was changed based on a dataProvider, the new value might carry hints
         * on other elements and their new respective value.
         * 
         * @param   changedElementValue     string  the new value of the changed element
         */
        updateHintedAttributes: function (changedElementValue) {
            var changedElementName = _element.name;
            
            var dataProvider = DataProviderManager.getProvider(changedElementName, '_nodeValue');
            if (undefined == dataProvider) {
                // no dataProvider = nothing to hint
                return;
            }
            
            var hints = dataProvider.getHintsForValue(changedElementValue);
            
            if (undefined == hints) {
                // no hints = no hints :)
                return;
            }
            
            
            var $attributes = Attributes.$attributes;
            $.each(hints, function (attributeName, attributeValue) {
                Attributes.saveValue(attributeName, attributeValue);
            });
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
            // simply present an input-field and pre-set its value.

            if (value.length > 30) {
                // 'long' text are better in textareas
                $input = $('<textarea />');
            } else {
                $input = $('<input />');
            }
            
            $input.val(value);
        } else {
            // this attribute is an ENUM, so we need a select-list
            
            var tmpEnumeration = $.extend([], enumeration);
            if (true === isOptional) {
                tmpEnumeration.unshift({label: '- not set -', value: undefined});
            }


            if (true === userinput) {
                // if user-input is allowed, use activeInput
                var activeInput = new ActiveInput();
                activeInput.setValue(value);
                activeInput.setEnumeration(tmpEnumeration);
                $input = activeInput.getAsHTML();
            } else {
                // otherwise use a dull select-list
                $input = $('<select />');

                var $options = getSelectGroupForValueAndEnumerationEntries(value, tmpEnumeration);
            }
            
            
            $input.append($options);
        }
        
        return $input;
    };
    
    
    /**
     * get entries for a drop-down selection by the user
     * 
     * @param   value       string  the original value (for pre-selectin)
     * @param   enumeration mixed   object or array of entries
     */
    var getSelectGroupForValueAndEnumerationEntries = function (value, enumeration) {
        var selectGroup = [];
        
        $.each(enumeration, function (i, enumEntry) {
            var $option = $('<option />');

            var enumLabel;
            var enumValue;

            if (typeof enumEntry == 'string') {
                enumLabel = enumValue = enumEntry;
            } else {
                // dataproviders will give us an object of data instead of a string, use that
                // this was provided by a dataProvider
                if (typeof enumEntry.group != 'undefined') {
                    // we have a group
                    // groups will need to be broken down, and do create optgroups
                    $.each(enumEntry.group, function (i, groupsEntry) {
                        var groupName = groupsEntry.label;
                        var groupElements = groupsEntry.elements;
                        
                        // create an optgroup for each group
                        var $group = $('<optgroup />').attr('label', groupName);
                        var groupEntries = getSelectGroupForValueAndEnumerationEntries(value, groupElements);
                        $group.append(groupEntries);
                        
                        // and append the optgroup to the result
                        selectGroup.push($group);
                    });
                    
                    // continue with '.each', as we do not want to create an additional option after the group
                    
                    return;
                } else {
                    enumLabel = enumEntry.label;
                    enumValue = enumEntry.value;
                    
                    if (enumValue != enumLabel) {
                        // if label and value differ, we append the value to the label
                        enumLabel += ' (' + enumEntry.value + ')'
                    }
                }
                
            }

            $option.attr('value', enumValue);
            $option.html(enumLabel);

            if (enumValue == value) {
                // pre-select this value
                $option.prop('selected', true);
            }

            selectGroup.push($option);
        });
        
        return selectGroup;
    };
    
    /**
     * toggle displaying this element as being 'the active one'
     */
    var toggleActive = function () {

        var $name = _html.find('.name').first();
        
        // clean up!
        $('.name.active').not($name).removeClass('active');
        $name.toggleClass('active');

        Attributes.toggleDisplay();
        
    };
    
    /**
     * clickhandler for the element-item itself (propably the type and name of the element)
     * 
     * @var event   jQuery-event    the event that occured
     */
    var clickHandler = function (event) {
        switch (event.which) {
            case 1:
                // left mouse button
                toggleActive();
                break;
            case 2:
                // middle mouse button
                break;
            case 3:
                // right mouse button
                UIElements.toggleSubMenu();
                // stop bubbling.
                event.stopPropagation();
                break;
        }
    };
    
    /**
     * remember an element.
     * 
     * Used for cut, copy & paste. Will proxy this element and options to our topmost element, the Editor
     * 
     * @param   element object  EditorConfigurationElement to remember
     * @param   options object  options to remember additionally
     */
    _self.rememberElement = function (element, options) {
        _parent.rememberElement(element, options);
    };
    
    
    /**
     * get the remembered element
     * 
     * @return  object  the remembered element (or undefined if none)
     */
    _self.getRememberedElement = function () {
        return _parent.getRememberedElement();
    };
    
    /**
     * find out if expert attributes are to be visible
     * 
     * @return  boolean
     */
    _self.areExpertAttributesVisible = function () {
        return _parent.areExpertAttributesVisible();
    }
    
    
    /**
     * get the options that were stored alongside the remembered element
     * 
     * @return  object  the options
     */
    _self.getRememberedElementOptions = function () {
        return _parent.getRememberedElementOptions();
    };
    
    /**
     * remove this EditorConfigurationElement from the DOM, and remove the _element from its parent
     */
    _self.remove = function () {
        if (false === _element.isRemovable()) {
            // user-feedback
            alert(Messages.editor.elementNotRemovable);
            return;
        }

        _element.remove();
        $(_html).remove();
        _parent.redrawChildrenButton();
        delete _element;
    };
    
    
    /**
     * re-check if we have children, and show or hide the button accordingly
     */
    _self.redrawChildrenButton = function () {
        var hasChildren = _html.find('ul.children > li').length > 0;
        var buttonChildren = _html.find('.button.children').first();
        
        if (hasChildren) {
            buttonChildren.removeClass('disabled');
        } else {
            buttonChildren.addClass('disabled').removeClass('active');
            _html.find('ul.children > li').hide();
        }
    };

    /**
     * get the current ConigurationElement
     * 
     * @return  ConfigurationElement
     */
    _self.getConfigurationElement = function () {
        return _element;
    };
    
    /**
     * Event Listener for the ConfigurationElement (_element)
     * 
     * @param   listenerEvent   object  instance of ListenerEvent
     */
    _self.ConfigurationElementEventListener = function (listenerEvent) {
        switch (listenerEvent.event) {
            case 'invalid':
                switch (listenerEvent.params.type) {
                    case 'attribute_missing':
                        // mark the attribute invalid
                        Attributes.markAttributeInvalid(listenerEvent.params.item);
                        break;
                    default:
                        // @TODO: find some generic feedback, and implement!
                        alert('unknown invalidity: ' + listenerEvent.params.type);
                }
                break;
            case 'attributeChangedValue':
                if (listenerEvent.params.item == 'name') {
                    // we need info when the name-attribute changed its value
                    var $nameValue = _html.find('.name').first().find('.nameValue');
                    if (listenerEvent.params.newValue.trim() != '') {
                        $nameValue.addClass('set');
                    } else {
                        $nameValue.removeClass('set');
                    }
                    $nameValue.text(listenerEvent.params.newValue);
                    delete $nameValue;
                }
                
                Attributes.markValueChanged(listenerEvent.params.item);
                Attributes.updateHintedAttributes(listenerEvent.params.item, listenerEvent.params.newValue);
                
                break;
            case 'elementChangedValue':
                TextContent.updateHintedAttributes(listenerEvent.params.newValue);
                break;
            default:
                throw 'programmer error, unknown event: ' + listenerEvent.event;
        }
    };
    
    /**
     * reset the HTML-Cache of this Editor-Node.
     * This is needed as we are not in the position to decide which element to place where exactly -
     * that is up to the configuration.
     * So when we add a child to the configuration, we need to re-set and re-draw our HTML/DOM
     */
    _self.redrawHTML = function () {
        _html.replaceWith(_self.getAsHTML(false, true));
    };
    
    /**
     * create the html of us. recursive!
     * caches the result
     * 
     * @param   allowCache      boolean is it ok to ge the HTML from cache?
     * @param   childrenVisible boolean shall the element be uncollapsed?
     * @return  jquery-object           the HTML to display for this node and its children
     */
    _self.getAsHTML = function (allowCache, childrenVisible) {
        if (typeof allowCache == 'undefined' || allowCache == undefined) {
            allowCache = true;
        }
        
        if (typeof childrenVisible == 'undefined' || childrenVisible == undefined) {
            childrenVisible = false;
        }
        
        if (true === allowCache && _html != undefined) {
            // caching is allowed, so use it!
            return _html;
        }
        
        // create this elements markup, divided into outer shell (container, tree) and inner part (text, buttons, ...)
        _html = $('<li />').addClass('element');
        _html.append($('<span />').addClass('tree').append(UIElements.getButtonOfType('children')));
        
        // check if we are sortable
        if (true === _element.getSchemaElement().isSortable()) {
            _html.addClass('sortable');
        }
        
        var $innerHTML = $('<span />').addClass('element');
        _html.append($innerHTML);
        
        var $name = $('<span />').addClass('name').html(_element.name).addClass('nodeType_' + _element.name);
        var $nameValue = $('<span />').addClass('nameValue');
        
        if (typeof _element.attributes.name != 'undefined' && _element.attributes.name.trim() != '') {
            $nameValue.text(_element.attributes.name);
            $nameValue.addClass('set');
        }
        $name.append($nameValue);
        delete $nameValue;
        
        $innerHTML.append($name);

        // get the html for our attributes (and those that are allowed but not set)
        // depending on that, we set/add buttons, that is why we do it so early
        var $attributes = Attributes.getPlaceholderAsHTML();

        // define, which buttons to show
        // attributes only, if there are some that are not immediately visible
        // children only if this element can have some
        // remove-button only if this element can be removed
        var schemaElement = _element.getSchemaElement();
        var allowedChildren = schemaElement.getAllowedElements();
        
        var menuConfig = {
                            children:   !$.isEmptyObject(allowedChildren),
                            remove:     _element.isRemovable(),
                            };

        $innerHTML.append(UIElements.getButtonOfType('toggleSubmenu'));
        
        $name.mouseup(clickHandler)
            // and disable the normal context menu, as we wil replace it!
            .bind("contextmenu", function(e) {
                e.preventDefault();
            });

        var $submenu = UIElements.getSubMenuHTML(menuConfig);
        $innerHTML.append($submenu);
        delete menuConfig;
        delete $submenu;
        
        
        // does this element have text-value, and/or is it allowed to have?
        // do not display this for mixed elements!
        if (!schemaElement.isMixed && schemaElement.getAllowedContent()._text != false) {
            $innerHTML.append(TextContent.getAsHTML());
        }
        
        if ($attributes != undefined && $attributes.length > 0) {
            // only append attributes if we have some
            $innerHTML.append($attributes);
        }
        
        $name.css({cursor: 'pointer'});

        // append this elements children (immediate first, then recurse)
        var $children = $('<ul />').addClass('children');
        
        var newChildrenCache = {};

        $.each(_element.getChildren(), function (i, node) {
            
            var element;
            
            var nodeUID = node.getUID();
            if (typeof _childrenCache[nodeUID] != 'undefined') {
                // use the cached element
                element = _childrenCache[nodeUID];
            } else {
                // go create a new element
                element = new EditorConfigurationElement(_self, node);
                
                // get the configurationElements UID
                nodeUID = element.getConfigurationElement().getUID();
            }

            // get the elements HTML, and allow for caching
            $children.append(element.getAsHTML(true));
           
            // fill the new cache
            newChildrenCache[nodeUID] = element;
        });
        
        // replace the old cache with the new cache
        _childrenCache = newChildrenCache;
        delete newChildrenCache;
        
        if (false === childrenVisible) {
            $children.hide();
        }
        
        $innerHTML.append($children);
        delete $children;

        // redraw the toggle-children-display-button - maybe we have none
        _self.redrawChildrenButton();

        // append this element to the DOM - no reason yet why to do this
        //_html.data('EditorElement', _self);
        
        return _html;
    };

    
    /**
     * attach ourselves as an event-listener to our ConfigurationElement
     */
    _element.attachListener(_self);
}
