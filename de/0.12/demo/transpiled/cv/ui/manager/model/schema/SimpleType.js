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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * a single SimpleType from the schema.
   * Should be useable for SimpleContent, too.
   * Is usable for attributes, too.
   */
  qx.Class.define('cv.ui.manager.model.schema.SimpleType', {
    extend: cv.ui.manager.model.schema.Base,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(node, schema) {
      cv.ui.manager.model.schema.Base.constructor.call(this, node, schema);
      this.__P_49_0 = [];
      this.__P_49_1 = [];
      this.__P_49_2 = {};
      this.__P_49_3 = [];
      this.parse();
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        refine: true,
        init: 'simpleType'
      },
      optional: {
        check: 'Boolean',
        init: false
      },

      /**
       * the baseType of this element, which is one of the xsd-namespaced types (like 'string')
       * @var string
       */
      baseType: {
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
      __P_49_1: null,
      __P_49_0: null,
      __P_49_3: null,
      __P_49_2: null,
      parse: function parse() {
        var node = this.getNode();
        this.setOptional(node.getAttribute('use') === 'required');

        this.__P_49_4(node);
      },

      /**
       * parse a node, find it's data (restrictions, extensions, bases ... whatever)
       *
       * @param   node    DOMNode the node to parse
       */
      __P_49_4: function __P_49_4(node) {
        var _this = this;

        var schema = this.getSchema();

        if (node.hasAttribute('ref')) {
          // it's a ref, seek other element!
          var refName = node.getAttribute('ref');
          node = schema.getReferencedNode('attribute', refName);

          if (!node) {
            throw 'schema/xsd appears to be invalid, can not find element ' + refName;
          }
        }

        if (node.hasAttribute('type')) {
          // hacked: allow this to be used for attributes
          var baseType = node.getAttribute('type');

          if (!baseType.match(/^xsd:/)) {
            // if it's not an xsd-default-basetype, we need to find out what it is
            var subnode = schema.getReferencedNode('simpleType', baseType);

            this.__P_49_4(subnode);
          } else {
            this.setBaseType(baseType);
          } // is this attribute optional?


          this.setOptional(node.getAttribute('use') !== 'required');
          return;
        }

        var subNodes = Array.from(node.querySelectorAll(':scope > restriction, :scope > extension, :scope > simpleType > restriction, :scope > simpleType > extension'));
        subNodes.forEach(function (subNode) {
          var baseType = subNode.getAttribute('base');

          if (!baseType.match(/^xsd:/)) {
            // don't dive in for default-types, they simply can not be found
            var _subnode = schema.getReferencedNode('simpleType', baseType);

            _this.__P_49_4(_subnode);
          } else {
            _this.setBaseType(baseType);
          }

          Array.from(subNode.querySelectorAll(':scope > pattern')).forEach(function (patternNode) {
            _this.__P_49_1.push(patternNode.getAttribute('value'));
          });
          Array.from(subNode.querySelectorAll(':scope > enumeration')).forEach(function (enumerationNode) {
            _this.__P_49_0.push(enumerationNode.getAttribute('value'));
          });
        });

        if (!this.getBaseType()) {
          this.setBaseType('xsd:anyType');
        }

        this.__P_49_3.push(this.getBaseType());
      },

      /**
       * check if a given value is valid for this type
       *
       * @param   value   mixed   the value to check
       * @return  boolean         if the value is valid
       */
      isValueValid: function isValueValid(value) {
        var _this2 = this;

        var baseType = this.getBaseType();
        var schema = this.getSchema();

        if (!baseType) {
          throw 'something is wrong, do not have a baseType for type';
        }

        if (value === '') {
          // empty values are valid if this node is optional!
          return this.isOptional();
        }

        if (-1 === baseType.search(/^xsd:/)) {
          // created our own type, will need to find and use it.
          var typeNode = schema.getTypeNode('simple', baseType);
          var subType = new cv.ui.manager.model.schema.SimpleType(typeNode, schema);
          return subType.isValueValid(value);
        } else {
          // xsd:-namespaces types, those are the originals
          switch (baseType) {
            case 'xsd:string':
            case 'xsd:anyURI':
            case 'xsd:anyType':
              if (!(typeof value == 'string')) {
                // it's not a string, but it should be.
                // pretty much any input a user gives us is string, so this is pretty much moot.
                return false;
              }

              break;

            case 'xsd:decimal':
              if (!value.match(/^[-+]?[0-9]*(\.[0-9]+)?$/)) {
                return false;
              }

              break;

            case 'xsd:unsignedByte':
            case 'xsd:nonNegativeInteger':
              if (!value.match(/^[+]?[0-9]+$/)) {
                return false;
              }

              break;

            case 'xsd:integer':
              if (!value.match(/^[-+]?[0-9]+$/)) {
                return false;
              }

              break;

            case 'xsd:float':
              if (!value.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
                return false;
              }

              break;

            case 'xsd:boolean':
              if (!value.match(/^(true|false|0|1)$/)) {
                return false;
              }

              break;

            default:
              throw 'not implemented baseType ' + baseType;
          }
        } // check if the value is in our list of valid values, if there is such a list


        if (this.__P_49_0.length > 0) {
          if (!this.__P_49_0.includes(value)) {
            return false;
          }
        } // check if the value matches any given pattern


        if (this.__P_49_1.length > 0) {
          // start with assuming it's valid
          var boolValid = true;

          this.__P_49_1.forEach(function (item) {
            if (!_this2.__P_49_2.hasOwnProperty(item)) {
              // create a regex from the pattern; mind ^ an $ - XSD has them implicitly (XSD Datatypes, Appendix G)
              // so for our purpose, we need to add them for every branch (that is not inside [])
              var branchIndices = [];
              var start = 0;
              var i = item.indexOf("|", start);

              while (i < item.length) {
                if (i < 0) {
                  break;
                } // go backwards and look for an [ stop looking on ]


                var isRootBranch = true;

                for (var j = i; j >= start; j--) {
                  if (item[j] === ']') {
                    break;
                  } else if (item[j] === '[') {
                    isRootBranch = false;
                  }
                }

                if (isRootBranch) {
                  branchIndices.push([start, i - start]);
                }

                start = i + 1;
                i = item.indexOf('|', start);
                if (branchIndices.length > 100) debugger;
              }

              if (item.length > start) {
                // append the rest
                branchIndices.push([start, item.length - start]);
              }

              var branches = branchIndices.map(function (entry) {
                return "^".concat(item.substr(entry[0], entry[1]).replace(/\\([\s\S])|(\$)/g, '\\$1$2'), "$");
              });
              _this2.__P_49_2[item] = _this2.regexFromString(branches.join("|"));
            }

            if (false === _this2.__P_49_2[item].test(value)) {
              // regular expression did not match
              // bad bad value!
              boolValid = false;
            }
          }, this); // if the value has been marked invalid by a regex, return invalid.


          if (false === boolValid) {
            return false;
          }
        } // if no check said the value is invalid, then it is not invalid


        return true;
      },

      /**
       * get this elements enumeration (if there is any)
       *
       * @return  array   list of allowed values (if there are any)
       */
      getEnumeration: function getEnumeration() {
        if (this.getBaseType() === 'xsd:boolean') {
          // special handling for boolean, as we KNOW it to be an enumeration
          return ['true', 'false'];
        }

        return this.__P_49_0;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_49_2 = null;
    }
  });
  cv.ui.manager.model.schema.SimpleType.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SimpleType.js.map?dt=1620513274686