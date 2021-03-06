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
  construct: function (title, element, changes) {
    this.base(arguments);
    this.setTitle(title);
    this.setElement(element);
    this.setChanges(changes);
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
    undo: function() {
      const element = this.getElement();
      if (!element.isDisposed()) {
        this.getChanges().forEach(change => {
          element.setAttribute(change.attribute, change.old);
        });
        element.updateModified();
        return true;
      }
      return false;
    },

    /**
     * Redo all change
     *  @return {Boolean} true if all changes are redone
     */
    redo: function () {
      const element = this.getElement();
      if (!element.isDisposed()) {
        this.getChanges().forEach(change => {
          element.setAttribute(change.attribute, change.value);
        });
        element.updateModified();
        return true;
      }
      return false;
    }
  }
});
