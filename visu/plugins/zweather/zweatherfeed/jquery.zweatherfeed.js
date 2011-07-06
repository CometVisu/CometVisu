/**
 * Plugin: jquery.zWeatherFeed
 * 
 * Version: 1.0.2
 * (c) Copyright 2010, Zazar Ltd
 * 
 * Description: jQuery plugin for display of Yahoo! Weather feeds
 * 
 * History:
 * 1.0.2 - Correction to options / link
 * 1.0.1 - Added hourly caching to YQL to avoid rate limits
 *         Uses Weather Channel location ID and not Yahoo WOEID
 *         Displays day or night background images
 *
 **/

(function($){

	var row = 'odd';

	$.fn.weatherfeed = function(locations, options) {	
	
		// Set pluign defaults
		var defaults = {
			unit: 'c',
			image: true,
			highlow: true,
			wind: true,
			link: true,
			showerror: true
		};  
		var options = $.extend(defaults, options); 
		
		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			
			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;
			var count = locations.length;
			if (count > 10) count = 10;
			var locationid = '';
			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date()
					
			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where location in ("+ locationid +") and u='"+ options.unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			//$.getJSON(api, function(data) {
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {
			
						if (data.query.results.channel.length > 0 ) {
							
							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {
							
								// Create weather feed item
								_callback(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_callback(e, data.query.results.channel, options);
						}
					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror)  $e.html('<p>Weather request failed</p>');
				}
			});

		});
	};

	// Function to each feed item
	var _callback = function(e, feed, options) {
		var $e = $(e);

		// Format feed items
		var wd = feed.wind.direction;
		if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
		var wf = feed.item.forecast[0];
		
		// Determine day or night image
		wpd = feed.item.pubDate;
		n = wpd.indexOf(":");
		tpb = _getTimeAsDate(wpd.substr(n-2,8));
		tsr = _getTimeAsDate(feed.astronomy.sunrise);
		tss = _getTimeAsDate(feed.astronomy.sunset);

		if (tpb>tsr && tpb<tss) { daynight = 'd'; } else { daynight = 'n'; }

		// Add item container
		var html = '<div class="weatherItem '+ row +'"';
		if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight +'.png); background-repeat: no-repeat;"';
		html += '>';
		
		// Add item data
		html += '<div class="weatherCity">'+ feed.location.city +'</div>';
		html += '<div class="weatherTemp">'+ feed.item.condition.temp +'&deg;</div>';
		html += '<div class="weatherDesc">'+ feed.item.condition.text +'</div>';
		if (options.highlow) html += '<div class="weatherRange">High: '+ wf.high +'&deg; Low: '+ wf.low +'&deg;</div>';
		if (options.wind) html += '<div class="weatherWind">Wind: '+ wd +' '+ feed.wind.speed + feed.units.speed +'</div>';
		if (options.link) html += '<div class="weatherLink"><a href="'+ feed.item.link +'">Read full forecast</a></div>';
		
		html += '</div>';

		// Alternate row classes
		if (row == 'odd') { row = 'even'; } else { row = 'odd';	}
		
		$e.append(html);
	};

	// Get time string as date
	var _getTimeAsDate = function(t) {
		
		d = new Date();
		r = new Date(d.toDateString() +' '+ t);

		return r;
	};
})(jQuery);
