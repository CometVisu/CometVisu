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
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "cv.data.Model": {},
      "cv.util.ScriptLoader": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Rss.js 
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
   * This plugins integrates zrssfeed to display RSS-Feeds via Google-API 
   * and a parser for local feeds using jQuery 1.5+ into CometVisu.
   * rssfeedlocal is derived from simplerss and zrssfeed
   * rssfeedlocal is mainly meant to be used with rsslog.php and plugins
   *
   * <pre class="sunlight-highlight-xml">
   *   &lt;rss src=&quot;/visu/plugins/rss/rsslog.php&quot; refresh=&quot;300&quot; link=&quot;false&quot; title=&quot;false&quot;&gt;&lt;/rss&gt;
   *   &lt;rss src=&quot;http://www.tagesschau.de/xml/rss2&quot; refresh=&quot;300&quot;&gt;Test API&lt;/rss&gt;
   *   &lt;rss src=&quot;/visu/plugins/rss/tagesschau-rss2.xml&quot; refresh=&quot;300&quot; header=&quot;true&quot; date=&quot;true&quot;&gt;&lt;/rss&gt;
   * </pre>
   *
   * @author Michael Markstaller
   * @since 2011
   * @asset(plugins/rss/dep/zrssfeed/jquery.zrssfeed.js)
   */
  qx.Class.define('cv.plugins.Rss', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Refresh],

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
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseRefresh(xml, path);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'src': {},
          'width': {
            "default": ""
          },
          'height': {
            "default": ""
          },
          'limit': {
            "default": 10
          },
          'header': {
            "default": true
          },
          'date': {
            "default": true
          },
          'content': {
            "default": true
          },
          'snippet': {
            "default": true
          },
          'showerror': {
            "default": true
          },
          'ssl': {
            "default": false
          },
          'linktarget': {
            "default": "_new"
          },
          'link': {
            "default": true
          },
          'title': {
            "default": true
          }
        };
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      src: {
        check: "String",
        init: ""
      },
      'width': {
        init: ""
      },
      'height': {
        init: ""
      },
      'limit': {
        init: 10
      },
      'header': {
        init: true
      },
      'date': {
        init: true
      },
      'content': {
        init: true
      },
      'snippet': {
        init: true
      },
      'showerror': {
        init: true
      },
      'ssl': {
        init: false
      },
      'linktarget': {
        init: "_new"
      },
      'link': {
        init: true
      },
      'title': {
        init: true
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        var rssstyle = '' + this.getWidth() ? 'width:' + this.getWidth() : '' + this.getHeight() ? 'height:' + this.getHeight() : '';
        return '<div class="actor"><div class="rss_inline" id="rss_' + this.getPath() + '" style="' + rssstyle + '"></div>';
      },
      _onDomReady: function _onDomReady() {
        cv.plugins.Rss.prototype._onDomReady.base.call(this);

        this.refreshRSS();
      },
      _setupRefreshAction: function _setupRefreshAction() {
        this._timer = new qx.event.Timer(this.getRefresh());

        this._timer.addListener("interval", function () {
          this.refreshRSS();
        }, this);

        this._timer.start();
      },
      refreshRSS: function refreshRSS() {
        var data = cv.data.Model.getInstance().getWidgetData(this.getPath());
        $('#' + this.getPath() + ' .rss_inline').rssfeed(this.getSrc(), data);
      }
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addScripts('plugins/rss/dep/zrssfeed/jquery.zrssfeed.js');
      cv.parser.WidgetParser.addHandler("rss", cv.plugins.Rss);
      cv.ui.structure.WidgetFactory.registerClass("rss", statics);
    }
  });
  cv.plugins.Rss.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rss.js.map?dt=1588445989465