/* structure_plugin.js (c) 2011 by Michael Markstaller [devel@wiregate.de]
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
 * This plugins integrates google weather into CometVisu.
 */
 
$( 'head' ).append( '<link rel="stylesheet" href="plugins/gweather/gweather.css" type="text/css" />' );

VisuDesign_Custom.prototype.addCreator("gweather", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "gweather_" + uniqid();

        var ret_val = $('<div class="widget clearfix gweather" />');
        ret_val.setWidgetLayout($p);
        var label = '<div class="label">' + page.textContent + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"gweather\" id=\"" + id + "\">loading</div></div>");
        var gweather = $("#" + id, actor);

        if ($p.attr("width")) {
            gweather.css("width", $p.attr("width"));
        }
        if ($p.attr("height")) {
            gweather.css("height", $p.attr("height"));
        }

        ret_val.append(label).append(actor);

        gweather.data("id", id);
        gweather.data("label", page.textContent);
        gweather.data("refresh", $p.attr("refresh"));
        gweather.data("city", $p.attr("city"));
        gweather.data("lang", $p.attr("lang"));
        gweather.data("image_url", $p.attr("image_url"));
        gweather.data("current", $p.attr("current"));
        gweather.data("forecast", $p.attr("forecast"));
        refreshGweather(gweather, {});

        return ret_val;
    }
});

function refreshGweather(gweather, data) {
    var gweather = $(gweather);

    var label = gweather.data("label");
    var refresh = gweather.data("refresh");
    var city = gweather.data("city");
    var lang = gweather.data("lang") || "de";
    var current = gweather.data("current") || true;
    var forecast = gweather.data("forecast") || true;
	 var image_url = gweather.data("image_url") || "http://www.google.com";
	 var childData	= function(selector, arg)
	 {
	 	return selector.find(arg).attr('data');
	 }

    function addForecastDiv( day, condition, temp, icon ){
		daydiv = $("<div class='day'></div>");			
		daydiv.append( "<img src=\""+image_url+icon+"\" />");
		daydiv.append( "<div class='name'>" + day + "</div>" );
		daydiv.append( "<p class='condition'>" + condition + "</p>" );
		daydiv.append( "<p class='temp'>" + temp + "</p>");
		$(gweather).append(daydiv);
    }

	 $.ajax({
	   type: "GET",
	   datatype: "xml",
	   data: "city="+encodeURI(city)+"&lang="+lang,
	   url: "plugins/gweather/gweather.php",
      success: function(data){
			if(eval(current)){
                $(gweather).text('');
				addForecastDiv(
					//$(data).find('forecast_information').find('current_date_time').attr('data'),
					'',
					$(data).find('current_conditions').find('condition').attr('data') + '<br/>' + 
					$(data).find('current_conditions').find('humidity').attr('data') + '<br/>' + 
					$(data).find('current_conditions').find('wind_condition').attr('data'),
					$(data).find('current_conditions').find('temp_c').attr('data') + '&deg;C',
					$(data).find('current_conditions').find('icon').attr('data')
				);
			}
	
			if(eval(forecast)){
				$(data).find('forecast_conditions').each(function(){
					addForecastDiv(
						$(this).find('day_of_week').attr('data'),
						$(this).find('condition').attr('data'),
						$(this).find('low').attr('data') + '&deg;C' + ' - ' + 
						$(this).find('high').attr('data') + '&deg;C',
						$(this).find('icon').attr('data')
					);
				});
			}
		}
	});

    //refresh regularly
    if (typeof (refresh) != "undefined" && refresh) {
	     // reload regularly
	     window.setTimeout(function(gweather, data) {
	           refreshGweather(gweather, data)
	         }, refresh * 1000, gweather, data);
	 }
    return false;
}

