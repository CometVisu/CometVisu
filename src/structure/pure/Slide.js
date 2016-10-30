/* Slide.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * TODO: complete docs
 *
 * @module structure/pure/Slide
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.Slide', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Operate, cv.role.Update],

    has: {
      min            : { is: 'r' },
      max            : { is: 'r' },
      step           : { is: 'r' },
      sendOnFinish   : { is: 'r' },
      valueInternal  : { is: 'rw', init: true },
      inAction       : { is: 'rw', init: false },
      $$main         : { },
      $$timerId      : null
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'step'          : { default: 0.5, transform: parseFloat},
            'send_on_finish': { target: 'sendOnFinish', default: 'false' }
          };
        }
      },
      after: {
        parse: function(xml, path) {
          var $e = $(xml);
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

          var data = templateEngine.widgetDataGet(path);
          data.min = min;
          data.max = max;
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor"/>';
      }
    },

    after: {
      initialize: function(props) {
        this.$$main = $('#main');
        // check provided address-items for at least one address which has write-access
        var readonly = true;
        for (var addrIdx in this.getAddress()) {
          if (this.getAddress()[addrIdx][1] & 2) {
            // write-access detected --> no read-only mode
            readonly = false;
            break;
          }
        }
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          var $actor = $( '#' + this.getPath() + ' .actor' );
          $actor.slider({
            step:    this.getStep(),
            min:     this.getMin(),
            max:     this.getMax(),
            range:   'min',
            animate: true,
            send_on_finish : this.getSendOnFinish(),
            start:   this.slideStart.bind(this),
            change:  this.slideChange.bind(this)
          });
          // disable slider interaction if in read-only mode --> just show the value
          if (readonly) {
            $actor.slider({ disabled: true });
          }
          $actor.on( 'slide', this.slideUpdateValue.bind(this) );

          if(this.getFormat()) {
            // initially setting a value
            $actor.children('.ui-slider-handle').text(sprintf(this.getFormat(), this.applyMapping(undefined)));
          }
        }, this);
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function(value) {
      },

      update: function( ga, d ) {
        var actor = this.getActor();

        if( this.getInAction() )
          return;

        var value = this.applyTransform(ga, d);
        if( this.getValue() != value )
        {
          this.setValue(value);
          this.setValueInternal(false);
          actor.slider('value', value);
          this.setValueInternal(true);
          if( this.getFormat() != null )
            actor.children('.ui-slider-handle').text(sprintf(this.getFormat(), this.applyMapping(value)));
        }
        this.transformSlider(value, actor.children('.ui-slider-handle'));
      },

      transformSlider: function( value, handle ) {
        if (!this.$$main.data('disableSliderTransform')) {
          if (!isNaN(value)) {
            value = parseFloat(value); // force any (string) value to float
            var sliderMax = $(handle).parent().slider("option","max")+($(handle).parent().slider("option","min")*-1);
            var percent = Math.round((100/sliderMax)*(value+($(handle).parent().slider("option","min")*-1)));
            //console.log("Value: "+value+", Max/Min: "+sliderMax+", %: "+percent+" => "+percent);
            $(handle).css('transform', 'translateX(-'+percent+'%)');
          }
        }
      },

      slideUpdateValue: function(event, ui) {
        if (this.getFormat()) {
          $(ui.handle).text(sprintf(this.getFormat(), this.applyMapping(ui.value)));
        }
        this.transformSlider(ui.value, ui.handle);
      },

      /**
       * Start a thread that regularly sends the slider position to the bus
       * @method slideStart
       * @param {} event
       * @param {} ui
       */
      slideStart:function(event, ui)
      {
       var actor = this.getActor();

        if ( this.getSendOnFinish() === true) return;

        this.setInAction(true);
        this.setValueInternal(true);
        this.$$timerId = setInterval( function(){
          var asv = actor.slider('value');

          if( this.getValue() == asv ) return;

          var addresses = this.getAddress();
          for( var addr in addresses )
          {
            if( !(addresses[addr][1] & 2) ) continue; // skip when write flag not set
            var dv  = this.applyTransformEncode( addr, asv );
            if( dv != this.applyTransformEncode( addr, this.getValue() ) )
              templateEngine.visu.write( addr, dv );
          }
          this.setValue(asv);
        }.bind(this), 250 ); // update KNX every 250 ms
      },
      /**
       * Delete the update thread and send the final value of the slider to the bus
       * @method slideChange
       * @param {} event
       * @param {} ui
       */
      slideChange:function(event,ui)
      {
        clearInterval(this.$$timerId);
        this.setInAction(false);
        if( this.getValueInternal() && this.getValue() != ui.value )
        {
          var addresses = this.getAddress();
          for( var addr in addresses )
          {
            if( !(addresses[addr][1] & 2) ) continue; // skip when write flag not set
            var uv  = this.applyTransformEncode(addr, ui.value );
            if( uv != this.applyTransformEncode(addr, data.value ) )
              templateEngine.visu.write( addr, uv );
          }
        }
        this.transformSlider(ui.value, ui.handle);
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function () {
        return "";
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("slide", cv.structure.pure.Slide);
}); // end define
