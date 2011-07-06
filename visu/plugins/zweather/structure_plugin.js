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
 * This plugins integrates jFeed to display RSS-Feeds into CometVisu.
 */
 
// $( 'head' ).append( '<link rel="stylesheet" href="plugins/zweather/zweatherfeed/jquery.zweatherfeed.css" type="text/css" />' );
$( 'head' ).append("<script type=\"text/javascript\" src=\"plugins/zweather/zweatherfeed/jquery.zweatherfeed.min.js\"></script>");

VisuDesign_Custom.prototype.addCreator("zweather", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "zweather_" + uniqid();

        var ret_val = $('<div class="widget" />');
        ret_val.addClass( 'zweather' );
        var label = '<div class="label">' + page.textContent + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"zweather_inline\" id=\"" + id + "\"></div></div>");
        var zweather = $("#" + id, actor);

        if ($p.attr("width")) {
            zweather.css("width", $p.attr("width"));
        }
        if ($p.attr("height")) {
            zweather.css("height", $p.attr("height"));
        }

        ret_val.append(label).append(actor);
        console.log("loaded plugin zweather");

        zweather.data("id", id);
        zweather.data("label", page.textContent);
        zweather.data("refresh", $p.attr("refresh"));
        zweather.data("location", $p.attr("location"));
        console.log(zweather.data("location"));
        refreshZWeather(zweather, {});

        return ret_val;
    },
    attributes: {
        width:      {type: "string", required: false},
        height:     {type: "string", required: false},
        refresh:    {type: "numeric", required: false},
        location:   {type: "string", required: true}
    },
    content: {type: "string", required: true}
});

function refreshZWeather(zweather, data) {
    var zweather = $(zweather);

    var label = zweather.data("label");
    var refresh = zweather.data("refresh");
    var location = zweather.data("location");
    console.log("refresh zweather:" + location); //DEBUG
    //eval needed to convert string true/false to bool?
    jQuery(function() {
			$(zweather).weatherfeed([location]);
	 });
    if (typeof (refresh) != "undefined" && refresh) {
	     // reload regularly
	     window.setTimeout(function(zweather, data) {
	           refreshZWeather(zweather, data)
	         }, refresh * 1000, zweather, data);
	 }

    return false;
}
