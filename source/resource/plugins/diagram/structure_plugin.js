/* structure_plugin.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @author Michael Hausl [michael at hausl dot com]
 * @since 2014
 */

/**
 * short documentation
 *
 * widgets:
 *   - diagram
 *   - diagram_info
 *
 * attributes (per diagram):
 *   - series:               optional, "hour", "day" (default), "week", "month", "year"
 *   - period:               optional, number of "series" to be shown
 *   - refresh:              optional, refresh-rate in seconds, no refresh if missing
 *   - gridcolor:            optional, color for dataline and grid, HTML-colorcode
 *   - width, height:        optional, width and height of "inline"-diagram
 *   - previewlabels:        optional, show labels on "inline"-diagram
 *   - popup:                optional, make diagram clickable and open popup
 *   - legend:               optional, "none", "both", "inline", "popup" select display of legend
 *   - title:                optional, diagram title (overrides label-content)
 *
 * attributes (per graph):
 *   - style:                optional, "lines" (default), "bars", "points" select graph type
 *   - fill:                 optional, true or false - fill the space under the line / within the bar (line / bar style graphs)
 *   - barWidth:             optional, width of bars (bar style graphs)
 *   - align:                optional, "left" (default), "center", "right" select qlignemnt of bars (bar style graphs)
 */
qx.Class.define('cv.plugins.diagram.Main', {
  extend: cv.structure.pure.AbstractWidget,
  include: [cv.role.Operate, cv.role.Refresh],
  type: "abstract",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    cache: {},

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
        title             : { target: "label" },
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
      }
    },

    afterParse: function(element, path) {
      var legend = qx.bom.element.Attribute.get(element, "legend") || "both";
      return cv.data.Model.getInstance().setWidgetData( path, {
        content           : this.getDiagramElements(element),
        legendInline      : ["both", "inline"].indexOf(legend) >= 0,
        legendPopup       : ["both", "popup"].indexOf(legend) >= 0
      } );
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
          steps     : (elem.getAttribute("steps") || "false") == "true",
          fill      : (elem.getAttribute("fill") || "false") == "true",
          scaling   : parseFloat(elem.getAttribute('scaling')) || 1.,
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
        urlNotInCache = !(url in this.cache),
        doLoad = force || urlNotInCache || !('data' in this.cache[ url ]) || (refresh!==undefined && (Date.now()-this.cache[url].timestamp) > refresh*1000);

      if( doLoad )
      {
        if( urlNotInCache )
          this.cache[ url ] = { waitingCallbacks: [] };

        this.cache[ url ].waitingCallbacks.push( [ callback, callbackParameter ] );

        if( this.cache[ url ].waitingCallbacks.length === 1 ) {
          var xhr = new qx.io.request.Xhr(url);
          xhr.set({
            accept: "application/json"
          });
          xhr.addListener("success", function( ev ) {
            var rrddata = ev.getTarget().getResponse();
            if (rrddata != null) {
              // calculate timestamp offset and scaling
              var millisOffset = (rrd.offset ? rrd.offset * 1000 : 0);
              for (var j = 0; j < rrddata.length; j++) {
                rrddata[j][0] = rrddata[j][0] + millisOffset;
                rrddata[j][1] = parseFloat(rrddata[j][1][rrd.dsIndex]) * rrd.scaling;
              }
            }
            this.cache[url].data = rrddata;
            this.cache[url].timestamp = Date.now();

            this.cache[url].waitingCallbacks.forEach(function (waitingCallback) {
              waitingCallback[0](this.cache[url].data, waitingCallback[1]);
            }, this);
            this.cache[url].waitingCallbacks.length = 0; // empty array)
          }, this);

          this.cache[ url ].xhr = xhr;
          xhr.send();
        }
      } else {
        callback( this.cache[url].data, callbackParameter );
      }
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
    isPopup: {
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
    _timer: null,

    _setupRefreshAction: function() {
      if (this.getRefresh()) {
        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener("interval", function () {
          this.loadDiagramData(this.plot, false, true);
        }, this);

        this._timerPopup = new qx.event.Timer(this.getRefresh());
        this._timerPopup.addListener("interval", function () {
          this.loadDiagramData(this.popupplot, false, true);
        }, this);
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
      if (!this.getPopup()) return;

      var popupDiagram = qx.bom.Selector.query('#' + this.getPath() + '_big');
      this._init = true;
      qx.bom.element.Attribute.set(popupDiagram, "height", "90%");
      var popup = cv.TemplateEngine.getInstance().showPopup("diagram", {title: this.getLabel(), content: popupDiagram});

      // this will be called when the popup is being closed.
      // NOTE: this will be called twice, one time for the foreground and one
      //       time for the background.
      popup.bind('close', qx.util.Function.curry(this._stopRefresh.bind(this), this._timerPopup));

      var parent = qx.dom.Hierarchy.getParentElement(popupDiagram);
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
      var diagram = isPopup ? $( '#' + this.getPath() + '_big' ) : $( '#' + this.getPath() + ' .actor div' );

      if (!this._init) {
        return;
      }
      isPopup |= this.isPopup();

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
          pan: 'x',              // what axis pan work
          scale: 'x',            // what axis zoom work
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
          if( actor !== undefined && path.length > 0 )
            that.action();
        }
      });

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
      if (this.getSeries() == "custom") {
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

      var series = this.getSeriesSettings(plot.getAxes().xaxis, isInteractive);
      if (!series) {
        return
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

        cv.plugins.diagram.Main.lookupRRDcache( rrd, series.start, series.end, res, refresh, forceReload, function( rrddata ){
          rrdloaded++;
          if (rrddata != null) {
            rrdSuccessful++;

            // store the data for diagram plotting
            loadedData[index] = {
              label: rrd.label,
              color: rrd.color,
              data: rrddata,
              yaxis: parseInt(rrd.axisIndex),
              bars: { show: rrd.style == "bars", fill: rrd.fill, barWidth: parseInt(rrd.barWidth), align: rrd.align },
              lines: { show: rrd.style == "lines", steps: rrd.steps, fill: rrd.fill, zero: false },
              points: { show: rrd.style == "points", fill: rrd.fill }
            };
          }

          // if loading has finished, i.e. all rrds have been retrieved,
          // go on and plot the diagram
          if (rrdloaded == this.getContent().rrdnum) {
            var fulldata;
            // If all rrds were successfully loaded, no extra action is needed.
            // Otherwise we need to reduce the array to the loaded data.
            if (rrdSuccessful == rrdloaded) {
              fulldata = loadedData;
            }
            else {
              fulldata = [];
              var loadedIndex = -1;
              for (var j = 0; j < rrdSuccessful; j++) {
                for (var k = loadedIndex + 1; k < loadedData.length; k++) {
                  if (loadedData[k] != null) {
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
          }

        }.bind(this));
      }, this);
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

qx.Class.define('cv.plugins.diagram.Info', {
  extend: cv.plugins.diagram.Main,
  include: [cv.role.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    this._init = false;
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _getInnerDomString: function() {
      return '<div class="actor clickable switchUnpressed"><div class="value">-</div></div>';
    },
    _update: function(address, data) {
      if (address !== undefined && data !== undefined) {
        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      }
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("diagram_info", cv.plugins.diagram.Info);
    cv.xml.Parser.addHook("diagram_info", "after", cv.plugins.diagram.Main.afterParse, cv.plugins.diagram.Main);
  }
});

qx.Class.define('cv.plugins.diagram.Diagram', {
  extend: cv.plugins.diagram.Main,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this.base(arguments, props);
    this._init = true;
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    width: {
      check: "String",
      nullable: true
    },
    height: {
      check: "String",
      nullable: true
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function() {
      return {
        width: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }},
        height: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }}
      }
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    _onDomReady: function() {
      var pageId = this.getParentPage().getPath();
      var broker = cv.MessageBroker.getInstance();

      // stop refreshing when page is left
      broker.subscribe("path." + pageId + ".exitingPageChange", function() {
        this._stopRefresh(this._timer);
      }, this);

      broker.subscribe("path." + pageId + ".beforePageChange", function() {
        if( !this._init )
          this.loadDiagramData( this.plot, false, false );
      }, this);

      broker.subscribe("path." + pageId + ".duringPageChange", function() {
        // create diagram when it's not already existing
        if( this._init )
          this.initDiagram( false );

        // start refreshing when page is entered
        this._startRefresh(this._timer);
      }, this);
    },


    _getInnerDomString: function() {
      var
        classStr = this.getPreviewlabels() ? 'diagram_inline' : 'diagram_preview',
        styleStr = 'min-height: 40px'
          + (this.getWidth()  ? (';width:'  + this.getWidth() ) : ''             )
          + (this.getHeight() ? (';height:' + this.getHeight()) : ';height: 100%');

      return '<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" style="' + styleStr + '">loading...</div></div>';
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("diagram", cv.plugins.diagram.Diagram);
    cv.xml.Parser.addHook("diagram", "after", cv.plugins.diagram.Main.afterParse, cv.plugins.diagram.Main);
  }
});