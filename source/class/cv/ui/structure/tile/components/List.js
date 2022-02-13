/**
 * Generates a list of elements based on the content and a model.
 * There are predefined visual-models that to no need a template for the list elements.
 * Currently implemented visual-models are:
 * - pages: a list of all <cv-page> elements, can be used to render a navbar
 *
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
      const model = element.getAttribute('visual-model');
      if (!model) {
        this.error('no model defined, list will be empty');
        return;
      }
      if (model === 'pages') {
        const currentPage = window.location.hash.substring(1);
        let parentElement = document.querySelector('main');
        if (parentElement) {
          const firstPage = document.querySelector('cv-page');
          if (firstPage) {
            parentElement = firstPage.parentElement;
          }
        }
        const rootList = document.createElement('ul');
        this.__generatePagesModel(rootList, parentElement, currentPage);
        target.replaceChild(rootList, element);

        // add hamburger menu
        const ham = document.createElement('a');
        ham.href = '#';
        ham.classList.add('menu');
        ham.onclick = () => this._onHamburgerMenu();
        const icon = document.createElement('i');
        icon.classList.add('ri-menu-line');
        ham.appendChild(icon);
        target.appendChild(ham);

        qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
        // add some general listeners to close
        qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
      } else {
        this.error('visual-model of type', model, 'is not implemented');
      }
    },

    _onHamburgerMenu() {
      console.log('hamburger');
      this._target.classList.toggle('responsive');
      for (let detail of this._target.querySelectorAll('details')) {
        detail.setAttribute('open', '');
      }
    },

    /**
     * @param ev {qx.event.type.Event}
     * @private
     */
    _onPointerDown(ev) {
      const target = ev.getTarget();
      if (target.classList.contains('menu') || target.parentElement.classList.contains('menu')) {
        // clicked in hamburger menu, do nothing
      } else if (target.tagName.toLowerCase() !== 'summary') {
        // defer closing because it would prevent the link clicks and page selection
        qx.event.Timer.once(this._closeAll, this, 100);
      } else {
        // close others
        this._closeAll(ev.getTarget().parentElement);
      }
    },

    /**
     * Close all open sub-menus
     * @param except {Element?} do not close this one
     * @private
     */
    _closeAll(except) {
      if (this._target.classList.contains('responsive')) {
        this._target.classList.remove('responsive');
      } else {
        for (let detail of this._target.querySelectorAll('details[open]')) {
          if (!except || detail !== except) {
            detail.removeAttribute('open');
          }
        }
      }
    },


    __generatePagesModel(parentList, parentElement, currentPage) {
      if (!parentElement) {
        return;
      }
      let pages = parentElement.querySelectorAll(':scope > cv-page');
      for (let page of pages.values()) {
        const pageId = page.getAttribute('id');
        if (!pageId) {
          this.error('page has no id, skipping');
          continue;
        }
        const pageName = page.getAttribute('name') || '';
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', '#' + pageId);
        a.textContent = pageName;
        if (currentPage === pageId) {
          li.classList.add('active');
        }
        parentList.appendChild(li);
        if (page.querySelectorAll(':scope > cv-page').length > 0) {
          const details = document.createElement('details');
          const summary = document.createElement('summary');
          summary.appendChild(a);
          details.appendChild(summary);
          const subList = document.createElement('ul');
          details.appendChild(subList);
          this.__generatePagesModel(subList, page, currentPage);
          li.appendChild(details);
        } else {
          li.appendChild(a);
        }
      }
    },

    _onPageChange(ev) {
      const pageElement = ev.getData();
      // unset all currently active
      for (let link of this._target.querySelectorAll('li.active, li.sub-active')) {
        link.classList.remove('active');
        link.classList.remove('sub-active');
      }
      // find link to current page
      for (let link of this._target.querySelectorAll(`a[href="#${pageElement.id}"]`)) {
        // activate all parents
        let parent = link.parentElement;
        let activeName = 'active';
        while (parent && parent.tagName.toLowerCase() !== 'nav') {
          if (parent.tagName.toLowerCase() === 'li') {
            parent.classList.add(activeName);
            // all other parents have a sub-menu active
            activeName = 'sub-active';
          }
          parent = parent.parentElement;
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
    qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
