(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.basic.Image": {},
      "qx.bom.element.Style": {},
      "qx.ui.mobile.basic.Label": {},
      "qx.ui.mobile.container.Composite": {}
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
       * Gabriel Munteanu (gabios)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * A multi-purpose widget, which combines a label with an icon.
   *
   * The intended purpose of qx.ui.mobile.basic.Atom is to easily align the common icon-text
   * combination in different ways.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var atom = new qx.ui.mobile.basic.Atom("Icon Right", "icon/32/actions/go-next.png");
   *   this.getRoot().add(atom);
   * </pre>
   *
   * This example creates an atom with the label "Icon Right" and an icon.
   */
  qx.Class.define("qx.ui.mobile.basic.Atom", {
    extend: qx.ui.mobile.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.mobile.core.Widget.constructor.call(this);

      this.__P_333_0(label, icon);

      this.addCssClass("gap");
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "atom"
      },

      /** The label/caption/text of the qx.ui.mobile.basic.Atom instance */
      label: {
        apply: "_applyLabel",
        nullable: true,
        check: "String",
        event: "changeLabel"
      },

      /** Any URI String supported by qx.ui.mobile.basic.Image to display an icon */
      icon: {
        check: "String",
        apply: "_applyIcon",
        nullable: true,
        event: "changeIcon"
      },

      /**
       * Configure the visibility of the sub elements/widgets.
       * Possible values: both, text, icon
       */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        apply: "_applyShow"
      },

      /**
       * The position of the icon in relation to the text.
       * Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
       */
      iconPosition: {
        init: "left",
        check: ["top", "right", "bottom", "left"],
        apply: "_applyIconPosition"
      }
    },
    members: {
      __P_333_1: null,
      __P_333_2: null,
      __P_333_3: null,
      __P_333_4: null,
      // property apply
      _applyIconPosition: function _applyIconPosition(value, old) {
        var verticalLayout = ["top", "bottom"].indexOf(value) != -1;
        var hasNoLabel = !this.__P_333_2;

        this.__P_333_5(verticalLayout, hasNoLabel);

        var isReverse = ["right", "bottom"].indexOf(value) != -1;

        this.__P_333_4.setLayout(this.__P_333_1);

        this.__P_333_1.setReversed(isReverse);

        this._domUpdated();
      },
      // property apply
      _applyShow: function _applyShow(value, old) {
        if (this.__P_333_2) {
          if (value === 'both' || value === 'label') {
            this.__P_333_2.show();
          } else if (value === 'icon') {
            this.__P_333_2.exclude();
          }
        }

        if (this.__P_333_3) {
          if (value === 'both' || value === 'icon') {
            this.__P_333_3.show();
          } else if (value === 'label') {
            this.__P_333_3.exclude();
          }
        }
      },
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        if (this.__P_333_2) {
          this.__P_333_2.setValue(value);
        } else {
          this.__P_333_2 = this._createLabelWidget(value);
        }
      },
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        if (this.__P_333_3) {
          this.__P_333_3.setSource(value);
        } else {
          this.__P_333_3 = this._createIconWidget(value);
        }
      },

      /**
       * Takes care of lazily creating the layout and disposing an already
       * present layout if necessary.
       *
       * @param verticalLayout {Boolean} Whether icon and label should be vertically aligned.
       * @param hasNoLabel {Boolean} Whether the atom currently contains a label.
       */
      __P_333_5: function __P_333_5(verticalLayout, hasNoLabel) {
        if (verticalLayout || hasNoLabel) {
          if (this.__P_333_1) {
            if (this.__P_333_1.classname !== "qx.ui.mobile.layout.VBox") {
              this.__P_333_1.dispose();

              this.__P_333_1 = new qx.ui.mobile.layout.VBox();
            }
          } // layout == null
          else {
              this.__P_333_1 = new qx.ui.mobile.layout.VBox();
            }
        } // horizontal layout and has label
        else {
            if (this.__P_333_1) {
              if (this.__P_333_1.classname !== "qx.ui.mobile.layout.HBox") {
                this.__P_333_1.dispose();

                this.__P_333_1 = new qx.ui.mobile.layout.HBox();
              }
            } // layout == null
            else {
                this.__P_333_1 = new qx.ui.mobile.layout.HBox();
              }
          }
      },

      /**
       * Returns the icon widget.
       *
       * @return {qx.ui.mobile.basic.Image} The icon widget.
       */
      getIconWidget: function getIconWidget() {
        return this.__P_333_3;
      },

      /**
       * Returns the label widget.
       *
       * @return {qx.ui.mobile.basic.Label} The label widget.
       */
      getLabelWidget: function getLabelWidget() {
        return this.__P_333_2;
      },

      /**
       * Creates the icon widget.
       *
       * @param iconUrl {String} The icon url.
       * @return {qx.ui.mobile.basic.Image} The created icon widget.
       */
      _createIconWidget: function _createIconWidget(iconUrl) {
        var iconWidget = new qx.ui.mobile.basic.Image(iconUrl);
        qx.bom.element.Style.set(iconWidget.getContentElement(), "display", "block");
        iconWidget.setAnonymous(true);
        iconWidget.addCssClass("gap");
        return iconWidget;
      },

      /**
       * Creates the label widget.
       *
       * @param label {String} The text that should be displayed.
       * @return {qx.ui.mobile.basic.Label} The created label widget.
       */
      _createLabelWidget: function _createLabelWidget(label) {
        var labelWidget = new qx.ui.mobile.basic.Label(label);
        labelWidget.setAnonymous(true);
        labelWidget.setWrap(false);
        labelWidget.addCssClass("gap");
        return labelWidget;
      },

      /**
       * This function is responsible for creating and adding 2 children controls to the Button widget.
       * A label and an icon.
       * @param label {String} the text of the button
       * @param icon {String} A path to an image resource
       *
       */
      __P_333_0: function __P_333_0(label, icon) {
        this.__P_333_2 = this._createLabelWidget(label);

        if (label) {
          this.setLabel(label);
        }

        this.__P_333_3 = this._createIconWidget(icon);

        if (icon) {
          this.setIcon(icon);
        } else {
          this.__P_333_3.exclude();
        }

        var verticalLayout = ["top", "bottom"].indexOf(this.getIconPosition()) != -1; // If Atom has no Label, only Icon is shown, and should vertically centered.

        var hasNoLabel = !this.__P_333_2;

        this.__P_333_5(verticalLayout, hasNoLabel);

        if (this.__P_333_4) {
          this.__P_333_4.dispose();
        }

        this.__P_333_4 = new qx.ui.mobile.container.Composite(this.__P_333_1);

        this.__P_333_4.addCssClass("qx-flex-center");

        this.__P_333_4.setAnonymous(true);

        if (this.__P_333_3) {
          this.__P_333_4.add(this.__P_333_3);
        }

        if (this.__P_333_2) {
          this.__P_333_2.addCssClass("qx-flex-center");

          this.__P_333_4.add(this.__P_333_2);
        } // Show/Hide Label/Icon


        if (this.getShow() === 'icon' && this.__P_333_2) {
          this.__P_333_2.exclude();
        }

        if (this.getShow() === 'label' && this.__P_333_3) {
          this.__P_333_3.exclude();
        }

        this._add(this.__P_333_4);
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_333_1", "__P_333_2", "__P_333_3", "__P_333_4");
    }
  });
  qx.ui.mobile.basic.Atom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Atom.js.map?dt=1612698482449