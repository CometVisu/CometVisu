/**
 * a single choice.
 * may be recursive
 */
qx.Class.define('cv.ui.manager.model.schema.Choice', {
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
    parse: function () {
      this.base(arguments);
      const node = this.getNode();
      const schema = this.getSchema();
      const subElements = node.querySelector('> xsd\\:element');
      subElements.forEach((elem) => {
        const subElement = new cv.ui.manager.model.schema.Element(elem, schema);
        subElement.setIsSortable(true);
        this._allowedElements[subElement.getName()] = subElement;
      });

      // choices
      node.querySelector('> xsd\\:choice').forEach((grouping) => {
        this._subGroupings.push(new cv.ui.manager.model.schema.Choice(grouping, schema));
      });

      // sequences
      node.querySelector('> xsd\\:sequence').forEach((grouping) => {
        this._subGroupings.push(new cv.ui.manager.model.schema.Sequence(grouping, schema));
      });

      // groups
      node.querySelector('> xsd\\:group').forEach((grouping) => {
        this._subGroupings.push(new cv.ui.manager.model.schema.Group(grouping, schema));
      });
    },

    // overridden
    getRequiredElements: function () {
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
    getRegex: function (separator, nocapture) {
      if (this._regexCache !== null) {
        // use the cache if primed
        return this._regexCache;
      }

      let regexString = '(';

      // create list of allowed elements
      if (nocapture) {
        regexString += '?:';
      }

      const elementRegexes = [];
      for (const element of Object.values(this._allowedElements)) {
        elementRegexes.push(element.getRegex(separator, nocapture));
      }

      // also collect the regex for each and every grouping we might have
      this._subGroupings.forEach(grouping => {
        elementRegexes.push(grouping.getRegex(separator, nocapture));
      });

      regexString += elementRegexes.join('|');

      regexString += ')';


      // append bounds to regex
      regexString += '{';
      const bounds = this.getBounds();
      if (bounds.min !== 'unbounded') {
        regexString += bounds.min === undefined ? 1 : bounds.min;
      }
      regexString += ',';
      if (bounds.max !== 'unbounded') {
        regexString += bounds.max === undefined ? 1 : bounds.max;
      }
      regexString += '}';

      // fill the cache
      this._regexCache = regexString;

      // thats about it.
      return regexString;
    },

    getBoundsForElementName: function (childName) {
      // as we are a choice, we can define the number of occurences for children of ANY level
      if (true === this.isElementAllowed(childName)) {
        return this.getBounds();
      }

      return undefined;
    }
  }
});
