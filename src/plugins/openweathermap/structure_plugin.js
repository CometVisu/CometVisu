/*
 * structure_plugin.js (c) 2015 by Stefan Borchert (stefan@borchert.cc)
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
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
 */

require.config({
  shim: {
    'plugins/openweathermap/owm/jquery.owm': ['jquery']
  }
});

define(['structure_custom', 'css!plugins/openweathermap/openweathermap', 'plugins/openweathermap/owm/jquery.owm'], function() {

  Class('cv.plugin.OpenWeatherMap', {
    isa: cv.structure.pure.AbstractBasicWidget,
    does: cv.role.Refresh,

    augment: {
      getDomString: function () {
        var classes = "widget clearfix text openweathermap";
        if (this.cssClass) {
          classes+=" "+this.cssClass;
        }
        return '<div class="'+classes+'"><div id="owm_' + this.getPath() + '" class="openweathermap_value"></div></div>';
      }
    },

    my : {
      methods: {
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
      }
    },

    has: {
      options: { is: 'ro', init: Joose.I.Object },
      cssClass: { is: 'ro', init: "" }
    },

    after : {
      initialize: function (props) {
        props.refresh = props.refresh * 60;
        this.options = props
      }
    },

    methods: {
      refreshAction: function() {
        var elem = $(this.getDomElement());
        elem.openweathermap(this.options);
        return false;
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("openweathermap", cv.plugin.OpenWeatherMap);
});
