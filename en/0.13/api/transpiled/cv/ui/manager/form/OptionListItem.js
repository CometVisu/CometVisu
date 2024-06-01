(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "cv.ui.manager.model.config.Option": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.Button": {},
      "cv.theme.dark.Images": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* OptionListItem.js
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
   * This widgets shows and editable config option in a list.
   */
  qx.Class.define('cv.ui.manager.form.OptionListItem', {
    extend: qx.ui.core.Widget,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this._setLayout(new qx.ui.layout.HBox(8));
      this._createChildControl('key');
      this._createChildControl('value');
      this._createChildControl('key-title');
      this._createChildControl('value-title');
      this._createChildControl('delete');
      this._createChildControl('add');
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-editor-config-option'
      },
      model: {
        check: 'cv.ui.manager.model.config.Option',
        nullable: true,
        apply: '_applyModel'
      },
      readOnly: {
        check: 'Boolean',
        init: false,
        event: 'changeReadOnly'
      }
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      "delete": 'qx.event.type.Data',
      add: 'qx.event.type.Event'
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      // list controller with allowNull calls setLabel
      setLabel: function setLabel(label) {},
      // list controller with allowNull calls setIcon
      setIcon: function setIcon() {},
      _applyModel: function _applyModel(value, old) {
        var keyField = this.getChildControl('key');
        var valueField = this.getChildControl('value');
        var keyTitleField = this.getChildControl('key-title');
        var valueTitleField = this.getChildControl('value-title');
        this.__P_40_0(old);
        if (value) {
          // bi-directional bind
          value.bind('key', keyField, 'value');
          value.bind('value', valueField, 'value');
          keyField.bind('value', value, 'key');
          valueField.bind('value', value, 'value');
          keyField.show();
          valueField.show();
          keyTitleField.exclude();
          valueTitleField.exclude();
          this.getChildControl('delete').show();
          this.getChildControl('add').show();
        } else {
          keyField.exclude();
          valueField.exclude();
          keyTitleField.show();
          valueTitleField.show();
          this.getChildControl('delete').hide();
          this.getChildControl('add').hide();
        }
      },
      __P_40_0: function __P_40_0(model) {
        if (model) {
          var keyField = this.getChildControl('key');
          var valueField = this.getChildControl('value');
          if (model) {
            model.removeRelatedBindings(keyField);
            model.removeRelatedBindings(valueField);
            keyField.removeRelatedBindings(model);
            valueField.removeRelatedBindings(model);
          }
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var _this = this;
        var control;
        switch (id) {
          case 'key':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true,
              required: true
            });
            this.bind('readOnly', control, 'readOnly');
            this._add(control, {
              width: '40%'
            });
            break;
          case 'value':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true
            });
            this.bind('readOnly', control, 'readOnly');
            this._add(control, {
              width: '40%'
            });
            break;
          case 'delete':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('delete', 22));
            control.setToolTipText(this.tr('Delete option'));
            control.addListener('execute', function () {
              _this.fireDataEvent('delete', _this.getModel());
            });
            this.bind('readOnly', control, 'visibility', {
              converter: function converter(value) {
                return value ? 'hidden' : 'visible';
              }
            });
            this._add(control);
            break;
          case 'add':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('add', 18));
            control.setToolTipText(this.tr('Add option'));
            control.addListener('execute', function () {
              _this.fireEvent('add');
            });
            this.bind('readOnly', control, 'visibility', {
              converter: function converter(value) {
                return value ? 'hidden' : 'visible';
              }
            });
            this._add(control);
            break;
          case 'key-title':
            control = new qx.ui.basic.Label(this.tr('Key'));
            control.exclude();
            this._add(control, {
              width: '40%'
            });
            break;
          case 'value-title':
            control = new qx.ui.basic.Label(this.tr('Value'));
            control.exclude();
            this._add(control, {
              width: '40%'
            });
            break;
        }
        return control || cv.ui.manager.form.OptionListItem.superclass.prototype._createChildControlImpl.call(this, id);
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_40_0(this.getModel());
    }
  });
  cv.ui.manager.form.OptionListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OptionListItem.js.map?dt=1717235365137