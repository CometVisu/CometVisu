/**
 * Central registry for all available file editors/viewers.
 */
qx.Class.define('cv.ui.manager.control.FileHandlerRegistry', {
  extend: qx.core.Object,
  type: 'singleton',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__registry = {};
    this.__defaults = [];

    // register viewers
    this.registerFileHandler(new RegExp('\.(' + cv.ui.manager.viewer.Image.SUPPORTED_FILES.join('|') + ')$'), cv.ui.manager.viewer.Image);

    // register the basic editors
    this.registerFileHandler(new RegExp('\.(' + cv.ui.manager.editor.Source.SUPPORTED_FILES.join('|') + ')$'), cv.ui.manager.editor.Source);
    this.registerFileHandler(/visu_config(_.+)?\.xml/, cv.ui.manager.editor.Xml, {
      preview: false
    });
    this.registerFileHandler(cv.ui.manager.model.CompareFiles, cv.ui.manager.editor.Diff, true);

    this.registerFileHandler("hidden.php", cv.ui.manager.editor.Config, true);

    cv.ui.manager.model.Preferences.getInstance().addListener('changeDefaultConfigEditor', this._onChangesDefaultConfigEditor, this);
    this._onChangesDefaultConfigEditor();
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __registry: null,
    __defaults: null,

    /**
     * Registers an editor for a specific file, that is identified by the given selector.
     * @param selector {String|RegExp|Class} filename-/path or regular expression.
     * @param clazz {qx.ui.core.Widget} widget class that handles those type of files
     * @param options {Map?} additional options to store in the registry
     */
    registerFileHandler: function (selector, clazz, options) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertTrue(qx.Interface.classImplements(clazz, cv.ui.manager.editor.IEditor));
      }
      var config = Object.assign({
        Clazz: clazz,
        instance: null
      }, options || {});
      if (qx.Class.isClass(selector)) {
        config.instanceOf = selector;
        config.selectorId = 'instanceOf:' + selector.classname;
      } else if (qx.lang.Type.isRegExp(selector)) {
        config.regex = selector;
        config.selectorId = 'regex:' + selector.toString();
      } else if (qx.lang.Type.isString(selector)) {
        // simple file matcher
        if (selector.includes('/')) {
          config.fullPath = selector;
          config.selectorId = 'fullPath:' + selector;
        } else {
          config.fileName = selector;
          config.selectorId = 'fileName:' + selector;
        }
      }
      this.__registry[clazz.classname] = config;
    },

    getFileHandler: function (file) {
      var editors = [];
      // check if there is a default first
      var defaultHandler;
      Object.keys(this.__defaults).some(function (key) {
        if (this.__defaults[key].regex.test(file.getFullPath())) {
          defaultHandler = this.getFileHandlerById(this.__defaults[key].clazz.classname);
          return true;
        }
      }, this);
      if (defaultHandler) {
        return defaultHandler;
      }

      Object.keys(this.__registry).forEach(function (classname) {
        var config = this.__registry[classname];
        if (this.__canHandle(config, file)) {
          editors.push(config);
        }
      }, this);
      if (editors.length === 0) {
        // no editors found
        return null;
      } else if (editors.length === 1) {
        return editors[0];
      } else {
        // find default editor
        for (var i = 0, l = editors.length; i < l; i++) {
          if (editors[i].isDefault === true) {
            return editors[i];
          }
        }

        // no default editor, just take the first one
        return editors[0];
      }
    },

    getFileHandlerById: function (handlerId) {
      return this.__registry[handlerId];
    },

    hasFileHandler: function (file) {
      return Object.keys(this.__registry).some(function (classname) {
        var config = this.__registry[classname];
        return this.__canHandle(config, file);
      }, this);
    },

    /**
     * Mark the handler with the given classname as default for the selector-id and all others with the same selector id not,
     * @param selectorId {RegExp}
     * @param clazz {qx.Class}
     */
    setDefault: function (selector, clazz) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertRegExp(selector);
        qx.core.Assert.assertTrue(qx.Class.isClass(clazz));
      }
      this.__defaults[selector.toString()] = {
        regex: selector,
        clazz: clazz
      };
    },

    _onChangesDefaultConfigEditor: function () {
      var selector = /visu_config(_.+)?\.xml/;
      switch (cv.ui.manager.model.Preferences.getInstance().getDefaultConfigEditor()) {
        case 'source':
          this.setDefault(selector, cv.ui.manager.editor.Source);
          break;

        case 'xml':
          this.setDefault(selector, cv.ui.manager.editor.Xml);
          break;
      }
    },

    __canHandle: function(config, file) {
      if (config.fileName && file.getName() === config.fileName) {
        return true;
      } else if (config.fullPath && file.getFullPath() === config.fullPath) {
        return true;
      } else if (config.regex && config.regex.test(file.getFullPath())) {
        return true;
      } else if (config.instanceOf && file instanceof config.instanceOf) {
        return true;
      }
      return false;
    },

    getAllFileHandlers: function (file) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertInstance(file, cv.ui.manager.model.FileItem);
      }
      return  Object.keys(this.__registry).filter(function (key) {
        return this.__canHandle(this.__registry[key], file);
      }, this).map(function (key) {
        return this.__registry[key];
      }, this);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    // cleanup editor instances
    if (this.__defaultEditor.instance) {
      this.__defaultEditor.instance.dispose();
      this.__defaultEditor.instance = null;
    }
    Object.keys(this.__registry).forEach(function (regex) {
      if (this.__registry[regex].instance) {
        this.__registry[regex].instance.dispose();
        this.__registry[regex].instance = null;
      }
    }, this);

    cv.ui.manager.model.Preferences.getInstance().removeListener('changeDefaultConfigEditor', this._onChangesDefaultConfigEditor, this);
  }
});
