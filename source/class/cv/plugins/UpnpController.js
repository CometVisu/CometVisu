/* UpnpController.js
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

//noinspection JSUnusedGlobalSymbols
/**
 * @author Mark K. [mr dot remy at gmx dot de]
 * @since 2012
 * @asset(plugins/upnpcontroller/upnpcontroller.css)
 * @asset(plugins/upnpcontroller/*.php)
 */
qx.Class.define('cv.plugins.UpnpController', {
  extend: cv.ui.structure.pure.AbstractWidget,
  include: [cv.ui.common.Refresh],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     * @return {Map} extracted data from config element as key/value map
     */
    parse(xml, path, flavour, pageType) {
      const data = cv.parser.pure.WidgetParser.parseElement(
        this,
        xml,
        path,
        flavour,
        pageType,
        this.getAttributeToPropertyMappings()
      );

      cv.parser.pure.WidgetParser.parseRefresh(xml, path);
      return data;
    },

    getAttributeToPropertyMappings() {
      return {
        debug: {
          target: 'traceFlag',
          transform(value) {
            return value === 'true';
          }
        },

        label: {},
        player_ip_addr: { target: 'playerIp' },
        player_port: {
          target: 'playerPort',
          transform(value) {
            return value ? parseInt(value) : 1440;
          }
        }
      };
    },

    uniqid() {
      const newDate = new Date();
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
      check: 'Boolean',
      init: false
    },

    playerIp: {
      check: 'String',
      nullable: true
    },

    playerPort: {
      check: 'Number',
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

    _getInnerDomString() {
      const id = 'upnpcontroller_' + this.self(arguments).uniqid();
      this.upnpcontroller_uid = id;
      const ret_val = '<div class="actor"><div class="upnpcontroller" id="' + id + '">';
      let controller = '<div>';
      controller +=
        "<div id='" +
        id +
        "_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>";
      controller +=
        "<div id='" +
        id +
        "_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>";
      controller +=
        "<div id='" +
        id +
        "_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>";
      controller +=
        "<div id='" +
        id +
        "_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>";
      controller +=
        "<div style='float: left;'><progress id='" + id + "_progress'  max='100' value='0'></progress></div>";
      controller +=
        "<div style='float: left;'><div id='" +
        id +
        "_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>" +
        "<div id='" +
        id +
        "_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>" +
        "<div id='" +
        id +
        "_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>";
      controller +=
        "<div style='float: left;'><div id='" +
        id +
        "_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>" +
        "<div id='" +
        id +
        "_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div></div>";
      controller +=
        "<div style='float: left;'><div id='" +
        id +
        "_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>" +
        "<div id='" +
        id +
        "_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>";
      controller +=
        "<div style='float: left;'><div id='" +
        id +
        "_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>";
      controller +=
        "<div style='float: left;'><div id='" + id + "_playlistsresult'><div class='value'></div></div></div>";

      controller += '</div>';
      return ret_val + controller;
    },

    _onDomReady() {
      super._onDomReady();
      this.refreshUpnpcontroller();
    },

    /**
     * Initialize the event listeners
     */
    initListeners() {
      const Reg = qx.event.Registration;
      Reg.addListener(
        document.querySelector('#' + this.upnpcontroller_uid + '_muteButton'),
        'tap',
        this.toggleMute,
        this
      );

      Reg.addListener(
        document.querySelector('#' + this.upnpcontroller_uid + '_playButton'),
        'tap',
        this.togglePlay,
        this
      );

      Reg.addListener(document.querySelector('#' + this.upnpcontroller_uid + '_next'), 'tap', this.callNext, this);

      Reg.addListener(document.querySelector('#' + this.upnpcontroller_uid + '_prev'), 'tap', this.callPrev, this);

      Reg.addListener(
        document.querySelector('#' + this.upnpcontroller_uid + '_volumedown'),
        'tap',
        this.callvolumedown,
        this
      );

      Reg.addListener(
        document.querySelector('#' + this.upnpcontroller_uid + '_volumeup'),
        'tap',
        this.callvolumeup,
        this
      );

      Reg.addListener(
        document.querySelector('#' + this.upnpcontroller_uid + '_getplaylists'),
        'tap',
        this.callgetplaylists,
        this
      );
    },

    _setupRefreshAction() {
      if (this.getRefresh() && this.getRefresh() > 0) {
        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener('interval', () => {
          this.refreshUpnpcontroller();
        });
        this._timer.start();
      }
    },

    refreshUpnpcontroller() {
      const playerIp = this.getPlayerIp();
      const playerPort = this.getPlayerPort();

      this.traceLog('debug     : ' + this.isTraceFlag());
      this.traceLog('playerIp  : ' + playerIp);
      this.traceLog('playerPort: ' + playerPort);

      this.__callRemote('status', {}, function (ev) {
        let data = ev.getTarget().getResponse();
        try {
          if (typeof data === 'string') {
            data = JSON.parse(data);
          }
          this.traceLog('volume          : ' + data.volume);
          this.traceLog('reltime         : ' + data.reltimeResponse);
          this.traceLog('durationResponse: ' + data.durationResponse);
          this.traceLog('title           : ' + data.title);

          this.__updateController(
            data.volume,
            data.muteState,
            data.transportState,
            data.title,
            data.reltimeResponse,
            data.durationResponse,
            data.artist,
            data.album
          );
        } catch (e) {
          this.error(e);
        }
      });
    },

    __updateController(volume, mute, playMode, title, reltime, duration, artist, album) {
      const id = this.upnpcontroller_uid;

      if (mute === 0) {
        document.querySelector('#' + id + '_muteButton').classList.replace('switchPressed', 'switchUnpressed');
      } else {
        document.querySelector('#' + id + '_muteButton').classList.replace('switchUnpressed', 'switchPressed');
      }

      if (playMode === 'Play') {
        document.querySelector('#' + id + '_playButton').classList.replace('switchPressed', 'switchUnpressed');
      } else {
        document.querySelector('#' + id + '_playButton').classList.replace('switchUnpressed', 'switchPressed');
      }

      document.querySelector('#' + id + '_muteButton div.value').innerText = mute;
      document.querySelector('#' + id + '_playButton div.value').innerText = playMode;
      document.querySelector('#' + id + '_volume div.value').innerText = volume;
      document.querySelector('#' + id + '_title div.value').innerText = title;
      document.querySelector('#' + id + '_artist div.value').innerText = artist;
      document.querySelector('#' + id + '_album div.value').innerText = album;
      document.querySelector('#' + id + '_time div.value').innerText = reltime + ' of ' + duration;

      this.upnpcontroller_song_process_rel = this.calculateSongProcessed(reltime, duration);

      this.traceLog('song_process_rel: ' + this.upnpcontroller_song_process_rel);

      document.querySelector('#' + id + '_progress').setAttribute('value', this.upnpcontroller_song_process_rel);
    },

    /**
     * Internal helper method for remote calls to backend UPNP controller scripts
     * @param type {String} type of backend controller
     * @param data {Map|null} additional data to send to the backend
     * @param callback {Function} callback that should be called in success
     */
    __callRemote(type, data, callback) {
      const req = new qx.io.request.Xhr(
        qx.util.ResourceManager.getInstance().toUri('plugins/upnpcontroller/' + type + '.php')
      );

      if (!data) {
        data = {};
      }
      data = Object.assign(data, {
        player_ip_addr: this.getPlayerIp(),
        port: this.getPlayerPort()
      });

      req.set({
        requestData: data,
        accept: 'application/json',
        method: 'GET'
      });

      req.addListener('success', callback, this);
      req.send();
    },

    calculateSongProcessed(reltime, duration) {
      if (reltime === undefined || duration === undefined) {
        return 0;
      }
      this.traceLog('calculateSongProcessed');

      const durationParts = duration.split(':');
      const secondsTotal =
        Number(durationParts[2]) + Number(durationParts[1]) * 60 + Number(durationParts[0]) * 60 * 60;
      const reltimeParts = reltime.split(':');
      const secondsProcessed =
        Number(reltimeParts[2]) + Number(reltimeParts[1]) * 60 + Number(reltimeParts[0]) * 60 * 60;
      this.traceLog('secondsTotal    : ' + secondsTotal);
      this.traceLog('secondsProcessed: ' + secondsProcessed);

      return Math.floor((secondsProcessed * 100) / secondsTotal);
    },

    callgetplaylists() {
      this.traceLog('click callgetplaylists');
      const playlist = document.querySelector('#' + this.upnpcontroller_uid + '_getplaylists');

      const currentValue = playlist.getAttribute('value');
      const playerIp = this.getPlayerIp();
      const playerPort = this.getPlayerPort();

      this.traceLog('currentValue: ' + currentValue);
      this.traceLog('playerPort  : ' + playerPort);

      this.__callRemote('playlists', {}, function (ev) {
        let data = ev.getTarget().getResponse();
        try {
          if (typeof data === 'string') {
            data = JSON.parse(data);
          }
        } catch (e) {
          this.error(e);
          return;
        }
        let playlists = '';

        this.traceLog('totalMatches: ' + data.totalMatches);

        for (let i = 0; i < data.playLists.length; i++) {
          playlists +=
            "<a href='" +
            'plugins/upnpcontroller/selectplaylist.php?player_ip_addr=' +
            playerIp +
            '&listurl=' +
            data.playLists[i].urlenc +
            '&port=' +
            playerPort +
            "'>" +
            data.playLists[i].name +
            '</a></br>';

          if (this.isTraceFlag() === 'true') {
            this.debug('name: ' + data.playLists[i].name);
            this.debug('url: ' + data.playLists[i].url);
          }
        }

        if (currentValue !== 'pressed') {
          document.querySelector('#' + this.upnpcontroller_uid + '_playlistsresult div.value').innerHTML = playlists;
          playlists.setAttribute('value', 'pressed');
          playlists.classList.replace('switchUnpressed', 'switchPressed');
        } else {
          document.querySelector('#' + this.upnpcontroller_uid + '_playlistsresult div.value').innerText = '';
          playlists.setAttribute('value', 'unpressed');
          playlists.classList.replace('switchUnpressed', 'switchPressed');
        }
      });
    },

    callvolumedown() {
      this.traceLog('click callvolumedown');
      const currentVolume = document.querySelector('#' + this.upnpcontroller_uid + '_volume div.value').innerText;

      this.traceLog('currentVolume: ' + currentVolume);
      const volume = Number(currentVolume) - 5;
      this.__callRemote('volume', { volume: volume }, function (data) {
        this.traceLog('data: ' + data);
      });
    },

    callvolumeup() {
      this.traceLog('click callvolumeup');
      const currentVolume = document.querySelector('#' + this.upnpcontroller_uid + '_volume div.value').innerText;
      this.traceLog('currentVolume: ' + currentVolume);
      const volume = Number(currentVolume) + 5;

      this.__callRemote('volume', { volume: volume }, function (data) {
        this.traceLog('data: ' + data);
      });
    },

    callNext() {
      this.traceLog('click next');
      this.__callRemote('next', {}, function (data) {
        this.traceLog('data: ' + data);
      });
    },

    callPrev() {
      this.traceLog('click prev');
      this.__callRemote('prev', {}, function (data) {
        this.traceLog('data: ' + data);
      });
    },

    toggleMute() {
      this.traceLog('click mute');
      const muteButton = document.querySelector('#' + this.upnpcontroller_uid + '_muteButton');

      let muteValue = muteButton.querySelector('div.value').innerText;

      this.traceLog('current muteValue: ' + muteValue);

      if (muteValue === 0) {
        muteValue = 1;
        muteButton.classList.replace('switchUnpressed', 'switchPressed');
      } else {
        muteValue = 0;
        muteButton.classList.replace('switchPressed', 'switchUnpressed');
      }

      this.__callRemote('mute', { mute: muteValue }, function (data) {
        this.traceLog('data: ' + data);
      });

      this.refreshUpnpcontroller();
    },

    togglePlay() {
      this.traceLog('click play');
      const playValue = document.querySelector('#' + this.upnpcontroller_uid + '_playButton div.value').innerText;
      let cmd;

      this.traceLog('current playValue: ' + playValue);

      const playButton = document.querySelector('#' + this.upnpcontroller_uid + '_playButton');

      if (playValue === 'Play') {
        cmd = 'pause';
        playButton.classList.replace('switchUnpressed', 'switchPressed');
      } else {
        cmd = 'play';
        playButton.classList.replace('switchPressed', 'switchUnpressed');
      }

      this.__callRemote(cmd, {}, function (ev) {
        this.traceLog('data: ' + ev.getTarget().getResponse());
      });

      this.refreshUpnpcontroller();
    },

    traceLog(msg) {
      if (this.isTraceFlag()) {
        this.debug(msg);
      }
    }
  },

  defer(statics) {
    const loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/upnpcontroller/upnpcontroller.css');
    cv.parser.pure.WidgetParser.addHandler('upnpcontroller', cv.plugins.UpnpController);

    cv.ui.structure.WidgetFactory.registerClass('upnpcontroller', statics);
  }
});
