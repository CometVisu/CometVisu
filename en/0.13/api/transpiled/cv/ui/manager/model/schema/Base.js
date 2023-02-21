function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      "cv.ui.manager.model.Schema": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Base.js
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
  qx.Class.define('cv.ui.manager.model.schema.Base', {
    extend: qx.core.Object,
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    /**
     * @param   node    {Node} the group-node
     * @param   schema  {cv.ui.manager.model.Schema}  the corresponding schema
     */
    construct: function construct(node, schema) {
      qx.core.Object.constructor.call(this);
      this.setNode(node);
      this.setSchema(schema);
      this._bounds = {
        min: undefined,
        max: undefined
      };
      this._allowedElements = {};
      this._sortedContent = [];
      this._subGroupings = [];
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      /**
       * type of this object
       * @var string
       */
      type: {
        check: 'String',
        init: 'unknown'
      },
      elementsHaveOrder: {
        check: 'Boolean',
        init: false
      },
      schema: {
        check: 'cv.ui.manager.model.Schema',
        nullable: false
      },
      node: {
        check: 'Node',
        nullable: false
      },
      /**
       * array of sub-choices, -sequences, -groups that are defined
       * @var array
       */
      subGroupings: {
        check: 'Array'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * bounds for this element
       * @var object
       */
      _bounds: null,
      /**
       * cache for getRegex
       * @var string
       */
      _regexCache: null,
      /**
       * list of elements that are allowed as per our own definition
       * @var object
       */
      _allowedElements: null,
      /**
       * the sorted listed of allowed elements and sub-groupings
       * @var array
       */
      _sortedContent: null,
      /**
       * array of sub-choices, -sequences, -groups that are defined
       * @var array
       */
      _subGroupings: null,
      /// needs to be implemented by the inheriting classes
      parse: function parse() {
        var n = this.getNode();
        var min = n.hasAttribute('minOccurs') ? n.getAttribute('minOccurs') : 1; // default is 1
        var max = n.hasAttribute('maxOccurs') ? n.getAttribute('maxOccurs') : 1; // default is 1
        this._bounds = {
          min: parseInt(min),
          max: max === 'unbounded' ? Number.POSITIVE_INFINITY : parseInt(max)
        };
      },
      /**
       * is an element (specified by its name) allowed in this group?
       * Goes recursive.
       * Does NOT check bounds! Does NOT check dependencies!
       *
       * @param   element string  the element we check for
       * @return  boolean         is it allowed?
       */
      isElementAllowed: function isElementAllowed(element) {
        if (typeof this._allowedElements[element] !== 'undefined') {
          // this element is immediately allowed
          return true;
        }

        // go over the list of subGroupings and check, if the element is allowed with any of them
        for (var i = 0; i < this._subGroupings.length; ++i) {
          if (this._subGroupings[i].isElementAllowed(element) === true) {
            return true;
          }
        }
        return false;
      },
      /**
       * get the SchemaElement-object for a certain element-name.
       * May return undefined if no element is found, so you might be interested in checking isElementAllowed beforehand.
       *
       * @param   elementName string  name of the element to find the SchemaElement for
       * @return  object              SchemaElement-object, or undefined if none is found
       */
      getSchemaElementForElementName: function getSchemaElementForElementName(elementName) {
        if (typeof this._allowedElements[elementName] != 'undefined') {
          // this element is immediately allowed
          return this._allowedElements[elementName];
        }

        // go over the list of sub-choices and check, if the element is allowed with them
        for (var i = 0; i < this._subGroupings.length; ++i) {
          if (this._subGroupings[i].isElementAllowed(elementName) === true) {
            // this element is allowed
            return this._subGroupings[i].getSchemaElementForElementName(elementName);
          }
        }

        // can not find any reason why elementName is allowed with us...
        return undefined;
      },
      /**
       * get a list of required elements.
       * if an element is required multiple times, it is listed multiple times
       * Attention: elements are NOT sorted.
       *
       * @return  array   list of required elements
       */
      getRequiredElements: function getRequiredElements() {
        // we do know what we require. might not be too easy to find out, but ok

        // if we have no lower bounds, then nothing is required
        if (this._bounds.min === 0) {
          return [];
        }
        var requiredElements = [];

        // my own elements
        for (var _i = 0, _Object$entries = Object.entries(this._allowedElements); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            item = _Object$entries$_i[1];
          if (item.getBounds().min > 0) {
            for (var i = 0; i < item.getBounds().min; ++i) {
              requiredElements.push(name);
            }
          }
        }

        // elements of our sub-groupings, if any
        this._subGroupings.forEach(function (grouping) {
          var subRequiredElements = grouping.getRequiredElements();
          if (subRequiredElements.length > 0) {
            for (var _i2 = 0; _i2 < subRequiredElements.length; ++_i2) {
              requiredElements.push(subRequiredElements[_i2]);
            }
          }
        });
        return requiredElements;
      },
      /**
       * get the elements allowed for this group
       *
       * @return  object      list of allowed elements, key is the name
       */
      getAllowedElements: function getAllowedElements() {
        var myAllowedElements = {};
        for (var _i3 = 0, _Object$entries2 = Object.entries(this._allowedElements); _i3 < _Object$entries2.length; _i3++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
            name = _Object$entries2$_i[0],
            item = _Object$entries2$_i[1];
          myAllowedElements[name] = item;
        }

        // also the elements allowed by our sub-choices etc.
        this._subGroupings.forEach(function (grouping) {
          Object.assign(myAllowedElements, grouping.getAllowedElements());
        });
        return myAllowedElements;
      },
      /**
       * get the sorting of the allowed elements.
       * @param   sortNumber  integer the sort number of a parent (only used when recursive)
       * @return  object              list of allowed elements, with their sort-number as value
       */
      getAllowedElementsSorting: function getAllowedElementsSorting(sortNumber) {
        return {};
      },
      /**
       * get a regex (string) describing this choice
       *
       * @param   separator   string  the string used to separate different elements, e.g. ';'
       * @param   nocapture   bool    when set to true non capturing groups are used
       * @return  string  regex
       */
      getRegex: function getRegex(separator, nocapture) {
        return '';
      },
      /**
       * find out if this Grouping has multi-level-bounds, i.e. sub-groupings with bounds.
       * This makes it more or less impossible to know in advance which elements might be needed
       *
       * @return  boolean does it?
       */
      hasMultiLevelBounds: function hasMultiLevelBounds() {
        return this._subGroupings.length > 0;
      },
      /**
       * get the bounds of this very grouping
       *
       * @return  object  like {min: x, max: y}
       */
      getBounds: function getBounds() {
        return this._bounds;
      },
      /**
       * get bounds for a specific element.
       * Take into account the bounds of the element and/or our own bounds
       *
       * @param   childName   string  name of the child-to-be
       * @return  object              {max: x, min: y}, or undefined if none found
       */
      getBoundsForElementName: function getBoundsForElementName(childName) {
        return this._bounds;
      },
      /**
       * create a regex-object from a pattern
       *
       * For some obscure reason, this may not be inside a classes method, or else that class is not instantiateable
       *
       * @param   input       string  the pattern to match (without //)
       * @param   modifiers   string  modifiers, if any
       * @return  object              RegExp-object
       */
      regexFromString: function regexFromString(input, modifiers) {
        if (modifiers === undefined) {
          modifiers = '';
        }
        return new RegExp(input, modifiers);
      }
    }
  });
  cv.ui.manager.model.schema.Base.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Base.js.map?dt=1677017679071