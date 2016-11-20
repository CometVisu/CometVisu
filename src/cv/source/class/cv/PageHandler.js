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
  extend: cv.Object,

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
      init: 'ease-in-out'
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
      var currentPath = this.getCurrentPath();
      currentPath !== '' && cv.MessageBroker.getInstance().publish("path."+currentPath+".exitingPageChange", currentPath, target);

      var page = qx.bom.Selector.query('#' + target)[0];

      if( 0 === page.length ) // check if page does exist
        return;

      cv.MessageBroker.getInstance().publish("path."+target+".beforePageChange", target);

      var templateEngine = cv.TemplateEngine.getInstance();

      templateEngine.resetPageValues();

      templateEngine.currentPage = page;

      // qx.bom.element.Class.addClasses(page, ['pageActive',  'activePage']);// show new page

      cv.MessageBroker.getInstance().publish("path."+target+".duringPageChange", target);

      // update visibility of navbars, top-navigation, footer
      templateEngine.pagePartsHandler.updatePageParts( page, speed );

      // now the animation
      var leftStart = 0, leftEnd = 0;
      if( speed > 0 ) {
        // update reference, because the appearance might have changed
        page = qx.bom.Selector.query('#' + target)[0];
        var pageBounds = page.getBoundingClientRect();
        var scrollLeft = pageBounds.left != 0;
        // jump to the page on the left of the page we need to scroll to
        if (scrollLeft) {
          leftEnd = -pageBounds.width;
        } else {
          leftStart = -pageBounds.left - pageBounds.width;
        }
      }
      var pagesNode = qx.bom.Selector.query('#pages')[0];
      qx.bom.element.Style.set(pagesNode, 'left', leftStart);
      var animation = qx.bom.element.Animation.animate(pagesNode, {
        duration: speed,
        timing: this.getEasing(),
        keep: 100,
        keyFrames:  {
          0: { left: leftStart},
          100: { left: leftEnd}
        }
      });
      animation.addListenerOnce("end", function(){
        // final stuff
        this.setCurrentPath(target);
        templateEngine.pagePartsHandler.updateTopNavigation( target );
        qx.bom.Selector.query('.activePage', pagesNode).forEach(function(elem) {
          qx.bom.element.Class.remove(elem, 'activePage');
        }, this);
        qx.bom.Selector.query('.pageActive', pagesNode).forEach(function(elem) {
          qx.bom.element.Class.remove(elem, 'pageActive');
        }, this);
        qx.bom.element.Class.addClasses(qx.bom.Selector.query('#' + target)[0], ['pageActive', 'activePage']);// show new page
        qx.bom.element.Style.set(pagesNode, 'left', 0 );
        currentPath !== '' && cv.MessageBroker.getInstance().publish("path."+currentPath+".afterPageChange", currentPath);
        currentPath !== '' && cv.MessageBroker.getInstance().publish("path.pageChanged", target);
      }, this);
    },

    setSpeed : function( newSpeed ) {
      this.speed = +newSpeed;
    },

    getIndex : function() {
      return qx.bom.Selector.query( '#pages > .page' ).indexOf(qx.bom.Selector.query('#' + this.getCurrentPath())[0]);
    }
  }
});