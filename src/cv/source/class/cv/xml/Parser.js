qx.Class.define('cv.xml.Parser', {

  type: "static",

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    __handlers: {},
    __hooks: {
      before: {},
      after: {}
    },

    addHandler: function (tagName, handler) {
      this.__handlers[tagName.toLowerCase()] = handler;
    },

    getHandler: function (tagName) {
      return this.__handlers[tagName.toLowerCase()];
    },

    addHook: function(tagname, type, callback, context) {
      type = type || "after";
      if (!this.__hooks[type][tagname]) {
        this.__hooks[type][tagname] = [];
      }
      this.__hooks[type][tagname].push([callback, context]);
    },

    getHooks: function(type, tagname) {
      return this.__hooks[type][tagname] || [];
    },

    parse: function (xml, path, flavour, pageType) {
      var parser = this.getHandler(xml.nodeName.toLowerCase());
      var result = null;
      if (parser) {
        this.getHooks("before", xml.nodeName.toLowerCase()).forEach(function(entry) {
          entry[0].call(entry[1] || this, xml, path, flavour, pageType);
        }, this);
        result = parser.parse(xml, path, flavour, pageType);
        this.getHooks("after", xml.nodeName.toLowerCase()).forEach(function(entry) {
          entry[0].call(entry[1] || this, xml, path, flavour, pageType);
        }, this);
      } else {
        // console.error("no parse handler registered for type: %s", xml.nodeName.toLowerCase());
        parser = this.getHandler("unknown");
        result = parser.parse(xml, path, flavour, pageType);
      }
      return result;
    }
  }
});