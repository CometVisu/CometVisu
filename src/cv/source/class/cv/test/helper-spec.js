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
 * @returns [{WidgetInstance}, {xml-string}]
 * @private
 */
var createTestWidgetString = function (name, attributes, content) {

  if (!content) {
    content = "";
  }
  var elem = qx.dom.Element.create(name, attributes);
  elem.innerHTML = content;

  var data = cv.xml.Parser.parse(elem, 'id_0', null, "text");
  var res = [];
  if (Array.isArray(data)) {
    var widgetInstance = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var inst = cv.structure.WidgetFactory.createInstance(data[i].$$type, data[i]);
      var source = inst.getDomString();
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
    var inst = cv.structure.WidgetFactory.createInstance(data.$$type, data);
    res.push(inst);
    res.push(inst.getDomString());
  }

  return res;
};

var createTestElement = function (name, attributes, content, address, addressAttributes) {
  if (!address) {
    address = '12/7/37';
  }
  if (!content) {
    content = "";
  }
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

  var container = document.createElement('div');
  container.setAttribute("class", "widget_container");
  container.setAttribute("id", 'id_0');
  var res = createTestWidgetString(name, attributes, content);
  container.innerHTML = res[1];
  document.body.appendChild(container);

  this.container = container;
  return res[0];
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

beforeEach(function () {
  jasmine.addMatchers(customMatchers);
  this.createTestElement = createTestElement;
  this.createTestWidgetString = createTestWidgetString;
  this.findChild = findChild;
});

afterEach(function () {
  templateEngine.widgetData = {};
  cv.data.Model.getInstance().clear();
  cv.structure.WidgetFactory.clear();
  cv.MessageBroker.getInstance().clear();

  if (this.container) {
    document.body.removeChild(this.container);
    this.container = null;
  }
  if (this.creator) {
    this.creator = null;
  }
});