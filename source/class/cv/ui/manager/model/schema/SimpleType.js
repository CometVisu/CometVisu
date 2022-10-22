/* SimpleType.js
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
  construct(node, schema) {
    super(node, schema);
    this.__enumerations = [];
    this.__pattern = [];
    this.__regexCache = {};
    this.__bases = [];
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
    __pattern: null,
    __enumerations: null,
    __bases: null,
    __regexCache: null,

    parse() {
      const node = this.getNode();
      this.setOptional(node.getAttribute('use') === 'required');
      this.__fillNodeData(node);
    },

    /**
     * parse a node, find it's data (restrictions, extensions, bases ... whatever)
     *
     * @param   node    DOMNode the node to parse
     */
    __fillNodeData(node) {
      const schema = this.getSchema();

      if (node.hasAttribute('ref')) {
        // it's a ref, seek other element!
        const refName = node.getAttribute('ref');
        node = schema.getReferencedNode('attribute', refName);

        if (!node) {
          throw new Error('schema/xsd appears to be invalid, can not find element ' + refName);
        }
      }

      if (node.hasAttribute('type')) {
        // hacked: allow this to be used for attributes
        const baseType = node.getAttribute('type');

        if (!baseType.match(/^xsd:/)) {
          // if it's not an xsd-default-basetype, we need to find out what it is
          const subnode = schema.getReferencedNode('simpleType', baseType);
          this.__fillNodeData(subnode);
        } else {
          this.setBaseType(baseType);
        }
        // is this attribute optional?
        this.setOptional(node.getAttribute('use') !== 'required');

        return;
      }

      const subNodes = Array.from(
        node.querySelectorAll(
          ':scope > restriction, :scope > extension, :scope > simpleType > restriction, :scope > simpleType > extension'
        )
      );

      subNodes.forEach(subNode => {
        const baseType = subNode.getAttribute('base');

        if (!baseType.match(/^xsd:/)) {
          // don't dive in for default-types, they simply can not be found
          const subnode = schema.getReferencedNode('simpleType', baseType);
          this.__fillNodeData(subnode);
        } else {
          this.setBaseType(baseType);
        }
        Array.from(subNode.querySelectorAll(':scope > pattern')).forEach(patternNode => {
          this.__pattern.push(patternNode.getAttribute('value'));
        });

        Array.from(subNode.querySelectorAll(':scope > enumeration')).forEach(enumerationNode => {
          this.__enumerations.push(enumerationNode.getAttribute('value'));
        });
      });

      if (!this.getBaseType()) {
        this.setBaseType('xsd:anyType');
      }
      this.__bases.push(this.getBaseType());
    },

    /**
     * check if a given value is valid for this type
     *
     * @param   value   mixed   the value to check
     * @return  boolean         if the value is valid
     */
    isValueValid(value) {
      const baseType = this.getBaseType();
      const schema = this.getSchema();
      if (!baseType) {
        throw new Error('something is wrong, do not have a baseType for type');
      }

      if (value === '') {
        // empty values are valid if this node is optional!
        return this.isOptional();
      }

      if (baseType.search(/^xsd:/) === -1) {
        // created our own type, will need to find and use it.
        const typeNode = schema.getTypeNode('simple', baseType);
        const subType = new cv.ui.manager.model.schema.SimpleType(typeNode, schema);

        return subType.isValueValid(value);
      }
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
          throw new Error('not implemented baseType ' + baseType);
      }

      // check if the value is in our list of valid values, if there is such a list
      if (this.__enumerations.length > 0) {
        if (!this.__enumerations.includes(value)) {
          return false;
        }
      }

      // check if the value matches any given pattern
      if (this.__pattern.length > 0) {
        // start with assuming it's valid
        let boolValid = true;

        this.__pattern.forEach(item => {
          if (!Object.prototype.hasOwnProperty.call(this.__regexCache, item)) {
            // create a regex from the pattern; mind ^ an $ - XSD has them implicitly (XSD Datatypes, Appendix G)
            // so for our purpose, we need to add them for every branch (that is not inside [])
            const branchIndices = [];
            let start = 0;
            let i = item.indexOf('|', start);
            while (i < item.length) {
              if (i < 0) {
                break;
              }
              // go backwards and look for an [ stop looking on ]
              let isRootBranch = true;
              for (let j = i; j >= start; j--) {
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
              if (branchIndices.length > 100) {
                this.error('too many branchIndices');
                break;
              }
            }
            if (item.length > start) {
              // append the rest
              branchIndices.push([start, item.length - start]);
            }
            const branches = branchIndices.map(
              entry => `^${item.substr(entry[0], entry[1]).replace(/\\([\s\S])|(\$)/g, '\\$1$2')}$`
            );

            this.__regexCache[item] = this.regexFromString(branches.join('|'));
          }

          if (this.__regexCache[item].test(value) === false) {
            // regular expression did not match
            // bad bad value!
            boolValid = false;
          }
        }, this);

        // if the value has been marked invalid by a regex, return invalid.
        if (boolValid === false) {
          return false;
        }
      }

      // if no check said the value is invalid, then it is not invalid
      return true;
    },

    /**
     * get this elements enumeration (if there is any)
     *
     * @return  array   list of allowed values (if there are any)
     */
    getEnumeration() {
      if (this.getBaseType() === 'xsd:boolean') {
        // special handling for boolean, as we KNOW it to be an enumeration
        return ['true', 'false'];
      }

      return this.__enumerations;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__regexCache = null;
  }
});
