
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
        console.log(json.d);
        this.update( json.d );
      }
    };

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
      this.lastWrite = {
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