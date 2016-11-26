qx.Class.define("cv.xml.parser.Meta", {
  extend: cv.Object,

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
    },

    parseIcons: function(elem) {
      var icon = this.__parseIconDefinition(elem);
      cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic);
    },

    parseMappings: function(elem) {
      var name = elem.getAttribute('name');
      var mapping = {};
      var formula = qx.bom.Selector.query('formula', elem);
      if (formula.length > 0) {
        var func = qx.lang.Function.globalEval('var func = function(x){var y;' + formula.textContent + '; return y;}; func');
        mapping['formula'] = func;
      }
      qx.bom.Selector.query('entry', elem).forEach(function (subElem) {
        var origin = subElem.childNodes;
        var value = [];
        for (var i = 0; i < origin.length; i++) {
          var v = origin[i];
          if (qx.dom.Node.isElement(v) && v.tagName.toLowerCase() == 'icon') {
            var icon = this.__parseIconDefinition(v);
            value[i] = cv.IconHandler.getInstance().getIconElement(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.class);
          }
          else {
            value[i] = v.textContent;
          }
        }
        // check for default entry
        var isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue != undefined) {
          isDefaultValue = isDefaultValue == "true";
        }
        else {
          isDefaultValue = false;
        }
        // now set the mapped values
        if (subElem.getAttribute('value')) {
          mapping[subElem.getAttribute('value')] = value.length == 1 ? value[0] : value;
          if (isDefaultValue) {
            mapping['defaultValue'] = subElem.getAttribute('value');
          }
        }
        else {
          if (!mapping['range']) {
            mapping['range'] = {};
          }
          mapping['range'][parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), value];
          if (isDefaultValue) {
            mapping['defaultValue'] = parseFloat(subElem.getAttribute('range_min'));
          }
        }
      }, this);
      cv.ui.Mappings.addMapping(name, mapping);
    },

    parseStylings: function(elem) {
      var name = elem.getAttribute('name');
      var classnames = '';
      var styling = {};
      qx.bom.Selector.query('entry', elem).forEach(function (subElem) {
        classnames += subElem.textContent + ' ';
        // check for default entry
        var isDefaultValue = subElem.getAttribute('default');
        if (isDefaultValue != undefined) {
          isDefaultValue = isDefaultValue == "true";
        } else {
          isDefaultValue = false;
        }
        // now set the styling values
        if (subElem.getAttribute('value')) {
          styling[subElem.getAttribute('value')] = subElem.textContent;
          if (isDefaultValue) {
            styling['defaultValue'] = subElem.getAttribute('value');
          }
        } else { // a range
          if (!styling['range'])
            styling['range'] = {};
          styling['range'][parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), subElem.textContent];
          if (isDefaultValue) {
            styling['defaultValue'] = parseFloat(subElem.getAttribute('range_min'));
          }
        }
      }, this);
      styling['classnames'] = classnames.trim();
      cv.ui.Stylings.addStyling(name, styling);
    },

    parseStatusBar: function(elem) {
      var type = qx.bom.element.Attribute.get(elem,'type');
      var condition = qx.bom.element.Attribute.get(elem,'condition');
      var extend = qx.bom.element.Attribute.get(elem,'hrefextend');
      var sPath = window.location.pathname;
      var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

      // @TODO: make this match once the new editor is finished-ish.
      var editMode = 'edit_config.html' == sPage;

      // skip this element if it's edit-only and we are non-edit, or the other
      // way
      // round
      if (editMode && '!edit' == condition)
        return;
      if (!editMode && 'edit' == condition)
        return;

      var text = qx.dom.Node.getText(elem);
      switch (extend) {
        case 'all': // append all parameters
          var search = window.location.search.replace(/\$/g, '$$$$');
          text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
          break;
        case 'config': // append config file info
          var search = window.location.search.replace(/\$/g, '$$$$');
          search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

          var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
          if (0 < middle.indexOf('?'))
            search = '&' + search;
          else
            search = '?' + search;

          text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
          break;
      }
      var footerElement = qx.bom.Selector.query(".footer")[0];
      footerElement.innerHTML += text;
    },

    parsePlugins: function(xml) {
      var pluginsToLoad = [];
      qx.bom.Selector.query('meta > plugins plugin', this.xml).forEach(function (elem) {
        var name = qx.bom.element.Attribute.get(elem, 'name');
        if (name && !pluginsToLoad[name]) {
          pluginsToLoad.push('cv/plugins/' + name + '/structure_plugin.js');
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
      }
    }

  }
});