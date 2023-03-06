/**
 * Wrapper for plugins
 */
qx.Class.define('cv.ui.structure.tile.components.Plugin', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
   PL_COUNTER: 0
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __widget: null,

    async _init() {
      super._init();
      // load plugin
      let name = '';
      if (this._element.hasAttribute('name')) {
        name = this._element.getAttribute('name');
      } else {
        name = this._element.firstElementChild.nodeName.toLowerCase();
      }
      if (name) {
        const pluginName = 'plugin-' + name;
        const part = await this.loadPluginPart(pluginName);
        if (part) {
          // find the main class file in the package
          let Clazz = null;
          for (let baseName in cv.plugins) {
            if (baseName.toLowerCase() === name) {
              Clazz = cv.plugins[baseName];
              break;
            }
          }
          if (Clazz) {
            cv.ui.structure.tile.components.Plugin.PL_COUNTER++;
            const id = 'id_9_' + cv.ui.structure.tile.components.Plugin.PL_COUNTER;
            // must be converted to real XML document, otherwise attributes cannot be accessed
            const parser = new DOMParser();
            const doc = parser.parseFromString(this._element.innerHTML, 'application/xml');
            const props = Clazz.parse(doc.firstElementChild, id, '', 'text');
            cv.TemplateEngine.getInstance().setDomFinished(false);
            this.__widget = new Clazz(props);
            this._element.innerHTML = `<div class="widget_container" id="${id}" data-type="${props.$$type}">${this.__widget.getDomString()}</div>`;
            const scriptLoader = cv.util.ScriptLoader.getInstance();
            window.requestAnimationFrame(() => {
              if (!scriptLoader.isFinished()) {
                // wait until plugin dependencies have been loaded
                scriptLoader.addListenerOnce('finished', () => {
                  cv.TemplateEngine.getInstance().setDomFinished(true);
                });
              } else {
                cv.TemplateEngine.getInstance().setDomFinished(true);
              }
            });
          } else {
            this.error('no main plugin class found for ' + pluginName);
          }
        }
      } else {
        this.error('no plugin name provided!');
      }
    },

    async loadPluginPart(pluginName) {
      const part = qx.Part.getInstance().getParts()[pluginName];
      if (part) {
        return new Promise(resolve => {
          part.load(() => resolve(part), this);
        });
      }
      this.error('plugin', pluginName, 'does not exist');
      return Promise.resolve(null);
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'plugin',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
