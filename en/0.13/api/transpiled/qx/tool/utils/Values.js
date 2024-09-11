(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  qx.Class.define("qx.tool.utils.Values", {
    statics: {
      /**
       * Performs a binary search on the host array.
       *
       * Thanks to Oliver Caldwell for this snippet, https://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
       *
       * @param {*} array The array to search.
       * @param {*} searchElement The item to search for within the array.
       * @return {Number} The index of the element which defaults to -1 when not found.
       */
      binaryIndexOf: function binaryIndexOf(array, searchElement) {
        var minIndex = 0;
        var maxIndex = array.length - 1;
        var currentIndex;
        var currentElement;
        while (minIndex <= maxIndex) {
          currentIndex = (minIndex + maxIndex) / 2 | 0;
          currentElement = array[currentIndex];
          if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
          } else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
          } else {
            return currentIndex;
          }
        }
        return -1;
      },
      binaryStartsWith: function binaryStartsWith(array, searchElement) {
        var minIndex = 0;
        var maxIndex = array.length - 1;
        var currentIndex;
        var currentElement;
        while (minIndex <= maxIndex) {
          currentIndex = (minIndex + maxIndex) / 2 | 0;
          currentElement = array[currentIndex];
          if (currentElement.startsWith(searchElement)) {
            while (currentIndex > 0) {
              if (!array[currentIndex - 1].startsWith(searchElement)) {
                break;
              }
              currentIndex--;
            }
            return currentIndex;
          }
          if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
          } else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
          }
        }
        return -1;
      },
      merge: function merge(target) {
        for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          sources[_key - 1] = arguments[_key];
        }
        if (sources) {
          sources.forEach(function (src) {
            for (var key in src) {
              target[key] = src[key];
            }
          });
        }
        return target;
      }
    }
  });
  qx.tool.utils.Values.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Values.js.map?dt=1726089071941