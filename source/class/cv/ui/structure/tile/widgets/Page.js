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
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _init() {
      if (typeof InstallTrigger !== 'undefined') {
        // firefox does not support content-visibility CSS property
        // see: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
        this._element.classList.add('no-content-visibility');
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
