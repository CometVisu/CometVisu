/* Link.js 
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
 * Opens a link in a new window.
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.core.notifications.actions.Link", {
  extend: cv.core.notifications.actions.AbstractActionHandler,
  implement: cv.core.notifications.IActionHandler,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments);
    this.set(props);
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    title: {
      check: "String",
      nullable: true
    },
    url: {
      check: "String",
      nullable: true
    },
    action: {
      check: "Function",
      nullable: true,
      transform: "_transformAction"
    },
    hidden: {
      check: "Boolean",
      init: false
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {

    _transformAction: function(value) {
      if (qx.lang.Type.isFunction(value)) {
        return value;
      }
      switch(value) {
        case "reload":
        case "restart":
          return cv.util.Location.reload;
      }
      if (value) {
        this.error("Unknown action: " + value);
      }
      return null;
    },

    handleAction: function(ev) {
      if (ev) {
        ev.stopPropagation();
        ev.preventDefault();
      }
      if (this.getAction()) {
        this.getAction()(ev);
      }
      if (this.getUrl()) {
        if (this.isHidden()) {
          // open link in background (fire and forget)
          var req = new qx.io.request.Xhr(this.getUrl());
          req.send();
        } else {
          cv.util.Location.open(this.getUrl(), '_blank');
        }
      }
      if (this.isDeleteMessageAfterExecution) {
        this.fireEvent('close');
      }
    },

    getDomElement: function() {
      var actionButton = qx.dom.Element.create("button", {
        "class": "action",
        "text": this.getTitle(),
        "style": this.getStyle()
      });
      actionButton.$$handler = this;

      qx.event.Registration.addListener(actionButton, "tap", this.handleAction, this);
      return actionButton;
    }
  },

  defer: function() {
    cv.core.notifications.ActionRegistry.registerActionHandler("link", cv.core.notifications.actions.Link);
  }
});
