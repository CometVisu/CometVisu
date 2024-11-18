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
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
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
   * This plugins displays RSS-Feeds in the CometVisu.
   *
   * <pre class="sunlight-highlight-xml">
   *   &lt;rss src=&quot;/visu/plugins/rss/rsslog.php&quot; refresh=&quot;300&quot; link=&quot;false&quot; title=&quot;false&quot;&gt;&lt;/rss&gt;
   *   &lt;rss src=&quot;http://www.tagesschau.de/xml/rss2&quot; refresh=&quot;300&quot;&gt;Test API&lt;/rss&gt;
   *   &lt;rss src=&quot;/visu/plugins/rss/tagesschau-rss2.xml&quot; refresh=&quot;300&quot; header=&quot;true&quot; date=&quot;true&quot;&gt;&lt;/rss&gt;
   * </pre>
   *
   * @author Michael Markstaller
   * @since 2011
   * @ignore(RSSParser)
   * @asset(plugins/rss/rss-parser.min.js)
   */
  qx.Class.define('cv.plugins.Rss', {
    extend: cv.ui.structure.pure.AbstractWidget,
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
        var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.pure.WidgetParser.parseRefresh(xml, path);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          src: {},
          width: {
            "default": ''
          },
          height: {
            "default": ''
          },
          limit: {
            "default": 10
          },
          header: {
            "default": true
          },
          date: {
            "default": true
          },
          content: {
            "default": true
          },
          snippet: {
            "default": true
          },
          showerror: {
            "default": true
          },
          ssl: {
            "default": false
          },
          linktarget: {
            "default": '_new'
          },
          link: {
            "default": true
          },
          title: {
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
        check: 'String',
        init: ''
      },
      width: {
        init: ''
      },
      height: {
        init: ''
      },
      limit: {
        init: 10
      },
      header: {
        init: true
      },
      date: {
        init: true
      },
      content: {
        init: true
      },
      snippet: {
        init: true
      },
      showerror: {
        init: true
      },
      ssl: {
        init: false
      },
      linktarget: {
        init: '_new'
      },
      link: {
        init: true
      },
      title: {
        init: true
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _parser: null,
      _getInnerDomString: function _getInnerDomString() {
        var rssstyle = '' + this.getWidth() ? 'width:' + this.getWidth() : '' + this.getHeight() ? 'height:' + this.getHeight() : '';
        return '<div class="actor"><ul class="rss_inline" style="' + rssstyle + '"></ul>';
      },
      _onDomReady: function _onDomReady() {
        cv.plugins.Rss.superclass.prototype._onDomReady.call(this);
        this._parser = new RSSParser();
        this.refreshRSS();
      },
      _setupRefreshAction: function _setupRefreshAction() {
        var _this = this;
        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener('interval', function () {
          _this.refreshRSS();
        });
        this._timer.start();
      },
      refreshRSS: function refreshRSS() {
        var _this2 = this;
        this._parser.parseURL(this.getSrc(), function (err, feed) {
          var actor = _this2.getActor();
          var target = actor.querySelector('.rss_inline');
          if (err) {
            _this2.error(err);
            if (_this2.getShowerror()) {
              target.textContent = 'ERROR: ' + err;
            }
            return;
          }
          if (_this2.getHeader()) {
            var headline = actor.querySelector(':scope > h3');
            if (!headline) {
              headline = document.createElement('h3');
              actor.insertBefore(headline, actor.firstElementChild);
            }
            headline.textContent = feed.title;
          }
          var elements = target.querySelectorAll(':scope > li');
          for (var i = elements.length; i >= feed.items.length; i--) {
            elements[i].remove();
          }
          var useLink = _this2.getLink();
          var showContent = _this2.getContent();
          var showDate = _this2.getDate();
          feed.items.some(function (entry, i) {
            var elem = target.querySelector(':scope > li[data-row="' + i + '"]');
            var a;
            var content;
            var date;
            if (!elem) {
              elem = document.createElement('li');
              if (useLink) {
                a = document.createElement('a');
                a.setAttribute('target', _this2.getLinktarget());
                elem.appendChild(a);
              }
              if (showContent) {
                content = document.createElement('p');
                content.classList.add('content');
                elem.appendChild(content);
              }
              if (showDate) {
                date = document.createElement('p');
                date.classList.add('date');
                elem.appendChild(date);
              }
              elem.setAttribute('data-row', '' + i);
              target.appendChild(elem);
            } else {
              if (useLink) {
                a = elem.querySelector(':scope > a');
              }
              if (showContent) {
                content = elem.querySelector(':scope > p.content');
              }
              if (showDate) {
                date = elem.querySelector(':scope > p.date');
              }
            }
            if (useLink) {
              a.textContent = entry.title;
              a.setAttribute('href', entry.link);
            } else {
              elem.textContent = entry.title;
            }
            if (showContent) {
              content.innerHTML = _this2.getSnippet() ? entry.contentSnippet : entry.content;
            }
            if (showDate) {
              date.innerText = new Date(entry.isoDate).toLocaleString();
            }
            return i >= _this2.getLimit();
          });
        });
      }
    },
    destruct: function destruct() {
      this._parser = null;
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addScripts('plugins/rss/rss-parser.min.js');
      cv.parser.pure.WidgetParser.addHandler('rss', cv.plugins.Rss);
      cv.ui.structure.WidgetFactory.registerClass('rss', statics);
    }
  });
  cv.plugins.Rss.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rss.js.map?dt=1731948090880