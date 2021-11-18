qx.Class.define('cv.ui.structure.tile.Controller', {
    type: 'static',
    statics: {
        parseLabel: function(label, flavour, labelClass, style) {
          return label ? label.textContent : '';
        }
    }
});