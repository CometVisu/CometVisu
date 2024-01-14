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
      'address': '/0.13/manual/#address',
      'audio': '/0.13/manual/#audio',
      'bashrc': '/0.13/manual/#bashrc',
      'break': '/0.13/manual/#break',
      'clock': '/0.13/manual/#clock',
      'colorchooser': '/0.13/manual/#colorchooser',
      'custom-css': '/0.13/manual/#custom-css',
      'custom-cssrules': '/0.13/manual/#custom-cssrules',
      'custom-plugins': '/0.13/manual/#custom-plugins',
      'customizing': '/0.13/manual/#customizing',
      'cv-installation-in-terminal': '/0.13/manual/#cv-installation-in-terminal',
      'designtoggle': '/0.13/manual/#designtoggle',
      'diagram': '/0.13/manual/#diagram',
      'diagram-influx': '/0.13/manual/#diagram-influx',
      'diagram-info': '/0.13/manual/#diagram-info',
      'docker': '/0.13/manual/#docker',
      'docker-openhab-installation': '/0.13/manual/#docker-openhab-installation',
      'dockerenvironment': '/0.13/manual/#dockerenvironment',
      'editor': '/0.13/manual/#editor',
      'enablecache': '/0.13/manual/#enablecache',
      'flavour': '/0.13/manual/#flavour',
      'format': '/0.13/manual/#format',
      'gauge': '/0.13/manual/#gauge',
      'group': '/0.13/manual/#group',
      'hidden-config': '/0.13/manual/#hidden-config',
      'image': '/0.13/manual/#image',
      'imagetrigger': '/0.13/manual/#imagetrigger',
      'include': '/0.13/manual/#include',
      'info': '/0.13/manual/#info',
      'info-seite': '/0.13/manual/#info-seite',
      'infoaction': '/0.13/manual/#infoaction',
      'infotrigger': '/0.13/manual/#infotrigger',
      'install-no-pakets': '/0.13/manual/#install-no-pakets',
      'layout': '/0.13/manual/#layout',
      'line': '/0.13/manual/#line',
      'link': '/0.13/manual/#link',
      'log': '/0.13/manual/#log',
      'long-polling': '/0.13/manual/#long-polling',
      'manager': '/0.13/manual/#manager',
      'mapping': '/0.13/manual/#mapping',
      'multitrigger': '/0.13/manual/#multitrigger',
      'navbar': '/0.13/manual/#navbar',
      'nodered-installation-in-terminal': '/0.13/manual/#nodered-installation-in-terminal',
      'notificationcenterbadge': '/0.13/manual/#notificationcenterbadge',
      'notifications': '/0.13/manual/#notifications',
      'openhab-plugin': '/0.13/manual/#openhab-plugin',
      'openweathermap': '/0.13/manual/#openweathermap',
      'page': '/0.13/manual/#page',
      'pagejump': '/0.13/manual/#pagejump',
      'powerspectrum': '/0.13/manual/#powerspectrum',
      'pushbutton': '/0.13/manual/#pushbutton',
      'refresh': '/0.13/manual/#refresh',
      'reload': '/0.13/manual/#reload',
      'reporterrors': '/0.13/manual/#reporterrors',
      'reporting': '/0.13/manual/#reporting',
      'rgb': '/0.13/manual/#rgb',
      'roundbar': '/0.13/manual/#roundbar',
      'rpi-tutorial-cometvisu-in-docker': '/0.13/manual/#rpi-tutorial-cometvisu-in-docker',
      'rrd-introduction': '/0.13/manual/#rrd-introduction',
      'rsslog': '/0.13/manual/#rsslog',
      'size-attributes': '/0.13/manual/#size-attributes',
      'slide': '/0.13/manual/#slide',
      'speech': '/0.13/manual/#speech',
      'sse': '/0.13/manual/#sse',
      'strftime': '/0.13/manual/#strftime',
      'styling': '/0.13/manual/#styling',
      'switch': '/0.13/manual/#switch',
      'system-voraussetzungen': '/0.13/manual/#system-voraussetzungen',
      'text': '/0.13/manual/#text',
      'tile-backend-system': '/0.13/manual/#tile-backend-system',
      'tile-component-button': '/0.13/manual/#tile-component-button',
      'tile-component-chart': '/0.13/manual/#tile-component-chart',
      'tile-component-color': '/0.13/manual/#tile-component-color',
      'tile-component-energy-entity': '/0.13/manual/#tile-component-energy-entity',
      'tile-component-group': '/0.13/manual/#tile-component-group',
      'tile-component-icon': '/0.13/manual/#tile-component-icon',
      'tile-component-image': '/0.13/manual/#tile-component-image',
      'tile-component-list': '/0.13/manual/#tile-component-list',
      'tile-component-menu': '/0.13/manual/#tile-component-menu',
      'tile-component-page': '/0.13/manual/#tile-component-page',
      'tile-component-popup': '/0.13/manual/#tile-component-popup',
      'tile-component-power-entity': '/0.13/manual/#tile-component-power-entity',
      'tile-component-select': '/0.13/manual/#tile-component-select',
      'tile-component-slider': '/0.13/manual/#tile-component-slider',
      'tile-component-spinner': '/0.13/manual/#tile-component-spinner',
      'tile-component-svg-round-value-entity': '/0.13/manual/#tile-component-svg-round-value-entity',
      'tile-component-svg-text-value-entity': '/0.13/manual/#tile-component-svg-text-value-entity',
      'tile-component-value': '/0.13/manual/#tile-component-value',
      'tile-components': '/0.13/manual/#tile-components',
      'tile-dimmer': '/0.13/manual/#tile-dimmer',
      'tile-element-address': '/0.13/manual/#tile-element-address',
      'tile-element-address-group': '/0.13/manual/#tile-element-address-group',
      'tile-element-address-target': '/0.13/manual/#tile-element-address-target',
      'tile-element-backend': '/0.13/manual/#tile-element-backend',
      'tile-element-loader': '/0.13/manual/#tile-element-loader',
      'tile-element-mapping': '/0.13/manual/#tile-element-mapping',
      'tile-element-state-notification': '/0.13/manual/#tile-element-state-notification',
      'tile-element-style': '/0.13/manual/#tile-element-style',
      'tile-element-styling': '/0.13/manual/#tile-element-styling',
      'tile-energy': '/0.13/manual/#tile-energy',
      'tile-energy-flow': '/0.13/manual/#tile-energy-flow',
      'tile-info': '/0.13/manual/#tile-info',
      'tile-item-menu': '/0.13/manual/#tile-item-menu',
      'tile-media-player': '/0.13/manual/#tile-media-player',
      'tile-nav-menu': '/0.13/manual/#tile-nav-menu',
      'tile-rtc': '/0.13/manual/#tile-rtc',
      'tile-shutter': '/0.13/manual/#tile-shutter',
      'tile-small-status': '/0.13/manual/#tile-small-status',
      'tile-status': '/0.13/manual/#tile-status',
      'tile-status-chart': '/0.13/manual/#tile-status-chart',
      'tile-switch': '/0.13/manual/#tile-switch',
      'tile-widget-pair': '/0.13/manual/#tile-widget-pair',
      'tile-widgets': '/0.13/manual/#tile-widgets',
      'timberwolf': '/0.13/manual/#timberwolf',
      'timberwolf-portainer': '/0.13/manual/#timberwolf-portainer',
      'timeout': '/0.13/manual/#timeout',
      'toggle': '/0.13/manual/#toggle',
      'tr064': '/0.13/manual/#tr064',
      'trigger': '/0.13/manual/#trigger',
      'tutorials': '/0.13/manual/#tutorials',
      'urltrigger': '/0.13/manual/#urltrigger',
      'video': '/0.13/manual/#video',
      'visu-config-details': '/0.13/manual/#visu-config-details',
      'web': '/0.13/manual/#web',
      'wgplugin-info': '/0.13/manual/#wgplugin-info',
      'widgets': '/0.13/manual/#widgets',
      'worker': '/0.13/manual/#worker',
      'xml-format': '/0.13/manual/#xml-format',
      'xml-format-files': '/0.13/manual/#xml-format-files',
      'xml-format-header': '/0.13/manual/#xml-format-header',
      'xml-format-icons': '/0.13/manual/#xml-format-icons',
      'xml-format-mappings': '/0.13/manual/#xml-format-mappings',
      'xml-format-pages': '/0.13/manual/#xml-format-pages',
      'xml-format-plugins': '/0.13/manual/#xml-format-plugins',
      'xml-format-statusbar': '/0.13/manual/#xml-format-statusbar',
      'xml-format-stylings': '/0.13/manual/#xml-format-stylings',
      'xml-format-templates': '/0.13/manual/#xml-format-templates'
    }
  }
});
