/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 *  
 *  https://github.com/furf/jquery-ui-touch-punch
 *  
 */

(function(e){function i(e,t){if(e.originalEvent.touches.length>1)return;e.preventDefault();var n=e.originalEvent.changedTouches[0],r=document.createEvent("MouseEvents");r.initMouseEvent(t,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(r)}e.support.touch="ontouchend"in document;if(!e.support.touch){console.log("Kein Touch Support");return}console.log("MIT Touch Support");var t=e.ui.mouse.prototype,n=t._mouseInit,r;t._touchStart=function(e){var t=this;if(r||!t._mouseCapture(e.originalEvent.changedTouches[0]))return;r=!0,t._touchMoved=!1,i(e,"mouseover"),i(e,"mousemove"),i(e,"mousedown")},t._touchMove=function(e){if(!r)return;this._touchMoved=!0,i(e,"mousemove")},t._touchEnd=function(e){if(!r)return;i(e,"mouseup"),i(e,"mouseout"),this._touchMoved||i(e,"click"),r=!1},t._mouseInit=function(){var t=this;t.element.bind("touchstart",e.proxy(t,"_touchStart")).bind("touchmove",e.proxy(t,"_touchMove")).bind("touchend",e.proxy(t,"_touchEnd")),n.call(t)}})(jQuery);