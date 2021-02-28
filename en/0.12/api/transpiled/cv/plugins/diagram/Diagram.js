(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.plugins.diagram.AbstractDiagram": {
        "construct": true,
        "require": true
      },
      "qx.event.message.Bus": {},
      "qx.util.DeferredCall": {},
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Diagram.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */
  qx.Class.define('cv.plugins.diagram.Diagram', {
    extend: cv.plugins.diagram.AbstractDiagram,

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct(props) {
      this._init = true;
      cv.plugins.diagram.AbstractDiagram.constructor.call(this, props);
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
      parse: function parse(xml, path, flavour, pageType) {
        return cv.plugins.diagram.AbstractDiagram.parse(xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          width: {
            transform: function transform(value) {
              return value ? parseInt(value) + "px" : null;
            }
          },
          height: {
            transform: function transform(value) {
              return value ? parseInt(value) + "px" : null;
            }
          }
        };
      }
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      __P_20_0: null,
      _onDomReady: function _onDomReady() {
        if (!this.$$domReady) {
          var pageId = this.getParentPage().getPath();
          var broker = qx.event.message.Bus; // let the refresh only be active when this widget is visible

          this.setRestartOnVisible(true);
          broker.subscribe("path." + pageId + ".beforePageChange", function () {
            if (!this._init) {
              this.loadDiagramData(this.plot, false, false);
            }
          }, this);
          broker.subscribe("page." + pageId + ".appear", function () {
            // create diagram when it's not already existing
            if (this._init) {
              this.initDiagram(false);
            }
          }, this); // initialize the diagram but don't make the initialization process wait for it
          // by using a deferred call

          if (this.isVisible()) {
            new qx.util.DeferredCall(function () {
              if (!this._init) {
                this.loadDiagramData(this.plot, false, false);
              } else {
                this.initDiagram(false);
              }
            }, this).schedule();
          } else {
            this.__P_20_0 = this.addListener("changeVisible", function (ev) {
              if (ev.getData()) {
                if (!this._init) {
                  this.loadDiagramData(this.plot, false, false);
                } else {
                  this.initDiagram(false);
                }

                this.removeListenerById(this.__P_20_0);
                this.__P_20_0 = null;
              }
            }, this);
          }

          this.$$domReady = true;
          this.initListeners();
        }
      },
      _getInnerDomString: function _getInnerDomString() {
        var classStr = this.getPreviewlabels() ? 'diagram_inline' : 'diagram_preview',
            styleStr = 'min-height: 40px' + (this.getWidth() ? ';width:' + this.getWidth() : '') + (this.getHeight() ? ';height:' + this.getHeight() : ';height: 100%');
        return '<div class="actor clickable" style="height: 100%; min-height: 40px;"><div class="' + classStr + '" style="' + styleStr + '">loading...</div></div>';
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler("diagram", statics);
      cv.ui.structure.WidgetFactory.registerClass("diagram", statics);
    }
  });
  cv.plugins.diagram.Diagram.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Diagram.js.map?dt=1614551268023