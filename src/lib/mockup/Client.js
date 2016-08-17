/* Client.js 
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
 * Mockup simulating a backend + client for the Cometvisu protocol
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
define( [], function() {
  "use strict";

  function CometVisu(  )
  {
    /**
     * This function gets called once the communication is established and session information is available
     * @method handleRead
     */
    this.receive = function( json )
    {
      if( json )
      {
        this.update( json.d );
      }
    };

    this.login = function (loginOnly, callback, context) {
      if (callback) {
        callback.call(context);
      }
    };

    // make some functions accessible for the protactor runner
    window._receive = this.receive.bind(this);
    window._widgetDataGet = templateEngine.widgetDataGet.bind(templateEngine);
    window.writeHistory = [];

    /**
     * Subscribe to the addresses in the parameter
     * @method subscribe
     */
    this.subscribe = function( addresses )
    {
      this.addresses = addresses ? addresses : [];
    };

    /**
     * This function sends a value
     * @method write
     */
    this.write = function( address, value )
    {
      var ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      window.writeHistory.push({
        address: address,
        value:  value,
        ts: ts
      });

      // send update
      var answer = {
        i: ts,
        d: {}
      };
      answer.d[address] = value;
      this.receive(answer);
    };

    this.stop = function() {};
    
    this.getResourcePath = function(name) {
      return name;
    };
  }

  CometVisu.prototype.update = function( json ) {};

  return CometVisu;
});