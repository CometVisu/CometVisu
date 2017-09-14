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

    parse: function(xml) {
      // parse the icons
      qx.bom.Selector.query('meta > icons icon-definition', xml).forEach(this.parseIcons, this);

      // then the mappings
      qx.bom.Selector.query('meta > mappings mapping', xml).forEach(this.parseMappings, this);

      // then the stylings
      qx.bom.Selector.query('meta > stylings styling', xml).forEach(this.parseStylings, this);

      // then the status bar
      qx.bom.Selector.query('meta > statusbar status', xml).forEach(this.parseStatusBar, this);

      this.parseStateNotifications(xml);
    },

    parseIcons: function(elem) {
      cv.Config.iconsFromConfig.push(this.__parseIconDefinition(elem));
    },

    parseMappings: function(elem) {
      var name = qx.bom.element.Attribute.get(elem, 'name');
      var mapping = {};
      var formula = qx.bom.Selector.query('formula', elem);
      if (formula.length > 0) {
        var func = qx.lang.Function.globalEval('var func = function(x){var y;' + qx.dom.Node.getText(formula[0]) + '; return y;}; func');
        mapping.formula = func;
      }
      qx.bom.Selector.query('entry', elem).forEach(function (subElem) {
        var origin = subElem.childNodes;
        var value = [];
        for (var i = 0; i < origin.length; i++) {
          var v = origin[i];
          if (qx.dom.Node.isElement(v) && qx.dom.Node.getName(v).toLowerCase() === 'icon') {
            var icon = this.__parseIconDefinition(v);
            value.push(cv.IconHandler.getInstance().getIconElement(icon.name, icon.type, icon.flavour, icon.color, icon.styling, icon["class"]));
          }
          else if (qx.dom.Node.getText(v).trim().length) {
            value.push(qx.dom.Node.getText(v).trim());
          }
        }
        // check for default entry
        var isDefaultValue = qx.bom.element.Attribute.get(subElem, 'default');
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
        else {
          if (!mapping.range) {
            mapping.range = {};
          }
          mapping.range[parseFloat(qx.bom.element.Attribute.get(subElem, 'range_min'))] = [parseFloat(qx.bom.element.Attribute.get(subElem, 'range_max')), value];
          if (isDefaultValue) {
            mapping.defaultValue = parseFloat(qx.bom.element.Attribute.get(subElem, 'range_min'));
          }
        }
      }, this);
      cv.Config.addMapping(name, mapping);
    },

    parseStylings: function(elem) {
      var name = qx.bom.element.Attribute.get(elem, 'name');
      var classnames = '';
      var styling = {};
      qx.bom.Selector.query('entry', elem).forEach(function (subElem) {
        classnames += qx.dom.Node.getText(subElem) + ' ';
        // check for default entry
        var isDefaultValue = qx.bom.element.Attribute.get(subElem, 'default');
        if (isDefaultValue !== undefined) {
          isDefaultValue = isDefaultValue === "true";
        } else {
          isDefaultValue = false;
        }
        // now set the styling values
        if (subElem.getAttribute('value')) {
          styling[subElem.getAttribute('value')] = qx.dom.Node.getText(subElem);
          if (isDefaultValue) {
            styling.defaultValue = subElem.getAttribute('value');
          }
        } else { // a range
          if (!styling.range) {
            styling.range = {};
          }
          styling.range[parseFloat(qx.bom.element.Attribute.get(subElem, 'range_min'))] = [parseFloat(qx.bom.element.Attribute.get(subElem, 'range_max')), qx.dom.Node.getText(subElem)];
          if (isDefaultValue) {
            styling.defaultValue = parseFloat(qx.bom.element.Attribute.get(subElem, 'range_min'));
          }
        }
      }, this);
      styling.classnames = classnames.trim();
      cv.Config.addStyling(name, styling);
    },

    parseStatusBar: function(elem) {
      var condition = qx.bom.element.Attribute.get(elem,'condition');
      var extend = qx.bom.element.Attribute.get(elem,'hrefextend');
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

      var text = qx.dom.Node.getText(elem);
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
      var footerElement = qx.bom.Selector.query(".footer")[0];
      footerElement.innerHTML += text;
    },

    parsePlugins: function(xml) {
      var pluginsToLoad = [];
      qx.bom.Selector.query('meta > plugins plugin', xml).forEach(function (elem) {
        var name = qx.bom.element.Attribute.get(elem, 'name');
        if (name) {
          pluginsToLoad.push("plugin-"+name);
        }
      });
      return pluginsToLoad;
    },

    __parseIconDefinition: function(elem) {
      return {
        name : qx.bom.element.Attribute.get(elem, 'name'),
        uri : qx.bom.element.Attribute.get(elem, 'uri'),
        type : qx.bom.element.Attribute.get(elem, 'type'),
        flavour : qx.bom.element.Attribute.get(elem, 'flavour'),
        color : qx.bom.element.Attribute.get(elem, 'color'),
        styling : qx.bom.element.Attribute.get(elem, 'styling'),
        dynamic : qx.bom.element.Attribute.get(elem, 'dynamic'),
        'class' : qx.bom.element.Attribute.get(elem, 'class')
      };
    },

    parseStateNotifications: function(xml) {
      var stateConfig = {};
      qx.bom.Selector.query('meta > notifications state-notification', xml).forEach(function (elem) {
        var target = cv.ui.NotificationCenter.getInstance();
        switch (qx.bom.element.Attribute.get(elem, 'target')) {
          case "popup":
            target = cv.ui.PopupHandler;
            break;
          case "notificationCenter":
            target = cv.ui.NotificationCenter.getInstance();
            break;
        }

        var addressContainer = qx.bom.Selector.query('addresses', elem)[0];

        var config = {
          target: target,
          severity: qx.bom.element.Attribute.get(elem, 'severity'),
          skipInitial: qx.bom.element.Attribute.get(elem, 'skip-initial') !== "false",
          deletable: qx.bom.element.Attribute.get(elem, 'deletable') !== "false",
          unique: qx.bom.element.Attribute.get(elem, 'unique') === "true",
          valueMapping: qx.bom.element.Attribute.get(addressContainer, 'value-mapping'),
          addressMapping: qx.bom.element.Attribute.get(addressContainer, 'address-mapping')
        };

        var name = qx.bom.element.Attribute.get(elem, 'name');
        if (name) {
          config.topic = "cv.state."+name;
        }

        // templates
        var titleElem = qx.bom.Selector.query('title-template', elem)[0];
        if (titleElem) {
          config.titleTemplate = qx.bom.element.Attribute.get(titleElem, "html");
        }
        var messageElem = qx.bom.Selector.query('message-template', elem)[0];
        if (messageElem) {
          config.messageTemplate = qx.bom.element.Attribute.get(messageElem, "html");
        }

        // condition
        var conditionElem = qx.bom.Selector.query('condition', elem)[0];
        var condition = qx.bom.element.Attribute.get(conditionElem, "text");
        if (condition === "true") {
          condition = true;
        } else if (condition === "false") {
          condition = false;
        }
        config.condition = condition;

        // TODO parse complete address with transform etc.
        var addresses = cv.parser.WidgetParser.makeAddressList(addressContainer, null, null, true);
        // addresses
        Object.getOwnPropertyNames(addresses).forEach(function(address) {
          if (!stateConfig.hasOwnProperty(address)) {
            stateConfig[address] = [];
          }
          var addressConfig = qx.lang.Object.clone(config);
          addressConfig.addressConfig = addresses[address];
          stateConfig[address].push(addressConfig);
        });
      });
      cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
    }
  }
});