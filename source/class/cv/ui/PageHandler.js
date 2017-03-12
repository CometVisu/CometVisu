/* PageHandler.js 
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


/**
 * @author Christian Mayer
 * @since 2016
 */
// FIXME and TODO: This class is currently just a quick hack to get rid
// of the jQuery-Tools Scrollable. It should be enhanced to allow different
// page transition animations like blending, etc. pp.

qx.Class.define('cv.ui.PageHandler', {
  extend: qx.core.Object,

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    // time in milliseconds
    speed : {
      check: "Number",
      init: 400
    },
    // name of the easing function
    easing : {
      check: 'string',
      init: 'ease'
    },

    currentPath : {
      check: 'String',
      init: ''
    },

    animationType: {
      check: ["slide"],
      init: "slide"
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    seekTo : function( target, speed ) {
      if (isNaN(speed)) {
        speed = 0;
      }
      var currentPath = this.getCurrentPath();
      if (currentPath !== '') { qx.event.message.Bus.dispatchByName("path."+currentPath+".exitingPageChange", currentPath, target); }

      var pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(target);
      var page = pageWidget.getDomElement();

      if( 0 === page.length ) {// check if page does exist
        return;
      }
      qx.event.message.Bus.dispatchByName("path."+target+".beforePageChange", target);

      var templateEngine = cv.TemplateEngine.getInstance();

      templateEngine.resetPageValues();

      templateEngine.currentPage = pageWidget;

      qx.event.message.Bus.dispatchByName("path."+target+".duringPageChange", target);

      // update visibility of navbars, top-navigation, footer
      templateEngine.pagePartsHandler.updatePageParts( pageWidget, speed );

      // now the animation
      var animationConfig = null;

      // update reference, because the appearance might have changed
      var oldPageWidget = currentPath ? cv.ui.structure.WidgetFactory.getInstanceById(currentPath) : null;

      if( speed > 0 ) {
        var currentDepth = currentPath.split("_").length;
        var targetDepth = target.split("_").length;
        animationConfig = this.__getAnimationConfig(currentDepth<=targetDepth ? "down" : "up");

        // position the new page
        qx.bom.element.Style.setStyles(pageWidget.getDomElement(),
          qx.lang.Object.mergeWith(animationConfig.in.keyFrames["0"], {
            "display": "block",
            "overflow": "hidden"
          })
        );
      }

      if (speed === 0) {
        if (oldPageWidget) {
          this.__onLeavePage(oldPageWidget);
        }
        this.__onEnterPage(pageWidget);
      } else {
        if (oldPageWidget) {
          var oldAnim = qx.bom.element.Animation.animate(oldPageWidget.getDomElement(), animationConfig.out, speed);
          oldAnim.addListenerOnce("end", qx.lang.Function.curry(this.__onLeavePage, oldPageWidget), this);
        }
        var animation = qx.bom.element.Animation.animate(page, animationConfig["in"], speed);
        animation.addListenerOnce("end", qx.lang.Function.curry(this.__onEnterPage, pageWidget), this);
      }
    },

    /**
     * Get the animation configs for the current animationType setting
     * @param direction
     * @private
     */
    __getAnimationConfig: function(direction) {
      var inAnim, outAnim;
      switch (this.getAnimationType()) {

        case "slide":
          if (direction === "up") {
            inAnim = qx.util.Animation.SLIDE_RIGHT_IN;
            outAnim = qx.util.Animation.SLIDE_RIGHT_OUT;
          } else {
            inAnim = qx.util.Animation.SLIDE_LEFT_IN;
            outAnim = qx.util.Animation.SLIDE_LEFT_OUT;
          }
          inAnim.timing = this.getEasing();
          outAnim.timing = this.getEasing();
          break;
      }
      return {
        "in": inAnim,
        "out": outAnim
      };
    },

    /**
     * Cleanup after page has been left
     * @param oldPageWidget {cv.ui.structure.pure.Page}
     */
    __onLeavePage: function(oldPageWidget) {
      qx.bom.element.Class.removeClasses(oldPageWidget.getDomElement(), ['pageActive', 'activePage']);
      qx.event.message.Bus.dispatchByName("path." + oldPageWidget.getPath() + ".afterPageChange", oldPageWidget.getPath());
      oldPageWidget.setVisible(false);
    },

    /**
     * Cleanup after page has been entered
     * @param pageWidget {cv.ui.structure.pure.Page}
     */
    __onEnterPage: function(pageWidget) {
      var page = pageWidget.getDomElement();
      var target = pageWidget.getPath();
      qx.bom.element.Class.addClasses(page, ['pageActive', 'activePage']);// show new page
      // final stuff
      this.setCurrentPath(target);
      cv.TemplateEngine.getInstance().pagePartsHandler.updateTopNavigation( target );

      qx.event.message.Bus.dispatchByName("page." + target + ".appear", target);
      qx.event.message.Bus.dispatchByName("path.pageChanged", target);
      // show scrollbar after animation
      qx.bom.element.Style.setStyles(page, {"overflow": null, "display": null});

      // get page widget and set it to visible
      pageWidget.setVisible(true);
    },

    setSpeed : function( newSpeed ) {
      this.speed = +newSpeed;
    },

    getIndex : function() {
      return qx.bom.Selector.query( '#pages > .page' ).indexOf(qx.bom.Selector.query('#' + this.getCurrentPath())[0]);
    }
  }
});