(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"cv.build":"build","cv.sentry":true,"cv.testMode":"resource/demo/media/demo_testmode_data.json","cv.version":"dev","cv.xhr":"qx","engine.name":"opera","qx.application":"cv.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.debug.io":false,"qx.debug.ui.queue":false,"qx.globalErrorHandling":true,"qx.optimization.basecalls":true,"qx.optimization.comments":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true,"qx.promise":false,"qx.version":"5.1"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"com.zenesis.qx.upload":{"resourceUri":"resource","sourceUri":"script"},"cv":{"resourceUri":"resource","sourceUri":"script","sourceViewUri":"https://github.com/CometVisu/CometVisu/blob/develop/source/class/%{classFilePath}#L%{lineNumber}"},"cv.io":{"resourceUri":"resource","sourceUri":"script"},"dialog":{"resourceUri":"resource","sourceUri":"script"},"iconfont.material":{"resourceUri":"resource","sourceUri":"script"},"osparc.theme":{"resourceUri":"resource","sourceUri":"script"},"qx":{"resourceUri":"resource","sourceUri":"script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"de":null,"en":null};
qx.$$locales = {"C":null,"de":null,"en":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"C":[2097152],"boot":[2097151],"de":[2097152,4194304],"en":[2097152,8388608],"manager":[2097151,6146,6144,2050,2048],"plugin-calendarlist":[2097151,2094781,2086589,1102004,1048576],"plugin-clock":[2097151,2094781,2086589,350113,512],"plugin-colorchooser":[2097151,2094781,2086589,350113,348192,65536],"plugin-diagram":[2097151,2094781,2086589,350113,1102004,348192,32],"plugin-gauge":[2097151,2094781,2086589,350113,348192,262144],"plugin-link":[2097151,2094781,2086589,524288],"plugin-mobilemenu":[2097151,2094781,2086589,135168,131072],"plugin-openhab":[2097151,6146,2050,2],"plugin-openweathermap":[2097151,2094781,2086589,1102004,32768],"plugin-powerspectrum":[2097151,2094781,2086589,350113,1024],"plugin-rss":[2097151,2094781,2086589,1102004,16],"plugin-rsslog":[2097151,2094781,2086589,350113,1102004,348192,16384],"plugin-speech":[2097151,350113,256],"plugin-strftime":[2097151,2094781,2086589,8],"plugin-svg":[2097151,2094781,2086589,350113,1],"plugin-timeout":[2097151,2094781,8192],"plugin-tr064":[2097151,2094781,2086589,350113,1102004,128],"plugin-upnpcontroller":[2097151,2094781,2086589,1102004,4],"structure-pure":[2097151,2094781,2086589,350113,1102004,348192,6146,6144,135168,4096]},
  packages : {"1":{"uris":["__out__:cv-opera.7f8b52f2f4bd.js"]},"2":{"uris":["__out__:cv-opera.213de6afb855.js"]},"4":{"uris":["__out__:cv-opera.34a6149020ab.js"]},"8":{"uris":["__out__:cv-opera.ad6f5d477fbb.js"]},"16":{"uris":["__out__:cv-opera.05168066a28b.js"]},"32":{"uris":["__out__:cv-opera.57b3c697d1c1.js"]},"128":{"uris":["__out__:cv-opera.877c38afacf6.js"]},"256":{"uris":["__out__:cv-opera.0a4716fa3324.js"]},"512":{"uris":["__out__:cv-opera.173c04fb3b66.js"]},"1024":{"uris":["__out__:cv-opera.cba1845c01fd.js"]},"2048":{"uris":["__out__:cv-opera.d4e2a3cbae99.js"]},"2050":{"uris":["__out__:cv-opera.71c5897fca0d.js"]},"4096":{"uris":["__out__:cv-opera.49a94208e5dd.js"]},"6144":{"uris":["__out__:cv-opera.c0e0341ec8ed.js"]},"6146":{"uris":["__out__:cv-opera.2fb93964a93a.js"]},"8192":{"uris":["__out__:cv-opera.272a505c8ccd.js"]},"16384":{"uris":["__out__:cv-opera.1ff5121c401b.js"]},"32768":{"uris":["__out__:cv-opera.377946eb237a.js"]},"65536":{"uris":["__out__:cv-opera.b6e59589d8b2.js"]},"131072":{"uris":["__out__:cv-opera.8b4f59d2b42c.js"]},"135168":{"uris":["__out__:cv-opera.8644a0a7cde7.js"]},"262144":{"uris":["__out__:cv-opera.92406d441d6a.js"]},"348192":{"uris":["__out__:cv-opera.e2eaaf265f6a.js"]},"350113":{"uris":["__out__:cv-opera.0a2b0222b7d9.js"]},"524288":{"uris":["__out__:cv-opera.4a00c6bd074a.js"]},"1048576":{"uris":["__out__:cv-opera.dec481383083.js"]},"1102004":{"uris":["__out__:cv-opera.6548afd1b603.js"]},"2086589":{"uris":["__out__:cv-opera.63d1539f3127.js"]},"2094781":{"uris":["__out__:cv-opera.7327cf3069c2.js"]},"2097151":{"uris":["__out__:cv-opera.5e15f9b42466.js"]},"2097152":{"uris":["__out__:cv-opera-C.1f212aacf10c.js"]},"4194304":{"uris":["__out__:cv-opera-de.d711845d110a.js"]},"8388608":{"uris":["__out__:cv-opera-en.d760cbb9563a.js"]}},
  urisBefore : ["resource/libs/EventRecorder.js","resource/libs/sprintf.js","resource/libs/jquery.js","resource/libs/strftime.js","resource/libs/svg4everybody.js","resource/libs/favico.js","resource/libs/inobounce.min.js"],
  cssBefore : [],
  boot : "boot",
  closureParts : {"C":true,"de":true,"en":true,"manager":true,"plugin-calendarlist":true,"plugin-clock":true,"plugin-colorchooser":true,"plugin-diagram":true,"plugin-gauge":true,"plugin-link":true,"plugin-mobilemenu":true,"plugin-openhab":true,"plugin-openweathermap":true,"plugin-powerspectrum":true,"plugin-rss":true,"plugin-rsslog":true,"plugin-speech":true,"plugin-strftime":true,"plugin-svg":true,"plugin-timeout":true,"plugin-tr064":true,"plugin-upnpcontroller":true,"structure-pure":true},
  bootIsInline : true,
  addNoCacheParam : false,
  delayDefer: false,

  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;
  }
};

if (window.location.search.length > 0) {
  window.location.search.substring(1).split('&').some(function (qs) {
    var parts = qs.split('=');
    if (parts[0] === 'forceReload' && (parts[1] === 'true' || parts[1] === '1')) {
      qx.$$loader.addNoCacheParam = true;
    }
  });
}

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function ()
{
  qx.Bootstrap.executePendingDefers();
  qx.$$loader.delayDefer = false;
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true;
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['2097151']={"resources":{"config/.htaccess":"cv","config/.templates/Plugin.js":"cv","config/.templates/visu_config.xml":"cv","config/hidden.php":"cv","config/structure_custom.js":"cv","config/visu_config.xml":"cv","demo/floorplan_demo.xml":"cv","demo/media/arrow.png":[100,50,"png","cv"],"demo/media/demo_2d_backdrop_floorplan.png":[994,633,"png","cv"],"demo/media/demo_2d_backdrop_floorplan_inkscape.svg":[994,633,"svg","cv"],"demo/media/demo_2d_backdrop_floorplan_viewbox.svg":[-1,-1,"svg","cv"],"demo/media/demo_2d_backdrop_nikolaushaus.png":[337,498,"png","cv"],"demo/media/demo_2d_backdrop_nikolaushaus.svg":[523,773,"svg","cv"],"demo/media/demo_2d_backdrop_red_pot.js":"cv","demo/media/demo_2d_backdrop_red_pot.png":[750,500,"png","cv"],"demo/media/demo_2d_backdrop_red_pot.svg":[750,500,"svg","cv"],"demo/media/demo_flat_circuit.svg":[679,380,"svg","cv"],"demo/media/demo_flat_floorplan.png":[727,1000,"png","cv"],"demo/media/demo_flat_floorplan.svg":[589,811,"svg","cv"],"demo/media/demo_testmode_data.json":"cv","demo/media/rollo.svg":[48,48,"svg","cv"],"demo/media/testmode.css":"cv","demo/media/testmode.js":"cv","demo/visu_config_2d3d.xml":"cv","demo/visu_config_demo.xml":"cv","demo/visu_config_demo_flat.xml":"cv","demo/visu_config_demo_testmode.xml":"cv","demo/visu_config_demorss.xml":"cv","demo/visu_config_empty.xml":"cv","demo/visu_config_gauge.xml":"cv","demo/visu_config_metal.xml":"cv","demo/visu_config_responsive.xml":"cv","designs/alaska/basic.css":"cv","designs/alaska/colors.css":"cv","designs/alaska/custom.css":"cv","designs/alaska/design_setup.js":"cv","designs/alaska/fonts/LICENSE.txt":"cv","designs/alaska/fonts/Tuffy.ttf":"cv","designs/alaska/fonts/Tuffy_Bold.ttf":"cv","designs/alaska/mobile.css":"cv","designs/alaska_slim/basic.css":"cv","designs/alaska_slim/colors.css":"cv","designs/alaska_slim/custom.css":"cv","designs/alaska_slim/design_setup.js":"cv","designs/alaska_slim/mobile.css":"cv","designs/design_preview.html":"cv","designs/designglobals.css":"cv","designs/discreet/basic.css":"cv","designs/discreet/custom.css":"cv","designs/discreet/design_setup.js":"cv","designs/discreet/fonts/AUTHORS":"cv","designs/discreet/fonts/COPYING":"cv","designs/discreet/fonts/ChangeLog":"cv","designs/discreet/fonts/License.txt":"cv","designs/discreet/fonts/README":"cv","designs/discreet/fonts/TODO":"cv","designs/discreet/fonts/liberationsans-bold.ttf":"cv","designs/discreet/fonts/liberationsans-regular.ttf":"cv","designs/discreet/images/button_bg.png":[9,36,"png","cv"],"designs/discreet/images/dot_green.png":[117,40,"png","cv"],"designs/discreet/images/dot_red.png":[117,40,"png","cv"],"designs/discreet/images/gradient.png":[147,16,"png","cv"],"designs/discreet/images/head_bg.png":[64,58,"png","cv"],"designs/discreet/images/hr_bg.png":[14,8,"png","cv"],"designs/discreet/mobile.css":"cv","designs/discreet_sand/basic.css":"cv","designs/discreet_sand/custom.css":"cv","designs/discreet_sand/design_setup.js":"cv","designs/discreet_sand/fonts/AUTHORS":"cv","designs/discreet_sand/fonts/COPYING":"cv","designs/discreet_sand/fonts/ChangeLog":"cv","designs/discreet_sand/fonts/License.txt":"cv","designs/discreet_sand/fonts/README":"cv","designs/discreet_sand/fonts/TODO":"cv","designs/discreet_sand/fonts/liberationsans-bold.ttf":"cv","designs/discreet_sand/fonts/liberationsans-regular.ttf":"cv","designs/discreet_sand/images/button_bg.png":[9,36,"png","cv"],"designs/discreet_sand/images/dot_green.png":[117,40,"png","cv"],"designs/discreet_sand/images/dot_red.png":[117,40,"png","cv"],"designs/discreet_sand/images/gradient.png":[147,16,"png","cv"],"designs/discreet_sand/images/hr_bg.png":[14,8,"png","cv"],"designs/discreet_sand/images/nav_bg.png":[64,6,"png","cv"],"designs/discreet_sand/mobile.css":"cv","designs/discreet_slim/basic.css":"cv","designs/discreet_slim/custom.css":"cv","designs/discreet_slim/design_setup.js":"cv","designs/discreet_slim/fonts/AUTHORS":"cv","designs/discreet_slim/fonts/COPYING":"cv","designs/discreet_slim/fonts/ChangeLog":"cv","designs/discreet_slim/fonts/License.txt":"cv","designs/discreet_slim/fonts/README":"cv","designs/discreet_slim/fonts/TODO":"cv","designs/discreet_slim/fonts/liberationsans-bold.ttf":"cv","designs/discreet_slim/fonts/liberationsans-regular.ttf":"cv","designs/discreet_slim/images/button_bg.png":[9,36,"png","cv"],"designs/discreet_slim/images/dot_green.png":[117,40,"png","cv"],"designs/discreet_slim/images/dot_red.png":[117,40,"png","cv"],"designs/discreet_slim/images/gradient.png":[147,16,"png","cv"],"designs/discreet_slim/images/head_bg.png":[64,58,"png","cv"],"designs/discreet_slim/images/hr_bg.png":[14,8,"png","cv"],"designs/discreet_slim/mobile.css":"cv","designs/metal/basic.css":"cv","designs/metal/custom.css":"cv","designs/metal/design_setup.js":"cv","designs/metal/fonts/Dosis-Medium.ttf":"cv","designs/metal/fonts/FONTLOG.txt":"cv","designs/metal/fonts/OFL.txt":"cv","designs/metal/images/active_page.png":[40,40,"png","cv"],"designs/metal/images/active_page24.png":[24,24,"png","cv"],"designs/metal/images/audio_play.png":[128,128,"png","cv"],"designs/metal/images/button_bg.png":[9,36,"png","cv"],"designs/metal/images/dot_green.png":[117,40,"png","cv"],"designs/metal/images/dot_grey.png":[117,40,"png","cv"],"designs/metal/images/dot_orange.png":[117,40,"png","cv"],"designs/metal/images/dot_red.png":[117,40,"png","cv"],"designs/metal/images/dot_white.png":[117,40,"png","cv"],"designs/metal/images/gradient.png":[147,16,"png","cv"],"designs/metal/images/head_bg.png":[64,58,"png","cv"],"designs/metal/images/hr_bg.png":[14,8,"png","cv"],"designs/metal/mobile.css":"cv","designs/pitchblack/README":"cv","designs/pitchblack/basic.css":"cv","designs/pitchblack/custom.css":"cv","designs/pitchblack/design_setup.js":"cv","designs/pitchblack/images/fenster_einfach_auf.png":[40,40,"png","cv"],"designs/pitchblack/images/fenster_einfach_zu.png":[40,40,"png","cv"],"designs/pitchblack/images/fenster_zweifach_auf.png":[80,40,"png","cv"],"designs/pitchblack/images/fenster_zweifach_linksauf.png":[80,40,"png","cv"],"designs/pitchblack/images/fenster_zweifach_rechtsauf.png":[80,40,"png","cv"],"designs/pitchblack/images/fenster_zweifach_zu.png":[80,40,"png","cv"],"designs/pitchblack/images/jal_down.png":[80,40,"png","cv"],"designs/pitchblack/images/jal_stop.png":[80,40,"png","cv"],"designs/pitchblack/images/jal_up.png":[80,40,"png","cv"],"designs/pitchblack/images/licht-an.png":[400,400,"png","cv"],"designs/pitchblack/images/licht-aus.png":[400,400,"png","cv"],"designs/pitchblack/mobile.css":"cv","designs/planet/basic.css":"cv","designs/planet/custom.css":"cv","designs/planet/design_setup.js":"cv","designs/planet/fonts/OSP/OSP-DIN.ttf":"cv","designs/planet/fonts/ubuntu-font-family/UbuntuMono-B.ttf":"cv","designs/planet/fonts/ubuntu-font-family/UbuntuMono-R.ttf":"cv","designs/planet/mobile.css":"cv","designs/pure/basic.css":"cv","designs/pure/custom.css":"cv","designs/pure/design_setup.js":"cv","designs/pure/mobile.css":"cv","icon/COPYING":"cv","icon/CometVisu_blue.png":[45,35,"png","cv"],"icon/CometVisu_grey.png":[45,35,"png","cv"],"icon/CometVisu_orange.png":[45,35,"png","cv"],"icon/LICENCE.knx-uf-iconset":"cv","icon/comet_112_ff8000.png":[112,40,"png","cv"],"icon/comet_128_000000.png":[128,46,"png","cv"],"icon/comet_128_00ddff.png":[128,46,"png","cv"],"icon/comet_128_00ff11.png":[128,46,"png","cv"],"icon/comet_128_d00055.png":[128,46,"png","cv"],"icon/comet_128_ff0000.png":[128,46,"png","cv"],"icon/comet_128_ff8000.png":[128,46,"png","cv"],"icon/comet_128_ffffff.png":[128,46,"png","cv"],"icon/comet_16_000000.png":[16,6,"png","cv"],"icon/comet_16_00ddff.png":[16,6,"png","cv"],"icon/comet_16_00ff11.png":[16,6,"png","cv"],"icon/comet_16_d00055.png":[16,6,"png","cv"],"icon/comet_16_ff0000.png":[16,6,"png","cv"],"icon/comet_16_ff8000.png":[16,6,"png","cv"],"icon/comet_16_ffffff.png":[16,6,"png","cv"],"icon/comet_16x16_000000.png":[16,16,"png","cv"],"icon/comet_16x16_ff0000.png":[16,16,"png","cv"],"icon/comet_16x16_ff8000.png":[16,16,"png","cv"],"icon/comet_32_000000.png":[32,11,"png","cv"],"icon/comet_32_00ddff.png":[32,11,"png","cv"],"icon/comet_32_00ff11.png":[32,11,"png","cv"],"icon/comet_32_d00055.png":[32,11,"png","cv"],"icon/comet_32_ff0000.png":[32,11,"png","cv"],"icon/comet_32_ff8000.png":[32,11,"png","cv"],"icon/comet_32_ffffff.png":[32,11,"png","cv"],"icon/comet_50_ff8000.png":[50,18,"png","cv"],"icon/comet_50x50_ff8000.jpg":[50,50,"jpeg","cv"],"icon/comet_50x50_ff8000.png":[50,50,"png","cv"],"icon/comet_512_ff8000.jpg.png":[50,18,"png","cv"],"icon/comet_512_ff8000.png":[512,183,"png","cv"],"icon/comet_64_000000.png":[64,23,"png","cv"],"icon/comet_64_00ddff.png":[64,23,"png","cv"],"icon/comet_64_00ff11.png":[64,23,"png","cv"],"icon/comet_64_d00055.png":[64,23,"png","cv"],"icon/comet_64_ff0000.png":[64,23,"png","cv"],"icon/comet_64_ff8000.png":[64,23,"png","cv"],"icon/comet_64_ffffff.png":[64,23,"png","cv"],"icon/comet_chrome_app_icon_128x128.png":[128,128,"png","cv"],"icon/comet_icon_128x128_ff8000.png":[128,128,"png","cv"],"icon/comet_icon_256x256_ff8000.png":[256,256,"png","cv"],"icon/comet_icon_512_ff8000.png":[444,512,"png","cv"],"icon/comet_icon_512x512_ff8000.png":[512,512,"png","cv"],"icon/comet_opt.svg":[595,842,"svg","cv"],"icon/comet_opt_icon.svg":[450,450,"svg","cv"],"icon/comet_webapp_icon.png":[72,72,"png","cv"],"icon/comet_webapp_icon_114.png":[114,114,"png","cv"],"icon/comet_webapp_icon_120.png":[120,120,"png","cv"],"icon/comet_webapp_icon_144.png":[144,144,"png","cv"],"icon/comet_webapp_icon_152.png":[152,152,"png","cv"],"icon/comet_webapp_icon_167.png":[167,167,"png","cv"],"icon/comet_webapp_icon_180.png":[180,180,"png","cv"],"icon/comet_webapp_icon_76.png":[76,76,"png","cv"],"icon/comet_webapp_icon_android_114.png":[114,114,"png","cv"],"icon/comet_webapp_icon_android_120.png":[120,120,"png","cv"],"icon/comet_webapp_icon_android_128.png":[128,128,"png","cv"],"icon/comet_webapp_icon_android_144.png":[144,144,"png","cv"],"icon/comet_webapp_icon_android_152.png":[152,152,"png","cv"],"icon/comet_webapp_icon_android_16.png":[16,16,"png","cv"],"icon/comet_webapp_icon_android_192.png":[192,192,"png","cv"],"icon/comet_webapp_icon_android_32.png":[32,32,"png","cv"],"icon/comet_webapp_icon_android_36.png":[36,36,"png","cv"],"icon/comet_webapp_icon_android_48.png":[48,48,"png","cv"],"icon/comet_webapp_icon_android_512.png":[512,512,"png","cv"],"icon/comet_webapp_icon_android_57.png":[57,57,"png","cv"],"icon/comet_webapp_icon_android_72.png":[72,72,"png","cv"],"icon/comet_webapp_icon_android_78.png":[78,78,"png","cv"],"icon/comet_webapp_icon_android_96.png":[96,96,"png","cv"],"icon/cometvisu_icon_opt.svg":[488,561,"svg","cv"],"icon/cometvisu_icon_raw.svg":[567,567,"svg","cv"],"icon/iconlist.html":"cv","icon/knx-uf-iconset.svg":[-1,-1,"svg","cv"],"plugins/calendarlist/calendarlist.php":"cv","plugins/clock/clock_pure.svg":[100,100,"svg","cv"],"plugins/colorchooser/farbtastic/CHANGELOG.html":"cv","plugins/colorchooser/farbtastic/LICENSE.txt":"cv","plugins/colorchooser/farbtastic/README.html":"cv","plugins/colorchooser/farbtastic/README.md":"cv","plugins/colorchooser/farbtastic/demo1.html":"cv","plugins/colorchooser/farbtastic/demo2.html":"cv","plugins/colorchooser/farbtastic/farbtastic.css":"cv","plugins/colorchooser/farbtastic/farbtastic.js":"cv","plugins/colorchooser/farbtastic/marker.png":[17,17,"png","cv"],"plugins/colorchooser/farbtastic/mask.png":[101,101,"png","cv"],"plugins/colorchooser/farbtastic/wheel.png":[195,195,"png","cv"],"plugins/diagram/dep/flot/API.md":"cv","plugins/diagram/dep/flot/CONTRIBUTING.md":"cv","plugins/diagram/dep/flot/FAQ.md":"cv","plugins/diagram/dep/flot/LICENSE.txt":"cv","plugins/diagram/dep/flot/Makefile":"cv","plugins/diagram/dep/flot/NEWS.md":"cv","plugins/diagram/dep/flot/PLUGINS.md":"cv","plugins/diagram/dep/flot/README.md":"cv","plugins/diagram/dep/flot/excanvas.js":"cv","plugins/diagram/dep/flot/excanvas.min.js":"cv","plugins/diagram/dep/flot/jquery.colorhelpers.js":"cv","plugins/diagram/dep/flot/jquery.colorhelpers.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.axislabels.js":"cv","plugins/diagram/dep/flot/jquery.flot.canvas.js":"cv","plugins/diagram/dep/flot/jquery.flot.canvas.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.categories.js":"cv","plugins/diagram/dep/flot/jquery.flot.categories.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.crosshair.js":"cv","plugins/diagram/dep/flot/jquery.flot.crosshair.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.errorbars.js":"cv","plugins/diagram/dep/flot/jquery.flot.errorbars.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.fillbetween.js":"cv","plugins/diagram/dep/flot/jquery.flot.fillbetween.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.image.js":"cv","plugins/diagram/dep/flot/jquery.flot.image.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.js":"cv","plugins/diagram/dep/flot/jquery.flot.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.navigate.js":"cv","plugins/diagram/dep/flot/jquery.flot.navigate.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.pie.js":"cv","plugins/diagram/dep/flot/jquery.flot.pie.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.resize.js":"cv","plugins/diagram/dep/flot/jquery.flot.resize.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.selection.js":"cv","plugins/diagram/dep/flot/jquery.flot.selection.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.stack.js":"cv","plugins/diagram/dep/flot/jquery.flot.stack.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.symbol.js":"cv","plugins/diagram/dep/flot/jquery.flot.symbol.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.threshold.js":"cv","plugins/diagram/dep/flot/jquery.flot.threshold.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.time.js":"cv","plugins/diagram/dep/flot/jquery.flot.time.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.tooltip.js":"cv","plugins/diagram/dep/flot/jquery.flot.tooltip.min.js":"cv","plugins/diagram/dep/flot/jquery.flot.touch.js":"cv","plugins/diagram/dep/flot/jquery.flot.touch.min.js":"cv","plugins/diagram/influxfetch.php":"cv","plugins/gauge/dep/ChangeLog.txt":"cv","plugins/gauge/dep/README.md":"cv","plugins/gauge/dep/demoExtras.html":"cv","plugins/gauge/dep/steelseries-min.js":"cv","plugins/gauge/dep/steelseries-min.js.map":"cv","plugins/gauge/dep/steelseries.js":"cv","plugins/gauge/dep/tween-min.js":"cv","plugins/gauge/dep/tween.js":"cv","plugins/gauge/gauge.css":"cv","plugins/mobilemenu/mobilemenu.css":"cv","plugins/openweathermap/font/COPYING":"cv","plugins/openweathermap/font/weathericons-regular-webfont.eot":"cv","plugins/openweathermap/font/weathericons-regular-webfont.svg":[-1,-1,"svg","cv"],"plugins/openweathermap/font/weathericons-regular-webfont.ttf":"cv","plugins/openweathermap/font/weathericons-regular-webfont.woff":"cv","plugins/openweathermap/font/weathericons-regular-webfont.woff2":"cv","plugins/openweathermap/owm_basic_style.css":"cv","plugins/openweathermap/owm_core.js":"cv","plugins/openweathermap/owm_weathericon.css":"cv","plugins/rss/dep/zrssfeed/jquery.vticker.js":"cv","plugins/rss/dep/zrssfeed/jquery.zrssfeed.css":"cv","plugins/rss/dep/zrssfeed/jquery.zrssfeed.js":"cv","plugins/rss/dep/zrssfeed/jquery.zrssfeed.min.js":"cv","plugins/rsslog/rsslog.css":"cv","plugins/rsslog/rsslog.php":"cv","plugins/rsslog/rsslog_correct.pl":"cv","plugins/rsslog/rsslog_mysql.php":"cv","plugins/strftime/strftime.css":"cv","plugins/svg/rollo.svg":[48,48,"svg","cv"],"plugins/tr064/proxy.php":"cv","plugins/tr064/soap.php":"cv","plugins/tr064/tr064.css":"cv","plugins/upnpcontroller/mute.php":"cv","plugins/upnpcontroller/next.php":"cv","plugins/upnpcontroller/pause.php":"cv","plugins/upnpcontroller/play.php":"cv","plugins/upnpcontroller/playlists.php":"cv","plugins/upnpcontroller/prev.php":"cv","plugins/upnpcontroller/status.php":"cv","plugins/upnpcontroller/upnpcontroller.css":"cv","plugins/upnpcontroller/upnpctrl_util.php":"cv","plugins/upnpcontroller/volume.php":"cv","qx/static/blank.gif":[1,1,"gif","qx"],"qx/static/blank.html":"qx","visu_config.xsd":"cv"}};

qx.$$loader.init();
