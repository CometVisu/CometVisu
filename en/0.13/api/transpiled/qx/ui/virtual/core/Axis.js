(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The axis maps virtual screen coordinates to item indexes. By default all
   * items have the same size but it is also possible to give specific items
   * a different size.
   */
  qx.Class.define("qx.ui.virtual.core.Axis", {
    extend: qx.core.Object,
    /**
     * @param defaultItemSize {Integer} The default size of the items.
     * @param itemCount {Integer} The number of item on the axis.
     */
    construct: function construct(defaultItemSize, itemCount) {
      qx.core.Object.constructor.call(this);
      this.itemCount = itemCount;
      this.defaultItemSize = defaultItemSize;

      // sparse array
      this.customSizes = {};
    },
    events: {
      /** Every change to the axis configuration triggers this event. */
      change: "qx.event.type.Event"
    },
    members: {
      __P_704_0: null,
      /**
       * Get the default size of the items.
       *
       * @return {Integer} The default item size.
       */
      getDefaultItemSize: function getDefaultItemSize() {
        return this.defaultItemSize;
      },
      /**
       * Set the default size the items.
       *
       * @param defaultItemSize {Integer} The default size of the items.
       */
      setDefaultItemSize: function setDefaultItemSize(defaultItemSize) {
        if (this.defaultItemSize !== defaultItemSize) {
          this.defaultItemSize = defaultItemSize;
          this.__P_704_0 = null;
          this.fireNonBubblingEvent("change");
        }
      },
      /**
       * Get the number of items in the axis.
       *
       * @return {Integer} The number of items.
       */
      getItemCount: function getItemCount() {
        return this.itemCount;
      },
      /**
       * Set the number of items in the axis.
       *
       * @param itemCount {Integer} The new item count.
       */
      setItemCount: function setItemCount(itemCount) {
        if (this.itemCount !== itemCount) {
          this.itemCount = itemCount;
          this.__P_704_0 = null;
          this.fireNonBubblingEvent("change");
        }
      },
      /**
       * Sets the size of a specific item. This allow item, which have a size
       * different from the default size.
       *
       * @param index {Integer} Index of the item to change.
       * @param size {Integer} New size of the item.
       */
      setItemSize: function setItemSize(index, size) {
        if (this.customSizes[index] == size) {
          return;
        }
        if (size === null) {
          delete this.customSizes[index];
        } else {
          this.customSizes[index] = size;
        }
        this.__P_704_0 = null;
        this.fireNonBubblingEvent("change");
      },
      /**
       * Get the size of the item at the given index.
       *
       * @param index {Integer} Index of the item to get the size for.
       * @return {Integer} Size of the item.
       */
      getItemSize: function getItemSize(index) {
        // custom size of 0 is not allowed
        return this.customSizes[index] || this.defaultItemSize;
      },
      /**
       * Reset all custom sizes set with {@link #setItemSize}.
       */
      resetItemSizes: function resetItemSizes() {
        this.customSizes = {};
        this.__P_704_0 = null;
        this.fireNonBubblingEvent("change");
      },
      /**
       * Split the position range into disjunct intervals. Each interval starts
       * with a custom sized cell. Each position is contained in exactly one range.
       * The ranges are sorted according to their start position.
       *
       * Complexity: O(n log n) (n = number of custom sized cells)
       *
       * @return {Map[]} The sorted list of ranges.
       */
      __P_704_1: function __P_704_1() {
        if (this.__P_704_0) {
          return this.__P_704_0;
        }
        var defaultSize = this.defaultItemSize;
        var itemCount = this.itemCount;
        var indexes = [];
        for (var key in this.customSizes) {
          var index = parseInt(key, 10);
          if (index < itemCount) {
            indexes.push(index);
          }
        }
        if (indexes.length == 0) {
          var ranges = [{
            startIndex: 0,
            endIndex: itemCount - 1,
            firstItemSize: defaultSize,
            rangeStart: 0,
            rangeEnd: itemCount * defaultSize - 1
          }];
          this.__P_704_0 = ranges;
          return ranges;
        }
        indexes.sort(function (a, b) {
          return a > b ? 1 : -1;
        });
        var ranges = [];
        var correctionSum = 0;
        for (var i = 0; i < indexes.length; i++) {
          var index = indexes[i];
          if (index >= itemCount) {
            break;
          }
          var cellSize = this.customSizes[index];
          var rangeStart = index * defaultSize + correctionSum;
          correctionSum += cellSize - defaultSize;
          ranges[i] = {
            startIndex: index,
            firstItemSize: cellSize,
            rangeStart: rangeStart
          };
          if (i > 0) {
            ranges[i - 1].rangeEnd = rangeStart - 1;
            ranges[i - 1].endIndex = index - 1;
          }
        }

        // fix first range
        if (ranges[0].rangeStart > 0) {
          ranges.unshift({
            startIndex: 0,
            endIndex: ranges[0].startIndex - 1,
            firstItemSize: defaultSize,
            rangeStart: 0,
            rangeEnd: ranges[0].rangeStart - 1
          });
        }

        // fix last range
        var lastRange = ranges[ranges.length - 1];
        var remainingItemsSize = (itemCount - lastRange.startIndex - 1) * defaultSize;
        lastRange.rangeEnd = lastRange.rangeStart + lastRange.firstItemSize + remainingItemsSize - 1;
        lastRange.endIndex = itemCount - 1;
        this.__P_704_0 = ranges;
        return ranges;
      },
      /**
       * Returns the range, which contains the position
       *
       * Complexity: O(log n) (n = number of custom sized cells)
       *
       * @param position {Integer} The position.
       * @return {Map} The range, which contains the given position.
       */
      __P_704_2: function __P_704_2(position) {
        var ranges = this.__P_704_0 || this.__P_704_1();
        var start = 0;
        var end = ranges.length - 1;

        // binary search in the sorted ranges list
        while (true) {
          var pivot = start + (end - start >> 1);
          var range = ranges[pivot];
          if (range.rangeEnd < position) {
            start = pivot + 1;
          } else if (range.rangeStart > position) {
            end = pivot - 1;
          } else {
            return range;
          }
        }
      },
      /**
       * Get the item and the offset into the item at the given position.
       *
       * @param position {Integer|null} The position to get the item for.
       * @return {Map} A map with the keys <code>index</code> and
       *    <code>offset</code>. The index is the index of the item containing the
       *    position and offsets specifies offset into this item. If the position
       *    is outside of the range, <code>null</code> is returned.
       */
      getItemAtPosition: function getItemAtPosition(position) {
        if (position < 0 || position >= this.getTotalSize()) {
          return null;
        }
        var range = this.__P_704_2(position);
        var startPos = range.rangeStart;
        var index = range.startIndex;
        var firstItemSize = range.firstItemSize;
        if (startPos + firstItemSize > position) {
          return {
            index: index,
            offset: position - startPos
          };
        } else {
          var defaultSize = this.defaultItemSize;
          return {
            index: index + 1 + Math.floor((position - startPos - firstItemSize) / defaultSize),
            offset: (position - startPos - firstItemSize) % defaultSize
          };
        }
      },
      /**
       * Returns the range, which contains the position.
       *
       * Complexity: O(log n) (n = number of custom sized cells)
       *
       * @param index {Integer} The index of the item to get the range for.
       * @return {Map} The range for the index.
       */
      __P_704_3: function __P_704_3(index) {
        var ranges = this.__P_704_0 || this.__P_704_1();
        var start = 0;
        var end = ranges.length - 1;

        // binary search in the sorted ranges list
        while (true) {
          var pivot = start + (end - start >> 1);
          var range = ranges[pivot];
          if (range.endIndex < index) {
            start = pivot + 1;
          } else if (range.startIndex > index) {
            end = pivot - 1;
          } else {
            return range;
          }
        }
      },
      /**
       * Get the start position of the item with the given index.
       *
       * @param index {Integer} The item's index.
       * @return {Integer|null} The start position of the item. If the index is outside
       *    of the axis range <code>null</code> is returned.
       */
      getItemPosition: function getItemPosition(index) {
        if (index < 0 || index >= this.itemCount) {
          return null;
        }
        var range = this.__P_704_3(index);
        if (range.startIndex == index) {
          return range.rangeStart;
        } else {
          return range.rangeStart + range.firstItemSize + (index - range.startIndex - 1) * this.defaultItemSize;
        }
      },
      /**
       * Returns the sum of all cell sizes.
       *
       * @return {Integer} The sum of all item sizes.
       */
      getTotalSize: function getTotalSize() {
        var ranges = this.__P_704_0 || this.__P_704_1();
        return ranges[ranges.length - 1].rangeEnd + 1;
      },
      /**
       * Get an array of item sizes starting with the item at "startIndex". The
       * sum of all sizes in the returned array is at least "minSizeSum".
       *
       * @param startIndex {Integer} The index of the first item.
       * @param minSizeSum {Integer} The minimum sum of the item sizes.
       * @return {Integer[]} List of item sizes starting with the size of the item
       *    at index <code>startIndex</code>. The sum of the item sizes is at least
       *    <code>minSizeSum</code>.
       */
      getItemSizes: function getItemSizes(startIndex, minSizeSum) {
        var customSizes = this.customSizes;
        var defaultSize = this.defaultItemSize;
        var sum = 0;
        var sizes = [];
        var i = 0;
        while (sum < minSizeSum) {
          var itemSize = customSizes[startIndex] != null ? customSizes[startIndex] : defaultSize;
          startIndex++;
          sum += itemSize;
          sizes[i++] = itemSize;
          if (startIndex >= this.itemCount) {
            break;
          }
        }
        return sizes;
      }
    },
    destruct: function destruct() {
      this.customSizes = this.__P_704_0 = null;
    }
  });
  qx.ui.virtual.core.Axis.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Axis.js.map?dt=1735341800427