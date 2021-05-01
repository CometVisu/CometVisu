(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.Config": {},
      "qx.core.Init": {},
      "cv.IconHandler": {},
      "cv.core.notifications.Router": {},
      "cv.ui.NotificationCenter": {},
      "cv.parser.WidgetParser": {},
      "qx.data.Array": {},
      "qx.log.Logger": {},
      "qx.io.request.Xhr": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
      parse: function parse(xml, done) {
        // parse external files
        this.parseFiles(xml); // parse the icons

        xml.querySelectorAll('meta > icons icon-definition').forEach(this.parseIcons, this); // then the mappings

        xml.querySelectorAll('meta > mappings mapping').forEach(this.parseMappings, this); // then the stylings

        xml.querySelectorAll('meta > stylings styling').forEach(this.parseStylings, this); // then the status bar

        this.parseStatusBar(xml);
        this.parseStateNotifications(xml);
        this.parseTemplates(xml, done);
      },
      parseFiles: function parseFiles(xml) {
        var files = {
          css: [],
          js: []
        };
        xml.querySelectorAll('meta > files file').forEach(function (elem) {
          var type = elem.getAttribute('type');
          var content = elem.getAttribute('content');

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
      parseIcons: function parseIcons(elem) {
        cv.Config.configSettings.iconsFromConfig.push(this.__P_6_0(elem));
        qx.core.Init.getApplication().loadIcons();
      },
      parseMappings: function parseMappings(elem) {
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
              var icon = this.__P_6_0(v);

              value.push(cv.IconHandler.getInstance().getIconElement(icon.name, icon.type, icon.flavour, icon.color, icon.styling, icon["class"]));
            } else if (v && v.nodeType === 3 && v.textContent.trim().length) {
              value.push(v.textContent.trim());
            }
          } // check for default entry


          var isDefaultValue = subElem.getAttribute('default');

          if (isDefaultValue !== undefined) {
            isDefaultValue = isDefaultValue === "true";
          } else {
            isDefaultValue = false;
          } // now set the mapped values


          if (subElem.getAttribute('value')) {
            mapping[subElem.getAttribute('value')] = value.length === 1 ? value[0] : value;

            if (isDefaultValue) {
              mapping.defaultValue = subElem.getAttribute('value');
            }
          } else if (subElem.hasAttribute("range_min")) {
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
      parseStylings: function parseStylings(elem) {
        var name = elem.getAttribute('name');
        var classnames = '';
        var styling = {};
        elem.querySelectorAll('entry').forEach(function (subElem) {
          classnames += subElem.textContent + ' '; // check for default entry

          var isDefaultValue = subElem.getAttribute('default');

          if (isDefaultValue !== undefined) {
            isDefaultValue = isDefaultValue === "true";
          } else {
            isDefaultValue = false;
          } // now set the styling values


          if (subElem.getAttribute('value')) {
            styling[subElem.getAttribute('value')] = subElem.textContent;

            if (isDefaultValue) {
              styling.defaultValue = subElem.getAttribute('value');
            }
          } else {
            // a range
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
      parseStatusBar: function parseStatusBar(xml) {
        var code = '';
        xml.querySelectorAll('meta > statusbar status').forEach(function (elem) {
          var condition = elem.getAttribute('condition');
          var extend = elem.getAttribute('hrefextend');
          var sPath = window.location.pathname;
          var sPage = sPath.substring(sPath.lastIndexOf('/') + 1); // @TODO: make this match once the new editor is finished-ish.

          var editMode = 'edit_config.html' === sPage; // skip this element if it's edit-only and we are non-edit, or the other
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
          var search; // compability change to make existing customer configurations work with the new manager links
          // this replaces all document links to old manager tools with the new ones

          var linkMatch;
          var linkRegex = /href="([^"]+)"/gm;
          var matches = [];

          while (linkMatch = linkRegex.exec(text)) {
            matches.push(linkMatch);
          }

          var handled = false;
          search = window.location.search.replace(/\$/g, '$$$$');
          search = search.replace(/.*config=([^&]*).*|.*/, '$1');
          matches.forEach(function (match) {
            switch (match[1]) {
              case 'manager.php':
                text = text.replace(match[0], 'href="#" onclick="showManager()"');
                handled = true;
                break;

              case 'check_config.php':
                text = text.replace(match[0], 'href="#" onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"');
                handled = true;
                break;

              case 'editor/':
              case 'editor':
                var suffix = search ? '_' + search : '';
                text = text.replace(match[0], 'href="#" onclick="showManager(\'open\', \'visu_config' + suffix + '.xml\')"');
                handled = true;
                break;
            }
          });

          if (handled) {
            // this overrides the extends
            extend = null;
          }

          switch (extend) {
            case 'all':
              // append all parameters
              search = window.location.search.replace(/\$/g, '$$$$');
              text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
              break;

            case 'config':
              // append config file info
              search = window.location.search.replace(/\$/g, '$$$$');
              search = search.replace(/.*(config=[^&]*).*|.*/, '$1');
              var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');

              if (0 < middle.indexOf('?')) {
                search = '&' + search;
              } else {
                search = '?' + search;
              }

              text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
              break;

            case 'action':
              search = window.location.search.replace(/\$/g, '$$$$');
              search = search.replace(/.*config=([^&]*).*|.*/, '$1');
              var match = /cv-action="([\w]+)"/.exec(text);

              if (match) {
                var replacement = 'href="#" ';

                switch (match[1]) {
                  case 'validate':
                    replacement += 'onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"';
                    break;

                  case 'edit':
                    var configFile = search ? 'visu_config_' + search + '.xml' : 'visu_config.xml';
                    replacement += 'onclick="showManager(\'open\', \'' + configFile + '\')"';
                    break;
                }

                text = text.replace(match[0], replacement);
              }

              break;
          }

          code += text;
        }, this);
        var footerElement = document.querySelector(".footer");
        footerElement.innerHTML += code;
      },
      parsePlugins: function parsePlugins(xml) {
        var pluginsToLoad = [];
        xml.querySelectorAll('meta > plugins plugin').forEach(function (elem) {
          var name = elem.getAttribute('name');

          if (name) {
            pluginsToLoad.push("plugin-" + name);
          }
        });
        return pluginsToLoad;
      },
      __P_6_0: function __P_6_0(elem) {
        return {
          name: elem.getAttribute('name'),
          uri: elem.getAttribute('uri'),
          type: elem.getAttribute('type'),
          flavour: elem.getAttribute('flavour'),
          color: elem.getAttribute('color'),
          styling: elem.getAttribute('styling'),
          dynamic: elem.getAttribute('dynamic'),
          'class': elem.getAttribute('class')
        };
      },
      parseStateNotifications: function parseStateNotifications(xml) {
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
            config.topic = "cv.state." + name;
          }

          var icon = elem.getAttribute('icon');

          if (icon) {
            config.icon = icon;
            var iconClasses = elem.getAttribute('icon-classes');

            if (iconClasses) {
              config.iconClasses = iconClasses;
            }
          } // templates


          var titleElem = elem.querySelector('title-template');

          if (titleElem) {
            config.titleTemplate = titleElem.innerHTML;
          }

          var messageElem = elem.querySelector('message-template');

          if (messageElem) {
            config.messageTemplate = messageElem.innerHTML;
          } // condition


          var conditionElem = elem.querySelector('condition');
          var condition = conditionElem.textContent;

          if (condition === "true") {
            condition = true;
          } else if (condition === "false") {
            condition = false;
          }

          config.condition = condition;
          var addresses = cv.parser.WidgetParser.makeAddressList(addressContainer); // addresses

          Object.getOwnPropertyNames(addresses).forEach(function (address) {
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
      parseTemplates: function parseTemplates(xml, done) {
        var __P_6_1 = new qx.data.Array();

        var check = function check() {
          if (__P_6_1.length === 0 && done) {
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

              __P_6_1.push(ref);

              qx.log.Logger.debug(this, 'loading template from file:', ref);
              areq.set({
                accept: "text/plain",
                cache: !cv.Config.forceReload
              });
              areq.addListenerOnce("success", function (e) {
                var req = e.getTarget();
                cv.parser.WidgetParser.addTemplate(templateName, // templates can only have one single root element, so we wrap it here
                '<root>' + req.getResponseText() + '</root>');

                __P_6_1.remove(areq.getUrl());

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
              cv.parser.WidgetParser.addTemplate(templateName, // templates can only have one single root element, so we wrap it here
              '<root>' + cleaned + '</root>');
            }
          }, this);
          check();
        }
      }
    }
  });
  cv.parser.MetaParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MetaParser.js.map?dt=1619884686035