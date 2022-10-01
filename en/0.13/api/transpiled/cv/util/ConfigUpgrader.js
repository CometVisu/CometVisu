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
      "qx.xml.Document": {},
      "cv.Version": {},
      "qx.locale.Manager": {},
      "cv.util.Prettifier": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ConfigUpgrader.js 
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
   * Upgrade config file to the current library version
   * @since 0.12.0
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.util.ConfigUpgrader', {
    extend: qx.core.Object,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_526_0: 2,
      __P_526_1: null,

      /**
       * Upgrade config source
       * @param source {String|Document} content of a config file
       */
      upgrade: function upgrade(source) {
        this.__P_526_1 = [];

        if (typeof source === 'string') {
          source = qx.xml.Document.fromString(source);
        } // read version from config


        var pagesNode = source.documentElement;
        var isTileStructure = pagesNode.tagName.toLowerCase() === 'config';
        var systemLibVersion = isTileStructure ? cv.Version.LIBRARY_VERSION_TILE : cv.Version.LIBRARY_VERSION_PURE;
        var version = isTileStructure ? parseInt(pagesNode.getAttribute('version')) : parseInt(pagesNode.getAttribute('lib_version'));

        if (version === cv.Version.LIBRARY_VERSION_PURE) {
          // nothing to do
          return [null, source, this.__P_526_1];
        }

        var suffix = isTileStructure ? 'Tile' : 'Pure';

        while (version < systemLibVersion) {
          // upgrade step by step
          var method = this['from' + version + 'to' + (version + 1) + suffix];

          if (method) {
            version = method.call(this, source);
          } else {
            return [qx.locale.Manager.tr('Upgrader from version %1 not implemented', version), source, this.__P_526_1];
          }
        }

        this.info('  - ' + this.__P_526_1.join('\n  - '));
        return [null, source, this.__P_526_1];
      },
      from7to8Pure: function from7to8Pure(source) {
        var c = 0;
        source.querySelectorAll('plugins > plugin[name=\'gweather\']').forEach(function (node) {
          var parent = node.parentNode;
          var indentNode = node.previousSibling;
          parent.removeChild(node);

          if (indentNode.nodeType === 3) {
            parent.removeChild(indentNode);
          }

          c++;
        });

        this.__P_526_2(source, 8);

        if (c > 0) {
          this.__P_526_1.push('removed ' + c + ' \'plugin\'-nodes with obsolete plugin (gweather)');
        }

        return 8;
      },
      from8to9Pure: function from8to9Pure(source) {
        var _this = this;

        var c = 0;
        var singleIndent = ''.padEnd(this.__P_526_0, ' ');
        source.querySelectorAll('multitrigger').forEach(function (node) {
          var level = _this.__P_526_3(node);

          level++;
          var indent = ''.padEnd(_this.__P_526_0 * level, ' ');
          var buttonConf = {};
          var attributesToDelete = [];
          var nameRegex = /^button([\d]+)(label|value)$/;

          for (var i = 0, l = node.attributes.length; i < l; i++) {
            var match = nameRegex.exec(node.attributes[i].name);

            if (match) {
              if (!Object.prototype.hasOwnProperty.call(buttonConf, match[1])) {
                buttonConf[match[1]] = {};
              }

              buttonConf[match[1]][match[2]] = node.attributes[i].value;
              attributesToDelete.push(node.attributes[i]);
            }
          }

          attributesToDelete.forEach(function (attr) {
            return node.removeAttributeNode(attr);
          });
          var buttonIds = Object.keys(buttonConf).sort();

          if (buttonIds.length > 0) {
            var buttons = source.createElement('buttons');
            buttonIds.forEach(function (bid) {
              var button = source.createElement('button');
              button.textContent = buttonConf[bid].value;

              if (buttonConf[bid].label) {
                button.setAttribute('label', buttonConf[bid].label);
              }

              var ind = source.createTextNode('\n' + indent + singleIndent);
              buttons.appendChild(ind);
              buttons.appendChild(button);
            });
            buttons.appendChild(source.createTextNode('\n' + indent));
            node.appendChild(source.createTextNode(singleIndent));
            node.appendChild(buttons);
            node.appendChild(source.createTextNode('\n' + ''.padEnd(_this.__P_526_0 * (level - 1), ' ')));
            c++;
          }
        });

        this.__P_526_2(source, 9);

        if (c > 0) {
          this.__P_526_1.push('converted ' + c + ' \'multitrigger\'-nodes to new button configuration');
        }

        return 9;
      },
      __P_526_3: function __P_526_3(node) {
        var level = 1;
        var parent = node.parentNode;

        while (parent && parent.nodeName !== 'pages') {
          parent = parent.parentNode;
          level++;
        }

        return level;
      },
      __P_526_2: function __P_526_2(xml, version, isTile) {
        if (isTile === true) {
          xml.documentElement.setAttribute('version', version);
        } else {
          xml.documentElement.setAttribute('lib_version', version);
        }
      },

      /**
       * Converts a pure-config file to a tile-config file. Currently only a small amount widgets can be converted
       * because they have a similar equivalent in the tile-structure. This is the list of converted widgets:
       *  - Pages
       *  - Meta-Area (only mappings, stylings and files)
       *  - Switch (without mappings, stylings)
       *  - Info
       *  - Pushbutton (without mappings, stylings)
       *  - Trigger (without mappings, stylings)
       *  - Group (only the ones that do not have nowidget="true")
       *
       *  Whats not working:
       *  - Everything that uses templates
       *  - All other widgets that have not been mentioned above
       *
       * @param sourceXml {XMLDocument|string}
       * @return [{String}, {String}] Error, Result
       */
      convertPureToTile: function convertPureToTile(sourceXml) {
        if (typeof sourceXml === 'string') {
          sourceXml = qx.xml.Document.fromString(sourceXml);
        }

        var rootNode = sourceXml.documentElement;

        if (rootNode.tagName.toLowerCase() === 'pages') {
          var target = document.implementation.createDocument(null, 'config');
          var targetRoot = target.documentElement;
          targetRoot.setAttribute('version', '1');
          var attr = target.createAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'noNamespaceSchemaLocation');
          attr.value = '../visu_config_tile.xsd';
          targetRoot.setAttributeNodeNS(attr); // add some basics

          var header = target.createElement('header');
          var nav = target.createElement('nav');
          var menu = target.createElement('cv-menu');
          menu.setAttribute('model', 'pages');
          nav.appendChild(menu);
          header.appendChild(nav);
          targetRoot.appendChild(header);
          var main = target.createElement('main');
          targetRoot.appendChild(main);

          this._convertElement(targetRoot, rootNode, {
            pageIds: []
          }); //console.log(new XMLSerializer().serializeToString(target));


          return ['', cv.util.Prettifier.xml(target)];
        }

        return [qx.locale.Manager.tr('This is no pure-structure config, root element pages not found'), ''];
      },

      /**
       * @param target {Element}
       * @param element {Element}
       * @param options {Object}
       * @private
       */
      _convertElement: function _convertElement(target, element, options) {
        var _this2 = this;

        if (!options) {
          options = {};
        }

        var tagName = element.tagName.toLowerCase();
        var attr;
        var id;
        var postfix;

        switch (tagName) {
          case 'pages':
            for (var i = element.attributes.length - 1; i >= 0; i--) {
              attr = element.attributes[i];

              if (attr.name.startsWith('backend')) {
                if (!options.backends) {
                  options.backends = {};
                }

                options.backends[attr.name] = attr.value;
              } else {
                switch (attr.name) {
                  case 'username':
                  case 'password':
                    if (!options.backends) {
                      options.backends = {};
                    }

                    options.backends[attr.name] = attr.value;
                    break;

                  default:
                    this.debug("ignoring attribute ".concat(attr.name, " from element ").concat(tagName));
                    break;
                }
              }
            }

            break;

          case 'page':
            postfix = options.pageIds.length;
            id = 'page-' + postfix;

            if (element.hasAttribute('name')) {
              target.setAttribute('name', element.getAttribute('name'));
            }

            target.setAttribute('id', id);
            options.pageIds.push(id);
            break;
        } // traverse children


        var child;
        var clonedChild;
        var elem;
        var value;

        for (var _i = 0; _i < element.childNodes.length; _i++) {
          child = element.childNodes[_i];

          switch (child.nodeType) {
            case Node.CDATA_SECTION_NODE:
            case Node.COMMENT_NODE:
              // just copy
              target.appendChild(child.cloneNode());
              break;

            case Node.ELEMENT_NODE:
              switch (child.tagName.toLowerCase()) {
                case 'meta':
                  clonedChild = target.ownerDocument.createElement('cv-' + child.tagName); // copy mappings

                  child.querySelectorAll('mappings > mapping').forEach(function (node) {
                    var mapping = target.ownerDocument.createElement('cv-mapping');

                    _this2._copyAttributes(node, mapping);

                    _this2._copyChildren(node, mapping);

                    clonedChild.appendChild(mapping);
                  });
                  child.querySelectorAll('stylings > styling').forEach(function (node) {
                    var styling = target.ownerDocument.createElement('cv-styling');

                    _this2._copyAttributes(node, styling);

                    _this2._copyChildren(node, styling);

                    clonedChild.appendChild(styling);
                  }); // convert files to loader

                  child.querySelectorAll('file').forEach(function (fileNode) {
                    var loader = target.ownerDocument.createElement('cv-loader');
                    loader.setAttribute('type', fileNode.getAttribute('type'));
                    loader.setAttribute('src', fileNode.textContent.trim());
                    clonedChild.appendChild(loader);
                  }); // prefix all icons with knxuf-

                  clonedChild.querySelectorAll('icon').forEach(function (icon) {
                    // there is no real check if this is an KNXUF icon, so we only check for '_' in string
                    var name = icon.getAttribute('name');

                    if (name.indexOf('_') >= 0) {
                      name = 'knxuf-' + name;
                    }

                    icon.parentElement.textContent = name;
                    icon.remove();
                  });
                  clonedChild.querySelectorAll('entry').forEach(function (entry) {
                    if (entry.hasAttribute('range_min')) {
                      entry.setAttribute('range-min', entry.getAttribute('range_min'));
                      entry.removeAttribute('range_min');
                    }

                    if (entry.hasAttribute('range_max')) {
                      entry.setAttribute('range-max', entry.getAttribute('range_max'));
                      entry.removeAttribute('range_max');
                    }
                  });

                  if (options.backends) {
                    if (options.backends.backend) {
                      var backend = target.ownerDocument.createElement('cv-backend');
                      var type = void 0;

                      switch (options.backends.backend) {
                        case 'oh2':
                        case 'oh':
                        case 'openhab2':
                          type = 'openhab';
                          break;

                        case 'default':
                        case 'cgi-bin':
                          type = 'knxd';
                          break;

                        default:
                          type = options.backends.backend;
                          break;
                      }

                      backend.setAttribute('type', type);

                      if (options.backends['backend-' + type + '-url']) {
                        backend.setAttribute('uri', options.backends['backend-' + type + '-url']);
                      }

                      if (options.backends.username) {
                        backend.setAttribute('username', options.backends.username);
                      }

                      if (options.backends.password) {
                        backend.setAttribute('password', options.backends.password);
                      }
                    }
                  }

                  target.ownerDocument.documentElement.insertBefore(clonedChild, target.ownerDocument.documentElement.firstChild);
                  break;

                case 'page':
                  clonedChild = target.ownerDocument.createElement('cv-' + child.tagName); // flatten first two page levels

                  if (child.parentElement.tagName.toLowerCase() === 'pages' || child.parentElement.parentElement.tagName.toLowerCase() === 'pages') {
                    var main = target.ownerDocument.querySelector('main');
                    main.appendChild(clonedChild);
                  } else {
                    target.appendChild(clonedChild);
                  }

                  this._convertElement(clonedChild, child, options);

                  break;

                case 'group':
                  if (child.getAttribute('nowidget') === 'true') {
                    this.warn('skipping nowidget-groups');
                  } else {
                    clonedChild = target.ownerDocument.createElement('cv-' + child.tagName);
                    clonedChild.setAttribute('open', 'true');

                    if (child.hasAttribute('name')) {
                      clonedChild.setAttribute('name', child.getAttribute('name'));
                    }

                    target.appendChild(clonedChild);

                    this._convertElement(clonedChild, child, options);
                  }

                  break;

                case 'switch':
                  clonedChild = target.ownerDocument.createElement('cv-' + child.tagName); // do not copy mappings and styling as they might not work for switched in most of the cases
                  // and we want to used the default ones in the first place

                  this._copyAttributes(child, clonedChild, {
                    on_value: 'on-value',
                    off_value: 'off-value'
                  });

                  if (child.getAttribute('bind_click_to_widget') === 'false') {
                    // only copy when this ix explicitly set
                    clonedChild.setAttribute('whole-tile', 'false');
                  }

                  this._copyAddresses(child.querySelectorAll(':scope > address'), clonedChild, 'address');

                  this._copyLabel(child.querySelector(':scope > label'), clonedChild, 'primaryLabel');

                  target.appendChild(clonedChild);
                  break;

                case 'trigger':
                  clonedChild = target.ownerDocument.createElement('cv-switch');

                  this._copyAttributes(child, clonedChild, {
                    format: true
                  });

                  value = child.getAttribute('value');

                  this._copyAddresses(child.querySelectorAll(':scope > address'), clonedChild, 'address', null, function (address) {
                    address.setAttribute('mode', 'write');
                    address.setAttribute('value', value);
                  });

                  this._copyLabel(child.querySelector(':scope > label'), clonedChild, 'primaryLabel');

                  target.appendChild(clonedChild);
                  break;

                case 'pushbutton':
                  clonedChild = target.ownerDocument.createElement('cv-switch');

                  this._copyAttributes(child, clonedChild, {
                    format: true
                  });

                  value = {
                    down: child.getAttribute('downValue'),
                    up: child.getAttribute('upValue')
                  };

                  this._copyAddresses(child.querySelectorAll(':scope > address'), clonedChild, 'address', null, function (address) {
                    if (!address.hasAttribute('variant')) {
                      address.setAttribute('value', value.down);
                      address.setAttribute('on', 'down');
                      var upAddress = address.cloneNode(true);
                      upAddress.setAttribute('value', value.up);
                      upAddress.setAttribute('on', 'up');
                      clonedChild.appendChild(upAddress);
                    } else {
                      address.setAttribute('value', address.getAttribute('variant') === 'up' ? value.up : value.down);
                      address.setAttribute('on', address.getAttribute('variant'));
                      address.removeAttribute('variant');
                    }
                  });

                  this._copyLabel(child.querySelector(':scope > label'), clonedChild, 'primaryLabel');

                  target.appendChild(clonedChild);
                  break;

                case 'info':
                  // use cv-value > cv-icon when the mapping uses icons
                  if (child.hasAttribute('mapping') && child.ownerDocument.querySelector('mapping[name="' + child.getAttribute('mapping') + '"] > entry > icon')) {
                    clonedChild = target.ownerDocument.createElement('cv-tile');
                    var sourceLabel = child.querySelector(':scope > label');

                    if (sourceLabel) {
                      var row = target.ownerDocument.createElement('cv-row');
                      row.setAttribute('colspan', '3');
                      row.setAttribute('row', 'last');
                      var label = target.ownerDocument.createElement('label');
                      label.setAttribute('class', 'primary');
                      label.textContent = sourceLabel.textContent.trim();
                      row.appendChild(label);
                      clonedChild.appendChild(row);
                    }

                    var _value = target.ownerDocument.createElement('cv-value');

                    _value.setAttribute('colspan', '3');

                    _value.setAttribute('row', '2');

                    this._copyAttributes(child, _value, {
                      mapping: true,
                      styling: true,
                      format: true
                    });

                    var icon = target.ownerDocument.createElement('cv-icon');
                    icon.setAttribute('class', 'value');
                    icon.setAttribute('size', 'xxx-large');

                    _value.appendChild(icon);

                    this._copyAddresses(child.querySelectorAll(':scope > address'), _value);

                    clonedChild.appendChild(_value);
                  } else {
                    clonedChild = target.ownerDocument.createElement('cv-' + child.tagName);

                    this._copyAddresses(child.querySelectorAll(':scope > address'), clonedChild, 'address');

                    this._copyLabel(child.querySelector(':scope > label'), clonedChild, 'label');

                    this._copyAttributes(child, clonedChild, {
                      mapping: true,
                      styling: true,
                      format: true
                    });
                  }

                  target.appendChild(clonedChild);
                  break;

                case 'infoaction':
                  clonedChild = target.ownerDocument.createElement('cv-tile-pair');
                  target.appendChild(clonedChild);

                  if (child.querySelector('widgetinfo')) {
                    this._convertElement(clonedChild, child.querySelector('widgetinfo'), options);

                    if (child.querySelector(':scope > label')) {
                      elem = clonedChild.querySelector(':scope > cv-info');

                      if (elem) {
                        this._copyLabel(child.querySelector(':scope > label'), elem, 'label');
                      }
                    }
                  }

                  if (child.querySelector('widgetaction')) {
                    this._convertElement(clonedChild, child.querySelector('widgetaction'), options);
                  }

                  break;

                case 'layout':
                  // silently ignore those
                  break;

                default:
                  this.info('cannot convert', child.nodeName); // no conversion possible, add as comment placeholder for manual conversion

                  clonedChild = target.ownerDocument.createComment("\n                \n###########################################################\n### Automatic conversion to tile-structure not possible ###\n###########################################################\n".concat(child.previousSibling.nodeType === Node.TEXT_NODE ? child.previousSibling.textContent : '').concat(child.outerHTML.replaceAll('<!--', '').replaceAll('-->', '')));
                  target.appendChild(clonedChild);
                  break;
              }

              break;
          }
        }
      },

      /**
       * @param source {Element}
       * @param target {Element}
       * @param converters {Object|null}
       * @private
       */
      _copyAttributes: function _copyAttributes(source, target, converters) {
        var converter;

        for (var i = 0; i < source.attributes.length; i++) {
          if (!converters) {
            target.setAttribute(source.attributes[i].name, source.attributes[i].value);
          } else {
            converter = converters[source.attributes[i].name];

            if (converter === true) {
              target.setAttribute(source.attributes[i].name, source.attributes[i].value);
            } else if (typeof converter === 'string') {
              target.setAttribute(converter, source.attributes[i].value);
            }
          }
        }
      },
      _copyAddresses: function _copyAddresses(addresses, target, slotName, converters, callback) {
        var _this3 = this;

        addresses.forEach(function (e) {
          var address = target.ownerDocument.createElement('cv-address');

          if (slotName) {
            address.setAttribute('slot', slotName);
          }

          _this3._copyAttributes(e, address, converters);

          address.textContent = e.textContent.trim();

          if (callback) {
            callback(address);
          }

          target.appendChild(address);
        });
      },
      _copyLabel: function _copyLabel(sourceLabel, target, slotName) {
        if (sourceLabel) {
          // <span slot="primaryLabel">Default</span>
          var label = target.ownerDocument.createElement('span');
          label.setAttribute('slot', slotName);
          var child;

          for (var i = 0; i < sourceLabel.childNodes.length; i++) {
            child = sourceLabel.childNodes[i];

            if (child.nodeType === Node.TEXT_NODE) {
              label.appendChild(child.cloneNode());
            } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'icon') {
              var icon = target.ownerDocument.createElement('cv-icon');
              var name = child.getAttribute('name');

              if (name.indexOf('_') >= 0) {
                name = 'knxuf-' + name;
              }

              icon.textContent = name;
              label.appendChild(icon);
            }
          }

          target.appendChild(label);
        }
      },

      /**
       * @param source {Element}
       * @param target {Element}
       * @private
       */
      _copyChildren: function _copyChildren(source, target) {
        for (var i = 0; i < source.childNodes.length; i++) {
          target.appendChild(source.childNodes[i].cloneNode(true));
        }
      }
    }
  });
  cv.util.ConfigUpgrader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigUpgrader.js.map?dt=1664613656405