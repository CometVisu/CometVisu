qx.Class.define('cv.plugins.diagram.Diagram', {
  extend: cv.plugins.diagram.AbstractDiagram,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this.base(arguments, props);
    this._init = true;
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
    getAttributeToPropertyMappings: function() {
      return {
        width: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }},
        height: { transform: function(value) {
          return value ? parseInt(value)+"px" : null;
        }}
      }
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    _onDomReady: function() {
      var pageId = this.getParentPage().getPath();
      var broker = qx.event.message.Bus;

      // stop refreshing when page is left
      broker.subscribe("path." + pageId + ".exitingPageChange", function() {
        this._stopRefresh(this._timer);
      }, this);

      broker.subscribe("path." + pageId + ".beforePageChange", function() {
        if( !this._init )
          this.loadDiagramData( this.plot, false, false );
      }, this);

      broker.subscribe("path." + pageId + ".duringPageChange", function() {
        // create diagram when it's not already existing
        if( this._init )
          this.initDiagram( false );

        // start refreshing when page is entered
        this._startRefresh(this._timer);
      }, this);
    },

    _getInnerDomString: function() {
      var
        classStr = this.getPreviewlabels() ? 'diagram_inline' : 'diagram_preview',
        styleStr = 'min-height: 40px'
          + (this.getWidth()  ? (';width:'  + this.getWidth() ) : ''             )
          + (this.getHeight() ? (';height:' + this.getHeight()) : ';height: 100%');

      return '<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" style="' + styleStr + '">loading...</div></div>';
    },

    // overridden
    _action: function(ev) {
      if (this.getPopup()) {
        this.base(arguments, ev);
      }
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("diagram", cv.plugins.diagram.Diagram);
    cv.xml.Parser.addHook("diagram", "after", cv.plugins.diagram.AbstractDiagram.afterParse, cv.plugins.diagram.AbstractDiagram);
  }
});