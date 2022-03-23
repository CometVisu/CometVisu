(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Carsten Lergenmueller (carstenl)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * An memory container which stores arbitrary data up to a maximum number of
   * entries. When new entries come in an the maximum is reached, the oldest
   * entries are deleted.
   *
   * A mark feature also exists which can be used to remember a point in time.
   * When retrieving entries, it is possible to get only those entries
   * after the marked time. This is useful if data from the buffer is extracted
   * and processed. Whenever this happens, a mark() call can be used so that the
   * next extraction will only get new data.
   */
  qx.Bootstrap.define("qx.util.RingBuffer", {
    extend: Object,

    /**
     * Constructor.
     *
     * @param maxEntries {Integer ? 50} Maximum number of entries in the buffer
     */
    construct: function construct(maxEntries) {
      this.setMaxEntries(maxEntries || 50);
    },
    members: {
      //Next slot in ringbuffer to use
      __P_474_0: 0,
      //Number of elements in ring buffer
      __P_474_1: 0,
      //Was a mark set?
      __P_474_2: false,
      //How many elements were stored since setting of mark?
      __P_474_3: 0,
      //ring buffer
      __P_474_4: null,
      //Maximum number of messages to store. Could be converted to a qx property.
      __P_474_5: null,

      /**
       * Set the maximum number of messages to hold. If null the number of
       * messages is not limited.
       *
       * Warning: Changing this property will clear the events logged so far.
       *
       * @param maxEntries {Integer} the maximum number of messages to hold
       */
      setMaxEntries: function setMaxEntries(maxEntries) {
        this.__P_474_5 = maxEntries;
        this.clear();
      },

      /**
       * Get the maximum number of entries to hold
       *
       * @return {Integer}
       */
      getMaxEntries: function getMaxEntries() {
        return this.__P_474_5;
      },

      /**
       * Adds a single entry
       *
       * @param entry {var} The data to store
       */
      addEntry: function addEntry(entry) {
        this.__P_474_4[this.__P_474_0] = entry;
        this.__P_474_0 = this.__P_474_6(this.__P_474_0, 1); //Count # of stored entries

        var max = this.getMaxEntries();

        if (this.__P_474_1 < max) {
          this.__P_474_1++;
        } //Count # of stored elements since last mark call


        if (this.__P_474_2 && this.__P_474_3 < max) {
          this.__P_474_3++;
        }
      },

      /**
       * Returns the number of entries stored
       * @return {Integer}
       */
      getNumEntriesStored: function getNumEntriesStored() {
        return this.__P_474_1;
      },

      /**
       * Remembers the current position in the ring buffer
       *
       */
      mark: function mark() {
        this.__P_474_2 = true;
        this.__P_474_3 = 0;
      },

      /**
       * Removes the current mark position
       */
      clearMark: function clearMark() {
        this.__P_474_2 = false;
      },

      /**
       * Returns all stored entries. Mark is ignored.
       *
       * @return {Array} array of stored entries
       */
      getAllEntries: function getAllEntries() {
        return this.getEntries(this.getMaxEntries(), false);
      },

      /**
       * Returns entries which have been added previously.
       *
       * @param count {Integer} The number of entries to retrieve. If there are
       *    more entries than the given count, the oldest ones will not be returned.
       *
       * @param startingFromMark {Boolean ? false} If true, only entries since
       *   the last call to mark() will be returned
       * @return {Array} array of stored entries
       */
      getEntries: function getEntries(count, startingFromMark) {
        //Trim count so it does not exceed ringbuffer size
        if (count > this.__P_474_1) {
          count = this.__P_474_1;
        } // Trim count so it does not exceed last call to mark (if mark was called
        // and startingFromMark was true)


        if (startingFromMark && this.__P_474_2 && count > this.__P_474_3) {
          count = this.__P_474_3;
        }

        if (count > 0) {
          var indexOfYoungestElementInHistory = this.__P_474_6(this.__P_474_0, -1);

          var startIndex = this.__P_474_6(indexOfYoungestElementInHistory, -count + 1);

          var result;

          if (startIndex <= indexOfYoungestElementInHistory) {
            //Requested segment not wrapping around ringbuffer boundary, get in one run
            result = this.__P_474_4.slice(startIndex, indexOfYoungestElementInHistory + 1);
          } else {
            //Requested segment wrapping around ringbuffer boundary, get two parts & concat
            result = this.__P_474_4.slice(startIndex, this.__P_474_1).concat(this.__P_474_4.slice(0, indexOfYoungestElementInHistory + 1));
          }
        } else {
          result = [];
        }

        return result;
      },

      /**
       * Clears all entries
       */
      clear: function clear() {
        this.__P_474_4 = new Array(this.getMaxEntries());
        this.__P_474_1 = 0;
        this.__P_474_3 = 0;
        this.__P_474_0 = 0;
      },

      /**
       * Adds a number to an ringbuffer index. Does a modulus calculation,
       * i. e. if the index leaves the ringbuffer space it will wrap around to
       * the other end of the ringbuffer.
       *
       * @param idx {Number} The current index.
       * @param addMe {Number} The number to add.
       * @return {Number} The new index
       */
      __P_474_6: function __P_474_6(idx, addMe) {
        var max = this.getMaxEntries();
        var result = (idx + addMe) % max; //If negative, wrap up into the ringbuffer space

        if (result < 0) {
          result += max;
        }

        return result;
      }
    }
  });
  qx.util.RingBuffer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RingBuffer.js.map?dt=1648073881050