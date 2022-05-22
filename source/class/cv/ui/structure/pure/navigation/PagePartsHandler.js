/* PagePartsHandler.js 
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
 * @author Christian Mayer
 * @since 2010
 */
qx.Class.define('cv.ui.structure.pure.navigation.PagePartsHandler', {
  extend: qx.core.Object,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    this.navbars = {
      top: {
        dynamic: null,
        fadeVisible: true
      },
      left: {
        dynamic: null,
        fadeVisible: true
      },
      right: {
        dynamic: null,
        fadeVisible: true
      },
      bottom: {
        dynamic: null,
        fadeVisible: true
      }
    };
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    navbars: null,

    updateTopNavigation: function (path) {
      path = path.split('_');
      path.pop();
      let id = 'id_'; //path[0];
      const pathNode = document.querySelector('.nav_path');
      pathNode.innerHTML = '';
      let pageTitle = this.getPageTitle(id);
      let nav = document.createElement('a');
      // eslint-disable-next-line no-script-url
      nav.setAttribute('href', 'javascript:cv.Application.structureController.scrollToPage(\'' + id + '\')');
      nav.setAttribute('id', 'breadcrump_pagejump_' + id);
      nav.appendChild(document.createTextNode(pageTitle));
      pathNode.appendChild(nav);
      for (let i = 1; i < path.length; i++) { // element 0 is id_ (JNK)
        id += path[i] + '_';
        let pageElem = document.querySelector('#'+id);
        if (pageElem && pageElem.classList.contains('page')) { // FIXME is this still needed?!?
          pageTitle = this.getPageTitle(id);
          let span = document.createElement('span');
          span.innerHTML = ' &#x25ba; ';
          pathNode.appendChild(span);
          nav = document.createElement('a');
          // eslint-disable-next-line no-script-url
          nav.setAttribute('href', 'javascript:cv.Application.structureController.scrollToPage(\'' + id + '\')');
          nav.setAttribute('id', 'breadcrump_pagejump_' + id);
          nav.appendChild(document.createTextNode(pageTitle));
          pathNode.appendChild(nav);
        }
      }
      // cv.TemplateEngine.getInstance().handleResize(); - TODO CM160528: why? This shouldn't have
      //                             any effect on the page size => commented out
    },

    getPageTitle: function (pageId) {
      let pageTitle = '';
      const pageData = cv.data.Model.getInstance().getWidgetData(pageId);
      if (pageData) {
        pageTitle = pageData.name;
      } else {
        const pageHeadline = document.querySelector('#' + pageId + ' h1');
        if (pageHeadline) {
          pageTitle = pageHeadline.textContent;
        }
      }
      return pageTitle;
    },

    /**
     * Change the size of the selected navbar
     *
     * currently only "left" and "right" are implemented
     * @param position
     * @param size
     */
    navbarSetSize: function (position, size) {
      const cssSize = size + (isFinite(size) ? 'px' : '');
      let navbar;
      switch (position) {
        case 'left':
          navbar = document.querySelector('#navbarLeft');
          navbar.style.width = cssSize;
          if (!this.navbars.left.fadeVisible) {
            navbar.style.left = -navbar.getBoundingClientRect().width + 'px';
          }
          cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
          break;

        case 'right':
          document.querySelector('#centerContainer').style['padding-right'] = cssSize;
          navbar = document.querySelector('#navbarRight');
          navbar.style.width = cssSize;
          navbar.style['margin-right'] = '-' + cssSize;
          if (!this.navbars.right.fadeVisible) {
            navbar.style.right = -navbar.getBoundingClientRect().width + 'px';
          }
          cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
          break;
      }
    },

    getNavbarsVisibility: function (page) {
      if (!page) {
        page = cv.Application.structureController.getCurrentPage();
      }
      if (!page) {
        return {top: true, bottom: true, left: true, right: true};
      }
      if (typeof page === 'string') {
        page = cv.ui.structure.WidgetFactory.getInstanceById(page);
      } else if (page.attributes) {
        page = cv.ui.structure.WidgetFactory.getInstanceById(page.getAttribute('id'));
      }

      if (!page) {
        return {top: true, bottom: true, left: true, right: true};
      }

      return {
        top: page.getShowNavbarTop(),
        bottom: page.getShowNavbarBottom(),
        left: page.getShowNavbarLeft(),
        right: page.getShowNavbarRight()
      };
    },

    /**
     * update the visibility of top-navigation, footer and navbar for this page
     *
     * @param page {cv.ui.structure.pure.Page} page to update the parts for
     * @param speed {Number} animation duration for changes
     */
    updatePageParts: function (page, speed) {
      // default values
      let showtopnavigation = true;
      let showfooter = true;

      if (page) {
        if (!page.isInitialized()) {
          // page is not ready, defer this update
          const self = this;
          page.addListenerOnce('changeInitialized', function () {
            self.updatePageParts(page, speed);
          }, this);
          return;
        }
        showtopnavigation = page.getShowTopNavigation();
        showfooter = page.getShowFooter();
      }
      const topDisplay = window.getComputedStyle(document.querySelector('#top'))['display'];
      const bottomDisplay = window.getComputedStyle(document.querySelector('#bottom'))['display'];
      if (showtopnavigation) {
        if (topDisplay === 'none') {
          document.querySelectorAll('#top, #top > *').forEach(function(elem) {
            elem.style.display = 'block';
          }, this);
          this.removeInactiveNavbars(page.getPath());
        }
      } else if (topDisplay !== 'none') {
        document.querySelector('#top').style.display = 'none';
        this.removeInactiveNavbars(page.getPath());
      }
      if (showfooter) {
        if (bottomDisplay === 'none') {
          document.querySelector('#bottom').style.display = 'block';
          this.removeInactiveNavbars(page.getPath());
        }
      } else if (bottomDisplay !== 'none') {
        document.querySelector('#bottom').style.display = 'none';
        this.removeInactiveNavbars(page.getPath());
      }
      cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
    },

    /**
     * fades in/out a navbar
     *
     * @param position {String}  [Top|Left|Right|Bottom]
     * @param direction {String} [in|out]
     * @param speed {Number} time in milliseconds
     */
    fadeNavbar: function (position, direction, speed) {
      speed = (speed !== undefined) ? speed : cv.Application.structureController.main_scroll.getSpeed();
      const initCss = {};
      const targetCss = {};
      const navbar = document.querySelector('#navbar' + position);
      if (navbar) {
        const key = position.toLowerCase();
        const self = this;
        const onAnimationEnd = function () {
          self.navbars[key].fadeVisible = direction === 'in';
          cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
        };
        switch (direction) {
          case 'in':
            if (window.getComputedStyle(navbar).display === 'none') {
              initCss.display = 'block';
            }
            targetCss[key] = 0;
            switch (position) {
              case 'Top':
              case 'Bottom':
                initCss[key] = -navbar.getBoundingClientRect().height + 'px';
                break;
              case 'Left':
              case 'Right':
                initCss[key] = -navbar.getBoundingClientRect().width + 'px';
                break;
            }
            break;
          case 'out':
            initCss[key] = 0;
            switch (position) {
              case 'Top':
              case 'Bottom':
                targetCss[key] = -navbar.getBoundingClientRect().height + 'px';
                break;
              case 'Left':
              case 'Right':
                targetCss[key] = -navbar.getBoundingClientRect().width + 'px';
                break;
            }
            break;
        }
        Object.entries(initCss).forEach(function (key_value) {
          navbar.style[key_value[0]] = key_value[1];
        });
        if (speed === 0) {
          Object.entries(targetCss).forEach(function (key_value) {
            navbar.style[key_value[0]] = key_value[1];
          });
          onAnimationEnd();
        } else {
          const spec = {
            duration: speed,
            timing:  cv.Application.structureController.main_scroll.getEasing(),
            keep: 100,
            keyFrames: {
              0: initCss,
              100: targetCss
            }
          };
          const anim = qx.bom.element.Animation.animate(navbar, spec);
          anim.addListenerOnce('end', onAnimationEnd, this);
        }
      }
    },

    /**
     * traverse down the page tree from root page id_ -> .. -> page_id activate
     * all navbars in that path deactivate all others
     *
     * @param page_id {String}
     */
    initializeNavbars: function (page_id) {
      const self = this;
      this.removeInactiveNavbars(page_id);
      const tree = Array.from(document.querySelectorAll('#id_'));
      if (page_id !== 'id_') {
        const parts = page_id.split('_');
        parts.pop();
        parts[0] = '';
        for (let i = 0; i < parts.length; i++) {
          const subPath = parts.slice(0, i + 1).join('_');
          if (subPath) {
            const item = document.querySelectorAll('#id' + subPath + '_.page');
            if (item.length === 1) {
              tree.push(item[0]);
            }
          }
        }
      }
      let level = 1;
      const size = {top: 0, right: 0, bottom: 0, left: 0};
      const dynamic = {top: null, right: null, bottom: null, left: null};
      const positions = ['top', 'right', 'bottom', 'left'];
      tree.forEach(function (elem) {
        const id = elem.getAttribute('id');
        positions.forEach(function (pos) {
          const nav = document.querySelector('#' + id + pos + '_navbar');
          if (nav) {
            const data = cv.data.Model.getInstance().getWidgetData(id + pos + '_navbar');
            if (data.scope >= 0 && tree.length-level > data.scope) {
              // navbar that is not visible at the moment -> ignore it
              nav.classList.remove('navbarActive');
              return;
            }
            if (data.dynamic !== null) {
              dynamic[pos] = data.dynamic;
            }
            self.navbars[pos].dynamic = dynamic[pos];
            if (data.scope === undefined || data.scope < 0 || tree.length - level <= data.scope) {
              nav.classList.add('navbarActive');
            } else {
              nav.classList.remove('navbarActive');
            }
            if (data.width !== null) {
              size[pos] = data.width;
            } else if (size[pos] === 0) {
              // navbar with content but no size given so far => use default
              size[pos] = 300;
            }
          }
        });
        level++;
      });
      positions.forEach(function (pos) {
        self.navbarSetSize(pos, size[pos]);
      });
      cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
    },

    removeInactiveNavbars: function (page_id) {
      // remove all navbars that do not belong to this page
      document.querySelectorAll('.navbar.navbarActive').forEach(function (elem) {
        let navBarPath = elem.getAttribute('id').split('_');
        // skip last 2 elements e.g. '_top_navbar'
        navBarPath = navBarPath.slice(0, navBarPath.length - 2).join('_');
        const expr = new RegExp('^' + navBarPath + '.*', 'i');
        if (navBarPath !== page_id && !expr.test(page_id)) {
          elem.classList.remove('navbarActive');
        }
      });
    }
  }
});
