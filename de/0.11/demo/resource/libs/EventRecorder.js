var EVENT_RECORDER=null;!function(){var r=1;function e(e,t,n){var o=t;"mousewheel"===e||(t.$$WRID||(t.$$WRID=r++),this.$$wrappers||(this.$$wrappers={}),this.$$wrappers[e]||(this.$$wrappers[e]={}),this.$$wrappers[e][t.$$WRID]?o=this.$$wrappers[e][t.$$WRID]:(o=function(e){EVENT_RECORDER&&EVENT_RECORDER(e),t(e)},this.$$wrappers[e][t.$$WRID]=o)),this.addNativeEventListener?this.addNativeEventListener(e,o,n):this.attachEvent?this.attachEvent("on"+e,o):void 0!==this["on"+e]&&(this["on"+e]=o)}function t(e,t,n){var o=t;if(t.$$WRID&&this.$$wrappers[e]&&this.$$wrappers[e][t.$$WRID]&&(o=this.$$wrappers[e][t.$$WRID],delete this.$$wrappers[e][t.$$WRID]),this.removeNativeListener)this.removeNativeEventListener(e,o,n);else if(this.detachEvent)try{this.detachEvent("on"+e,t)}catch(e){if(-2146828218!==e.number)throw e}else void 0!==this["on"+e]&&(this["on"+e]=null)}/.+reporting=(true|1).*/.test(window.location.href)&&(Element.prototype.addEventListener&&(Element.prototype.addNativeEventListener=Element.prototype.addEventListener),Element.prototype.addEventListener=e,HTMLDocument.prototype.addEventListener&&(HTMLDocument.prototype.addNativeEventListener=HTMLDocument.prototype.addEventListener),HTMLDocument.prototype.addEventListener=e,Window?(Window.prototype.addEventListener&&(Window.prototype.addNativeEventListener=Window.prototype.addEventListener),Window.prototype.addEventListener=e):DOMWindow&&(DOMWindow.prototype.addEventListener&&(DOMWindow.prototype.addNativeEventListener=DOMWindow.prototype.addEventListener),DOMWindow.prototype.addEventListener=e),Element.prototype.removeEventListener&&(Element.prototype.removeNativeEventListener=Element.prototype.removeEventListener),Element.prototype.removeEventListener=t,HTMLDocument.prototype.removeEventListener&&(HTMLDocument.prototype.removeNativeEventListener=HTMLDocument.prototype.removeEventListener),HTMLDocument.prototype.removeEventListener=t,Window?(Window.prototype.removeEventListener&&(Window.prototype.removeNativeEventListener=Window.prototype.removeEventListener),Window.prototype.removeEventListener=t):DOMWindow&&(DOMWindow.prototype.removeEventListener&&(DOMWindow.prototype.removeNativeEventListener=DOMWindow.prototype.removeEventListener),DOMWindow.prototype.removeEventListener=t))}();