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
 
define( ['structure_custom', 'css!plugins/controllerinput/controllerinput' ], function( VisuDesign_Custom ) {
  "use strict";
  
  function updateSetpoint2( handler, handlerVal, format, value, percentage, roundbarOW, roundbarOH, roundbarIH, handlerOW, handlerOH )
  {
    var
      handlerTranslate = 'translate(' + roundbarOW/2 + 'px, ' + roundbarOH + 'px) '
        + 'rotate(' + (percentage*180-90) + 'deg) '
        + 'translate( -' + handlerOW/2 + 'px, -' + (handlerOH/2+roundbarOH-0.5*(roundbarOH-roundbarIH)) + 'px)';
    
    handler.css( 'transform', handlerTranslate );
    handlerVal.css( 'transform', 'rotate(' + (90-percentage*180) + 'deg)' );
    handlerVal.text( format ? sprintf( format, value ) : value );
  };
  function updateSetpoint( id, format, value, percentage )
  {
    var
      roundbar   = $('#' + id + ' .roundbar'),
      roundbarOH = roundbar.outerHeight(),
      roundbarIH = roundbar.innerHeight(),
      roundbarOW = roundbar.outerWidth(),
      handler    = $('#' + id + ' .handler'),
      handlerOH  = handler.outerHeight(true), // including margin to be able to move handler inside or outside
      handlerOW  = handler.outerWidth(),
      handlerVal = $('#' + id + ' .handlervalue');
    
    updateSetpoint2( handler, handlerVal, format, value, percentage, roundbarOW, roundbarOH, roundbarIH, handlerOW, handlerOH );
  }
  
  function getRRDData( data ) 
  {
    for( var variant in data.rrd )
    {
      var
        rrd = data.rrd[ variant ];
        
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
      });
    }
  };
  
VisuDesign_Custom.prototype.addCreator("controllerinput", {
  create: function( element, path, flavour, type ) {
    var 
      $e = $(element),
      id = "roundSlider_" + path,
      defaults = templateEngine.defaults.plugin.controllerinput || {};
    
    // create the main structure
      //( widgetType, $element, path, flavour, type, updateFn, makeAddressListFn )
    var ret_val = templateEngine.design.createDefaultWidget( 'controllerinput', $e, path, flavour, type, this.update, function( src, transform, mode, variant ) {
        return [ true, variant ];
      });
    var datatype_min = undefined;
    var datatype_max = undefined;
    $e.find('address').each( function(){ 
      var transform = this.getAttribute('transform');
      if( Transform[ transform ] && Transform[ transform ].range )
      {
        if( !( datatype_min > Transform[ transform ].range.min ) ) 
          datatype_min = Transform[ transform ].range.min;
        if( !( datatype_max < Transform[ transform ].range.max ) ) 
          datatype_max = Transform[ transform ].range.max;
      }
    });
    var min  = parseFloat( $e.attr('min')  || datatype_min || 0   );
    var max  = parseFloat( $e.attr('max')  || datatype_max || 100 );
    var step = parseFloat( $e.attr('step') || 0.5 );
    var send_on_finish = $e.attr('send_on_finish') || 'false';
    var data = templateEngine.widgetDataInsert( path, {
      //???///'events':   $(actor).data( 'events' ),
      'min'            : min,
      'max'            : max,
      'step'           : step,
      'send_on_finish' : send_on_finish,
      'valueInternal'  : true,
      'inAction'       : false,
      'colorActual'    : $e.attr('colorActual'  ) || defaults.colorActual   || '#0000f0',
      'colorSetpoint'  : $e.attr('colorSetpoint') || defaults.colorSetpoint || '#f0f000',
      'colorControl'   : $e.attr('colorControl' ) || defaults.colorControl  || '#f00000',
      'rrd'            : {},
      'inAction'       : false
    });

    $e.find('rrd').each( function(){
      var variant = this.getAttribute('variant');
      if( variant )
        data.rrd[ variant ] = {
          src: this.textContent,
          cFunc: 'AVERAGE',
          start: 'end-1day',
          end: 'now',
          resol: 300
        }
    });
    //console.log( data.rrd);
    
    // create the actor
    var actor = '<div class="actor notransition"><div class="roundbarbox"><div class="roundbarbackground border"></div><div class="roundbarbackground color"></div><div class="roundbarclip"><div class="roundbar"></div></div></div><div class="handler shadow" style="transform:translate(-999cm,0)"></div><div class="handler" style="transform:translate(-999cm,0)"><div class="handlervalue"></div></div><div class="value">-</div><div class="smallvalue left">'+min+'</div><div class="smallvalue right">'+max+'</div><div class="sparkline"></div></div>';
    ret_val += actor;
    
    templateEngine.bindActionForLoadingFinished(function() {
      updateSetpoint( path, '-', 0, 0 );
      /*
      var 
        handler = $('#' + path + ' .handler' ),
        mouseDown = false,
        dx, dy;
    
      console.log( handler );
      handler.mousedown( function(e){
        console.log(e);
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
                   
                   
        console.log( dx,dy,p,q,a1,b1,a2,b2);
        e.preventDefault();
      }).mouseup(function(){
          mouseDown = false;
      });
      */
      function createSparkline(){
        /*
var dataActual   = [ [0, 21], [1, 12], [2, 32], [3, 32], [4, 22], [5, 23], [6, 24], [7, 22], [8, 28], [9, 23], [10, 25], [11, 25], [12, 24] ];
var dataControl  = [ [0, 22], [1, 24], [2, 23], [3, 23], [4, 21], [5, 22], [6, 23], [7, 23], [8, 23], [9, 22], [10, 23], [11, 25], [12, 25] ];
var dataSetpoint = [ [0, 24], [1, 23], [2, 22], [3, 21], [4, 20], [5, 22], [6, 24], [7, 24], [8, 20], [9, 22], [10, 25], [11, 22], [12, 22] ];
*/
var
  dataActual   = [ [0,0] ],
  dataControl  = [ [0,0] ],
  dataSetpoint = [ [0,0] ];
//debugger;
//console.log( path );
var 
  dataLastX = dataActual[dataActual.length - 1][0],
  $element = $('#' + path),
  XcolorActual = $element.find('.roundbar').css('border-top-color'),
  XcolorSet    = $element.find('.roundbar').css('border-top-color');
  
  var options = {
    xaxis: {
      // extend graph to fit the last point
      //max: dataLastX 
    },
    yaxes: [
      { min: min, max: max },
      { min: 0, max: 100 }
    ],
    grid: {
      show: false,
      margin: 2*(defaults.sparklineSpotradius || 1) // make space for the round dots
    }
  };
  //console.log( options );

  // main series
  var series = [{
    //data: dataActual,
    data: [[0,0]],
    color: data.colorActual,
    lines: {
      fill: true,
      zero: false,
      lineWidth: defaults.sparklineWidth || 1//0.8
    },
    shadowSize: 0
  },
  {
    //data: dataControl,
    data: [[0,0]],
    color: data.colorControl,
    lines: {
      lineWidth: defaults.sparklineWidth || 1//0.8
    },
    shadowSize: 0,
    yaxis: 2
  },
  {
    //data: dataSetpoint,
    data: [[0,0]],
    color: data.colorSetpoint,
    lines: {
      lineWidth: defaults.sparklineWidth || 1//0.8
    },
    shadowSize: 0
  },
  // show the last points extra
  {
    //data: [ [dataLastX, dataActual[dataActual.length - 1][1]] ],
    data: [[0,0]],
    points: {
     show: true,
     radius: defaults.sparklineSpotradius || 1,
     fillColor: data.colorActual
    },
    color: data.colorActual
  },
  {
    //data: [ [dataLastX, dataControl[dataControl.length - 1][1]] ],
    data: [[0,0]],
    points: {
     show: true,
     radius: defaults.sparklineSpotradius || 1,
     fillColor: data.colorControl
    },
    color: data.colorControl,
    yaxis: 2
  },
  {
    //data: [ [dataLastX, dataSetpoint[dataSetpoint.length - 1][1]] ],
    data: [[0,0]],
    points: {
     show: true,
     radius: defaults.sparklineSpotradius || 1,
     fillColor: data.colorSetpoint
    },
    color: data.colorSetpoint
  }
  ];

  // draw the sparkline
 // data.plot = $.plot('.sparkline', series, options);
  data.plot = $element.find('.sparkline').plot( series, options).data('plot');
  //console.log(data.plot);
      }
      //setTimeout( createSparkline, 3000 );
      createSparkline();
      getRRDData( data );
    });
    return ret_val + '</div>';
  },
  update:   function( ga, d ) { 
    var 
      element    = $(this),
      id         = element.parent().attr('id'),
      data       = templateEngine.widgetDataGetByElement( this ),
      value      = templateEngine.transformDecode( data.address[ ga ][0], d ),
      plotData   = data.plot.getData();
      
    //templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
    //console.log( data.address[ ga ][2] );
    
    var
      showValue = Math.min( Math.max( data.min, value ), data.max ),
      percentage = (showValue - data.min)/(data.max - data.min);
    
    (data.address[ ga ][2]==='setpoint') && console.log( data.address[ ga ][2], value, data.inAction );
    switch( data.address[ ga ][2] )
    {
      case 'actual':
        $('#' + id + ' .roundbar').css({'transform':'rotate('+(180+180*percentage)+'deg)'});
        templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
        plotData[0].data[ plotData[0].data.length-1 ][1] = value;
        plotData[3].data[ 0                         ][1] = value;
        break;
        
      case 'control':
        plotData[1].data[ plotData[1].data.length-1 ][1] = value;
        plotData[4].data[ 0                         ][1] = value;
        break;
        
      case 'setpoint':
        if( !data.inAction )
          updateSetpoint( data.path, data.format, value, percentage );
        plotData[2].data[ plotData[2].data.length-1 ][1] = value;
        plotData[5].data[ 0                         ][1] = value;
        break;
    }
    data.plot.setData( plotData );
    data.plot.setupGrid();
    data.plot.draw();
  },
  downaction: function( path, actor, isCanceled, event ) {
    var
      $actor = $(this).find('.actor'), //$(actor),
      data = templateEngine.widgetDataGetByElement( $actor ),
      actorOffset = $actor.offset(),
      actorWidth = $actor.width(),
      actorHeight = $actor.height(),
      //roundbar   = $actor.find( '.roundbar' ),
      //roundbarOH = roundbar.outerHeight(),
      //roundbarIH = roundbar.innerHeight(),
      //roundbarOW = roundbar.outerWidth(),
      //handler    = $actor.find( '.handler' ),
      //handlerOH  = handler.outerHeight(true), // including margin to be able to move handler inside or outside
      //handlerOW  = handler.outerWidth(),
      //handlerVal = $actor.find( '.handlervalue' ),
      moveaction = function( e ) {
        if( e !== undefined )
        {
          var
            cX = e.touches ? e.touches[0].clientX : e.clientX,
            cY = e.touches ? e.touches[0].clientY : e.clientY,
            dx = cX - actorOffset.left - actorWidth/2,
            dy = -cY + (actorOffset.top + actorHeight),
            percentageRaw = Math.atan2(dx,dy)/Math.PI+0.5,
            percentage = Math.min( Math.max( percentageRaw, 0 ), 1 ),
            value = data.min + percentage * (data.max - data.min);
          updateSetpoint( data.path, data.format, value, percentage );
          
          // limit send rate to 250ms
          /*
          if( now - data.lastTransmission > 250 )
          {
            if( data.value == value ) return;
            
            for( var addr in data.address )
            {
              if( data.address[addr][2] !== 'setpoint' || !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
              var dv  = templateEngine.transformEncode( data.address[addr][0], value );
              if( dv != templateEngine.transformEncode( data.address[addr][0], data.value ) )
                templateEngine.visu.write( addr, dv );
            }
            console.log( 'send', value, data.value, dv );
            data.value = value;
            data.lastTransmission = now;
          }*/
          data.value = value;
        }
      };
        
    //$(window).mousemove( moveaction ).mouseup( function(){
    //  $(window).unbind( 'mousemove', moveaction ); 
    //});
    
    //data.lastTransmission = -1;
    data.inAction = true;
    data.lastValue = undefined;
    $actor.addClass('notransition');
    moveaction( event );
    
    data.inAction      = true;
    //data.valueInternal = true;
    data.updateFn      = setInterval( function(){
      if( data.lastValue === data.value )
        return;
      data.lastValue = data.value;
      
      console.log('updatafn');
      for( var addr in data.address )
      {
        if( data.address[addr][2] !== 'setpoint' || !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        var dv  = templateEngine.transformEncode( data.address[addr][0], data.value );
        templateEngine.visu.write( addr, dv );
      }
    }, 250 ); // update KNX every 250 ms
    
    return { callback: moveaction, restrict: false };
  },
  action: function( path, actor, isCanceled ) {
    var
      $actor = $(this).find('.actor'), //$(actor),
      data = templateEngine.widgetDataGetByElement( $actor ),
      dummy;
    console.log( 'ci action', isCanceled, data.inAction );
    clearInterval( data.updateFn );
    data.inAction = false;
    $actor.removeClass('notransition');
            for( var addr in data.address )
            {
              if( data.address[addr][2] !== 'setpoint' || !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
              var dv  = templateEngine.transformEncode( data.address[addr][0], data.value );
              templateEngine.visu.write( addr, dv );
            }
  },
  createX: function(element, path, flavour, type) {
  }
});

});