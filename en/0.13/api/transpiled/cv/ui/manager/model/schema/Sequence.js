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
      "cv.ui.manager.model.schema.Element": {},
      "cv.ui.manager.model.schema.Choice": {},
      "cv.ui.manager.model.schema.Group": {},
      "cv.ui.manager.model.schema.Any": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Sequence.js 
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
   * a single sequence.
   * may be recursive
   */
  qx.Class.define('cv.ui.manager.model.schema.Sequence', {
    extend: cv.ui.manager.model.schema.Base,

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
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        refine: true,
        init: 'sequence'
      },
      elementsHaveOrder: {
        refine: true,
        init: true
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * parse a list of elements in this group.
       * Group is allowed (all|choice|sequence)? as per the definition.
       * We do all of those (except for 'all')
       */
      parse: function parse() {
        var _this = this;

        cv.ui.manager.model.schema.Sequence.superclass.prototype.parse.call(this);
        var schema = this.getSchema(); // for a sequence, we need to keep the order of the elements
        // so we have to use a 'mixed' approach in reading them

        var subNodes = Array.from(this.getNode().children);
        subNodes.forEach(function (subNode) {
          var subObject;

          switch (subNode.nodeName) {
            case 'xsd:element':
            case 'element':
              subObject = new cv.ui.manager.model.schema.Element(subNode, schema); // sequences' children are non-sortable

              subObject.setSortable(false);
              _this._allowedElements[subObject.getName()] = subObject;
              break;

            case 'xsd:choice':
            case 'choice':
              subObject = new cv.ui.manager.model.schema.Choice(subNode, schema);

              _this._subGroupings.push(subObject);

              break;

            case 'xsd:sequence':
            case 'sequence':
              subObject = new cv.ui.manager.model.schema.Sequence(subNode, schema);

              _this._subGroupings.push(subObject);

              break;

            case 'xsd:group':
            case 'group':
              subObject = new cv.ui.manager.model.schema.Group(subNode, schema);

              _this._subGroupings.push(subObject);

              break;

            case 'xsd:any':
            case 'any':
              subObject = new cv.ui.manager.model.schema.Any(subNode, schema);

              _this._subGroupings.push(subObject);

              break;
          }

          _this._sortedContent.push(subObject);
        });
        this._allowedElements['#comment'] = this.getSchema().getCommentNodeSchemaElement();
      },

      /**
       * get a regex (string) describing this choice
       *
       * @param   separator   string  the string used to separate different elements, e.g. ';'
       * @param   nocapture   bool    when set to true non capturing groups are used
       * @return  string  regex
       */
      getRegex: function getRegex(separator, nocapture) {
        if (this._regexCache !== null) {
          // use the cache if primed
          return this._regexCache;
        }

        var regexString = '('; // create list of allowed elements

        if (nocapture) {
          regexString += '?:';
        }

        var elementRegexes = []; // this goes over ALL elements AND sub-groupings

        this._sortedContent.forEach(function (element) {
          elementRegexes.push(element.getRegex(separator, nocapture));
        });

        regexString += elementRegexes.join('');
        regexString += ')'; // append bounds to regex

        regexString += '{';
        var bounds = this.getBounds();
        regexString += bounds.min === undefined ? 1 : bounds.min;
        regexString += ',';

        if (bounds.max !== Number.POSITIVE_INFINITY) {
          regexString += bounds.max === undefined ? 1 : bounds.max;
        }

        regexString += '}'; // fill the cache

        this._regexCache = regexString; // thats about it.

        return regexString;
      },
      getBoundsForElementName: function getBoundsForElementName(childName) {
        // we are a sequence-element; there is actually a lot of sayings ...
        if (typeof this._allowedElements[childName] !== 'undefined') {
          var elementBounds = this._allowedElements[childName].getBounds();

          var sequenceBounds = this.getBounds();
          var resultBounds = {
            min: 1,
            max: 1
          }; // if it is bounded, we must duplicate element and sequence bounds
          // (an element may appear as often as the number of sequences times the number of elements
          // in each sequence - roughly)

          if (Object.prototype.hasOwnProperty.call(elementBounds, 'min')) {
            resultBounds.min = elementBounds.min;
          }

          if (Object.prototype.hasOwnProperty.call(sequenceBounds, 'min') && !isNaN(sequenceBounds.min)) {
            resultBounds.min *= sequenceBounds.min;
          }

          if (elementBounds.max === Number.POSITIVE_INFINITY || sequenceBounds.max === Number.POSITIVE_INFINITY) {
            resultBounds.max = Number.POSITIVE_INFINITY;
          } else {
            if (Object.prototype.hasOwnProperty.call(elementBounds, 'max')) {
              resultBounds.max = elementBounds.max;
            }

            if (Object.prototype.hasOwnProperty.call(sequenceBounds, 'max') && !isNaN(sequenceBounds.max)) {
              resultBounds.max *= sequenceBounds.max;
            }
          }

          return resultBounds;
        }

        var childBounds;
        var tmpBounds;

        for (var i = 0; i < this._subGroupings.length; ++i) {
          tmpBounds = this._subGroupings[i].getBoundsForElementName(childName);

          if (undefined !== tmpBounds) {
            // once we find the first set of bounds, we return that
            childBounds = tmpBounds;
            break;
          }
        }

        return childBounds;
      },

      /**
       * get the sorting of the allowed elements
       *
       * Warning: this only works if any element can have only ONE position in the parent.
       * @param sortNumber  integer the sortNumber of a parent (only used when recursive)
       * @return object     list of allowed elements, with their sort-number as value
       */
      getAllowedElementsSorting: function getAllowedElementsSorting(sortNumber) {
        var namesWithSorting = {};

        this._sortedContent.forEach(function (item, i) {
          var mySortNumber = i;

          if (sortNumber !== undefined) {
            mySortNumber = sortNumber + '.' + i;
          }

          if (item.getType() === 'element') {
            namesWithSorting[item.getName()] = mySortNumber;
          } else {
            // go recursive
            var subSortedElements = item.getAllowedElementsSorting(mySortNumber);
            Object.assign(namesWithSorting, subSortedElements);
          }
        });

        return namesWithSorting;
      }
    }
  });
  cv.ui.manager.model.schema.Sequence.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Sequence.js.map?dt=1664617278990