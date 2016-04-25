/**
 * CustomMatcher factory for CometVisu specific matchers
 *
 * @author tobiasb
 * @since 2016
 */

define([], function() {
  
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
    }
  };
  
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });
});