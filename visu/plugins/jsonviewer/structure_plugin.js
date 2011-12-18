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
 
 VisuDesign_Custom.prototype.addCreator('jsonviewer', {
  maturity: Maturity.development,
  create: function( page, path ) {
    var $p = $(page);
    var ret_val = $('<div class="widget clearfix text" />');
    var style = '';
    
    if( style != '' ) style = 'style="' + style + '"';
    var json = $('<div class="value">-</div>');
    var refresh = $p.attr('refresh') || 30; // default 30s
        
    json.data("src", $p.attr('src'));
    json.data("refresh", refresh);  
    json.data("view", $p.attr('view')); // default alles
    json.data("idx", 0);
    
    var data = jQuery.extend({}, json.data());
    ret_val.append(json);
    
    
        
    refreshjson(json,  data);
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
       var content = '';
       var feed = json.responseData.feed;
       var feedlength = feed.entries.length;
       var viewnum = data.view;
       if (viewnum > feedlength) { // max is number of entries
         viewnum = feedlength;
       }
       for (var i=0; i<viewnum; i++) {
         var showidx = i + data.idx;
         if (showidx >= feedlength) {
           showidx = showidx - feedlength;
         }
         content += ""+feed.entries[showidx].content + "<br>";
       };
       element.html(content); 
       if (data.idx >= feedlength) {
         data.idx=0;
       } else {
         data.idx = data.idx+1;
       }
    });
    var tmp2=0;
    window.setTimeout(function(element, data) {
      refreshjson(element, data)
    }, data.refresh * 1000, element, data);
};