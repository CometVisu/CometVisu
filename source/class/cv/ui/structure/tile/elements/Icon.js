/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.Icon', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    KNX_UF_SPRITE: null,

    async load() {
      if (!cv.ui.structure.tile.elements.Icon.KNX_UF_SPRITE) {
        return new Promise((resolve, reject) => {
          const xhr = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg'));
          xhr.set({
            method: 'GET',
            accept: 'text/xml'
          });
          xhr.addListenerOnce('success', function (e) {
            const req = e.getTarget();
            const svg = req.getResponse();
            svg.documentElement.classList.add('defs-only');
            document.body.appendChild(svg.documentElement);
            cv.ui.structure.tile.elements.Icon.KNX_UF_SPRITE = svg;
            resolve(true);
          }, this);
          xhr.addListenerOnce('error', reject);
          xhr.send();
        });

/*        const sprite = document.createElement('object');
        sprite.setAttribute('type', 'image/svg+xml');
        sprite.setAttribute('width', '0');
        sprite.setAttribute('height', '0');
        sprite.setAttribute('data', qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg'));
        document.body.appendChild(sprite);
        cv.ui.structure.tile.elements.Icon.KNX_UF_SPRITE = sprite;*/
/*        const link = document.createElement('link');
        link.setAttribute('rel', 'prefetch');
        link.setAttribute('as', 'image');
        link.setAttribute('type', 'image/svg+xml');
        link.setAttribute('href', qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg'));
        document.head.appendChild(link);
        cv.ui.structure.tile.elements.Icon.KNX_UF_SPRITE = link;*/
      } else {
        return Promise.resolve(true);
      }
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    id: {
      check: 'String',
      nullable: true,
      apply: '_applyId'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __initialized: false,

    _init() {
      const element = this._element;
      if (element.textContent.trim()) {
        this.__initialized = true;
        this.setId(element.textContent.trim());
      } else {
        const it = element.classList.values();
        for (let name of it) {
          if (name.startsWith('ri-') || name.startsWith('knxuf_')) {
            this.setId(name);
            break;
          }
        }
      }
      this.__initialized = true;
    },

    async _applyId(value, oldValue) {
      const element = this._element;
      if (this.__initialized) {
        if (oldValue) {
          element.classList.remove(oldValue);
        }
        if (value) {
          // default is an icon font that uses CSS classes
          element.classList.add(value);
          if (element.textContent) {
            element.textContent = '';
          }
        }
      }
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'icon', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
