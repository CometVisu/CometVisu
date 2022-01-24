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
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.WidgetParser": {},
      "qx.util.Uri": {},
      "qx.util.ResourceManager": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ImageTrigger.js 
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
   * Adds an image like the {@link cv.ui.structure.pure.Image} widget, but additionally the image can be changed by incoming
   * data and can send data to the backend by clicking on it.
   * There are two modes to react on incoming data:
   *
   * <ul>
   *  <li><code>type="show"</code>: Hides the image when incoming data === 0</li>
   *  <li><code>type="select"</code>: Changes the image by appending the incoming data to the initial configured image source, or hide it when incoming data === 0</li>
   * </ul>
   * Example:
   * <pre class="sunlight-highlight-xml">
   * &lt;imagetrigger src="resource/icons/comet" suffix="svg" sendValue="clicked" type="select"&gt;
   *    &lt;address transform="DPT:16.001" mode="readwrite"&gt;0/0/0&lt;/address&gt;
   * &lt;/imagetrigger&gt;
   * </pre>
   *
   * initially shows nothing. When the CometVisu receives the string <code>_icon</code> in address <code>0/0/0</code>,
   * the image <code>icons/comet_opt_icon.svg</code> is shown. When the CometVisu receives '0' on address <code>0/0/0</code>,
   * this image is hidden.
   *
   * @widgetexample <settings>
   *   <screenshot name="image_trigger">
   *     <caption>Image changed by incoming data 'blue'</caption>
   *     <data address="0/0/0">blue</data>
   *   </screenshot>
   *   <screenshot name="image_trigger_changes">
   *     <caption>Image changed by incoming data 'grey'</caption>
   *     <data address="0/0/0">grey</data>
   *   </screenshot>
   *  </settings>
   *  <imagetrigger src="resource/icons/CometVisu_" suffix="png" sendValue="clicked" type="select" width="45px" height="32px">
   *    <layout colspan="1" />
   *    <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
   *  </imagetrigger>
   *
   * @widgetexample <settings>
   *   <caption>Disable layout width by settings it to '0', to have widget with === image width</caption>
   *   <screenshot name="image_trigger_colspan0">
   *     <data address="0/0/0">1</data>
   *   </screenshot>
   *  </settings>
   *  <imagetrigger src="resource/icons/CometVisu_orange" suffix="png" sendValue="clicked" type="show" width="45px" height="32px">
   *    <layout colspan="0" />
   *    <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
   *  </imagetrigger>
   *
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   */
  qx.Class.define('cv.ui.structure.pure.ImageTrigger', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.HasAnimatedButton, cv.ui.common.Refresh, cv.ui.common.Update],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      height: {
        check: 'String',
        nullable: true
      },
      updateType: {
        check: 'String',
        init: ''
      },
      width: {
        check: 'String',
        init: '100%'
      },
      src: {
        check: 'String',
        nullable: true
      },
      suffix: {
        check: 'String',
        nullable: true
      },
      sendValue: {
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
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var style = '';

        if (Object.keys(this.getLayout()).length === 0) {
          style += cv.parser.WidgetParser.extractLayout(this.getLayout(), this.getPageType());
        }

        if (this.getHeight()) {
          style += 'height:' + this.getHeight() + ';';
        }

        if (style.length > 0) {
          style = ' style="' + style + '"';
        }

        var actor = '<div class="actor">';

        if (this.getUpdateType() === 'show') {
          actor += '<img src="' + this.__P_56_0(this.getSrc() + '.' + this.getSuffix()) + '"' + style.trim() + ' />';
        } else {
          actor += '<img src=""' + style + ' />';
        }

        actor += '</div>';
        return actor;
      },
      _update: function _update(address, value) {
        var imageChild = this.getDomElement().querySelector('img');

        if (this.getUpdateType() === 'show') {
          if (value === 0) {
            imageChild.style.display = 'none';
          } else {
            imageChild.setAttribute('src', this.__P_56_0(this.getSrc() + '.' + this.getSuffix()));
            imageChild.style.display = 'block';
          }
        } else if (this.getUpdateType() === 'select') {
          if (value === 0) {
            imageChild.style.display = 'none';
          } else {
            imageChild.setAttribute('src', this.__P_56_0(this.getSrc() + value + '.' + this.getSuffix()));
            imageChild.style.display = 'block';
          }
        } //TODO: add value if mapping exists
        //TODO: get image name from mapping
        //TODO: add bitmask for multiple images
        //TODO: add SVG-magics

      },
      __P_56_0: function __P_56_0(url) {
        var parsedUri = qx.util.Uri.parseUri(url);

        if (!parsedUri.protocol && !url.startsWith('/')) {
          // is relative URI, use the ResourceManager
          url = qx.util.ResourceManager.getInstance().toUri(url);
        }

        return url;
      },
      _action: function _action() {
        if (this.getSendValue() === '') {
          return;
        }

        this.sendToBackend(this.getSendValue());
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('imagetrigger', statics);
    }
  });
  cv.ui.structure.pure.ImageTrigger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ImageTrigger.js.map?dt=1643061782723