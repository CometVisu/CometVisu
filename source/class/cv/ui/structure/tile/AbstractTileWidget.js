/**
 *
 */
qx.Class.define('cv.ui.structure.tile.AbstractTileWidget', {
  extend: cv.ui.structure.AbstractWidget,
  type: 'abstract',

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * Generates the DOM string for this widget
     *
     * @return {Element} The widgets DOM element
     */
    getDom : function() {
      const element = document.createElement('div');
      element.classList.add('tile', ...this.getClasses().trim().split(' '));
      element.append(this._getInnerDom());
      return element;
    },

    /**
     *
     * @returns {DocumentFragment}
     * @private
     */
    _getInnerDom: function () {
      return document.createDocumentFragment();
    }
  }
});
