/* AbstractClient.js
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
 *
 */
qx.Class.define('cv.io.AbstractClient', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this._resources= {};
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    resourcePathAdded: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: 'Boolean',
      init: false,
      event: 'changeConnected',
      apply: '_applyConnected'
    },
    dataReceived: {
      check: 'Boolean',
      init: false
    },
    name: {
      check: 'String',
      nullable: true
    },
    server: {
      check: 'String',
      nullable: true,
      event: 'changedServer'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _resources: null,

    setResourcePath(name, path) {
      this._resources[name] = path;
      this.fireDataEvent('resourcePathAdded', name);
    },

    _applyConnected(connected) {
      this.record('connected', connected);
    }
  }
});
