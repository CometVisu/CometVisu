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
   * The simple qooxdoo decoration theme.
   */
  qx.Theme.define("osparc.theme.osparcdark.Decoration", {
    aliases: {
      decoration: "qx/decoration/Simple"
    },
    decorations: {
      /*
        ---------------------------------------------------------------------------
          MATERIAL TEXT FIELD
        ---------------------------------------------------------------------------
        */
      "material-textfield": {
        style: {
          styleBottom: "solid",
          widthBottom: 1,
          colorBottom: "material-textfield"
        }
      },
      "material-textfield-focused": {
        include: "material-textfield",
        style: {
          widthBottom: 2,
          colorBottom: "material-textfield-focused"
        }
      },
      "material-textfield-focused-invalid": {
        include: "material-textfield",
        style: {
          widthBottom: 2,
          colorBottom: "material-textfield-invalid"
        }
      },
      "material-textfield-invalid": {
        include: "material-textfield",
        style: {
          widthBottom: 1,
          colorBottom: "material-textfield-invalid"
        }
      },
      "material-textfield-disabled": {
        include: "material-textfield",
        style: {
          widthBottom: 1,
          colorBottom: "material-textfield-disabled"
        }
      },
      "material-textfield-readonly": {
        style: {}
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON
        ---------------------------------------------------------------------------
        */
      "material-button": {
        style: {
          radius: 2,
          backgroundColor: "material-button-background",
          shadowHorizontalLength: 0,
          shadowVerticalLength: [3, 2, 1],
          shadowBlurRadius: [1, 2, 5],
          shadowSpreadRadius: [-2, 0, 0],
          shadowColor: ["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.14)", "rgba(0, 0, 0, 0.12)"],
          transitionProperty: ["all"],
          transitionDuration: "0s"
        }
      },
      "material-button-hovered": {
        include: "material-button",
        style: {
          backgroundColor: "material-button-background-hovered",
          shadowVerticalLength: [2, 4, 1],
          shadowBlurRadius: [4, 5, 10],
          shadowSpreadRadius: [-1, 0, 0],
          transitionDuration: "0.2s"
        }
      },
      "material-button-pressed": {
        include: "material-button",
        style: {
          backgroundColor: "material-button-background-pressed",
          shadowVerticalLength: [5, 8, 3],
          shadowBlurRadius: [5, 10, 14],
          shadowSpreadRadius: [-3, 1, 2],
          transitionDuration: "0.2s"
        }
      },
      "material-button-disabled": {
        include: "material-button",
        style: {
          backgroundColor: "material-button-background-disabled"
        }
      },
      "material-button-left": {
        include: "material-button",
        style: {
          radius: [2, 0, 0, 2]
        }
      },
      "material-button-right": {
        include: "material-button",
        style: {
          radius: [0, 2, 2, 0]
        }
      },
      "material-button-hovered-left": {
        include: "material-button-hovered",
        style: {
          radius: [2, 0, 0, 2]
        }
      },
      "material-button-focused-left": {
        include: "material-button-hovered",
        style: {
          radius: [2, 0, 0, 2]
        }
      },
      "material-button-hovered-right": {
        include: "material-button-hovered",
        style: {
          radius: [0, 2, 2, 0]
        }
      },
      "material-button-focused-right": {
        include: "material-button-hovered",
        style: {
          radius: [0, 2, 2, 0]
        }
      },
      "material-button-pressed-left": {
        include: "material-button-pressed",
        style: {
          radius: [2, 0, 0, 2]
        }
      },
      "material-button-pressed-right": {
        include: "material-button-pressed",
        style: {
          radius: [0, 2, 2, 0]
        }
      },
      "material-button-disabled-left": {
        include: "material-button-disabled",
        style: {
          radius: [2, 0, 0, 2]
        }
      },
      "material-button-disabled-right": {
        include: "material-button-disabled",
        style: {
          radius: [0, 2, 2, 0]
        }
      },

      /*
        ---------------------------------------------------------------------------
          CORE
        ---------------------------------------------------------------------------
        */
      "border-blue": {
        style: {
          width: 4,
          color: "background-selected"
        }
      },
      "main": {
        style: {
          width: 1,
          color: "border"
        }
      },
      "main-top": {
        include: "main",
        style: {
          width: [1, 0, 0, 0]
        }
      },
      "main-right": {
        include: "main",
        style: {
          width: [0, 1, 0, 0]
        }
      },
      // eslint-disable-next-line no-dupe-keys
      "main-bottom": {
        include: "main",
        style: {
          width: [0, 0, 1, 0]
        }
      },
      "main-left": {
        include: "main",
        style: {
          width: [0, 0, 0, 1]
        }
      },
      "main-dark": {
        style: {
          width: 1,
          color: "button-border"
        }
      },
      "popup": {
        style: {
          width: 1,
          color: "window-border",
          shadowLength: 2,
          shadowBlurRadius: 5,
          shadowColor: "shadow"
        }
      },
      "dragover": {
        style: {
          bottom: [2, "solid", "dark-blue"]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON
        ---------------------------------------------------------------------------
        */
      "button-box": {
        style: {
          radius: 0,
          width: 0,
          color: "button-border",
          backgroundColor: "button-box"
        }
      },
      "button-box-pressed": {
        include: "button-box",
        style: {
          backgroundColor: "button-box-pressed"
        }
      },
      "button-box-pressed-hovered": {
        include: "button-box-pressed",
        style: {
          color: "button-border-hovered"
        }
      },
      "button-box-hovered": {
        include: "button-box",
        style: {
          color: "button-border-hovered"
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON INVALID
        ---------------------------------------------------------------------------
        */
      "button-box-invalid": {
        include: "button-box",
        style: {
          color: "invalid"
        }
      },
      "button-box-pressed-invalid": {
        include: "button-box-pressed",
        style: {
          color: "invalid"
        }
      },
      "button-box-hovered-invalid": {
        include: "button-box-invalid"
      },
      "button-box-pressed-hovered-invalid": {
        include: "button-box-pressed-invalid"
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON FOCUSED
        ---------------------------------------------------------------------------
        */
      "button-box-focused": {
        include: "button-box",
        style: {
          color: "background-selected"
        }
      },
      "button-box-pressed-focused": {
        include: "button-box-pressed",
        style: {
          color: "background-selected"
        }
      },
      "button-box-hovered-focused": {
        include: "button-box-focused"
      },
      "button-box-pressed-hovered-focused": {
        include: "button-box-pressed-focused"
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON RIGHT
        ---------------------------------------------------------------------------
        */
      "button-box-right": {
        include: "button-box",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-right": {
        include: "button-box-pressed",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-hovered-right": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-hovered-right": {
        include: "button-box-hovered",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-focused-right": {
        include: "button-box-focused",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-hovered-focused-right": {
        include: "button-box-hovered-focused",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-focused-right": {
        include: "button-box-pressed-focused",
        style: {
          radius: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-hovered-focused-right": {
        include: "button-box-pressed-hovered-focused",
        style: {
          radius: [0, 1, 1, 0]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON BORDERLESS RIGHT
        ---------------------------------------------------------------------------
       "button-box-right-borderless":
          {
            include: "button-box",
             style:
              {
                radius: [0, 1, 1, 0],
                width: [1, 1, 1, 0]
              }
          },
       "button-box-pressed-right-borderless":
          {
            include: "button-box-pressed",
             style:
              {
                radius: [0, 1, 1, 0],
                width: [1, 1, 1, 0]
              }
          },
       "button-box-pressed-hovered-right-borderless":
          {
            include: "button-box-pressed-hovered",
             style:
              {
                radius: [0, 1, 1, 0],
                width: [1, 1, 1, 0]
              }
          },
       "button-box-hovered-right-borderless":
          {
            include: "button-box-hovered",
             style:
              {
                radius: [0, 1, 1, 0],
                width: [1, 1, 1, 0]
              }
          },
      */

      /*
        ---------------------------------------------------------------------------
          BUTTON TOP RIGHT
        ---------------------------------------------------------------------------
        */
      "button-box-top-right": {
        include: "button-box",
        style: {
          radius: [0, 1, 0, 0]
        }
      },
      "button-box-pressed-top-right": {
        include: "button-box-pressed",
        style: {
          radius: [0, 1, 0, 0]
        }
      },
      "button-box-pressed-hovered-top-right": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [0, 1, 0, 0]
        }
      },
      "button-box-hovered-top-right": {
        include: "button-box-hovered",
        style: {
          radius: [0, 1, 0, 0]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON BOTOM RIGHT
        ---------------------------------------------------------------------------
        */
      "button-box-bottom-right": {
        include: "button-box",
        style: {
          radius: [0, 0, 1, 0],
          width: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-bottom-right": {
        include: "button-box-pressed",
        style: {
          radius: [0, 0, 1, 0],
          width: [0, 1, 1, 0]
        }
      },
      "button-box-pressed-hovered-bottom-right": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [0, 0, 1, 0],
          width: [0, 1, 1, 0]
        }
      },
      "button-box-hovered-bottom-right": {
        include: "button-box-hovered",
        style: {
          radius: [0, 0, 1, 0],
          width: [0, 1, 1, 0]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON BOTOM LEFT
        ---------------------------------------------------------------------------
        */
      "button-box-bottom-left": {
        include: "button-box",
        style: {
          radius: [0, 0, 0, 1],
          width: [0, 0, 1, 1]
        }
      },
      "button-box-pressed-bottom-left": {
        include: "button-box-pressed",
        style: {
          radius: [0, 0, 0, 1],
          width: [0, 0, 1, 1]
        }
      },
      "button-box-pressed-hovered-bottom-left": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [0, 0, 0, 1],
          width: [0, 0, 1, 1]
        }
      },
      "button-box-hovered-bottom-left": {
        include: "button-box-hovered",
        style: {
          radius: [0, 0, 0, 1],
          width: [0, 0, 1, 1]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON TOP LEFT
        ---------------------------------------------------------------------------
        */
      "button-box-top-left": {
        include: "button-box",
        style: {
          radius: [1, 0, 0, 0],
          width: [1, 0, 0, 1]
        }
      },
      "button-box-pressed-top-left": {
        include: "button-box-pressed",
        style: {
          radius: [1, 0, 0, 0],
          width: [1, 0, 0, 1]
        }
      },
      "button-box-pressed-hovered-top-left": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [1, 0, 0, 0],
          width: [1, 0, 0, 1]
        }
      },
      "button-box-hovered-top-left": {
        include: "button-box-hovered",
        style: {
          radius: [1, 0, 0, 0],
          width: [1, 0, 0, 1]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON MIDDLE
        ---------------------------------------------------------------------------
        */
      "button-box-middle": {
        include: "button-box",
        style: {
          radius: 0,
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-middle": {
        include: "button-box-pressed",
        style: {
          radius: 0,
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-hovered-middle": {
        include: "button-box-pressed-hovered",
        style: {
          radius: 0,
          width: [1, 0, 1, 1]
        }
      },
      "button-box-hovered-middle": {
        include: "button-box-hovered",
        style: {
          radius: 0,
          width: [1, 0, 1, 1]
        }
      },

      /*
        ---------------------------------------------------------------------------
          BUTTON LEFT
        ---------------------------------------------------------------------------
        */
      "button-box-left": {
        include: "button-box",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-left": {
        include: "button-box-pressed",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-hovered-left": {
        include: "button-box-pressed-hovered",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-hovered-left": {
        include: "button-box-hovered",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-focused-left": {
        include: "button-box-focused",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-hovered-focused-left": {
        include: "button-box-hovered-focused",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-hovered-focused-left": {
        include: "button-box-pressed-hovered-focused",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },
      "button-box-pressed-focused-left": {
        include: "button-box-pressed-focused",
        style: {
          radius: [1, 0, 0, 1],
          width: [1, 0, 1, 1]
        }
      },

      /*
        ---------------------------------------------------------------------------
          SEPARATOR
        ---------------------------------------------------------------------------
        */
      "separator-horizontal": {
        style: {
          widthLeft: 1,
          colorLeft: "border-separator"
        }
      },
      "separator-vertical": {
        style: {
          widthTop: 1,
          colorTop: "border-separator"
        }
      },

      /*
        ---------------------------------------------------------------------------
          SCROLL KNOB
        ---------------------------------------------------------------------------
        */
      "scroll-knob": {
        style: {
          radius: 4,
          width: 0,
          color: "button-border",
          backgroundColor: "scrollbar-passive"
        }
      },
      "scroll-knob-pressed": {
        include: "scroll-knob",
        style: {
          backgroundColor: "scrollbar-active"
        }
      },
      "scroll-knob-hovered": {
        include: "scroll-knob"
      },
      "scroll-knob-pressed-hovered": {
        include: "scroll-knob-pressed"
      },

      /*
        ---------------------------------------------------------------------------
          HOVER BUTTON
        ---------------------------------------------------------------------------
        */
      "button-hover": {
        style: {
          backgroundColor: "button",
          radius: 1
        }
      },

      /*
        ---------------------------------------------------------------------------
          WINDOW
        ---------------------------------------------------------------------------
        */
      "window": {
        style: {
          width: 1,
          color: "window-border",
          innerWidth: 0,
          innerColor: "window-border-inner",
          shadowLength: 1,
          shadowBlurRadius: 3,
          shadowColor: "shadow",
          backgroundColor: "background-main"
        }
      },
      "window-active": {
        include: "window",
        style: {
          shadowLength: 2,
          shadowBlurRadius: 5
        }
      },
      "window-caption": {
        style: {
          width: [0, 0, 2, 0],
          color: "window-border-inner"
        }
      },

      /*
        ---------------------------------------------------------------------------
          GROUP BOX
        ---------------------------------------------------------------------------
        */
      "white-box": {
        style: {
          width: 1,
          radius: 2,
          color: "white-box-border",
          backgroundColor: "background-main"
        }
      },

      /*
        ---------------------------------------------------------------------------
          FRAME BOX
        ---------------------------------------------------------------------------
        */
      "border": {
        style: {
          width: 1,
          color: "border"
        }
      },
      "border-disabled": {
        style: {
          width: 1,
          color: "border-disabled"
        }
      },
      "border-focused": {
        style: {
          width: 1,
          color: "border-focused"
        }
      },
      "border-invalid": {
        style: {
          width: 1,
          color: "border-invalid"
        }
      },

      /*
        ---------------------------------------------------------------------------
          LIST ITEM
        ---------------------------------------------------------------------------
        */
      "lead-item": {
        style: {
          width: 1,
          style: "dotted",
          color: "border-lead"
        }
      },

      /*
        ---------------------------------------------------------------------------
          TOOL TIP
        ---------------------------------------------------------------------------
        */
      "tooltip": {
        style: {
          width: 1,
          color: "tooltip-text",
          shadowLength: 1,
          shadowBlurRadius: 2,
          shadowColor: "shadow"
        }
      },
      "tooltip-error": {
        style: {
          radius: 5,
          backgroundColor: "invalid"
        }
      },

      /*
        ---------------------------------------------------------------------------
          TOOLBAR
        ---------------------------------------------------------------------------
        */
      "toolbar-separator": {
        style: {
          widthLeft: 1,
          colorLeft: "button-border"
        }
      },
      "toolbar-button": {
        include: "material-button",
        style: {
          shadowHorizontalLength: 0,
          shadowVerticalLength: 0,
          shadowBlurRadius: 0,
          shadowSpreadRadius: 0
        }
      },
      "toolbar-button-hovered": {
        include: "material-button-hovered"
      },
      "toolbar-button-left": {
        include: "material-button-left",
        style: {
          shadowHorizontalLength: 0,
          shadowVerticalLength: 0,
          shadowBlurRadius: 0,
          shadowSpreadRadius: 0
        }
      },
      "toolbar-button-hovered-left": {
        include: "material-button-hovered-left"
      },
      "toolbar-button-right": {
        include: "material-button-right",
        style: {
          shadowHorizontalLength: 0,
          shadowVerticalLength: 0,
          shadowBlurRadius: 0,
          shadowSpreadRadius: 0
        }
      },
      "toolbar-button-hovered-right": {
        include: "material-button-hovered-right"
      },

      /*
        ---------------------------------------------------------------------------
          MENU
        ---------------------------------------------------------------------------
        */
      "menu-separator": {
        style: {
          widthTop: 1,
          colorTop: "background-selected"
        }
      },

      /*
        ---------------------------------------------------------------------------
          MENU BAR
        ---------------------------------------------------------------------------
        */
      "menubar-button-hovered": {
        style: {
          backgroundColor: "material-button-background-hovered"
        }
      },
      "menubar-button-pressed": {
        include: "menubar-button-hovered",
        style: {
          backgroundColor: "material-button-background-pressed"
        }
      },

      /*
        ---------------------------------------------------------------------------
          DATE CHOOSER
        ---------------------------------------------------------------------------
        */
      "datechooser-date-pane": {
        style: {
          widthTop: 1,
          colorTop: "gray",
          style: "solid"
        }
      },
      "datechooser-weekday": {
        style: {
          widthBottom: 1,
          colorBottom: "gray",
          style: "solid"
        }
      },
      "datechooser-week": {
        style: {
          widthRight: 1,
          colorRight: "gray",
          style: "solid"
        }
      },
      "datechooser-week-header": {
        style: {
          widthBottom: 1,
          colorBottom: "gray",
          widthRight: 1,
          colorRight: "gray",
          style: "solid"
        }
      },

      /*
        ---------------------------------------------------------------------------
          TAB VIEW
        ---------------------------------------------------------------------------
        */
      "tabview-page-button-top": {
        style: {
          width: [0, 0, 2, 0],
          backgroundColor: "tabview-button-background",
          color: "tabview-button-border"
        }
      },
      "tabview-page-button-bottom": {
        include: "tabview-page-button-top",
        style: {
          width: [2, 0, 0, 0]
        }
      },
      "tabview-page-button-left": {
        include: "tabview-page-button-top",
        style: {
          width: [0, 2, 0, 0]
        }
      },
      "tabview-page-button-right": {
        include: "tabview-page-button-top",
        style: {
          width: [0, 0, 0, 2]
        }
      },

      /*
        ---------------------------------------------------------------------------
          TABLE
        ---------------------------------------------------------------------------
        */
      "statusbar": {
        style: {
          widthTop: 1,
          colorTop: "background-selected",
          styleTop: "solid"
        }
      },
      "table-scroller-focus-indicator": {
        style: {
          width: 2,
          color: "table-focus-indicator",
          style: "solid"
        }
      },
      "table-header": {
        include: "button-box",
        style: {
          radius: 0,
          color: "table-header-border",
          width: [0, 0, 2, 0]
        }
      },
      "table-header-column-button": {
        include: "table-header"
      },
      "table-header-cell": {
        style: {}
      },
      "table-header-cell-first": {
        include: "table-header-cell"
      },
      "progressive-table-header": {
        include: "button-box",
        style: {
          radius: 0,
          width: [1, 0, 1, 1]
        }
      },
      "progressive-table-header-cell": {
        style: {
          widthRight: 1,
          color: "button-border"
        }
      },

      /*
        ---------------------------------------------------------------------------
          PROGRESSBAR
        ---------------------------------------------------------------------------
        */
      "progressbar": {
        style: {
          width: 1,
          color: "border-separator"
        }
      },

      /*
        ---------------------------------------------------------------------------
          RADIO BUTTON
        ---------------------------------------------------------------------------
        */
      "radiobutton": {
        style: {
          color: "text"
        }
      },

      /*
        ---------------------------------------------------------------------------
          CHECK BOX
        ---------------------------------------------------------------------------
        */
      "checkbox": {
        style: {
          color: "text"
        }
      }
    }
  });
  osparc.theme.osparcdark.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1588501557933