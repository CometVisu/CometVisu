/*
 * Copyright (c) 2024, Christian Mayer and the CometVisu contributors.
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
 * Shows content of other widgets based on the current state.
 * This allows to dynamically show parts of the config on other places, dependent
 * on an address state. E.g. you can show the config part of the room you are currently
 * in on your dashboard.
 *
 * @since 2025
 * @author Tobias Bräutigam
 */
qx.Class.define('cv.ui.structure.tile.widgets.Dynamic', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    ref: {
      check: 'Element',
      nullable: true,
      apply: '_applyRef'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      super._init();
    },

    _updateValue(mappedValue, value) {
      this.setRef(this._element.querySelector(':scope > cv-ref[when="' + mappedValue + '"]'));
    },

    _applyRef(ref, old) {
      if (old) {
        while (old.firstChild) {
          old.removeChild(old.lastChild);
        }
        old.removeAttribute('active');
      }
      if (ref) {
        let remote;
        try {
          remote = document.body.querySelector(ref.getAttribute('selector'));
        } catch (e) {
          this.error(e);
          return;
        }
        if (remote) {
          const clonedNode = remote.cloneNode(true);
          ref.append(clonedNode);
          if (ref.hasAttribute('modify-attribute')) {
            let modifyTarget = clonedNode;
            if (ref.hasAttribute('modify-attribute-target')) {
              modifyTarget = clonedNode.querySelector(ref.getAttribute('modify-selector'));
              if (!modifyTarget) {
                this.error('modify-selector not found: ' + ref.getAttribute('modify-selector'));
                return;
              }
            }
            const [attribute, value] = ref.getAttribute('modify-attribute').split(':');
            modifyTarget.setAttribute(attribute, value);
          }
          ref.setAttribute('active', 'true');
        }
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'dynamic',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});


