/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Author:
     * Gabriel Munteanu (gabios)

************************************************************************ */


/**
 * Data-* attribute handling for DOM HTML elements.
 *
 * This feature set is supported cross-browser
 * through one common interface and is independent of the differences between
 * the multiple implementations.
 *
 */
qx.Bootstrap.define("qx.bom.element.Dataset",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /**
     * Sets a data attribute on the given DOM element.
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute [CamelCase variant]
     * @param value {var} New value of the attribute
     */
    set : function(element, name, value) {
      if (element.dataset) {
        name = qx.lang.String.camelCase(name);
        if ((value === null) || (value == undefined)) {
           delete element.dataset[name];
        } else {
          element.dataset[name] = value;
        }
      } else {
        if ((value === null) || (value == undefined)) {
          qx.bom.element.Attribute.reset(element, "data-" + qx.lang.String.hyphenate(name));
        } else {
          qx.bom.element.Attribute.set(element, "data-" + qx.lang.String.hyphenate(name), value);
        }
      }
    },


    /**
     * Returns the value of the given HTML "data-*" attribute
     *
     * @param element {Element} The DOM element to query
     * @param name {String} Name of the attribute [CamelCase variant]
     * @return {var} The value of the attribute
     *
     */
    get : function(element, name) {
      if (element.dataset) {
        name = qx.lang.String.camelCase(name);
        return (!element.dataset[name] ? undefined : element.dataset[name]);
      } else {
        var attrName = "data-" + qx.lang.String.hyphenate(name);
        return element.hasAttribute(attrName) ?
          qx.bom.element.Attribute.get(element, attrName) : undefined;
      }
    },


    /**
     * Returns a map containing all the HTML "data-*" attributes of the specified element
     *
     * @param element {Element} The DOM element to query
     * @return {Map} The map containing all the "data-*" attributes
     */
    getAll : function(element) {
      if (element.dataset) {
        return element.dataset;
      } else {
        var res = {}, attr = element.attributes;
        for (var i=0; i < attr.length; i++) {
          if (attr[i].name.match(RegExp("^data-(.*)"))) {
            var key = RegExp.$1;
            res[qx.lang.String.camelCase(key)] = element.getAttribute(attr[i].name);
          }
        }
        return res;
      }
    },


    /**
    * Checks if any element in the collection has a "data-*" attribute
    * @param element {Element} The DOM Element to check the presence of data-* attributes on.
    * @return {Boolean} True if any element in the collection has a "data-*" attribute
    */
    hasData : function(element)
    {
      return Object.keys(qxWeb(element).getAllData()).length > 0;
    },


    /**
     * Remove an HTML "data-*" attribute from the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     */
    remove : function(element, name) {
      this.set(element, name, undefined);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

   ======================================================================

   This class uses ideas and code snippets presented at
   http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
   http://webreflection.blogspot.com/2008/05/stack-and-arrayobject-how-to-create.html

   Author:
     Andrea Giammarchi

   License:
     MIT: http://www.opensource.org/licenses/mit-license.php

   ======================================================================

   This class uses documentation of the native Array methods from the MDC
   documentation of Mozilla.

   License:
     CC Attribution-Sharealike License:
     http://creativecommons.org/licenses/by-sa/2.5/

************************************************************************ */

/**
 * This class is the common superclass for most array classes in
 * qooxdoo. It supports all of the shiny 1.6 JavaScript array features
 * like <code>forEach</code> and <code>map</code>.
 *
 * This class may be instantiated instead of the native Array if
 * one wants to work with a feature-unified Array instead of the native
 * one. This class uses native features whereever possible but fills
 * all missing implementations with custom ones.
 *
 * Through the ability to extend from this class one could add even
 * more utility features on top of it.
 *
 * @require(qx.bom.client.Engine)
 * @require(qx.lang.normalize.Array)
 */
qx.Bootstrap.define("qx.type.BaseArray",
{
  extend : Array,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a new Array with the given length or the listed elements.
   *
   * <pre class="javascript">
   * var arr1 = new qx.type.BaseArray(arrayLength);
   * var arr2 = new qx.type.BaseArray(item0, item1, ..., itemN);
   * </pre>
   *
   * * <code>arrayLength</code>: The initial length of the array. You can access
   * this value using the length property. If the value specified is not a
   * number, an array of length 1 is created, with the first element having
   * the specified value. The maximum length allowed for an
   * array is 2^32-1, i.e. 4,294,967,295.
   * * <code>itemN</code>:  A value for the element in that position in the
   * array. When this form is used, the array is initialized with the specified
   * values as its elements, and the array's length property is set to the
   * number of arguments.
   *
   * @param length_or_items {Integer|var?null} The initial length of the array
   *        OR an argument list of values.
   */
  construct : function(length_or_items) {},


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Converts a base array to a native Array
     *
     * @signature function()
     * @return {Array} The native array
     */
    toArray : null,

    /**
     * Returns the current number of items stored in the Array
     *
     * @signature function()
     * @return {Integer} number of items
     */
    valueOf : null,

    /**
     * Removes the last element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The last element of the array.
     */
    pop : null,

    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the end of the array.
     * @return {Integer} The new array's length
     */
    push : null,

    /**
     * Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {Array} Returns the modified array (works in place)
     */
    reverse : null,

    /**
     * Removes the first element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The first element of the array.
     */
    shift : null,

    /**
     * Sorts the elements of an array.
     *
     * This method modifies the array.
     *
     * @signature function(compareFunction)
     * @param compareFunction {Function?null} Specifies a function that defines the sort order. If omitted,
     *   the array is sorted lexicographically (in dictionary order) according to the string conversion of each element.
     * @return {Array} Returns the modified array (works in place)
     */
    sort : null,

    /**
     * Adds and/or removes elements from an array.
     *
     * @signature function(index, howMany, varargs)
     * @param index {Integer} Index at which to start changing the array. If negative, will begin
     *   that many elements from the end.
     * @param howMany {Integer} An integer indicating the number of old array elements to remove.
     *   If <code>howMany</code> is 0, no elements are removed. In this case, you should specify
     *   at least one new element.
     * @param varargs {var?null} The elements to add to the array. If you don't specify any elements,
     *   splice simply removes elements from the array.
     * @return {qx.type.BaseArray} New array with the removed elements.
     */
    splice : null,

    /**
     * Adds one or more elements to the front of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the front of the array.
     * @return {Integer} The new array's length
     */
    unshift : null,

    /**
     * Returns a new array comprised of this array joined with other array(s) and/or value(s).
     *
     * This method does not modify the array and returns a modified copy of the original.
     *
     * @signature function(varargs)
     * @param varargs {Array|var} Arrays and/or values to concatenate to the resulting array.
     * @return {qx.type.BaseArray} New array built of the given arrays or values.
     */
    concat : null,

    /**
     * Joins all elements of an array into a string.
     *
     * @signature function(separator)
     * @param separator {String} Specifies a string to separate each element of the array. The separator is
     *   converted to a string if necessary. If omitted, the array elements are separated with a comma.
     * @return {String} The stringified values of all elements divided by the given separator.
     */
    join : null,

    /**
     * Extracts a section of an array and returns a new array.
     *
     * @signature function(begin, end)
     * @param begin {Integer} Zero-based index at which to begin extraction. As a negative index, start indicates
     *   an offset from the end of the sequence. slice(-2) extracts the second-to-last element and the last element
     *   in the sequence.
     * @param end {Integer?length} Zero-based index at which to end extraction. slice extracts up to but not including end.
     *   <code>slice(1,4)</code> extracts the second element through the fourth element (elements indexed 1, 2, and 3).
     *   As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.
     *   If end is omitted, slice extracts to the end of the sequence.
     * @return {qx.type.BaseArray} An new array which contains a copy of the given region.
     */
    slice : null,

    /**
     * Returns a string representing the array and its elements. Overrides the Object.prototype.toString method.
     *
     * @signature function()
     * @return {String} The string representation of the array.
     */
    toString : null,

    /**
     * Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?0} The index at which to begin the search. Defaults to 0, i.e. the
     *   whole array will be searched. If the index is greater than or equal to the length of the
     *   array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as
     *   the offset from the end of the array. Note that even when the index is negative, the array
     *   is still searched from front to back. If the calculated index is less than 0, the whole
     *   array will be searched.
     * @return {Integer} The index of the given element
     */
    indexOf : null,

    /**
     * Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?length} The index at which to start searching backwards. Defaults to
     *   the array's length, i.e. the whole array will be searched. If the index is greater than
     *   or equal to the length of the array, the whole array will be searched. If negative, it
     *   is taken as the offset from the end of the array. Note that even when the index is
     *   negative, the array is still searched from back to front. If the calculated index is
     *   less than 0, -1 is returned, i.e. the array will not be searched.
     * @return {Integer} The index of the given element
     */
    lastIndexOf : null,

    /**
     * Executes a provided function once per array element.
     *
     * <code>forEach</code> executes the provided function (<code>callback</code>) once for each
     * element present in the array.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which
     * have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index
     * of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>forEach</code>, it will be used
     * as the <code>this</code> for each invocation of the <code>callback</code>.  If it is not
     * provided, or is <code>null</code>, the global object associated with <code>callback</code>
     * is used instead.
     *
     * <code>forEach</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>forEach</code> is set before the first invocation of
     * <code>callback</code>.  Elements which are appended to the array after the call to
     * <code>forEach</code> begins will not be visited by <code>callback</code>. If existing elements
     * of the array are changed, or deleted, their value as passed to <code>callback</code> will be
     * the value at the time <code>forEach</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to execute for each element.
     * @param obj {Object} Object to use as this when executing callback.
     */
    forEach : null,

    /**
     * Creates a new array with all elements that pass the test implemented by the provided
     * function.
     *
     * <code>filter</code> calls a provided <code>callback</code> function once for each
     * element in an array, and constructs a new array of all the values for which
     * <code>callback</code> returns a true value.  <code>callback</code> is invoked only
     * for indexes of the array which have assigned values; it is not invoked for indexes
     * which have been deleted or which have never been assigned values.  Array elements which
     * do not pass the <code>callback</code> test are simply skipped, and are not included
     * in the new array.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the
     * index of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>filter</code>, it will
     * be used as the <code>this</code> for each invocation of the <code>callback</code>.
     * If it is not provided, or is <code>null</code>, the global object associated with
     * <code>callback</code> is used instead.
     *
     * <code>filter</code> does not mutate the array on which it is called. The range of
     * elements processed by <code>filter</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to
     * <code>filter</code> begins will not be visited by <code>callback</code>. If existing
     * elements of the array are changed, or deleted, their value as passed to <code>callback</code>
     * will be the value at the time <code>filter</code> visits them; elements that are deleted
     * are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test each element of the array.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {qx.type.BaseArray} The newly created array with all matching elements
     */
    filter : null,

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * <code>map</code> calls a provided <code>callback</code> function once for each element in an array,
     * in order, and constructs a new array from the results.  <code>callback</code> is invoked only for
     * indexes of the array which have assigned values; it is not invoked for indexes which have been
     * deleted or which have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>map</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>map</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>map</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to <code>map</code>
     * begins will not be visited by <code>callback</code>.  If existing elements of the array are changed,
     * or deleted, their value as passed to <code>callback</code> will be the value at the time
     * <code>map</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function produce an element of the new Array from an element of the current one.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {qx.type.BaseArray} A new array which contains the return values of every item executed through the given function
     */
    map : null,

    /**
     * Tests whether some element in the array passes the test implemented by the provided function.
     *
     * <code>some</code> executes the <code>callback</code> function once for each element present in
     * the array until it finds one where <code>callback</code> returns a true value. If such an element
     * is found, <code>some</code> immediately returns <code>true</code>. Otherwise, <code>some</code>
     * returns <code>false</code>. <code>callback</code> is invoked only for indexes of the array which
     * have assigned values; it is not invoked for indexes which have been deleted or which have never
     * been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>some</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>some</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>some</code> is set before the first invocation of
     * <code>callback</code>.  Elements that are appended to the array after the call to <code>some</code>
     * begins will not be visited by <code>callback</code>. If an existing, unvisited element of the array
     * is changed by <code>callback</code>, its value passed to the visiting <code>callback</code> will
     * be the value at the time that <code>some</code> visits that element's index; elements that are
     * deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether at least one elements passed the test
     */
    some : null,

    /**
     * Tests whether all elements in the array pass the test implemented by the provided function.
     *
     * <code>every</code> executes the provided <code>callback</code> function once for each element
     * present in the array until it finds one where <code>callback</code> returns a false value. If
     * such an element is found, the <code>every</code> method immediately returns <code>false</code>.
     * Otherwise, if <code>callback</code> returned a true value for all elements, <code>every</code>
     * will return <code>true</code>.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which have
     * never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of
     * the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>every</code>, it will be used as
     * the <code>this</code> for each invocation of the <code>callback</code>. If it is not provided,
     * or is <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>every</code> does not mutate the array on which it is called. The range of elements processed
     * by <code>every</code> is set before the first invocation of <code>callback</code>. Elements which
     * are appended to the array after the call to <code>every</code> begins will not be visited by
     * <code>callback</code>.  If existing elements of the array are changed, their value as passed
     * to <code>callback</code> will be the value at the time <code>every</code> visits them; elements
     * that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether all elements passed the test
     */
    every : null
  }
});

(function() {

function createStackConstructor(stack)
{
  // In IE don't inherit from Array but use an empty object as prototype
  // and copy the methods from Array
  if ((qx.core.Environment.get("engine.name") == "mshtml"))
  {
    Stack.prototype = {
      length : 0,
      $$isArray : true
    };

    var args = "pop.push.reverse.shift.sort.splice.unshift.join.slice".split(".");

    for (var length = args.length; length;) {
      Stack.prototype[args[--length]] = Array.prototype[args[length]];
    }
  };

  // Remember Array's slice method
  var slice = Array.prototype.slice;

  // Fix "concat" method
  Stack.prototype.concat = function()
  {
    var constructor = this.slice(0);

    for (var i=0, length=arguments.length; i<length; i++)
    {
      var copy;

      if (arguments[i] instanceof Stack) {
        copy = slice.call(arguments[i], 0);
      } else if (arguments[i] instanceof Array) {
        copy = arguments[i];
      } else {
        copy = [arguments[i]];
      }

      constructor.push.apply(constructor, copy);
    }

    return constructor;
  };

  // Fix "toString" method
  Stack.prototype.toString = function(){
    return slice.call(this, 0).toString();
  };

  // Fix "toLocaleString"
  Stack.prototype.toLocaleString = function() {
    return slice.call(this, 0).toLocaleString();
  };

  // Fix constructor
  Stack.prototype.constructor = Stack;


  // Add JS 1.6 Array features
  Stack.prototype.indexOf = Array.prototype.indexOf;
  Stack.prototype.lastIndexOf = Array.prototype.lastIndexOf;
  Stack.prototype.forEach = Array.prototype.forEach;
  Stack.prototype.some = Array.prototype.some;
  Stack.prototype.every = Array.prototype.every;

  var filter = Array.prototype.filter;
  var map = Array.prototype.map;


  // Fix methods which generates a new instance
  // to return an instance of the same class
  Stack.prototype.filter = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, filter.apply(this, arguments));
    return ret;
  };

  Stack.prototype.map = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, map.apply(this, arguments));
    return ret;
  };

  Stack.prototype.slice = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, Array.prototype.slice.apply(this, arguments));
    return ret;
  };

  Stack.prototype.splice = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, Array.prototype.splice.apply(this, arguments));
    return ret;
  };

  // Add new "toArray" method for convert a base array to a native Array
  Stack.prototype.toArray = function() {
    return Array.prototype.slice.call(this, 0);
  };

  // Add valueOf() to return the length
  Stack.prototype.valueOf = function(){
    return this.length;
  };

  // Return final class
  return Stack;
}


function Stack(length)
{
  if(arguments.length === 1 && typeof length === "number") {
    this.length = -1 < length && length === length >> .5 ? length : this.push(length);
  } else if(arguments.length) {
    this.push.apply(this, arguments);
  }
};

function PseudoArray(){};
PseudoArray.prototype = [];
Stack.prototype = new PseudoArray;
Stack.prototype.length = 0;

qx.type.BaseArray = createStackConstructor(Stack);

})();
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * The Core module's responsibility is to query the DOM for elements and offer
 * these elements as a collection. The Core module itself does not offer any methods to
 * work with the collection. These methods are added by the other included modules,
 * such as Manipulating or Attributes.
 *
 * Core also provides the plugin API which allows modules to attach either
 * static functions to the global <code>q</code> object or define methods on the
 * collection it returns.
 *
 * By default, the core module is assigned to a global module named <code>q</code>.
 * In case <code>q</code> is already defined, the name <code>qxWeb</code>
 * is used instead.
 *
 * For further details, take a look at the documentation in the
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/website.html' target='_blank'>user manual</a>.
 *
 * @ignore(q)
 *
 * @group (Core)
 */
qx.Bootstrap.define("qxWeb", {
  extend : qx.type.BaseArray,
  statics : {
    // internal storage for all initializers
    __init : [],

    // internal reference to the used qx namespace
    $$qx : qx,

    /**
     * Internal helper to initialize collections.
     *
     * @param arg {var} An array of Elements which will
     *   be initialized as {@link q}. All items in the array which are not
     *   either a window object, a DOM element node or a DOM document node will
     *   be ignored.
     * @param clazz {Class} The class of the new collection.
     * @return {q} A new initialized collection.
     */
    $init : function(arg, clazz) {
      // restore widget instance
      if (arg.length && arg.length == 1 && arg[0] && arg[0].$widget instanceof qxWeb) {
        return arg[0].$widget;
      }

      var clean = [];
      for (var i = 0; i < arg.length; i++) {
        // check for node or window object
        var isNode = !!(arg[i] && (arg[i].nodeType === 1 ||
          arg[i].nodeType === 9 || arg[i].nodeType === 11));
        if (isNode) {
          clean.push(arg[i]);
          continue;
        }
        var isWindow = !!(arg[i] && arg[i].history && arg[i].location && arg[i].document);
        if (isWindow) {
          clean.push(arg[i]);
        }
      }

      if (arg[0] && arg[0].getAttribute && arg[0].getAttribute("data-qx-class") && clean.length < 2) {
        clazz = qx.Bootstrap.getByName(arg[0].getAttribute("data-qx-class")) || clazz;
      }

      var col = qx.lang.Array.cast(clean, clazz);
      for (var i=0; i < qxWeb.__init.length; i++) {
        qxWeb.__init[i].call(col);
      }

      return col;
    },


    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     * @param override {Boolean?false} Force to override
     */
    $attach : function(module, override) {
      for (var name in module) {
        if (qxWeb.prototype[name] != undefined && Array.prototype[name] == undefined && override !== true) {
          if (qx.core.Environment.get("qx.debug")) {
            throw new Error("Method '" + name + "' already available.");
          }
        } else {
          qxWeb.prototype[name] = module[name];
        }
      }
    },


    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     * @param override {Boolean?false} Force to override
     */
    $attachStatic : function(module, override) {
      for (var name in module) {
        if (qx.core.Environment.get("qx.debug")) {
          if (qxWeb[name] != undefined && override !== true) {
            throw new Error("Method '" + name + "' already available as static method.");
          }
        }
        qxWeb[name] = module[name];
      }
    },

    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q} during runtime according to the following conventions:
     *
     * Public members of the module are attached to the collection similar to
     * <code>qxWeb.$attach</code>. Members beginning with '$' or '_' are ignored.
     *
     * Statics of the module are attached to {@link q} similar to
     * <code>qxWeb.$attachStatic</code>. Statics beginning with '$' or '_', as well as constants
     * (all upper case) and some qooxdoo-internal statics of the module are ignored.
     *
     *
     * If more fine-grained control outside if these conventions is needed,
     * simply use <code>qxWeb.$attach</code> or <code>qxWeb$attachStatic</code>.
     *
     * @param clazz {Object} the qooxdoo class definition calling this method.
     * @param staticsNamespace {String?undefined} Specifies the namespace under which statics are attached to {@link q}.
     */
    $attachAll : function(clazz, staticsNamespace) {
      // members
      for (var name in clazz.members) {
        if (name.indexOf("$") !== 0 && name.indexOf("_") !== 0)
        qxWeb.prototype[name] = clazz.members[name];
      }

      // statics
      var destination;
      if (staticsNamespace != null) {
        qxWeb[staticsNamespace] = qxWeb[staticsNamespace] || {};
        destination = qxWeb[staticsNamespace];
      } else {
        destination = qxWeb;
      }

      for (var name in clazz.statics) {
        if (name.indexOf("$") !== 0 && name.indexOf("_") !== 0 && name !== "name" && name !== "basename" &&
            name !== "classname" && name !== "toString" && name !== name.toUpperCase())
        destination[name] = clazz.statics[name];
      }
    },


    /**
     * This is an API for module development and can be used to attach new initialization
     * methods to {@link q} which will be called when a new collection is
     * created.
     *
     * @param init {Function} The initialization method for a module.
     */
    $attachInit : function(init) {
      this.__init.push(init);
    },


    /**
     * Define a new class using the qooxdoo class system.
     *
     * @param name {String?} Name of the class. If null, the class will not be
     *   attached to a namespace.
     * @param config {Map ? null} Class definition structure. The configuration map has the following keys:
     *     <table>
     *       <thead>
     *         <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *       </thead>
     *       <tr><td>extend</td><td>Class</td><td>The super class the current class inherits from.</td></tr>
     *       <tr><td>construct</td><td>Function</td><td>The constructor of the class.</td></tr>
     *       <tr><td>statics</td><td>Map</td><td>Map of static values / functions of the class.</td></tr>
     *       <tr><td>members</td><td>Map</td><td>Map of instance members of the class.</td></tr>
     *       <tr><td>defer</td><td>Function</td><td>Function that is called at the end of
     *          processing the class declaration.</td></tr>
     *     </table>
     *
     * <strong>Important hint:</strong> Please do not initialize reference types
     * (<code>Object</code> or <code>Array</code>) directly inside the <strong>members</strong> section.
     * Only list and initialize it with <code>null</code>. Initialize your reference type inside the
     * <code>construct</code>. Check out one of the samples below to get the idea.
     * @return {Function} The defined class.
     */
    define : function(name, config) {
      if (config == undefined) {
        config = name;
        name = null;
      }
      return qx.Bootstrap.define.call(qx.Bootstrap, name, config);
    }
  },


  /**
   * Primary usage:
   * Accepts a selector string and returns a collection of found items. The optional context
   * element can be used to reduce the amount of found elements to children of the
   * context element. If the context object is a collection, its first item is used.
   *
   * Secondary usage:
   * Creates a collection from an existing DOM element, document node or window object
   * (or an Array containing any such objects)
   *
   * <a href="http://sizzlejs.com/" target="_blank">Sizzle</a> is used as selector engine.
   * Check out the <a href="https://github.com/jquery/sizzle/wiki/Sizzle-Home" target="_blank">documentation</a>
   * for more details.
   *
   * @param selector {String|Element|Document|Window|Array} Valid selector (CSS3 + extensions),
   *   window object, DOM element/document or Array of DOM Elements.
   * @param context {Element|q} Only the children of this element are considered.
   * @return {q} A collection of DOM elements.
   */
  construct : function(selector, context) {
    if (!selector && this instanceof qxWeb) {
      return this;
    }

    if (!selector) {
      selector = [];
    }
    else if (qx.Bootstrap.isString(selector)) {
      if (context instanceof qxWeb && context.length != 0) {
        context = context[0];
      }
      if (context instanceof qxWeb) {
        selector = [];
      } else {
        selector = qx.bom.Selector.query(selector, context);
      }
    }
    else if ((selector.nodeType === 1 || selector.nodeType === 9 ||
      selector.nodeType === 11) ||
      (selector.history && selector.location && selector.document))
    {
      selector = [selector];
    }
    return qxWeb.$init(selector, qxWeb);
  },


  members : {
    /**
     * Gets a new collection containing only those elements that passed the
     * given filter. This can be either a selector expression or a filter
     * function.
     *
     * @param selector {String|Function} Selector expression or filter function
     * @return {q} New collection containing the elements that passed the filter
     */
    filter : function(selector) {
      if (qx.lang.Type.isFunction(selector)) {
        return qxWeb.$init(Array.prototype.filter.call(this, selector), this.constructor);
      }
      return qxWeb.$init(qx.bom.Selector.matches(selector, this), this.constructor);
    },


    /**
     * Recreates a collection which is free of all duplicate elements from the original.
     *
     * @return {q} Returns a copy with no duplicates
     */
    unique : function() {
      var unique = qx.lang.Array.unique(this);
      return qxWeb.$init(unique, this.constructor);
    },


    /**
     * Returns a copy of the collection within the given range.
     *
     * @param begin {Number} The index to begin.
     * @param end {Number?} The index to end.
     * @return {q} A new collection containing a slice of the original collection.
     */
    slice : function(begin, end) {
      // Old IEs return an empty array if the second argument is undefined
      // check 'end' explicit for "undefined" [BUG #7322]
      if (end !== undefined) {
        return qxWeb.$init(Array.prototype.slice.call(this, begin, end), this.constructor);
      }
      return qxWeb.$init(Array.prototype.slice.call(this, begin), this.constructor);
    },


    /**
     * Removes the given number of items and returns the removed items as a new collection.
     * This method can also add items. Take a look at the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice' target='_blank'>documentation of MDN</a> for more details.
     *
     * @param index {Number} The index to begin.
     * @param howMany {Number} the amount of items to remove.
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing the removed items.
     */
    splice : function(index , howMany, varargs) {
      return qxWeb.$init(Array.prototype.splice.apply(this, arguments), this.constructor);
    },


    /**
     * Returns a new collection containing the modified elements. For more details, check out the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map' target='_blank'>MDN documentation</a>.
     *
     * @param callback {Function} Function which produces the new element.
     * @param thisarg {var} Context of the callback.
     * @return {q} New collection containing the elements that passed the filter
     */
    map : function(callback, thisarg) {
      return qxWeb.$init(Array.prototype.map.apply(this, arguments), qxWeb);
    },


    /**
     * Returns a copy of the collection including the given elements.
     *
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing all items.
     */
    concat : function(varargs) {
      var clone = Array.prototype.slice.call(this, 0);
      for (var i=0; i < arguments.length; i++) {
        if (arguments[i] instanceof qxWeb) {
          clone = clone.concat(Array.prototype.slice.call(arguments[i], 0));
        } else {
          clone.push(arguments[i]);
        }
      }
      return qxWeb.$init(clone, this.constructor);
    },


    /**
     * Returns the index of the given element within the current
     * collection or -1 if the element is not in the collection
     * @param elem {Element|Element[]|qxWeb} Element or collection of elements
     * @param fromIndex {Integer} The index to start the search at
     * @return {Number} The element's index
     */
    indexOf : function(elem, fromIndex) {
      if (!elem) {
        return -1;
      }

      if (!fromIndex) {
        fromIndex = 0;
      }

      if (typeof fromIndex !== "number") {
        return -1;
      }

      if (fromIndex < 0) {
        fromIndex = this.length + fromIndex;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      if (qx.lang.Type.isArray(elem)) {
        elem = elem[0];
      }

      for (var i = fromIndex, l = this.length; i<l; i++) {
        if (this[i] === elem) {
          return i;
        }
      }

      return -1;
    },


    /**
     * Calls the browser's native debugger to easily allow debugging within
     * chained calls.
     *
     * Unlike the <a href="#.logThis">logThis</a> method this implementation blocks the further processing.
     *
     * @return {q} The collection for chaining
     * @ignore(debugger)
     */
    debug : function() {
      if (qx.core.Environment.get("qx.debug")) {
        debugger;
      }
      return this;
    },


    /**
     * Logs information about the current collection, its DOM elements and the
     * length. Very useful during development to easily check the current state of
     * your collection and avoid common pitfalls like an empty collection.
     *
     * Unlike the <a href="#.debug">debug</a> method this implementation works non-blocking.
     *
     * @return {q} The collection for chaining
     *
     */
    logThis : function() {
      if (qx.core.Environment.get("qx.debug")) {

        // loop over the collection elements to make sure we get the current content
        // of the collection and not the reference values later (they might change depending on
        // manipulation of the collection)
        var elements = [];
        this.forEach(function(item) {
          elements.push(item);
        });

        var length = this.length;

        console.group("*** Collection infos ***");
        console.info("Length:", length);
        console.info("Elements:", elements);
        console.info("Instance:", this);
        console.groupEnd();
      }

      return this;
    },


    /**
     * Calls a function for each DOM element  or document fragment in the
     * collection. This is used for DOM manipulations which can't be
     * applied to document nodes or window objects.
     *
     * @param func {Function} Callback function. Will be called with three arguments:
     * The element, the element's index within the collection and the collection itself.
     * @param ctx {Object} The context for the callback function (default: The collection)
     * @return {q} The collection for chaining
     */
    _forEachElement : function(func, ctx) {
      for (var i=0, l=this.length; i<l; i++) {
        if (this[i] && (this[i].nodeType === 1 || this[i].nodeType === 11)) {
          func.apply(ctx || this, [this[i], i, this]);
        }
      }
      return this;
    },


    /**
     * Calls a function for each DOM element node in the collection. Each node is wrapped
     * in a collection before the function is called.
     *
     * @param func {Function} Callback function. Will be called with three arguments:
     * The element wrappend in a collection, the element's index within the collection and
     * the collection itself.
     * @param ctx {Object} The context for the callback function (default: The collection)
     * @return {q} The collection for chaining
     */
    _forEachElementWrapped : function(func, ctx) {
      this._forEachElement(function(item, idx, arr) {
        func.apply(this, [qxWeb(item), idx, arr]);
      }, ctx);
      return this;
    }
  },

  /**
   * @ignore(q)
   */
  defer : function(statics) {
    if (window.q == undefined) {
      window.q = statics;
    }
  }
});
