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
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Link.js 
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
   * This plugins integrates a simple link.
   *
   * @author Stefan Borchert [stefan@borchert.cc]
   * @since 2015
   */
  qx.Class.define('cv.plugins.Link', {
    extend: cv.ui.structure.AbstractWidget,

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      cssClass: {
        check: "String",
        init: ''
      },
      text: {
        check: "String",
        init: ''
      },
      href: {
        check: "String",
        init: ''
      },
      newWindow: {
        check: "Boolean",
        init: false
      }
    },

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
        return cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'class': {
            target: 'cssClass',
            'default': ''
          },
          'text': {
            'default': ''
          },
          'href': {
            'default': ''
          },
          'newWindow': {
            'default': false,
            transform: function transform(value) {
              return value === "true";
            }
          }
        };
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        var classes = "link";

        if (this.getCssClass()) {
          classes += " " + this.getCssClass();
        }

        var href = this.getHref() ? ' href="' + this.getHref() + '"' : '';
        var attributes = '';

        if (this.isNewWindow()) {
          attributes += ' target="_blank"';
        }

        return '<a class="' + classes + '"' + href + attributes + '>' + this.getText() + '</a>';
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("link", cv.plugins.Link);
      cv.ui.structure.WidgetFactory.registerClass("link", statics);
    }
  });
  cv.plugins.Link.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Link.js.map?dt=1588445433255