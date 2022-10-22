/* owm_core.js 
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


var jOWM = jOWM || {};
(function ($) {

    $.fn.openweathermap = function (options, fn) {

        // Set plugin defaults.
        var defaults = {
            // Base URL to service.
            baseURL: 'https://api.openweathermap.org/data/2.5/',
            // Number of items to show detailed data for (0...1).
            detailItems: 1,
            // Number of items in 24h forecast (0..8).
            forecast24hItems: 8,
            // Number of items in Daily forecast (0..4).
            forecastDailyItems: 4,
            // show sunrise/sunsset
            showSunrise: "true",
            // Include today in forecast?
            forecastToday: true,
            // Default units.
            units: 'metric',
            // Type ('exact', 'like').
            type: 'like',
            // Refresh interval in minutes.
            refresh: 30,
            // App-ID needed to access the service.
            appid: '',
            // Description text for the widget 
            description: ''
        };
        var options = $.extend(defaults, options);
        // Sanitize options.
        options.detailItems = parseInt(options.detailItems, 10);
        if (options.detailItems < 0) {
            options.detailItems = 0;
        }
        if (options.detailItems > 1) {
            options.detailItems = 1;
        }
        options.forecast24hItems = parseInt(options.forecast24hItems, 10);
        if (options.forecast24hItems < 0) {
            options.forecast24hItems = 0;
        }
        if (options.forecast24hItems > 8) {
            options.forecast24hItems = 8;
        }
        options.forecastDailyItems = parseInt(options.forecastDailyItems, 10);
        if (options.forecastDailyItems < 0) {
            options.forecastDailyItems = 0;
        }
        if (options.forecastDailyItems > 4) {
            options.forecastDailyItems = 4;
        }
        if (options.showSunrise !== "false") {
            options.showSunrise = "true";
        }

        // extend locales by German and French
        Date.ext.locales['de'] = {
            a: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            A: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            b: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            B: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        };
        return this.each(function (i, e) {
            $element = $(e);
            if (!$element.hasClass('jowm')) {
                $element.addClass('jowm');
            }
            // Process element.
            _process(e, options);
        });
    };
    /**
     * Mainfunction which build the whole Widget
     * 
     * @param {type} e
     * @param {type} options
     * @returns {undefined}
     */
    var _process = function (e, options) {
        var html = '';
        var paramsDefault = _parametersFromOptions(options);
        var currentURL = options.baseURL + 'weather?' + paramsDefault.join('&');
        var forecastURL = options.baseURL + 'forecast/?' + paramsDefault.join('&') + '&cnt=8';
        var forecastDailyURL = options.baseURL + 'forecast/?' + paramsDefault.join('&') + '&cnt=39';
        //detailed current weather 
        if ($('ul.detailed', $(e)).length === 0) {
            $('<ul>')
                    .addClass('detailed')
                    .addClass('clearfix')
                    .appendTo($(e).children(":first"));
        }

        if (options.forecast24hItems > 0) {
            //forecast for the next 24h
            if ($('ul.forecast', $(e)).length === 0) {
                $('<ul>')
                        .addClass('forecast')
                        .addClass('clearfix')
                        .appendTo($(e).children(":first"));
            }
        }
        if (options.forecastDailyItems > 0) {
            //forecast for the next days
            if ($('ul.forecastDaily', $(e)).length === 0) {
                $('<ul>')
                        .addClass('forecastDaily')
                        .addClass('clearfix')
                        .appendTo($(e).children(":first"));
            }
        }


        // Load location data.
        _request(options.baseURL + 'weather?' + paramsDefault.join('&'), function (data) {
            if (data.cod == 200) {
                // Load sunrise/sunset/cityname
                options.sunrise = data.sys.sunrise;
                options.sunset = data.sys.sunset;
                options.cityname = data.name;
                options.id = data.id;
                // Description text
                if (options.description === '') {
                    $('div.openweathermap_value').html("<p>" + options.cityname + "</p>");
                } else if (options.description === 'false') {
                    // no text
                    $('div.openweathermap_value').parent().css('display', 'none');
                } else {
                    $('div.openweathermap_value').html("<p>" + options.description + "</p>");
                }
                // Fetch data for detailed items.
                _processDataDetailed(e, currentURL, options);
                // Fetch data for 24h forecast items.
                if (options.forecast24hItems > 0) {
                    _processDataForecast(e, forecastURL, options);
                }

                // Fetch data for the daily forecast of the next days
                if (options.forecastDailyItems > 0) {
                    _processDataDaily(e, forecastDailyURL, options);
                }

            } else {
                $(e).after('<!-- Failed to fetch detailed weather data. -->');
            }
        });
    };
    /**
     * Process detailed weather data and generate output.
     * 
     */
    var _processDataDetailed = function (e, url, options) {
        // Clear old markup.
        $('ul.detailed', $(e)).html('');
        if (options.detailItems === 0) {
            // Detailed items are disabled.
            return;
        }
        _request(url, function (data) {
            if (data.cod == 200) {

                $item = $('<li>');
                if (data.dt < options.sunrise || data.dt > options.sunset) {
                    $item.addClass('night');
                }
                $item.addClass('first');
                $item.addClass('last');
                $item.html(jOWM.theme('weatherDetailItem', data, options));
                $item.appendTo($('ul.detailed', $(e)));
            } else {
                $(e).after('<!-- Failed to fetch detailed weather data. -->');
            }
        });
        if (options.showSunrise === "true") {
            //greate sunrise/sunset html
            var html = _proccessSunrise(options);
            $item = $(html);
            $item.appendTo($('ul.detailed', $(e)));
          
        }
    };
    /**
     * Process forecast weather data for the next 24 hours
     * and generate output.
     * 
     */
    var _processDataForecast = function (e, url, options) {
        // Clear old markup.
        $('ul.forecast', $(e)).html('');
        // Insert line
        $('ul.forecast', $(e)).append('<div class="separationLine clearfix">');
        if (options.forecast24hItems === 0) {
            // Forecast is disabled.
            return;
        }
        _request(url, function (data) {
            if (data.cod == 200) {
                var dataItems = data.list;
                $.each(dataItems, function (index, elem) {
                    if (index < (options.forecast24hItems)) {
                        $item = $('<li>');
                        // use night icon 
                        if (elem.dt < options.sunrise || elem.dt > options.sunset) {
                            $item.addClass('night');
                        }
                        if (index === 0) {
                            $item.addClass('first');
                        }
                        if (index === (options.forecast24hItems - 1)) {
                            $item.addClass('last');
                        }
                        $item.html(jOWM.theme('weatherForecastItem', elem, options));
                        $item.appendTo($('ul.forecast', $(e)));

                    }
                });
            } else {
                $(e).after('<!-- Failed to fetch forecast weather data. -->');
            }
        });
    };
    /**
     * Process forecast weather data for the next Days
     * and generate output.
     * 
     */
    var _processDataDaily = function (e, url, options) {
        // Clear old markup.
        $('ul.forecastDaily', $(e)).html('');
        // Insert Line
        $('ul.forecastDaily', $(e)).append('<div class="separationLine clearfix">');
        if (options.forecastDailyItems === 0) {
            // Forecast is disabled.
            return;
        }
        _request(url, function (data) {
            if (data.cod == 200) {
                var dataItems = data.list;
                //create Daily Data out of json
                var daily = _generateDaily(dataItems, options);
                //create legend
                var output = '<li><div class="weather-forecast weather-thermo clearfix">';
                output += ' <div class="day">-</div>';
                output += ' <div class="weather-icon legend" ></div>';
                output += ' <div class="temperature high">' + "max" + '</div>';
                output += ' <div class="temperature low">' + "min" + '</div>';
                output += '</div></li>';
                $item = $('<li>');
                $item.append(output);
                $item.appendTo($('ul.forecastDaily', $(e)));
                //create daily weather
                $.each(daily, function (index, elem) {
                    if (index < (options.forecastDailyItems)) {
                        $item = $('<li>');
                        if (index === 0) {
                            $item.addClass('first');
                        }
                        if (index === (options.forecastDailyItems - 1)) {
                            $item.addClass('last');
                        }
                        $item.html(jOWM.theme('weatherForecastDailyItem', elem, options));
                        $item.appendTo($('ul.forecastDaily', $(e)));
                    }
                });
            } else {
                $(e).after('<!-- Failed to fetch forecast weather data. -->');
            }
        });
    };
    /**
     * Dislpay the sunrise/sunset time inside the plugin
     *  
     * @param {object} options
     * @returns {string} html code
     */
    function _proccessSunrise(options) {

        //time sunrise
        var d = new Date(options.sunrise * 1000);
        var output = '<li class="sunrise-sunset"><div class="weather-forecast weather-sunrise clearfix" style="float: left;">';
        output += '<div class="weather-icon"></div>';
        output += '<div class="sunrise-sunset">' + d.strftime('%H:%M') + '</div> </div>';
        //time sunset
        d = new Date(options.sunset * 1000);
        output += '<div class="weather-forecast weather-sunset clearfix" style="float: left;">';
        output += '<div class="weather-icon"></div>';
        output += '<div class="sunrise-sunset">' + d.strftime('%H:%M') + '</div> </div></li>';
        return output;
    }

    /**
     * Create a Daily Dataset out of the hourly (every 3h) dataset
     * 
     * @param {dataItems} dataItems Weather Data from the json File  
     * @param {object} options Optionen 
     * @returns {Array} Weather Data fo each day
     */
    function _generateDaily(dataItems, options) {

        var arrDailyWeather = new Array();
        var minTemp, maxTemp;
        var newDay = false;
        var weather;
        //For every data Item, collect the min/max Values
        $.each(dataItems, function (index, elem) {

            var d = new Date(dataItems[index].dt * 1000);
            d.locale = options.lang;
            if (d.getHours() < 3) {
                minTemp = dataItems[index].main.temp_min;
                maxTemp = dataItems[index].main.temp_max;
                newDay = true;
            } else if (newDay) {
                if (minTemp > dataItems[index].main.temp_min) {
                    minTemp = dataItems[index].main.temp_min;
                }

                if (maxTemp < dataItems[index].main.temp_max) {
                    maxTemp = dataItems[index].main.temp_max;
                }
                //use icon from midday
                if ((d.getHours() > 10) && (d.getHours() < 14)) {
                    weather = dataItems[index].weather;
                }
                //at the end of the day do your calulations
                if (d.getHours() >= 21) {
                    arrDailyWeather.push({day: d.strftime('%a'), min_temp: minTemp, max_temp: maxTemp, weather: weather});
                    newDay = false;
                }
            }
        });
        return arrDailyWeather;
    }

    /**
     * Helper function to create URL parameters from options.
     *
     * @param options
     *   List of widget options.
     */
    var _parametersFromOptions = function (options) {
        var items = [];
        if (options.hasOwnProperty('lang')) {
            items.push('lang=' + options.lang);
        }
        if (options.hasOwnProperty('owID')) {
            items.push('id=' + options.owID);
        } else if (options.hasOwnProperty('q')) {
            items.push('q=' + options.q);
        } else if (options.hasOwnProperty('lat') && options.hasOwnProperty('lon')) {
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
    };

    var _request = function (url, callback) {
       var req = new qx.io.request.Xhr(url);
       req.setAccept("application/json");
       req.addListener("success", function (ev) {
           var req = ev.getTarget();
           var data = req.getResponse();
           if (typeof data === 'string') {
               data = JSON.parse(data);
           }
           callback(data);
       }, this);
       req.addListener("error", function (ev) {
           console.log('error requesting', url, ev.getData());
       }, this);
       req.send();
    };

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
     * 
     */
    jOWM.theme.prototype.weatherDetailItem = function (data, options) {
        var weather = data.weather[0];
        //Temperaturen übernehmen
        var temperature = data.main;
        //Datum umwandeln
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
     * Default theme function for forecast the hourly weather item.
     * 
     */
    jOWM.theme.prototype.weatherForecastItem = function (data, options) {
        var weather = data.weather[0];
        var temperature = data.main;
        var d = new Date(data.dt * 1000); // We need ms, not s!
        d.locale = options.lang;
        var output = '<div class="weather-forecast weather-' + weather.id + ' clearfix">';
        output += ' <div class="day">' + d.strftime('%H:%M') + '</div>';
        output += ' <div class="weather-icon" data-weather-text="' + weather.description + '" data-weather-code="' + weather.id + '"></div>';
        output += ' <div class="temperature high">' + jOWM.theme('weatherTemperature', temperature.temp_max, 0, ' °C') + '</div>';
        output += '</div>';
        return output;
    };
    /**
     * Default theme function for forecast the Daily weather item.
     * 
     */
    jOWM.theme.prototype.weatherForecastDailyItem = function (data, options) {

        var weather = data.weather[0];
        var output = '<div class="weather-forecast weather-' + weather.id + ' ">';
        output += ' <div class="day">' + data.day + '</div>';
        output += ' <div class="weather-icon" data-weather-text="' + weather.description + '" data-weather-code="' + weather.id + '"></div>';
        output += ' <div class="temperature high">' + jOWM.theme('weatherTemperature', data.max_temp, 0, ' °C') + '</div>';
        output += ' <div class="temperature low">' + jOWM.theme('weatherTemperature', data.min_temp, 0, ' °C') + '</div>';
        output += '</div>';
        return output;
    };
})(jQuery);
