/**
 * Detects dom elements resizing
 * @ignore(ResizeObserver)
 */
qx.Mixin.define('cv.ui.structure.tile.MResize', {

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this._observer = new ResizeObserver((entries, observer) => {
      const element = this.getResizeTarget();
      entries.some(entry => {
        if (entry.target === element) {
          this.fireDataEvent('resized', entry);
          return true;
        }
        return false;
      });
    });
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    resized: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    resizeTarget: {
      check: 'Element',
      nullable: true,
      apply: '_applyResizeTarget'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {ResizeObserver}
     */
    _observer: null,

    _applyResizeTarget(element, oldElement) {
      if (oldElement) {
        this._observer.unobserve(oldElement);
      }
      if (element) {
        this._observer.observe(element);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._observer.disconnect();
    this._observer = null;
  }
});
