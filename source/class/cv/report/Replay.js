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
 * Replay tool for user interactions on existing configs. Used for bug reproduction
 *
 * TODO:
 * - Progressbar + Laufzeitangabe
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
    __end: null,
    __log: null,
    __client: null,
    __data: null,

    __cursor: null,

    prepare: function(log) {
      cv.Config.configSuffix = log.configSuffix;
      this.__start = log.start;
      this.__end = log.end;
      this.__log = log.log;
      this.__data = log.data;
      this.__config = qx.xml.Document.fromString(log.config);
      if (log.data.cache) {
        localStorage.setItem(cv.Config.configSuffix + ".body", log.data.cache.body);
        localStorage.setItem(cv.Config.configSuffix + ".data", qx.lang.Json.stringify(log.data.cache.data));
      }
      cv.report.utils.FakeServer.init(log.xhr);
    },

    /**
     * Start replaying the given data
     */
    start: function() {
      var runtime = Math.round((this.__end - this.__start)/1000);
      console.log("Replay time: "+Math.floor(runtime/60)+":"+ qx.lang.String.pad(""+(runtime  % 60), 2, "0"));
      var delay = this.__log[0].t - this.__start;
      qx.event.Timer.once(function() {
        this.__replay(0);
      }, this, delay);
    },

    __replay: function(index) {
      var record = this.__log[index];
      this.__dispatchRecord(record);
      if (this.__log.length === index + 1) {
        this.info("All log events have been played, waiting till end of recording time");
        qx.event.Timer.once(function() {
          qx.bom.Notification.getInstance().show("Replay", "Replay finished");
          cv.io.Client.stopAll();
        }, this, this.__end - this.__log[index].t);
        return;
      }
      var delay = this.__log[index+1].t - this.__log[index].t;
      qx.event.Timer.once(function() {
        this.__replay(index+1);
      }, this, delay);
    },

    __dispatchRecord: function(record) {
      switch (record.c) {

        case cv.report.Record.BACKEND:
          this.__dispatchBackendRecord(record);
          break;

        case cv.report.Record.SCREEN:
          // most browsers do not allow resizing the window
          console.log("resize event received "+record.d);
          window.resizeTo(record.d.w, record.d.h);
          break;

        case cv.report.Record.USER:
          if (record.i === "pointer") {
            this.__playPointerEvent(record);
            return;
          } else if (record.i === "scroll") {
            this.__playScrollEvent(record);
            return;
          }
          var target;
          if (/^id_([0-9_]+)?$/.test(record.i)) {
            var widget = cv.ui.structure.WidgetFactory.getInstanceById(record.i);
            if (!widget) {
              this.error("widget with id " + record.i + " not found");
              return;
            }
            target = widget.getInteractionElement();
          } else {
            // muss be an CSS selector
            target = qx.bom.Selector.query(record.i)[0];
          }
          if (!target) {
            this.error("no target found for path " + record.i);
            return;
          }
          if (record.o && record.o.fire === "click") {
            // just use builtin click
            target.click();
            return;
          }
          var event = new qx.event.type.Event();
          event.init(true, true);
          event.setType(record.d);
          event.setTarget(target);
          qx.event.Registration.dispatchEvent(target, event);
          break;

        default:
          this.error("replaying of category "+record.c+" no implemented");
          break;
      }
    },

    __playScrollEvent: function(record) {
      var elem = qx.bom.Selector.query("#"+record.d.page)[0];
      elem.scrollTop = record.d.y;
      elem.scrollLeft = record.d.x;
    },

    __playPointerEvent: function(record) {
      // simulate cursor
      if (!this.__cursor) {
        this.__cursor = qx.dom.Element.create("span", {
          style: "position: absolute; transform: rotate(-40deg); font-size: 36px;"
        });
        qx.bom.element.Attribute.set(this.__cursor, "html", "&uarr;");
        qx.dom.Element.insertEnd(this.__cursor, qx.bom.Selector.query("body")[0]);
      }
      qx.bom.element.Style.setStyles(this.__cursor, {top: record.d.y+"px", left: record.d.x+"px"});
      switch(record.d.type) {
        case "pointerdown":
          qx.bom.element.Style.set(this.__cursor, "color", "red");
          break;
        case "pointerup":
          qx.bom.element.Style.set(this.__cursor, "color", "white");
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