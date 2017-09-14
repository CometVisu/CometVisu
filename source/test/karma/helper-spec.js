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
 * CustomMatcher factory for CometVisu specific matchers
 *
 * @author tobiasb
 * @since 2016
 */

var templateEngine = cv.TemplateEngine.getInstance();

/**
 * Create a widget as string
 * @param name {String} name of the widget creator
 * @param attributes {Map} widget attributes
 * @param content {String} content od the widget
 * @return [{WidgetInstance}, {xml-string}]
 */
var createTestWidgetString = function (name, attributes, content) {

  if (!content) {
    content = "";
  }
  var elem = qx.dom.Element.create(name, attributes);
  qx.bom.element.Attribute.set(elem, "html", content);

  var data = null;
  if (name !== "page") {
    // create surrounding root page
    var page = qx.dom.Element.create("page", {visible: "false"});
    qx.dom.Element.insertEnd(elem, page);
    data = cv.parser.WidgetParser.parse(page, 'id', null, "text");
    cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
    data = cv.data.Model.getInstance().getWidgetData(data['children'][0]);
  } else {
    data = cv.parser.WidgetParser.parse(elem, 'id_0', null, "text");
  }
  var res = [];
  if (Array.isArray(data)) {
    var widgetInstance = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var inst = cv.ui.structure.WidgetFactory.createInstance(data[i].$$type, data[i]);
      var source = inst.getDomString ? inst.getDomString() : null;
      if (source) {
        res = [inst, source];
      } else {
        widgetInstance.push(inst);
      }
    }
    if (res.length == 2) {
      return res;
    } else {
      return [widgetInstance[0], '']
    }
  } else if (data) {
    var inst = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
    if (inst) {
      res.push(inst);
      if (inst.getDomString) {
        res.push(inst.getDomString());
      }
    }
  }

  return res;
};

var createTestElement = function (name, attributes, content, address, addressAttributes) {
  cv.TemplateEngine.getInstance().setDomFinished(false);
  if (!address && address !== false) {
    address = '12/7/37';
  }
  if (!content) {
    content = "";
  }
  if (address) {
    if (!addressAttributes) {
      addressAttributes = {'transform': 'DPT:1.001', 'mode': 'readwrite'};
    } else if (!addressAttributes.transform) {
      addressAttributes.transform = 'DPT:1.001';
    }

    content += "<address";
    for (var key in addressAttributes) {
      content += " " + key + "=\"" + addressAttributes[key] + "\"";
    }
    content += ">" + address + "</address>";
  }

  var container = document.createElement('div');
  container.setAttribute("class", "widget_container");
  container.setAttribute("id", 'id_0');
  var res = createTestWidgetString(name, attributes, content);
  container.innerHTML = res[1];
  document.body.appendChild(container);

  this.container = container
  cv.TemplateEngine.getInstance().setDomFinished(true);
  return res[0];
};

resetApplication = function() {
  // cleanup
  cv.data.Model.getInstance().clear();
  cv.ui.structure.WidgetFactory.clear();

  var subs = qx.event.message.Bus.getInstance().getSubscriptions();
  Object.getOwnPropertyNames(subs).forEach(function(topic) {
    delete subs[topic];
  });

  var body = qx.bom.Selector.query("body")[0];
  // load empty HTML structure
  qx.dom.Element.empty(body);
  qx.bom.Html.clean([cv.Application.HTML_STRUCT], null, body);

  cv.Config.cacheUsed = false;
  // reset templateEngine's init values
  templateEngine.resetReady();
  templateEngine.resetScriptsLoaded();
  templateEngine.resetPartsLoaded();
  cv.util.ScriptLoader.getInstance().resetAllQueued();

  cv.ui.layout.ResizeHandler.reset();
};

// DOM Helpers

var findChild = function(elem, selector) {
  return qx.bom.Selector.matches(selector, qx.dom.Hierarchy.getDescendants(elem))[0];
};

var customMatchers = {
  toHaveFlavour: function() {
    return  {
      compare: function(actual, expected) {
        var result = {};

        result.pass = qx.bom.element.Class.has(actual, 'flavour_'+expected);
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to be flavoured with "+expected;
        }
        else{
          result.message = "Expected " + actual.tagName + " to be flavoured with "+expected+", but is was not";
        }
        return result;
      }
    };
  },

  toHaveClass: function() {
    return  {
      compare: function(actual, expected) {
        var result = {};
        result.pass = qx.bom.element.Class.has(actual, expected);
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to have class "+expected;
        }
        else{
          result.message = "Expected " + actual.tagName + " to have class "+expected+", but it does not";
        }
        return result;
      }
    };
  },

  toHaveLabel: function() {
    return  {
      compare: function(actual, expected) {
        var result = {};
        var label = qx.bom.Selector.matches("div.label", qx.dom.Hierarchy.getChildElements(actual))[0];
        result.pass = label && qx.dom.Node.getText(label) === expected;
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to have value "+expected;
        }
        else{
          result.message = "Expected " + actual.tagName + " to have value "+expected+", but it has "+qx.dom.Node.getText(label);
        }
        return result;
      }
    };
  },

  toHaveValue: function() {
    return  {
      compare: function(actual, expected) {
        var result = {};
        var label = qx.bom.Selector.matches(".value", qx.dom.Hierarchy.getDescendants(actual))[0];
        result.pass = label && qx.dom.Node.getText(label) === expected;
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to have label "+expected;
        }
        else{
          result.message = "Expected " + actual.tagName + " to have label "+expected+", but it has "+qx.dom.Node.getText(label);
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
    return  {
      compare: function(actual, cssKey, cssValue) {
        var result = {};
        if (!actual.hasAttribute('style')) {
          result.pass = false;
          result.message = "Expected " + actual.tagName + " has no style aattribute";
          return result;
        }
        var styles = actual.getAttribute('style').split(";");
        for (var key in styles) {
          var styleParts = styles[key].split(":");
          if (styleParts[0].trim() == cssKey) {
            result.pass = styleParts[1].trim() == cssValue;
            break;
          }
        }

        if (result.pass) {
          result.message = "Expected " + actual.tagName + " to have style '"+cssKey+":"+cssValue+" set";
        }
        else{
          result.message = "Expected " + actual.tagName + " to have style '"+cssKey+":"+cssValue+" set, but it has not";
        }
        return result;
      }
    };
  },

  toHaveAttribute: function() {
    return  {
      compare: function(actual, expected) {
        var result = {};
        result.pass = actual.hasAttribute(expected);
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to have attribute "+expected;
        }
        else{
          result.message = "Expected " + actual.tagName + " to have attribute "+expected+", but it does not";
        }
        return result;
      }
    };
  },

  toBeVisible: function() {
    return  {
      compare: function(actual) {
        var result = {};
        result.pass = qx.bom.element.Style.get(actual, 'display') !== 'none';
        if (result.pass) {
          result.message = "Expected " + actual.tagName + " not to be visible, but it is "+qx.bom.element.Style.get(actual, 'display');
        }
        else{
          result.message = "Expected " + actual.tagName + " to be visible";
        }
        return result;
      }
    };
  }
};

beforeAll(function(done) {

  if (!qx.$$loader.applicationHandlerReady) {
    cv.Config.enableCache = false;
    qx.event.message.Bus.subscribe("setup.dom.finished", function () {
      resetApplication();
      done();
    }, this);
    var l = qx.$$loader;
    var bootPackageHash = l.parts[l.boot][0];
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    qx.util.ResourceManager.getInstance().__registry = qx.$$resources;
    qx.$$loader.signalStartup();

    // always test in 'en' locale
    qx.locale.Manager.getInstance().setLocale("en");
  }
});

beforeEach(function () {
  jasmine.addMatchers(customMatchers);
  this.createTestElement = createTestElement;
  this.createTestWidgetString = createTestWidgetString;
  this.findChild = findChild;
  this.initWidget = function(widget) {
    widget.setVisible && widget.setVisible(true);
    qx.event.message.Bus.dispatchByName("setup.dom.finished.before");
    qx.event.message.Bus.dispatchByName("setup.dom.finished");
  };
});

afterEach(function () {
  templateEngine.widgetData = {};
  cv.data.Model.getInstance().clear();
  cv.ui.structure.WidgetFactory.clear();

  var subs = qx.event.message.Bus.getInstance().getSubscriptions();
  Object.getOwnPropertyNames(subs).forEach(function(topic) {
    delete subs[topic];
  });
  cv.ui.layout.ResizeHandler.reset();

  if (this.container) {
    document.body.removeChild(this.container);
    this.container = null;
  }
  if (this.creator) {
    this.creator = null;
  }

  var body = qx.bom.Selector.query("body")[0];
  // load empty HTML structure
  qx.dom.Element.empty(body);
  qx.bom.Html.clean([cv.Application.HTML_STRUCT], null, body);
  cv.TemplateEngine.getInstance().resetDomFinished();
  // resetApplication();
});