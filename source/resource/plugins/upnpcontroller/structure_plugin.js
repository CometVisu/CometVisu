/* structure_plugin.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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


/**
 * @author Mark K. [mr dot remy at gmx dot de]
 * @since 2012
 */
qx.Class.define('cv.plugins.upnpcontroller.Main', {
  extend: cv.structure.pure.AbstractWidget,
  include: [cv.role.Refresh],
  
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function() {
      return {
        'debug': {
          target: "traceFlag",
          transform: function(value) {
            return value === "true";
          }
        },
        'label': {},
        'player_ip_addr': { target: "playerIp" },
        'player_port': {
          target: "playerPort",
          transform: function(value) {
            return value ? parseInt(value) : 1440
          }
        }
      }
    },

    uniqid: function() {
      var newDate = new Date;
      return newDate.getTime();
    }
  },
  
  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    traceFlag: {
      check: "Boolean",
      init: false
    },
    playerIp: {
      check: "String",
      init: ""
    },
    playerPort: {
      check: "Number",
      init: 1440
    }
  },
  
  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    upnpcontroller_uid: null,
    upnpcontroller_song_process_rel: null,

    _getInnerDomString: function () {
      var id = "upnpcontroller_" + this.self(arguments).uniqid();
      this.upnpcontroller_uid = id;
      var ret_val = "<div class=\"actor\"><div class=\"upnpcontroller\" id=\"" + id + "\">";
      var controller = "<div>";
      controller += "<div id='" + id + "_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>";
      controller += "<div id='" + id + "_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>";
      controller += "<div id='" + id + "_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>";
      controller += "<div id='" + id + "_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>";
      controller += "<div style='float: left;'><progress id='" + id + "_progress'  max='100' value='0'></progress></div>";
      controller += "<div style='float: left;'><div id='" + id + "_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>"
        + "<div id='" + id + "_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>"
        + "<div id='" + id + "_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>";
      controller += "<div style='float: left;'><div id='" + id + "_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>"
        + "<div id='" + id + "_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div></div>";
      controller += "<div style='float: left;'><div id='" + id + "_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>"
        + "<div id='" + id + "_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>";
      controller += "<div style='float: left;'><div id='" + id + "_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>";
      controller += "<div style='float: left;'><div id='" + id + "_playlistsresult'><div class='value'></div></div></div>";

      controller += "</div>";
      return ret_val + controller;
    },

    _onDomReady: function () {
      this.base(arguments);
      this.refreshUpnpcontroller();
    },

    /**
     * Initialize the event listeners
     */
    initListeners: function () {
      var Reg = qx.event.Registration;
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_muteButton")[0], "tap", this.toggleMute);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_playButton")[0], "tap", this.togglePlay);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_next")[0], "tap", this.callNext);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_prev")[0], "tap", this.callPrev);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_volumedown")[0], "tap", this.callvolumedown);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_volumeup")[0], "tap", this.callvolumeup);
      Reg.addListener(qx.bom.Selector.query('#' + this.upnpcontroller_uid + "_getplaylists")[0], "tap", this.callgetplaylists);
    },

    _setupRefreshAction: function () {
      if (this.getRefresh() && this.getRefresh() > 0) {
        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener("interval", function () {
          this.refreshUpnpcontroller();
        }, this);
        this._timer.start();
      }
    },

    refreshUpnpcontroller: function () {
      var playerIp = this.getPlayerIp();
      var playerPort = this.getPlayerPort();

      this.trace("debug     : " + this.isTraceFlag());
      this.trace("playerIp  : " + playerIp);
      this.trace("playerPort: " + playerPort);

      this.__callRemote('status', {}, function (ev) {
        var data = ev.getTarget().getResponse();
        this.trace("volume          : " + data.volume);
        this.trace("reltime         : " + data.reltimeResponse);
        this.trace("durationResponse: " + data.durationResponse);
        this.trace("title           : " + data.title);

        this.__updateController(data.volume, data.muteState, data.transportState, data.title
          , data.reltimeResponse, data.durationResponse, data.artist, data.album);
      });
    },

    __updateController: function (volume, mute, playMode, title, reltime, duration, artist, album) {
      var id = this.upnpcontroller_uid;
      if (mute == 0) {
        $('#' + id + '_muteButton').removeClass('switchPressed');
        $('#' + id + '_muteButton').addClass('switchUnpressed');
      } else {
        $('#' + id + '_muteButton').removeClass('switchUnpressed');
        $('#' + id + '_muteButton').addClass('switchPressed');
      }

      if (playMode == 'Play') {
        $('#' + id + '_playButton').removeClass('switchUnpressed');
        $('#' + id + '_playButton').addClass('switchPressed');
      } else {
        $('#' + id + '_playButton').removeClass('switchPressed');
        $('#' + id + '_playButton').addClass('switchUnpressed');
      }

      $('#' + id + '_muteButton div.value').text(mute);
      $('#' + id + '_playButton div.value').text(playMode);
      $('#' + id + '_volume div.value').text(volume);
      $('#' + id + '_title div.value').text(title);
      $('#' + id + '_artist div.value').text(artist);
      $('#' + id + '_album div.value').text(album);
      $('#' + id + '_time div.value').text(reltime + ' of ' + duration);

      this.upnpcontroller_song_process_rel = this.calculateSongProcessed(reltime, duration);
      this.trace("song_process_rel: " + this.upnpcontroller_song_process_rel);
      $('#' + id + '_progress').attr({value: this.upnpcontroller_song_process_rel});
    },

    /**
     * Internal helper method for remote calls to backend UPNP controller scripts
     * @param type {String} type of backend controller
     * @param data {Map|null} additional data to send to the backend
     * @param callback {Function} callback that should be called in success
     * @private
     */
    __callRemote: function (type, data, callback) {
      var req = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri("plugins/upnpcontroller/" + type + ".php"));
      if (!data) {
        data = {};
      }
      data = qx.lang.Object.mergeWith(data, {
        player_ip_addr: this.getPlayerIp(),
        port: this.getPlayerPort()
      });
      req.set({
        requestData: data,
        accept: "application/json",
        method: "GET"
      });
      req.addListener("success", callback, this);
      req.send();
    },

    calculateSongProcessed: function (reltime, duration) {
      if (reltime === undefined || duration === undefined) return;
      this.trace("calculateSongProcessed");

      var durationParts = duration.split(':');
      var secondsTotal = Number(durationParts[2]) + Number(durationParts[1]) * 60 + Number(durationParts[0]) * 60 * 60;
      var reltimeParts = reltime.split(':');
      var secondsProcessed = Number(reltimeParts[2]) + Number(reltimeParts[1]) * 60 + Number(reltimeParts[0]) * 60 * 60;
      this.trace("secondsTotal    : " + secondsTotal);
      this.trace("secondsProcessed: " + secondsProcessed);

      var result = Math.floor(secondsProcessed * 100 / secondsTotal);

      return result;
    },

    callgetplaylists: function () {
      this.trace("click callgetplaylists");
      var currentValue = $('#' + this.upnpcontroller_uid + '_getplaylists').attr('value');
      var playerIp = this.getPlayerIp();
      var playerPort = this.getPlayerPort();

      this.trace("currentValue: " + currentValue);
      this.trace("playerPort  : " + playerPort);

      this.__callRemote('playlists', {volume: volume}, function (data) {
        var playlists = '';

        this.trace("totalMatches: " + data.totalMatches);

        for (var i = 0; i < data.playLists.length; i++) {
          playlists += "<a href='"
            + "plugins/upnpcontroller/selectplaylist.php?player_ip_addr=" + playerIp
            + "&listurl=" + data.playLists[i].urlenc + "&port=" + playerPort + "'>"
            + data.playLists[i].name + "</a></br>";

          if (this.isTraceFlag() == 'true') {
            console.log("name: " + data.playLists[i].name);
            console.log("url: " + data.playLists[i].url);
          }
        }

        if (currentValue != 'pressed') {
          $('#' + this.upnpcontroller_uid + '_playlistsresult div.value').html(playlists);
          $('#' + this.upnpcontroller_uid + '_getplaylists').attr({value: 'pressed'});
          $('#' + this.upnpcontroller_uid + '_getplaylists').removeClass('switchUnpressed');
          $('#' + this.upnpcontroller_uid + '_getplaylists').addClass('switchPressed');
        } else {
          $('#' + this.upnpcontroller_uid + '_playlistsresult div.value').text('');
          $('#' + this.upnpcontroller_uid + '_getplaylists').attr({value: 'unpressed'});
          $('#' + this.upnpcontroller_uid + '_getplaylists').removeClass('switchPressed');
          $('#' + this.upnpcontroller_uid + '_getplaylists').addClass('switchUnpressed');
        }
      });
    },

    callvolumedown: function () {
      this.trace("click callvolumedown");
      var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();

      this.trace("currentVolume: " + currentVolume);
      var volume = Number(currentVolume) - 5;
      this.__callRemote('volume', {volume: volume}, function (data) {
        this.trace("data: " + data);
      });

    },

    callvolumeup: function () {
      this.trace("click callvolumeup");
      var currentVolume = $('#' + upnpcontroller_uid + '_volume div.value').text();
      this.trace("currentVolume: " + currentVolume);
      var volume = Number(currentVolume) + 5;

      this.__callRemote('volume', {volume: volume}, function (data) {
        this.trace("data: " + data);
      });
    },

    callNext: function () {
      this.trace("click next");
      this.__callRemote('next', {}, function (data) {
        this.trace("data: " + data);
      });
    },

    callPrev: function () {
      this.trace("click prev");
      this.__callRemote('prev', {}, function (data) {
        this.trace("data: " + data);
      });
    },

    toggleMute: function () {
      this.trace("click mute");
      var upnpctrl = $("#" + upnpcontroller_uid);
      var muteValue = $('#' + upnpcontroller_uid + '_muteButton div.value').text();

      this.trace("current muteValue: " + muteValue);

      if (muteValue == 0) {
        muteValue = 1;
        $('#' + upnpcontroller_uid + '_muteButton').removeClass('switchUnpressed');
        $('#' + upnpcontroller_uid + '_muteButton').addClass('switchPressed');
      } else {
        muteValue = 0;
        $('#' + upnpcontroller_uid + '_muteButton').removeClass('switchPressed');
        $('#' + upnpcontroller_uid + '_muteButton').addClass('switchUnpressed');
      }

      this.__callRemote('mute', {mute: muteValue}, function (data) {
        this.trace("data: " + data);
      });

      this.refreshUpnpcontroller();
    },

    togglePlay: function () {
      this.trace("click play");
      var playValue = $('#' + upnpcontroller_uid + '_playButton div.value').text();
      var cmd;

      this.trace("current playValue: " + playValue);

      if (playValue == 'Play') {
        cmd = 'pause';
        $('#' + upnpcontroller_uid + '_playButton').removeClass('switchUnpressed');
        $('#' + upnpcontroller_uid + '_playButton').addClass('');
      } else {
        cmd = 'play';
        $('#' + upnpcontroller_uid + '_playButton').removeClass('switchPressed');
        $('#' + upnpcontroller_uid + '_playButton').addClass('switchUnpressed');
      }

      this.__callRemote(cmd, {}, function (data) {
        this.trace("data: " + data);
      });

      this.refreshUpnpcontroller();
    },

    trace: function(msg){
      if(this.isTraceFlag()){
        this.debug(msg);
      }
    }
  },
  
  defer: function() {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/upnpcontroller/upnpcontroller.css');
    cv.xml.Parser.addHandler("upnpcontroller", cv.plugins.upnpcontroller.Main);
  }
  
});