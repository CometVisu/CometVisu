/**
 * any content.
 */
qx.Class.define("cv.ui.manager.model.schema.Any", {
  extend: cv.ui.manager.model.schema.Base,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (node, schema) {
    this.base(arguments, node, schema);
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
      init: "any"
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
    parse: function () {
      this.base(arguments);
      const schema = this.getSchema();

      let group = this.getNode();
      if (group.hasAttribute("ref")) {
        // if this is a reference, unravel it.
        group = schema.getReferencedNode("group", group.getAttribute("ref"));
      }
      // we are allowed choice and sequence, but only ONE AT ALL is allowed
      group.querySelectorAll(":scope > choice").forEach(grouping => {
        this._subGroupings.push(new cv.ui.manager.model.schema.Choice(grouping, schema));
      });

      // sequences
      group.querySelectorAll(":scope > sequence").forEach(grouping => {
        this._subGroupings.push(new cv.ui.manager.model.schema.Sequence(grouping, schema));
      });

      // there may be only one, so we simply us the first we found
      if (this._subGroupings.length > 0) {
        this._subGroupings = [this._subGroupings[0]];
      }
    },

    // overridden
    isElementAllowed: function (element) {
      return true;
    },

    // overridden
    getSchemaElementForElementName: function (elementName) {
      // can not find any reason why elementName is allowed with us...
      return undefined;
    },

    // overridden
    getRequiredElements: function () {
      return [];
    },

    // overridden
    getAllowedElements: function() {
      return {};
    },

    getRegex: function (separator, nocapture) {
      return ".*";
    },

    hasMultiLevelBounds: function () {
      return true;
    },

    getBoundsForElementName: function (childName) {
      return this._bounds;
    }
  }
});
