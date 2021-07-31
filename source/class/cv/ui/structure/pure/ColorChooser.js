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
 * Adds a horizontal slider to the visu. This can be used, for example, to dim a light or change temperature values.
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
      const hue2angle = 2 * Math.PI;
      let
        // coordinates of the triangle corners
        Sx = 0.5 - Math.sin( hue2angle * (   -hue) ) * radius, // 100% saturation
        Sy = 0.5 - Math.cos( hue2angle * (   -hue) ) * radius,
        Wx = 0.5 - Math.sin( hue2angle * (2/3-hue) ) * radius, // 100% white
        Wy = 0.5 - Math.cos( hue2angle * (2/3-hue) ) * radius,
        Bx = 0.5 - Math.sin( hue2angle * (1/3-hue) ) * radius, // 100% black
        By = 0.5 - Math.cos( hue2angle * (1/3-hue) ) * radius,
        // differences to determine (u,v) coordinates of (x,y)
        WSx = Wx - Sx,
        WSy = Wy - Sy,
        BSx = Bx - Sx,
        BSy = By - Sy,
        CSx = x - Sx,
        CSy = y - Sy,
        uv = cv.util.Color.solve2d(WSx, WSy, BSx, BSy, CSx, CSy),
        u = uv[0], v = uv[1],
        // convert (u,v) to S and V
        saturation = 1 - u - v,
        value      = (Math.abs(1 - saturation) < 1e-3) ? 0.5 : u / (1 - saturation);
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

    let
      base= this.getBaseColors(),
      f = (x) => ({x:x.x, y:x.y, Y:x.Y});
    this.__color = new cv.util.Color( f(base.r), f(base.g), f(base.b), f(base.w) );
    this.__animator = new cv.util.LimitedRateUpdateAnimator(this.__updateHandlePosition, this);
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
      let placeholder = this.getFormat() === '' ? '' : '-';
      //<div className="hue" style="position:absolute;width:100%;height:100%;border-radius:50%;background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"></div>
      //-webkit-mask: radial-gradient(circle farthest-side,transparent calc(100% - 9px),#fff 0)
      //<div className="saturation" style="position:absolute;width:100%;height:100%;border-radius:50%;background: radial-gradient(circle closest-side, rgb(255, 255, 255), transparent)"></div>
      //<div className="sv_triangle"
      //     style="position: absolute;padding:10px;top:0;right:0;bottom:0;left:0;transform:rotate(0deg);">
      //  <div className="inner"
      //       style="width:100%;height:75%;-webkit-mask:conic-gradient(at 50% 0%, transparent,transparent 150deg,#fff 150deg,#fff 210deg,transparent 210deg);background:linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),linear-gradient(45deg, #f00, #f00);Xtransform-origin: 50% 66.6667%;Xtransform: rotate(23deg)"></div>
      //console.log('_getInnerDomString', this.getControls());
      let
        self = this,
        retval = '',
        historicWidth = this.getLayout().colspan === undefined ? ' style="width:195px"' : '',
        controls = this.getControls().split(';');
      if(controls[0] === '') {
        controls[0] = 'box';
      }
      controls.forEach(function(control){
        switch(control) {
          case 'box':
            retval += `<div class="actor cc_box">
            <div class="hue"></div><div class="handle_hue"></div><div class="sv_box"><div class="inner"></div><div class="handle"></div></div></div>`;
            break;

          case 'triangle':
            retval += `<div class="actor cc_wheel">
            <div class="hue"></div><div class="sv_triangle"><div class="inner"></div><div class="handle_hue"></div><div class="handle"></div></div></div>`;
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
      let
        transform = this.getAddress()[address].transform,
        variant = this.getAddress()[ address ].variantInfo,
        notKnown = this.__lastBusValue[variant] === undefined;
      if (this.__inDrag || (this.__lastBusValue[variant] && this.__lastBusValue[variant][transform] === data)) {
        // slider in use -> ignore value from bus
        // internal state unchanged -> also do nothing
        return;
      }
      
      this.__lastBusValue[variant] = {}; // forget all other transforms as they might not be valid anymore
      this.__lastBusValue[variant][transform] = data;

      let 
        value = cv.Transform.decode(transform, data),
        base;

      switch( variant ) {
        case 'h':
        case 's':
        case 'v':
          value /= 100;
          delete this.__lastBusValue.hsv;
          delete this.__lastBusValue.r;
          delete this.__lastBusValue.g;
          delete this.__lastBusValue.b;
          delete this.__lastBusValue.rgb;
          break;

        case 'hsv':
          value = { h: value.get('h')/100, s: value.get('s')/100, v: value.get('v')/100 };
          delete this.__lastBusValue.h;
          delete this.__lastBusValue.s;
          delete this.__lastBusValue.v;
          delete this.__lastBusValue.r;
          delete this.__lastBusValue.g;
          delete this.__lastBusValue.b;
          delete this.__lastBusValue.rgb;
          break;

        case 'RGB-r':
        case 'RGB-g':
        case 'RGB-b':
          base = this.getBaseColors()[variant];
          value = cv.util.Color.invCurve( value, base.curve, base.scale );
          delete this.__lastBusValue.h;
          delete this.__lastBusValue.s;
          delete this.__lastBusValue.v;
          delete this.__lastBusValue.hsv;
          delete this.__lastBusValue.rgb;
          break;

        case 'rgb':
          base = this.getBaseColors();
          value = {
            r: cv.util.Color.invCurve( value.get('r'), base.r.curve, base.r.scale ),
            g: cv.util.Color.invCurve( value.get('g'), base.g.curve, base.g.scale ),
            b: cv.util.Color.invCurve( value.get('b'), base.b.curve, base.b.scale )
          };
          delete this.__lastBusValue.h;
          delete this.__lastBusValue.s;
          delete this.__lastBusValue.v;
          delete this.__lastBusValue.hsv;
          delete this.__lastBusValue.r;
          delete this.__lastBusValue.g;
          delete this.__lastBusValue.b;
          break;
      }

      // animate when visible, otherwise jump to the target value
      this.__setSliderTo(value, variant, !this.isVisible() || notKnown);
    },

    /**
     * The the internal slider state and its handle and displayed value
     * @param value {Number} The new value
     * @param variant {String} The color component to change
     * @param instant {Boolean} Animate or instant change
     * @private
     */
    __setSliderTo: function(value, variant, instant) {
      ///////////////////////
      //console.log('setSlider',value, variant, instant, relaxDisplay );
      this.__colorOld = this.__colorCurrent === undefined ? this.__color.copy() : this.__colorCurrent.copy();
      this.__color.changeComponent( variant, value );
      //this.__updateHandlePosition();
      instant = instant || this.__color.delta(this.__colorOld) < 0.005;
      if( !instant ) {
        this.__animator.setTo(this.__colorOld, true, false );
      }
      this.__animator.setTo(this.__color, instant);
    },

    __updateHandlePosition: function (ratio) {
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
              range.style.borderRadius = actorStyle.getPropertyValue('border-radius');
          }
        });
        this.__actors = actors;
      }

      //console.log('__updateHandlePosition', ratio, this.__colorOld ? this.__colorOld.getComponent('rgb') :'-', this.__color?this.__color.getComponent('rgb'):'-');
      //console.log('__updateHandlePosition', ratio.getComponent('hsv'), ratio.getComponent('rgb'), '##',this.__colorCurrent?this.__colorCurrent.delta(ratio):'-','##');
      //console.trace();
      this.__colorCurrent = ratio; //(ratio >= 1 || this.__colorOld === undefined) ? this.__color : cv.util.Color.blend( this.__colorOld, this.__color, ratio );
      // move handles
      for( let type in this.__actors ) {
        let
          actor = this.__actors[type];
        if( type === 'wheel' ) {
          let hsv = this.__colorCurrent.getComponent('hsv');
          let angle = (hsv.h*360)+'deg';
          actor.sv_element.style.transform = 'rotate('+angle+')';
          actor.inner.style.background = 'linear-gradient(210deg, transparent 45%, black 90%),linear-gradient(150deg, transparent 45%, white 90%),hsl('+angle+' 100% 50%)';
          actor.handle.style.top = (1-hsv.s) * 75 + '%';
          actor.handle.style.left = (50+(hsv.v-0.5)*(1-hsv.s) * 85) + '%';
        } else if( type === 'box' ) {
          let hsv = this.__colorCurrent.getComponent('hsv');
          let angle = (hsv.h*360)+'deg';
          actor.handle_hue.style.transform = 'rotate('+angle+')';
          actor.handle_hue.style.transformOrigin = actor.handle_hueWidth/2 + 'px '+(actor.width/2 - actor.handle_hueTop)+'px'; //calc(195px / 2 - 3px)';
          actor.inner.style.background = 'linear-gradient(0deg, black 0%, transparent 50%, white 100%), linear-gradient(90deg,hsl('+angle+' 100% 50%), #808080 100%)';
          actor.handle.style.top = (1-hsv.v) * 100 + '%';
          actor.handle.style.left = (1-hsv.s) * 100 + '%';
        } else {
          let ratioComponent = this.__colorCurrent.getComponent(type);
          if( 'T' === type ) {
            ratioComponent = (ratioComponent - this.__Tmin)/(this.__Tmax - this.__Tmin);
          }
          if( 'LCh-L' === type ) {
            ratioComponent = ratioComponent / 100;
          }
          if( 'LCh-C' === type ) {
            ratioComponent = ratioComponent / 150;
          }
          let length = Math.max(0, Math.min( ratioComponent, 1 )) * actor.width;
          actor.button.style.transform = 'translate3d(' + (length-actor.buttonWidth/2) + 'px, 0px, 0px)';
          //actor.range.style.width = length + 'px';
          actor.range.style.clipPath = 'inset(0 ' + (1-ratioComponent)*100 + '% 0 0)';
          //this.__actors[this.__mode].button.textContent = relCoordX;
          actor.button.textContent =  ratioComponent;
        }
      }
      
      //////
      let rgb = this.__colorCurrent.getComponent('rgb');
      let c = cv.util.Color.xy2sRGB(this.__colorCurrent.getComponent('xy'), this.__colorCurrent.getComponent('Y'));
      //console.log(this.__colorCurrent.getComponent('T'),this.__colorCurrent.getComponent('xy'),rgb,c);
      //console.log(this.__parentWidget__P_101_0, this.__parentWidget__P_101_0.getWidgetElement(), this.getParentWidget(), this.getParentWidget().getWidgetElement());
      //console.log(this.getPath(), this.getParentWidget(), this.getParentWidget().getWidgetElement());
      //this.getParentWidget().getWidgetElement().querySelector('.label').style.backgroundColor = 'rgb('+rgb.r*100+'% '+rgb.g*100+'% '+rgb.b*100+'%)';
      //this.getWidgetElement().querySelector('.label').style.backgroundColor = 'rgb('+rgb.r*100+'% '+rgb.g*100+'% '+rgb.b*100+'%)';
      //cv.util.Color.xy2sRGB
      this.getWidgetElement().querySelector('.label').style.backgroundColor = 'rgb('+[Math.round(c.r*255),Math.round(c.g*255),Math.round(c.b*255)].join(',')+')';
    },

    __invalidateScreensize: function () {
      this.__actors = undefined; // invalidate cached values
      this.__animator.setTo(this.__color, true /* tmp */);
    },

    handleEvent: function (event) {
      let relCoordX = 0;
      let relCoordY = 0;

      switch(event.type) {
        case 'pointerdown':
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          let actorType = event.currentTarget.className.replace(/.*cc_([^ ]*).*/,'$1');
          let boundingRect = event.currentTarget.getBoundingClientRect();
          let computedStyle = window.getComputedStyle(event.currentTarget);
          this.__coordMinX = boundingRect.left + parseFloat(computedStyle.paddingLeft);
          this.__coordMinY = boundingRect.top;// + parseFloat(computedStyle.paddingTop);
          relCoordX = (event.clientX - this.__coordMinX)/this.__actors[actorType].width;
          relCoordY = (event.clientY - this.__coordMinY)/this.__actors[actorType].height;
          if( actorType === 'wheel' ) {
            let radius = this.__actors.wheel !== undefined ? (0.5 * this.__actors.wheel.innerRadius / this.__actors.wheel.outerRadius) : 1;
            let sv=cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX,relCoordY,this.__color.getComponent('hsv').h,radius);
            if( 0<=sv[0] && sv[0]<=1 && 0<=sv[1] && sv[1]<=1 ) {
              this.__mode = 'wheel_sv';
              this.__color.changeComponent('sv', sv);
              this.__inDrag = true;
            } else {
              let distSqrd = (relCoordX-0.5)**2 + (relCoordY-0.5)**2;
              //console.log(distSqrd,relCoordX,relCoordY,radius**2);
              if( radius**2 < distSqrd && distSqrd < 0.5**2 ) {
                this.__mode = 'wheel_h';
                this.__color.changeComponent('h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2/Math.PI );
                this.__inDrag = true;
              }
            }
          } else if( actorType === 'box' ) {
            let boxSize = this.__actors.box !== undefined ? (0.5 * this.__actors.box.innerRadius / this.__actors.box.outerRadius) : 1;
            let x = relCoordX-0.5, y = relCoordY-0.5;
            let sv =  [-x/boxSize/2+0.5, -y/boxSize/2+0.5];
            if( (Math.abs(x) < boxSize) && (Math.abs(y) < boxSize) ) {
              this.__mode = 'box_sv';
              this.__color.changeComponent('sv', sv);
              this.__inDrag = true;
            } else {
              this.__mode = 'wheel_h';
              this.__color.changeComponent('h', 0.5 + Math.atan2(-x, y) / 2/Math.PI );
              this.__inDrag = true;
            }
          } else {
            let ratio = relCoordX;
            if( 'T' === actorType ) {
              ratio = this.__Tmin + ratio * (this.__Tmax - this.__Tmin);
            }
            if( 'LCh-L' === actorType ) {
              ratio *= 100;
            }
            if( 'LCh-C' === actorType ) {
              ratio *= 150;
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
          relCoordX = (event.clientX - this.__coordMinX)/this.__actors[type].width;
          relCoordY = (event.clientY - this.__coordMinY)/this.__actors[type].height;
          break;

        case 'pointerup':
          this.__inDrag = false;
          document.removeEventListener('pointermove', this);
          document.removeEventListener('pointerup', this);
          //console.log('pointermove -> removeEventListener', this);
          type = this.__mode.split('_')[0]; // clamp "wheel_*" to "wheel"
          relCoordX = (event.clientX - this.__coordMinX)/this.__actors[type].width;
          relCoordY = (event.clientY - this.__coordMinY)/this.__actors[type].height;
          break;
      }

      if(event.type !== 'pointerdown') {
        switch (this.__mode) {
          case 'wheel_sv':
            let radius = this.__actors.wheel !== undefined ? (0.5 * this.__actors.wheel.innerRadius / this.__actors.wheel.outerRadius) : 1;
            let sv = cv.ui.structure.pure.ColorChooser.coord2sv(relCoordX, relCoordY, this.__color.getComponent('hsv').h, radius);
            this.__color.changeComponent('sv', [Math.min(Math.max(sv[0], 0), 1), Math.min(Math.max(sv[1], 0), 1)]);
            break;
          case 'box_sv':
            let boxSize = this.__actors.box !== undefined ? (0.5 * this.__actors.box.innerRadius / this.__actors.box.outerRadius) : 1;
            let x = relCoordX-0.5, y = relCoordY-0.5;
            sv =  [-x/boxSize/2+0.5, -y/boxSize/2+0.5];
            this.__color.changeComponent('sv', [Math.min(Math.max(sv[0], 0), 1), Math.min(Math.max(sv[1], 0), 1)]);
            break;
          case 'wheel_h':
            this.__color.changeComponent('h', 0.5 + Math.atan2(-relCoordX + 0.5, relCoordY - 0.5) / 2 / Math.PI);
            break;
          case 'T':
            this.__color.changeComponent('T', this.__Tmin + Math.max(0, Math.min(relCoordX, 1)) * (this.__Tmax - this.__Tmin) );
            break;
          case 'LCh-L':
            this.__color.changeComponent('LCh-L', Math.max(0, Math.min(relCoordX, 1)) * 100 );
            break;
          case 'LCh-C':
            this.__color.changeComponent('LCh-C', Math.max(0, Math.min(relCoordX, 1)) * 150 );
            break;
          default:
            //console.log('changeComponent',this.__mode, relCoordX, this.__actors[this.__mode].button);
            this.__actors[this.__mode].button.textContent = relCoordX;
            this.__color.changeComponent(this.__mode, relCoordX);
        }
      }
      //console.log('setTo', event.type);
      this.__animator.setTo(this.__color, true);
      if (!this.getSendOnFinish() || event.type === 'pointerup') {
        this.__throttled.call();
      }
    },

    __onChangeValue: function() {
      this.__components.forEach((type) => {
        let
          value = this.__color.getComponent(type),
          base;

        switch (type) {
          case 'h':
          case 's':
          case 'v':
            value *= 100;
            break;

          case 'hsv':
            value = new Map([['h', value.h*100], ['s', value.s*100], ['v', value.v*100]] );
            break;

          case 'RGB-r':
          case 'RGB-g':
          case 'RGB-b':
            base = this.getBaseColors()[type];
            value = cv.util.Color.curve( value, base.curve, base.scale );
            break;

          case 'rgb':
            base = this.getBaseColors();
            value = new Map([
              ['r', cv.util.Color.curve(value.r, base.r.curve, base.r.scale )],
              ['g', cv.util.Color.curve(value.g, base.g.curve, base.g.scale )],
              ['b', cv.util.Color.curve(value.b, base.b.curve, base.b.scale )]
            ]);
            break;
        }
        //let tmp__lastBusValue =  this.__lastBusValue[type];
        this.__lastBusValue[type] = this.sendToBackend(value, (t) => t.variantInfo===type, this.__lastBusValue[type] );
        //console.log('send', type, tmp__lastBusValue, '->',  this.__lastBusValue[type]);
      });
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("colorchooser", statics);
  }
});
