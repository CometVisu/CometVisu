/* helper-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Create a widget as string
 * @param name {String} name of the widget creator
 * @param attributes {Map} widget attributes
 * @param content {String} content od the widget
 * @return [{WidgetInstance}, {Element}]
 */
const createTestWidgetString = function (name, attributes, content) {
  if (!content) {
    content = '';
  }
  var elem = qx.dom.Element.create(name, attributes);
  elem.innerHTML = content;

  var data = null;
  if (name !== 'page') {
    // create surrounding root page
    var page = qx.dom.Element.create('page', {visible: 'false'});
    page.appendChild(elem);
    data = cv.parser.pure.WidgetParser.parse(page, 'id', null, 'text');
    cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
    data = cv.data.Model.getInstance().getWidgetData(data.children[0]);
  } else {
    data = cv.parser.pure.WidgetParser.parse(elem, 'id_0', null, 'text');
  }
  var res = [];
  let inst;
  if (Array.isArray(data)) {
    var widgetInstance = [];
    for (var i = 0, l = data.length; i < l; i++) {
      inst = cv.ui.structure.WidgetFactory.createInstance(data[i].$$type, data[i]);
      var source = inst.getDomString ? inst.getDomString() : null;
      if (source) {
        res = [inst, source];
      } else {
        widgetInstance.push(inst);
      }
    }
    if (res.length !== 2) {
      res = [widgetInstance[0], ''];
    }
  } else if (data) {
    inst = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
    if (inst) {
      res.push(inst);
      if (inst.getDomString) {
        res.push(inst.getDomString());
      }
    }
  }
  if (res[1]) {
    const element = cv.util.String.htmlStringToDomElement(res[1]);
    // some widgets always need access to the DOMTree to get their DOMElement, some unit tests only use a shadow dom
    // this overrides the settings to make that work
    res[0].setDomElement(element);
    res[1] = element;
  }
  return res;
};

const createTestElement = function (name, attributes, content, address, addressAttributes) {
  cv.TemplateEngine.getInstance().setDomFinished(false);
  if (!address && address !== false) {
    address = '12/7/37';
  }
  if (!content) {
    content = '';
  }
  if (address) {
    if (!addressAttributes) {
      addressAttributes = {'transform': 'DPT:1.001', 'mode': 'readwrite'};
    } else if (!Array.isArray(addressAttributes) && !addressAttributes.transform) {
      addressAttributes.transform = 'DPT:1.001';
    }
    if (!Array.isArray(address)) {
      address = [address];
    }
    if (!Array.isArray(addressAttributes)) {
      addressAttributes = [addressAttributes];
    }

    address.forEach(function (addr, index) {
      content += '<address';
      for (var key in addressAttributes[index]) {
        content += ' ' + key + '="' + addressAttributes[index][key] + '"';
      }
      content += '>' + addr + '</address>';
    });
  }

  var container = document.createElement('div');
  container.setAttribute('class', 'widget_container');
  container.setAttribute('id', 'id_0');
  const [widget, element] = createTestWidgetString(name, attributes, content);
  // revert manual override, we use real DOM here
  widget.setDomElement(null);
  if (element) {
    container.appendChild(element);
  }
  document.body.appendChild(container);

  this.container = container;
  cv.TemplateEngine.getInstance().setDomFinished(true);
  return widget;
};

const resetApplication = function() {
  var templateEngine = cv.TemplateEngine.getInstance();
  // cleanup
  cv.data.Model.getInstance().clear();
  cv.ui.structure.WidgetFactory.clear();

  var subs = qx.event.message.Bus.getInstance().getSubscriptions();
  Object.getOwnPropertyNames(subs).forEach(function(topic) {
    delete subs[topic];
  });

  var body = document.querySelector('body');
  // load empty HTML structure
  body.innerHTML = '';

  cv.Config.cacheUsed = false;
  // reset templateEngine's init values
  templateEngine.resetReady();
  templateEngine.resetScriptsLoaded();
  templateEngine.resetPartsLoaded();
  cv.util.ScriptLoader.getInstance().resetAllQueued();
  switch (cv.Config.getStructure()) {
    case 'structure-tile':
      cv.Config.loadedStructure = 'tile';
      break;

    case 'structure-pure':
      cv.Config.loadedStructure = 'pure';
      if (cv.ui.structure.pure) {
        cv.ui.structure.pure.layout.ResizeHandler.reset();
      }
      break;
  }
};

// DOM Helpers

const findChild = function(elem, selector) {
  return Array.from(elem.getElementsByTagName('*')).filter(function(m) {
 return m.matches(selector); 
})[0];
};

const customMatchers = {
  toHaveFlavour: function() {
    return {
      compare: function(actual, expected) {
        var result = {};

        result.pass = actual.classList.contains('flavour_'+expected);
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to be flavoured with '+expected;
        } else {
          result.message = 'Expected ' + actual.tagName + ' to be flavoured with '+expected+', but is was not';
        }
        return result;
      }
    };
  },

  toHaveClass: function() {
    return {
      compare: function(actual, expected) {
        var result = {};
        result.pass = actual.classList.contains(expected);
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to have class '+expected;
        } else {
          result.message = 'Expected ' + actual.tagName + ' to have class '+expected+', but it does not';
        }
        return result;
      }
    };
  },

  toHaveLabel: function() {
    return {
      compare: function(actual, expected) {
        var result = {};
        var label = Array.from(actual.children).filter(function(m) {
 return m.matches('div.label'); 
})[0];
        result.pass = label && label.innerText === expected;
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to have value '+expected;
        } else {
          result.message = 'Expected ' + actual.tagName + ' to have value '+expected+', but it has '+label.innerText;
        }
        return result;
      }
    };
  },

  toHaveValue: function() {
    return {
      compare: function(actual, expected) {
        var result = {};
        var label = Array.from(actual.getElementsByTagName('*')).filter(function(m) {
 return m.matches('.value'); 
})[0];
        result.pass = label && label.innerText === expected;
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to have label '+expected;
        } else {
          result.message = 'Expected ' + actual.tagName + ' to have label '+expected+', but it has '+label.innerText;
        }
        return result;
      }
    };
  },

  /**
   * checks if the css-styleis set in the elements style attribute
   * Note: This checks the style css attribute setting not the
   * computed css value as the jQuery.css function does.
   */
  toHaveStyleSetting: function() {
    return {
      compare: function(actual, cssKey, cssValue) {
        var result = {};
        if (!actual.hasAttribute('style')) {
          result.pass = false;
          result.message = 'Expected ' + actual.tagName + ' has no style aattribute';
          return result;
        }
        var styles = actual.getAttribute('style').split(';');
        for (var key in styles) {
          var styleParts = styles[key].split(':');
          if (styleParts[0].trim() == cssKey) {
            result.pass = styleParts[1].trim() == cssValue;
            break;
          }
        }

        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' to have style \''+cssKey+':'+cssValue+' set';
        } else {
          result.message = 'Expected ' + actual.tagName + ' to have style \''+cssKey+':'+cssValue+' set, but it has not';
        }
        return result;
      }
    };
  },

  toHaveAttribute: function() {
    return {
      compare: function(actual, expected) {
        var result = {};
        result.pass = actual.hasAttribute(expected);
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to have attribute '+expected;
        } else {
          result.message = 'Expected ' + actual.tagName + ' to have attribute '+expected+', but it does not';
        }
        return result;
      }
    };
  },

  toBeVisible: function() {
    return {
      compare: function(actual) {
        var result = {};
        result.pass = window.getComputedStyle(actual)['display'] !== 'none';
        if (result.pass) {
          result.message = 'Expected ' + actual.tagName + ' not to be visible, but it is '+window.getComputedStyle(actual)['display'];
        } else {
          result.message = 'Expected ' + actual.tagName + ' to be visible';
        }
        return result;
      }
    };
  }
};

beforeAll(function (done) {
  window.cvTestMode = true;
  jasmine.addMatchers(customMatchers);
  setTimeout(function () {
    try {
      cv.Config.enableCache = false;
      // always test in 'en' locale
      qx.locale.Manager.getInstance().setLocale('en');
      const templateEngine = cv.TemplateEngine.getInstance();
      templateEngine.initBackendClient();
      templateEngine.loadParts(['structure-tile', 'structure-pure']);
      templateEngine.addListenerOnce('changePartsLoaded', done);
      const model = cv.data.Model.getInstance();
      templateEngine.getClient().update = model.update.bind(model); // override clients update function
      resetApplication();
    } catch (e) {
      console.error(e);
    }
  }, 2000);
});

beforeEach(function () {
  cv.Application.structureController = cv.ui.structure.pure.Controller.getInstance();
  cv.Config.loadedStructure = 'pure';
  qx.core.Init.getApplication().setStructureLoaded(true);

  this.createTestElement = createTestElement;
  this.createTestWidgetString = createTestWidgetString;
  this.findChild = findChild;
  this.initWidget = function(widget) {
    if (widget.getVisibilityParent) {
      const parent = widget.getVisibilityParent();
      if (parent) {
        parent.setVisible(true);
      }
    }
    widget.setVisible && widget.setVisible(true);
    qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
    //cv.TemplateEngine.getInstance().setDomFinished(true);
    qx.event.message.Bus.dispatchByName('setup.dom.finished');
  };
});

afterEach(function () {
  var templateEngine = cv.TemplateEngine.getInstance();
  templateEngine.widgetData = {};
  cv.data.Model.getInstance().clear();
  cv.ui.structure.WidgetFactory.clear();

  var subs = qx.event.message.Bus.getInstance().getSubscriptions();
  Object.getOwnPropertyNames(subs).forEach(function(topic) {
    delete subs[topic];
  });
  cv.ui.layout.ResizeHandler.reset();

  if (this.container) {
    try {
      this.container.remove();
    } catch (e) {
      console.error(e);
    }
    this.container = null;
  }
  if (this.creator) {
    this.creator = null;
  }

  // load empty HTML structure
  document.body.innerHTML = '';
  cv.TemplateEngine.getInstance().resetDomFinished();
  qx.core.Init.getApplication().resetStructureLoaded();
  // resetApplication();
});
