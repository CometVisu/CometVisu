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
    PREFIX: 'cv-',
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
    __mappings: null,
    __stylings: null,

    getHtmlStructure() {
      return this.__HTML_STRUCT;
    },

    supports(feature, subfeature) {
      return false;
    },

    initLayout() {
    },

    /**
     * Parses structure specific settings
     * @param config {XMLDocument} loaded config
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
          // register custom elements for templates in this document
          this.registerTemplates(content);
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
     * Reisters customElements for all templates in the given xml that are direct children of a <templates structure="tile"> element
     * @param xml {XMLDocument}
     */
    registerTemplates(xml) {
      xml.querySelectorAll('templates[structure=\'tile\'] > template').forEach(template => {
        customElements.define(cv.ui.structure.tile.Controller.PREFIX + template.getAttribute('id'), class extends TemplatedElement {
          constructor() {
            super(template.getAttribute('id'));
          }
        });
      });
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
    },

    /**
     *
     * @param name {String} mapping name
     * @param mapping {cv.ui.structure.tile.elements.Mapping}
     */
    addMapping(name, mapping) {
      if (!this.__mappings) {
        this.__mappings = {};
      }
      this.__mappings[name] = mapping;
    },

    removeMapping(name) {
      if (this.__mappings) {
        delete this.__mappings[name];
      }
    },

    mapValue(mappingName, value) {
      if (this.__mappings && Object.prototype.hasOwnProperty.call(this.__mappings, mappingName)) {
        return this.__mappings[mappingName].mapValue(value);
      }
      return value;
    },

    /**
     * @param name {String} styling name
     * @param styling {cv.ui.structure.tile.elements.Styling}
     */
    addStyling(name, styling) {
      if (!this.__stylings) {
        this.__stylings = {};
      }
      this.__stylings[name] = styling;
    },

    removeStyling(name) {
      if (this.__stylings) {
        delete this.__stylings[name];
      }
    },

    styleValue(stylingName, value) {
      if (this.__stylings && Object.prototype.hasOwnProperty.call(this.__stylings, stylingName)) {
        return this.__stylings[stylingName].mapValue(value);
      }
      return value;
    }
  },
  defer: function (statics) {
    if (!window.cvTestMode) {
      // do not apply ourselves automatically in test mode
      cv.Application.structureController = statics.getInstance();
    }
  }
});

class TemplatedElement extends HTMLElement {
  constructor(templateId) {
    super();
    let template = document.getElementById(templateId);
    if (template) {
      const content = template.content.cloneNode(true);
      // move slots into template
      for (let slot of content.querySelectorAll('slot')) {
        const slotName = slot.getAttribute('name');
        const slotContent = this.querySelector(`[slot='${slotName}']`);
        if (slotContent) {
          slot.parentNode.replaceChild(slotContent, slot);
        } else {
          // eslint-disable-next-line no-console
          console.log('['+templateId+']no content for slot', slotName, ' removing');
          const parentNode = slot.parentNode;
          slot.remove();
          if (parentNode.children.length === 0) {
            // also remove slots parent when it hat no content
            parentNode.remove();
          }
        }
      }
      // transfer attribute slots
      const attributes = this.getAttributeNames();
      attributes.forEach(name => {
        const value = this.getAttribute(name);
        const targets = content.querySelectorAll('[slot-'+name+']');
        targets.forEach(target => {
          target.removeAttribute('slot-'+name);
          target.setAttribute(name, value);
        });
        if (targets.length > 0) {
          this.removeAttribute(name);
        }
      });
      this.appendChild(content);
    }
  }
}
