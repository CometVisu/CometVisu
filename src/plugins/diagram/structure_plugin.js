/* structure_plugin.js (c) 2014 by Michael Hausl [michael at hausl dot com]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This plugins integrates flot (diagrams in javascript) into the visualization.
 * server-side data-storage is rrd
 */

/**
 * short documentation
 *
 * widgets:
 *   - diagram
 *   - diagram_info
 *
 * attributes:
 *   - series:               optional, "hour", "day" (default), "week", "month", "year"
 *   - period:               optional, number of "series" to be shown
 *   - refresh:              optional, refresh-rate in seconds, no refresh if missing
 *   - fill:                 optional, true or false - filling the space under the line
 *   - gridcolor:            optional, color for dataline and grid, HTML-colorcode
 *   - width, height:        optional, width and height of "inline"-diagram
 *   - previewlabels:        optional, show labels on "inline"-diagram
 *   - popup:                optional, make diagram clickable and open popup
 *   - legend:               optional, "none", "both", "inline", "popup" select display of legend
 *   - title:                optional, diagram title (overrides label-content)
 */

require.config({
  shim: {
    'plugins/diagram/flot/jquery.flot.min':          ['jquery'],
    'plugins/diagram/flot/jquery.flot.canvas.min':   ['plugins/diagram/flot/jquery.flot.min'],
    'plugins/diagram/flot/jquery.flot.resize.min':   ['plugins/diagram/flot/jquery.flot.min'],
    'plugins/diagram/flot/jquery.flot.time.min':     ['plugins/diagram/flot/jquery.flot.min'],
    'plugins/diagram/flot/jquery.flot.axislabels':   ['plugins/diagram/flot/jquery.flot.min'],
    'plugins/diagram/flot/jquery.flot.tooltip.min':  ['plugins/diagram/flot/jquery.flot.min'],
    'plugins/diagram/flot/jquery.flot.navigate.min': ['plugins/diagram/flot/jquery.flot.min']
  }
});

define( ['structure_custom',
                  'plugins/diagram/flot/jquery.flot.min',
                  'plugins/diagram/flot/jquery.flot.canvas.min',
                  'plugins/diagram/flot/jquery.flot.resize.min',
                  'plugins/diagram/flot/jquery.flot.time.min',
                  'plugins/diagram/flot/jquery.flot.axislabels',
                  'plugins/diagram/flot/jquery.flot.tooltip.min',
                  'plugins/diagram/flot/jquery.flot.navigate.min'
  ], function( VisuDesign_Custom ) {

    VisuDesign_Custom.prototype.addCreator("diagram", {
      create: function(element, path, flavour, type) {
        return createDiagram(false, element, path, flavour, type);
      },
      action: function( path, actor, isCaneled ) {
        if( isCaneled ) return;
    
        var 
          widgetData = templateEngine.widgetDataGet( path );
          
        if( widgetData.popup )
          action( path, actor, isCaneled );
      }
    });
    VisuDesign_Custom.prototype.addCreator("diagram_info", {
      create: function(element, path, flavour, type) {
        return createDiagram(true, element, path, flavour, type);
      },
      update: function( ga, d ) { 
        var element = $(this);
        templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
      },
      action: action
    });

    function createDiagram(isInfo, element, path, flavour, type) {
      var $e = $(element);

      // create the main structure
      var ret_val = templateEngine.design.createDefaultWidget((isInfo ? 'diagram_info' : 'diagram'), $e, path, flavour, type);
      // and fill in widget specific data
      var data = templateEngine.widgetDataInsert( path, {
        content           : getDiagramElements($e),
        series            : $e.attr("series") || "day",
        seriesStart       : $e.attr("seriesStart") || "end-month",
        seriesEnd         : $e.attr("seriesEnd") || "now",
        seriesResolution  : parseInt($e.attr("seriesResolution")) || 300,
        period            : $e.attr("period") || 1,
        legendInline      : ($e.attr("legend") || "both") == "both" || ($e.attr("legend") || "both") == "inline",
        legendPopup       : ($e.attr("legend") || "both") == "both" || ($e.attr("legend") || "both") == "popup",
        legendposition    : $e.attr("legendposition") || "ne",
        timeformat        : $e.attr("timeformat") || null,
        timeformatTooltip : $e.attr("timeformatTooltip") || "%d.%m.%Y %H:%M",
        zoomYAxis         : ($e.attr("zoomYAxis") || "false") == "true",
        label             : ($e.attr("title") ? $e.attr("title") : (ret_val.match( /label">(.*)</ )||[])[1] || '') || null,
        refresh           : $e.attr("refresh"),
        gridcolor         : $e.attr("gridcolor") || "#81664B",
        previewlabels     : ($e.attr("previewlabels") || "false") == "true",
        isPopup           : false,
        popup             : $e.attr("popup") === "true",
        tooltip           : ($e.attr("tooltip") || "false") == "true"
      } );

      // create the actor
      var actor;
      if (isInfo) {
        actor = '<div class="actor clickable switchUnpressed"><div class="value">-</div></div>';
      }
      else {
        var 
          classStr = data.previewlabels ? 'diagram_inline' : 'diagram_preview',
          width    = $e.attr("width" ) ? ($e.attr("width" ) + (/[0-9]$/.test($e.attr("width" )) ? 'px' : '')) : undefined,
          height   = $e.attr("height") ? ($e.attr("height") + (/[0-9]$/.test($e.attr("height")) ? 'px' : '')) : undefined,
          styleStr = 'min-height: 40px'
                   + (width  ? (';width:'  + width ) : ''             )
                   + (height ? (';height:' + height) : ';height: 100%');

        actor = '<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" style="' + styleStr + '">loading...</div></div>';
        
        data.init = true;
        $(window).bind('scrolltopage', function(event, page_id) {
          var page = templateEngine.getParentPageFromPath(path);
          if (page != null && page_id == page.attr("id")) {
            initDiagram( path, false );
          }
        });
      }

      return ret_val + actor + '</div>';
    }
    
    function action( path, actor, isCaneled ) {
      if( isCaneled ) return;

      var 
        data = templateEngine.widgetDataGet( path );
          
      var popupDiagram = $('<div class="diagram" id="' + path + '_big"/>');
      data.init = true;
      popupDiagram.css({height: "90%"});
      templateEngine.showPopup("diagram", {title: data.label, content: popupDiagram});
      popupDiagram.parent("div").css({height: "100%", width: "95%", margin: "auto"}); // define parent as 100%!
      popupDiagram.empty();
      popupDiagram.bind("click", function(event) {
        // don't let the popup know about the click, or it will close
        event.stopPropagation();
      });

      initDiagram( path, true );
    }


    function getDiagramElements(xmlElement) {
      var retVal = {
        axes    : [],
        axesnum : 0,
        rrd     : [],
        rrdnum  : 0
      };
      var axesNameIndex = [];

      xmlElement.find('axis').each(function() {
        var unit = this.getAttribute('unit') || "";
        retVal.axes[retVal.axesnum] = {
          axisLabel     : this.getAttribute('label') || null,
          position      : this.getAttribute('position') || "left",
          min           : this.getAttribute('min') || null,
          max           : this.getAttribute('max') || null,
          unit          : unit,
          tickDecimals  : this.getAttribute('decimals') || null,
          tickFormatter : function (v, axis) {
            return v.toFixed(axis.tickDecimals) + unit;
          },
        };
        retVal.axesnum++;
        axesNameIndex[this.textContent] = retVal.axesnum;
      });

      xmlElement.find('rrd').each(function() {
        var src = this.textContent;
        retVal.rrd[retVal.rrdnum] = {
          src       : src,
          color     : this.getAttribute('color'),
          label     : this.getAttribute('label') || src,
          axisIndex : axesNameIndex[this.getAttribute('yaxis')] || 1,
          steps     : (this.getAttribute("steps") || "false") == "true",
          fill      : (this.getAttribute("fill") || "false") == "true",
          scaling   : parseFloat(this.getAttribute('scaling')) || 1.,
          dsIndex   : this.getAttribute('datasourceIndex') || 0,
          cFunc     : this.getAttribute('consolidationFunction') || "AVERAGE",
          resol     : parseInt(this.getAttribute('resolution')),
          offset    : parseInt(this.getAttribute('offset')),
        };
        if (retVal.rrd[retVal.rrdnum].dsIndex < 0) {
          retVal.rrd[retVal.rrdnum].dsIndex = 0;
        }
        retVal.rrdnum++;
      });

      return retVal;
    }

    function initDiagram( id, isPopup ) {
      var 
        diagram = isPopup ? $( '#' + id + '_big' ) : $( '#' + id + ' .actor div' ),
        data = templateEngine.widgetDataGet( id );
      if (!data.init || data === undefined) {
        return;
      }
      data.init = false;
      isPopup |= data.isPopup;

      var options = {
        canvas  : true,
        tooltip : data.tooltip,
        tooltipOpts : {
          content      : "<center>%x<br/>%y</center>",
          xDateFormat  : data.timeformatTooltip,
          shifts       : {
            x : 20,
            y : 10,
          },
          defaultTheme : false,
        },
        zoom    : {
          interactive: isPopup,
          trigger: "dblclick",
          amount: 1.5,
        },
        pan     : {
          interactive: isPopup,
          cursor: "move",
          frameRate: 20,
          triggerOnDrag : false,
        },
        yaxes  : $.extend( true, [], data.content.axes ), // copy to prevent side effects
        xaxes  : [{
          mode       : "time",
          timeformat : data.timeformat
        }],
        legend : {
          show            : (isPopup && data.legendPopup) || (!isPopup && data.legendInline),
          backgroundColor : "#101010",
          position        : data.legendposition
        },
        series : {
          lines  : { show: true,  fill: false, zero: false },
          points : { show: false, fill: false }
        },
        grid : {
          show            : true,
          aboveData       : false,
          color           : data.gridcolor,
          backgroundColor : "#000000",
          tickColor       : data.gridcolor,
          markingsColor   : data.gridcolor,
          borderColor     : data.gridcolor,
          hoverable       : true
        }
      };
      $.each(options.yaxes, function(index, val) {
        $.extend(true, val, {axisLabelColour: data.gridcolor, color: data.gridcolor});
      });
      $.each(options.xaxes, function(index, val) {
        $.extend(true, val, {axisLabelColour: data.gridcolor, color: data.gridcolor});
      });
      if (isPopup) {
        $.extend(true, options, {
          yaxis : {
            isPopup   : true,
            zoomRange : data.zoomYAxis ? [null, null] : false,
          },
          xaxis : {
            zoomRange : [null, null],
            panRange  : [null, null],
          }
        });
      }
      if (data.tooltip) {
        $.extend(true, options, {grid: {hoverable: true, clickable: true}});
      }

      if (!isPopup && !data.previewlabels) {
        $.extend(true, options, {xaxes: [ {ticks: 0} ]});
        $.each(options.yaxes, function(index, val) {
          $.extend(true, val, {ticks:0, axisLabel: null});
        });
      }

      // plot diagram initially with empty values
      diagram.empty();
      var plot = $.plot(diagram, [], options);
      data.plotted = true;
      diagram.bind("plotpan", function(event, plot, args) {
        if (args.dragEnded) {
          loadDiagramData( id, plot, isPopup );
        }
      }).bind("plotzoom", function() {
        loadDiagramData( id, plot, isPopup );
      });

      loadDiagramData( id, plot, isPopup );
    }

    function getSeries(data, xAxis, isInteractive) {
      var series = {
        hour    : {res: "60",     start: "hour",  end: "now"},
        day     : {res: "300",    start: "day",   end: "now"},
        fullday : {res: "300",    start: "day",   end: "midnight+24hour"},
        week    : {res: "1800",   start: "week",  end: "now"},
        month   : {res: "21600",  start: "month", end: "now"},
        year    : {res: "432000", start: "year",  end: "now"},
      };

      var ret = {
        start : null,
        end   : null,
        res   : null,
      };
      if (data.series == "custom") {
        // initial load, take parameters from custom configuration
  	    ret.start = data.seriesStart;
  	    ret.end = data.seriesEnd;
  	    ret.res = data.seriesResolution;
      }
      else {
        var selectedSeries = series[data.series];
        if (!selectedSeries) {
          return;
        }

        // initial load, take parameters from configuration
  	    ret.start = "end-" + data.period + selectedSeries.start;
  	    ret.end = selectedSeries.end;
  	    ret.res = selectedSeries.res;
      }

      if (xAxis.datamin && xAxis.datamax && isInteractive) {
        ret.start = (xAxis.min / 1000).toFixed(0);
      }
      return ret;
    }

    function loadDiagramData( id, plot, isInteractive ) {
      var data = templateEngine.widgetDataGet( id );
      if (data === undefined) {
        return;
      }

      var series = getSeries(data, plot.getAxes().xaxis, isInteractive);
      if (!series) {
        return
      }

      // init
      var loadedData = [];  
      var rrdloaded = 0;
      var rrdSuccessful = 0;
      // get all rrd data
      $.each(data.content.rrd, function(index, rrd) {
        $.ajax({
          url: templateEngine.visu.urlPrefix+"rrdfetch?rrd=" + rrd.src + ".rrd&ds=" + rrd.cFunc + "&start=" + series.start + "&end=" + series.end + "&res=" + (rrd.resol ? rrd.resol : series.res),
          dataType: "json",
          type: "GET",
          context: this,
          success: function(rrddata) {
            rrdloaded++;
            if (rrddata != null) {
              rrdSuccessful++;

              // calculate timestamp offset and scaling
              var millisOffset = (rrd.offset ? rrd.offset * 1000 : 0);
              for (var j = 0; j < rrddata.length; j++) {
                rrddata[j][0] = rrddata[j][0] + millisOffset;
                rrddata[j][1] = parseFloat(rrddata[j][1][rrd.dsIndex]) * rrd.scaling;
              }

              // store the data for diagram plotting
              loadedData[index] = {
                label: rrd.label,
                color: rrd.color,
                data: rrddata,
                yaxis: parseInt(rrd.axisIndex),
                lines: {steps: rrd.steps, fill: rrd.fill}
              };
            }

            // if loading has finished, i.e. all rrds have been retrieved,
            // go on and plot the diagram
            if (rrdloaded == data.content.rrdnum) {
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
          }
        });
      });


      if (data.refresh) {
        // reload regularly
        window.setTimeout(function( id, plot, isInteractive ) {
          loadDiagramData( id, plot, isInteractive );
        }, data.refresh * 1000, id, plot, isInteractive );
      }
    }
});
