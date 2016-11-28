/**
 * This plugins integrates a simple link.
 *
 * @author Stefan Borchert [stefan@borchert.cc]
 * @since 2015
 */
qx.Class.define('cv.plugin.link.Main', {
  extend: cv.structure.pure.AbstractBasicWidget,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    cssClass: {
      check: "String",
      init: ''
    },
    text: {
      check: "String",
      init: ''
    },
    href: {
      check: "String",
      init: ''
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'class': {target: 'cssClass'},
        'text': {},
        'href': {}
      };
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    getDomString: function () {
      var classes = "link";
      if (this.getCssClass()) {
        classes += " "+this.getCssClass();
      }
      var href = this.getHref() ? ' href="'+this.getHref()+'"' : '';
      return '<a class="'+classes+'"'+href+'>' + this.getText() + '</a>';
    }
  },

  defer: function() {
    cv.xml.Parser.addHandler("link", cv.plugin.link.Main);
  }
});
