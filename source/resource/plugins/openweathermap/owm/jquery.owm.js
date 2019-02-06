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

    $.fn.openweathermap = function (options, fn) {

        // Set plugin defaults.
        var defaults = {
            // Base URL to service.
            baseURL: 'https://api.openweathermap.org/data/2.5/',
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
            appid: '',
            // Description text for the widget 
            descrition: 'Description'
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
        if (options.forecastItems > 39) {
            options.forecastItems = 39;
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

    var _process = function (e, options) {
        var html = '';
        var paramsDefault = _parametersFromOptions(options);
        var currentURL = options.baseURL + 'forecast?' + paramsDefault.join('&');
        var forecastItems = paramsDefault;
        // Limit results to specified number of days.
        forecastItems.push('cnt=' + options.forecastItems);
//    var forecastURL = options.baseURL + 'forecast/daily?' + forecastItems.join('&');
        var forecastURL = options.baseURL + 'forecast/?' + forecastItems.join('&');


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
        if ($('ul.forecastDaily', $(e)).length === 0) {
            $('<ul>')
                    .addClass('forecastDaily')
                    .addClass('clearfix')
                    .appendTo($(e));
        }

        // Description text
        if (options.descrition !== '') {
            $('div.openweathermap_value').append("<p>" + options.descrition + "</p>");
        }


        // Load location data.
        $.getJSON(options.baseURL + 'weather?' + paramsDefault.join('&'), function (data) {
            if (data.cod == 200) {
                // Load sunrise/sunset.
                options.sunrise = data.sys.sunrise;
                options.sunset = data.sys.sunset;



                // Fetch data for detailed items.
                _processDataDetailed(e, currentURL, options);
                // Fetch data for 24h forecast items.
                _processDataForecast(e, forecastURL, options);
                // Fetch data for the daily forecast of the next days
                _processDataDaily(e, forecastURL, options);

            } else {
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
            } else {
                $(e).after('<!-- Failed to fetch detailed weather data. -->');
            }
        });
    }

    /**
     * Create a Daily Dataset out of the Data (every 3h)
     * 
     * @param {dataItems} Weather Data from the json File  
     * @param {options} Optionen 
     * 
     */
    var generateDaily = function (dataItems, options) {

        var arrTmp = new Array();
        var minTemp, maxTemp;
        var newDay = false;
        var weather;

        //For every data Item, collect the min/max Values
        $.each(dataItems, function (index, elem) {

            var d = new Date(dataItems[index].dt * 1000);
            d.locale = options.lang;

            if (d.getHours() === 1) {
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

                if (d.getHours() === 13) {
                    weather = dataItems[index].weather;
                }

                if (d.getHours() === 22) {
                    arrTmp.push({day: d.strftime('%a'), min_temp: minTemp, max_temp: maxTemp, weather: weather});
                    newDay = false;
                }
            }
        });

        return arrTmp;
    };

    /**
     * Process forecast weather data for the next hours
     * and generate output.
     * 
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


//                if (!options.forecastToday) {
//                    // Remove first item from list.
//                    dataItems.shift();
//                }
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

                    //Show Only next 24h
                    if (index > 6) {
                        return false;
                    }
                    ;

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
        $('ul.forecast', $(e)).html('');
        if (options.forecastItems === 0) {
            // Forecast is disabled.
            return;
        }
        $.getJSON(url, function (data) {
            if (data.cod == 200) {
                var dataItems = data.list;

                var daily = generateDaily(dataItems, options);

//                if (!options.forecastToday) {
//                    // Remove first item from list.
//                    dataItems.shift();
//                }
                $.each(daily, function (index, elem) {
                    $item = $('<li>');
                    if (index === 0) {
                        $item.addClass('first');
                    }
                    if (index === (dataItems.length - 1)) {
                        $item.addClass('last');
                    }
                    $item.html(jOWM.theme('weatherForecastDailyItem', elem, options));
                    $item.appendTo($('ul.forecastDaily', $(e)));
                });
            } else {
                $(e).after('<!-- Failed to fetch forecast weather data. -->');
            }
        });
    };

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
        if (options.hasOwnProperty('q')) {
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
        output += ' <div class="temperature low">' + jOWM.theme('weatherTemperature', temperature.temp_min, 0, ' °C') + '</div>';
        output += '</div>';
        return output;
    };

    /**
     * Default theme function for forecast the Daily weather item.
     * 
     */
    jOWM.theme.prototype.weatherForecastDailyItem = function (data, options) {

        var weather = data.weather[0];

        var output = '<div class="weather-forecast weather-' + weather.id + ' clearfix">';
        output += ' <div class="day">' + data.day + '</div>';
        output += ' <div class="weather-icon" data-weather-text="' + weather.description + '" data-weather-code="' + weather.id + '"></div>';
        output += ' <div class="temperature high">' + jOWM.theme('weatherTemperature', data.max_temp, 0, ' °C') + '</div>';
        output += ' <div class="temperature low">' + jOWM.theme('weatherTemperature', data.min_temp, 0, ' °C') + '</div>';
        output += '</div>';
        return output;
    };
})(jQuery);
