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
  /**
   * Generate permutations of a map.
   */
  qx.Class.define("qx.util.Permutation", {
    statics: {
      /**
       * The first parameter is a map with array values. This function computes
       * all combinations of the array values and call the callback for each
       * combination.
       *
       * e.g. a value of
       * <pre class="javascript">
       *   {
       *     a: [1, 2],
       *     b: ["a", "b"]
       *   }
       * </pre>
       * would call the callback for each of these maps:
       * <pre class="javascript">
       *  { a: 1, b: "a" },
       *  { a: 1, b: "b" },
       *  { a: 2, b: "a" },
       *  { a: 2, b: "b" }
       * </pre>
       *
       * @param options {Map} map with array values to generate the permutations of
       * @param callback {Function} This callback is called for each permuted map
       * @param context {Object} The callback's <code>this</code> context.
       */
      permute: function permute(options, callback, context) {
        var keys = Object.keys(options);

        // init
        var map = {};
        var indices = [];
        for (var i = 0; i < keys.length; i++) {
          indices[i] = 0;
          var key = keys[i];
          map[key] = options[key][0];
        }
        var _perm2 = function _perm(index, ignore) {
          if (index >= keys.length) {
            return;
          }
          var key = keys[index];
          var values = options[key];
          for (var i = 0; i < values.length; i++) {
            if (ignore !== i) {
              indices[index] = i;
              map[key] = values[i];
              callback.call(context || window, map);
            }
            _perm2(index + 1, indices[index + 1]);
          }
        };
        _perm2(0, -1);
      }
    }
  });
  qx.util.Permutation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Permutation.js.map?dt=1735383884858