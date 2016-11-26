/* structure_plugin.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";

  /**
   * This is a custom function that extends the available widgets.
   * It's purpose is to change the design of the visu during runtime
   * to demonstrate all available
   */
  VisuDesign_Custom.prototype.addCreator("clock", {
  that: this,
  create: function( page, path, flavour, type ) {
    var that = this;
    var $p = $(page);
    var classes = templateEngine.design.setWidgetLayout( $p, path );
    var ret_val = '<div class="widget clearfix clock '+(classes?classes:'')+'">';
    ret_val+=templateEngine.design.extractLabel( $p.find('label')[0], flavour );
    var address = templateEngine.design.makeAddressList($p,false,path);

    ret_val+='<div class="actor" style="width:200px;"></div>';
    
    var data = templateEngine.widgetDataInsert( path, {
      'value'   : new Date(),
      'address' : address,
      'type'    : 'clock'
    });
    
    templateEngine.postDOMSetupFns.push(function() {
      var $actor = $("#"+path+" .actor");
      $actor.svg({loadURL:'plugins/clock/clock_pure.svg',onLoad:function(svg){
        $( svg.getElementById('HotSpotHour'  ) )
          .draggable()
          .bind('drag', {type: 'hour'  ,actor:$actor}, that.dragHelper )
          .bind('dragstop', {actor:$actor}, that.dragAction );
        $( svg.getElementById('HotSpotMinute') )
          .draggable()
          .bind('drag', {type: 'minute',actor:$actor}, that.dragHelper )
          .bind('dragstop', {actor:$actor}, that.dragAction );
      }});
    });
    ret_val+="</div>";
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = templateEngine.design.defaultUpdate( e, d, element, undefined, element.parent().attr('id') );
    var $svg = element.find('svg');
    var time = value.split(':');
    $svg.children().find('#Hour'  ).attr('transform','rotate('+((time[0]%12)*360/12+time[1]*30/60)+',50,50)');
    $svg.children().find('#Minute').attr('transform','rotate('+(time[1]*6)+',50,50)');
  },
  dragHelper:function(event,ui) {
    var $container = event.data.actor;
    var $svg = $container.find('svg');
    var widget = $container.parents('.widget_container')[0];
    var path = widget.id;
    var widgetData  = templateEngine.widgetDataGet( path );
    var x = event.originalEvent.pageX - $svg.offset().left - 50; 
    var y = 50 - (event.originalEvent.pageY - $svg.offset().top);
    var angle = (Math.atan2( x, y ) * 180 / Math.PI + 360) % 360;
    var time = widgetData.value;
    if( event.data.type == 'hour' )
    {
      var oldHours = time.getHours();
      var pm = oldHours >= 12;
      var hours = Math.floor( angle/30 );
      var minutes = (angle%30) * 2;
      
      if( oldHours%12 > 9 && hours < 3 )
      {
        if( pm ) { pm = false; time.setDate( time.getDate() + 1 ); }
        else     { pm = true ;                                     }
      } else if ( hours > 9 && oldHours%12 < 3 )
      {
        if( pm ) { pm = false;                                     }
        else     { pm = true ; time.setDate( time.getDate() - 1 ); }
      }
      
      time.setHours( hours + pm * 12 );
      time.setMinutes( minutes );
    } else { // minute
      var minutes = Math.round( angle/6 );
      var oldMinutes = time.getMinutes();
      
      if( oldMinutes > 45 && minutes < 15 )
        time.setHours( time.getHours() + 1 );
      else if( minutes > 45 && oldMinutes < 15 )
        time.setHours( time.getHours() - 1 );
      
      time.setMinutes( minutes );
    }
    $container.find('#Hour'  ).attr('transform','rotate('+((time.getHours()%12)*360/12+time.getMinutes()*30/60)+',50,50)');
    $container.find('#Minute').attr('transform','rotate('+(time.getMinutes()*6)+',50,50)');
  },
  dragAction: function(event,ui) {
    var widget = event.data.actor.parents('.widget_container')[0];
    var 
      widgetData  = templateEngine.widgetDataGet( widget.id );
    for( var addr in widgetData.address )
    {
      if( widgetData.address[addr][1] == true ) continue; // skip read only
      templateEngine.visu.write( addr, templateEngine.transformEncode( widgetData.address[addr][0], widgetData.value ) );
    }
  },
  action: function(path,actor,isCanceled) {
    // override system action-function
  }
});

});