/* structure_plugin.js (c) 2011 by Michael Markstaller [devel@wiregate.de]
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
 * This plugins integrates date/clock into CometVisu.
 */
 
$('head').append('<script type=\"text/javascript\" src=\"plugins/jqclock/jqclock.min.js\" charset=\"UTF-8\"></script>');
$('head').append('<link rel="stylesheet" href="plugins/jqclock/jqclock.css" type="text/css" />');

VisuDesign_Custom.prototype.addCreator("jqclock", {
  create: function( page, path ) {
    var $p = $(page);
    function uniqid() {
      var newDate = new Date;
      return newDate.getTime();
    }
    var id = "jqclock_" + uniqid();

    var ret_val = $('<div class="widget clearfix jqclock" />');
    ret_val.setWidgetLayout($p);
        
    var label = '<div class="label">' + page.textContent + '</div>';
    var actor = $("<div class=\"actor\"><div class=\"jqclock_inline\" id=\"" + id + "\"></div></div>");
    var jqclock = $("#"+id,actor);

    if ($p.attr("width")) {
      jqclock.css("width", $p.attr("width"));
    }
    if ($p.attr("height")) {
      jqclock.css("height", $p.attr("height"));
    }

    //start the clock in statusbar - if any
    $("div#jqclock_status").clock({"langSet":$("div#jqclock_status").attr('lang'),"calendar":$("div#jqclock_status").attr('date')});

    window.setTimeout(function() {
      //start myself after 1 sec? a quirk?
      $("#"+id).clock({"langSet":$p.attr("lang"), "calendar":$p.attr("date")});
    }, 1000);

    ret_val.append(label).append(actor);
    return ret_val;
  },
  attributes: {
    width:      {type: "string", required: false},
    height:     {type: "string", required: false},
    lang:   {type: "list", required: true, list:  {'de':'Deutsch','en':'English','es':'Espanol','fr':'Francais','it':'Italiano','ru':'Ruski'}},
    date:   {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
    colspan:    { type: 'numeric', required: false },
    rowspan:    { type: 'numeric', required: false }
  },
  content: false
});

