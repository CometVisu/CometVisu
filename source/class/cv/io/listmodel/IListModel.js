/* IListModel.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Interface for Listmodel sources.
 */
qx.Interface.define('cv.io.listmodel.IListModel', {
  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: 'qx.data.Array',
      deferredInit: true
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    // this event is sent when the model itself wants to trigger a list refresh.
    refresh: 'qx.event.type.Event'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    async refresh() {},

    /**
     * handles event from the list
     * @param ev {Event}
     * @param data {object} contains a map of all "data-" prefixed attributes of the event source, contains at least data.action
     * @param model {object} model of the clicked list item
     * @returns {boolean} if the event has been handled
     */
    handleEvent(ev, data, model) {}
  }
});
