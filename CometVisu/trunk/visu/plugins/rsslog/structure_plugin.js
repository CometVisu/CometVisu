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

        var ret_val = $('<div class="widget clearfix" style="height:205px"/>');
        ret_val.addClass( 'rsslog' );
        var label = '<div class="label" style="clear:both;">' + page.textContent + '</div>';
        var actor = $('<div class="actor" style="clear:left;"><div class="rsslog_inline" id="' + id + '"></div></div>');
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
        rss.data("label", page.textContent);
        rss.data("refresh", $p.attr("refresh"));
        rss.data("limit", $p.attr("limit")) || 10;
        rss.data("header", $p.attr("header")) || true;
        rss.data("date", $p.attr("date")) || true;
        rss.data("content", $p.attr("content")) || true;
        rss.data("snippet", $p.attr("snippet")) || true;
        rss.data("showerror", $p.attr("showerror")) || true;
        rss.data("ssl", $p.attr("ssl")) || false;
        rss.data("linktarget", $p.attr("linktarget")) || "_new";
        rss.data("link", $p.attr("link")) || true;
        rss.data("title", $p.attr("title")) || true;
        rss.data("mode", $p.attr("mode") || "last");
        rss.data("itemoffset", 0);
        rss.data("timeformat", $p.attr("timeformat"));

        refreshRSSlog(rss, {});

        return ret_val;
    },
    attributes: {
        src:        {type: "string", required: true},
        width:      {type: "string", required: false},
        height:     {type: "string", required: false},
        refresh:    {type: "numeric", required: false},
        limit:      {type: "numeric", required: false},
        header:     {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        date:       {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        content:    {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        snippet:    {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        showerror:  {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        ssl:        {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        linktarget: {type: "list", required: false, list: {"_new": "_new", "_self": "_self"}},
        link:       {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        title:      {type: "list", required: false, list: {'true': "yes", 'false': "no"}},
        mode:       {type: "list", required: false, list: {'first': 'first', 'last': 'last', 'rollover':'rollover' }}
    },
    content: {type: "string", required: true}
});

function refreshRSSlog(rss, data) {
    var rss = $(rss);

    var src = rss.data("src");
    var label = rss.data("label");
    var refresh = rss.data("refresh");
    var limit = rss.data("limit");
    //FIXME: eval really needed?? to convert string true/false to bool?

        jQuery(function() {
          $(rss).rssfeedlocal({
            src: src,
            limit: rss.data("limit"),
            header: eval(rss.data("header")),
            date: eval(rss.data("date")),
            content: rss.data("content"),
            snippet: eval(rss.data("snippet")),
            showerror: eval(rss.data("showerror")),
            ssl: eval(rss.data("ssl")),
            linktarget: rss.data("linktarget"),
            link: eval(rss.data("link")),
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
    //rss.data("itemoffset") = itemoffset;
    return false;
}

(function($){
    jQuery.fn.extend({
        rssfeedlocal: function(options) {
  
            var defaults = {
                src: '',
                header: false,
                html: '{date}: {text}',
                wrapper: 'li',
                dataType: 'xml',
                limit: 10,
                linktarget: 'new',
                date: true,
                link: true,
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
                          
                          var row = 'odd';
                          var last = itemoffset+displayrows;
                          if (last>itemnum) {
                            last=itemnum;
                          }
                          for (var i=itemoffset; i<last; i++) {  
                            var idx = i;
                            if (i>=itemnum) {
                              idx = idx - itemnum;
                            }
                            
                            var item = items[idx];
                            
                            var itemHtml=o.html;
                            /*if (o.link) 
                                itemHtml = o.html.replace(/{title}/, '<a href="' 
                                    + jQuery(item).find('guid').text() 
                                    + '" target="' + o.linktarget + '">'
                                    + jQuery(item).find('title').text() + '</a><br />');
                            else if (o.title)
                                itemHtml = o.html.replace(/{title}/,  
                                    jQuery(item).find('title').text() + '<br />');
                            else    
                                itemHtml = o.html.replace(/{title}/, ''); */

                            itemHtml = itemHtml.replace(/{text}/, jQuery(item).find('description').text());
                            var entryDate = new Date($(item).find('pubDate').text());
                            if (o.date && entryDate) {
                              if (o.timeformat) {
                                itemHtml = itemHtml.replace(/{date}/, entryDate.toLocaleFormat(o.timeformat) + '&nbsp;');
                              } else {
                                itemHtml = itemHtml.replace(/{date}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;');
                              }
                            } else {
                              itemHtml = itemHtml.replace(/{date}/, '');
                            }

                            jQuery(c).append(jQuery('<' + o.wrapper + ' class="rssRow ' + row + '">').append(itemHtml));

                            // Alternate row classes
                            if (row == 'odd') {
                              row = 'even';
                            } else {
                              row = 'odd';
                            }
                          };
                          
                          $('li', c).wrapAll("<ul>");                      
                    }
                });
            });
            return this;
        }
    });
})(jQuery);

