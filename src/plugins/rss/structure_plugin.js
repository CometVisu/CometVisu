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

$("body").append("<script type=\"text/javascript\" src=\"plugins/rss/zrssfeed/jquery.zrssfeed.js\"></script>");

VisuDesign_Custom.prototype.addCreator("rss", {
    create: function( page, path ) {
        var $p = $(page);

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }

        var id = "rss_" + uniqid();

        var ret_val = $('<div class="widget clearfix rss" />');
        ret_val.setWidgetLayout($p);
        var label = '<div class="label">' + page.textContent + '</div>';
        var actor = $("<div class=\"actor\"><div class=\"rss_inline\" id=\"" + id + "\"></div>");
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
        
        refreshRSS(rss, {});

        return ret_val;
    }
});

function refreshRSS(rss, data) {
    var rss = $(rss);

    var src = rss.data("src");
    var label = rss.data("label");
    var refresh = rss.data("refresh");
    var limit = rss.data("limit");
    //FIXME: eval really needed?? to convert string true/false to bool?
    
        jQuery(function() {
          $(rss).rssfeed(src, {
            limit: rss.data("limit"),
            header: eval(rss.data("header")),
            date: eval(rss.data("date")),
            content: rss.data("content"),
            snippet: eval(rss.data("snippet")),
            showerror: eval(rss.data("showerror")),
            ssl: eval(rss.data("ssl")),
            linktarget: rss.data("linktarget"),
          });
        });
        if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function(rss, data) {
        refreshRSS(rss, data)
      }, refresh * 1000, rss, data);
    }
    //rss.data("itemoffset") = itemoffset;
    return false;
}
