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
 * The JavaScript library that implements the CometVisu protocol.
 * @module CometVisu Client
 * @title  CometVisu Client
 * @reqires jQuery
*/
define( [], function() {
  "use strict";
  
/**
 * Class that handles the communicaton of the client
 * @class CometVisu
 * @constructor foo
 * @param {String} urlPrefix The address of the service
 */
function CometVisu( urlPrefix )
{
  var thisCometVisu = this;
  this.urlPrefix = (null == urlPrefix) ? '' : urlPrefix; // the address of the service
  this.addresses = [];                                   // the subscribed addresses
  this.initialAddresses = [];                            // the addresses which should be loaded before the subscribed addresses
  this.filters   = [];                                   // the subscribed filters
  this.user   = '';                                      // the current user
  this.pass   = '';                                      // the current password
  this.device = '';                                      // the current device ID
  this.running = false;                                  // is the communication running at the moment?
  this.doRestart = false;                                // are we currently in a restart, e.g. due to the watchdog
  this.xhr     = false;                                  // the ongoing AJAX request
  this.watchdogTimer = 5;                                // in Seconds - the alive check interval of the watchdog
  this.maxConnectionAge = 60;                            // in Seconds - restart if last read is older
  this.maxDataAge       = 3200;                          // in Seconds - reload all data when last successful read is older 
                                                         // (should be faster than the index overflow at max data rate, i.e. 2^16 @ 20 tps for KNX TP)
  this.lastIndex        = -1;                            // index returned by the last request
  this.resendHeaders = [];                               // keep the e.g. atmosphere tracking-id id there is one
  this.headers = [];                                     // fixed headers that are send everytime
  this.retryCounter = 0;                                 // count number of retries (reset with each valid response)
    
  this.setInitialAddresses = function(addresses) {
    this.initialAddresses = addresses;
  }
  
  /**
   * This function gets called once the communication is established and session information is available
   * @method handleSession
   */
  this.handleSession = function( json )
  {
    this.session = json.s; 
    this.version = json.v.split( '.', 3 );

    if( 0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1]) ) 
      alert( 'ERROR CometVisu Client: too new protocol version (' + json.v + ') used!' );

    // send first request
    this.running = true;
    if (this.initialAddresses.length) {
      this.xhr = $.ajax({
        url:        this.urlPrefix + 'r',
        dataType:   'json',
        context:    this,
        data:       this.buildRequest( this.initialAddresses ) + '&t=0',
        success:    this.handleReadStart,
        beforeSend: this.beforeSend
      });
    }
    else {
      // old behaviour -> start full query
      this.xhr = $.ajax({
        url:        this.urlPrefix + 'r',
        dataType:   'json',
        context:    this,
        data:       this.buildRequest() + '&t=0',
        success:    this.handleRead,
        error:      this.handleError,
        beforeSend: this.beforeSend
      });
    }
  };

  /**
   * This function gets called once the communication is established and session information is available
   * @method handleRead
   */
  this.handleRead = function( json )
  {
    if( this.doRestart || (!json && (-1 == this.lastIndex)) )
    {
      if( this.running )
      { // retry initial request
        this.retryCounter++;
        this.xhr = $.ajax({
          url:this.urlPrefix + 'r',
          dataType:   'json',
          context:    this,
          data:       this.buildRequest() + '&t=0',
          success:    this.handleRead,
          error:      this.handleError,
          beforeSend: this.beforeSend
        });
        watchdog.ping();
      }
      return;
    }

    if( json && !this.doRestart )
    {
      this.lastIndex = json.i;
      var data       = json.d;
      this.readResendHeaderValues();
      this.update( data );
      this.retryCounter = 0;
    }

    if( this.running )
    { // keep the requests going
      this.retryCounter++;
      this.xhr = $.ajax({
        url:        this.urlPrefix + 'r',
        dataType:   'json',
        context:    this,
        data:       this.buildRequest() + '&i=' + this.lastIndex,
        success:    this.handleRead,
        error:      this.handleError,
        beforeSend: this.beforeSend
      });
      watchdog.ping();
    }
  };
  
  this.handleReadStart = function( json )
  {
    if( !json && (-1 == this.lastIndex) )
    {
      if( this.running )
      { // retry initial request
        this.xhr = $.ajax({
          url:        this.urlPrefix + 'r',
          dataType:   'json',
          context:    this,
          data:       this.buildRequest( this.initialAddresses ) + '&t=0',
          success:    this.handleReadStart,
          beforeSend: this.beforeSend
        });
        watchdog.ping();
      }
      return;
    }
    if( json && !this.doRestart  )
    {
      this.readResendHeaderValues();
      this.update( json.d );
    }
    if( this.running )
    { // keep the requests going, but only request addresses-startPageAddresses
      var diffAddresses = [];
      for(var i=0;i<this.addresses.length;i++) {
        if ($.inArray(this.addresses[i],this.initialAddresses)<0)
          diffAddresses.push(this.addresses[i]);
      }
      this.xhr = $.ajax({
        url:        this.urlPrefix + 'r',
        dataType:   'json',
        context:    this,
        data:       this.buildRequest( diffAddresses ) + '&t=0',
        success:    this.handleRead,
        error:      this.handleError,
        beforeSend: this.beforeSend
      });
      watchdog.ping();
    }
  };

  /**
   * This function gets called on an error
   * FIXME: this should be a prototype, so that the application developer can override it
   * @method handleError
   */
  this.handleError=function(xhr,str,excptObj)
  {
    if( this.running && xhr.readyState != 4 && !this.doRestart && xhr.status!==0 ) // ignore error when connection is irrelevant
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
  
  /**
  * manipulates the header of the current ajax query before it is been send to the server
  */
  this.beforeSend = function( xhr ) {
    for (var headerName in this.resendHeaders) {
      if (this.resendHeaders[headerName]!=undefined)
        xhr.setRequestHeader(headerName,this.resendHeaders[headerName]);
    }
    for (var headerName in this.headers) {
      if (this.headers[headerName]!=undefined)
        xhr.setRequestHeader(headerName,this.headers[headerName]);
    }
  }
  
  /**
  * read the header values of a response and stores them to the resendHeaders array
  * @method readResendHeaderValues
  */
  this.readResendHeaderValues = function() {
    for (var headerName in this.resendHeaders) {
      this.resendHeaders[headerName] = this.xhr.getResponseHeader(headerName);
    }
  }

  /**
   * Build the URL part that contains the addresses and filters
   * @method buildRequest
   */
  this.buildRequest = function(addresses)
  {
    addresses = addresses ? addresses : this.addresses;
    var requestAddresses = (addresses.length)?'a=' + addresses.join( '&a=' ):'';
    var requestFilters   = (this.filters.length  )?'f=' + this.filters.join(   '&f=' ):'';
    return 's=' + this.session + '&' + requestAddresses + ( (addresses.length&&this.filters.length)?'&':'' ) + requestFilters;
  }

  /**
   * Subscribe to the addresses in the parameter
   * The second parameter (filter) is optional
   * @method subscribe
   */
  this.subscribe = function( addresses, filters )
  {
    var startCommunication = !this.addresses.length; // start when addresses were empty
    this.addresses= addresses ? addresses : [];
    this.filters   = filters ? filters : []  ;

    if( !addresses.length ) this.stop();             // stop when new addresses are empty
    else if( startCommunication ) this.login();
  }

  /**
   * This function starts the communication by a login and then runs the
   * ongoing communication task
   * @method login
   */
  this.login = function()
  {
    var request = {};
    if( '' != this.user   ) request.u = this.user;
    if( '' != this.pass   ) request.p = this.pass;
    if( '' != this.device ) request.d = this.device;
    $.ajax({
      url:      this.urlPrefix + 'l',
      dataType: 'json',
      context:  this,
      data:     request,
      success:  this.handleSession
    });
  };

  /**
   * This function stops an ongoing connection
   * @method stop
   */
  this.stop = function()
  {
    this.running = false;
    this.abort();
    //alert('this.stop');
  };

  /**
   * This function sends a value
   * @method write
   */
  this.write = function( address, value )
  {
    /**
     * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
     * could maybe selective based on UserAgent but isn't that costly on writes
     */
    var ts = new Date().getTime();
    $.ajax({
      url:      this.urlPrefix + 'w',
      dataType: 'json',
      context:  this,
      data:     's=' + this.session + '&a=' + address + '&v=' + value + '&ts=' + ts
    });
  }
  
  /**
   * Restart the read request, e.g. when the watchdog kicks in
   * @method restart
   */
  this.restart = function()
  {
    this.doRestart = true;
    this.abort();
    this.handleRead(); // restart
    this.doRestart = false;
  }
   /**
   * Abort the read request properly
   * @method restart
   */
  this.abort=function() {
    if( this.xhr.abort ) {
      this.xhr.abort();
      if (this.urlPrefix=="/services/cv/") {
        // send an close request to the openHAB server
        var oldValue = this.headers["X-Atmosphere-Transport"];
        this.headers["X-Atmosphere-Transport"]="close";
        $.ajax( {url:this.urlPrefix + 'r',dataType: 'json',context:this,beforeSend:this.beforeSend } );
        if (oldValue!=undefined)
          this.headers["X-Atmosphere-Transport"]=oldValue;
        else
          delete this.headers["X-Atmosphere-Transport"];
      }
    }
  }
  
  /**
   * The watchdog to recreate a read request when it stopped somehow
   * @method watchdog
   */
  var watchdog = (function(){
    var last = new Date();
    var hardLast = last;
    var aliveCheckFunction = function(){
      var now = new Date();
      if( now - last < thisCometVisu.maxConnectionAge * 1000 ) return;
      if( now - hardLast > thisCometVisu.maxDataAge * 1000 ) thisCometVisu.lastIndex = -1; // reload all data
      thisCometVisu.restart();
      last = now;
    };
    var aliveHandler = setInterval( aliveCheckFunction, thisCometVisu.watchdogTimer * 1000 );
    return {
      ping: function(){
        //delete last;
        last = new Date();
        if( !thisCometVisu.doRestart )
        {
          //delete hardLast;
          hardLast = last;
        }
      }
    };
  })();
};

CometVisu.prototype.update = function( json ) {};

  return CometVisu;
});