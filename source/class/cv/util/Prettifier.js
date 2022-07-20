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
    xml(xml) {
      return '<?xml version="1.0" encoding="UTF-8"?>\n' + this._prettifyNode(xml.documentElement, 0);
    },

    _prettifyNode: function (node, level, noFormat) {
      let tabs = Array(level).fill('  ').join('');
      let newLine = '\n';
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          return (noFormat ? '' : tabs) + qx.xml.String.escape(node.textContent) + (noFormat ? '' : newLine);
        }
        return '';
      }
      if (node.nodeType === Node.COMMENT_NODE) {
        return (noFormat ? '' : tabs) + `<!--${node.textContent}--> ${(noFormat ? '' : newLine)}`;
      } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
        return (noFormat ? '' : tabs) + `<![CDATA[${node.textContent}]]> ${(noFormat ? '' : newLine)}`;
      }
      if (!node.tagName) {
        return this._prettifyNode(node.firstChild, level);
      }
      let output = (noFormat ? '' : tabs) + `<${node.tagName}`; // >\n
      let attr;
      let prefix;
      const namespaces = [];
      let attributesOutput = '';
      for (let i = 0; i < node.attributes.length; i++) {
        attr = node.attributes[i];
        prefix = '';
        if (attr.namespaceURI) {
          let nsIndex = namespaces.indexOf(attr.namespaceURI);
          if (!attr.prefix) {
            if (nsIndex < 0) {
              namespaces.push(attr.namespaceURI);
              nsIndex = namespaces.length - 1;
            }
            prefix = `ns${nsIndex + 1}:`;
          }
        }
        attributesOutput += ` ${prefix}${attr.name}="${attr.value}"`;
      }
      namespaces.forEach((ns, index) => {
        output += ` xmlns:ns${index+1}="${ns}"`;
      });
      output += attributesOutput;
      if (node.childNodes.length === 0) {
        return output + ' />' + (!noFormat ? newLine : '');
      }
      output += '>';

      let hasTextChild = Array.prototype.some.call(node.childNodes, child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
      if (!noFormat && !hasTextChild) {
        output += newLine;
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        output += this._prettifyNode(node.childNodes[i], level + 1, hasTextChild);
      }
      return output + (hasTextChild || noFormat ? '' : tabs) + `</${node.tagName}>` + (!noFormat ? newLine : '');
    }
  }
});
