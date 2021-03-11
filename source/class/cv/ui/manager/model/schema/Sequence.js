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
      const schema = this.getSchema();

      // for a sequence, we need to keep the order of the elements
      // so we have to use a 'mixed' approach in reading them
      const subNodes = Array.from(this.getNode().children);

      subNodes.forEach((subNode) => {
        let subObject = undefined;

        switch (subNode.nodeName) {
          case 'xsd:element':
          case 'element':
            subObject = new cv.ui.manager.model.schema.Element(subNode, schema);
            // sequences' children are non-sortable
            subObject.setSortable(false);
            this._allowedElements[subObject.getName()] = subObject;
            break;
          case 'xsd:choice':
          case 'choice':
            subObject = new cv.ui.manager.model.schema.Choice(subNode, schema)
            this._subGroupings.push(subObject);
            break;
          case 'xsd:sequence':
          case 'sequence':
            subObject = new cv.ui.manager.model.schema.Sequence(subNode, schema)
            this._subGroupings.push(subObject);
            break;
          case 'xsd:group':
          case 'group':
            subObject = new cv.ui.manager.model.schema.Group(subNode, schema)
            this._subGroupings.push(subObject);
            break;
          case 'xsd:any':
          case 'any':
            subObject = new cv.ui.manager.model.schema.Any(subNode, schema)
            this._subGroupings.push(subObject);
            break;
        }

        this._sortedContent.push(subObject);
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

      // this goes over ALL elements AND sub-groupings
      this._sortedContent.forEach((element) => {
        elementRegexes.push(element.getRegex(separator, nocapture));
      });

      regexString += elementRegexes.join('');

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
      // we are a sequence-element; there is actually a lot of sayings ...
      if (typeof this._allowedElements[childName] !== 'undefined') {
        const elementBounds = this._allowedElements[childName].getBounds();
        const sequenceBounds = this.getBounds();

        const resultBounds = {
          min: 1,
          max: 1
        };

        if (elementBounds.min === 'unbounded' || sequenceBounds.min === 'unbounded') {
          // unbounded is the highest possible value
          resultBounds.min = 'unbounded';
        } else {
          // if it is bounded, we must duplicate element and sequence bounds
          // (an element may appear as often as the number of sequences times the number of elements
          // in each sequence - roughly)
          if (elementBounds.min !== 'undefined') {
            resultBounds.min = elementBounds.min;
          }

          if (sequenceBounds.min !== 'undefined') {
            resultBounds.min = resultBounds.min * sequenceBounds.min;
          }
        }

        if (elementBounds.max === 'unbounded' || sequenceBounds.max === 'unbounded') {
          resultBounds.max = 'unbounded';
        } else {
          if (elementBounds.max !== 'undefined') {
            resultBounds.max = elementBounds.max;
          }

          if (sequenceBounds.max !== 'undefined') {
            resultBounds.max = resultBounds.max * sequenceBounds.max;
          }
        }

        return resultBounds;
      }

      let childBounds = undefined;

      let tmpBounds;

      for (let i = 0; i < this._subGroupings.length; ++i) {
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
     *
     * @param   sortnumber  integer the sortnumber of a parent (only used when recursive)
     * @return  object              list of allowed elements, with their sort-number as value
     */
    getAllowedElementsSorting: function (sortNumber) {
      const namesWithSorting = {};

      this._sortedContent.forEach( (item, i) => {
        let mySortNumber = i;
        if (sortNumber !== undefined) {
          mySortNumber = sortNumber + '.' + i;
        }

        if (item.getType() === 'element') {
          namesWithSorting[item.getName()] = mySortNumber;
        } else {
          // go recursive
          const subSortedElements = item.getAllowedElementsSorting(mySortNumber);
          Object.assign(namesWithSorting, subSortedElements);
        }
      });

      return namesWithSorting;
    }
  }
});
