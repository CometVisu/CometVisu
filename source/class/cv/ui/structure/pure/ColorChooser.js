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
    coord2sv: function( x, y, hue, radius ) {
      const
        hue2angle = 2 * Math.PI,
        // coordinates of the triangle corners
        Sx = 0.5 - Math.sin( hue2angle * (   -hue) ) * radius, // 100% saturation
        Sy = 0.5 - Math.cos( hue2angle * (   -hue) ) * radius,
        Wx = 0.5 - Math.sin( hue2angle * (2/3-hue) ) * radius, // 100% white
        Wy = 0.5 - Math.cos( hue2angle * (2/3-hue) ) * radius,
        Bx = 0.5 - Math.sin( hue2angle * (1/3-hue) ) * radius, // 100% black
        By = 0.5 - Math.cos( hue2angle * (1/3-hue) ) * radius,
        // differences to determine (u,v) coordinates of (x,y)
        WBx = Wx - Bx,
        WBy = Wy - By,
        SBx = Sx - Bx,
        SBy = Sy - By,
        CBx = x - Bx,
        CBy = y - By,
        uv = cv.util.Color.solve2d(WBx, WBy, SBx, SBy, CBx, CBy),
        u = Math.min(Math.max(0,uv[0]),1), v = Math.min(Math.max(0,uv[1]),1),
        // convert (u,v) to S and V
        value = u + v,
        saturation = Math.abs(value) < 1e-3 ? 0 : v/value;
      return [saturation, value];
    },
  },

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);

    const base = this.getBaseColors();
    this.__color = new cv.util.Color( base.r, base.g, base.b, base.w );
    this.__animator = new cv.util.LimitedRateUpdateAnimator(this.__updateHandlePosition, this);
    this.__animator.setAnimationSpeed(100, 0.5);
    this.__pageSizeListener = cv.ui.layout.ResizeHandler.states.addListener('changePageSizeInvalid',()=>{this.__invalidateScreensize();});
    this.__components = new Set(Object.entries(this.getAddress()).map(v=>v[1].variantInfo));
    this.__lastBusValue = {};
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    cv.ui.layout.ResizeHandler.states.removeListenerById(this.__pageSizeListener);
    this.__pageSizeListener = null;
    this.__button = null;
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    controls: {
      check: "String"
    },
    baseColors: {
      check: "Object"
    },
    sendOnFinish: {
      check: "Boolean",
      init: false
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __mode: '',
    __colorOld: undefined,      // the color where the animation started
    __colorCurrent: undefined,  // the current color of the running animation
    __color: undefined,         // the current color of the widget, also the target for the animation
    __lastBusValue: undefined,  // initialize with empty object in the constructor to prevent object being shared between instances
    __animator: null,
    __button: undefined, // cache for DOM element
    __range: undefined,  // cache for DOM element
    __actors: undefined,
    __pageSizeListener: undefined,
    __components: undefined, // set of all color components required to send
    __inDrag: false,       // is the handle currently dragged?
    __coordMin: undefined, // minimal screen coordinate of slider
    __Tmin: 2000,   // minimal color temperature to show in slider
    __Tmax: 12500,  // maximal color temperature to show in slider

    // overridden
    _getInnerDomString: function () {
      const placeholder = this.getFormat() === '' ? '' : '-';
      const self = this;
      let retval = '';
      const historicWidth = this.getLayout().colspan === undefined ? ' style="width:195px"' : '';
      let controls = this.getControls().split(';');
      if(controls[0] === '') {
        controls[0] = 'box';
      }
      controls.forEach(function(control){
        switch(control) {
          case 'box':
          case 'LCh-box':
            let hue_type = control === 'box' ? 'hsv_hue' : 'lch_hue';
            retval += '<div class="actor cc_box"><div class="hue ' + hue_type;
            retval += '"></div><div class="handle_hue"></div><div class="sv_box"><div class="inner"></div><div class="handle"></div></div></div>';
            break;

          case 'triangle':
          case 'LCh-triangle':
            hue_type = control === 'triangle' ? 'hsv_hue' : 'lch_hue';
            retval += '<div class="actor cc_wheel"><div class="hue ' + hue_type;
            retval += '"></div><div class="sv_triangle"><div class="inner"></div><div class="handle_hue"></div><div class="handle"></div></div></div>';
            break;

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
            retval += '<div class="actor cc_' + control + ` ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" style="touch-action: pan-y;">
              <button class="ui-slider-handle ui-state-default ui-corner-all" draggable="false" unselectable="true" style="transform: translate3d(0px, 0px, 0px);">`+placeholder+`</button>
              <div class="ui-slider-range" style="margin-left: 0px; clip-path: inset(0 100% 0 0);"></div>
            </div>`;
            break;

          default:
            let parts = control.split(':');
            if(parts[0] === 'T') {
              let temperatures = parts[1].split('-');
              self.__Tmin = Math.max( 1667, Math.min( temperatures[0] || 2500, 25000 ));
              self.__Tmax = Math.max( 1667, Math.min( temperatures[1] || 9000, 25000 ));
              let
                rgbTmin = cv.util.Color.xy2sRGB(cv.util.Color.temperature2xy(self.__Tmin)),
                rgbTmax = cv.util.Color.xy2sRGB(cv.util.Color.temperature2xy(self.__Tmax)),
                disp = c => [Math.round(255*c.r), Math.round(255*c.g), Math.round(255*c.b)].join(','),
                colors = 'rgb(' + disp(rgbTmin) + '), rgb(' + disp(rgbTmax) + ')';

              retval += `<div class="actor cc_T ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" style="touch-action: pan-y;">
          <button class="ui-slider-handle ui-state-default ui-corner-all" draggable="false" unselectable="true" style="transform: translate3d(0px, 0px, 0px);">`+placeholder+`</button>
          <div class="ui-slider-range" style="margin-left: 0px; clip-path: inset(0 100% 0 0);background: linear-gradient(90deg, `+colors+`);"></div>
        </div>`;
            }
        }
      });
      return '<div class="actors"'+historicWidth+'>' + retval + '</div>';
    },

    // overridden
    _onDomReady: function() {
      this.base(arguments);

      this.__throttled = cv.util.Function.throttle(this.__onChangeValue, 250, {trailing: true}, this);

      this.getDomElement().querySelectorAll('.actor').forEach(actor=>actor.addEventListener('pointerdown', this));
    },

    _update: function (address, data) {
      function showInvalidDataErrorMessage(transform, variant) {
        if (cv.Config.testMode === true) {
          console.error('Updating ColorChooser with invalid data<br/>Address: '+address+', data: '+data+', transform: '+transform+', variant: '+variant);
        }
        cv.core.notifications.Router.dispatchMessage('cv.config.error',{
          message: 'Updating ColorChooser with invalid data<br/>Address: '+address+', data: '+data+', transform: '+transform+', variant: '+variant
        });
      }

      const transform = this.getAddress()[address].transform;
      let variant = this.getAddress()[ address ].variantInfo;

      let
        variantType,
        value = cv.Transform.decode(transform, data),
        base;

      switch( variant ) {
        case 'h':
        case 's':
        case 'v':
          if(!Number.isFinite(value)) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          value /= 100;
          variantType = 'hsv-single';
          break;

        case 'hsv':
          if(value.get === undefined) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          value = { h: value.get('h')/360, s: value.get('s')/100, v: value.get('v')/100 };
          variantType = 'hsv';
          break;

        case 'RGB-r':
        case 'RGB-g':
        case 'RGB-b':
          if(!Number.isFinite(value)) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          base = this.getBaseColors()[variant.split('-')[1]];
          value = cv.util.Color.invCurve( value, base.curve, base.scale );
          variantType = 'rgb-single';
          break;

        case 'rgb':
          base = this.getBaseColors();
          if(value.get === undefined) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          value = {
            r: cv.util.Color.invCurve( value.get('r'), base.r.curve, base.r.scale ),
            g: cv.util.Color.invCurve( value.get('g'), base.g.curve, base.g.scale ),
            b: cv.util.Color.invCurve( value.get('b'), base.b.curve, base.b.scale )
          };
          variantType = 'rgb';
          break;

        case 'RGBW-r':
        case 'RGBW-g':
        case 'RGBW-b':
        case 'RGBW-w':
          if(!Number.isFinite(value)) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          base = this.getBaseColors()[variant.split('-')[1]];
          value = cv.util.Color.invCurve( value, base.curve, base.scale );
          variantType = 'rgbw-single';
          break;

        case 'rgbw':
          base = this.getBaseColors();
          if(value.get === undefined) {
            showInvalidDataErrorMessage(transform, variant);
            return;
          }
          value = {
            r: cv.util.Color.invCurve( value.get('r'), base.r.curve, base.r.scale ),
            g: cv.util.Color.invCurve( value.get('g'), base.g.curve, base.g.scale ),
            b: cv.util.Color.invCurve( value.get('b'), base.b.curve, base.b.scale ),
            w: cv.util.Color.invCurve( value.get('w'), base.w.curve, base.w.scale )
          };
          variantType = 'rgbw';
          break;

        case 'x':
        case 'y':
          variantType = 'xyY';
          break;

        case 'Y':
          if( value instanceof Map && value.get('YValid') !== false ) {
            value = value.get('Y');
          } else if (Number.isFinite(value) ) {
          } else {
            showInvalidDataErrorMessage(transform, variant);
            return; // nothing that can be done with this data
          }
          variantType = 'xyY';
          break;

        case 'xy':
          if( value instanceof Map && value.get('cValid') !== false ) {
            value = { x: value.get('x'), y: value.get('y') };
          } else if( value.hasOwnProperty('x') && value.hasOwnProperty('y') ) {
          } else {
            showInvalidDataErrorMessage(transform, variant);
            return; // nothing that can be done with this data
          }
          variantType = 'xyY';
          break;

        case 'xyY':
          if( value instanceof Map ) {
            variant = (value.get('cValid') !== false ? 'xy' : '') + (value.get('YValid') !== false ? 'Y' : '');
            value = {
              x: value.get('x'),
              y: value.get('y'),
              Y: value.get('Y')
            };
            if( variant === '' ) {
              return; // no valid data in the value
            }
          } else {
            showInvalidDataErrorMessage(transform, variant);
            return; // nothing that can be done with this data
          }
          variantType = 'xyY';
          break;
      }

      if (this.__inDrag || (this.__lastBusValue[variantType] && this.__lastBusValue[variantType][variant] && this.__lastBusValue[variantType][variant][transform] === data)) {
        // slider in use -> ignore value from bus
        // internal state unchanged -> also do nothing
        return;
      }
      const notKnown = this.__lastBusValue[variantType] === undefined;
      if( notKnown ) {
        this.__lastBusValue[variantType] = {};
      }

      // forget all other transforms as they might not be valid anymore
      this.__lastBusValue = {[variantType]: this.__lastBusValue[variantType]};
      this.__lastBusValue[variantType][variant] = {[transform]: data};

      // animate when visible, otherwise jump to the target value
      this.__setSliderTo(value, variant, !this.isVisible() || notKnown);
    },

    /**
     * The the internal slider state and its handle and displayed value
     * @param {number} value The new value
     * @param {string} variant The color component to change
     * @param {boolean} instant Animate or instant change
     * @private
     */
    __setSliderTo: function(value, variant, instant) {
      this.__colorOld = this.__colorCurrent === undefined ? this.__color.copy() : this.__colorCurrent.copy();
      this.__color.changeComponent( variant, value );
      instant = instant || this.__color.delta(this.__colorOld) < 0.5;
      if( !instant ) {
        this.__animator.setTo(this.__colorOld, true, false );
      }
      this.__animator.setTo(this.__color, instant);
    },

    __updateHandlePosition: function (newColor) {
      // check cache
      if (this.__actors === undefined) {
        let
          actors = {},
          actorStyle;
        this.getDomElement().querySelectorAll('.actor').forEach(function (actor){
          let type = actor.className.replace(/.*cc_([^ ]*).*/,'$1');
          switch(type) {
            case 'box':
            case 'wheel':
              actorStyle = window.getComputedStyle(actor);
              let sv_element = type === 'box' ? actor.querySelector('.sv_box') : actor.querySelector('.sv_triangle');
              let inner = sv_element.querySelector('.inner');
              let handle = actor.querySelector('.handle');
              let handle_hue = actor.querySelector('.handle_hue');
              let hue = actor.querySelector('.hue');
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

            default:
              actorStyle = window.getComputedStyle(actor);
              let button = actor.querySelector('button');
              let range = actor.querySelector('.ui-slider-range');
              actors[type] = {
                button: button,
                range: range,
                width: parseFloat(actorStyle.getPropertyValue('width')),
                buttonWidth: parseFloat(window.getComputedStyle(button).getPropertyValue('width'))
              };
              range.style.marginLeft = '-' + actorStyle.getPropertyValue('padding-left');
              range.style.borderRadius = actorStyle.getPropertyValue('border-radius');
          }
        });
        this.__actors = actors;
      }

      this.__colorCurrent = newColor;
      // move handles
      for( let type in this.__actors ) {
        let actor = this.__actors[type];
        if( type === 'wheel' ) {
          const Bt = 75, St = 0, Wt = 75;
          const Bl = 50-85/2, Sl = 50, Wl = 50+85/2;
          let angle;
          if(actor.isLCh) {
            let LCh = this.__colorCurrent.getComponent('LCh');
            let r = cv.util.Color.curve(LCh.h, [246, 255,  46,   0, 246],1);
            let g = cv.util.Color.curve(LCh.h, [ 27, 224, 255, 136,  27],1);
            let b = cv.util.Color.curve(LCh.h, [136,  32, 224, 245, 136],1);
            angle = (LCh.h*360)+'deg';
            const WSt = LCh.C*St + (1-LCh.C)*Wt, WSl = LCh.C*Sl + (1-LCh.C)*Wl;
            actor.handle.style.top  = (LCh.L*WSt + (1-LCh.L)*Bt) + '%';
            actor.handle.style.left = (LCh.L*WSl + (1-LCh.L)*Bl) + '%';
            actor.inner.style.background = 'linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),rgb('+[r,g,b].join(',')+')';
          } else {
            let hsv = this.__colorCurrent.getComponent('hsv');
            angle = (hsv.h*360)+'deg';
            const WSt = hsv.s*St + (1-hsv.s)*Wt, WSl = hsv.s*Sl + (1-hsv.s)*Wl;
            actor.handle.style.top  = (hsv.v*WSt + (1-hsv.v)*Bt) + '%';
            actor.handle.style.left = (hsv.v*WSl + (1-hsv.v)*Bl) + '%';
            actor.inner.style.background = 'linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),hsl('+angle+' 100% 50%)';
          }
          actor.sv_element.style.transform = 'rotate('+angle+')';
        } else if( type === 'box' ) {
          let angle;
          if(actor.isLCh) {
            let LCh = this.__colorCurrent.getComponent('LCh');
            let r = cv.util.Color.curve(LCh.h, [246, 255,  46,   0, 246],1);
            let g = cv.util.Color.curve(LCh.h, [ 27, 224, 255, 136,  27],1);
            let b = cv.util.Color.curve(LCh.h, [136,  32, 224, 245, 136],1);
            angle = (LCh.h*360)+'deg';
            actor.handle.style.top = (1-LCh.L) * 100 + '%';
            actor.handle.style.left = (1-LCh.C) * 100 + '%';
            actor.inner.style.background = 'linear-gradient(0deg, black 0%, transparent 50%, white 100%), linear-gradient(90deg,rgb('+[r,g,b].join(',')+'), #808080 100%)';
          } else {
            let hsv = this.__colorCurrent.getComponent('hsv');
            angle = (hsv.h*360)+'deg';
            actor.handle.style.top = (1-hsv.v) * 100 + '%';
            actor.handle.style.left = (1-hsv.s) * 100 + '%';
            actor.inner.style.background = 'linear-gradient(0deg, black 0%, transparent 50%, white 100%), linear-gradient(90deg,hsl('+angle+' 100% 50%), #808080 100%)';
          }
          actor.handle_hue.style.transform = 'rotate('+angle+')';
          actor.handle_hue.style.transformOrigin = actor.handle_hueWidth/2 + 'px '+(actor.width/2 - actor.handle_hueTop)+'px'; //calc(195px / 2 - 3px)';
        } else {
          let ratioComponent = this.__colorCurrent.getComponent(type);
          if( 'T' === type ) {
            ratioComponent = (ratioComponent - this.__Tmin)/(this.__Tmax - this.__Tmin);
          }
          let length = Math.max(0, Math.min( ratioComponent, 1 )) * actor.width;
          actor.button.style.transform = 'translate3d(' + (length-actor.buttonWidth/2) + 'px, 0px, 0px)';
          actor.range.style.clipPath = 'inset(0 ' + (1-ratioComponent)*100 + '% 0 0)';
        }
      }
    },

    __invalidateScreensize: function () {
      this.__actors = undefined; // invalidate cached values
      this.__animator.setTo(this.__color, true /* tmp */);
    },

    handleEvent: function (event) {
      let relCoordX = 0;
      let relCoordY = 0;
      let actor;

      switch(event.type) {
        case 'pointerdown':
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          let actorType = event.currentTarget.className.replace(/.*cc_([^ ]*).*/,'$1');
          actor = this.__actors[actorType];
          let boundingRect = event.currentTarget.getBoundingClientRect();
          let computedStyle = window.getComputedStyle(event.currentTarget);
          this.__coordMinX = boundingRect.left + parseFloat(computedStyle.paddingLeft);
          this.__coordMinY = boundingRect.top;
          relCoordX = (event.clientX - this.__coordMinX)/actor.width;
          relCoordY = (event.clientY - this.__coordMinY)/actor.height;
          if( actorType === 'wheel' ) {
            let radius = actor !== undefined ? (0.5 * actor.innerRadius / actor.outerRadius) : 1;
            let sv=cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX,relCoordY,this.__color.getComponent(actor.isLCh?'LCh':'hsv').h,radius);
            let distSqrd = (relCoordX-0.5)**2 + (relCoordY-0.5)**2;
            if( radius**2 < distSqrd && distSqrd < 0.5**2 ) {
              this.__mode = 'wheel_h';
              this.__color.changeComponent(actor.isLCh?'LCh-h':'h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2/Math.PI );
              this.__inDrag = true;
            } else if( 0<=sv[0] && sv[0]<=1 && 0<=sv[1] && sv[1]<=1 ) {
              this.__mode = 'wheel_sv';
              this.__color.changeComponent(actor.isLCh?'LCh-CL':'sv', sv);
              this.__inDrag = true;
            }
          } else if( actorType === 'box' ) {
            let boxSize = actor !== undefined ? (0.5 * actor.innerRadius / actor.outerRadius) : 1;
            let x = relCoordX-0.5, y = relCoordY-0.5;
            let sv =  [-x/boxSize/2+0.5, -y/boxSize/2+0.5];
            if( (Math.abs(x) < boxSize) && (Math.abs(y) < boxSize) ) {
              this.__mode = 'box_sv';
              this.__color.changeComponent(actor.isLCh?'LCh-CL':'sv', sv);
              this.__inDrag = true;
            } else {
              this.__mode = 'box_h';
              this.__color.changeComponent(actor.isLCh?'LCh-h':'h', 0.5 + Math.atan2(-x, y) / 2/Math.PI );
              this.__inDrag = true;
            }
          } else {
            let ratio = relCoordX;
            if( 'T' === actorType ) {
              ratio = this.__Tmin + ratio * (this.__Tmax - this.__Tmin);
            }
            this.__mode = actorType;
            this.__color.changeComponent(actorType, ratio);
            this.__inDrag = true;
          }
          break;

        case 'pointermove':
          if (!this.__inDrag) {
            return;
          }
          if( event.buttons === 0 ) { // move with no button could only happen during debug sessions
            this.__inDrag = false;
            document.removeEventListener('pointermove', this);
            document.removeEventListener('pointerup', this);
          }
          let type = this.__mode.split('_')[0]; // clamp "wheel_*" to "wheel"
          actor = this.__actors[type];
          relCoordX = (event.clientX - this.__coordMinX)/actor.width;
          relCoordY = (event.clientY - this.__coordMinY)/actor.height;
          break;

        case 'pointerup':
          this.__inDrag = false;
          document.removeEventListener('pointermove', this);
          document.removeEventListener('pointerup', this);
          type = this.__mode.split('_')[0]; // clamp "wheel_*" to "wheel"
          actor = this.__actors[type];
          relCoordX = (event.clientX - this.__coordMinX)/actor.width;
          relCoordY = (event.clientY - this.__coordMinY)/actor.height;
          break;
      }

      if(event.type !== 'pointerdown') {
        let type = this.__mode.split('_')[0]; // clamp "wheel_*" to "wheel"
        let actor = this.__actors[type];
        switch (this.__mode) {
          case 'wheel_sv':
            let radius = actor !== undefined ? (0.5 * actor.innerRadius / actor.outerRadius) : 1;
            let sv = cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX, relCoordY, this.__color.getComponent(actor.isLCh?'LCh':'hsv').h, radius);
            this.__color.changeComponent(actor.isLCh?'LCh-CL':'sv', [Math.min(Math.max(sv[0], 0), 1), Math.min(Math.max(sv[1], 0), 1)]);
            break;
          case 'box_sv':
            let boxSize = actor !== undefined ? (0.5 * actor.innerRadius / actor.outerRadius) : 1;
            let x = relCoordX-0.5, y = relCoordY-0.5;
            sv = [-x/boxSize/2+0.5, -y/boxSize/2+0.5];
            this.__color.changeComponent(actor.isLCh?'LCh-CL':'sv', [Math.min(Math.max(sv[0], 0), 1), Math.min(Math.max(sv[1], 0), 1)]);
            break;
          case 'wheel_h':
          case 'box_h':
            this.__color.changeComponent(actor.isLCh?'LCh-h':'h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2 / Math.PI);
            break;
          case 'T':
            this.__color.changeComponent('T', this.__Tmin + Math.max(0, Math.min(relCoordX, 1)) * (this.__Tmax - this.__Tmin) );
            break;
          default:
            this.__color.changeComponent(this.__mode, relCoordX);
        }
      }
      this.__animator.setTo(this.__color, true);
      if (!this.getSendOnFinish() || event.type === 'pointerup') {
        this.__throttled.call();
      }
    },

    __onChangeValue: function() {
      this.__components.forEach((type) => {
        let
          value = this.__color.getComponent(['xyY','x','y'].includes(type) ? 'xy' : type),
          typeCategory,
          base;

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
            value = new Map([['h', value.h*360], ['s', value.s*100], ['v', value.v*100]] );
            typeCategory = 'hsv';
            break;

          case 'RGB-r':
          case 'RGB-g':
          case 'RGB-b':
            base = this.getBaseColors()[type.split('-')[1]];
            value = cv.util.Color.curve( value, base.curve, base.scale );
            typeCategory = 'rgb-single';
            break;

          case 'RGBW-r':
          case 'RGBW-g':
          case 'RGBW-b':
          case 'RGBW-w':
            base = this.getBaseColors()[type.split('-')[1]];
            value = cv.util.Color.curve( value, base.curve, base.scale );
            typeCategory = 'rgbw-single';
            break;

          case 'rgb':
            base = this.getBaseColors();
            value = new Map([
              ['r', cv.util.Color.curve(value.r, base.r.curve, base.r.scale )],
              ['g', cv.util.Color.curve(value.g, base.g.curve, base.g.scale )],
              ['b', cv.util.Color.curve(value.b, base.b.curve, base.b.scale )]
            ]);
            typeCategory = 'rgb';
            break;

          case 'rgbw':
            base = this.getBaseColors();
            value = new Map([
              ['r', cv.util.Color.curve(value.r, base.r.curve, base.r.scale )],
              ['g', cv.util.Color.curve(value.g, base.g.curve, base.g.scale )],
              ['b', cv.util.Color.curve(value.b, base.b.curve, base.b.scale )],
              ['w', cv.util.Color.curve(value.w, base.w.curve, base.w.scale )]
            ]);
            typeCategory = 'rgbw';
            break;

          case 'xy':
            value = new Map([
              ['x', value.x],
              ['y', value.y]
            ]);
            typeCategory = 'xyY';
            break;

          case 'xyY':
            let Y = this.__color.getComponent('Y');
            value = new Map([
              ['x', value.x],
              ['y', value.y],
              ['Y', Y]
            ]);
            typeCategory = 'xyY';
            break;

          case 'Y':
            typeCategory = 'xyY';
            break;

          case 'x':
          case 'y':
            value = value[type];
            typeCategory = 'xyY';
            break;
        }
        if( this.__lastBusValue[typeCategory] === undefined ) {
          this.__lastBusValue[typeCategory] = {};
        }
        this.__lastBusValue[typeCategory][type] = this.sendToBackend(value, (t) => t.variantInfo===type, this.__lastBusValue[typeCategory][type] );
      });
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass('colorchooser', statics);
  }
});
