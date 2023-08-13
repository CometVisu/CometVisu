(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Roundbar.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
  qx.Class.define('cv.parser.pure.widgets.Roundbar', {
    type: 'static',
    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      deg2rad: function deg2rad(deg) {
        return parseFloat(deg) * Math.PI / 180;
      },
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       */
      parse: function parse(xml, path, flavour, pageType) {
        var self = this;
        var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings(xml.getAttribute('preset')));
        var indicatorValueCnt = 0;
        cv.parser.pure.WidgetParser.parseFormat(xml, path);
        cv.parser.pure.WidgetParser.parseAddress(xml, path);
        data.indicators = [];
        data.radius = 50; // default
        data.width = 10; // default
        xml.querySelectorAll('address').forEach(function (elem, i) {
          data.radius = parseFloat(elem.getAttribute('radius') || data.radius + (i === 0 ? 0 : data.spacing + data.width));
          indicatorValueCnt = parseInt(elem.getAttribute('valuepos') || indicatorValueCnt + 1);
          data.indicators.push({
            address: elem.textContent,
            showValue: elem.getAttribute('showvalue') !== 'false',
            valuepos: indicatorValueCnt,
            isBar: elem.getAttribute('type') !== 'pointer',
            min: elem.getAttribute('min') || data.min,
            max: elem.getAttribute('max') || data.max,
            radius: data.radius,
            startarrow: self.deg2rad(data.startarrow),
            // * Math.PI / 180,
            endarrow: self.deg2rad(data.endarrow),
            // * Math.PI / 180,
            width: parseFloat(elem.getAttribute('width') || data.width),
            thickness: elem.getAttribute('thickness') || data.thickness,
            style: elem.getAttribute('style') || ''
          });
        });
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings(preset) {
        var retObj = {
          min: {
            "default": 0.0,
            transform: parseFloat
          },
          max: {
            "default": 100.0,
            transform: parseFloat
          },
          axisradius: {
            "default": 50.0,
            transform: parseFloat
          },
          axiswidth: {
            "default": 0.0,
            transform: parseFloat
          },
          axiscolor: {
            "default": ''
          },
          ranges: {
            "default": '',
            transform: function transform(value) {
              if (!value) {
                return [];
              }
              var retval = [];
              value.split(';').forEach(function (range) {
                var components = range.split(',');
                var startEnd = components.shift().split('...');
                var thisRange = {
                  start: parseFloat(startEnd[0]),
                  end: parseFloat(startEnd[1])
                };
                if (isNaN(thisRange.end)) {
                  thisRange.end = thisRange.start;
                }
                if (!isNaN(components[0])) {
                  thisRange.radius = parseFloat(components.shift());
                }
                if (!isNaN(components[0])) {
                  thisRange.width = parseFloat(components.shift());
                }
                if (components.length > 0) {
                  var style = components.shift();
                  thisRange.style = /:/.test(style) ? style : 'fill:' + style + ';stroke:' + style;
                }
                retval.push(thisRange);
              });
              return retval;
            }
          },
          minorradius: {
            "default": 0.0,
            transform: parseFloat
          },
          minorwidth: {
            "default": 0.0,
            transform: parseFloat
          },
          minorspacing: {
            "default": '25%'
          },
          minorcolor: {
            "default": ''
          },
          majorradius: {
            "default": 0.0,
            transform: parseFloat
          },
          majorwidth: {
            "default": 0.0,
            transform: parseFloat
          },
          majorposition: {
            "default": 'min;max'
          },
          majorcolor: {
            "default": ''
          },
          labels: {
            "default": '',
            transform: function transform(value) {
              if (!value) {
                return [];
              }
              var retval = [];
              var radius = 50;
              var position = 'outside';
              var orientation = 'horizontal';
              value.split(';').forEach(function (label) {
                var components = label.split(':');
                if (components.length > 1) {
                  var subcompontents = components[0].split(',');
                  if (subcompontents[0] !== '') {
                    position = subcompontents[0];
                  }
                  if (subcompontents[1] !== '') {
                    orientation = subcompontents[1];
                  }
                  components.shift();
                }
                var valueName = components[0].split(',');
                if (valueName.length > 1 && valueName[1] !== '') {
                  radius = parseFloat(valueName[1]);
                }
                if (valueName.length < 3 || valueName[2] === '') {
                  valueName[2] = valueName[0];
                }
                retval.push({
                  value: parseFloat(valueName[0]),
                  radius: radius,
                  name: valueName[2],
                  position: {
                    outside: 0,
                    center: 1,
                    inside: 2
                  }[position] || 0,
                  orientation: {
                    horizontal: 0,
                    parallel: 1,
                    perpendicular: 2,
                    roundstart: 3,
                    roundmiddle: 4,
                    roundend: 5
                  }[orientation] || 0
                });
              });
              return retval;
            }
          },
          labelstyle: {
            "default": ''
          },
          start: {
            "default": 270.0,
            transform: this.deg2rad
          },
          startarrow: {
            "default": 5.0,
            transform: parseFloat
          },
          end: {
            "default": 0.0,
            transform: this.deg2rad
          },
          endarrow: {
            "default": -5.0,
            transform: parseFloat
          },
          arrowtype: {
            "default": 0,
            transform: function transform(t) {
              return {
                angle: 0,
                distance: 1
              }[t] || 0;
            }
          },
          spacing: {
            "default": 10.0,
            transform: parseFloat
          },
          overflowarrow: {
            "default": 'true',
            transform: function transform(value) {
              return value === 'true';
            }
          },
          fontsize: {
            "default": 40,
            transform: parseFloat
          },
          textx: {
            "default": 10,
            transform: parseFloat
          },
          texty: {
            "default": 50,
            transform: parseFloat
          },
          textlength: {
            "default": 0,
            transform: parseFloat
          },
          textanchor: {
            "default": ''
          },
          linespace: {
            "default": 12,
            transform: parseFloat
          },
          bboxgrow: {
            "default": '1',
            transform: function transform(value) {
              var parts = value.split(';');
              switch (parts.length) {
                default:
                case 1:
                  // one value for all sides
                  return {
                    l: parseFloat(parts[0]),
                    u: parseFloat(parts[0]),
                    r: parseFloat(parts[0]),
                    d: parseFloat(parts[0])
                  };
                case 2:
                  // horizontal;vertical
                  return {
                    l: parseFloat(parts[0]),
                    u: parseFloat(parts[1]),
                    r: parseFloat(parts[0]),
                    d: parseFloat(parts[1])
                  };
                case 4:
                  // left;up;right;down
                  return {
                    l: parseFloat(parts[0]),
                    u: parseFloat(parts[1]),
                    r: parseFloat(parts[2]),
                    d: parseFloat(parts[3])
                  };
              }
            }
          },
          debug: {
            "default": false,
            transform: function transform(v) {
              return v === 'true';
            }
          }
        };
        var thisPreset = {
          A: {
            start: 225,
            fontsize: 40,
            linespace: 25,
            textanchor: 'end',
            textx: 60,
            texty: 40
          },
          B: {
            start: 360,
            end: 135,
            fontsize: 40,
            linespace: -25,
            textanchor: 'end',
            textx: 60,
            texty: -10
          },
          bridge: {
            start: 180,
            end: 0,
            textanchor: 'middle',
            textx: 0,
            texty: 0
          }
        }[preset] || {};
        for (var key in thisPreset) {
          retObj[key]["default"] = thisPreset[key];
        }
        return retObj;
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.pure.WidgetParser.addHandler('roundbar', statics);
    }
  });
  cv.parser.pure.widgets.Roundbar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Roundbar.js.map?dt=1691935391029