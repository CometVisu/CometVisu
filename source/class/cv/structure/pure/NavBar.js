/* NavBar.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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


/**
 * With the widget navbar, you can add a navigation menu to the entire visu.
 * The menu can be displayed on a page (top, bottom, left, right).
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.NavBar', {
  extend: cv.structure.AbstractWidget,

  include: cv.role.HasChildren,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
  },
  
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _navbarTop: '',
    _navbarLeft: '',
    _navbarRight: '',
    _navbarBottom: '',

    createDefaultWidget: function (widgetType, n, path, flavour, pageType) {

      var classes = "navbar clearfix";
      if (qx.bom.element.Attribute.get(n, 'flavour')) {
        classes += " flavour_" + qx.bom.element.Attribute.get(n, 'flavour');
      }// sub design choice

      // store scope globally
      var id = path.split("_");
      id.pop();
      var pos = qx.bom.element.Attribute.get(n, 'position') || 'left';
      cv.data.Model.getInstance().setWidgetData(id.join('_') + '_' + pos + '_navbar', {
        'scope': parseFloat(qx.bom.element.Attribute.get(n, 'scope')) || -1
      });

      return cv.data.Model.getInstance().setWidgetData(cv.role.HasChildren.getStoragePath(n, path), {
        'path': path,
        'classes': classes,
        '$$type': widgetType
      });
    },

    getAttributeToPropertyMappings: function () {
      return {
        'scope': {"default": -1, transform: parseFloat},
        'name': {},
        'dynamic': {
          transform: function (value) {
            return value === "true";
          }
        },
        'width': {"default": "300"},
        'position': {"default": 'left'}
      };
    },

    /**
     * Called on setup.dom.finished event with high priority. Adds the navbar dom string
     * to the DOM-Tree
     */
    initializeNavbars: function() {
      ['Top', 'Left', 'Right', 'Bottom'].forEach(function(pos) {
        if (cv.structure.pure.NavBar['_navbar'+pos]) {
          var elem = qx.bom.Selector.query('#navbar'+pos)[0];
          if (elem) {
            elem.innerHTML += cv.structure.pure.NavBar['_navbar' + pos];
          }
        }
      }, this);
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    anonymous : {
      refine: true,
      init: true
    },
    name: {
      check: "String",
      nullable: true
    },
    scope: {
      check: "Number",
      init: -1
    },
    width: {
      check: "String",
      init: "300"
    },
    position: {
      check: ["top", "left", "right", "bottom"], 
      init: 'left'
    },
    dynamic: {
      check: "Boolean", 
      init: false
    },
    visible: {
      refine: true,
      init: true
    }
  },
  
  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __navbarLeftSize: null,
    __navbarRightSize: null,

    // overridden
    _onDomReady: function() {
      var left = qx.bom.Selector.query('#navbarLeft')[0];
      var right = qx.bom.Selector.query('#navbarRight')[0];
      this.__navbarLeftSize = left ? qx.bom.element.Dataset.get(left, 'size') : 0;
      this.__navbarRightSize = right ? qx.bom.element.Dataset.get(right, 'size') : 0;
    },
    
    getGlobalPath: function () {
      var id = this.getPath().split("_");
      id.pop();
      return id.join('_') + '_' + this.getPosition() + '_navbar';
    },

    // overridden
    getDomString: function () {

      var container = '<div class="' + this.getClasses() + '" id="' + this.getGlobalPath() + '">';
      if (this.getName()) {
        container += '<h2>' + this.getName() + '</h2>';
      }
      container += this.getChildrenDomString();

      container += '</div>';

      var templateEngine = cv.TemplateEngine.getInstance();

      // add this to the navbars in DOM not inside the page
      switch (this.getPosition()) {
        case 'top':
          this.self(arguments)._navbarTop += container;
          break;

        case 'left':
          this.self(arguments)._navbarLeft += container;
          var thisSize = this.__navbarLeftSize || this.getWidth(); // FIXME - only a temporal solution
          if (this.isDynamic()) {
            templateEngine.pagePartsHandler.navbarSetSize('left', thisSize);
          }
          break;

        case 'right':
          this.self(arguments)._navbarRight += container;
          var thisSize = this.__navbarRightSize || this.getWidth(); // FIXME - only a temporal solution
          if (this.isDynamic()) {
            templateEngine.pagePartsHandler.navbarSetSize('right', thisSize);
          }
          break;

        case 'bottom':
          this.self(arguments)._navbarBottom += container;
          break;
      }
      templateEngine.pagePartsHandler.navbars[this.getPosition()].dynamic |= this.getDynamic();
      return '';
    }
  },
  
  defer: function() {
    cv.xml.Parser.addHandler("navbar", cv.structure.pure.NavBar);
    cv.xml.Parser.addHook("navbar", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", cv.structure.pure.NavBar.initializeNavbars, cv.structure.pure.NavBar, Number.POSITIVE_INFINITY);
  }
});