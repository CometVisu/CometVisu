(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.editor.AbstractEditor": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "cv.ui.manager.model.Schema": {
        "construct": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Viewport": {},
      "cv.ui.manager.model.ElementChange": {},
      "cv.ui.manager.editor.Worker": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.Canvas": {},
      "qx.ui.layout.VBox": {},
      "cv.ui.manager.viewer.Config": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.form.TextField": {},
      "qx.util.Function": {},
      "qx.ui.tree.VirtualTree": {},
      "qx.bom.client.Device": {
        "require": true
      },
      "cv.ui.manager.tree.VirtualElementItem": {},
      "qxl.dialog.Dialog": {},
      "qx.ui.core.Widget": {},
      "qx.ui.decoration.Decorator": {},
      "cv.ui.manager.contextmenu.ConfigElement": {},
      "qx.ui.core.DragDropCursor": {},
      "qx.event.Timer": {},
      "cv.ui.manager.snackbar.Controller": {},
      "cv.ui.manager.form.ElementForm": {},
      "cv.ui.manager.model.schema.Element": {},
      "cv.ui.manager.model.XmlElement": {},
      "cv.ui.manager.editor.data.Provider": {},
      "qx.ui.form.ListItem": {},
      "qx.core.ValidationError": {},
      "cv.ui.manager.dialog.ValidationError": {},
      "cv.ui.manager.Main": {},
      "qx.event.message.Bus": {},
      "cv.ui.manager.model.FileItem": {},
      "qx.xml.Document": {},
      "qx.xml.String": {},
      "qx.ui.core.FocusHandler": {},
      "cv.ui.manager.dialog.BigAlert": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.touch": {
          "className": "qx.bom.client.Device"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Tree.js 
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
   * New XML-Editor base on a node tree
   */
  qx.Class.define('cv.ui.manager.editor.Tree', {
    extend: cv.ui.manager.editor.AbstractEditor,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      var _this = this;

      cv.ui.manager.editor.AbstractEditor.constructor.call(this);

      this._setLayout(new qx.ui.layout.Grow());

      this._handledActions = ['save', 'cut', 'copy', 'paste', 'undo', 'redo', 'help'];

      this._initWorker(); // init schema


      this._schema = cv.ui.manager.model.Schema.getInstance('visu_config.xsd');

      this._schema.onLoaded(function () {
        this.setReady(true);

        this._draw();
      }, this);

      this.__P_33_0 = [];
      this.__P_33_1 = new qx.data.Array();

      this.__P_33_1.addListener('changeLength', function (ev) {
        if (ev.getData() === 0) {
          _this.setPreviewState('synced');
        } else {
          var structureChanges = _this.__P_33_1.some(function (element) {
            return element.hasChildrenModified();
          });

          _this.setPreviewState(structureChanges ? 'structureChanged' : 'changed');
        }
      }, this);

      this.initUnDos(new qx.data.Array());
      this.initReDos(new qx.data.Array());
      this.__P_33_2 = {};
      qx.core.Init.getApplication().getRoot().addListener('keyup', this._onElementKeyUp, this);
      this.addListener('resize', this._maintainPreviewVisibility, this);
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      SUPPORTED_FILES: /^(demo|\.)?\/?visu_config.*\.xml/,
      TITLE: qx.locale.Manager.tr('Xml-editor'),
      ICON: cv.theme.dark.Images.getIcon('xml', 18),
      Allowed: {
        NONE: 0,
        BEFORE: 1,
        AFTER: 2,
        INSIDE: 4,
        FIRST_CHILD: 8 // Is allowed to added as first child

      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'tree-editor'
      },
      // show expert level settings
      expert: {
        check: 'Boolean',
        init: false
      },
      ready: {
        refine: true,
        init: false
      },
      selected: {
        check: 'cv.ui.manager.model.XmlElement',
        nullable: true,
        event: 'changeSelected',
        apply: '_applySelected'
      },
      clipboard: {
        check: 'cv.ui.manager.model.XmlElement',
        nullable: true,
        event: 'changeClipboard',
        apply: '_applyClipboard'
      },
      unDos: {
        check: 'qx.data.Array',
        deferredInit: true
      },
      reDos: {
        check: 'qx.data.Array',
        deferredInit: true
      },
      autoRefreshPreview: {
        check: 'Boolean',
        init: false
      },

      /**
       * Content and shown preview are equal
       */
      previewState: {
        check: ['synced', 'changed', 'structureChanged'],
        init: 'synced',
        event: 'previewStateChanged',
        apply: '_updateHighlightWidget'
      },
      showPreview: {
        check: 'Boolean',
        init: true,
        apply: '_applyShowPreview',
        event: 'showPreviewChanged'
      },

      /**
       * true while the user is dragging something
       */
      dragging: {
        check: 'Boolean',
        init: false,
        event: 'changeDragging'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _schema: null,
      __P_33_0: null,
      __P_33_1: null,
      _workerWrapper: null,
      __P_33_3: false,
      __P_33_2: null,
      __P_33_4: null,
      __P_33_5: 0,
      isPreviewSynced: function isPreviewSynced() {
        return this.getPreviewState() === 'synced';
      },
      _applyHandlerOptions: function _applyHandlerOptions() {
        this._maintainPreviewVisibility();
      },
      _maintainPreviewVisibility: function _maintainPreviewVisibility() {
        var handlerOptions = this.getHandlerOptions();
        this.setShowPreview(qx.bom.Viewport.getWidth() > 800 && (!handlerOptions || !handlerOptions.noPreview));
      },
      _applyShowPreview: function _applyShowPreview(value) {
        this.getChildControl('right').setVisibility(value ? 'visible' : 'excluded');

        if (value) {
          this.getChildControl('left').clearLayoutProperties();
          this.getChildControl('left').updateLayoutProperties();
        } else {
          var handlerOptions = this.getHandlerOptions();

          if (!handlerOptions || !handlerOptions.noStretch) {
            this.getChildControl('left').setLayoutProperties({
              flex: 1
            });
          }
        }

        var file = this.getFile();

        if (value && file) {
          var preview = this.getChildControl('preview');

          if (file.isWriteable()) {
            if (!preview.getFile()) {
              preview.setFile(this.__P_33_6());
            }
          } else {
            // this file is not writable, we can use the real one for preview
            preview.setFile(file);
          }

          this._updatePreview();
        }
      },
      handleAction: function handleAction(actionName) {
        if (this.canHandleAction(actionName)) {
          switch (actionName) {
            case 'undo':
              if (!this.__P_33_3) {
                this.undo();
              }

              break;

            case 'redo':
              if (!this.__P_33_3) {
                this.redo();
              }

              break;

            case 'cut':
              this._onCut();

              break;

            case 'copy':
              this._onCopy();

              break;

            case 'paste':
              this._onPaste();

              break;

            case 'help':
              if (!this.__P_33_3) {
                this._showHelp();
              }

              break;

            default:
              cv.ui.manager.editor.Tree.prototype.handleAction.base.call(this, actionName);
              break;
          }
        }
      },
      configureButton: function configureButton(actionId, button) {
        var _this2 = this;

        switch (actionId) {
          case 'undo':
            this.__P_33_2[actionId] = this.getUnDos().addListener('changeLength', function () {
              var length = _this2.getUnDos().length;

              if (length > 0) {
                button.setEnabled(true);
                button.setToolTipText(_this2.tr('Undo: %1', _this2.getUnDos().getItem(length - 1).getTitle()));
              } else {
                button.setEnabled(false);
                button.resetToolTipText();
              }
            }, this);
            button.setEnabled(this.getUnDos().length > 0);
            break;

          case 'redo':
            this.__P_33_2[actionId] = this.getReDos().addListener('changeLength', function () {
              var length = _this2.getReDos().length;

              if (length > 0) {
                button.setEnabled(true);
                button.setToolTipText(_this2.tr('Undo: %1', _this2.getReDos().getItem(length - 1).getTitle()));
              } else {
                button.setEnabled(false);
                button.resetToolTipText();
              }
            }, this);
            button.setEnabled(this.getReDos().length > 0);
            break;

          case 'cut':
            this.bind('selected', button, 'enabled', {
              converter: function converter(value) {
                return value ? !value.isDeletable() : false;
              }
            });
            break;

          case 'copy':
            this.bind('selected', button, 'enabled', {
              converter: function converter(value) {
                return !!value;
              }
            });
            break;

          case 'paste':
            this.bind('clipboard', button, 'enabled', {
              converter: function converter(value) {
                return !!value;
              }
            });
            break;
        }
      },
      unConfigureButton: function unConfigureButton(actionId, button) {
        switch (actionId) {
          case 'undo':
            if (this.__P_33_2[actionId]) {
              this.getUnDos().removeListenerById(this.__P_33_2[actionId]);
              delete this.__P_33_2[actionId];
            }

            button.setEnabled(false);
            break;

          case 'redo':
            if (this.__P_33_2[actionId]) {
              this.getReDos().removeListenerById(this.__P_33_2[actionId]);
              delete this.__P_33_2[actionId];
            }

            button.setEnabled(false);
            break;

          case 'paste':
          case 'cut':
          case 'copy':
            this.removeRelatedBindings(button);
            break;
        }
      },
      addUndo: function addUndo(elementChange) {
        if (elementChange instanceof cv.ui.manager.model.ElementChange) {
          this.getUnDos().push(elementChange);
        }
      },
      undo: function undo() {
        var unDos = this.getUnDos();

        if (unDos.length > 0) {
          var elementChange = unDos.pop();

          if (elementChange.undo()) {
            this.getReDos().push(elementChange);
          } else {
            this.error('could not undo ' + elementChange.getTitle());
            unDos.push(elementChange);
          }
        }
      },
      redo: function redo() {
        var reDos = this.getReDos();

        if (reDos.length > 0) {
          var elementChange = reDos.pop();

          if (elementChange.redo()) {
            this.getUnDos().push(elementChange);
          } else {
            this.error('could not redo ' + elementChange.getTitle());
            reDos.push(elementChange);
          }
        }
      },
      clearUnDosReDos: function clearUnDosReDos() {
        this.getUnDos().removeAll().forEach(function (elem) {
          return elem.dispose();
        });
        this.clearReDos();
      },
      clearReDos: function clearReDos() {
        this.getReDos().removeAll().forEach(function (elem) {
          return elem.dispose();
        });
      },
      _applyClipboard: function _applyClipboard(value) {
        try {
          if (value) {
            navigator.clipboard.writeText(value.getNode().outerHTML);
          } else {
            navigator.clipboard.writeText('');
          }
        } catch (e) {
          // clipboard api is only available in secure environment, otherwise we have to do it ourself
          cv.ui.manager.editor.AbstractEditor.CLIPBOARD = value ? value.getNode().outerHTML : '';
        }
      },
      _initWorker: function _initWorker() {
        this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
      },
      showErrors: function showErrors(path, errorList) {},
      showDecorations: function showDecorations(path, decorators) {},
      _loadFile: function _loadFile(file, old) {
        if (old && this._workerWrapper) {
          this._workerWrapper.close(old);
        }

        if (file && file.getType() === 'file' && this.isSupported(file)) {
          cv.ui.manager.editor.Tree.prototype._loadFile.base.call(this, file, old);
        } else {
          cv.ui.manager.editor.Tree.prototype._loadFile.base.call(this, null, old);

          if (this.hasChildControl('preview')) {
            this.getChildControl('preview').resetFile();
          }

          this.resetPreviewState();
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var _this3 = this;

        var control;

        switch (id) {
          case 'splitpane':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox());

            this._add(control);

            break;

          case 'left':
            control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            this.getChildControl('splitpane').addAt(control, 0);
            break;

          case 'right':
            control = new qx.ui.container.Composite(new qx.ui.layout.VBox());

            if (!this.isShowPreview()) {
              control.exclude();
            }

            this.getChildControl('splitpane').addAt(control, 1, {
              flex: 1
            });
            break;

          case 'preview':
            control = new cv.ui.manager.viewer.Config();
            control.set({
              target: 'iframe',
              minWidth: 600
            });
            this.getChildControl('right').addAt(control, 1, {
              flex: 1
            });
            break;

          case 'preview-sync-hint':
            {
              var ok = this.tr('Preview shows the current state of the edited configuration.');
              var noSync = this.tr('Preview is out of sync. Click here to refresh.');
              var notOk = this.tr('Preview is out of sync. Highlighting of the currently selected tree element is deactivated until you refresh the preview. Click here to refresh.');
              control = new qx.ui.basic.Atom(ok, cv.theme.dark.Images.getIcon('valid', 16));
              control.setRich(true);
              control.getChildControl('label').setWrap(true);
              control.addListener('tap', function () {
                if (!_this3.isPreviewSynced() && _this3.isShowPreview()) {
                  _this3._updatePreview();
                }
              }, this);
              this.getChildControl('right').addAt(control, 0);
              this.addListener('previewStateChanged', function (ev) {
                switch (ev.getData()) {
                  case 'synced':
                    control.set({
                      label: ok,
                      icon: cv.theme.dark.Images.getIcon('valid', 16)
                    });
                    control.getChildControl('icon').removeState('error');
                    control.getChildControl('icon').removeState('warning');
                    break;

                  case 'changed':
                    control.set({
                      label: noSync,
                      icon: cv.theme.dark.Images.getIcon('out-of-sync', 16)
                    });
                    control.getChildControl('icon').removeState('error');
                    control.getChildControl('icon').addState('warning');
                    break;

                  case 'structureChanged':
                    control.set({
                      label: notOk,
                      icon: cv.theme.dark.Images.getIcon('out-of-sync', 16)
                    });
                    control.getChildControl('icon').addState('error');
                    control.getChildControl('icon').removeState('warning');
                    break;
                }
              }, this);
              break;
            }

          case 'edit-button':
            control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('edit', 24));
            control.setEnabled(false);
            control.addListener('execute', this._onEdit, this);
            this.bind('file.writeable', control, 'icon', {
              converter: function converter(value) {
                return value ? cv.theme.dark.Images.getIcon('edit', 16) : cv.theme.dark.Images.getIcon('view', 16);
              }
            });
            this.getChildControl('toolbar').add(control);
            break;

          case 'delete-button':
            control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('delete', 16));
            control.setEnabled(false);
            control.addListener('execute', this._onDelete, this);
            this.getChildControl('toolbar').add(control);
            break;

          case 'toggle-expert':
            control = new qx.ui.form.CheckBox(this.tr('Expertview'));
            control.addListener('changeValue', function (ev) {
              this.setExpert(ev.getData());
            }, this);
            this.getChildControl('toolbar').add(control);
            break;

          case 'refresh-preview':
            control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 16));
            control.setToolTipText(this.tr('Reload preview'));
            control.addListener('execute', this._updatePreview, this);
            this.bind('showPreview', control, 'visibility', {
              converter: function converter(value) {
                return value ? 'visible' : 'hidden';
              }
            });
            this.bind('previewState', control, 'enabled', {
              converter: function converter(value) {
                return value !== 'synced';
              }
            });
            this.getChildControl('toolbar').add(control);
            break;

          case 'toolbar':
            control = new qx.ui.toolbar.ToolBar();
            this.getChildControl('left').add(control, {
              top: 0,
              left: 0,
              right: 0
            });
            break;

          case 'searchbar-container':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            this.getChildControl('left').add(control, {
              top: 36,
              left: 0,
              right: 0
            });
            break;

          case 'searchbar':
            control = new qx.ui.form.TextField();
            control.set({
              liveUpdate: true,
              placeholder: this.tr('Search...'),
              margin: 8
            });
            control.addListener('changeValue', qx.util.Function.debounce(this._onSearch, 250), this);
            control.addListener('keyup', function (ev) {
              switch (ev.getKeyIdentifier()) {
                case 'Enter':
                case 'Down':
                  this._showNextResult();

                  break;

                case 'Up':
                  this._showPreviousResult();

                  break;
              }

              ev.stopPropagation();
            }, this);
            this.getChildControl('searchbar-container').add(control, {
              flex: 1
            });
            break;

          case 'tree':
            control = new qx.ui.tree.VirtualTree(null, 'displayName', 'children');
            control.set({
              selectionMode: 'single',
              width: 350,
              openMode: 'none',
              itemHeight: qx.core.Environment.get('device.touch') ? 40 : 20
            });
            this.bind('file.writeable', control, 'droppable');
            this.bind('file.writeable', control, 'draggable');

            this._initDragDrop(control);

            control.setDelegate({
              createItem: function () {
                var item = new cv.ui.manager.tree.VirtualElementItem();

                if (!qx.core.Environment.get('device.touch')) {
                  item.addListener('contextmenu', this._onContextMenu, this);
                } else {
                  item.addListener('action', this._onContextMenuAction, this);
                }

                item.addListener('dbltap', this._onEdit, this);
                return item;
              }.bind(this),
              // Bind properties from the item to the tree-widget and vice versa
              bindItem: function bindItem(controller, item, index) {
                controller.bindProperty('', 'model', null, item, index);
                controller.bindProperty('displayName', 'label', null, item, index);
                controller.bindProperty('name', 'name', null, item, index);
                controller.bindPropertyReverse('open', 'open', null, item, index);
                controller.bindProperty('open', 'open', null, item, index);
                controller.bindProperty('showEditButton', 'editable', null, item, index);
                controller.bindProperty('sortable', 'sortable', null, item, index);
                controller.bindProperty('icon', 'icon', null, item, index);
                controller.bindProperty('status', 'status', null, item, index);
                controller.bindProperty('invalidMessage', 'toolTipText', null, item, index);
                controller.bindProperty('dragging', 'dragging', null, item, index);
              }
            });
            control.getSelection().addListener('change', this._onChangeTreeSelection, this);
            this.getChildControl('left').add(control, {
              top: 72,
              left: 0,
              right: 0,
              bottom: 0
            });
            break;

          case 'add-button':
            control = new qx.ui.basic.Atom(null, cv.theme.dark.Images.getIcon('add', 32));
            control.setDraggable(true);
            control.setMarginLeft(-16);
            control.setZIndex(20);
            this.addListener('changeDragging', function (ev) {
              control.setLayoutProperties({
                bottom: 16,
                left: ev.getData() ? -1000 : '50%'
              });
            }, this);
            control.setAppearance('round-button');
            control.addListener('pointerover', function () {
              return control.addState('hovered');
            });
            control.addListener('pointerout', function () {
              return control.removeState('hovered');
            });
            control.addListener('tap', function () {
              if (_this3.getSelected()) {
                _this3._onCreate(_this3.getSelected(), 'inside');
              } else {
                qxl.dialog.Dialog.alert(_this3.tr('Please create a new Element either by dragging this button to the place where the new element should be inserted or by selecting an element and pressing this button to insert a new child to this element.'));
              }
            }, this);
            this.getChildControl('left').add(control, {
              bottom: 16,
              left: '50%'
            });
            break;

          case 'drag-indicator':
            // Create drag indicator
            control = new qx.ui.core.Widget();
            control.setDecorator(new qx.ui.decoration.Decorator().set({
              widthTop: 1,
              styleTop: 'solid',
              colorTop: 'white'
            }));
            control.setHeight(0);
            control.setOpacity(0.5);
            control.setZIndex(100);
            control.setDroppable(true);
            control.setLayoutProperties({
              left: -1000,
              top: -1000
            });
            qx.core.Init.getApplication().getRoot().add(control);
            break;

          case 'context-menu':
            control = new cv.ui.manager.contextmenu.ConfigElement(this);
            control.addListener('action', this._onContextMenuAction, this);
            break;
        }

        return control || cv.ui.manager.editor.Tree.prototype._createChildControlImpl.base.call(this, id);
      },
      _onContextMenu: function _onContextMenu(ev) {
        var target = ev.getCurrentTarget();

        if (target instanceof cv.ui.manager.tree.VirtualElementItem) {
          var element = target.getModel();
          this.getChildControl('tree').getSelection().replace([element]);
          this.setSelected(element);
          var menu = this.getChildControl('context-menu');
          menu.setElement(element);
          menu.openAtPointer(ev);
        } // Do not show native menu
        // don't open any other contextmenus


        if (ev.getBubbles()) {
          ev.stop();
        }
      },
      _onContextMenuAction: function _onContextMenuAction(ev) {
        var data = ev.getData();

        if (this.canHandleAction(data.action)) {
          this.handleAction(data.action);
        } else {
          switch (data.action) {
            case 'view':
            case 'edit':
              this._onEdit(null, data.element);

              break;

            case 'delete':
              this._onDelete(null, data.element);

              break;

            case 'create':
              // add a new child
              this._onCreate(data.element, 'inside');

              break;

            default:
              this.error('unhandled context menu action', data.action);
              break;
          }
        }
      },
      _onChangeTreeSelection: function _onChangeTreeSelection(ev) {
        var data = ev.getData();

        if (data.added.length === 1) {
          this.setSelected(data.added[0]);
        } else {
          this.resetSelected();
        }
      },
      openByQuerySelector: function openByQuerySelector(selector, edit) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          var tree = _this4.getChildControl('tree');

          var rootNode = tree.getModel().getNode();
          var result = rootNode.querySelector(selector);

          if (result) {
            _this4.__P_33_4 = [result];
            _this4.__P_33_5 = 0;

            _this4.__P_33_7();

            if (edit) {
              _this4._onEdit();
            }

            resolve(true);
          } else {
            resolve(false);
          }
        });
      },
      _onSearch: function _onSearch(ev) {
        var value = ev.getData();
        this.__P_33_4 = [];
        this.__P_33_5 = 0;

        if (value.length > 2) {
          var tree = this.getChildControl('tree');
          var rootNode = tree.getModel().getNode();
          this.__P_33_4 = Array.from(rootNode.querySelectorAll('*')).filter(function (el) {
            return el.tagName.startsWith(value) || el.hasAttribute('name') && el.getAttribute('name').startsWith(value);
          });

          this.__P_33_7();
        }
      },
      _showNextResult: function _showNextResult() {
        if (this.__P_33_4 && this.__P_33_4.length > this.__P_33_5 + 1) {
          this.__P_33_5++;

          this.__P_33_7();
        }
      },
      _showPreviousResult: function _showPreviousResult() {
        if (this.__P_33_4 && this.__P_33_5 > 0) {
          this.__P_33_5--;

          this.__P_33_7();
        }
      },
      __P_33_7: function __P_33_7() {
        if (this.__P_33_4.length > this.__P_33_5) {
          // find and open the first result and save the rest for traversal (with keyboard arrows
          var firstMatch = this.__P_33_4[this.__P_33_5];
          var tree = this.getChildControl('tree');

          if (firstMatch.$$widget) {
            tree.openNodeAndParents(firstMatch.$$widget);
            tree.getSelection().replace([firstMatch.$$widget]);
          } else {
            var current = firstMatch;
            var ancestors = []; // lookup the path until we find the first one with a widget

            while (current && !current.$$widget) {
              current = current.parentElement;

              if (current) {
                ancestors.push(current);
              }
            }

            if (current && current.$$widget) {
              current.$$widget.load(); // now git down the path of found ancestors and load them all

              for (var i = ancestors.length - 1; i >= 0; i--) {
                var p = ancestors[i].$$widget;

                if (p) {
                  p.load();
                }
              }

              if (firstMatch.$$widget) {
                tree.openNodeAndParents(firstMatch.$$widget);
                tree.getSelection().replace([firstMatch.$$widget]);
              }
            }
          }
        }
      },
      _initDragDrop: function _initDragDrop(control) {
        var draggedXmlElement;
        control.addListener('dragstart', function (ev) {
          var dragTarget = ev.getDragTarget();
          var element;

          if (dragTarget instanceof cv.ui.manager.tree.VirtualElementItem) {
            element = dragTarget.getModel();
            element.setDragging(true);

            if (!element.isEditable() || !element.isDeletable()) {
              ev.preventDefault();
              ev.stopPropagation();
              return;
            }

            ev.addAction('copy');

            if (element.isDeletable()) {
              ev.addAction('move');
            }

            ev.addType('cv/tree-element');
            ev.addData('cv/tree-element', element);
            draggedXmlElement = element;
          }

          this.setDragging(true);
        }, this);
        var addButton = this.getChildControl('add-button');
        addButton.addListener('dragstart', function (ev) {
          ev.addAction('copy');
          ev.addType('cv/new-tree-element');
          this.setDragging(true);
        }, this);
        var Allowed = cv.ui.manager.editor.Tree.Allowed;
        var accepted = {
          mode: 0,
          target: null
        };
        control.addListener('dragover', function (ev) {
          var _this5 = this;

          // add ist a custom action that cannot be detected, so we only check if its supported
          var action = ev.getCurrentAction();
          var element;

          if (ev.supportsType('cv/tree-element')) {
            element = ev.getData('cv/tree-element');
          }

          var addNew = action === 'copy' && !element && ev.supportsType('cv/new-tree-element');
          var target = ev.getTarget();

          if (target === indicator) {
            // no change when we are dragging over the indicator
            this.debug('dragging over indicator');
            return;
          }

          if (action !== 'copy' && target && target instanceof cv.ui.manager.tree.VirtualElementItem) {
            if (target.getModel() === element) {
              // cannot drop on myself
              this.debug('dropping on same element forbidden');
              accepted.mode = Allowed.NONE;
              ev.preventDefault();
              return;
            } else if (element && element.isAncestor(target.getModel())) {
              // cannot move into myself
              this.debug('moving inside own subtree forbidden');
              accepted.mode = Allowed.NONE;
              ev.preventDefault();
              return;
            }
          }

          if (target === control) {
            var layerContent = control.getPane().getLayers()[0].getContentLocation();

            if (layerContent && ev.getDocumentTop() - layerContent.bottom <= 20) {
              // when we are not more than 10px away from the last tree element we use that one, otherwise dropping is forbidden
              var lastElem = document.elementFromPoint(Math.round((layerContent.left + layerContent.right) / 2), layerContent.bottom - 20);
              target = qx.ui.core.Widget.getWidgetByElement(lastElem);

              if (target) {
                while (target.isAnonymous()) {
                  target = target.getLayoutParent();
                }
              }
            } else {
              target = null;
            }

            if (!target || target === control) {
              accepted.mode = Allowed.NONE;
              ev.preventDefault();
              this.debug('drop target not found');
              return;
            }
          }

          if (!addNew && !element) {
            // not for us
            this.debug('drop not allowed here, no drag element');
            accepted.mode = Allowed.NONE;
            ev.preventDefault();
            return;
          }

          var model = target.getModel();
          var parent = model.getParent();
          accepted.target = model;

          if (parent) {
            var parentSchemaElement = parent.getSchemaElement();

            if (addNew) {
              var allowedElements = parentSchemaElement.getAllowedElements();

              if (Object.keys(allowedElements).length > 0) {
                // check if there could be added more children
                var addable = parent.getAddableChildren();

                if (addable.length > 0) {
                  // check if a child could be added at this position
                  if (parentSchemaElement.areChildrenSortable()) {
                    // children can be put anywhere
                    // so this is allowed anywhere
                    accepted.mode = Allowed.BEFORE | Allowed.AFTER;
                  } else {
                    var acc = Allowed.NONE;
                    var allowedSorting = parentSchemaElement.getAllowedElementsSorting();
                    addable.some(function (elementName) {
                      acc |= _this5.__P_33_8(allowedSorting, elementName, model.getName());

                      if (acc & Allowed.BEFORE && acc & Allowed.AFTER) {
                        // we cannot find more
                        return true;
                      }

                      return false;
                    });
                    accepted.mode = acc;
                  }
                }
              } else {
                ev.preventDefault(); // not children allowed here

                accepted.mode = Allowed.NONE;
                this.debug('no children allowed here');
              }
            } else if (!parentSchemaElement.isChildElementAllowed(element.getName())) {
              // not allowed on this level
              accepted.mode = Allowed.NONE;
              this.debug('not allowed as child element of', parent.getName());
            } else if (parentSchemaElement.areChildrenSortable()) {
              // children can be put anywhere
              // so this is allowed anywhere
              accepted.mode = Allowed.BEFORE | Allowed.AFTER;
            } else {
              // check position
              accepted.mode = this.__P_33_8(parentSchemaElement.getAllowedElementsSorting(), element.getName(), model.getName());
            }
          } else {
            accepted.mode = Allowed.NONE;
          }

          var lookInside;

          if (addNew) {
            lookInside = Object.keys(model.getSchemaElement().getAllowedElements(true)).length > 0;
          } else {
            lookInside = model.getSchemaElement().isChildElementAllowed(element.getName());
          }

          if (lookInside) {
            // allowed inside
            accepted.mode |= Allowed.INSIDE;

            if (model.getSchemaElement().areChildrenSortable()) {
              accepted.mode |= Allowed.FIRST_CHILD;
            } else {
              var _allowedSorting = model.getSchemaElement().getFirstLevelElementSorting();

              if (_allowedSorting) {
                if (element) {
                  var targetPosition = _allowedSorting[element.getName()];

                  if (targetPosition !== undefined) {
                    if (targetPosition === 0 || model.getChildren().length === 0) {
                      accepted.mode |= Allowed.FIRST_CHILD;
                    } else {
                      // check if we can add it before the current first child
                      var firstChild = model.getChildren().getItem(0);

                      var maxPosition = _allowedSorting[firstChild.getName()];

                      if (maxPosition >= targetPosition) {
                        accepted.mode |= Allowed.FIRST_CHILD;
                      }
                    }
                  }
                } else if (model.getChildren().length > 0) {
                  var _firstChild = model.getChildren().getItem(0);

                  var firstChildPosition = _allowedSorting[_firstChild.getName()];

                  if (firstChildPosition !== undefined && firstChildPosition > 0) {
                    // first child is not on position 0
                    accepted.mode |= Allowed.FIRST_CHILD;
                  }
                } else if (Object.keys(_allowedSorting).length > 0) {
                  // target is empty, but children are allowed
                  accepted.mode |= Allowed.FIRST_CHILD;
                }
              }
            }
          }

          if (accepted.mode === Allowed.NONE) {
            ev.preventDefault();
            this.debug('dropping not accepted here');
          }
        }, this);
        var indicator = this.getChildControl('drag-indicator');
        var expandTimer;
        control.addListener('dragleave', function (ev) {
          if (expandTimer) {
            expandTimer.stop();
            expandTimer = null;
          }
        }, this);
        var lastTreeItem;
        var treeContainer = control.getPane();

        var onDrag = function onDrag(ev) {
          var left = -1000;
          var top = -1000;
          var position = '';
          var cursor = ev.getManager().getCursor();

          if (!cursor) {
            cursor = qx.ui.core.DragDropCursor.getInstance();
          }

          if (ev._native.pointerType === 'touch') {
            if (!cursor.hasState('touch')) {
              cursor.addState('touch');
            }
          }

          if (accepted.mode !== Allowed.NONE) {
            var origElem = document.elementFromPoint(ev.getDocumentLeft(), ev.getDocumentTop());
            var orig = qx.ui.core.Widget.getWidgetByElement(origElem);
            var skipDetection = false;

            if (!orig) {
              return;
            }

            while (orig.isAnonymous()) {
              orig = orig.getLayoutParent();
            }

            var origCoords = orig.getContentLocation();
            var leftPos = origCoords.left;

            if (orig instanceof cv.ui.manager.tree.VirtualElementItem) {
              var spacer = orig._getChildren()[0];

              leftPos = spacer.getWidth() + orig.getPaddingLeft();
              indicator.setWidth(orig.getBounds().width - leftPos);

              if (accepted.target && orig.getModel() !== accepted.target) {
                skipDetection = true;
              }

              lastTreeItem = orig;
            } else if (orig !== indicator) {
              if (orig === treeContainer) {
                var lastCoords = lastTreeItem.getContentLocation();
                var distance = ev.getDocumentTop() - lastCoords.bottom;

                if (distance <= 20 && accepted.mode & Allowed.AFTER) {
                  var _spacer = lastTreeItem._getChildren()[0];

                  left = _spacer.getWidth() + lastTreeItem.getPaddingLeft();
                  top = lastCoords.bottom;
                  position = 'after';
                }

                skipDetection = true;
              } else {
                skipDetection = true;
              }
            } else {
              // on drag indicator, do nothing here
              return;
            }

            if (!skipDetection) {
              if (ev.getDocumentTop() - origCoords.top <= 5) {
                // above
                if (expandTimer) {
                  expandTimer.stop();
                  expandTimer = null;
                } // check if this item is allowed here


                if (accepted.mode & Allowed.BEFORE) {
                  left = leftPos;
                  top = origCoords.top;
                  position = 'before';
                } else if (accepted.mode & Allowed.INSIDE) {
                  left = -1000;
                  top = -1000;
                  position = 'inside';
                }
              } else if (origCoords.bottom - ev.getDocumentTop() <= 5) {
                // below
                if (accepted.target && !accepted.target.isOpen()) {
                  if (accepted.mode & Allowed.AFTER) {
                    left = leftPos;
                    top = origCoords.bottom;
                    position = 'after';
                  } else if (accepted.mode & Allowed.INSIDE) {
                    left = -1000;
                    top = -1000;
                    position = 'inside';
                  }
                } else {
                  // when an element is opened this position is not after this element. but before its first child
                  // eslint-disable-next-line no-lonely-if
                  if (accepted.mode & Allowed.FIRST_CHILD) {
                    left = leftPos + 19;
                    indicator.setWidth(indicator.getWidth() - 19);
                    top = origCoords.bottom;
                    position = 'first-child';
                  } else {
                    this.debug('not allowed as first child');
                  }
                }

                if (expandTimer) {
                  expandTimer.stop();
                  expandTimer = null;
                }
              } else {
                // inside
                // eslint-disable-next-line no-lonely-if
                if (accepted.target && accepted.target.isOpen()) {
                  // treat dropping on an opened node as "first-child" position
                  if (accepted.mode & Allowed.FIRST_CHILD) {
                    if (indicator.getUserData('position') !== 'first-child') {
                      left = leftPos + 19;
                      indicator.setWidth(indicator.getWidth() - 19);
                    }

                    top = origCoords.bottom;
                    position = 'first-child';
                  }
                } else {
                  indicator.setDomPosition(-1000, -1000);

                  if (accepted.mode & Allowed.INSIDE) {
                    position = 'inside';
                  }

                  if (!expandTimer) {
                    expandTimer = qx.event.Timer.once(function () {
                      if (accepted.target) {
                        control.openNode(accepted.target);
                      }
                    }, this, 1000);
                  }
                }
              }
            }
          }

          indicator.setDomPosition(left, top);
          indicator.setUserData('position', position);

          if (!position && cursor.getAction()) {
            indicator.setUserData('action', ev.getCurrentAction());
            cursor.resetAction(); // eslint-disable-next-line no-console

            console.assert(left < 0); // eslint-disable-next-line no-console

            console.assert(top < 0);
          } else if (position && !cursor.getAction() && cursor.getAction() !== indicator.getUserData('action')) {
            cursor.setAction(indicator.getUserData('action'));
            indicator.setUserData('action', null);
          }
        };

        control.addListener('drag', onDrag, this);
        addButton.addListener('drag', onDrag, this);

        var onDrop = function (ev) {
          var action = ev.getCurrentAction();
          var element = ev.supportsType('cv/tree-element') ? ev.getData('cv/tree-element') : null;

          if (action === 'copy') {
            if (element) {
              element = element.clone();
            } else {
              action = 'add';
            }
          }

          var elementName = element ? element.getDisplayName() : 'new';
          var target = accepted.target;

          if (action === 'move' && element === target) {
            // cannot move before/after/inside myself
            return;
          }

          switch (indicator.getUserData('position')) {
            case 'after':
              if (accepted.mode & Allowed.AFTER) {
                this.debug(action, elementName, 'after', target.getDisplayName());

                switch (action) {
                  case 'move':
                    if (element.moveAfter(target)) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been moved after "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'copy':
                    if (element.insertAfter(target)) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been copied after "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'add':
                    this._onCreate(target, indicator.getUserData('position'));

                    break;
                }
              } else {
                this.debug('NOT ALLOWED', action, elementName, 'after', target.getDisplayName());
              }

              break;

            case 'before':
              if (accepted.mode & Allowed.BEFORE) {
                this.debug(action, elementName, 'before', target.getDisplayName());

                switch (action) {
                  case 'move':
                    if (element.moveBefore(target)) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been moved before "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'copy':
                    if (element.insertBefore(target)) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been copied before "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'add':
                    this._onCreate(target, indicator.getUserData('position'));

                    break;
                }
              } else {
                this.debug('NOT ALLOWED', action, elementName, 'after', target.getDisplayName());
              }

              break;

            case 'first-child':
              if (accepted.mode & Allowed.FIRST_CHILD) {
                this.debug(action, elementName, 'into', target.getDisplayName(), 'as first child');

                switch (action) {
                  case 'move':
                    if (element.moveBefore(target.getChildren().getItem(0))) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been moved into "%2" as first child', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'copy':
                    if (element.insertBefore(target.getChildren().getItem(0))) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been copied into "%2" as first child', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'add':
                    this._onCreate(target, indicator.getUserData('position'));

                    break;
                }
              } else {
                this.debug('NOT ALLOWED', elementName, 'into', target.getDisplayName() + ' as first child');
              }

              break;

            case 'inside':
              if (accepted.mode & Allowed.INSIDE) {
                this.debug(action, elementName, 'into', target.getDisplayName(), 'as child');

                switch (action) {
                  case 'move':
                    if (element.moveInside(target)) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been moved into "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'copy':
                    if (target.insertChild(element, -1, false, 'added')) {
                      cv.ui.manager.snackbar.Controller.info(this.tr('"%1" has been copied into "%2"', elementName, target.getDisplayName()));
                    }

                    break;

                  case 'add':
                    this._onCreate(target, indicator.getUserData('position'));

                    break;
                }
              } else {
                this.debug('NOT ALLOWED', elementName, 'into', target.getDisplayName(), 'as child');
              }

              break;
          }
        }.bind(this);

        control.addListener('drop', onDrop, this);
        indicator.addListener('drop', onDrop, this);

        var onDragEnd = function onDragEnd(ev) {
          // Move indicator away
          indicator.setDomPosition(-1000, -1000);
          indicator.resetUserData();

          if (expandTimer) {
            expandTimer.stop();
            expandTimer = null;
          }

          if (draggedXmlElement) {
            draggedXmlElement.resetDragging();
            draggedXmlElement = null;
          }

          accepted.target = null;
          accepted.mode = 0;
          var cursor = ev.getManager().getCursor();

          if (!cursor) {
            cursor = qx.ui.core.DragDropCursor.getInstance();
          }

          if (cursor.hasState('touch')) {
            cursor.removeState('touch');
          }

          this.setDragging(false);
        };

        control.addListener('dragend', onDragEnd, this);
        addButton.addListener('dragend', onDragEnd, this);
      },

      /**
       * Create a new element an insert if after target
       *
       * @param target {cv.ui.manager.model.XmlElement} target element
       * @param position {String} one of "after", "before" or "inside"
       * @param elementName {String?} if not set a selection of possible elements at that position will be shown
       * @private
       */
      _onCreate: function _onCreate(target, position, elementName) {
        var _this6 = this;

        var parent = position === 'inside' || position === 'first-child' ? target : target.getParent();
        var parentSchemaElement = parent.getSchemaElement();
        var addable = parent.getAddableChildren(false);

        if (addable.length > 0) {
          // check if a child could be added at this position
          var children = parent.getChildren(); // only check if we already have children, because otherwise we can add any child even in ordered sequences

          if (!parentSchemaElement.areChildrenSortable() && position !== 'inside' && children.length > 0) {
            // we only care about the first level here
            var sorting = parentSchemaElement.getFirstLevelElementSorting();
            var minPosition = 0;
            var maxPosition = 0;

            if (position === 'before') {
              maxPosition = sorting[target.getName()];
              var targetIndex = children.indexOf(target);

              if (targetIndex > 0) {
                var found = false; // find the first real element before that is not from the same type

                for (var i = targetIndex - 1; i >= 0; i--) {
                  var sibling = children.getItem(i);

                  if (!sibling.getName().startsWith('#') && sibling.getName() !== target.getName()) {
                    minPosition = sorting[sibling.getName()];
                    found = true;
                    break;
                  }
                }

                if (!found) {
                  // only siblings of the same type
                  minPosition = maxPosition;
                }
              }
            } else if (position === 'after') {
              minPosition = sorting[target.getName()];

              var _targetIndex = children.indexOf(target);

              if (_targetIndex < children.length - 1) {
                // find the first real element after that is not from the same type
                var _found = false;

                for (var _i = _targetIndex; _i < children.length; _i++) {
                  var _sibling = children.getItem(_i);

                  if (!_sibling.getName().startsWith('#') && _sibling.getName() !== target.getName()) {
                    maxPosition = sorting[_sibling.getName()];
                    _found = true;
                    break;
                  }
                }

                if (!_found) {
                  // only siblings of the same type
                  maxPosition = minPosition;
                }
              } else {
                // we want to append ot to the end
                maxPosition = minPosition + 1;
              }
            } else if (position === 'first-child') {
              // add before first child
              var firstChild = children.getItem(0);
              maxPosition = sorting[firstChild.getName()];
            }

            addable = addable.filter(function (name) {
              return Object.prototype.hasOwnProperty.call(sorting, name) && sorting[name] <= maxPosition && sorting[name] >= minPosition;
            });
          }
        }

        if (addable.length > 0) {
          this.__P_33_3 = true;
          var typeChooserForm;

          if (addable.length > 1) {
            // user has to select a type
            typeChooserForm = new cv.ui.manager.form.ElementForm({
              allowCancel: true,
              context: this,
              message: this.tr('<p style=\'font-weight:bold\'>Choose element</p><p>Several possible element can be created at this position, please select one to proceed.</p>'),
              formData: {
                type: {
                  type: 'SelectBox',
                  label: this.tr('Choose element'),
                  help: this.tr('Please choose the element you want to add here.'),
                  options: addable.sort(function (a, b) {
                    if (a.startsWith('#') && !b.startsWith('#')) {
                      return 1;
                    } else if (!a.startsWith('#') && b.startsWith('#')) {
                      return -1;
                    }

                    return a.localeCompare(b);
                  }).map(function (name) {
                    return {
                      label: name,
                      value: name
                    };
                  }),
                  validation: {
                    required: true
                  }
                }
              }
            }).show().promise();
          } else {
            typeChooserForm = Promise.resolve({
              type: addable[0]
            });
          }

          typeChooserForm.then(function (result) {
            if (result) {
              var type = result.type; // create new element, open the edit dialog and insert it

              var _document = target.getNode().ownerDocument;
              var element;
              var isElement = false;

              switch (type) {
                case '#comment':
                  element = _document.createComment('');
                  break;

                case '#text':
                  element = _document.createTextNode('');
                  break;

                case '#cdata-section':
                  element = _document.createCDATASection('');
                  break;

                default:
                  element = _document.createElement(type);
                  isElement = true;
                  break;
              }

              var schemaElement = parentSchemaElement.getSchemaElementForElementName(type);

              var initChildren = function initChildren(element, schemaElement) {
                var requiredChildren = schemaElement.getRequiredElements();

                if (requiredChildren.length > 1) {
                  if (!schemaElement.areChildrenSortable()) {
                    // a special order 1s required
                    var allowedSorting = schemaElement.getAllowedElementsSorting();
                    requiredChildren.sort(cv.ui.manager.model.schema.Element.sortChildNodes(allowedSorting));
                  }
                }

                requiredChildren.forEach(function (childName) {
                  var child = _document.createElement(childName);

                  element.appendChild(child); // do this recursively

                  initChildren(child, schemaElement.getSchemaElementForElementName(childName));
                });

                if (schemaElement.isTextContentRequired()) {
                  var child = _document.createTextNode('-');

                  element.appendChild(child);
                }
              };

              if (isElement) {
                initChildren(element, schemaElement);
              }

              var xmlElement = new cv.ui.manager.model.XmlElement(element, schemaElement, target.getEditor(), parent); // load the "empty" element to init the modification comparison

              xmlElement.load();
              var res = Promise.resolve(true);

              if (xmlElement.isShowEditButton()) {
                // only show edit dialog when we actually have something to edit
                res = _this6._onEdit(null, xmlElement, true);
              }

              res.then(function (data) {
                if (data) {
                  // finally insert the new node
                  switch (position) {
                    case 'before':
                      xmlElement.insertBefore(target);
                      break;

                    case 'after':
                      xmlElement.insertAfter(target);
                      break;

                    case 'inside':
                      target.insertChild(xmlElement, -1, false, 'added');
                      break;

                    case 'first-child':
                      target.insertChild(xmlElement, 0, false, 'added');
                      break;
                  }

                  _this6.getChildControl('tree').openNodeAndParents(xmlElement);

                  _this6.getChildControl('tree').setSelection([xmlElement]);
                }
              }, _this6)["catch"](function (err) {
                return _this6.error(err);
              });
            }
          });
        }
      },
      __P_33_8: function __P_33_8(allowedSorting, elementName, targetName, depth) {
        if (allowedSorting) {
          var currentPosition = allowedSorting[elementName];

          if (typeof currentPosition === 'string') {
            currentPosition = currentPosition.split('.').map(function (i) {
              return /^\d+$/.test(i) ? parseInt(i) : i;
            });
          } else {
            currentPosition = [currentPosition];
          }

          var targetPosition = allowedSorting[targetName];

          if (typeof targetPosition === 'string') {
            targetPosition = targetPosition.split('.').map(function (i) {
              return /^\d+$/.test(i) ? parseInt(i) : i;
            });
          } else {
            targetPosition = [targetPosition];
          }

          var _depth = Math.min(_depth || 1, currentPosition.length, targetPosition.length);

          for (var i = 0; i < _depth; i++) {
            if (currentPosition[i] === targetPosition[i]) {
              // no special position
              return cv.ui.manager.editor.Tree.Allowed.BEFORE | cv.ui.manager.editor.Tree.Allowed.AFTER;
            } else if (currentPosition[i] - 1 === targetPosition[i]) {
              return cv.ui.manager.editor.Tree.Allowed.AFTER;
            } else if (currentPosition[i] + 1 === targetPosition[i]) {
              return cv.ui.manager.editor.Tree.Allowed.BEFORE;
            }
          }
        }

        return cv.ui.manager.editor.Tree.Allowed.NONE;
      },
      __P_33_9: function __P_33_9(id, formData, element) {
        var _this7 = this;

        var provider = cv.ui.manager.editor.data.Provider.get(id);

        if (provider) {
          if (typeof provider.getLive === 'function') {
            formData.options = provider.getLive(element);
          } else if (provider.data) {
            formData.options = provider.data;
          } else {
            this.error('misconfigured provider found for ' + id);
          }

          formData.type = provider.userInputAllowed ? 'VirtualComboBox' : 'VirtualSelectBox';
        } else if (['mapping', 'styling'].includes(id.split('@').pop())) {
          var type = id.split('@').pop(); // these are directly filled from data inside the currently used config

          var tree = this.getChildControl('tree');
          var rootNode = tree.getModel().getNode();
          formData.type = 'SelectBox';
          formData.options = [];
          rootNode.querySelectorAll('meta > ' + type + 's > ' + type).forEach(function (element) {
            var name = element.getAttribute('name');
            formData.options.push({
              label: name,
              value: name
            });
          });
        }

        if (formData.type.endsWith('SelectBox')) {
          // not allowed here
          delete formData.placeholder;

          if (!formData.validation.required) {
            if (formData.options instanceof Promise) {
              formData.options.then(function (res) {
                if (Array.isArray(res)) {
                  res.unshift({
                    label: ' - ' + _this7.tr('not set') + ' - ',
                    value: ''
                  });
                }
              })["catch"](function () {}); // ignore error here, will be handled somewhere else
            } else {
              formData.options.unshift({
                label: ' - ' + this.tr('not set') + ' - ',
                value: ''
              });
            }
          }
        }
      },
      __P_33_10: function __P_33_10(element, attribute) {
        var docs = attribute.getDocumentation();
        var def = {
          type: 'TextField',
          label: attribute.getName(),
          placeholder: ' - ' + this.tr('not set') + ' - ',
          help: docs.join('<br/>'),
          enabled: element.isEditable(),
          value: element.getAttribute(attribute.getName()) || attribute.getDefaultValue(),
          validation: {
            required: !attribute.isOptional(),
            validator: function validator(value) {
              if (value instanceof qx.ui.form.ListItem) {
                value = value.getModel().getValue();
              }

              if (!attribute.isValueValid(value)) {
                throw new qx.core.ValidationError(qx.locale.Manager.tr('This is not a valid value.'));
              }
            }
          }
        };

        switch (attribute.getTypeString()) {
          case 'boolean':
            def.type = 'CheckBox';
            def.value = def.value === '' || def.value === null || def.value === undefined ? null : def.value === 'true';
            delete def.placeholder;
            break;

          case 'string':
            {
              var enums = attribute.getEnumeration();

              if (enums.length > 0) {
                def.type = 'SelectBox';
                delete def.placeholder;
                def.options = [];
                enums.forEach(function (name) {
                  def.options.push({
                    label: name,
                    value: name
                  });
                });

                if (attribute.isOptional()) {
                  // allow empty value
                  def.options.unshift({
                    label: ' - ' + this.tr('not set') + ' - ',
                    value: ''
                  });
                }
              } else {
                // check if we have a dataprovider for this
                this.__P_33_9(element.getName() + '@' + attribute.getName(), def, element.getNode());
              }

              break;
            }
        }

        return def;
      },
      _onEdit: function _onEdit(ev, element, isNew) {
        var _this8 = this;

        if (!this.getFile() || !this.getFile().isWriteable()) {
          return null;
        }

        var title;
        var caption;

        if (!element) {
          if (this.getSelected()) {
            element = this.getSelected();
          } else {
            return null;
          }
        }

        if (!element.getShowEditButton()) {
          return null;
        }

        element.load();
        var formData = {};
        var typeElement = element.getSchemaElement();

        if (isNew) {
          title = this.tr('Create new %1 element', element.getName());
          caption = this.tr('Please edit the attributes of the new %1 element, that will be added to the chosen position.', element.getName());
        } else {
          title = this.tr('Edit element attributes');
          caption = element.isEditable() ? this.tr('Edit %1', element.getName()) : this.tr('Show %1', element.getName());
        }

        if (element.getNode().nodeType === Node.ELEMENT_NODE) {
          var allowed = typeElement.getAllowedAttributes();
          Object.keys(allowed).forEach(function (name) {
            var attribute = allowed[name];

            if (!_this8.getExpert()) {
              var appInfo = attribute.getAppinfo();

              if (appInfo.includes('level:expert')) {
                // do not this this attribute
                return;
              }
            }

            formData[name] = _this8.__P_33_10(element, attribute);
          });

          if (typeElement.isChildElementAllowed('*')) {
            var parser = new DOMParser();
            var attrName = element.getNode().nodeName === 'custom' ? '#innerHTML' : '#outerHTML';

            if (isNew) {
              title = this.tr('Create new %1 element', element.getName());
              caption = this.tr('Please edit the content of the new %1 element, that will be added to the chosen position.', element.getName());
            } else {
              title = attrName === '#outerHTML' ? this.tr('Edit element and content') : this.tr('Edit element content');
            }

            formData[attrName] = {
              type: 'TextArea',
              label: '',
              lines: 5,
              autoSize: true,
              width: Math.min(qx.bom.Viewport.getWidth(), 500),
              enabled: element.isEditable(),
              value: attrName === '#outerHTML' ? element.getNode().outerHTML : element.getNode().innerHTML,
              validation: {
                validator: function validator(value) {
                  if (value) {
                    var dom = parser.parseFromString(value, 'text/xml');

                    if (dom.getElementsByTagName('parsererror').length > 0) {
                      throw new qx.core.ValidationError(qx.locale.Manager.tr('This is not a valid value.'));
                    }
                  }
                }
              }
            };
          }
        } else if (element.getNode().nodeType === Node.TEXT_NODE || element.getNode().nodeType === Node.COMMENT_NODE || element.getNode().nodeType === Node.CDATA_SECTION_NODE) {
          title = this.tr('Edit text content', element.getName());
          caption = '';
          var nodeName = element.getNode().nodeName; // only in text-only mode we can add text editing to the form

          var docs = typeElement.getDocumentation();
          formData[nodeName] = {
            type: 'TextArea',
            label: '',
            lines: 1,
            autoSize: true,
            width: Math.min(qx.bom.Viewport.getWidth(), 500),
            placeholder: this.tr('not set'),
            help: docs.join('<br/>'),
            enabled: element.isEditable(),
            value: element.getTextContent(),
            validation: {
              validator: function validator(value) {
                if (value instanceof qx.ui.form.ListItem) {
                  value = value.getModel().getValue();
                }

                if (!typeElement.isValueValid(value)) {
                  throw new qx.core.ValidationError(qx.locale.Manager.tr('This is not a valid value.'));
                }
              }
            }
          };

          if (element.isTextNode() && element.getParent().getName() === 'status') {
            var type = element.getParent().getAttribute('type');

            if ((type === 'html' || type === 'xml') && element.getNode().nodeType === Node.TEXT_NODE) {
              element.convertTextNodeType(Node.CDATA_SECTION_NODE);
              var newNodeName = element.getNode().nodeName;
              formData[newNodeName] = formData[nodeName];
              delete formData[nodeName];
              nodeName = newNodeName;
            } // Due to a bug that swallowed whitespaces in the monaco editor from time to time this is disabled for now
            // special handling for status content: check of source editor supports the type and use it instead of a plain TextArea

            /*if (type && cv.ui.manager.editor.Source.SUPPORTED_FILES("test." + type)) {
              formData[nodeName].type = "SourceEditor";
              formData[nodeName].language = type;
              formData[nodeName].width = Math.min(qx.bom.Viewport.getWidth(), 800);
              delete formData[nodeName].placeholder;
            }*/

          }

          this.__P_33_9(element.getParent().getName() + '@' + element.getName(), formData[nodeName], element.getNode());
        }

        this.__P_33_3 = true;
        var formDialog = new cv.ui.manager.form.ElementForm({
          allowCancel: true,
          context: this,
          caption: title,
          message: caption,
          formData: formData,
          minWidth: Math.min(qx.bom.Viewport.getWidth(), 400),
          maxWidth: qx.bom.Viewport.getWidth()
        }).show();
        return formDialog.promise().then(function (data) {
          if (data && element.isEditable()) {
            // save changes
            element.setAttributes(data);

            _this8.clearReDos();

            if (!Object.prototype.hasOwnProperty.call(data, '#outerHTML') && !Object.prototype.hasOwnProperty.call(data, '#innerHTML')) {
              element.validate();
            }
          }

          _this8.__P_33_3 = false;
          formDialog.destroy();
          return data;
        });
      },
      _onDelete: function _onDelete(ev, element) {
        if (!element) {
          element = this.getSelected();
        }

        if (element && element.isDeletable()) {
          element.remove();
          this.clearReDos();
          return element;
        }

        return null;
      },
      _onCut: function _onCut() {
        if (this.__P_33_3) {
          document.execCommand('cut');
        } else {
          var element = this._onDelete();

          if (element) {
            this.setClipboard(element);
          }
        }
      },
      _onCopy: function _onCopy() {
        if (this.__P_33_3) {
          document.execCommand('copy');
        } else {
          var element = this.getSelected();

          if (element) {
            var copy = element.clone();
            this.setClipboard(copy);
          }
        }
      },
      _onPaste: function _onPaste() {
        var target = this.getSelected();
        var clipboardElement = this.getClipboard();

        if (target && clipboardElement) {
          if (target.insertChild(clipboardElement, -1, false, 'added')) {
            // this was successful, clean the clipboard
            this.resetClipboard();
          }
        }
      },

      /**
       * Maintain global modification state.
       * This method is called by a single cv.ui.manager.model.XmlElement when it has changed its modified state.
       * @param element {cv.ui.manager.model.XmlElement}
       */
      updateModified: function updateModified(element) {
        var index = this.__P_33_0.indexOf(element);

        var previewIndex = this.__P_33_1.indexOf(element);

        if (element.$$removed) {
          // we dont care about elements that have been removed (its the parent that has changed then by loosing a child)
          if (index >= 0) {
            this.__P_33_0.splice(index, 1);
          }

          if (previewIndex >= 0) {
            this.__P_33_1.splice(index, 1);
          }
        } else if (element.isModified()) {
          if (index === -1) {
            this.__P_33_0.push(element);
          }

          if (previewIndex === -1) {
            this.__P_33_1.push(element);
          }
        } else {
          if (index >= 0) {
            this.__P_33_0.splice(index, 1);
          }

          if (previewIndex >= 0) {
            this.__P_33_1.splice(index, 1);
          }
        }

        this.getFile().setModified(this.__P_33_0.length > 0);

        this._onContentChanged();
      },
      _draw: function _draw() {
        var toolbar = this.getChildControl('toolbar');

        this._createChildControl('searchbar');

        if (!this.hasChildControl('add-button')) {
          this._createChildControl('add-button');
        }

        toolbar.addSeparator();

        this._createChildControl('edit-button');

        this._createChildControl('delete-button');

        this._createChildControl('toggle-expert');

        toolbar.addSpacer();

        this._createChildControl('refresh-preview');

        if (!this.hasChildControl('tree')) {
          this._createChildControl('tree');
        }

        if (!this.hasChildControl('right')) {
          this._createChildControl('right');
        }

        if (!this.hasChildControl('preview-sync-hint')) {
          this._createChildControl('preview-sync-hint');
        }

        if (!this.hasChildControl('preview')) {
          this._createChildControl('preview');
        }
      },
      _applySelected: function _applySelected(value, old) {
        if (old) {
          old.removeRelatedBindings(this.getChildControl('delete-button'));
        }

        if (value) {
          this.getChildControl('edit-button').setEnabled(value.getShowEditButton());

          if (this.getFile().isWriteable()) {
            value.bind('deletable', this.getChildControl('delete-button'), 'enabled');
          }
        } else {
          this.getChildControl('edit-button').setEnabled(false);
          this.getChildControl('delete-button').setEnabled(false);
        }

        this._updateHighlightWidget();
      },
      _updateHighlightWidget: function _updateHighlightWidget() {
        var selected = this.getSelected();

        if (this.isShowPreview()) {
          var preview = this.getChildControl('preview');

          if (this.getPreviewState() !== 'structureChanged' && selected) {
            // get page path for this node
            var path = [];
            var node = selected.getNode();

            while (node && node.nodeName !== 'pages') {
              if (node.nodeName === 'page') {
                path.unshift(node.getAttribute('name'));
              }

              node = node.parentNode;
            }

            if (path.length > 0) {
              preview.openPage(path.pop(), path.join('/'));
            }

            preview.setHighlightWidget(selected.getWidgetPath());
          } else {
            preview.setHighlightWidget(null);
          }
        }
      },
      _onElementKeyUp: function _onElementKeyUp(ev) {
        if (this.getSelected() && this.isVisible()) {
          if (ev.getKeyIdentifier() === 'Enter') {
            if (!this.__P_33_3) {
              this._onEdit();
            }
          }
        }
      },
      _applyContent: function _applyContent(value) {
        var _this9 = this;

        var tree = this.getChildControl('tree');
        var file = this.getFile();

        this._updatePreview(null, null, true);

        if (value && file) {
          if (this._workerWrapper) {
            this._workerWrapper.open(file, value, null, {
              validate: false,
              initialValidation: true,
              modified: false
            });

            this._workerWrapper.validateXmlConfig(value).then(function (res) {
              if (res === true) {
                _this9.info(file.getPath() + ' is a valid config file');

                _this9.__P_33_11(value);
              } else {
                var dialog = new cv.ui.manager.dialog.ValidationError(file, value, res);
                dialog.addListener('action', function (ev) {
                  switch (ev.getData()) {
                    case 'proceed':
                      _this9.__P_33_11(value, res);

                      break;

                    case 'open-source':
                      {
                        var _file = _this9.getFile();

                        cv.ui.manager.Main.getInstance().closeFile(_file);
                        qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
                          file: _file.getFullPath(),
                          handler: 'cv.ui.manager.editor.Source',
                          handlerOptions: {
                            jumpToError: true
                          }
                        });
                        break;
                      }

                    case 'cancel':
                      // close this editor
                      cv.ui.manager.Main.getInstance().closeFile(_this9.getFile());
                      break;
                  }

                  dialog.hide();
                  dialog.destroy();
                }, _this9);
                dialog.show();
              }
            });
          }
        } else {
          tree.resetModel();

          if (this.hasChildControl('add-button')) {
            this.getChildControl('add-button').setEnabled(false);
          }
        }
      },
      __P_33_6: function __P_33_6() {
        var file;
        cv.ui.manager.model.FileItem.ROOT.getChildren().some(function (f) {
          if (f.getName() === 'visu_config_previewtemp.xml') {
            file = f;
            return true;
          }

          return false;
        });

        if (!file) {
          file = new cv.ui.manager.model.FileItem('visu_config_previewtemp.xml', '/', this.getFile().getParent());
          file.setTemporary(true);
        }

        return file;
      },
      __P_33_11: function __P_33_11(value, errors) {
        var _this10 = this;

        var tree = this.getChildControl('tree');
        var file = this.getFile();

        if (file) {
          var _document2 = qx.xml.Document.fromString(value);

          var schemaElement = this._schema.getElementNode(_document2.documentElement.nodeName);

          var rootNode = new cv.ui.manager.model.XmlElement(_document2.documentElement, schemaElement, this);
          rootNode.setEditable(file.getWriteable());
          rootNode.load();
          tree.setModel(rootNode);

          if (this.hasChildControl('add-button')) {
            this.getChildControl('add-button').setVisibility(file.getWriteable() ? 'visible' : 'excluded'); // extra space für add-button

            tree.setContentPaddingBottom(file.getWriteable() ? 80 : 0);
          }

          if (this.isShowPreview()) {
            var preview = this.getChildControl('preview');

            if (file.isWriteable()) {
              if (!preview.getFile()) {
                preview.setFile(this.__P_33_6());
              }
            } else {
              preview.setFile(file);
            }

            this._updatePreview(null, value);

            if (!preview.isVisible()) {
              preview.show();
            }
          }

          if (file.isTemporary()) {
            this._onContentChanged();
          }

          if (errors) {
            errors.forEach(function (error) {
              if (error.path && error.path.startsWith('/pages')) {
                var current = rootNode;
                var parts = error.path.substr(1).split('/');

                while (parts.length > 0) {
                  var part = parts.shift();
                  var match = /^([^[]+)\[(\d+)\]$/.exec(part);

                  if (match) {
                    current = current.getChildren().getItem(parseInt(match[2]));

                    if (current) {
                      try {
                        // this can always lead to a loading error, because the element is invalid
                        current.load();
                      } catch (e) {
                        _this10.error('Error loading ' + current.getName() + ': ' + e.toString());

                        current = null;
                        break;
                      }
                    } else {
                      break;
                    }
                  } else {
                    _this10.error('patch segment format error: ' + part);

                    current = null;
                    break;
                  }
                }

                if (current) {
                  current.setValid(false);
                  current.validate(false);
                  tree.openNodeAndParents(current);
                }
              }
            });
          }
        }
      },
      _onContentChanged: function _onContentChanged() {
        var content = this.getCurrentContent();

        if (this._workerWrapper) {
          this._workerWrapper.contentChanged(this.getFile(), content);
        }

        if (this.isAutoRefreshPreview() && this.isShowPreview()) {
          this._updatePreview(null, content);
        }
      },
      _updatePreview: function _updatePreview(ev, content, reset) {
        var _this11 = this;

        var previewFile = this.getChildControl('preview').getFile();

        if (previewFile) {
          if (!content && !reset) {
            content = this.getCurrentContent(true);
          } else if (reset === true) {
            this.getChildControl('preview').hide();
            return;
          }

          this.getChildControl('preview').show();

          if (previewFile.isTemporary()) {
            this._client.createSync({
              path: previewFile.getFullPath(),
              hash: 'ignore'
            }, content, function () {
              qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
                type: 'contentChanged',
                file: previewFile,
                data: content,
                source: _this11
              });

              _this11.__P_33_1.removeAll();

              _this11.resetPreviewState();

              previewFile.resetTemporary();
            }, this);
          } else {
            this._client.updateSync({
              path: previewFile.getFullPath(),
              hash: 'ignore'
            }, content, function () {
              qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
                type: 'contentChanged',
                file: previewFile,
                data: content,
                source: _this11
              });

              _this11.__P_33_1.removeAll();

              _this11.resetPreviewState();
            }, this);
          }
        }
      },
      getCurrentContent: function getCurrentContent(fast) {
        var tree = this.getChildControl('tree');

        if (tree.getModel()) {
          var rootNode = tree.getModel().getNode();

          if (fast) {
            return new XMLSerializer().serializeToString(rootNode.ownerDocument);
          } // prettify content


          return '<?xml version="1.0" encoding="UTF-8"?>\n' + this._prettify(rootNode, 0);
        }

        return null;
      },
      _prettify: function _prettify(node, level, noFormat) {
        var tabs = Array(level).fill('  ').join('');
        var newLine = '\n';

        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            return (noFormat ? '' : tabs) + qx.xml.String.escape(node.textContent) + (noFormat ? '' : newLine);
          }

          return '';
        }

        if (node.nodeType === Node.COMMENT_NODE) {
          return (noFormat ? '' : tabs) + "<!--".concat(node.textContent, "--> ").concat(noFormat ? '' : newLine);
        } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
          return (noFormat ? '' : tabs) + "<![CDATA[".concat(node.textContent, "]]> ").concat(noFormat ? '' : newLine);
        }

        if (!node.tagName) {
          return this._prettify(node.firstChild, level);
        }

        var output = (noFormat ? '' : tabs) + "<".concat(node.tagName); // >\n

        for (var i = 0; i < node.attributes.length; i++) {
          output += " ".concat(node.attributes[i].name, "=\"").concat(node.attributes[i].value, "\"");
        }

        if (node.childNodes.length === 0) {
          return output + ' />' + (!noFormat ? newLine : '');
        }

        output += '>';
        var hasTextChild = Array.prototype.some.call(node.childNodes, function (child) {
          return child.nodeType === Node.TEXT_NODE && child.textContent.trim();
        });

        if (!noFormat && !hasTextChild) {
          output += newLine;
        }

        for (var _i2 = 0; _i2 < node.childNodes.length; _i2++) {
          output += this._prettify(node.childNodes[_i2], level + 1, hasTextChild);
        }

        return output + (hasTextChild || noFormat ? '' : tabs) + "</".concat(node.tagName, ">") + (!noFormat ? newLine : '');
      },
      _onSaved: function _onSaved() {
        cv.ui.manager.editor.Tree.prototype._onSaved.base.call(this);

        this.__P_33_0.forEach(function (elem) {
          return elem.onSaved();
        });

        this.__P_33_0 = [];
        this.clearUnDosReDos();
      },
      isSupported: function isSupported(file) {
        return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName());
      },
      _showHelp: function _showHelp() {
        var focusedWidget = qx.ui.core.FocusHandler.getInstance().getFocusedWidget();
        var dialogConf = {
          caption: this.tr('Help'),
          modal: true,
          image: 'qxl.dialog.icon.info',
          minWidth: Math.min(600, qx.bom.Viewport.getWidth()),
          maxHeight: qx.bom.Viewport.getHeight(),
          message: ''
        };

        if (focusedWidget === this.getChildControl('searchbar')) {
          dialogConf.message = this.tr('<h3>Search for elements</h3>\
<p>You can search for element names (tag names or content of name attribute) by typing a search value here. \
All elements whose tag name or name-attribute start with the search term will be found</p>\
<p>Search will start automatically when the search term is at least 2 characters long.</p>\
<p>The first found element will be opened and selected in the element tree. You can jump to the next \
found element with \'Enter\' or the \'Down\' key. Accordingly you can jump the the previous found element \
with the \'Up\' key.</p>');
        } else {
          // show general help
          dialogConf.message = this.tr('<h3>CometVisu XML-Editor - a brief introduction</h3>\
<p>The CometVisu XMl-Editor shows the content of a CometVisu config file in a tree-like structure. \
You can traverse through the tree by opening/closing elements with a click on the expand icon.</p>\
<p>The Xml-Editor will make sure that you do not create an invalid configuration file. \
If you experience a change that has not been accepted / or is not allowed that is most likely due to avoid an invalid configuration.</p>\
<h4>Editing attributes</h4>\
<p>The elements attributes can be edited by double clicking on it or selecting an element and clicking on the \'edit\'-button in the toolbar \
above the tree of by right-clicking on the element and the \'edit\'-button in the context menu</p>\
<h4>Editing elements</h4>\
<p>The elements in the tree support re-ordering via drag & drop. You can also cut/copy or paste them. \
You can add new elements by starting a drag in the round + button on the bottom of the tree, or \
by right clicking on an element and choosing the \'add child\'-button.</p>\
<p>You can delete elements by the delete buttons in the toolbar</p>\
<h4>Expert view</h4>\
<p>Some attributes are hidden in the editing dialog, because they provide access to settings that usually \
are not needed that often. You can access these attributes by toggling to the \'Expertview\'-button \
in the toolbar directly above the tree.</p>\
<h4>Config preview</h4>\
<p>An preview of the edited config file is shown on the right part of the screen. The preview will not automatically \
refresh after you have changed something. You can refresh is manually by clicking the most right button in the toolbar.</p>');
        }

        new cv.ui.manager.dialog.BigAlert(dialogConf).show();
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._schema = null;
      this._workerWrapper = null;

      this._disposeArray("__P_33_0", "__P_33_1");

      qx.core.Init.getApplication().getRoot().removeListener('keyup', this._onElementKeyUp, this);
    }
  });
  cv.ui.manager.editor.Tree.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tree.js.map?dt=1649957658915