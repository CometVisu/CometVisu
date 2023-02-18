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
  construct() {
    super();
    this._setLayout(new qx.ui.layout.Grow());
    this._handledActions = ['save', 'cut', 'copy', 'paste', 'undo', 'redo', 'help'];

    this._initWorker();

    // init schema
    this._schemas = {};
    this.__modifiedElements = [];
    this.__modifiedPreviewElements = new qx.data.Array();
    this.__modifiedPreviewElements.addListener('changeLength', ev => {
      if (ev.getData() === 0) {
        this.setPreviewState('synced');
      } else {
        const structureChanges = this.__modifiedPreviewElements.some(element => element.hasChildrenModified());

        this.setPreviewState(structureChanges ? 'structureChanged' : 'changed');
      }
    });
    this.initUnDos(new qx.data.Array());
    this.initReDos(new qx.data.Array());
    this.__buttonListeners = {};
    qx.core.Init.getApplication().getRoot().addListener('keyup', this._onElementKeyUp, this);
    this.addListener('resize', this._maintainPreviewVisibility, this);
    this._draw();
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
    _schemas: null,
    __modifiedElements: null,
    __modifiedPreviewElements: null,
    _workerWrapper: null,
    __editing: false,
    __buttonListeners: null,
    __searchResults: null,
    __searchResultIndex: 0,
    _structure: null,

    async getSchema(file) {
      if (file.startsWith('../')) {
        file = file.substring(3);
      }
      if (!Object.prototype.hasOwnProperty.call(this, file)) {
        this._schemas[file] = await cv.ui.manager.model.Schema.getInstance(file);
      }
      return new Promise((resolve, reject) => {
        this._schemas[file].onLoaded(function () {
          this.setReady(true);
          resolve(this._schemas[file]);
        }, this);
      });
    },

    isPreviewSynced() {
      return this.getPreviewState() === 'synced';
    },

    _applyHandlerOptions() {
      this._maintainPreviewVisibility();
    },

    _maintainPreviewVisibility() {
      const handlerOptions = this.getHandlerOptions();
      let enablePreview = qx.bom.Viewport.getWidth() > 800 && (!handlerOptions || !handlerOptions.noPreview);
      if (enablePreview) {
        const previewFile = this.__getPreviewFile();
        if (!previewFile.isTemporary() && !previewFile.isWriteable()) {
          // preview file already exists, but it is not writable
          enablePreview = false;
        } else if (previewFile.isTemporary() && !cv.ui.manager.model.FileItem.ROOT.isWriteable()) {
          // parent folder is not writable and preview file does not exist
          enablePreview = false;
        }
      }
      this.setShowPreview(enablePreview);
    },

    _applyShowPreview(value) {
      this.getChildControl('right').setVisibility(value ? 'visible' : 'excluded');

      if (value) {
        this.getChildControl('left').clearLayoutProperties();
        this.getChildControl('left').updateLayoutProperties();
      } else {
        const handlerOptions = this.getHandlerOptions();
        if (!handlerOptions || !handlerOptions.noStretch) {
          this.getChildControl('left').setLayoutProperties({ flex: 1 });
        }
      }
      const file = this.getFile();
      if (value && file) {
        const preview = this.getChildControl('preview');
        if (file.isWriteable()) {
          if (!preview.getFile()) {
            preview.setFile(this.__getPreviewFile());
          }
        } else {
          // this file is not writable, we can use the real one for preview
          preview.setFile(file);
        }
        this._updatePreview();
      }
    },

    handleAction(actionName) {
      if (this.canHandleAction(actionName)) {
        switch (actionName) {
          case 'undo':
            if (!this.__editing) {
              this.undo();
            }
            break;

          case 'redo':
            if (!this.__editing) {
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
            if (!this.__editing) {
              this._showHelp();
            }
            break;

          default:
            super.handleAction(actionName);
            break;
        }
      }
    },

    configureButton(actionId, button) {
      switch (actionId) {
        case 'undo':
          this.__buttonListeners[actionId] = this.getUnDos().addListener('changeLength', () => {
            const length = this.getUnDos().length;
            if (length > 0) {
              button.setEnabled(true);
              button.setToolTipText(
                this.tr(
                  'Undo: %1',
                  this.getUnDos()
                    .getItem(length - 1)
                    .getTitle()
                )
              );
            } else {
              button.setEnabled(false);
              button.resetToolTipText();
            }
          });

          button.setEnabled(this.getUnDos().length > 0);
          break;

        case 'redo':
          this.__buttonListeners[actionId] = this.getReDos().addListener('changeLength', () => {
            const length = this.getReDos().length;
            if (length > 0) {
              button.setEnabled(true);
              button.setToolTipText(
                this.tr(
                  'Undo: %1',
                  this.getReDos()
                    .getItem(length - 1)
                    .getTitle()
                )
              );
            } else {
              button.setEnabled(false);
              button.resetToolTipText();
            }
          });

          button.setEnabled(this.getReDos().length > 0);
          break;

        case 'cut':
          this.bind('selected', button, 'enabled', {
            converter(value) {
              return value ? !value.isDeletable() : false;
            }
          });

          break;

        case 'copy':
          this.bind('selected', button, 'enabled', {
            converter(value) {
              return !!value;
            }
          });

          break;

        case 'paste':
          this.bind('clipboard', button, 'enabled', {
            converter(value) {
              return !!value;
            }
          });

          break;
      }
    },
    unConfigureButton(actionId, button) {
      switch (actionId) {
        case 'undo':
          if (this.__buttonListeners[actionId]) {
            this.getUnDos().removeListenerById(this.__buttonListeners[actionId]);

            delete this.__buttonListeners[actionId];
          }
          button.setEnabled(false);
          break;

        case 'redo':
          if (this.__buttonListeners[actionId]) {
            this.getReDos().removeListenerById(this.__buttonListeners[actionId]);

            delete this.__buttonListeners[actionId];
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

    addUndo(elementChange) {
      if (elementChange instanceof cv.ui.manager.model.ElementChange) {
        this.getUnDos().push(elementChange);
      }
    },

    undo() {
      const unDos = this.getUnDos();
      if (unDos.length > 0) {
        const elementChange = unDos.pop();
        if (elementChange.undo()) {
          this.getReDos().push(elementChange);
        } else {
          this.error('could not undo ' + elementChange.getTitle());
          unDos.push(elementChange);
        }
      }
    },

    redo() {
      const reDos = this.getReDos();
      if (reDos.length > 0) {
        const elementChange = reDos.pop();
        if (elementChange.redo()) {
          this.getUnDos().push(elementChange);
        } else {
          this.error('could not redo ' + elementChange.getTitle());
          reDos.push(elementChange);
        }
      }
    },

    clearUnDosReDos() {
      this.getUnDos()
        .removeAll()
        .forEach(elem => elem.dispose());
      this.clearReDos();
    },

    clearReDos() {
      this.getReDos()
        .removeAll()
        .forEach(elem => elem.dispose());
    },

    _applyClipboard(value) {
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

    _initWorker() {
      this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
    },

    showErrors(path, errorList) {},
    showDecorations(path, decorators) {},

    _loadFile(file, old) {
      if (old && this._workerWrapper) {
        this._workerWrapper.close(old);
      }
      if (file && file.getType() === 'file' && this.isSupported(file)) {
        super._loadFile(file, old);
      } else {
        super._loadFile(null, old);
        if (this.hasChildControl('preview')) {
          this.getChildControl('preview').resetFile();
        }
        this.resetPreviewState();
      }
    },

    // overridden
    _createChildControlImpl(id, hash) {
      let control;

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
          this.getChildControl('splitpane').addAt(control, 1, { flex: 1 });
          break;

        case 'preview':
          control = new cv.ui.manager.viewer.Config();
          control.set({
            target: 'iframe',
            minWidth: 600
          });

          this.getChildControl('right').addAt(control, 1, { flex: 1 });
          break;

        case 'preview-sync-hint': {
          const ok = this.tr('Preview shows the current state of the edited configuration.');

          const noSync = this.tr('Preview is out of sync. Click here to refresh.');

          const notOk = this.tr(
            'Preview is out of sync. Highlighting of the currently selected tree element is deactivated until you refresh the preview. Click here to refresh.'
          );

          control = new qx.ui.basic.Atom(ok, cv.theme.dark.Images.getIcon('valid', 16));

          control.setRich(true);
          control.getChildControl('label').setWrap(true);
          control.addListener('tap', () => {
            if (!this.isPreviewSynced() && this.isShowPreview()) {
              this._updatePreview();
            }
          });
          this.getChildControl('right').addAt(control, 0);
          this.addListener('previewStateChanged', ev => {
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
          });
          break;
        }

        case 'edit-button':
          control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('edit', 24));

          control.setEnabled(false);
          control.addListener('execute', this._onEdit, this);
          this.bind('file.writeable', control, 'icon', {
            converter(value) {
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
          control = new qx.ui.toolbar.CheckBox(this.tr('Expertview'), cv.theme.dark.Images.getIcon('expert', 16));

          control.addListener('execute', () => {
            this.toggleExpert();
          });
          this.getChildControl('toolbar').add(control);
          break;

        case 'refresh-preview':
          control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 16));

          control.setToolTipText(this.tr('Reload preview'));
          control.addListener('execute', this._updatePreview, this);
          this.bind('showPreview', control, 'visibility', {
            converter(value) {
              return value ? 'visible' : 'hidden';
            }
          });

          this.bind('previewState', control, 'enabled', {
            converter(value) {
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

          control.addListener('keyup', ev => {
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
          });
          this.getChildControl('searchbar-container').add(control, { flex: 1 });
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
              const item = new cv.ui.manager.tree.VirtualElementItem();
              if (!qx.core.Environment.get('device.touch')) {
                item.addListener('contextmenu', this._onContextMenu, this);
              } else {
                item.addListener('action', this._onContextMenuAction, this);
              }
              item.addListener('dbltap', this._onEdit, this);
              return item;
            }.bind(this),

            // Bind properties from the item to the tree-widget and vice versa
            bindItem(controller, item, index) {
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
          this.addListener('changeDragging', ev => {
            control.setLayoutProperties({
              bottom: 16,
              left: ev.getData() ? -1000 : '50%'
            });
          });
          control.setAppearance('round-button');
          control.addListener('pointerover', () => control.addState('hovered'));
          control.addListener('pointerout', () => control.removeState('hovered'));

          control.addListener('tap', () => {
            if (this.getSelected()) {
              this._onCreate(this.getSelected(), 'inside');
            } else {
              qxl.dialog.Dialog.alert(
                this.tr(
                  'Please create a new Element either by dragging this button to the place where the new element should be inserted or by selecting an element and pressing this button to insert a new child to this element.'
                )
              );
            }
          });
          this.getChildControl('left').add(control, {
            bottom: 16,
            left: '50%'
          });

          break;

        case 'drag-indicator':
          // Create drag indicator
          control = new qx.ui.core.Widget();
          control.setDecorator(
            new qx.ui.decoration.Decorator().set({
              widthTop: 1,
              styleTop: 'solid',
              colorTop: 'white'
            })
          );

          control.setHeight(0);
          control.setOpacity(0.5);
          control.setZIndex(100);
          control.setDroppable(true);
          control.setLayoutProperties({ left: -1000, top: -1000 });
          qx.core.Init.getApplication().getRoot().add(control);
          break;

        case 'context-menu':
          control = new cv.ui.manager.contextmenu.ConfigElement(this);
          control.addListener('action', this._onContextMenuAction, this);
          break;
      }

      return control || super._createChildControlImpl(id);
    },

    _onContextMenu(ev) {
      const target = ev.getCurrentTarget();
      if (target instanceof cv.ui.manager.tree.VirtualElementItem) {
        const element = target.getModel();
        this.getChildControl('tree').getSelection().replace([element]);
        this.setSelected(element);
        const menu = this.getChildControl('context-menu');
        menu.setElement(element);
        menu.openAtPointer(ev);
      }

      // Do not show native menu
      // don't open any other contextmenus
      if (ev.getBubbles()) {
        ev.stop();
      }
    },

    _onContextMenuAction(ev) {
      const data = ev.getData();
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

    _onChangeTreeSelection(ev) {
      const data = ev.getData();
      if (data.added.length === 1) {
        this.setSelected(data.added[0]);
      } else {
        this.resetSelected();
      }
    },

    openByQuerySelector(selector, edit) {
      return new Promise((resolve, reject) => {
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        const result = rootNode.querySelector(selector);
        if (result) {
          this.__searchResults = [result];
          this.__searchResultIndex = 0;
          this.__showSearchResult();
          if (edit) {
            this._onEdit();
          }
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },

    _onSearch(ev) {
      const value = ev.getData();
      this.__searchResults = [];
      this.__searchResultIndex = 0;
      if (value.length > 2) {
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        this.__searchResults = Array.from(rootNode.querySelectorAll('*')).filter(function (el) {
          return el.tagName.startsWith(value) || (el.hasAttribute('name') && el.getAttribute('name').startsWith(value));
        });
        this.__showSearchResult();
      }
    },

    _showNextResult() {
      if (this.__searchResults && this.__searchResults.length > this.__searchResultIndex + 1) {
        this.__searchResultIndex++;
        this.__showSearchResult();
      }
    },

    _showPreviousResult() {
      if (this.__searchResults && this.__searchResultIndex > 0) {
        this.__searchResultIndex--;
        this.__showSearchResult();
      }
    },

    __showSearchResult() {
      if (this.__searchResults.length > this.__searchResultIndex) {
        // find and open the first result and save the rest for traversal (with keyboard arrows
        const firstMatch = this.__searchResults[this.__searchResultIndex];
        const tree = this.getChildControl('tree');
        if (firstMatch.$$widget) {
          tree.openNodeAndParents(firstMatch.$$widget);
          tree.getSelection().replace([firstMatch.$$widget]);
        } else {
          let current = firstMatch;
          const ancestors = [];
          // lookup the path until we find the first one with a widget
          while (current && !current.$$widget) {
            current = current.parentElement;
            if (current) {
              ancestors.push(current);
            }
          }
          if (current && current.$$widget) {
            current.$$widget.load();
            // now git down the path of found ancestors and load them all
            for (let i = ancestors.length - 1; i >= 0; i--) {
              const p = ancestors[i].$$widget;
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

    _initDragDrop(control) {
      let draggedXmlElement;
      control.addListener('dragstart', ev => {
        const dragTarget = ev.getDragTarget();
        let element;
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
      });

      const addButton = this.getChildControl('add-button');
      addButton.addListener('dragstart', ev => {
        ev.addAction('copy');
        ev.addType('cv/new-tree-element');
        this.setDragging(true);
      });

      const Allowed = cv.ui.manager.editor.Tree.Allowed;
      const accepted = {
        mode: 0,
        target: null
      };

      control.addListener('dragover', ev => {
        // add ist a custom action that cannot be detected, so we only check if its supported
        let action = ev.getCurrentAction();
        let element;
        if (ev.supportsType('cv/tree-element')) {
          element = ev.getData('cv/tree-element');
        }
        const addNew = action === 'copy' && !element && ev.supportsType('cv/new-tree-element');
        let target = ev.getTarget();
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
          const layerContent = control.getPane().getLayers()[0].getContentLocation();
          if (layerContent && ev.getDocumentTop() - layerContent.bottom <= 20) {
            // when we are not more than 10px away from the last tree element we use that one, otherwise dropping is forbidden
            const lastElem = document.elementFromPoint(
              Math.round((layerContent.left + layerContent.right) / 2),
              layerContent.bottom - 20
            );

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
        const model = target.getModel();
        const parent = model.getParent();
        accepted.target = model;

        if (parent) {
          const parentSchemaElement = parent.getSchemaElement();
          if (addNew) {
            const allowedElements = parentSchemaElement.getAllowedElements();
            if (Object.keys(allowedElements).length > 0) {
              // check if there could be added more children
              const addable = parent.getAddableChildren();
              if (addable.length > 0) {
                // check if a child could be added at this position
                if (parentSchemaElement.areChildrenSortable()) {
                  // children can be put anywhere
                  // so this is allowed anywhere
                  accepted.mode = Allowed.BEFORE | Allowed.AFTER;
                } else {
                  let acc = Allowed.NONE;
                  const allowedSorting = parentSchemaElement.getAllowedElementsSorting();
                  addable.some(elementName => {
                    acc |= this.__getAllowedPositions(allowedSorting, elementName, model.getName());

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
              ev.preventDefault();
              // not children allowed here
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
            accepted.mode = this.__getAllowedPositions(
              parentSchemaElement.getAllowedElementsSorting(),
              element.getName(),
              model.getName()
            );
          }
        } else {
          accepted.mode = Allowed.NONE;
        }
        let lookInside;
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
            const allowedSorting = model.getSchemaElement().getFirstLevelElementSorting();
            if (allowedSorting) {
              if (element) {
                let targetPosition = allowedSorting[element.getName()];
                if (targetPosition !== undefined) {
                  if (targetPosition === 0 || model.getChildren().length === 0) {
                    accepted.mode |= Allowed.FIRST_CHILD;
                  } else {
                    // check if we can add it before the current first child
                    const firstChild = model.getChildren().getItem(0);
                    const maxPosition = allowedSorting[firstChild.getName()];
                    if (maxPosition >= targetPosition) {
                      accepted.mode |= Allowed.FIRST_CHILD;
                    }
                  }
                }
              } else if (model.getChildren().length > 0) {
                const firstChild = model.getChildren().getItem(0);
                let firstChildPosition = allowedSorting[firstChild.getName()];
                if (firstChildPosition !== undefined && firstChildPosition > 0) {
                  // first child is not on position 0
                  accepted.mode |= Allowed.FIRST_CHILD;
                }
              } else if (Object.keys(allowedSorting).length > 0) {
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
      });

      const indicator = this.getChildControl('drag-indicator');

      let expandTimer;

      control.addListener('dragleave', ev => {
        if (expandTimer) {
          expandTimer.stop();
          expandTimer = null;
        }
      });

      let lastTreeItem;
      const treeContainer = control.getPane();

      const onDrag = function (ev) {
        let left = -1000;
        let top = -1000;
        let position = '';
        let cursor = ev.getManager().getCursor();
        if (!cursor) {
          cursor = qx.ui.core.DragDropCursor.getInstance();
        }
        if (ev._native.pointerType === 'touch') {
          if (!cursor.hasState('touch')) {
            cursor.addState('touch');
          }
        }

        if (accepted.mode !== Allowed.NONE) {
          const origElem = document.elementFromPoint(ev.getDocumentLeft(), ev.getDocumentTop());

          let orig = qx.ui.core.Widget.getWidgetByElement(origElem);
          let skipDetection = false;
          if (!orig) {
            return;
          }
          while (orig.isAnonymous()) {
            orig = orig.getLayoutParent();
          }

          const origCoords = orig.getContentLocation();
          let leftPos = origCoords.left;
          if (orig instanceof cv.ui.manager.tree.VirtualElementItem) {
            const spacer = orig._getChildren()[0];
            leftPos = spacer.getWidth() + orig.getPaddingLeft();
            indicator.setWidth(orig.getBounds().width - leftPos);
            if (accepted.target && orig.getModel() !== accepted.target) {
              skipDetection = true;
            }
            lastTreeItem = orig;
          } else if (orig !== indicator) {
            if (orig === treeContainer) {
              const lastCoords = lastTreeItem.getContentLocation();
              const distance = ev.getDocumentTop() - lastCoords.bottom;
              if (distance <= 20 && accepted.mode & Allowed.AFTER) {
                const spacer = lastTreeItem._getChildren()[0];
                left = spacer.getWidth() + lastTreeItem.getPaddingLeft();
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
              }
              // check if this item is allowed here
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
                  expandTimer = qx.event.Timer.once(
                    function () {
                      if (accepted.target) {
                        control.openNode(accepted.target);
                      }
                    },
                    this,
                    1000
                  );
                }
              }
            }
          }
        }
        indicator.setDomPosition(left, top);
        indicator.setUserData('position', position);
        if (!position && cursor.getAction()) {
          indicator.setUserData('action', ev.getCurrentAction());
          cursor.resetAction();
          // eslint-disable-next-line no-console
          console.assert(left < 0);
          // eslint-disable-next-line no-console
          console.assert(top < 0);
        } else if (position && !cursor.getAction() && cursor.getAction() !== indicator.getUserData('action')) {
          cursor.setAction(indicator.getUserData('action'));
          indicator.setUserData('action', null);
        }
      };
      control.addListener('drag', onDrag, this);
      addButton.addListener('drag', onDrag, this);

      const onDrop = function (ev) {
        let action = ev.getCurrentAction();
        let element = ev.supportsType('cv/tree-element') ? ev.getData('cv/tree-element') : null;
        if (action === 'copy') {
          if (element) {
            element = element.clone();
          } else {
            action = 'add';
          }
        }
        const elementName = element ? element.getDisplayName() : 'new';
        const target = accepted.target;
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
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been moved after "%2"', elementName, target.getDisplayName())
                    );
                  }
                  break;

                case 'copy':
                  if (element.insertAfter(target)) {
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been copied after "%2"', elementName, target.getDisplayName())
                    );
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
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been moved before "%2"', elementName, target.getDisplayName())
                    );
                  }
                  break;

                case 'copy':
                  if (element.insertBefore(target)) {
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been copied before "%2"', elementName, target.getDisplayName())
                    );
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
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been moved into "%2" as first child', elementName, target.getDisplayName())
                    );
                  }
                  break;

                case 'copy':
                  if (element.insertBefore(target.getChildren().getItem(0))) {
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been copied into "%2" as first child', elementName, target.getDisplayName())
                    );
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
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been moved into "%2"', elementName, target.getDisplayName())
                    );
                  }
                  break;

                case 'copy':
                  if (target.insertChild(element, -1, false, 'added')) {
                    cv.ui.manager.snackbar.Controller.info(
                      this.tr('"%1" has been copied into "%2"', elementName, target.getDisplayName())
                    );
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

      const onDragEnd = function (ev) {
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
        let cursor = ev.getManager().getCursor();
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
    _onCreate(target, position, elementName) {
      const parent = position === 'inside' || position === 'first-child' ? target : target.getParent();
      const parentSchemaElement = parent.getSchemaElement();
      let addable = parent.getAddableChildren(false);
      if (addable.length > 0) {
        // check if a child could be added at this position
        const children = parent.getChildren();
        // only check if we already have children, because otherwise we can add any child even in ordered sequences
        if (!parentSchemaElement.areChildrenSortable() && position !== 'inside' && children.length > 0) {
          // we only care about the first level here
          const sorting = parentSchemaElement.getFirstLevelElementSorting();
          let minPosition = 0;
          let maxPosition = 0;
          if (position === 'before') {
            maxPosition = sorting[target.getName()];
            const targetIndex = children.indexOf(target);
            if (targetIndex > 0) {
              let found = false;
              // find the first real element before that is not from the same type
              for (let i = targetIndex - 1; i >= 0; i--) {
                const sibling = children.getItem(i);
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
            const targetIndex = children.indexOf(target);
            if (targetIndex < children.length - 1) {
              // find the first real element after that is not from the same type
              let found = false;
              for (let i = targetIndex; i < children.length; i++) {
                const sibling = children.getItem(i);
                if (!sibling.getName().startsWith('#') && sibling.getName() !== target.getName()) {
                  maxPosition = sorting[sibling.getName()];
                  found = true;
                  break;
                }
              }
              if (!found) {
                // only siblings of the same type
                maxPosition = minPosition;
              }
            } else {
              // we want to append ot to the end
              maxPosition = minPosition + 1;
            }
          } else if (position === 'first-child') {
            // add before first child
            const firstChild = children.getItem(0);
            maxPosition = sorting[firstChild.getName()];
          }
          addable = addable.filter(
            name =>
              Object.prototype.hasOwnProperty.call(sorting, name) &&
              sorting[name] <= maxPosition &&
              sorting[name] >= minPosition
          );
        }
      }
      if (addable.length > 0) {
        this.__editing = true;
        let typeChooserForm;
        if (addable.length > 1) {
          // user has to select a type
          typeChooserForm = new cv.ui.manager.form.ElementForm({
            allowCancel: true,
            context: this,
            message: this.tr(
              '<p style=\'font-weight:bold\'>Choose element</p><p>Several possible element can be created at this position, please select one to proceed.</p>'
            ),

            formData: {
              type: {
                type: 'SelectBox',
                label: this.tr('Choose element'),
                help: this.tr('Please choose the element you want to add here.'),

                options: addable
                  .sort((a, b) => {
                    if (a.startsWith('#') && !b.startsWith('#')) {
                      return 1;
                    } else if (!a.startsWith('#') && b.startsWith('#')) {
                      return -1;
                    }
                    return a.localeCompare(b);
                  })
                  .map(name => ({ label: name, value: name })),
                validation: {
                  required: true
                }
              }
            }
          })
            .show()
            .promise();
        } else {
          typeChooserForm = Promise.resolve({ type: addable[0] });
        }
        typeChooserForm.then(result => {
          if (result) {
            const type = result.type;
            // create new element, open the edit dialog and insert it
            const document = target.getNode().ownerDocument;
            let element;
            let isElement = false;
            switch (type) {
              case '#comment':
                element = document.createComment('');
                break;

              case '#text':
                element = document.createTextNode('');
                break;

              case '#cdata-section':
                element = document.createCDATASection('');
                break;

              default:
                element = document.createElement(type);
                isElement = true;
                break;
            }

            const schemaElement = parentSchemaElement.getSchemaElementForElementName(type);

            const initChildren = function (element, schemaElement) {
              const requiredChildren = schemaElement.getRequiredElements();
              if (requiredChildren.length > 1) {
                if (!schemaElement.areChildrenSortable()) {
                  // a special order 1s required
                  const allowedSorting = schemaElement.getAllowedElementsSorting();
                  requiredChildren.sort(cv.ui.manager.model.schema.Element.sortChildNodes(allowedSorting));
                }
              }
              requiredChildren.forEach(childName => {
                const child = document.createElement(childName);
                element.appendChild(child);
                // do this recursively
                initChildren(child, schemaElement.getSchemaElementForElementName(childName));
              });
              if (schemaElement.isTextContentRequired()) {
                const child = document.createTextNode('-');
                element.appendChild(child);
              }
            };
            if (isElement) {
              initChildren(element, schemaElement);
            }

            const xmlElement = new cv.ui.manager.model.XmlElement(element, schemaElement, target.getEditor(), parent);

            // load the "empty" element to init the modification comparison
            xmlElement.load();
            let res = Promise.resolve(true);
            if (xmlElement.isShowEditButton()) {
              // only show edit dialog when we actually have something to edit
              res = this._onEdit(null, xmlElement, true);
            }
            res
              .then(data => {
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

                  this.getChildControl('tree').openNodeAndParents(xmlElement);
                  this.getChildControl('tree').setSelection([xmlElement]);
                }
              }, this)
              .catch(err => this.error(err));
          }
        });
      }
    },

    __getAllowedPositions(allowedSorting, elementName, targetName, depth) {
      if (allowedSorting) {
        let currentPosition = allowedSorting[elementName];
        if (typeof currentPosition === 'string') {
          currentPosition = currentPosition.split('.').map(i => (/^\d+$/.test(i) ? parseInt(i) : i));
        } else {
          currentPosition = [currentPosition];
        }
        let targetPosition = allowedSorting[targetName];
        if (typeof targetPosition === 'string') {
          targetPosition = targetPosition.split('.').map(i => (/^\d+$/.test(i) ? parseInt(i) : i));
        } else {
          targetPosition = [targetPosition];
        }
        const depth = Math.min(depth || 1, currentPosition.length, targetPosition.length);

        for (let i = 0; i < depth; i++) {
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

    __checkProvider(id, formData, element) {
      const provider = cv.ui.manager.editor.data.Provider.get(id);
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
        const type = id.split('@').pop();
        // these are directly filled from data inside the currently used config
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        formData.type = 'SelectBox';
        formData.options = [];
        const selector = this._structure === 'tile' ? 'cv-meta > cv-' + type : 'meta > ' + type + 's > ' + type;
        rootNode.querySelectorAll(selector).forEach(element => {
          const name = element.getAttribute('name');
          formData.options.push({ label: name, value: name });
        });
      }
      if (formData.type.endsWith('SelectBox')) {
        // not allowed here
        delete formData.placeholder;
        if (!formData.validation.required) {
          if (formData.options instanceof Promise) {
            formData.options
              .then(res => {
                if (Array.isArray(res)) {
                  res.unshift({
                    label: ' - ' + this.tr('not set') + ' - ',
                    value: ''
                  });
                }
              })
              .catch(() => {}); // ignore error here, will be handled somewhere else
          } else {
            formData.options.unshift({
              label: ' - ' + this.tr('not set') + ' - ',
              value: ''
            });
          }
        }
      }
    },

    __getAttributeFormDefinition(element, attribute) {
      const docs = attribute.getDocumentation();
      const def = {
        type: 'TextField',
        label: attribute.getName(),
        placeholder: ' - ' + this.tr('not set') + ' - ',
        help: docs.join('<br/>'),
        enabled: element.isEditable(),
        value: element.getAttribute(attribute.getName()) || attribute.getDefaultValue(),
        validation: {
          required: !attribute.isOptional(),
          validator(value) {
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

        case 'string': {
          const enums = attribute.getEnumeration();
          if (enums.length > 0) {
            def.type = 'SelectBox';
            delete def.placeholder;
            def.options = [];
            enums.forEach(name => {
              def.options.push({ label: name, value: name });
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
            this.__checkProvider(element.getName() + '@' + attribute.getName(), def, element.getNode());
          }
          break;
        }
      }

      return def;
    },

    _onEdit(ev, element, isNew) {
      if (!this.getFile() || !this.getFile().isWriteable()) {
        return null;
      }
      let title;
      let caption;
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
      const formData = {};
      const typeElement = element.getSchemaElement();
      if (isNew) {
        title = this.tr('Create new %1 element', element.getName());
        caption = this.tr(
          'Please edit the attributes of the new %1 element, that will be added to the chosen position.',
          element.getName()
        );
      } else {
        title = this.tr('Edit element attributes');
        caption = element.isEditable() ? this.tr('Edit %1', element.getName()) : this.tr('Show %1', element.getName());
      }
      if (element.getNode().nodeType === Node.ELEMENT_NODE) {
        const allowed = typeElement.getAllowedAttributes();
        Object.keys(allowed).forEach(name => {
          const attribute = allowed[name];
          if (!this.getExpert()) {
            const appInfo = attribute.getAppinfo();
            if (appInfo.includes('level:expert')) {
              // do not this this attribute
              return;
            }
          }
          formData[name] = this.__getAttributeFormDefinition(element, attribute);
        });
        if (typeElement.isChildElementAllowed('*')) {
          const parser = new DOMParser();
          const attrName = element.getNode().nodeName === 'custom' ? '#innerHTML' : '#outerHTML';
          if (isNew) {
            title = this.tr('Create new %1 element', element.getName());
            caption = this.tr(
              'Please edit the content of the new %1 element, that will be added to the chosen position.',
              element.getName()
            );
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
              validator(value) {
                if (value) {
                  const dom = parser.parseFromString(value, 'text/xml');
                  if (dom.getElementsByTagName('parsererror').length > 0) {
                    throw new qx.core.ValidationError(qx.locale.Manager.tr('This is not a valid value.'));
                  }
                }
              }
            }
          };
        }
      } else if (
        element.getNode().nodeType === Node.TEXT_NODE ||
        element.getNode().nodeType === Node.COMMENT_NODE ||
        element.getNode().nodeType === Node.CDATA_SECTION_NODE
      ) {
        title = this.tr('Edit text content', element.getName());
        caption = '';
        let nodeName = element.getNode().nodeName;
        // only in text-only mode we can add text editing to the form
        const docs = typeElement.getDocumentation();
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
            validator(value) {
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
          const type = element.getParent().getAttribute('type');
          if ((type === 'html' || type === 'xml') && element.getNode().nodeType === Node.TEXT_NODE) {
            element.convertTextNodeType(Node.CDATA_SECTION_NODE);
            const newNodeName = element.getNode().nodeName;
            formData[newNodeName] = formData[nodeName];
            delete formData[nodeName];
            nodeName = newNodeName;
          }
          // Due to a bug that swallowed whitespaces in the monaco editor from time to time this is disabled for now

          // special handling for status content: check of source editor supports the type and use it instead of a plain TextArea
          /*if (type && cv.ui.manager.editor.Source.SUPPORTED_FILES("test." + type)) {
            formData[nodeName].type = "SourceEditor";
            formData[nodeName].language = type;
            formData[nodeName].width = Math.min(qx.bom.Viewport.getWidth(), 800);
            delete formData[nodeName].placeholder;
          }*/
        }
        this.__checkProvider(
          element.getParent().getName() + '@' + element.getName(),
          formData[nodeName],
          element.getNode()
        );
      }
      this.__editing = true;

      const formDialog = new cv.ui.manager.form.ElementForm({
        allowCancel: true,
        context: this,
        caption: title,
        message: caption,
        formData: formData,
        minWidth: Math.min(qx.bom.Viewport.getWidth(), 400),
        maxWidth: qx.bom.Viewport.getWidth()
      }).show();
      return formDialog.promise().then(data => {
        if (data && element.isEditable()) {
          // save changes
          element.setAttributes(data);
          this.clearReDos();
          if (
            !Object.prototype.hasOwnProperty.call(data, '#outerHTML') &&
            !Object.prototype.hasOwnProperty.call(data, '#innerHTML')
          ) {
            element.validate();
          }
        }
        this.__editing = false;
        formDialog.destroy();
        return data;
      });
    },

    _onDelete(ev, element) {
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

    _onCut() {
      if (this.__editing) {
        document.execCommand('cut');
      } else {
        const element = this._onDelete();
        if (element) {
          this.setClipboard(element);
        }
      }
    },

    _onCopy() {
      if (this.__editing) {
        document.execCommand('copy');
      } else {
        const element = this.getSelected();
        if (element) {
          const copy = element.clone();
          this.setClipboard(copy);
        }
      }
    },

    _onPaste() {
      const target = this.getSelected();
      const clipboardElement = this.getClipboard();
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
    updateModified(element) {
      const index = this.__modifiedElements.indexOf(element);
      const previewIndex = this.__modifiedPreviewElements.indexOf(element);
      if (element.$$removed) {
        // we dont care about elements that have been removed (its the parent that has changed then by loosing a child)
        if (index >= 0) {
          this.__modifiedElements.splice(index, 1);
        }
        if (previewIndex >= 0) {
          this.__modifiedPreviewElements.splice(index, 1);
        }
      } else if (element.isModified()) {
        if (index === -1) {
          this.__modifiedElements.push(element);
        }
        if (previewIndex === -1) {
          this.__modifiedPreviewElements.push(element);
        }
      } else {
        if (index >= 0) {
          this.__modifiedElements.splice(index, 1);
        }
        if (previewIndex >= 0) {
          this.__modifiedPreviewElements.splice(index, 1);
        }
      }
      this.getFile().setModified(this.__modifiedElements.length > 0);
      this._onContentChanged();
    },

    _draw() {
      const toolbar = this.getChildControl('toolbar');
      this._createChildControl('searchbar');
      if (!this.hasChildControl('add-button')) {
        this._createChildControl('add-button');
      }
      toolbar.addSeparator();
      this._createChildControl('edit-button');
      this._createChildControl('delete-button');
      toolbar.addSeparator();
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

    _applySelected(value, old) {
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

    _updateHighlightWidget() {
      const selected = this.getSelected();
      if (this.isShowPreview()) {
        const preview = this.getChildControl('preview');
        if (this.getPreviewState() !== 'structureChanged' && selected) {
          // get page path for this node
          let path = [];
          let node = selected.getNode();
          if (this._structure === 'tile') {
            while (node && node.nodeName !== 'config') {
              if (node.nodeName === 'cv-page') {
                preview.openPage(node.getAttribute('id'));
                break;
              }
              node = node.parentNode;
            }
          } else {
            while (node && node.nodeName !== 'pages') {
              if (node.nodeName === 'page') {
                path.unshift(node.getAttribute('name'));
              }
              node = node.parentNode;
            }
            if (path.length > 0) {
              preview.openPage(path.pop(), path.join('/'));
            }
          }
          preview.setHighlightWidget(selected.getWidgetPath());
        } else {
          preview.setHighlightWidget(null);
        }
      }
    },

    _onElementKeyUp(ev) {
      if (this.getSelected() && this.isVisible()) {
        if (ev.getKeyIdentifier() === 'Enter') {
          if (!this.__editing) {
            this._onEdit();
          }
        }
      }
    },

    _applyContent(value) {
      const tree = this.getChildControl('tree');
      const file = this.getFile();
      this._updatePreview(null, null, true);
      if (value && file) {
        if (this._workerWrapper) {
          this._workerWrapper.open(file, value, null, {
            validate: false,
            initialValidation: true,
            modified: false
          });

          this._workerWrapper.validateXmlConfig(value).then(res => {
            if (res === true) {
              this.info(file.getPath() + ' is a valid config file');
              this.__loadContent(value);
            } else {
              const dialog = new cv.ui.manager.dialog.ValidationError(file, value, res);

              dialog.addListener('action', ev => {
                switch (ev.getData()) {
                  case 'proceed':
                    this.__loadContent(value, res);
                    break;

                  case 'open-source': {
                    const file = this.getFile();
                    cv.ui.manager.Main.getInstance().closeFile(file);
                    qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
                      file: file.getFullPath(),
                      handler: 'cv.ui.manager.editor.Source',
                      handlerOptions: {
                        jumpToError: true
                      }
                    });

                    break;
                  }

                  case 'cancel':
                    // close this editor
                    cv.ui.manager.Main.getInstance().closeFile(this.getFile());
                    break;
                }

                dialog.hide();
                dialog.destroy();
              });
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

    __getPreviewFile() {
      let file;
      cv.ui.manager.model.FileItem.ROOT.getChildren().some(f => {
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

    async __loadContent(value, errors) {
      const tree = this.getChildControl('tree');
      const file = this.getFile();
      if (file) {
        const doc = qx.xml.Document.fromString(value);
        const rootElement = doc.documentElement;
        const schema = await this.getSchema(
          rootElement.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'noNamespaceSchemaLocation')
        );

        const schemaElement = schema.getElementNode(rootElement.nodeName);
        const rootNode = new cv.ui.manager.model.XmlElement(rootElement, schemaElement, this);

        this._structure = schema.getStructure();
        rootNode.setEditable(file.getWriteable());
        rootNode.load();
        tree.setModel(rootNode);
        if (this.hasChildControl('add-button')) {
          this.getChildControl('add-button').setVisibility(file.getWriteable() ? 'visible' : 'excluded');

          // extra space für add-button
          tree.setContentPaddingBottom(file.getWriteable() ? 80 : 0);
        }
        if (this.isShowPreview()) {
          const preview = this.getChildControl('preview');
          if (file.isWriteable()) {
            if (!preview.getFile()) {
              preview.setFile(this.__getPreviewFile());
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
          errors.forEach(error => {
            if (error.path && error.path.startsWith('/pages')) {
              let current = rootNode;
              let parts = error.path.substr(1).split('/');
              while (parts.length > 0) {
                let part = parts.shift();
                let match = /^([^[]+)\[(\d+)\]$/.exec(part);
                if (match) {
                  current = current.getChildren().getItem(parseInt(match[2]));
                  if (current) {
                    try {
                      // this can always lead to a loading error, because the element is invalid
                      current.load();
                    } catch (e) {
                      this.error('Error loading ' + current.getName() + ': ' + e.toString());

                      current = null;
                      break;
                    }
                  } else {
                    break;
                  }
                } else {
                  this.error('patch segment format error: ' + part);
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
      } else {
        this._structure = null;
      }
    },

    _onContentChanged() {
      const content = this.getCurrentContent();
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), content);
      }
      if (this.isAutoRefreshPreview() && this.isShowPreview()) {
        this._updatePreview(null, content);
      }
    },

    _updatePreview(ev, content, reset) {
      const previewFile = this.getChildControl('preview').getFile();
      if (previewFile) {
        if (!content && !reset) {
          content = this.getCurrentContent(true);
        } else if (reset === true) {
          this.getChildControl('preview').hide();
          return;
        }
        this.getChildControl('preview').show();
        if (previewFile.isTemporary()) {
          this._client.createSync(
            {
              path: previewFile.getFullPath(),
              hash: 'ignore'
            },
            content,
            err => {
              if (err) {
                // disable preview, because the file could not be created
                this.setShowPreview(false);
                this.error(err);
                cv.ui.manager.snackbar.Controller.error(this.tr('Disabling preview because the preview file could not be created.'));
              } else {
                qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
                  type: 'contentChanged',
                  file: previewFile,
                  data: content,
                  source: this
                });
                this.__modifiedPreviewElements.removeAll();
                this.resetPreviewState();
                previewFile.resetTemporary();
              }
            },
            this
          );
        } else {
          this._client.updateSync(
            {
              path: previewFile.getFullPath(),
              hash: 'ignore'
            },
            content,
            err => {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
                  type: 'contentChanged',
                  file: previewFile,
                  data: content,
                  source: this
                });

                this.__modifiedPreviewElements.removeAll();
                this.resetPreviewState();
              }
            },
            this
          );
        }
      }
    },

    getCurrentContent(fast) {
      const tree = this.getChildControl('tree');
      if (tree.getModel()) {
        const rootNode = tree.getModel().getNode();
        if (fast) {
          return new XMLSerializer().serializeToString(rootNode.ownerDocument);
        }
        // prettify content
        return cv.util.Prettifier.xml(rootNode.ownerDocument);
      }
      return null;
    },

    _onSaved() {
      super._onSaved();
      this.__modifiedElements.forEach(elem => elem.onSaved());
      this.__modifiedElements = [];
      this.clearUnDosReDos();
    },

    isSupported(file) {
      return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName());
    },

    _showHelp() {
      const focusedWidget = qx.ui.core.FocusHandler.getInstance().getFocusedWidget();
      const dialogConf = {
        caption: this.tr('Help'),
        modal: true,
        image: 'qxl.dialog.icon.info',
        minWidth: Math.min(600, qx.bom.Viewport.getWidth()),
        maxHeight: qx.bom.Viewport.getHeight(),
        message: ''
      };

      if (focusedWidget === this.getChildControl('searchbar')) {
        dialogConf.message = this.tr(
          '<h3>Search for elements</h3>\
<p>You can search for element names (tag names or content of name attribute) by typing a search value here. \
All elements whose tag name or name-attribute start with the search term will be found</p>\
<p>Search will start automatically when the search term is at least 2 characters long.</p>\
<p>The first found element will be opened and selected in the element tree. You can jump to the next \
found element with \'Enter\' or the \'Down\' key. Accordingly you can jump the the previous found element \
with the \'Up\' key.</p>'
        );
      } else {
        // show general help
        dialogConf.message = this.tr(
          '<h3>CometVisu XML-Editor - a brief introduction</h3>\
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
refresh after you have changed something. You can refresh is manually by clicking the most right button in the toolbar.</p>'
        );
      }
      new cv.ui.manager.dialog.BigAlert(dialogConf).show();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._schemas = null;
    this._workerWrapper = null;
    this._disposeArray('__modifiedElements', '__modifiedPreviewElements');
    qx.core.Init.getApplication().getRoot().removeListener('keyup', this._onElementKeyUp, this);
  }
});
