(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"cv.build":"source","cv.sentry":true,"cv.testMode":"resource/demo/media/demo_testmode_data.json","cv.version":"dev","cv.xhr":"qx","qx.application":"cv.Application","qx.globalErrorHandling":true,"qx.promise":false,"qx.version":"5.1"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"cv":{"resourceUri":"../source/resource","sourceUri":"../source/class","sourceViewUri":"https://github.com/CometVisu/CometVisu/blob/develop/source/class/%{classFilePath}#L%{lineNumber}"},"cv.io":{"sourceUri":"../client/source/class"},"qx":{"resourceUri":"../external/qooxdoo/framework/source/resource","sourceUri":"../external/qooxdoo/framework/source/class","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"de":null,"en":null};
qx.$$locales = {"C":null,"de":null,"en":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"boot":[1048575],"plugin-calendarlist":[1048575,786365,245693,54301,1],"plugin-clock":[1048575,786365,245693,505608,256],"plugin-colorchooser":[1048575,786365,245693,505608,176136,8192],"plugin-diagram":[1048575,786365,245693,505608,54301,176136,8],"plugin-gauge":[1048575,786365,245693,505608,176136,131072],"plugin-link":[1048575,786365,245693,128],"plugin-mobilemenu":[1048575,786365,245693,6144,2048],"plugin-openhab":[1048575,4098,2],"plugin-openweathermap":[1048575,786365,54301,16384],"plugin-powerspectrum":[1048575,786365,245693,505608,512],"plugin-rss":[1048575,786365,245693,54301,16],"plugin-rsslog":[1048575,786365,245693,505608,54301,176136,32768],"plugin-speech":[1048575,505608,262144],"plugin-strftime":[1048575,786365,245693,32],"plugin-svg":[1048575,786365,245693,505608,65536],"plugin-timeout":[1048575,786365,524288],"plugin-tr064":[1048575,786365,245693,505608,54301,1024],"plugin-upnpcontroller":[1048575,786365,245693,54301,4],"structure-pure":[1048575,786365,245693,505608,54301,176136,4098,6144,4096]},
  packages : {"1":{"uris":["__out__:cv.e0cdfcca8392.js","cv:cv/plugins/CalendarList.js"]},"2":{"uris":["__out__:cv.5cb2038e66c6.js","cv:cv/plugins/openhab/Settings.js","__out__:cv.fdcab78a000f.js","cv:cv/plugins/openhab/renderer/Single.js","__out__:cv.96ddd9727e05.js","cv:cv/theme/dark/Color.js","cv:cv/theme/dark/Icon.js","__out__:cv.17c05bf12769.js","cv:cv/theme/dark/Decoration.js","__out__:cv.5b15d59dd6ee.js","cv:cv/theme/dark/Appearance.js","__out__:cv.d19e0314ca80.js","cv:cv/theme/dark/Font.js","cv:cv/theme/Dark.js","__out__:cv.6f2f46501d3d.js","cv:cv/plugins/openhab/Openhab.js"]},"4":{"uris":["__out__:cv.1c47493ee5f4.js","cv:cv/plugins/UpnpController.js"]},"8":{"uris":["__out__:cv.3bb1af103edb.js","cv:cv/plugins/diagram/AbstractDiagram.js","cv:cv/plugins/diagram/Info.js","cv:cv/plugins/diagram/Diagram.js"]},"16":{"uris":["__out__:cv.1d5f9621eb93.js","cv:cv/plugins/Rss.js"]},"32":{"uris":["__out__:cv.a0a54e4cf407.js","cv:cv/plugins/Strftime.js"]},"128":{"uris":["__out__:cv.a72a1ae2203f.js","cv:cv/plugins/Link.js"]},"256":{"uris":["__out__:cv.ab0b40f1d077.js","cv:cv/plugins/Clock.js"]},"512":{"uris":["__out__:cv.9b6492c45588.js","cv:cv/plugins/PowerSpectrum.js"]},"1024":{"uris":["__out__:cv.718d0d167116.js","cv:cv/plugins/tr064/CallList.js"]},"2048":{"uris":["__out__:cv.396e3c34be0a.js","cv:cv/plugins/MobileMenu.js"]},"4096":{"uris":["__out__:cv.3afec2f91b1c.js","cv:cv/ui/common/HasAnimatedButton.js","cv:cv/ui/structure/pure/MultiTrigger.js","cv:cv/ui/structure/pure/Image.js","cv:cv/ui/structure/pure/DesignToggle.js","cv:cv/ui/structure/pure/Text.js","cv:cv/ui/structure/pure/Refresh.js","cv:cv/ui/structure/pure/Break.js","cv:cv/ui/structure/pure/PageLink.js","cv:cv/ui/structure/pure/WidgetInfoAction.js","cv:cv/ui/structure/pure/Unknown.js","cv:cv/ui/structure/pure/Trigger.js","cv:cv/ui/structure/pure/Rgb.js","cv:cv/ui/structure/pure/UrlTrigger.js","cv:cv/ui/structure/pure/Line.js","cv:cv/ui/structure/pure/Switch.js","cv:cv/ui/structure/pure/NotificationCenterBadge.js","cv:cv/ui/structure/pure/PushButton.js","cv:cv/ui/structure/pure/WgPluginInfo.js","cv:cv/ui/structure/pure/InfoTrigger.js","cv:cv/ui/structure/pure/InfoAction.js","cv:cv/ui/structure/pure/Video.js","cv:cv/ui/structure/pure/NavBar.js","cv:cv/ui/structure/pure/PageJump.js","cv:cv/ui/structure/pure/ImageTrigger.js","cv:cv/ui/structure/pure/Web.js","cv:cv/ui/structure/pure/Group.js","cv:cv/ui/structure/pure/Audio.js","cv:cv/ui/structure/pure/Info.js","cv:cv/ui/structure/pure/Toggle.js","cv:cv/ui/structure/pure/Reload.js","__out__:cv.44a3d5434233.js","cv:cv/ui/structure/pure/Slide.js","__out__:cv.0b0610af0570.js","cv:cv/ui/website/Slider.js","cv:cv/util/Function.js","cv:cv/ui/structure/IPage.js","cv:cv/ui/structure/pure/Page.js"]},"4098":{"uris":["__out__:cv.ee31ec81850a.js"]},"6144":{"uris":["__out__:cv.392f276293e1.js","cv:cv/ui/common/HasChildren.js"]},"8192":{"uris":["__out__:cv.ec54540c8e1c.js","cv:cv/plugins/ColorChooser.js"]},"16384":{"uris":["__out__:cv.95d24487271c.js","cv:cv/plugins/OpenweatherMap.js"]},"32768":{"uris":["__out__:cv.cb22ed4b34ad.js","cv:cv/plugins/RssLog.js","__out__:cv.dcc44c5618c8.js"]},"54301":{"uris":["__out__:cv.cd133c19223b.js","cv:cv/ui/common/Refresh.js"]},"65536":{"uris":["__out__:cv.4165480d8232.js","cv:cv/plugins/Svg.js"]},"131072":{"uris":["__out__:cv.f1ad2de70c81.js","cv:cv/plugins/Gauge.js"]},"176136":{"uris":["__out__:cv.21085bf9e419.js","cv:cv/ui/common/Operate.js"]},"245693":{"uris":["__out__:cv.1a61fc1ba9e9.js","cv:cv/ui/common/HasStyling.js","cv:cv/ui/structure/AbstractWidget.js","cv:cv/ui/common/HandleLongpress.js"]},"262144":{"uris":["__out__:cv.d0c69fa7c5bb.js","cv:cv/plugins/Speech.js"]},"505608":{"uris":["__out__:cv.812be0042d83.js","cv:cv/ui/common/Update.js"]},"524288":{"uris":["__out__:cv.e2ebbb0e72b5.js","cv:cv/plugins/Timeout.js"]},"786365":{"uris":["__out__:cv.f7f427ef3a56.js","cv:cv/ui/structure/AbstractBasicWidget.js"]},"1048575":{"uris":["__out__:cv.ab9b72299a92.js","cv:cv/ui/structure/WidgetFactory.js","__out__:cv.2a58bc732064.js","cv:cv/ConfigCache.js","__out__:cv.e5588d6bc291.js","cv.io:cv/io/Client.js","cv.io:cv/io/transport/LongPolling.js","cv.io:cv/io/Watchdog.js","__out__:cv.4408a4c17886.js","cv.io:cv/io/transport/Sse.js","cv.io:cv/io/parser/Json.js","cv.io:cv/io/request/Jquery.js","cv:cv/Config.js","cv:cv/TemplateEngine.js","__out__:cv.68ac977e5281.js","cv:cv/ui/PagePartsHandler.js","__out__:cv.17978ff35579.js","cv:cv/ui/layout/States.js","cv:cv/ui/layout/ResizeHandler.js","__out__:cv.73b6b9151efb.js","cv:cv/ui/layout/Manager.js","__out__:cv.e4141da2095f.js","cv:cv/util/Tree.js","cv:cv/data/Model.js","__out__:cv.95292c7494d5.js","cv:cv/report/Record.js","cv:cv/report/utils/MXhrHook.js","__out__:cv.51abd0b7d02d.js","cv:cv/Version.js","cv:cv/core/notifications/Router.js","__out__:cv.7d7829ae347d.js","cv:cv/ui/Popup.js","__out__:cv.25cfcf438154.js","cv:cv/ui/BodyBlocker.js","cv:cv/util/IconTools.js","cv:cv/ui/util/ProgressBar.js","cv:cv/ui/PopupHandler.js","cv:cv/core/notifications/ActionRegistry.js","cv:cv/core/notifications/IHandler.js","cv:cv/ui/MHandleMessage.js","cv:cv/ui/NotificationCenter.js","__out__:cv.d33939c637cf.js","cv:cv/core/notifications/SpeechHandler.js","cv:cv/ui/ToastManager.js","cv:cv/Transform.js","cv:cv/ui/common/HasAddress.js","cv:cv/ui/common/BasicUpdate.js","cv:cv/util/String.js","__out__:cv.fe6fe2d5aaaf.js","cv:cv/util/ScriptLoader.js","__out__:cv.3353dd7a8d6b.js","cv:cv/parser/MetaParser.js","cv:cv/IconHandler.js","cv:cv/IconConfig.js","cv:cv/parser/WidgetParser.js","__out__:cv.62e66209f811.js","cv:cv/ui/PageHandler.js","__out__:cv.9ec4a740cee8.js","cv:cv/ui/TrickOMatic.js","cv:cv/report/Replay.js","cv:cv/report/utils/MXhrReplayHook.js","__out__:cv.05865536d0aa.js","cv:cv/report/utils/FakeServer.js","__out__:cv.2c560775ec06.js","cv:cv/util/Location.js","__out__:cv.62154d36ff35.js","cv:cv/Application.js","cv:cv/io/Mockup.js","__out__:cv.faedd414b983.js","cv:cv/log/appender/Native.js","__out__:cv.4b4fa8272ad2.js","cv:cv/util/ConfigLoader.js","cv:cv/parser/widgets/NavBar.js","cv:cv/transforms/OpenHab.js","cv:cv/parser/widgets/Text.js","cv:cv/parser/widgets/InfoAction.js","cv:cv/parser/widgets/Break.js","cv:cv/parser/widgets/Rgb.js","cv:cv/parser/widgets/NotificationCenterBadge.js","cv:cv/parser/widgets/MultiTrigger.js","cv:cv/parser/widgets/Video.js","cv:cv/parser/widgets/Reload.js","cv:cv/parser/widgets/Toggle.js","cv:cv/parser/widgets/Image.js","cv:cv/parser/widgets/Refresh.js","cv:cv/core/notifications/actions/AbstractActionHandler.js","cv:cv/core/notifications/IActionHandler.js","cv:cv/core/notifications/actions/Link.js","cv:cv/parser/widgets/ImageTrigger.js","cv:cv/parser/widgets/UrlTrigger.js","cv:cv/parser/widgets/DesignToggle.js","cv:cv/parser/widgets/Page.js","cv:cv/parser/widgets/Unknown.js","cv:cv/parser/widgets/Switch.js","cv:cv/parser/widgets/InfoTrigger.js","cv:cv/parser/widgets/PageJump.js","cv:cv/parser/widgets/Group.js","cv:cv/parser/widgets/Audio.js","cv:cv/parser/widgets/WidgetInfoAction.js","cv:cv/parser/widgets/Info.js","cv:cv/core/notifications/actions/Option.js","cv:cv/transforms/Knx.js","cv:cv/parser/widgets/Line.js","cv:cv/parser/widgets/Slide.js","cv:cv/parser/widgets/Web.js","cv:cv/core/notifications/actions/OptionGroup.js","cv:cv/parser/widgets/WgPluginInfo.js","cv:cv/parser/widgets/PushButton.js","cv:cv/parser/widgets/Trigger.js"]}},
  urisBefore : ["resource/libs/EventRecorder.js","resource/libs/sprintf.js","resource/libs/jquery.js","resource/libs/strftime.js","resource/libs/svg4everybody.js","resource/libs/favico.js","resource/libs/inobounce.min.js"],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : false,
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



qx.$$loader.init();

