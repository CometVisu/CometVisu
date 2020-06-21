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
      // main
      "background-main": "#202020",
      "light-background": "#444",
      // window
      "window-caption-background": "background-main",
      "window-caption-background-active": "light-background",
      "window-caption-text": "text",
      "window-caption-text-active": "text-selected",
      // material-button
      "material-button-background": "#404040",
      "material-button-background-disabled": "#303030",
      "material-button-background-hovered": "#505050",
      "material-button-background-pressed": "#505050",
      "material-button-text-disabled": "text-disabled",
      "material-button-text": "text",
      // material-textfield
      "material-textfield": "#808080",
      "material-textfield-focused": "#e0e0e0",
      "material-textfield-disabled": "#555",
      "material-textfield-invalid": "#a04040",
      "invalid": "material-textfield-invalid",
      // backgrounds
      "background-selected": "#555",
      "background-selected-disabled": "#333",
      "background-selected-dark": "#444",
      "background-disabled": "background-main",
      "background-disabled-checked": "#333",
      "background-pane": "#222",
      // tabview
      "tabview-unselected": "#ffffff",
      "tabview-button-border": "#ffffff",
      "tabview-label-active-disabled": "#d9d9d9",
      "tabview-pane-background": "background-pane",
      "tabview-button-background": "transparent",
      // text colors
      "link": "#aaa",
      // scrollbar
      "scrollbar-passive": "#333",
      "scrollbar-active": "#444",
      // form
      "button": "#555",
      "button-border": "#666",
      "button-border-hovered": "#888",
      "button-box": "#444",
      "button-box-pressed": "#555",
      "border-lead": "#888888",
      // window
      "window-border": "#444",
      "window-border-inner": "#222",
      // group box
      "white-box-border": "#404040",
      // shadows
      "shadow": qx.core.Environment.get("css.rgba") ? "rgba(0, 0, 0, 0.4)" : "#666666",
      // borders
      // 'border-main' is an alias of 'background-selected' (compatibility reasons)
      "border": "#484848",
      "border-focused": "#B7B7B7",
      "border-invalid": "material-textfield-invalid",
      "border-disabled": "#222",
      // separator
      "border-separator": "#808080",
      // text
      "text": "#bfbfbf",
      "text-disabled": "#808080",
      "text-selected": "#f0f0f0",
      "text-placeholder": "#404040",
      // tooltip
      "tooltip": "#808080",
      "tooltip-text": "#f0f0f0",
      // table
      "table-header": "background-main",
      "table-header-foreground": "text",
      "table-header-border": "#888",
      "table-focus-indicator": "#757575",
      // used in table code
      "table-header-cell": "#202020",
      "table-row-background-focused-selected": "#565656",
      "table-row-background-focused": "#454545",
      "table-row-background-selected": "#565656",
      "table-row-background-even": "#202020",
      "table-row-background-odd": "#303030",
      // foreground
      "table-row-selected": "#f0f0f0",
      "table-row": "#bfbfbf",
      // table grid color
      "table-row-line": "#222",
      "table-column-line": "#222",
      // used in progressive code
      "progressive-table-header": "#AAAAAA",
      "progressive-table-row-background-even": "#202020",
      "progressive-table-row-background-odd": "#303030",
      "progressive-progressbar-background": "#000",
      "progressive-progressbar-indicator-done": "#222",
      "progressive-progressbar-indicator-undone": "#333",
      "progressive-progressbar-percent-background": "#000",
      "progressive-progressbar-percent-text": "#333"
    }
  });
  osparc.theme.osparcdark.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1592777115446