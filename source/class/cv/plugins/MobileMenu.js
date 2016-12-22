/* structure_plugin.js 
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
 * @author alltime84
 * @since 2016
 */
qx.Class.define('cv.plugins.MobileMenu', {
  extend: cv.structure.AbstractWidget,
  include: [cv.role.HasChildren],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {

    getWidgetElements: function(xmlElement, path, flavour, type) {
      cv.data.Model.getInstance().setWidgetData( path+"_0", {
        containerClass           : "actor"
      });
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __navLeft : null,
    __isTouchDevice: null,

    // overridden
    getDomString: function() {
      if (window.innerWidth <= cv.Config.maxMobileScreenWidth){
        var navLeft = this.__navLeft = qx.bom.Selector.query('#navbarLeft')[0];
        if (!qx.bom.element.Class.has(navLeft, 'mobilemenu')){
          qx.bom.element.Class.add(navLeft, 'mobilemenu');
        }
        qx.bom.element.Style.set(navLeft, "display", "none");
        cv.MessageBroker.getInstance().subscribe("path.pageChanged", function() {
          var navbar = qx.bom.Selector.query('.navbar', navLeft)[0];
          var animation = qx.bom.element.Animation.animate(navbar, qx.util.Animation.SLIDE_LEFT_OUT);
          animation.addListenerOnce("end", function() {
            qx.bom.element.Style.set(navLeft, "display", "none");
          }, this);
        });

        return '<div class="clearfix mobilemenuTrigger">' + this.getChildrenDomString() + '</div>';
      } else {
        return '<div class="clearfix mobilemenuTrigger" style="display: none"></div>';
      }
    },

    _onDomReady: function() {
      if(this.isTouchDevice()){
        this.touchScroll("navbarLeft");
      }
    },

    _action: function() {
      if (window.innerWidth <= cv.Config.maxMobileScreenWidth){
        if(this.isTouchDevice()){
          qx.bom.element.Style.set(this.__navLeft, "display", "block");
          var navbar = qx.bom.Selector.query('.navbar.navbarActive', this.__navLeft)[0];
          qx.bom.element.Animation.animate(navbar, qx.util.Animation.SLIDE_LEFT_IN);
        }
      }
    },

    touchScroll: function(id){
      var scrollStartPos=0;

      var elem = qx.bom.Selector.query('#'+id)[0];
      qx.event.Registration.addListener(elem, "touchstart", function(event) {
        scrollStartPos=this.scrollTop+event.touches[0].pageY;
        event.preventDefault();
      }, false);

      qx.event.Registration.addListener(elem, "touchmove", function(event) {
        this.scrollTop=scrollStartPos-event.touches[0].pageY;
        event.preventDefault();
      },false);
    },

    isTouchDevice: function(){
      if (this.__isTouchDevice === null) {
        try {
          document.createEvent("TouchEvent");
          this.__isTouchDevice = true;
        } catch (e) {
          this.__isTouchDevice = false;
        }
      }
      return this.__isTouchDevice;
    }
  },

  // VisuDesign_Custom.prototype.addCreator("mobilemenu", {
  //   create: function(element, path, flavour, type) {
  //     var $e = $(element);
  //     var data = templateEngine.widgetDataInsert( path, {
  //       content           : getWidgetElements($e, path)
  //     } );
  // });

  defer: function() {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/mobilemenu/mobilemenu.css');
    cv.xml.Parser.addHandler("mobilemenu", cv.plugins.MobileMenu);
    // add parser hook for children
    cv.xml.Parser.addHook("mobilemenu", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
  }
});
