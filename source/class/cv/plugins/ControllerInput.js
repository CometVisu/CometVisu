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
  include: [cv.ui.common.Update, cv.ui.common.Operate],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    DEFAULTS: {},

    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path);

      // get min/max from transform if not set by xml
      if (!data.hasOwnProperty('min') || data.hasOwnProperty('max')) {
        var datatype_min, datatype_max;
        for (var ga in data.address) {
          var addr = data.address[ga];
          var transform = addr[0];
          if( cv.Transform.registry[ transform ] && cv.Transform.registry[ transform ].range )
          {
            if (datatype_min > cv.Transform.registry[ transform ].range.min) {
              datatype_min = cv.Transform.registry[transform].range.min;
            }
            if (datatype_max < cv.Transform.registry[ transform ].range.max) {
              datatype_max = cv.Transform.registry[transform].range.max;
            }
          }
        }

        if (data.hasOwnProperty('min')) {
          data.min = datatype_min !== undefined ? datatype_min : 0;
        }
        if (data.hasOwnProperty('max')) {
          data.max = datatype_max !== undefined ? datatype_max : 100;
        }
      }

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
        'rrd'            : {}
      };
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
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

    _onDomReady: function () {
      if (!this.$$domReady) {
        this.initListeners();
        this.fireEvent("domReady");
        this.$$domReady = true;
        this.updateSetpoint(this.getPath(), '-', 0, 0);
        qx.bom.element.Class.remove(this.getActor(), 'notransition');

        /*
        var
          handler = $('#' + path + ' .handler' ),
          mouseDown = false,
          dx, dy;

        this.debug( handler );
        handler.mousedown( function(e){
          this.debug(e);
          if(e.which == 1){
            mouseDown = true;
            dx = e.clientX - this.offsetLeft;
            dy = e.clientY - this.offsetTop;
          }
        });
        $(window).on("mousemove", function(e){
          if(!mouseDown) return false;

                  var p = e.clientX - dx, q = e.clientY - dy,
              a1 = ele1.offsetLeft, b1 = ele2.offsetTop,
              a2 = ele1.offsetLeft, b2 = ele2.offsetTop;


          this.debug( dx,dy,p,q,a1,b1,a2,b2);
          e.preventDefault();
        }).mouseup(function(){
            mouseDown = false;
        });
        */


        //setTimeout( createSparkline, 3000 );
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

        //templateEngine.lookupRRDcache( rrd, start, end, res, refresh, force, callback );
      }
    },

    __init: function() {
      this.createSparkline();
      this.getRRDData();
    },

    _getInnerDomString: function () {
      return '<div class="actor notransition"><div class="roundbarbox"><div class="roundbarbackground border"></div><div class="roundbarbackground color"></div><div class="roundbarclip"><div class="roundbar"></div></div></div><div class="handler shadow" style="transform:translate(-999cm,0)"></div><div class="handler" style="transform:translate(-999cm,0)"><div class="handlervalue"></div></div><div class="value">-</div><div class="smallvalue left">' + this.getMin() + '</div><div class="smallvalue right">' + this.getMax() + '</div><div class="sparkline"></div></div>';
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
      // data.plot = $.plot('.sparkline', series, options);
      return; // FIXME
      this.plot = $(qx.bom.Selector.query('.sparkline', element)).plot(series, options).data('plot');
      //this.debug(data.plot);
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

    updateSetpoint: function ( id, format, value, percentage ) {
      var
        roundbar = $('#' + id + ' .roundbar'),
        roundbarStyle = roundbar.attr('style'),
        isHidden = roundbar.outerHeight() === 0 ? (roundbar.css({
          'position': 'absolute',
          'visibility': 'hidden',
          'display': 'block'
        }), true) : false,
        roundbarOH = roundbar.outerHeight(),
        roundbarIH = roundbar.innerHeight(),
        roundbarOW = roundbar.outerWidth(),
        handler = $('#' + id + ' .handler'),
        handlerStyle = handler.attr('style'),
        handlerDummy = isHidden ? handler.css({
          'position': 'absolute',
          'visibility': 'hidden',
          'display': 'block'
        }) : undefined,
        handlerOH = handler.outerHeight(true), // including margin to be able to move handler inside or outside
        handlerOW = handler.outerWidth(),
        handlerVal = $('#' + id + ' .handlervalue'),
        handlerTranslate = 'translate(' + roundbarOW / 2 + 'px, ' + roundbarOH + 'px) ' +
          'rotate(' + (percentage * 180 - 90) + 'deg) ' +
          'translate( -' + handlerOW / 2 + 'px, -' + (handlerOH / 2 + roundbarOH - 0.5 * (roundbarOH - roundbarIH)) + 'px)';

      if (isHidden) {
        roundbar.attr('style', roundbarStyle);
        handler.attr('style', handlerStyle);
      }

      this.debug('uSP', $('#' + id + ' .actor')[0].className, isHidden);
      handler.css('transform', handlerTranslate);
      handlerVal.css('transform', 'rotate(' + (90 - percentage * 180) + 'deg)');
      handlerVal.text(format ? sprintf(format, value) : value);
    },

    getRRDData: function(  ) {
      return; // FIXME
      //templateEngine.lookupRRDcache( rrd, start, end, res, refresh, force, callback );
      var rrds = this.getRrd();
      for( var variant in rrds )
      {
        var
          rrd = rrds[ variant ];

        cv.plugins.diagram.AbstractDiagram.lookupRRDcache( rrd, rrd.start, rrd.end, rrd.resol, undefined, false, function( rrdContent, thisVariant ) {
          if( !rrdContent ) {
            return;
          }
    
          var plotData = this.plot.getData();
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
          this.plot.setData( plotData );
          this.plot.setupGrid();
          this.plot.draw();
    
        }, variant );
        /*
        $.ajax({
          url: templateEngine.visu.urlPrefix+"rrdfetch?rrd=" + rrd.src + ".rrd&ds=" + rrd.cFunc + "&start=" + rrd.start + "&end=" + rrd.end + "&res=" + rrd.resol,
          dataType: "json",
          type: "GET",
          context: this,
          variant: variant,
          success: function( rrdContent,aaa ) { 
            if( !rrdContent )
              return;
            
            var plotData = data.plot.getData();
            rrdContent.forEach(function(a){a[1]=+a[1][0];});
            switch( this.variant )
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
            data.plot.setData( plotData );
            data.plot.setupGrid();
            data.plot.draw();
          }
        });*/
      }
    },

    _update: function (ga, d) {
      return; // FIXME
      var
        value = this.defaultValueHandling(ga, d),
        plotData = this.plot.getData();

      //templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
      //this.debug( data.address[ ga ][2] );

      var
        showValue = Math.min(Math.max(this.getMin(), value), this.getMax()),
        percentage = (showValue - this.getMin()) / (this.getMax() - this.getMin());

      switch (this.getAddress()[ga][2]) {
        case 'actual':
          qx.bom.element.Transform.transform(qx.bom.Selector.query('.roundbar', this.getDomElement())[0], {
            rotate: (180 + 180 * percentage) + 'deg'
          });
          this.defaultUpdate(ga, d, this.getDomElement(), true, this.getPath());
          plotData[0].data[plotData[0].data.length - 1][1] = value;
          plotData[3].data[0][1] = value;
          break;

        case 'control':
          plotData[1].data[plotData[1].data.length - 1][1] = value;
          plotData[4].data[0][1] = value;
          break;

        case 'setpoint':
          this.debug('setpoint', value, this._inAction);
          if (!this._inAction) {
            this.updateSetpoint(this.getPath(), this.getFormat(), value, percentage);
          }
          plotData[2].data[plotData[2].data.length - 1][1] = value;
          plotData[5].data[0][1] = value;
          break;
      }
      this.plot.setData(plotData);
      this.plot.setupGrid();
      this.plot.draw();
    },
    
    _downaction: function (event) {
      this._inAction = true;
      this._lastValue = undefined;
      this.moveAction(event);
      qx.bom.element.Class.add(this.getActor(), 'notransition');

      this._inAction = true;
      //data.valueInternal = true;
      
      // update KNX every 250 ms
      this._sendTimer = new qx.event.Timer(250);
      this._sendTimer.addListener('inverval', function() {
        if (this._lastValue === this.getValue()) {
          return;
        }
        this._lastValue= this.getValue();
        this.debug('updatefn');
        this.sendToBackend(this.getValue(), function(addr) {
          return addr[2] === 'setpoint';
        });
      }, this);

      qx.event.Registration.addListener(this.getActor(), 'pointermove', this.moveAction, this);
    },

    moveAction: function (e) {
      if (e !== undefined) {
        var bounds = e.getTarget().getBoundingClientRect();
        var
          cX = e.touches ? e.touches[0].clientX : e.clientX,
          cY = e.touches ? e.touches[0].clientY : e.clientY,
          dx = cX - bounds.left - bounds.width / 2,
          dy = -cY + (bounds.top + bounds.height),
          percentageRaw = Math.atan2(dx, dy) / Math.PI + 0.5,
          percentage = Math.min(Math.max(percentageRaw, 0), 1),
          value = this.getMin() + percentage * (this.getMax() - this.getMin());
        this.updateSetpoint(this.getPath(), this.getFormat(), value, percentage);

        this.setValue(value);
      }
    },
    
    _action: function (ev) {
      this.debug('ci action', this._inAction);
      if (this._sendTimer) {
        this._sendTimer.stop();
        this._sendTimer = null;
      }
      this._inAction = false;
      qx.bom.element.Class.remove(this.getActor(), 'notransition');
      this.sendToBackend(this.getValue(), function(addr) {
        return addr[2] === 'setpoint';
      });
      qx.event.Registration.removeListener(this.getActor(), 'pointermove', this.moveAction, this);
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
    cv.parser.WidgetParser.addHandler("controllerinput", cv.plugins.ControllerInput);
    cv.ui.structure.WidgetFactory.registerClass("controllerinput", statics);
  }
});