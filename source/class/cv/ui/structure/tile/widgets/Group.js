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
      this.base(arguments);
      const element = this._element;
      if (element.hasAttribute('name')) {
        let summary = element.querySelector(':scope > summary');
        if (!summary) {
          summary = document.createElement('summary');
          element.insertBefore(summary, element.firstChild);
        }
        let label = element.querySelector(':scope > summary > label.title');
        if (!label) {
          label = document.createElement('label');
          label.classList.add('title');
          summary.insertBefore(label, summary.firstChild);
        }
        label.textContent = element.getAttribute('name');
        qx.event.Registration.addListener(summary, 'click', this._toggleOpen, this);
      }
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
      if (!this.base(arguments, ev)) {
        if (ev.detail.target === 'summary') {
          let target = this._element.querySelector(':scope > summary > label.value');
          if (!target) {
            target = document.createElement('label');
            target.classList.add('value');
            const summary = this._element.querySelector(':scope > summary');
            summary.appendChild(target);
          }
          target.textContent = ev.detail.state;
        } else {
          this.debug('unhandled address target', ev.detail.target);
        }
      }
    }
  },

  defer: function(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'group', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
