/* structure_plugin.js (c) 2010 by Julian Hartmann [julian dot hartmann at gmail dot com]
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
  * recommended widgets:
  *   - diagram
  *   - diagram_info
  *
  * deprecated widgets:
  *   - diagram_inline (use diagram with option previewlabels="true" instead)
  *   - diagram_popup (use diagram with option popup="true" instead)
  *
  * attributes:
  *   - rrd:                  required, name of RRD
  *   - unit:                 optional, unit for axis-labels
  *   - series:               optional, "hour", "day" (default), "week", "month", "year"
  *   - period:               optional, number of "series" to be shown
  *   - datasource:           optional, RRD-datasource, "MIN", "AVERAGE" (default), "MAX"
  *   - refresh:              optional, refresh-rate in seconds, no refresh if missing
  *   - yaxismin, yaxismax:   optional, limits for y-axis
  *   - linecolor, gridcolor: optional, color for dataline and grid, HTML-colorcode
  *   - width, height:        optional, width and height of "inline"-diagram
  *   - previewlabels:        optional, show labels on "inline"-diagram
  *   - popup:                optional, make diagram clickable and open popup
  *   - legend:               optional, "none", "both", "inline", "popup" select display of legend
  *   - title:                optional, diagram title (overrides label-content)
  *
  * functions:
  *   - createDiagram(page, path, oldType)
  *   - refreshDiagram(diagram, flotoptions, data)
  *
*/
  
$.getOrderedScripts([
  'plugins/diagram/flot/jquery.flot.js',
  'plugins/diagram/flot/jquery.flot.axislabels.js'
]);

function diagram_get_content( page ) {

  var axes = []; // if yaxismin, yaxismax or unit-attributes exist: old behaviour, otherwise use axis-elements
  var axesnames = {};
  var axesnum = 0;
  if (page.attr('yaxismin') || page.attr('yaxismax') || page.attr('unit')) {
    axesnum=1;
    axes[0] = { position: 'left', min: page.attr('yaxismin') || null, max: page.attr('yaxismax') || null,
      tickFormatter: function (v, axis) { return v.toFixed(axis.tickDecimals)+(page.attr('unit') || ""); } 
    };
  } else {
    page.find('axis').each( function() { // defaults: left, auto range, no label
      var name = this.textContent;
      var unit = this.getAttribute('unit') || "";
      axes[ axesnum ] = { axisLabel:this.getAttribute('label') || null, position: this.getAttribute('position') || "left", 
        min: this.getAttribute('min') || null, max: this.getAttribute('max') || null,
        unit: unit, tickFormatter: function (v, axis) { return v.toFixed(axis.tickDecimals)+unit; } 
      };
      axesnames ['_'+name] = axesnum+1;
      axesnum ++;
    });
  }
    
  var rrd = {}; // if rrd-attribute exists: old behaviour, otherwise use rrd-elements, default axis is (1)
  var rrdnum = 0;
  if (page.attr('rrd')) { 
    rrd[ '_'+page.attr('rrd') ] = [ page.attr('linecolor') || "", "", "1"];
    rrdnum=1;
  } else {
    page.find('rrd').each( function() {
      var src = this.textContent;
      rrd[ '_'+src ] = [ this.getAttribute('color'), this.getAttribute('label') || src, 
      axesnames['_'+this.getAttribute('yaxis')] || "1" ];
      rrdnum ++;
    });
  }

  return { axes: axes, axesnum: axesnum, rrd: rrd, rrdnum: rrdnum };
}

function createDiagram( page, path, oldType ) {
  var $p = $(page);

  function uniqid() {
    var newDate = new Date;
    return newDate.getTime();
  }

  var id = "diagram_" + uniqid();

  var content = diagram_get_content ( $p );
  
  var ret_val = $('<div class="widget clearfix diagram" />');
  ret_val.setWidgetLayout($p).makeWidgetLabel($p);
        
  var actor = $("<div class=\"actor\"><div class=\"diagram_inline\" id=\"" + id + "\">loading...</div></div>");
  var diagram = $("#" + id, actor);

  if ($p.attr("width")) {
    diagram.css("width", $p.attr("width"));
  } else {
    if (oldType=="popup") {
      diagram.removeClass("diagram_inline").addClass("diagram_preview");
    }
  }
  if ($p.attr("height")) {
    diagram.css("height", $p.attr("height"));
  }

  ret_val.append(actor);

  diagram.data("id", id);
  diagram.data("content", content);
  diagram.data("series", $p.attr("series") || "day");
  diagram.data("period", $p.attr("period") || 1);
  diagram.data("datasource", $p.attr("datasource") || "AVERAGE");
  diagram.data("legend", $p.attr("legend") || "both");
  diagram.data("legendposition", $p.attr("legendposition") || "ne");
  if ($p.attr("title")) {
    diagram.data("label", $p.attr("title"));
  } else {
	diagram.data("label", $('.label', ret_val).text() || '');
  }
  diagram.data("refresh", $p.attr("refresh"));
  diagram.data("gridcolor", $p.attr("gridcolor") || "");

  var bDiagram = $("<div class=\"diagram\" id=\"" + id + "_big\"/>");
        
  diagram.addClass("clickable");
  var data = jQuery.extend({}, diagram.data());

  diagram.data("ispopup", false);
  
  if ((oldType=="popup") || ($p.attr("popup")=="true")) {
    diagram.bind("click", function() {
      bDiagram.data(data);
      bDiagram.data("ispopup", true);
      bDiagram.css({height: "90%"});
      templateEngine.showPopup("unknown", {title: bDiagram.data('label'), content: bDiagram});
      bDiagram.parent("div").css({height: "100%", width: "90%", margin: "auto"}); // define parent as 100%!
      bDiagram.empty();
      var bDiagramOpts = {yaxis: {labelWidth: null}, yaxes: [{ticks: null}]}; 
      if ($p.attr("tooltip") == "true") {
        // if we want to display a tooltip, we need to listen to the event
        var previousPoint = null;
        jQuery(bDiagram).bind("plothover", function (event, pos, item) {
          jQuery("#x").text(pos.x.toFixed(2));
          jQuery("#y").text(pos.y.toFixed(2));
                    
          if (item) {
            if (previousPoint != item.datapoint) {
              previousPoint = item.datapoint;
                          
              $("#diagramTooltip").remove();
              var x = item.datapoint[0],
              y = item.datapoint[1].toFixed(2);
                           
              //This is a mess but toLocaleString expects UTC again
              var offset = new Date().getTimezoneOffset() * 60 * 1000;
              var dte = new Date(x + offset);
              showDiagramTooltip(item.pageX, item.pageY,
              dte.toLocaleString() + ": " + y + item.series.yaxis.options.unit);
            }
          } else {
            $("#diagramTooltip").remove();
            previousPoint = null;            
          }
        })
        .bind("click", function(event) {
          // don't let the popup know about the click, or it will close on touch-displays
          event.stopPropagation();
        });
                
        bDiagramOpts = jQuery.extend(bDiagramOpts, { grid: {hoverable: true, clickable: true} });
      }

      refreshDiagram(bDiagram, bDiagramOpts);
      return false;
    });
  }
  if ((oldType=="inline") || ($p.attr("previewlabels") == "true")) {
    refreshDiagram(diagram, {});
  } else {
    refreshDiagram(diagram, {xaxes: [{ticks: 0}], yaxes: [{ticks: 0}]});
  }

  return ret_val;
}
  

VisuDesign_Custom.prototype.addCreator("diagram_inline", {
  create: function( page, path ) {
    return createDiagram(page, path, "inline");    
  }
});

VisuDesign_Custom.prototype.addCreator("diagram_popup", {
  create: function(page,path) {
    return createDiagram(page, path, "popup");
  }
});

VisuDesign_Custom.prototype.addCreator("diagram", {
  create: function(page,path) {
    return createDiagram(page, path, "none");
  }
});

VisuDesign_Custom.prototype.addCreator("diagram_info", {
  create: function( page, path ) {
    var $p = $(page);

    var address = {};
    $p.find('address').each( function(){ 
      var src = this.textContent;
      templateEngine.addAddress( src );
      address[ '_' + src ] = [ this.getAttribute('transform') ];
    });
    
    var content = diagram_get_content ( $p );
        
    function uniqid() {
      var newDate = new Date;
      return newDate.getTime();
    }

    var id = "diagram_" + uniqid();
    var classes = 'widget clearfix diagram_info';
    if( $p.attr('align') ) {
      classes+=" "+$p.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" />');
    ret_val.setWidgetLayout($p).makeWidgetLabel($p);
                
    var actor = '<div class="actor switchUnpressed ';
    if ( $p.attr( 'align' ) ) 
      actor += $p.attr( 'align' ); 
    actor += '">';
    var map = $p.attr('mapping');
    if( templateEngine.mappings[map] && templateEngine.mappings[map][value] )
      actor += '<div class="value">' + templateEngine.mappings[map][value] + '</div>';
    else
      actor += '<div class="value">-</div>';
    actor += '</div>';
                
    var $actor = $(actor).data({
      'address'  : address,
      'format'   : $p.attr('format'),
      'mapping'  : $p.attr('mapping'),
      'styling'  : $p.attr('styling')
    });
    for( var addr in address ) $actor.bind( addr, this.update );
        
    ret_val.append($actor);

    $actor.addClass("clickable");

    var bDiagram = $("<div class=\"diagram\" id=\"" + id + "_big\"/>");
        
    bDiagram.data("id", id);
    bDiagram.data("content", content);
    bDiagram.data("series", $p.attr("series") || "day");
    bDiagram.data("period", $p.attr("period") || 1);
    bDiagram.data("datasource", $p.attr("datasource") || "AVERAGE");
    bDiagram.data("legend", $p.attr("legend") || "both");
    bDiagram.data("legendposition", $p.attr("legendposition") || "ne");
    if ($p.attr("title")) {
        bDiagram.data("label", $p.attr("title"));
      } else {
    	bDiagram.data("label", $('.label', ret_val).text() || '');
      }
    
    bDiagram.data("refresh", $p.attr("refresh"));
    bDiagram.data("gridcolor", $p.attr("gridcolor") || "");
  
    
    var data = jQuery.extend({}, bDiagram.data());

    $actor.bind("click", function() {
      bDiagram.data(data);
      bDiagram.css({height: "90%"});
      bDiagram.data("ispopup", true);
      
      templateEngine.showPopup("unknown", {title: bDiagram.data('label'), content: bDiagram});
      bDiagram.parent("div").css({height: "100%", width: "90%", margin: "auto"}); // define parent as 100%!
      bDiagram.empty();
      var bDiagramOpts = {yaxis: {labelWidth: null}};
      if ($p.attr("tooltip") == "true") {
        // if we want to display a tooltip, we need to listen to the event
        var previousPoint = null;
        jQuery(bDiagram).bind("plothover", function (event, pos, item) {
          jQuery("#x").text(pos.x.toFixed(2));
          jQuery("#y").text(pos.y.toFixed(2));
                  
          if (item) {
            if (previousPoint != item.datapoint) {
              previousPoint = item.datapoint;
                          
              $("#diagramTooltip").remove();
              var x = item.datapoint[0],
              y = item.datapoint[1].toFixed(2);
                          
              //This is a mess but toLocaleString expects UTC again
              var offset = new Date().getTimezoneOffset() * 60 * 1000;
              var dte = new Date(x + offset);
              showDiagramTooltip(item.pageX, item.pageY,
              dte.toLocaleString() + ": " + y + item.series.yaxis.options.unit);
            }
          } else {
            $("#diagramTooltip").remove();
            previousPoint = null;            
          }
        })
        .bind("click", function(event) {
          // don't let the popup know about the click, or it will close on touch-displays
          event.stopPropagation();
        });
              
        bDiagramOpts = jQuery.extend(bDiagramOpts, { grid: {hoverable: true, clickable: true} });
      }

      refreshDiagram(bDiagram, bDiagramOpts);
      return false;
    });

    return ret_val;
  },
  update:  function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    element.addClass('switchUnpressed');
  }
});

diagramColors = {
  data: $("<span class='link'><a href='#' /></a>").find("a").css("color")
};

function showDiagramTooltip(x, y, contents) {
  $('<div id="diagramTooltip">' + contents + '</div>').css( {
    position: 'absolute',
    display: 'none',
    top: y + 5,
    left: x + 5,
  }).appendTo("body").fadeIn(200);
}

function refreshDiagram(diagram, flotoptions, data) {
  var diagram = $(diagram);
  var config = jQuery.extend(true, {series: diagram.data("series")}, data || {});

  var content = diagram.data("content");

  if (typeof (content) == "undefined") { // Fenster schon geschlossen oder keine Achsen und RRD konfiguriert
    return;
  }
 
  var showlegend = !((diagram.data("legend")=="none") 
	  || (diagram.data("ispopup") && (diagram.data("legend")=="inline"))  
	  || (!diagram.data("ispopup") && (diagram.data("legend")=="popup")));
  var legendposition = diagram.data("legendposition");
  var label = diagram.data("label"); // title of diagram
  var refresh = diagram.data("refresh");
  var datasource = diagram.data("datasource") || "AVERAGE"; //FIXME: to be moved to rrd-definition
  var period = diagram.data("period") || 1;
  
  var gridcolor = diagram.data("gridcolor") || "#81664B";
    
  var series = {
    hour:   {label: "hour", res: "60", start: "hour", end: "now"},
    day:    {label: "day", res: "300", start: "day", end: "now"},
    fullday:{label: "fullday", res: "300", start: "day", end: "midnight+24hour"},
    week:   {label: "week", res: "1800", start: "week", end: "now"},
    month:  {label: "month", res: "21600", start: "month", end: "now"},
    year:   {label: "year", res: "432000", start: "year", end: "now"},
  };
    
  var options = jQuery.extend(true, {
    yaxes: content.axes,
    xaxes: [{
      mode: "time"
    }],
    legend: {
      show: showlegend,
      backgroundColor: "#101010",
      position: legendposition
    },
    series: {
      points: { show: false, fill: false }
    },
    grid: {
      show: true,
      aboveData: false,
      color: gridcolor,
      backgroundColor: "black",
      tickColor: gridcolor,
      borderColor: gridcolor
    }
  }, flotoptions);
  
  var s = series[config.series];

  if (s) {
    // init
    var num = 0;
    var fulldata = [];  
    var rrdloaded = 0;
    $.each(content.rrd, function(index, value) {
      var src = index.slice(1);
      var linecolor = value[0];
      var label = value[1];
      var yaxis = value[2];
      var idx = num;
         
      $.ajax({
        url: templateEngine.backend+"rrdfetch?rrd=" + src + ".rrd&ds=" + datasource + "&start=end-" + period + s.start + "&end=" + s.end + "&res=" + s.res,
        dataType: "json",
        type: "GET",
        context: this,
        success: function(data) {
        	var color = linecolor || options.grid.color;
            var offset = new Date().getTimezoneOffset() * 60 * 1000;
            //TODO: find a better way
            for (var j = 0; j < data.length; j++) {
              data[j][0] -= offset;
              data[j][1] = parseFloat( data[j][1][0] );
            }
            fulldata[idx] = {label: label, color: color, data: data, yaxis: parseInt(yaxis)};
            rrdloaded++;
            if (rrdloaded==content.rrdnum) { 
              if (!diagram.data("plotted")) { // only plot if diagram does not exist
                diagram.data("PLOT", $.plot(diagram, fulldata, options));
                diagram.data("plotted", true);
              } else { // otherwise replace data in plot
                var PLOT = diagram.data("PLOT");
                PLOT.setData(fulldata);
                PLOT.setupGrid();
                PLOT.draw();
              }
            }
            //console.log( p, p.width(), p.height(), p.getPlotOffset() );
        }
      });
      num++;
    });
    
    if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function(diagram, flotoptions, data) {
        refreshDiagram(diagram, flotoptions, data);
      }, refresh * 1000, diagram, flotoptions, data );
    }
  }

  return false;
}
