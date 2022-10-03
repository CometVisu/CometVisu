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
qx.Mixin.define("cv.ui.manager.model.schema.MAnnotation", {
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this.__linkRegex = new RegExp(":ref:[`'](.+?)[`']", "g");
    this.__language =
      qx.locale.Manager.getInstance().getLanguage() === "de" ? "de" : "en";
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
    __appInfoCache: null,
    __linkRegex: null,
    __language: null,

    /**
     * cache for getDocumentation
     * @var array
     */
    __documentationCache: null,

    __getTextNodesByXPath(node, xpath) {
      const texts = [];
      const doc = node.ownerDocument;
      const nsResolver = doc.createNSResolver(doc.documentElement);
      let iterator = doc.evaluate(
        xpath,
        node,
        nsResolver,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
        null
      );
      try {
        let thisNode = iterator.iterateNext();

        while (thisNode) {
          texts.push(
            thisNode.textContent.replaceAll(/``([^`]+)``/g, "<code>$1</code>")
          );
          thisNode = iterator.iterateNext();
        }
      } catch (e) {
        this.error("Error: Document tree modified during iteration " + e);
      }
      return texts;
    },

    /**
     * get the appinfo information from the element, if any
     *
     * @return  array   list of texts, or empty list if none
     */
    getAppinfo() {
      if (this.__appInfoCache !== null) {
        return this.__appInfoCache;
      }
      const node = this.getNode();
      const appInfo = this.__getTextNodesByXPath(
        node,
        "xsd:annotation/xsd:appinfo"
      );
      const type = this.getType();
      if (type === "element") {
        // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
        if (node.querySelectorAll(":scope > complexType").length === 0) {
          appInfo.push(
            ...this.__getTextNodesByXPath(
              this._type,
              "xsd:annotation/xsd:appinfo"
            )
          );
        }
      } else if (type === "attribute") {
        if (node.hasAttribute("ref")) {
          // the attribute is a reference, so take appinfo from there, too

          const refName = node.getAttribute("ref");
          const ref = this.getSchema().getReferencedNode("attribute", refName);

          appInfo.push(
            ...this.__getTextNodesByXPath(ref, "xsd:annotation/xsd:appinfo")
          );
        }
      }

      // fill the cache
      this.__appInfoCache = appInfo;

      return appInfo;
    },

    /**
     * get the documentation information from the element, if any
     *
     * @return  array   list of texts, or empty list if none
     */
    getDocumentation() {
      if (this.__documentationCache !== null) {
        return this.__documentationCache;
      }
      const node = this.getNode();

      const lang = qx.locale.Manager.getInstance().getLanguage();
      const selector =
        "xsd:annotation/xsd:documentation[@xml:lang='" + lang + "']";

      // any appinfo this element itself might carry
      let documentation = this.__getTextNodesByXPath(node, selector);

      const type = this.getType();
      if (type === "element") {
        // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
        if (node.querySelectorAll(":scope > complexType").length === 0) {
          documentation.push(
            ...this.__getTextNodesByXPath(this._type, selector)
          );
        }
      } else if (type === "attribute") {
        if (node.hasAttribute("ref")) {
          // the attribute is a reference, so take appinfo from there, too

          const refName = node.getAttribute("ref");
          const ref = this.getSchema().getReferencedNode("attribute", refName);

          documentation.push(...this.__getTextNodesByXPath(ref, selector));

          documentation = documentation.map(entry =>
            this.createDocumentationWebLinks(entry)
          );
        }
      }
      this.__documentationCache = documentation;

      return documentation;
    },

    /**
     * Transform documentation text to link to the online documentation when it
     * contains a reference.
     * @param text
     * @return string The transformed input string.
     */
    createDocumentationWebLinks(text) {
      const language = this.__language;
      return text.replace(this.__linkRegex, function (match, contents) {
        const reference = contents.match(/^(.*?) *<([^<]*)>$/);
        const label = reference ? reference[1] : contents;
        const key = reference ? reference[2] : contents;
        const link = cv.ui.manager.model.schema.DocumentationMapping.MAP[key];
        if (link) {
          return (
            "<a class=\"doclink\" target=\"_blank\" href=\"" +
            cv.ui.manager.model.schema.DocumentationMapping.MAP._base +
            language +
            link +
            "\">" +
            label +
            "</a>"
          );
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
  destruct() {
    this.__appInfoCache = null;
    this.__documentationCache = null;
    this.__linkRegex = null;
  }
});
