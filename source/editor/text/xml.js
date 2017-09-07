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