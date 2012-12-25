/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * DataProvider-definition for the editor
 * 
 * with data-providers, the user can be displayed a list of choices instead of having to fill in
 * an empty text-field in an editor.
 * 
 * Will work with both server-provided data (via URL/AJAX) and in-configuration data (via jQuery)
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
 * @requires    DataProviderConfig.js
 */

var DataProviderManager = {
    /**
     * get the DataProvider for a specified attribute
     * 
     * @param   attributeName   string  name of the attribute
     * @return  object                  DataProvider for that attribute, or undefined if none
     */
    getProviderForAttribute: function (attributeName) {
        if (typeof DataProviderManager._providers == 'undefined') {
            DataProviderManager.initialize();
        }
        
        
        if (typeof DataProviderManager._providers.attributes[attributeName] == 'undefined') {
            return undefined;
        }
        
        return DataProviderManager._providers.attributes[attributeName];
    },


    /**
     * get the DataProvider for a specified elements nodeValue
     * 
     * @param   elementName     string  name of the attribute
     * @return  object                  DataProvider for that attribute, or undefined if none
     */
    getProviderForElement: function (elementName) {
        if (typeof DataProviderManager._providers == 'undefined') {
            DataProviderManager.initialize();
        }
        
        
        if (typeof DataProviderManager._providers.elementValues[elementName] == 'undefined') {
            return undefined;
        }
        
        return DataProviderManager._providers.elementValues[elementName];
    },


    /**
     * initialization of the DataProviderManager.
     * Is done autonomously by getProvider.
     */
    initialize: function () {

        if (typeof DataProviderConfig == 'undefined') {
            throw 'programming error: no DataProviderConfig loaded';
        }
        
        DataProviderManager._providers = {
                                            attributes: {},
                                            elementValues: {}
                                        };

        // go over all possible DataProviders, and create an instance
        $.each(DataProviderConfig.attributes, function (name, config) {
            var provider = new DataProvider(config);

            // preload Data, if possible (that method decides for itself!)
            provider.preloadData();

            DataProviderManager._providers.attributes[name] = provider;
        });
        
        // go over all possible DataProviders, and create an instance
        $.each(DataProviderConfig.elementValues, function (name, config) {
            var provider = new DataProvider(config);

            // preload Data, if possible (that method decides for itself!)
            provider.preloadData();

            DataProviderManager._providers.elementValues[name] = provider;
        });    },
    _providers: undefined
};


/**
 * a single DataProvider; do not create on your own, use the DataProviderManager instead!
 * @var object
 * @param   config  object  a part of the DataProviderConfig suited for a single attribute
 */
var DataProvider = function (config) {
    /**
     * this is us.
     * @var object
     */
    var _provider = this;

    /**
     * the cache for this providers data; will be empty for 'live' and for uncached-url
     * @var array
     */
    var dataCache = undefined;
    
    /**
     * the cache for this providers datas hints;
     * @var object
     */
    var hintsCache = undefined;
    
    /**
     * our configuration
     * @var object
     */
    var _providerConfig = config;
    
    /**
     * get the current enumeration
     * 
     * Will return an array of arrays, like so:
     * [
     *  {value: foo, label: y},
     *  {value: bar, label: z},
     *  ...
     * ]
     * 
     * or
     * [
     *  {groups:
     *      {somename:  [
     *                      {value: foo, label: y},
     *                      {value: bar, label: z},
     *                      ...
     *                  ],
     *      ...
     *      }
     *  }
     * ]
     *                  
     *  
     * @return  array   the enumeration
     */
    _provider.getEnumeration = function () {
        // get the data, and create an enumeration from it
        var data = getData();
        
        var enumeration = [];
        
        if (typeof _providerConfig.grouped == 'boolean' && _providerConfig.grouped == true) {
            var groupEnumerations = [];
            $.each(data, function (name, groupData) {
                groupEnumerations.push({label: name, elements: getEnumerationForData(groupData)});
            });
            enumeration.push({group: groupEnumerations});
        } else {
            enumeration = getEnumerationForData(data);
        }
        
        return enumeration;
    };
    
    /**
     * Check if there is a hint for a given value, and return it.
     * 
     * @param   value   string  the value to look for a hint
     * @return  mixed           either undefined, or an object of hints
     */
    _provider.getHintsForValue = function (value) {
        if (undefined == dataCache) {
            // no hinting without cache!
            return undefined;
        }
        
        if (undefined == hintsCache) {
            hintsCache = getAllHints();
        }
        
        if (typeof hintsCache[value] == 'undefined') {
            // no hint for this value
            return undefined;
        }
        
        // we have a hint.
        return hintsCache[value];
    };
    
    /**
     * create a one-dimensional list of all available hints, sorted by value.
     * 
     * @return  object          hints, like {'value': {field1: value1, field2: value2, ...}}
     */
    var getAllHints = function () {
        var hints = {};
        
        var data = dataCache;
        
        if (typeof _providerConfig.grouped == 'boolean' && _providerConfig.grouped == true) {
            // if data is grouped, we need to un-group it first.
            data = [];
            $.each(dataCache, function (name, entries) {
                $.each(entries, function (i, entry) {
                    data.push(entry);
                });
            });
        }
        
        $.each(data, function (i, dataEntry) {
            var value = dataEntry.value;

            if (typeof dataEntry.hints == undefined) {
                // no hints = nothing to do
                return;
            }

            hints[value] = dataEntry.hints;
        });
        
        return hints;
    };
    
    /**
     * is user-input allowed?
     * 
     * @return  boolean is it allowed?
     */
    _provider.isUserInputAllowed = function () {
        return _providerConfig.userInputAllowed;
    };

    /**
     * multi-dimensional creating of an enumeration
     * 
     * @param   data    array   list of data-entries, or groups
     * @return  array           the enumeration
     */
    var getEnumerationForData = function (data) {
        var enumeration = [];
        
        if (typeof data == 'undefined') {
            return undefined;
        }
        
        $.each(data, function (i, dataEntry) {
            var enumerationEntry;
            
            // simple list with default values.
            enumerationEntry = {
                                    label: dataEntry.label,
                                    value: dataEntry.value,
                                    };

            enumeration.push(enumerationEntry);
        });

        
        return enumeration;
    };
    
    /**
     * preload the data, i.e. cache it
     * 
     * will check if caching is enabled, and do nothing if not
     */
    _provider.preloadData = function () {
        var doCaching = typeof _providerConfig.cache != 'undefined' ? _providerConfig.cache : true;
        
        if (false === doCaching) {
            // no caching = nothing to do for us
            return;
        }
        if (typeof _providerConfig.url != 'string') {
            // no url means no caching
            return;
        }
        
        $.ajax(_providerConfig.url,
            {
                dataType: 'json',
                cache: doCaching,
                success: function (data) {
                    // what we get from the server is exactly what we need (hopefully ...)
                    dataCache = data;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var result = new Result(false, Messages.dataProvider.loadingError, [textStatus, errorThrown]);
                    $(document).trigger('dataprovider_loading_error', [result]);
                }
            }
        );
    };
    
    
    /**
     * get the current data, either from server or whereever
     * 
     * @return  array   the data, as provided by the provider :)
     */
    var getData = function () {
        if (dataCache !== undefined) {
            return dataCache;
        }
        
        
        var data = [];
        if (typeof _providerConfig.live == 'function') {
            data = _providerConfig.live();
        }
        
        if (typeof _providerConfig.url == 'string') {
            // load the data from the server
            var doCaching = typeof _providerConfig.cache != 'undefined' ? _providerConfig.cache : true;
            
            $.ajax(_providerConfig.url,
                {
                    dataType: 'json',
                    cache: doCaching,
                    async: false, // at this point, we can no longer async!
                    success: function (result) {
                        // what we get from the server is exactly what we need (hopefully ...)
                        data = result;
                        
                        if (doCaching == true) {
                            // if caching is allowed, we store the data also in the cache.
                            dataCache = result;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var result = new Result(false, Messages.dataProvider.loadingError, [textStatus, errorThrown]);
                        $(document).trigger('dataprovider_loading_error', [result]);
                    }
                }
            );
        }
        
        return data;
        
    };
    
};
