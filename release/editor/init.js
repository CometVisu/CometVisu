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

var config;$(document).ready(function(){var e="body",t,n;$(document).unbind("configuration_loaded").bind("configuration_loaded",function(){var e=config.getSchemaFilename();t=new Schema(e)}),$(document).unbind("configuration_loading_error").bind("configuration_loading_error",function(t,n){$(e).html(n.message),alert(n.message)}),$(document).unbind("schema_loaded").bind("schema_loaded",function(){try{config.setSchema(t)}catch(r){var i=new Result(!1,Messages.validity.configurationInvalid,[r]);$(e).html(i.message),alert(i.message);return}if(!1===config.isValid()){var i=new Result(!1,Messages.validity.configurationInvalid,["configuration not valid"]);$(e).html(i.message),alert(i.message);return}$(e).empty(),n=new Editor(config),n.render(e)}),$(e).html(Messages.loader.loading);var r=!1;$.getUrlVar("demo")&&(r="true"===$.getUrlVar("demo"));var i="";$.getUrlVar("config")&&(i=$.getUrlVar("config"));var s="config/"+(r?"demo/":"")+"visu_config"+(i?"_"+i:"")+".xml";config=new Configuration(s,r),config.attachGlobalListener(GlobalConfigurationElementEventListener)});var GlobalConfigurationElementEventListener={ConfigurationElementEventListener:function(e){switch(e.event){case"invalid":typeof console!="undefined"&&console.log(e);break;default:}}};$.extend({getUrlVars:function(){var e=[],t,n=window.location.href,r=n.indexOf("#");r==-1&&(r=n.length);var i=n.slice(n.indexOf("?")+1,r).split("&");for(var s=0;s<i.length;s++)t=i[s].split("="),e.push(t[0]),e[t[0]]=t[1];return e},getUrlVar:function(e){return $.getUrlVars()[e]}});