/* structure_plugin.js (c) 2011 by Michael Markstaller [devel@wiregate.de]
 * rsslog (c) 2012 by Jan N. Klug [jan.n.klug@rub.de]
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

$.getCSS( 'plugins/rsslog/rsslog.css' );

VisuDesign_Custom.prototype.addCreator("rsslog", {
  create: function( page, path ) {
    var $p = $(page);
    function uniqid() {
      var newDate = new Date;
      return newDate.getTime();
    }

    var id = "rss_" + uniqid();

    var ret_val = $('<div class="widget clearfix rsslog" />');
    basicdesign.setWidgetLayout( ret_val, $p );
    basicdesign.makeWidgetLabel( ret_val, $p );

    var actor = $('<div class="actor rsslogBody"><div class="rsslog_inline" id="' + id + '"></div></div>');
    var rss = $("#" + id, actor);

    if ($p.attr("width")) {
      rss.css("width", $p.attr("width"));
    }
    if ($p.attr("height")) {
      rss.css("height", $p.attr("height"));
    }

    ret_val.append(actor);

    rss.data("id", id);
    rss.data("src", $p.attr("src"));
    rss.data("filter", $p.attr("filter"));
    rss.data("refresh", $p.attr("refresh"));
    rss.data("content", $p.attr("content")) || true;
    rss.data("datetime", $p.attr("datetime")) || true;
    rss.data("mode", $p.attr("mode") || "last");
    rss.data("timeformat", $p.attr("timeformat"));
    rss.data("itemoffset", 0);
    rss.data("itemack", 0);
    
    var brss = $('<div class="rsslog_popup" id="' + id + '_big"/>');
    var data = jQuery.extend({}, rss.data());
    
    ret_val.bind("click", function() {
      templateEngine.showPopup("rsslog", {title: $('.label', ret_val).text() || '', content: brss});
      brss.parent("div").css({height: "90%", width: "90%", margin: "auto"}); // define parent as 100%!
      brss.data(data);
      brss.data("refresh", "");
      brss.data("itemack", 1);
      $(brss).bind("click", function(event) {
        // don't let the popup know about the click, or it will close on touch-displays
        event.stopPropagation();
      });
      $(brss).parent().css("overflow", "auto");
      refreshRSSlog(brss, {});
    });
        
    refreshRSSlog(rss, {});

    return ret_val;
  }
});

function refreshRSSlog(rss, data) {
    var rss = $(rss);

    var src = rss.data("src");
    var filter = rss.data("filter");
    if (filter) {
      if (src.match(/\?/)) {
        src += '&f=' + filter;
      } else {
        src += '?f=' + filter;
      }
    }
    var refresh = rss.data("refresh");
    var limit = rss.data("limit");
    

    $(function() {
      $(rss).rssfeedlocal({
        src: src,
        content: rss.data("content"),
        datetime: eval(rss.data("datetime")),
        mode: rss.data("mode"),
        timeformat: rss.data("timeformat"),
        itemack: rss.data("itemack"),
      });
    });
    
    if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function(rss, data) {
        refreshRSSlog(rss, data)
      }, refresh * 1000, rss, data);
    }
    
    return false;
}

(function($){
  jQuery.fn.extend({
    rssfeedlocal: function(options) {
  
      var defaults = {
        src: '',
        html: '<span>{text}</span>',
        wrapper: 'li',
        dataType: 'xml',
        datetime: true
      }
      var options = jQuery.extend(defaults, options);
            
      if (options.datetime) {
        options.html = '{date}: ' + options.html;
      }

      return this.each(function() {
        var o = options;
        var c = jQuery(this);

        if (o.src == '') {
          console.log('rssfeedlocal: no src URL');
          return; // avoid the request
        }

        jQuery.ajax({
          url: o.src,
          type: 'GET',
          dataType: o.dataType,
          error: function (xhr, status, e) {
          console.log('C: #%s, Error: %s, Feed: %s', $(c).attr('id'), e, o.src);
          },
          success: function(feed){
            jQuery(c).html('');
                         
            // get height of one entry, calc max num of display items in widget
            var dummyDiv = $('<' + o.wrapper + ' class="rsslogRow odd" id="dummydiv">.</li>').appendTo($(c));
            var itemheight = dummyDiv.height();
            dummyDiv.remove();
            var widget=$(c).parent().parent(); // get the parent widget
            var displayheight = widget.height()-$('.label', widget).height(); // max. height of actor is widget-label(if exists)
            var displayrows = Math.floor(displayheight/itemheight);
                                   
            var items = $(feed).find('item');
            var itemnum = items.length;
                          
            var itemoffset = 0; // correct if mode='last' or itemnum<=displayrows
                          
            if (itemnum>displayrows) { // no need to check mode if items are less than rows
              if (o.mode=='first') {
                itemoffset=itemnum-displayrows;
              }
              if (o.mode=='rollover') {
                itemoffset = $(c).data("itemoffset") || 0;
                if (itemoffset==itemnum) {
                  itemoffset = 0;
                }
                $(c).data("itemoffset", itemoffset+1);
              }
            }
                          
            var row = 'rsslogodd';
            var last = itemoffset+displayrows;
            last = (last>itemnum) ? itemnum : last;
            
            var separatordate = new Date().strftime('%d');
            var separatoradd = false;
            var separatorprevday = false;
            
            for (var i=itemoffset; i<last; i++) {  
              var idx = i;
              idx = (i>=itemnum) ? (idx = idx - itemnum) : idx;
                            
              var item = $(items[idx]);
              var itemHtml=o.html;
                            
              itemHtml = itemHtml.replace(/{text}/, item.find('description').text());
              var entryDate = new Date(item.find('pubDate').text());
              if (entryDate) {
                itemHtml = (o.timeformat) ? 
                  (itemHtml.replace(/{date}/, entryDate.strftime(o.timeformat) + '&nbsp;')) : 
                  (itemHtml.replace(/{date}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;'));
                var thisday = entryDate.strftime('%d');
                separatoradd = ((separatordate > 0) && (separatordate != thisday));
                separatordate = thisday;  
              } else {
                itemHtml = itemHtml.replace(/{date}/, '');
              }
                            
              var $row = $('<' + o.wrapper + ' class="rsslogRow ' + row + '">').append(itemHtml);
              if (separatoradd) { 
                $row.addClass('rsslog_separator'); separatorprevday = true; 
              }
              if (separatorprevday == true) { 
                $row.addClass(' rsslog_prevday'); 
              }
              
              var title = item.find('title').text();
              var itemClasses = title.substring(title.search(/\[/)+1,title.search(/\]/)).replace(/\,/g, ' ');
              if (itemClasses) {
                $('span', $row).addClass(itemClasses);
                var id = itemClasses.match(/id=[0-9]*/)[0].split('=')[1];
                $row.data('id', id);
              }
              
              if (o.itemack) {
                $row.bind("click", function() {
                   var item = $(this);
                   var id = item.data('id');
                   item.toggleClass("rsslog_ack");
                   var state = item.hasClass("rsslog_ack"); // the new state is the same as hasClass
                   var url = o.src.split('?')[0] + '?u=' + id + '&state=' + Number(state);
                   jQuery.ajax({
                     url: url,
                     type: 'GET',             
                     error: function (xhr, status, e) {
                       console.log('ID: #%s, Error: %s, URL: %s', id, e, url);
                     },
                   });
                });
              }
                                          
              jQuery(c).append($row);

              // Alternate row classes
              row = (row == 'rsslogodd') ? 'rsslogeven' : 'rsslogodd';
            };
                          
            $('li', c).wrapAll("<ul>");                      
          }
        });
      });
      return this;
    }
  });
})(jQuery);

templateEngine.pluginLoaded();