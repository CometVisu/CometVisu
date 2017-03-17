/* Transform.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Recording/Replay tool for user interactions on existing configs. Used for bug reproduction
 *
 * TODO:
 * - qx.dev.FakeServer benutzen (auch für Config):
 *  + Replay in extra Klasse, die nur in qx.debug benutzt wird, damit die Abh. nicht in den Build kommen
 *  + Index der XHR-Requests mit speichern (in Long-Polling), bei SSE ggf. Mockup Client benutzen falls mit FakeServer nicht möglich
 * - python replay modul
 * - weitere user events (slider, colorchooser)
 * - weitere Daten (diagram RRD, RSS?)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 */
qx.Class.define('cv.report.Record', {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.__log = [];
    this.__listeners = {};
    this.__start = Date.now();
    this.__xhr = { response: [], request:[] };
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    CONFIG: "config",
    BACKEND: "backend",
    USER: "user",
    CACHE: "cache",
    XHR: "xhr",
    REPLAYING: false,
    data: null,

    prepare: function() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        // patch XHR
        qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrHook);
      }
    },

    register: function(target, path, events) {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.report.Record.getInstance().register(target, path, events);
      }
    },

    record: function(category, path, data) {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.report.Record.getInstance().record(category, path, data);
      }
    },

    /**
     * Save cache in
     */
    logCache: function() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.report.Record.record(cv.report.Record.CACHE, cv.Config.configSuffix, {
          data: cv.ConfigCache.getData(),
          body: cv.ConfigCache.getBody()
        });
      }
    },

    normalizeUrl: function(url) {
      if (url.indexOf("nocache=") >= 0) {
        url = url.replace(/[\?|&]nocache=[0-9]+/, "");
      }
      return url;
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __start: null,
    __log: null,
    __xhr: null,
    __cache: null,
    __listeners: null,

    register: function(target, path, events) {
      var lid;
      var Reg = qx.event.Registration;

      events.forEach(function(event) {
        lid = Reg.addListener(target, event, qx.lang.Function.curry(this._onEvent, path), this);
      }, this);
    },

    _onEvent: function(path, ev) {
      this.record(cv.report.Record.USER, path, ev.getType());
    },

    record: function(category, path, data) {
      if (category === cv.report.Record.CACHE) {
        this.__cache = data;
      } else if (category === cv.report.Record.XHR) {
        data.t = Date.now();
        this.__xhr[path].push(data);
      } else {
        this.__log.push({
          c: category,
          t: Date.now(),
          i: path,
          d: data
        });
      }
    },

    /**
     * Download Log as file
     */
    download: function() {

      var data = {
        cache: this.__cache,
        start: this.__start,
        xhr: this.__xhr,
        log: this.__log,
        configSuffix: cv.Config.configSuffix
      };

      var d = new Date();

      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([qx.lang.Json.stringify(data)], {type: 'application/json'}));
      a.download = 'CometVisu-replay-'+d.toISOString()+'.json';

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);
    }
  }
});