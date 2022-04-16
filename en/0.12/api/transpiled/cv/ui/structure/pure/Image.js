(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.util.Uri": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Image.js 
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
   * Adds an image to your visualization. Using the auto-refresh setting this widget can be used e.g. to show
   * a camera picture.
   *
   * @widgetexample
   * <image src="resource/icons/CometVisu_orange.png" width="45px" height="32px">
   *   <layout colspan="2" />
   * </image>
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   * @asset(qx/static/blank.gif)
   */
  qx.Class.define('cv.ui.structure.pure.Image', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Refresh, cv.ui.common.Update],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      width: {
        check: 'String',
        init: '100%'
      },
      height: {
        check: 'String',
        nullable: true
      },
      cropTop: {
        check: 'String'
      },
      cropBottom: {
        check: 'String'
      },
      src: {
        check: 'String',
        init: ''
      },
      widthFit: {
        check: 'Boolean',
        init: false
      },
      placeholder: {
        check: ['none', 'src', 'hide', 'exclude'],
        init: 'none'
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_55_0: null,
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        // create the actor
        var imgStyle = '';

        if (this.getWidth()) {
          imgStyle += 'width:' + this.getWidth() + ';';
        }

        if (this.getWidthFit() === true) {
          imgStyle += 'max-width:100%;';
        }

        if (this.getHeight()) {
          imgStyle += 'height:' + this.getHeight() + ';';
        }

        if (this.getCropTop() !== '' || this.getCropBottom() !== '') {
          var top = '0%';
          var bottom = '';

          if (this.getCropTop() !== '') {
            top = '-' + this.getCropTop();
            bottom = 'margin-bottom:' + top;
          }

          if (this.getCropBottom() !== '') {
            bottom = 'margin-bottom:calc(' + top + ' - ' + this.getCropBottom() + ');';
          }

          imgStyle += 'object-position:0% ' + top + ';' + bottom;
        }

        var src = this.__P_55_1();

        if (!src) {
          switch (this.getPlaceholder()) {
            case 'hide':
              src = qx.util.ResourceManager.getInstance().toUri('qx/static/blank.gif');
              break;

            case 'exclude':
              imgStyle += 'display:none;';
              break;

            case 'src':
              this.error('no src placeholder defined');
              break;
          }
        }

        return '<div class="actor"><img src="' + src + '" style="' + imgStyle + '" /></div>';
      },

      /**
       * Return the real src value
       */
      __P_55_1: function __P_55_1() {
        if (!this.__P_55_0) {
          var src = this.getSrc();
          var parsedUri = qx.util.Uri.parseUri(this.getSrc());

          if (!parsedUri.protocol && !src.startsWith('/')) {
            // is relative URI, use the ResourceManager
            src = qx.util.ResourceManager.getInstance().toUri(src);
          }

          this.__P_55_0 = src || '';
        }

        return this.__P_55_0;
      },
      handleUpdate: function handleUpdate(text, address) {
        var valueElem = this.getValueElement();

        if (!text) {
          switch (this.getPlaceholder()) {
            case 'src':
              text = this.__P_55_1();
              valueElem.style.display = 'inline';
              break;

            case 'hide':
              text = qx.util.ResourceManager.getInstance().toUri('qx/static/blank.gif');
              valueElem.style.display = 'inline';
              break;

            case 'exclude':
              valueElem.style.display = 'none';
              break;
          }
        } else {
          valueElem.style.display = 'inline';
        }

        valueElem.setAttribute('src', text);
      },
      // overridden
      getValueElement: function getValueElement() {
        return this.getDomElement().querySelector('img');
      },
      // overridden
      _applyVisible: function _applyVisible(value) {
        var valueElem = this.getValueElement();

        if (!valueElem || this.getRefresh() > 0) {
          return;
        }

        if (value === true) {
          valueElem.setAttribute('src', this.__P_55_1());
        } else {
          valueElem.setAttribute('src', '');
        }
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('image', statics);
    }
  });
  cv.ui.structure.pure.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1650122773944