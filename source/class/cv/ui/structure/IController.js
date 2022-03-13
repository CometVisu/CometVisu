/**
 * Interface for structure controllers.
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Interface.define('cv.ui.structure.IController', {

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    /**
     * The target this structure should be inserted into as CSS selector string
     */
    renderTarget: {
      check: 'String'
    },

    /**
     * Namespace for path ids
     */
    namespace: {
      check: 'String'
    }
  },

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
     * Extract backend specific settings from the config
     * @param xml {XMLDocument} loaded config
     */
    parseBackendSettings(xml) {
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
     * @param backendName {string} name of the backend
     * @return {Array<string>} list of addresses
     */
    getInitialAddresses(backendName) {
    },

    /**
     * Returns the widget id of the page item initially loaded
     * @returns {String} widget path like 'id_'...
     */
    async getInitialPageId() {
    },

    /**
     * Check this structure for feature support
     * @param feature {String} name of the feature ti check, e.g. 'navbar'
     * @param subfeature {String?} optional name of a sub feature to check
     */
    supports(feature, subfeature) {
    },

    /**
     * handle browser history events that are used to navigate inside the visu
     * @param anchor {String}
     */
    onHistoryRequest(anchor) {
    }
  }
});
