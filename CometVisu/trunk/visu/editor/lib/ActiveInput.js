/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * ActiveInput is a standard-issue input-field with an attached drop-down list.
 * 
 * It will include drill-down
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
 * @since       2012-12-25
 * @requires    -
 */

var ActiveInput = function () {
    var _input = this;
    
    /**
     * react on click-events
     * 
     * @param   event   jQuery-event    event
     */
    var clickHandler = function (event) {
        var $item = $(this);
        
        var value = $item.data('activeInputValue');
        if (typeof value != 'undefined') {
            $input.val(value);
        }
        
        $item.closest('.activeInput').triggerHandler('blur');
        
        event.stopPropagation();
    };
    
    /**
     * Handler for keyboard-input.
     * Gets called for being bind'ed to an elements keyDown-Event
     * 
     * @param   event   jQuery-event    event
     */
    var keyboardHandler = function (event) {
        switch (event.which) {
            // @TODO: implement
//            case keys.arrowDown:
//                // mark next as selected
//                markNextSelected();
//                event.stopPropagation();
//                break;
//            case keys.arrowUp:
//                // mark previous as selected
//                markPreviousSelected();
//                event.stopPropagation();
//                break;
            case keys.enter:
                // copy value to input, quit
                if ($list.find('.selected').length > 0) {
                    // only use list-entry if one is selected
                    var value = $list.find('.selected').data('activeInputValue');
                    if (value != undefined && value != 'undefined' && typeof value != 'undefined') {
                        $input.val(value);
                    }
                } 
            default:
                updateListContent()
                break;
        }
    };
    
    /**
     * mark the next list-element as being the selected one
     */
    var markNextSelected = function () {
        var $selected = $list.find('.selected');
        var $next;
        if ($selected.length == 0) {
            $next = $list.find('.option:visible').first();
        } else {
            $next = $selected.next('.option:visible');
            if ($next.length == 0) {
                // this group might have had no more next-siblings
                $next = $selected.closest('.group').next('.group:visible').find('.option:visible').first();
            }

            if ($next.length == 0) {
                // we're propably at the end of the list
                $next = $list.find('.option:visible').first();
            }
        }

        $selected.removeClass('selected');
        $next.addClass('selected');
    }
    
    /**
     * mark the previous list-element as being the selected one
     */
    var markPreviousSelected = function () {
        var $selected = $list.find('.selected');
        var $previous;
        if ($selected.length == 0) {
            $previous = $list.find('.option:visible').last();
        } else {
            $previous = $selected.prev('.option:visible');
            if ($previous.length == 0) {
                // this group might have had no more next-siblings
                $previous = $selected.closest('.group').prev('.group:visible').find('.option:visible').last();
            }

            if ($previous.length == 0) {
                // we're propably at the beginning of the list
                $previous = $list.find('.option:visible').last();
            }
        }

        $selected.removeClass('selected');
        $previous.addClass('selected');
    }
    
    /**
     * update the content of the list to show only elements matching the current input-value
     * 
     * @param   value   string  the current input value
     */
    var updateListContent = function () {
        var value = $input.val();
        
        if (value == _oldValue) {
            // do nothing
            return;
        }
        
        if (value.trim() == '') {
            // no input = show everything
            $list.find('.option, .group, .headline').show();
            return;
        }
        
        // find the elements we want to show
        var $positives = $list.find('.option').filter(function () {
            var text = $(this).text();
            return text.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        });
        
        // find the groups for the elements we want to show
        var $positivesParents = $positives.closest('.group');
        
        // show
        $positives.show();
        $positivesParents.show();
        
        // hide the rest
        $list.find('.option').not($positives).hide();
        $list.find('.group').not($positivesParents).hide();
        
        if ($positives.length == 0) {
            $list.hide();
        } else {
            $list.show();
        }
    };
    
    
    /**
     * set the enumeration (list of pre-defined values) for this input
     * 
     * @param   enumeration object  list of enumeration, e.g. like from DataProvider
     */
    _input.setEnumeration = function (enumeration) {
        _enumeration = enumeration;
    };
    
    /**
     * set the pre-defined value for this input
     * 
     * @param   value   string  the value
     */
    _input.setValue = function (value) {
        _value = value;
    };
    
    /**
     * create the HTML for this ActiveInput-Field
     * 
     * @return jquery-object    the HTML
     */
    _input.getAsHTML = function () {
        var $html = $('<div />').addClass('activeInput');
        
        $input = $('<input />');
        
        if (typeof _value != 'undefined') {
            $input.val(_value);
        }
        
        $input.bind('keyup', keyboardHandler);
        
        $html.append($input);
        
        // create the list to be displayed below the input
        $list = $('<div />').addClass('list');
        $list.append(createListFromEnumeration(_enumeration));
        
        $list.find('.option').click(clickHandler);
        
        $html.append($list);
        
        updateListContent();
        
        // block all blur-events from bubbling up the DOM
        $html.find('*').bind('blur', function (event) {
            event.stopPropagation();
        });
        
        return $html;
    };
    
    /**
     * get entries for the drop-down-selection by the user
     * 
     * @param   enumeration mixed   list of values for this list
     */
    var createListFromEnumeration = function (enumeration) {
        var list = [];
        
        $.each(enumeration, function (i, enumEntry) {
            var $option = $('<div />').addClass('option');

            var enumLabel;
            var enumValue;

            if (typeof enumEntry == 'string') {
                enumLabel = enumValue = enumEntry;
            } else {
                // dataproviders will give us an object of data instead of a string, use that
                // this was provided by a dataProvider
                if (typeof enumEntry.group != 'undefined') {
                    // we have a group
                    // groups will need to be broken down, and we need to create option-groups
                    $.each(enumEntry.group, function (i, groupsEntry) {
                        var groupName = groupsEntry.label;
                        var groupElements = groupsEntry.elements;
                        
                        // create an optgroup for each group
                        var $group = $('<div />').addClass('group');
                        var $headline = $('<div />').addClass('headline').html(groupName);
                        $group.append($headline);
                        var groupEntries = createListFromEnumeration(groupElements);
                        $group.append(groupEntries);
                        
                        // and append the optgroup to the result
                        list.push($group);
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

            $option.data('activeInputValue', enumValue);
            $option.html(enumLabel);

            list.push($option);
        });
        
        return list;
    };
    
    /**
     * the value (pre-set) for this input
     * @var string
     */
    var _value = '';
    
    /**
     * the enumeration to use for this active-input (without this, it is only an input)
     * @var object
     */
    var _enumeration = undefined;
    
    /**
     * the DOM of the list, for caching-purposes
     * @var object
     */
    var $list;
    
    /**
     * the DOM of the actual input-element
     * @var object
     */
    var $input;
    
    /**
     * the old input-value; needed by updateListContent to speed things up
     * @var string
     */
    var _oldValue = '';
    
    /**
     * list of keycods
     * @var object
     */
    var keys = {
                arrowLeft: 37,
                arrowUp: 38,
                arrowRight: 39,
                arrowDown: 40,
                enter: 13,
                escape: 27,
            };
};