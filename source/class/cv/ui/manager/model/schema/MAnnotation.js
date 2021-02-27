/**
 * Code the extract data from annotations (e.g. appinfo, documentation) in Element/Attribute
 */
qx.Mixin.define('cv.ui.manager.model.schema.MAnnotation', {

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.__linkRegex = new RegExp( ":ref:[`'](.+?)[`']", 'g');
    this.__language = qx.locale.Manager.getInstance().getLanguage() === 'de' ? 'de' : 'en';
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

    __getTextNodesByXPath: function (node, xpath) {
      const texts = []
      let iterator = document.evaluate('xsd:annotation/xsd:appinfo', node, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      try {
        let thisNode = iterator.iterateNext();

        while (thisNode) {
          texts.push(thisNode.textContent);
          thisNode = iterator.iterateNext();
        }
      }
      catch (e) {
        this.error( 'Error: Document tree modified during iteration ' + e );
      }
      return texts;
    },

    /**
     * get the appinfo information from the element, if any
     *
     * @return  array   list of texts, or empty list if none
     */
    getAppinfo: function () {
      if (this.__appInfoCache !== null) {
        return this.__appInfoCache;
      }
      const node = this.getNode();
      const appInfo = this.__getTextNodesByXPath(node, 'xsd:annotation/xsd:appinfo');
      const type = this.getType();
      if (type === 'element') {
        // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
        if (node.querySelectorAll('> xsd\\:complexType').length === 0) {
          appInfo.push(...this.__getTextNodesByXPath(this._type, 'xsd:annotation/xsd:appinfo'));
        }
      } else if (type === 'attribute') {
        if (node.hasAttribute('ref')) {
          // the attribute is a reference, so take appinfo from there, too

          const refName = node.getAttribute('ref');
          const ref = this.getSchema().getReferencedNode('attribute', refName);

          appInfo.push(...this.__getTextNodesByXPath(ref, 'xsd:annotation/xsd:appinfo'));
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
    getDocumentation: function () {
      if (this.__documentationCache !== null) {
        return this.__documentationCache;
      }
      const node = this.getNode();

      const lang = qx.locale.Manager.getInstance().getLanguage();
      const selector = 'xsd:annotation/xsd:documentation[@xml:lang=\'' + lang + '\']';

      // any appinfo this element itself might carry
      let documentation = this.__getTextNodesByXPath(node, selector);

      const type = this.getType();
      if (type === 'element') {
        // only aggregate types appinfo if it is not an immediate child of the element-node, but referenced/typed
        if (node.querySelectorAll('> xsd\\:complexType').length === 0) {
          documentation.push(...this.__getTextNodesByXPath(this._type, selector));
        }
      } else if (type === 'attribute') {
        if (node.hasAttribute('ref')) {
          // the attribute is a reference, so take appinfo from there, too

          const refName = node.getAttribute('ref');
          const ref = this.getSchema().getReferencedNode('attribute', refName);

          documentation.push(...this.__getTextNodesByXPath(ref, 'xsd:annotation/xsd:appinfo'));

          documentation = documentation.map(entry => this.createDocumentationWebLinks)
        }
      }
      this.__documentationCache = documentation;

      return documentation;
    },


    /**
     * Transform documentation text to link to the online documentation when it
     * contains a reference.
     *
     * @return string The transformed input string.
     */
    createDocumentationWebLinks: function (text) {
      const language = this.__language;
      return text.replace(this.__linkRegex, function(match, contents) {
        const
          reference = contents.match( /^(.*?) *<([^<]*)>$/ ),
          label     = reference ? reference[1] : contents,
          key       = reference ? reference[2] : contents

        return '<a class="doclink" target="_blank" href="' + cv.ui.manager.model.schema.DocumentationMapping.MAP._base + language + cv.ui.manager.model.schema.DocumentationMapping.MAP[key] + '">' + label + '</a>';
      });
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__appInfoCache = null;
    this.__documentationCache = null;
    this.__linkRegex = null;
  }
});
