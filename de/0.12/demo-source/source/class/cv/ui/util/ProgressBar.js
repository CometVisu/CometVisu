/* ProgressBar.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Shows a progressbar to visualize a state that is completed by x %
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.ui.util.ProgressBar", {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.base(arguments);
    this._createDomElement();
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    value: {
      check: "Integer",
      init: 0,
      apply: "_applyValue"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __domElement: null,
    __progressElement: null,

    _applyValue: function(value) {
      var
        rect = this.__domElement.getBoundingClientRect(),
        totalWidth = Math.round(rect.right - rect.left),
        progressWidth = Math.round(totalWidth*value/100)+"px";
      this.__progressElement.style.width = progressWidth;
    },

    getDomElement: function() {
      return this.__domElement;
    },

    _createDomElement: function() {
      var container = this.__domElement = qx.dom.Element.create("div", { "class": "progressbar" });
      this.__domElement.$$widget = this;
      var progress = this.__progressElement = qx.dom.Element.create("div", { "class": "completed" });
      container.appendChild(progress);
      return container;
    }
  }
});