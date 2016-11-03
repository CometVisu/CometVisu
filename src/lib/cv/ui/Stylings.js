/**
 * Stylings
 *
 * @author tobiasb
 * @since 2016
 */

define(['joose'], function() {
  Class("cv.ui.Stylings", {
    my: {
      has: {
        stylings: { is: 'rw', init: Joose.I.Object }
      },

      methods: {

        addStyling: function (name, styling) {
          this.stylings[name] = styling;
        },

        getStyling: function(name) {
          return this.stylings[name];
        }
      }
    }
  });
}); // end define