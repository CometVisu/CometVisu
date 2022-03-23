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
      "cv.ui.manager.model.schema.Choice": {},
      "cv.ui.manager.model.schema.Sequence": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Group.js 
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
   * a single group.
   * may be recursive
   */
  qx.Class.define('cv.ui.manager.model.schema.Group', {
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
        init: 'group'
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
        cv.ui.manager.model.schema.Group.prototype.parse.base.call(this);
        var schema = this.getSchema();
        var group = this.getNode();

        if (group.hasAttribute('ref')) {
          // if this is a reference, unravel it.
          group = schema.getReferencedNode('group', group.getAttribute('ref'));
        } // we are allowed choice and sequence, but only ONE AT ALL is allowed


        var grouping = group.querySelector(':scope > choice');

        if (grouping) {
          this._subGroupings.push(new cv.ui.manager.model.schema.Choice(grouping, schema));
        } else {
          grouping = group.querySelector(':scope > sequence');

          if (grouping) {
            this._subGroupings.push(new cv.ui.manager.model.schema.Sequence(grouping, schema));
          }
        }
      },

      /**
       * get the elements allowed for this group
       *
       * @return  object      list of allowed elements, key is the name
       */
      getAllowedElements: function getAllowedElements() {
        // we have non of ourselves, so we return what the child says
        return this._subGroupings[0].getAllowedElements();
      },

      /**
       * get the sorting of the allowed elements.
       * For a group, all elements have the same sorting, so they will all have the
       * same sort number
       *
       * Warning: this only works if any element can have only ONE position in the parent.
       *
       * @param   sortNumber  integer the sort number of a parent (only used when recursive)
       * @return  object              list of allowed elements, with their sort-number as value
       */
      getAllowedElementsSorting: function getAllowedElementsSorting(sortNumber) {
        var namesWithSorting = {};
        var allowedElements = this.getAllowedElements();
        Object.keys(allowedElements).forEach(function (name) {
          var item = allowedElements[name];
          var mySortNumber = 'x'; // for a group, sortNumber is always the same

          if (sortNumber !== undefined) {
            mySortNumber = sortNumber + '.' + mySortNumber;
          }

          if (item.getType() === 'element') {
            namesWithSorting[item.getName()] = mySortNumber;
          } else {
            // go recursive
            var subSortedElements = item.getAllowedElementsSorting(mySortNumber);
            Object.assign(namesWithSorting, subSortedElements);
          }
        }, this);
        return namesWithSorting;
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

        var regexString = '('; // collect the regex for each and every grouping we might have;
        // 'each and every' means 'the only ONE'

        this._subGroupings.forEach(function (grouping) {
          regexString = '(';

          if (nocapture) {
            regexString += '?:';
          }

          regexString += grouping.getRegex(separator, nocapture) + ')';
        }); // append bounds to regex


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
        // we are a group. we have no saying of ourselves
        // (@FIXME: by definition we do, but we do not take that into account)
        return this._subGroupings[0].getBoundsForElementName(childName);
      }
    }
  });
  cv.ui.manager.model.schema.Group.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Group.js.map?dt=1648068862846