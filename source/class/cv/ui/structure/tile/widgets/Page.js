/**
 * Creates a new sub page and adds a corresponding link to the current page.
 *
 * @ignore(InstallTrigger)
 * @author Tobias Bräutigam
 * @since 2021
 */
qx.Class.define('cv.ui.structure.tile.widgets.Page', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    visibility: {
      refine: true,
      init: 'excluded'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _supportsContentVisibility: null,

    _init() {
      if (typeof InstallTrigger !== 'undefined') {
        // firefox does not support content-visibility CSS property
        // see: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
        this._element.classList.add('no-content-visibility');
        this._supportsContentVisibility = false;
      } else {
        this._supportsContentVisibility = true;
      }
    },

    _applyVisibility(value) {
      switch (value) {
        case 'visible':
          if (this._supportsContentVisibility) {
            this._element.style.contentVisibility = 'visible';
          } else if (this._visibleDisplayMode) {
            this._element.style.display = this._visibleDisplayMode || 'initial';
          }
          break;

        case 'hidden':
        case 'excluded':
          if (this._supportsContentVisibility) {
            this._element.style.contentVisibility = 'hidden';
          } else {
            this._visibleDisplayMode = getComputedStyle(this._element).getPropertyValue('display');
            this._element.style.display = 'none';
          }
          break;
      }
    }
  },

  defer: function(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'page', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'row', class extends HTMLElement {
      constructor() {
        super();
        if (this.hasAttribute('colspan')) {
          this.classList.add('colspan-' + this.getAttribute('colspan'));
        }
        if (this.hasAttribute('rowspan')) {
          this.classList.add('rowspan-' + this.getAttribute('rowspan'));
        }
      }
    });
  }
});
