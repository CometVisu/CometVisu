/**
 * Plugin: jquery.zRSSFeed
 * 
 * Version: 1.1.5
 * (c) Copyright 2010-2011, Zazar Ltd
 * 
 * Description: jQuery plugin for display of RSS feeds via Google Feed API
 *              (Based on original plugin jGFeed by jQuery HowTo. Filesize function by Cary Dunn.)
 * 
 * History:
 * 1.1.5 - Target option now applies to all feed links
 * 1.1.4 - Added option to hide media and now compressed with Google Closure
 * 1.1.3 - Check for valid published date
 * 1.1.2 - Added user callback function due to issue with ajaxStop after jQuery 1.4.2
 * 1.1.1 - Correction to null xml entries and support for media with jQuery < 1.5
 * 1.1.0 - Added support for media in enclosure tags
 * 1.0.3 - Added feed link target
 * 1.0.2 - Fixed issue with GET parameters (Seb Dangerfield) and SSL option
 * 1.0.1 - Corrected issue with multiple instances
 *
 **/

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

(function(e){function n(e){var t=["bytes","kb","MB","GB","TB","PB"],n=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,Math.floor(n))).toFixed(2)+" "+t[n]}function r(e){var t=navigator.appName,n;return t=="Microsoft Internet Explorer"?(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e)):n=(new DOMParser).parseFromString(e,"text/xml"),n}e.fn.rssfeed=function(n,r,i){var s={limit:10,header:!0,titletag:"h4",date:!0,content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,ssl:!1,linktarget:"_self"},r=e.extend(s,r);return this.each(function(s,o){var u=e(o),a="";r.ssl&&(a="s"),u.hasClass("rssFeed")||u.addClass("rssFeed");if(n==null)return!1;var f="http"+a+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(n);r.limit!=null&&(f+="&num="+r.limit),r.key!=null&&(f+="&key="+r.key),f+="&output=json_xml",e.getJSON(f,function(n){if(n.responseStatus==200)t(o,n.responseData,r),e.isFunction(i)&&i.call(this,u);else{if(r.showerror)if(r.errormsg!="")var s=r.errormsg;else var s=n.responseDetails;e(o).html('<div class="rssError"><p>'+s+"</p></div>")}})})};var t=function(t,i,s){var o=i.feed;if(!o)return!1;var u="",a="odd";if(s.media)var f=r(i.xmlString),l=f.getElementsByTagName("item");s.header&&(u+='<div class="rssHeader"><a href="'+o.link+'" title="'+o.description+'">'+o.title+"</a>"+"</div>"),u+='<div class="rssBody"><ul>';for(var c=0;c<o.entries.length;c++){var h=o.entries[c],p;if(h.publishedDate)var d=new Date(h.publishedDate),p=d.toLocaleDateString()+" "+d.toLocaleTimeString()+"&nbsp;";u+='<li class="rssRow '+a+'">'+"<"+s.titletag+'><a href="'+h.link+'" title="View this feed at '+o.title+'">'+h.title+"</a></"+s.titletag+">",s.date&&p&&(u+="<div>"+p+"</div>");if(s.content){if(s.snippet&&h.contentSnippet!="")var v=h.contentSnippet;else var v=h.content;u+="<p>"+v+"</p>"}if(s.media&&l.length>0){var m=l[c].getElementsByTagName("enclosure");if(m.length>0){u+='<div class="rssMedia"><div>Media files</div><ul>';for(var g=0;g<m.length;g++){var y=m[g].getAttribute("url"),b=m[g].getAttribute("type"),w=m[g].getAttribute("length");u+='<li><a href="'+y+'" title="Download this media">'+y.split("/").pop()+"</a> ("+b+", "+n(w)+")</li>"}u+="</ul></div>"}u+="</li>"}a=="odd"?a="even":a="odd"}u+="</ul></div>",e(t).html(u),e("a",t).attr("target",s.linktarget)}})(jQuery),define("plugins/rss/zrssfeed/jquery.zrssfeed",function(){}),require.config({shim:{"plugins/rss/zrssfeed/jquery.zrssfeed":["jquery"]}}),define("plugins/rss/structure_plugin",["structure_custom","plugins/rss/zrssfeed/jquery.zrssfeed"],function(VisuDesign_Custom){function refreshRSS(rss,data){var rss=$(rss),src=rss.data("src"),label=rss.data("label"),refresh=rss.data("refresh"),limit=rss.data("limit");return jQuery(function(){$(rss).rssfeed(src,{limit:rss.data("limit"),header:eval(rss.data("header")),date:eval(rss.data("date")),content:rss.data("content"),snippet:eval(rss.data("snippet")),showerror:eval(rss.data("showerror")),ssl:eval(rss.data("ssl")),linktarget:rss.data("linktarget")})}),typeof refresh!="undefined"&&refresh&&window.setTimeout(function(e,t){refreshRSS(e,t)},refresh*1e3,rss,data),!1}VisuDesign_Custom.prototype.addCreator("rss",{create:function(e,t){function r(){var e=new Date;return e.getTime()}var n=$(e),i="rss_"+r(),s=$('<div class="widget clearfix rss" />');templateEngine.design.setWidgetLayout(s,n);var o='<div class="label">'+e.textContent+"</div>",u=$('<div class="actor"><div class="rss_inline" id="'+i+'"></div>'),a=$("#"+i,u);return n.attr("width")&&a.css("width",n.attr("width")),n.attr("height")&&a.css("height",n.attr("height")),s.append(o).append(u),a.data("id",i),a.data("src",n.attr("src")),a.data("label",e.textContent),a.data("refresh",n.attr("refresh")),a.data("limit",n.attr("limit"))||10,a.data("header",n.attr("header"))||!0,a.data("date",n.attr("date"))||!0,a.data("content",n.attr("content"))||!0,a.data("snippet",n.attr("snippet"))||!0,a.data("showerror",n.attr("showerror"))||!0,a.data("ssl",n.attr("ssl"))||!1,a.data("linktarget",n.attr("linktarget"))||"_new",a.data("link",n.attr("link"))||!0,a.data("title",n.attr("title"))||!0,refreshRSS(a,{}),s}})});