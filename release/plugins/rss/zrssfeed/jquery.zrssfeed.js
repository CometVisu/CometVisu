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

(function(e){function n(e){var t=["bytes","kb","MB","GB","TB","PB"],n=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,Math.floor(n))).toFixed(2)+" "+t[n]}function r(e){var t=navigator.appName,n;return t=="Microsoft Internet Explorer"?(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e)):n=(new DOMParser).parseFromString(e,"text/xml"),n}e.fn.rssfeed=function(n,r,i){var s={limit:10,header:!0,titletag:"h4",date:!0,content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,ssl:!1,linktarget:"_self"},r=e.extend(s,r);return this.each(function(s,o){var u=e(o),a="";r.ssl&&(a="s"),u.hasClass("rssFeed")||u.addClass("rssFeed");if(n==null)return!1;var f="http"+a+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(n);r.limit!=null&&(f+="&num="+r.limit),r.key!=null&&(f+="&key="+r.key),f+="&output=json_xml",e.getJSON(f,function(n){if(n.responseStatus==200)t(o,n.responseData,r),e.isFunction(i)&&i.call(this,u);else{if(r.showerror)if(r.errormsg!="")var s=r.errormsg;else var s=n.responseDetails;e(o).html('<div class="rssError"><p>'+s+"</p></div>")}})})};var t=function(t,i,s){var o=i.feed;if(!o)return!1;var u="",a="odd";if(s.media)var f=r(i.xmlString),l=f.getElementsByTagName("item");s.header&&(u+='<div class="rssHeader"><a href="'+o.link+'" title="'+o.description+'">'+o.title+"</a>"+"</div>"),u+='<div class="rssBody"><ul>';for(var c=0;c<o.entries.length;c++){var h=o.entries[c],p;if(h.publishedDate)var d=new Date(h.publishedDate),p=d.toLocaleDateString()+" "+d.toLocaleTimeString()+"&nbsp;";u+='<li class="rssRow '+a+'">'+"<"+s.titletag+'><a href="'+h.link+'" title="View this feed at '+o.title+'">'+h.title+"</a></"+s.titletag+">",s.date&&p&&(u+="<div>"+p+"</div>");if(s.content){if(s.snippet&&h.contentSnippet!="")var v=h.contentSnippet;else var v=h.content;u+="<p>"+v+"</p>"}if(s.media&&l.length>0){var m=l[c].getElementsByTagName("enclosure");if(m.length>0){u+='<div class="rssMedia"><div>Media files</div><ul>';for(var g=0;g<m.length;g++){var y=m[g].getAttribute("url"),b=m[g].getAttribute("type"),w=m[g].getAttribute("length");u+='<li><a href="'+y+'" title="Download this media">'+y.split("/").pop()+"</a> ("+b+", "+n(w)+")</li>"}u+="</ul></div>"}u+="</li>"}a=="odd"?a="even":a="odd"}u+="</ul></div>",e(t).html(u),e("a",t).attr("target",s.linktarget)}})(jQuery);