/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * initialize the Editor
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
 * @requires    Editor.js, Configuration.js, Schema.js, Result.js, Messages.js
 */

var config;

$(document).ready(function () {
    var targetSelector = 'body';
    
    var schema;
    var editor;

    $(document).unbind('configuration_loaded').bind('configuration_loaded', function () {
        // configuration is loaded
        var schemaFilename = config.getSchemaFilename();
        schema = new Schema(schemaFilename);
    });
    
    $(document).unbind('configuration_loading_error').bind('configuration_loading_error', function (event, result) {
        // something went wrong
        // we can not fix it, so let's simply inform the user, and leave.
        $(targetSelector).html(result.message);
        alert(result.message);
    });

    $(document).unbind('schema_loaded').bind('schema_loaded', function () {

        try {
            config.setSchema(schema);
        } catch (e) {
            var tmpResult = new Result(false, Messages.validity.configurationInvalid, [e]);
            $(targetSelector).html(tmpResult.message);
            alert(tmpResult.message);
            return;
        }

        if (false === config.isValid()) {
            $(targetSelector).html(Messages.validity.configurationInvalid, ['configuration not valid']);
            alert(message);
            return;
        }

        // remove loading-message
        $(targetSelector).empty();
        
        // start and render the editor
        editor = new Editor(config);
        editor.render(targetSelector);

    });
    
    // loading the Configuration and validation it WILL take a few seconds!
    $(targetSelector).html(Messages.loader.loading);

    
    // check if we have a user-defined param to load a specific config
    var configSuffix = '';
    if ($.getUrlVar("config")) {
        configSuffix = $.getUrlVar("config");
    }
    
    // create configuration filename
    var configFilename = 'visu_config' + (configSuffix ? '_' + configSuffix : '' ) + '.xml'
    
    // and start loading the configuration
    config = new Configuration(configFilename);
});

/*
 * be able to access GET-Params
 */
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});