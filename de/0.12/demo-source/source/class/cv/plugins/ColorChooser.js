/* ColorChooser.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 *
 * @since 0.5.2
 * @author Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * @asset(plugins/colorchooser/farbtastic/farbtastic.js,plugins/colorchooser/farbtastic/farbtastic.css)
 */
qx.Class.define('cv.plugins.ColorChooser', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update, cv.ui.common.Operate],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
      return data;
    },

    makeAddressListFn: function( src, transform, mode, variant ) {
      return [ true, variant ];
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    valueR: {
      check: "Number",
      init: 0
    },
    valueG: {
      check: "Number",
      init: 0
    },
    valueB: {
      check: "Number",
      init: 0
    },
    busR: {
      check: "Number",
      init: 0
    },
    busG: {
      check: "Number",
      init: 0
    },
    busB: {
      check: "Number",
      init: 0
    },
    rateLimiter: {
      check: "Boolean",
      init: false
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __skipSending: false,

    _onDomReady: function() {
      this.base(arguments);
      var $actor = $( '#' + this.getPath() + ' .actor' );
      $actor.farbtastic( function(color){
        this.setValueR(parseInt(color.substring(1, 3), 16) * 100 / 255.0);
        this.setValueG(parseInt(color.substring(3, 5), 16) * 100 / 255.0);
        this.setValueB(parseInt(color.substring(5, 7), 16) * 100 / 255.0);

        if( this.getRateLimiter() === false && this.__skipSending === false) {// already requests going?
          this._rateLimitedSend($actor);
        }
      }.bind(this));
    },

    _rateLimitedSend: function() {
      var modified = false;
      var address = this.getAddress();
      var r  = this.getValueR();
      var g  = this.getValueG();
      var b  = this.getValueB();
      var br = this.getBusR();
      var bg = this.getBusG();
      var bb = this.getBusB();
      var v;
      var templateEngine = cv.TemplateEngine.getInstance();
      for( var addr in address )
      {
        if( !cv.data.Model.isWriteAddress(address[addr]) ) { continue; } // skip when write flag not set
        switch( address[addr][2] )
        {
          case 'r':
            v = cv.Transform.encode(address[addr][0], r );
            if( v !== cv.Transform.encode(address[addr][0], br ) )
            {
              templateEngine.visu.write( addr, v );
              modified = true;
            }
            break;
          case 'g':
            v = cv.Transform.encode(address[addr][0], g );
            if( v !== cv.Transform.encode(address[addr][0], bg ) )
            {
              templateEngine.visu.write( addr, v );
              modified = true;
            }
            break;
          case 'b':
            v = cv.Transform.encode(address[addr][0], b );
            if( v !== cv.Transform.encode(address[addr][0], bb ) )
            {
              templateEngine.visu.write( addr, v );
              modified = true;
            }
            break;
          case 'rgb':
            var rgb = [r*255/100.0,g*255/100.0,b*255/100.0];
            var brgb = [br*255/100.0,bg*255/100.0,bb*255/100.0];
            v = cv.Transform.encode(address[addr][0], rgb );
            var bv = cv.Transform.encode(address[addr][0], brgb );
            if( v[0] !== bv[0] || v[1] !== bv[1] || v[2] !== bv[2] )
            {
              templateEngine.visu.write( addr, v.join(",") );
              modified = true;
            }
            break;
        }
      }

      if( modified )
      {
        this.setBusR(this.getValueR());
        this.setBusG(this.getValueG());
        this.setBusB(this.getValueB());
        this.setRateLimiter(true);
        this.__timer = qx.event.Timer.once(this._rateLimitedSend, this, 250); // next call in 250ms
      } else {
        this.setRateLimiter(false);
      }
    },

    _getInnerDomString: function() {
      return '<div class="actor"></div>';
    },

    _update: function( ga, data ) {
      if (ga === undefined) { return; }
      function toHex( x ) { var r = parseInt( x ).toString(16); return r.length === 1 ? '0'+r : r; }
      var
        value      = cv.Transform.decode( this.getAddress()[ ga ][0], data ),
        farbtastic = jQuery.farbtastic( this.getActor() ),
        color      = farbtastic.color || '#000000';

      switch( this.getAddress()[ ga ][2] )
      {
        case 'r':
          this.setBusR(value);
          color = color.substring(0,1) +
            toHex( value*255/100 )+
            color.substring(3);
          break;

        case 'g':
          this.setBusG(value);
          color = color.substring(0,3) +
            toHex( value*255/100 )+
            color.substring(5);
          break;

        case 'b':
          this.setBusB(value);
          color = color.substring(0,5) +
            toHex( value*255/100 )+
            color.substring(7);
          break;
        case 'rgb':
          this.setBusR(value[0]);
          this.setBusG(value[1]);
          this.setBusB(value[2]);
          color = color.substring(0,1) +
            toHex( value[0]*255/100 )+
            toHex( value[1]*255/100 )+
            toHex( value[2]*255/100 )+
            color.substring(7);
          break;
      }
      this.__skipSending = true;
      if (this.__timer) {
        this.__timer.stop();
        this.__timer = null;
        this.setRateLimiter(false);
      }
      farbtastic.setColor( color );
      this.__skipSending = false;
    }
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/colorchooser/farbtastic/farbtastic.css');
    loader.addScripts('plugins/colorchooser/farbtastic/farbtastic.js');
    // register the parser
    cv.parser.WidgetParser.addHandler("colorchooser", statics);
    cv.ui.structure.WidgetFactory.registerClass("colorchooser", statics);
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__farbtastic = null;
  }
});