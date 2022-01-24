(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* DocumentationMapping.js 
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
   *
   */
  qx.Class.define('cv.ui.manager.model.schema.DocumentationMapping', {
    type: 'static',

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      MAP: {
        '_base': 'https://www.cometvisu.org/CometVisu/',
        'audio': '/latest/manual/config/widgets/audio/index.html#audio',
        'break': '/latest/manual/config/widgets/break/index.html#break',
        'colorchooser': '/latest/manual/config/widgets/plugins/colorchooser/index.html#colorchooser',
        'designtoggle': '/latest/manual/config/widgets/designtoggle/index.html#designtoggle',
        'diagram': '/latest/manual/config/widgets/plugins/diagram/index.html#diagram',
        'flavour': '/latest/manual/config/flavour.html#flavour',
        'gauge': '/latest/manual/config/widgets/plugins/gauge/index.html#gauge',
        'image': '/latest/manual/config/widgets/image/index.html#image',
        'imagetrigger': '/latest/manual/config/widgets/imagetrigger/index.html#imagetrigger',
        'include': '/latest/manual/config/widgets/include/index.html#include',
        'info': '/latest/manual/config/widgets/info/index.html#info',
        'infoaction': '/latest/manual/config/widgets/infoaction/index.html#infoaction',
        'infotrigger': '/latest/manual/config/widgets/infotrigger/index.html#infotrigger',
        'install-no-pakets': '/latest/manual/install/install-dev.html#install-no-pakets',
        'line': '/latest/manual/config/widgets/line/index.html#line',
        'mapping': '/latest/manual/config/mapping.html#mapping',
        'multitrigger': '/latest/manual/config/widgets/multitrigger/index.html#multitrigger',
        'page': '/latest/manual/config/widgets/page/index.html#page',
        'pagejump': '/latest/manual/config/widgets/pagejump/index.html#pagejump',
        'powerspectrum': '/latest/manual/config/widgets/plugins/powerspectrum/index.html#powerspectrum',
        'pushbutton': '/latest/manual/config/widgets/pushbutton/index.html#pushbutton',
        'refresh': '/latest/manual/config/widgets/refresh/index.html#refresh',
        'reload': '/latest/manual/config/widgets/reload/index.html#reload',
        'rgb': '/latest/manual/config/widgets/rgb/index.html#rgb',
        'slide': '/latest/manual/config/widgets/slide/index.html#slide',
        'speech': '/latest/manual/config/widgets/plugins/speech/index.html#speech',
        'strftime': '/latest/manual/config/widgets/plugins/strftime/index.html#strftime',
        'styling': '/latest/manual/config/styling.html#styling',
        'switch': '/latest/manual/config/widgets/switch/index.html#switch',
        'system-voraussetzungen': '/latest/manual/#system-voraussetzungen',
        'text': '/latest/manual/config/widgets/text/index.html#text',
        'toggle': '/latest/manual/config/widgets/toggle/index.html#toggle',
        'trigger': '/latest/manual/config/widgets/trigger/index.html#trigger',
        'urltrigger': '/latest/manual/config/widgets/urltrigger/index.html#urltrigger',
        'video': '/latest/manual/config/widgets/video/index.html#video',
        'visu-config-details': '/latest/manual/config/index.html#visu-config-details',
        'web': '/latest/manual/config/widgets/web/index.html#web',
        'widgets': '/latest/manual/config/widgets/index.html#widgets'
      }
    }
  });
  cv.ui.manager.model.schema.DocumentationMapping.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DocumentationMapping.js.map?dt=1643061781712