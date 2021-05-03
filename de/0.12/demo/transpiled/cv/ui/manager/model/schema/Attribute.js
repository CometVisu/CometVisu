(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.model.schema.Base": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.model.schema.MAnnotation": {
        "require": true
      },
      "cv.ui.manager.model.schema.SimpleType": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * a single attribute from the schema.
   */
  qx.Class.define('cv.ui.manager.model.schema.Attribute', {
    extend: cv.ui.manager.model.schema.Base,
    include: cv.ui.manager.model.schema.MAnnotation,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(node, schema) {
      cv.ui.manager.model.schema.Base.constructor.call(this, node, schema);
      this.parse();
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      /**
       * Get the name of a schema-node
       *
       * @param   e object  element to find the name of
       * @return  string          name of the element
       * @throws  if the name can not be found
       */
      getAttributeName: function getAttributeName(e, schema) {
        if (e.hasAttribute('name')) {
          return e.getAttribute('name');
        }

        if (e.hasAttribute('ref')) {
          // it's a ref, seek other element!
          var refName = e.getAttribute('ref');
          var ref = schema.getReferencedNode('attribute', refName);

          if (!ref) {
            throw 'schema/xsd appears to be invalid, can not find element ' + refName;
          }

          return ref.getAttribute('name');
        }

        return 'unknown';
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        refine: true,
        init: 'attribute'
      },
      name: {
        check: 'String',
        init: ''
      },
      optional: {
        check: 'Boolean',
        init: false
      },
      defaultValue: {
        check: 'String',
        nullable: true
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _type: null,
      parse: function parse() {
        var node = this.getNode();
        var schema = this.getSchema();
        /**
         * we have our own type
         * @var object  SchemaSimpleType of the attribute, for validating purposes
         */

        this._type = new cv.ui.manager.model.schema.SimpleType(node, schema);
        this.setName(cv.ui.manager.model.schema.Attribute.getAttributeName(node, schema));

        if (node.hasAttribute('default')) {
          this.setDefaultValue(node.getAttribute('default'));
        }

        this.setOptional(node.getAttribute('use') !== 'required');
      },

      /**
       * check if a given value is valid for this attribute
       *
       * @param   value   mixed   the value to check
       * @return  boolean         if the value is valid
       */
      isValueValid: function isValueValid(value) {
        if (value === null || value === undefined) {
          value = '';
        } else {
          value = '' + value;
        }

        if (value === '') {
          // empty values are valid if this node is optional!
          return this.isOptional();
        }

        return this._type.isValueValid(value);
      },

      /**
       * get a simple string telling us, what type of content is allowed
       *
       * @return  string  description of allowed values, almost user-readable :)
       */
      getTypeString: function getTypeString() {
        var description = this._type.getBaseType();

        if (description.match(/xsd\:/)) {
          return description.replace(/xsd\:/, '');
        }

        return this.tr('complex type, please see documentation');
      },

      /**
       * get the list of values that are valid for this attribute, if it is an enumeration
       *
       * @return  array   list of string of valid values
       */
      getEnumeration: function getEnumeration() {
        return this._type.getEnumeration();
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_46_0 = null;
      this.__P_46_1 = null;
    }
  });
  cv.ui.manager.model.schema.Attribute.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Attribute.js.map?dt=1620071701847