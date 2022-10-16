/* FileHandlerRegistry.js
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
  construct() {
    super();
    this.__registry = {};
    this.__defaults = [];

    // register viewers
    this.registerFileHandler(
      new RegExp(
        '\\.(' + cv.ui.manager.viewer.Image.SUPPORTED_FILES.join('|') + ')$',
        'i'
      ),

      cv.ui.manager.viewer.Image,
      { type: 'view' }
    );

    this.registerFileHandler(
      cv.ui.manager.viewer.Config.SUPPORTED_FILES,
      cv.ui.manager.viewer.Config,
      { type: 'view' }
    );

    this.registerFileHandler(
      cv.ui.manager.viewer.Icons.SUPPORTED_FILES,
      cv.ui.manager.viewer.Icons,
      { type: 'view' }
    );

    this.registerFileHandler(
      cv.ui.manager.viewer.Folder.SUPPORTED_FILES,
      cv.ui.manager.viewer.Folder,
      { type: 'view' }
    );

    this.registerFileHandler(null, cv.ui.manager.Start, { type: 'view' });

    // register the basic editors
    this.registerFileHandler(
      cv.ui.manager.editor.Source.SUPPORTED_FILES,
      cv.ui.manager.editor.Source,
      { type: 'edit' }
    );

    this.registerFileHandler(
      cv.ui.manager.editor.Tree.SUPPORTED_FILES,
      cv.ui.manager.editor.Tree,
      {
        preview: false,
        type: 'edit'
      }
    );

    this.registerFileHandler(
      cv.ui.manager.model.CompareFiles,
      cv.ui.manager.editor.Diff,
      { type: 'view' }
    );

    this.registerFileHandler('hidden.php', cv.ui.manager.editor.Config, {
      type: 'edit'
    });

    cv.ui.manager.model.Preferences.getInstance().addListener(
      'changeDefaultConfigEditor',
      this._onChangesDefaultConfigEditor,
      this
    );

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
     * @param selector {String|RegExp|Class|Function|null} filename-/path or regular expression. If null this is a special handler that must be loaded manually (like cv.ui.manager.Start)
     * @param clazz {qx.ui.core.Widget} widget class that handles those type of files
     * @param options {Map?} additional options to store in the registry
     */
    registerFileHandler(selector, clazz, options) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertTrue(
          qx.Interface.classImplements(clazz, cv.ui.manager.editor.IEditor)
        );
      }
      const config = Object.assign(
        {
          Clazz: clazz,
          instance: null
        },

        options || {}
      );

      if (qx.Class.isClass(selector)) {
        config.instanceOf = selector;
        config.selectorId = 'instanceOf:' + selector.classname;
        // highest priority
        config.priority = 0;
      } else if (qx.lang.Type.isRegExp(selector)) {
        config.regex = selector;
        config.selectorId = 'regex:' + selector.toString();
        config.priority = 4;
      } else if (qx.lang.Type.isFunction(selector)) {
        config.selectorId = 'function:' + selector.name;
        config.priority = 3;
        config.function = selector;
      } else if (qx.lang.Type.isString(selector)) {
        // simple file matcher
        if (selector.includes('/')) {
          config.fullPath = selector;
          config.selectorId = 'fullPath:' + selector;
          config.priority = 1;
        } else {
          config.fileName = selector;
          config.selectorId = 'fileName:' + selector;
          config.priority = 2;
        }
      } else {
        config.selectorId = 'none';
        config.priority = 10;
      }
      this.__registry[clazz.classname] = config;
    },

    getFileHandler(file, type) {
      const handlers = [];
      if (!(file instanceof cv.ui.manager.model.CompareFiles)) {
        // check if there is a default first
        let defaultHandler;
        Object.keys(this.__defaults).some(function (key) {
          if (
            this.__defaults[key].regex.test(file.getFullPath()) &&
            (!file.isTemporary() || !this.__defaults[key].noTemporaryFiles) &&
            (file.isWriteable() || !this.__defaults[key].noReadOnlyFiles)
          ) {
            if (type) {
              const config = this.getFileHandlerById(
                this.__defaults[key].clazz.classname
              );

              if (config.type === type) {
                defaultHandler = config;
              }
            } else {
              defaultHandler = this.getFileHandlerById(
                this.__defaults[key].clazz.classname
              );
            }
          }
          return !!defaultHandler;
        }, this);
        if (defaultHandler) {
          return defaultHandler;
        }
      }

      Object.keys(this.__registry).forEach(function (classname) {
        const config = this.__registry[classname];
        if (this.__canHandle(config, file) && (!type || config.type === type)) {
          handlers.push(config);
        }
      }, this);
      if (handlers.length === 0) {
        if (!file.isFake() && file.getDisplayName().split('.').length === 1) {
          // file without file ending => use the source code editor
          return this.getFileHandlerById('cv.ui.manager.editor.Source');
        }
        // no editors found
        return null;
      } else if (handlers.length === 1) {
        return handlers[0];
      }
      // sort by selector priority (instance, fullpath, filename, regex)
      handlers.sort(function (a, b) {
        return a.priority - b.priority;
      });
      // no default handler, just take the first one
      return handlers[0];
    },

    getFileHandlerById(handlerId) {
      return this.__registry[handlerId];
    },

    hasFileHandler(file, type) {
      return Object.keys(this.__registry).some(function (classname) {
        const config = this.__registry[classname];
        return (
          this.__canHandle(config, file) && (!type || config.type === type)
        );
      }, this);
    },

    /**
     * Mark the handler with the given classname as default for the selector-id and all others with the same selector id not,
     * @param selector {RegExp}
     * @param clazz {qx.Class}
     * @param noTemporaryFiles {Boolean} flag to prevent this default editor from being used to open temporary files.
     * @param noReadOnlyFiles {Boolean} fleag to prevent this default editor from being used to open file that are not writeable
     */
    setDefault(selector, clazz, noTemporaryFiles, noReadOnlyFiles) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertRegExp(selector);
        qx.core.Assert.assertTrue(qx.Class.isClass(clazz));
      }
      this.__defaults[selector.toString()] = {
        regex: selector,
        clazz: clazz,
        noTemporaryFiles: noTemporaryFiles,
        noReadOnlyFiles: noReadOnlyFiles
      };
    },

    _onChangesDefaultConfigEditor() {
      switch (
        cv.ui.manager.model.Preferences.getInstance().getDefaultConfigEditor()
      ) {
        case 'source':
          this.setDefault(
            cv.ui.manager.editor.Source.DEFAULT_FOR,
            cv.ui.manager.editor.Source
          );

          break;

        case 'xml':
          this.setDefault(
            cv.ui.manager.editor.Tree.SUPPORTED_FILES,
            cv.ui.manager.editor.Tree
          );

          break;
      }
    },

    __canHandle(config, file) {
      if (config.noTemporaryFiles === true && file.isTemporary()) {
        return false;
      } else if (config.noReadOnlyFiles === true && !file.isWriteable()) {
        return false;
      } else if (config.fileName && file.getName() === config.fileName) {
        return true;
      } else if (config.fullPath && file.getFullPath() === config.fullPath) {
        return true;
      } else if (
        config.regex &&
        config.regex.test(file.getFullPath().toLowerCase())
      ) {
        return true;
      } else if (config.instanceOf && file instanceof config.instanceOf) {
        return true;
      } else if (config.function && config.function(file)) {
        return true;
      }
      return false;
    },

    getAllFileHandlers(file, type) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertTrue(
          file instanceof cv.ui.manager.model.FileItem ||
            file instanceof cv.ui.manager.model.CompareFiles
        );
      }
      return Object.keys(this.__registry)
        .filter(function (key) {
          return (
            this.__canHandle(this.__registry[key], file) &&
            (!type || this.__registry[key].type === type)
          );
        }, this)
        .map(function (key) {
          return this.__registry[key];
        }, this);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    // cleanup handler instances
    Object.keys(this.__registry).forEach(function (regex) {
      if (this.__registry[regex].instance) {
        this.__registry[regex].instance.dispose();
        this.__registry[regex].instance = null;
      }
    }, this);

    cv.ui.manager.model.Preferences.getInstance().removeListener(
      'changeDefaultConfigEditor',
      this._onChangesDefaultConfigEditor,
      this
    );
  }
});
