(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.Config": {},
      "cv.Application": {},
      "qx.io.request.Xhr": {},
      "cv.report.utils.MXhrHook": {},
      "qx.event.Registration": {},
      "qx.event.message.Bus": {},
      "qx.util.Function": {},
      "qx.util.Uri": {},
      "qx.core.Environment": {},
      "qx.bom.client.Locale": {},
      "cv.Version": {},
      "cv.ConfigCache": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
   * Recording tool for user interactions on existing configs. Used for bug reproduction.
  
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
    construct: function construct() {
      this.__log = [];
      this.__listeners = {};
      this.__start = Date.now();
      this.__xhr = {
        response: [],
        request: []
      };
      this.__data = {};
      this.__deltas = {};
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
      SCREEN: "screen",
      RUNTIME: "runtime",
      REPLAYING: false,
      data: null,
      // Events that should be recorded
      USER_EVENTS: /(.+(down|up|cancel|move)|.*click|contextmenu|touch.*|.*wheel)/i,
      prepare: function prepare() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.Application.registerConsoleCommand("downloadLog", cv.report.Record.download, "Download recorded log file."); // apply event recorder

          var record = cv.report.Record.getInstance();
          EVENT_RECORDER = record.recordNativeEvent.bind(record); // patch XHR

          qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrHook);
          var Reg = qx.event.Registration; // add resize listener

          Reg.addListener(window, "resize", function () {
            this.record(this.SCREEN, "resize", {
              w: document.documentElement.clientWidth,
              h: document.documentElement.clientHeight
            });
          }, this); // add scroll listeners to all pages

          qx.event.message.Bus.subscribe("setup.dom.finished", function () {
            var throttled = qx.util.Function.throttle(record.recordScroll, 250, true);
            document.querySelectorAll("#pages > .page").forEach(function (page) {
              Reg.addListener(page, "scroll", throttled, record);
            }, this);
          }, this);
          this.record(this.RUNTIME, "config", this.getClientData()); // save initial size

          this.record(this.SCREEN, "resize", {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
          });
        }
      },
      getClientData: function getClientData() {
        // save browser settings
        var req = qx.util.Uri.parseUri(window.location.href); // delete reporting queryKey

        delete req.queryKey.reporting;
        var Env = qx.core.Environment;
        var runtime = {
          browserName: Env.get("browser.name"),
          browserVersion: Env.get("browser.version"),
          deviceName: Env.get("device.name"),
          deviceType: Env.get("device.type"),
          pixelRatio: Env.get("device.pixelRatio"),
          touch: Env.get("device.touch"),
          osName: Env.get("os.name"),
          osVersion: Env.get("os.version"),
          build: Env.get("cv.build"),
          locale: qx.bom.client.Locale.getLocale(),
          cv: {},
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          anchor: req.anchor,
          query: req.queryKey,
          path: req.relative
        }; // save CometVisu build information

        Object.getOwnPropertyNames(cv.Version).forEach(function (name) {
          if (/^[A-Z]+$/.test(name)) {
            runtime.cv[name] = cv.Version[name];
          }
        });
        return runtime;
      },
      record: function record(category, path, data) {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.report.Record.getInstance().record(category, path, data);
        }
      },

      /**
       * Save cache in
       */
      logCache: function logCache() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.report.Record.record(cv.report.Record.CACHE, cv.Config.configSuffix, {
            data: cv.ConfigCache.getData(),
            body: cv.ConfigCache.getBody()
          });
        }
      },
      normalizeUrl: function normalizeUrl(url) {
        if (url.indexOf("nocache=") >= 0) {
          url = url.replace(/[\?|&]nocache=[0-9]+/, "");
        }

        if (url.indexOf("ts=") >= 0) {
          url = url.replace(/[\?|&]ts=[0-9]+/, "");
        }

        return url;
      },
      download: function download() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          return cv.report.Record.getInstance().download();
        }

        return null;
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
      __listeners: null,
      __data: null,
      __delta: 50,
      __minDelta: 1,
      __maxDelta: 50,
      __deltas: null,
      __ID: 0,
      record: function record(category, path, data, options) {
        switch (category) {
          case cv.report.Record.XHR:
            data.t = Date.now();

            this.__xhr[path].push(data);

            break;

          case cv.report.Record.CACHE:
          case cv.report.Record.RUNTIME:
            this.__data[category] = data;
            break;

          default:
            this.__log.push({
              c: category,
              t: Date.now(),
              i: path,
              d: data,
              o: options,
              ID: this.__ID
            });

        }

        this.__ID++;
      },

      /**
       * Extract useful data we need from every event
       * @param nativeEvent {Event}
       */
      __extractDataFromEvent: function __extractDataFromEvent(nativeEvent) {
        var data = {
          eventClass: nativeEvent.constructor.name,
          "native": {
            bubbles: nativeEvent.bubbles,
            button: nativeEvent.button,
            clientX: Math.round(nativeEvent.clientX),
            clientY: Math.round(nativeEvent.clientY),
            currentTarget: nativeEvent.currentTarget ? this.__getDomPath(nativeEvent.currentTarget) : undefined,
            relatedTarget: nativeEvent.relatedTarget ? this.__getDomPath(nativeEvent.relatedTarget) : undefined,
            pageX: nativeEvent.pageX ? Math.round(nativeEvent.pageX) : undefined,
            pageY: nativeEvent.pageY ? Math.round(nativeEvent.pageY) : undefined,
            returnValue: nativeEvent.returnValue,
            screenX: Math.round(nativeEvent.screenX),
            screenY: Math.round(nativeEvent.screenY),
            wheelDelta: nativeEvent.wheelDelta,
            wheelDeltaX: nativeEvent.wheelDeltaX,
            wheelDeltaY: nativeEvent.wheelDeltaY,
            delta: nativeEvent.delta,
            deltaX: nativeEvent.deltaX,
            deltaY: nativeEvent.deltaY,
            deltaZ: nativeEvent.deltaZ,
            detail: nativeEvent.detail,
            axis: nativeEvent.axis,
            wheelX: nativeEvent.wheelX,
            wheelY: nativeEvent.wheelY,
            view: nativeEvent.view ? nativeEvent.view.constructor.name : undefined,
            HORIZONTAL_AXIS: nativeEvent.HORIZONTAL_AXIS,
            type: nativeEvent.type,
            x: nativeEvent.x,
            y: nativeEvent.y
          }
        };

        if (data.eventClass === "PointerEvent") {
          Object.assign(data["native"], {
            pointerId: nativeEvent.pointerId,
            width: nativeEvent.width,
            height: nativeEvent.height,
            pressure: nativeEvent.pressure,
            tiltX: nativeEvent.tiltX,
            tiltY: nativeEvent.tiltY,
            pointerType: nativeEvent.pointerType,
            isPrimary: nativeEvent.isPrimary
          });
        } else if (data.eventClass === "WheelEvent") {
          Object.assign(data["native"], {
            deltaX: nativeEvent.deltaX,
            deltaY: nativeEvent.deltaY,
            deltaZ: nativeEvent.deltaZ,
            deltaMode: nativeEvent.deltaMode
          });
        } // delete undefined values


        Object.keys(data["native"]).forEach(function (key) {
          if (data["native"][key] === undefined || data["native"][key] === null) {
            delete data["native"][key];
          }
        });
        return data;
      },
      recordNativeEvent: function recordNativeEvent(ev) {
        if (!cv.report.Record.USER_EVENTS.test(ev.type) || ev.$$RID) {
          return;
        }

        ev.$$RID = this.__ID;

        if (ev.type.endsWith("down") || ev.type.endsWith("start")) {
          this.__delta = this.__minDelta;
        } else if (ev.type.endsWith("up") || ev.type.endsWith("end")) {
          this.__delta = this.__maxDelta;
        }

        if (/.+(move|over|out)/.test(ev.type)) {
          if (!this.__deltas[ev.type]) {
            this.__deltas[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          } else {
            var lastDelta = this.__deltas[ev.type];

            if (Math.abs(lastDelta.x - ev.clientX) <= this.__delta || Math.abs(lastDelta.y - ev.clientY) <= this.__delta) {
              // below delta -> skip this event
              return;
            }

            this.__deltas[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          }
        } // get path


        var path = this.__getDomPath(ev.target);

        if (!path) {
          return;
        }

        this.debug("recording " + ev.type + " on " + path);

        var data = this.__extractDataFromEvent(ev);

        this.record(cv.report.Record.USER, path, data);
      },
      recordScroll: function recordScroll(ev) {
        var page = ev.getTarget();
        var path = undefined !== page && 'getAttribute' in page ? page.getAttribute("id") : undefined;
        var data = {
          type: ev.getType(),
          page: path,
          x: page.scrollLeft,
          y: page.scrollTop
        };
        this.record(cv.report.Record.USER, "scroll", data);
      },
      __getDomPath: function __getDomPath(el) {
        if (el === window) {
          return "Window";
        } else if (el === document) {
          return "document";
        }

        var stack = [];

        while (el.parentNode !== null) {
          var sibCount = 0;
          var sibIndex = 0;

          for (var i = 0; i < el.parentNode.childNodes.length; i++) {
            var sib = el.parentNode.childNodes[i];

            if (sib.nodeName === el.nodeName) {
              if (sib === el) {
                sibIndex = sibCount;
              }

              sibCount++;
            }
          }

          if (el.hasAttribute('id') && el.id !== '') {
            stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            return stack.join(">");
          } else if (sibCount > 1) {
            stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
          } else {
            stack.unshift(el.nodeName.toLowerCase());
          }

          el = el.parentNode;
        }

        return stack.slice(1).join(">"); // removes the html element
      },

      /**
       * Download Log as file
       */
      download: function download() {
        var data = {
          data: this.__data,
          start: this.__start,
          xhr: this.__xhr,
          log: this.__log,
          configSuffix: cv.Config.configSuffix,
          end: Date.now()
        }; // show the user what he gets

        console.log(data);
        var d = new Date();
        var ts = d.getFullYear() + ("" + (d.getMonth() + 1)).padStart(2, "0") + ("" + d.getDate()).padStart(2, "0") + "-" + ("" + d.getHours()).padStart(2, "0") + ("" + d.getMinutes()).padStart(2, "0") + ("" + d.getSeconds()).padStart(2, "0");
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], {
          type: 'application/json'
        }));
        a.download = 'CometVisu-replay-' + ts + '.json'; // Append anchor to body.

        document.body.appendChild(a);
        a.click(); // Remove anchor from body

        document.body.removeChild(a);
        return a.download;
      }
    }
  });
  cv.report.Record.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Record.js.map?dt=1589124097425