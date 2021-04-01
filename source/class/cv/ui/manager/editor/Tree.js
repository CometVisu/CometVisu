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
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());
    this._handledActions = ['save', 'cut', 'copy', 'paste', 'undo', 'redo', 'help'];
    this._initWorker();

    // init schema
    this._schema = cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
    this._schema.onLoaded(function () {
      this.setReady(true);
      this._draw();
    }, this);
    this.__modifiedElements = [];
    this.initUnDos(new qx.data.Array());
    this.initReDos(new qx.data.Array());
    this.__buttonListeners = {};
    qx.core.Init.getApplication().getRoot().addListener("keyup", this._onElementKeyUp, this);
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /^(demo)?\/?visu_config.*\.xml/,
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
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _schema: null,
    __modifiedElements: null,
    _workerWrapper: null,
    __editing: false,
    __buttonListeners: null,
    __searchResults: null,
    __searchResultIndex: 0,

    handleAction: function (actionName) {
      if (this.canHandleAction(actionName)) {
        switch (actionName) {
          case 'undo':
            this.undo();
            break;

          case 'redo':
            this.redo();
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
            this._showHelp();
            break;

          default:
            this.base(arguments, actionName);
            break;
        }
      }
    },

    configureButton: function (actionId, button) {
      switch (actionId) {
        case 'undo':
          this.__buttonListeners[actionId] = this.getUnDos().addListener('changeLength', () => {
            const length = this.getUnDos().length;
            if (length > 0) {
              button.setEnabled(true);
              button.setToolTipText(this.tr("Undo: %1", this.getUnDos().getItem(length - 1).getTitle()));
            } else {
              button.setEnabled(false);
              button.resetToolTipText();
            }
          }, this);
          button.setEnabled(this.getUnDos().length > 0);
          break;

        case 'redo':
          this.__buttonListeners[actionId] = this.getReDos().addListener('changeLength', () => {
            const length = this.getReDos().length;
            if (length > 0) {
              button.setEnabled(true);
              button.setToolTipText(this.tr("Undo: %1", this.getReDos().getItem(length - 1).getTitle()));
            } else {
              button.setEnabled(false);
              button.resetToolTipText();
            }
          }, this);
          button.setEnabled(this.getReDos().length > 0);
          break;

        case 'cut':
          this.bind('selected', button, 'enabled', {
            converter: function (value) {
              return value ? !value.isRequired() : false;
            }
          })
          break;

        case 'copy':
          this.bind('selected', button, 'enabled', {
            converter: function (value) {
              return !!value;
            }
          })
          break;

        case 'paste':
          this.bind('clipboard', button, 'enabled', {
            converter: function (value) {
              return !!value;
            }
          })
          break;
      }
    },
    unConfigureButton: function (actionId, button) {
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

    addUndo: function (elementChange) {
      this.assertInstance(elementChange, cv.ui.manager.model.ElementChange);
      this.getUnDos().push(elementChange);
    },

    undo: function () {
      const unDos = this.getUnDos();
      if (unDos.length > 0) {
        const elementChange = unDos.pop();
        if (elementChange.undo()) {
          this.getReDos().push(elementChange);
        } else {
          this.error("could not undo " + elementChange.getTitle());
          unDos.push(elementChange);
        }
      }
    },

    redo: function () {
      const reDos = this.getReDos();
      if (reDos.length > 0) {
        const elementChange = reDos.pop();
        if (elementChange.redo()) {
          this.getUnDos().push(elementChange);
        } else {
          this.error("could not redo " + elementChange.getTitle());
          reDos.push(elementChange);
        }
      }
    },

    clearUnDosReDos: function () {
      this.getUnDos().removeAll().forEach(elem => elem.dispose());
      this.clearReDos();
    },

    clearReDos: function () {
      this.getReDos().removeAll().forEach(elem => elem.dispose());
    },

    _applyClipboard: function (value) {
      if (value) {
        navigator.clipboard.writeText(value.getNode().outerHTML);
      } else {
        navigator.clipboard.writeText('');
      }
    },

    _initWorker: function () {
      this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
    },

    showErrors: function (path, errorList) {
    },
    showDecorations: function (path, decorators) {
    },

    _loadFile: function (file, old) {
      if (old && this._workerWrapper) {
        this._workerWrapper.close(old);
      }
      if (file && file.getType() === 'file' && this.isSupported(file)) {
        const handlerOptions = this.getHandlerOptions();
        if (this.hasChildControl('preview')) {
          if (handlerOptions && handlerOptions.noPreview) {
            this.getChildControl('preview').exclude();
          } else {
            this.getChildControl('preview').show();
          }
        }
        this.base(arguments, file, old);
      } else {
        this.base(arguments, null, old);
        if (this.hasChildControl('preview')) {
          this.getChildControl('preview').resetFile();
          console.log("resetting preview");
        }
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       var control;

       switch (id) {
         case 'splitpane':
           control = new qx.ui.splitpane.Pane();
           this._add(control);
           break;

         case 'left':
           control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
           this.getChildControl('splitpane').add(control, 0);
           break;

         case 'right':
           control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
           control.setMinWidth(600);
           this.getChildControl('splitpane').add(control, 1);
           break;

         case 'preview':
           control = new cv.ui.manager.viewer.Config();
           control.set({
             target: 'iframe',
             minWidth: 600
           });
           const handlerOptions = this.getHandlerOptions();
           if (handlerOptions && handlerOptions.noPreview) {
             control.exclude();
           }
           this.getChildControl('right').add(control, {edge: 0});
           break;

         case 'edit-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('edit', 16));
           control.setEnabled(false);
           control.addListener('execute', this._onEdit, this);
           this.bind("file.writeable", control, 'icon', {
             converter: function (value) {
               return value ? cv.theme.dark.Images.getIcon('edit', 16) : cv.theme.dark.Images.getIcon('view', 16)
             }
           })
           this.getChildControl('toolbar').add(control);
           break;

         case 'delete-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('delete', 16));
           control.setEnabled(false);
           control.addListener('execute', this._onDelete, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'toggle-expert':
           control = new qx.ui.toolbar.CheckBox(this.tr("Expertview"),
             cv.theme.dark.Images.getIcon('expert', 16));
           control.addListener('execute', function () {
             this.toggleExpert();
           }, this);
           this.getChildControl('toolbar').add(control);
           break;

         case 'refresh-preview':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('reload', 16));
           control.setToolTipText(this.tr("Reload preview"));
           control.addListener('execute', this._updatePreview, this);
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
             placeholder: this.tr("Search..."),
             margin: 8
           });
           control.addListener("changeValue", qx.util.Function.debounce(this._onSearch, 250), this);
           control.addListener("keyup", function (ev) {
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
           this.getChildControl('searchbar-container').add(control, {flex: 1});
           break;

         case 'tree':
           control = new qx.ui.tree.VirtualTree(null, 'displayName', 'children');
           control.set({
             selectionMode: 'single',
             width: 350,
             openMode: 'dbltap'
           });
           this.bind("file.writeable", control, "droppable");
           this.bind("file.writeable", control, "draggable");
           this._initDragDrop(control);
           control.setDelegate({
             createItem: function () {
               const item = new cv.ui.manager.tree.VirtualElementItem();
               item.addListener('contextmenu', this._onContextMenu, this);
               return item;
             }.bind(this),

             // Bind properties from the item to the tree-widget and vice versa
             bindItem: function (controller, item, index) {
               controller.bindProperty("", "model", null, item, index);
               controller.bindProperty("displayName", "label", null, item, index);
               controller.bindPropertyReverse("open", "open", null, item, index);
               controller.bindProperty("open", "open", null, item, index);
               controller.bindProperty("showEditButton", "editable", null, item, index);
               controller.bindProperty("sortable", "sortable", null, item, index);
               controller.bindProperty("icon", "icon", null, item, index);
               controller.bindProperty("status", 'status', null, item, index);
             }
           });
           control.getSelection().addListener("change", this._onChangeTreeSelection, this);
           this.getChildControl('left').add(control, {
             top: 72,
             left: 0,
             right: 0,
             bottom: 0
           });
           break;

         case 'add-button-container':
           control = new qx.ui.container.Composite(new qx.ui.layout.Atom().set({center: true}));
           control.setAnonymous(true);
           control.setHeight(48);
           control.setZIndex(20);
           this.getChildControl('left').add(control, {
             left: 0,
             right: 0,
             bottom: 16
           });
           break;

         case 'add-button':
           control = new qx.ui.basic.Atom(null, cv.theme.dark.Images.getIcon('add', 32));
           control.setDraggable(true);
           control.setAppearance("round-button");
           control.addListener("pointerover", () => control.addState("hovered"));
           control.addListener("pointerout", () => control.removeState("hovered"));
           control.addListener("tap", () => {
             dialog.Dialog.alert(this.tr("Please create a new Element by dragging this button to the place where the new element should be inserted."))
           }, this);
           this.bind('file.writeable', control, 'enabled');
           this.getChildControl("add-button-container").add(control);
           break;

         case 'drag-indicator':
           // Create drag indicator
           control = new qx.ui.core.Widget();
           control.setDecorator(new qx.ui.decoration.Decorator().set({
             widthTop: 1,
             styleTop: "solid",
             colorTop: "white"
           }));
           control.setHeight(0);
           control.setOpacity(0.5);
           control.setZIndex(100);
           control.setLayoutProperties({left: -1000, top: -1000});
           control.setDroppable(true);
           qx.core.Init.getApplication().getRoot().add(control);
           break;

         case 'context-menu':
           control = new cv.ui.manager.contextmenu.ConfigElement(this);
           control.addListener('action', this._onContextMenuAction, this);
           break;
       }

       return control || this.base(arguments, id);
    },

    _onContextMenu: function (ev) {
      const target = ev.getCurrentTarget();
      if (target instanceof cv.ui.manager.tree.VirtualElementItem) {
        const element = target.getModel();
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

    _onContextMenuAction: function (ev) {
      const data = ev.getData();
      if (this.canHandleAction(data.action)) {
        this.handleAction(data.action);
      } else {
        switch (data.action) {
          case 'edit':
            this._onEdit(null, data.element);
            break;

          case 'delete':
            this._onDelete(null, data.element);
            break;

          case 'create':
            // add a new child
            this._onCreate(data.element, "inside");
            break;

          default:
            this.error("unhandled context menu action", data.action);
            break;
        }
      }
    },

    _onChangeTreeSelection: function (ev) {
      const data = ev.getData();
      if (data.added.length === 1) {
        this.setSelected(data.added[0]);
      } else {
        this.resetSelected();
      }
    },


    openByQuerySelector: function (selector, edit) {
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

    _onSearch: function (ev) {
      const value = ev.getData();
      this.__searchResults = [];
      this.__searchResultIndex = 0;
      if (value.length > 2) {
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        this.__searchResults = Array.from(rootNode.querySelectorAll('*')).filter(function (el) {
          return el.tagName.startsWith(value) || el.hasAttribute("name") && el.getAttribute("name").startsWith(value);
        });
        this.__showSearchResult();
      }
    },

    _showNextResult: function () {
      if (this.__searchResults.length > this.__searchResultIndex + 1) {
        this.__searchResultIndex++;
        this.__showSearchResult();
      }
    },

    _showPreviousResult: function () {
      if (this.__searchResultIndex > 0) {
        this.__searchResultIndex--;
        this.__showSearchResult();
      }
    },

    __showSearchResult: function () {
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
            for (let i = ancestors.length-1; i >= 0; i--) {
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

    _initDragDrop: function (control) {
      control.addListener("dragstart", function (ev) {
        const dragTarget = ev.getDragTarget();
        let element;
        if (dragTarget instanceof cv.ui.manager.model.XmlElement) {
          element = dragTarget.getModel();
          ev.addAction("copy");
          if (!element.isRequired() && element.isSortable()) {
            ev.addAction("move");
          }
          ev.addType("cv/tree-element");
          ev.addData("cv/tree-element", element);
        }
      }, this);

      const addButton = this.getChildControl("add-button");
      addButton.addListener("dragstart", function (ev) {
        ev.addAction("copy");
        ev.addType("cv/new-tree-element");
      }, this);

      control.addListener("droprequest", function (ev) {
        let type = ev.getCurrentType();
        let action = ev.getCurrentAction();
        let result;
        if (type === "cv/tree-element") {
          const dragTarget = ev.getDragTarget();
          const element = dragTarget.getElement();
          if (action === "copy") {
            result = element.clone();
          } else if (action === "move") {
            result = element;
          }
          ev.addData(type, result);
        }
      }, this);

      const Allowed = cv.ui.manager.editor.Tree.Allowed;
      const accepted = {
        mode: 0,
        target: null
      }

      control.addListener("dragover", function (ev) {
        let type = ev.getCurrentType();
        // add ist a custom action that cannot be detected, so we only check if its supported
        let action = ev.getCurrentAction();
        let element;
        if (type === "cv/tree-element") {
          element = ev.getData("cv/tree-element");
        }
        const addNew = action === "copy" && !element && ev.supportsType("cv/new-tree-element");
        if (!addNew && !element) {
          // not for us
          accepted.mode = Allowed.NONE;
          ev.preventDefault();
          return;
        }
        const target = ev.getTarget().getModel();
        const parent = target.getParent();
        accepted.target = target;
        // because there is not "add" drag action we check for copy and no payload

        if (parent) {
          const parentSchemaElement = target.getParent().getSchemaElement();
          if (addNew) {
            const allowedElements = parentSchemaElement.getAllowedElements();
            if (Object.keys(allowedElements).length > 0) {
              // check if there could be added more children
              const addable = target.getParent().getAddableChildren();
              if (addable.length > 0) {
                // check if a child could be added at this position
                if (!parentSchemaElement.areChildrenSortable()) {
                  // children are not sorted and can be put anywhere
                  // so this is allowed anywhere
                  accepted.mode = Allowed.BEFORE | Allowed.AFTER;
                } else {
                  let acc = Allowed.NONE;
                  const allowedSorting = parentSchemaElement.getAllowedElementsSorting();
                  addable.some(elementName => {
                    acc |= this.__getAllowedPositions(allowedSorting, elementName, target.getName());
                    if ((acc & Allowed.BEFORE) && (acc & Allowed.AFTER)) {
                      // we cannot find more
                      return true;
                    }
                  });
                  accepted.mode = acc;
                }
              }
              accepted.mode = Allowed.BEFORE | Allowed.AFTER;
            } else {
              ev.preventDefault();
              // not children allowed here
              accepted.mode = Allowed.NONE;
            }
          } else {
            if (!parentSchemaElement.isChildElementAllowed(element.getName())) {
              ev.preventDefault();
              // not allowed on this level
              accepted.mode = Allowed.NONE;
            } else if (!parentSchemaElement.areChildrenSortable()) {
              // children are not sorted and can be put anywhere
              // so this is allowed anywhere
              accepted.mode = Allowed.BEFORE | Allowed.AFTER;
            } else {
              // check position
              accepted.mode = this.__getAllowedPositions(parentSchemaElement.getAllowedElementsSorting(), element.getName(), target.getName());
            }
          }
        } else {
          accepted.mode = 0;
        }
        let lookInside;
        if (addNew) {
          lookInside = Object.keys(target.getSchemaElement().getAllowedElements()).length > 0;
        } else {
          lookInside = target.getSchemaElement().isChildElementAllowed(element.getName());
        }
        if (lookInside) {
          // allowed inside
          accepted.mode |= Allowed.INSIDE;
          if (!target.getSchemaElement().areChildrenSortable()) {
            accepted.mode |= Allowed.FIRST_CHILD;
          } else {
            const allowedSorting = target.getSchemaElement().getAllowedElementsSorting();
            if (allowedSorting) {
              if (element) {
                let targetPosition = allowedSorting[element.getName()];
                if (targetPosition !== undefined && (targetPosition === 0 || targetPosition.startsWith("0"))) {
                  accepted.mode |= Allowed.FIRST_CHILD;
                }
              } else {
                //TODO: check if there is a first child and no one can be added before that
              }
            }
          }
        }
      }, this);

      const indicator = this.getChildControl("drag-indicator");

      let expandTimer;

      control.addListener("dragleave", function () {
        if (expandTimer) {
          expandTimer.stop();
          expandTimer = null;
        }
      }, this);

      const onDrag = function  (ev) {
        const orig = ev.getOriginalTarget();
        const origCoords = orig.getContentLocation();
        let leftPos = origCoords.left;
        if (orig instanceof cv.ui.manager.tree.VirtualElementItem) {
          leftPos += 8 + orig.getIndent() * orig.getUserData("cell.level");
          indicator.setWidth(orig.getBounds().width - leftPos);
        } else if (orig !== indicator) {
          return;
        }
        let left = -1000;
        let top = -1000;
        let position = "";
        if ((ev.getDocumentTop() - origCoords.top) <= 3) {
          // above
          if (expandTimer) {
            expandTimer.stop();
            expandTimer = null;
          }
          // check if this item is allowed here
          if (accepted.mode & Allowed.BEFORE) {
            left = leftPos;
            top = origCoords.top;
            position = "before";
          }

        } else if ((origCoords.bottom - ev.getDocumentTop()) <= 3) {
          // below
          if (accepted.target && !accepted.target.isOpen()) {
            // when an element is opened this position is not after this element. but before its first child
            if (accepted.mode & Allowed.AFTER) {
              left = leftPos;
              top = origCoords.bottom;
              position = "after";
            }
          } else {
            if (accepted.mode & Allowed.FIRST_CHILD) {
              left = leftPos + 19;
              top = origCoords.bottom;
              position = "first-child";
            }
          }
          if (expandTimer) {
            expandTimer.stop();
            expandTimer = null;
          }
        } else {
          // inside
          indicator.setDomPosition(-1000, -1000);
          if (accepted.mode & Allowed.INSIDE) {
            position = "inside";
          }
          if (!expandTimer) {
            expandTimer = qx.event.Timer.once(function () {
              if (accepted.target) {
                control.openNode(accepted.target);
              }
            }, this, 1000);
          }
        }
        indicator.setDomPosition(left, top);
        indicator.setUserData("position", position);
      }
      control.addListener("drag", onDrag, this);
      addButton.addListener("drag", onDrag, this);

      const onDrop = function (ev) {
        let type = ev.getCurrentType();
        let action = ev.getCurrentAction()
        const element = type === "cv/tree-element" ? ev.getData("cv/tree-element") : null;
        if (action === "copy" && !element) {
          action = "add";
        }
        const elementName = element ? element.getDisplayName() : "new";
        const target = accepted.target;
        switch (indicator.getUserData("position")) {
          case 'after':
            if (accepted.mode & Allowed.AFTER) {
              this.debug(action, elementName, "after", target.getDisplayName());
              switch (action) {
                case 'move':
                  element.moveAfter(target);
                  break;

                case 'copy':
                  element.insertAfter(target);
                  break;

                case 'add':
                  this._onCreate(target, false);
                  break;
              }
            } else {
              this.debug("NOT ALLOWED", action, elementName, "after", target.getDisplayName());
            }
            break;
          case 'before':
            if (accepted.mode & Allowed.BEFORE) {
              this.debug(action, elementName, "before", target.getDisplayName());
              switch (action) {
                case 'move':
                  element.moveBefore(target);
                  break;

                case 'copy':
                  element.insertBefore(target);
                  break;

                case 'add':
                  this._onCreate(target, true);
                  break;
              }
            } else {
              this.debug("NOT ALLOWED", action, elementName, "after", target.getDisplayName());
            }
            break;

          case 'first-child':
            if (accepted.mode & Allowed.FIRST_CHILD) {
              this.debug(action, elementName, "into", target.getDisplayName() + "as first child");
              switch (action) {
                case 'move':
                  element.moveBefore(target.getChildren().getItem(0));
                  break;

                case 'copy':
                  element.insertBefore(target.getChildren().getItem(0));
                  break;

                case 'add':
                  this._onCreate(target.getChildren().getItem(0), true);
                  break;
              }
            } else {
              this.debug("NOT ALLOWED", elementName, "into", target.getDisplayName() + "as first child");
            }
            break;
        }
      }.bind(this);

      control.addListener("drop", onDrop, this);
      indicator.addListener("drop", onDrop, this);

      const onDragEnd = function(ev) {
        // Move indicator away
        indicator.setDomPosition(-1000, -1000);
        indicator.setUserData("position", null);
        indicator.setUserData("target", null);
        if (expandTimer) {
          expandTimer.stop();
          expandTimer = null;
        }
        accepted.target = null;
        accepted.mode = 0;
      };
      control.addListener("dragend", onDragEnd, this);
      addButton.addListener("dragend", onDragEnd, this);
    },

    /**
     * Create a new element an insert if after target
     *
     * @param target {cv.ui.manager.model.XmlElement} target element
     * @param position {String} one of "after", "before" or "inside"
     * @param elementName {String?} if not set a selection of possible elements at that position will be shown
     * @private
     */
    _onCreate: function (target, position, elementName) {
      const parent = position === 'inside' ? target : target.getParent();
      const parentSchemaElement = parent.getSchemaElement();
      let addable = parent.getAddableChildren(false);
      if (addable.length > 0) {
        // check if a child could be added at this position
        if (!parentSchemaElement.areChildrenSortable() && position !== 'inside') {
          // TODO: filter allowed elements for this position
        }
      }
      if (addable.length > 0) {
        this.__editing = true;
        let typeChooserForm
        if (addable.length > 1) {
          // user has to select a type
          typeChooserForm = new cv.ui.manager.form.ElementForm({
            allowCancel: true,
            context: this,
            message: this.tr("<p style='font-weight:bold'>Choose element</p><p>Several possible element can be created at this position, please select one to proceed.</p>"),
            formData: {
              type: {
                type: "SelectBox",
                label: this.tr("Choose element"),
                help: this.tr("Please choose the element you want to add here."),
                options: addable.sort().map(name => ({label: name, value: name})),
                validation: {
                  required: true
                }
              }
            }
          }).show().promise();
        } else {
          typeChooserForm = Promise.resolve({type: addable[0]});
        }
        typeChooserForm.then(result => {
          const type = result.type;
          // create new element, open the edit dialog and insert it
          const document = target.getNode().ownerDocument;
          const element = document.createElement(type);
          const schemaElement = parentSchemaElement.getSchemaElementForElementName(type);

          const initChildren = function (element, schemaElement) {
            const requiredChildren = schemaElement.getRequiredElements();
            if (requiredChildren.length > 1) {
              if (!schemaElement.areChildrenSortable()) {
                // a special order os required
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
          }

          const xmlElement = new cv.ui.manager.model.XmlElement(element, schemaElement, target.getEditor(), parent);
          // load the "empty" element to init the modification comparison
          xmlElement.load();
          this._onEdit(null, xmlElement).then((data) => {
            // finally insert the new node
            switch (position) {
              case 'before':
                xmlElement.insertBefore(target);
                break;

              case 'after':
                xmlElement.insertAfter(target);
                break;

              case 'inside':
                target.insertChild(xmlElement, -1);
                break;
            }
            this.getChildControl('tree').openNodeAndParents(xmlElement);
            this.getChildControl('tree').setSelection([xmlElement]);
          }, this);
        })
      }
    },

    __getAllowedPositions: function (allowedSorting, elementName, targetName, depth) {
      if (allowedSorting) {
        let currentPosition = allowedSorting[elementName];
        if (typeof currentPosition === "string") {
          currentPosition = currentPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
        } else {
          currentPosition = [currentPosition];
        }
        let targetPosition = allowedSorting[targetName];
        if (typeof targetPosition === "string") {
          targetPosition = targetPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
        } else {
          targetPosition = [targetPosition];
        }
        const depth = Math.min(depth || 1, currentPosition.length, targetPosition.length)
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
        return cv.ui.manager.editor.Tree.Allowed.NONE;
      }
    },

    __checkProvider: function (id, formData, element) {
      const provider = cv.ui.manager.editor.data.Provider.get(id);
      if (provider) {

        if (typeof provider.live === 'function') {
          formData.options = provider.live(element);
        } else if (provider.data) {
          formData.options = provider.data;
        } else {
          this.error("misconfigured provider found for " + id);
        }
        // use virtual widgets for large data sets
        if (Array.isArray(formData.options) && formData.options.length > 50 ||
          typeof formData.options === "object" && Object.keys(formData.options) > 50) {
          formData.type = provider.userInputAllowed ? "VirtualComboBox" : "VirtualSelectBox";
        } else {
          formData.type = provider.userInputAllowed ? "ComboBox" : "SelectBox";
        }
      } else if (["mapping", "styling"].includes(id.split("@").pop())) {
        const type = id.split("@").pop();
        // these are directly filled from data inside the currently used config
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        formData.type = "SelectBox";
        formData.options = [];
        rootNode.querySelectorAll("meta > " + type + "s > " + type).forEach(element => {
          const name = element.getAttribute("name");
          formData.options.push({label: name, value: name});
        });
      }
      if (formData.type.endsWith('SelectBox')) {
        // not allowed here
        delete formData.placeholder;
        if (!formData.validation.required) {
          if (formData.options instanceof Promise) {
            formData.options.then(res => res.unshift({label: " - " + this.tr("not set") + " - ", value: ""}));
          } else {
            formData.options.unshift({label: " - " + this.tr("not set") + " - ", value: ""});
          }
        }
      }
    },

    __getAttributeFormDefinition: function (element, attribute) {
      const docs = attribute.getDocumentation();
      const def = {
        type: "TextField",
        label: attribute.getName(),
        placeholder: " - " + this.tr("not set") + " - ",
        help: docs.join("<br/>"),
        enabled: element.isEditable(),
        value: element.getAttribute(attribute.getName()) || attribute.getDefaultValue(),
        validation: {
          required: !attribute.isOptional(),
          validator: function (value) {
            if (value instanceof qx.ui.form.ListItem) {
              value = value.getModel().getValue();
            }
            if (!attribute.isValueValid(value)) {
              throw new qx.core.ValidationError(qx.locale.Manager.tr("This is not a valid value."));
            }
          }
        }
      }
      switch (attribute.getTypeString()) {
        case 'boolean':
          def.type = "CheckBox";
          def.value = def.value === '' || def.value === null || def.value === undefined ? null : def.value === 'true';
          delete def.placeholder;
          break;

        case 'string':
          const enums = attribute.getEnumeration();
          if (enums.length > 0) {
            def.type = "SelectBox";
            delete def.placeholder;
            def.options = [];
            enums.forEach(name => {
              def.options.push({label: name, value: name});
            });
            if (attribute.isOptional()) {
              // allow empty value
              def.options.unshift({label: " - " + this.tr("not set") + " - ", value: ""});
            }
          } else {
            // check if we have a dataprovider for this
            this.__checkProvider(element.getName() + "@" + attribute.getName(), def, element.getNode());
          }
          break;
      }
      return def;
    },

    _onEdit: function (ev, element) {
      if (!element) {
        element = this.getSelected();
      }
      element.load();
      const formData = {};
      const promises = [];
      const typeElement = element.getSchemaElement();
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
          if (formData[name].options && formData[name].options instanceof Promise) {
            promises.push(formData[name].options);
            formData[name].options.then((res) => {
              formData[name].options = res;
            })
          }
        });
      } else if (element.getNode().nodeType === Node.TEXT_NODE || element.getNode().nodeType === Node.COMMENT_NODE || element.getNode().nodeType === Node.CDATA_SECTION_NODE) {
        const nodeName = element.getNode().nodeName;
        // only in text-only mode we can add text editing to the form
        const docs = typeElement.getDocumentation();
        formData[nodeName] = {
          type: element.getNode().nodeType === Node.COMMENT_NODE || element.getNode().nodeType === Node.CDATA_SECTION_NODE ? "TextArea" : "TextField",
          label: this.tr("Content"),
          placeholder: this.tr("not set"),
          help: docs.join("<br/>"),
          enabled: element.isEditable(),
          value: element.getTextContent(),
          validation: {
            validator: function (value) {
              if (value instanceof qx.ui.form.ListItem) {
                value = value.getModel().getValue();
              }
              if (!typeElement.isValueValid(value)) {
                throw new qx.core.ValidationError(qx.locale.Manager.tr("This is not a valid value."));
              }
            }
          }
        }
        if (formData[nodeName].type === "TextArea") {
          formData[nodeName].lines = 8;
          formData[nodeName].label = "";
          formData[nodeName].width = Math.min(qx.bom.Viewport.getWidth(), 500);
        }
        this.__checkProvider(element.getParent().getName() + "@" + element.getName(), formData[nodeName], element.getNode());
        if (formData[nodeName].options && formData[nodeName].options instanceof Promise) {
          promises.push(formData[nodeName].options);
          formData[nodeName].options.then((res) => {
            formData[nodeName].options = res;
          })
        }
      }
      this.__editing = true;
      return Promise.all(promises).then(() => {
        const formDialog = new cv.ui.manager.form.ElementForm({
          allowCancel: true,
          context: this,
          caption:  "",
          message: element.isEditable() ? this.tr("Edit %1", element.getName()) : this.tr("Show %1", element.getName()),
          formData: formData,
        }).show();
        return formDialog.promise().then(data => {
          if (data && element.isEditable()) {
            // save changes
            element.setAttributes(data);
            this.clearReDos();
          }
          this.__editing = false;
          formDialog.destroy();
        });
      });
    },

    _onDelete: function (ev, element) {
      if (!element) {
        element = this.getSelected();
      }
      if (element && !element.isRequired()) {
        element.remove();
        this.clearReDos();
        return element;
      }
    },

    _onCut: function () {
      const element = this._onDelete();
      if (element) {
        this.setClipboard(element);
      }
    },

    _onCopy: function () {
      const element = this.getSelected();
      if (element) {
        const copy = element.clone();
        this.setClipboard(copy);
      }
    },

    _onPaste: function () {
      const target = this.getSelected();
      const clipboardElement = this.getClipboard();
      if (target && clipboardElement) {
        if (target.insertChild(clipboardElement, -1)) {
          // this was successful, clean the clipboard
          this.resetClipboard();
        }
      }
    },

    /**
     * Maintain global modification state.
     * This method is called by a single cv.ui.manager.model.XmlElement when it has changes its modified state.
     * @param element {cv.ui.manager.model.XmlElement}
     */
    updateModified: function (element) {
      const index = this.__modifiedElements.indexOf(element);
      if (element.$$removed) {
        // we dont care about elements that have been removed
        if (index >= 0) {
          this.__modifiedElements.splice(index, 1);
        }
      } else {
        if (element.isModified()) {
          if (index === -1) {
            this.__modifiedElements.push(element);
          }
        } else if (index >= 0) {
          this.__modifiedElements.splice(index, 1);
        }
      }
      this.getFile().setModified(this.__modifiedElements.length > 0);
      this._onContentChanged();
    },

    _draw: function () {
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
      if (!this.hasChildControl('preview')) {
        this._createChildControl('preview');
      }
    },

    _applySelected: function (value, old) {
      if (value) {
        this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
        this.getChildControl('delete-button').setEnabled(this.getFile().isWriteable() && !value.isRequired());
        const preview = this.getChildControl('preview');
        if (preview.isVisible()) {
          // get page path for this node
          let path = [];
          let node = value.getNode();
          while (node && node.nodeName !== 'pages') {
            if (node.nodeName === 'page') {
              path.unshift(node.getAttribute("name"));
            }
            node = node.parentNode;
          }
          if (path.length > 0) {
            preview.openPage(path.pop(), path.join("/"));
          }
        }
      } else {
        this.getChildControl('edit-button').setEnabled(false);
        this.getChildControl('delete-button').setEnabled(false);

      }
    },

    _onElementKeyUp: function(ev) {
      if (this.getSelected() && this.isVisible()) {
        if (ev.getKeyIdentifier() === "Enter") {
          if (!this.__editing) {
            this._onEdit();
          }
        }
      }
    },

    _applyContent: function(value) {
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
              this.info(file.getPath() + " is a valid config file");
              this.__loadContent(value);
            } else {
              const dialog = new cv.ui.manager.dialog.ValidationError(file, value, res);
              dialog.addListener('action', (ev) => {
                console.log(ev.getData());
                switch (ev.getData()) {
                  case 'proceed':
                    this.__loadContent(value);
                    break;

                  case 'open-source':
                    const file = this.getFile();
                    cv.ui.manager.Main.getInstance().closeFile(file);
                    qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
                      file: file.getFullPath(),
                      handler: "cv.ui.manager.editor.Source",
                      handlerOptions: {
                        jumpToError: true
                      }
                    });
                    break;

                  case 'cancel':
                    // close this editor
                    cv.ui.manager.Main.getInstance().closeFile(this.getFile());
                    break;
                }
                dialog.hide();
                dialog.destroy();
              }, this);
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

    __loadContent: function (value) {
      const tree = this.getChildControl('tree');
      const file = this.getFile();
      const document = qx.xml.Document.fromString(value);
      const schemaElement = this._schema.getElementNode(document.documentElement.nodeName);
      const rootNode = new cv.ui.manager.model.XmlElement(document.documentElement, schemaElement, this);
      rootNode.setEditable(file.getWriteable());
      rootNode.load();
      tree.setModel(rootNode);
      if (this.hasChildControl('add-button')) {
        this.getChildControl('add-button').setEnabled(file.getWriteable());
      }
      const preview = this.getChildControl('preview');
      if (preview.isVisible() && !preview.getFile()) {
        const previewConfig = new cv.ui.manager.model.FileItem('visu_config_previewtemp.xml', '/', file.getParent());
        preview.setFile(previewConfig);
      }
      this._updatePreview(null, value);
    },

    _onContentChanged: function () {
      const content = this.getCurrentContent();
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), content);
      }
      if (this.isAutoRefreshPreview()) {
        this._updatePreview(null, content);
      }
    },

    _updatePreview: function (ev, content, reset) {
      const previewFile = this.getChildControl('preview').getFile();
      if (previewFile) {
        if (!content && !reset) {
          content = this.getCurrentContent(true);
        } else if (reset === true) {
          this.getChildControl('preview').hide();
          return;
        }
        this.getChildControl('preview').show();
        this._client.updateSync({
          path: previewFile.getFullPath(),
          hash: 'ignore'
        }, content, () => {
          qx.event.message.Bus.dispatchByName(previewFile.getBusTopic(), {
            type: 'contentChanged',
            file: previewFile,
            data: content,
            source: this
          });
        }, this);
      }
    },

    getCurrentContent: function (fast) {
      const tree = this.getChildControl('tree');
      if (tree.getModel()) {
        const rootNode = tree.getModel().getNode();
        if (fast) {
          return new XMLSerializer().serializeToString(rootNode.ownerDocument);
        } else {
          // prettify content
          return `<?xml version="1.0" encoding="UTF-8"?>\n` + this._prettify(rootNode, 0);
        }
      } else {
        return null;
      }
    },

    _prettify: function (node, level, singleton) {
      let tabs = Array(level + 1).fill('').join('\t')
      let newLine = '\n';
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          return (singleton ? '' : tabs) + node.textContent.trim() + (singleton ? '' : newLine);
        } else {
          return '';
        }
      }
      if (node.nodeType === Node.COMMENT_NODE) {
        return (singleton ? '' : tabs) + `<!--${node.textContent}--> ${(singleton ? '' : newLine)}`;
      } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
        return (singleton ? '' : tabs) + `<![CDATA[${node.textContent}]]> ${(singleton ? '' : newLine)}`;
      }
      if (!node.tagName) {
        return this._prettify(node.firstChild, level);
      }
      let output = tabs + `<${node.tagName}`; // >\n
      for (let i = 0; i < node.attributes.length; i++) {
        output += ` ${node.attributes[i].name}="${node.attributes[i].value}"`;
      }
      if (node.childNodes.length === 0) {
        return output + ' />' + newLine;
      } else {
        output += '>';
      }
      let onlyOneTextChild = ((node.childNodes.length === 1) && (node.childNodes[0].nodeType === 3));
      if (!onlyOneTextChild) {
        output += newLine;
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        output += this._prettify(node.childNodes[i], level + 1, onlyOneTextChild);
      }
      return output + (onlyOneTextChild ? '' : tabs) + `</${node.tagName}>` + newLine;
    },

    _onSaved: function () {
      this.base(arguments);
      this.__modifiedElements.forEach(elem => elem.onSaved());
      this.__modifiedElements = [];
      this.clearUnDosReDos();
    },

    isSupported: function (file) {
      return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName());
    },

    _showHelp: function () {
      const focusedWidget = qx.ui.core.FocusHandler.getInstance().getFocusedWidget();
      const dialogConf = {
        caption: this.tr("Help"),
        modal: true,
        minWidth: Math.min(600, qx.bom.Viewport.getWidth()),
        message: ""
      }
      if (focusedWidget === this.getChildControl('searchbar')) {
        dialogConf.message = this.tr("<h3>Search for elements</h3>\
<p>You can search for element names (tag names or content of name attribute) by typing a search value here. \
All elements whose tag name or name-attribute start with the search term will be found</p>\
<p>Search will start automatically when the search term is at least 2 characters long.</p>\
<p>The first found element will be opened and selected in the element tree. You can jump to the next \
found element with 'Enter' or the 'Down' key. Accordingly you can jump the the previous found element \
with the 'Up' key.</p>");
      } else {
        // show general help
        dialogConf.message = this.tr("<h3>CometVisu XML-Editor - a brief introduction</h3>\
<p>The CometVisu XMl-Editor shows the content of a CometVisu config file in a tree-like structure. \
You can traverse through the tree by opening/closing elements with a double-click.</p>\
<p>The Xml-Editor will make sure that you do not create an invalid configuration file. \
If you experience a change that has not been accepted / or is not allowed that is most likely due to avoid an invalid configuration.</p>\
<h4>Editing attributes</h4>\
<p>The elements attributes can be edited by selecting an element and clicking on the 'edit'-button in the toolbar \
above the tree of by right-clicking on the element and the 'edit'-button in the context menu</p>\
<h4>Editing elements</h4>\
<p>The elements in the tree support re-ordering via drag & drop. You can also cut/copy or paste them. \
You can add new elements by starting a drag in the round + button on the bottom of the tree, or \
by right clicking on an element and choosing the 'add child'-button.</p>\
<p>You can delete elements by the delete buttons in the toolbar</p>\
<h4>Expert view</h4>\
<p>Some attributes are hidden in the editing dialog, because they provide access to settings that usually \
are not needed that often. You can access these attributes by toggling to the 'Expertview'-button \
in the toolbar directly above the tree.</p>\
<h4>Config preview</h4>\
<p>An preview of the edited config file is shown on the right part of the screen. The preview will not automatically \
refresh after you have changed something. You can refresh is manually by clicking the most right button in the toolbar.</p>");
      }
      new dialog.Alert(dialogConf).show();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._schema = null;
    this._workerWrapper = null;
    this._disposeArray('__modifiedElements');
    qx.core.Init.getApplication().getRoot().removeListener("keyup", this._onElementKeyUp, this);
  }
});
