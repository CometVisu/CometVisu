/**
 * Interface for structure controllers.
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Interface.define('cv.ui.structure.IController', {

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * Returns the main HTML structure needed by this structure, this content will be injected to the document
     * body as innerHTML
     * @return {String} HTML code
     */
    getHtmlStructure() {
    },

    /**
     * Parses structure specific settings
     * @param xml {XMLDocument} loaded config
     */
    parseSettings(xml) {
    },

    /**
     * Pre parsing hook, do everything here that is needed before the real parsing process can start
     * @param xml {XMLDocument}
     */
    async preParse(xml) {
    },

    /**
     * Generate the UI code from the config file
     * @param config {Object} loaded config file usually an XMLDocument but other structures might use different formats
     */
    createUI(config) {
    },


    /**
     * Handle fired event from screensaver
     * @return {Array<string>} Array with addresses
     */
    doScreenSave() {
    },

    /**
     * Return the addresses needed to update all states on the initially loaded page
     */
    getInitialAddresses() {
    },

    /**
     * Parse a label from the config file
     * @param label {Element} label xml element
     * @param flavour {String?} flavour name
     * @param labelClass {Strag?} CSS class name
     * @param style {String?} additional CSS style properties
     */
    parseLabel(label, flavour, labelClass, style) {
    },

    /**
     * Check this structure for feature support
     * @param feature {String} name of the feature ti check, e.g. 'navbar'
     * @param subfeature {String?} optional name of a sub feature to check
     */
    supports(feature, subfeature) {
    },

    /**
     * Called to allow the structure to initialize its layout manager
     */
    initLayout() {}
  }
});
