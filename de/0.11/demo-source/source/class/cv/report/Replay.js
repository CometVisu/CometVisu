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
 * - Progressbar + Controls(Stop, Pause, Fast Mode)
 * - weitere user events (slider, colorchooser)
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
      // override startpage setting
      if (data.data.runtime.path.indexOf("#") >= 0) {
        cv.Config.startpage = data.data.runtime.path.split("#").pop();
      } else {
        cv.Config.startpage = "id_";
      }
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
    __config: null,
    __cursor: null,
    __currentIndex: null,
    __skipMoveEvents: false,
    __startTime: null,

    prepare: function(log) {
      // patch XHR
      qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrReplayHook);

      cv.Config.configSuffix = log.configSuffix;
      this.__start = log.start;
      this.__end = log.end;
      this.__log = log.log;
      this.__data = log.data;
      this.__config = qx.xml.Document.fromString(log.config);
      if (log.data.cache && qx.core.Environment.get("html.storage.local") === true) {
        localStorage.setItem(cv.Config.configSuffix + ".body", log.data.cache.body);
        localStorage.setItem(cv.Config.configSuffix + ".data", qx.lang.Json.stringify(log.data.cache.data));
      }
      cv.report.utils.FakeServer.init(log.xhr, this.__data.runtime.build);
    },

    /**
     * Start replaying the given data
     */
    start: function() {
      var runtime = Math.round((this.__end - this.__start)/1000);
      console.log("Replay time: "+Math.floor(runtime/60)+":"+ qx.lang.String.pad(""+(runtime  % 60), 2, "0"));
      this.__startTime = Date.now();

      var delay = this.__log[0].t - this.__start;
      qx.event.Timer.once(function() {
        this.__replay(0);
      }, this, delay);
    },

    /**
     * Find DOM element for given path
     * @param path {String} CSS selector or "Window"
     * @return {Element|null}
     */
    __findElement: function(path) {
      if (path === "Window") {
        return window;
      } else if (path === "document") {
        return document;
      } else {
        return qx.bom.Selector.query(path)[0];
      }
    },

    __replay: function(index) {
      this.__currentIndex = index;
      var record = this.__log[index];
      this.__dispatchRecord(record);
      if (this.__log.length === index + 1) {
        this.info("All log events have been played, waiting till end of recording time");
        qx.event.Timer.once(function() {
          qx.bom.Notification.getInstance().show("Replay", "Replay finished");
          cv.io.Client.stopAll();
          var runtime = Math.round((Date.now() - this.__startTime) / 1000);
          console.log("Log replayed in: "+Math.floor(runtime/60)+":"+ qx.lang.String.pad(""+(runtime  % 60), 2, "0"));
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
          console.log("resize event received "+qx.lang.Json.stringify(record.d));
          window.resizeTo(record.d.w, record.d.h);
          break;

        case cv.report.Record.USER:
          if (record.i === "scroll") {
            this.__playScrollEvent(record);
          } else {
            var target = this.__findElement(record.i);
            if (!target) {
              this.error("no target found for path " + record.i);
              return;
            }
            if (/(pointer|mouse|gesture).+/.test(record.d.native.type)) {
              this._simulateCursor(record);
            }
            var evt = record.d.native;
            evt.view = evt.view === "Window" ? window : null;
            evt.target = target;
            ["currentTarget", "relatedTarget"].forEach(function (key) {
              evt[key] = evt[key] ? this.__findElement(evt[key]) : null;
            }, this);
            var event = new window[record.d.eventClass](record.d.native.type, evt);
            if (record.d.native.type === "pointerup" && target.nodeName === "A") {
              // workaround for mouse clicks on <a> elemente e.g. in the breadcrumb navigation
              // check for last pointerdown event, if id was on same element we have a click
              for (var i=this.__currentIndex-1; i>0; i--) {
                if (this.__log[i].d.native.type === "pointerdown") {
                  if (this.__log[i].i === record.i) {
                    // same element
                    target.click();
                  }
                  break;
                }
              }
            }
            target.dispatchEvent(event);
          }
          break;

        default:
          this.error("replaying of category "+record.c+" no implemented");
          break;
      }
    },

    __playScrollEvent: function(record) {
      var elem = qx.bom.Selector.query("#"+record.d.page)[0];
      elem.scrollTop = record.d.native ? record.d.native.pageY : record.d.y;
      elem.scrollLeft = record.d.native ? record.d.native.pageX : record.d.x;
    },

    _simulateCursor: function(record) {
      // simulate cursor
      if (!this.__cursor) {
        this.__cursor = qx.dom.Element.create("span", {
          style: "position: absolute; transform: rotate(-40deg); font-size: 36px; z-index: 1000000"
        });
        qx.bom.element.Attribute.set(this.__cursor, "html", "&uarr;");
        qx.dom.Element.insertEnd(this.__cursor, qx.bom.Selector.query("body")[0]);
      }
      qx.bom.element.Style.setStyles(this.__cursor, {top: (record.d.native.clientY-10)+"px", left: (record.d.native.clientX-10)+"px"});

      if (/.+(down|start)/.test(record.d.native.type)) {
        qx.bom.element.Style.set(this.__cursor, "color", record.d.native.button === 2 ? "blue" : "red");
      } else if (/.+(up|end)/.test(record.d.native.type)) {
        qx.bom.element.Style.set(this.__cursor, "color", "white");
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
          } else if (this.__client.getCurrentTransport() instanceof cv.io.transport.Sse) {
            this.__client.getCurrentTransport().dispatchTopicMessage(record.i, record.d);
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