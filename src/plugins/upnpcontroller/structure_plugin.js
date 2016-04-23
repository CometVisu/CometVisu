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
 
define( ['structure_custom', 'css!plugins/upnpcontroller/upnpcontroller' ], function( VisuDesign_Custom ) {
  "use strict";

  var upnpcontroller_uid;
  var upnpcontroller_trace_flag;
  var upnpcontroller_song_process_rel;


  VisuDesign_Custom.prototype.addCreator("upnpcontroller", {
    create: function( page, path ) {
      var $p = $(page);

      function uniqid() {
        var newDate = new Date;
        return newDate.getTime();
      }

      var id = "upnpcontroller_" + uniqid();
      upnpcontroller_uid = id;
        
      var classes = templateEngine.design.setWidgetLayout( $p, path );
      var ret_val = '<div class="widget upnpcontroller '+(classes?classes:'')+'">';
      ret_val += '<div class="label">' + $p.attr("label") + '</div>';
      ret_val += "<div class=\"actor\"><div class=\"upnpcontroller\" id=\"" + id + "\">";
      //        var upnpcontroller = $("#" + id, actor);

      var controller = "<div>";
        
      var data = templateEngine.widgetDataInsert( path, {
          "id": id,
          "eventsRegistered": 0,
          "label": $p.attr("label"),
          "refresh": $p.attr("refresh"),
          "player_ip": $p.attr("player_ip_addr"),
          "debug": $p.attr("debug"),
          "player_port": ($p.attr("player_port") != undefined) ? $p.attr("player_port") : 1440
        });
            
      controller+="<div id='" + id + "_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>";
      controller+="<div id='" + id + "_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>";
      controller+="<div id='" + id + "_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>";
      controller+="<div id='" + id + "_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>";
      controller+="<div style='float: left;'><progress id='" + id + "_progress'  max='100' value='0'></progress></div>";
      controller+="<div style='float: left;'><div id='" + id + "_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>"
                  + "<div id='" + id + "_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>"
                  + "<div id='" + id + "_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>";
      controller+="<div style='float: left;'><div id='" + id + "_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>"
                  + "<div id='" + id + "_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div></div>";
      controller+="<div style='float: left;'><div id='" + id + "_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>"
                  + "<div id='" + id + "_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>";
      controller+="<div style='float: left;'><div id='" + id + "_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>";
      controller+="<div style='float: left;'><div id='" + id + "_playlistsresult'><div class='value'></div></div></div>";

      controller+="</div>";
        
      ret_val+=controller+"</div></div>";

      ret_val +="</div>";
      //        console.log("loaded plugin upnpcontroller");
      upnpcontroller_trace_flag = $p.attr("debug");
      templateEngine.postDOMSetupFns.push(function() {
      refreshUpnpcontroller(path, $("#"+id), {}, false);
    });

      return ret_val;
    }
  });


  function refreshUpnpcontroller(path, upnpcontroller, data, oneTimeCall) {
    var upnpcontroller = $(upnpcontroller);
    var data = templateEngine.widgetDataGet(path);
    var playerIp = data.player_ip;
    var playerPort = data.player_port;
    var id = data.id;
    var eventsRegistered = data.eventsRegistered;
    var label = data.label;
    var refresh = data.refresh;

    trace("debug     : " + upnpcontroller_trace_flag);
    trace("playerIp  : " + playerIp);
    trace("playerPort: " + playerPort);
 
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
        
      upnpcontroller_song_process_rel = calculateSongProcessed(reltime, duration);
      trace("song_process_rel: " + upnpcontroller_song_process_rel);
      $('#' + id + '_progress').attr({value: upnpcontroller_song_process_rel});
        
    }

    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/status.php?player_ip_addr=" + playerIp + "&port=" + playerPort,
      success: function(data){
                 
        if(upnpcontroller_trace_flag == 'true'){
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
      //        console.log("eventsRegistered: " + eventsRegistered);

      $('#' + upnpcontroller_uid + '_muteButton').bind('click', toggleMute);
      $('#' + upnpcontroller_uid + '_playButton').bind('click', togglePlay);
      $('#' + upnpcontroller_uid + '_next').bind('click', callNext);
      $('#' + upnpcontroller_uid + '_prev').bind('click', callPrev);
      $('#' + upnpcontroller_uid + '_volumedown').bind('click', callvolumedown);
      $('#' + upnpcontroller_uid + '_volumeup').bind('click', callvolumeup);
      $('#' + upnpcontroller_uid + '_getplaylists').bind('click', callgetplaylists);

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

  function calculateSongProcessed(reltime, duration) {
    var result = 0;
    var secondsTotal = 0;
    var secondsProcessed = 0;
    trace("calculateSongProcessed");
    
    durationParts = duration.split(':');
    secondsTotal = Number(durationParts[2]) + Number(durationParts[1]) * 60 + Number(durationParts[0]) * 60 * 60; 
    reltimeParts = reltime.split(':');
    secondsProcessed = Number(reltimeParts[2]) + Number(reltimeParts[1]) * 60 + Number(reltimeParts[0]) * 60 * 60; 
    trace("secondsTotal    : " + secondsTotal);
    trace("secondsProcessed: " + secondsProcessed);
    
    result = Math.floor(secondsProcessed * 100 / secondsTotal);
    
    return result;
  }

  function callgetplaylists() {
    trace("click callgetplaylists");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");
    var currentValue= $('#' + upnpcontroller_uid + '_getplaylists').attr('value');
    
    trace("currentValue: " + currentValue);
    trace("playerPort  : " + playerPort);
     
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/playlists.php?player_ip_addr=" + playerIp,
      success: function(data){
        var playlists = '';
       
        trace("totalMatches: " + data.totalMatches);
                
        for(var i = 0; i < data.playLists.length; i++){
          playlists += "<a href='" 
                      + "plugins/upnpcontroller/selectplaylist.php?player_ip_addr=" + playerIp 
                      + "&listurl=" + data.playLists[i].urlenc  + "&port=" + playerPort + "'>" 
                      + data.playLists[i].name + "</a></br>";

          if(upnpcontroller_trace_flag == 'true'){
            console.log("name: " + data.playLists[i].name);
            console.log("url: " + data.playLists[i].url);
          }
        }
                
        if(currentValue != 'pressed'){
          $('#' + upnpcontroller_uid + '_playlistsresult div.value').html(playlists);
          $('#' + upnpcontroller_uid + '_getplaylists').attr({value: 'pressed'});
          $('#' + upnpcontroller_uid + '_getplaylists').removeClass('switchUnpressed');
          $('#' + upnpcontroller_uid + '_getplaylists').addClass('switchPressed');
        }else{
          $('#' + upnpcontroller_uid + '_playlistsresult div.value').text('');
          $('#' + upnpcontroller_uid + '_getplaylists').attr({value: 'unpressed'});
          $('#' + upnpcontroller_uid + '_getplaylists').removeClass('switchPressed');
          $('#' + upnpcontroller_uid + '_getplaylists').addClass('switchUnpressed');
        }

                
      }
    });
  }

  function callvolumedown() {
    trace("click callvolumedown");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");
    var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();

    trace("currentVolume: " + currentVolume);
    trace("playerPort  : " + playerPort);
   
    var volume = Number(currentVolume) - 5;
     
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/volume.php?player_ip_addr=" + playerIp + "&volume=" + volume + "&port=" + playerPort,
      success: function(data){
        console.log("data: " + data);
      }
    });
  }

  function callvolumeup() {
    trace("click callvolumeup");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");
    var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();

    trace("currentVolume: " + currentVolume);
    trace("playerPort  : " + playerPort);
     
    var volume = Number(currentVolume) + 5;
     
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/volume.php?player_ip_addr=" + playerIp + "&volume=" + volume + "&port=" + playerPort,
      success: function(data){
        trace("data: " + data);
      }
    });
  }

  function callNext() {
    trace("click next");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");

    trace("playerPort  : " + playerPort);
     
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/next.php?player_ip_addr=" + playerIp + "&port=" + playerPort,
      success: function(data){
        trace("data: " + data);
      }
    });
  }

  function callPrev() {
    trace("click prev");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");

    trace("playerPort  : " + playerPort);
     
    $.ajax({
      type: "GET",
      datatype: "JSON",
      url: "plugins/upnpcontroller/prev.php?player_ip_addr=" + playerIp + "&port=" + playerPort,
      success: function(data){
        trace("data: " + data);
      }
    });
  }

  function toggleMute() {
    trace("click mute");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");
    
    var muteValue = $('#' + upnpcontroller_uid + '_muteButton div.value').text();

    trace("current muteValue: " + muteValue);
    trace("playerPort  : " + playerPort);
     
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
      url: "plugins/upnpcontroller/mute.php?mute=" + muteValue + "&player_ip_addr=" + playerIp + "&port=" + playerPort,
      success: function(data){
        trace("data: " + data);
      }
    });
    
    refreshUpnpcontroller(upnpctrl, {}, true);
  }

  function togglePlay() {
    trace("click play");
    var upnpctrl = $("#" + upnpcontroller_uid);
    var playerIp = upnpctrl.data("player_ip");
    var playerPort = upnpctrl.data("player_port");
    var playValue = $('#' + upnpcontroller_uid + '_playButton div.value').text();
    var cmd; 
 
    trace("current playValue: " + playValue);
    trace("playerPort  : " + playerPort);
     
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
      url: "plugins/upnpcontroller/" + cmd + ".php?player_ip_addr=" + playerIp + "&port=" + playerPort,
      success: function(data){
        trace("data: " + data);
      }
    });
    
    refreshUpnpcontroller(upnpctrl, {}, true);    
  }

  function trace(msg){
    if(upnpcontroller_trace_flag == 'true'){
      console.log(msg);
    }
  }

});