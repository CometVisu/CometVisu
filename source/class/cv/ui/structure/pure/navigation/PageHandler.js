/* PageHandler.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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

qx.Class.define('cv.ui.structure.pure.navigation.PageHandler', {
  extend: qx.core.Object,

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    // time in milliseconds
    speed: {
      check: 'Number',
      init: 400
    },

    // name of the easing function
    easing: {
      check: 'string',
      init: 'ease'
    },

    currentPath: {
      check: 'String',
      init: ''
    },

    animationType: {
      check: ['slide', 'fade', 'flip', 'pop', 'swap', 'none'],
      init: 'slide'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    seekTo(target, speed) {
      if (!Number.isFinite(speed)) {
        speed = 0;
      }
      const currentPath = this.getCurrentPath();
      if (currentPath !== '') {
        qx.event.message.Bus.dispatchByName(
          'path.' + currentPath + '.exitingPageChange',
          currentPath,
          target
        );
      }

      const pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(target);

      if (!pageWidget || !pageWidget.getDomElement()) {
        // check if page does exist
        return;
      }
      qx.event.message.Bus.dispatchByName(
        'path.' + target + '.beforePageChange',
        target
      );

      const controller = cv.Application.structureController;

      controller.resetPageValues();

      controller.setCurrentPage(pageWidget);

      // update visibility of navbars, top-navigation, footer
      controller.pagePartsHandler.updatePageParts(pageWidget, speed);

      // now the animation
      let animationConfig = {};

      // update reference, because the appearance might have changed
      const oldPageWidget = currentPath
        ? cv.ui.structure.WidgetFactory.getInstanceById(currentPath)
        : null;

      let direction = null;
      let animationEnabled = speed > 0 && this.getAnimationType() !== 'none';

      // browser check
      if (
        qx.core.Environment.get('browser.name') === 'safari' &&
        parseInt(qx.core.Environment.get('browser.version')) <= 5
      ) {
        animationEnabled = false;
      }
      if (animationEnabled) {
        const currentDepth = currentPath.split('_').length;
        const targetDepth = target.split('_').length;
        direction = currentDepth <= targetDepth ? 'down' : 'up';
        animationConfig = this.__getAnimationConfig(direction);

        // show the new page (because animations do not work on hidden elements) + hide scrollbar
        Object.entries({
          display: 'block',
          overflow: 'hidden'
        }).forEach(function (key_value) {
          pageWidget.getDomElement().style[key_value[0]] = key_value[1];
        });
        // set it to visible
        pageWidget.setVisible(true);
      }

      if (!animationEnabled) {
        if (oldPageWidget) {
          this.__onLeavePage(oldPageWidget);
        }
        this.__onEnterPage(pageWidget, 0, true);
      } else {
        if (oldPageWidget) {
          const outAnim = qx.bom.element.Animation.animate(
            oldPageWidget.getDomElement(),
            animationConfig.leavePage,
            speed
          );

          oldPageWidget.getDomElement().style['overflow-y'] = 'hidden';
          outAnim.addListenerOnce('end', () => {
            this.__onLeavePage(oldPageWidget);
          });
        }
        const oldPos = window.getComputedStyle(
          pageWidget.getDomElement()
        ).position;
        pageWidget.getDomElement().style.position = 'absolute';
        qx.bom.AnimationFrame.request(function () {
          const animation = qx.bom.element.Animation.animate(
            pageWidget.getDomElement(),
            animationConfig.enterPage,
            speed
          );

          animation.addListenerOnce('end', () => {
            this.__onEnterPage(pageWidget, oldPos);
          });
        }, this);
      }
    },

    /**
     * Get the animation configs for the current animationType setting
     * @param direction {String} "up" or "down"
     */
    __getAnimationConfig(direction) {
      let inAnim;
      let outAnim;

      // try to find existing animation configuration
      const type = this.getAnimationType().toUpperCase();
      if (direction === 'up') {
        inAnim =
          qx.util.Animation[type + '_RIGHT_IN'] ||
          qx.util.Animation[type + '_IN'];
        outAnim =
          qx.util.Animation[type + '_RIGHT_OUT'] ||
          qx.util.Animation[type + '_OUT'];
      } else if (direction === 'down') {
        inAnim =
          qx.util.Animation[type + '_LEFT_IN'] ||
          qx.util.Animation[type + '_IN'];
        outAnim =
          qx.util.Animation[type + '_LEFT_OUT'] ||
          qx.util.Animation[type + '_OUT'];
      }
      if (!inAnim || !outAnim) {
        // fallback
        switch (this.getAnimationType()) {
          case 'slide':
            if (direction === 'up') {
              inAnim = qx.util.Animation.SLIDE_RIGHT_IN;
              outAnim = qx.util.Animation.SLIDE_RIGHT_OUT;
            } else {
              inAnim = qx.util.Animation.SLIDE_LEFT_IN;
              outAnim = qx.util.Animation.SLIDE_LEFT_OUT;
            }
            break;
        }
      }
      if (inAnim) {
        inAnim.timing = this.getEasing();
      }
      if (outAnim) {
        outAnim.timing = this.getEasing();
      }
      return {
        enterPage: inAnim,
        leavePage: outAnim
      };
    },

    /**
     * Cleanup after page has been left
     * @param oldPageWidget {cv.ui.structure.pure.Page}
     */
    __onLeavePage(oldPageWidget) {
      oldPageWidget
        .getDomElement()
        .classList.remove('pageActive', 'activePage');
      oldPageWidget.getDomElement().style.overflow = null;
      qx.event.message.Bus.dispatchByName(
        'path.' + oldPageWidget.getPath() + '.afterPageChange',
        oldPageWidget.getPath()
      );

      qx.event.message.Bus.dispatchByName(
        'path.pageLeft',
        oldPageWidget.getPath()
      );

      oldPageWidget.setVisible(false);
    },

    /**
     * Cleanup after page has been entered
     * @param pageWidget {cv.ui.structure.pure.Page}
     * @param oldPos {String} CSS-position value to set
     * @param updateVisibility {Boolean} set the visibility property of the page to true or do not change it
     */
    __onEnterPage(pageWidget, oldPos, updateVisibility) {
      const page = pageWidget.getDomElement();
      const target = pageWidget.getPath();
      page.classList.add('pageActive', 'activePage'); // show new page
      if (updateVisibility === true) {
        // set it to visible
        pageWidget.setVisible(true);
      }
      // final stuff
      this.setCurrentPath(target);
      cv.Application.structureController.pagePartsHandler.updateTopNavigation(
        target
      );

      qx.event.message.Bus.dispatchByName('page.' + target + '.appear', target);
      qx.event.message.Bus.dispatchByName('path.pageChanged', target);
      // show scrollbar after animation
      const styles = { overflow: null, display: null };
      if (oldPos) {
        styles.position = oldPos;
      }
      Object.entries(styles).forEach(function (key_value) {
        page.style[key_value[0]] = key_value[1];
      });
    }
  }
});
