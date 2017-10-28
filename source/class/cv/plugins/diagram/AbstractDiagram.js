/* AbstractDiagram.js 
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
 * This plugins integrates flot (diagrams in javascript) into the visualization.
 * server-side data-storage is rrd
 *
 * short documentation
 *
 * <h4>widgets:</h4>
 * <ul>
 *   <li>diagram</li>
 *   <li>diagram_info</li>
 * </ul>
 *
 * <h4>attributes (per diagram):</h4>
 * <ul>
 *   <li>series:               optional, "hour", "day" (default), "week", "month", "year"</li>
 *   <li>period:               optional, number of "series" to be shown</li>
 *   <li>refresh:              optional, refresh-rate in seconds, no refresh if missing</li>
 *   <li>gridcolor:            optional, color for dataline and grid, HTML-colorcode</li>
 *   <li>width, height:        optional, width and height of "inline"-diagram</li>
 *   <li>previewlabels:        optional, show labels on "inline"-diagram</li>
 *   <li>popup:                optional, make diagram clickable and open popup</li>
 *   <li>legend:               optional, "none", "both", "inline", "popup" select display of legend</li>
 *   <li>title:                optional, diagram title (overrides label-content)</li>
 * </ul>
 *
 * <h4>attributes (per graph):</h4>
 * <ul>
 *   <li>style:                optional, "lines" (default), "bars", "points" select graph type</li>
 *   <li>fill:                 optional, true or false - fill the space under the line / within the bar (line / bar style graphs)</li>
 *   <li>barWidth:             optional, width of bars (bar style graphs)</li>
 *   <li>align:                optional, "left" (default), "center", "right" select qlignemnt of bars (bar style graphs)</li>
 * </ul>
 *
 * @author Michael Hausl [michael at hausl dot com]
 * @since 2014
 *
 * @asset(plugins/diagram/dep/flot/*.min.js)
 */
qx.Class.define('cv.plugins.diagram.AbstractDiagram', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Refresh],
  type: "abstract",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    cache: {},
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType, mappings) {
      if (mappings) {
        mappings = qx.lang.Object.mergeWith(mappings, this.getAttributeToPropertyMappings());
      } else {
        mappings = this.getAttributeToPropertyMappings();
      }
      cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, mappings);
      cv.parser.WidgetParser.parseRefresh(xml, path);

      var legend = qx.bom.element.Attribute.get(xml, "legend") || "both";
      return cv.data.Model.getInstance().setWidgetData( path, {
        content           : this.getDiagramElements(xml),
        legendInline      : ["both", "inline"].indexOf(legend) >= 0,
        legendPopup       : ["both", "popup"].indexOf(legend) >= 0
      } );
    },

    getAttributeToPropertyMappings: function() {
      return {
        series            : { "default": "day" },
        seriesStart       : { "default": "end-month" },
        seriesEnd         : { "default": "now" },
        seriesResolution  : { "default": 300, transform: parseInt },
        period            : { "default": 1, transform: parseInt },
        legendposition    : { "default": "ne" },
        timeformat        : {},
        timeformatTooltip : { "default": "%d.%m.%Y %H:%M" },
        zoomYAxis         : { transform: function(value) {
          return value === "true";
        }},
        title             : { target: "title" },
        refresh           : {},
        gridcolor         : { "default": "#81664B" },
        previewlabels     : { transform: function(value) {
          return value === "true";
        }},
        popup             : { transform: function(value) {
          return value === "true";
        }},
        tooltip           : { transform: function(value) {
          return value === "true";
        }}
      };
    },

    getDiagramElements: function(xmlElement) {
      var retVal = {
        axes    : [],
        axesnum : 0,
        rrd     : [],
        rrdnum  : 0
      };
      var axesNameIndex = [];

      qx.bom.Selector.query('axis', xmlElement).forEach(function(elem) {
        var unit = elem.getAttribute('unit') || "";
        retVal.axes[retVal.axesnum] = {
          axisLabel     : elem.getAttribute('label') || null,
          position      : elem.getAttribute('position') || "left",
          min           : elem.getAttribute('min') || null,
          max           : elem.getAttribute('max') || null,
          unit          : unit,
          tickDecimals  : elem.getAttribute('decimals') || null,
          tickFormatter : function (v, axis) {
            return v.toFixed(axis.tickDecimals) + unit;
          }
        };
        retVal.axesnum++;
        axesNameIndex[qx.dom.Node.getText(elem)] = retVal.axesnum;
      }, this);

      qx.bom.Selector.query("rrd", xmlElement).forEach(function(elem) {
        var src = qx.dom.Node.getText(elem);
        retVal.rrd[retVal.rrdnum] = {
          src       : src,
          color     : elem.getAttribute('color'),
          label     : elem.getAttribute('label') || src,
          axisIndex : axesNameIndex[elem.getAttribute('yaxis')] || 1,
          steps     : (elem.getAttribute("steps") || "false") === "true",
          fill      : (elem.getAttribute("fill") || "false") === "true",
          scaling   : parseFloat(elem.getAttribute('scaling')) || 1.0,
          dsIndex   : elem.getAttribute('datasourceIndex') || 0,
          cFunc     : elem.getAttribute('consolidationFunction') || "AVERAGE",
          resol     : parseInt(elem.getAttribute('resolution')),
          offset    : parseInt(elem.getAttribute('offset')),
          style     : elem.getAttribute('style') || "lines",
          align     : elem.getAttribute('align') || "center",
          barWidth  : elem.getAttribute('barWidth') || 1
        };
        if (retVal.rrd[retVal.rrdnum].dsIndex < 0) {
          retVal.rrd[retVal.rrdnum].dsIndex = 0;
        }
        retVal.rrdnum++;
      }, this);
      return retVal;
    },

    /**
     * Get the rrd and put it's content in the cache.
     * @param refresh {Number} time is seconds to refresh the data
     * @param force {Boolean} Update even when the cache is still valid
     * @param callback {Function} call when the data has arrived
     */
    lookupRRDcache: function( rrd, start, end, res, refresh, force, callback, callbackParameter ) {
      var
        url = cv.TemplateEngine.getInstance().visu.getResourcePath('rrd')+"?rrd=" + rrd.src + ".rrd&ds=" + rrd.cFunc + "&start=" + start + "&end=" + end + "&res=" + res,
        key = url + '|' + rrd.dsIndex,
        urlNotInCache = !(key in this.cache),
        doLoad = force || urlNotInCache || !('data' in this.cache[ key ]) || (refresh!==undefined && (Date.now()-this.cache[key].timestamp) > refresh*1000);

      if( doLoad )
      {
        if( urlNotInCache ) {
          this.cache[key] = {waitingCallbacks: []};
        }
        this.cache[ key ].waitingCallbacks.push( [ callback, callbackParameter ] );

        if( this.cache[ key ].waitingCallbacks.length === 1 ) {
          if (this.cache[ key ].xhr) {
            this.cache[ key ].xhr.dispose();
          }
          var xhr = new qx.io.request.Xhr(url);
          xhr.set({
            accept: "application/json"
          });
          xhr.addListener("success", qx.lang.Function.curry(this._onSuccess, rrd, key), this);
          this.cache[ key ].xhr = xhr;
          xhr.send();
        }
      } else {
        callback( this.cache[key].data, callbackParameter );
      }
    },

    _onSuccess: function(rrd, key, ev) {
      var rrddata = ev.getTarget().getResponse();
      if (rrddata !== null) {
        // calculate timestamp offset and scaling
        var millisOffset = (rrd.offset ? rrd.offset * 1000 : 0);
        var newRrd = new Array(rrddata.length);
        for (var j = 0, l = rrddata.length; j < l; j++) {
          newRrd[j] = [(rrddata[j][0] + millisOffset), (parseFloat(rrddata[j][1][rrd.dsIndex]) * rrd.scaling)];
        }
        rrddata = newRrd;
      }
      this.cache[key].data = rrddata;
      this.cache[key].timestamp = Date.now();

      this.cache[key].waitingCallbacks.forEach(function (waitingCallback) {
        waitingCallback[0](rrddata, waitingCallback[1]);
      }, this);
      this.cache[key].waitingCallbacks.length = 0; // empty array)
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    content: {
      check: "Object",
      init: {}
    },
    title: {
      check: "String",
      nullable: true,
      apply: "_applyTitle"
    },
    series: {
      check: ["hour", "day", "week", "month", "year", "fullday", "custom"],
      init: "day"
    },
    seriesStart: {
      check: "String",
      init: "end-month"
    },
    seriesEnd: {
      check: "String",
      init: "now"
    },
    seriesResolution: {
      check: "Number",
      init: 300
    },
    period: {
      check: "Number",
      init: 1
    },
    legendInline: {
      check: "Boolean",
      init: true
    },
    legendPopup: {
      check: "Boolean",
      init: true
    },
    legendposition: {
      check: ["nw", "ne", "sw", "se"],
      init: "ne"
    },
    timeformat: {
      check: "String",
      nullable: true
    },
    timeformatTooltip: {
      check: "String",
      init: "%d.%m.%Y %H:%M"
    },
    zoomYAxis: {
      check: "Boolean",
      init: false
    },
    gridcolor: {
      check: "String",
      init: "#81664B"
    },
    previewlabels: {
      check: "Boolean",
      init: false
    },
    popup: {
      check: "Boolean",
      init: false
    },
    tooltip: {
      check: "Boolean",
      init: false
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _init: null,
    popupplot: null,
    plot: null,
    plotted: null,
    _timerPopup: null,
    __isPopup: false,

    // property apply
    _applyTitle: function(value) {
      if (value) {
        // override label
        this.setLabel(value);
      }
    },

    _setupRefreshAction: function() {
      if (this.getRefresh()) {
        if (!this._timer) {
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener("interval", function () {
            this.loadDiagramData(this.plot, false, true);
          }, this);
        }

        if (!this._timerPopup) {
          this._timerPopup = new qx.event.Timer(this.getRefresh());
          this._timerPopup.addListener("interval", function () {
            this.loadDiagramData(this.popupplot, false, true);
          }, this);
        }
      }
    },

    /**
     * Stop the refresh timer
     *
     * @param timer {qx.event.Timer} stop this timer
     * @protected
     */
    _stopRefresh: function(timer) {
      if (timer && timer.isEnabled()) {
        timer.stop();
      }
    },

    /**
     * Start the refresh timer
     *
     * @param timer {qx.event.Timer} start this timer
     * @protected
     */
    _startRefresh: function(timer) {
      if (timer && !timer.isEnabled()) {
        timer.start();
      }
    },

    _action: function() {
      var popupDiagram = qx.dom.Element.create("div", {
        'class': "diagram",
        id: this.getPath() + '_big',
        style: 'height: 90%'
      });
      this._init = true;
      var popup = cv.ui.PopupHandler.showPopup("diagram", {title: this.getLabel(), content: popupDiagram});

      // this will be called when the popup is being closed.
      // NOTE: this will be called twice, one time for the foreground and one
      //       time for the background.
      popup.addListener('close', function() {
        this._stopRefresh(this._timerPopup);
        qx.event.Registration.removeAllListeners(popupDiagram);
        if (this.popupplot) {
          this.popupplot.shutdown();
          this.popupplot = null;
        }
      }, this);

      var parent = qx.dom.Element.getParentElement(popupDiagram);
      qx.bom.element.Style.setStyles(parent, {height: "100%", width: "95%", margin: "auto"});// define parent as 100%!
      qx.dom.Element.empty(popupDiagram);
      qx.event.Registration.addListener(popupDiagram, "tap", function(event) {
        // don't let the popup know about the click, or it will close
        event.stopPropagation();
      }, this);

      this.initDiagram( true );

      this._startRefresh(this._timerPopup);
    },

    initDiagram: function( isPopup ) {
      if (!this._init) {

        return;
      }
      this._init = false;
      isPopup = isPopup || this.__isPopup;

      var options = {
        canvas  : true,
        tooltip : this.getTooltip(),
        tooltipOpts : {
          content      : "<center>%x<br/>%y</center>",
          xDateFormat  : this.getTimeformatTooltip(),
          shifts       : {
            x : 20,
            y : 10
          },
          defaultTheme : false
        },
        zoom    : {
          interactive: isPopup,
          trigger: "dblclick",
          amount: 1.5
        },
        pan     : {
          interactive: isPopup,
          cursor: "move",
          frameRate: 20,
          triggerOnDrag : false
        },
        yaxes  : qx.lang.Object.clone(this.getContent().axes,true), // copy to prevent side effects
        xaxes  : [{
          mode       : "time",
          timeformat : this.getTimeformat()
        }],
        legend : {
          show            : (isPopup && this.isLegendPopup()) || (!isPopup && this.isLegendInline()),
          backgroundColor : "#101010",
          position        : this.getLegendposition()
        },
        grid : {
          show            : true,
          aboveData       : false,
          color           : this.getGridcolor(),
          backgroundColor : "#000000",
          tickColor       : this.getGridcolor(),
          markingsColor   : this.getGridcolor(),
          borderColor     : this.getGridcolor(),
          hoverable       : true
        },
        touch: {
          pan: isPopup ? 'x' : 'none',              // what axis pan work
          scale: isPopup ? 'x' : 'none',            // what axis zoom work
          autoWidth: false,
          autoHeight: false,
          delayTouchEnded: 500,   // delay in ms before touchended event is fired if no more touches
          callback: null,         // other plot draw callback
          simulClick: true,       // plugin will generate Mouse click event to brwoser on tap or double tap
          tapThreshold:150,       // range of time where a tap event could be detected
          dbltapThreshold:200,    // delay needed to detect a double tap
          tapPrecision:60/2       // tap events boundaries ( 60px square by default )
        }
      };
      options.yaxes.forEach(function(val) {
        qx.lang.Object.mergeWith(val, {axisLabelColour: this.getGridcolor(), color: this.getGridcolor()});
      }, this);
      options.xaxes.forEach(function(val) {
        qx.lang.Object.mergeWith(val, {axisLabelColour: this.getGridcolor(), color: this.getGridcolor()});
      }, this);
      if (isPopup) {
        qx.lang.Object.mergeWith(options, {
          yaxis : {
            isPopup   : true,
            zoomRange : this.getZoomYAxis() ? [null, null] : false
          },
          xaxis : {
            zoomRange : [null, null],
            panRange  : [null, null]
          }
        });
      }
      if (this.getTooltip()) {
        qx.lang.Object.mergeWith(options, {grid: {hoverable: true, clickable: true}});
      }

      if (!isPopup && !this.getPreviewlabels()) {
        qx.lang.Object.mergeWith(options, {xaxes: [ {ticks: 0} ]});
        options.yaxes.forEach(function(val) {
          qx.lang.Object.mergeWith(val, {ticks:0, axisLabel: null});
        }, this);
      }

      // plot diagram initially with empty values
      var diagram = isPopup ? $( '#' + this.getPath() + '_big' ) : $( '#' + this.getPath() + ' .actor div' );
      diagram.empty();
      var plot = $.plot(diagram, [], options);
      if( isPopup ) {
        this.debug("popup plot generated");
        this.popupplot = plot;
      }
      else {
        this.debug("plot generated");
        this.plot = plot;
      }
      this.plotted = true;

      var that = this;
      diagram.bind("plotpan", function(event, plot, args) {
        if (args.dragEnded) {
          that.loadDiagramData( plot, isPopup, false );
        }
      }).bind("plotzoom", function() {
        that.loadDiagramData( plot, isPopup, false );
      }).bind("touchended", function() {
        that.loadDiagramData( plot, isPopup, false );
      }).bind("tap", function() {
        var self = this;
        var container = $(self).closest('.widget_container')[0];
        if ( !isPopup && container !== undefined) {
          var actor = $(self).closest('.actor')[0];
          var path = container.id;
          if( actor !== undefined && path.length > 0 ) {
            that.action();
          }
        }
      });

      if (!isPopup) {
        // disable touch plugin in non-popup
        plot.getPlaceholder().unbind('touchstart').unbind('touchmove').unbind('touchend');
      }

      this.loadDiagramData( plot, isPopup, false );
    },

    getSeriesSettings: function(xAxis, isInteractive) {
      var series = {
        hour    : {res: "60",     start: "hour",  end: "now"},
        day     : {res: "300",    start: "day",   end: "now"},
        fullday : {res: "300",    start: "day",   end: "midnight+24hour"},
        week    : {res: "1800",   start: "week",  end: "now"},
        month   : {res: "21600",  start: "month", end: "now"},
        year    : {res: "432000", start: "year",  end: "now"}
      };

      var ret = {
        start : null,
        end   : null,
        res   : null
      };
      if (this.getSeries() === "custom") {
        // initial load, take parameters from custom configuration
        ret.start = this.getSeriesStart();
        ret.end = this.getSeriesEnd();
        ret.res = this.getSeriesResolution();
      }
      else {
        var selectedSeries = series[this.getSeries()];
        if (!selectedSeries) {
          return;
        }

        // initial load, take parameters from configuration
        ret.start = "end-" + this.getPeriod() + selectedSeries.start;
        ret.end = selectedSeries.end;
        ret.res = selectedSeries.res;
      }

      if (xAxis.datamin && xAxis.datamax && isInteractive) {
        ret.start = (xAxis.min / 1000).toFixed(0);
      }
      return ret;
    },

    loadDiagramData: function( plot, isInteractive, forceReload ) {
      if (!plot) {
        return;
      }
      var series = this.getSeriesSettings(plot.getAxes().xaxis, isInteractive);
      if (!series) {
        return;
      }

      // init
      var loadedData = [];
      var rrdloaded = 0;
      var rrdSuccessful = 0;
      // get all rrd data
      this.getContent().rrd.forEach(function(rrd, index) {
        var
          res = rrd.resol ? rrd.resol : series.res,
          refresh = this.getRefresh() ? this.getRefresh() : res;

        cv.plugins.diagram.AbstractDiagram.lookupRRDcache( rrd, series.start, series.end, res, refresh, forceReload, function( rrddata ){
          rrdloaded++;
          if (rrddata !== null) {
            rrdSuccessful++;

            // store the data for diagram plotting
            loadedData[index] = {
              label: rrd.label,
              color: rrd.color,
              data: rrddata,
              yaxis: parseInt(rrd.axisIndex),
              bars: { show: rrd.style === "bars", fill: rrd.fill, barWidth: parseInt(rrd.barWidth), align: rrd.align },
              lines: { show: rrd.style === "lines", steps: rrd.steps, fill: rrd.fill, zero: false },
              points: { show: rrd.style === "points", fill: rrd.fill }
            };
          }

          // if loading has finished, i.e. all rrds have been retrieved,
          // go on and plot the diagram
          if (rrdloaded === this.getContent().rrdnum) {
            var fulldata;
            // If all rrds were successfully loaded, no extra action is needed.
            // Otherwise we need to reduce the array to the loaded data.
            if (rrdSuccessful === rrdloaded) {
              fulldata = loadedData;
            }
            else {
              fulldata = [];
              var loadedIndex = -1;
              for (var j = 0; j < rrdSuccessful; j++) {
                for (var k = loadedIndex + 1; k < loadedData.length; k++) {
                  if (loadedData[k] !== null) {
                    fulldata[j] = loadedData[k];
                    loadedIndex = k;
                    break;
                  }
                }
              }
            }

            // plot
            plot.setData(fulldata);
            plot.setupGrid();
            plot.draw();

            loadedData = [];
          }

        }.bind(this));
      }, this);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    if (this._timerPopup) {
      this._disposeObjects("_timerPopup");
    }
  },

  defer: function() {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addScripts([
      'plugins/diagram/dep/flot/jquery.flot.min.js',
      'plugins/diagram/dep/flot/jquery.flot.touch.min.js',
      'plugins/diagram/dep/flot/jquery.flot.canvas.min.js',
      'plugins/diagram/dep/flot/jquery.flot.resize.min.js',
      'plugins/diagram/dep/flot/jquery.flot.time.min.js',
      'plugins/diagram/dep/flot/jquery.flot.axislabels.js',
      'plugins/diagram/dep/flot/jquery.flot.tooltip.min.js',
      'plugins/diagram/dep/flot/jquery.flot.navigate.min.js'
    ], [0]);
  }
});