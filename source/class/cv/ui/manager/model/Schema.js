/* Schema.js
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
qx.Class.define('cv.ui.manager.model.Schema', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(filename) {
    super();
    if (!filename || !filename.match(/\.xsd$/)) {
      throw new Error('no, empty or invalid filename given, can not instantiate without one');
    }
    this.__filename = filename;
    this.setStructure(filename.endsWith('visu_config_tile.xsd') ? 'tile' : 'pure');

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

    getInstance(schemaFile) {
      if (!Object.prototype.hasOwnProperty.call(this.__CACHE, schemaFile)) {
        this.__CACHE[schemaFile] = new cv.ui.manager.model.Schema(
          qx.util.ResourceManager.getInstance().toUri(schemaFile)
        );
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
    },

    structure: {
      check: ['pure', 'tile'],
      apply: '_applyStructure'
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

    /**
     * @var {Array<String>}
     */
    _widgetNames: null,

    /**
     * @var {String}
     */
    __rootElementName: null,

    /**
     * @var {String}
     */
    __pageParentElementName: null,

    /**
     * @var {String}
     */
    __pageElementName: null,

    _applyStructure(structure) {
      if (structure === 'tile') {
        this.__rootElementName = 'config';
        this.__pageParentElementName = 'main';
        this.__pageElementName = 'cv-page';
      } else {
        this.__rootElementName = 'pages';
        this.__pageElementName = 'page';
      }
    },

    onLoaded(callback, context) {
      if (this.isLoaded()) {
        callback.call(context);
      } else {
        this.addListenerOnce('changeLoaded', callback, context);
      }
    },

    /**
     * load and cache the xsd from the server
     */
    _cacheXSD() {
      const ajaxRequest = new qx.io.request.Xhr(this.__filename);
      ajaxRequest.set({
        accept: 'application/xml'
      });

      ajaxRequest.addListenerOnce('success', async (e) => {
        const req = e.getTarget();
        // Response parsed according to the server's response content type
        let xml = req.getResponse();
        if (xml && typeof xml === 'string') {
          xml = qx.xml.Document.fromString(xml);
        }
        // embed all includes
        let includeXml;
        for (let include of xml.querySelectorAll('schema include')) {
          includeXml = await this.loadXml('resource/' + include.getAttribute('schemaLocation'));
          const target = include.parentElement;
          include.remove();
          for (let includedChild of includeXml.querySelectorAll('schema > *')) {
            target.appendChild(includedChild);
          }
        }
        this.__xsd = xml;

        // parse the data, to have at least a list of root-level-elements
        this._parseXSD();
      });
      ajaxRequest.send();
    },

    async loadXml(file) {
      console.log('loading', file);
      return new Promise((resolve, reject) => {
        const ajaxRequest = new qx.io.request.Xhr(file);
        ajaxRequest.set({
          accept: 'application/xml'
        });
        ajaxRequest.addListenerOnce('success', e => {
          const req = e.getTarget();
          // Response parsed according to the server's response content type
          let xml = req.getResponse();
          if (xml && typeof xml === 'string') {
            xml = qx.xml.Document.fromString(xml);
          }
          resolve(xml);
        });
        ajaxRequest.addListenerOnce('statusError', e => {
          const req = e.getTarget();
          reject(new Error(req.getStatusText()));
        })
        ajaxRequest.send();
      });
    },

    /**
     * parse the schema once
     */
    _parseXSD() {
      // make a list of root-level elements
      this.__xsd.querySelectorAll('schema > element').forEach(element => {
        const name = element.getAttribute('name');
        this.__allowedRootElements[name] = new cv.ui.manager.model.schema.Element(element, this);
      });
      this.setLoaded(true);
    },

    getElementNode(name) {
      if (Object.prototype.hasOwnProperty.call(this.__allowedRootElements, name)) {
        return this.__allowedRootElements[name];
      }
      throw new Error('schema/xsd appears to be invalid, element ' + name + ' not allowed on root level');
    },

    /**
     * dive into the schema and find the element that is being pulled in by a ref.
     * Do so recursively.
     * referenced nodes can be top-level-nodes only!
     *
     * @param   type       string  Type of the node (e.g. element, attributeGroup, ...)
     * @param   refName    string  Name as per the ref-attribute
     * @param   noFallback boolean Don't look up other types as fallback, if the requested type is not found
     * @return  object          jQuery-object of the ref'ed element
     */
    getReferencedNode(type, refName, noFallback) {
      if (
        Object.prototype.hasOwnProperty.call(this.__referencedNodeCache, type) &&
        Object.prototype.hasOwnProperty.call(this.__referencedNodeCache[type], refName)
      ) {
        return this.__referencedNodeCache[type][refName];
      }
      const fallbackType = type === 'simpleType' ? 'complexType' : 'simpleType';
      if (!noFallback) {
        if (
          Object.prototype.hasOwnProperty.call(this.__referencedNodeCache, fallbackType) &&
          Object.prototype.hasOwnProperty.call(this.__referencedNodeCache[fallbackType], refName)
        ) {
          return this.__referencedNodeCache[fallbackType][refName];
        }
      }

      const selector = 'schema > ' + type + '[name="' + refName + '"]';
      let ref = this.__xsd.querySelector(selector);
      if (!ref && !noFallback) {
        try {
          ref = this.getReferencedNode(fallbackType, refName, true);
        } catch (e) {}
      }
      if (!ref) {
        throw new Error('schema/xsd appears to be invalid, reference ' + type + ' "' + refName + '" can not be found');
      }

      if (ref.hasAttribute('ref')) {
        // do it recursively, if necessary
        ref = this.getReferencedNode(type, ref.getAttribute('ref'));
      }

      if (!Object.prototype.hasOwnProperty.call(this.__referencedNodeCache, type)) {
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
    getTypeNode(type, name) {
      if (
        Object.prototype.hasOwnProperty.call(this.__typeNodeCache, type) &&
        Object.prototype.hasOwnProperty.call(this.__typeNodeCache[type], name)
      ) {
        return this.__typeNodeCache[type][name];
      }
      let typeNode = this.__xsd.querySelector(type + 'Type[name="' + name + '"]');

      if (!typeNode) {
        throw new Error('schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found');
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
    getTextNodeSchemaElement() {
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
    getCommentNodeSchemaElement() {
      if (this.__commentNodeSchemaElement === null) {
        // text-content is always a simple string
        const tmpXML = this.__xsd.createElement('element');
        tmpXML.setAttribute('name', '#comment');
        tmpXML.setAttribute('type', 'xsd:string');
        tmpXML.setAttribute('minOccurs', '0');
        tmpXML.setAttribute('maxOccurs', 'unbounded');
        this.__commentNodeSchemaElement = new cv.ui.manager.model.schema.Element(tmpXML, this);
      }

      return this.__commentNodeSchemaElement;
    },

    /**
     * get the DOM for this Schema
     *
     * @return  object  DOM
     */
    getSchemaDOM() {
      return this.__xsd;
    },

    /**
     * A CometVisu-Schema specific helper function that returns an array of all widget names.
     * @returns {Array<String>}
     */
    getWidgetNames() {
      if (!this._widgetNames) {
        const root = this.getElementNode(this.__rootElementName);
        let pageParent = root;
        if (this.__pageParentElementName) {
          pageParent = root.getSchemaElementForElementName(this.__pageParentElementName);
        }
        const page = pageParent.getSchemaElementForElementName(this.__pageElementName);

        this._widgetNames = Object.keys(page.getAllowedElements()).filter(
          name => !name.startsWith('#') && name !== 'layout'
        );
      }
      return this._widgetNames;
    },

    isRoot(name) {
      return name === this.__rootElementName;
    },

    isPage(name) {
      return (name = this.__pageElementName);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__xsd = null;
    this._disposeObjects('__commentNodeSchemaElement', '__textNodeSchemaElement');

    this._disposeMap('__allowedRootElements');
    this.__referencedNodeCache = null;
    this.__typeNodeCache = null;
    this._widgetNames = null;
  }
});
