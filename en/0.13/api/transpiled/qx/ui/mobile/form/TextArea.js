(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.ui.mobile.form.MValue": {
        "require": true
      },
      "qx.ui.mobile.form.MText": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.mobile.form.MState": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.container.Scroll": {},
      "qx.ui.mobile.core.Root": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.mobile.nativescroll": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * The TextArea is a multi-line text input field.
   */
  qx.Class.define("qx.ui.mobile.form.TextArea", {
    extend: qx.ui.mobile.core.Widget,
    include: [qx.ui.mobile.form.MValue, qx.ui.mobile.form.MText, qx.ui.form.MForm, qx.ui.form.MModelProperty, qx.ui.mobile.form.MState],
    implement: [qx.ui.form.IField, qx.ui.form.IForm, qx.ui.form.IModel],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param value {var?null} The value of the widget.
     */
    construct: function construct(value) {
      qx.ui.mobile.core.Widget.constructor.call(this);
      if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
        this.addListener("appear", this._fixChildElementsHeight, this);
        this.addListener("input", this._fixChildElementsHeight, this);
        this.addListener("changeValue", this._fixChildElementsHeight, this);
      }
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
        init: "text-area"
      }
    },
    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "textarea";
      },
      /**
       * Synchronizes the elements.scrollHeight and its height.
       * Needed for making textArea scrollable.
       * @param evt {qx.event.type.Data} a custom event.
       */
      _fixChildElementsHeight: function _fixChildElementsHeight(evt) {
        this.getContentElement().style.height = "auto";
        this.getContentElement().style.height = this.getContentElement().scrollHeight + "px";
        var scroll = this.__P_412_0();
        if (scroll) {
          scroll.refresh();
        }
      },
      /**
       * Returns the parent scroll container of this widget.
       * @return {qx.ui.mobile.container.Scroll} the parent scroll container or <code>null</code>
       */
      __P_412_0: function __P_412_0() {
        var scroll = this;
        while (!(scroll instanceof qx.ui.mobile.container.Scroll)) {
          if (scroll.getLayoutParent) {
            var layoutParent = scroll.getLayoutParent();
            if (layoutParent == null || layoutParent instanceof qx.ui.mobile.core.Root) {
              return null;
            }
            scroll = layoutParent;
          } else {
            return null;
          }
        }
        return scroll;
      }
    },
    destruct: function destruct() {
      if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
        this.removeListener("appear", this._fixChildElementsHeight, this);
        this.removeListener("input", this._fixChildElementsHeight, this);
        this.removeListener("changeValue", this._fixChildElementsHeight, this);
      }
    }
  });
  qx.ui.mobile.form.TextArea.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextArea.js.map?dt=1704036776710