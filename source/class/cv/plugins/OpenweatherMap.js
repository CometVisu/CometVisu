/* structure_plugin.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @since 0.9.0
 * @asset(plugins/openweathermap/owm/jquery.owm.js,plugins/openweathermap/openweathermap.css)
 */
qx.Class.define('cv.plugins.OpenweatherMap', {
  extend: cv.ui.structure.AbstractBasicWidget,
  include: cv.role.Refresh,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    props.refresh = props.refresh * 60;
    this.base(arguments, props);
    this.__options = props;
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'class': { target: 'cssClass' },
        'lang':   { },
        'q':   { },
        'lat':   { },
        'long':   { },
        'units':   { },
        'type':   { },
        'forecastItems':   { },
        'detailItems':   { },
        'appid':   { }
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
      init: ""
    },
    lang: {
      check: "String",
      init: ""
    },
    q: {
      check: "String",
      init: ""
    },
    lat: {
      check: "String",
      init: ""
    },
    "long": {
      check: "String",
      init: ""
    },
    units: {
      check: "String",
      init: ""
    },
    type: {
      check: "String",
      init: ""
    },
    forecastItems: {
      check: "String",
      init: ""
    },
    detailItems: {
      check: "String",
      init: ""
    },
    appid: {
      check: "String",
      init: ""
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __options: null,

    _getInnerDomString: function(){
      var classes = "widget clearfix text openweathermap";
      if (this.getCssClass()) {
        classes+=" "+this.getCssClass();
      }
      return '<div class="'+classes+'"><div id="owm_' + this.getPath() + '" class="openweathermap_value"></div></div>';
    },

    _refreshAction: function() {
      var elem = $(this.getDomElement());
      elem.openweathermap(this.options);
      return false;
    }
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/openweathermap/openweathermap.css');
    loader.addScripts('plugins/openweathermap/owm/jquery.owm.js');
    // register the parser
    cv.xml.Parser.addHandler("openweathermap", cv.plugins.OpenweatherMap);
    cv.ui.structure.WidgetFactory.registerClass("openweathermap", statics);
  }
});
