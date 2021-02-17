(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "qx.data.store.Json": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "cv.Config": {},
      "cv.util.Location": {},
      "qx.util.Uri": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* DesignToggle.js 
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
   * Adds a button to toggle through the available designs
   * @widgetexample
   * <designtoggle>
   *   <layout colspan="6"/>
   *   <label>Change Design</label>
   * </designtoggle>
   *
   *
   *
   * @author Christian Mayer
   * @since 0.5.3 (2010)
   */
  qx.Class.define('cv.ui.structure.pure.DesignToggle', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.HasAnimatedButton],

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct(props) {
      cv.ui.structure.AbstractWidget.constructor.call(this, props);
      var store = new qx.data.store.Json(qx.util.ResourceManager.getInstance().toUri("designs/get_designs.php"));
      store.addListener("loaded", function (ev) {
        this.setAvailableDesigns(ev.getData());
      }, this);
    },

    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      availableDesigns: {
        check: "Array",
        init: []
      }
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor switchUnpressed"><div class="value">' + cv.Config.getDesign() + '</div></div>';
      },

      /**
       * Action performed when the widget got clicked
       *
       *
       * @param path {String} - Internal path of the widget
       * @param actor {Element} - DOMElement
       * @param isCanceled {Boolean} - If true the action does nothing
       */
      _action: function _action(path, actor, isCanceled) {
        if (isCanceled) {
          return;
        }

        var designs = this.getAvailableDesigns();
        var oldDesign = this.getDomElement().querySelector('.value').textContent;
        var newDesign = designs.getItem((designs.indexOf(oldDesign) + 1) % designs.length);
        var URL = cv.util.Location.getHref();
        var regexp = new RegExp("design=" + oldDesign);

        if (URL.search(regexp) !== -1) {
          // has URL-parameter design
          cv.util.Location.setHref(URL.replace(regexp, "design=" + newDesign));
        } else {
          var parts = cv.util.Location.getHref().split("#");
          var req = qx.util.Uri.appendParamsToUrl(parts[0], {
            design: newDesign
          });

          if (parts.length > 1) {
            req += "#" + parts[1];
          }

          cv.util.Location.setHref(req);
        }
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("designtoggle", statics);
    }
  });
  cv.ui.structure.pure.DesignToggle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DesignToggle.js.map?dt=1613591246313