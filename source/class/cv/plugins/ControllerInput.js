/* structure_custom.js (c) 24.01.2016 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */
 
/**
 * This plugins creates a widget that shows a current value, a changeable set
 * point and a short graph.
 *
 * attributes:
 * -
 */ 
 
/**
 *
 * @since 0.11.0
 * @author Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * @asset(plugins/controllerinput/controllerinput.css)
 */
qx.Class.define('cv.plugins.ControllerInput', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update, cv.ui.common.Operate, cv.ui.common.Refresh],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    DEFAULTS: {},

    makeAddressListFn: function( src, transform, mode, variant ) {
      return [ true, variant ];
    },
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
      cv.parser.WidgetParser.parseRefresh(xml, path);

      var datatype_min, datatype_max;
      qx.bom.Selector.matches("address", qx.dom.Hierarchy.getChildElements(xml)).forEach(function(elem) {
        var transform = elem.getAttribute('transform');
        if (cv.Transform.registry[transform] && cv.Transform.registry[transform].range) {
          if (!( datatype_min > cv.Transform.registry[transform].range.min )) {// jshint ignore:line
            datatype_min = cv.Transform.registry[transform].range.min;
          }
          if (!( datatype_max < cv.Transform.registry[transform].range.max )) {// jshint ignore:line
            datatype_max = cv.Transform.registry[transform].range.max;
          }
        }
      });
      data.min = parseFloat(xml.getAttribute('min') || datatype_min || 0);
      data.max = parseFloat(xml.getAttribute('max') || datatype_max || 100);

      data.rrd = {};
      qx.bom.Selector.query("rrd", xml).forEach(function(elem) {
        var variant = elem.getAttribute('variant');
        if( variant ) {
          data.rrd[variant] = {
            src: qx.dom.Node.getText(elem),
            cFunc: 'AVERAGE',
            start: 'end-1day',
            end: 'now',
            resol: 300,
            scaling: 1.0,
            dsIndex: 0
          };
        }
      });
      return data;
    },

    getAttributeToPropertyMappings: function() {
      return {
        min: { },
        max: { },
        step: { "default": 0.5 },
        'send_on_finish' : { target: "sendOnFinish", "default": false, transform: function(value) {return value === "true"; } },
        'valueInternal'  : {},
        'inAction'       : {},
        'colorActual'    : { "default": '#0000f0'},
        'colorSetpoint'  : { "default": '#f0f000'},
        'colorControl'   : { "default": '#f00000'},
        'rrd'            : {},
        refresh          : {}
      };
    },

    /**
     * Caclulate the SVG path string with an arc of radius "r" and thickness
     * "width" with rounded edges of radius "borderRadius".
     * (borderRadius is an array of the order:
     * top-left, top-right, bottom-right, bottom-left)
     * It will start "leftAngle" above the horizont and to to "rightAngle"
     * above the horizon.
     * 
     * The arc (circle) is centered around (120,120)
     * (0,0)            
     *               ***(120,r)***
     *             ******     ******
     *            ***             ***
     *     leftA ***               *** rightA
     *           /                   \
     * (0,120) (120-r,120)    (120+r,120)
     */
    createArcPath: function( r, width, borderRadius, leftAngle, rightAngle ) {
      var
        rI = r-width/2,
        rO = r+width/2,
        borderRadiusAtl = [borderRadius[0], borderRadius[0], 0, 0, 1]+',',
        borderRadiusAtr = [borderRadius[1], borderRadius[1], 0, 0, 1]+',',
        borderRadiusAbr = [borderRadius[2], borderRadius[2], 0, 0, 1]+',',
        borderRadiusAbl = [borderRadius[3], borderRadius[3], 0, 0, 1]+',',
        leftAngleS  = Math.sin(leftAngle),
        leftAngleC  = Math.cos(leftAngle),
        rightAngleS = Math.sin(rightAngle),
        rightAngleC = Math.cos(rightAngle),
        leftInnerInner  = [ 120- leftAngleC*(rI+borderRadius[3])+borderRadius[3]*(  leftAngleS+ leftAngleC), 120- leftAngleS*(rI+borderRadius[3])-borderRadius[3]*( -leftAngleS+ leftAngleC) ],
        leftLeftInner   = [ 120- leftAngleC*(rI+borderRadius[3])                                           , 120- leftAngleS*(rI+borderRadius[3]) ],
        leftLeftOuter   = [ 120- leftAngleC*(rO-borderRadius[0])                                           , 120- leftAngleS*(rO-borderRadius[0]) ],
        leftOuterOuter  = [ 120- leftAngleC*(rO-borderRadius[0])+borderRadius[0]*(  leftAngleS- leftAngleC), 120- leftAngleS*(rO-borderRadius[0])-borderRadius[0]*(  leftAngleS+ leftAngleC) ],
        rightOuterOuter = [ 120+rightAngleC*(rO-borderRadius[1])+borderRadius[1]*(-rightAngleS+rightAngleC), 120-rightAngleS*(rO-borderRadius[1])-borderRadius[1]*( rightAngleS+rightAngleC) ],
        rightRightOuter = [ 120+rightAngleC*(rO-borderRadius[1])                                           , 120-rightAngleS*(rO-borderRadius[1]) ],
        rightRightInner = [ 120+rightAngleC*(rI+borderRadius[2])                                           , 120-rightAngleS*(rI+borderRadius[2]) ],
        rightInnerInner = [ 120+rightAngleC*(rI+borderRadius[2])+borderRadius[2]*(-rightAngleS-rightAngleC), 120-rightAngleS*(rI+borderRadius[2])-borderRadius[2]*(-rightAngleS+rightAngleC) ];
        
      return 'M'+leftLeftOuter
        +'A'+borderRadiusAtl+leftOuterOuter
        +'A'+[rO, rO, 0, 0, 1, rightOuterOuter]
        +'A'+borderRadiusAtr+rightRightOuter
        +'L'+rightRightInner
        +'A'+borderRadiusAbr+rightInnerInner
        +'A'+[rI, rI, 0, 0, 0, leftInnerInner]
        +'A'+borderRadiusAbl+leftLeftInner
        +'L'+leftLeftOuter;
    },
    
    getDimensionsFromElement: function( element ){
      var
        CS = window.getComputedStyle( element ),
        em = CS.getPropertyValue('font-size').slice(0,-2),
        r = eval( CS.getPropertyValue('--r').replace(/(calc|px)/g,'').replace(/em/g,'*'+em) );
      // Note: the browsers are passing custom CSS property as they are, see:
      //   https://drafts.csswg.org/cssom/#the-cssstyledeclaration-interface
      // This also means that calc() isn't called and 'em' units aren't 
      // resolved, so we must do it manually.
      // As the CSS value comes from the design that the user can't modify
      // it's safe to call "eval()". Anyone able to attac this could change
      // any other parts of the CometVisu as well, so that's not a degradation.
      
      return {
        r: r,
        width: +CS.getPropertyValue('width').slice(0,-2),
        borderRadius: [
          +CS.getPropertyValue('border-top-left-radius').slice(0,-2),
          +CS.getPropertyValue('border-top-right-radius').slice(0,-2),
          +CS.getPropertyValue('border-bottom-right-radius').slice(0,-2),
          +CS.getPropertyValue('border-bottom-left-radius').slice(0,-2),
        ],
        leftM:  +CS.getPropertyValue('margin-left').slice(0,-2)/r,
        rightM: +CS.getPropertyValue('margin-right').slice(0,-2)/r,
        leftP:  +CS.getPropertyValue('padding-left').slice(0,-2)/r,
        rightP: +CS.getPropertyValue('padding-right').slice(0,-2)/r,
        fill: CS.getPropertyValue('--fill') ? CS.getPropertyValue('--fill').replace(/linear-gradient\((.*)\)/,'$1').split(',') : undefined
      }
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    rrd: {
      check: "Object",
      init: {}
    },
    min: {
      check: "Number",
      init: 0
    },
    max: {
      check: "Number",
      init: 100
    },
    step: {
      check: "Number",
      init: 0.5
    },
    sendOnFinish: {
      check: "Boolean",
      init: false
    },
    valueInternal: {
      check: "Boolean",
      init: true
    },
    colorActual: {
      check: "Color",
      init: '#0000f0'
    },
    colorSetpoint: {
      check: "Color",
      init: '#f0f000'
    },
    colorControl: {
      check: "Color",
      init: '#f00000'
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _lastValue: null,
    _inAction: false,

    _onDomReady: function() {
      if (!this.$$domReady) {
        var pageId = this.getParentPage().getPath();
        var broker = qx.event.message.Bus;
        
        // stop refreshing when page is left
        broker.subscribe("path." + pageId + ".exitingPageChange", function () {
          if(this._timer && this._timer.isEnabled()) {
            this._timer.stop();
          }
        }, this);

        broker.subscribe("path." + pageId + ".beforePageChange", function () {
          if (!this._init) {
            this.getRRDData();
          }
        }, this);

        broker.subscribe("path." + pageId + ".appear", function () {
          // create diagram when it's not already existing
          if (this._init) {
            this.createSparkline();
          }
          // start refreshing when page is entered
          if(this._timer && !this._timer.isEnabled()) {
            this._timer.start();
          }
        }, this);
        
        // create paths to show
        this.__background = qx.bom.Selector.query('.controllerinputBackground path', this.getDomElement())[0];
        this.__currentClip = qx.bom.Selector.query('.controllerinputCurrent #clip > path', this.getDomElement())[0];
        this.__current = qx.bom.Selector.query('.controllerinputCurrent .current', this.getDomElement())[0];
        this.__handle = qx.bom.Selector.query('.controllerinputHandle path', this.getDomElement())[0];
        this.__handleOuter = qx.bom.Selector.query('.controllerinputHandleValueOuter', this.getDomElement())[0];
        this.__handleInner = qx.bom.Selector.query('.controllerinputHandleValueInner', this.getDomElement())[0];
        this.__value = qx.bom.Selector.query('.actor > .value', this.getDomElement())[0];
        
        var
          backgroundDim = cv.plugins.ControllerInput.getDimensionsFromElement( this.__background ),
          backgroundD = cv.plugins.ControllerInput.createArcPath( backgroundDim.r, backgroundDim.width, backgroundDim.borderRadius, backgroundDim.leftM, backgroundDim.rightM ),
          currentClipDim = cv.plugins.ControllerInput.getDimensionsFromElement( this.__currentClip ),
          currentClipD = cv.plugins.ControllerInput.createArcPath( currentClipDim.r, currentClipDim.width, currentClipDim.borderRadius, currentClipDim.leftM, currentClipDim.rightM ),
          currentDim = cv.plugins.ControllerInput.getDimensionsFromElement( this.__current ),
          currentD = cv.plugins.ControllerInput.createArcPath( currentDim.r, currentDim.width, currentDim.borderRadius, currentDim.leftM, currentDim.rightM ),
          handleDim = cv.plugins.ControllerInput.getDimensionsFromElement( this.__handle ),
          handleD = cv.plugins.ControllerInput.createArcPath( handleDim.r, handleDim.width, handleDim.borderRadius, 0,  Math.PI-handleDim.leftP-handleDim.rightP );
        
        this.__background.setAttribute('d',backgroundD);
        if( undefined !== backgroundDim.fill )
        {
          this.__background.insertAdjacentHTML(
            'beforebegin',
            '<defs><linearGradient id="Gradient1"> <stop offset="0%" stop-opacity="0" stop-color="#FEBF01"></stop> <stop offset="100%" stop-opacity="1" stop-color="#FEBF01"></stop> </linearGradient></defs>'
          );
          this.__background.setAttribute('style','fill:url(#Gradient1)');
        }
        
        this.__currentClip.setAttribute('d',currentClipD);
        this.__current.setAttribute('d',currentD);
        this._currentSize = 180 - (currentDim.leftM+currentDim.rightM)*180/Math.PI;
        
        this.__handle.setAttribute('d',handleD);
        this._handleStartOffset       = handleDim.leftM*180/Math.PI;
        this._handleRange             = 180 - (handleDim.leftM+handleDim.leftP+handleDim.rightP+handleDim.rightM)*180/Math.PI;
        this._handleCenterStartOffset = (handleDim.leftM+handleDim.leftP)*180/Math.PI;
        this._handleCenterRange       = 180 - (handleDim.rightP+handleDim.rightM)*180/Math.PI - this._handleCenterStartOffset;
        qx.bom.element.Style.set(
          this.__handle,
          'transform', 'rotate('+this._handleStartOffset+'deg)'
        );

        // observe for style changes to ba able to update paths
        var checkHover = window.getComputedStyle( this.__handle ).getPropertyValue('--check-hover');
        if( 'true' === checkHover.trim() )
        {
          var
            handle = this.__handle,
            callbackHover = function()
            {
              handleDim = cv.plugins.ControllerInput.getDimensionsFromElement( handle );
              handleD = cv.plugins.ControllerInput.createArcPath( handleDim.r, handleDim.width, handleDim.borderRadius, 0,  Math.PI-handleDim.leftP-handleDim.rightP );
              handle.setAttribute('d',handleD);
            };
          this.__handle.addEventListener( 'mouseenter', callbackHover );
          this.__handle.addEventListener( 'mouseleave', callbackHover );
        }
              
        // initialize the diagram but don't make the initialization process wait for it
        // by using a deferred call
        if (this.isVisible()) {
          new qx.util.DeferredCall(function () {
            if (!this._init) {
              this.getRRDData();
            } else {
              this.createSparkline();
            }
          }, this).schedule();
        } else {
          this.__vlid1 = this.addListener("changeVisible", function(ev) {
            if (ev.getData()) {
              if (!this._init) {
                this.getRRDData();
              } else {
                this.createSparkline();
              }
              this.removeListenerById(this.__vlid1);
              this.__vlid1 = null;
            }
          }, this);
        }
        this.initListeners();
        this.fireEvent("domReady");
        this.$$domReady = true;
        this.updateSetpoint(this.getPath(), '-', 0, 0);
        qx.bom.element.Class.remove(this.getActor(), 'notransition');
        
        if (this.isVisible()) {
          new qx.util.DeferredCall(this.__init, this).schedule();
        } else {
          this.__vlid1 = this.addListener("changeVisible", function(ev) {
            if (ev.getData()) {
              this.__init();
              this.removeListenerById(this.__vlid1);
              this.__vlid1 = null;
            }
          }, this);
        }
        
        qx.event.Registration.addListener(this.getActor(), 'pointerdown', this._downaction, this);
      }
    },

    __init: function() {
      this.createSparkline();
      this.getRRDData();
    },

    _getInnerDomString: function () {
      return '<div class="actor notransition">'
        +   '<div class="controllerinputBar">'
        +   '<svg class="controllerinputBackground" viewBox="0 0 240 120"><path/></svg>'
        +   '<svg class="controllerinputCurrent" viewBox="0 0 240 120"><defs><clipPath id="clip"><path/></clipPath></defs><g clip-path="url(#clip)"><path class="current"/></g></svg>'
        +   '<svg class="controllerinputHandle" viewBox="0 0 240 120"><path/></svg>'
        +   '<div class="controllerinputHandleValueOuter"><div class="controllerinputHandleValueInner"></div></div>'
        + '</div>'
        + '<div class="value">-</div><div class="smallvalue left">' + this.getMin() + '</div><div class="smallvalue right">' + this.getMax() + '</div><div class="sparkline"></div></div>';
    },
    
    // overridden
    getValueElement: function() {
      if( 'setpoint' === this._updateElement )
        return this.__handleInner;
      return this.__value;
    },

    _setupRefreshAction: function() {
      if (this.getRefresh()) {
        if (!this._timer) {
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener("interval", function () {
            this.getRRDData();
          }, this);
        }
      }
    },
    
    createSparkline: function() {
      /*
      var dataActual   = [ [0, 21], [1, 12], [2, 32], [3, 32], [4, 22], [5, 23], [6, 24], [7, 22], [8, 28], [9, 23], [10, 25], [11, 25], [12, 24] ];
      var dataControl  = [ [0, 22], [1, 24], [2, 23], [3, 23], [4, 21], [5, 22], [6, 23], [7, 23], [8, 23], [9, 22], [10, 23], [11, 25], [12, 25] ];
      var dataSetpoint = [ [0, 24], [1, 23], [2, 22], [3, 21], [4, 20], [5, 22], [6, 24], [7, 24], [8, 20], [9, 22], [10, 25], [11, 22], [12, 22] ];
      */
      var
        dataActual = [[0, 0]],
        dataControl = [[0, 0]],
        dataSetpoint = [[0, 0]];
      //debugger;
      //this.debug( path );
      var
        dataLastX = dataActual[dataActual.length - 1][0],
        element = this.getDomElement(),
        XcolorActual = qx.bom.element.Style.get(element, 'border-top-color'),
        XcolorSet = qx.bom.element.Style.get(element, 'border-top-color');

      var options = {
        xaxis: {
          // extend graph to fit the last point
          //max: dataLastX
        },
        yaxes: [
          {min: this.getMin(), max: this.getMax()},
          {min: 0, max: 100}
        ],
        grid: {
          show: false,
          margin: 2 * (cv.plugins.ControllerInput.DEFAULTS.sparklineSpotradius || 1) // make space for the round dots
        }
      };
      //this.debug( options );

      // main series
      var series = [
        this.createDataLine(1, this.getColorActual()),
        this.createDataLine(2, this.getColorControl()),
        this.createDataLine(1, this.getColorSetpoint()),
        this.createDataPoint(1, this.getColorActual()),
        this.createDataPoint(2, this.getColorControl()),
        this.createDataPoint(1, this.getColorSetpoint())
      ];

      // draw the sparkline
      this.plot = $(qx.bom.Selector.query('.sparkline', element)).plot(series, options).data('plot');
    },

    createDataLine: function( axis, color ) {
      var defaults = cv.plugins.ControllerInput.DEFAULTS || {};
      return {
        data: [[0, 0]],
        yaxis: axis,
        color: color,
        lines: {
          lineWidth: defaults.sparklineWidth || 1
        },
        shadowSize: 0
      };
    },

    createDataPoint: function( axis, color ) {
      var defaults = cv.plugins.ControllerInput.DEFAULTS || {};
      return {
        data: [[0, 0]],
        yaxis: axis,
        points: {
          show: true,
          radius: defaults.sparklineSpotradius || 1,
          fillColor: color
        },
        color: color
      };
    },

    updateSetpoint: function ( id, format, value, ratio ) {
      this._lastValue = value;
      qx.bom.element.Style.set( this.__handle,
        'transform', 'rotate('+(this._handleStartOffset+this._handleRange*ratio)+'deg)'
      );
      qx.bom.element.Style.set( this.__handleOuter,
        'transform', 'rotate('+(this._handleStartOffset+this._handleRange*ratio)+'deg)'
      );
      qx.bom.element.Style.set( this.__handleInner,
        'transform', 'rotate('+(-this._handleStartOffset-this._handleRange*ratio)+'deg)'
      );
    },

    getRRDData: function(  ) {
      //templateEngine.lookupRRDcache( rrd, start, end, res, refresh, force, callback );
      var 
        rrds = this.getRrd(),
        plot = this.plot;
        
      for( var variant in rrds )
      {
        var
          rrd = rrds[ variant ];

        cv.plugins.diagram.AbstractDiagram.lookupRRDcache( rrd, rrd.start, rrd.end, rrd.resol, this.getRefresh(), false, function( rrdContent, thisVariant ) {
          if( !rrdContent ) {
            return;
          }
    
          if( undefined === plot ) 
          {
            console.warn('undefined === this.plot  => early exit!');
            return;
          }
          var plotData = plot.getData();
          //rrdContent.forEach(function(a){a[1]=+a[1][0];});
          switch( thisVariant )
          {
            case 'actual':
              plotData[0].data = rrdContent;
              plotData[3].data[0][0] = rrdContent[rrdContent.length-1][0];
              break;
            case 'control':
              plotData[1].data = rrdContent;
              plotData[4].data[0][0] = rrdContent[rrdContent.length-1][0];
              break;
            case 'setpoint':
              plotData[2].data = rrdContent;
              plotData[5].data[0][0] = rrdContent[rrdContent.length-1][0];
              break;
          }
          plot.setData( plotData );
          plot.setupGrid();
          plot.draw();
    
        }, variant );
      }
    },

    _update: function (ga, d) {
      var
        value = cv.Transform.decode( this.getAddress()[ ga ][0], d ),
        hasPlot = undefined !== this.plot,
        plotData = hasPlot && this.plot.getData(),
        showValue = Math.min(Math.max(this.getMin(), value), this.getMax()),
        ratio = (showValue - this.getMin()) / (this.getMax() - this.getMin());

      switch (this.getAddress()[ga][2]) {
        case 'actual':
          qx.bom.element.Style.set( this.__current, 'transform', 'rotate(-'+((1-ratio)*this._currentSize)+'deg)' );
          
          this._updateElement = 'actual';
          this.defaultUpdate(ga, d, this.getDomElement(), true, this.getPath());
          if( hasPlot )
          {
            plotData[0].data[plotData[0].data.length - 1][1] = value;
            plotData[3].data[0][1] = value;
          }
          break;

        case 'control':
          if( hasPlot )
          {
            plotData[1].data[plotData[1].data.length - 1][1] = value;
            plotData[4].data[0][1] = value;
          }
          break;

        case 'setpoint':
          this._updateElement = 'setpoint';
          this.defaultUpdate(ga, d, this.getDomElement(), true, this.getPath());
          if (!this._inAction) {
            this.updateSetpoint(this.getPath(), this.getFormat(), value, ratio);
          }
          if( hasPlot )
          {
            plotData[2].data[plotData[2].data.length - 1][1] = value;
            plotData[5].data[0][1] = value;
          }
          break;
      }
      if( hasPlot )
      {
        this.plot.setData(plotData);
        this.plot.setupGrid();
        this.plot.draw();
      }
    },
    
    _downaction: function (event) {
      if( !this._inAction )
      {
        qx.bom.element.Class.add(this.getActor(), 'action');
        this._inAction = true;
        this.moveAction(event);
        qx.bom.element.Class.add(this.getActor(), 'notransition');

        qx.event.Registration.addListener(this.getActor(), 'pointermove', this.moveAction, this);
        
        this._sendTimer = new qx.event.Timer(250);
        this._sendTimer.addListener('interval', this.sendSetpointToBackend, this );
        this._sendTimer.start();
      }
    },

    moveAction: function (e) {
      if (e !== undefined) {
        if( 0 === e._native.buttons )
        {
          // no button set anymore -> action was ended outside of widget
          // => end listening
          this._action(e);
          return;
        }
        var bounds = this.getActor().getBoundingClientRect();
        var
          cX = e._native.touches ? e._native.touches[0].clientX : e._native.clientX,
          cY = e._native.touches ? e._native.touches[0].clientY : e._native.clientY,
          dx = cX - bounds.left - bounds.width / 2,
          dy = -cY + (bounds.top + bounds.height),
          percentageRaw = (Math.atan2(dx, dy) / Math.PI + 0.5 - this._handleCenterStartOffset/180)*180/this._handleCenterRange,
          percentage = Math.min(Math.max(percentageRaw, 0), 1),
          value = this.getMin() + percentage * (this.getMax() - this.getMin());
        this.updateSetpoint(this.getPath(), this.getFormat(), value, percentage);
        this.setValue(value);
      }
    },
    
    _action: function (ev) {
      if( this._inAction )
      {
        if (this._sendTimer) {
          this._sendTimer.stop();
          this._sendTimer = null;
        }
        this._inAction = false;
        qx.bom.element.Class.remove(this.getActor(), 'notransition');
        this.sendSetpointToBackend();
        qx.bom.element.Class.remove(this.getActor(), 'action');
        qx.event.Registration.removeListener(this.getActor(), 'pointermove', this.moveAction, this);
      }
    },
    
    sendSetpointToBackend: function() {
      this._lastBusValue = this.sendToBackend( this._lastValue, function(addr) {
        return addr[2] === 'setpoint';
      }, this._lastBusValue );
    }
  },
  
  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this._disposeObjects('_sendTimer');
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/controllerinput/controllerinput.css');
    // register the parser
    cv.parser.WidgetParser.addHandler("controllerinput", statics);
    cv.ui.structure.WidgetFactory.registerClass("controllerinput", statics);
  }
});