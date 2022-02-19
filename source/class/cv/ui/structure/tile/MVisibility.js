/**
 * Detects dom elements visibility
 */
qx.Mixin.define('cv.ui.structure.tile.MVisibility', {

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this._observeVisibility();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    observer: new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.target._instance) {
          entry.target._instance.setVisible(entry.intersectionRatio > 0);
        }
      });
    }, {
      root: document.documentElement
    })
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    visible: {
      check: 'Boolean',
      init: false,
      apply: '_applyVisible'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _observeVisibility() {
      if (this._element) {
        cv.ui.structure.tile.MVisibility.observer.observe(this._element);
      } else {
        this.warn('no element to observe defined');
      }
    }
  }
});
