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
      'address': '/develop/manual/config/address.html#address',
      'audio': '/develop/manual/config/widgets/audio/index.html#audio',
      'bashrc': '/develop/manual/tutorial/rpi_prequesites.html#bashrc',
      'break': '/develop/manual/config/widgets/break/index.html#break',
      'clock': '/develop/manual/config/widgets/plugins/clock/index.html#clock',
      'colorchooser': '/develop/manual/config/widgets/colorchooser/index.html#colorchooser',
      'custom-css': '/develop/manual/config/customizing.html#custom-css',
      'custom-cssrules': '/develop/manual/config/customizing.html#custom-cssrules',
      'custom-plugins': '/develop/manual/config/customizing.html#custom-plugins',
      'customizing': '/develop/manual/config/customizing.html#customizing',
      'cv-installation-in-terminal': '/develop/manual/tutorial/rpi_cometvisu.html#cv-installation-in-terminal',
      'designtoggle': '/develop/manual/config/widgets/designtoggle/index.html#designtoggle',
      'diagram': '/develop/manual/config/widgets/plugins/diagram/index.html#diagram',
      'diagram-influx': '/develop/manual/config/widgets/plugins/diagram/index.html#diagram-influx',
      'diagram-info': '/develop/manual/config/widgets/plugins/diagram_info/index.html#diagram-info',
      'docker': '/develop/manual/install/docker.html#docker',
      'dockerenvironment': '/develop/manual/install/docker.html#dockerenvironment',
      'editor': '/develop/manual/config/editor.html#editor',
      'enablecache': '/develop/manual/config/url-params.html#enablecache',
      'flavour': '/develop/manual/config/flavour.html#flavour',
      'format': '/develop/manual/config/format.html#format',
      'gauge': '/develop/manual/config/widgets/plugins/gauge/index.html#gauge',
      'group': '/develop/manual/config/widgets/group/index.html#group',
      'hidden-config': '/develop/manual/config/hidden-config.html#hidden-config',
      'image': '/develop/manual/config/widgets/image/index.html#image',
      'imagetrigger': '/develop/manual/config/widgets/imagetrigger/index.html#imagetrigger',
      'include': '/develop/manual/config/widgets/include/index.html#include',
      'info': '/develop/manual/config/widgets/info/index.html#info',
      'infoaction': '/develop/manual/config/widgets/infoaction/index.html#infoaction',
      'infotrigger': '/develop/manual/config/widgets/infotrigger/index.html#infotrigger',
      'install-no-pakets': '/develop/manual/install/install-dev.html#install-no-pakets',
      'layout': '/develop/manual/config/layout.html#layout',
      'line': '/develop/manual/config/widgets/line/index.html#line',
      'link': '/develop/manual/config/widgets/plugins/link/index.html#link',
      'log': '/develop/manual/config/url-params.html#log',
      'long-polling': '/develop/manual/devel/transport/long-polling.html#long-polling',
      'manager': '/develop/manual/config/manager.html#manager',
      'mapping': '/develop/manual/config/mapping.html#mapping',
      'multitrigger': '/develop/manual/config/widgets/multitrigger/index.html#multitrigger',
      'navbar': '/develop/manual/config/widgets/navbar/index.html#navbar',
      'nodered-installation-in-terminal': '/develop/manual/tutorial/rpi_nodered.html#nodered-installation-in-terminal',
      'notificationcenterbadge': '/develop/manual/config/widgets/notificationcenterbadge/index.html#notificationcenterbadge',
      'notifications': '/develop/manual/config/notifications.html#notifications',
      'openhab-plugin': '/develop/manual/config/widgets/plugins/openhab/index.html#openhab-plugin',
      'openweathermap': '/develop/manual/config/widgets/plugins/openweathermap/index.html#openweathermap',
      'page': '/develop/manual/config/widgets/page/index.html#page',
      'pagejump': '/develop/manual/config/widgets/pagejump/index.html#pagejump',
      'powerspectrum': '/develop/manual/config/widgets/plugins/powerspectrum/index.html#powerspectrum',
      'pushbutton': '/develop/manual/config/widgets/pushbutton/index.html#pushbutton',
      'refresh': '/develop/manual/config/widgets/refresh/index.html#refresh',
      'reload': '/develop/manual/config/widgets/reload/index.html#reload',
      'reporterrors': '/develop/manual/config/url-params.html#reporterrors',
      'reporting': '/develop/manual/config/url-params.html#reporting',
      'rgb': '/develop/manual/config/widgets/rgb/index.html#rgb',
      'roundbar': '/develop/manual/config/widgets/roundbar/index.html#roundbar',
      'rpi-tutorial-cometvisu-in-docker': '/develop/manual/tutorial/rpi_cometvisu.html#rpi-tutorial-cometvisu-in-docker',
      'rrd-introduction': '/develop/manual/config/rrd_examples.html#rrd-introduction',
      'size-attributes': '/develop/manual/config/size-attributes.html#size-attributes',
      'slide': '/develop/manual/config/widgets/slide/index.html#slide',
      'speech': '/develop/manual/config/widgets/plugins/speech/index.html#speech',
      'sse': '/develop/manual/devel/transport/sse.html#sse',
      'strftime': '/develop/manual/config/widgets/plugins/strftime/index.html#strftime',
      'styling': '/develop/manual/config/styling.html#styling',
      'switch': '/develop/manual/config/widgets/switch/index.html#switch',
      'system-voraussetzungen': '/develop/manual/#system-voraussetzungen',
      'text': '/develop/manual/config/widgets/text/index.html#text',
      'timberwolf': '/develop/manual/install/timberwolf.html#timberwolf',
      'timberwolf-portainer': '/develop/manual/install/timberwolf.html#timberwolf-portainer',
      'timeout': '/develop/manual/config/widgets/plugins/timeout/index.html#timeout',
      'toggle': '/develop/manual/config/widgets/toggle/index.html#toggle',
      'tr064': '/develop/manual/config/widgets/plugins/tr064/index.html#tr064',
      'trigger': '/develop/manual/config/widgets/trigger/index.html#trigger',
      'tutorials': '/develop/manual/tutorial/index.html#tutorials',
      'urltrigger': '/develop/manual/config/widgets/urltrigger/index.html#urltrigger',
      'video': '/develop/manual/config/widgets/video/index.html#video',
      'visu-config-details': '/develop/manual/config/index.html#visu-config-details',
      'web': '/develop/manual/config/widgets/web/index.html#web',
      'wgplugin-info': '/develop/manual/config/widgets/wgplugin_info/index.html#wgplugin-info',
      'widgets': '/develop/manual/config/widgets/index.html#widgets',
      'worker': '/develop/manual/config/url-params.html#worker',
      'xml-format': '/develop/manual/config/xml-format.html#xml-format',
      'xml-format-files': '/develop/manual/config/xml-format.html#xml-format-files',
      'xml-format-header': '/develop/manual/config/xml-format.html#xml-format-header',
      'xml-format-icons': '/develop/manual/config/xml-format.html#xml-format-icons',
      'xml-format-mappings': '/develop/manual/config/xml-format.html#xml-format-mappings',
      'xml-format-pages': '/develop/manual/config/xml-format.html#xml-format-pages',
      'xml-format-plugins': '/develop/manual/config/xml-format.html#xml-format-plugins',
      'xml-format-statusbar': '/develop/manual/config/xml-format.html#xml-format-statusbar',
      'xml-format-stylings': '/develop/manual/config/xml-format.html#xml-format-stylings',
      'xml-format-templates': '/develop/manual/config/xml-format.html#xml-format-templates'
    }
  }
});
