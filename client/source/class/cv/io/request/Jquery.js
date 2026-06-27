/* Jquery.js
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
 * JQuery Wrapper for AJAX request that allows re-sending the request
 *
 * @author tobiasb
 * @since 2017
 *
 * @ignore($)
 * @asset(lib/jquery.js)
 */

qx.Class.define('cv.io.request.Jquery', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct(config) {
    this.__lastRequest = config;
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    requestData: {
      check: 'Object',
      init: {},
      apply: '_applyRequestData'
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __lastRequest: null,
    __xhr: null,

    // property apply
    _applyRequestData(value) {
      if (!this.__lastRequest) {
        this.__lastRequest['data'] = value;
      }
    },

    removeListener(eventName) {
      delete this.__lastRequest[eventName];
    },

    addListener(eventName, callback, context) {
      this.__lastRequest[eventName] = callback.bind(context);
    },

    send() {
      if (this.__lastRequest) {
        $.ajax(this.__lastRequest);
      } else {
        this.error('no request settings found, skipping');
      }
    },

    /*
    ***********************************************************
      Methods that are forwarded to the native XHR object
    ***********************************************************
    */

    abort() {
      if (this.__xhr && this.__xhr.abort) {
        this.__xhr.abort();
      }
    },

    getResponseHeader(headerName) {
      if (this.__xhr) {
        return this.__xhr.getResponseHeader(headerName);
      }
      return null;
    }
  }
});
