/**
 * Registry for all classes that implement cv.io.listmodel.IListModel.
 */
qx.Class.define('cv.io.listmodel.Registry', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    _REG: {},

    /**
     *
     * @param modelClass {Class}
     */
    register(modelClass) {
      if (qx.Class.hasInterface(modelClass, cv.io.listmodel.IListModel)) {
        const className = modelClass.basename.toLowerCase();
        this._REG[className] = modelClass;
      }
    },

    /**
     *
     * @param name {String}
     */
    get(name) {
      name = name.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(this._REG, name)) {
        const clazz = this._REG[name];
        if (clazz.REQUIRES) {
          for (const check of clazz.REQUIRES) {
            switch (check) {
              case 'php':
                if (!qx.core.Init.getApplication().getServerHasPhpSupport()) {
                  return null;
                }
                break;
            }
          }
        }
        return clazz;
      }
      return null;
    }
  }
});
