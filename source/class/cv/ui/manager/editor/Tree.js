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
    this._handledActions = ['save', 'cut', 'copy', 'paste', 'undo', 'redo'];

    // init schema
    this._schema = cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
    this._schema.onLoaded(function () {
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
    ICON: cv.theme.dark.Images.getIcon('xml', 18)
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

    _loadFile: function (file, old) {
      if (old && this._workerWrapper) {
        this._workerWrapper.close(old);
      }
      if (file && file.getType() === 'file' && this.isSupported(file)) {
        this.base(arguments, file, old);
      } else {
        this.base(arguments, null, old);
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
           control = new qx.ui.container.Composite(new qx.ui.layout.VBox());
           this.getChildControl('splitpane').add(control, 0);
           break;

         case 'preview':
           control = new cv.ui.manager.viewer.Config();
           control.set({
             target: 'iframe',
             minWidth: 600
           });
           this.getChildControl('splitpane').add(control, 1);
           break;

         case 'add-button':
           control = new qx.ui.toolbar.Button(null, cv.theme.dark.Images.getIcon('new-folder', 16));
           control.setEnabled(this.getFile() && this.getFile().isWriteable());
           control.setDraggable(true);
           this.getChildControl('toolbar').add(control);
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

         case 'toolbar':
           control = new qx.ui.toolbar.ToolBar();
           this.getChildControl('left').addAt(control, 0);
           break;

         case 'searchbar-container':
           control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
           this.getChildControl('left').addAt(control, 1);
           break;

         case 'searchbar':
           control = new qx.ui.form.TextField();
           control.set({
             liveUpdate: true,
             placeholder: this.tr("Search...")
           });
           control.addListener("changeValue", qx.util.Function.debounce(this._onSearch, 250), this);
           this.getChildControl('searchbar-container').add(control, {flex: 1});
           break;

         case 'tree':
           control = new qx.ui.tree.VirtualTree(null, 'displayName', 'children');
           control.set({
             selectionMode: 'single',
             width: 350,
             openMode: 'tap'
           });
           this._initDragDrop(control);
           control.setDelegate({
             createItem: function () {
               const item = new cv.ui.manager.tree.VirtualElementItem();
               let waiting = null;
               item.addListener('tap', (ev) => {
                 const current = this.getSelected();
                 if (current === item.getModel()) {
                   ev.stopPropagation();
                   // defer deselect to avoid deselection on dbltap
                   if (!waiting) {
                     waiting = qx.event.Timer.once(() => {
                       if (control.isNodeOpen(current)) {
                         control.closeNode(current);
                       } else {
                         control.openNode(current);
                       }
                       waiting = null;
                     }, this, qx.event.handler.GestureCore.DOUBLETAP_TIME);
                   }
                 } else {
                   this.setSelected(item.getModel());
                 }
               }, this);
               item.addListener('dbltap', () => {
                 if (waiting) {
                   waiting.stop();
                   waiting.dispose();
                   waiting = null;
                 }
                 this._onEdit();
               }, this);
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
           this.getChildControl('left').addAt(control, 2, {flex: 1});
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
       }

       return control || this.base(arguments, id);
    },

    _onChangeTreeSelection: function (ev) {
      const data = ev.getData();
      if (data.added.length === 1) {
        this.setSelected(data.added[0]);
      } else {
        this.resetSelected();
      }
    },

    _onSearch: function (ev) {
      const value = ev.getData();
      if (value.length > 2) {
        const tree = this.getChildControl('tree');
        const rootNode = tree.getModel().getNode();
        const found = Array.from(rootNode.querySelectorAll('*')).filter(function (el) {
          return el.tagName.startsWith(value) || el.hasAttribute("name") && el.getAttribute("name").startsWith(value);
        });
        if (found.length > 0) {
          // find and open the first result and save the rest for traversal (with keyboard arrows
          const firstMatch = found[0];
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
        // TODO: save results for a keyboard traversal (with up down arrows)
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
            return attribute.isValueValid(value);
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

    _initDragDrop: function (control) {
      const enabled = this.getFile().isWriteable();
      control.set({
        draggable: enabled,
        droppable: enabled
      })
      control.addListener("dragstart", function (ev) {
        const element = ev.getDragTarget().getModel();
        ev.addAction("copy");
        if (!element.isRequired() && element.isSortable()) {
          ev.addAction("move");
        }
        ev.addType("cv/tree-element");
        ev.addData("cv/tree-element", element);
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
        console.log(type, ev.getCurrentAction());
      }, this);
      const Allowed = {
        NONE: 0,
        BEFORE: 1,
        AFTER: 2,
        INSIDE: 4,
        FIRST_CHILD: 8 // Is allowed to added as first child
      }
      const accepted = {
        mode: 0,
        element: null
      }

      control.addListener("dragover", function (ev) {
        const element = ev.getData("cv/tree-element");
        const target = ev.getTarget().getModel();
        const parent = target.getParent();
        accepted.element = target;
        if (parent) {
          const parentSchemaElement = target.getParent().getSchemaElement();
          if (!parentSchemaElement.isChildElementAllowed(element.getName())) {
            ev.preventDefault();
            // not allowed on this level
            accepted.mode = Allowed.NONE;
          } else if (parentSchemaElement.areChildrenSortable()) {
            // children are not sorted and can be put anywhere
            // so this is allowed anywhere
            accepted.mode = Allowed.BEFORE | Allowed.AFTER;
          } else {
            // check position
            const allowedSorting = parentSchemaElement.getAllowedElementsSorting();
            if (allowedSorting) {
              let currentPosition = allowedSorting[element.getName()];
              if (typeof currentPosition === "string") {
                currentPosition = currentPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
              } else {
                currentPosition = [currentPosition];
              }
              let targetPosition = allowedSorting[target.getName()];
              if (typeof targetPosition === "string") {
                targetPosition = targetPosition.split(".").map(i => /^\d+$/.test(i) ? parseInt(i) : i);
              } else {
                targetPosition = [targetPosition];
              }
              for (let i = 0; i < Math.min(currentPosition.length, targetPosition.length); i++) {
                if (currentPosition[i] === targetPosition[i]) {
                  // no special position
                  accepted.mode = Allowed.BEFORE | Allowed.AFTER;
                  break;
                } else if (currentPosition[i] - 1 === targetPosition[i]) {
                  accepted.mode = Allowed.AFTER;
                } else if (currentPosition[i] + 1 === targetPosition[i]) {
                  accepted.mode = Allowed.BEFORE;
                } else {
                  accepted.mode = Allowed.NONE;
                }
              }
            }
          }
        } else {
          accepted.mode = 0;
        }
        if (target.getSchemaElement().isChildElementAllowed(element.getName())) {
          // allowed inside
          accepted.mode |= Allowed.INSIDE;
          const allowedSorting = target.getSchemaElement().getAllowedElementsSorting();
          if (allowedSorting) {
            let targetPosition = allowedSorting[target.getName()];
            if (targetPosition !== undefined && (targetPosition === 0 || targetPosition.startsWith("0"))) {
              accepted.mode |= Allowed.FIRST_CHILD;
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

      control.addListener("drag", function (ev) {
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
          if (accepted.element && !accepted.element.isOpen()) {
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
              if (accepted.element) {
                control.openNode(accepted.element);
              }
            }, this, 1000);
          }
        }
        indicator.setDomPosition(left, top);
        indicator.setUserData("position", position);
      }, this);

      const onDrop = function (element) {
        const target = accepted.element;
        switch (indicator.getUserData("position")) {
          case 'after':
            if (accepted.mode & Allowed.AFTER) {
              this.debug("move", element.getDisplayName(), "after", target.getDisplayName());
              element.moveAfter(target);
            } else {
              this.debug("NOT ALLOWED move", element.getDisplayName(), "after", target.getDisplayName());
            }
            break;
          case 'before':
            if (accepted.mode & Allowed.BEFORE) {
              this.debug("move", element.getDisplayName(), "before", target.getDisplayName());
              element.moveBefore(target);
            } else {
              this.debug("NOT ALLOWED move", element.getDisplayName(), "after", target.getDisplayName());
            }
            break;

          case 'first-child':
            if (accepted.mode & Allowed.FIRST_CHILD) {
              this.debug("move", element.getDisplayName(), "into", target.getDisplayName() + "as first child");
              element.moveBefore(target.getChildren().getItem(0));
            } else {
              this.debug("NOT ALLOWED move", element.getDisplayName(), "into", target.getDisplayName() + "as first child");
            }
            break;
        }
      }.bind(this);

      control.addListener("drop", function (ev) {
        onDrop(ev.getData("cv/tree-element"));
      }, this);

      indicator.addListener("drop", function (ev) {
        onDrop(ev.getData("cv/tree-element"));
      }, this);

      control.addListener("dragend", function() {
        // Move indicator away
        indicator.setDomPosition(-1000, -1000);
        indicator.setUserData("position", null);
        indicator.setUserData("target", null);
        if (expandTimer) {
          expandTimer.stop();
          expandTimer = null;
        }
        accepted.element = null;
        accepted.mode = 0;
      });
    },

    __checkProvider: function (id, formData, element) {
      const provider = cv.ui.manager.editor.data.Provider.get(id);
      if (provider) {
        formData.type = provider.userInputAllowed ? "ComboBox" : "SelectBox";
        if (typeof provider.live === 'function') {
          formData.options = provider.live(element);
        } else if (provider.data) {
          formData.options = provider.data;
        } else {
          this.error("misconfigured provider found for " + id);
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
      if (formData.type === 'SelectBox') {
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

    _onEdit: function () {
      const element = this.getSelected();
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
      } else if (element.getNode().nodeType === Node.TEXT_NODE || element.getNode().nodeType === Node.COMMENT_NODE) {
        const nodeName = element.getNode().nodeName;
        // only in text-only mode we can add text editing to the form
        const docs = typeElement.getDocumentation();
        formData[nodeName] = {
          type: "TextField",
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
              return typeElement.isValueValid(value);
            }
          }
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
      Promise.all(promises).then(() => {
        const formDialog = new cv.ui.manager.form.ElementForm({
          allowCancel: true,
          context: this,
          caption:  "",
          message: element.isEditable() ? this.tr("Edit %1", element.getName()) : this.tr("Show %1", element.getName()),
          formData: formData,
          callback: function (data) {
            if (data && element.isEditable()) {
              // save changes
              element.setAttributes(data);
              this.clearReDos();
            }
            this.__editing = false;
            formDialog.destroy();
          }.bind(this)
        }).show();
      });
    },

    _onDelete: function () {
      const element = this.getSelected();
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

    updateModified: function (element) {
      const index = this.__modifiedElements.indexOf(element);
      if (element.isModified()) {
        if (index === -1) {
          this.__modifiedElements.push(element);
        }
      } else if (index >= 0) {
        this.__modifiedElements.splice(index, 1);
      }
      this.getFile().setModified(this.__modifiedElements.length > 0);
      this._onContentChanged();
    },

    _draw: function () {
      const toolbar = this.getChildControl('toolbar');
      this._createChildControl('searchbar');
      this._createChildControl('add-button');
      toolbar.addSeparator();
      this._createChildControl('edit-button');
      this._createChildControl('delete-button');
      toolbar.addSpacer();
      this._createChildControl('toggle-expert');

      this._createChildControl('tree');
      this._createChildControl('preview');
    },

    _applySelected: function (value, old) {
      if (value) {
        this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
        this.getChildControl('delete-button').setEnabled(this.getFile().isWriteable() && !value.isRequired());
        const preview = this.getChildControl('preview');
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

      } else {
        this.getChildControl('edit-button').setEnabled(false);
        this.getChildControl('delete-button').setEnabled(false);

      }
    },

    _onElementKeyUp: function(ev) {
      if (this.getSelected() && ev.getKeyIdentifier() === "Enter" && this.isVisible()) {
        if (!this.__editing) {
          this._onEdit();
        }
      }
    },

    _applyContent: function(value) {
      const tree = this.getChildControl('tree');
      if (value) {
        const document = qx.xml.Document.fromString(value);
        const schemaElement = this._schema.getElementNode(document.documentElement.nodeName);
        const rootNode = new cv.ui.manager.model.XmlElement(document.documentElement, schemaElement, this);
        rootNode.setEditable(this.getFile().getWriteable());
        rootNode.load();
        tree.setModel(rootNode);
        this.getChildControl('add-button').setEnabled(this.getFile().getWriteable());

        if (this._workerWrapper) {
          this._workerWrapper.open(this.getFile(), value);
        }
        const preview = this.getChildControl('preview');
        if (!preview.getFile()) {
          const previewConfig = new cv.ui.manager.model.FileItem('visu_config_previewtemp.xml', '/', this.getFile().getParent());
          preview.setFile(previewConfig);
        }
        this._updatePreview(value);
      } else {
        tree.resetModel();
        this.getChildControl('add-button').setEnabled(false);
      }
    },

    _onContentChanged: function () {
      const tree = this.getChildControl('tree');
      const rootNode = tree.getModel().getNode();
      const content = new XMLSerializer().serializeToString(rootNode.ownerDocument);
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), content);
      }
      this._updatePreview(content);
    },

    _updatePreview: function (content) {
      const previewFile = this.getChildControl('preview').getFile();
      if (previewFile) {
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

    getCurrentContent: function () {
      const tree = this.getChildControl('tree');
      const rootNode = tree.getModel().getNode();
      // prettify content
      const prettyContent = `<?xml version="1.0" encoding="UTF-8"?>\n` + this._prettify(rootNode, 0);
      return prettyContent;
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
        return (singleton ? '' : tabs) + `<!--${node.textContent.trim()}--> ${(singleton ? '' : newLine)}`;
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
      this.clearUnDosReDos();
    },

    isSupported: function (file) {
      return cv.ui.manager.editor.Tree.SUPPORTED_FILES.test(file.getName());
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
