function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "cv.ui.manager.model.schema.DocumentationMapping": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* MAnnotation.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
   * Code the extract data from annotations (e.g. appinfo, documentation) in Element/Attribute
   */
  qx.Mixin.define('cv.ui.manager.model.schema.MAnnotation', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      this.__P_49_0 = new RegExp(':ref:[`\'](.+?)[`\']', 'g');
      this.__P_49_1 = qx.locale.Manager.getInstance().getLanguage() === 'de' ? 'de' : 'en';
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * cache for getAppinfo
       * @var array
       */
      __P_49_2: null,
      __P_49_0: null,
      __P_49_1: null,
      /**
       * cache for getDocumentation
       * @var array
       */
      __P_49_3: null,
      __P_49_4: function __P_49_4(node, xpath) {
        var texts = [];
        var doc = node.ownerDocument;
        var nsResolver = doc.createNSResolver(doc.documentElement);
        var iterator = doc.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        try {
          var thisNode = iterator.iterateNext();
          while (thisNode) {
            texts.push(thisNode.textContent.replaceAll(/``([^`]+)``/g, '<code>$1</code>'));
            thisNode = iterator.iterateNext();
          }
        } catch (e) {
          this.error('Error: Document tree modified during iteration ' + e);
        }
        return texts;
      },
      /**
       * get the appinfo information from the element, if any
       *
       * @return  array   list of texts, or empty list if none
       */
      getAppinfo: function getAppinfo() {
        if (this.__P_49_2 !== null) {
          return this.__P_49_2;
        }
        var node = this.getNode();
        var appInfo = this.__P_49_4(node, 'xsd:annotation/xsd:appinfo');
        var type = this.getType();
        if (type === 'element') {
          // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
          if (node.querySelectorAll(':scope > complexType').length === 0) {
            appInfo.push.apply(appInfo, _toConsumableArray(this.__P_49_4(this._type, 'xsd:annotation/xsd:appinfo')));
          }
        } else if (type === 'attribute') {
          if (node.hasAttribute('ref')) {
            // the attribute is a reference, so take appinfo from there, too

            var refName = node.getAttribute('ref');
            var ref = this.getSchema().getReferencedNode('attribute', refName);
            appInfo.push.apply(appInfo, _toConsumableArray(this.__P_49_4(ref, 'xsd:annotation/xsd:appinfo')));
          }
        }

        // fill the cache
        this.__P_49_2 = appInfo;
        return appInfo;
      },
      /**
       * get the documentation information from the element, if any
       *
       * @return  array   list of texts, or empty list if none
       */
      getDocumentation: function getDocumentation() {
        var _this = this;
        if (this.__P_49_3 !== null) {
          return this.__P_49_3;
        }
        var node = this.getNode();
        var lang = qx.locale.Manager.getInstance().getLanguage();
        var selector = 'xsd:annotation/xsd:documentation[@xml:lang=\'' + lang + '\']';

        // any appinfo this element itself might carry
        var documentation = this.__P_49_4(node, selector);
        var type = this.getType();
        if (type === 'element') {
          // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
          if (node.querySelectorAll(':scope > complexType').length === 0) {
            var _documentation;
            (_documentation = documentation).push.apply(_documentation, _toConsumableArray(this.__P_49_4(this._type, selector)));
          }
        } else if (type === 'attribute') {
          if (node.hasAttribute('ref')) {
            var _documentation2;
            // the attribute is a reference, so take appinfo from there, too

            var refName = node.getAttribute('ref');
            var ref = this.getSchema().getReferencedNode('attribute', refName);
            (_documentation2 = documentation).push.apply(_documentation2, _toConsumableArray(this.__P_49_4(ref, selector)));
            documentation = documentation.map(function (entry) {
              return _this.createDocumentationWebLinks(entry);
            });
          }
        }
        this.__P_49_3 = documentation;
        return documentation;
      },
      /**
       * Transform documentation text to link to the online documentation when it
       * contains a reference.
       * @param text
       * @return string The transformed input string.
       */
      createDocumentationWebLinks: function createDocumentationWebLinks(text) {
        var language = this.__P_49_1;
        return text.replace(this.__P_49_0, function (match, contents) {
          var reference = contents.match(/^(.*?) *<([^<]*)>$/);
          var label = reference ? reference[1] : contents;
          var key = reference ? reference[2] : contents;
          var link = cv.ui.manager.model.schema.DocumentationMapping.MAP[key];
          if (link) {
            return '<a class="doclink" target="_blank" href="' + cv.ui.manager.model.schema.DocumentationMapping.MAP._base + language + link + '">' + label + '</a>';
          }
          return label;
        });
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_49_2 = null;
      this.__P_49_3 = null;
      this.__P_49_0 = null;
    }
  });
  cv.ui.manager.model.schema.MAnnotation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MAnnotation.js.map?dt=1672653477294