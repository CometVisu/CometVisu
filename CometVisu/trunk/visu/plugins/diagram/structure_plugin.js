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
        series:     {type: "string", required: false},
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
        diagram.data("label", page.textContent);
        diagram.data("refresh", $p.attr("refresh"));

        var bDiagram = $("<div class=\"diagram\" id=\"" + id + "_big\"/>");

        diagram.addClass("clickable");

        diagram.bind("click", function() {
            bDiagram.data(jQuery.extend({}, diagram.data()));
            bDiagram.css({height: "90%"});
            showPopup("unknown", {title: page.textContent, content: bDiagram});
            bDiagram.parent("div").css({height: "100%", width: "90%", margin: "auto"}); // define parent as 100%!
            refreshDiagram(bDiagram, {yaxis: {labelWidth: null}});
            return false;
        });

        refreshDiagram(diagram, {xaxis: {ticks: 0}, yaxis: {ticks: 0}});

        return ret_val;
    },
    attributes: {
        rrd:        {type: "string", required: true},
        unit:       {type: "string", required: false},
        series:     {type: "string", required: false},
        refresh:    {type: "numeric", required: false}
    },
    content: {type: "string", required: true}
});

diagramColors = {
    data: $("<span class='link'><a href='#' /></a>").find("a").css("color")
};

function refreshDiagram(diagram, flotoptions, data) {
    var diagram = $(diagram);
    var config = jQuery.extend(true, {series: diagram.data("series")}, data || {});

    var unit = diagram.data("unit");
    var rrd = diagram.data("rrd");
    var label = diagram.data("label");
    var refresh = diagram.data("refresh");

    var series = {
        day:    {label: "day", res: "300", start: "-1day", end: "now"},
        week:   {label: "week", res: "1800", start: "-1week", end: "now"},
        month:  {label: "month", res: "21600", start: "-1month", end: "now"},
        year:   {label: "year", res: "432000", start: "-1year", end: "now"}
    };

    var options = jQuery.extend(true,
        {
            yaxis: {
                tickFormatter: function (v, axis) { return v.toFixed(axis.tickDecimals) + unit; },
                labelWidth: "auto"
            },
            xaxis: {
                mode: "time"
            },
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
                borderColor: "#81664B"
            }
        },
        flotoptions);

    var s = series[config.series];

    if (s) {
        // init
        $.ajax({
            url: "/cgi-bin/rrdfetch?rrd=" + rrd + ".rrd&ds=AVERAGE&start=end" + s.start + "&end=" + s.end + "&res=" + s.res,
            dataType: "json",
            type: "GET",
            success: function(data) {
                $.plot(diagram, [{color: diagramColors.data, data: data}], options);
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