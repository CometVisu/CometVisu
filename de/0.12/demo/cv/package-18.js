!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"cv.ui.structure.AbstractWidget":{require:!0},"cv.ui.common.Refresh":{require:!0},"cv.parser.WidgetParser":{defer:"runtime"},"qx.event.Registration":{},"qx.event.Timer":{},"qx.io.request.Xhr":{},"qx.util.ResourceManager":{},"cv.util.ScriptLoader":{defer:"runtime"},"cv.ui.structure.WidgetFactory":{defer:"runtime"}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("cv.plugins.UpnpController",{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Refresh],statics:{parse:function(e,t,r,s){var i=cv.parser.WidgetParser.parseElement(this,e,t,r,s,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseRefresh(e,t);return i},getAttributeToPropertyMappings:function(){return{debug:{target:"traceFlag",transform:function(e){return"true"===e}},label:{},player_ip_addr:{target:"playerIp"},player_port:{target:"playerPort",transform:function(e){return e?parseInt(e):1440}}}},uniqid:function(){return(new Date).getTime()}},properties:{traceFlag:{check:"Boolean",init:!1},playerIp:{check:"String",nullable:!0},playerPort:{check:"Number",init:1440}},members:{upnpcontroller_uid:null,upnpcontroller_song_process_rel:null,_getInnerDomString:function(){var e="upnpcontroller_"+cv.plugins.UpnpController.uniqid();this.upnpcontroller_uid=e;var t="<div>";t+="<div id='"+e+"_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>";t+="<div id='"+e+"_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>";t+="<div id='"+e+"_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>";t+="<div id='"+e+"_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>";t+="<div style='float: left;'><progress id='"+e+"_progress'  max='100' value='0'></progress></div>";t+="<div style='float: left;'><div id='"+e+"_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div><div id='"+e+"_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div><div id='"+e+"_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>";t+="<div style='float: left;'><div id='"+e+"_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div><div id='"+e+"_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div></div>";t+="<div style='float: left;'><div id='"+e+"_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div><div id='"+e+"_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>";t+="<div style='float: left;'><div id='"+e+"_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>";t+="<div style='float: left;'><div id='"+e+"_playlistsresult'><div class='value'></div></div></div>";return'<div class="actor"><div class="upnpcontroller" id="'+e+'">'+(t+="</div>")},_onDomReady:function(){cv.plugins.UpnpController.prototype._onDomReady.base.call(this);this.refreshUpnpcontroller()},initListeners:function(){var e=qx.event.Registration;e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_muteButton"),"tap",this.toggleMute,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_playButton"),"tap",this.togglePlay,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_next"),"tap",this.callNext,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_prev"),"tap",this.callPrev,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_volumedown"),"tap",this.callvolumedown,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_volumeup"),"tap",this.callvolumeup,this);e.addListener(document.querySelector("#"+this.upnpcontroller_uid+"_getplaylists"),"tap",this.callgetplaylists,this)},_setupRefreshAction:function(){if(this.getRefresh()&&this.getRefresh()>0){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener("interval",function(){this.refreshUpnpcontroller()},this);this._timer.start()}},refreshUpnpcontroller:function(){var e=this.getPlayerIp(),t=this.getPlayerPort();this.traceLog("debug     : "+this.isTraceFlag());this.traceLog("playerIp  : "+e);this.traceLog("playerPort: "+t);this.__P_18_0("status",{},function(e){var t=e.getTarget().getResponse();try{"string"==typeof t&&(t=JSON.parse(t));this.traceLog("volume          : "+t.volume);this.traceLog("reltime         : "+t.reltimeResponse);this.traceLog("durationResponse: "+t.durationResponse);this.traceLog("title           : "+t.title);this.__P_18_1(t.volume,t.muteState,t.transportState,t.title,t.reltimeResponse,t.durationResponse,t.artist,t.album)}catch(e){this.error(e)}})},__P_18_1:function(e,t,r,s,i,l,n,a){var c=this.upnpcontroller_uid;0===t?document.querySelector("#"+c+"_muteButton").classList.replace("switchPressed","switchUnpressed"):document.querySelector("#"+c+"_muteButton").classList.replace("switchUnpressed","switchPressed");"Play"===r?document.querySelector("#"+c+"_playButton").classList.replace("switchPressed","switchUnpressed"):document.querySelector("#"+c+"_playButton").classList.replace("switchUnpressed","switchPressed");document.querySelector("#"+c+"_muteButton div.value").innerText=t;document.querySelector("#"+c+"_playButton div.value").innerText=r;document.querySelector("#"+c+"_volume div.value").innerText=e;document.querySelector("#"+c+"_title div.value").innerText=s;document.querySelector("#"+c+"_artist div.value").innerText=n;document.querySelector("#"+c+"_album div.value").innerText=a;document.querySelector("#"+c+"_time div.value").innerText=i+" of "+l;this.upnpcontroller_song_process_rel=this.calculateSongProcessed(i,l);this.traceLog("song_process_rel: "+this.upnpcontroller_song_process_rel);document.querySelector("#"+c+"_progress").setAttribute("value",this.upnpcontroller_song_process_rel)},__P_18_0:function(e,t,r){var s=new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri("plugins/upnpcontroller/"+e+".php"));t||(t={});t=Object.assign(t,{player_ip_addr:this.getPlayerIp(),port:this.getPlayerPort()});s.set({requestData:t,accept:"application/json",method:"GET"});s.addListener("success",r,this);s.send()},calculateSongProcessed:function(e,t){if(void 0!==e&&void 0!==t){this.traceLog("calculateSongProcessed");var r=t.split(":"),s=Number(r[2])+60*Number(r[1])+60*Number(r[0])*60,i=e.split(":"),l=Number(i[2])+60*Number(i[1])+60*Number(i[0])*60;this.traceLog("secondsTotal    : "+s);this.traceLog("secondsProcessed: "+l);return Math.floor(100*l/s)}},callgetplaylists:function(){this.traceLog("click callgetplaylists");var e=document.querySelector("#"+this.upnpcontroller_uid+"_getplaylists").getAttribute("value"),t=this.getPlayerIp(),r=this.getPlayerPort();this.traceLog("currentValue: "+e);this.traceLog("playerPort  : "+r);this.__P_18_0("playlists",{},function(s){var i=s.getTarget().getResponse();try{"string"==typeof i&&(i=JSON.parse(i))}catch(e){this.error(e);return}var l="";this.traceLog("totalMatches: "+i.totalMatches);for(var n=0;n<i.playLists.length;n++){l+="<a href='plugins/upnpcontroller/selectplaylist.php?player_ip_addr="+t+"&listurl="+i.playLists[n].urlenc+"&port="+r+"'>"+i.playLists[n].name+"</a></br>";if("true"===this.isTraceFlag()){this.debug("name: "+i.playLists[n].name);this.debug("url: "+i.playLists[n].url)}}if("pressed"!==e){document.querySelector("#"+this.upnpcontroller_uid+"_playlistsresult div.value").innerHTML=l;l.setAttribute("value","pressed");l.classList.replace("switchUnpressed","switchPressed")}else{document.querySelector("#"+this.upnpcontroller_uid+"_playlistsresult div.value").innerText="";l.setAttribute("value","unpressed");l.classList.replace("switchUnpressed","switchPressed")}})},callvolumedown:function(){this.traceLog("click callvolumedown");var e=document.querySelector("#"+this.upnpcontroller_uid+"_volume div.value").innerText;this.traceLog("currentVolume: "+e);var t=Number(e)-5;this.__P_18_0("volume",{volume:t},function(e){this.traceLog("data: "+e)})},callvolumeup:function(){this.traceLog("click callvolumeup");var e=document.querySelector("#"+this.upnpcontroller_uid+"_volume div.value").innerText;this.traceLog("currentVolume: "+e);var t=Number(e)+5;this.__P_18_0("volume",{volume:t},function(e){this.traceLog("data: "+e)})},callNext:function(){this.traceLog("click next");this.__P_18_0("next",{},function(e){this.traceLog("data: "+e)})},callPrev:function(){this.traceLog("click prev");this.__P_18_0("prev",{},function(e){this.traceLog("data: "+e)})},toggleMute:function(){this.traceLog("click mute");var e=document.querySelector("#"+this.upnpcontroller_uid+"_muteButton"),t=e.querySelector("div.value").innerText;this.traceLog("current muteValue: "+t);if(0===t){t=1;e.classList.replace("switchUnpressed","switchPressed")}else{t=0;e.classList.replace("switchPressed","switchUnpressed")}this.__P_18_0("mute",{mute:t},function(e){this.traceLog("data: "+e)});this.refreshUpnpcontroller()},togglePlay:function(){this.traceLog("click play");var e,t=document.querySelector("#"+this.upnpcontroller_uid+"_playButton div.value").innerText;this.traceLog("current playValue: "+t);var r=document.querySelector("#"+this.upnpcontroller_uid+"_playButton");if("Play"===t){e="pause";r.classList.replace("switchUnpressed","switchPressed")}else{e="play";r.classList.replace("switchPressed","switchUnpressed")}this.__P_18_0(e,{},function(e){this.traceLog("data: "+e.getTarget().getResponse())});this.refreshUpnpcontroller()},traceLog:function(e){this.isTraceFlag()&&this.debug(e)}},defer:function(e){cv.util.ScriptLoader.getInstance().addStyles("plugins/upnpcontroller/upnpcontroller.css");cv.parser.WidgetParser.addHandler("upnpcontroller",cv.plugins.UpnpController);cv.ui.structure.WidgetFactory.registerClass("upnpcontroller",e)}});cv.plugins.UpnpController.$$dbClassInfo=e}();qx.$$packageData[18]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-18.js.map