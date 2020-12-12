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
  extend: cv.plugins.diagram.AbstractDiagram, // cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update], //, cv.ui.common.Operate],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    //DEFAULTS: {},

    parse: function (xml, path, flavour, pageType, mappings) {
      //var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      var data = cv.plugins.diagram.AbstractDiagram.parse(xml, path, flavour, pageType, mappings);
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);

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

      console.log('CI parse', data);
      return data;
    },

    makeAddressListFn: function( src, transform, mode, variant ) {
      return [ true, variant ];
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
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this._init = true;
    this.base(arguments, props);
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
      console.log('CI onDomReady', this.$$domReady);
      this.setLegendInline(false);
      this.setShowGrid(false);

      if (!this.$$domReady) {
        var pageId = this.getParentPage().getPath();
        var broker = qx.event.message.Bus;
        console.log(pageId, broker, this.getContent());
        let content = this.getContent();
        for( let i = 0; i < content.ts.length; i++ )
        {
          if( content.ts[i].color === null ) {
            switch( content.ts[i].variant ) {
              case 'actual':
                content.ts[i].color = this.getColorActual();
                break;

              case 'setpoint':
                content.ts[i].color = this.getColorSetpoint();
                break;

              case 'control':
                content.ts[i].color = this.getColorControl();
                break;
            }
          }
        }
        this.setContent( content );

        // let the refresh only be active when this widget is visible
        this.setRestartOnVisible(true);

        broker.subscribe("path." + pageId + ".beforePageChange", function () {
          if (!this._init) {
            console.log('CI beforePageChange - loadDiagramData');
            this.loadDiagramData(this.plot, false, false);
          }
        }, this);

        broker.subscribe("page." + pageId + ".appear", function () {
          // create diagram when it's not already existing
          if (this._init) {
            console.log('CI appear - initDiagram');
            this.initDiagram(false);
          }
        }, this);

        this.initListeners();
        this.fireEvent("domReady");
        this.$$domReady = true;
        this.updateSetpoint(this.getPath(), '-', 0);
        qx.bom.element.Class.remove(this.getActor(), 'notransition');
      }
    },

    _getInnerDomString: function () {
      return '<div class="actor notransition"><div class="roundbarbox"><div class="roundbarbackground border"></div><div class="roundbarbackground color"></div><div class="roundbarclip"><div class="roundbar"></div></div></div><div class="handler shadow" style="transform:translate(-999cm,0)"></div><div class="handler" style="transform:translate(-999cm,0)"><div class="handlervalue"></div></div><div class="value">-</div><div class="smallvalue left">' + this.getMin() + '</div><div class="smallvalue right">' + this.getMax() + '</div><div class="sparkline diagram"></div></div>';
    },

    updateSetpoint: function ( id, value, percentage ) {
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
      handlerVal.text(value);
    },

    _update: function (ga, d) {
      console.log('_update', ga, d);
      let
        value = this.defaultValueHandling(ga, d),
        plotData = this.plot.getData(),
        showValue = Math.min(Math.max(this.getMin(), this.getBasicValue()), this.getMax()),
        percentage = (showValue - this.getMin()) / (this.getMax() - this.getMin());

      //templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
      //this.debug( data.address[ ga ][2] );

      console.log(value, plotData, showValue, percentage, this.getAddress()[ga]);
      //return; // FIXME
      switch (this.getAddress()[ga][2]) {
        case 'actual':
          qx.bom.element.Transform.transform(qx.bom.Selector.query('.roundbar', this.getDomElement())[0], {
            rotate: (180 + 180 * percentage) + 'deg'
          });
          this.defaultUpdate(ga, d, this.getDomElement(), true, this.getPath());
          if(plotData[0])
            plotData[0].data[plotData[0].data.length - 1][1] = this.getBasicValue();
          //plotData[3].data[0][1] = value;
          break;

        case 'control':
          if(plotData[1])
            plotData[1].data[plotData[0].data.length - 1][1] = this.getBasicValue();
          //plotData[1].data[plotData[1].data.length - 1][1] = value;
          //plotData[4].data[0][1] = value;
          break;

        case 'setpoint':
          this.debug('setpoint', value, this._inAction);
          if (!this._inAction) {
            this.updateSetpoint(this.getPath(), value, percentage);
          }
          if(plotData[2])
            plotData[2].data[plotData[0].data.length - 1][1] = this.getBasicValue();
          //plotData[2].data[plotData[2].data.length - 1][1] = value;
          //plotData[5].data[0][1] = value;
          break;
      }
      //return; // FIXME
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
        this.updateSetpoint(this.getPath(), value, percentage);

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