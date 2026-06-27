(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* MVisibility.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   * Detects dom elements visibility
   * @ignore(IntersectionObserver)
   */
  qx.Mixin.define('cv.ui.structure.tile.MVisibility', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      this._observeVisibility();
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      observer: null
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      visible: {
        check: 'Boolean',
        init: false,
        event: 'changeVisible'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _observeVisibility: function _observeVisibility() {
        if (this._element) {
          if (!cv.ui.structure.tile.MVisibility.observer) {
            cv.ui.structure.tile.MVisibility.observer = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                if (entry.target._instance) {
                  entry.target._instance.setVisible(entry.isIntersecting);
                }
              });
            }, {
              root: document.querySelector('body > main')
            });
          }
          cv.ui.structure.tile.MVisibility.observer.observe(this._element);
        } else {
          this.warn('no element to observe defined');
        }
      },
      _unobserveVisibility: function _unobserveVisibility() {
        if (this._element) {
          cv.ui.structure.tile.MVisibility.observer.unobserve(this._element);
        }
      }
    },
    destruct: function destruct() {
      this._unobserveVisibility();
    }
  });
  cv.ui.structure.tile.MVisibility.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MVisibility.js.map?dt=1782595048568