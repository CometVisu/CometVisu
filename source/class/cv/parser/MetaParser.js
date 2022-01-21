/* MetaParser.js 
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


qx.Class.define('cv.parser.MetaParser', {
  extend: qx.core.Object,

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    parse: function(xml, done) {
      // parse external files
      this.parseFiles(xml);

      // parse the icons
      xml.querySelectorAll('meta > icons icon-definition').forEach(this.parseIcons, this);

      // then the mappings
      xml.querySelectorAll('meta > mappings mapping').forEach(this.parseMappings, this);

      // then the stylings
      xml.querySelectorAll('meta > stylings styling').forEach(this.parseStylings, this);

      // then the status bar
      this.parseStatusBar(xml);

      this.parseStateNotifications(xml);

      this.parseTemplates(xml, done);
    },

    parseFiles: function (xml) {
      const files = {
        css: [],
        js: []
      };
      xml.querySelectorAll('meta > files file').forEach(function (elem) {
        const type = elem.getAttribute('type');
        const content = elem.getAttribute('content');
        switch (type) {
          case 'css':
            files.css.push(elem.textContent);
            break;

          case 'js':
            if (content === 'plugin') {
              cv.Config.configSettings.pluginsToLoad.push(elem.textContent);
            } else {
              files.js.push(elem.textContent);
            }
            break;

          default:
            this.warn('ignoring unknown file type', type);
            break;
        }
      }, this);
      if (files.css.length > 0) {
        cv.Config.configSettings.stylesToLoad = cv.Config.configSettings.stylesToLoad.concat(files.css);
      }
      if (files.js.length > 0) {
        cv.Config.configSettings.scriptsToLoad = cv.Config.configSettings.scriptsToLoad.concat(files.js);
      }
    },

    parseIcons: function(elem) {
      cv.Config.configSettings.iconsFromConfig.push(this.__parseIconDefinition(elem));
      qx.core.Init.getApplication().loadIcons();
    },

    parseMappings: function(elem) {
      const name = elem.getAttribute('name');
      const mapping = {};
      const formula = elem.querySelectorAll('formula');
      if (formula.length > 0) {
        mapping.formulaSource = formula[0].textContent;
        mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;'); // jshint ignore:line
      }
      const subElements = elem.querySelectorAll('entry');
      subElements.forEach(function (subElem) {
        const origin = subElem.childNodes;
        const value = [];
        for (let i = 0; i < origin.length; i++) {
          const v = origin[i];
          if (v && v.nodeType === 1 && v.nodeName.toLowerCase() === 'icon') {
            const icon = this.__parseIconDefinition(v);
            value.push(cv.IconHandler.getInstance().getIconElement(icon.name, icon.type, icon.flavour, icon.color, icon.styling, icon['class']));
          } else if (v && v.nodeType === 3 && v.textContent.trim().length) {
            value.push(v.textContent.trim());
          }
        }
        // check for default entry
        let isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue !== undefined) {
          isDefaultValue = isDefaultValue === 'true';
        } else {
          isDefaultValue = false;
        }
        // now set the mapped values
        if (subElem.getAttribute('value')) {
          mapping[subElem.getAttribute('value')] = value.length === 1 ? value[0] : value;
          if (isDefaultValue) {
            mapping.defaultValue = subElem.getAttribute('value');
          }
        } else if (subElem.hasAttribute('range_min')) {
          if (!mapping.range) {
            mapping.range = {};
          }
          mapping.range[parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), value];
          if (isDefaultValue) {
            mapping.defaultValue = parseFloat(subElem.getAttribute('range_min'));
          }
        } else if (subElements.length === 1) {
          // use as catchall mapping
          mapping['*'] = value.length === 1 ? value[0] : value;
        }
      }, this);
      cv.Config.addMapping(name, mapping);
    },

    parseStylings: function(elem) {
      const name = elem.getAttribute('name');
      let classnames = '';
      const styling = {};
      elem.querySelectorAll('entry').forEach(function (subElem) {
        classnames += subElem.textContent + ' ';
        // check for default entry
        let isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue !== undefined) {
          isDefaultValue = isDefaultValue === 'true';
        } else {
          isDefaultValue = false;
        }
        // now set the styling values
        if (subElem.getAttribute('value')) {
          styling[subElem.getAttribute('value')] = subElem.textContent;
          if (isDefaultValue) {
            styling.defaultValue = subElem.getAttribute('value');
          }
        } else { // a range
          if (!styling.range) {
            styling.range = {};
          }
          styling.range[parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), subElem.textContent];
          if (isDefaultValue) {
            styling.defaultValue = parseFloat(subElem.getAttribute('range_min'));
          }
        }
      }, this);
      styling.classnames = classnames.trim();
      cv.Config.addStyling(name, styling);
    },

    parseStatusBar: function(xml) {
      let code = '';
      xml.querySelectorAll('meta > statusbar status').forEach(function (elem) {
        const condition = elem.getAttribute('condition');
        let extend = elem.getAttribute('hrefextend');
        const sPath = window.location.pathname;
        const sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

        // @TODO: make this match once the new editor is finished-ish.
        const editMode = sPage === 'edit_config.html';

        // skip this element if it's edit-only and we are non-edit, or the other
        // way
        // round
        if (editMode && condition === '!edit') {
          return;
        }
        if (!editMode && condition === 'edit') {
          return;
        }

        if (cv.Config.testMode && condition === '!testMode') {
          return;
        }
        if (!cv.Config.testMode && condition === 'testMode') {
          return;
        }

        let text = elem.textContent;
        let search = '';

        // compability change to make existing customer configurations work with the new manager links
        // this replaces all document links to old manager tools with the new ones
        let linkMatch;
        const linkRegex = /href="([^"]+)"/gm;
        const matches = [];
        // eslint-disable-next-line no-cond-assign
        while (linkMatch = linkRegex.exec(text)) {
          matches.push(linkMatch);
        }
        let handled = false;
        const url = new URL(window.location.href);
        if (url.searchParams.has('config')) {
          search = url.searchParams.get('config');
          search = encodeURIComponent(search).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
          });
        }
        matches.forEach(match => {
          switch (match[1]) {
            case 'manager.php':
              text = text.replace(match[0], 'href="?manager=1" onclick="showManager(); return false;"');
              handled = true;
              break;

            case 'check_config.php':
              text = text.replace(match[0], 'href="#" onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"');
              handled = true;
              break;

            case 'editor/':
            case 'editor': {
              const suffix = search ? '_' + search : '';
              text = text.replace(match[0], 'href="'+window.location.pathname+'?config='+search+'&manager=1&open=visu_config' + suffix + '.xml" onclick="showManager(\'open\', \'visu_config' + suffix + '.xml\')"');
              handled = true;
              break;
            }
          }
        });

        if (handled) {
          // this overrides the extends
          extend = null;
        }
        switch (extend) {
          case 'all': // append all parameters
            search = window.location.search.replace(/\$/g, '$$$$');
            text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
            break;
          case 'config': { // append config file info
            search = window.location.search.replace(/\$/g, '$$$$');
            search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

            const middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
            if (middle.indexOf('?') > 0) {
              search = '&' + search;
            } else {
              search = '?' + search;
            }

            text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
            break;
          }

          case 'action': {
            search = window.location.search.replace(/\$/g, '$$$$');
            search = search.replace(/.*config=([^&]*).*|.*/, '$1');
            const match = /cv-action="([\w]+)"/.exec(text);
            if (match) {
              let replacement = 'href="#" ';
              switch (match[1]) {
                case 'validate':
                  replacement += 'onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"';
                  break;

                case 'edit': {
                  const configFile = search ? 'visu_config_' + search + '.xml' : 'visu_config.xml';
                  replacement = 'href="'+window.location.pathname+'?config='+search+'&manager=1&open='+configFile+'" onclick="showManager(\'open\', \'' + configFile + '\'); return false;"';
                  break;
                }
              }
              text = text.replace(match[0], replacement);
            }
            break;
          }
        }
        code += text;
      }, this);
      const footerElement = document.querySelector('.footer');
      footerElement.innerHTML += code;
    },

    parsePlugins: function(xml) {
      const pluginsToLoad = [];
      xml.querySelectorAll('meta > plugins plugin').forEach(function (elem) {
        const name = elem.getAttribute('name');
        if (name) {
          pluginsToLoad.push('plugin-'+name);
        }
      });
      return pluginsToLoad;
    },

    __parseIconDefinition: function(elem) {
      return {
        name : elem.getAttribute('name'),
        uri : elem.getAttribute('uri'),
        type : elem.getAttribute('type'),
        flavour : elem.getAttribute('flavour'),
        color : elem.getAttribute('color'),
        styling : elem.getAttribute('styling'),
        dynamic : elem.getAttribute('dynamic'),
        'class' : elem.getAttribute('class')
      };
    },

    parseStateNotifications: function(xml) {
      const stateConfig = {};
      xml.querySelectorAll('meta > notifications state-notification').forEach(function (elem) {
        const target = cv.core.notifications.Router.getTarget(elem.getAttribute('target')) || cv.ui.NotificationCenter.getInstance();

        const addressContainer = elem.querySelector('addresses');

        const config = {
          target: target,
          severity: elem.getAttribute('severity'),
          skipInitial: elem.getAttribute('skip-initial') !== 'false',
          deletable: elem.getAttribute('deletable') !== 'false',
          unique: elem.getAttribute('unique') === 'true',
          valueMapping: addressContainer.getAttribute('value-mapping'),
          addressMapping: addressContainer.getAttribute('address-mapping')
        };

        const name = elem.getAttribute('name');
        if (name) {
          config.topic = 'cv.state.'+name;
        }
        const icon = elem.getAttribute('icon');
        if (icon) {
          config.icon = icon;
          const iconClasses = elem.getAttribute('icon-classes');
          if (iconClasses) {
            config.iconClasses = iconClasses;
          }
        }

        // templates
        const titleElem = elem.querySelector('title-template');
        if (titleElem) {
          config.titleTemplate = titleElem.innerHTML;
        }
        const messageElem = elem.querySelector('message-template');
        if (messageElem) {
          config.messageTemplate = messageElem.innerHTML;
        }

        // condition
        const conditionElem = elem.querySelector('condition');
        let condition = conditionElem.textContent;
        if (condition === 'true') {
          condition = true;
        } else if (condition === 'false') {
          condition = false;
        }
        config.condition = condition;

        const addresses = cv.parser.WidgetParser.makeAddressList(addressContainer);
        // addresses
        Object.getOwnPropertyNames(addresses).forEach(function(address) {
          if (!Object.prototype.hasOwnProperty.call(stateConfig, address)) {
            stateConfig[address] = [];
          }
          const addressConfig = Object.assign({}, config);
          addressConfig.addressConfig = addresses[address];
          stateConfig[address].push(addressConfig);
        });
      });
      cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
    },

    /**
     * Parses meta template definitions and add them to the WidgetParser
     * @param xml {HTMLElement}
     * @param done
     */
    parseTemplates: function (xml, done) {
      const __loadQueue = new qx.data.Array();

      const check = function () {
        if (__loadQueue.length === 0 && done) {
          done();
        }
      };
      const templates = xml.querySelectorAll('meta > templates template');
      if (templates.length === 0) {
        done();
      } else {
        templates.forEach(function (elem) {
          const templateName = elem.getAttribute('name');
          qx.log.Logger.debug(this, 'loading template:', templateName);
          const ref = elem.getAttribute('ref');
          if (ref) {
            // load template fom external file
            const areq = new qx.io.request.Xhr(ref);
            __loadQueue.push(ref);
            qx.log.Logger.debug(this, 'loading template from file:', ref);
            areq.set({
              accept: 'text/plain',
              cache: !cv.Config.forceReload
            });

            areq.addListenerOnce('success', function (e) {
              const req = e.getTarget();
              cv.parser.WidgetParser.addTemplate(
                templateName,
                // templates can only have one single root element, so we wrap it here
                '<root>' + req.getResponseText() + '</root>'
              );
              __loadQueue.remove(areq.getUrl());
              qx.log.Logger.debug(this, 'DONE loading template from file:', ref);
              check();
            }, this);
            areq.addListener('statusError', function () {
              const message = {
                topic: 'cv.config.error',
                title: qx.locale.Manager.tr('Template loading error'),
                severity: 'urgent',
                deletable: true,
                message: qx.locale.Manager.tr('Template \'%1\' could not be loaded from \'%2\'.', templateName, ref)
              };
              cv.core.notifications.Router.dispatchMessage(message.topic, message);
            }, this);
            areq.send();
          } else {
            const cleaned = elem.innerHTML.replace(/\n\s*/g, '').trim();
            cv.parser.WidgetParser.addTemplate(
              templateName,
              // templates can only have one single root element, so we wrap it here
              '<root>' + cleaned + '</root>'
            );
          }
        }, this);
        check();
      }
    }
  }
});
