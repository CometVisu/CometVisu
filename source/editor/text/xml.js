/*
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * XML loader plugin for monaco text editor.
 * @since 0.11.0
 * @author Tobias Bräutigam
 */
var XMLLoaderPlugin;
(function (XMLLoaderPlugin) {
  var BrowserXMLLoader = (function () {
    function BrowserXMLLoader() {}
    return BrowserXMLLoader;
  }());
  // ------------------------------ Finally, the plugin
  var XMLPlugin = (function () {
    function XMLPlugin() {}
    XMLPlugin.prototype.load = function (name, req, load) {
      var raw = name.substring(0, 1) === "*";
      if (raw) {
        name = name.substring(1);
      }
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function () {
        load(raw ? oReq.response : oReq.responseXML);
      });
      oReq.addEventListener("error", function () {
        if (typeof load.error === 'function') {
          load.error('Could not find ' + name + ' or it was empty');
        }
      });
      oReq.open("GET", name);
      oReq.send();
    };
    return XMLPlugin;
  }());
  XMLLoaderPlugin.XMLPlugin = XMLPlugin;
  function init() {
    define('xml', new XMLPlugin());
  }
  XMLLoaderPlugin.init = init;
  if (typeof doNotInitLoader === 'undefined') {
    init();
  }
})(XMLLoaderPlugin || (XMLLoaderPlugin = {}));