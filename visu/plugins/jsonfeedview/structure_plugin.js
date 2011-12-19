/* structure_plugin.js (c) 2011 by Jan N. Klug 
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
 * This plugins views json-feeds
 */

VisuDesign_Custom.prototype.addCreator('jsonfeedview', {
  maturity: Maturity.development,
  create: function (page, path) {
    var $p = $(page);
    var viewnum = parseFloat($p.attr('view')) || 1;

    var dummy = $('<div class="widget text" />').appendTo($("body"));
    dummy.css({'float': 'left', 'visibility': 'hidden', 'display': 'inline'});
    var h = dummy.outerHeight();
    var fontsize = parseFloat(dummy.css("font-size"));
    var margin = parseFloat(dummy.css("marginTop"));
    var padding = parseFloat(dummy.css("paddingTop"));
    var minheight = parseFloat(dummy.css("min-height"));
    dummy.remove();
        
    var ourheight = ((viewnum-1)*(2*margin+2*padding)+viewnum*minheight)/fontsize;
    var ret_val = $('<div class="widget clearfix jsonfeedview" style="height:'+ourheight+'em" ><div class="table" /></div>'); 
            
    var refresh = $p.attr('refresh') || 30; // default 30s
       
    ret_val.data("src", $p.attr('src'));
    ret_val.data("refresh", refresh);  
    ret_val.data("view", viewnum); // default alles
    ret_val.data("idx", 0);
        
    var data = jQuery.extend({}, ret_val.data());
            
    refreshjson(ret_val,  data);
    return ret_val;
  },
  attributes: {
    src:      { type: 'string', required: true },
    refresh:  { type: 'numeric', required: false }
  },
  elements: {
  },
  content:   false
});

function refreshjson(e,data) {
    var element = $(e);

    var tmp = $.getJSON(data.src, function(json) {
       var content = '<div class="table">';
       var feed = json.responseData.feed;
       var feedlength = feed.entries.length;
       var viewnum = data.view;
       
       if (viewnum > feedlength) { // max is number of entries
         viewnum = feedlength;
       }
       
       for (var i=0; i<viewnum; i++) { //
         var showidx = i + data.idx;
         if (showidx >= feedlength) {
           showidx = showidx - feedlength;
         }
         content += "<div class ='tr'>"+feed.entries[showidx].content+"</div>";
       };
       element.find('.table').replaceWith($(content+"</div")); //html(content); 
       if (data.idx >= feedlength) {
         data.idx=0;
       } else {
         data.idx = data.idx+1;
       }
    });
    
    window.setTimeout(function(element, data) {
      refreshjson(element, data)
    }, data.refresh * 1000, element, data);
};
