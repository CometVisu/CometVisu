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
        'address': '/latest/manual/config/address.html#address',
        'audio': '/latest/manual/config/widgets/audio/index.html#audio',
        'bashrc': '/latest/manual/tutorial/rpi_prequesites.html#bashrc',
        'break': '/latest/manual/config/widgets/break/index.html#break',
        'clock': '/latest/manual/config/widgets/plugins/clock/index.html#clock',
        'colorchooser': '/latest/manual/config/widgets/colorchooser/index.html#colorchooser',
        'custom-css': '/latest/manual/config/customizing.html#custom-css',
        'custom-cssrules': '/latest/manual/config/customizing.html#custom-cssrules',
        'custom-plugins': '/latest/manual/config/customizing.html#custom-plugins',
        'customizing': '/latest/manual/config/customizing.html#customizing',
        'cv-installation-in-terminal': '/latest/manual/tutorial/rpi_cometvisu.html#cv-installation-in-terminal',
        'designtoggle': '/latest/manual/config/widgets/designtoggle/index.html#designtoggle',
        'diagram': '/latest/manual/config/widgets/plugins/diagram/index.html#diagram',
        'diagram-influx': '/latest/manual/config/widgets/plugins/diagram/index.html#diagram-influx',
        'diagram-info': '/latest/manual/config/widgets/plugins/diagram_info/index.html#diagram-info',
        'docker': '/latest/manual/install/docker.html#docker',
        'docker-openhab-installation': '/latest/manual/install/docker_openhab.html#docker-openhab-installation',
        'dockerenvironment': '/latest/manual/install/docker.html#dockerenvironment',
        'editor': '/latest/manual/config/editor.html#editor',
        'enablecache': '/latest/manual/config/url-params.html#enablecache',
        'flavour': '/latest/manual/config/flavour.html#flavour',
        'format': '/latest/manual/config/format.html#format',
        'gauge': '/latest/manual/config/widgets/plugins/gauge/index.html#gauge',
        'group': '/latest/manual/config/widgets/group/index.html#group',
        'hidden-config': '/latest/manual/config/hidden-config.html#hidden-config',
        'image': '/latest/manual/config/widgets/image/index.html#image',
        'imagetrigger': '/latest/manual/config/widgets/imagetrigger/index.html#imagetrigger',
        'include': '/latest/manual/config/widgets/include/index.html#include',
        'info': '/latest/manual/config/widgets/info/index.html#info',
        'info-seite': '/latest/manual/config/widgets/plugins/rsslog/index.html#info-seite',
        'infoaction': '/latest/manual/config/widgets/infoaction/index.html#infoaction',
        'infotrigger': '/latest/manual/config/widgets/infotrigger/index.html#infotrigger',
        'install-no-pakets': '/latest/manual/install/install-dev.html#install-no-pakets',
        'layout': '/latest/manual/config/layout.html#layout',
        'line': '/latest/manual/config/widgets/line/index.html#line',
        'link': '/latest/manual/config/widgets/plugins/link/index.html#link',
        'log': '/latest/manual/config/url-params.html#log',
        'long-polling': '/latest/manual/devel/transport/long-polling.html#long-polling',
        'manager': '/latest/manual/config/manager.html#manager',
        'mapping': '/latest/manual/config/mapping.html#mapping',
        'multitrigger': '/latest/manual/config/widgets/multitrigger/index.html#multitrigger',
        'navbar': '/latest/manual/config/widgets/navbar/index.html#navbar',
        'nodered-installation-in-terminal': '/latest/manual/tutorial/rpi_nodered.html#nodered-installation-in-terminal',
        'notificationcenterbadge': '/latest/manual/config/widgets/notificationcenterbadge/index.html#notificationcenterbadge',
        'notifications': '/latest/manual/config/notifications.html#notifications',
        'openhab-plugin': '/latest/manual/config/widgets/plugins/openhab/index.html#openhab-plugin',
        'openweathermap': '/latest/manual/config/widgets/plugins/openweathermap/index.html#openweathermap',
        'page': '/latest/manual/config/widgets/page/index.html#page',
        'pagejump': '/latest/manual/config/widgets/pagejump/index.html#pagejump',
        'powerspectrum': '/latest/manual/config/widgets/plugins/powerspectrum/index.html#powerspectrum',
        'pushbutton': '/latest/manual/config/widgets/pushbutton/index.html#pushbutton',
        'refresh': '/latest/manual/config/widgets/refresh/index.html#refresh',
        'reload': '/latest/manual/config/widgets/reload/index.html#reload',
        'reporterrors': '/latest/manual/config/url-params.html#reporterrors',
        'reporting': '/latest/manual/config/url-params.html#reporting',
        'rgb': '/latest/manual/config/widgets/rgb/index.html#rgb',
        'roundbar': '/latest/manual/config/widgets/roundbar/index.html#roundbar',
        'rpi-tutorial-cometvisu-in-docker': '/latest/manual/tutorial/rpi_cometvisu.html#rpi-tutorial-cometvisu-in-docker',
        'rrd-introduction': '/latest/manual/config/rrd_examples.html#rrd-introduction',
        'rsslog': '/latest/manual/config/widgets/plugins/rsslog/index.html#rsslog',
        'size-attributes': '/latest/manual/config/size-attributes.html#size-attributes',
        'slide': '/latest/manual/config/widgets/slide/index.html#slide',
        'speech': '/latest/manual/config/widgets/plugins/speech/index.html#speech',
        'sse': '/latest/manual/devel/transport/sse.html#sse',
        'strftime': '/latest/manual/config/widgets/plugins/strftime/index.html#strftime',
        'styling': '/latest/manual/config/styling.html#styling',
        'switch': '/latest/manual/config/widgets/switch/index.html#switch',
        'system-voraussetzungen': '/latest/manual/#system-voraussetzungen',
        'text': '/latest/manual/config/widgets/text/index.html#text',
        'timberwolf': '/latest/manual/install/timberwolf.html#timberwolf',
        'timberwolf-portainer': '/latest/manual/install/timberwolf.html#timberwolf-portainer',
        'timeout': '/latest/manual/config/widgets/plugins/timeout/index.html#timeout',
        'toggle': '/latest/manual/config/widgets/toggle/index.html#toggle',
        'tr064': '/latest/manual/config/widgets/plugins/tr064/index.html#tr064',
        'trigger': '/latest/manual/config/widgets/trigger/index.html#trigger',
        'tutorials': '/latest/manual/tutorial/index.html#tutorials',
        'urltrigger': '/latest/manual/config/widgets/urltrigger/index.html#urltrigger',
        'video': '/latest/manual/config/widgets/video/index.html#video',
        'visu-config-details': '/latest/manual/config/index.html#visu-config-details',
        'web': '/latest/manual/config/widgets/web/index.html#web',
        'wgplugin-info': '/latest/manual/config/widgets/wgplugin_info/index.html#wgplugin-info',
        'widgets': '/latest/manual/config/widgets/index.html#widgets',
        'worker': '/latest/manual/config/url-params.html#worker',
        'xml-format': '/latest/manual/config/xml-format.html#xml-format',
        'xml-format-files': '/latest/manual/config/xml-format.html#xml-format-files',
        'xml-format-header': '/latest/manual/config/xml-format.html#xml-format-header',
        'xml-format-icons': '/latest/manual/config/xml-format.html#xml-format-icons',
        'xml-format-mappings': '/latest/manual/config/xml-format.html#xml-format-mappings',
        'xml-format-pages': '/latest/manual/config/xml-format.html#xml-format-pages',
        'xml-format-plugins': '/latest/manual/config/xml-format.html#xml-format-plugins',
        'xml-format-statusbar': '/latest/manual/config/xml-format.html#xml-format-statusbar',
        'xml-format-stylings': '/latest/manual/config/xml-format.html#xml-format-stylings',
        'xml-format-templates': '/latest/manual/config/xml-format.html#xml-format-templates'
      }
    }
  });
  cv.ui.manager.model.schema.DocumentationMapping.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DocumentationMapping.js.map?dt=1702898793592