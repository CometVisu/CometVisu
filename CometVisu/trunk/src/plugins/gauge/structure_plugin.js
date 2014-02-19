﻿/* structure_custom.js (c) 01/2014 by NetFritz [NetFritz at gmx dot de]
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
 
 /*
* This plugins integrates Gauge (in canavas) into the visualization
*
*
* short documentation
*
* recommended widgets:
* - WindDirection
* - Radial
*
* attributes:
* - titleString: optional, "name"
* - unitString: optional, "units"
* - minValue: optional, "measuring range"
* - maxValue: optional, "measuring range"
* - lcdVisible: optional, "true", "false" 
* - trendVisible: optional, "true" , "false"
* - size: optional, preset "150" 
* - threshold: optional, ""
* - format: optional, ""
*
*/ 
$.includeScripts([
  'plugins/gauge/lib/tween-min.js',
  'plugins/gauge/lib/steelseries-min.js'
], templateEngine.pluginLoaded );

VisuDesign_Custom.prototype.addCreator("gauge", {
    create: function( element, path, flavour, type ) {
        var $e = $(element);
        // create the main structure
        var ret_val = basicdesign.createDefaultWidget( 'gauge', $e, path, flavour, type, this.update, function( src, transform, mode, variant ) {
          return [ true, variant ];
        });     
        var id = "gauge_" + path;

        // and fill in widget specific data
        ret_val.data( {
           'type' : $e.attr('type'),
           'titleString' : $e.attr('titleString') || '',
           'unitString'  : $e.attr('unitString') || '',
           'minValue'    : $e.attr('minValue') || 0, 
           'maxValue'    : $e.attr('maxValue') || 100,
           'lcdVisible'  : $e.attr('lcdVisible') || false,
           'trendVisible': $e.attr('trendVisible') || false,
           radial        : undefined,
           'size'        : $e.attr('size') || '150',
           'threshold'   : $e.attr('threshold'),
           'lcdDecimals' : $e.attr('lcdDecimals') || 0
        });
        var data = ret_val.data();
        var titleString = data.titleString;
        var type = data.type;
        var size = data.size;
        var unitString = data.unitString;
        var minValue = data.minValue;
        var maxValue = data.maxValue;
        var threshold = data.threshold;
        if(data.lcdVisible == 'false') var lcdVisible = false;
        else if(data.lcdVisible == 'true') var lcdVisible = true;
        if(data.trendVisible == 'false') var trendVisible = false;
        if(data.trendVisible == 'true') var trendVisible = true;
        // create the actor 
        var $actor = $('div class="actor"></div><canvas id=' + id + '></canvas>');
        ret_val.append( $actor ); 
        basicdesign.defaultUpdate(undefined, undefined, ret_val, true);

        templateEngine.bindActionForLoadingFinished(function() {
            if (type == 'Radial') { 
                var radial = new steelseries[type](id, {
                     titleString : [titleString],
                      unitString : [unitString],
                            size : [size],
                      lcdVisible : lcdVisible,
                     lcdDecimals : data.lcdDecimals, 
                    trendVisible : trendVisible
                });
                radial.setFrameDesign(steelseries.FrameDesign.BLACK_METAL);
                radial.setBackgroundColor(steelseries.BackgroundColor.DARK_GRAY);
                radial.setForegroundType(steelseries.ForegroundType.TYPE1);
                radial.setPointerColor(steelseries.ColorDef.RED);
                radial.setPointerType(steelseries.PointerType.TYPE1);
                radial.setMinValue(minValue);
                radial.setMaxValue(maxValue);
                radial.setThreshold(threshold);
                   //radial.setValueAnimated(1000);
            } else if(type == 'WindDirection'){
                var radial = new steelseries[type](id, {
                     titleString : [titleString],
                      unitString : [unitString],
                            size : [size],
                    //lcdVisible : [lcdVisible]
                });
                radial.setFrameDesign(steelseries.FrameDesign.BLACK_METAL);
                radial.setBackgroundColor(steelseries.BackgroundColor.DARK_GRAY);
                radial.setForegroundType(steelseries.ForegroundType.TYPE1);
                radial.setPointerColor(steelseries.ColorDef.RED);
                radial.setPointerTypeAverage(steelseries.PointerType.TYPE1);
                //radial.setValueAnimatedLatest(80);
                //radial.setValueAnimatedAverage(90);
            }
            ret_val.data( 'radial', radial );
        });
        return ret_val;	
    },
    update: function(e,d) {
        var element = $(this);
        var value = basicdesign.defaultUpdate( e, d, element, true );
        var variant = element.data( 'address' )[ e.type ][2];
        switch( variant ){
        case 'average':
            if( element.data('radial') && element.data('radial').setValueAnimatedAverage )
                element.data('radial').setValueAnimatedAverage( value );
            break;
        case 'trend':
           if( element.data('radial') && element.data('radial').setTrend ){
                if ( value > 0) element.data('radial').setTrend(steelseries.TrendState.UP);
                else if (value < 0) element.data('radial').setTrend(steelseries.TrendState.DOWN);
                else element.data('radial').setTrend(steelseries.TrendState.STEADY);
            }
        break;
        default:
            if( element.data('radial') && element.data('radial').setValueAnimatedLatest )
               element.data('radial').setValueAnimatedLatest( value );
            if( element.data('radial') && element.data('radial').setValueAnimated )
               element.data('radial').setValueAnimated( value );
        }
    }
});
