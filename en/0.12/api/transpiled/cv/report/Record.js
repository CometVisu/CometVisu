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
      this.__P_477_0 = [];
      this.__P_477_1 = {};
      this.__P_477_2 = Date.now();
      this.__P_477_3 = {
        response: [],
        request: []
      };
      this.__P_477_4 = {};
      this.__P_477_5 = {};
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
      __P_477_2: null,
      __P_477_0: null,
      __P_477_3: null,
      __P_477_1: null,
      __P_477_4: null,
      __P_477_6: 50,
      __P_477_7: 1,
      __P_477_8: 50,
      __P_477_5: null,
      __P_477_9: 0,
      record: function record(category, path, data, options) {
        switch (category) {
          case cv.report.Record.XHR:
            data.t = Date.now();

            this.__P_477_3[path].push(data);

            break;

          case cv.report.Record.CACHE:
          case cv.report.Record.RUNTIME:
            this.__P_477_4[category] = data;
            break;

          default:
            this.__P_477_0.push({
              c: category,
              t: Date.now(),
              i: path,
              d: data,
              o: options,
              ID: this.__P_477_9
            });

        }

        this.__P_477_9++;
      },

      /**
       * Extract useful data we need from every event
       * @param nativeEvent {Event}
       */
      __P_477_10: function __P_477_10(nativeEvent) {
        var data = {
          eventClass: nativeEvent.constructor.name,
          "native": {
            bubbles: nativeEvent.bubbles,
            button: nativeEvent.button,
            clientX: Math.round(nativeEvent.clientX),
            clientY: Math.round(nativeEvent.clientY),
            currentTarget: nativeEvent.currentTarget ? this.__P_477_11(nativeEvent.currentTarget) : undefined,
            relatedTarget: nativeEvent.relatedTarget ? this.__P_477_11(nativeEvent.relatedTarget) : undefined,
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

        ev.$$RID = this.__P_477_9;

        if (ev.type.endsWith("down") || ev.type.endsWith("start")) {
          this.__P_477_6 = this.__P_477_7;
        } else if (ev.type.endsWith("up") || ev.type.endsWith("end")) {
          this.__P_477_6 = this.__P_477_8;
        }

        if (/.+(move|over|out)/.test(ev.type)) {
          if (!this.__P_477_5[ev.type]) {
            this.__P_477_5[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          } else {
            var lastDelta = this.__P_477_5[ev.type];

            if (Math.abs(lastDelta.x - ev.clientX) <= this.__P_477_6 || Math.abs(lastDelta.y - ev.clientY) <= this.__P_477_6) {
              // below delta -> skip this event
              return;
            }

            this.__P_477_5[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          }
        } // get path


        var path = this.__P_477_11(ev.target);

        if (!path) {
          return;
        }

        this.debug("recording " + ev.type + " on " + path);

        var data = this.__P_477_10(ev);

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
      __P_477_11: function __P_477_11(el) {
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
          data: this.__P_477_4,
          start: this.__P_477_2,
          xhr: this.__P_477_3,
          log: this.__P_477_0,
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

//# sourceMappingURL=Record.js.map?dt=1614107152287