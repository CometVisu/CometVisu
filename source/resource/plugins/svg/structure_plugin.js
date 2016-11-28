/**
 * @author christian523
 * @since 2012
 */
define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";

  Class('cv.structure.pure.Svg', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Update, cv.role.Refresh],

    after: {
      initialize: function() {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          var $actor = $(this.getActor());
          $actor.svg({loadURL:'plugins/svg/rollo.svg'});
        }, this);
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor"></div>';
      }
    },

    methods: {
      handleUpdate: function(value) {
        var element = $(this.getDomElement());
        var linewidth=3;
        var space = 1;
        var total = linewidth + space;
        var line_qty = 48 / total;
        for(var i = 0; i<=Math.floor(value/line_qty);i++) {
          element.find('#line'+(i+1)).attr('y1',9+total*(i)+((h%line_qty)/line_qty)*total);
          element.find('#line'+(i+1)).attr('y2',9+total*(i)+((h%line_qty)/line_qty)*total);
        }
        for(var i = Math.floor(h/line_qty)+1; i<=line_qty;i++) {
          element.find('#line'+(i+1)).attr('y1',9);
          element.find('#line'+(i+1)).attr('y2',9);
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("svg", cv.structure.pure.Svg);
});