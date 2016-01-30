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
  
  function updateSetpoint( handler, handlerVal, value, percentage, roundbarOW, roundbarOH, roundbarIH, handlerOW, handlerOH )
  {
    var
      handlerTranslate = 'translate(' + roundbarOW/2 + 'px, ' + roundbarOH + 'px) '
        + 'rotate(' + (percentage*180-90) + 'deg) '
        + 'translate( -' + handlerOW/2 + 'px, -' + (handlerOH/2+roundbarOH-0.5*(roundbarOH-roundbarIH)) + 'px)';
    
    handler.css( 'transform', handlerTranslate );
    handlerVal.css( 'transform', 'rotate(' + (90-percentage*180) + 'deg)' );
    handlerVal.text( value );
  };
  
VisuDesign_Custom.prototype.addCreator("controllerinput", {
  create: function( element, path, flavour, type ) {
    var 
      $e = $(element),
      id = "roundSlider_" + path,
      standard = templateEngine.default && templateEngine.default.plugin ? (templateEngine.default.plugin.controllerinput || {}) : {};
    
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
      'colorActual'    : $e.attr('colorActual'  ) || standard.colorActual   || '#0000f0',
      'colorSetpoint'  : $e.attr('colorSetpoint') || standard.colorSetpoint || '#f0f000',
      'colorControl'   : $e.attr('colorControl' ) || standard.colorControl  || '#f00000'
    });

    // create the actor
    var actor = '<div class="actor"><div class="roundbarbackground border"></div><div class="roundbarbackground color"></div><div class="roundbarclip"><div class="roundbar"></div></div><div class="handler"><div class="handlervalue"></div></div><div class="value">-</div><div class="smallvalue left">'+min+'XXX</div><div class="smallvalue right">'+max+'XXX</div><div class="sparkline"></div></div>';
    ret_val += actor;
    
    templateEngine.bindActionForLoadingFinished(function() {
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
var dataActual   = [ [0, 21], [1, 12], [2, 32], [3, 32], [4, 22], [5, 23], [6, 24], [7, 22], [8, 28], [9, 23], [10, 25], [11, 25], [12, 24] ];
var dataControl  = [ [0, 22], [1, 24], [2, 23], [3, 23], [4, 21], [5, 22], [6, 23], [7, 23], [8, 23], [9, 22], [10, 23], [11, 25], [12, 25] ];
var dataSetpoint = [ [0, 24], [1, 23], [2, 22], [3, 21], [4, 20], [5, 22], [6, 24], [7, 24], [8, 20], [9, 22], [10, 25], [11, 22], [12, 22] ];
//debugger;
console.log( path );
var 
  dataLastX = dataActual[dataActual.length - 1][0],
  $element = $('#' + path),
  XcolorActual = $element.find('.roundbar').css('border-top-color'),
  XcolorSet    = $element.find('.roundbar').css('border-top-color');
  
  var options = {
    xaxis: {
      // extend graph to fit the last point
      max: dataLastX 
    },
    yaxes: [
      { min: min, max: max },
      { min: 0, max: 100 }
    ],
    grid: {
      show: false,
      margin: 2 // make space for the round dots
    }
  };
  console.log( options );

  // main series
  var series = [{
    data: dataActual,
    color: data.colorActual,
    lines: {
      fill: true,
      zero: false,
      lineWidth: 1//0.8
    },
    shadowSize: 0
  },
  {
    data: dataControl,
    color: data.colorControl,
    lines: {
      lineWidth: 1//0.8
    },
    shadowSize: 0,
    yaxis: 2
  },
  {
    data: dataSetpoint,
    color: data.colorSetpoint,
    lines: {
      lineWidth: 1//0.8
    },
    shadowSize: 0
  },
  // show the last points extra
  {
    data: [ [dataLastX, dataActual[dataActual.length - 1][1]] ],
    points: {
     show: true,
     radius: 1,
     fillColor: data.colorActual
    },
    color: data.colorActual
  },
  {
    data: [ [dataLastX, dataControl[dataControl.length - 1][1]] ],
    points: {
     show: true,
     radius: 1,
     fillColor: data.colorControl
    },
    color: data.colorControl,
    yaxis: 2
  },
  {
    data: [ [dataLastX, dataSetpoint[dataSetpoint.length - 1][1]] ],
    points: {
     show: true,
     radius: 1,
     fillColor: data.colorSetpoint
    },
    color: data.colorSetpoint
  }
  ];

  // draw the sparkline
  data.plot = $.plot('.sparkline', series, options);
      }
      //setTimeout( createSparkline, 3000 );
      createSparkline();
    });
    return ret_val + '</div>';
  },
  update:   function( ga, d ) { 
    var 
      element    = $(this),
      data       = templateEngine.widgetDataGetByElement( this ),
      value      = templateEngine.transformDecode( data.address[ ga ][0], d ),
      roundbar   = $('#'+element.parent().attr('id') + ' .roundbar'),
      roundbarOH = roundbar.outerHeight(),
      roundbarIH = roundbar.innerHeight(),
      roundbarOW = roundbar.outerWidth(),
      handler    = $('#'+element.parent().attr('id') + ' .handler'),
      handlerOH  = handler.outerHeight(true), // including margin to be able to move handler inside or outside
      handlerOW  = handler.outerWidth(),
      handlerVal = $('#'+element.parent().attr('id') + ' .handlervalue'),
      plotData   = data.plot.getData();
      
    //templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
    console.log( data.address[ ga ][2] );
    
    var
      showValue = Math.min( Math.max( data.min, value ), data.max ),
      percentage = (showValue - data.min)/(data.max - data.min);
    
    switch( data.address[ ga ][2] )
    {
      case 'actual':
        var
          lastX =  50 * (1-Math.cos( Math.PI * percentage )*1.1), // *1.1 to be bigger than the unity circle
          lastY = 100 * (1-Math.sin( Math.PI * percentage )*1.1),
          clip = '50% 100%, -1% 100%, -1% -1%';
          
        if( percentage > 0.5 )
          clip += ', 100% -1%'; 
        else
          clip += ', -1% -1%'; // needed to keep point number stable for transition animation
          
        clip += ', ' + lastX + '% ' + lastY + '%';
        roundbar.css({'webkit-clip-path':'polygon('+clip+')'});
        roundbar.css({'webkit-clip-path':'none','transform':'rotate('+(180+180*percentage)+'deg)'});
        templateEngine.design.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
        plotData[0].data[ plotData[2].data.length-1 ][1] = value;
        plotData[3].data[ 0                         ][1] = value;
        break;
        
      case 'control':
        plotData[1].data[ plotData[2].data.length-1 ][1] = value;
        plotData[4].data[ 0                         ][1] = value;
        break;
        
      case 'setpoint':
        updateSetpoint( handler, handlerVal, value, percentage, roundbarOW, roundbarOH, roundbarIH, handlerOW, handlerOH );
        plotData[2].data[ plotData[2].data.length-1 ][1] = value;
        plotData[5].data[ 0                         ][1] = value;
        break;
    }
    data.plot.setData( plotData );
    data.plot.draw();
  },
  downaction: function( path, actor, isCanceled, event ) {
    var
      $actor = $(this).find('.actor'), //$(actor),
      data = templateEngine.widgetDataGetByElement( $actor ),
      actorOffset = $actor.offset(),
      actorWidth = $actor.width(),
      actorHeight = $actor.height(),
      roundbar   = $actor.find( '.roundbar' ),
      roundbarOH = roundbar.outerHeight(),
      roundbarIH = roundbar.innerHeight(),
      roundbarOW = roundbar.outerWidth(),
      handler    = $actor.find( '.handler' ),
      handlerOH  = handler.outerHeight(true), // including margin to be able to move handler inside or outside
      handlerOW  = handler.outerWidth(),
      handlerVal = $actor.find( '.handlervalue' ),
      
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
          updateSetpoint( handler, handlerVal, value, percentage, roundbarOW, roundbarOH, roundbarIH, handlerOW, handlerOH );
        }
      };
        
    //$(window).mousemove( moveaction ).mouseup( function(){
    //  $(window).unbind( 'mousemove', moveaction ); 
    //});
   console.log($actor.data(), data); 
    moveaction( event );
    
    return { callback: moveaction, restrict: false };
  },
  action: function( path, actor, isCanceled ) {
  },
  createX: function(element, path, flavour, type) {
  }
});

});