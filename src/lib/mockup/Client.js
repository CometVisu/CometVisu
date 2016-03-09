
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

    // make some functions accessible for the protactor runner
    window._receive = this.receive.bind(this);
    window._widgetDataGet = templateEngine.widgetDataGet.bind(templateEngine);

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
      window.lastWrite = {
        address: address,
        value:  value,
        ts: ts
      };

      // send update
      var answer = {
        i: ts,
        d: {}
      };
      answer.d[address] = value;
      this.receive(answer);
    };

    this.getLastWrite = function() {
      return this.lastWrite;
    };
  }

  CometVisu.prototype.update = function( json ) {};

  return CometVisu;
});