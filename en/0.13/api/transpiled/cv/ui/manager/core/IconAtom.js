function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.snackbar.Controller": {},
      "qx.locale.Manager": {},
      "cv.ui.manager.basic.Image": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* IconAtom.js
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
   * Atom with cv.ui.manager.viewer.SvgIcon instead of a qx.ui.basic.Image
   */
  qx.Class.define('cv.ui.manager.core.IconAtom', {
    extend: qx.ui.basic.Atom,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(label, icon) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);
      this._fontIconRegex = /^\<i.*class=".*(knxuf-|ri-)([^\s"]+).*".*\<\/i\>$/;
      this.addListener('tap', this._onTap, this);
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-icon'
      },
      model: {
        check: 'Array',
        apply: '_applyModel'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _fontIconRegex: null,
      _iconChildControlName: null,
      _onTap: function _onTap() {
        if (_typeof(navigator.clipboard) === 'object') {
          navigator.clipboard.writeText(this.getLabel());
          cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('Icon name has been copied to clipboard'));
        }
      },
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        cv.ui.manager.core.IconAtom.superclass.prototype._applyLabel.call(this, value, old);
        this.setToolTipText(value);
      },
      _applyModel: function _applyModel(value) {
        if (value) {
          var _value = _slicedToArray(value, 2),
            name = _value[0],
            icon = _value[1];
          this.setLabel(name);
          this.setIcon(icon);
        } else {
          this.resetLabel();
          this.resetIcon();
        }
      },
      _applyIcon: function _applyIcon(value, old) {
        if (value) {
          if (this._fontIconRegex.test(value)) {
            this._iconChildControlName = 'htmlIcon';
            var icon = this.getChildControl(this._iconChildControlName, true);
            if (icon) {
              icon.setValue(value);
            }
            this._excludeChildControl('icon');
          } else {
            this._iconChildControlName = 'icon';
            var _icon = this.getChildControl(this._iconChildControlName, true);
            if (_icon) {
              _icon.setSource(value);
            }
            this._excludeChildControl('htmlIcon');
          }
        } else {
          this._iconChildControlName = 'icon';
          this._excludeChildControl('htmlIcon');
        }
        this._handleIcon();
      },
      _handleIcon: function _handleIcon() {
        if (this.getIcon() === null || this.getShow() === 'label') {
          this._excludeChildControl(this._iconChildControlName);
        } else {
          this._showChildControl(this._iconChildControlName);
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;
        switch (id) {
          case 'icon':
            control = new cv.ui.manager.basic.Image(this.getIcon());
            control.set({
              anonymous: true,
              scale: true,
              maxHeight: 64
            });
            this._addAt(control, 0);
            if (this.getIcon() === null || this.getShow() === 'label') {
              control.exclude();
            }
            break;
          case 'htmlIcon':
            control = new qx.ui.basic.Label(this.getIcon());
            control.set({
              anonymous: true,
              rich: true,
              height: 64,
              width: 64
            });
            this._addAt(control, 0);
            if (this.getIcon() === null || this.getShow() === 'label') {
              control.exclude();
            }
        }
        return control || cv.ui.manager.core.IconAtom.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  cv.ui.manager.core.IconAtom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconAtom.js.map?dt=1700345579448