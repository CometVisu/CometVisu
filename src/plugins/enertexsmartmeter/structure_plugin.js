/* structure_plugin.js (c) 2016 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * The powerspectrum plugin and widget creates a graph to show the power 
 * spectral data that the Enertex Smartmeter can send on the KNX bus.
 * 
 * @module plugins/powerspectrum/structure_plugin
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.10.0
 * */

require.config({
  shim: {
    'plugins/diagram/dep/flot/jquery.flot.min':          ['jquery'],
    'plugins/diagram/dep/flot/jquery.flot.canvas.min':   ['plugins/diagram/dep/flot/jquery.flot.min'],
    'plugins/diagram/dep/flot/jquery.flot.resize.min':   ['plugins/diagram/dep/flot/jquery.flot.min'],
    'plugins/diagram/dep/flot/jquery.flot.navigate.min': ['plugins/diagram/dep/flot/jquery.flot.min']
  }
});

define( ['structure_custom',
    'plugins/diagram/dep/flot/jquery.flot.min',
    'plugins/diagram/dep/flot/jquery.flot.canvas.min',
    'plugins/diagram/dep/flot/jquery.flot.resize.min',
    'plugins/diagram/dep/flot/jquery.flot.navigate.min'
  ], function( VisuDesign_Custom ) {
  "use strict";
  
  // Constants
  var
    CURRENT = 0,
    VOLTAGE = 1,
    limitEN50160_1999 = [[2,0.02],[3,0.05],[4,0.01],[5,0.06],[6,0.005],[7,0.05],
      [8,0.005],[9,0.015],[10,0.005],[11,0.035],[12,0.005],[13,0.03],[14,0.005],
      [15,0.005],[16,0.005],[17,0.02],[18,0.005],[19,0.015],[20,0.005],
      [21,0.005],[22,0.005],[23,0.015],[24,0.005],[25,0.015]
    ], // limit for voltage in ratio
    limitEN61000_3_2 = [[2,1.620],[3,3.450],[4,0.650],[5,1.710],[6,0.450],
      [7,1.160],[8,0.350],[9,0.600],[10,0.280],[11,0.500],[12,0.233],[13,0.320],
      [14,0.200],[15,0.230],[16,0.175],[17,0.203],[18,0.155],[19,0.182],
      [20,0.140],[21,0.164],[22,0.127],[23,0.150],[24,0.117],[25,0.139]
    ], // limit for current in Ampere
    referenceSin = [[],[],[]];
  
  // fix limits for better displaying
  function fixLimits( entry, index, array )
  {
    array[index][0] -= 0.5;
  }
  function lastShifted( array )
  {
    var last = array[ array.length-1 ];
    return [ last[0]+1, last[1] ];
  }
  
  limitEN50160_1999.forEach( fixLimits );
  limitEN50160_1999.push( lastShifted( limitEN50160_1999 ) );
  limitEN61000_3_2.forEach( fixLimits );
  limitEN61000_3_2.push( lastShifted( limitEN61000_3_2 ) );
  
  // fill reference
  for( var phi = 0; phi < 50; phi++ )
  {
    var
      time = phi * 20 / 50; // time in milliseconds
    
    referenceSin[0].push( [ time, Math.sin( (phi      ) * Math.PI / 25 ) ] );
    referenceSin[1].push( [ time, Math.sin( (phi+ 50/3) * Math.PI / 25 ) ] );
    referenceSin[2].push( [ time, Math.sin( (phi+100/3) * Math.PI / 25 ) ] );
  }
  
  /**
   * Setup helper
   */
  function setupCurve()
  {
    return [[0,0],[0.4,0],[0.8,0],[1.2,0],[1.6,0],[2,0],[2.4,0],[2.8,0],[3.2,0],
    [3.6,0],[4,0],[4.4,0],[4.8,0],[5.2,0],[5.6,0],[6,0],[6.4,0],[6.8,0],[7.2,0],
    [7.6,0],[8,0],[8.4,0],[8.8,0],[9.2,0],[9.6,0],[10,0],[10.4,0],[10.8,0],
    [11.2,0],[11.6,0],[12,0],[12.4,0],[12.8,0],[13.2,0],[13.6,0],[14,0],
    [14.4,0],[14.8,0],[15.2,0],[15.6,0],[16,0],[16.4,0],[16.8,0],[17.2,0],
    [17.6,0],[18,0],[18.4,0],[18.8,0],[19.2,0],[19.6,0]];
  }
  function setupSpectrum( offset )
  {
    var ret_val = [];
    
    if( undefined === offset )
      offset = 0;
    
    for( var i = 2; i < 52; i++ )
      ret_val.push( [ i + offset, 0 ] );
    return ret_val;
  }
  
  /**
   * Convert a spectrum to a curve
   */
  function updateCurve( input, target, phase )
  {
    var 
      inp = input[phase],
      out = target[phase],
      shift = (phase * 2 / 3 - 0.5) * Math.PI;
      
    for( var i = 0; i < 50; i++ )
    {
      var
        phi  = i * Math.PI / 25,
        value = Math.cos( phi + shift ); // the base with 50 Hz
        
      // the harmonics
      for( var j = 2; j < 50; j++ )
      {
        value += Math.cos( (phi+shift) * j ) * inp[j][1];
      }
      
      out[i][1] = value;
    }
  }
  
  /**
   * Little helper to setup the Flot dataset structure.
   */
  function createDatasetCurve( widgetData )
  {
    return widgetData.singlePhase ?
      [
        { label: null, data: referenceSin[0], color:13 }, // trick flot to automatically make color darker
        { label: 'L', data: widgetData.curve[0], color:1 }
      ] :
      [
        { label: null, data: referenceSin[0], color:13 },
        { label: null, data: referenceSin[1], color:14 },
        { label: null, data: referenceSin[2], color:15 },
        { label: 'L1', data: widgetData.curve[0], color:1 },
        { label: 'L2', data: widgetData.curve[1], color:2 },
        { label: 'L3', data: widgetData.curve[2], color:3 }
      ];
  }
  
  /**
   * Little helper to setup the Flot dataset structure.
   */
  function createDatasetSpectrum( widgetData )
  {
    return widgetData.singlePhase ? 
      [
        { label: widgetData.limitName, data:widgetData.displayType===VOLTAGE?limitEN50160_1999:limitEN61000_3_2, bars:{show:false}, lines:{steps:true}, color:0 },
        { label: widgetData.name1, data:widgetData.spectrum[0] , color:1}
      ] :
      [
        { label: widgetData.limitName, data:widgetData.displayType===VOLTAGE?limitEN50160_1999:limitEN61000_3_2, bars:{show:false}, lines:{steps:true}, color:0 },
        { label: widgetData.name1, data:widgetData.spectrum[0], color:1 },
        { label: widgetData.name2, data:widgetData.spectrum[1], color:2 },
        { label: widgetData.name3, data:widgetData.spectrum[2], color:3 }
      ];
  }

  /**
   * This will create a diagram to show the frequency that the Enertex 
   * Smartmeter pushes on the KNX bus.
   */
  VisuDesign_Custom.prototype.addCreator( 'powerspectrum', {
    create: function( element, path, flavour, type ) {
      var 
        $e = $(element),
        displayType = $e.attr('type') === 'current' ? CURRENT : VOLTAGE,
        singlePhase = $e.attr('singlephase') === 'true' ? true : false;
      
      // create the main structure
      function handleVariant(src, transform, mode, variant)
      {
        if( !variant )
          variant = 'spectrum'; // the default
        
        return [true, variant];
      }
    
      var ret_val = templateEngine.design.createDefaultWidget( 'powerspectrum', $e, path, flavour, type, this.update, handleVariant );
      var data = templateEngine.widgetDataInsert( path, {
        displayType: displayType,
        singlePhase: singlePhase,
        spectrum: singlePhase ? [ setupSpectrum() ] : [ setupSpectrum(-0.26), setupSpectrum(0), setupSpectrum(0.26) ],
        limitName: $e.attr('limitname') || 'limit',
        name1: $e.attr('name1') || (singlePhase ? 'L' : 'L1'),
        name2: $e.attr('name2') || 'L2',
        name3: $e.attr('name3') || 'L3',
        curve: singlePhase ? [ setupCurve() ] : [ setupCurve(), setupCurve(), setupCurve() ],
        current: []
      });

      var 
        pageId = templateEngine.getPageIdForWidgetId( element, path ),
        showCurve = $e.attr('spectrumonly') === 'true' ? false : true,
        colors = [
          $e.attr('limitcolor') || "#edc240", // default directly from flot code
          $e.attr('color1')     || "#afd8f8",
          $e.attr('color2')     || "#cb4b4b",
          $e.attr('color3')     || "#4da74d"
        ];
      
      // create the actor
      var actor = '<div class="actor clickable">';
      if( showCurve )
        actor += '<div class="diagram_inline curve">loading...</div>';
      actor += '<div class="diagram_inline spectrum">loading...</div></div>';
      
      templateEngine.postDOMSetupFns.push( function(){
        var 
          diagramCurve = showCurve && $( '#' + path + ' .actor div.curve' ).empty(),
          optionsCurve = showCurve && {
            colors: colors,
            legend: {
              show: $e.attr('showlegend') === 'true' ? true : false // default to false
            },
            xaxis: {
              show: false
            },
            yaxis: {
              show: false
            }
          },
          diagramSpectrum = $( '#' + path + ' .actor div.spectrum' ).empty(),
          optionsSpectrum = {
            colors: colors,
            series: {
              bars: {
                show: true,
                fill: 1,
                fillColor: null,
                lineWidth: 0
              }
            },
            bars: {
              align: "center",
              barWidth: singlePhase ? 0.75 : 0.25
            },
            legend: {
              show: $e.attr('showlegend') === 'false' ? false : true // default to true
            },
            xaxis: {
              show: false
            },
            yaxis: {
              show: false
            },
          };
        data.plotCurve = showCurve && $.plot(diagramCurve, createDatasetCurve( data ), optionsCurve);
        data.plot = $.plot(diagramSpectrum, createDatasetSpectrum( data ), optionsSpectrum);
      });
      
      return ret_val + actor + '</div>';
    },
    update: function( ga, data ) {
      var 
        element = $(this),
        widgetData = templateEngine.widgetDataGetByElement( this ),
        addressInfo = widgetData.address[ ga ];
        
      if( addressInfo[2][0] === 'I' )
      {
        var
          phase = widgetData.singlePhase ? 1 : +(addressInfo[2][1] || 1),
          value = templateEngine.transformDecode( addressInfo[0], data );
        widgetData.current[phase-1] = value / 1000; // transform mA to A
      } else if( 
        widgetData.address[ ga ][2].substr(0,8) === 'spectrum'
        && data.length === 28 ) // sanity check for 14 bytes
      {
        var 
          phase = widgetData.singlePhase ? 1 : +(addressInfo[2][8] || 1),
          index = parseInt( data.substr( 0, 2 ), 16 ),
          factor = widgetData.current[phase-1] || 1,
          values = [];

        for( var i = 0; i < 13; i++ )
        {
          if( index + i < 2 )
            continue;
          
          values[i] = Math.pow( 10, (parseInt( data.substr( i*2 + 2, 2 ), 16 ) - 253) / 80);
          widgetData.spectrum[phase-1][ index + i - 2 ][1] = values[i] * factor;
        }
        widgetData.plot.setData( createDatasetSpectrum( widgetData ) );
        widgetData.plot.draw();
        
        if( widgetData.plotCurve )
        {
          updateCurve( widgetData.spectrum, widgetData.curve, phase-1 );
          widgetData.plotCurve.setData( createDatasetCurve( widgetData ) );
          widgetData.plotCurve.draw();
        }
      }
    }
  });
});