(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "qx.io.request.Xhr": {},
      "qx.util.ResourceManager": {},
      "cv.Config": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Svg.js
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
   * @author christian523
   * @since 2012
   * @asset(plugins/svg/rollo.svg)
   */
  qx.Class.define('cv.plugins.Svg', {
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.Update],
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
        var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType);
        cv.parser.pure.WidgetParser.parseFormat(xml, path);
        cv.parser.pure.WidgetParser.parseAddress(xml, path);
        return data;
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor"></div>';
      },
      _onDomReady: function _onDomReady() {
        var _this = this;
        cv.plugins.Svg.superclass.prototype._onDomReady.call(this);
        var ajaxRequest = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri('plugins/svg/rollo.svg'));
        ajaxRequest.set({
          accept: 'text/plain',
          cache: !cv.Config.forceReload
        });
        ajaxRequest.addListenerOnce('success', function (e) {
          var req = e.getTarget();
          var actor = _this.getActor();
          actor.innerHTML = req.getResponseText();
        });
        ajaxRequest.send();
      },
      _update: function _update(address, value) {
        value = this.defaultValueHandling(address, value);
        var element = this.getActor();
        var linewidth = 3;
        var space = 1;
        var total = linewidth + space;
        var line_qty = 48 / total;
        var line;
        var i;
        var l;
        for (i = 0, l = Math.floor(value / line_qty); i <= l; i++) {
          line = element.querySelector('#line' + (i + 1));
          line.setAttribute('y1', 9 + total * i + value % line_qty / line_qty * total);
          line.setAttribute('y2', 9 + total * i + value % line_qty / line_qty * total);
        }
        for (i = Math.floor(value / line_qty) + 1; i <= line_qty; i++) {
          line = element.querySelector('#line' + (i + 1));
          line.setAttribute('y1', 9);
          line.setAttribute('y2', 9);
        }
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.pure.WidgetParser.addHandler('svg', cv.plugins.Svg);
      cv.ui.structure.WidgetFactory.registerClass('svg', statics);
    }
  });
  cv.plugins.Svg.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Svg.js.map?dt=1702815204664