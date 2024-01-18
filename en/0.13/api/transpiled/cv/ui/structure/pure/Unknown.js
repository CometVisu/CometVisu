(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.ui.structure.pure.AbstractBasicWidget": {},
      "qx.locale.Manager": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Unknown.js
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
   * Fallback widget shown when an unknown widget is defined in the configuration.
   * You must not use this one directly.
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   */
  qx.Class.define('cv.ui.structure.pure.Unknown', {
    extend: qx.core.Object,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      this.set(props);
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      path: {
        check: 'String',
        init: ''
      },
      $$type: {
        check: 'String',
        init: 'Unknown'
      },
      unknownType: {
        check: 'String',
        init: ''
      },
      pageType: {
        check: ['text', '2d', '3d'],
        init: 'text'
      },
      parentWidget: {
        check: 'cv.ui.structure.pure.AbstractBasicWidget',
        init: null
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      /**
       * Returns the DOM-Element of this widget
       * @return {Element} the DOM element
       */
      getDomElement: function getDomElement() {
        return document.querySelector('#' + this.getPath());
      },
      /**
       * Return the HTML string for this widget
       * @return {String} HTML code
       */
      getDomString: function getDomString() {
        return '<div class="widget clearfix"><pre>' + qx.locale.Manager.tr('unknown: %1', this.getUnknownType()) + '</pre></div>';
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('unknown', statics);
    }
  });
  cv.ui.structure.pure.Unknown.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Unknown.js.map?dt=1705596657203