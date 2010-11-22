/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * Class that handles the communicaton of the client
 */
function CometVisu( urlPrefix )
{
  this.urlPrefix = (null == urlPrefix) ? '' : urlPrefix; // the address of the service
  this.addresses = [];                                   // the subscribed addresses
  this.filters   = [];                                   // the subscribed filters
  this.user   = '';                                      // the current user
  this.pass   = '';                                      // the current password
  this.device = '';                                      // the current device ID
  this.running = false;                                  // is the communication running at the moment?
  this.xhr     = false;                                  // the ongoing AJAX request
  
  /**
   * This function gets called once the communication is established and session information is available
   */
  this.handleSession = function( json )
  {
    this.session = json.s; 
    this.version = json.v.split( '.', 3 );

    if( 0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1]) ) 
      alert( 'ERROR CometVisu Client: too new protocoll version (' + json.v + ') used!' );

    // send first request
    this.running = true;
    this.xhr = $.ajax( {url:this.urlPrefix + 'r',dataType: 'json',context:this,data:this.buildRequest()+'&t=0', success:this.handleRead ,error:this.handleError/*,complete:this.handleComplete*/ } );
  };

  /**
   * This function gets called once the communication is established and session information is available
   */
  this.handleRead = function( json )
  {
    if( !json )
    {
      if( this.running )
      { // retry initial request
        this.xhr = $.ajax( {url:this.urlPrefix + 'r',dataType: 'json',context:this,data:this.buildRequest()+'&t=0', success:this.handleRead ,error:this.handleError/*,complete:this.handleComplete*/ } );
      }
      return;
    }

    var lastIndex = json.i;
    var data      = json.d;
    this.update( data );

    if( this.running )
    { // keep the requests going
      this.xhr = $.ajax( {url:this.urlPrefix + 'r',dataType: 'json',context:this,data:this.buildRequest()+'&i='+lastIndex, success:this.handleRead ,error:this.handleError/*,complete:this.handleComplete*/ } );
    }
  };

  /**
   * This function gets called on an error
   * FIXME: this should be a prototype, so that the application developer can override it
   */
  this.handleError=function(xhr,str,excptObj)
  {
    if( this.running && xhr.readyState != 4 ) // ignore error when connection is irrelevant
    {
      var readyState = 'UNKNOWN';
      switch( xhr.readyState )
      {
        case 0: readyState = 'UNINITIALIZED'; break;
        case 1: readyState = 'LOADING'      ; break;
        case 2: readyState = 'LOADED'       ; break;
        case 3: readyState = 'INTERACTIVE'  ; break;
        case 4: readyState = 'COMPLETED'    ; break;
      }
      alert('Error! Type: "'+str+'" ExceptionObject: "'+excptObj+'" readyState: '+readyState);
    }
  }
  this.handleComplete=function(xhr,str)
  {
  //  alert('Complete:"'+str+'"');
  }

  /**
   * Build the URL part that contains the addresses and filters
   */
  this.buildRequest = function()
  {
    var requestAddresses = (this.addresses.length)?'a=' + this.addresses.join( '&a=' ):'';
    var requestFilters   = (this.filters.length  )?'f=' + this.filters.join(   '&f=' ):'';
    return requestAddresses + ( (this.addresses.length&&this.filters.length)?'&':'' ) + requestFilters;
  }

  /**
   * Subscribe to the addresses in the parameter
   * The second parameter (filter) is optional
   */
  this.subscribe = function( addresses, filters )
  {
    var startCommunication = !this.addresses.length; // start when addresses were empty
    this.addresses = addresses;
    this.filters   = filters ? filters : []  ;

    if( !addresses.length ) this.stop();             // stop when new addresses are empty
    else if( startCommunication ) this.login();
  }

  /**
   * This function starts the communication by a login and then runs the
   * ongoing communication task 
   */
  this.login = function()
  {
    var request = {};
    if( '' != this.user   ) request.u = this.user;
    if( '' != this.pass   ) request.p = this.pass;
    if( '' != this.device ) request.d = this.device;
    $.ajax( {url:this.urlPrefix + 'l',dataType: 'json',context:this,data:request, success:this.handleSession} );
  };

  /**
   * This function stops an ongoing connection
   */
  this.stop = function()
  {
    this.running = false;
    this.xhr.abort();
    //alert('this.stop');
  };

  /**
   * This function sends a value
   */
  this.write = function( address, value, datatype ) // FIXME datatype not in spec!!!
  {
    //var request = {};
    //request.a = address; // FIXME the spec allows multiple addresses
    //request.v = value;
var request = 'a=' + address + '&v=' + value;
datatype = datatype.split('.');
request += '&d=' + datatype[0]; // FIXME datatype not in spec!!!
    $.ajax( {url:this.urlPrefix + 'w',dataType: 'json',context:this,data:request} );
//alert( 'write to "' + address + '" value "' + value + '"' );
  }
};

CometVisu.prototype.update = function( json ) {}
