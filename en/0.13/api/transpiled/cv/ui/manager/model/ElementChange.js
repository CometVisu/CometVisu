(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ElementChange.js 
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
   * An atomic change on an cv.ui.manager.model.XmlElement that can be undone / redone.
   */
  qx.Class.define('cv.ui.manager.model.ElementChange', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(title, element, changes, type) {
      qx.core.Object.constructor.call(this);
      this.setTitle(title);
      this.setElement(element);
      this.setChanges(changes);
      this.setChangeType(type || 'content');
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      element: {
        check: 'cv.ui.manager.model.XmlElement'
      },
      title: {
        check: 'String'
      },
      changes: {
        check: 'Array'
      },
      changeType: {
        check: ['content', 'created', 'deleted', 'moved'],
        init: ['content']
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * Undo all changes
       * @return {Boolean} true if all changes are undone
       */
      undo: function undo() {
        var element = this.getElement();
        var success = false;
        var change;

        if (!element.isDisposed()) {
          switch (this.getChangeType()) {
            case 'content':
              this.getChanges().forEach(function (change) {
                if (change instanceof cv.ui.manager.model.ElementChange) {
                  change.undo();
                } else {
                  element.setAttribute(change.attribute, change.old);
                }
              });
              element.updateModified();
              success = true;
              break;

            case 'deleted':
              change = this.getChanges()[0];

              if (change.parent) {
                success = change.parent.insertChild(change.child, change.index, true);
              }

              break;

            case 'created':
              change = this.getChanges()[0];

              if (change.child) {
                change.child.remove(true);
                success = true;
              }

              break;

            case 'moved':
              change = this.getChanges()[0];
              success = change.child.moveTo(change.oldParent, change.oldIndex, true);
              break;
          }
        }

        return success;
      },

      /**
       * Redo all change
       *  @return {Boolean} true if all changes are redone
       */
      redo: function redo() {
        var element = this.getElement();
        var success = false;
        var change;

        if (!element.isDisposed()) {
          switch (this.getChangeType()) {
            case 'content':
              this.getChanges().forEach(function (change) {
                if (change instanceof cv.ui.manager.model.ElementChange) {
                  change.redo();
                } else {
                  element.setAttribute(change.attribute, change.value);
                }
              });
              element.updateModified();
              success = true;
              break;

            case 'deleted':
              if (element) {
                element.remove(true);
                success = true;
              }

              break;

            case 'created':
              change = this.getChanges()[0];

              if (change.parent) {
                success = change.parent.insertChild(change.child, change.index, true);
              }

              break;

            case 'moved':
              change = this.getChanges()[0];
              success = change.child.moveTo(change.parent, change.index, true);
              break;
          }
        }

        return success;
      }
    }
  });
  cv.ui.manager.model.ElementChange.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ElementChange.js.map?dt=1664297869774