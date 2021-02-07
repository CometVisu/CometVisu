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
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.TemplateEngine": {
        "construct": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "cv.parser.WidgetParser": {
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

  /* OpenweatherMap.js 
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
   * This plugins integrates OpenWeatherMap data.
   *
   * @author Stefan Borchert (stefan@borchert.cc)
   * @author Matthias
   * @since 0.9.0
   * @asset(plugins/openweathermap/owm_core.js)
   * @asset(plugins/openweathermap/owm_basic_style.css)
   * @asset(plugins/openweathermap/owm_weathericon.css)
   */
  qx.Class.define('cv.plugins.OpenweatherMap', {
    extend: cv.ui.structure.AbstractWidget,
    include: cv.ui.common.Refresh,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      props.refresh = props.refresh * 60;
      cv.ui.structure.AbstractWidget.constructor.call(this, props);
      this.__P_12_0 = {};
      Object.keys(props).forEach(function (key) {
        if (props[key]) {
          this.__P_12_0[key] = props[key];
        }
      }, this);

      if (cv.TemplateEngine.getInstance().isDomFinished()) {
        this._refreshAction();
      } else {
        qx.event.message.Bus.subscribe("setup.dom.finished", function () {
          // init once
          this._refreshAction();
        }, this);
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
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseRefresh(xml, path);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'class': {
            target: 'cssClass'
          },
          'lang': {},
          'owID': {},
          'q': {},
          'lat': {},
          'lon': {},
          'units': {},
          'type': {},
          'forecast24hItems': {},
          'forecastDailyItems': {},
          'detailItems': {},
          'showSunrise': {},
          'appid': {},
          'description': {}
        };
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      cssClass: {
        check: "String",
        nullable: true
      },
      lang: {
        check: "String",
        nullable: true
      },
      owID: {
        check: "String",
        nullable: true
      },
      q: {
        check: "String",
        nullable: true
      },
      lat: {
        check: "String",
        nullable: true
      },
      lon: {
        check: "String",
        nullable: true
      },
      units: {
        check: "String",
        nullable: true
      },
      type: {
        check: "String",
        nullable: true
      },
      forecast24hItems: {
        check: "String",
        nullable: true
      },
      forecastDailyhItems: {
        check: "String",
        nullable: true
      },
      showSunrise: {
        check: "String",
        nullable: true
      },
      detailItems: {
        check: "String",
        nullable: true
      },
      appid: {
        check: "String",
        nullable: true
      },
      description: {
        check: "String",
        nullable: true
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_12_0: null,
      _getInnerDomString: function _getInnerDomString() {
        var classes = "widget clearfix text openweathermap";

        if (this.getCssClass()) {
          classes += " " + this.getCssClass();
        }

        return '<div class="' + classes + '"><div id="owm_' + this.getPath() + '" class="openweathermap_value"></div></div>';
      },
      _setupRefreshAction: function _setupRefreshAction() {
        this._timer = new qx.event.Timer(this.getRefresh());

        this._timer.addListener('interval', this._refreshAction, this);

        this._timer.start(); // call once immediately


        this._refreshAction();
      },
      _refreshAction: function _refreshAction() {
        var elem = $(this.getDomElement());
        elem.openweathermap(this.__P_12_0);
      }
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addStyles('plugins/openweathermap/owm_basic_style.css');
      loader.addStyles('plugins/openweathermap/owm_weathericon.css');
      loader.addScripts('plugins/openweathermap/owm_core.js'); // register the parser

      cv.parser.WidgetParser.addHandler("openweathermap", cv.plugins.OpenweatherMap);
      cv.ui.structure.WidgetFactory.registerClass("openweathermap", statics);
    }
  });
  cv.plugins.OpenweatherMap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenweatherMap.js.map?dt=1612690386044