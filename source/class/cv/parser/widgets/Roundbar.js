/* Roundbar.js
 * 
 * copyright (c) 2010-2020, Christian Mayer and the CometVisu contributers.
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
 *
 */
qx.Class.define('cv.parser.widgets.Roundbar', {
  type: "static",

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {

    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType) {
      var
        data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings(xml.getAttribute('preset'))),
        indicatorValueCnt = 0;
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
      data.indicators = [];
      xml.querySelectorAll('address').forEach(function (elem, i) {
        data.radius = parseFloat( elem.getAttribute('radius') || (data.radius + (i === 0 ? 0 : data.spacing+data.width)));
        indicatorValueCnt = parseInt(elem.getAttribute('valuepos') || indicatorValueCnt+1);
        data.indicators.push({
          address:   elem.textContent,
          showValue: elem.getAttribute('showvalue') !== 'false',
          valuepos:  indicatorValueCnt,
          isBar:     elem.getAttribute('type') !== 'pointer',
          min:       elem.getAttribute('min') || data.min,
          max:       elem.getAttribute('max') || data.max,
          radius:    data.radius,
          width:     parseFloat( elem.getAttribute('width') || data.width),
          thickness: elem.getAttribute('thickness') || data.thickness,
          stroke:    elem.getAttribute('stroke') || '',
          fill:      elem.getAttribute('fill') || ''
        });
      });
      return data;
    },

    makeAddressListFn: function(src, transform, mode, variant) {
      return [true, variant];
    },

    getAttributeToPropertyMappings: function (preset) {
      function deg2rad(deg) {
        return parseFloat(deg) * Math.PI / 180;
      }

      var
        retObj = {
          'min': {"default": 0.0, transform: parseFloat},
          'max': {"default": 100.0, transform: parseFloat},
          'axisradius': {"default": 50.0, transform: parseFloat},
          'axiswidth': {"default": 0.0, transform: parseFloat},
          'axiscolor': {"default": ""},
          'ranges': {
            "default": "",
            transform: function (value) {
              if(!value) { return []; }
              var retval = [];
              value.split(';').forEach(function (range) {
                var
                  components = range.split(','),
                  startEnd = components.shift().split('...'),
                  thisRange = {start: parseFloat(startEnd[0]), end: parseFloat(startEnd[1])};

                if( isNaN(thisRange.end) ) {
                  thisRange.end = thisRange.start;
                }
                if (!isNaN(components[0])) {
                  thisRange.radius = parseFloat(components.shift());
                }
                if (!isNaN(components[0])) {
                  thisRange.width = parseFloat(components.shift());
                }
                if (components.length > 0) {
                  thisRange.color = components.shift();
                }
                retval.push(thisRange);
              });
              return retval;
            }
          },
          'minorradius': {"default": 0.0, transform: parseFloat},
          'minorwidth': {"default": 0.0, transform: parseFloat},
          'minorspacing': {"default": "25%"},
          'minorcolor': {"default": ""},
          'majorradius': {"default": 0.0, transform: parseFloat},
          'majorwidth': {"default": 0.0, transform: parseFloat},
          'majorposition': {"default": "min;max"},
          'majorcolor': {"default": ""},
          'start': {"default": 270.0, transform: deg2rad},
          'startarrow': {"default": 5.0, transform: parseFloat},
          'end': {"default": 0.0, transform: deg2rad},
          'endarrow': {"default": -5.0, transform: parseFloat},
          'arrowtype': { "default": 0, transform: function(t){ return ({'angle':0,'distance':1})[t] || 0; } },
          'radius': {"default": 50.0, transform: parseFloat},
          'width': {"default": 10.0, transform: parseFloat},
          'spacing': {"default": 10.0, transform: parseFloat},
          'overflowarrow': { "default": 'true', transform: function (value) { return value === "true"; } },
          'fontsize': {"default": 40, transform: parseFloat},
          'textx': {"default": 10, transform: parseFloat},
          'texty': {"default": 50, transform: parseFloat},
          'textlength': {"default": 0, transform: parseFloat},
          'textanchor': {"default": ""},
          'linespace': {"default": 12, transform: parseFloat},
          'bboxgrow': {"default": 1.0, transform: parseFloat},
          'debug': {"default": false, transform: function(v){return v === "true";}}
        },
        thisPreset = ({
          'A': {
            start: 225,
            fontsize: 20,
            linespace: 25,
            textx: 0,
            texty: 20
          },
          'B': {
            start: 360,
            end: 135,
            //majorwidth: 50.0,
            //majorposition: "min",
            fontsize: 20,
            linespace: -25,
            textx: 0,
            texty: -10
          },
          'bridge': {
            start: 180,
            end: 0,
            textanchor: 'middle',
            textx: 0,
            texty: 0
          }
        })[preset] || {};

      for( var key in thisPreset ) {
        retObj[key].default = thisPreset[key];
      }

      return retObj;
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("roundbar", statics);
  }
});