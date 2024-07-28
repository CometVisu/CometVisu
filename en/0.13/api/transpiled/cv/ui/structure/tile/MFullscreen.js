function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.Uuid": {},
      "cv.data.Model": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   *
   */
  qx.Mixin.define('cv.ui.structure.tile.MFullscreen', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      fullscreen: {
        check: 'Boolean',
        init: false,
        apply: "__P_73_0",
        event: 'changeFullscreen'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_73_1: null,
      __P_73_2: null,
      __P_73_3: null,
      getUuid: function getUuid() {
        if (!this.__P_73_1) {
          this.__P_73_1 = qx.util.Uuid.createUuidV4();
        }
        return this.__P_73_1;
      },
      getPopupAddress: function getPopupAddress() {
        if (!this.__P_73_2) {
          this.__P_73_2 = "state:".concat(this.getUuid(), "-popup");
        }
        return this.__P_73_2;
      },
      __P_73_0: function __P_73_0(value) {
        var sendValue = value ? '1' : '0';
        this.__P_73_3.setAttribute('data-value', sendValue);
        cv.data.Model.getInstance().onUpdate(this.getPopupAddress(), sendValue, 'system');
      },
      _initFullscreenSwitch: function _initFullscreenSwitch() {
        var _this = this;
        // add fullscreen button + address
        var button = this.__P_73_3 = this._buttonFactory('ri-fullscreen-line', ['fullscreen']);
        button.setAttribute('data-value', '0');
        button.addEventListener('click', function () {
          return _this.toggleFullscreen();
        });
        this.appendToHeader(button, 'right');

        // address
        var tileAddress = document.createElement('cv-address');
        tileAddress.setAttribute('mode', 'read');
        tileAddress.setAttribute('target', 'fullscreen-popup');
        tileAddress.setAttribute('backend', 'system');
        tileAddress.setAttribute('send-mode', 'always');
        tileAddress.textContent = this.getPopupAddress();
        this._element.parentElement.appendChild(tileAddress);

        // listen to parent tile of popup is opened or not
        var parent = this._element;
        while (parent && parent.nodeName.toLowerCase() !== 'cv-tile') {
          parent = parent.parentElement;
        }
        if (parent) {
          var tileWidget = parent.getInstance();
          tileWidget.addListener('closed', function () {
            return _this.setFullscreen(false);
          });

          // because we added a read address to the tile after it has been initialized we need to init the listener here manually
          parent.addEventListener('stateUpdate', function (ev) {
            tileWidget.onStateUpdate(ev);
            // cancel event here
            ev.stopPropagation();
          });
        }
      },
      _buttonFactory: function _buttonFactory(icon, classes) {
        var _button$classList;
        var button = document.createElement('button');
        (_button$classList = button.classList).add.apply(_button$classList, _toConsumableArray(classes));
        if (icon) {
          var i = document.createElement('i');
          i.classList.add(icon);
          button.appendChild(i);
        }
        return button;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_73_3 = null;
    }
  });
  cv.ui.structure.tile.MFullscreen.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MFullscreen.js.map?dt=1722151811568