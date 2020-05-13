(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.ui.layout.ResizeHandler": {},
      "cv.Transform": {},
      "cv.util.ScriptLoader": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* PowerSpectrum.js 
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
   * The powerspectrum plugin and widget creates a graph to show the power 
   * spectral data that the Enertex Smartmeter can send on the KNX bus.
   * 
   * @author Christian Mayer
   * @since 0.10.0
   * @asset(plugins/diagram/dep/flot/jquery.flot.min.js)
   * @asset(plugins/diagram/dep/flot/jquery.flot.canvas.min.js)
   * @asset(plugins/diagram/dep/flot/jquery.flot.resize.min.js)
   * @asset(plugins/diagram/dep/flot/jquery.flot.navigate.min.js)
   */
  qx.Class.define('cv.plugins.PowerSpectrum', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Update],

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      if (!props.name1) {
        props.name1 = props.singlePhase === true ? "L" : "L1";
      }

      if (!props.name2) {
        props.name2 = "L2";
      }

      if (!props.name3) {
        props.name3 = "L3";
      }

      cv.ui.structure.AbstractWidget.constructor.call(this, props); // some initializations

      this.setSpectrum(this.isSinglePhase() ? [this.setupSpectrum()] : [this.setupSpectrum(-0.26), this.setupSpectrum(0), this.setupSpectrum(0.26)]);
      this.setCurve(this.isSinglePhase() ? [this.setupCurve()] : [this.setupCurve(), this.setupCurve(), this.setupCurve()]);
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      // Constants
      CURRENT: 0,
      VOLTAGE: 1,
      limitEN50160_1999: [[2, 0.02], [3, 0.05], [4, 0.01], [5, 0.06], [6, 0.005], [7, 0.05], [8, 0.005], [9, 0.015], [10, 0.005], [11, 0.035], [12, 0.005], [13, 0.03], [14, 0.005], [15, 0.005], [16, 0.005], [17, 0.02], [18, 0.005], [19, 0.015], [20, 0.005], [21, 0.005], [22, 0.005], [23, 0.015], [24, 0.005], [25, 0.015]],
      // limit for voltage in ratio
      limitEN61000_3_2: [[2, 1.620], [3, 3.450], [4, 0.650], [5, 1.710], [6, 0.450], [7, 1.160], [8, 0.350], [9, 0.600], [10, 0.280], [11, 0.500], [12, 0.233], [13, 0.320], [14, 0.200], [15, 0.230], [16, 0.175], [17, 0.203], [18, 0.155], [19, 0.182], [20, 0.140], [21, 0.164], [22, 0.127], [23, 0.150], [24, 0.117], [25, 0.139]],
      // limit for current in Ampere
      referenceSin: [[], [], []],
      // fix limits for better displaying
      fixLimits: function fixLimits(entry, index, array) {
        array[index][0] -= 0.5;
      },
      lastShifted: function lastShifted(array) {
        var last = array[array.length - 1];
        return [last[0] + 1, last[1]];
      },

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
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'type': {
            target: 'displayType',
            transform: function transform(value) {
              return value === 'current' ? cv.plugins.PowerSpectrum.CURRENT : cv.plugins.PowerSpectrum.VOLTAGE;
            }
          },
          'singlephase': {
            target: 'singlePhase',
            transform: function transform(value) {
              return value === "true";
            }
          },
          'limitname': {
            target: 'limitName',
            "default": "limit"
          },
          'name1': {},
          'name2': {},
          'name3': {},
          'spectrumonly': {
            target: 'showCurve',
            transform: function transform(value) {
              return value !== 'true';
            }
          },
          'showlegend': {
            target: 'showLegend',
            transform: function transform(value) {
              return value === "true";
            }
          },
          'limitcolor': {
            target: "limitColor",
            "default": "#edc240" // default directly from flot code

          },
          'color1': {
            "default": "#afd8f8"
          },
          'color2': {
            "default": "#cb4b4b"
          },
          'color3': {
            "default": "#4da74d"
          }
        };
      },
      makeAddressListFn: function makeAddressListFn(src, transform, mode, variant) {
        if (!variant) {
          variant = 'spectrum'; // the default
        }

        return [true, variant];
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      displayType: {
        check: [0, 1],
        init: 1
      },
      singlePhase: {
        check: "Boolean",
        init: false
      },
      spectrum: {
        check: "Array",
        init: []
      },
      limitName: {
        check: "String",
        init: "limit"
      },
      name1: {
        check: "String",
        init: "L1"
      },
      name2: {
        check: "String",
        init: "L2"
      },
      name3: {
        check: "String",
        init: "L3"
      },
      curve: {
        check: "Array",
        init: []
      },
      showCurve: {
        check: "Boolean",
        init: false
      },
      showLegend: {
        check: "Boolean",
        init: false
      },
      current: {
        check: "Array",
        init: []
      },
      limitColor: {
        check: "Color",
        init: "#edc240"
      },
      color1: {
        check: "Color",
        init: "#afd8f8"
      },
      color2: {
        check: "Color",
        init: "#cb4b4b"
      },
      color3: {
        check: "Color",
        init: "#4da74d"
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __plot: null,
      __plotCurve: null,
      _getInnerDomString: function _getInnerDomString() {
        // create the actor
        var actor = '<div class="actor clickable">';

        if (this.isShowCurve()) {
          actor += '<div class="diagram_inline curve">loading...</div>';
        }

        actor += '<div class="diagram_inline spectrum">loading...</div></div>';
        return actor;
      },
      _onDomReady: function _onDomReady() {
        cv.plugins.PowerSpectrum.prototype._onDomReady.base.call(this);

        var colors = [this.getLimitColor(), this.getColor1(), this.getColor2(), this.getColor3()];
        var diagramCurve = this.isShowCurve() && $('#' + this.getPath() + ' .actor div.curve').empty(),
            optionsCurve = this.isShowCurve() && {
          colors: colors,
          legend: {
            show: this.isShowLegend()
          },
          xaxis: {
            show: false
          },
          yaxis: {
            show: false
          }
        },
            diagramSpectrum = $('#' + this.getPath() + ' .actor div.spectrum').empty(),
            optionsSpectrum = {
          colors: colors,
          series: {
            bars: {
              show: true,
              fill: 1,
              fillColor: null,
              lineWidth: 0
            }
          },
          bars: {
            align: "center",
            barWidth: this.isSinglePhase() ? 0.75 : 0.25
          },
          legend: {
            show: this.isShowLegend()
          },
          xaxis: {
            show: false
          },
          yaxis: {
            show: false
          }
        };

        var init = function () {
          this.__plotCurve = this.isShowCurve() && $.plot(diagramCurve, this.createDatasetCurve(), optionsCurve);
          this.__plot = $.plot(diagramSpectrum, this.createDatasetSpectrum(), optionsSpectrum);
        }.bind(this); // check if sizes are set yet, otherwise wait some time


        if (cv.ui.layout.ResizeHandler.states.isPageSizeInvalid()) {
          cv.ui.layout.ResizeHandler.states.addListenerOnce('changePageSizeInvalid', init);
        } else {
          init();
        }
      },
      _update: function _update(ga, data) {
        if (ga === undefined) {
          return;
        }

        var addressInfo = this.getAddress()[ga];
        var phase;

        if (addressInfo[2][0] === 'I') {
          phase = this.isSinglePhase() ? 1 : +(addressInfo[2][1] || 1);
          var value = cv.Transform.encode(addressInfo[0], data);
          this.getCurrent()[phase - 1] = value / 1000; // transform mA to A
        } else if (addressInfo[2].substr(0, 8) === 'spectrum' && data.length === 28) // sanity check for 14 bytes
          {
            phase = this.isSinglePhase() ? 1 : +(addressInfo[2][8] || 1);
            var index = parseInt(data.substr(0, 2), 16),
                factor = this.getCurrent()[phase - 1] || 1,
                values = [];

            for (var i = 0; i < 13; i++) {
              if (index + i < 2) {
                continue;
              }

              values[i] = Math.pow(10, (parseInt(data.substr(i * 2 + 2, 2), 16) - 253) / 80);
              this.getSpectrum()[phase - 1][index + i - 2][1] = values[i] * factor;
            }

            this.__plot.setData(this.createDatasetSpectrum());

            this.__plot.draw();

            if (this.__plotCurve) {
              this.updateCurve(this.getSpectrum(), this.getCurve(), phase - 1);

              this.__plotCurve.setData(this.createDatasetCurve());

              this.__plotCurve.draw();
            }
          }
      },

      /**
       * Setup helper
       */
      setupCurve: function setupCurve() {
        return [[0, 0], [0.4, 0], [0.8, 0], [1.2, 0], [1.6, 0], [2, 0], [2.4, 0], [2.8, 0], [3.2, 0], [3.6, 0], [4, 0], [4.4, 0], [4.8, 0], [5.2, 0], [5.6, 0], [6, 0], [6.4, 0], [6.8, 0], [7.2, 0], [7.6, 0], [8, 0], [8.4, 0], [8.8, 0], [9.2, 0], [9.6, 0], [10, 0], [10.4, 0], [10.8, 0], [11.2, 0], [11.6, 0], [12, 0], [12.4, 0], [12.8, 0], [13.2, 0], [13.6, 0], [14, 0], [14.4, 0], [14.8, 0], [15.2, 0], [15.6, 0], [16, 0], [16.4, 0], [16.8, 0], [17.2, 0], [17.6, 0], [18, 0], [18.4, 0], [18.8, 0], [19.2, 0], [19.6, 0]];
      },
      setupSpectrum: function setupSpectrum(offset) {
        var ret_val = [];

        if (undefined === offset) {
          offset = 0;
        }

        for (var i = 2; i < 52; i++) {
          ret_val.push([i + offset, 0]);
        }

        return ret_val;
      },

      /**
       * Convert a spectrum to a curve
       */
      updateCurve: function updateCurve(input, target, phase) {
        var inp = input[phase],
            out = target[phase],
            shift = (phase * 2 / 3 - 0.5) * Math.PI;

        for (var i = 0; i < 50; i++) {
          var phi = i * Math.PI / 25,
              value = Math.cos(phi + shift); // the base with 50 Hz
          // the harmonics

          for (var j = 2; j < 50; j++) {
            value += Math.cos((phi + shift) * j) * inp[j][1];
          }

          out[i][1] = value;
        }
      },

      /**
       * Little helper to setup the Flot dataset structure.
       */
      createDatasetCurve: function createDatasetCurve() {
        return this.isSinglePhase() ? [{
          label: null,
          data: cv.plugins.PowerSpectrum.referenceSin[0],
          color: 13
        }, // trick flot to automatically make color darker
        {
          label: 'L',
          data: this.getCurve()[0],
          color: 1
        }] : [{
          label: null,
          data: cv.plugins.PowerSpectrum.referenceSin[0],
          color: 13
        }, {
          label: null,
          data: cv.plugins.PowerSpectrum.referenceSin[1],
          color: 14
        }, {
          label: null,
          data: cv.plugins.PowerSpectrum.referenceSin[2],
          color: 15
        }, {
          label: 'L1',
          data: this.getCurve()[0],
          color: 1
        }, {
          label: 'L2',
          data: this.getCurve()[1],
          color: 2
        }, {
          label: 'L3',
          data: this.getCurve()[2],
          color: 3
        }];
      },

      /**
       * Little helper to setup the Flot dataset structure.
       */
      createDatasetSpectrum: function createDatasetSpectrum() {
        return this.isSinglePhase() ? [{
          label: this.getLimitName(),
          data: this.getDisplayType() === cv.plugins.PowerSpectrum.VOLTAGE ? cv.plugins.PowerSpectrum.limitEN50160_1999 : cv.plugins.PowerSpectrum.limitEN61000_3_2,
          bars: {
            show: false
          },
          lines: {
            steps: true
          },
          color: 0
        }, {
          label: this.getName1(),
          data: this.getSpectrum()[0],
          color: 1
        }] : [{
          label: this.getLimitName(),
          data: this.getDisplayType() === cv.plugins.PowerSpectrum.VOLTAGE ? cv.plugins.PowerSpectrum.limitEN50160_1999 : cv.plugins.PowerSpectrum.limitEN61000_3_2,
          bars: {
            show: false
          },
          lines: {
            steps: true
          },
          color: 0
        }, {
          label: this.getName1(),
          data: this.getSpectrum()[0],
          color: 1
        }, {
          label: this.getName2(),
          data: this.getSpectrum()[1],
          color: 2
        }, {
          label: this.getName3(),
          data: this.getSpectrum()[2],
          color: 3
        }];
      }
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addScripts(['plugins/diagram/dep/flot/jquery.flot.min.js', 'plugins/diagram/dep/flot/jquery.flot.canvas.min.js', 'plugins/diagram/dep/flot/jquery.flot.resize.min.js', 'plugins/diagram/dep/flot/jquery.flot.navigate.min.js']);
      cv.parser.WidgetParser.addHandler("powerspectrum", cv.plugins.PowerSpectrum);
      cv.ui.structure.WidgetFactory.registerClass("powerspectrum", statics); // init

      statics.limitEN50160_1999.forEach(statics.fixLimits);
      statics.limitEN50160_1999.push(statics.lastShifted(statics.limitEN50160_1999));
      statics.limitEN61000_3_2.forEach(statics.fixLimits);
      statics.limitEN61000_3_2.push(statics.lastShifted(statics.limitEN61000_3_2)); // fill reference

      for (var phi = 0; phi < 50; phi++) {
        var time = phi * 20 / 50; // time in milliseconds

        statics.referenceSin[0].push([time, Math.sin(phi * Math.PI / 25)]);
        statics.referenceSin[1].push([time, Math.sin((phi + 16.666666666666668) * Math.PI / 25)]);
        statics.referenceSin[2].push([time, Math.sin((phi + 33.333333333333336) * Math.PI / 25)]);
      }
    }
  });
  cv.plugins.PowerSpectrum.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PowerSpectrum.js.map?dt=1589396806087