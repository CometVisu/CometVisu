/* PowerSpectrum.js
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
qx.Class.define("cv.plugins.PowerSpectrum", {
  extend: cv.ui.structure.pure.AbstractWidget,
  include: [cv.ui.common.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct(props) {
    if (!props.name1) {
      props.name1 = props.singlePhase === true ? "L" : "L1";
    }
    if (!props.name2) {
      props.name2 = "L2";
    }
    if (!props.name3) {
      props.name3 = "L3";
    }
    super(props);

    // some initializations
    this.setSpectrum(
      this.isSinglePhase()
        ? [this.setupSpectrum()]
        : [
            this.setupSpectrum(-0.26),
            this.setupSpectrum(0),
            this.setupSpectrum(0.26),
          ]
    );
    this.setCurve(
      this.isSinglePhase()
        ? [this.setupCurve()]
        : [this.setupCurve(), this.setupCurve(), this.setupCurve()]
    );
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
    limitEN50160_1999: [
      [2, 0.02],
      [3, 0.05],
      [4, 0.01],
      [5, 0.06],
      [6, 0.005],
      [7, 0.05],
      [8, 0.005],
      [9, 0.015],
      [10, 0.005],
      [11, 0.035],
      [12, 0.005],
      [13, 0.03],
      [14, 0.005],
      [15, 0.005],
      [16, 0.005],
      [17, 0.02],
      [18, 0.005],
      [19, 0.015],
      [20, 0.005],
      [21, 0.005],
      [22, 0.005],
      [23, 0.015],
      [24, 0.005],
      [25, 0.015],
    ],
    // limit for voltage in ratio
    limitEN61000_3_2: [
      [2, 1.62],
      [3, 3.45],
      [4, 0.65],
      [5, 1.71],
      [6, 0.45],
      [7, 1.16],
      [8, 0.35],
      [9, 0.6],
      [10, 0.28],
      [11, 0.5],
      [12, 0.233],
      [13, 0.32],
      [14, 0.2],
      [15, 0.23],
      [16, 0.175],
      [17, 0.203],
      [18, 0.155],
      [19, 0.182],
      [20, 0.14],
      [21, 0.164],
      [22, 0.127],
      [23, 0.15],
      [24, 0.117],
      [25, 0.139],
    ],
    // limit for current in Ampere
    referenceSin: [[], [], []],

    // fix limits for better displaying
    fixLimits(entry, index, array) {
      array[index][0] -= 0.5;
    },
    lastShifted(array) {
      const last = array[array.length - 1];
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
    parse(xml, path, flavour, pageType) {
      const data = cv.parser.pure.WidgetParser.parseElement(
        this,
        xml,
        path,
        flavour,
        pageType,
        this.getAttributeToPropertyMappings()
      );
      cv.parser.pure.WidgetParser.parseFormat(xml, path);
      cv.parser.pure.WidgetParser.parseAddress(
        xml,
        path,
        this.makeAddressListFn
      );
      return data;
    },

    getAttributeToPropertyMappings() {
      return {
        type: {
          target: "displayType",
          transform(value) {
            return value === "current"
              ? cv.plugins.PowerSpectrum.CURRENT
              : cv.plugins.PowerSpectrum.VOLTAGE;
          },
        },

        singlephase: {
          target: "singlePhase",
          transform(value) {
            return value === "true";
          },
        },

        limitname: {
          target: "limitName",
          default: "limit",
        },

        name1: {},
        name2: {},
        name3: {},
        spectrumonly: {
          target: "showCurve",
          transform(value) {
            return value !== "true";
          },
        },

        showlegend: {
          target: "showLegend",
          transform(value) {
            return value === "true";
          },
        },

        limitcolor: {
          target: "limitColor",
          default: "#edc240", // default directly from flot code
        },
        color1: {
          default: "#afd8f8",
        },

        color2: {
          default: "#cb4b4b",
        },

        color3: {
          default: "#4da74d",
        },
      };
    },

    makeAddressListFn(src, transform, mode, variant) {
      if (!variant) {
        variant = "spectrum"; // the default
      }
      return [true, variant];
    },
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    displayType: {
      check: [0, 1],
      init: 1,
    },

    singlePhase: {
      check: "Boolean",
      init: false,
    },

    spectrum: {
      check: "Array",
      init: [],
    },

    limitName: {
      check: "String",
      init: "limit",
    },

    name1: {
      check: "String",
      init: "L1",
    },

    name2: {
      check: "String",
      init: "L2",
    },

    name3: {
      check: "String",
      init: "L3",
    },

    curve: {
      check: "Array",
      init: [],
    },

    showCurve: {
      check: "Boolean",
      init: false,
    },

    showLegend: {
      check: "Boolean",
      init: false,
    },

    current: {
      check: "Array",
      init: [],
    },

    limitColor: {
      check: "Color",
      init: "#edc240",
    },

    color1: {
      check: "Color",
      init: "#afd8f8",
    },

    color2: {
      check: "Color",
      init: "#cb4b4b",
    },

    color3: {
      check: "Color",
      init: "#4da74d",
    },
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __plot: null,
    __plotCurve: null,

    _getInnerDomString() {
      // create the actor
      let actor = '<div class="actor clickable">';
      if (this.isShowCurve()) {
        actor += '<div class="diagram_inline curve">loading...</div>';
      }
      actor += '<div class="diagram_inline spectrum">loading...</div></div>';
      return actor;
    },

    _onDomReady() {
      super._onDomReady();
      const colors = [
        this.getLimitColor(),
        this.getColor1(),
        this.getColor2(),
        this.getColor3(),
      ];

      const diagramCurve =
        this.isShowCurve() &&
        $("#" + this.getPath() + " .actor div.curve").empty();
      const optionsCurve = this.isShowCurve() && {
        colors: colors,
        legend: {
          show: this.isShowLegend(),
        },

        xaxis: {
          show: false,
        },

        yaxis: {
          show: false,
        },
      };

      const diagramSpectrum = $(
        "#" + this.getPath() + " .actor div.spectrum"
      ).empty();
      const optionsSpectrum = {
        colors: colors,
        series: {
          bars: {
            show: true,
            fill: 1,
            fillColor: null,
            lineWidth: 0,
          },
        },

        bars: {
          align: "center",
          barWidth: this.isSinglePhase() ? 0.75 : 0.25,
        },

        legend: {
          show: this.isShowLegend(),
        },

        xaxis: {
          show: false,
        },

        yaxis: {
          show: false,
        },
      };

      const init = function () {
        this.__plotCurve =
          this.isShowCurve() &&
          $.plot(diagramCurve, this.createDatasetCurve(), optionsCurve);
        this.__plot = $.plot(
          diagramSpectrum,
          this.createDatasetSpectrum(),
          optionsSpectrum
        );
      }.bind(this);

      // check if sizes are set yet, otherwise wait some time
      if (
        cv.ui.structure.pure.layout.ResizeHandler.states.isPageSizeInvalid()
      ) {
        cv.ui.structure.pure.layout.ResizeHandler.states.addListenerOnce(
          "changePageSizeInvalid",
          init
        );
      } else {
        init();
      }
    },

    _update(ga, data) {
      if (ga === undefined) {
        return;
      }
      const addressInfo = this.getAddress()[ga];

      let phase;
      if (addressInfo.variantInfo[0] === "I") {
        phase = this.isSinglePhase() ? 1 : +(addressInfo.variantInfo[1] || 1);
        const value = cv.Transform.encode(addressInfo, data);
        this.getCurrent()[phase - 1] = value / 1000; // transform mA to A
      } else if (
        addressInfo.variantInfo.substr(0, 8) === "spectrum" &&
        data.length === 28
      ) {
        // sanity check for 14 bytes
        phase = this.isSinglePhase() ? 1 : +(addressInfo.variantInfo[8] || 1);
        const index = parseInt(data.substr(0, 2), 16);
        const factor = this.getCurrent()[phase - 1] || 1;
        const values = [];

        for (let i = 0; i < 13; i++) {
          if (index + i < 2) {
            continue;
          }
          values[i] = Math.pow(
            10,
            (parseInt(data.substr(i * 2 + 2, 2), 16) - 253) / 80
          );
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
    setupCurve() {
      return [
        [0, 0],
        [0.4, 0],
        [0.8, 0],
        [1.2, 0],
        [1.6, 0],
        [2, 0],
        [2.4, 0],
        [2.8, 0],
        [3.2, 0],
        [3.6, 0],
        [4, 0],
        [4.4, 0],
        [4.8, 0],
        [5.2, 0],
        [5.6, 0],
        [6, 0],
        [6.4, 0],
        [6.8, 0],
        [7.2, 0],
        [7.6, 0],
        [8, 0],
        [8.4, 0],
        [8.8, 0],
        [9.2, 0],
        [9.6, 0],
        [10, 0],
        [10.4, 0],
        [10.8, 0],
        [11.2, 0],
        [11.6, 0],
        [12, 0],
        [12.4, 0],
        [12.8, 0],
        [13.2, 0],
        [13.6, 0],
        [14, 0],
        [14.4, 0],
        [14.8, 0],
        [15.2, 0],
        [15.6, 0],
        [16, 0],
        [16.4, 0],
        [16.8, 0],
        [17.2, 0],
        [17.6, 0],
        [18, 0],
        [18.4, 0],
        [18.8, 0],
        [19.2, 0],
        [19.6, 0],
      ];
    },
    setupSpectrum(offset) {
      const ret_val = [];

      if (undefined === offset) {
        offset = 0;
      }
      for (let i = 2; i < 52; i++) {
        ret_val.push([i + offset, 0]);
      }
      return ret_val;
    },

    /**
     * Convert a spectrum to a curve
     * @param input
     * @param target
     * @param phase
     */
    updateCurve(input, target, phase) {
      const inp = input[phase];
      const out = target[phase];
      const shift = ((phase * 2) / 3 - 0.5) * Math.PI;

      for (let i = 0; i < 50; i++) {
        const phi = (i * Math.PI) / 25;
        let value = Math.cos(phi + shift); // the base with 50 Hz

        // the harmonics
        for (let j = 2; j < 50; j++) {
          value += Math.cos((phi + shift) * j) * inp[j][1];
        }

        out[i][1] = value;
      }
    },

    /**
     * Little helper to setup the Flot dataset structure.
     */
    createDatasetCurve() {
      return this.isSinglePhase()
        ? [
            {
              label: null,
              data: this.self(arguments).referenceSin[0],
              color: 13,
            }, // trick flot to automatically make color darker
            { label: "L", data: this.getCurve()[0], color: 1 },
          ]
        : [
            {
              label: null,
              data: this.self(arguments).referenceSin[0],
              color: 13,
            },
            {
              label: null,
              data: this.self(arguments).referenceSin[1],
              color: 14,
            },
            {
              label: null,
              data: this.self(arguments).referenceSin[2],
              color: 15,
            },
            { label: "L1", data: this.getCurve()[0], color: 1 },
            { label: "L2", data: this.getCurve()[1], color: 2 },
            { label: "L3", data: this.getCurve()[2], color: 3 },
          ];
    },

    /**
     * Little helper to setup the Flot dataset structure.
     */
    createDatasetSpectrum() {
      return this.isSinglePhase()
        ? [
            {
              label: this.getLimitName(),
              data:
                this.getDisplayType() === this.self(arguments).VOLTAGE
                  ? this.self(arguments).limitEN50160_1999
                  : this.self(arguments).limitEN61000_3_2,
              bars: { show: false },
              lines: { steps: true },
              color: 0,
            },
            { label: this.getName1(), data: this.getSpectrum()[0], color: 1 },
          ]
        : [
            {
              label: this.getLimitName(),
              data:
                this.getDisplayType() === this.self(arguments).VOLTAGE
                  ? this.self(arguments).limitEN50160_1999
                  : this.self(arguments).limitEN61000_3_2,
              bars: { show: false },
              lines: { steps: true },
              color: 0,
            },
            { label: this.getName1(), data: this.getSpectrum()[0], color: 1 },
            { label: this.getName2(), data: this.getSpectrum()[1], color: 2 },
            { label: this.getName3(), data: this.getSpectrum()[2], color: 3 },
          ];
    },
  },

  defer(statics) {
    const loader = cv.util.ScriptLoader.getInstance();
    loader.addScripts([
      "plugins/diagram/dep/flot/jquery.flot.min.js",
      "plugins/diagram/dep/flot/jquery.flot.canvas.min.js",
      "plugins/diagram/dep/flot/jquery.flot.resize.min.js",
      "plugins/diagram/dep/flot/jquery.flot.navigate.min.js",
    ]);

    cv.parser.pure.WidgetParser.addHandler(
      "powerspectrum",
      cv.plugins.PowerSpectrum
    );
    cv.ui.structure.WidgetFactory.registerClass("powerspectrum", statics);

    // init
    statics.limitEN50160_1999.forEach(statics.fixLimits);
    statics.limitEN50160_1999.push(
      statics.lastShifted(statics.limitEN50160_1999)
    );
    statics.limitEN61000_3_2.forEach(statics.fixLimits);
    statics.limitEN61000_3_2.push(
      statics.lastShifted(statics.limitEN61000_3_2)
    );

    // fill reference
    for (let phi = 0; phi < 50; phi++) {
      const time = (phi * 20) / 50; // time in milliseconds

      statics.referenceSin[0].push([time, Math.sin((phi * Math.PI) / 25)]);
      statics.referenceSin[1].push([
        time,
        Math.sin(((phi + 50 / 3) * Math.PI) / 25),
      ]);
      statics.referenceSin[2].push([
        time,
        Math.sin(((phi + 100 / 3) * Math.PI) / 25),
      ]);
    }
  },
});
