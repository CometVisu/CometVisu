/* Gauge.js 
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
 * This plugins integrates Gauge (in canvas) into the visualization
 *
 * @author NetFritz [NetFritz at gmx dot de]
 * @since 0.8.1
 *
 * @ignore(steelseries.*)
 * @asset(plugins/gauge/gauge.css,plugins/gauge/dep/*.min.js)
*/ 
qx.Class.define('cv.plugins.Gauge', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update, cv.ui.common.Operate ],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    pagejumpTarget          : { check: "String", nullable: true },
    gaugeType               : { check: "String", nullable: true },
    subtype                 : { check: "String", nullable: true },
    gType                   : { check: "String", init: "Radial" },
    titleString             : { check: "String", nullable: true },
    unitString              : { check: "String", nullable: true },
    unitStringVisible       : { check: "Boolean", init: false },
    size                    : { check: "Number", init: 150 },
    width                   : { check: "Number", init: 320 },
    height                  : { check: "Number", init: 140 },
    minValue                : { check: "Number", init: 0 },
    maxValue                : { check: "Number", init: 100 },
    frameDesign             : { check: "String", nullable: true },
    backgroundColor         : { check: "String", nullable: true },
    foregroundType          : { check: "String", nullable: true },
    pointerType             : { check: "String", nullable: true },
    pointerColor            : { check: "String", nullable: true },
    lcdColor                : { check: "String", nullable: true },
    lcdVisible              : { check: "Boolean", init: false },
    lcdDecimals             : { check: "Number", nullable:true },
    ledVisible              : { check: "Boolean", init: false },
    ledColor                : { check: "String", nullable: true },
    valueColor              : { check: "String", nullable: true },
    trendVisible            : { check: "Boolean", init: false },
    thresholdRising         : { check: "Boolean", init: false },
    threshold               : {
      check: "Number",
      init: 0,
      apply: "_applyThreshold"
    },
    thresholdVisible        : { check: "Boolean", init: false },
    autoScroll              : { check: "Boolean", init: false },
    valuesNumeric           : { check: "Boolean", init: false }
  },

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
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
      return data;
    },

    getAttributeToPropertyMappings: function() {
      return {
        'target': {target: 'pagejumpTarget'},
        'type': { target: "gType", "default": "Radial" },
        'subtype': { },
        'titleString': { },
        'unitString': { },
        'unitStringVisible': {
          transform: function(value) {
            return value === "true";
          }
        },
        'size': { "default": 150, transform: parseFloat },
        'width': { "default": 320, transform: parseFloat },
        'height': { "default": 140, transform: parseFloat },
        'minValue': { "default": 0, transform: parseFloat },
        'maxValue': { "default": 100, transform: parseFloat },
        'framedesign': { target: 'frameDesign' },
        'background': { target: 'backgroundColor' },
        'lcdVisible': {
          transform: function(value) {
            return value === "true";
          }
        },
        'lcdDecimals': { "default": 0, transform: parseInt },
        'ledVisible': {
          transform: function(value) {
            return value === "true";
          }
        },
        'valueColor': { },
        'trendVisible': {
          transform: function(value) {
            return value === "true";
          }
        },
        'thresholdRising': {
          transform: function(value) {
            return value === "true";
          }
        },
        'threshold': { "default": 0, transform: parseFloat },
        'autoScroll': {
          transform: function(value) {
            return value === "true";
          }
        },
        'valuesNumeric': {
          transform: function(value) {
            return value === "true";
          }
        }
      };
    },

    makeAddressListFn: function( src, transform, mode, variant ) {
      return [ true, variant ];
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __gaugeElement: null,
    __updateQueue: null,

    _getInnerDomString: function() {
      return '<div class="actor' + (this.getPagejumpTarget() ? 'clickable' : '') + '"><canvas id="gauge_' + this.getPath() + '"></canvas></div>';
    },

    // overridden
    _onDomReady: function() {
      var additional = {
        gaugeType: this.getSubtype() ? steelseries.GaugeType[this.getSubtype()] : undefined,
        frameDesign: this.getFrameDesign() ? steelseries.FrameDesign[this.getFrameDesign()] : undefined,
        backgroundColor: this.getBackgroundColor() ? steelseries.BackgroundColor[this.getBackgroundColor()] : undefined,
        valueColor: this.getValueColor() ? steelseries.ColorDef[this.getValueColor()] : steelseries.ColorDef.RED,
        foregroundType: steelseries.ForegroundType.TYPE1,
        pointerType: steelseries.PointerType.TYPE1,
        pointerColor: steelseries.ColorDef.RED,
        lcdColor: steelseries.LcdColor.STANDARD,
        ledColor: steelseries.LedColor.RED_LED
      };
      var params = qx.lang.Object.mergeWith(
        qx.lang.Object.clone(cv.data.Model.getInstance().getWidgetData(this.getPath())),
        additional
      );
      this.__gaugeElement = new steelseries[this.getGType()]("gauge_"+this.getPath(), params);
      this.base(arguments);
    },

    // overridden
    getValueElement: function() {
      return qx.bom.Selector.query('#gauge_' + this.getPath(), this.getDomElement())[0];
    },

    // property apply
    _applyThreshold: function(value) {
      if (value > 0) {
        this.setThresholdVisible(true);
      }
    },

    // overridden
    _processIncomingValue: function(address, data) {
      if (address && data) {
        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      }
      return null;
    },

    /**
     * Handle the incoming data
     * @param value {var} Processed incoming value
     * @param address {String} source address of the value
     */
    handleUpdate: function( value, address) {
      if (!address || value === undefined) { return; }

      var variant = this.getAddress()[address][2];
      var gaugeElement = this.__gaugeElement;
      if (gaugeElement) {
        switch (variant) {
          case 'average':
            if (gaugeElement.setValueAnimatedAverage) {
              gaugeElement.setValueAnimatedAverage(value);
            }
            break;
          case 'setValue':
            if (gaugeElement.setValue) {
              gaugeElement.setValue(value);
            }
            break;
          case 'trend':
            if (gaugeElement.setTrend) {
              var trend;
              if (value > 0) {
                trend = steelseries.TrendState.UP;
              }
              else if (value < 0) {
                trend = steelseries.TrendState.DOWN;
              }
              else {
                trend = steelseries.TrendState.STEADY;
              }
              gaugeElement.setTrend(trend);
            }
            break;
          case 'threshold':
            if (gaugeElement.setThreshold) {
              gaugeElement.setThreshold(value);
            }
            break;
          case 'min':
            if (gaugeElement.setMinValue) {
              gaugeElement.setMinValue(value);
            }
            break;
          case 'max':
            if (gaugeElement.setMaxValue) {
              gaugeElement.setMaxValue(value);
            }
            break;
          default:
            if (gaugeElement.setValueAnimatedLatest) {
              gaugeElement.setValueAnimatedLatest(value);
            }
            if (gaugeElement.setValueAnimated) {
              gaugeElement.setValueAnimated(value);
            }
        }
      }
    },

    // overridden
    _action: function() {
      if (this.getPagejumpTarget()) {
        cv.TemplateEngine.getInstance().scrollToPage( this.getPagejumpTarget() );
      }
    }
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/gauge/gauge.css');
    loader.addScripts([
      'plugins/gauge/dep/tween-min.js',
      'plugins/gauge/dep/steelseries-min.js'
    ]);
    cv.parser.WidgetParser.addHandler("gauge", cv.plugins.Gauge);
    cv.ui.structure.WidgetFactory.registerClass("gauge", statics);
  }
});