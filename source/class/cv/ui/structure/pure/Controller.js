qx.Class.define('cv.ui.structure.pure.Controller', {
    type: 'static',
    statics: {
        parseLabel: function(label, flavour, labelClass, style) {
            if (!label) {
              return '';
            }
            let ret_val = '<div class="' + (labelClass !== undefined ? labelClass : 'label') + '"' +
              (style ? (' style="' + style + '"') : '') + '>';
      
            Array.prototype.forEach.call(label.childNodes, function(elem) {
              if (elem.nodeType === Node.ELEMENT_NODE && elem.nodeName.toLowerCase() === 'icon') {
                ret_val += cv.IconHandler.getInstance().getIconText(
                  elem.getAttribute('name'),
                  elem.getAttribute('type'),
                  elem.getAttribute('flavour') || flavour,
                  elem.getAttribute('color'),
                  elem.getAttribute('styling'));
              } else if (elem.nodeType === Node.TEXT_NODE) {
                ret_val += elem.textContent;
              }
            });
            return ret_val + '</div>';
          },
    }
});