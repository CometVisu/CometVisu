/**
 * Generates a menu of a model, currently only the pages model is implemented.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.components.Menu', {
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
      const model = element.getAttribute('model');
      if (!model) {
        this.error('no model defined, menu will be empty');
        return;
      }
      if (model === 'pages') {
        qx.event.message.Bus.subscribe('setup.dom.append', this._generateMenu, this);
        const rootList = document.createElement('ul');
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

    _generateMenu() {
      qx.event.message.Bus.unsubscribe('setup.dom.append', this._generateMenu, this);
      const currentPage = window.location.hash.substring(1);
      let parentElement = document.querySelector('main');
      if (parentElement) {
        const firstPage = document.querySelector('cv-page');
        if (firstPage) {
          parentElement = firstPage.parentElement;
        }
      }
      const rootList = this._target.querySelector(':scope > ul');
      this.__generatePagesModel(rootList, parentElement, currentPage);
    },

    _onHamburgerMenu() {
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
      } else if (target.tagName.toLowerCase() !== 'summary' && target.tagName.toLowerCase() !== 'p') {
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
        const pageIcon = page.getAttribute('icon') || '';
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', '#' + pageId);
        if (pageIcon) {
          const i = document.createElement('i');
          i.classList.add(pageIcon);
          a.appendChild(i);
        }
        const text = document.createTextNode(pageName);
        a.appendChild(text);
        if (currentPage === pageId) {
          li.classList.add('active');
        }
        parentList.appendChild(li);
        if (page.querySelectorAll(':scope > cv-page').length > 0) {
          const details = document.createElement('details');
          const summary = document.createElement('summary');
          if (page.querySelector(':scope > *:not(cv-page)')) {
            // only add this as link, when this page has real content
            summary.appendChild(a);
          } else {
            const p = document.createElement('p');
            p.textContent = pageName;
            summary.appendChild(p);
          }
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
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'menu', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
