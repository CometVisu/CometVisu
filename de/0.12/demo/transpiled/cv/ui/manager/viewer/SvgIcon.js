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
      __spriteUrl: null,
      __useElement: null,
      _applyName: function _applyName(value) {
        if (value) {
          if (!this.__spriteUrl) {
            this.__spriteUrl = qx.util.ResourceManager.getInstance().toUri('icon/knx-uf-iconset.svg');
          }

          if (!this.__useElement.getDomElement()) {
            this.__useElement.addListenerOnce('appear', function () {
              this._applyName(value);
            }, this);

            return;
          } // qx.xml.Element.setAttributeNS(document, this.__useElement.getDomElement(), 'http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);


          this.__useElement.getDomElement().setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);
        } else {
          this.__useElement.removeAttribute('xlink:href');
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var svgElem = new cv.svg.Element('svg');
        this.__useElement = new cv.svg.Element('use');
        svgElem.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgElem.add(this.__useElement);
        return svgElem;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__useElement = null;
    }
  });
  cv.ui.manager.viewer.SvgIcon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SvgIcon.js.map?dt=1588502126508