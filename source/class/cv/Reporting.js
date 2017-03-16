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
 *  - python replay modul
 *  - weitere user events (slider, colorchooser)
 *  - weitere Daten (diagram RRD, RSS?)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 */
qx.Class.define('cv.Reporting', {
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
    REPLAYING: false,
    data: null,

    prepareReplay: function(data) {
      this.REPLAYING = true;
      cv.Reporting.getInstance().prepareReplay(data);
    },

    startReplay: function() {
      if (this.REPLAYING === true) {
        cv.Reporting.getInstance().startReplay();
      }
    },

    register: function(target, path, events) {
      if (cv.Config.reporting === true && !cv.Reporting.REPLAYING) {
        cv.Reporting.getInstance().register(target, path, events);
      }
    },

    record: function(category, path, data) {
      if (cv.Config.reporting === true && !cv.Reporting.REPLAYING) {
        cv.Reporting.getInstance().record(category, path, data);
      }
    },

    /**
     * Save cache in
     */
    logCache: function() {
      if (cv.Config.reporting === true && !cv.Reporting.REPLAYING) {
        cv.Reporting.record(cv.Reporting.CACHE, cv.Config.configSuffix, {
          data: cv.ConfigCache.getData(),
          body: cv.ConfigCache.getBody()
        });
      }
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
    __cache: null,
    __config: null,
    __listeners: null,
    __client: null,

    //---------------------------------------------------------------
    // Recording stuff
    //---------------------------------------------------------------

    register: function(target, path, events) {
      var lid;
      var Reg = qx.event.Registration;

      events.forEach(function(event) {
        lid = Reg.addListener(target, event, qx.lang.Function.curry(this._onEvent, path), this);
      }, this);
    },

    _onEvent: function(path, ev) {
      this.record(cv.Reporting.USER, path, ev.getType());
    },

    record: function(category, path, data) {
      if (category === cv.Reporting.CACHE) {
        this.__cache = data;
      } else if (category === cv.Reporting.CONFIG) {
        this.__config = data;
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
        config: this.__config.xml ? this.__config.xml : (new XMLSerializer()).serializeToString(this.__config),
        log: this.__log,
        configSuffix: cv.Config.configSuffix
      };

      var d = new Date();

      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob(["var replayLog = "+qx.lang.Json.stringify(data)+";"], {type: 'application/json'}));
      a.download = 'CometVisu-replay-'+d.toISOString()+'.log';

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);
    },

    getConfig: function() {
      return this.__config;
    },

    //---------------------------------------------------------------
    // Replaying stuff
    //---------------------------------------------------------------

    prepareReplay: function(data) {
      cv.Config.configSuffix = data.configSuffix;
      this.__start = data.start;
      this.__log = data.log;
      this.__config = qx.xml.Document.fromString(data.config);
      localStorage.setItem(cv.Config.configSuffix+".body", data.cache.body);
      localStorage.setItem(cv.Config.configSuffix+".data", qx.lang.Json.stringify(data.cache.data));
    },

    /**
     * Start replaying the given data
     * @param data {Map}
     */
    startReplay: function() {
      this.__replay(0);
    },

    __replay: function(index) {
      var record = this.__log[index];
      this.__dispatchRecord(record);
      if (this.__log.length === index + 1) {
        this.info("Replay finished");
        qx.bom.Notification.getInstance().show("Replay", "Replay finished");
        return;
      }
      var delay = this.__log[index+1].t - (index === 0 ? this.__start : this.__log[index].t);
      console.log(delay);
      qx.event.Timer.once(function() {
        this.__replay(index+1);
      }, this, delay);
    },

    __dispatchRecord: function(record) {
      console.log("replay "+record.c+" event");
      switch (record.c) {
        case cv.Reporting.BACKEND:

          this.__dispatchBackendRecord(record);
          break;
        case cv.Reporting.USER:
          var widget = cv.ui.structure.WidgetFactory.getInstanceById(record.i);
          if (!widget) {
            this.error("widget with id "+record.i+" not found");
            return;
          }
          var event = new qx.event.type.Event();
          event.init(true, true);
          event.setType(record.d);
          event.setTarget(widget.getInteractionElement());
          qx.event.Registration.dispatchEvent(widget.getInteractionElement(), event);
          break;
        case cv.Reporting.CONFIG:
          // todo
          break;
        default:
          this.error("replaying of category "+record.c+" no implemented");
          break;
      }
    },

    __dispatchBackendRecord: function(record) {
      var client = this.__getClient();
      switch (record.i) {
        case "read":
          this.__client.receive(qx.lang.Json.parse(record.d));
          break;
        default:
          if (client[record.i]) {
            client[record.i].apply(client, record.d);
          } else {
            this.error("unhandled backend record of type "+record.i);
          }
          break;
      }
    },

    __getClient: function() {
      if (!this.__client) {
        this.__client = cv.TemplateEngine.getInstance().visu;
      }
      return this.__client;
    }
  }
});