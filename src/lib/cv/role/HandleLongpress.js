/* _common.js
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

define(['joose'], function() {
  Role("cv.role.HandleLongpress", {

    has: {
      shortThreshold: { is: 'r', init: -1 },
      shortIsDefault: false, // is true use short value if no threshold is set, otherwise use long
      $$downActionTriggered: -1,
      $$pressTime: -1
    },

    before: {

      downaction: function() {
        this.$$downActionTriggered = Date.now();
      },

      action: function() {
        if (this.$$downActionTriggered > 0) {
          this.$$pressTime = Date.now() - this.$$downActionTriggered;
        } else {
          this.$$pressTime = -1;
        }
        this.$$downActionTriggered = -1;
      }
    },

    methods: {

      isShortPress: function() {
        if (this.shortThreshold < 0) {
          return this.shortIsDefault === true;
        } else {
          return this.$$pressTime < this.shortThreshold;
        }
      },

      isLongPress: function() {
        if (this.shortThreshold < 0) {
          return this.shortIsDefault === false;
        } else {
          return this.$$pressTime >= this.shortThreshold;
        }
      }
    }
  });
});