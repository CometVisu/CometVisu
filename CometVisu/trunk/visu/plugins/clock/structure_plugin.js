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

/**
 * This is a custom function that extends the available widgets.
 * It's purpose is to change the design of the visu during runtime
 * to demonstrate all available
 */
VisuDesign_Custom.prototype.addCreator("clock", {
  that: this,
  create: function( page, path ) {
    var that = this;
    var $p = $(page);
    var ret_val = $('<div class="widget clearfix clock" />');
    ret_val.setWidgetLayout($p);
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = {};
    $p.find('address').each( function(){ 
      var src = this.textContent;
      var transform = this.getAttribute('transform');
      var color     = this.getAttribute('variant'  );
      var readonly  = this.getAttribute('readonly' );
      ga_list.push( src ); 
      address[ '_' + src ] = [ transform, color, readonly=='true' ];
    });

    var actor = '<div class="actor" style="width:200px;">';
    actor += '</div>';
    var datatype =  $(page).attr('datatype');
    var $actor = $(actor)
      .data({
        'value'   : new Date(),
        'address' : address,
        'type'    : 'clock'
      });
    $actor.svg({loadURL:'plugins/clock/clock_pure.svg',onLoad:function(svg){
      $( svg.getElementById('HotSpotHour'  ) )
        .draggable()
        .bind('drag', {type: 'hour'  ,actor:$actor}, that.dragHelper )
        .bind('dragstop', {actor:$actor}, that.action );
      $( svg.getElementById('HotSpotMinute') )
        .draggable()
        .bind('drag', {type: 'minute',actor:$actor}, that.dragHelper )
        .bind('dragstop', {actor:$actor}, that.action );
    }});
    
    for( var addr in address ) 
    { 
      if( !address[addr][2] ) $actor.bind( addr, this.update ); // no writeonly
      $actor.bind( addr, this.update ); // no writeonly
    }
    
    ret_val.append(label).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    var $svg = element.find('svg');
    var time = value.split(':');
    $svg.children().find('#Hour'  ).attr('transform','rotate('+((time[0]%12)*360/12+time[1]*30/60)+',50,50)');
    $svg.children().find('#Minute').attr('transform','rotate('+(time[1]*6)+',50,50)');
  },
  dragHelper:function(event,ui) {
    var $container = event.data.actor;
    var $svg = $container.find('svg');
    var x = event.originalEvent.pageX - $svg.offset().left - 50; 
    var y = 50 - (event.originalEvent.pageY - $svg.offset().top);
    var angle = (Math.atan2( x, y ) * 180 / Math.PI + 360) % 360;
    var time = $container.data('value');
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
  action: function( event, ui ) {
    var data = event.data.actor.data(); //$(this).data();
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value ) );
    }
  },
  attributes: {
    rowspan:    { type: 'numeric', required: false },
    colspan:    { type: 'numeric', required: false }
  },
  elements: {
    label:      { type: 'string',    required: true, multi: false },
    address:    { type: 'address',   required: true, multi: true  }
  },
  content:      false
});