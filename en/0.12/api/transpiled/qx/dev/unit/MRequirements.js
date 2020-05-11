(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.MRequirementsBasic": {
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.bom.request.Xhr": {},
      "qx.lang.Function": {},
      "qx.lang.Json": {},
      "qx.core.Init": {},
      "qx.bom.client.Browser": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.OperatingSystem": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "ecmascript.function.async": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /* *********************************************************************
  ************************************************************************ */

  /**
   * Common requirement checks for unit tests. Example:
   *
   * <pre class="javascript">
   * testBackend : function()
   * {
   *   this.require(["http", "php"]); // test will be skipped unless all conditions are met
   *   // test code goes here
   * }
   * </pre>
   *
   * @use(feature-checks)
   * @ignore(qx.application.Standalone)
   * @ignore(qx.application.Inline)
   * @ignore(qx.application.Native)
   *
   * @asset(qx/test/xmlhttp/php_version.php)
   */
  qx.Mixin.define("qx.dev.unit.MRequirements", {
    include: [qx.dev.unit.MRequirementsBasic],

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Boolean} Result of {@link #hasPhp}. Stored as class member to avoid
       * repeating the check. */
      __hasPhp: null
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Checks if the application has been loaded over HTTP.
       *
       * @return {Boolean} <code>true</code> if HTTP is currently used
       */
      hasHttp: function hasHttp() {
        return document.location.protocol.indexOf("http") == 0;
      },

      /**
       * Checks if the server supports PHP.
       *
       * @return {Boolean} <code>true</code> if PHP is supported by the backend
       */
      hasPhp: function hasPhp() {
        if (qx.dev.unit.MRequirements.__hasPhp != null) {
          return qx.dev.unit.MRequirements.__hasPhp;
        }

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/xmlhttp/php_version.php");
        var req = new qx.bom.request.Xhr();
        req.onload = qx.lang.Function.bind(function () {
          try {
            qx.lang.Json.parse(req.responseText);
            qx.dev.unit.MRequirements.__hasPhp = true;
          } catch (ex) {
            qx.dev.unit.MRequirements.__hasPhp = false;
          }
        }, this);
        req.onerror = req.abort = qx.lang.Function.bind(function () {
          qx.dev.unit.MRequirements.__hasPhp = false;
        }, this);
        req.open("POST", url, false);

        try {
          req.send();
        } catch (ex) {
          qx.dev.unit.MRequirements.__hasPhp = false;
        }

        return qx.dev.unit.MRequirements.__hasPhp;
      },

      /**
       * Checks if the application extends qx.application.Standalone
       *
       * @return {Boolean} <code>true</code> if the application is a standalone (GUI)
       * application
       */
      hasGuiApp: function hasGuiApp() {
        try {
          return qx.core.Init.getApplication() instanceof qx.application.Standalone;
        } catch (ex) {
          return false;
        }
      },

      /**
       * Checks if the application extends qx.application.Inline
       *
       * @return {Boolean} <code>true</code> if the application is an inline application
       */
      hasInlineApp: function hasInlineApp() {
        try {
          return qx.core.Init.getApplication() instanceof qx.application.Inline;
        } catch (ex) {
          return false;
        }
      },

      /**
       * Checks if the application extends qx.application.Native
       *
       * @return {Boolean} <code>true</code> if the application is a native application
       */
      hasNativeApp: function hasNativeApp() {
        try {
          return qx.core.Init.getApplication() instanceof qx.application.Native;
        } catch (ex) {
          return false;
        }
      },

      /**
       * Checks if the application is running in Google Chrome
       *
       * @return {Boolean} <code>true</code> if the browser is Google Chrome
       */
      hasChrome: function hasChrome() {
        return qx.core.Environment.get("browser.name") === "chrome";
      },

      /**
       * Checks if the application is running in Firefox
       *
       * @return {Boolean} <code>true</code> if the browser is Firefox
       */
      hasFirefox: function hasFirefox() {
        return qx.core.Environment.get("browser.name") === "firefox";
      },

      /**
       * Checks if the application is running in a browser using the Gecko engine
       *
       * @return {Boolean} <code>true</code> if the browser engine is Mozilla Gecko
       */
      hasGecko: function hasGecko() {
        return qx.core.Environment.get("engine.name") == "gecko";
      },

      /**
       * Checks if the application is running in Internet Explorer
       *
       * @return {Boolean} <code>true</code> if the browser is Internet Explorer
       */
      hasIe: function hasIe() {
        return qx.core.Environment.get("browser.name") === "ie";
      },

      /**
       * Checks if the application is running in a browser using the MSHTML engine
       *
       * @return {Boolean} <code>true</code> if the browser engine is MSHTML
       */
      hasMshtml: function hasMshtml() {
        return qx.core.Environment.get("engine.name") == "mshtml";
      },

      /**
       * Checks if the application is running in a browser using the Opera engine
       *
       * @return {Boolean} <code>true</code> if the browser engine is Opera
       */
      hasOpera: function hasOpera() {
        return qx.core.Environment.get("engine.name") == "opera";
      },

      /**
       * Checks if the application is running in a browser using the Webkit engine
       *
       * @return {Boolean} <code>true</code> if the browser engine is Webkit
       */
      hasWebkit: function hasWebkit() {
        return qx.core.Environment.get("engine.name") == "webkit";
      },

      /**
       * Checks if the application is NOT running on OS X
       *
       * @return {Boolean} <code>true</code> if the operating system is NOT OX X
       */
      hasNoOsx: function hasNoOsx() {
        return qx.core.Environment.get("os.name") === "osx" ? false : true;
      },

      /**
       * Checks if the application is running on Windows 7
       *
       * @return {Boolean} <code>false</code> if operating system is Windows 7
       */
      hasNoWin7: function hasNoWin7() {
        var isWin7 = qx.core.Environment.get("os.name") === "win" && qx.core.Environment.get("os.version") === "7";
        return isWin7 ? false : true;
      },

      /**
       * Checks if the application is running on Windows 10
       *
       * @return {Boolean} <code>false</code> if operating system is Windows 10
       */
      hasNoWin10: function hasNoWin10() {
        var isWin10 = qx.core.Environment.get("os.name") === "win" && qx.core.Environment.get("os.version") === "10";
        return isWin10 ? false : true;
      },

      /**
       * Checks if the application is not running in a Google Chrome browser on Linux
       *
       * @return {Boolean} <code>true</code> if the browser is not Google Chrome on Linux
       */
      hasNoChromeOnLinux: function hasNoChromeOnLinux() {
        return qx.core.Environment.get("browser.name") === "chrome" && qx.core.Environment.get("os.name") === "linux" ? false : true;
      },

      /**
      * Checks if the application is running on a client supporting async functions
      *
      * @return {Boolean} <code>true</code> if the client supports async functions
      */
      hasAsyncFunctions: function hasAsyncFunctions() {
        return qx.core.Environment.get("ecmascript.function.async");
      }
    }
  });
  qx.dev.unit.MRequirements.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MRequirements.js.map?dt=1589222707318