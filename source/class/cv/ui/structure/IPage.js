/**
 * IPage
 *
 * @author tobiasb
 * @since 2017
 */

/**
 * Interface that all structure page widgets must implement
 */
qx.Interface.define("cv.ui.structure.IPage", {

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    /**
     * The internal path to the widget
     * @type {String}
     */
    path: {},

    /**
     * The page type (text, 2d, 3d)
     * @type {String}
     */
    pageType: {},
    backdropAlign: {},
    backdropType: {}
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    /**
     * Return the widgets DOM element
     * @return {Element}
     */
    getDomElement: function() {}
  }
});