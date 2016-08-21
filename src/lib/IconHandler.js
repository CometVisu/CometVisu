/* IconHandler.js 
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
 * @author Christian Mayer
 * @since 2012
 */
define( ['icon/iconconfig'], function( iconconfig ) {
  "use strict";

  /**
   * The object "icon" contains the whole API necessary to handle the icons.
   * 
   * @class icon
   * @constructor FOO
   */
  function icon() { // Konstruktor

    // //////////////////////////////////////////////////////////////////////////
    // private static variables and methods:

    // ... none ...

    // check and fix if the user forgot the "new" keyword
    if (!(this instanceof icon)) {
      return new icon();
    }

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the private variables

    /**
     * Internal database of the known icons.
     * Initially filled with the default icons.
     * 
     * @property db
     * @private
     */
    var db = iconconfig;

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the public variables

    /* ... */

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the private methods
    /* ... */

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the public methods
    /**
     * Insert or overwrite one or many icons into the database. The parameter
     * might be a full hash of icon definitions or a single one consisting out of
     * a name and a URI path. Optional further parameters are a "type" and a
     * flavour.
     */
    this.insert = function() {
    var name    = arguments[0];
    var uri     = arguments[1];
    var type    = arguments[2] || '*';
    var flavour = arguments[3] || '*';
    var color   = arguments[4] || '*';
    var styling = arguments[5];
    var dynamic = arguments[6];

    if (!db[name])
      db[name] = {};
    if (!db[name][type])
      db[name][type] = {};
    if (!db[name][type][flavour])
      db[name][type][flavour] = {};

    if( dynamic && window[ dynamic ] )
      db[name][type][flavour][color] = window[ dynamic ]( uri );
    else
    db[name][type][flavour][color] = {
      uri    : uri,
      styling: styling
    };
  }

    /**
     * Get the icon information for a name.
     * 
     * @method get
     * @param {String}
     *          name Name
     * @param {String}
     *          type Type (optional)
     * @param {String}
     *          flavour Flavour (optional)
     * @param {String}
     *          color Color (optional, only relevant for monochrome icons)
     * @return {URI} The URI for the icon - or "undefined" if not known
     */
    this.get = function() {
    var name    = arguments[0];
    var type    = arguments[1];
    var flavour = arguments[2];
    var color   = arguments[3];
    if (!db[name])
      return undefined;
    if (!db[name][type])
      type = '*'; // undefined -> use default
    if (typeof db[name][type] === 'string')
    {
      type = db[name][type]; // redirect link
      if( type.split('/').length > 1 )
      {
        var all = type.split('/');
        type = all.shift();
        if( flavour === undefined ) 
          flavour = all.shift();
      }
    }
    if (!db[name][type][flavour])
      flavour = '*'; // undefined -> use default
    if (typeof db[name][type][flavour] === 'string')
    {
      flavour = db[name][type][flavour]; // redirect link
      if( flavour.split('/').length > 1 )
      {
        var all = flavour.split('/');
        flavour = all.shift();
        if( color === undefined ) 
          color = all.shift();
      }
    }
    if (!db[name][type][flavour][color])
      color = '*'; // undefined -> use default
      
    // handle a generic mapping function
    if (typeof db[name][type][flavour]['*'] === 'function')
      return db[name][type][flavour]['*'];
    
    if (typeof db[name][type][flavour][color] === 'string')
      color = db[name][type][flavour][color]; // redirect link

    return db[name][type][flavour][color];
  }

    this.getURI = function() {
    var i = this.get.apply(this, arguments);
    if (i)
      return i.uri;
  }

    /**
     * Return an icon DOM element.
     */
    this.getIconElement = function() {
    var i = this.get.apply(this, arguments);
    if (i) {
      var styling = arguments[4];
      if( i.icon && styling === undefined && typeof i !== 'function' )
        return i.icon;

      // fetch and cache image
      if( styling === undefined )
        styling = i.styling === undefined ? '' : ' style="' + i.styling + '"';
      else
        styling = ' style="' + styling + '"';
     
      var classes = 'icon'
      var iconclass = arguments[5];
      if( iconclass !== undefined) {
        classes = classes + ' custom_' + iconclass;
      }
      
      if( typeof i === 'function' )
      {
        i.icon = i( arguments[3], styling, classes, false );
      } else {
        i.icon = $('<img class="' + classes + '" src="' + i.uri + '"' + styling + '/>')[0];
      }
      return i.icon;
    }
  }
  
    /**
     * Return a String for the icon, e.g. build a DOM tree in a string before
     * passing it to ParseHTML. After the content was added to the DOM the
     * fillIcons method must be called to fill missing content (e.g. the <canvas>
     * icons.
     * @param {String}
     *          name Name
     * @param {String}
     *          type Type (optional)
     * @param {String}
     *          flavour Flavour (optional)
     * @param {String}
     *          color Color (optional, only relevant for monochrome icons)
     * @param {String}
     *          styling
     * @param {String}
     *          iconclass
     */
    this.getIconText = function() {
    var i = this.get.apply(this, arguments);
    if (i) {
      var styling = arguments[4];

      if( styling === undefined )
        styling = i.styling === undefined ? '' : ' style="' + i.styling + '"';
      else
        styling = ' style="' + styling + '"';
     
      var classes = 'icon'
      var iconclass = arguments[5];
      if( iconclass !== undefined) {
        classes = classes + ' custom_' + iconclass;
      }
      
      if( typeof i === 'function' )
      {
        return i( arguments[3], styling, classes, true );
      } else {
        return '<img class="' + classes + '" src="' + i.uri + '"' + styling + '/>';
      }
    }
  }
  
    /**
     * Fill the icons in the array.
     */
    this.fillIcons = function( array ) {
    array.each( function( thisIcon ){
      window.fillRecoloredIcon( thisIcon );
    });
  };

    /**
     * List all known icons
     * 
     * @method list
     * @return {Array} List of all known icon names
     */
    this.list = function() {
    return Object.keys(db);
  }

    /**
     * Return icon database for debuging purposes - use ONLY for debugging as it's
     * circumventing the data hiding and exposes a writeable reference to the
     * database object!
     * 
     * @method debug
     * @return {Object} The icon database
     */
    this.debug = function() {
    return db;
  }
  };

  window.icons = new icon();

});
