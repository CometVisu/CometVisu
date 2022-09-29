(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.xml.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Prettifier.js 
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
   *
   */
  qx.Class.define('cv.util.Prettifier', {
    type: 'static',

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      /**
       * Dumps an XML file with formatted content
       * @param xml {XMLDocument}
       * @returns {string}
       */
      xml: function xml(_xml) {
        return '<?xml version="1.0" encoding="UTF-8"?>\n' + this._prettifyNode(_xml.documentElement, 0);
      },
      _prettifyNode: function _prettifyNode(node, level, noFormat) {
        var tabs = Array(level).fill('  ').join('');
        var newLine = '\n';

        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            return (noFormat ? '' : tabs) + qx.xml.String.escape(node.textContent) + (noFormat ? '' : newLine);
          }

          return '';
        }

        if (node.nodeType === Node.COMMENT_NODE) {
          return (noFormat ? '' : tabs) + "<!--".concat(node.textContent, "--> ").concat(noFormat ? '' : newLine);
        } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
          return (noFormat ? '' : tabs) + "<![CDATA[".concat(node.textContent, "]]> ").concat(noFormat ? '' : newLine);
        }

        if (!node.tagName) {
          return this._prettifyNode(node.firstChild, level);
        }

        var output = (noFormat ? '' : tabs) + "<".concat(node.tagName); // >\n

        var attr;
        var prefix;
        var namespaces = [];
        var attributesOutput = '';

        for (var i = 0; i < node.attributes.length; i++) {
          attr = node.attributes[i];
          prefix = '';

          if (attr.namespaceURI) {
            var nsIndex = namespaces.indexOf(attr.namespaceURI);

            if (!attr.prefix) {
              if (nsIndex < 0) {
                namespaces.push(attr.namespaceURI);
                nsIndex = namespaces.length - 1;
              }

              prefix = "ns".concat(nsIndex + 1, ":");
            }
          }

          attributesOutput += " ".concat(prefix).concat(attr.name, "=\"").concat(attr.value, "\"");
        }

        namespaces.forEach(function (ns, index) {
          output += " xmlns:ns".concat(index + 1, "=\"").concat(ns, "\"");
        });
        output += attributesOutput;

        if (node.childNodes.length === 0) {
          return output + ' />' + (!noFormat ? newLine : '');
        }

        output += '>';
        var hasTextChild = Array.prototype.some.call(node.childNodes, function (child) {
          return child.nodeType === Node.TEXT_NODE && child.textContent.trim();
        });

        if (!noFormat && !hasTextChild) {
          output += newLine;
        }

        for (var _i = 0; _i < node.childNodes.length; _i++) {
          output += this._prettifyNode(node.childNodes[_i], level + 1, hasTextChild);
        }

        return output + (hasTextChild || noFormat ? '' : tabs) + "</".concat(node.tagName, ">") + (!noFormat ? newLine : '');
      }
    }
  });
  cv.util.Prettifier.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Prettifier.js.map?dt=1664441240098