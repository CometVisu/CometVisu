qx.$$packageData['4']={"locales":{},"resources":{"plugins/upnpcontroller/mute.php":"cv","plugins/upnpcontroller/next.php":"cv","plugins/upnpcontroller/pause.php":"cv","plugins/upnpcontroller/play.php":"cv","plugins/upnpcontroller/playlists.php":"cv","plugins/upnpcontroller/prev.php":"cv","plugins/upnpcontroller/status.php":"cv","plugins/upnpcontroller/upnpcontroller.css":"cv","plugins/upnpcontroller/upnpctrl_util.php":"cv","plugins/upnpcontroller/volume.php":"cv"},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("4", function() {
(function(){var a="</div>",b="application/json",c="_prev' class='actor switchUnpressed center'><div class='value'>prev</div></div>",d="_volume' class='actor center switchInvisible' style='text-align: center;'><div class='value'>20</div></div>",f='volume',g='_album div.value',h="_getplaylists' class='actor switchUnpressed center'><div class='value'>play lists</div></div></div>",j="traceFlag",k="volume          : ",l='_getplaylists',m="_playlistsresult'><div class='value'></div></div></div>",n='unpressed',o='plugins/upnpcontroller/upnpcontroller.css',p='play',q=':',r="<div id='",s='pause',t="'>",u="playerIp",v='Play',w='true',x='#',y="Number",z="secondsProcessed: ",A="click callvolumedown",B="tap",C="html",D="url: ",E="text",F="_time' class='upnplabelgroup'><div class='upnplabel'></div><div class='value'>-</div></div>",G="_volumedown' class='actor center switchUnpressed'><div class='value'>-</div></div>",H="_title' class='upnplabelgroup'><div class='upnplabel'>Title</div><div class='value'>-</div></div>",I="_progress'  max='100' value='0'></progress></div>",J='value',K="_muteButton' class='actor switchUnpressed center'><div class='value'>-</div></div></div>",L="title           : ",M="playerPort  : ",N='next',O="currentValue: ",P='_muteButton',Q="calculateSongProcessed",R="success",S="plugins/upnpcontroller/",T="click callgetplaylists",U=' of ',V="&port=",W="<div>",X="_playButton",Y="plugins/upnpcontroller/selectplaylist.php?player_ip_addr=",ct='_volume div.value',cu="_muteButton",cw="upnpcontroller",cp='_playlistsresult div.value',cq='_playButton div.value',cr="click prev",cs='prev',cB="click play",cC="Boolean",cD="</a></br>",cE="<div class=\"actor\"><div class=\"upnpcontroller\" id=\"",cx="debug     : ",cy="click mute",cz="GET",cA='switchUnpressed',cI="name: ",dk='status',dF="upnpcontroller_",cJ='_progress',cF="secondsTotal    : ",cG="playerPort: ",dB="reltime         : ",cH="click callvolumeup",cK='switchPressed',cL="<div style='float: left;'><div id='",cM="<div style='float: left;'><progress id='",cR='_artist div.value',cS='cv.plugins.UpnpController',cT="_volumeup' class='actor center switchUnpressed'><div class='value'>+</div></div></div>",cN="durationResponse: ",cO="&listurl=",cP="\">",cQ='pressed',cX='_time div.value',cY="_album' class='upnplabelgroup'><div class='upnplabel'>Album</div><div class='value'>-</div></div>",da="playerPort",db='playlists',cU="totalMatches: ",cV="_volumedown",dC="_artist' class='upnplabelgroup'><div class='upnplabel'>Artist</div><div class='value'>-</div></div>",cW="true",df='',dg="_next' class='actor switchUnpressed center'><div class='value'>next</div></div></div>",dE="current playValue: ",dh="_next",dc="interval",dd="playerIp  : ",dD="click next",de="value",di="data: ",dj='_title div.value',dw="String",dv='_muteButton div.value',du="_getplaylists",dA="",dz="song_process_rel: ",dy="_prev",dx="current muteValue: ",dp=".php",dn='mute',dm='div.value',dl="_volumeup",dt="_playButton' class='actor switchUnpressed center'><div class='value'>-</div></div>",ds='_playButton',dr="<a href='",dq="currentVolume: ";qx.Class.define(cS,{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Refresh],statics:{parse:function(dG,dK,dI,dH){var dJ=cv.parser.WidgetParser.parseElement(this,dG,dK,dI,dH,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseRefresh(dG,dK);return dJ;},getAttributeToPropertyMappings:function(){return {'debug':{target:j,transform:function(dL){return dL===cW;}},'label':{},'player_ip_addr':{target:u},'player_port':{target:da,transform:function(dM){return dM?parseInt(dM):1440;}}};},uniqid:function(){var dN=new Date();return dN.getTime();}},properties:{traceFlag:{check:cC,init:false},playerIp:{check:dw,nullable:true},playerPort:{check:y,init:1440}},members:{upnpcontroller_uid:null,upnpcontroller_song_process_rel:null,_getInnerDomString:function(){var dQ=dF+this.self(arguments).uniqid();this.upnpcontroller_uid=dQ;var dO=cE+dQ+cP;var dP=W;dP+=r+dQ+H;dP+=r+dQ+dC;dP+=r+dQ+cY;dP+=r+dQ+F;dP+=cM+dQ+I;dP+=cL+dQ+G+r+dQ+d+r+dQ+cT;dP+=cL+dQ+dt+r+dQ+K;dP+=cL+dQ+c+r+dQ+dg;dP+=cL+dQ+h;dP+=cL+dQ+m;dP+=a;return dO+dP;},_onDomReady:function(){cv.ui.structure.AbstractWidget.prototype._onDomReady.call(this);this.refreshUpnpcontroller();},initListeners:function(){var dR=qx.event.Registration;dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+cu)[0],B,this.toggleMute,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+X)[0],B,this.togglePlay,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+dh)[0],B,this.callNext,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+dy)[0],B,this.callPrev,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+cV)[0],B,this.callvolumedown,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+dl)[0],B,this.callvolumeup,this);dR.addListener(qx.bom.Selector.query(x+this.upnpcontroller_uid+du)[0],B,this.callgetplaylists,this);},_setupRefreshAction:function(){if(this.getRefresh()&&this.getRefresh()>0){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener(dc,function(){this.refreshUpnpcontroller();},this);this._timer.start();};},refreshUpnpcontroller:function(){var dT=this.getPlayerIp();var dS=this.getPlayerPort();this.traceLog(cx+this.isTraceFlag());this.traceLog(dd+dT);this.traceLog(cG+dS);this.__tK(dk,{},function(dU){var dV=dU.getTarget().getResponse();try{if(qx.lang.Type.isString(dV)){dV=qx.lang.Json.parse(dV);};this.traceLog(k+dV.volume);this.traceLog(dB+dV.reltimeResponse);this.traceLog(cN+dV.durationResponse);this.traceLog(L+dV.title);this.__tJ(dV.volume,dV.muteState,dV.transportState,dV.title,dV.reltimeResponse,dV.durationResponse,dV.artist,dV.album);}catch(e){this.error(e);};});},__tJ:function(ec,ea,dX,dY,eb,ed,ee,dW){var ef=this.upnpcontroller_uid;if(ea===0){qx.bom.element.Class.replace(qx.bom.Selector.query(x+ef+P)[0],cK,cA);}else {qx.bom.element.Class.replace(qx.bom.Selector.query(x+ef+P)[0],cA,cK);};if(dX===v){qx.bom.element.Class.replace(qx.bom.Selector.query(x+ef+ds)[0],cK,cA);}else {qx.bom.element.Class.replace(qx.bom.Selector.query(x+ef+ds)[0],cA,cK);};qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+dv)[0],E,ea);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+cq)[0],E,dX);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+ct)[0],E,ec);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+dj)[0],E,dY);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+cR)[0],E,ee);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+g)[0],E,dW);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+cX)[0],E,eb+U+ed);this.upnpcontroller_song_process_rel=this.calculateSongProcessed(eb,ed);this.traceLog(dz+this.upnpcontroller_song_process_rel);qx.bom.element.Attribute.set(qx.bom.Selector.query(x+ef+cJ)[0],de,this.upnpcontroller_song_process_rel);},__tK:function(ei,ej,eg){var eh=new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri(S+ei+dp));if(!ej){ej={};};ej=qx.lang.Object.mergeWith(ej,{player_ip_addr:this.getPlayerIp(),port:this.getPlayerPort()});eh.set({requestData:ej,accept:b,method:cz});eh.addListener(R,eg,this);eh.send();},calculateSongProcessed:function(ep,en){if(ep===undefined||en===undefined){return;};this.traceLog(Q);var em=en.split(q);var eo=Number(em[2])+Number(em[1])*60+Number(em[0])*60*60;var el=ep.split(q);var ek=Number(el[2])+Number(el[1])*60+Number(el[0])*60*60;this.traceLog(cF+eo);this.traceLog(z+ek);return Math.floor(ek*100/eo);},callgetplaylists:function(){this.traceLog(T);var er=qx.bom.Selector.query(x+this.upnpcontroller_uid+l)[0];var et=qx.bom.element.Attribute.get(er,J);var es=this.getPlayerIp();var eq=this.getPlayerPort();this.traceLog(O+et);this.traceLog(M+eq);this.__tK(db,{},function(ew){var eu=ew.getTarget().getResponse();try{if(qx.lang.Type.isString(eu)){eu=qx.lang.Json.parse(eu);};}catch(e){this.error(e);return;};var ex=df;this.traceLog(cU+eu.totalMatches);for(var i=0;i<eu.playLists.length;i++ ){ex+=dr+Y+es+cO+eu.playLists[i].urlenc+V+eq+t+eu.playLists[i].name+cD;if(this.isTraceFlag()===w){this.debug(cI+eu.playLists[i].name);this.debug(D+eu.playLists[i].url);};};if(et!==cQ){qx.bom.element.Attribute.set(qx.bom.Selector.query(x+this.upnpcontroller_uid+cp)[0],C,ex);qx.bom.element.Attribute.set(ex,J,cQ);qx.bom.element.Class.replace(ex,cA,cK);}else {qx.bom.element.Attribute.set(qx.bom.Selector.query(x+this.upnpcontroller_uid+cp)[0],E,dA);qx.bom.element.Attribute.set(ex,J,n);qx.bom.element.Class.replace(ex,cA,cK);};});},callvolumedown:function(){this.traceLog(A);var ey=qx.bom.element.Attribute.get(qx.bom.Selector.query(x+this.upnpcontroller_uid+ct)[0],E);this.traceLog(dq+ey);var ez=Number(ey)-5;this.__tK(f,{volume:ez},function(eA){this.traceLog(di+eA);});},callvolumeup:function(){this.traceLog(cH);var eB=qx.bom.element.Attribute.get(qx.bom.Selector.query(x+this.upnpcontroller_uid+ct)[0],E);this.traceLog(dq+eB);var eC=Number(eB)+5;this.__tK(f,{volume:eC},function(eD){this.traceLog(di+eD);});},callNext:function(){this.traceLog(dD);this.__tK(N,{},function(eE){this.traceLog(di+eE);});},callPrev:function(){this.traceLog(cr);this.__tK(cs,{},function(eF){this.traceLog(di+eF);});},toggleMute:function(){this.traceLog(cy);var eH=qx.bom.Selector.query(x+this.upnpcontroller_uid+P)[0];var eG=qx.bom.element.Attribute.get(qx.bom.Selector.query(dm,eH)[0],E);this.traceLog(dx+eG);if(eG===0){eG=1;qx.bom.element.Class.replace(eH,cA,cK);}else {eG=0;qx.bom.element.Class.replace(eH,cK,cA);};this.__tK(dn,{mute:eG},function(eI){this.traceLog(di+eI);});this.refreshUpnpcontroller();},togglePlay:function(){this.traceLog(cB);var eJ=qx.bom.element.Attribute.get(qx.bom.Selector.query(x+this.upnpcontroller_uid+cq)[0],E);var eK;this.traceLog(dE+eJ);var eL=qx.bom.Selector.query(x+this.upnpcontroller_uid+ds)[0];if(eJ===v){eK=s;qx.bom.element.Class.replace(eL,cA,cK);}else {eK=p;qx.bom.element.Class.replace(eL,cK,cA);};this.__tK(eK,{},function(eM){this.traceLog(di+eM.getTarget().getResponse());});this.refreshUpnpcontroller();},traceLog:function(eN){if(this.isTraceFlag()){this.debug(eN);};}},defer:function(eO){var eP=cv.util.ScriptLoader.getInstance();eP.addStyles(o);cv.parser.WidgetParser.addHandler(cw,cv.plugins.UpnpController);cv.ui.structure.WidgetFactory.registerClass(cw,eO);}});})();
});