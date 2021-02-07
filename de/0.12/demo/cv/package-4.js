!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"cv.ui.structure.AbstractWidget":{require:!0},"cv.ui.common.Update":{require:!0},"cv.ui.common.Operate":{require:!0},"cv.parser.WidgetParser":{defer:"runtime"},"cv.TemplateEngine":{},"cv.data.Model":{},"cv.Transform":{},"qx.event.Timer":{},"cv.util.ScriptLoader":{defer:"runtime"},"cv.ui.structure.WidgetFactory":{defer:"runtime"}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("cv.plugins.ColorChooser",{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Update,cv.ui.common.Operate],statics:{parse:function(e,t,s,r){var i=cv.parser.WidgetParser.parseElement(this,e,t,s,r);cv.parser.WidgetParser.parseFormat(e,t);cv.parser.WidgetParser.parseAddress(e,t,this.makeAddressListFn);return i},makeAddressListFn:function(e,t,s,r){return[!0,r]}},properties:{valueR:{check:"Number",init:0},valueG:{check:"Number",init:0},valueB:{check:"Number",init:0},busR:{check:"Number",init:0},busG:{check:"Number",init:0},busB:{check:"Number",init:0},rateLimiter:{check:"Boolean",init:!1}},members:{__P_9_0:!1,_onDomReady:function(){cv.plugins.ColorChooser.prototype._onDomReady.base.call(this);var e=$("#"+this.getPath()+" .actor");e.farbtastic(function(t){this.setValueR(100*parseInt(t.substring(1,3),16)/255);this.setValueG(100*parseInt(t.substring(3,5),16)/255);this.setValueB(100*parseInt(t.substring(5,7),16)/255);!1===this.getRateLimiter()&&!1===this.__P_9_0&&this._rateLimitedSend(e)}.bind(this))},_rateLimitedSend:function(){var e,t=!1,s=this.getAddress(),r=this.getValueR(),i=this.getValueG(),a=this.getValueB(),c=this.getBusR(),n=this.getBusG(),o=this.getBusB(),u=cv.TemplateEngine.getInstance();for(var d in s)if(cv.data.Model.isWriteAddress(s[d]))switch(s[d][2]){case"r":if((e=cv.Transform.encode(s[d][0],r))!==cv.Transform.encode(s[d][0],c)){u.visu.write(d,e);t=!0}break;case"g":if((e=cv.Transform.encode(s[d][0],i))!==cv.Transform.encode(s[d][0],n)){u.visu.write(d,e);t=!0}break;case"b":if((e=cv.Transform.encode(s[d][0],a))!==cv.Transform.encode(s[d][0],o)){u.visu.write(d,e);t=!0}break;case"rgb":var h=[255*r/100,255*i/100,255*a/100],g=[255*c/100,255*n/100,255*o/100];e=cv.Transform.encode(s[d][0],h);var v=cv.Transform.encode(s[d][0],g);if(e[0]!==v[0]||e[1]!==v[1]||e[2]!==v[2]){u.visu.write(d,e.join(","));t=!0}}if(t){this.setBusR(this.getValueR());this.setBusG(this.getValueG());this.setBusB(this.getValueB());this.setRateLimiter(!0);this.__P_9_1=qx.event.Timer.once(this._rateLimitedSend,this,250)}else this.setRateLimiter(!1)},_getInnerDomString:function(){return'<div class="actor"></div>'},_update:function(e,t){if(void 0!==e){var s=cv.Transform.decode(this.getAddress()[e][0],t),r=jQuery.farbtastic(this.getActor()),i=r.color||"#000000";switch(this.getAddress()[e][2]){case"r":this.setBusR(s);i=i.substring(0,1)+a(255*s/100)+i.substring(3);break;case"g":this.setBusG(s);i=i.substring(0,3)+a(255*s/100)+i.substring(5);break;case"b":this.setBusB(s);i=i.substring(0,5)+a(255*s/100)+i.substring(7);break;case"rgb":this.setBusR(s[0]);this.setBusG(s[1]);this.setBusB(s[2]);i=i.substring(0,1)+a(255*s[0]/100)+a(255*s[1]/100)+a(255*s[2]/100)+i.substring(7)}this.__P_9_0=!0;if(this.__P_9_1){this.__P_9_1.stop();this.__P_9_1=null;this.setRateLimiter(!1)}r.setColor(i);this.__P_9_0=!1}function a(e){var t=parseInt(e).toString(16);return 1===t.length?"0"+t:t}}},defer:function(e){var t=cv.util.ScriptLoader.getInstance();t.addStyles("plugins/colorchooser/farbtastic/farbtastic.css");t.addScripts("plugins/colorchooser/farbtastic/farbtastic.js");cv.parser.WidgetParser.addHandler("colorchooser",e);cv.ui.structure.WidgetFactory.registerClass("colorchooser",e)},destruct:function(){this.__P_9_2=null}});cv.plugins.ColorChooser.$$dbClassInfo=e}();qx.$$packageData[4]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-4.js.map