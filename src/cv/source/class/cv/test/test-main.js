/**
 * Karma configuration
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var allTestFiles = [];
var TEST_REGEXP = /(spec|rest)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(file);
  }
});
console.log(allTestFiles);
window.__karma__.start();

// var packages = [
//       "source/script/cv.8efa60c138e0.js",
//       "../../../external/qooxdoo/framework/source/class/qx/Bootstrap.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/OOUtil.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/Environment.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/EcmaScript.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/String.js",
//       "../../../external/qooxdoo/framework/source/class/qx/dev/StackTrace.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/Date.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/Array.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/Function.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/Array.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/Type.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/Assert.js",
//       "../../../external/qooxdoo/framework/source/class/qx/type/BaseError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/AssertionError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Runtime.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/OperatingSystem.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Engine.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Browser.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/Json.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/String.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/Function.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/GlobalError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/WindowError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/GlobalError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/Mixin.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/Aspect.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/Object.js",
//       "../../../external/qooxdoo/framework/source/class/qx/Interface.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/normalize/Error.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/Property.js",
//       "../../../external/qooxdoo/framework/source/class/qx/Class.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/MBinding.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/SingleValueBinding.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/IListData.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/ValidationError.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/RingBuffer.js",
//       "../../../external/qooxdoo/framework/source/class/qx/log/appender/RingBuffer.js",
//       "../../../external/qooxdoo/framework/source/class/qx/log/Logger.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/ObjectRegistry.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/MLogging.js",
//       "../../../external/qooxdoo/framework/source/class/qx/dom/Node.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/IDisposable.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Event.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Style.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/CssTransition.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/Manager.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/Registration.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/MEvent.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/IEventDispatcher.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/MProperty.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/MAssert.js",
//       "../../../external/qooxdoo/framework/source/class/qx/core/Object.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/DisposeUtil.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Event.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/ObjectPool.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/Pool.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/dispatch/Direct.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/IEventHandler.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/handler/Object.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Data.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/DeferredCallManager.js",
//       "../../../external/qooxdoo/framework/source/class/qx/lang/Object.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/DeferredCall.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/marshal/MEventBubbling.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/Array.js",
//       "source/class/cv/xml/Parser.js",
//       "source/class/cv/oo/MMethodChaining.js",
//       "source/class/cv/Object.js",
//       "source/class/cv/TemplateEngine.js",
//       "source/class/cv/PagePartsHandler.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Selector.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Html.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Class.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Opacity.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Cursor.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/BoxSizing.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Clip.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Css.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Style.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Document.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Viewport.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/Function.js",
//       "source/class/cv/layout/ResizeHandler.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Attribute.js",
//       "source/class/cv/data/Model.js",
//       "../../../external/qooxdoo/framework/source/class/qx/dom/Element.js",
//       "source/class/cv/layout/Manager.js",
//       "source/class/cv/structure/pure/AbstractBasicWidget.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/Uri.js","source/class/cv/Config.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/element/Dataset.js",
//       "../../../external/qooxdoo/framework/source/class/qx/type/BaseArray.js",
//       "../../../external/qooxdoo/framework/source/class/qxWeb.js",
//       "source/class/cv/structure/WidgetFactory.js",
//       "source/class/cv/util/Tree.js", "../../../external/qooxdoo/framework/source/class/qx/dom/Hierarchy.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/Animation.js", "../../../external/qooxdoo/framework/source/class/qx/bom/client/Stylesheet.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/Stylesheet.js", "../../../external/qooxdoo/framework/source/class/qx/bom/client/CssAnimation.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/AnimationCss.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/Emitter.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/AnimationHandle.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/AnimationJs.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/CssTransform.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/Transform.js", "../../../external/qooxdoo/framework/source/class/qx/util/ColorUtil.js", "../../../external/qooxdoo/framework/source/class/qx/bom/AnimationFrame.js",
//       "source/class/cv/io/Mockup.js", "source/class/cv/io/Client.js", "source/class/cv/io/Watchdog.js", "../../../external/qooxdoo/framework/source/class/qx/io/request/AbstractRequest.js", "../../../external/qooxdoo/framework/source/class/qx/util/Request.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/Serializer.js", "../../../external/qooxdoo/framework/source/class/qx/util/PropertyUtil.js", "../../../external/qooxdoo/framework/source/class/qx/io/request/Xhr.js", "../../../external/qooxdoo/framework/source/class/qx/bom/request/Xhr.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Transport.js", "../../../external/qooxdoo/framework/source/class/qx/bom/client/Plugin.js", "../../../external/qooxdoo/framework/source/class/qx/xml/Document.js", "../../../external/qooxdoo/framework/source/class/qx/bom/client/Xml.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/ResponseParser.js", "source/class/cv/io/transport/LongPolling.js", "source/class/cv/io/transport/Sse.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/LibraryManager.js", "../../../external/qooxdoo/framework/source/class/qx/util/ResourceManager.js", "source/class/cv/xml/parser/Meta.js",
//       "source/class/cv/IconHandler.js", "source/class/cv/util/IconTools.js", "source/class/cv/IconConfig.js", "source/class/cv/ui/Mappings.js",
//       "source/class/cv/ui/Stylings.js", "../../../external/qooxdoo/framework/source/class/qx/util/DynamicScriptLoader.js", "../../../external/qooxdoo/framework/source/class/qx/bom/request/Script.js",
//       "source/class/cv/util/DynamicScriptLoader.js", "../../../external/qooxdoo/framework/source/class/qx/bom/client/Event.js", "../../../external/qooxdoo/framework/source/class/qx/bom/History.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/HashHistory.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/Iframe.js", "../../../external/qooxdoo/framework/source/class/qx/bom/Iframe.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/Timer.js", "../../../external/qooxdoo/framework/source/class/qx/event/Idle.js", "../../../external/qooxdoo/framework/source/class/qx/bom/IframeHistory.js", "../../../external/qooxdoo/framework/source/class/qx/bom/NativeHistory.js",
//       "source/class/cv/role/HasAddress.js", "source/class/cv/role/BasicUpdate.js", "source/class/cv/Transform.js", "source/class/cv/role/Update.js",
//       "source/class/cv/MessageBroker.js", "source/class/cv/role/HasChildren.js", "source/class/cv/role/HasStyling.js", "source/class/cv/structure/pure/AbstractWidget.js",
//       "source/class/cv/structure/pure/Page.js", "source/class/cv/PageHandler.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/Location.js", "../../../external/qooxdoo/framework/source/class/qx/bom/element/Dimension.js",
//       "../../../external/qooxdoo/framework/source/class/qx/data/store/Json.js", "../../../external/qooxdoo/framework/source/class/qx/data/marshal/IMarshaler.js", "../../../external/qooxdoo/framework/source/class/qx/data/marshal/Json.js", "../../../external/qooxdoo/framework/source/class/qx/util/ValueManager.js",
//       "../../../external/qooxdoo/framework/source/class/qx/util/AliasManager.js", "source/class/cv/role/Operate.js", "source/class/cv/structure/pure/Switch.js", "source/class/cv/role/Refresh.js",
//       "source/class/cv/structure/pure/Web.js", "source/class/cv/structure/pure/Text.js", "source/class/cv/structure/pure/Slide.js",
//       "source/class/cv/structure/pure/WidgetInfoAction.js", "source/class/cv/structure/pure/InfoAction.js", "source/class/cv/role/HasAnimatedButton.js",
//       "source/class/cv/structure/pure/Refresh.js", "source/class/cv/structure/pure/NavBar.js", "source/class/cv/structure/pure/Rgb.js",
//       "source/class/cv/structure/pure/Video.js", "source/class/cv/structure/pure/PageJump.js", "source/class/cv/structure/pure/Audio.js",
//       "source/class/cv/structure/pure/MultiTrigger.js", "source/class/cv/structure/pure/UrlTrigger.js",
//       "source/class/cv/structure/pure/Include.js", "source/class/cv/structure/pure/Group.js",
//       "source/class/cv/structure/pure/Break.js", "source/class/cv/structure/pure/Info.js",
//       "source/class/cv/structure/pure/Reload.js", "source/class/cv/structure/pure/Image.js",
//       "source/class/cv/structure/pure/Unknown.js", "source/class/cv/structure/pure/PushButton.js",
//       "source/class/cv/structure/pure/ImageTrigger.js", "source/class/cv/role/HandleLongpress.js",
//       "source/class/cv/structure/pure/InfoTrigger.js", "source/class/cv/structure/pure/Trigger.js",
//       "source/class/cv/structure/pure/Line.js", "source/class/cv/structure/pure/Toggle.js",
//       "source/class/cv/structure/pure/WgPluginInfo.js", "source/class/cv/structure/pure/DesignToggle.js",
//       "source/class/cv/structure/pure/PageLink.js", "source/class/cv/transforms/Knx.js", "source/class/cv/transforms/OpenHab.js",
//       "../../../external/qooxdoo/framework/source/class/qx/application/IApplication.js", "../../../external/qooxdoo/framework/source/class/qx/core/BaseInit.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Native.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/handler/Window.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/Application.js", "../../../external/qooxdoo/framework/source/class/qx/core/Init.js",
//       "../../../external/qooxdoo/framework/source/class/qx/application/Native.js", "source/class/cv/Application.js", "../../../external/qooxdoo/framework/source/class/qx/log/appender/Util.js", "../../../external/qooxdoo/framework/source/class/qx/log/appender/Native.js",
//       "../../../external/qooxdoo/framework/source/class/qx/bom/client/Device.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/PointerCore.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/dom/Custom.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/dom/Pointer.js", "../../../external/qooxdoo/framework/source/class/qx/event/dispatch/AbstractBubbling.js", "../../../external/qooxdoo/framework/source/class/qx/event/dispatch/DomBubbling.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Dom.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Mouse.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Pointer.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/Pointer.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Tap.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Track.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Swipe.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Rotate.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Roll.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/Pinch.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/GestureCore.js", "../../../external/qooxdoo/framework/source/class/qx/util/Wheel.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/handler/Gesture.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/UserAction.js", "../../../external/qooxdoo/framework/source/class/qx/event/handler/Keyboard.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/KeyInput.js", "../../../external/qooxdoo/framework/source/class/qx/event/type/KeySequence.js", "../../../external/qooxdoo/framework/source/class/qx/event/util/Keyboard.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/handler/Focus.js", "../../../external/qooxdoo/framework/source/class/qx/bom/Selection.js", "../../../external/qooxdoo/framework/source/class/qx/bom/Range.js", "../../../external/qooxdoo/framework/source/class/qx/util/StringSplit.js",
//       "../../../external/qooxdoo/framework/source/class/qx/event/type/Focus.js", "../../../external/qooxdoo/framework/source/class/qx/log/appender/Console.js", "../../../external/qooxdoo/framework/source/class/qx/bom/Lifecycle.js"];

// require.config({
//   // Karma serves files under /base, which is the basePath from your config file
//   baseUrl: '/base',
//
//   // dynamically load all test files
//   deps: allTestFiles,
//
//   // we have to kickoff jasmine, as it is asynchronous
//   callback: window.__karma__.start
// });

// qx.Class.define("cv.TestCase", {
//   extend: qx.dev.unit.TestCase,
//
//   members: {
//     run: function() {
//       var allTestFiles = [];
//       var TEST_REGEXP = /(spec|rest)\.js$/i;
//
//       // Get a list of all the test files to include
//       Object.keys(window.__karma__.files).forEach(function(file) {
//         if (TEST_REGEXP.test(file)) {
//           allTestFiles.push(file);
//         }
//       });
//       console.log(allTestFiles);
//
//       var loader = qx.util.DynamicScriptLoader(allTestFiles);
//       loader.addListenerOnce('ready', function() {
//         console.log("starting karma");
//         window.__karma__.start();
//       }, this);
//       loader.start();
//     }
//   },
//
//   defer: function() {
//     console.log("starting testcase");
//     var main = new cv.TestCase();
//     main.run();
//   }
// });