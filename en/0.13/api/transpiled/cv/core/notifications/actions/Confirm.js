(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.core.notifications.actions.AbstractActionHandler": {
        "construct": true,
        "require": true
      },
      "cv.core.notifications.IActionHandler": {
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.dom.Element": {},
      "qx.event.Registration": {},
      "cv.core.notifications.ActionRegistry": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Option.js
   *
   * copyright (c) 2010-2023, Christian Mayer and the CometVisu contributers.
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
   * Shows a button to confirm or decline somethinig.
   *
   * @author Tobias Bräutigam
   * @since 0.13.0
   */
  qx.Class.define('cv.core.notifications.actions.Confirm', {
    extend: cv.core.notifications.actions.AbstractActionHandler,
    implement: cv.core.notifications.IActionHandler,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props, type) {
      cv.core.notifications.actions.AbstractActionHandler.constructor.call(this, type);
      this.setAccepted(type === 'confirm');
      this.setTitle(type === 'confirm' ? qx.locale.Manager.tr('yes') : qx.locale.Manager.tr('no'));
      this.set(props);
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      title: {
        check: 'String',
        nullable: true
      },
      accepted: {
        check: 'Boolean',
        init: false
      },
      action: {
        check: 'Function',
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      handleAction: function handleAction(ev) {
        if (ev) {
          ev.stopPropagation();
          ev.preventDefault();
          if (this.getAction()) {
            this.getAction()(this.getAccepted());
          }
          this.fireEvent('close');
        }
      },
      getDomElement: function getDomElement() {
        var actionButton = qx.dom.Element.create('button', {
          "class": 'action ' + this._type,
          text: this.getTitle(),
          style: this.getStyle()
        });
        actionButton.$$handler = this;
        qx.event.Registration.addListener(actionButton, 'tap', this.handleAction, this);
        return actionButton;
      }
    },
    defer: function defer() {
      cv.core.notifications.ActionRegistry.registerActionHandler('confirm', cv.core.notifications.actions.Confirm);
      cv.core.notifications.ActionRegistry.registerActionHandler('decline', cv.core.notifications.actions.Confirm);
    }
  });
  cv.core.notifications.actions.Confirm.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Confirm.js.map?dt=1702815202687