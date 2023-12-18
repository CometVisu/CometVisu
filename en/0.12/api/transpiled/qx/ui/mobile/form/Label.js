(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.client.Event": {
        "require": true
      },
      "qx.event.Registration": {},
      "qx.event.type.Tap": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.flexboxSyntax": {
          "className": "qx.bom.client.Css"
        },
        "event.dispatchevent": {
          "className": "qx.bom.client.Event"
        }
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
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The label widget displays a text or HTML content in form context.
   *
   * It uses the html tag <label>, for making it possible to set the
   * "for" attribute.
   *
   * The "for" attribute specifies which form element a label is bound to.
   * A tap on the label is forwarded to the bound element.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var checkBox = new qx.ui.mobile.form.CheckBox();
   *   var label = new qx.ui.mobile.form.Label("Label for CheckBox");
   *
   *   label.setLabelFor(checkBox.getId());
   *
   *   this.getRoot().add(label);
   *   this.getRoot().add(checkBox);
   * </pre>
   *
   * This example create a widget to display the label.
   *
   */
  qx.Class.define("qx.ui.mobile.form.Label", {
    extend: qx.ui.mobile.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param value {String?null} Text or HTML content to display
     */
    construct: function construct(value) {
      qx.ui.mobile.core.Widget.constructor.call(this);

      if (value) {
        this.setValue(value);
      }

      this.addCssClass("gap");

      this._setLayout(new qx.ui.mobile.layout.HBox().set({
        "alignY": "middle",
        "alignX": "left"
      }));

      this.initWrap();
      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
      this.addListener("tap", this._onTap, this);
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
        init: "label"
      },

      /**
       * Text or HTML content to display
       */
      value: {
        nullable: true,
        init: null,
        apply: "_applyValue",
        event: "changeValue"
      },
      // overridden
      anonymous: {
        refine: true,
        init: false
      },

      /**
       * Controls whether text wrap is activated or not.
       */
      wrap: {
        check: "Boolean",
        init: true,
        apply: "_applyWrap"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_361_0: null,
      // overridden
      _getTagName: function _getTagName() {
        return "label";
      },
      // property apply
      _applyValue: function _applyValue(value, old) {
        var html = value; // [BUG #7871] Bugfix for IE 10 for enabling word-wrap within a flexbox layout.

        if (qx.core.Environment.get("css.flexboxSyntax") === "flexbox") {
          html = "<p>" + value + "</p>";
        }

        this._setHtml(html);
      },
      // property apply
      _applyWrap: function _applyWrap(value, old) {
        if (value) {
          this.removeCssClass("no-wrap");
        } else {
          this.addCssClass("no-wrap");
        }
      },

      /**
      * Event handler for the <code>changeEnabled</code> event on the target.
      * @param evt {qx.event.type.Data} the changeEnabled event.
      */
      _changeEnabled: function _changeEnabled(evt) {
        if (evt) {
          this.setEnabled(evt.getData());
        }
      },

      /**
       * Setter for the "for" attribute of this label.
       * The "for" attribute specifies which form element a label is bound to.
       *
       * @param elementId {String} The id of the element the label is bound to.
       *
       */
      setLabelFor: function setLabelFor(elementId) {
        if (this.__P_361_0) {
          this.__P_361_0.removeListener("changeEnabled", this._changeEnabled, this);
        }

        this.__P_361_0 = qx.ui.mobile.core.Widget.getWidgetById(elementId);

        if (this.__P_361_0) {
          this.__P_361_0.addListener("changeEnabled", this._changeEnabled, this);

          this.setEnabled(this.__P_361_0.getEnabled());
        }

        this._setAttribute("for", elementId);
      },

      /**
       * Handler for <code>tap</code> event on the Label. This event will be delegated to target widget.
       * @param evt {qx.event.type.Pointer} The tap event.
       */
      _onTap: function _onTap(evt) {
        if (this.__P_361_0 && qx.core.Environment.get("event.dispatchevent")) {
          var target = this.__P_361_0.getContentElement();

          qx.event.Registration.fireEvent(target, "tap", qx.event.type.Tap, [evt.getNativeEvent(), target, null, true, true]);
        }
      },

      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      _onChangeLocale: function _onChangeLocale(e) {
        var content = this.getValue();

        if (content && content.translate) {
          this.setValue(content.translate());
        }
      }
    },
    destruct: function destruct() {
      this.removeListener("tap", this._onTap, this);

      if (this.__P_361_0) {
        this.__P_361_0.removeListener("changeEnabled", this._changeEnabled, this);

        this.__P_361_0 = null;
      }

      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }
    }
  });
  qx.ui.mobile.form.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1702895816992