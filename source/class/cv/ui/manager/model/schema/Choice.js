/* Choice.js
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
 * a single choice.
 * may be recursive
 */
qx.Class.define("cv.ui.manager.model.schema.Choice", {
  extend: cv.ui.manager.model.schema.Base,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(node, schema) {
    super(node, schema);
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
      init: "choice",
    },
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
    parse() {
      super.parse();
      const node = this.getNode();
      const schema = this.getSchema();
      const subElements = Array.from(node.querySelectorAll(":scope > element"));
      subElements.forEach((elem) => {
        const subElement = new cv.ui.manager.model.schema.Element(elem, schema);
        subElement.setSortable(true);
        this._allowedElements[subElement.getName()] = subElement;
      });
      this._allowedElements["#comment"] =
        this.getSchema().getCommentNodeSchemaElement();

      // choices
      Array.from(node.querySelectorAll(":scope > choice")).forEach(
        (grouping) => {
          this._subGroupings.push(
            new cv.ui.manager.model.schema.Choice(grouping, schema)
          );
        }
      );

      // sequences
      Array.from(node.querySelectorAll(":scope > sequence")).forEach(
        (grouping) => {
          this._subGroupings.push(
            new cv.ui.manager.model.schema.Sequence(grouping, schema)
          );
        }
      );

      // groups
      Array.from(node.querySelectorAll(":scope > group")).forEach(
        (grouping) => {
          this._subGroupings.push(
            new cv.ui.manager.model.schema.Group(grouping, schema)
          );
        }
      );
    },

    // overridden
    getRequiredElements() {
      // a choice has no defined required elements
      // if you want required elements, use sequence or all
      return [];
    },

    /**
     * get a regex (string) describing this choice
     *
     * @param   separator   string  the string used to separate different elements, e.g. ';'
     * @param   nocapture   bool    when set to true non capturing groups are used
     * @return  string  regex
     */
    getRegex(separator, nocapture) {
      if (this._regexCache !== null) {
        // use the cache if primed
        return this._regexCache;
      }

      let regexString = "(";

      // create list of allowed elements
      if (nocapture) {
        regexString += "?:";
      }

      const elementRegexes = [];
      for (const element of Object.values(this._allowedElements)) {
        elementRegexes.push(element.getRegex(separator, nocapture));
      }

      // also collect the regex for each and every grouping we might have
      this._subGroupings.forEach((grouping) => {
        elementRegexes.push(grouping.getRegex(separator, nocapture));
      });

      regexString += elementRegexes.join("|");

      regexString += ")";

      // append bounds to regex
      regexString += "{";
      const bounds = this.getBounds();
      regexString += bounds.min === undefined ? 1 : bounds.min;
      regexString += ",";
      if (bounds.max !== Number.POSITIVE_INFINITY) {
        regexString += bounds.max === undefined ? 1 : bounds.max;
      }
      regexString += "}";

      // fill the cache
      this._regexCache = regexString;

      // thats about it.
      return regexString;
    },

    getBoundsForElementName(childName) {
      // as we are a choice, we can define the number of occurences for children of ANY level
      if (this.isElementAllowed(childName) === true) {
        return this.getBounds();
      }

      return undefined;
    },

    /**
     * get the sorting of the allowed elements.
     * For a choice, all elements have the same sorting, so they will all have the
     * same sortnumber
     *
     * Warning: this only works if any element can have only ONE position in the parent.
     *
     * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
     * @return  object              list of allowed elements, with their sort-number as value
     */
    getAllowedElementsSorting(sortnumber) {
      const namesWithSorting = {};

      // all elements allowed directly
      Object.keys(this._allowedElements).forEach(function (name) {
        const item = this._allowedElements[name];
        let mySortnumber = "x"; // for a choice, sortnumber is always the same
        if (sortnumber !== undefined) {
          mySortnumber = sortnumber + "." + mySortnumber;
        }

        if (item.getType() === "element") {
          namesWithSorting[item.getName()] = mySortnumber;
        } else {
          // go recursive
          const subSortedElements =
            item.getAllowedElementsSorting(mySortnumber);
          Object.assign(namesWithSorting, subSortedElements);
        }
      }, this);

      // all elements allowed by subGroupings
      this._subGroupings.forEach(function (item, i) {
        let mySortnumber = "x"; // for a choice, sortnumber is always the same
        if (sortnumber !== undefined) {
          mySortnumber = sortnumber + "." + mySortnumber;
        }

        if (item.getType() === "element") {
          namesWithSorting[item.getName()] = mySortnumber;
        } else {
          // go recursive
          const subSortedElements =
            item.getAllowedElementsSorting(mySortnumber);
          Object.assign(namesWithSorting, subSortedElements);
        }
      }, this);
      return namesWithSorting;
    },
  },
});
