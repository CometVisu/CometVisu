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
  /* Any.js
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
   * any content.
   */
  qx.Class.define('cv.ui.manager.model.schema.Any', {
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
        init: 'any'
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
        cv.ui.manager.model.schema.Any.superclass.prototype.parse.call(this);
        var schema = this.getSchema();
        var group = this.getNode();
        if (group.hasAttribute('ref')) {
          // if this is a reference, unravel it.
          group = schema.getReferencedNode('group', group.getAttribute('ref'));
        }
        // we are allowed choice and sequence, but only ONE AT ALL is allowed
        group.querySelectorAll(':scope > choice').forEach(function (grouping) {
          _this._subGroupings.push(new cv.ui.manager.model.schema.Choice(grouping, schema));
        });

        // sequences
        group.querySelectorAll(':scope > sequence').forEach(function (grouping) {
          _this._subGroupings.push(new cv.ui.manager.model.schema.Sequence(grouping, schema));
        });

        // there may be only one, so we simply us the first we found
        if (this._subGroupings.length > 0) {
          this._subGroupings = [this._subGroupings[0]];
        }
      },
      // overridden
      isElementAllowed: function isElementAllowed(element) {
        return true;
      },
      // overridden
      getSchemaElementForElementName: function getSchemaElementForElementName(elementName) {
        // can not find any reason why elementName is allowed with us...
        return undefined;
      },
      // overridden
      getRequiredElements: function getRequiredElements() {
        return [];
      },
      // overridden
      getAllowedElements: function getAllowedElements() {
        return {};
      },
      getRegex: function getRegex(separator, nocapture) {
        return '.*';
      },
      hasMultiLevelBounds: function hasMultiLevelBounds() {
        return true;
      },
      getBoundsForElementName: function getBoundsForElementName(childName) {
        return this._bounds;
      }
    }
  });
  cv.ui.manager.model.schema.Any.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Any.js.map?dt=1735222409704