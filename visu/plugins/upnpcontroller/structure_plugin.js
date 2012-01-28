/* structure_plugin.js (c) 2012 by Mark K. [mr dot remy at gmx dot de]
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
 
 
$( 'head' ).append( '<link rel="stylesheet" href="plugins/upnpcontroller/upnpcontroller.css" type="text/css" />' );

var upnpcontroller_uid;


VisuDesign_Custom.prototype.addCreator("upnpcontroller", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "upnpcontroller_" + uniqid();
        upnpcontroller_uid = id;

        var ret_val = $('<div class="widget" />');
        ret_val.addClass( 'upnpcontroller' );
        var label = '<div class="label">' + $p.attr("label") + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"upnpcontroller\" id=\"" + id + "\">loading</div></div>");
        var upnpcontroller = $("#" + id, actor);

		controller = $("<div></div>");
		
		controller.append( "<div id='" + id + "_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>");
		controller.append( "<div id='" + id + "_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>");
		controller.append( "<div id='" + id + "_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>");
		controller.append( "<div id='" + id + "_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>");
		controller.append( "<div style='float: left;'><div id='" + id + "_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>"
					+ "<div id='" + id + "_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>"
					+ "<div id='" + id + "_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>" );
		controller.append( "<div style='float: left;'><div id='" + id + "_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>"
					+ "<div id='" + id + "_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div>" );
		controller.append( "<div style='float: left;'><div id='" + id + "_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>"
					+ "<div id='" + id + "_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>" );

		upnpcontroller.html(controller);

        ret_val.append(label).append(actor);
//        console.log("loaded plugin upnpcontroller");

        upnpcontroller.data("id", id);
        upnpcontroller.data("eventsRegistered", 0);
        upnpcontroller.data("label", $p.attr("label"));
        upnpcontroller.data("refresh", $p.attr("refresh"));
        upnpcontroller.data("player_ip", $p.attr("player_ip_addr"));
        upnpcontroller.data("debug", $p.attr("debug"));
        
        refreshUpnpcontroller(upnpcontroller, {}, false);

        return ret_val;
    },
    attributes: {
    	label: 				{type: "string", required: true},
        player_ip_addr:  	{type: "string", required: true},
        refresh:    		{type: "numeric", required: true},
        debug:      		{type: "list", required: false, list: {'true': "yes", 'false': "no"}},
    },
    content:      false
});


function refreshUpnpcontroller(upnpcontroller, data, oneTimeCall) {
    var upnpcontroller = $(upnpcontroller);

    var playerIp = upnpcontroller.data("player_ip");
    var id = upnpcontroller.data("id");
    var debug = upnpcontroller.data("debug");
    var eventsRegistered = upnpcontroller.data("eventsRegistered");
    var label = upnpcontroller.data("label");
    var refresh = upnpcontroller.data("refresh");

	console.log("debug: " + debug);

	if(debug == 'true'){
		console.log("playerIp: " + playerIp);
	}
 
    function updateContoller( volume, mute, playMode, title, reltime, duration, artist, album){

 		if(mute == 0){
			$('#' + upnpcontroller_uid + '_muteButton').removeClass('switchPressed');
			$('#' + upnpcontroller_uid + '_muteButton').addClass('switchUnpressed');
		}else{
			$('#' + upnpcontroller_uid + '_muteButton').removeClass('switchUnpressed');
			$('#' + upnpcontroller_uid + '_muteButton').addClass('switchPressed');
 		}

 		if(playMode == 'Play'){
			$('#' + upnpcontroller_uid + '_playButton').removeClass('switchUnpressed');
			$('#' + upnpcontroller_uid + '_playButton').addClass('switchPressed');
 		}else{
			$('#' + upnpcontroller_uid + '_playButton').removeClass('switchPressed');
			$('#' + upnpcontroller_uid + '_playButton').addClass('switchUnpressed');
 		}
 		
		$('#' + id + '_muteButton div.value').text(mute);
		$('#' + id + '_playButton div.value').text(playMode);
		$('#' + id + '_volume div.value').text(volume);
		$('#' + id + '_title div.value').text(title);
		$('#' + id + '_artist div.value').text(artist);
		$('#' + id + '_album div.value').text(album);
		$('#' + id + '_time div.value').text(reltime + ' of ' + duration);
		
    }

	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/status.php?player_ip_addr=" + playerIp,
       success: function(data){
     			
				if(debug == 'true'){
    				console.log("volume          : " + data.volume);
    				console.log("reltime         : " + data.reltimeResponse);
    				console.log("durationResponse: " + data.durationResponse);
					console.log("title           : " + data.title);
				}
    			
				updateContoller(data.volume, data.muteState, data.transportState, data.title
								, data.reltimeResponse, data.durationResponse, data.artist, data.album);
		}
	});

	if(eventsRegistered < 2) {
//		console.log("eventsRegistered: " + eventsRegistered);

		$('#' + upnpcontroller_uid + '_muteButton').bind('click', toggleMute);
		$('#' + upnpcontroller_uid + '_playButton').bind('click', togglePlay);
		$('#' + upnpcontroller_uid + '_next').bind('click', callNext);
		$('#' + upnpcontroller_uid + '_prev').bind('click', callPrev);
		$('#' + upnpcontroller_uid + '_volumedown').bind('click', callvolumedown);
		$('#' + upnpcontroller_uid + '_volumeup').bind('click', callvolumeup);

        upnpcontroller.data("eventsRegistered", eventsRegistered + 1);
	}

    //refresh regularly
    if (typeof (refresh) != "undefined" && refresh && oneTimeCall == false) {
	     // reload regularly
	     window.setTimeout(function(upnpcontroller, data) {
	           refreshUpnpcontroller(upnpcontroller, data, false)
	         }, refresh * 1000, upnpcontroller, data);
	 }

    return false;
}

function callvolumedown() {
    console.log("click callvolumedown");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();

    console.log("currentVolume: " + currentVolume);
    
    var volume = Number(currentVolume) - 5;
     
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/volume.php?player_ip_addr=" + playerIp + "&volume=" + volume,
       success: function(data){
    			console.log("data: " + data);
		}
	});
}

function callvolumeup() {
    console.log("click callvolumeup");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();

    console.log("currentVolume: " + currentVolume);
    
    var volume = Number(currentVolume) + 5;
     
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/volume.php?player_ip_addr=" + playerIp + "&volume=" + volume,
       success: function(data){
    			console.log("data: " + data);
		}
	});
}

function callNext() {
    console.log("click next");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
     
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/next.php?player_ip_addr=" + playerIp,
       success: function(data){
    			console.log("data: " + data);
		}
	});
}

function callPrev() {
    console.log("click prev");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
     
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/prev.php?player_ip_addr=" + playerIp,
       success: function(data){
    			console.log("data: " + data);
		}
	});
}

function toggleMute() {
    console.log("click mute");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    
    var muteValue = $('#' + upnpcontroller_uid + '_muteButton div.value').text();
 
 	console.log("current muteValue: " + muteValue);
 	
 	if(muteValue == 0){
 		muteValue = 1;
		$('#' + upnpcontroller_uid + '_muteButton').removeClass('switchUnpressed');
		$('#' + upnpcontroller_uid + '_muteButton').addClass('switchPressed');
	}else{
 		muteValue = 0;
		$('#' + upnpcontroller_uid + '_muteButton').removeClass('switchPressed');
		$('#' + upnpcontroller_uid + '_muteButton').addClass('switchUnpressed');
 	}
    
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/mute.php?mute=" + muteValue + "&player_ip_addr=" + playerIp,
       success: function(data){
    			console.log("data: " + data);
		}
	});
	
	refreshUpnpcontroller(upnpctrl, {}, true);
}

function togglePlay() {
    console.log("click play");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playValue = $('#' + upnpcontroller_uid + '_playButton div.value').text();
	var cmd; 
 
 	console.log("current playValue: " + playValue);
 	
 	if(playValue == 'Play'){
 		cmd = 'pause';
		$('#' + upnpcontroller_uid + '_playButton').removeClass('switchUnpressed');
		$('#' + upnpcontroller_uid + '_playButton').addClass('');
 	}else{
 		cmd = 'play';
		$('#' + upnpcontroller_uid + '_playButton').removeClass('switchPressed');
		$('#' + upnpcontroller_uid + '_playButton').addClass('switchUnpressed');
 	}
    
	 $.ajax({
	   type: "GET",
	   datatype: "JSON",
	   url: "plugins/upnpcontroller/" + cmd + ".php?player_ip_addr=" + playerIp,
       success: function(data){
    			console.log("data: " + data);
		}
	});
	
	refreshUpnpcontroller(upnpctrl, {}, true);	
}

