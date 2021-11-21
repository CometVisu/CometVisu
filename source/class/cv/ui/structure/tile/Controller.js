/**
 * @asset(structures/tile/*)
 */
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
    STATICS
  ***********************************************
  */
  statics: {
    // prefix for all custom components uses/provided by this structure
    PREFIX: 'tl-',
    __MAP: {},
    __I: {},
    register(webComponentName, qxClass) {
      this.__MAP[webComponentName] = qxClass;
    },

    onComponentCreated(element) {
      const name = element.tagName.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        const QxClass = this.__MAP[name];
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          this.__I[name] = [];
        }
        this.__I[name].push(new QxClass(element));
      } else {
        qx.log.Logger.error('no QxClass registered for custom element ' + name);
      }
    }
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
    parseSettings(config) {
      const settings = cv.Config.configSettings;
      const configElement = config.documentElement;
      settings.bindClickToWidget = configElement.getAttribute('bind_click_to_widget') === 'true';

      if (!cv.Config.cacheUsed) {
        const templates = qx.util.ResourceManager.getInstance().toUri('structures/tile/templates.xml');
        const ajaxRequest = new qx.io.request.Xhr(templates);
        ajaxRequest.set({
          accept: 'application/xml',
          cache: !cv.Config.forceReload
        });
        ajaxRequest.addListenerOnce('success', e => {
          const content = e.getTarget().getResponse();
          const target = this.getRenderTarget();
          this.debug('creating pages');
          // for some reason this is the only way the the web components are initialized correctly
          target.innerHTML = content.documentElement.innerHTML + configElement.innerHTML;
          this.debug('finalizing');
          qx.event.message.Bus.dispatchByName('setup.dom.append');
          this.debug('pages created');
        });
        ajaxRequest.addListener('statusError', function (e) {
          const status = e.getTarget().getTransport().status;
          if (!qx.util.Request.isSuccessful(status)) {
            this.error('filenotfound', templates);
          }
        }, this);

        ajaxRequest.send();
      }
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
    // register globally
    window.CVComponentRegistry = statics;

    customElements.define(statics.PREFIX + 'switch',
      class extends HTMLElement {
        constructor() {
          super();
          let template = document.getElementById('switch');
          if (template) {
            const content = template.content.cloneNode(true);
            // move slots into template
            for (let slot of content.querySelectorAll('slot')) {
              const slotName = slot.getAttribute('name');
              const slotContent = this.querySelector(`[slot='${slotName}']`);
              if (slotContent) {
                slot.parentNode.replaceChild(slotContent, slot);
              } else {
                const parentNode = slot.parentNode;
                slot.remove();
                if (parentNode.children.length === 0) {
                  // also remove slots parent when it hat no content
                  parentNode.remove();
                }
              }
            }
            this.appendChild(content);
          }
        }
      }
    );
  }
});
