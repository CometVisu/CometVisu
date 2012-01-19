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
 * This plugins integrates zrssfeed to display RSS-Feeds via Google-API 
 * *and* a parser for local feeds using jQuery 1.5+ into CometVisu.
 * rssfeedlocal is derived from simplerss and zrssfeed
 * rssfeedlocal is mainly meant to be used with rsslog.php and plugins
 * Examples
 *   <rss src="/visu/plugins/rss/rsslog.php" refresh="300" link="false" title="false"></rss>
 *   <rss src="http://www.tagesschau.de/xml/rss2" refresh="300">Test API</rss>
 *   <rss src="/visu/plugins/rss/tagesschau-rss2.xml" refresh="300" header="true" date="true"></rss>
 */

$.get("plugins/rsslog/rsslog.css", function(css) {
    $("head").append("<style>"+css+"</style>");
});

VisuDesign_Custom.prototype.addCreator("rsslog", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "rss_" + uniqid();

        var ret_val = $('<div class="widget clearfix" />');
        ret_val.addClass( 'rsslog' );
        
        if ($p.attr("rowspan")) {  // add rowspan only if not default
          ret_val.addClass(rowspanClass($p.attr("rowspan")));
        }
        
        var labelElement = $p.find('label')[0];
        var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
       
        var actor = $('<div class="actor rsslogBody"><div class="rsslog_inline" id="' + id + '"></div></div>');
        var rss = $("#" + id, actor);

        if ($p.attr("width")) {
            rss.css("width", $p.attr("width"));
        }
        if ($p.attr("height")) {
            rss.css("height", $p.attr("height"));
        }

        ret_val.append(label).append(actor);

        rss.data("id", id);
        rss.data("src", $p.attr("src"));
        rss.data("label", labelElement ? labelElement.textContent : '' );
        rss.data("refresh", $p.attr("refresh"));
        rss.data("content", $p.attr("content")) || true;
        rss.data("title", $p.attr("title")) || true;
        rss.data("mode", $p.attr("mode") || "last");
        rss.data("timeformat", $p.attr("timeformat"));

        rss.data("itemoffset", 0);
        
        refreshRSSlog(rss, {});

        return ret_val;
    },
    attributes: {
        src:        {type: "string", required: true},
        width:      {type: "string", required: false},
        height:     {type: "string", required: false},
        refresh:    {type: "numeric", required: false},
        content:    {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        title:      {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        mode:       {type: "list", required: false, list: {'first': 'first', 'last': 'last', 'rollover':'rollover' }},
        timeformat: {type: "string", required: false},
    },
    content: false
});

function refreshRSSlog(rss, data) {
    var rss = $(rss);

    var src = rss.data("src");
    var label = rss.data("label");
    var refresh = rss.data("refresh");
    var limit = rss.data("limit");
    

    $(function() {
      $(rss).rssfeedlocal({
        src: src,
        content: rss.data("content"),
        title: eval(rss.data("title")),
        mode: rss.data("mode"),
        timeformat: rss.data("timeformat"),
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
                html: '{date}: {text}',
                wrapper: 'li',
                dataType: 'xml',
                title: true
            }
            var options = jQuery.extend(defaults, options);

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
                          
/* FIXME: Header gets added on each refresh, unsupported in rssfeedlocal for now..
                          if (options.header)
                             jQuery(c).parent().parent().prepend( '<p><div class="rssHeader">' +
                                '<a href="' + jQuery(feed).find('link:first').text() 
                                +'" title="'+ jQuery(feed).find('description:first').text()
                                +'" target="' + o.linktarget + '">'
                                + jQuery(feed).find('title:first').text()
                                +'</a>' + '</div></p>');
*/                        
                          // get height of one entry, calc max num of display items in widget
                          var dummyDiv = $('<' + o.wrapper + ' class="rssRow odd" id="dummydiv">').append('<li />').appendTo($(c));
                          var itemheight = dummyDiv.height();
                          dummyDiv.remove();
                          var widget=$(c).parent().parent(); // get the parent widget
                          var displayheight = widget.height()-$('.label', widget).height(); // max. height of actor is widget-label(if exists)
                          var displayrows = Math.floor(displayheight/itemheight);
                                   
                          var items = $(feed).find('item');
                          var itemnum = items.length;
                          var itemoffset = 0; // correct if mode='first' or itemnum<=displayrows
                          
                          if (itemnum>displayrows) { // no need to check mode if items are less than rows
                            if (o.mode=='last') {
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
                          if (last>itemnum) {
                            last=itemnum;
                          }
                          for (var i=itemoffset; i<last; i++) {  
                            var idx = i;
                            idx = (i>=itemnum) ? (idx = idx - itemnum) : idx;
                            
                            var item = items[idx];
                            
                            var itemHtml=o.html;
                            
                            itemHtml = itemHtml.replace(/{text}/, jQuery(item).find('description').text());
                            var entryDate = new Date($(item).find('pubDate').text());
                            if (entryDate) {
                              itemHtml = (o.timeformat) ? 
                                (itemHtml.replace(/{date}/, entryDate.toLocaleFormat(o.timeformat) + '&nbsp;')) : 
                                (itemHtml.replace(/{date}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;'));
                            } else {
                              itemHtml = itemHtml.replace(/{date}/, '');
                            }

                            jQuery(c).append(jQuery('<' + o.wrapper + ' class="rsslogRow ' + row + '">').append(itemHtml));

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

