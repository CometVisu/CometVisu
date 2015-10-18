/* Flot plugin for automatically redrawing plots as the placeholder resizes.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

It works by listening for changes on the placeholder div (through the jQuery
resize event plugin) - if the size changes, it will redraw the plot.

There are no options. If you need to disable the plugin for some plots, you
can just fix the size of their placeholders.

*/

/* Inline dependency:
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function(e,t,n){function r(){for(var n=i.length-1;n>=0;n--){var u=e(i[n]);if(u[0]==t||u.is(":visible")){var p=u.width(),d=u.height(),v=u.data(f);!v||p===v.w&&d===v.h?s[l]=s[c]:(s[l]=s[h],u.trigger(a,[v.w=p,v.h=d]))}else v=u.data(f),v.w=0,v.h=0}o!==null&&(o=t.requestAnimationFrame(r))}var i=[],s=e.resize=e.extend(e.resize,{}),o,u="setTimeout",a="resize",f=a+"-special-event",l="delay",c="pendingDelay",h="activeDelay",p="throttleWindow";s[c]=250,s[h]=20,s[l]=s[c],s[p]=!0,e.event.special[a]={setup:function(){if(!s[p]&&this[u])return!1;var t=e(this);i.push(this),t.data(f,{w:t.width(),h:t.height()}),i.length===1&&(o=n,r())},teardown:function(){if(!s[p]&&this[u])return!1;var t=e(this);for(var n=i.length-1;n>=0;n--)if(i[n]==this){i.splice(n,1);break}t.removeData(f),i.length||(cancelAnimationFrame(o),o=null)},add:function(t){function r(t,r,s){var o=e(this),u=o.data(f);u.w=r!==n?r:o.width(),u.h=s!==n?s:o.height(),i.apply(this,arguments)}if(!s[p]&&this[u])return!1;var i;if(e.isFunction(t))return i=t,r;i=t.handler,t.handler=r}},t.requestAnimationFrame||(t.requestAnimationFrame=function(){return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e,n){return t.setTimeout(e,s[l])}}()),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(){return t.webkitCancelRequestAnimationFrame||t.mozCancelRequestAnimationFrame||t.oCancelRequestAnimationFrame||t.msCancelRequestAnimationFrame||clearTimeout}())})(jQuery,this),function(e){function n(e){function t(){var t=e.getPlaceholder();if(t.width()==0||t.height()==0)return;e.resize(),e.setupGrid(),e.draw()}function n(e,n){e.getPlaceholder().resize(t)}function r(e,n){e.getPlaceholder().unbind("resize",t)}e.hooks.bindEvents.push(n),e.hooks.shutdown.push(r)}var t={};e.plot.plugins.push({init:n,options:t,name:"resize",version:"1.0"})}(jQuery);