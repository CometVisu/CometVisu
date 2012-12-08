//
//  Icon handler for the CometVisu.
//
//   Copyright (C) 2012 by Christian Mayer
//   cometvisu (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////

(function( window, undefined ){
  ////////////////////////////////////////////////////////////////////////////
  // private static variables and methods:
  
  // ... none ...
  
  ////////////////////////////////////////////////////////////////////////////
  // the library
  
  /**
   * The object "icon" contains the whole API necessary to handle the icons.
   * @class icon
   * @constructor FOO
   */
  var icon = function(){
    // check and fix if the user forgot the "new" keyword
    if (!(this instanceof icon)) 
    {
      return new icon();
    }
    
    ////////////////////////////////////////////////////////////////////////////
    // Definition of the private variables
    
    /**
     * Private pointer to <i>this</i>
     * @property self
     * @private
     */
    var self = this;
    
    /**
     * Internal database of the known icons
     * @property db
     * @private
     */
    var db = {};
    
    ////////////////////////////////////////////////////////////////////////////
    // Definition of the public variables
    
    /* ... */
    
    ////////////////////////////////////////////////////////////////////////////
    // Definition of the private methods
    
    /* ... */
    
    ////////////////////////////////////////////////////////////////////////////
    // Definition of the public methods
    
    /**
     * Insert or overwrite one or many icons into the database.
     * The parameter might be a full hash of icon definitions or a single one
     * consisting out of a name and a URI path. Optional further parameters
     * are a "type" and a flavour.
     */
    this.insert = function()
    {
      if( 1 == arguments.length && 'object' == typeof arguments[0] )
      {
        // a full hash was given => merge in database
        $.extend( db, arguments[0] );
        return;
      }
      // otherwise: insert a single entry
      var name    = arguments[0];
      var uri     = arguments[1];
      var type    = arguments[2] || '*';
      var flavour = arguments[3] || '*';
      var style   = arguments[4];
      
      if( ! db[ name ]         ) db[ name ]         = {};
      if( ! db[ name ][ type ] ) db[ name ][ type ] = {};
 
      db[ name ][ type ][ flavour ] = { uri: uri, style: style };
    }

    /**
     * Get the icon information for a name.
     * @method get
     * @param {String} name Name
     * @param {String} type Type (optional)
     * @param {String} flavour Flavour (optional)
     * @return {URI} The URI for the icon - or "undefined" if not known
     */
    this.get = function()
    {
      var name    = arguments[0];
      var type    = arguments[1];
      var flavour = arguments[2];
      
      if( !db[ name ]                    ) return undefined;
      if( !db[ name ][ type ]            ) type    = '*';                                              // undefined -> use default
      if( typeof db[ name ][ type ]            === 'string' ) type    = db[ name ][ type ];            // redirect link
      if( !db[ name ][ type ][ flavour ] ) flavour = '*';                                              // undefined -> use default
      if( typeof db[ name ][ type ][ flavour ] === 'string' ) flavour = db[ name ][ type ][ flavour ]; // redirect link
 
      return db[ name ][ type ][ flavour ];
    }
    
    this.getURI = function()
    {
      var i = this.get.apply( this, arguments );
      if( i ) return i.uri;
    }
    
    this.getIcon = function()
    {
      var i = this.get.apply( this, arguments );
      if( i )
      {
        if( i.icon ) return i.icon;
 
        // fetch and cache image
        i.icon = $( '<img class="icon" src="' + i.uri + '" ' + ( i.style ? 'style="' + i.style + '" ' : '' ) + '/>' );
        return i.icon;
      }
    }
    
    /**
     * List all known icons
     * @method list
     * @return {Array} List of all known icon names
     */
    this.list = function()
    {
      return Object.keys( db );
    }
    
    /**
     * Return icon database for debuging purposes - use ONLY for debugging as
     * it's circumventing the data hiding and exposes a writeable reference
     * to the database object!
     * @method debug
     * @return {Object} The icon database
     */
    this.debug = function()
    {
      return db;
    }
  }

  //Expose icon handler object to window
  window.icon = icon;
})(window);
