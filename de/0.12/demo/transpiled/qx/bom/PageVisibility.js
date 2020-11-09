(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.bom.Event": {
        "construct": true
      },
      "qx.bom.Style": {}
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
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This class offers a constant API over the Page Visibility Spec:
   * http://www.w3.org/TR/page-visibility/
   *
   * It forwards all the browsers support and provides always a fallback which is
   * of course visible all the time.
   */
  qx.Bootstrap.define("qx.bom.PageVisibility", {
    extend: qx.event.Emitter,
    statics: {
      /**
       * Get an instance of the PageVisibility object using the default document.
       * @return {qx.bom.PageVisibility} An instance of this class.
       */
      getInstance: function getInstance() {
        if (!this.$$instance) {
          this.$$instance = new qx.bom.PageVisibility();
        }

        return this.$$instance;
      }
    },

    /**
     * @param document {document?} Optional document element.
     */
    construct: function construct(document) {
      this.__P_57_0 = document || window.document;

      this.__P_57_1();

      var self = this; // forward the event

      qx.bom.Event.addNativeListener(this.__P_57_0, this.__P_57_2, function (e) {
        self.emit("change", e);
      });
    },
    events: {
      /**
       * The change event for the page visibility.
       */
      "change": "Event"
    },
    members: {
      __P_57_0: null,
      __P_57_3: null,
      __P_57_4: null,
      __P_57_2: null,

      /**
       * Internal helper to feature check the attribute names and the event name.
       * As the event can not be detected using the on<name> attribute, we need
       * to guess the event name by checking for the hidden attribute.
       */
      __P_57_1: function __P_57_1() {
        var prefix = qx.bom.Style.VENDOR_PREFIXES; // check for the hidden attribute name

        for (var i = 0; i < prefix.length; i++) {
          var attr = prefix[i].toLowerCase() + "Hidden";

          if (this.__P_57_0[attr] != undefined) {
            this.__P_57_3 = attr; // also use the same prefix for the event name

            this.__P_57_2 = prefix[i].toLowerCase() + "visibilitychange";
            break;
          }
        }

        ; // check for the visibilityState attribute name

        for (var i = 0; i < prefix.length; i++) {
          var attr = prefix[i].toLowerCase() + "VisibilityState";

          if (this.__P_57_0[attr] != undefined) {
            this.__P_57_4 = attr;
            break;
          }
        }

        ; // use the non prefixed if not supported prefixed

        if (this.__P_57_3 == null) {
          this.__P_57_3 = "hidden";
          this.__P_57_2 = "visibilitychange";
        }

        if (this.__P_57_4 == null) {
          this.__P_57_4 = "visibilityState";
        }
      },

      /**
       * Returns weather the page is hidden or not. If we can not detect it,
       * <code>false</code> will always be returned.
       *
       * @return {Boolean} <code>true</code>, if the page is hidden
       */
      isHidden: function isHidden() {
        return !!this.__P_57_0[this.__P_57_3];
      },

      /**
       * Returns the visibility state of the page. If we can not detect it,
       * <code>"visible"</code> will always be returned.
       *
       * @return {String} The state of the page visibility.
       */
      getVisibilityState: function getVisibilityState() {
        return this.__P_57_0[this.__P_57_4] || "visible";
      }
    }
  });
  qx.bom.PageVisibility.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PageVisibility.js.map?dt=1604956069929