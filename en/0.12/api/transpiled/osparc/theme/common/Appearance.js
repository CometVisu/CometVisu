(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "osparc.theme.common.Image": {}
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

  /* global osparc */

  /* eslint no-negated-condition: "off", no-nested-ternary: "off" */

  /* ************************************************************************
  
  
  ************************************************************************* */

  /**
   * The simple qooxdoo appearance theme.
   *
   * @asset(qx/icon/Tango/16/apps/office-calendar.png)
   * @asset(qx/icon/Tango/16/places/folder-open.png)
   * @asset(qx/icon/Tango/16/places/folder.png)
   * @asset(qx/icon/Tango/16/mimetypes/text-plain.png)
   * @asset(qx/icon/Tango/16/actions/view-refresh.png)
   * @asset(qx/icon/Tango/16/actions/window-close.png)
   * @asset(qx/icon/Tango/16/actions/dialog-cancel.png)
   * @asset(qx/icon/Tango/16/actions/dialog-ok.png)
   */
  qx.Theme.define("osparc.theme.common.Appearance", {
    appearances: {
      /*
      ---------------------------------------------------------------------------
        CORE
      ---------------------------------------------------------------------------
      */
      "widget": {},
      "label": {
        style: function style(states) {
          return {
            textColor: states.disabled ? "text-disabled" : undefined
          };
        }
      },
      "image": {
        style: function style(states) {
          return {
            opacity: !states.replacement && states.disabled ? 0.3 : undefined
          };
        }
      },
      "atom": {},
      "atom/label": "label",
      "atom/icon": "image",
      "root": {
        style: function style(states) {
          return {
            backgroundColor: "background-main",
            textColor: "text",
            font: "default"
          };
        }
      },
      "popup": {
        style: function style(states) {
          return {
            decorator: "popup",
            backgroundColor: "background-pane"
          };
        }
      },
      "tooltip": {
        include: "popup",
        style: function style(states) {
          return {
            backgroundColor: "tooltip",
            textColor: "tooltip-text",
            decorator: "tooltip",
            padding: [1, 3, 2, 3],
            offset: [10, 5, 5, 5]
          };
        }
      },
      "tooltip/atom": "atom",
      "tooltip-error": {
        include: "tooltip",
        style: function style(states) {
          return {
            textColor: "text-selected",
            showTimeout: 100,
            hideTimeout: 10000,
            decorator: "tooltip-error",
            font: "bold",
            backgroundColor: undefined
          };
        }
      },
      "tooltip-error/atom": "atom",
      "iframe": {
        style: function style(states) {
          return {
            backgroundColor: "white",
            decorator: "main-dark"
          };
        }
      },
      "move-frame": {
        style: function style(states) {
          return {
            decorator: "main-dark"
          };
        }
      },
      "resize-frame": "move-frame",
      "dragdrop-cursor": {
        style: function style(states) {
          var icon = "nodrop";

          if (states.copy) {
            icon = "copy";
          } else if (states.move) {
            icon = "move";
          } else if (states.alias) {
            icon = "alias";
          }

          return {
            source: osparc.theme.common.Image.URLS["cursor-" + icon],
            position: "right-top",
            offset: [2, 16, 2, 6]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        BUTTON
      ---------------------------------------------------------------------------
      */
      "button": {
        /* qx.ui.form.Button */
        alias: "material-button",
        include: "material-button",
        style: function style(states) {
          return {
            center: true
          };
        }
      },
      "material-button": {
        alias: "atom",
        style: function style(states) {
          var decorator = "material-button";

          if (!states.disabled) {
            if (states.pressed || states.checked) {
              decorator += "-pressed";
            } else if (states.hovered || states.focused) {
              decorator += "-hovered";
            }
          } else {
            decorator += "-disabled";
          }

          if (states.invalid && !states.disabled) {
            decorator += "-invalid";
          }

          return {
            decorator: decorator,
            padding: [3, 8],
            cursor: states.disabled ? undefined : "pointer",
            minWidth: 5,
            minHeight: 5
          };
        }
      },
      "material-button/label": {
        alias: "atom/label",
        style: function style(states) {
          return {
            textColor: states.disabled ? "material-button-text-disabled" : "material-button-text"
          };
        }
      },
      "button-frame": {
        alias: "atom",
        style: function style(states) {
          var decorator = "button-box";

          if (!states.disabled) {
            if (states.hovered && !states.pressed && !states.checked) {
              decorator = "button-box-hovered";
            } else if (states.hovered && (states.pressed || states.checked)) {
              decorator = "button-box-pressed-hovered";
            } else if (states.pressed || states.checked) {
              decorator = "button-box-pressed";
            }
          }

          if (states.invalid && !states.disabled) {
            decorator += "-invalid";
          } else if (states.focused) {
            decorator += "-focused";
          }

          return {
            decorator: decorator,
            padding: [3, 8],
            cursor: states.disabled ? undefined : "pointer",
            minWidth: 5,
            minHeight: 5
          };
        }
      },
      "button-frame/label": {
        alias: "atom/label",
        style: function style(states) {
          return {
            textColor: states.disabled ? "text-disabled" : undefined
          };
        }
      },
      "hover-button": {
        alias: "button",
        include: "button",
        style: function style(states) {
          return {
            decorator: states.hovered ? "button-hover" : undefined
          };
        }
      },
      "menubutton": {
        include: "button",
        alias: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-down"],
            iconPosition: "right"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TEXT FIELD
      ---------------------------------------------------------------------------
      */
      "material-textfield": {
        style: function style(states) {
          var textColor;

          if (states.disabled) {
            textColor = "text-disabled";
          } else if (states.showingPlaceholder) {
            textColor = "text-placeholder";
          } else {
            textColor = undefined;
          }

          var decorator;
          var padding;
          decorator = "material-textfield";
          padding = [3, 0, 4, 0];

          if (states.readonly) {
            decorator += "-readonly";
            padding = [3, 0, 5, 0];
          } else if (states.disabled) {
            decorator += "-disabled";
          } else if (states.focused) {
            decorator += "-focused";

            if (states.invalid) {
              decorator += "-invalid";
            }

            padding = [3, 0, 3, 0];
          } else if (states.invalid) {
            decorator += "-invalid";
          }

          return {
            decorator: decorator,
            padding: padding,
            textColor: textColor,
            backgroundColor: states.disabled ? "background-disabled" : "background-main"
          };
        }
      },
      "textfield": "material-textfield",
      "textarea": "textfield",
      "framebox": {
        style: function style(states) {
          var textColor;

          if (states.disabled) {
            textColor = "text-disabled";
          } else if (states.showingPlaceholder) {
            textColor = "text-placeholder";
          } else {
            textColor = undefined;
          }

          var decorator;
          var padding;

          if (states.disabled) {
            decorator = "border-disabled";
            padding = [1, 2];
          } else if (states.invalid) {
            decorator = "border-invalid";
            padding = [1, 2];
          } else if (states.focused) {
            decorator = "border-focused";
            padding = [1, 2];
          } else {
            padding = [1, 2];
            decorator = "border";
          }

          return {
            decorator: decorator,
            padding: padding,
            textColor: textColor,
            backgroundColor: states.disabled ? "background-disabled" : "background-main"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SPLIT BUTTON
      ---------------------------------------------------------------------------
      */
      "splitbutton": {},
      "splitbutton/button": {
        alias: "material-button",
        style: function style(states) {
          var decorator = "material-button";

          if (!states.disabled) {
            if (states.pressed || states.checked) {
              decorator += "-pressed";
            } else if (states.hovered) {
              decorator += "-hovered";
            } else if (states.focused) {
              decorator += "-focused";
            }
          } else {
            decorator += "-disabled";
          }

          decorator += "-left";
          return {
            decorator: decorator,
            padding: [3, 8],
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },
      "splitbutton/arrow": {
        alias: "material-button",
        style: function style(states) {
          var decorator = "material-button";

          if (!states.disabled) {
            if (states.pressed || states.checked) {
              decorator += "-pressed";
            } else if (states.focused) {
              decorator += "-focused";
            } else if (states.hovered) {
              decorator += "-hovered";
            }
          } else {
            decorator += "-disabled";
          }

          decorator += "-right";
          return {
            icon: osparc.theme.common.Image.URLS["arrow-down"],
            decorator: decorator,
            cursor: states.disabled ? undefined : "pointer",
            padding: [3, 4]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SLIDEBAR
      ---------------------------------------------------------------------------
      */
      "slidebar": {},
      "slidebar/scrollpane": {},
      "slidebar/content": {},
      "slidebar/button-forward": {
        alias: "button",
        include: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-" + (states.vertical ? "down" : "right")]
          };
        }
      },
      "slidebar/button-backward": {
        alias: "button",
        include: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-" + (states.vertical ? "up" : "left")]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TABLE
      ---------------------------------------------------------------------------
      */
      "table": "widget",
      "table/statusbar": {
        style: function style(states) {
          return {
            decorator: "statusbar",
            padding: [2, 5]
          };
        }
      },
      "table/column-button": {
        alias: "button",
        style: function style(states) {
          return {
            decorator: "table-header-column-button",
            textColor: "table-header-foreground",
            backgroundColor: "table-header",
            padding: 3,
            icon: osparc.theme.common.Image.URLS["select-column-order"]
          };
        }
      },
      "table-column-reset-button": {
        include: "menu-button",
        alias: "menu-button",
        style: function style() {
          return {
            decorator: "table-header-column-button",
            icon: "icon/16/actions/view-refresh.png"
          };
        }
      },
      "table-scroller/scrollbar-x": "scrollbar",
      "table-scroller/scrollbar-y": "scrollbar",
      "table-scroller": "widget",
      "table-scroller/header": {
        style: function style() {
          return {
            textColor: "table-header-foreground",
            backgroundColor: "table-header",
            decorator: "table-header"
          };
        }
      },
      "table-scroller/pane": {},
      "table-scroller/focus-indicator": {
        style: function style(states) {
          return {
            decorator: "main"
          };
        }
      },
      "table-scroller/resize-line": {
        style: function style(states) {
          return {
            backgroundColor: "button-border",
            width: 3
          };
        }
      },
      "table-header-cell": {
        alias: "atom",
        style: function style(states) {
          return {
            decorator: states.first ? "table-header-cell-first" : "table-header-cell",
            minWidth: 13,
            font: "bold",
            paddingTop: 3,
            paddingLeft: 5,
            cursor: states.disabled ? undefined : "pointer",
            sortIcon: states.sorted ? osparc.theme.common.Image.URLS["table-" + (states.sortedAscending ? "ascending" : "descending")] : undefined
          };
        }
      },
      "table-header-cell/icon": {
        include: "atom/icon",
        style: function style(states) {
          return {
            paddingRight: 5
          };
        }
      },
      "table-header-cell/sort-icon": {
        style: function style(states) {
          return {
            alignY: "middle",
            alignX: "right",
            paddingRight: 5
          };
        }
      },
      "table-editor-textfield": {
        include: "framebox",
        style: function style(states) {
          return {
            decorator: undefined,
            padding: [2, 2]
          };
        }
      },
      "table-editor-selectbox": {
        include: "selectbox",
        alias: "selectbox",
        style: function style(states) {
          return {
            padding: [0, 2]
          };
        }
      },
      "table-editor-combobox": {
        include: "combobox",
        alias: "combobox",
        style: function style(states) {
          return {
            decorator: undefined
          };
        }
      },
      "progressive-table-header": {
        style: function style(states) {
          return {
            decorator: "progressive-table-header"
          };
        }
      },
      "progressive-table-header-cell": {
        style: function style(states) {
          return {
            decorator: "progressive-table-header-cell",
            padding: [5, 6, 5, 6]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TREEVIRTUAL
      ---------------------------------------------------------------------------
      */
      "treevirtual": {
        include: "framebox",
        alias: "table",
        style: function style(states, superStyles) {
          return {
            padding: [superStyles.padding[0] + 2, superStyles.padding[1] + 1]
          };
        }
      },
      "treevirtual-folder": {
        style: function style(states) {
          return {
            icon: states.opened ? // the old treevirtual code can not use fonticons
            "icon/16/places/folder-open.png" : "icon/16/places/folder.png",
            opacity: states.drag ? 0.5 : undefined
          };
        }
      },
      "treevirtual-file": {
        include: "treevirtual-folder",
        alias: "treevirtual-folder",
        style: function style(states) {
          return {
            icon: "icon/16/mimetypes/text-plain.png",
            opacity: states.drag ? 0.5 : undefined
          };
        }
      },
      "treevirtual-line": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-line"]
          };
        }
      },
      "treevirtual-contract": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["tree-minus"]
          };
        }
      },
      "treevirtual-expand": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["tree-plus"]
          };
        }
      },
      "treevirtual-only-contract": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-minus-only"]
          };
        }
      },
      "treevirtual-only-expand": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-plus-only"]
          };
        }
      },
      "treevirtual-start-contract": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-minus-start"]
          };
        }
      },
      "treevirtual-start-expand": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-plus-start"]
          };
        }
      },
      "treevirtual-end-contract": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-minus-end"]
          };
        }
      },
      "treevirtual-end-expand": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-plus-end"]
          };
        }
      },
      "treevirtual-cross-contract": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-minus-cross"]
          };
        }
      },
      "treevirtual-cross-expand": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-plus-cross"]
          };
        }
      },
      "treevirtual-end": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-end"]
          };
        }
      },
      "treevirtual-cross": {
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["treevirtual-cross"]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        RESIZER
      ---------------------------------------------------------------------------
      */
      "resizer": {
        style: function style(states) {
          return {
            decorator: "main-dark"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SPLITPANE
      ---------------------------------------------------------------------------
      */
      "splitpane": {},
      "splitpane/splitter": {
        style: function style(states) {
          return {
            backgroundColor: "contrasted-background"
          };
        }
      },
      "splitpane/splitter/knob": {
        style: function style(states) {
          return {
            source: osparc.theme.common.Image.URLS["knob-" + (states.horizontal ? "horizontal" : "vertical")],
            padding: 0
          };
        }
      },
      "splitpane/slider": {
        style: function style(states) {
          return {
            backgroundColor: "material-button-background",
            opacity: 0.3
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        MENU
      ---------------------------------------------------------------------------
      */
      "menu": {
        style: function style(states) {
          var result = {
            backgroundColor: "background-main",
            decorator: "main",
            spacingX: 6,
            spacingY: 1,
            iconColumnWidth: 16,
            arrowColumnWidth: 4,
            padding: 1,
            placementModeY: states.submenu || states.contextmenu ? "best-fit" : "keep-align"
          };

          if (states.submenu) {
            result.position = "right-top";
            result.offset = [-2, -3];
          }

          if (states.contextmenu) {
            result.offset = 4;
          }

          return result;
        }
      },
      "menu/slidebar": "menu-slidebar",
      "menu-slidebar": "widget",
      "menu-slidebar-button": {
        style: function style(states) {
          return {
            backgroundColor: states.hovered ? "background-selected" : undefined,
            padding: 6,
            center: true
          };
        }
      },
      "menu-slidebar/button-backward": {
        include: "menu-slidebar-button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-up" + (states.hovered ? "-invert" : "")]
          };
        }
      },
      "menu-slidebar/button-forward": {
        include: "menu-slidebar-button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-down" + (states.hovered ? "-invert" : "")]
          };
        }
      },
      "menu-separator": {
        style: function style(states) {
          return {
            height: 0,
            decorator: "menu-separator",
            marginTop: 4,
            marginBottom: 4,
            marginLeft: 2,
            marginRight: 2
          };
        }
      },
      "menu-button": {
        alias: "atom",
        style: function style(states) {
          return {
            backgroundColor: states.selected ? "background-selected" : undefined,
            textColor: states.selected ? "text-selected" : "text",
            padding: [2, 6]
          };
        }
      },
      "menu-button/icon": {
        include: "image",
        style: function style(states) {
          return {
            alignY: "middle",
            textColor: states.selected ? "text-selected" : "text"
          };
        }
      },
      "menu-button/label": {
        include: "label",
        style: function style(states) {
          return {
            alignY: "middle",
            padding: 1
          };
        }
      },
      "menu-button/shortcut": {
        include: "label",
        style: function style(states) {
          return {
            alignY: "middle",
            marginLeft: 14,
            padding: 1
          };
        }
      },
      "menu-button/arrow": {
        include: "image",
        style: function style(states) {
          return {
            source: osparc.theme.common.Image.URLS["arrow-right" + (states.selected ? "-invert" : "")],
            alignY: "middle"
          };
        }
      },
      "menu-checkbox": {
        alias: "menu-button",
        include: "menu-button",
        style: function style(states) {
          var icon = "menu-checkbox";

          if (states.checked) {
            icon += "-checked";
          }

          return {
            icon: osparc.theme.common.Image.URLS[icon]
          };
        }
      },
      "menu-radiobutton": {
        alias: "menu-button",
        include: "menu-button",
        style: function style(states) {
          var icon = "menu-radiobutton";

          if (states.checked) {
            icon += "-checked";
          }

          return {
            icon: osparc.theme.common.Image.URLS[icon]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        MENU BAR
      ---------------------------------------------------------------------------
      */
      "menubar": {
        style: function style(states) {
          return {
            backgroundColor: "material-button-background",
            padding: [4, 2]
          };
        }
      },
      "menubar-button": {
        style: function style(states) {
          var decorator;
          var padding = [2, 6];

          if (!states.disabled) {
            if (states.pressed) {
              decorator = "menubar-button-pressed";
            } else if (states.hovered) {
              decorator = "menubar-button-hovered";
            }
          }

          return {
            padding: padding,
            cursor: states.disabled ? undefined : "pointer",
            textColor: "material-button-text",
            decorator: decorator
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        VIRTUAL WIDGETS
      ---------------------------------------------------------------------------
      */
      "virtual-list": "list",
      "virtual-list/row-layer": "row-layer",
      "row-layer": "widget",
      "column-layer": "widget",
      "group-item": {
        include: "label",
        alias: "label",
        style: function style(states) {
          return {
            padding: 4,
            backgroundColor: "#BABABA",
            textColor: "white",
            font: "bold"
          };
        }
      },
      "virtual-selectbox": "selectbox",
      "virtual-selectbox/dropdown": "popup",
      "virtual-selectbox/dropdown/list": {
        alias: "virtual-list"
      },
      "virtual-combobox": "combobox",
      "virtual-combobox/dropdown": "popup",
      "virtual-combobox/dropdown/list": {
        alias: "virtual-list"
      },
      "virtual-tree": {
        include: "tree",
        alias: "tree",
        style: function style(states) {
          return {
            itemHeight: 21
          };
        }
      },
      "virtual-tree-folder": "tree-folder",
      "virtual-tree-file": "tree-file",
      "cell": {
        style: function style(states) {
          return {
            backgroundColor: states.selected ? "table-row-background-selected" : "table-row-background-even",
            textColor: states.selected ? "text-selected" : "text",
            padding: [3, 6]
          };
        }
      },
      "cell-string": "cell",
      "cell-number": {
        include: "cell",
        style: function style(states) {
          return {
            textAlign: "right"
          };
        }
      },
      "cell-image": "cell",
      "cell-boolean": "cell",
      "cell-atom": "cell",
      "cell-date": "cell",
      "cell-html": "cell",

      /*
      ---------------------------------------------------------------------------
        SCROLLBAR
      ---------------------------------------------------------------------------
      */
      "scrollbar": {},
      "scrollbar/slider": {},
      "scrollbar/slider/knob": {
        style: function style(states) {
          var decorator = "scroll-knob";

          if (!states.disabled) {
            if (states.hovered && !states.pressed && !states.checked) {
              decorator = "scroll-knob-hovered";
            } else if (states.hovered && (states.pressed || states.checked)) {
              decorator = "scroll-knob-pressed-hovered";
            } else if (states.pressed || states.checked) {
              decorator = "scroll-knob-pressed";
            }
          }

          return {
            height: 8,
            width: 8,
            marginLeft: 2,
            marginTop: 2,
            cursor: states.disabled ? undefined : "pointer",
            decorator: decorator,
            minHeight: states.horizontal ? undefined : 30,
            minWidth: states.horizontal ? 30 : undefined
          };
        }
      },
      "scrollbar/button": {
        style: function style(states) {
          return {
            height: 0,
            width: 0,
            margin: [2, 2]
          };
        }
      },
      "scrollbar/button-begin": "scrollbar/button",
      "scrollbar/button-end": "scrollbar/button",

      /*
      ---------------------------------------------------------------------------
        SCROLLAREA
      ---------------------------------------------------------------------------
      */
      "scrollarea/corner": {
        style: function style(states) {
          return {
            backgroundColor: "background-main"
          };
        }
      },
      "scrollarea": "widget",
      "scrollarea/pane": "widget",
      "scrollarea/scrollbar-x": "scrollbar",
      "scrollarea/scrollbar-y": "scrollbar",

      /*
      ---------------------------------------------------------------------------
        RADIO BUTTON
      ---------------------------------------------------------------------------
      */
      "radiobutton": {
        style: function style(states) {
          var icon;

          if (states.checked) {
            icon = osparc.theme.common.Image.URLS["radiobutton-checked"]; // Checked
          } else {
            icon = osparc.theme.common.Image.URLS["radiobutton-unchecked"]; // Unchecked
          }

          var textColor = "text";

          if (states.disabled) {
            textColor = "text-disabled";
          } else if (states.invalid) {
            textColor = "invalid";
          }

          return {
            icon: icon,
            paddingTop: 2,
            textColor: textColor,
            gap: 6
          };
        }
      },
      "radiobutton/icon": {
        style: function style(states) {
          return {
            decorator: "radiobutton",
            padding: [2, 0, 0, 0]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        FORM
      ---------------------------------------------------------------------------
      */
      "form-renderer-label": {
        include: "label",
        style: function style() {
          return {
            paddingTop: 3
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        CHECK BOX
      ---------------------------------------------------------------------------
      */
      "checkbox": {
        alias: "atom",
        style: function style(states) {
          // The "disabled" icon is set to an icon **without** the -disabled
          // suffix on purpose. This is because the Image widget handles this
          // already by replacing the current image with a disabled version
          // (if available). If no disabled image is found, the opacity style
          // is used.
          var icon; // Checked

          if (states.checked) {
            icon = osparc.theme.common.Image.URLS["checkbox-checked"]; // Undetermined
          } else if (states.undetermined) {
            icon = osparc.theme.common.Image.URLS["checkbox-undetermined"]; // Unchecked
          } else {
            // empty icon
            icon = osparc.theme.common.Image.URLS["checkbox-blank"];
          }

          var textColor = "text";

          if (states.disabled) {
            textColor = "text-disabled";
          } else if (states.invalid) {
            textColor = "invalid";
          }

          return {
            icon: icon,
            textColor: textColor,
            gap: 6
          };
        }
      },
      "checkbox/icon": {
        style: function style(states) {
          return {
            decorator: "checkbox",
            padding: 0
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SPINNER
      ---------------------------------------------------------------------------
      */
      "spinner": {
        style: function style(states) {
          return {
            textColor: states.disabled ? "text-disabled" : undefined
          };
        }
      },
      "spinner/textfield": "textfield",
      "spinner/upbutton": {
        alias: "combobox/button",
        include: "combobox/button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-up-small"],
            decorator: undefined,
            width: 12,
            height: 6,
            padding: [-1, 0, 0, 0]
          };
        }
      },
      "spinner/downbutton": {
        alias: "combobox/button",
        include: "combobox/button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["arrow-down-small"],
            decorator: undefined,
            width: 12,
            height: 6,
            padding: [-1, 0, 0, 0]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SELECTBOX
      ---------------------------------------------------------------------------
      */
      "selectbox": "textfield",
      "selectbox/atom": "atom",
      "selectbox/popup": "popup",
      "selectbox/list": {
        alias: "list",
        include: "list",
        style: function style() {
          return {
            decorator: undefined
          };
        }
      },
      "selectbox/arrow": {
        include: "image",
        style: function style(states) {
          return {
            source: osparc.theme.common.Image.URLS["arrow-down"],
            paddingRight: 0,
            paddingLeft: 2,
            paddingTop: -3
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        COMBO BOX
      ---------------------------------------------------------------------------
      */
      "combobox": {},
      "combobox/button": {
        alias: "button-frame",
        include: "button-frame",
        style: function style(states) {
          var decorator = "material-textfield";

          if (states.focused) {
            decorator += "-focused";

            if (states.invalid) {
              decorator += "-invalid";
            }
          } else if (states.invalid) {
            decorator += "-invalid";
          } else if (states.disabled) {
            decorator += "-disabled";
          }

          return {
            backgroundColor: undefined,
            icon: osparc.theme.common.Image.URLS["arrow-down"],
            decorator: decorator,
            padding: [0, 0, 0, 0]
          };
        }
      },
      "combobox/popup": "popup",
      "combobox/list": {
        alias: "list",
        style: function style(states) {
          return {
            paddingRight: 2
          };
        }
      },
      "combobox/textfield": "textfield",

      /*
      ---------------------------------------------------------------------------
        DATEFIELD
      ---------------------------------------------------------------------------
      */
      "datefield": "textfield",
      "datefield/button": {
        alias: "combobox/button",
        include: "combobox/button",
        style: function style(states) {
          return {
            icon: "@MaterialIcons/calendar_today/14",
            padding: [0, 0, 0, 0],
            backgroundColor: undefined,
            decorator: undefined,
            width: 16
          };
        }
      },
      "datefield/textfield": {
        alias: "textfield",
        include: "textfield",
        style: function style(states) {
          return {
            decorator: undefined,
            padding: 0
          };
        }
      },
      "datefield/list": {
        alias: "datechooser",
        include: "datechooser",
        style: function style(states) {
          return {
            decorator: undefined
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        LIST
      ---------------------------------------------------------------------------
      */
      "list": {
        alias: "scrollarea",
        include: "framebox"
      },
      "listitem": {
        alias: "atom",
        style: function style(states) {
          var padding = [3, 5, 3, 5];

          if (states.lead) {
            padding = [2, 4, 2, 4];
          }

          if (states.dragover) {
            padding[2] -= 2;
          }

          var backgroundColor;

          if (states.selected) {
            backgroundColor = "background-selected";

            if (states.disabled) {
              backgroundColor += "-disabled";
            }
          }

          return {
            gap: 4,
            padding: padding,
            backgroundColor: backgroundColor,
            textColor: states.selected ? "text-selected" : undefined,
            decorator: states.lead ? "lead-item" : states.dragover ? "dragover" : undefined,
            opacity: states.drag ? 0.5 : undefined
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SLIDER
      ---------------------------------------------------------------------------
      */
      "slider": {
        style: function style(states) {
          var decorator;
          var padding;

          if (states.disabled) {
            decorator = "border-disabled";
            padding = [1, 2];
          } else if (states.invalid) {
            decorator = "border-invalid";
            padding = [1, 2];
          } else if (states.focused) {
            decorator = "border-focused";
            padding = [1, 2];
          } else {
            padding = [1, 2];
            decorator = "border";
          }

          return {
            decorator: decorator,
            padding: padding
          };
        }
      },
      "slider/knob": "scrollbar/slider/knob",

      /*
      ---------------------------------------------------------------------------
        GROUP BOX
      ---------------------------------------------------------------------------
      */
      "groupbox": {},
      "groupbox/legend": {
        alias: "atom",
        style: function style(states) {
          return {
            textColor: states.invalid ? "invalid" : undefined,
            padding: 5,
            margin: 4,
            font: "bold"
          };
        }
      },
      "groupbox/frame": {
        style: function style(states) {
          return {
            backgroundColor: "background-main",
            padding: [6, 9],
            margin: [18, 2, 2, 2],
            decorator: "white-box"
          };
        }
      },
      "check-groupbox": "groupbox",
      "check-groupbox/legend": {
        alias: "checkbox",
        include: "checkbox",
        style: function style(states) {
          return {
            textColor: states.invalid ? "invalid" : undefined,
            padding: 5,
            margin: 4,
            font: "bold"
          };
        }
      },
      "radio-groupbox": "groupbox",
      "radio-groupbox/legend": {
        alias: "radiobutton",
        include: "radiobutton",
        style: function style(states) {
          return {
            textColor: states.invalid ? "invalid" : undefined,
            padding: 5,
            margin: 4,
            font: "bold"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TREE
      ---------------------------------------------------------------------------
      */
      "tree-folder/open": {
        include: "image",
        style: function style(states) {
          return {
            source: states.opened ? osparc.theme.common.Image.URLS["tree-minus"] : osparc.theme.common.Image.URLS["tree-plus"],
            textColor: states.selected ? "text-selected" : "text"
          };
        }
      },
      "tree-folder": {
        style: function style(states) {
          var backgroundColor;

          if (states.selected) {
            backgroundColor = "background-selected";

            if (states.disabled) {
              backgroundColor += "-disabled";
            }
          }

          return {
            padding: [2, 8, 2, 5],
            icon: states.opened ? osparc.theme.common.Image.URLS["folder-open"] : osparc.theme.common.Image.URLS["folder"],
            backgroundColor: backgroundColor,
            textColor: states.selected ? "text-selected" : "text",
            iconOpened: osparc.theme.common.Image.URLS["folder-open"],
            opacity: states.drag ? 0.5 : undefined
          };
        }
      },
      "tree-folder/icon": {
        include: "image",
        style: function style(states) {
          return {
            padding: [0, 4, 0, 0],
            textColor: states.selected ? "text-selected" : "text"
          };
        }
      },
      "tree-folder/label": {
        style: function style(states) {
          return {
            padding: [1, 2],
            textColor: states.selected ? "text-selected" : "text"
          };
        }
      },
      "tree-file": {
        include: "tree-folder",
        alias: "tree-folder",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["file"]
          };
        }
      },
      "tree": {
        include: "list",
        alias: "list",
        style: function style(states) {
          return {
            contentPadding: [4, 1],
            padding: 1
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        WINDOW
      ---------------------------------------------------------------------------
      */
      "window": {
        style: function style(states) {
          return {
            contentPadding: [10, 10, 10, 10],
            backgroundColor: "background-main",
            decorator: states.maximized ? undefined : states.active ? "window-active" : "window"
          };
        }
      },
      "window-resize-frame": "resize-frame",
      "window/pane": {
        style: function style(states) {
          return {
            padding: 10
          };
        }
      },
      "window/captionbar": {
        style: function style(states) {
          return {
            backgroundColor: states.active ? "window-caption-background-active" : "window-caption-background",
            margin: 0,
            padding: 8,
            decorator: "window-caption"
          };
        }
      },
      "window/icon": {
        style: function style(states) {
          return {
            marginRight: 4,
            marginTop: 2
          };
        }
      },
      "window/title": {
        style: function style(states) {
          return {
            cursor: "default",
            font: states.active ? "bold" : "default",
            textColor: states.active ? "window-caption-text-active" : "window-caption-text",
            marginRight: 20,
            marginLeft: 4,
            alignY: "middle"
          };
        }
      },
      "window/minimize-button": {
        alias: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["window-minimize"] + "/18",
            padding: 0,
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },
      "window/restore-button": {
        alias: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["window-restore"] + "/18",
            padding: 0,
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },
      "window/maximize-button": {
        alias: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["window-maximize"] + "/18",
            padding: 0,
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },
      "window/close-button": {
        alias: "button",
        style: function style(states) {
          return {
            icon: osparc.theme.common.Image.URLS["window-close"] + "/18",
            padding: 0,
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },
      "window/statusbar": {
        style: function style(states) {
          return {
            decorator: "statusbar",
            padding: [2, 6]
          };
        }
      },
      "window/statusbar-text": "label",

      /*
      ---------------------------------------------------------------------------
        DATE CHOOSER
      ---------------------------------------------------------------------------
      */
      "datechooser": {
        style: function style(states) {
          return {
            decorator: "main",
            minWidth: 220
          };
        }
      },
      "datechooser/navigation-bar": {
        style: function style(states) {
          return {
            backgroundColor: "background-main",
            textColor: states.disabled ? "text-disabled" : states.invalid ? "invalid" : undefined,
            padding: [2, 10]
          };
        }
      },
      "datechooser/last-year-button-tooltip": "tooltip",
      "datechooser/last-month-button-tooltip": "tooltip",
      "datechooser/next-year-button-tooltip": "tooltip",
      "datechooser/next-month-button-tooltip": "tooltip",
      "datechooser/last-year-button": "datechooser/button",
      "datechooser/last-month-button": "datechooser/button",
      "datechooser/next-year-button": "datechooser/button",
      "datechooser/next-month-button": "datechooser/button",
      "datechooser/button/icon": {},
      "datechooser/button": {
        style: function style(states) {
          var result = {
            width: 17,
            show: "icon",
            cursor: states.disabled ? undefined : "pointer"
          };

          if (states.lastYear) {
            result.icon = osparc.theme.common.Image.URLS["arrow-rewind"];
          } else if (states.lastMonth) {
            result.icon = osparc.theme.common.Image.URLS["arrow-left"];
          } else if (states.nextYear) {
            result.icon = osparc.theme.common.Image.URLS["arrow-forward"];
          } else if (states.nextMonth) {
            result.icon = osparc.theme.common.Image.URLS["arrow-right"];
          }

          return result;
        }
      },
      "datechooser/month-year-label": {
        style: function style(states) {
          return {
            font: "bold",
            textAlign: "center"
          };
        }
      },
      "datechooser/date-pane": {
        style: function style(states) {
          return {
            decorator: "datechooser-date-pane",
            backgroundColor: "background-main"
          };
        }
      },
      "datechooser/weekday": {
        style: function style(states) {
          return {
            decorator: "datechooser-weekday",
            font: "bold",
            textAlign: "center",
            textColor: states.disabled ? "text-disabled" : states.weekend ? "background-selected-dark" : "background-main",
            backgroundColor: states.weekend ? "background-main" : "background-selected-dark",
            paddingTop: 2
          };
        }
      },
      "datechooser/day": {
        style: function style(states) {
          return {
            textAlign: "center",
            decorator: states.today ? "main" : undefined,
            textColor: states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-disabled" : undefined,
            backgroundColor: states.disabled ? undefined : states.selected ? "background-selected" : undefined,
            padding: states.today ? [1, 3] : [2, 4]
          };
        }
      },
      "datechooser/week": {
        style: function style(states) {
          return {
            textAlign: "center",
            textColor: "background-selected-dark",
            padding: [2, 4],
            decorator: states.header ? "datechooser-week-header" : "datechooser-week"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROGRESSBAR
      ---------------------------------------------------------------------------
      */
      "progressbar": {
        style: function style(states) {
          return {
            decorator: "progressbar",
            padding: 1,
            backgroundColor: "background-main",
            width: 200,
            height: 20
          };
        }
      },
      "progressbar/progress": {
        style: function style(states) {
          return {
            backgroundColor: states.disabled ? "background-disabled-checked" : "background-selected"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TOOLBAR
      ---------------------------------------------------------------------------
      */
      "toolbar": {
        style: function style(states) {
          return {
            backgroundColor: "material-button-background",
            padding: 0
          };
        }
      },
      "toolbar/part": {
        style: function style(states) {
          return {
            margin: [0, 15]
          };
        }
      },
      "toolbar/part/container": {},
      "toolbar/part/handle": {},
      "toolbar-separator": {
        style: function style(states) {
          return {
            decorator: undefined,
            margin: [7, 0],
            width: 4
          };
        }
      },
      "toolbar-button": {
        alias: "atom",
        style: function style(states) {
          // set the margin
          var margin = [7, 10];

          if (states.left || states.middle || states.right) {
            margin = [7, 3];
          }

          var decorator = "toolbar-button";

          if (states.hovered || states.pressed || states.checked) {
            decorator += "-hovered";
          }

          return {
            cursor: states.disabled ? undefined : "pointer",
            decorator: decorator,
            textColor: "material-button-text",
            margin: margin,
            padding: [3, 5]
          };
        }
      },
      "toolbar-menubutton": {
        alias: "toolbar-button",
        include: "toolbar-button",
        style: function style(states) {
          return {
            showArrow: true
          };
        }
      },
      "toolbar-menubutton/arrow": {
        alias: "image",
        include: "image",
        style: function style(states) {
          return {
            source: osparc.theme.common.Image.URLS["arrow-down"],
            cursor: states.disabled ? undefined : "pointer",
            padding: 0,
            textColor: "material-button-text",
            marginLeft: 2
          };
        }
      },
      "toolbar-splitbutton": {},
      "toolbar-splitbutton/button": {
        alias: "toolbar-button",
        include: "toolbar-button",
        style: function style(states) {
          // set the margin
          var margin = [7, 0, 7, 10];

          if (states.left || states.middle || states.right) {
            margin = [7, 0, 7, 3];
          }

          var decorator = "toolbar-button";

          if (states.hovered || states.pressed || states.focused || states.checked) {
            decorator += "-hovered";
          }

          decorator += "-left";
          return {
            decorator: decorator,
            margin: margin
          };
        }
      },
      "toolbar-splitbutton/arrow": {
        alias: "toolbar-button",
        include: "toolbar-button",
        style: function style(states) {
          // set the margin
          var margin = [7, 10, 7, 0];

          if (states.left || states.middle || states.right) {
            margin = [7, 3, 7, 0];
          }

          var decorator = "toolbar-button";

          if (states.hovered || states.pressed || states.focused || states.checked) {
            decorator += "-hovered";
          }

          decorator += "-right";
          return {
            icon: osparc.theme.common.Image.URLS["arrow-down"],
            decorator: decorator,
            margin: margin
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        TABVIEW
      ---------------------------------------------------------------------------
      */
      "tabview": {},
      "tabview/bar": {
        alias: "slidebar",
        style: function style(states) {
          var marginTop = 0;
          var marginRight = 0;
          var marginBottom = 0;
          var marginLeft = 0;

          if (states.barTop) {
            marginBottom -= 1;
          } else if (states.barBottom) {
            marginTop -= 1;
          } else if (states.barRight) {
            marginLeft -= 1;
          } else {
            marginRight -= 1;
          }

          return {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight
          };
        }
      },
      "tabview/bar/button-forward": {
        include: "slidebar/button-forward",
        alias: "slidebar/button-forward",
        style: function style(states) {
          if (states.barTop) {
            return {
              marginTop: 4,
              marginBottom: 2,
              decorator: null
            };
          } else if (states.barBottom) {
            return {
              marginTop: 2,
              marginBottom: 4,
              decorator: null
            };
          } else if (states.barLeft) {
            return {
              marginLeft: 4,
              marginRight: 2,
              decorator: null
            };
          }

          return {
            marginLeft: 2,
            marginRight: 4,
            decorator: null
          };
        }
      },
      "tabview/bar/button-backward": {
        include: "slidebar/button-backward",
        alias: "slidebar/button-backward",
        style: function style(states) {
          if (states.barTop) {
            return {
              marginTop: 4,
              marginBottom: 2,
              decorator: null
            };
          } else if (states.barBottom) {
            return {
              marginTop: 2,
              marginBottom: 4,
              decorator: null
            };
          } else if (states.barLeft) {
            return {
              marginLeft: 4,
              marginRight: 2,
              decorator: null
            };
          }

          return {
            marginLeft: 2,
            marginRight: 4,
            decorator: null
          };
        }
      },
      "tabview/pane": {
        style: function style(states) {
          var marginTop = 0;
          var marginBottom = 0;
          var marginLeft = 0;
          var marginRight = 0;
          var decorator;

          if (states.barTop) {
            marginTop = -1;
            decorator = "main-top";
          } else if (states.barBottom) {
            marginBottom = -1;
            decorator = "main-bottom";
          } else if (states.barLeft) {
            marginLeft = -1;
            decorator = "main-left";
          } else {
            marginRight = -1;
            decorator = "main-right";
          }

          return {
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            marginBottom: marginBottom,
            padding: 10,
            decorator: decorator,
            backgroundColor: "tabview-pane-background"
          };
        }
      },
      "tabview-page": "widget",
      "tabview-page/button": {
        style: function style(states) {
          var decorator;
          var padding; // default padding

          if (states.barTop || states.barBottom) {
            padding = [8, 16, 8, 13];
          } else if (states.barRight) {
            padding = [8, 8, 8, 12];
          } else if (states.barLeft) {
            padding = [8, 8, 8, 8];
          } // decorator


          if (states.checked) {
            if (states.barTop) {
              decorator = "tabview-page-button-top";
              padding[2] -= 2;
            } else if (states.barBottom) {
              decorator = "tabview-page-button-bottom";
              padding[0] -= 2;
            } else if (states.barRight) {
              decorator = "tabview-page-button-right";
              padding[3] -= 2;
            } else if (states.barLeft) {
              decorator = "tabview-page-button-left";
              padding[1] -= 2;
            }
          }

          return {
            zIndex: states.checked ? 10 : 5,
            decorator: decorator,
            textColor: states.disabled ? "text-disabled" : "text",
            font: states.checked ? "bold" : undefined,
            padding: padding,
            cursor: "pointer"
          };
        }
      },
      "tabview-page/button/label": {
        alias: "label",
        style: function style(states) {
          return {
            padding: [0, 1, 0, 1]
          };
        }
      },
      "tabview-page/button/icon": "image",
      "tabview-page/button/close-button": {
        alias: "atom",
        style: function style(states) {
          return {
            cursor: states.disabled ? undefined : "pointer",
            icon: osparc.theme.common.Image.URLS["tabview-close"]
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        COLOR POPUP
      ---------------------------------------------------------------------------
      */
      "colorpopup": {
        alias: "popup",
        include: "popup",
        style: function style(states) {
          return {
            padding: 5
          };
        }
      },
      "colorpopup/field": {
        style: function style(states) {
          return {
            margin: 2,
            width: 14,
            height: 14,
            backgroundColor: "background-main",
            decorator: "main-dark"
          };
        }
      },
      "colorpopup/selector-button": "button",
      "colorpopup/auto-button": "button",
      "colorpopup/preview-pane": "groupbox",
      "colorpopup/current-preview": {
        style: function style(state) {
          return {
            height: 20,
            padding: 4,
            marginLeft: 4,
            decorator: "main-dark",
            allowGrowX: true
          };
        }
      },
      "colorpopup/selected-preview": {
        style: function style(state) {
          return {
            height: 20,
            padding: 4,
            marginRight: 4,
            decorator: "main-dark",
            allowGrowX: true
          };
        }
      },
      "colorpopup/colorselector-okbutton": {
        alias: "button",
        include: "button",
        style: function style(states) {
          return {
            icon: "icon/16/actions/dialog-ok.png"
          };
        }
      },
      "colorpopup/colorselector-cancelbutton": {
        alias: "button",
        include: "button",
        style: function style(states) {
          return {
            icon: "icon/16/actions/dialog-cancel.png"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        COLOR SELECTOR
      ---------------------------------------------------------------------------
      */
      "colorselector": "widget",
      "colorselector/control-bar": "widget",
      "colorselector/visual-pane": "groupbox",
      "colorselector/control-pane": "widget",
      "colorselector/preset-grid": "widget",
      "colorselector/colorbucket": {
        style: function style(states) {
          return {
            decorator: "main-dark",
            width: 16,
            height: 16
          };
        }
      },
      "colorselector/preset-field-set": "groupbox",
      "colorselector/input-field-set": {
        include: "groupbox",
        alias: "groupbox",
        style: function style() {
          return {
            paddingTop: 12
          };
        }
      },
      "colorselector/preview-field-set": {
        include: "groupbox",
        alias: "groupbox",
        style: function style() {
          return {
            paddingTop: 12
          };
        }
      },
      "colorselector/hex-field-composite": "widget",
      "colorselector/hex-field": "textfield",
      "colorselector/rgb-spinner-composite": "widget",
      "colorselector/rgb-spinner-red": "spinner",
      "colorselector/rgb-spinner-green": "spinner",
      "colorselector/rgb-spinner-blue": "spinner",
      "colorselector/hsb-spinner-composite": "widget",
      "colorselector/hsb-spinner-hue": "spinner",
      "colorselector/hsb-spinner-saturation": "spinner",
      "colorselector/hsb-spinner-brightness": "spinner",
      "colorselector/preview-content-old": {
        style: function style(states) {
          return {
            decorator: "main-dark",
            width: 50,
            height: 25
          };
        }
      },
      "colorselector/preview-content-new": {
        style: function style(states) {
          return {
            decorator: "main-dark",
            backgroundColor: "white",
            width: 50,
            height: 25
          };
        }
      },
      "colorselector/hue-saturation-field": {
        style: function style(states) {
          return {
            decorator: "main-dark",
            margin: 5
          };
        }
      },
      "colorselector/brightness-field": {
        style: function style(states) {
          return {
            decorator: "main-dark",
            margin: [5, 7]
          };
        }
      },
      "colorselector/hue-saturation-pane": "widget",
      "colorselector/hue-saturation-handle": "widget",
      "colorselector/brightness-pane": "widget",
      "colorselector/brightness-handle": "widget",

      /*
      ---------------------------------------------------------------------------
        APPLICATION
      ---------------------------------------------------------------------------
      */
      "app-header": {
        style: function style(states) {
          return {
            font: "headline",
            textColor: "text-selected",
            backgroundColor: "background-selected-dark",
            padding: [8, 12]
          };
        }
      },
      "app-header-label": {
        style: function style(states) {
          return {
            paddingTop: 5
          };
        }
      },
      "app-splitpane": {
        alias: "splitpane",
        style: function style(states) {
          return {
            padding: [0, 10, 10, 10],
            backgroundColor: "contrasted-background"
          };
        }
      }
    }
  });
  osparc.theme.common.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1612690424099