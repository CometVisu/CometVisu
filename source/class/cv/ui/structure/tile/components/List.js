/**
 * Generates a list of elements based on the content and a model.
 * Currently implemented models are:
 * - pages: a list of all <cv-page> elements, can be used to render a navbar
 *
 * The pages model requires the content to have a <a> element as first child that uses anchor links. It modifies
 * this elements classList to add the "active" class when the corresponding page is currently visible.
 *
 * Example:
 * <a href="#${id}">${text}</a>
 */
qx.Class.define('cv.ui.structure.tile.components.List', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _target: null,

    _init() {
      const element = this._element;
      const target = this._target = element.parentElement;
      const content = element.innerHTML.trim();
      if (!content) {
        this.error('no template defined, cannot create list');
        return;
      }
      element.innerHTML = '';
      const model = element.getAttribute('model');
      if (!model) {
        this.error('no model defined, list will be empty');
        return;
      }
      if (model === 'pages') {
        const currentPage = window.location.hash.substring(1);
        const pages = document.querySelectorAll('cv-page');
        const textAttribute = element.hasAttribute('text-attribute') ? element.getAttribute('text-attribute') : 'name';
        const idAttribute = element.hasAttribute('id-attribute') ? element.getAttribute('id-attribute') : 'id';
        const tmp = document.createElement('template');
        for (let page of pages.values()) {
          const pageId = page.getAttribute(idAttribute);
          if (!pageId) {
            this.error('page has no id, skipping');
            continue;
          }
          const pageName = page.getAttribute(textAttribute) || '';
          // eslint-disable-next-line no-template-curly-in-string
          tmp.innerHTML = content.replaceAll('${id}', pageId).replaceAll('${text}', pageName);
          const listItem = document.importNode(tmp.content, true);
          if (currentPage === pageId) {
            listItem.firstElementChild.classList.add('active');
          }
          target.insertBefore(listItem, element);
        }
        qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
        // remove ourselves
        target.removeChild(element);
      } else {
        this.error('model of type', model, 'is not implemented');
      }
    },

    _onPageChange(ev) {
      const pageElement = ev.getData();
      // unset all currently active
      for (let link of this._target.querySelectorAll(':scope > .active')) {
        link.classList.remove('active');
      }
      // activate link to current page
      for (let link of this._target.querySelectorAll(`:scope > [href="#${pageElement.id}"]`)) {
        link.classList.add('active');
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.message.Bus.unbscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
