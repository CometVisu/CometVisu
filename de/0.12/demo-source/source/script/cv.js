(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"cv.build":"source","cv.sentry":true,"cv.testMode":"resource/demo/media/demo_testmode_data.json","cv.version":"dev","cv.xhr":"qx","qx.application":"cv.Application","qx.globalErrorHandling":true,"qx.promise":false,"qx.version":"5.1"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"com.zenesis.qx.upload":{"resourceUri":"../external/qx-upload-manager/source/resource","sourceUri":"../external/qx-upload-manager/source/class"},"cv":{"resourceUri":"../source/resource","sourceUri":"../source/class","sourceViewUri":"https://github.com/CometVisu/CometVisu/blob/develop/source/class/%{classFilePath}#L%{lineNumber}"},"cv.io":{"sourceUri":"../client/source/class"},"dialog":{"resourceUri":"../external/qx-contrib-dialog/source/resource","sourceUri":"../external/qx-contrib-dialog/source/class"},"iconfont.material":{"resourceUri":"../external/qx-iconfont-material/source/resource","sourceUri":"../external/qx-iconfont-material/source/class"},"osparc.theme":{"resourceUri":"../external/qx-osparc-theme/source/resource","sourceUri":"../external/qx-osparc-theme/source/class"},"qx":{"resourceUri":"../external/qooxdoo/framework/source/resource","sourceUri":"../external/qooxdoo/framework/source/class","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"de":null,"en":null};
qx.$$locales = {"C":null,"de":null,"en":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"C":[2097152],"boot":[2097151],"de":[2097152,4194304],"en":[2097152,8388608],"manager":[2097151,8322,8320,130,128],"plugin-calendarlist":[2097151,1572669,524093,108573,1],"plugin-clock":[2097151,1572669,524093,1011208,512],"plugin-colorchooser":[2097151,1572669,524093,1011208,352264,16384],"plugin-diagram":[2097151,1572669,524093,1011208,108573,352264,8],"plugin-gauge":[2097151,1572669,524093,1011208,352264,262144],"plugin-link":[2097151,1572669,524093,256],"plugin-mobilemenu":[2097151,1572669,524093,12288,4096],"plugin-openhab":[2097151,8322,130,2],"plugin-openweathermap":[2097151,1572669,524093,108573,32768],"plugin-powerspectrum":[2097151,1572669,524093,1011208,1024],"plugin-rss":[2097151,1572669,524093,108573,16],"plugin-rsslog":[2097151,1572669,524093,1011208,108573,352264,65536],"plugin-speech":[2097151,1011208,524288],"plugin-strftime":[2097151,1572669,524093,32],"plugin-svg":[2097151,1572669,524093,1011208,131072],"plugin-timeout":[2097151,1572669,1048576],"plugin-tr064":[2097151,1572669,524093,1011208,108573,2048],"plugin-upnpcontroller":[2097151,1572669,524093,108573,4],"structure-pure":[2097151,1572669,524093,1011208,108573,352264,8322,8320,12288,8192]},
  packages : {"1":{"uris":["__out__:cv.c74c5093e5f4.js","cv:cv/plugins/CalendarList.js"]},"2":{"uris":["__out__:cv.7c3cdff33462.js","cv:cv/plugins/openhab/Settings.js","__out__:cv.dd632f27876d.js","cv:cv/plugins/openhab/renderer/Single.js","cv:cv/plugins/openhab/Openhab.js"]},"4":{"uris":["__out__:cv.67856597e758.js","cv:cv/plugins/UpnpController.js"]},"8":{"uris":["__out__:cv.cd3d56d11b03.js","cv:cv/plugins/diagram/AbstractDiagram.js","cv:cv/plugins/diagram/Info.js","cv:cv/plugins/diagram/Diagram.js"]},"16":{"uris":["__out__:cv.ed2b7a59920b.js","cv:cv/plugins/Rss.js"]},"32":{"uris":["__out__:cv.875895885150.js","cv:cv/plugins/Strftime.js"]},"128":{"uris":["__out__:cv.1953b0e7eae7.js","cv:cv/ui/manager/control/MFileEventHandler.js","cv:cv/ui/manager/control/IFileEventHandler.js","cv:cv/ui/manager/model/FileItem.js","cv:cv/theme/dark/Images.js","cv:cv/ui/manager/snackbar/Controller.js","__out__:cv.f0a44340a763.js","cv:cv/ui/manager/model/Message.js","cv:cv/ui/manager/snackbar/Message.js","__out__:cv.cf7a7fceb0c2.js","cv:cv/io/rest/Client.js","cv:cv/ui/manager/upload/MDragUpload.js","cv:cv/ui/manager/tree/FileSystem.js","__out__:cv.553a2b9fb75d.js","cv:cv/ui/manager/contextmenu/FileItem.js","cv:cv/ui/manager/model/BackupFolder.js","cv:cv/ui/manager/control/FileHandlerRegistry.js","cv:cv/ui/manager/IActionHandler.js","cv:cv/ui/manager/editor/IEditor.js","cv:cv/ui/manager/viewer/AbstractViewer.js","__out__:cv.d40682c252c4.js","cv:cv/ui/manager/viewer/Image.js","cv:cv/ui/manager/viewer/Config.js","__out__:cv.5cd1316845bd.js","cv:cv/ui/manager/viewer/Folder.js","cv:cv/ui/manager/model/Preferences.js","__out__:cv.efb71d175788.js","cv:cv/ui/manager/form/FileListItem.js","__out__:cv.c4634e70447c.js","cv:cv/ui/manager/control/FileController.js","cv:cv/ui/manager/editor/Worker.js","cv:cv/ui/manager/contextmenu/GlobalFileItem.js","__out__:cv.5c7645abfc72.js","cv:cv/ui/manager/ToolBar.js","__out__:cv.d9dac862a392.js","cv:cv/ui/manager/MenuBar.js","__out__:cv.96e38340b904.js","cv:cv/ui/manager/upload/UploadMgr.js","__out__:cv.b5903fab917a.js","cv:cv/ui/manager/viewer/Icons.js","cv:cv/ui/manager/core/IconAtom.js","cv:cv/ui/manager/viewer/SvgIcon.js","cv:cv/svg/Element.js","cv:cv/ui/manager/Start.js","__out__:cv.b9f16a51c5ba.js","cv:cv/ui/manager/editor/AbstractEditor.js","cv:cv/ui/manager/editor/Source.js","cv:cv/ui/manager/editor/completion/Config.js","cv:cv/ui/manager/editor/data/Provider.js","cv:cv/ui/manager/editor/completion/CometVisu.js","cv:cv/ui/manager/editor/Xml.js","cv:cv/ui/manager/model/CompareFiles.js","cv:cv/ui/manager/editor/Diff.js","cv:cv/ui/manager/editor/Config.js","cv:cv/ui/manager/model/config/Section.js","cv:cv/ui/manager/model/config/Option.js","cv:cv/ui/manager/form/SectionListItem.js","cv:cv/ui/manager/form/OptionListItem.js","__out__:cv.dccc1be75eca.js","cv:cv/ui/manager/tree/VirtualFsItem.js","__out__:cv.fc5251f9d0c2.js","cv:cv/ui/manager/Main.js","__out__:cv.270a82bae336.js","cv:cv/ui/manager/control/ActionDispatcher.js","cv:cv/ui/manager/core/GlobalState.js","cv:cv/ui/manager/model/OpenFile.js","__out__:cv.4a645e12b28e.js","cv:cv/ui/manager/form/FileTabItem.js"]},"130":{"uris":["__out__:cv.62fde8a404b8.js","cv:cv/theme/dark/Color.js","__out__:cv.157af6519bce.js","cv:cv/theme/dark/Icon.js","__out__:cv.bb71be859ca9.js","cv:cv/theme/dark/Decoration.js","__out__:cv.d898f5a18b15.js","cv:cv/theme/dark/Appearance.js","__out__:cv.98a9313e26d1.js","cv:cv/theme/dark/Font.js","cv:cv/theme/Dark.js"]},"256":{"uris":["__out__:cv.d5f827e14f36.js","cv:cv/plugins/Link.js"]},"512":{"uris":["__out__:cv.bb8a011a6957.js","cv:cv/plugins/Clock.js"]},"1024":{"uris":["__out__:cv.1a5822b7bfb4.js","cv:cv/plugins/PowerSpectrum.js"]},"2048":{"uris":["__out__:cv.79085a41969f.js","cv:cv/plugins/tr064/CallList.js"]},"4096":{"uris":["__out__:cv.c92fadee75da.js","cv:cv/plugins/MobileMenu.js"]},"8192":{"uris":["__out__:cv.68a70f2d5b70.js","cv:cv/ui/common/HasAnimatedButton.js","cv:cv/ui/structure/pure/MultiTrigger.js","cv:cv/ui/structure/pure/Image.js","cv:cv/ui/structure/pure/DesignToggle.js","cv:cv/ui/structure/pure/Text.js","cv:cv/ui/structure/pure/Refresh.js","cv:cv/ui/structure/pure/Break.js","cv:cv/ui/structure/pure/PageLink.js","cv:cv/ui/structure/pure/WidgetInfoAction.js","cv:cv/ui/structure/pure/Unknown.js","cv:cv/ui/structure/pure/Trigger.js","cv:cv/ui/structure/pure/Rgb.js","cv:cv/ui/structure/pure/UrlTrigger.js","cv:cv/ui/structure/pure/Line.js","cv:cv/ui/structure/pure/Switch.js","cv:cv/ui/structure/pure/NotificationCenterBadge.js","cv:cv/ui/structure/pure/PushButton.js","cv:cv/ui/structure/pure/WgPluginInfo.js","cv:cv/ui/structure/pure/InfoTrigger.js","cv:cv/ui/structure/pure/InfoAction.js","cv:cv/ui/structure/pure/Video.js","cv:cv/ui/structure/pure/NavBar.js","cv:cv/ui/structure/pure/PageJump.js","cv:cv/ui/structure/pure/ImageTrigger.js","cv:cv/ui/structure/pure/Web.js","cv:cv/ui/structure/pure/Group.js","cv:cv/ui/structure/pure/Audio.js","cv:cv/ui/structure/pure/Info.js","cv:cv/ui/structure/pure/Toggle.js","cv:cv/ui/structure/pure/Reload.js","__out__:cv.44a3d5434233.js","cv:cv/ui/structure/pure/Slide.js","__out__:cv.40fcc3eeb96d.js","cv:cv/ui/website/Slider.js","cv:cv/util/Function.js","cv:cv/ui/structure/IPage.js","cv:cv/ui/structure/pure/Page.js"]},"8320":{"uris":["__out__:cv.d5741fba878f.js"]},"8322":{"uris":["__out__:cv.c2635ef1ac02.js"]},"12288":{"uris":["__out__:cv.17134e0dc409.js","cv:cv/ui/common/HasChildren.js"]},"16384":{"uris":["__out__:cv.0aec920c9563.js","cv:cv/plugins/ColorChooser.js"]},"32768":{"uris":["__out__:cv.073574cea7ab.js","cv:cv/plugins/OpenweatherMap.js"]},"65536":{"uris":["__out__:cv.c30e53fa5e0a.js","cv:cv/plugins/RssLog.js","__out__:cv.dcc44c5618c8.js"]},"108573":{"uris":["__out__:cv.d6a7a3697563.js","cv:cv/ui/common/Refresh.js"]},"131072":{"uris":["__out__:cv.219d8206e9de.js","cv:cv/plugins/Svg.js"]},"262144":{"uris":["__out__:cv.6bb2e6bc12b5.js","cv:cv/plugins/Gauge.js"]},"352264":{"uris":["__out__:cv.2509d26956d8.js","cv:cv/ui/common/Operate.js"]},"524093":{"uris":["__out__:cv.fb0d97776fa9.js","cv:cv/ui/common/HasStyling.js","cv:cv/ui/structure/AbstractWidget.js","cv:cv/ui/common/HandleLongpress.js"]},"524288":{"uris":["__out__:cv.56a08d894cde.js","cv:cv/plugins/Speech.js"]},"1011208":{"uris":["__out__:cv.d42905592ba7.js","cv:cv/ui/common/Update.js"]},"1048576":{"uris":["__out__:cv.1b3e21208027.js","cv:cv/plugins/Timeout.js"]},"1572669":{"uris":["__out__:cv.791b7bc3b26e.js","cv:cv/ui/structure/AbstractBasicWidget.js"]},"2097151":{"uris":["__out__:cv.36c2426f95c0.js","cv:cv/ui/structure/WidgetFactory.js","__out__:cv.00c1f5b9c5af.js","cv:cv/ConfigCache.js","cv.io:cv/io/Client.js","cv.io:cv/io/transport/LongPolling.js","cv.io:cv/io/Watchdog.js","__out__:cv.4408a4c17886.js","cv.io:cv/io/transport/Sse.js","cv.io:cv/io/parser/Json.js","cv.io:cv/io/request/Jquery.js","cv:cv/Config.js","cv:cv/TemplateEngine.js","__out__:cv.751a1878c2b7.js","cv:cv/ui/PagePartsHandler.js","cv:cv/ui/layout/States.js","cv:cv/ui/layout/ResizeHandler.js","__out__:cv.c3b853d9e126.js","cv:cv/ui/layout/Manager.js","cv:cv/util/Tree.js","cv:cv/data/Model.js","__out__:cv.91c2e59af057.js","cv:cv/report/Record.js","cv:cv/report/utils/MXhrHook.js","__out__:cv.51abd0b7d02d.js","cv:cv/Version.js","cv:cv/core/notifications/Router.js","__out__:cv.7d7829ae347d.js","cv:cv/ui/Popup.js","__out__:cv.e66ee06edaff.js","cv:cv/ui/BodyBlocker.js","cv:cv/util/IconTools.js","cv:cv/ui/util/ProgressBar.js","cv:cv/ui/PopupHandler.js","cv:cv/core/notifications/ActionRegistry.js","cv:cv/core/notifications/IHandler.js","cv:cv/ui/MHandleMessage.js","cv:cv/ui/NotificationCenter.js","__out__:cv.d33939c637cf.js","cv:cv/core/notifications/SpeechHandler.js","cv:cv/ui/ToastManager.js","cv:cv/Transform.js","cv:cv/ui/common/HasAddress.js","cv:cv/ui/common/BasicUpdate.js","cv:cv/util/String.js","cv:cv/util/ScriptLoader.js","__out__:cv.3353dd7a8d6b.js","cv:cv/parser/MetaParser.js","cv:cv/IconHandler.js","cv:cv/IconConfig.js","cv:cv/parser/WidgetParser.js","__out__:cv.62e66209f811.js","cv:cv/ui/PageHandler.js","__out__:cv.9ec4a740cee8.js","cv:cv/ui/TrickOMatic.js","cv:cv/report/Replay.js","cv:cv/report/utils/MXhrReplayHook.js","__out__:cv.b642e2ed7ba3.js","cv:cv/report/utils/FakeServer.js","__out__:cv.3c1e8174b20d.js","cv:cv/util/Location.js","__out__:cv.62154d36ff35.js","cv:cv/Application.js","__out__:cv.2a7e514f124f.js","cv:cv/io/Mockup.js","__out__:cv.cedcaa8bc5e0.js","cv:cv/log/appender/Native.js","__out__:cv.4b4fa8272ad2.js","cv:cv/util/ConfigLoader.js","cv:cv/parser/widgets/NavBar.js","cv:cv/transforms/OpenHab.js","cv:cv/parser/widgets/Text.js","cv:cv/parser/widgets/InfoAction.js","cv:cv/parser/widgets/Break.js","cv:cv/parser/widgets/Rgb.js","cv:cv/parser/widgets/NotificationCenterBadge.js","cv:cv/parser/widgets/MultiTrigger.js","cv:cv/parser/widgets/Video.js","cv:cv/parser/widgets/Reload.js","cv:cv/parser/widgets/Toggle.js","cv:cv/parser/widgets/Image.js","cv:cv/parser/widgets/Refresh.js","cv:cv/core/notifications/actions/AbstractActionHandler.js","cv:cv/core/notifications/IActionHandler.js","cv:cv/core/notifications/actions/Link.js","cv:cv/parser/widgets/ImageTrigger.js","cv:cv/parser/widgets/UrlTrigger.js","cv:cv/parser/widgets/DesignToggle.js","cv:cv/parser/widgets/Page.js","cv:cv/parser/widgets/Unknown.js","cv:cv/parser/widgets/Switch.js","cv:cv/parser/widgets/InfoTrigger.js","cv:cv/parser/widgets/PageJump.js","cv:cv/parser/widgets/Group.js","cv:cv/parser/widgets/Audio.js","cv:cv/parser/widgets/WidgetInfoAction.js","cv:cv/parser/widgets/Info.js","cv:cv/core/notifications/actions/Option.js","cv:cv/transforms/Knx.js","cv:cv/parser/widgets/Line.js","cv:cv/parser/widgets/Slide.js","cv:cv/parser/widgets/Web.js","cv:cv/core/notifications/actions/OptionGroup.js","cv:cv/parser/widgets/WgPluginInfo.js","cv:cv/parser/widgets/PushButton.js","cv:cv/parser/widgets/Trigger.js"]},"2097152":{"uris":["__out__:cv-C.1f212aacf10c.js"]},"4194304":{"uris":["__out__:cv-de.d711845d110a.js"]},"8388608":{"uris":["__out__:cv-en.d760cbb9563a.js"]}},
  urisBefore : ["resource/libs/EventRecorder.js","resource/libs/sprintf.js","resource/libs/jquery.js","resource/libs/strftime.js","resource/libs/svg4everybody.js","resource/libs/favico.js","resource/libs/inobounce.min.js"],
  cssBefore : [],
  boot : "boot",
  closureParts : {"C":true,"de":true,"en":true},
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



qx.$$loader.init();

