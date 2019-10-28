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


qx.Class.define("cv.parser.MetaParser", {
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
      var files = {
        css: [],
        js: []
      };
      xml.querySelectorAll('meta > files file').forEach(function (elem) {
        var type = elem.getAttribute('type');
        var content = elem.getAttribute('content');
        switch (type) {
          case 'css':
            files.css.push(elem.innerText);
            break;

          case 'js':
            if (content === 'plugin') {
              cv.Config.configSettings.pluginsToLoad.push(elem.innerText);
            } else {
              files.js.push(elem.innerText);
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
        cv.util.ScriptLoader.getInstance().addScripts(files.js);
      }
    },

    parseIcons: function(elem) {
      cv.Config.configSettings.iconsFromConfig.push(this.__parseIconDefinition(elem));
      qx.core.Init.getApplication().loadIcons();
    },

    parseMappings: function(elem) {
      var name = elem.getAttribute('name');
      var mapping = {};
      var formula = elem.querySelectorAll('formula');
      if (formula.length > 0) {
        mapping.formulaSource = formula[0].textContent;
        mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;'); // jshint ignore:line
      }
      var subElements = elem.querySelectorAll('entry');
      subElements.forEach(function (subElem) {
        var origin = subElem.childNodes;
        var value = [];
        for (var i = 0; i < origin.length; i++) {
          var v = origin[i];
          if (v && v.nodeType === 1 && v.nodeName.toLowerCase() === 'icon') {
            var icon = this.__parseIconDefinition(v);
            value.push(cv.IconHandler.getInstance().getIconElement(icon.name, icon.type, icon.flavour, icon.color, icon.styling, icon["class"]));
          }
          else if (v.textContent.trim().length) {
            value.push(v.textContent.trim());
          }
        }
        // check for default entry
        var isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue !== undefined) {
          isDefaultValue = isDefaultValue === "true";
        }
        else {
          isDefaultValue = false;
        }
        // now set the mapped values
        if (subElem.getAttribute('value')) {
          mapping[subElem.getAttribute('value')] = value.length === 1 ? value[0] : value;
          if (isDefaultValue) {
            mapping.defaultValue = subElem.getAttribute('value');
          }
        }
        else if (subElem.hasAttribute("range_min")) {
          if (!mapping.range) {
            mapping.range = {};
          }
          mapping.range[parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), value];
          if (isDefaultValue) {
            mapping.defaultValue = parseFloat(subElem.getAttribute('range_min'));
          }
        } else if (subElements.length === 1) {
          // use as catchall mapping
          mapping["*"] = value.length === 1 ? value[0] : value;
        }
      }, this);
      cv.Config.addMapping(name, mapping);
    },

    parseStylings: function(elem) {
      var name = elem.getAttribute('name');
      var classnames = '';
      var styling = {};
      elem.querySelectorAll('entry').forEach(function (subElem) {
        classnames += subElem.textContent + ' ';
        // check for default entry
        var isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue !== undefined) {
          isDefaultValue = isDefaultValue === "true";
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
      var code = '';
      xml.querySelectorAll('meta > statusbar status').forEach(function (elem) {
        var condition = elem.getAttribute('condition');
        var extend = elem.getAttribute('hrefextend');
        var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

        // @TODO: make this match once the new editor is finished-ish.
        var editMode = 'edit_config.html' === sPage;

        // skip this element if it's edit-only and we are non-edit, or the other
        // way
        // round
        if (editMode && '!edit' === condition) {
          return;
        }
        if (!editMode && 'edit' === condition) {
          return;
        }

        if (cv.Config.testMode && '!testMode' === condition) {
          return;
        }
        if (!cv.Config.testMode && 'testMode' === condition) {
          return;
        }

        var text = elem.textContent;
        var search;
        switch (extend) {
          case 'all': // append all parameters
            search = window.location.search.replace(/\$/g, '$$$$');
            text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
            break;
          case 'config': // append config file info
            search = window.location.search.replace(/\$/g, '$$$$');
            search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

            var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
            if (0 < middle.indexOf('?')) {
              search = '&' + search;
            }
            else {
              search = '?' + search;
            }

            text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
            break;
        }
        code += text;
      }, this);
      var footerElement = document.querySelector(".footer");
      footerElement.innerHTML += code;
    },

    parsePlugins: function(xml) {
      var pluginsToLoad = [];
      xml.querySelectorAll('meta > plugins plugin').forEach(function (elem) {
        var name = elem.getAttribute('name');
        if (name) {
          pluginsToLoad.push("plugin-"+name);
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
      var stateConfig = {};
      xml.querySelectorAll('meta > notifications state-notification').forEach(function (elem) {
        var target = cv.core.notifications.Router.getTarget(elem.getAttribute('target')) || cv.ui.NotificationCenter.getInstance();

        var addressContainer = elem.querySelector('addresses');

        var config = {
          target: target,
          severity: elem.getAttribute('severity'),
          skipInitial: elem.getAttribute('skip-initial') !== "false",
          deletable: elem.getAttribute('deletable') !== "false",
          unique: elem.getAttribute('unique') === "true",
          valueMapping: addressContainer.getAttribute('value-mapping'),
          addressMapping: addressContainer.getAttribute('address-mapping')
        };

        var name = elem.getAttribute('name');
        if (name) {
          config.topic = "cv.state."+name;
        }
        var icon = elem.getAttribute('icon');
        if (icon) {
          config.icon = icon;
          var iconClasses = elem.getAttribute('icon-classes');
          if (iconClasses) {
            config.iconClasses = iconClasses;
          }
        }

        // templates
        var titleElem = elem.querySelector('title-template');
        if (titleElem) {
          config.titleTemplate = titleElem.innerHTML;
        }
        var messageElem = elem.querySelector('message-template');
        if (messageElem) {
          config.messageTemplate = messageElem.innerHTML;
        }

        // condition
        var conditionElem = elem.querySelector('condition');
        var condition = conditionElem.innerText;
        if (condition === "true") {
          condition = true;
        } else if (condition === "false") {
          condition = false;
        }
        config.condition = condition;

        var addresses = cv.parser.WidgetParser.makeAddressList(addressContainer);
        // addresses
        Object.getOwnPropertyNames(addresses).forEach(function(address) {
          if (!stateConfig.hasOwnProperty(address)) {
            stateConfig[address] = [];
          }
          var addressConfig = Object.assign({}, config);
          addressConfig.addressConfig = addresses[address];
          stateConfig[address].push(addressConfig);
        });
      });
      cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
    },

    /**
     * Parses meta template definitions and add them to the WidgetParser
     * @param xml {HTMLElement}
     */
    parseTemplates: function (xml, done) {
      var __loadQueue = new qx.data.Array();

      var check = function () {
        if (__loadQueue.length === 0 && done) {
          done();
        }
      };
      var templates = xml.querySelectorAll('meta > templates template');
      if (templates.length === 0) {
        done();
      } else {
        templates.forEach(function (elem) {
          var templateName = elem.getAttribute('name');
          qx.log.Logger.debug(this, 'loading template:', templateName);
          var ref = elem.getAttribute('ref');
          if (ref) {
            // load template fom external file
            var areq = new qx.io.request.Xhr(ref);
            __loadQueue.push(ref);
            qx.log.Logger.debug(this, 'loading template from file:', ref);
            areq.set({
              accept: "text/plain",
              cache: !cv.Config.forceReload
            });

            areq.addListenerOnce("success", function (e) {
              var req = e.getTarget();
              cv.parser.WidgetParser.addTemplate(
                templateName,
                // templates can only have one single root element, so we wrap it here
                '<root>' + req.getResponseText() + '</root>'
              );
              __loadQueue.remove(areq.getUrl());
              qx.log.Logger.debug(this, 'DONE loading template from file:', ref);
              check();
            }, this);
            areq.addListener("statusError", function () {
              var message = {
                topic: "cv.config.error",
                title: qx.locale.Manager.tr("Template loading error"),
                severity: "urgent",
                deletable: true,
                message: qx.locale.Manager.tr("Template '%1' could not be loaded from '%2'.", templateName, ref)
              };
              cv.core.notifications.Router.dispatchMessage(message.topic, message);
            }, this);
            areq.send();
          } else {
            var cleaned = elem.innerHTML.replace(/\n\s*/g, '').trim();
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
