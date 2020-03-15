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
 * @asset(osparc/font/*.woff)
 * @asset(osparc/font/*.woff2)
 * @asset(osparc/font/*.eot)
 * @asset(osparc/font/*.ttf)
 */
/**
 * The simple qooxdoo font theme.
 */
qx.Theme.define("osparc.theme.osparcdark.Font", {
  fonts: {
    "default": {
      size: 13,
      family: ["sans-serif"],
      color: "text",
      sources: [
        {
          family: "Roboto",
          source: [
            "osparc/font/roboto-v18-latin_latin-ext-regular.eot",
            "osparc/font/roboto-v18-latin_latin-ext-regular.woff2",
            "osparc/font/roboto-v18-latin_latin-ext-regular.woff",
            "osparc/font/roboto-v18-latin_latin-ext-regular.ttf"
          ]
        }
      ]
    },

    "bold":
      {
        size: 13,
        family: ["sans-serif"],
        bold: true,
        color: "text",
        sources: [
          {
            family: "Roboto",
            source: [
              "osparc/font/roboto-v18-latin_latin-ext-700.eot",
              "osparc/font/roboto-v18-latin_latin-ext-700.woff2",
              "osparc/font/roboto-v18-latin_latin-ext-700.woff",
              "osparc/font/roboto-v18-latin_latin-ext-700.ttf"
            ]
          }
        ]
      },

    "headline":
      {
        size: 24,
        family: ["sans-serif"],
        color: "text",
        sources: [
          {
            family: "Roboto",
            source: [
              "osparc/font/roboto-v18-latin_latin-ext-regular.eot",
              "osparc/font/roboto-v18-latin_latin-ext-regular.woff2",
              "osparc/font/roboto-v18-latin_latin-ext-regular.woff",
              "osparc/font/roboto-v18-latin_latin-ext-regular.ttf"
            ]
          }
        ]
      },

    "small":
      {
        size: 12,
        family: ["sans-serif"],
        color: "text",
        sources: [
          {
            family: "Roboto",
            source: [
              "osparc/font/roboto-v18-latin_latin-ext-regular.eot",
              "osparc/font/roboto-v18-latin_latin-ext-regular.woff2",
              "osparc/font/roboto-v18-latin_latin-ext-regular.woff",
              "osparc/font/roboto-v18-latin_latin-ext-regular.ttf"
            ]
          }
        ]
      },

    "monospace":
      {
        size: 13,
        family: ["monospace"],
        color: "text",
        sources: [
          {
            family: "Roboto Mono",
            source: [
              "osparc/font/roboto-mono-v6-latin_latin-ext-regular.eot",
              "osparc/font/roboto-mono-v6-latin_latin-ext-regular.woff2",
              "osparc/font/roboto-mono-v6-latin_latin-ext-regular.woff",
              "osparc/font/roboto-mono-v6-latin_latin-ext-regular.ttf"
            ]
          }
        ]
      }
  }
});
