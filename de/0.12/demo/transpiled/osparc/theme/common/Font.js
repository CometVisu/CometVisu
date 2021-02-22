(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
    OSparc Dark Theme for Qooxdoo
  
    Copyright:
       2018 IT'IS Foundation
  
    License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
    Authors:
      * Tobias Oetiker (oetiker)
  
    Origin:
      This theme is based in large parts on the the Simple
      theme included with Qooxdoo.
  ************************************************************************ */

  /**
   * @asset(osparc/theme/font/*.woff)
   * @asset(osparc/theme/font/*.woff2)
   * @asset(osparc/theme/font/*.eot)
   * @asset(osparc/theme/font/*.ttf)
   */

  /**
   * The simple qooxdoo font theme.
   */
  qx.Theme.define("osparc.theme.common.Font", {
    fonts: {
      "default": {
        size: 13,
        family: ["sans-serif"],
        color: "text",
        sources: [{
          family: "Roboto",
          source: ["osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf"]
        }]
      },
      "bold": {
        size: 13,
        family: ["sans-serif"],
        bold: true,
        color: "text",
        sources: [{
          family: "Roboto",
          source: ["osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-700.eot", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-700.woff2", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-700.woff", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-700.ttf"]
        }]
      },
      "headline": {
        size: 24,
        family: ["sans-serif"],
        color: "text",
        sources: [{
          family: "Roboto",
          source: ["osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf"]
        }]
      },
      "small": {
        size: 12,
        family: ["sans-serif"],
        color: "text",
        sources: [{
          family: "Roboto",
          source: ["osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff", "osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf"]
        }]
      },
      "monospace": {
        size: 14,
        family: ["monospace"],
        color: "text",
        sources: [{
          family: "Roboto Mono",
          source: ["osparc/theme/font/Roboto/roboto-mono-v6-latin_latin-ext-regular.eot", "osparc/theme/font/Roboto/roboto-mono-v6-latin_latin-ext-regular.woff2", "osparc/theme/font/Roboto/roboto-mono-v6-latin_latin-ext-regular.woff", "osparc/theme/font/Roboto/roboto-mono-v6-latin_latin-ext-regular.ttf"]
        }]
      }
    }
  });
  osparc.theme.common.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1614016361698