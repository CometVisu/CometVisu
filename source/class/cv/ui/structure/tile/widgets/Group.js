/* Group.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Creates a group of widgets that can be hidden (works like the <detail> HTML Element)
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.widgets.Group', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _init() {
      super._init();
      const element = this._element;
      let label = null;
      let summary = null;
      const needsSummary = element.hasAttribute('name') || element.hasAttribute('icon');
      if (needsSummary) {
        summary = element.querySelector(':scope > summary');
        if (!summary) {
          summary = document.createElement('summary');
          element.insertBefore(summary, element.firstChild);
        }
        if (element.hasAttribute('name')) {
          label = element.querySelector(':scope > summary > label.title');
          if (!label) {
            label = document.createElement('label');
            label.classList.add('title');
            summary.insertBefore(label, summary.firstChild);
          }
          label.classList.add('last-of-title');
          label.textContent = element.getAttribute('name');
        }
        if (element.hasAttribute('icon')) {
          let icon = element.querySelector(':scope > summary > cv-icon.title');
          if (!icon) {
            icon = document.createElement('cv-icon');
            icon.classList.add('title');
            summary.insertBefore(icon, summary.firstChild);
          }
          if (!label) {
            icon.classList.add('last-of-title');
          }
          icon.classList.add(element.getAttribute('icon'));
        }
      }
      const empty = !element.querySelector(':scope > *:not(summary)');
      if (empty) {
        element.classList.add('empty');
      } else if (summary) {
        qx.event.Registration.addListener(summary, 'click', this._toggleOpen, this);
      }

      this.__syncSummaryValue();
    },

    _toggleOpen() {
      if (this._element.hasAttribute('open')) {
        this._element.removeAttribute('open');
      } else {
        this._element.setAttribute('open', 'true');
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     */
    onStateUpdate(ev) {
      if (!super.onStateUpdate(ev)) {
        if (ev.detail.target === 'summary') {
          this.__setSummaryValue(ev.detail.state);
        } else {
          this.debug('unhandled address target', ev.detail.target);
        }
      }
    },

    __setSummaryValue(state) {
      let target = this._element.querySelector(':scope > summary > label.value');

      if (!target) {
        const summary = this._element.querySelector(':scope > summary');
        if (!summary) {
          return;
        }
        target = document.createElement('label');
        target.classList.add('value');
        summary.appendChild(target);
      }
      target.textContent = state;
    },

    __syncSummaryValue() {
      for (const address of this._element.querySelectorAll(':scope > cv-address[target="summary"], :scope > cv-address-group[target="summary"]')) {
        let state;
        if (address.hasAttribute('data-value')) {
          state = address.getAttribute('data-value');
        } else if (address.getInstance && address.getInstance() && typeof address.getInstance().getValue === 'function') {
          state = address.getInstance().getValue();
        }
        if (state !== undefined && state !== null) {
          this.__setSummaryValue(state);
        }
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'group',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
