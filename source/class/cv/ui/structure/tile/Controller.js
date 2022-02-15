/**
 * Controller for the 'tile' structure.
 *
 * This structure is based on web-components and does not need a parser to work.
 * The config file is directly attached to the document body.
 * The widgets in this structure register a customElement and the browser automatically creates instances
 * of this widgets once the customElement is added to the body.
 *
 * The basic structure is a set of pages that contain a list of tiles.
 * Each tile contains a grid of 3 rows and 3 columns. The components can be added to a cell of that grid
 * but also can spread over more then one cell by using row-/column spanning.
 *
 * This structure provides some tiles with a pre-defined content, e.g. a <cv-switch> which
 * contains of a button in the middle of the tile and a primary- and secondary label in the third row.
 *
 * Those pre-defined tiles are provided by a <template> (@see https://developer.mozilla.org/de/docs/Web/HTML/Element/template}
 * User are able to define own templates for re-usable tiles if they need one that this structure does not provide.
 *
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
    qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/tile-globals.scss').replace('.scss', '.css') + (cv.Config.forceReload === true ? '?'+Date.now() : ''));
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

    __gotoStartPage() {
      // open first page
      if (!document.location.hash) {
        this.scrollToPage(this.getInitialPageId());
      } else {
        this.scrollToPage(document.location.hash.substring(1));
      }
    },

    onHistoryRequest(anchor) {
      if (anchor) {
        this.scrollToPage(anchor);
      }
    },

    scrollToPage(pageId, skipHistory) {
      if (!pageId) {
        return;
      }
      const page = document.querySelector('#' + pageId);
      if (page) {
        if (!page.classList.contains('active')) {
          for (let oldPage of document.querySelectorAll('cv-page.active')) {
            oldPage.classList.remove('active');
          }
          page.classList.add('active');
          if (skipHistory === undefined) {
            const headline = page.getAttribute('name');
            let pageTitle = 'CometVisu';
            if (headline) {
              pageTitle = headline + ' - '+pageTitle;
            }
            qx.bom.History.getInstance().addToHistory(pageId, pageTitle);
          }
          qx.event.message.Bus.dispatchByName('cv.ui.structure.tile.currentPage', page);
        }
      } else {
        this.warn('no page with id', pageId, 'found');
      }
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
          let content = e.getTarget().getResponse();
          const target = this.getRenderTarget();
          this.debug('creating pages');
          // register custom elements for templates in this document
          this.registerTemplates(content);
          let child;
          // we need the documents to be in HTML namespace
          if (!content.documentElement.xmlns) {
            let text = e.getTarget().getResponseText();
            text = text.replace('<templates', '<templates xmlns="http://www.w3.org/1999/xhtml"');
            const parser = new DOMParser();
            content = parser.parseFromString(text, 'text/xml');
          }
          while ((child = content.documentElement.firstElementChild)) {
            target.appendChild(child);
          }

          while ((child = configElement.firstElementChild)) {
            target.appendChild(child);
          }
          this.debug('finalizing');
          qx.event.message.Bus.dispatchByName('setup.dom.append');
          this.debug('pages created');
          this.__gotoStartPage();
          this.debug('setup.dom.finished');
          qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
          cv.TemplateEngine.getInstance().setDomFinished(true);
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
    },

    /**
     * Handle fired event from screensaver
     * @return {Array<string>} Array with addresses
     */
    doScreenSave() {
      if (cv.Config.configSettings.screensave_page) {
        this.scrollToPage(cv.Config.configSettings.screensave_page);
      }
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
    getInitialPageId() {
      const firstPage = document.querySelector('cv-page');
      return firstPage ? firstPage.id : '';
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

    mapValue(mappingName, value, store) {
      if (this.__mappings && Object.prototype.hasOwnProperty.call(this.__mappings, mappingName)) {
        return this.__mappings[mappingName].mapValue(value, store);
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

    styleValue(stylingName, value, store) {
      if (this.__stylings && Object.prototype.hasOwnProperty.call(this.__stylings, stylingName)) {
        return this.__stylings[stylingName].mapValue(value, store);
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
        const slotContents = this.querySelectorAll(`[slot='${slotName}']`);
        const attrs = {};
        for (let i = 0, l = slot.attributes.length; i < l; i++) {
          if (slot.attributes[i].name !== 'name') {
            attrs[slot.attributes[i].name] = slot.attributes[i].value;
          }
        }
        if (slotContents.length > 0) {
          Array.from(slotContents).forEach(slotContent => {
            const newNode = slotContent.cloneNode(true);
            Object.keys(attrs).forEach(attrName => {
              if (newNode.hasAttribute(attrName)) {
                if (attrName === 'class') {
                  // append it
                  newNode.classList.add(attrs[attrName]);
                } else {
                  // eslint-disable-next-line no-console
                  console.log('attribute', attrName, 'already set, skipping');
                }
              } else {
                newNode.setAttribute(attrName, attrs[attrName]);
              }
            });
            slot.parentNode.insertBefore(newNode, slot);
          });
          slot.remove();
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
        let targetName = name;
        // allow names like percent-mapping that should also be mapped to a certain elements 'mapping' attribute
        if (name.endsWith('-mapping')) {
          targetName = 'mapping';
        } else if (name.endsWith('-styling')) {
          targetName = 'styling';
        }
        targets.forEach(target => {
          target.removeAttribute('slot-'+name);
          target.setAttribute(targetName, value);
        });
        if (targets.length > 0) {
          this.removeAttribute(name);
        }
      });
      // clear content
      this.innerHTML = '';
      this.appendChild(content);
    }
  }
}
