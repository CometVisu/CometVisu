(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.rgba": {
          "load": true,
          "className": "qx.bom.client.Css"
        }
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
   * Simple color theme
   */
  qx.Theme.define("osparc.theme.osparcdark.Color", {
    colors: {
      "c00": "#000000",
      // L=00
      "c01": "#202020",
      // L=13
      "c02": "#303030",
      // L=19
      "c03": "#404040",
      // L=25
      "c04": "#505050",
      // L=31
      "c05": "#606060",
      // L=38
      "c06": "#707070",
      // L=44
      "c07": "#808080",
      // L=50
      "c08": "#909090",
      // L=56
      "c09": "#A0A0A0",
      // L=63
      "c10": "#B0B0B0",
      // L=69
      "c11": "#C0C0C0",
      // L=75
      "c12": "#D0D0D0",
      // L=82
      "c13": "#EFEFEF",
      // L=88
      "c14": "#FFFFFF",
      // L=100
      "a-bit-transparent": "rgba(0, 0, 0, 0.4)",
      "invalid-red": "#a04040",
      // main
      "background-main": "c01",
      "background-main-lighter": "c02",
      "background-main-lighter+": "c03",
      "contrasted-background": "c04",
      "contrasted-background+": "c05",
      "contrasted-background++": "c06",
      // text
      "text": "c11",
      "text-disabled": "c07",
      "text-selected": "c12",
      "text-placeholder": "c07",
      "text-darker": "c07",
      "contrasted-text-dark": "c01",
      "contrasted-text-light": "c12",
      "link": "c08",
      // shadows
      "bg-shadow": "c06",
      "shadow": qx.core.Environment.get("css.rgba") ? "a-bit-transparent" : "bg-shadow",
      // window
      "window-caption-background": "c01",
      "window-caption-background-active": "c04",
      "window-caption-text": "c11",
      "window-caption-text-active": "c12",
      // material-button
      "material-button-background": "c03",
      "material-button-background-disabled": "c02",
      "material-button-background-hovered": "c05",
      "material-button-background-pressed": "c05",
      "material-button-text-disabled": "c07",
      "material-button-text": "c11",
      // material-textfield
      "material-textfield": "c07",
      "material-textfield-focused": "c11",
      "material-textfield-disabled": "c05",
      "material-textfield-invalid": "invalid-red",
      "invalid": "invalid-red",
      // backgrounds
      "background-selected": "c05",
      "background-selected-disabled": "c02",
      "background-selected-dark": "c04",
      "background-disabled": "c01",
      "background-disabled-checked": "c02",
      "background-pane": "c01",
      // tabview
      "tabview-unselected": "c14",
      "tabview-button-border": "c14",
      "tabview-label-active-disabled": "c10",
      "tabview-pane-background": "c01",
      "tabview-button-background": "transparent",
      // scrollbar
      "scrollbar-passive": "c02",
      "scrollbar-active": "c04",
      // form
      "button": "c05",
      "button-border": "c06",
      "button-border-hovered": "c07",
      "button-box": "c04",
      "button-box-pressed": "c05",
      "border-lead": "c07",
      // window
      "window-border": "c04",
      "window-border-inner": "c01",
      // group box
      "white-box-border": "c03",
      // borders
      // 'border-main' is an alias of 'background-selected' (compatibility reasons)
      "border": "c04",
      "border-focused": "c09",
      "border-invalid": "invalid-red",
      "border-disabled": "c01",
      // separator
      "border-separator": "c07",
      // tooltip
      "tooltip": "c07",
      "tooltip-text": "c12",
      // table
      "table-header": "c01",
      "table-header-foreground": "c09",
      "table-header-border": "c07",
      "table-focus-indicator": "c06",
      // used in table code
      "table-header-cell": "c01",
      "table-row-background-focused-selected": "c05",
      "table-row-background-focused": "c04",
      "table-row-background-selected": "c05",
      "table-row-background-even": "c01",
      "table-row-background-odd": "c01",
      // foreground
      "table-row-selected": "c12",
      "table-row": "c09",
      // table grid color
      "table-row-line": "c01",
      "table-column-line": "c01",
      // used in progressive code
      "progressive-table-header": "c08",
      "progressive-table-row-background-even": "c01",
      "progressive-table-row-background-odd": "c01",
      "progressive-progressbar-background": "c00",
      "progressive-progressbar-indicator-done": "c01",
      "progressive-progressbar-indicator-undone": "c02",
      "progressive-progressbar-percent-background": "c00",
      "progressive-progressbar-percent-text": "c02"
    }
  });
  osparc.theme.osparcdark.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1650225680884