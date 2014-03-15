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

$.includeScripts([
                  'plugins/diagram/flot/jquery.flot.min.js',
                  'plugins/diagram/flot/jquery.flot.canvas.min.js',
                  'plugins/diagram/flot/jquery.flot.resize.min.js',
                  'plugins/diagram/flot/jquery.flot.time.min.js',
                  'plugins/diagram/flot/jquery.flot.axislabels.js',
                  'plugins/diagram/flot/jquery.flot.tooltip.min.js',
                  'plugins/diagram/flot/jquery.flot.navigate.min.js',
                 ], templateEngine.pluginLoaded );

(function() {
    VisuDesign_Custom.prototype.addCreator("diagram", {
      create: function(element, path, flavour, type) {
        return createDiagram(false, element, path, flavour, type);
      }
    });
    VisuDesign_Custom.prototype.addCreator("diagram_info", {
      create: function(element, path, flavour, type) {
        return createDiagram(true, element, path, flavour, type);
      }
    });

    function createDiagram(isInfo, element, path, flavour, type) {
      var $e = $(element);

      // create the main structure
      var ret_val = basicdesign.createDefaultWidget((isInfo ? 'diagram_info' : 'diagram'), $e, path, flavour, type, update);

      // create the configuration
      var id = "diagram_" + path;
      var config = {
        id                : id,
        content           : getDiagramElements($e),
        series            : $e.attr("series") || "day",
        period            : $e.attr("period") || 1,
        legendInline      : ($e.attr("legend") || "both") == "both" || ($e.attr("legend") || "both") == "inline",
        legendPopup       : ($e.attr("legend") || "both") == "both" || ($e.attr("legend") || "both") == "popup",
        legendposition    : $e.attr("legendposition") || "ne",
        timeformat        : $e.attr("timeformat") || null,
        timeformatTooltip : $e.attr("timeformatTooltip") || "%d.%m.%Y %H:%M",
        label             : ($e.attr("title") ? $e.attr("title") : $('.label', ret_val).text() || '') || null,
        refresh           : $e.attr("refresh"),
        gridcolor         : $e.attr("gridcolor") || "#81664B",
        previewlabels     : ($e.attr("previewlabels") || "false") == "true",
        isPopup           : false,
        tooltip           : ($e.attr("tooltip") || "false") == "true"
      };

      // create the actor
      var $actor;
      var diagram = undefined;
      if (isInfo) {
        $actor = $('<div class="actor clickable switchUnpressed"><div class="value"></div></div>');
      }
      else {
        var classStr = 'diagram_inline';
        if (!config.previewlabels) {
          classStr = 'diagram_preview';
        }
        $actor = $('<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" id="' + id + '" style="height: 100%; min-height: 40px;">loading...</div></div>');
        diagram = $("#" + id, $actor);
      }
      ret_val.append($actor);

      // bind to user action
      if (isInfo || $e.attr("popup") == "true") {
        var configCopy = $.extend(true, {}, config, {id : id + '_big', isPopup : true});
        var bindClickToWidget = templateEngine.bindClickToWidget;
        if (ret_val.data('bind_click_to_widget')) bindClickToWidget = (ret_val.data('bind_click_to_widget') === 'true');
        (bindClickToWidget ? ret_val : $actor).bind('click', function() {
          var popupDiagram = $('<div class="diagram" id="' + configCopy.id + '"/>');
          popupDiagram.data().config = configCopy;
          popupDiagram.css({height: "90%"});
          templateEngine.showPopup("unknown", {title: configCopy.label, content: popupDiagram});
          popupDiagram.parent("div").css({height: "100%", width: "95%", margin: "auto"}); // define parent as 100%!
          popupDiagram.empty();
          popupDiagram.bind("click", function(event) {
            // don't let the popup know about the click, or it will close
            event.stopPropagation();
          });

          initDiagram(popupDiagram);
          return false;
        });
      }

      if (diagram !== undefined) {
        if ($e.attr("width")) {
          diagram.css("width", $e.attr("width"));
        }
        if ($e.attr("height")) {
          diagram.css("height", $e.attr("height"));
        }
        diagram.data().config = config;
        $(window).bind('scrolltopage', function(event, page_id) {
          var page = templateEngine.getParentPageFromPath(path);
          if (page != null && page_id == page.attr("id")) {
            initDiagram(diagram);
          }
        });
      }

      // initially setting a value
      basicdesign.defaultUpdate(undefined, undefined, ret_val, true);

      return ret_val;
    }

    function update(e, d) {
      var element = $(this);
      basicdesign.defaultUpdate(e, d, element, true);
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
          cFunc     : this.getAttribute('consolidationFunction') || "AVERAGE"
        };
        if (retVal.rrd[retVal.rrdnum].dsIndex < 0) {
          retVal.rrd[retVal.rrdnum].dsIndex = 0;
        }
        retVal.rrdnum++;
      });

      return retVal;
    }

    function initDiagram(dgrm) {
      var diagram = $(dgrm);
      var config = diagram.data().config;
      if (config === undefined) {
        return;
      }

      var options = {
        canvas  : true,
        tooltip : config.tooltip,
        tooltipOpts : {
          content      : "<center>%x<br/>%y</center>",
          xDateFormat  : config.timeformatTooltip,
          shifts       : {
            x : 20,
            y : 10,
          },
          defaultTheme : false,
        },
        zoom    : {
          interactive: config.isPopup,
          trigger: "dblclick",
          amount: 1.5,
        },
        pan     : {
          interactive: config.isPopup,
          cursor: "move",
          frameRate: 20,
          triggerOnDrag : false,
        },
        yaxes  : config.content.axes,
        xaxes  : [{
          mode       : "time",
          timeformat : config.timeformat
        }],
        legend : {
          show            : (config.isPopup && config.legendPopup) || (!config.isPopup && config.legendInline),
          backgroundColor : "#101010",
          position        : config.legendposition
        },
        series : {
          lines  : { show: true,  fill: false, zero: false },
          points : { show: false, fill: false }
        },
        grid : {
          show            : true,
          aboveData       : false,
          color           : config.gridcolor,
          backgroundColor : "#000000",
          tickColor       : config.gridcolor,
          markingsColor   : config.gridcolor,
          borderColor     : config.gridcolor,
          hoverable       : true
        }
      };
      $.each(options.yaxes, function(index, val) {
        $.extend(true, val, {axisLabelColour: config.gridcolor, color: config.gridcolor});
      });
      $.each(options.xaxes, function(index, val) {
        $.extend(true, val, {axisLabelColour: config.gridcolor, color: config.gridcolor});
      });
      if (config.isPopup) {
        $.extend(true, options, {
          yaxis : {
            isPopup   : true,
            zoomRange : [null, null],
          },
          xaxis : {
            zoomRange : [null, null],
            panRange  : [null, null],
          }
        });
      }
      if (config.tooltip) {
        $.extend(true, options, {grid: {hoverable: true, clickable: true}});
      }

      if (!config.isPopup && !config.previewlabels) {
        $.extend(true, options, {xaxes: [ {ticks: 0} ]});
        $.each(options.yaxes, function(index, val) {
          $.extend(true, val, {ticks:0, axisLabel: null});
        });
      }

      // plot diagram initially with empty values
      diagram.empty();
      diagram.data("PLOT", $.plot(diagram, [], options));
      diagram.data("plotted", true);
      diagram.bind("plotpan", function(event, plot, args) {
        if (args.dragEnded) {
          loadDiagramData(diagram);
        }
      }).bind("plotzoom", function() {
        loadDiagramData(diagram);
      });

      loadDiagramData(diagram);
    }

    function getSeries(config, xAxis) {
      var series = {
        hour    : {res: "60",     start: "hour",  end: "now"},
        day     : {res: "300",    start: "day",   end: "now"},
        fullday : {res: "300",    start: "day",   end: "midnight+24hour"},
        week    : {res: "1800",   start: "week",  end: "now"},
        month   : {res: "21600",  start: "month", end: "now"},
        year    : {res: "432000", start: "year",  end: "now"},
      };
      
      var selectedSeries = series[config.series];
      if (!selectedSeries) {
        return;
      }

      if (!xAxis.datamin || !xAxis.datamax) {
        // initial load, take parameters from configuration
        return {
          start : "end-" + config.period + selectedSeries.start,
          end   : selectedSeries.end,
          res   : selectedSeries.res,
        };
      }

      return {
        start : (xAxis.min / 1000).toFixed(0),
        end   : (xAxis.max / 1000).toFixed(0),
        res   : selectedSeries.res,
      };
    }

    function loadDiagramData(dgrm) {
      var diagram = $(dgrm);
      var config = diagram.data().config;
      if (config === undefined) {
        return;
      }

      var series = getSeries(config, diagram.data().plot.getAxes().xaxis);
      if (!series) {
        return
      }

      // init
      var loadedData = [];  
      var rrdloaded = 0;
      var rrdSuccessful = 0;
      // get all rrd data
      $.each(config.content.rrd, function(index, rrd) {
        $.ajax({
          url: templateEngine.backend+"rrdfetch?rrd=" + rrd.src + ".rrd&ds=" + rrd.cFunc + "&start=" + series.start + "&end=" + series.end + "&res=" + series.res,
          dataType: "json",
          type: "GET",
          context: this,
          success: function(data) {
            rrdloaded++;
            if (data != null) {
              rrdSuccessful++;

              // calculate offset and scaling
              for (var j = 0; j < data.length; j++) {
                data[j][1] = parseFloat(data[j][1][rrd.dsIndex]) * rrd.scaling;
              }

              // store the data for diagram plotting
              loadedData[index] = {
                label: rrd.label,
                color: rrd.color,
                data: data,
                yaxis: parseInt(rrd.axisIndex),
                lines: {steps: rrd.steps, fill: rrd.fill}
              };
            }

            // if loading has finished, i.e. all rrds have been retrieved,
            // go on and plot the diagram
            if (rrdloaded == config.content.rrdnum) {
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
              var PLOT = diagram.data("PLOT");
              PLOT.setData(fulldata);
              PLOT.setupGrid();
              PLOT.draw();
            }
          }
        });
      });


      if (config.refresh) {
        // reload regularly
        window.setTimeout(function(diagram) {
          loadDiagramData(diagram);
        }, config.refresh * 1000, diagram);
      }
    }
})();
