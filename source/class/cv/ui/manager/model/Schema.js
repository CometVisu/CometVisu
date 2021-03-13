/**
 *
 */
qx.Class.define('cv.ui.manager.model.Schema', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (filename) {
    this.base(arguments);
    if (!filename || !filename.match(/\.xsd$/)) {
      throw 'no, empty or invalid filename given, can not instantiate without one';
    }
    this.__filename = filename;
    this.__allowedRootElements = {};
    this.__referencedNodeCache = {};
    this.__typeNodeCache = {};
    this._cacheXSD();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    __CACHE: {},

    getInstance: function (schemaFile) {
      if (!this.__CACHE.hasOwnProperty(schemaFile)) {
        this.__CACHE[schemaFile] = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri(schemaFile));
      }
      return this.__CACHE[schemaFile];
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    loaded: {
      check: 'Boolean',
      init: false,
      event: 'changeLoaded'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __filename: null,
    /**
     * object of the schema/xsd
     * @var object
     */
    __xsd: null,

    /**
     * object of allowed root-level elements
     * @var object
     */
    __allowedRootElements: null,

    /**
     * cache for referenced nods
     * @var object
     */
    __referencedNodeCache: null,

    /**
     * cache for getTypeNode
     * @var object
     */
    __typeNodeCache: null,

    /**
     * cache for #text-SchemaElement
     * @var object
     */
    __textNodeSchemaElement: null,

    /**
     * cache for #comment-SchemaElement
     * @var object
     */
    __commentNodeSchemaElement: null,

    onLoaded: function (callback, context) {
      if (this.isLoaded()) {
        callback.call(context);
      } else {
        this.addListenerOnce('changeLoaded', callback, context);
      }
    },

    /**
     * load and cache the xsd from the server
     */
    _cacheXSD: function () {
      const ajaxRequest = new qx.io.request.Xhr(this.__filename);
      ajaxRequest.set({
        accept: "application/xml"
      });
      ajaxRequest.addListenerOnce("success", function (e) {
        const req = e.getTarget();
        // Response parsed according to the server's response content type
        let xml = req.getResponse();
        if (xml && (typeof xml === 'string')) {
          xml = qx.xml.Document.fromString(xml);
        }
        this.__xsd = xml;

        // parse the data, to have at least a list of root-level-elements
        this._parseXSD();

      }, this);
      ajaxRequest.send();
    },

    /**
     * parse the schema once
     */
    _parseXSD: function () {
      // make a list of root-level elements
      this.__xsd.querySelectorAll('schema > element').forEach(element => {
        const name = element.getAttribute('name');
        this.__allowedRootElements[name] = new cv.ui.manager.model.schema.Element(element, this);
      });
      this.setLoaded(true);
    },

    getElementNode: function (name) {
      if (this.__allowedRootElements.hasOwnProperty(name)) {
        return this.__allowedRootElements[name];
      }
      throw 'schema/xsd appears to be invalid, element ' + name + ' not allowed on root level';
    },

    /**
     * dive into the schema and find the element that is being pulled in by a ref.
     * Do so recursively.
     * referenced nodes can be top-level-nodes only!
     *
     * @param   type    string  Type of the node (e.g. element, attributeGroup, ...)
     * @param   refName string  Name as per the ref-attribute
     * @return  object          jQuery-object of the ref'ed element
     */
    getReferencedNode: function (type, refName) {
      if (this.__referencedNodeCache.hasOwnProperty(type) && this.__referencedNodeCache[type].hasOwnProperty(refName)) {
        return this.__referencedNodeCache[type][refName];
      }

      const selector = 'schema > ' + type + '[name="' + refName + '"]';
      let ref = this.__xsd.querySelector(selector);
      if (!ref) {
        throw 'schema/xsd appears to be invalid, reference ' + type + '"' + refName + '" can not be found';
      }

      if (ref.hasAttribute('ref')) {
        // do it recursively, if necessary
        ref = this.getReferencedNode(type, ref.getAttribute('ref'));
      }

      if (!this.__referencedNodeCache.hasOwnProperty(type)) {
        this.__referencedNodeCache[type] = {};
      }

      // fill the cache
      this.__referencedNodeCache[type][refName] = ref;

      return ref;
    },


    /**
     * get the definition of a type, be it complex or simple
     *
     * @param   type    string  Type of type to find (either simple or complex)
     * @param   name    string  Name of the type to find
     */
    getTypeNode: function (type, name) {

      if (this.__typeNodeCache.hasOwnProperty(type) && this.__typeNodeCache[type].hasOwnProperty(name)) {
        return this.__typeNodeCache[type][name];
      }
      let typeNode = this.__xsd.querySelector(type + 'Type[name="' + name + '"]');

      if (!typeNode) {
        throw 'schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found';
      }

      if (typeof this.__typeNodeCache[type] == 'undefined') {
        this.__typeNodeCache[type] = {};
      }

      // fill the cache
      this.__typeNodeCache[type][name] = typeNode;

      return typeNode;
    },

    /**
     * get a SchemaElement for a #text-node
     *
     * @return  object  SchemaElement for #text-node
     */
    getTextNodeSchemaElement: function () {
      if (this.__textNodeSchemaElement === null) {
        // text-content is always a simple string
        const tmpXML = this.__xsd.createElement('element');
        tmpXML.setAttribute('name', '#text');
        tmpXML.setAttribute('type', 'xsd:string');
        this.__textNodeSchemaElement = new cv.ui.manager.model.schema.Element(tmpXML, this);
      }

      return this.__textNodeSchemaElement;
    },

    /**
     * get a SchemaElement for a #comment-node
     *
     * @return  object  SchemaElement for #comment-node
     */
    getCommentNodeSchemaElement: function () {
      if (this.__commentNodeSchemaElement === null) {
        // text-content is always a simple string
        const tmpXML = this.__xsd.createElement('element');
        tmpXML.setAttribute('name', '#comment');
        tmpXML.setAttribute('type', 'xsd:string');
        tmpXML.setAttribute('minOccurs', "0");
        tmpXML.setAttribute('maxOccurs', "unbounded");
        this.__commentNodeSchemaElement = new cv.ui.manager.model.schema.Element(tmpXML, this);
      }

      return this.__commentNodeSchemaElement;
    },

    /**
     * get the DOM for this Schema
     *
     * @return  object  DOM
     */
    getSchemaDOM: function () {
      return this.__xsd;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__xsd = null;
    this._disposeObjects('__commentNodeSchemaElement', '__textNodeSchemaElement');
    this._disposeMap('__allowedRootElements');
    this.__referencedNodeCache = null;
    this.__typeNodeCache = null;
  }
});

