/**
 * Plugin: jquery.OWM
 *
 * jQuery plugin to display data from OpenWeatherMap.
 *
 * Version: 0.0.1
 * Copyright (c) 2015, Stefan Borchert
 *
 * Licensed under the GPLv3 license.
**/

var jOWM = jOWM || {};

(function ($) {

  $.fn.openweathermap = function(options, fn) {

    // Set plugin defaults.
    var defaults = {
      // Base URL to service.
      baseURL: 'http://api.openweathermap.org/data/2.5/',
      // Number of items to show detailed data for (0..4).
      detailItems: 4,
      // Number of items in forecast (0..16).
      forecastItems: 5,
      // Include today in forecast?
      forecastToday: true,
      // Default units.
      units: 'metric',
      // Type ('exact', 'like').
      type: 'like',
      // Refresh interval in minutes.
      refresh: 30,
      // App-ID needed to access the service.
      appid: ''
    };

    var options = $.extend(defaults, options);

    // Sanitize options.
    options.detailItems = parseInt(options.detailItems, 10);
    if (options.detailItems < 0) {
      options.detailItems = 0;
    }
    if (options.detailItems > 4) {
      options.detailItems = 4;
    }
    options.forecastItems = parseInt(options.forecastItems, 10);
    if (options.forecastItems < 0) {
      options.forecastItems = 0;
    }
    if (options.forecastItems > 16) {
      options.forecastItems = 16;
    }

    // extend locales by German and French
    Date.ext.locales['de'] = {
      a: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      A: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      b: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      B: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    };

    return this.each(function(i, e) {
      $element = $(e);

      if (!$element.hasClass('jowm')) {
        $element.addClass('jowm');
      }

      // Process element.
      _process(e, options);

    });

  };

  var _process = function (e, options) {
    var html = '';
    var paramsDefault = _parametersFromOptions(options);
    var currentURL = options.baseURL + 'forecast?' + paramsDefault.join('&');
    var forecastItems = paramsDefault;
    // Limit results to specified number of days.
    forecastItems.push('cnt=' + options.forecastItems);
    var forecastURL = options.baseURL + 'forecast/daily?' + forecastItems.join('&');

    if ($('ul.detailed', $(e)).length === 0) {
      $('<ul>')
        .addClass('detailed')
        .addClass('clearfix')
        .appendTo($(e));
    }
    if ($('ul.forecast', $(e)).length === 0) {
      $('<ul>')
        .addClass('forecast')
        .addClass('clearfix')
        .appendTo($(e));
    }

    // Load location data.
    $.getJSON(options.baseURL + 'weather?' + paramsDefault.join('&'), function (data) {
      if (data.cod == 200) {
        // Load sunrise/sunset.
        options.sunrise = data.sys.sunrise;
        options.sunset = data.sys.sunset;

        // Fetch data for detailed items.
        _processDataDetailed(e, currentURL, options);
        // Fetch data for forecast items.
        _processDataForecast(e, forecastURL, options);
      }
      else {
        $(e).after('<!-- Failed to fetch detailed weather data. -->');
      }
    });

  }

  /**
   * Process detailed weather data and generate output.
   */
  var _processDataDetailed = function (e, url, options) {
    // Clear old markup.
    $('ul.detailed', $(e)).html('');
    if (options.detailItems === 0) {
      // Detailed items are disabled.
      return;
    }
    $.getJSON(url, function (data) {
      if (data.cod == 200) {
        var dataItems = data.list.slice(0, options.detailItems);
        $.each(dataItems, function (index, elem) {
          $item = $('<li>');
          if (elem.dt < options.sunrise || elem.dt > options.sunset) {
            $item.addClass('night');
          }
          if (index === 0) {
            $item.addClass('first');
          }
          if (index === (dataItems.length - 1)) {
            $item.addClass('last');
          }
          $item.html(jOWM.theme('weatherDetailItem', elem, options));
          $item.appendTo($('ul.detailed', $(e)));
        });
      }
      else {
        $(e).after('<!-- Failed to fetch detailed weather data. -->');
      }
    });
  }

  /**
   * Process forecast weather data and generate output.
   */
  var _processDataForecast = function (e, url, options) {
    // Clear old markup.
    $('ul.forecast', $(e)).html('');
    if (options.forecastItems === 0) {
      // Forecast is disabled.
      return;
    }
    $.getJSON(url, function (data) {
      if (data.cod == 200) {
        var dataItems = data.list;
        if (!options.forecastToday) {
          // Remove first item from list.
          dataItems.shift();
        }
        $.each(dataItems, function (index, elem) {
          $item = $('<li>');
          if (index === 0) {
            $item.addClass('first');
          }
          if (index === (dataItems.length - 1)) {
            $item.addClass('last');
          }
          $item.html(jOWM.theme('weatherForecastItem', elem, options));
          $item.appendTo($('ul.forecast', $(e)));
        });
      }
      else {
        $(e).after('<!-- Failed to fetch forecast weather data. -->');
      }
    });
  }

  /**
   * Helper function to create URL parameters from options.
   *
   * @param options
   *   List of widget options.
   */
  var _parametersFromOptions = function(options) {
    var items = [];
    if (options.hasOwnProperty('lang')) {
      items.push('lang=' + options.lang);
    }
    if (options.hasOwnProperty('q')) {
      items.push('q=' + options.q);
    }
    else if (options.hasOwnProperty('lat') && options.hasOwnProperty('lon')) {
      items.push('lat=' + options.lat);
      items.push('lon=' + options.lon);
    }
    if (options.hasOwnProperty('units')) {
      items.push('units=' + options.units);
    }
    if (options.hasOwnProperty('type')) {
      items.push('type=' + options.type);
    }
    if (options.hasOwnProperty('appid')) {
      items.push('appid=' + options.appid);
    }
    return items;
  }

  /**
   * Generic theme function.
   */
  jOWM.theme = function (func) {
    var args = Array.prototype.slice.apply(arguments, [1]);

    return (jOWM.theme[func] || jOWM.theme.prototype[func]).apply(this, args);
  };

  /**
   * Default theme function for weather temperature.
   */
  jOWM.theme.prototype.weatherTemperature = function (temperature, precision, suffix) {
    suffix = suffix || '°';
    return parseFloat(temperature).toFixed(precision) + suffix;
  }

  /**
   * Default theme function for detailed weather item.
   */
  jOWM.theme.prototype.weatherDetailItem = function (data, options) {
    var weather = data.weather[0];
    var temperature = data.main;
    var d = new Date(data.dt * 1000); // We need ms, not s!
    d.locale = options.lang;

    var output = '<div class="weather-detailed weather-' + weather.id + ' clearfix">';
    output += ' <div class="weather">';
    output += '  <span class="weather-icon" data-weather-text="' + weather.description + '" data-weather-code="' + weather.id + '"></span>';
    output += ' </div>';
    output += ' <div class="temperature">' + jOWM.theme('weatherTemperature', temperature.temp, 1) + '</div>';
    output += '</div>';
    return output;
  };

  /**
   * Default theme function for forecast weather item.
   */
  jOWM.theme.prototype.weatherForecastItem = function (data, options) {
    var weather = data.weather[0];
    var temperature = data.temp;
    var d = new Date(data.dt * 1000); // We need ms, not s!
    d.locale = options.lang;

    var output = '<div class="weather-forecast weather-' + weather.id + ' clearfix">';
    output += ' <div class="day">' + d.strftime('%a') + '</div>';
    output += ' <div class="weather-icon" data-weather-text="' + weather.description + '" data-weather-code="' + weather.id + '"></div>';
    output += ' <div class="temperature high">' + jOWM.theme('weatherTemperature', temperature.max, 0, ' °C') + '</div>';
    output += ' <div class="temperature low">' + jOWM.theme('weatherTemperature', temperature.max, 0, ' °C') + '</div>';
    output += '</div>';
    return output;
  };

})(jQuery);
