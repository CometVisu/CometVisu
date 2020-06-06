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
    __indentation: 2,
    __log: null,

    /**
     * Upgrade config source
     * @param source {String|Document} content of a config file
     */
    upgrade (source) {
      this.__log = [];
      if (typeof source === 'string') {
        source = qx.xml.Document.fromString(source);
      }
      // read version from config
      const pagesNode = source.querySelector('pages');
      let version = parseInt(pagesNode.getAttribute('lib_version'));
      if (version === cv.Version.LIBRARY_VERSION) {
        // nothing to do
        return [null, source, this.__log];
      } else {
        while (version < cv.Version.LIBRARY_VERSION) {
          // upgrade step by step
          const method = this['from' + version + 'to' + (version + 1)];
          if (method) {
            version = method.call(this, source);
          } else {
            return [qx.locale.Manager.tr('Upgrader from version %1 not implemented', version), source, this.__log]
          }
        }
        this.info('  - ' + this.__log.join('\n  - '));
        return [null, source, this.__log];
      }
    },

    from7to8 (source) {
      let c = 0;
      source.querySelectorAll('plugins > plugin[name=\'gweather\']').forEach(node => {
        const parent = node.parentNode;
        const indentNode = node.previousSibling;
        parent.removeChild(node);
        if (indentNode.nodeType === 3) {
          parent.removeChild(indentNode);
        }
        c++;
      });
      this.__setVersion(source, 8);
      this.__log.push('removed ' + c + ' \'plugin\'-nodes with obsolete plugin (gweather)');
      return 8;
    },

    from8to9 (source) {
      let c = 0;
      const singleIndent = ''.padEnd(this.__indentation, ' ');
      source.querySelectorAll('multitrigger').forEach(node => {
        let level = this.__getLevel(node);
        level++;
        const indent = ''.padEnd(this.__indentation * level, ' ');
        const buttonConf = {};
        const attributesToDelete = [];
        const nameRegex = /^button([\d]+)(label|value)$/
        for (let i = 0, l = node.attributes.length; i < l; i++) {
          const match = nameRegex.exec(node.attributes[i].name);
          if (match) {
            if (!buttonConf.hasOwnProperty(match[1])) {
              buttonConf[match[1]] = {};
            }
            buttonConf[match[1]][match[2]] = node.attributes[i].value;
            attributesToDelete.push(node.attributes[i]);
          }
        }
        attributesToDelete.forEach(attr => node.removeAttributeNode(attr));
        const buttonIds = Object.keys(buttonConf).sort();
        if (buttonIds.length > 0) {
          const buttons = source.createElement('buttons');
          buttonIds.forEach(bid => {
            const button = source.createElement('button');
            button.textContent = buttonConf[bid].value;
            if (buttonConf[bid].label) {
              button.setAttribute('label', buttonConf[bid].label);
            }
            const ind = source.createTextNode("\n" + indent + singleIndent);
            buttons.appendChild(ind);
            buttons.appendChild(button);
          });
          buttons.appendChild(source.createTextNode("\n" + indent));
          node.appendChild(source.createTextNode(singleIndent));
          node.appendChild(buttons);
          node.appendChild(source.createTextNode("\n" + ''.padEnd(this.__indentation * (level - 1), ' ')));
          c++;
        }
      });
      this.__setVersion(source, 9);
      this.__log.push('converted ' + c + ' \'multitrigger\'-nodes to new button configuration');
      return 9;
    },

    __getLevel (node) {
      let level = 1;
      let parent = node.parentNode;
      while (parent && parent.nodeName !== 'pages') {
        parent = parent.parentNode;
        level++;
      }
      return level;
    },

    __setVersion (xml, version) {
      xml.querySelector('pages').getAttributeNode('lib_version').value = version;
    }
  }
});
