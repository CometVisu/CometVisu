(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.io.BackendConnections": {},
      "cv.Transform": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Web.js
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
   * Adds an area to the visu, where external websites can be displayed.
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.Web', {
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.Update, cv.ui.common.Refresh],
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      width: {
        check: 'String',
        nullable: true
      },
      height: {
        check: 'String',
        nullable: true
      },
      frameborder: {
        check: 'Boolean',
        init: false
      },
      background: {
        check: 'String',
        nullable: true
      },
      scrolling: {
        check: ['auto', 'yes', 'no'],
        nullable: true
      },
      src: {
        check: 'String',
        nullable: true
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var webStyle = this.getStyle();
        if (webStyle !== '' && webStyle.startsWith('style="')) {
          webStyle = webStyle.substring(7, webStyle.length - 1);
        }
        if (this.getWidth()) {
          webStyle += 'width:' + this.getWidth() + ';';
        } else {
          // default width is 100% of widget space (fix bug #3175343 part 1)
          webStyle += 'width: 100%;';
        }
        if (this.getHeight()) {
          webStyle += 'height:' + this.getHeight() + ';';
        }
        if (this.getFrameborder() === false) {
          webStyle += 'border: 0px;';
        }
        if (this.getBackground()) {
          webStyle += 'background-color:' + this.getBackground() + ';';
        }
        if (webStyle !== '') {
          webStyle = 'style="' + webStyle + '"';
        }
        var scrolling = '';
        if (this.getScrolling()) {
          scrolling = 'scrolling="' + this.getScrolling() + '"';
        } // add scrolling parameter to iframe
        return '<div class="actor"><iframe src="' + this.getSrc() + '" ' + webStyle + scrolling + '></iframe></div>';
      },
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param address {String} KNX-GA or openHAB item name
       * @param data {var} incoming data (already transformed + mapped)
       */
      _update: function _update(address, data) {
        var addr = this.getAddress()[address];
        if (!addr) {
          return;
        }
        if (data === 1) {
          var iframe = this.getDomElement().querySelector('iframe');
          this.refreshAction(iframe, iframe.getAttribute('src'));
          // reset the value
          cv.io.BackendConnections.getClient(addr.backendType).write(address, cv.Transform.encode(addr, 0));
        }
      }
    }
  });
  cv.ui.structure.pure.Web.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Web.js.map?dt=1726089032341