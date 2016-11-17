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
  Role("cv.role.HasAddress", {

    has: {
      address: { is: 'r', init: Joose.I.Object }
    },

    my: {
      after: {
        parse: function( xml, path, flavour, widgetType ) {
          if (xml.nodeName.toLowerCase() !== "page") {
            var data = templateEngine.widgetDataGet(path);
            data.address = this.makeAddressList($(xml), path);
          }
        }
      },

      methods: {
        /**
         * this function extracts all addresses with attributes (JNK)
         *                       elements. The first is a boolean that determins if
         *                       the visu should listen for that address. The second
         *                       is added as it is to the returned object.
         * @method makeAddressList
         * @param {} element
         * @param id             id / path to the widget
         * @return address
         */
        makeAddressList: function (element, id) {
          var address = {};
          var that = this;
          element.find('address').each(function () {
            var
              src = this.textContent,
              transform = this.getAttribute('transform'),
              formatPos = +(this.getAttribute('format-pos') || 1) | 0, // force integer
              mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite

            if ((!src) || (!transform)) // fix broken address-entries in config
              return;

            switch (this.getAttribute('mode')) {
              case 'disable':
                mode = 0;
                break;
              case 'read':
                mode = 1;
                break;
              case 'write':
                mode = 2;
                break;
              case 'readwrite':
                mode = 1 | 2;
                break;
            }
            var variantInfo = that.meta.methods['makeAddressListFn'] ? that.makeAddressListFn(src, transform, mode, this.getAttribute('variant')) : [true, undefined];
            if ((mode & 1) && variantInfo[0]) {// add only addresses when reading from them
              templateEngine.addAddress(src, id);
            }
            address[src] = [transform, mode, variantInfo[1], formatPos];
            return; // end of each-func
          });
          return address;
        }
      }
    }
  });
});