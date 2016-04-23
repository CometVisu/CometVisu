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

define( ['structure_custom', 'css!plugins/rsslog/rsslog' ], function( VisuDesign_Custom ) {
  "use strict";

  VisuDesign_Custom.prototype.addCreator("rsslog", {
  create: function( element, path, flavour, type ) { 
    var 
      $el = $(element),
      classes = templateEngine.design.setWidgetLayout( $el, path ),
      label = templateEngine.design.extractLabel( $el.find('label')[0], flavour ),
      address = templateEngine.design.makeAddressList( $el, false, path );

    var id = "rss_" + path;
    var extsource = false;

    var ret_val = '<div class="widget clearfix rsslog '+classes+'" >';
    if( label )
      ret_val += label;

    ret_val += '<div class="actor rsslogBody"><div class="rsslog_inline" id="' + id + '" style="'
    if ($el.attr("width")) {
      ret_val += "width:" + $el.attr("width") + ';';
    }
    if ($el.attr("height")) {
      ret_val += "height:" + $el.attr("height");
    }
    ret_val += '"></div></div>';
    ret_val += '</div>';

    var data = templateEngine.widgetDataInsert( path, {
      id:         id,
      address:    address,
      src:        $el.attr("src"),
      filter:     $el.attr("filter"),
      refresh:    $el.attr("refresh"),
      datetime:   $el.attr("datetime") || true,
      mode:       $el.attr("mode") || "last",
      limit:      $el.attr("limit") ? +$el.attr("limit") : 0,
      timeformat: $el.attr("timeformat"),
      itemoffset: 0,
      itemack:    $el.attr("itemack") || "modify", // allowed: modify, display, disable
      future:     $el.attr("future"),
    });
    
    templateEngine.callbacks[ templateEngine.getPageIdForWidgetId( element, path ) ].beforePageChange.push( function(){
      refreshRSSlog( data );
    });

    return ret_val;
  },
  update:   function( ga, d ) { 
    var 
      element = $(this),
      path = element.parent().attr('id'),
      widgetData = templateEngine.widgetDataGet( path );
    refreshRSSlog( widgetData );
  },
  action: function( path, actor, isCanceled ) {
    if( isCanceled ) return;

    var 
      widgetData = templateEngine.widgetDataGet( path ),
      brss = $('<div class="rsslog_popup" id="'+widgetData.id+'_big"/>');
      
    var popup = templateEngine.showPopup("rsslog", {title: $('#'+path+' .label').text() || '', content: brss});
    brss.parent("div").css({height: "90%", width: "90%", margin: "auto"}); // define parent as 100%!
    widgetData.refresh = "";
    $(brss).bind("click", function(event) {
      // don't let the popup know about the click, or it will close on touch-displays
      event.stopPropagation();
    });
    popup.bind( "close", function(a,b,c) {
      // reload main data - but only once (popup and popup_background are caught
      // here). 
      // But delay it so that any change done to the data has a chance to 
      // arrive here.
      if( $(this).hasClass('popup') && widgetData.itemack === 'modify' )
      {
        window.setTimeout( function(){ refreshRSSlog( widgetData ); }, 100 );
        for( var addr in widgetData.address )
        {
          if( !(widgetData.address[addr][1] & 2) ) continue; // skip when write flag not set
          templateEngine.visu.write( addr, templateEngine.transformEncode( widgetData.address[addr][0], 0 ) );
        }
      }
    });
    popup.find('.main').css("overflow", "auto");
    refreshRSSlog( widgetData, true );
  }
});

  function refreshRSSlog( data, isBig ) {
    var src = data.src;
    var filter = data.filter;
    if (filter) {
      if (src.match(/\?/)) {
        src += '&f=' + filter;
      } else {
        src += '?f=' + filter;
      }
    }
    var refresh = data.refresh;
    var limit = data.limit;
    if (limit) {
      if (src.match(/\?/)) {
        src += '&limit=' + limit;
      } else {
        src += '?limit=' + limit;
      }
    }
    var future = data.future;
    if (future) {
      if (src.match(/\?/)) {
        src += '&future=' + future;
      } else {
        src += '?future=' + future;
      }
    }
    
    $('#'+data.id+(isBig?'_big':'')).rssfeedlocal({
      src: src,
      datetime: eval(data.datetime),
      mode: data.mode,
      timeformat: data.timeformat,
      itemack: isBig ? data.itemack : ( 'modify' === data.itemack ? 'display' : data.itemack )
    });
    
    if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function() {
        refreshRSSlog( data, isBig )
      }, refresh * 1000 );
    }
    
    return false;
  }

  (function($){
  jQuery.fn.extend({
    rssfeedlocal: function(options) {
  
      var defaults = {
        src: '',
        html: '<span class="mappedValue" /><span>{text}</span>',
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
        var extsource = false;

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
            var isFuture = false;
            
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
                isFuture = (entryDate > new Date() );
              }
              else {
                itemHtml = itemHtml.replace(/{date}/, '');
              }
                            
              var $row = $('<li class="rsslogRow ' + row + '">').append(itemHtml);
              if( item.mapping !== '' )
              {
                var mappedValue = templateEngine.map( o.itemack === 'disable' ? 0 : item.state, item.mapping );
                var $span = $row.find('.mappedValue');
                templateEngine.design.defaultValue2DOM( mappedValue, function(e){ $span.append(e); } );
              }
              if (separatoradd & idx !== 0) { 
                $row.addClass('rsslog_separator');
                separatorprevday = true; 
              }
              else {
                separatorprevday = false;
              }
        
              if (separatorprevday == true) { 
                $row.addClass(' rsslog_prevday'); 
              }
        
              if (isFuture) {
                $row.addClass((row == 'rsslogodd') ? 'rsslog_futureeven' : 'rsslog_futureodd');
              }

              $row.data({ 'id': item.id, 'mapping': item.mapping });
              if (item.tags) {
                var tmp = $('span', $row);
                $.each(item.tags, function (i, tag) {
                  tmp.addClass(tag);
                });
              }
              if( item.state == 1 && o.itemack !== 'disable' ) {
                $row.addClass("rsslog_ack");
              }

              if( o.itemack === 'modify' ) {
                $row.bind("click", function() {
                  var item = $(this);
                  var id = item.data('id');
                  var mapping = item.data('mapping');
                  item.toggleClass("rsslog_ack");
                  var state = +item.hasClass("rsslog_ack"); // the new state is the same as hasClass
                  if( mapping !== '' )
                  {
                    var mappedValue = templateEngine.map( state, mapping );
                    var $span = item.find('.mappedValue');
                    $span.empty();
                    templateEngine.design.defaultValue2DOM( mappedValue, function(e){ $span.append(e); } );
                  }
                  var url = o.src.split('?')[0] + '?u=' + id + '&state=' + state;
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

});