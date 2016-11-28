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
