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


define( [
  'joose'
], function() {
  "use strict";
  var c = 0;

  Class('cv.structure.WidgetFactory', {
    my : {
      has : {
        registry: { is: 'rw', init: Joose.I.Object }
      },

      methods: {
        createInstance: function(type, data) {
          if (!this.registry[data.path]) {
            data.$$id = c;
            if (!cv.structure.pure[Joose.S.uppercaseFirst(type)]) {
              // try to find it via parser handler
              var handler = cv.xml.Parser.getHandler(type);
              if (handler) {
                this.registry[data.path] = new handler(data);
              } else {
                console.error("No handler found for type '%s'", type);
                return null;
              }
            } else {
              this.registry[data.path] = new cv.structure.pure[Joose.S.uppercaseFirst(type)](data);
            }
            c++;
          }
          return this.registry[data.path];
        },

        getInstanceById: function(id) {
          return this.registry[id];
        },

        clear: function() {
          this.registry = {};
        }
      }
    }
  })
}); // end define