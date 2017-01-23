/* PageHandler.js 
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
 * @author Christian Mayer
 * @since 2016
 */
// FIXME and TODO: This class is currently just a quick hack to get rid
// of the jQuery-Tools Scrollable. It should be enhanced to allow different
// page transition animations like blending, etc. pp.

qx.Class.define('cv.PageHandler', {
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

      var page = qx.bom.Selector.query('#' + target)[0];
      var pageWidget = cv.structure.WidgetFactory.getInstanceById(target);

      if( 0 === page.length ) {// check if page does exist
        return;
      }
      qx.event.message.Bus.dispatchByName("path."+target+".beforePageChange", target);

      var templateEngine = cv.TemplateEngine.getInstance();

      templateEngine.resetPageValues();

      templateEngine.currentPage = page;

      // qx.bom.element.Class.addClasses(page, ['pageActive',  'activePage']);// show new page

      qx.event.message.Bus.dispatchByName("path."+target+".duringPageChange", target);

      // update visibility of navbars, top-navigation, footer
      templateEngine.pagePartsHandler.updatePageParts( pageWidget, speed );

      // now the animation
      var leftStart = "0px", leftEnd = "0px";
      if( speed > 0 ) {
        // update reference, because the appearance might have changed
        page = qx.bom.Selector.query('#' + target)[0];
        var left = qx.bom.element.Location.getLeft(page);
        var currentPageWidth = qx.bom.element.Dimension.getWidth(qx.bom.Selector.query('#' + currentPath)[0]);
        var scrollLeft = left !== 0;
        // jump to the page on the left of the page we need to scroll to
        if (scrollLeft) {
          leftEnd = -currentPageWidth+"px";
        } else {
          leftStart = -left - currentPageWidth+"px";
        }
      }
      var pagesNode = qx.bom.Selector.query('#pages')[0];
      qx.bom.element.Style.set(pagesNode, 'left', leftStart);
      qx.bom.Selector.query('.activePage', pagesNode).forEach(function(elem) {
        qx.bom.element.Class.remove(elem, 'activePage');
      }, this);
      qx.bom.Selector.query('.pageActive', pagesNode).forEach(function(elem) {
        qx.bom.element.Class.remove(elem, 'pageActive');
      }, this);
      qx.bom.element.Class.addClasses(qx.bom.Selector.query('#' + target)[0], ['pageActive', 'activePage']);// show new page
      var animationConfig = {
        duration: speed,
        timing: this.getEasing(),
        keep: 100,
        keyFrames:  {
          0: { left: leftStart},
          100: { left: leftEnd}
        }
      };
      var finish = function() {
        // final stuff
        this.setCurrentPath(target);
        templateEngine.pagePartsHandler.updateTopNavigation( target );
        qx.bom.element.Style.set(pagesNode, 'left', 0 );
        if (currentPath !== '') {
          qx.event.message.Bus.dispatchByName("path." + currentPath + ".afterPageChange", currentPath);
          var oldPageWidget = cv.structure.WidgetFactory.getInstanceById(target);
          oldPageWidget.setVisible(false);
        }
        qx.event.message.Bus.dispatchByName("page." + target + ".appear", target);
        qx.event.message.Bus.dispatchByName("path.pageChanged", target);
        // get page widget and set it to visible

        pageWidget.setVisible(true);
      }.bind(this);
      if (speed === 0) {
        finish();
      } else {
        var animation = qx.bom.element.Animation.animate(pagesNode, animationConfig);
        animation.addListenerOnce("end", finish, this);
      }
    },

    setSpeed : function( newSpeed ) {
      this.speed = +newSpeed;
    },

    getIndex : function() {
      return qx.bom.Selector.query( '#pages > .page' ).indexOf(qx.bom.Selector.query('#' + this.getCurrentPath())[0]);
    }
  }
});