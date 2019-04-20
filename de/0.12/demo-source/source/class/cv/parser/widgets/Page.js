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

    parse: function( page, path, flavour, pageType ) {

      var storagePath = cv.parser.WidgetParser.getStoragePath(page, path);
      var addresses = {};
      if (qx.bom.element.Attribute.get(page, 'ga')) {
        var src = qx.bom.element.Attribute.get(page, 'ga');
        cv.data.Model.getInstance().addAddress(src, storagePath);
        addresses[ src ] = [ 'DPT:1.001', cv.data.Model.READ ];
      }

      var name    = qx.bom.element.Attribute.get(page, 'name');
      pageType = qx.bom.element.Attribute.get(page, 'type') || 'text';              //text, 2d or 3d
      var backdrop = qx.bom.element.Attribute.get(page, 'backdrop');
      var showtopnavigation = qx.bom.element.Attribute.get(page, 'showtopnavigation') ? qx.bom.element.Attribute.get(page, 'showtopnavigation') === "true" : null;
      var showfooter = qx.bom.element.Attribute.get(page, 'showfooter') ? qx.bom.element.Attribute.get(page, 'showfooter') === "true": true;
      // make sure the type has the correct value as we need to use it ass CSS class
      switch (pageType) {
        case '2d':
        case '3d':
          // do nothing, type has correct value
          break;
        default:
          pageType = 'text';
          break;
      }

      // automatically set the navbars if not set in the config file
      var shownavbar = {
        top    : path === "id" ? false : null,
        bottom : path === "id" ? false : null,
        left   : path === "id" ? false : null,
        right  : path === "id" ? false : null
      };
      qx.bom.Selector.matches("navbar", qx.dom.Hierarchy.getChildElements(page)).forEach( function(elem) {
        shownavbar[ qx.bom.element.Attribute.get(elem, 'position') || 'left' ] = true;
      });
      // overwrite default when set manually in the config
      ['top', 'left', 'right', 'bottom'].forEach(function(pos) {
        if (shownavbar[pos] !== null) {
          // do not override current values
          return;
        }
        var value = qx.bom.element.Attribute.get(page, 'shownavbar-'+pos);
        if (qx.lang.Type.isString(value)) {
          shownavbar[pos] = value === "true";
        }
      }, this);
      var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if (qx.bom.element.Attribute.get(page, "bind_click_to_widget")) {
        bindClickToWidget = qx.bom.element.Attribute.get(page, "bind_click_to_widget")==="true";
      }
      if( qx.bom.element.Attribute.get(page, 'flavour') ) {
        flavour = qx.bom.element.Attribute.get(page, 'flavour');// sub design choice
      }
      var wstyle  = '';                                     // widget style
      if( qx.bom.element.Attribute.get(page, 'align') ) {
        wstyle += 'text-align:' + qx.bom.element.Attribute.get(page, 'align') + ';';
      }
      if( wstyle !== '' ) {
        wstyle = 'style="' + wstyle + '"';
      }

      var layout = cv.parser.WidgetParser.parseLayout( qx.bom.Selector.matches("layout", qx.dom.Hierarchy.getChildElements(page))[0] );
      var backdropType = null;
      if (backdrop) {
        backdropType = '.svg' === backdrop.substring( backdrop.length - 4 ) ? 'embed' : 'img';
      }

      var data = cv.data.Model.getInstance().setWidgetData( storagePath, {
        path              : storagePath,
        name              : name,
        pageType          : pageType,
        showTopNavigation : showtopnavigation,
        showFooter        : showfooter,
        showNavbarTop     : shownavbar.top,
        showNavbarBottom  : shownavbar.bottom,
        showNavbarLeft    : shownavbar.left,
        showNavbarRight   : shownavbar.right,
        backdropAlign     : '2d' === pageType ? (qx.bom.element.Attribute.get(page, 'backdropalign' ) || '50% 50%') : null,
        size              : qx.bom.element.Attribute.get(page, 'size') || null,
        address           : addresses,
        linkVisible       : qx.bom.element.Attribute.get(page, 'visible') ? qx.bom.element.Attribute.get(page, 'visible') === "true" : true,
        flavour           : flavour || null,
        $$type            : "page",
        backdrop          : backdrop || null,
        backdropType      : backdropType
      });
      cv.parser.WidgetParser.parseAddress(page, path);
      cv.parser.WidgetParser.parseFormat(page, path);
      // this has to be called manually to allow inheritance of the flavour, pageType values
      cv.parser.WidgetParser.parseChildren(page, path, flavour, pageType);
      if (data.linkVisible === true) {
        var linkData = cv.data.Model.getInstance().setWidgetData( path, {
          $$type          : "pagelink",
          path            : path,
          name            : name,
          classes         : cv.parser.WidgetParser.setWidgetLayout( page, path ) || '',
          layout          : layout || null,
          address         : addresses,
          pageType        : pageType,
          wstyle          : wstyle || '',
          bindClickToWidget: bindClickToWidget
        });
        return [data, linkData];
      } else {
        return data;
      }
    }
  },

  defer: function(statics) {
    cv.parser.WidgetParser.addHandler("page", statics);
  }
});