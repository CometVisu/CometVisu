(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.application":"cv.Application","qx.version":"5.1"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"cv":{"resourceUri":"../source/resource","sourceUri":"../source/class"},"qx":{"resourceUri":"../external/qooxdoo/framework/source/resource","sourceUri":"../external/qooxdoo/framework/source/class","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null};
qx.$$locales = {"C":null,"en":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:cv.8efa60c138e0.js","qx:qx/Bootstrap.js","qx:qx/util/OOUtil.js","qx:qx/core/Environment.js","qx:qx/bom/client/EcmaScript.js","qx:qx/lang/normalize/String.js","qx:qx/dev/StackTrace.js","qx:qx/lang/normalize/Date.js","qx:qx/lang/Array.js","qx:qx/lang/normalize/Function.js","qx:qx/lang/normalize/Array.js","qx:qx/lang/Type.js","qx:qx/core/Assert.js","qx:qx/type/BaseError.js","qx:qx/core/AssertionError.js","qx:qx/bom/client/Runtime.js","qx:qx/bom/client/OperatingSystem.js","qx:qx/bom/client/Engine.js","qx:qx/bom/client/Browser.js","qx:qx/lang/Json.js","qx:qx/lang/String.js","qx:qx/lang/Function.js","qx:qx/event/GlobalError.js","qx:qx/core/WindowError.js","qx:qx/core/GlobalError.js","qx:qx/Mixin.js","qx:qx/core/Aspect.js","qx:qx/lang/normalize/Object.js","qx:qx/Interface.js","qx:qx/lang/normalize/Error.js","qx:qx/core/Property.js","qx:qx/Class.js","qx:qx/data/MBinding.js","qx:qx/data/SingleValueBinding.js","qx:qx/data/IListData.js","qx:qx/core/ValidationError.js","qx:qx/util/RingBuffer.js","qx:qx/log/appender/RingBuffer.js","qx:qx/log/Logger.js","qx:qx/core/ObjectRegistry.js","qx:qx/core/MLogging.js","qx:qx/dom/Node.js","qx:qx/core/IDisposable.js","qx:qx/bom/Event.js","qx:qx/bom/Style.js","qx:qx/bom/client/CssTransition.js","qx:qx/event/Manager.js","qx:qx/event/Registration.js","qx:qx/core/MEvent.js","qx:qx/event/IEventDispatcher.js","qx:qx/core/MProperty.js","qx:qx/core/MAssert.js","qx:qx/core/Object.js","qx:qx/util/DisposeUtil.js","qx:qx/event/type/Event.js","qx:qx/util/ObjectPool.js","qx:qx/event/Pool.js","qx:qx/event/dispatch/Direct.js","qx:qx/event/IEventHandler.js","qx:qx/event/handler/Object.js","qx:qx/event/type/Data.js","qx:qx/util/DeferredCallManager.js","qx:qx/lang/Object.js","qx:qx/util/DeferredCall.js","qx:qx/data/marshal/MEventBubbling.js","qx:qx/data/Array.js","cv:cv/xml/Parser.js","cv:cv/oo/MMethodChaining.js","cv:cv/Object.js","cv:cv/structure/pure/Unknown.js","cv:cv/data/Model.js","qx:qx/dom/Element.js","qx:qx/bom/client/Html.js","qx:qx/bom/element/Attribute.js","qx:qx/bom/Selector.js","qx:qx/dom/Hierarchy.js","cv:cv/TemplateEngine.js","cv:cv/PagePartsHandler.js","qx:qx/bom/element/Class.js","qx:qx/bom/element/Opacity.js","qx:qx/bom/element/Cursor.js","qx:qx/bom/element/BoxSizing.js","qx:qx/bom/element/Clip.js","qx:qx/bom/client/Css.js","qx:qx/bom/element/Style.js","qx:qx/bom/Document.js","qx:qx/bom/Viewport.js","qx:qx/util/Function.js","cv:cv/layout/ResizeHandler.js","cv:cv/layout/Manager.js","cv:cv/structure/pure/AbstractBasicWidget.js","qx:qx/util/Uri.js","cv:cv/Config.js","qx:qx/bom/element/Dataset.js","qx:qx/type/BaseArray.js","qx:qxWeb.js","cv:cv/structure/WidgetFactory.js","cv:cv/util/Tree.js","qx:qx/bom/element/Animation.js","qx:qx/bom/client/Stylesheet.js","qx:qx/bom/Stylesheet.js","qx:qx/bom/client/CssAnimation.js","qx:qx/bom/element/AnimationCss.js","qx:qx/event/Emitter.js","qx:qx/bom/element/AnimationHandle.js","qx:qx/bom/element/AnimationJs.js","qx:qx/bom/client/CssTransform.js","qx:qx/bom/element/Transform.js","qx:qx/util/ColorUtil.js","qx:qx/bom/AnimationFrame.js","cv:cv/io/Mockup.js","cv:cv/io/Client.js","cv:cv/io/Watchdog.js","qx:qx/io/request/AbstractRequest.js","qx:qx/util/Request.js","qx:qx/util/Serializer.js","qx:qx/util/PropertyUtil.js","qx:qx/io/request/Xhr.js","qx:qx/bom/request/Xhr.js","qx:qx/bom/client/Transport.js","qx:qx/bom/client/Plugin.js","qx:qx/xml/Document.js","qx:qx/bom/client/Xml.js","qx:qx/util/ResponseParser.js","cv:cv/io/transport/LongPolling.js","cv:cv/io/transport/Sse.js","qx:qx/util/LibraryManager.js","qx:qx/util/ResourceManager.js","cv:cv/xml/parser/Meta.js","cv:cv/IconHandler.js","cv:cv/util/IconTools.js","cv:cv/IconConfig.js","cv:cv/ui/Mappings.js","cv:cv/ui/Stylings.js","qx:qx/util/DynamicScriptLoader.js","qx:qx/bom/request/Script.js","cv:cv/util/DynamicScriptLoader.js","qx:qx/bom/client/Event.js","qx:qx/bom/History.js","qx:qx/bom/HashHistory.js","qx:qx/event/handler/Iframe.js","qx:qx/bom/Iframe.js","qx:qx/event/Timer.js","qx:qx/event/Idle.js","qx:qx/bom/IframeHistory.js","qx:qx/bom/NativeHistory.js","cv:cv/role/HasAddress.js","cv:cv/role/BasicUpdate.js","cv:cv/Transform.js","cv:cv/role/Update.js","cv:cv/MessageBroker.js","cv:cv/role/HasChildren.js","cv:cv/role/HasStyling.js","cv:cv/structure/pure/AbstractWidget.js","cv:cv/structure/pure/Page.js","cv:cv/PageHandler.js","qx:qx/bom/element/Location.js","qx:qx/bom/element/Dimension.js","qx:qx/data/store/Json.js","qx:qx/data/marshal/IMarshaler.js","qx:qx/data/marshal/Json.js","qx:qx/util/ValueManager.js","qx:qx/util/AliasManager.js","cv:cv/role/Operate.js","cv:cv/structure/pure/Switch.js","cv:cv/role/Refresh.js","cv:cv/structure/pure/Web.js","cv:cv/structure/pure/Text.js","cv:cv/structure/pure/Slide.js","cv:cv/structure/pure/WidgetInfoAction.js","cv:cv/structure/pure/InfoAction.js","cv:cv/role/HasAnimatedButton.js","cv:cv/structure/pure/Refresh.js","cv:cv/structure/pure/NavBar.js","cv:cv/structure/pure/Rgb.js","cv:cv/structure/pure/Video.js","cv:cv/structure/pure/PageJump.js","cv:cv/structure/pure/Audio.js","cv:cv/structure/pure/MultiTrigger.js","cv:cv/structure/pure/UrlTrigger.js","cv:cv/structure/pure/Include.js","cv:cv/structure/pure/Group.js","cv:cv/structure/pure/Break.js","cv:cv/structure/pure/Info.js","cv:cv/structure/pure/Reload.js","cv:cv/structure/pure/Image.js","cv:cv/structure/pure/PushButton.js","cv:cv/structure/pure/ImageTrigger.js","cv:cv/role/HandleLongpress.js","cv:cv/structure/pure/InfoTrigger.js","cv:cv/structure/pure/Trigger.js","cv:cv/structure/pure/Line.js","cv:cv/structure/pure/Toggle.js","cv:cv/structure/pure/WgPluginInfo.js","cv:cv/structure/pure/DesignToggle.js","cv:cv/structure/pure/PageLink.js","cv:cv/transforms/Knx.js","cv:cv/transforms/OpenHab.js","qx:qx/bom/Html.js","qx:qx/application/IApplication.js","qx:qx/core/BaseInit.js","qx:qx/event/type/Native.js","qx:qx/event/handler/Window.js","qx:qx/event/handler/Application.js","qx:qx/core/Init.js","qx:qx/application/Native.js","cv:cv/Application.js","qx:qx/log/appender/Util.js","qx:qx/log/appender/Native.js","qx:qx/bom/client/Device.js","qx:qx/event/handler/PointerCore.js","qx:qx/event/type/dom/Custom.js","qx:qx/event/type/dom/Pointer.js","qx:qx/event/dispatch/AbstractBubbling.js","qx:qx/event/dispatch/DomBubbling.js","qx:qx/event/type/Dom.js","qx:qx/event/type/Mouse.js","qx:qx/event/type/Pointer.js","qx:qx/event/handler/Pointer.js","qx:qx/event/type/Tap.js","qx:qx/event/type/Track.js","qx:qx/event/type/Swipe.js","qx:qx/event/type/Rotate.js","qx:qx/event/type/Roll.js","qx:qx/event/type/Pinch.js","qx:qx/event/handler/GestureCore.js","qx:qx/util/Wheel.js","qx:qx/event/handler/Gesture.js","qx:qx/event/handler/UserAction.js","qx:qx/event/handler/Keyboard.js","qx:qx/event/type/KeyInput.js","qx:qx/event/type/KeySequence.js","qx:qx/event/util/Keyboard.js","qx:qx/event/handler/Focus.js","qx:qx/bom/Selection.js","qx:qx/bom/Range.js","qx:qx/util/StringSplit.js","qx:qx/event/type/Focus.js","qx:qx/log/appender/Console.js","qx:qx/bom/Lifecycle.js"]}},
  urisBefore : ["resource/cv/libs/sprintf.js","resource/cv/libs/Three.js"],
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

