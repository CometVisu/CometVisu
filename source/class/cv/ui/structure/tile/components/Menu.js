/* Menu.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

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
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: ['pages', 'menuItems'],
      apply: '_applyModel'
    },
    appearance: {
      check: ['text', 'icons', 'dock'],
      init: 'text',
      apply: '_applyAppearance'
    },

    depth: {
      check: '!isNaN(value) && value >= -1 && value <= 100',
      init: -1,
      apply: '_applyDepth'
    },

    domReady: {
      check: 'Boolean',
      init: false,
      apply: '_generateMenu'
    },

    showLabels: {
      check: 'Boolean',
      init: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyAppearance(value, oldValue) {
      const main = document.querySelector('main');
      if (oldValue === 'dock') {
        main.classList.remove('has-dock');
      }
      if (value === 'dock') {
        main.classList.add('has-dock');
      }
    },

    _applyDepth() {
      if (this.isDomReady()) {
        this._generateMenu();
      }
    },

    _onDomAppended() {
      this.setDomReady(true);
      qx.event.message.Bus.unsubscribe('setup.dom.append', this._onDomAppended, this);
    },

    _applyModel(model) {
      if (model) {
        const rootList = document.createElement('ul');
        this._element.appendChild(rootList);

        // add some general listeners to close
        qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);

        if (model === 'pages') {
          // add hamburger menu
          const ham = document.createElement('a');
          ham.href = '#';
          ham.classList.add('menu');
          ham.onclick = event => this._onHamburgerMenu(event);
          const icon = document.createElement('i');

          ham.appendChild(icon);
          this._element.appendChild(ham);

          qx.event.message.Bus.subscribe('setup.dom.append', this._onDomAppended, this);
          qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
          qx.event.Registration.addListener(this._element, 'swipe', this._onSwipe, this);
          icon.classList.add('ri-menu-line');
        } else if (model === 'menuItems') {
          // add hamburger menu
          const icon = document.createElement('i');
          icon.classList.add('ri-more-2-fill');
          this._element.appendChild(icon);
          // listen on whole element
          this._element.onclick = event => this._onHamburgerMenu(event);
          rootList.classList.add('context-menu');
          this._generateMenu();
        }
      } else {
        this.error('visual-model of type', model, 'is not implemented');
      }
    },

    _init() {
      const element = this._element;
      const model = element.hasAttribute('model') ? element.getAttribute('model')
        : (element.querySelectorAll(':scope > cv-menu-item').length > 0) ? 'menuItems' : null;
      if (!model) {
        this.error('no model defined, menu will be empty');
        return;
      }
      if (element.getAttribute('show-labels') === 'false') {
        this.setShowLabels(false);
      }
      this.setModel(model);
    },

    _generateMenu() {
      switch (this.getModel()) {
        case 'pages': {
          const currentPage = window.location.hash.substring(1);
          let parentElement = document.querySelector('main');
          if (parentElement) {
            const firstPage = document.querySelector('cv-page');
            if (firstPage) {
              parentElement = firstPage.parentElement;
            }
          }
          const rootList = this._element.querySelector(':scope > ul');
          if (rootList) {
            rootList.replaceChildren();
            this.__generatePagesModel(rootList, parentElement, currentPage, 0);
          }
          break;
        }
        case 'menuItems': {
          const rootList = this._element.querySelector(':scope > ul');
          if (rootList) {
            rootList.replaceChildren();
            for (let item of this._element.querySelectorAll(':scope > cv-menu-item')) {
              const pageName = item.getAttribute('name') || '';
              const pageIcon = item.getAttribute('icon') || '';
              const li = document.createElement('li');
              if (pageIcon) {
                const i = document.createElement('i');
                i.classList.add(pageIcon);
                i.title = pageName;
                li.appendChild(i);
              }
              if (this.isShowLabels()) {
                const text = document.createTextNode(pageName);
                li.appendChild(text);
              }
              li.addEventListener('click', event => {
                item.getInstance().onClick(event);
              });
              rootList.appendChild(li);
            }
          }
          break;
        }
      }
    },

    _onHamburgerMenu(event) {
      let toggleClass = 'open';
      if (this.getModel() === 'pages') {
        toggleClass = 'responsive';
        for (let detail of this._element.querySelectorAll('details')) {
          detail.setAttribute('open', '');
        }
      }
      this._element.classList.toggle(toggleClass);
      event.stopPropagation();
    },

    /**
     * @param ev {qx.event.type.Event}
     * @private
     */
    _onPointerDown(ev) {
      const target = ev.getTarget();
      if (
        target.classList.contains('menu') ||
        (target.parentElement && target.parentElement.classList.contains('menu')) ||
        target.nodeName.toLowerCase() === 'cv-menu' ||
        (target.parentElement && target.parentElement.nodeName.toLowerCase() === 'cv-menu')
      ) {
        // clicked in hamburger menu, do nothing
      } else if (target.tagName.toLowerCase() !== 'summary' && target.tagName.toLowerCase() !== 'p') {
        // defer closing because it would prevent the link clicks and page selection
        qx.event.Timer.once(this._closeAll, this, 100);
      } else {
        // close others
        this._closeAll(ev.getTarget().parentElement);
      }
    },

    _onSwipe(ev) {
      if (ev.getDirection() === 'left') {
        // goto next if there is one
        const next = this._element.querySelector('li.active + li > a');
        if (next) {
          next.click();
        }
      } else {
        const current = this._element.querySelector('li.active');
        if (
          current &&
          current.previousElementSibling &&
          current.previousElementSibling.tagName.toLowerCase() === 'li'
        ) {
          const prev = current.previousElementSibling.querySelector(':scope > a');
          if (prev) {
            prev.click();
          }
        }
      }
    },

    /**
     * Close all open sub-menus
     * @param except {Element?} do not close this one
     * @private
     */
    _closeAll(except) {
      if (this._element.classList.contains('open')) {
        this._element.classList.remove('open');
      } else if (this._element.classList.contains('responsive')) {
        this._element.classList.remove('responsive');
      } else {
        for (let detail of this._element.querySelectorAll('details[open]')) {
          if (!except || detail !== except) {
            detail.removeAttribute('open');
          }
        }
      }
    },

    __generatePagesModel(parentList, parentElement, currentPage, currentLevel) {
      if (!parentElement) {
        return;
      }
      let pages = parentElement.querySelectorAll(':scope > cv-page:not([menu="false"])');

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
          i.title = pageName;
          a.appendChild(i);
        }
        if (this.isShowLabels()) {
          const text = document.createTextNode(pageName);
          a.appendChild(text);
        }
        if (currentPage === pageId) {
          li.classList.add('active');
        }
        parentList.appendChild(li);
        const depth = this.getDepth();
        if (
          (depth < 0 || depth > currentLevel) &&
          page.querySelectorAll(':scope > cv-page:not([menu="false"])').length > 0
        ) {
          const details = document.createElement('div');
          details.classList.add('details');
          const summary = document.createElement('div');
          summary.classList.add('summary');
          summary.addEventListener('click', ev => {
            if (details.hasAttribute('open')) {
              details.removeAttribute('open');
            } else {
              details.setAttribute('open', '');
            }
          });
          a.addEventListener('click', ev => {
            // only stop propagation if we are not close to the right border
            if (ev.pointerType !== 'touch' || ev.currentTarget.clientWidth - ev.offsetX >= 8) {
              ev.stopPropagation();
            }
          });
          const pageIcon = page.getAttribute('icon') || '';
          if (page.querySelector(':scope > *:not(cv-page)')) {
            // only add this as link, when this page has real content
            summary.appendChild(a);
          } else {
            const p = document.createElement('p');
            if (pageIcon) {
              const i = document.createElement('i');
              i.classList.add(pageIcon);
              i.title = pageName;
              p.appendChild(i);
            }
            if (this.isShowLabels()) {
              p.appendChild(document.createTextNode(pageName));
            }
            summary.appendChild(p);
          }
          details.appendChild(summary);
          const subList = document.createElement('ul');
          details.appendChild(subList);
          this.__generatePagesModel(subList, page, currentPage, currentLevel++);
          li.appendChild(details);
        } else {
          li.appendChild(a);
        }
      }
    },

    _onPageChange(ev) {
      const pageElement = ev.getData();
      // unset all currently active
      for (let link of this._element.querySelectorAll('li.active, li.sub-active')) {
        link.classList.remove('active');
        link.classList.remove('sub-active');
      }
      // find link to current page
      for (let link of this._element.querySelectorAll(`a[href="#${pageElement.id}"]`)) {
        // activate all parents
        let parent = link.parentElement;
        let activeName = 'active';
        while (parent && parent.tagName.toLowerCase() !== 'cv-menu') {
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
  destruct() {
    qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);

    qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'menu',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
        static get observedAttributes() {
          return ['appearance', 'depth'];
        }
      }
    );
  }
});
