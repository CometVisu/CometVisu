(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {},
      "cv.svg.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * QX version of the svg use icon way of displaying the KNF-UF icons.
   */
  qx.Class.define('cv.ui.manager.viewer.SvgIcon', {
    extend: qx.ui.core.Widget,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(name) {
      qx.ui.core.Widget.constructor.call(this);

      if (name) {
        this.setName(name);
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      name: {
        check: 'String',
        nullable: true,
        apply: '_applyName'
      },
      appearance: {
        refine: true,
        init: 'cv-svg-icon'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_54_0: null,
      __P_54_1: null,
      _applyName: function _applyName(value) {
        if (value) {
          if (!this.__P_54_0) {
            this.__P_54_0 = qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg');
          }

          if (!this.__P_54_1.getDomElement()) {
            this.__P_54_1.addListenerOnce('appear', function () {
              this._applyName(value);
            }, this);

            return;
          } // qx.xml.Element.setAttributeNS(document, this.__useElement.getDomElement(), 'http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);


          this.__P_54_1.getDomElement().setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.__P_54_0 + '#kuf-' + value);
        } else {
          this.__P_54_1.removeAttribute('xlink:href');
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var svgElem = new cv.svg.Element('svg');
        this.__P_54_1 = new cv.svg.Element('use');
        svgElem.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgElem.add(this.__P_54_1);
        return svgElem;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_54_1 = null;
    }
  });
  cv.ui.manager.viewer.SvgIcon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SvgIcon.js.map?dt=1625668966827