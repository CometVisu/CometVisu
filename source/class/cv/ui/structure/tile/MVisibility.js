/* MVisibility.js
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

/**
 * Detects dom elements visibility
 * @ignore(IntersectionObserver)
 */
qx.Mixin.define("cv.ui.structure.tile.MVisibility", {
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this._observeVisibility();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    observer: new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target._instance) {
          entry.target._instance.setVisible(entry.intersectionRatio > 0);
        }
      });
    }),
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    visible: {
      check: "Boolean",
      init: false,
      apply: "_applyVisible",
    },
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _observeVisibility() {
      if (this._element) {
        cv.ui.structure.tile.MVisibility.observer.observe(this._element);
      } else {
        this.warn("no element to observe defined");
      }
    },
  },
});
