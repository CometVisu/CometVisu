(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.TemplateEngine": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Page.js 
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
   *
   */
  qx.Class.define('cv.parser.widgets.Page', {
    type: "static",

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      parse: function parse(page, path, flavour, pageType) {
        var storagePath = cv.parser.WidgetParser.getStoragePath(page, path);
        var addresses = {};

        if (page.getAttribute('ga')) {
          var src = page.getAttribute('ga');
          cv.data.Model.getInstance().addAddress(src, storagePath);
          addresses[src] = ['DPT:1.001', cv.data.Model.READ];
        }

        var name = page.getAttribute('name');
        pageType = page.getAttribute('type') || 'text'; //text, 2d or 3d

        var backdrop = page.getAttribute('backdrop');
        var showtopnavigation = page.getAttribute('showtopnavigation') ? page.getAttribute('showtopnavigation') === "true" : null;
        var showfooter = page.getAttribute('showfooter') ? page.getAttribute('showfooter') === "true" : true; // make sure the type has the correct value as we need to use it ass CSS class

        switch (pageType) {
          case '2d':
          case '3d':
            // do nothing, type has correct value
            break;

          default:
            pageType = 'text';
            break;
        } // automatically set the navbars if not set in the config file


        var shownavbar = {
          top: path === "id" ? false : null,
          bottom: path === "id" ? false : null,
          left: path === "id" ? false : null,
          right: path === "id" ? false : null
        };
        Array.from(page.children).filter(function (m) {
          return m.matches("navbar");
        }).forEach(function (elem) {
          shownavbar[elem.getAttribute('position') || 'left'] = true;
        }); // overwrite default when set manually in the config

        ['top', 'left', 'right', 'bottom'].forEach(function (pos) {
          if (shownavbar[pos] !== null) {
            // do not override current values
            return;
          }

          var value = page.getAttribute('shownavbar-' + pos);

          if (typeof value === 'string') {
            shownavbar[pos] = value === "true";
          }
        }, this);
        var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;

        if (page.getAttribute("bind_click_to_widget")) {
          bindClickToWidget = page.getAttribute("bind_click_to_widget") === "true";
        }

        if (page.getAttribute('flavour')) {
          flavour = page.getAttribute('flavour'); // sub design choice
        }

        var wstyle = ''; // widget style

        if (page.getAttribute('align')) {
          wstyle += 'text-align:' + page.getAttribute('align') + ';';
        }

        if (wstyle !== '') {
          wstyle = 'style="' + wstyle + '"';
        }

        var layout = cv.parser.WidgetParser.parseLayout(Array.from(page.children).filter(function (m) {
          return m.matches("layout");
        })[0]);
        var backdropType = null;

        if (backdrop) {
          backdropType = '.svg' === backdrop.substring(backdrop.length - 4) ? 'embed' : 'img';
        }

        var data = cv.data.Model.getInstance().setWidgetData(storagePath, {
          path: storagePath,
          name: name,
          pageType: pageType,
          showTopNavigation: showtopnavigation,
          showFooter: showfooter,
          showNavbarTop: shownavbar.top,
          showNavbarBottom: shownavbar.bottom,
          showNavbarLeft: shownavbar.left,
          showNavbarRight: shownavbar.right,
          backdropAlign: '2d' === pageType ? page.getAttribute('backdropalign') || '50% 50%' : null,
          size: page.getAttribute('size') || null,
          address: addresses,
          linkVisible: page.getAttribute('visible') ? page.getAttribute('visible') === "true" : true,
          flavour: flavour || null,
          $$type: "page",
          backdrop: backdrop || null,
          backdropType: backdropType
        });
        cv.parser.WidgetParser.parseAddress(page, path);
        cv.parser.WidgetParser.parseFormat(page, path); // this has to be called manually to allow inheritance of the flavour, pageType values

        cv.parser.WidgetParser.parseChildren(page, path, flavour, pageType);

        if (data.linkVisible === true) {
          var linkData = cv.data.Model.getInstance().setWidgetData(path, {
            $$type: "pagelink",
            path: path,
            name: name,
            classes: cv.parser.WidgetParser.setWidgetLayout(page, path) || '',
            layout: layout || null,
            address: addresses,
            pageType: pageType,
            wstyle: wstyle || '',
            bindClickToWidget: bindClickToWidget
          });
          return [data, linkData];
        } else {
          return data;
        }
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("page", statics);
    }
  });
  cv.parser.widgets.Page.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Page.js.map?dt=1612700559043