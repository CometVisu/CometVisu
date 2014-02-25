/* structure_custom.js (c) 01/2014 by NetFritz [NetFritz at gmx dot de]
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
* attributes:
* - type: WindDirection | Radial | Linear
* - subtype: type1 | type2 | type3 | type4 | type5
* - titleString: optional, "name"
* - unitString: optional, "units"
* - minValue: optional, "measuring range"
* - maxValue: optional, "measuring range"
* - ledVisible: optional, "true", "false"
* - lcdVisible: optional, "true", "false" 
* - lcdDecimals: optional, integer
* - trendVisible: optional, "true" , "false"
* - size: optional, preset "150" 
* - threshold: optional, ""
* - thresholdRising: optional, "true" , "false" - default is "false"
* - background: optional
* - framedesign: optional
* - valueColor: optional, default is "RED"
*
*/ 
$.includeScripts([
  'plugins/gauge/lib/tween-min.js',
  'plugins/gauge/lib/steelseries-min.js'
], templateEngine.pluginLoaded );

VisuDesign_Custom.prototype.addCreator("gauge", {
    create: function(element, path, flavour, type) {
        var $e = $(element);
        // create the main structure
        var ret_val = basicdesign.createDefaultWidget('gauge', $e, path, flavour, type, this.update, function( src, transform, mode, variant) {
          return [true, variant];
        });     

        // create the actor 
        var id = "gauge_" + path;
        var $actor = $('div class="actor"><canvas id=' + id + '></canvas></div>');
        ret_val.append( $actor ); 

        templateEngine.bindActionForLoadingFinished(function() {
          var params = {
              gaugeType               : ($e.attr('subtype') ? steelseries.GaugeType[$e.attr('subtype')] : undefined),
              titleString             : ($e.attr('titleString') ? $e.attr('titleString') : undefined),
              unitString              : ($e.attr('unitString') ? $e.attr('unitString') : undefined),
              size                    : ($e.attr('size') ? parseFloat($e.attr('size') || 150) : undefined),
              width                   : ($e.attr('width') ? parseFloat($e.attr('width') || 320) : undefined),
              height                  : ($e.attr('height') ? parseFloat($e.attr('height') || 140) : undefined),
              minValue                : parseFloat($e.attr('minValue') || 0), 
              maxValue                : parseFloat($e.attr('maxValue') || 100),
              frameDesign             : ($e.attr('framedesign') ? steelseries.FrameDesign[$e.attr('framedesign')] : undefined),
              backgroundColor         : ($e.attr('background') ? steelseries.BackgroundColor[$e.attr('background')] : undefined),
              foregroundType          : steelseries.ForegroundType.TYPE1,
              pointerType             : steelseries.PointerType.TYPE1,
              pointerColor            : steelseries.ColorDef.RED,
              lcdColor                : steelseries.LcdColor.STANDARD,
              lcdVisible              : ($e.attr('lcdVisible') ? $e.attr('lcdVisible') == 'true' : undefined),
              lcdDecimals             : ($e.attr('lcdDecimals') ? parseInt($e.attr('lcdDecimals')) : undefined),
              ledVisible              : ($e.attr('ledVisible') ? $e.attr('ledVisible') == 'true' : undefined),
              ledColor                : steelseries.LedColor.RED_LED,
              valueColor              : ($e.attr('valueColor') ? steelseries.ColorDef[$e.attr('valueColor')] : steelseries.ColorDef.RED),
              trendVisible            : ($e.attr('trendVisible') ? $e.attr('trendVisible') == 'true' : undefined),
              thresholdRising         : ($e.attr('thresholdRising') ? $e.attr('thresholdRising') == 'true' : undefined),
              threshold               : ($e.attr('threshold') ? parseFloat($e.attr('threshold')) : undefined),
              thresholdVisible        : ($e.attr('threshold') !== undefined),
          };
          
          var gaugeElement = new steelseries[$e.attr('type') || 'Radial'](id, params);

          ret_val.data('gaugeElement', gaugeElement);

          basicdesign.defaultUpdate(undefined, undefined, ret_val, true);
        });
        return ret_val;
    },

    update: function(e, d) {
        var element = $(this);
        var value = basicdesign.defaultUpdate(e, d, element, true);
        var variant = element.data('address')[ e.type ][2];
        var gaugeElement = element.data('gaugeElement');
        if (gaugeElement) {
          switch (variant) {
            case 'average':
              if (gaugeElement.setValueAnimatedAverage) {
                gaugeElement.setValueAnimatedAverage(value);
              }
              break;
            case 'trend':
              if (gaugeElement.setTrend) {
                var trend;
                if (value > 0) {
                  trend = steelseries.TrendState.UP;
                }
                else if (value < 0) {
                  trend = steelseries.TrendState.DOWN;
                }
                else {
                  trend = steelseries.TrendState.STEADY;
                }
                gaugeElement.setTrend(trend);
              }
              break;
            case 'threshold':
              if (gaugeElement.setThreshold) {
                gaugeElement.setThreshold(value);
              }
              break;
            case 'min':
              if (gaugeElement.setMinValue) {
                gaugeElement.setMinValue(value);
              }
              break;
            case 'max':
              if (gaugeElement.setMaxValue) {
                gaugeElement.setMaxValue(value);
              }
              break;
            default:
               if (gaugeElement.setValueAnimatedLatest) {
                 gaugeElement.setValueAnimatedLatest(value);
               }
               if (gaugeElement.setValueAnimated) {
                 gaugeElement.setValueAnimated(value);
               }
           }
        }
    }
});
