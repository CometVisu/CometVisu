qx.Class.define('cv.plugins.diagram.Diagram', {
  extend: cv.plugins.diagram.AbstractDiagram,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this._init = true;
    this.base(arguments, props);
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    width: {
      check: "String",
      nullable: true
    },
    height: {
      check: "String",
      nullable: true
    }
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType) {
      return cv.plugins.diagram.AbstractDiagram.parse(xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
    },

    getAttributeToPropertyMappings: function() {
      return {
        width: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }},
        height: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }}
      };
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    _onDomReady: function() {
      if (!this.$$domReady) {
        var pageId = this.getParentPage().getPath();
        var broker = qx.event.message.Bus;

        // stop refreshing when page is left
        broker.subscribe("path." + pageId + ".exitingPageChange", function () {
          this._stopRefresh(this._timer);
        }, this);

        broker.subscribe("path." + pageId + ".beforePageChange", function () {
          if (!this._init) {
            this.loadDiagramData(this.plot, false, false);
          }
        }, this);

        broker.subscribe("path." + pageId + ".duringPageChange", function () {
          // create diagram when it's not already existing
          if (this._init) {
            this.initDiagram(false);
          }
          // start refreshing when page is entered
          this._startRefresh(this._timer);
        }, this);
        // initialize the diagram but don't make the initialization process wait for it
        // by using a deferred call
        new qx.util.DeferredCall(function() {
          if (!this._init) {
            this.loadDiagramData(this.plot, false, false);
          } else {
            this.initDiagram(false);
          }
        }, this).schedule();
        this.$$domReady = true;
      } else {
        console.log("diagram dom not ready yet");
      }
    },

    _getInnerDomString: function() {
      var
        classStr = this.getPreviewlabels() ? 'diagram_inline' : 'diagram_preview',
        styleStr = 'min-height: 40px' +
          (this.getWidth()  ? (';width:'  + this.getWidth() ) : ''             ) +
          (this.getHeight() ? (';height:' + this.getHeight()) : ';height: 100%');

      return '<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" style="' + styleStr + '">loading...</div></div>';
    },

    // overridden
    _action: function(ev) {
      if (this.getPopup()) {
        this.base(arguments, ev);
      }
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("diagram", statics);
    cv.ui.structure.WidgetFactory.registerClass("diagram", statics);
  }
});