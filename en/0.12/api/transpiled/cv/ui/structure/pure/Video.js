(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Video.js 
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
   * Adds a video or live stream to the visu. Currently, most sources do not support this yet.
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.Video', {
    extend: cv.ui.structure.AbstractWidget,

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
      },
      src: {
        check: "String",
        init: ""
      },
      autoplay: {
        check: "Boolean",
        init: false
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
        // create the actor
        var style = '';

        if (this.getWidth()) {
          style += 'width:' + this.getWidth() + ';';
        }

        if (this.getHeight()) {
          style += 'height:' + this.getHeight() + ';';
        }

        if (style !== '') {
          style = 'style="' + style + '"';
        }

        var autoplay = this.isAutoplay() ? ' autoplay="autoplay"' : '';
        return '<div class="actor"><video src="' + this.getSrc() + '" ' + style + autoplay + '  controls="controls" /></div>';
      },
      // overridden
      getValueElement: function getValueElement() {
        return this.getDomElement().querySelector("video");
      },
      // overridden
      _applyVisible: function _applyVisible(value) {
        var video = this.getValueElement();

        if (video) {
          if (value === true && this.isAutoplay()) {
            video.play();
          } else {
            video.pause();
          }
        }
      }
    }
  });
  cv.ui.structure.pure.Video.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Video.js.map?dt=1587971381474