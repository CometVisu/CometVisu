qx.Class.define('cv.ui.structure.tile.Controller', {
  extend: qx.core.Object,
  type: 'singleton',
  implement: cv.ui.structure.IController,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__HTML_STRUCT = '';
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    /**
     * The target this structure should be inserted into
     */
    renderTarget: {
      check: 'Element',
      init: document.body
    },

    /**
     * Namespace for path ids
     */
    namespace: {
      check: 'String',
      init: ''
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __HTML_STRUCT: null,

    getHtmlStructure() {
      return this.__HTML_STRUCT;
    },

    parseLabel: function (label, flavour, labelClass, style) {
      return label ? label.textContent : '';
    },
    supports(feature, subfeature) {
      return false;
    },

    initLayout() {
    },

    /**
     * Parses structure specific settings
     * @param xml {XMLDocument} loaded config
     */
    parseSettings(xml) {
      const settings = cv.Config.configSettings;
      const pagesElement = xml.documentElement;
      settings.bindClickToWidget = pagesElement.getAttribute('bind_click_to_widget') === 'true';
    },

    /**
     * Pre parsing hook, do everything here that is needed before the real parsing process can start
     * @param xml {XMLDocument}
     */
    async preParse(xml) {
      return true;
    },

    /**
     * Generate the UI code from the config file
     * @param config {Object} loaded config file usually an XMLDocument but other structures might use different formats
     */
    createUI(config) {
      if (!cv.Config.cacheUsed) {
        this.debug('creating pages');
        const page = config.querySelector('pages > page'); // only one page element allowed...
        const namespace = this.getNamespace();
        this._createPages(page, (namespace ? namespace + ':' : '') + 'id');
        this.debug('finalizing');
        qx.event.message.Bus.dispatchByName('setup.dom.append');
        this.debug('pages created');
      }
      this.debug('setup.dom.finished');
      qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
      cv.TemplateEngine.getInstance().setDomFinished(true);

      this.initLayout();
    },

    _createPages: function (page, path) {
      cv.parser.pure.WidgetParser.renderTemplates(page);
      let parsedData = cv.parser.pure.WidgetParser.parse(page, path);
      if (!Array.isArray(parsedData)) {
        parsedData = [parsedData];
      }
      let i = 0;
      const l = parsedData.length;
      for (; i < l; i++) {
        const data = parsedData[i];
        const widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);

        // trigger DOM generation
        if (widget) {
          widget.getDomElement();
        }
      }
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
      return [];
    },

    /**
     * Returns the widget id of the page item initially loaded
     * @returns {String} widget path like 'id_'...
     */
    async getInitialPageId() {
      return 'id_';
    }
  },
  defer: function (statics) {
    cv.Application.structureController = statics.getInstance();
  }
});
