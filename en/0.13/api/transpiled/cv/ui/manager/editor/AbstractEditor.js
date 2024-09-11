(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.editor.IEditor": {
        "require": true
      },
      "cv.ui.manager.IActionHandler": {
        "require": true
      },
      "cv.io.rest.Client": {},
      "qx.event.message.Bus": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qx.lang.Function": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractEditor.js
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
   * Abstract base class for all editors.
   */
  qx.Class.define('cv.ui.manager.editor.AbstractEditor', {
    extend: qx.ui.core.Widget,
    implement: [cv.ui.manager.editor.IEditor, cv.ui.manager.IActionHandler],
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this._initClient();
      if (this._client) {
        this._client.addListener('error', function (ev) {
          if (ev.getRequest().getStatus() === 401) {
            this.fireEvent('unauthorized');
          }
        }, this);
      }
      this._nativePasteSupported = document.queryCommandSupported('paste');
    },
    /*
    ***********************************************
     EVENTS
    ***********************************************
    */
    events: {
      'unauthorized': 'qx.event.type.Event'
    },
    /*
    ***********************************************
     PROPERTIES
    ***********************************************
    */
    properties: {
      file: {
        check: 'cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles',
        nullable: true,
        apply: '_loadFile',
        event: 'changeFile'
      },
      content: {
        nullable: true,
        event: 'changeContent',
        apply: '_applyContent'
      },
      handlerOptions: {
        check: 'Map',
        nullable: true,
        apply: '_applyHandlerOptions'
      },
      /**
       * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
       */
      external: {
        check: 'Boolean',
        init: false
      },
      ready: {
        check: 'Boolean',
        init: true,
        event: 'changeReady'
      }
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      // fake clipboard data when native clipboard is not supported
      CLIPBOARD: null
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _handledActions: null,
      _nativePasteSupported: false,
      canHandleAction: function canHandleAction(actionName) {
        if (actionName === 'save' && this.getFile() && !this.getFile().isWriteable()) {
          return false;
        }
        return this._handledActions && this._handledActions.includes(actionName);
      },
      handleAction: function handleAction(actionName) {
        if (this.canHandleAction(actionName)) {
          switch (actionName) {
            case 'save':
              this.save();
              break;
          }
        }
      },
      configureButton: function configureButton(button) {},
      unConfigureButton: function unConfigureButton(button) {},
      _initClient: function _initClient() {
        this._client = cv.io.rest.Client.getFsClient();
      },
      _applyHandlerOptions: function _applyHandlerOptions() {},
      _loadFile: function _loadFile(file, old) {
        if (old) {
          qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
        }
        if (file && file.getType() === 'file') {
          if (file.getContent() !== null) {
            this.setContent(file.getContent());
          } else {
            this._loadFromFs();
          }
          qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
        } else {
          this.resetContent();
        }
      },
      _loadFromFs: function _loadFromFs() {
        this._client.readSync({
          path: this.getFile().getFullPath()
        }, function (err, res) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            if (res instanceof XMLDocument) {
              res = new XMLSerializer().serializeToString(res);
            }
            this.setContent(res);
          }
        }, this);
      },
      _onChange: function _onChange(ev) {
        var data = ev.getData();
        if (data.type === 'fsContentChanged' && data.source !== this) {
          this.setContent(data.data);
        }
      },
      // must be overridden by inheriting classes
      _applyContent: function _applyContent() {},
      // must be overridden by inheriting classes
      getCurrentContent: function getCurrentContent() {},
      _handleSaveResponse: function _handleSaveResponse(type, err) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else {
          var message = type === 'created' ? this.tr('File has been created') : this.tr('File has been saved');
          cv.ui.manager.snackbar.Controller.info(message);
          this._onSaved();
          var file = this.getFile();
          if (file) {
            // file content loaded from FS is outdated now
            file.resetContent();
            qx.event.message.Bus.dispatchByName(file.getBusTopic(), {
              type: type,
              file: file,
              data: this.getCurrentContent(),
              source: this
            });
          }
        }
      },
      save: function save(callback, overrideHash) {
        var file = this.getFile();
        if (file.isModified()) {
          if (file.isTemporary()) {
            this._client.createSync({
              path: file.getFullPath(),
              hash: overrideHash || file.getHash(),
              type: 'file'
            }, this.getCurrentContent(), callback || qx.lang.Function.curry(this._handleSaveResponse, 'created'), this);
          } else {
            this._client.updateSync({
              path: file.getFullPath(),
              hash: overrideHash || file.getHash()
            }, this.getCurrentContent(), callback || qx.lang.Function.curry(this._handleSaveResponse, 'contentChanged'), this);
          }
        }
      },
      _onSaved: function _onSaved() {
        var file = this.getFile();
        if (file) {
          file.resetModified();
          file.resetTemporary();
        }
      },
      showErrors: function showErrors(path, errorList) {},
      showDecorations: function showDecorations(path, decorators) {}
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      if (this._client) {
        this._client = null;
      }
    }
  });
  cv.ui.manager.editor.AbstractEditor.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractEditor.js.map?dt=1726089029058