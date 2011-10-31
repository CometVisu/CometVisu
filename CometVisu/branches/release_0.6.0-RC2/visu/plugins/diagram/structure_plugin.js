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
$("body").append("<script type=\"text/javascript\" src=\"plugins/diagram/flot/jquery.flot.js\"></script>");

VisuDesign_Custom.prototype.addCreator("diagram_inline", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "diagram_" + uniqid();

        var ret_val = $('<div class="widget" />');
        ret_val.addClass( 'diagram' );
        var label = '<div class="label">' + page.textContent + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"diagram_inline\" id=\"" + id + "\">loading...</div></div>");
        var diagram = $("#" + id, actor);

        if ($p.attr("width")) {
            diagram.css("width", $p.attr("width"));
        }
        if ($p.attr("height")) {
            diagram.css("height", $p.attr("height"));
        }

        ret_val.append(label).append(actor);

        diagram.data("id", id);
        diagram.data("rrd", $p.attr("rrd"));
        diagram.data("unit", $p.attr("unit") || "");
        diagram.data("series", $p.attr("series") || "day");
        diagram.data("period", $p.attr("period") || 1);
        diagram.data("datasource", $p.attr("datasource") || "AVERAGE");
        diagram.data("label", page.textContent);
        diagram.data("refresh", $p.attr("refresh"));

        refreshDiagram(diagram, {});

        return ret_val;
    },
    attributes: {
        rrd:        {type: "string", required: true},
        width:      {type: "string", required: false},
        height:     {type: "string", required: false},
        unit:       {type: "string", required: false},
        series:     {type: "list", required: false, list: {hour: "hours", day: "days", week: "weeks", month: "months", year: "years"}},
        period:     {type: "numeric", required: false},
        datasource: {type: "list", required: false, list: {'MIN': "Min", 'AVERAGE': "Avg", 'MAX': "Max"}},
        refresh:    {type: "numeric", required: false}
    },
    content: {type: "string", required: true}
});

VisuDesign_Custom.prototype.addCreator("diagram_popup", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "diagram_" + uniqid();

        var ret_val = $('<div class="widget" />');
        ret_val.addClass( 'diagram' );
        var label = '<div class="label">' + page.textContent + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"diagram_preview\" id=\"" + id + "\">loading...</div></div>");
        var diagram = $("#" + id, actor);

        if ($p.attr("width")) {
            diagram.css("width", $p.attr("width"));
        }
        if ($p.attr("height")) {
            diagram.css("height", $p.attr("height"));
        }

        ret_val.append(label).append(actor);

        diagram.data("id", id);
        diagram.data("rrd", $p.attr("rrd"));
        diagram.data("unit", $p.attr("unit") || "");
        diagram.data("series", $p.attr("series") || "day");
        diagram.data("period", $p.attr("period") || 1);
        diagram.data("datasource", $p.attr("datasource") || "AVERAGE");
        diagram.data("label", page.textContent);
        diagram.data("refresh", $p.attr("refresh"));

        var bDiagram = $("<div class=\"diagram\" id=\"" + id + "_big\"/>");
        
        diagram.addClass("clickable");
        var data = jQuery.extend({}, diagram.data());

        diagram.bind("click", function() {
            bDiagram.data(data);
            bDiagram.css({height: "90%"});

            showPopup("unknown", {title: page.textContent, content: bDiagram});
            bDiagram.parent("div").css({height: "100%", width: "90%", margin: "auto"}); // define parent as 100%!
 
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
                                        dte.toLocaleString() + ": " + y + jQuery(this).data("unit"));
                        }
                    }
                    else {
                        $("#diagramTooltip").remove();
                        previousPoint = null;            
                    }

                })
                .bind("click", function(event) {
                    // don't let the popup know about the click, or it will close on touch-displays
                    event.stopPropagation();
                });
                
                bDiagramOpts = jQuery.extend(bDiagramOpts, {grid: {hoverable: true, clickable: true} });
            }

            refreshDiagram(bDiagram, bDiagramOpts);
            return false;
        });

        refreshDiagram(diagram, {xaxes: [{ticks: 0}], yaxes: [{ticks: 0}]});

        return ret_val;
    },
    attributes: {
        rrd:        {type: "string", required: true},
        unit:       {type: "string", required: false},
        series:     {type: "list", required: false, list: {hour: "hours", day: "days", week: "weeks", month: "months", year: "years"}},
        period:     {type: "numeric", required: false},
        datasource: {type: "list", required: false, list: {'MIN': "Min", 'AVERAGE': "Avg", 'MAX': "Max"}},
        refresh:    {type: "numeric", required: false},
        tooltip:    {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
    },
    content: {type: "string", required: true}
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

    var unit = diagram.data("unit");
    var rrd = diagram.data("rrd");
    var label = diagram.data("label");
    var refresh = diagram.data("refresh");
    var datasource = diagram.data("datasource") || "AVERAGE";
    var period = diagram.data("period") || 1;

    var series = {
        hour:   {label: "hour", res: "60", start: "hour", end: "now"},
        day:    {label: "day", res: "300", start: "day", end: "now"},
        week:   {label: "week", res: "1800", start: "week", end: "now"},
        month:  {label: "month", res: "21600", start: "month", end: "now"},
        year:   {label: "year", res: "432000", start: "year", end: "now"},
    };
    
    var options = jQuery.extend(true,
        {
            yaxes: [{
                tickFormatter: function (v, axis) { return v.toFixed(axis.tickDecimals) + unit; }
            }],
            xaxes: [{
                mode: "time"
            }],
            legend: {
                show: 1,
                backgroundColor: "#101010"
            },
            series: {
                points: { show: false, fill: false }
            },
            grid: {
                show: true,
                aboveData: false,
                color: "#81664B",
                backgroundColor: "black",
                tickColor: "#81664B",
                borderColor: "#81664B"//,
                //axisMargin: 0,
                //labelMargin: 0
            }
        },
        flotoptions);

    var s = series[config.series];

    if (s) {
        // init
        $.ajax({
            url: "/cgi-bin/rrdfetch?rrd=" + rrd + ".rrd&ds=" + datasource + "&start=end-" + period + s.start + "&end=" + s.end + "&res=" + s.res,
            dataType: "json",
            type: "GET",
            success: function(data) {
                var color = diagramColors.data || options.grid.color;
                var offset = new Date().getTimezoneOffset() * 60 * 1000;
                //TODO: find a better way
                for (var j = 0; j < data.length; j++) {
                    data[j][0] -= offset;
                    data[j][1] = parseFloat( data[j][1][0] );
                }
                p = $.plot(diagram, [{color: color, data: data}], options);
                //console.log( p, p.width(), p.height(), p.getPlotOffset() );
            }
        });

        if (typeof (refresh) != "undefined" && refresh) {
            // reload regularly
            window.setTimeout(function(diagram, flotoptions, data) {
                refreshDiagram(diagram, flotoptions, data)
                }, refresh * 1000, diagram, flotoptions, data);
        }
    }




    return false;

}

