(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Config": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* HasStyling.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
  qx.Mixin.define('cv.ui.common.HasStyling', {
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      styling: {
        check: 'String',
        init: null,
        nullable: true
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      applyStyling: function applyStyling(value) {
        var sty = cv.Config.getStyling(this.getStyling());

        if (sty) {
          var e;
          this.getDomElement().querySelectorAll('.actor').forEach(function (element) {
            if (element.querySelector('.value') && e === undefined) {
              e = element;
            }
          });

          if (e) {
            e.classList.remove.apply(e.classList, sty.classnames.split(' ')); // remove only styling classes

            if (!this._findValue(value, false, e, sty) && sty.defaultValue !== undefined) {
              this._findValue(sty.defaultValue, true, e, sty);
            }
          }
        }
      },
      _findValue: function _findValue(value, findExact, element, styling) {
        if (undefined === value) {
          return false;
        }

        if (styling[value]) {
          // fixed value
          element.classList.add.apply(element.classList, styling[value].split(' '));
          return true;
        }

        var range = styling.range;

        if (findExact && range[value]) {
          element.classList.add.apply(element.classList, range[value][1].split(' '));
          return true;
        }

        var valueFloat = parseFloat(value);

        for (var min in range) {
          if (min > valueFloat) {
            continue;
          }

          if (range[min][0] < valueFloat) {
            continue;
          } // check max


          element.classList.add.apply(element.classList, range[min][1].split(' '));
          return true;
        }

        return false;
      }
    }
  });
  cv.ui.common.HasStyling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HasStyling.js.map?dt=1650269572470