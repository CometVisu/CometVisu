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

$.includeScripts([
  'plugins/gauge/lib/tween-min.js',
  'plugins/gauge/lib/steelseries-min.js'
], templateEngine.pluginLoaded );

VisuDesign_Custom.prototype.addCreator("gauge", {
	create: function( element, path, flavour, type ) {
        var $e = $(element);

		console.log($e);
        // create the main structure
        var ret_val = basicdesign.createDefaultWidget( 'gauge', $e, path, type, this.update );

        function uniqid() {
            var newDate = new Date;
            return newDate.getTime();
        }
        var id = "gauge_" + uniqid();
        var radialid = uniqid();
		var radial = {};
		
    	// and fill in widget specific data	
        ret_val.data( {
		        'type' : $e.attr('type'),
         'titleString' : $e.attr('titleString'),
		  'unitString' : $e.attr('unitString'),
		    'minValue' : $e.attr('minValue'),
		    'maxValue' : $e.attr('maxValue'),
          'lcdVisible' : $e.attr('lcdVisible' ) || 'false',
	            'size' : $e.attr('size'),
             'format'  : $e.attr('format')
        } );	
		var data = ret_val.data();
		var titleString = data.titleString;	
        var type = data.type;	
		var size = data.size;
        var unitString = data.unitString;	
		var lcdVisible = data.lcdVisible;	
		var minValue = data.minValue;
		var maxValue = data.maxValue;
var address = basicdesign.makeAddressList($e);
console.log("adress=",address);
	    // create the actor
		var $actor = $("<canvas id=" + id + "></canvas>");
        ret_val.append( $actor ); 

    	templateEngine.bindActionForLoadingFinished(function() {
	        radial[radialid] = new steelseries[type](id, {			
                     titleString : [titleString],
					  unitString : [unitString],
					        size : [size],
                       lcdVisibl : [lcdVisible]
		    });			
            if (type == 'Radial') {
		       radial[radialid].setFrameDesign(steelseries.FrameDesign.BLACK_METAL);
	           radial[radialid].setBackgroundColor(steelseries.BackgroundColor.DARK_GRAY);
	           radial[radialid].setForegroundType(steelseries.ForegroundType.TYPE1);
	           radial[radialid].setPointerColor(steelseries.ColorDef.RED);
	           //radial[radialid].setPointerTypeAverage(steelseries.PointerType.TYPE1);
		       radial[radialid].setMinValue(minValue);
			   radial[radialid].setMaxValue(maxValue);
		       radial[radialid].setValueAnimated(50);
            } else if(type == 'WindDirection'){
    	    	radial[radialid].setFrameDesign(steelseries.FrameDesign.BLACK_METAL);
		        radial[radialid].setBackgroundColor(steelseries.BackgroundColor.DARK_GRAY);
		        radial[radialid].setForegroundType(steelseries.ForegroundType.TYPE1);
		        radial[radialid].setPointerColor(steelseries.ColorDef.RED);
		        radial[radialid].setPointerTypeAverage(steelseries.PointerType.TYPE1);
				radial[radialid].setValueAnimatedLatest(80);
				radial[radialid].setValueAnimatedAverage(90);
            }
        });
     	return ret_val;	
	}
});		
