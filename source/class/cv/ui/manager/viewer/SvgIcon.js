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
  construct: function (name) {
    this.base(arguments);
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

    _applyName: function (value) {
      if (value) {
        if (!this.__spriteUrl) {
          this.__spriteUrl = qx.util.ResourceManager.getInstance().toUri('icon/knx-uf-iconset.svg');
        }
        if (!this.__useElement.getDomElement()) {
          this.__useElement.addListenerOnce('appear', function () {
            this._applyName(value);
          }, this);
          return;
        }
        // qx.xml.Element.setAttributeNS(document, this.__useElement.getDomElement(), 'http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);
        this.__useElement.getDomElement().setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);
      } else {
        this.__useElement.removeAttribute('xlink:href');
      }
    },

    // overridden
    _createContentElement : function() {
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
  destruct: function () {
    this.__useElement = null;
  }
});
