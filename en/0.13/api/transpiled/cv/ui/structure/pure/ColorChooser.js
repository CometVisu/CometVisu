function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.util.Color": {
        "construct": true
      },
      "cv.util.LimitedRateUpdateAnimator": {
        "construct": true
      },
      "cv.ui.layout.ResizeHandler": {
        "construct": true
      },
      "cv.util.Function": {},
      "cv.Config": {},
      "cv.core.notifications.Router": {},
      "cv.Transform": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ColorChooser.js
   * 
   * copyright (c) 2010-2021, Christian Mayer and the CometVisu contributers.
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
   * The ColorChooser let you select and display a color, e.g. for lighting effects.
   * It supports a RGB light source with red, green and blue light components as well
   * as a RGBW light source that also has a white channel.
   *
   * @widgetexample
   * <settings>
   *      <screenshot name="colorchooser_example">
   *          <caption>ColorChooser, simple example</caption>
   *      </screenshot>
   * </settings>
   * <colorchooser>
   *   <layout colspan="6" rowspan="4"/>
   *   <label>RGB kitchen</label>
   *   <address transform="DPT:5.001" mode="readwrite" variant="r">1/2/59</address>
   *   <address transform="DPT:5.001" mode="readwrite" variant="g">1/2/60</address>
   *   <address transform="DPT:5.001" mode="readwrite" variant="b">1/2/61</address>
   * </colorchooser>
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.ColorChooser', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.Update],

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Calculate the saturation and value from (x,y) relative widget coordinates
       * based on a centered SV-triangle.
       * @param x position for the calculation
       * @param y position for the calculation
       * @param hue value for the orientation of the triangle
       * @param radius (outside) radius of the triangle
       */
      coord2sv: function coord2sv(x, y, hue, radius) {
        var hue2angle = 2 * Math.PI; // coordinates of the triangle corners

        var Sx = 0.5 - Math.sin(hue2angle * -hue) * radius; // 100% saturation

        var Sy = 0.5 - Math.cos(hue2angle * -hue) * radius;
        var Wx = 0.5 - Math.sin(hue2angle * (0.6666666666666666 - hue)) * radius; // 100% white

        var Wy = 0.5 - Math.cos(hue2angle * (0.6666666666666666 - hue)) * radius;
        var Bx = 0.5 - Math.sin(hue2angle * (0.3333333333333333 - hue)) * radius; // 100% black

        var By = 0.5 - Math.cos(hue2angle * (0.3333333333333333 - hue)) * radius; // differences to determine (u,v) coordinates of (x,y)

        var WBx = Wx - Bx;
        var WBy = Wy - By;
        var SBx = Sx - Bx;
        var SBy = Sy - By;
        var CBx = x - Bx;
        var CBy = y - By;
        var uv = cv.util.Color.solve2d(WBx, WBy, SBx, SBy, CBx, CBy);
        var u = Math.min(Math.max(0, uv[0]), 1);
        var v = Math.min(Math.max(0, uv[1]), 1); // convert (u,v) to S and V

        var value = u + v;
        var saturation = Math.abs(value) < 1e-3 ? 0 : v / value;
        return [saturation, value];
      }
    },

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      var _this = this;

      cv.ui.structure.AbstractWidget.constructor.call(this, props);
      var base = this.getBaseColors();
      this.__P_54_0 = new cv.util.Color(base.r, base.g, base.b, base.w);
      this.__P_54_1 = new cv.util.LimitedRateUpdateAnimator(this.__P_54_2, this);

      this.__P_54_1.setAnimationSpeed(100, 0.5);

      this.__P_54_3 = cv.ui.layout.ResizeHandler.states.addListener('changePageSizeInvalid', function () {
        _this.__P_54_4();
      });
      this.__P_54_5 = new Set(Object.entries(this.getAddress()).map(function (v) {
        return v[1].variantInfo;
      }));
      this.__P_54_6 = {};
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      cv.ui.layout.ResizeHandler.states.removeListenerById(this.__P_54_3);
      this.__P_54_3 = null;
      this.__P_54_7 = null;
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      controls: {
        check: 'String'
      },
      baseColors: {
        check: 'Object'
      },
      sendOnFinish: {
        check: 'Boolean',
        init: false
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_54_8: '',
      __P_54_9: undefined,
      // the color where the animation started
      __P_54_10: undefined,
      // the current color of the running animation
      __P_54_0: undefined,
      // the current color of the widget, also the target for the animation
      __P_54_6: undefined,
      // initialize with empty object in the constructor to prevent object being shared between instances
      __P_54_1: null,
      __P_54_7: undefined,
      // cache for DOM element
      __P_54_11: undefined,
      // cache for DOM element
      __P_54_12: undefined,
      __P_54_3: undefined,
      __P_54_5: undefined,
      // set of all color components required to send
      __P_54_13: false,
      // is the handle currently dragged?
      __P_54_14: undefined,
      // minimal screen coordinate of slider
      __P_54_15: 2000,
      // minimal color temperature to show in slider
      __P_54_16: 12500,
      // maximal color temperature to show in slider
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var placeholder = this.getFormat() === '' ? '' : '-';
        var self = this;
        var retval = '';
        var historicWidth = this.getLayout().colspan === undefined ? ' style="width:195px"' : '';
        var controls = this.getControls().split(';');

        if (controls[0] === '') {
          controls[0] = 'box';
        }

        controls.forEach(function (control) {
          switch (control) {
            case 'box':
            case 'LCh-box':
              {
                var hue_type = control === 'box' ? 'hsv_hue' : 'lch_hue';
                retval += '<div class="actor cc_box"><div class="hue ' + hue_type;
                retval += '"></div><div class="handle_hue"></div><div class="sv_box"><div class="inner"></div><div class="handle"></div></div></div>';
                break;
              }

            case 'triangle':
            case 'LCh-triangle':
              {
                var _hue_type = control === 'triangle' ? 'hsv_hue' : 'lch_hue';

                retval += '<div class="actor cc_wheel"><div class="hue ' + _hue_type;
                retval += '"></div><div class="sv_triangle"><div class="inner"></div><div class="handle_hue"></div><div class="handle"></div></div></div>';
                break;
              }

            case 'RGB-r':
            case 'RGB-g':
            case 'RGB-b':
            case 'RGBW-r':
            case 'RGBW-g':
            case 'RGBW-b':
            case 'RGBW-w':
            case 'h':
            case 's':
            case 'v':
            case 'LCh-L':
            case 'LCh-C':
            case 'LCh-h':
            case 'Y':
              retval += '<div class="actor cc_' + control + " ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\" style=\"touch-action: pan-y;\">\n              <button class=\"ui-slider-handle ui-state-default ui-corner-all\" draggable=\"false\" unselectable=\"true\" style=\"transform: translate3d(0px, 0px, 0px);\">" + placeholder + "</button>\n              <div class=\"ui-slider-range\" style=\"margin-left: 0px; clip-path: inset(0 100% 0 0);\"></div>\n            </div>";
              break;

            default:
              {
                var parts = control.split(':');

                if (parts[0] === 'T') {
                  var temperatures = (parts[1] || '-').split('-');
                  self.__P_54_15 = Math.max(1667, Math.min(temperatures[0] || 2500, 25000));
                  self.__P_54_16 = Math.max(1667, Math.min(temperatures[1] || 9000, 25000));
                  var rgbTmin = cv.util.Color.xy2sRGB(cv.util.Color.temperature2xy(self.__P_54_15));
                  var rgbTmax = cv.util.Color.xy2sRGB(cv.util.Color.temperature2xy(self.__P_54_16));

                  var disp = function disp(c) {
                    return [Math.round(255 * c.r), Math.round(255 * c.g), Math.round(255 * c.b)].join(',');
                  };

                  var colors = 'rgb(' + disp(rgbTmin) + '), rgb(' + disp(rgbTmax) + ')';
                  retval += "<div class=\"actor cc_T ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\" style=\"touch-action: pan-y;\">\n                <button class=\"ui-slider-handle ui-state-default ui-corner-all\" draggable=\"false\" unselectable=\"true\" style=\"transform: translate3d(0px, 0px, 0px);\">" + placeholder + "</button>\n                <div class=\"ui-slider-range\" style=\"margin-left: 0px; clip-path: inset(0 100% 0 0);background: linear-gradient(90deg, " + colors + ");\"></div>\n              </div>";
                }
              }
          }
        });
        return '<div class="actors"' + historicWidth + '>' + retval + '</div>';
      },
      // overridden
      _onDomReady: function _onDomReady() {
        var _this2 = this;

        cv.ui.structure.pure.ColorChooser.prototype._onDomReady.base.call(this);

        this.__P_54_17 = cv.util.Function.throttle(this.__P_54_18, 250, {
          trailing: true
        }, this);
        this.getDomElement().querySelectorAll('.actor').forEach(function (actor) {
          return actor.addEventListener('pointerdown', _this2);
        });
      },
      _update: function _update(address, data) {
        /**
         * @param transform
         * @param variant
         */
        function showInvalidDataErrorMessage(transform, variant) {
          if (cv.Config.testMode === true) {
            // eslint-disable-next-line no-console
            console.error('Updating ColorChooser with invalid data<br/>Address: ' + address + ', data: ' + data + ', transform: ' + transform + ', variant: ' + variant);
          }

          cv.core.notifications.Router.dispatchMessage('cv.config.error', {
            message: 'Updating ColorChooser with invalid data<br/>Address: ' + address + ', data: ' + data + ', transform: ' + transform + ', variant: ' + variant
          });
        }

        var transform = this.getAddress()[address].transform;
        var variant = this.getAddress()[address].variantInfo;
        var variantType;
        var value = cv.Transform.decode(transform, data);
        var base;

        switch (variant) {
          case 'h':
          case 's':
          case 'v':
            if (!Number.isFinite(value)) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            value /= 100;
            variantType = 'hsv-single';
            break;

          case 'hsv':
            if (value.get === undefined) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            value = {
              h: value.get('h') / 360,
              s: value.get('s') / 100,
              v: value.get('v') / 100
            };
            variantType = 'hsv';
            break;

          case 'RGB-r':
          case 'RGB-g':
          case 'RGB-b':
            if (!Number.isFinite(value)) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            base = this.getBaseColors()[variant.split('-')[1]];
            value = cv.util.Color.invCurve(value, base.curve, base.scale);
            variantType = 'rgb-single';
            break;

          case 'rgb':
            base = this.getBaseColors();

            if (value.get === undefined) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            value = {
              r: cv.util.Color.invCurve(value.get('r'), base.r.curve, base.r.scale),
              g: cv.util.Color.invCurve(value.get('g'), base.g.curve, base.g.scale),
              b: cv.util.Color.invCurve(value.get('b'), base.b.curve, base.b.scale)
            };
            variantType = 'rgb';
            break;

          case 'RGBW-r':
          case 'RGBW-g':
          case 'RGBW-b':
          case 'RGBW-w':
            if (!Number.isFinite(value)) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            base = this.getBaseColors()[variant.split('-')[1]];
            value = cv.util.Color.invCurve(value, base.curve, base.scale);
            variantType = 'rgbw-single';
            break;

          case 'rgbw':
            base = this.getBaseColors();

            if (value.get === undefined) {
              showInvalidDataErrorMessage(transform, variant);
              return;
            }

            value = {
              r: cv.util.Color.invCurve(value.get('r'), base.r.curve, base.r.scale),
              g: cv.util.Color.invCurve(value.get('g'), base.g.curve, base.g.scale),
              b: cv.util.Color.invCurve(value.get('b'), base.b.curve, base.b.scale),
              w: cv.util.Color.invCurve(value.get('w'), base.w.curve, base.w.scale)
            };
            variantType = 'rgbw';
            break;

          case 'x':
          case 'y':
            variantType = 'xyY';
            break;

          case 'Y':
            if (value instanceof Map && value.get('YValid') !== false) {
              value = value.get('Y');
            } else if (!Number.isFinite(value)) {
              showInvalidDataErrorMessage(transform, variant);
              return; // nothing that can be done with this data
            }

            variantType = 'xyY';
            break;

          case 'xy':
            if (value instanceof Map && value.get('cValid') !== false) {
              value = {
                x: value.get('x'),
                y: value.get('y')
              };
            } else if (!('x' in value && 'y' in value)) {
              showInvalidDataErrorMessage(transform, variant);
              return; // nothing that can be done with this data
            }

            variantType = 'xyY';
            break;

          case 'xyY':
            if (value instanceof Map) {
              variant = (value.get('cValid') !== false ? 'xy' : '') + (value.get('YValid') !== false ? 'Y' : '');
              value = {
                x: value.get('x'),
                y: value.get('y'),
                Y: value.get('Y')
              };

              if (variant === '') {
                return; // no valid data in the value
              }
            } else {
              showInvalidDataErrorMessage(transform, variant);
              return; // nothing that can be done with this data
            }

            variantType = 'xyY';
            break;
        }

        if (this.__P_54_13 || this.__P_54_6[variantType] && this.__P_54_6[variantType][variant] && this.__P_54_6[variantType][variant][transform] === data) {
          // slider in use -> ignore value from bus
          // internal state unchanged -> also do nothing
          return;
        }

        var notKnown = this.__P_54_6[variantType] === undefined;

        if (notKnown) {
          this.__P_54_6[variantType] = {};
        } // forget all other transforms as they might not be valid anymore


        this.__P_54_6 = _defineProperty({}, variantType, this.__P_54_6[variantType]);
        this.__P_54_6[variantType][variant] = _defineProperty({}, transform, data); // animate when visible, otherwise jump to the target value

        this.__P_54_19(value, variant, !this.isVisible() || notKnown);
      },

      /**
       * The the internal slider state and its handle and displayed value
       * @param {number} value The new value
       * @param {string} variant The color component to change
       * @param {boolean} instant Animate or instant change
       * @private
       */
      __P_54_19: function __P_54_19(value, variant, instant) {
        this.__P_54_9 = this.__P_54_10 === undefined ? this.__P_54_0.copy() : this.__P_54_10.copy();

        this.__P_54_0.changeComponent(variant, value);

        instant = instant || this.__P_54_0.delta(this.__P_54_9) < 0.5;

        if (!instant) {
          this.__P_54_1.setTo(this.__P_54_9, true, false);
        }

        this.__P_54_1.setTo(this.__P_54_0, instant);
      },
      __P_54_2: function __P_54_2(newColor) {
        // check cache
        if (this.__P_54_12 === undefined) {
          var actors = {};
          var actorStyle;
          this.getDomElement().querySelectorAll('.actor').forEach(function (actor) {
            var type = actor.className.replace(/.*cc_([^ ]*).*/, '$1');

            switch (type) {
              case 'box':
              case 'wheel':
                {
                  actorStyle = window.getComputedStyle(actor);
                  var sv_element = type === 'box' ? actor.querySelector('.sv_box') : actor.querySelector('.sv_triangle');
                  var inner = sv_element.querySelector('.inner');
                  var handle = actor.querySelector('.handle');
                  var handle_hue = actor.querySelector('.handle_hue');
                  var hue = actor.querySelector('.hue');
                  actors[type] = {
                    isLCh: hue.classList.contains('lch_hue'),
                    sv_element: sv_element,
                    inner: inner,
                    handle: handle,
                    handle_hue: handle_hue,
                    handle_hueTop: parseFloat(window.getComputedStyle(handle_hue).getPropertyValue('top')),
                    handle_hueWidth: parseFloat(window.getComputedStyle(handle_hue).getPropertyValue('width')),
                    width: parseFloat(actorStyle.getPropertyValue('width')),
                    height: parseFloat(actorStyle.getPropertyValue('padding-top')),
                    innerRadius: parseFloat(window.getComputedStyle(sv_element).getPropertyValue('width')),
                    outerRadius: parseFloat(window.getComputedStyle(hue).getPropertyValue('width'))
                  };
                  break;
                }

              default:
                {
                  actorStyle = window.getComputedStyle(actor);
                  var button = actor.querySelector('button');
                  var range = actor.querySelector('.ui-slider-range');
                  actors[type] = {
                    button: button,
                    range: range,
                    width: parseFloat(actorStyle.getPropertyValue('width')),
                    buttonWidth: parseFloat(window.getComputedStyle(button).getPropertyValue('width'))
                  };
                  range.style.marginLeft = '-' + actorStyle.getPropertyValue('padding-left');
                  range.style.borderRadius = actorStyle.getPropertyValue('border-radius');
                }
            }
          });
          this.__P_54_12 = actors;
        }

        this.__P_54_10 = newColor; // move handles

        for (var type in this.__P_54_12) {
          var actor = this.__P_54_12[type];

          if (type === 'wheel') {
            var Bt = 75;
            var St = 0;
            var Wt = 75;
            var Bl = 7.5;
            var Sl = 50;
            var Wl = 92.5;
            var angle = void 0;

            if (actor.isLCh) {
              var LCh = this.__P_54_10.getComponent('LCh');

              var r = cv.util.Color.curve(LCh.h, [246, 255, 46, 0, 246], 1);
              var g = cv.util.Color.curve(LCh.h, [27, 224, 255, 136, 27], 1);
              var b = cv.util.Color.curve(LCh.h, [136, 32, 224, 245, 136], 1);
              angle = LCh.h * 360 + 'deg';
              var WSt = LCh.C * St + (1 - LCh.C) * Wt;
              var WSl = LCh.C * Sl + (1 - LCh.C) * Wl;
              actor.handle.style.top = LCh.L * WSt + (1 - LCh.L) * Bt + '%';
              actor.handle.style.left = LCh.L * WSl + (1 - LCh.L) * Bl + '%';
              actor.inner.style.background = 'linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),rgb(' + [r, g, b].join(',') + ')';
            } else {
              var hsv = this.__P_54_10.getComponent('hsv');

              angle = hsv.h * 360 + 'deg';

              var _WSt = hsv.s * St + (1 - hsv.s) * Wt;

              var _WSl = hsv.s * Sl + (1 - hsv.s) * Wl;

              actor.handle.style.top = hsv.v * _WSt + (1 - hsv.v) * Bt + '%';
              actor.handle.style.left = hsv.v * _WSl + (1 - hsv.v) * Bl + '%';
              actor.inner.style.background = 'linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),hsl(' + angle + ' 100% 50%)';
            }

            actor.sv_element.style.transform = 'rotate(' + angle + ')';
          } else if (type === 'box') {
            var _angle = void 0;

            if (actor.isLCh) {
              var _LCh = this.__P_54_10.getComponent('LCh');

              var _r = cv.util.Color.curve(_LCh.h, [246, 255, 46, 0, 246], 1);

              var _g = cv.util.Color.curve(_LCh.h, [27, 224, 255, 136, 27], 1);

              var _b = cv.util.Color.curve(_LCh.h, [136, 32, 224, 245, 136], 1);

              _angle = _LCh.h * 360 + 'deg';
              actor.handle.style.top = (1 - _LCh.L) * 100 + '%';
              actor.handle.style.left = (1 - _LCh.C) * 100 + '%';
              actor.inner.style.background = 'linear-gradient(0deg, black 0%, transparent 50%, white 100%), linear-gradient(90deg,rgb(' + [_r, _g, _b].join(',') + '), #808080 100%)';
            } else {
              var _hsv = this.__P_54_10.getComponent('hsv');

              _angle = _hsv.h * 360 + 'deg';
              actor.handle.style.top = (1 - _hsv.v) * 100 + '%';
              actor.handle.style.left = (1 - _hsv.s) * 100 + '%';
              actor.inner.style.background = 'linear-gradient(0deg, black 0%, transparent 50%, white 100%), linear-gradient(90deg,hsl(' + _angle + ' 100% 50%), #808080 100%)';
            }

            actor.handle_hue.style.transform = 'rotate(' + _angle + ')';
            actor.handle_hue.style.transformOrigin = actor.handle_hueWidth / 2 + 'px ' + (actor.width / 2 - actor.handle_hueTop) + 'px'; //calc(195px / 2 - 3px)';
          } else {
            var ratioComponent = this.__P_54_10.getComponent(type);

            if (type === 'T') {
              ratioComponent = (ratioComponent - this.__P_54_15) / (this.__P_54_16 - this.__P_54_15);
            }

            var length = Math.max(0, Math.min(ratioComponent, 1)) * actor.width;
            actor.button.style.transform = 'translate3d(' + (length - actor.buttonWidth / 2) + 'px, 0px, 0px)';
            actor.range.style.clipPath = 'inset(0 ' + (1 - ratioComponent) * 100 + '% 0 0)';
          }
        }
      },
      __P_54_4: function __P_54_4() {
        this.__P_54_12 = undefined; // invalidate cached values

        this.__P_54_1.setTo(this.__P_54_0, true
        /* tmp */
        );
      },
      handleEvent: function handleEvent(event) {
        var relCoordX = 0;
        var relCoordY = 0;
        var actor;

        switch (event.type) {
          case 'pointerdown':
            {
              var actorType = event.currentTarget.className.replace(/.*cc_([^ ]*).*/, '$1');
              actor = this.__P_54_12[actorType];
              var boundingRect = event.currentTarget.getBoundingClientRect();
              var computedStyle = window.getComputedStyle(event.currentTarget);
              this.__P_54_20 = boundingRect.left + parseFloat(computedStyle.paddingLeft);
              this.__P_54_21 = boundingRect.top;
              relCoordX = (event.clientX - this.__P_54_20) / actor.width;
              relCoordY = (event.clientY - this.__P_54_21) / actor.height;

              if (actorType === 'wheel') {
                var radius = actor !== undefined ? 0.5 * actor.innerRadius / actor.outerRadius : 1;
                var sv = cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX, relCoordY, this.__P_54_0.getComponent(actor.isLCh ? 'LCh' : 'hsv').h, radius);
                var distSqrd = Math.pow(relCoordX - 0.5, 2) + Math.pow(relCoordY - 0.5, 2);

                if (distSqrd < Math.pow(0.535, 2)) {
                  // ignore clicks outside of the wheel, with 7% safety margin on the outside
                  var clearlyOnWheel = Math.pow(radius * 1.10, 2) < distSqrd; // with 10% safety margin to the interior triangle

                  var closeToInerior = Math.pow(radius, 2) < distSqrd && !clearlyOnWheel;
                  var closeToTriangleCorners = sv[1] < 0.01 || sv[0] < 0.01 && sv[1] > 0.99 || sv[0] > 0.99 && sv[1] > 0.99;

                  if (clearlyOnWheel || closeToInerior && !closeToTriangleCorners) {
                    this.__P_54_8 = 'wheel_h';

                    this.__P_54_0.changeComponent(actor.isLCh ? 'LCh-h' : 'h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2 / Math.PI);

                    this.__P_54_13 = true;
                  } else {
                    this.__P_54_8 = 'wheel_sv';

                    this.__P_54_0.changeComponent(actor.isLCh ? 'LCh-CL' : 'sv', sv);

                    this.__P_54_13 = true;
                  }
                }
              } else if (actorType === 'box') {
                var boxSize = actor !== undefined ? 0.5 * actor.innerRadius / actor.outerRadius : 1;
                var x = relCoordX - 0.5;
                var y = relCoordY - 0.5;
                var _sv = [-x / boxSize / 2 + 0.5, -y / boxSize / 2 + 0.5];

                if (Math.abs(x) < boxSize && Math.abs(y) < boxSize) {
                  this.__P_54_8 = 'box_sv';

                  this.__P_54_0.changeComponent(actor.isLCh ? 'LCh-CL' : 'sv', _sv);

                  this.__P_54_13 = true;
                } else {
                  this.__P_54_8 = 'box_h';

                  this.__P_54_0.changeComponent(actor.isLCh ? 'LCh-h' : 'h', 0.5 + Math.atan2(-x, y) / 2 / Math.PI);

                  this.__P_54_13 = true;
                }
              } else {
                var ratio = relCoordX;

                if (actorType === 'T') {
                  ratio = this.__P_54_15 + ratio * (this.__P_54_16 - this.__P_54_15);
                }

                this.__P_54_8 = actorType;

                this.__P_54_0.changeComponent(actorType, ratio);

                this.__P_54_13 = true;
              }

              if (this.__P_54_13) {
                document.addEventListener('pointermove', this);
                document.addEventListener('pointerup', this);
              } else {
                this.__P_54_8 = undefined;
              }

              break;
            }

          case 'pointermove':
            {
              if (!this.__P_54_13) {
                return;
              }

              if (event.buttons === 0) {
                // move with no button could only happen during debug sessions
                this.__P_54_13 = false;
                document.removeEventListener('pointermove', this);
                document.removeEventListener('pointerup', this);
              }

              var type = this.__P_54_8.split('_')[0]; // clamp "wheel_*" to "wheel"


              actor = this.__P_54_12[type];
              relCoordX = (event.clientX - this.__P_54_20) / actor.width;
              relCoordY = (event.clientY - this.__P_54_21) / actor.height;
              break;
            }

          case 'pointerup':
            {
              this.__P_54_13 = false;
              document.removeEventListener('pointermove', this);
              document.removeEventListener('pointerup', this);

              var _type = this.__P_54_8.split('_')[0]; // clamp "wheel_*" to "wheel"


              actor = this.__P_54_12[_type];
              relCoordX = (event.clientX - this.__P_54_20) / actor.width;
              relCoordY = (event.clientY - this.__P_54_21) / actor.height;
              break;
            }
        }

        if (event.type !== 'pointerdown') {
          var _type2 = this.__P_54_8.split('_')[0]; // clamp "wheel_*" to "wheel"


          var _actor = this.__P_54_12[_type2];

          switch (this.__P_54_8) {
            case 'wheel_sv':
              {
                var _radius = _actor !== undefined ? 0.5 * _actor.innerRadius / _actor.outerRadius : 1;

                var _sv2 = cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX, relCoordY, this.__P_54_0.getComponent(_actor.isLCh ? 'LCh' : 'hsv').h, _radius);

                this.__P_54_0.changeComponent(_actor.isLCh ? 'LCh-CL' : 'sv', [Math.min(Math.max(_sv2[0], 0), 1), Math.min(Math.max(_sv2[1], 0), 1)]);

                break;
              }

            case 'box_sv':
              {
                var _boxSize = _actor !== undefined ? 0.5 * _actor.innerRadius / _actor.outerRadius : 1;

                var _x = relCoordX - 0.5;

                var _y = relCoordY - 0.5;

                var _sv3 = [-_x / _boxSize / 2 + 0.5, -_y / _boxSize / 2 + 0.5];

                this.__P_54_0.changeComponent(_actor.isLCh ? 'LCh-CL' : 'sv', [Math.min(Math.max(_sv3[0], 0), 1), Math.min(Math.max(_sv3[1], 0), 1)]);

                break;
              }

            case 'wheel_h':
            case 'box_h':
              this.__P_54_0.changeComponent(_actor.isLCh ? 'LCh-h' : 'h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2 / Math.PI);

              break;

            case 'T':
              this.__P_54_0.changeComponent('T', this.__P_54_15 + Math.max(0, Math.min(relCoordX, 1)) * (this.__P_54_16 - this.__P_54_15));

              break;

            default:
              this.__P_54_0.changeComponent(this.__P_54_8, relCoordX);

          }
        }

        this.__P_54_1.setTo(this.__P_54_0, true);

        if (!this.getSendOnFinish() || event.type === 'pointerup') {
          this.__P_54_17.call();
        }
      },
      __P_54_18: function __P_54_18() {
        var _this3 = this;

        this.__P_54_5.forEach(function (type) {
          var value = _this3.__P_54_0.getComponent(['xyY', 'x', 'y'].includes(type) ? 'xy' : type);

          var typeCategory;
          var base;

          switch (type) {
            case 'h':
              value *= 360;
              typeCategory = 'hsv-single';
              break;

            case 's':
            case 'v':
              value *= 100;
              typeCategory = 'hsv-single';
              break;

            case 'hsv':
              value = new Map([['h', value.h * 360], ['s', value.s * 100], ['v', value.v * 100]]);
              typeCategory = 'hsv';
              break;

            case 'RGB-r':
            case 'RGB-g':
            case 'RGB-b':
              base = _this3.getBaseColors()[type.split('-')[1]];
              value = cv.util.Color.curve(value, base.curve, base.scale);
              typeCategory = 'rgb-single';
              break;

            case 'RGBW-r':
            case 'RGBW-g':
            case 'RGBW-b':
            case 'RGBW-w':
              base = _this3.getBaseColors()[type.split('-')[1]];
              value = cv.util.Color.curve(value, base.curve, base.scale);
              typeCategory = 'rgbw-single';
              break;

            case 'rgb':
              base = _this3.getBaseColors();
              value = new Map([['r', cv.util.Color.curve(value.r, base.r.curve, base.r.scale)], ['g', cv.util.Color.curve(value.g, base.g.curve, base.g.scale)], ['b', cv.util.Color.curve(value.b, base.b.curve, base.b.scale)]]);
              typeCategory = 'rgb';
              break;

            case 'rgbw':
              base = _this3.getBaseColors();
              value = new Map([['r', cv.util.Color.curve(value.r, base.r.curve, base.r.scale)], ['g', cv.util.Color.curve(value.g, base.g.curve, base.g.scale)], ['b', cv.util.Color.curve(value.b, base.b.curve, base.b.scale)], ['w', cv.util.Color.curve(value.w, base.w.curve, base.w.scale)]]);
              typeCategory = 'rgbw';
              break;

            case 'xy':
              value = new Map([['x', value.x], ['y', value.y]]);
              typeCategory = 'xyY';
              break;

            case 'xyY':
              {
                var Y = _this3.__P_54_0.getComponent('Y');

                value = new Map([['x', value.x], ['y', value.y], ['Y', Y]]);
                typeCategory = 'xyY';
                break;
              }

            case 'Y':
              typeCategory = 'xyY';
              break;

            case 'x':
            case 'y':
              value = value[type];
              typeCategory = 'xyY';
              break;
          }

          if (_this3.__P_54_6[typeCategory] === undefined) {
            _this3.__P_54_6[typeCategory] = {};
          }

          _this3.__P_54_6[typeCategory][type] = _this3.sendToBackend(value, function (t) {
            return t.variantInfo === type;
          }, _this3.__P_54_6[typeCategory][type]);
        });
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('colorchooser', statics);
    }
  });
  cv.ui.structure.pure.ColorChooser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ColorChooser.js.map?dt=1642787794307