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
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ConfigUpgrader.js
   *
   * copyright (c) 2010-2020, Christian Mayer and the CometVisu contributers.
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
      __P_497_0: 2,
      __P_497_1: null,

      /**
       * Upgrade config source
       * @param source {String|Document} content of a config file
       */
      upgrade: function upgrade(source) {
        this.__P_497_1 = [];

        if (typeof source === 'string') {
          source = qx.xml.Document.fromString(source);
        } // read version from config


        var pagesNode = source.querySelector('pages');
        var version = parseInt(pagesNode.getAttribute('lib_version'));

        if (version === cv.Version.LIBRARY_VERSION) {
          // nothing to do
          return [null, source, this.__P_497_1];
        } else {
          while (version < cv.Version.LIBRARY_VERSION) {
            // upgrade step by step
            var method = this['from' + version + 'to' + (version + 1)];

            if (method) {
              version = method.call(this, source);
            } else {
              return [qx.locale.Manager.tr('Upgrader from version %1 not implemented', version), source, this.__P_497_1];
            }
          }

          this.info('  - ' + this.__P_497_1.join('\n  - '));
          return [null, source, this.__P_497_1];
        }
      },
      from7to8: function from7to8(source) {
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

        this.__P_497_2(source, 8);

        if (c > 0) {
          this.__P_497_1.push('removed ' + c + ' \'plugin\'-nodes with obsolete plugin (gweather)');
        }

        return 8;
      },
      from8to9: function from8to9(source) {
        var _this = this;

        var c = 0;
        var singleIndent = ''.padEnd(this.__P_497_0, ' ');
        source.querySelectorAll('multitrigger').forEach(function (node) {
          var level = _this.__P_497_3(node);

          level++;
          var indent = ''.padEnd(_this.__P_497_0 * level, ' ');
          var buttonConf = {};
          var attributesToDelete = [];
          var nameRegex = /^button([\d]+)(label|value)$/;

          for (var i = 0, l = node.attributes.length; i < l; i++) {
            var match = nameRegex.exec(node.attributes[i].name);

            if (match) {
              if (!buttonConf.hasOwnProperty(match[1])) {
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

              var ind = source.createTextNode("\n" + indent + singleIndent);
              buttons.appendChild(ind);
              buttons.appendChild(button);
            });
            buttons.appendChild(source.createTextNode("\n" + indent));
            node.appendChild(source.createTextNode(singleIndent));
            node.appendChild(buttons);
            node.appendChild(source.createTextNode("\n" + ''.padEnd(_this.__P_497_0 * (level - 1), ' ')));
            c++;
          }
        });

        this.__P_497_2(source, 9);

        if (c > 0) {
          this.__P_497_1.push('converted ' + c + ' \'multitrigger\'-nodes to new button configuration');
        }

        return 9;
      },
      __P_497_3: function __P_497_3(node) {
        var level = 1;
        var parent = node.parentNode;

        while (parent && parent.nodeName !== 'pages') {
          parent = parent.parentNode;
          level++;
        }

        return level;
      },
      __P_497_2: function __P_497_2(xml, version) {
        xml.querySelector('pages').getAttributeNode('lib_version').value = version;
      }
    }
  });
  cv.util.ConfigUpgrader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigUpgrader.js.map?dt=1619883177655