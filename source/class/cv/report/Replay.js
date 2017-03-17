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
qx.Class.define('cv.report.Replay', {
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

    prepare: function(data) {
      cv.report.Record.REPLAYING = true;
      cv.report.Replay.getInstance().prepare(data);
    },

    start: function() {
      if (cv.report.Record.REPLAYING === true) {
        cv.report.Replay.getInstance().start();
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
    __client: null,

    prepare: function(data) {
      cv.Config.configSuffix = data.configSuffix;
      this.__start = data.start;
      this.__log = data.log;
      this.__config = qx.xml.Document.fromString(data.config);
      localStorage.setItem(cv.Config.configSuffix+".body", data.cache.body);
      localStorage.setItem(cv.Config.configSuffix+".data", qx.lang.Json.stringify(data.cache.data));

      cv.report.utils.FakeServer.init(data.xhr);
    },

    /**
     * Start replaying the given data
     * @param data {Map}
     */
    start: function() {
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
      qx.event.Timer.once(function() {
        this.__replay(index+1);
      }, this, delay);
    },

    __dispatchRecord: function(record) {
      switch (record.c) {

        case cv.report.Record.BACKEND:

          this.__dispatchBackendRecord(record);
          break;
        case cv.report.Record.USER:
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

        default:
          this.error("replaying of category "+record.c+" no implemented");
          break;
      }
    },

    __dispatchBackendRecord: function(record) {
      var client = this.__getClient();
      switch (record.i) {
        case "read":
          if (this.__client.getCurrentTransport() instanceof cv.io.transport.Sse) {
            this.__client.getCurrentTransport().handleMessage({data: record.d});
          } else {
            this.error("long-polling transport should not record 'backend' log events. Skip replaying");
          }
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