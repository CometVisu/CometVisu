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
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.Config": {},
      "qx.event.message.Bus": {},
      "qx.bom.element.Animation": {},
      "qx.util.Animation": {},
      "qx.event.Registration": {},
      "cv.util.ScriptLoader": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* MobileMenu.js 
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
   * @author alltime84
   * @since 2016
   * @asset(plugins/mobilemenu/*.css)
   */
  qx.Class.define('cv.plugins.MobileMenu', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.HasChildren],

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       * @return {Map} extracted data from config element as key/value map
       */
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
        cv.parser.WidgetParser.parseChildren(xml, path, flavour, pageType);
        return data;
      },
      getWidgetElements: function getWidgetElements(xmlElement, path) {
        cv.data.Model.getInstance().setWidgetData(path + "_0", {
          containerClass: "actor"
        });
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __navLeft: null,
      __isTouchDevice: null,
      // overridden
      getDomString: function getDomString() {
        if (window.innerWidth <= cv.Config.maxMobileScreenWidth) {
          var navLeft = this.__navLeft = document.querySelector('#navbarLeft');

          if (!navLeft.classList.contains('mobilemenu')) {
            navLeft.classList.add('mobilemenu');
          }

          navLeft.style.display = "none";
          qx.event.message.Bus.subscribe("path.pageChanged", function () {
            var navbar = navLeft.querySelector('.navbar');
            var animation = qx.bom.element.Animation.animate(navbar, qx.util.Animation.SLIDE_LEFT_OUT);
            animation.addListenerOnce("end", function () {
              navLeft.style.display = "none";
            }, this);
          });
          return '<div class="clearfix mobilemenuTrigger">' + this.getChildrenDomString() + '</div>';
        } else {
          return '<div class="clearfix mobilemenuTrigger" style="display: none"></div>';
        }
      },
      _onDomReady: function _onDomReady() {
        if (this.isTouchDevice()) {
          this.touchScroll("navbarLeft");
        }
      },
      _action: function _action() {
        if (window.innerWidth <= cv.Config.maxMobileScreenWidth) {
          if (this.isTouchDevice()) {
            this.__navLeft.style.display = "block";

            var navbar = this.__navLeft.querySelector('.navbar.navbarActive');

            qx.bom.element.Animation.animate(navbar, qx.util.Animation.SLIDE_LEFT_IN);
          }
        }
      },
      touchScroll: function touchScroll(id) {
        var scrollStartPos = 0;
        var elem = document.querySelector('#' + id);
        qx.event.Registration.addListener(elem, "touchstart", function (event) {
          scrollStartPos = this.scrollTop + event.touches[0].pageY;
          event.preventDefault();
        }, false);
        qx.event.Registration.addListener(elem, "touchmove", function (event) {
          this.scrollTop = scrollStartPos - event.touches[0].pageY;
          event.preventDefault();
        }, false);
      },
      isTouchDevice: function isTouchDevice() {
        if (this.__isTouchDevice === null) {
          try {
            document.createEvent("TouchEvent");
            this.__isTouchDevice = true;
          } catch (e) {
            this.__isTouchDevice = false;
          }
        }

        return this.__isTouchDevice;
      }
    },
    // VisuDesign_Custom.prototype.addCreator("mobilemenu", {
    //   create: function(element, path, flavour, type) {
    //     var $e = $(element);
    //     var data = templateEngine.widgetDataInsert( path, {
    //       content           : getWidgetElements($e, path)
    //     } );
    // });
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addStyles('plugins/mobilemenu/mobilemenu.css');
      cv.parser.WidgetParser.addHandler("mobilemenu", statics);
      cv.ui.structure.WidgetFactory.registerClass("mobilemenu", statics);
    }
  });
  cv.plugins.MobileMenu.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MobileMenu.js.map?dt=1589123547400