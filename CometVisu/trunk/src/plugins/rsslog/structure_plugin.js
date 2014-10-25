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

$.getCSS( 'plugins/rsslog/rsslog.css', templateEngine.pluginLoaded );

VisuDesign_Custom.prototype.addCreator("rsslog", {
  create: function( element, path, flavour, type ) { 
    var $el = $(element);

    function uniqid() {
      var newDate = new Date;
      return newDate.getTime();
    }

    var id = "rss_" + uniqid();
    var extsource = false;

    var ret_val = $('<div class="widget clearfix rsslog" />');
    basicdesign.setWidgetLayout( ret_val, $el );
    basicdesign.makeWidgetLabel( ret_val, $el );

    var actor = $('<div class="actor rsslogBody"><div class="rsslog_inline" id="' + id + '"></div></div>');
    var rss = $("#" + id, actor);

    if ($el.attr("width")) {
      rss.css("width", $el.attr("width"));
    }
    if ($el.attr("height")) {
      rss.css("height", $el.attr("height"));
    }

    ret_val.append(actor);

    rss.data("id", id);
    rss.data("src", $el.attr("src"));
    rss.data("filter", $el.attr("filter"));
    rss.data("refresh", $el.attr("refresh"));
    rss.data("datetime", $el.attr("datetime")) || true;
    rss.data("mode", $el.attr("mode") || "last");
    rss.data("timeformat", $el.attr("timeformat"));
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
      }).bind( "remove", function() {
        refreshRSSlog(rss);
      });
      $(brss).parent().css("overflow", "auto");
      refreshRSSlog(brss);
    });
        
    templateEngine.bindActionForLoadingFinished(function() {
      refreshRSSlog(rss);
    });
    $(window).bind('scrolltopage', function( event, page_id ){
      var page = templateEngine.getParentPageFromPath(path);
      if (page != null && page_id == page.attr("id")) {
        refreshRSSlog(rss);
      }
    });

    return ret_val;
  }
});

function refreshRSSlog(rss) {
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
        datetime: eval(rss.data("datetime")),
        mode: rss.data("mode"),
        timeformat: rss.data("timeformat"),
        itemack: rss.data("itemack"),
      });
    });
    
    if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function(rss) {
        refreshRSSlog(rss)
      }, refresh * 1000, rss);
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
        dataType: 'json',
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
        
	if (!o.src.match(/rsslog\.php/) && !o.src.match(/rsslog_mysql\.php/)) {
	  extsource = true; // for later changes to tell if internal or external source being used
	  var wrapper = "plugins/rsslog/rsslog_external.php?url="
          o.src = wrapper.concat(o.src);
	} else {
	  if (o.src.match(/\?/)) {
            o.src += '&j';
          } else {
            o.src += '?j';
          }
	}

        jQuery.ajax({
          url: o.src,
          type: 'GET',
          dataType: o.dataType,
          error: function (xhr, status, e) {
          console.log('C: #%s, Error: %s, Feed: %s', $(c).attr('id'), e, o.src);
          },
          success: function(result){
            //console.log('C: #%s, Success, Feed: %s', $(c).attr('id'), o.src);
            c.html('');

            // get height of one entry, calc max num of display items in widget
            var displayrows = c.data("last_rowcount") || 0;
            var dummyDiv = $('<li class="rsslogRow odd" id="dummydiv">.</li>').appendTo(c);
            var itemheight = dummyDiv.height();
            dummyDiv.remove();
            if (itemheight != 0) {
              var widget=c.parent().parent(); // get the parent widget
              var displayheight = widget.height()-$('.label', widget).height(); // max. height of actor is widget-label(if exists)
              displayrows = Math.floor(displayheight/itemheight);
            }
            c.data("last_rowcount", displayrows);

            var items = result.responseData.feed.entries;
            var itemnum = items.length;
	    //console.log('C: #%s, %i element(s) found, %i displayrow(s) available', $(c).attr('id'), itemnum, displayrows);
                          
            var itemoffset = 0; // correct if mode='last' or itemnum<=displayrows
                          
            if (itemnum>displayrows) { // no need to check mode if items are less than rows
              if (o.mode=='first') {
                itemoffset=itemnum-displayrows;
              }
              if (o.mode=='rollover') {
                itemoffset = c.data("itemoffset") || 0;
                if (itemoffset==itemnum) {
                  itemoffset = 0;
                }
                c.data("itemoffset", itemoffset+1);
              }
            }
                          
            var row = 'rsslogodd';
            var last = itemoffset+displayrows;
            last = (last>itemnum) ? itemnum : last;
            
            var separatordate = new Date().strftime('%d');
            var separatoradd = false;
            var separatorprevday = false;
            
            for (var i=itemoffset; i<last; i++) {  
              //console.log('C: #%s, processing item: %i of %i', $(c).attr('id'), i, itemnum);
              var idx = i;
              idx = (i>=itemnum) ? (idx = idx - itemnum) : idx;
                            
              var item = items[idx];
              var itemHtml=o.html;
                            
              itemHtml = itemHtml.replace(/{text}/, item.content);
              var entryDate = new Date(item.publishedDate);
              if (entryDate) {
                itemHtml = (o.timeformat) ? 
                  (itemHtml.replace(/{date}/, entryDate.strftime(o.timeformat) + '&nbsp;')) : 
                  (itemHtml.replace(/{date}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;'));
                var thisday = entryDate.strftime('%d');
                separatoradd = ((separatordate > 0) && (separatordate != thisday));
                separatordate = thisday;  
              }
              else {
                itemHtml = itemHtml.replace(/{date}/, '');
              }
                            
              var $row = $('<li class="rsslogRow ' + row + '">').append(itemHtml);
              if (separatoradd) { 
                $row.addClass('rsslog_separator');
                separatorprevday = true; 
              }
              if (separatorprevday == true) { 
                $row.addClass(' rsslog_prevday'); 
              }

              $row.data('id', item.id);
              if (item.tags) {
                var tmp = $('span', $row);
                $.each(item.tags, function (i, tag) {
                  tmp.addClass(tag);
                });
              }
              if (item.state == 1) {
                $row.addClass("rsslog_ack");
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
                                          
              c.append($row);

              // Alternate row classes
              row = (row == 'rsslogodd') ? 'rsslogeven' : 'rsslogodd';
            };
                          
            $("li", c).wrapAll("<ul>");                      
          }
        });
      });
      return this;
    }
  });
})(jQuery);