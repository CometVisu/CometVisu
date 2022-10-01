/* MResize.js
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
 * Detects dom elements resizing
 * @ignore(ResizeObserver)
 */
qx.Mixin.define("cv.ui.structure.tile.MResize", {
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this._observer = new ResizeObserver((entries, observer) => {
      const element = this.getResizeTarget();
      entries.some((entry) => {
        if (entry.target === element) {
          this.fireDataEvent("resized", entry);
          return true;
        }
        return false;
      });
    });
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    resized: "qx.event.type.Data",
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    resizeTarget: {
      check: "Element",
      nullable: true,
      apply: "_applyResizeTarget",
    },
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {ResizeObserver}
     */
    _observer: null,

    _applyResizeTarget(element, oldElement) {
      if (oldElement) {
        this._observer.unobserve(oldElement);
      }
      if (element) {
        this._observer.observe(element);
      }
    },
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._observer.disconnect();
    this._observer = null;
  },
});
