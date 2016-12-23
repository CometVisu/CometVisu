/* HasAddress.js 
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
 * Add the address property including its parsing to widgets
 */
qx.Mixin.define("cv.role.HasAddress", {

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    /**
     *
     */
    address: {
      check: 'Object',
      init: {}
    }
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    // this might have been called from the cv.xml.Parser with the including class as context
    /**
     * Parses the address element
     * @param xml {Element} address XML-Element from config
     * @param path {String} path to the widget
     */
    parse: function (xml, path) {
      if (xml.nodeName.toLowerCase() !== "page") {
        var data = cv.data.Model.getInstance().getWidgetData(path);
        data.address = cv.role.HasAddress.makeAddressList(xml, path, this.makeAddressListFn);
      }
    },

    /**
     * this function extracts all addresses with attributes (JNK)
     *                       elements. The first is a boolean that determins if
     *                       the visu should listen for that address. The second
     *                       is added as it is to the returned object.
     *
     * @param element {Element} address XML-Element from the config file
     * @param id {String} id / path to the widget
     * @param makeAddressListFn {Function?} callback for parsing address variants
     * @return {Object} address
     */
    makeAddressList: function (element, id, makeAddressListFn) {
      var address = {};
      qx.bom.Selector.query('address', element).forEach(function (elem) {
        var
          src = elem.textContent,
          transform = qx.bom.element.Attribute.get(elem, 'transform'),
          formatPos = +(qx.bom.element.Attribute.get(elem, 'format-pos') || 1) | 0, // force integer
          mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite

        if ((!src) || (!transform)) // fix broken address-entries in config
          return;

        switch (qx.bom.element.Attribute.get(elem, 'mode')) {
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
        var variantInfo = makeAddressListFn ? makeAddressListFn(src, transform, mode, qx.bom.element.Attribute.get(elem, 'variant')) : [true, undefined];
        if ((mode & 1) && variantInfo[0]) {// add only addresses when reading from them
          cv.data.Model.getInstance().addAddress(src, id);
        }
        address[src] = [transform, mode, variantInfo[1], formatPos];
      }, this);
      return address;
    }
  }
});