/**
 * CustomMatcher factory for CometVisu specific matchers
 *
 * @author tobiasb
 * @since 2016
 */

define(['jquery','TemplateEngine', '_common'], function($, engine, design) {
  var templateEngine = engine.getInstance();

  /**
   * Create a widget as string
   * @param name {String} name of the widget creator
   * @param attributes {Map} widget attributes
   * @param content {String} content od the widget
   * @returns [{creator}, {xml}]
   * @private
   */
  var createTestWidgetString = function(name, attributes, content) {
    var creator = design.basicdesign.getCreator(name);
    var xml = document.createElement('template');
    if (!content) {
      content="";
    }
    var elem = '<'+name;
    for (var key in attributes) {
      elem += " "+key+"=\""+attributes[key]+"\"";
    }
    elem += ">"+content+"</"+name+">";
    xml.innerHTML = elem;
    xml = xml.firstChild;

    return [creator, creator.create(xml, 'id_0', null, name)];
  };

  var createTestElement = function(name, attributes, content, address, addressAttributes) {
    if (!address) {
      address='12/7/37';
    }
    if (!content) {
      content="";
    }
    if (!addressAttributes) {
      addressAttributes = {'transform': 'DPT:1.001', 'mode': 'readwrite'};
    } else if (!addressAttributes.transform) {
      addressAttributes.transform = 'DPT:1.001';
    }
    content+="<address";
    for (var key in addressAttributes) {
      content += " "+key+"=\""+addressAttributes[key]+"\"";
    }
    content += ">"+address+"</address>";

    var container = document.createElement('div');
    container.setAttribute("class","widget_container");
    container.setAttribute("id", 'id_0');
    var res = createTestWidgetString(name, attributes, content);
    container.innerHTML = res[1];
    document.body.appendChild(container);
    
    this.container = container;
    return res[0];
  };
  
  var customMatchers = {
    toHaveFlavour: function() {
      return  {
        compare: function(actual, expected) {
          var result = {};
  
          result.pass = actual.hasClass('flavour_'+expected);
          if (result.pass) {
            result.message = "Expected " + actual.prop("tagName") + " not to be flavoured with "+expected;
          }
          else{
            result.message = "Expected " + actual.prop("tagName") + " to be flavoured with "+expected+", but is was not";
          }
          return result;
        }
      };
    },

    toHaveClass: function() {
      return  {
        compare: function(actual, expected) {
          var result = {};

          result.pass = actual.hasClass(expected);
          if (result.pass) {
            result.message = "Expected " + actual.prop("tagName") + " not to have class "+expected;
          }
          else{
            result.message = "Expected " + actual.prop("tagName") + " to have class "+expected+", but it does not";
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
          result.pass = $(actual).css('display') !== 'none';
          if (result.pass) {
            result.message = "Expected " + actual.tagName + " not to be visible, but it is "+$(actual).css('display');
          }
          else{
            result.message = "Expected " + actual.tagName + " to be visible";
          }
          return result;
        }
      };
    }
  };
  
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
    this.createTestElement = createTestElement;
    this.createTestWidgetString = createTestWidgetString;
  });

  afterEach(function() {
    templateEngine.widgetData = {};
    templateEngine.postDOMSetupFns = [];
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
    if (this.creator) {
      this.creator = null;
    }
  });
});