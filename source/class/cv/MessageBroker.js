/* MessageBroker.js 
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
 * Global MessageBroker for publishing/subscribing messages on defined topics
 *
 * @author Tobias Bräutigam
 * @since 0.10.0
 */
qx.Class.define('cv.MessageBroker', {
  extend: cv.Object,
  type: "singleton",

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    this.__registry = {};
    this.__singleEventTopics = ["setup.dom.finished"];
    this.__topicOrder = {
      '*': function (a, b) {
        return b[2] - a[2];
      }
    }
  },


  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __registry: null,
    __singleEventTopics: null,
    __topicOrder : null,

    subscribe: function (topic, callback, context, priority, once) {
      if (!this.__registry[topic]) {
        this.__registry[topic] = [];
      }
      this.__registry[topic].push([callback || this, context, priority || 0, once || false]);
      // sort by priority
      var sorter = this.__topicOrder[topic] ? this.__topicOrder[topic] : this.__topicOrder['*'];
      this.__registry[topic].sort(sorter);
    },

    publish: function (topic) {
      this.debug("publishing "+topic);
      if (this.__registry[topic]) {
        var remove = [];
        var args = Array.prototype.slice.call(arguments, 1);
        this.__registry[topic].forEach(function (entry, index) {
          entry[0].apply(entry[1], args);
          if (entry[3] === true) {
            remove.push(index);
          }
        });
        if (this.__singleEventTopics.indexOf(topic) >= 0) {
          // this is a single-fire event and can only be fired once -> delete listeners
          delete this.__registry[topic];
        }
        else {
          remove.forEach(function (index) {
            this.__registry[topic].splice(index, 1);
          }, this);
        }
      }
    },

    clear: function () {
      this.__registry = {};
    }
  }
});
