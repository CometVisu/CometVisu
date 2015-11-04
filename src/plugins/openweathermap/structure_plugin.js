/**
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
 */

require.config({
  shim: {
    'plugins/openweathermap/owm/jquery.owm': ['jquery']
  }
});

define(['structure_custom', 'css!plugins/openweathermap/openweathermap', 'plugins/openweathermap/owm/jquery.owm'], function(VisuDesign_Custom) {

  VisuDesign_Custom.prototype.addCreator("openweathermap", {
    create : function(page, path) {
      var $p = $(page);
      function uniqid() {
        var newDate = new Date;
        return newDate.getTime();
      }
      var id = "owm_" + uniqid();

      var ret_val = $('<div class="widget clearfix text openweathermap"/>');
      if ($p.attr('class')) {
        ret_val.addClass('custom_'+$p.attr('class'));
      }

      templateEngine.design.setWidgetLayout(ret_val, $p);
      var actor = $('<div id="' + id + '" class="openweathermap_value"></div>');
      ret_val.append(actor);

      var options = {};
      if ($p.attr('lang')) {
        options.lang = $p.attr('lang');
      }
      if ($p.attr('q')) {
        options.q = $p.attr('q');
      }
      else if ($p.attr('lat') && $p.attr('lon')) {
        options.lat = $p.attr('lat');
        options.lon = $p.attr('lon');
      }
      if ($p.attr('units')) {
        options.units = $p.attr('units');
      }
      if ($p.attr('type')) {
        options.type = $p.attr('type');
      }
      if ($p.attr('forecastItems')) {
        options.forecastItems = $p.attr('forecastItems');
      }
      if ($p.attr('detailItems')) {
        options.detailItems = $p.attr('detailItems');
      }
      if ($p.attr('refresh')) {
        options.refresh = parseInt($p.attr('refresh'), 10);
      }
      if ($p.attr('appid')) {
        options.appid = $p.attr('appid');
      }

      refreshWeatherData(actor, options);

      return ret_val;
    }
  });
});

function refreshWeatherData(elem, options) {
  var elem = $(elem);
  jQuery(function() {
    $(elem).openweathermap(options);
  });
  if (typeof(options.refresh) != "undefined" && options.refresh) {
    // Reload regularly.
    window.setTimeout(function(elem, options) {
      refreshWeatherData(elem, options)
    }, options.refresh * 60 * 1000, elem, options);
  }

  return false;
}
