(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.io.request.Xhr": {},
      "qx.xml.Document": {},
      "cv.ui.manager.model.schema.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(filename) {
      qx.core.Object.constructor.call(this);

      if (!filename || !filename.match(/\.xsd$/)) {
        throw new Error('no, empty or invalid filename given, can not instantiate without one');
      }

      this.__filename = filename;
      this.setStructure(filename.endsWith('visu_config_tile.xsd') ? 'tile' : 'pure');
      this.__P_43_0 = {};
      this.__P_43_1 = {};
      this.__P_43_2 = {};

      this._cacheXSD();
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      __P_43_3: {},
      getInstance: function getInstance(schemaFile) {
        if (!Object.prototype.hasOwnProperty.call(this.__P_43_3, schemaFile)) {
          this.__P_43_3[schemaFile] = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri(schemaFile));
        }

        return this.__P_43_3[schemaFile];
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
      __P_43_4: null,

      /**
       * object of allowed root-level elements
       * @var object
       */
      __P_43_0: null,

      /**
       * cache for referenced nods
       * @var object
       */
      __P_43_1: null,

      /**
       * cache for getTypeNode
       * @var object
       */
      __P_43_2: null,

      /**
       * cache for #text-SchemaElement
       * @var object
       */
      __P_43_5: null,

      /**
       * cache for #comment-SchemaElement
       * @var object
       */
      __P_43_6: null,

      /**
       * @var {Array<String>}
       */
      _widgetNames: null,

      /**
       * @var {String}
       */
      __P_43_7: null,

      /**
       * @var {String}
       */
      __P_43_8: null,

      /**
       * @var {String}
       */
      __P_43_9: null,
      _applyStructure: function _applyStructure(structure) {
        if (structure === 'tile') {
          this.__P_43_7 = 'config';
          this.__P_43_8 = 'main';
          this.__P_43_9 = 'cv-page';
        } else {
          this.__P_43_7 = 'pages';
          this.__P_43_9 = 'page';
        }
      },
      onLoaded: function onLoaded(callback, context) {
        if (this.isLoaded()) {
          callback.call(context);
        } else {
          this.addListenerOnce('changeLoaded', callback, context);
        }
      },

      /**
       * load and cache the xsd from the server
       */
      _cacheXSD: function _cacheXSD() {
        var ajaxRequest = new qx.io.request.Xhr(this.__filename);
        ajaxRequest.set({
          accept: 'application/xml'
        });
        ajaxRequest.addListenerOnce('success', function (e) {
          var req = e.getTarget(); // Response parsed according to the server's response content type

          var xml = req.getResponse();

          if (xml && typeof xml === 'string') {
            xml = qx.xml.Document.fromString(xml);
          }

          this.__P_43_4 = xml; // parse the data, to have at least a list of root-level-elements

          this._parseXSD();
        }, this);
        ajaxRequest.send();
      },

      /**
       * parse the schema once
       */
      _parseXSD: function _parseXSD() {
        var _this = this;

        // make a list of root-level elements
        this.__P_43_4.querySelectorAll('schema > element').forEach(function (element) {
          var name = element.getAttribute('name');
          _this.__P_43_0[name] = new cv.ui.manager.model.schema.Element(element, _this);
        });

        this.setLoaded(true);
      },
      getElementNode: function getElementNode(name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_43_0, name)) {
          return this.__P_43_0[name];
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
      getReferencedNode: function getReferencedNode(type, refName, noFallback) {
        if (Object.prototype.hasOwnProperty.call(this.__P_43_1, type) && Object.prototype.hasOwnProperty.call(this.__P_43_1[type], refName)) {
          return this.__P_43_1[type][refName];
        }

        var fallbackType = type === 'simpleType' ? 'complexType' : 'simpleType';

        if (!noFallback) {
          if (Object.prototype.hasOwnProperty.call(this.__P_43_1, fallbackType) && Object.prototype.hasOwnProperty.call(this.__P_43_1[fallbackType], refName)) {
            return this.__P_43_1[fallbackType][refName];
          }
        }

        var selector = 'schema > ' + type + '[name="' + refName + '"]';

        var ref = this.__P_43_4.querySelector(selector);

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

        if (!Object.prototype.hasOwnProperty.call(this.__P_43_1, type)) {
          this.__P_43_1[type] = {};
        } // fill the cache


        this.__P_43_1[type][refName] = ref;
        return ref;
      },

      /**
       * get the definition of a type, be it complex or simple
       *
       * @param   type    string  Type of type to find (either simple or complex)
       * @param   name    string  Name of the type to find
       */
      getTypeNode: function getTypeNode(type, name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_43_2, type) && Object.prototype.hasOwnProperty.call(this.__P_43_2[type], name)) {
          return this.__P_43_2[type][name];
        }

        var typeNode = this.__P_43_4.querySelector(type + 'Type[name="' + name + '"]');

        if (!typeNode) {
          throw new Error('schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found');
        }

        if (typeof this.__P_43_2[type] == 'undefined') {
          this.__P_43_2[type] = {};
        } // fill the cache


        this.__P_43_2[type][name] = typeNode;
        return typeNode;
      },

      /**
       * get a SchemaElement for a #text-node
       *
       * @return  object  SchemaElement for #text-node
       */
      getTextNodeSchemaElement: function getTextNodeSchemaElement() {
        if (this.__P_43_5 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_43_4.createElement('element');

          tmpXML.setAttribute('name', '#text');
          tmpXML.setAttribute('type', 'xsd:string');
          this.__P_43_5 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }

        return this.__P_43_5;
      },

      /**
       * get a SchemaElement for a #comment-node
       *
       * @return  object  SchemaElement for #comment-node
       */
      getCommentNodeSchemaElement: function getCommentNodeSchemaElement() {
        if (this.__P_43_6 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_43_4.createElement('element');

          tmpXML.setAttribute('name', '#comment');
          tmpXML.setAttribute('type', 'xsd:string');
          tmpXML.setAttribute('minOccurs', '0');
          tmpXML.setAttribute('maxOccurs', 'unbounded');
          this.__P_43_6 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }

        return this.__P_43_6;
      },

      /**
       * get the DOM for this Schema
       *
       * @return  object  DOM
       */
      getSchemaDOM: function getSchemaDOM() {
        return this.__P_43_4;
      },

      /**
       * A CometVisu-Schema specific helper function that returns an array of all widget names.
       * @returns {Array<String>}
       */
      getWidgetNames: function getWidgetNames() {
        if (!this._widgetNames) {
          var root = this.getElementNode(this.__P_43_7);
          var pageParent = root;

          if (this.__P_43_8) {
            pageParent = root.getSchemaElementForElementName(this.__P_43_8);
          }

          var page = pageParent.getSchemaElementForElementName(this.__P_43_9);
          this._widgetNames = Object.keys(page.getAllowedElements()).filter(function (name) {
            return !name.startsWith('#') && name !== 'layout';
          });
        }

        return this._widgetNames;
      },
      isRoot: function isRoot(name) {
        return name === this.__P_43_7;
      },
      isPage: function isPage(name) {
        return name = this.__P_43_9;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_43_4 = null;

      this._disposeObjects("__P_43_6", "__P_43_5");

      this._disposeMap("__P_43_0");

      this.__P_43_1 = null;
      this.__P_43_2 = null;
      this._widgetNames = null;
    }
  });
  cv.ui.manager.model.Schema.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Schema.js.map?dt=1664297869960