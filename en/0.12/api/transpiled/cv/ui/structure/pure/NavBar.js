(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.HasChildren": {
        "require": true
      },
      "cv.TemplateEngine": {},
      "cv.Config": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      },
      "qx.event.message.Bus": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* NavBar.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
   * With the widget navbar, you can add a navigation menu to the entire visu.
   * The menu can be displayed on a page (top, bottom, left, right).
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.NavBar', {
    extend: cv.ui.structure.AbstractWidget,
    include: cv.ui.common.HasChildren,

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      anonymous: {
        refine: true,
        init: true
      },
      name: {
        check: "String",
        nullable: true
      },
      scope: {
        check: "Number",
        init: -1
      },
      width: {
        check: "String",
        init: "300"
      },
      position: {
        check: ["top", "left", "right", "bottom"],
        init: 'left'
      },
      dynamic: {
        check: "Boolean",
        nullable: true,
        init: null
      },
      visible: {
        refine: true,
        init: true
      }
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      _navbarTop: '',
      _navbarLeft: '',
      _navbarRight: '',
      _navbarBottom: '',
      _touchX: null,
      _touchY: null,

      /**
       * Called on setup.dom.finished event with high priority. Adds the navbar dom string
       * to the DOM-Tree
       */
      initializeNavbars: function initializeNavbars() {
        ['Top', 'Left', 'Right', 'Bottom'].forEach(function (pos) {
          if (this['_navbar' + pos]) {
            var elem = document.querySelector('#navbar' + pos);

            if (elem) {
              elem.innerHTML += this['_navbar' + pos];
            }
          }
        }, this);
        var self = this; // Event handlers to allow navbar fade in and fade out.
        // Currently only implemented for the major use case of a left navbar.
        // TODO add logic for other navbars as well
        // Logic:
        //   To fade in the touch must start on the left screen side and then
        //   swipe right.
        //   To fade out all places on the screen are fine.
        //   There is a minimum swipe distance and the direction must be mostly
        //   horizontal (up to +/-45° tolerance is allowed)
        //   When during a valid swipe the direction is reversed the fading
        //   action is also reverted.

        document.addEventListener('touchstart', function (evt) {
          var touches = evt.touches[0],
              pPH = cv.TemplateEngine.getInstance().pagePartsHandler;

          if (pPH.navbars.left.dynamic === false || !cv.Config.mobileDevice && pPH.navbars.left.dynamic !== true || !pPH.navbars.left.fadeVisible && touches.clientX > 20) {
            // left navbar is not visible but the finger isn't on the left end -> not relevant
            return;
          }

          self._touchX = touches.clientX;
          self._touchY = touches.clientY;
        }, false);
        document.addEventListener('touchend', function () {
          self._touchX = null;
          self._touchY = null;
        }, false);
        document.addEventListener('touchmove', function (evt) {
          if (self._touchX === null) {
            return; // early exit as this touch isn't relevant for us
          }

          var touches = evt.touches[0],
              x = touches.clientX - self._touchX,
              y = touches.clientY - self._touchY,
              necessaryDistance = 10,
              enoughDistance = Math.abs(x) > necessaryDistance,
              horizontal = Math.abs(x) > Math.abs(y),
              toRight = x > 0;

          if (horizontal && enoughDistance) {
            var pPH = cv.TemplateEngine.getInstance().pagePartsHandler;

            if (toRight) {
              self._touchX = touches.clientX - necessaryDistance;
              self._touchY = touches.clientY;

              if (!pPH.navbars.left.fadeVisible) {
                pPH.fadeNavbar('Left', 'in', 250);
              }
            } else {
              // !toRight
              self._touchX = touches.clientX + necessaryDistance;
              self._touchY = touches.clientY;

              if (pPH.navbars.left.fadeVisible) {
                pPH.fadeNavbar('Left', 'out', 250);
              }
            }
          }
        }, false);
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _onDomReady: function _onDomReady() {},
      getGlobalPath: function getGlobalPath() {
        var id = this.getPath().split("_");
        id.pop();
        return id.join('_') + '_' + this.getPosition() + '_navbar';
      },
      // overridden
      getDomString: function getDomString() {
        var container = '<div class="' + this.getClasses() + '" id="' + this.getGlobalPath() + '">';

        if (this.getName()) {
          container += '<h2>' + this.getName() + '</h2>';
        }

        container += this.getChildrenDomString();
        container += '</div>'; // add this to the navbars in DOM not inside the page

        switch (this.getPosition()) {
          case 'top':
            cv.ui.structure.pure.NavBar._navbarTop += container;
            break;

          case 'left':
            cv.ui.structure.pure.NavBar._navbarLeft += container;
            break;

          case 'right':
            cv.ui.structure.pure.NavBar._navbarRight += container;
            break;

          case 'bottom':
            cv.ui.structure.pure.NavBar._navbarBottom += container;
            break;
        }

        return '';
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("navbar", statics);
      qx.event.message.Bus.subscribe("setup.dom.finished.before", statics.initializeNavbars, statics);
    }
  });
  cv.ui.structure.pure.NavBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NavBar.js.map?dt=1613590605820