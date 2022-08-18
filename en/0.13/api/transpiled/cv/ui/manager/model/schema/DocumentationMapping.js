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
        'address': '/0.13/manual/config/address.html#address',
        'audio': '/0.13/manual/config/widgets/audio/index.html#audio',
        'bashrc': '/0.13/manual/tutorial/rpi_prequesites.html#bashrc',
        'break': '/0.13/manual/config/widgets/break/index.html#break',
        'clock': '/0.13/manual/config/widgets/plugins/clock/index.html#clock',
        'colorchooser': '/0.13/manual/config/widgets/colorchooser/index.html#colorchooser',
        'custom-css': '/0.13/manual/config/customizing.html#custom-css',
        'custom-cssrules': '/0.13/manual/config/customizing.html#custom-cssrules',
        'custom-plugins': '/0.13/manual/config/customizing.html#custom-plugins',
        'customizing': '/0.13/manual/config/customizing.html#customizing',
        'cv-installation-in-terminal': '/0.13/manual/tutorial/rpi_cometvisu.html#cv-installation-in-terminal',
        'designtoggle': '/0.13/manual/config/widgets/designtoggle/index.html#designtoggle',
        'diagram': '/0.13/manual/config/widgets/plugins/diagram/index.html#diagram',
        'diagram-influx': '/0.13/manual/config/widgets/plugins/diagram/index.html#diagram-influx',
        'diagram-info': '/0.13/manual/config/widgets/plugins/diagram_info/index.html#diagram-info',
        'docker': '/0.13/manual/install/docker.html#docker',
        'docker-openhab-installation': '/0.13/manual/install/docker_openhab.html#docker-openhab-installation',
        'dockerenvironment': '/0.13/manual/install/docker.html#dockerenvironment',
        'editor': '/0.13/manual/config/editor.html#editor',
        'enablecache': '/0.13/manual/config/url-params.html#enablecache',
        'flavour': '/0.13/manual/config/flavour.html#flavour',
        'format': '/0.13/manual/config/format.html#format',
        'gauge': '/0.13/manual/config/widgets/plugins/gauge/index.html#gauge',
        'group': '/0.13/manual/config/widgets/group/index.html#group',
        'hidden-config': '/0.13/manual/config/hidden-config.html#hidden-config',
        'image': '/0.13/manual/config/widgets/image/index.html#image',
        'imagetrigger': '/0.13/manual/config/widgets/imagetrigger/index.html#imagetrigger',
        'include': '/0.13/manual/config/widgets/include/index.html#include',
        'info': '/0.13/manual/config/widgets/info/index.html#info',
        'info-seite': '/0.13/manual/config/widgets/plugins/rsslog/index.html#info-seite',
        'infoaction': '/0.13/manual/config/widgets/infoaction/index.html#infoaction',
        'infotrigger': '/0.13/manual/config/widgets/infotrigger/index.html#infotrigger',
        'install-no-pakets': '/0.13/manual/install/install-dev.html#install-no-pakets',
        'layout': '/0.13/manual/config/layout.html#layout',
        'line': '/0.13/manual/config/widgets/line/index.html#line',
        'link': '/0.13/manual/config/widgets/plugins/link/index.html#link',
        'log': '/0.13/manual/config/url-params.html#log',
        'long-polling': '/0.13/manual/devel/transport/long-polling.html#long-polling',
        'manager': '/0.13/manual/config/manager.html#manager',
        'mapping': '/0.13/manual/config/mapping.html#mapping',
        'multitrigger': '/0.13/manual/config/widgets/multitrigger/index.html#multitrigger',
        'navbar': '/0.13/manual/config/widgets/navbar/index.html#navbar',
        'nodered-installation-in-terminal': '/0.13/manual/tutorial/rpi_nodered.html#nodered-installation-in-terminal',
        'notificationcenterbadge': '/0.13/manual/config/widgets/notificationcenterbadge/index.html#notificationcenterbadge',
        'notifications': '/0.13/manual/config/notifications.html#notifications',
        'openhab-plugin': '/0.13/manual/config/widgets/plugins/openhab/index.html#openhab-plugin',
        'openweathermap': '/0.13/manual/config/widgets/plugins/openweathermap/index.html#openweathermap',
        'page': '/0.13/manual/config/widgets/page/index.html#page',
        'pagejump': '/0.13/manual/config/widgets/pagejump/index.html#pagejump',
        'powerspectrum': '/0.13/manual/config/widgets/plugins/powerspectrum/index.html#powerspectrum',
        'pushbutton': '/0.13/manual/config/widgets/pushbutton/index.html#pushbutton',
        'refresh': '/0.13/manual/config/widgets/refresh/index.html#refresh',
        'reload': '/0.13/manual/config/widgets/reload/index.html#reload',
        'reporterrors': '/0.13/manual/config/url-params.html#reporterrors',
        'reporting': '/0.13/manual/config/url-params.html#reporting',
        'rgb': '/0.13/manual/config/widgets/rgb/index.html#rgb',
        'roundbar': '/0.13/manual/config/widgets/roundbar/index.html#roundbar',
        'rpi-tutorial-cometvisu-in-docker': '/0.13/manual/tutorial/rpi_cometvisu.html#rpi-tutorial-cometvisu-in-docker',
        'rrd-introduction': '/0.13/manual/config/rrd_examples.html#rrd-introduction',
        'rsslog': '/0.13/manual/config/widgets/plugins/rsslog/index.html#rsslog',
        'size-attributes': '/0.13/manual/config/size-attributes.html#size-attributes',
        'slide': '/0.13/manual/config/widgets/slide/index.html#slide',
        'speech': '/0.13/manual/config/widgets/plugins/speech/index.html#speech',
        'sse': '/0.13/manual/devel/transport/sse.html#sse',
        'strftime': '/0.13/manual/config/widgets/plugins/strftime/index.html#strftime',
        'styling': '/0.13/manual/config/styling.html#styling',
        'switch': '/0.13/manual/config/widgets/switch/index.html#switch',
        'system-voraussetzungen': '/0.13/manual/#system-voraussetzungen',
        'text': '/0.13/manual/config/widgets/text/index.html#text',
        'timberwolf': '/0.13/manual/install/timberwolf.html#timberwolf',
        'timberwolf-portainer': '/0.13/manual/install/timberwolf.html#timberwolf-portainer',
        'timeout': '/0.13/manual/config/widgets/plugins/timeout/index.html#timeout',
        'toggle': '/0.13/manual/config/widgets/toggle/index.html#toggle',
        'tr064': '/0.13/manual/config/widgets/plugins/tr064/index.html#tr064',
        'trigger': '/0.13/manual/config/widgets/trigger/index.html#trigger',
        'tutorials': '/0.13/manual/tutorial/index.html#tutorials',
        'urltrigger': '/0.13/manual/config/widgets/urltrigger/index.html#urltrigger',
        'video': '/0.13/manual/config/widgets/video/index.html#video',
        'visu-config-details': '/0.13/manual/config/index.html#visu-config-details',
        'web': '/0.13/manual/config/widgets/web/index.html#web',
        'wgplugin-info': '/0.13/manual/config/widgets/wgplugin_info/index.html#wgplugin-info',
        'widgets': '/0.13/manual/config/widgets/index.html#widgets',
        'worker': '/0.13/manual/config/url-params.html#worker',
        'xml-format': '/0.13/manual/config/xml-format.html#xml-format',
        'xml-format-files': '/0.13/manual/config/xml-format.html#xml-format-files',
        'xml-format-header': '/0.13/manual/config/xml-format.html#xml-format-header',
        'xml-format-icons': '/0.13/manual/config/xml-format.html#xml-format-icons',
        'xml-format-mappings': '/0.13/manual/config/xml-format.html#xml-format-mappings',
        'xml-format-pages': '/0.13/manual/config/xml-format.html#xml-format-pages',
        'xml-format-plugins': '/0.13/manual/config/xml-format.html#xml-format-plugins',
        'xml-format-statusbar': '/0.13/manual/config/xml-format.html#xml-format-statusbar',
        'xml-format-stylings': '/0.13/manual/config/xml-format.html#xml-format-stylings',
        'xml-format-templates': '/0.13/manual/config/xml-format.html#xml-format-templates'
      }
    }
  });
  cv.ui.manager.model.schema.DocumentationMapping.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DocumentationMapping.js.map?dt=1660800146883