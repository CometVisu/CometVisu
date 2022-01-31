(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tree.VirtualTreeItem": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Device": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.basic.Image": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Atom": {},
      "cv.theme.dark.Images": {},
      "qx.ui.form.MenuButton": {},
      "cv.ui.manager.contextmenu.ConfigElement": {},
      "qx.ui.core.Spacer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.touch": {
          "construct": true,
          "className": "qx.bom.client.Device"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* VirtualElementItem.js 
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
   * Widget for node items in XML-File
   */
  qx.Class.define('cv.ui.manager.tree.VirtualElementItem', {
    extend: qx.ui.tree.VirtualTreeItem,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(label) {
      qx.ui.tree.VirtualTreeItem.constructor.call(this, label);

      if (qx.core.Environment.get('device.touch')) {
        this.addState('touch');
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'element-tree-item'
      },
      name: {
        check: 'String',
        init: '',
        event: 'changeName',
        apply: '_applyName'
      },
      temporary: {
        check: 'Boolean',
        init: false,
        apply: '_applyTemporary'
      },
      status: {
        check: ['valid', 'error', 'comment'],
        nullable: true,
        apply: '_applyStatus'
      },
      editable: {
        check: 'Boolean',
        init: false
      },
      sortable: {
        check: 'Boolean',
        init: false,
        apply: '_applySortable'
      },
      droppable: {
        refine: true,
        init: true
      },
      dragging: {
        check: 'Boolean',
        init: false,
        apply: '_applyDragging'
      }
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      edit: 'qx.event.type.Data',
      action: 'qx.event.type.Data'
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      // eslint-disable-line @qooxdoo/qx/no-refs-in-members
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        selected: true,
        touch: true
      },
      __P_50_0: false,
      _applyName: function _applyName(value) {
        this.getContentElement().setAttribute('data-nodename', value);
      },
      // this has to be set by model binding, because the qx way by adding a state does not survive a widget re-binding
      _applyDragging: function _applyDragging(value) {
        if (value) {
          this.addState('drag');
        } else {
          this.removeState('drag');
        }
      },
      _applyModel: function _applyModel(value) {
        if (qx.core.Environment.get('device.touch')) {
          if (value) {
            var menuButton = this.getChildControl('menu-button');
            menuButton.show();
            var menu = menuButton.getMenu();
            menu.setEditor(value.getEditor());
            menu.setElement(value);
          } else {
            this.getChildControl('menu-button').hide();
          }
        } else if (this.hasChildControl('menu-button')) {
          this.getChildControl('menu-button').exclude();
        }
      },
      _applyTemporary: function _applyTemporary(value) {
        if (value) {
          this.addState('temporary');
        } else {
          this.removeState('temporary');
        }
      },
      _applySortable: function _applySortable(value) {
        if (value) {
          this.getChildControl('move-button').show();
        } else {
          this.getChildControl('move-button').hide();
        }
      },
      _applyStatus: function _applyStatus(value, old) {
        var icon = this.getChildControl('icon');
        var label = this.getChildControl('label');

        if (old) {
          icon.removeState(old);
          label.removeState(old);
        }

        if (value) {
          icon.addState(value);
          label.addState(value);
        }
      },
      _addWidgets: function _addWidgets() {
        cv.ui.manager.tree.VirtualElementItem.prototype._addWidgets.base.call(this);

        var open = this.getChildControl('open', true);

        if (open && qx.core.Environment.get('device.touch')) {
          open.getContentElement().addClass('touch-tree-open-icon');
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var _this = this;

        var control;

        switch (id) {
          case 'icon':
            control = new cv.ui.manager.basic.Image().set({
              alignY: 'middle',
              anonymous: true,
              source: this.getIcon(),
              maxWidth: 22,
              maxHeight: 22
            });
            break;

          case 'buttons':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
            control.setAnonymous(true);
            break;

          case 'move-button':
            control = new qx.ui.basic.Atom('', cv.theme.dark.Images.getIcon('drag-handle', qx.core.Environment.get('device.touch') ? 36 : 18));
            control.setToolTipText(this.tr('Drag to move'));
            control.setAnonymous(true);
            control.setShow('icon');
            this.getChildControl('buttons').addAt(control, 0);
            break;

          case 'menu-button':
            control = new qx.ui.form.MenuButton('', cv.theme.dark.Images.getIcon('menu', qx.core.Environment.get('device.touch') ? 24 : 14), new cv.ui.manager.contextmenu.ConfigElement());
            control.getMenu().addListener('action', function (ev) {
              _this.fireDataEvent('action', ev.getData());
            });
            this.getChildControl('buttons').addAt(control, 1);
            break;
        }

        return control || cv.ui.manager.tree.VirtualElementItem.prototype._createChildControlImpl.base.call(this, id);
      },
      // overridden
      addLabel: function addLabel(text) {
        var label = this.getChildControl('label');

        if (this.__P_50_0) {
          this._remove(label);
        }

        if (text) {
          this.setLabel(text);
        } else {
          label.setValue(this.getLabel());
        }

        this._add(label);

        this._add(new qx.ui.core.Spacer(), {
          flex: 1
        });

        var buttons = this.getChildControl('buttons');

        this._add(buttons);

        this.__P_50_0 = true;
      }
    }
  });
  cv.ui.manager.tree.VirtualElementItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualElementItem.js.map?dt=1643663937429