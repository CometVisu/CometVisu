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
      "qx.ui.form.IModel": {
        "require": true
      },
      "cv.ui.manager.upload.MDragUpload": {
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "cv.ui.manager.model.Preferences": {
        "construct": true
      },
      "cv.ui.manager.model.FileItem": {},
      "cv.ui.manager.tree.FileSystem": {},
      "qxl.dialog.Dialog": {},
      "qx.lang.String": {},
      "qx.event.message.Bus": {},
      "cv.ui.manager.viewer.Image": {},
      "cv.ui.manager.control.FileHandlerRegistry": {},
      "cv.theme.dark.Images": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.basic.Label": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Button": {},
      "cv.ui.manager.control.FileController": {},
      "qx.event.type.Tap": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* FileListItem.js
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
   * A qx.ui.form.ListItem with an additional label overlay over the icon to show the file type
   */
  qx.Class.define('cv.ui.manager.form.FileListItem', {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IModel],
    include: [cv.ui.manager.upload.MDragUpload],
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(label, icon, model) {
      qx.ui.core.Widget.constructor.call(this, label, icon);
      var layout = new qx.ui.layout.Canvas();
      layout.setDesktop(true);
      this._setLayout(layout);
      if (model) {
        this.setModel(model);
      }
      this.addListener('pointerover', this._onPointerOver, this);
      this.addListener('pointerout', this._onPointerOut, this);
      cv.ui.manager.model.Preferences.getInstance().addListener('changeDefaultConfigEditor', this._maintainFileActions, this);
      this.setUploadHint(this.tr('Drop the file here to replace the content.'));
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** (Fired by {@link qx.ui.form.List}) */
      action: 'qx.event.type.Event'
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-file-item'
      },
      model: {
        nullable: true,
        event: 'changeModel',
        apply: '_applyModel',
        dereference: true,
        check: 'cv.ui.manager.model.FileItem'
      },
      /**
       * Show the action buttons.
       */
      showFileActions: {
        check: 'Boolean',
        init: false,
        apply: '_maintainFileActions'
      },
      /** The label/caption/text of the qx.ui.basic.Atom instance */
      label: {
        nullable: true,
        check: 'String',
        event: 'changeLabel'
      },
      /** Any URI String supported by qx.ui.basic.Image to display an icon */
      icon: {
        check: 'String',
        nullable: true,
        themeable: true,
        event: 'changeIcon'
      },
      /**
       * The space between the icon and the label
       */
      gap: {
        check: 'Integer',
        nullable: false,
        event: 'changeGap',
        themeable: true,
        init: 4
      },
      /**
       * Configure the visibility of the sub elements/widgets.
       * Possible values: both, label, icon
       */
      show: {
        init: 'both',
        check: ['both', 'label', 'icon'],
        themeable: true,
        inheritable: true,
        event: 'changeShow'
      },
      /**
       * The position of the icon in relation to the text.
       * Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
       */
      iconPosition: {
        init: 'left',
        check: ['top', 'right', 'bottom', 'left', 'top-left', 'bottom-left', 'top-right', 'bottom-right'],
        themeable: true,
        event: 'changeIconPosition'
      },
      /**
       * Whether the content should be rendered centrally when to much space
       * is available. Enabling this property centers in both axis. The behavior
       * when disabled of the centering depends on the {@link #iconPosition} property.
       * If the icon position is <code>left</code> or <code>right</code>, the X axis
       * is not centered, only the Y axis. If the icon position is <code>top</code>
       * or <code>bottom</code>, the Y axis is not centered. In case of e.g. an
       * icon position of <code>top-left</code> no axis is centered.
       */
      center: {
        init: false,
        check: 'Boolean',
        themeable: true,
        event: 'changeCenter'
      },
      /**
       * Restrict possible file uploads (not supported by every browxer)
       */
      acceptUpload: {
        init: null,
        nullable: true,
        check: 'String'
      },
      viewMode: {
        check: ['list', 'preview'],
        init: 'preview',
        apply: '_applyViewMode'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      _uploadManager: null,
      // overridden
      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true,
        selected: true,
        dragover: true,
        hovered: true
      },
      _applyViewMode: function _applyViewMode() {
        switch (this.getViewMode()) {
          case 'list':
            this.addState('list');
            this.getChildControl('atom').setLayoutProperties({
              left: 10,
              top: 0,
              bottom: 0,
              right: null
            });
            this.getChildControl('bottom-bar').setLayoutProperties({
              top: 0,
              bottom: 0,
              right: 0,
              left: null
            });
            break;
          case 'preview':
            this.removeState('list');
            this.getChildControl('atom').setLayoutProperties({
              left: 0,
              top: 0,
              bottom: 34,
              right: 0
            });
            this.getChildControl('bottom-bar').setLayoutProperties({
              left: 0,
              bottom: 0,
              right: 0,
              top: null
            });
            break;
        }
      },
      /**
       * Event handler for the pointer over event.
       */
      _onPointerOver: function _onPointerOver() {
        this.addState('hovered');
      },
      /**
       * Event handler for the pointer out event.
       */
      _onPointerOut: function _onPointerOut() {
        this.removeState('hovered');
      },
      _isDroppable: function _isDroppable(files) {
        if (files.length === 1) {
          if (this.getModel().getSpecial() === 'add-file') {
            return true;
          }
          var myMime = cv.ui.manager.tree.FileSystem.getMimetypeFromSuffix(this.getModel().getName().split('.').pop());
          return myMime === files[0].type;
        }
        return false;
      },
      _onDrop: function _onDrop(ev) {
        ev.preventDefault();
        if (this.getModel().getSpecial() === 'add-file') {
          cv.ui.manager.upload.MDragUpload.uploadFile(cv.ui.manager.upload.MDragUpload.getFiles(ev)[0]);
        } else {
          qxl.dialog.Dialog.confirm(this.tr('Do you really want to replace the \'%1\' with the uploaded files content?', this.getModel().getName()), function (confirmed) {
            if (confirmed) {
              var newFile = cv.ui.manager.upload.MDragUpload.getFiles(ev)[0];
              cv.ui.manager.upload.MDragUpload.uploadFile(newFile, this.getModel());
            }
          }, this);
        }
        this._onStopDragging(ev);
      },
      _applyModel: function _applyModel(value) {
        if (value && value.getType() === 'file') {
          var control = this.getChildControl('file-type');
          if (!value.isFake()) {
            var name = value.getName();
            this.getChildControl('atom').setToolTipText(this.tr('Double click to open "%1"', name));
            var type = name.split('.').pop();

            // do not use file types that are longer than 4 chars (not enough space)
            if (type.length <= 4) {
              var handled = false;
              switch (type) {
                case 'xml':
                  control.setValue('</>');
                  handled = true;
                  break;
                case 'js':
                  type = qx.lang.String.firstUp(type);
                // eslint-disable-next-line no-fallthrough
                case 'css':
                case 'conf':
                  control.setValue(type);
                  handled = true;
                  break;
              }
              if (handled && this.getViewMode() === 'preview') {
                control.show();
              } else {
                control.exclude();
              }
            } else {
              control.exclude();
            }
          }
        } else {
          this.getChildControl('file-type').exclude();
          this.getChildControl('atom').resetToolTipText();
        }
        // this.getChildControl('bottom-bar').show();
        // this.setUploadHint(this.tr('Drop the file here to replace the content.'));
        // this.getChildControl('atom').setToolTipText(this.tr('Double click to open'));
        this._maintainFileActions();
        // if (this._uploadManager) {
        //   try {
        //     this._uploadManager.removeWidget(this);
        //   } catch (e) {}
        // }
      },
      _onOpenWith: function _onOpenWith(ev) {
        var handlerId = ev.getTarget().getUserData('handlerId');
        qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
          file: this.getModel(),
          handler: handlerId
        });
      },
      _applyIcon: function _applyIcon(value, old) {
        cv.ui.manager.form.FileListItem.superclass.prototype._applyIcon.call(this, value, old);
        if (value && !value.startsWith('@')) {
          var control = this.getChildControl('atom').getChildControl('icon');
          if (!cv.ui.manager.viewer.Image.getImageData(value)) {
            // wait for image to be loaded
            control.addListenerOnce('loaded', this.__P_39_0, this);
          } else {
            this.__P_39_0();
          }
        }
      },
      _maintainFileActions: function _maintainFileActions() {
        var file = this.getModel();
        if (this.isShowFileActions() && file) {
          this.getChildControl('download-button').setVisibility(file.getType() === 'dir' || file.isFake() ? 'excluded' : 'visible');
          this.getChildControl('action-button').setVisibility(file.isFake() ? 'excluded' : 'visible');
          var editorConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file, 'edit');
          var viewerConf = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file, 'view');
          var openButton = this.getChildControl('open-button');
          var editButton = this.getChildControl('edit-button');
          if (file.isWriteable() && editorConf) {
            editButton.setUserData('handlerId', editorConf.Clazz.classname);
            editButton.set({
              icon: editorConf.Clazz.ICON || cv.theme.dark.Images.getIcon('edit', 18),
              enabled: true,
              toolTipText: editorConf.Clazz.TITLE ? editorConf.Clazz.TITLE.translate().toString() : ''
            });
            editButton.show();
          } else {
            editButton.exclude();
          }
          if (viewerConf) {
            openButton.setUserData('handlerId', viewerConf.Clazz.classname);
            openButton.set({
              icon: viewerConf.Clazz.ICON || cv.theme.dark.Images.getIcon('preview', 18),
              enabled: true,
              toolTipText: viewerConf.Clazz.TITLE ? viewerConf.Clazz.TITLE.translate().toString() : ''
            });
            openButton.show();
          } else {
            openButton.exclude();
          }
          this.getChildControl('action-button');
          this.getChildControl('bottom-bar').show();
        } else {
          this.getChildControl('bottom-bar').exclude();
        }
      },
      __P_39_0: function __P_39_0() {
        var data = cv.ui.manager.viewer.Image.getImageData(this.getIcon());
        var control = this.getChildControl('atom').getChildControl('icon');
        var sizeHint = control.getSizeHint();
        var width = sizeHint.width;
        var height = Math.round(1 / data.aspectRatio * width);
        var padding = [0, 0, 0, 0];
        if (height > sizeHint.height) {
          height = sizeHint.height;
          width = Math.round(data.aspectRatio * height);
          padding[1] = Math.round((sizeHint.width - width) / 2);
          padding[3] = padding[1];
        } else {
          padding[0] = Math.round((sizeHint.height - height) / 2);
          padding[2] = padding[0];
        }
        control.setPadding(padding);
      },
      _maintainFileTypePosition: function _maintainFileTypePosition() {
        var iconBounds = this.getChildControl('atom').getChildControl('icon').getBounds();
        var top = Math.round(iconBounds.top + iconBounds.height / 2);
        this.getChildControl('file-type').setLayoutProperties({
          left: iconBounds.left,
          top: top,
          right: iconBounds.left + iconBounds.width,
          bottom: top + 18
        });
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var _this = this;
        var control;
        switch (id) {
          case 'atom':
            control = new qx.ui.basic.Atom();
            ['label', 'icon', 'gap', 'iconPosition', 'show', 'center'].forEach(function (prop) {
              this.bind(prop, control, prop);
            }, this);
            control.setAnonymous(true);
            this._add(control, {
              top: 0,
              left: 0,
              right: 0,
              bottom: 34
            });
            break;
          case 'file-type':
            {
              control = new qx.ui.basic.Label();
              control.set({
                zIndex: 100,
                anonymous: true,
                font: 'title',
                textAlign: 'center',
                textColor: 'surface',
                minWidth: 70
              });
              var icon = this.getChildControl('atom').getChildControl('icon');
              icon.bind('visibility', control, 'visibility');
              icon.addListener('resize', this._maintainFileTypePosition, this);
              this._add(control, {
                width: '100%'
              });
              break;
            }
          case 'bottom-bar':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox(4, 'center'));
            control.setAnonymous(true);
            this._add(control, {
              left: 0,
              bottom: 0,
              right: 0
            });
            break;
          case 'download-button':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('download', 18));
            control.setToolTipText(this.tr('Download file'));
            control.addListener('execute', function () {
              cv.ui.manager.control.FileController.getInstance().download(_this.getModel());
            });
            this.getChildControl('bottom-bar').add(control);
            break;
          case 'action-button':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('menu', 18));
            control.setToolTipText(this.tr('Other file actions'));
            this.getChildControl('bottom-bar').add(control);
            control.addListener('tap', function (ev) {
              _this.fireEvent('action', qx.event.type.Tap, [ev.getNativeEvent(), _this, ev.getTarget(), false, true]);
            });
            break;
          case 'open-button':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('preview', 18));
            control.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
                file: _this.getModel(),
                handler: control.getUserData('handlerId')
              });
            });
            this.getChildControl('bottom-bar').add(control);
            break;
          case 'edit-button':
            control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('preview', 18));
            control.addListener('execute', function () {
              qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
                file: _this.getModel(),
                handler: control.getUserData('handlerId')
              });
            });
            this.getChildControl('bottom-bar').add(control);
            break;
        }
        if (!control) {
          control = this._createMDragUploadChildControlImpl(id);
        }
        return control || cv.ui.manager.form.FileListItem.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden
      capture: function capture() {
        // do not fire capture method for upload-items (see: com.zenesis.qx.upload.MUploadButton)
        if (!this.getFile() || this.getFile().getSpecial() !== 'add-file') {
          cv.ui.manager.form.FileListItem.superclass.prototype.capture.call(this);
        }
      },
      // overridden
      releaseCapture: function releaseCapture() {
        // do not fire capture method for upload-items (see: com.zenesis.qx.upload.MUploadButton)
        if (!this.getFile() || this.getFile().getSpecial() !== 'add-file') {
          cv.ui.manager.form.FileListItem.superclass.prototype.releaseCapture.call(this);
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.removeListener('pointerover', this._onPointerOver, this);
      this.removeListener('pointerout', this._onPointerOut, this);
      this._disposeObjects('_uploadManager');
      cv.ui.manager.model.Preferences.getInstance().removeListener('changeDefaultConfigEditor', this._maintainFileActions, this);
    }
  });
  cv.ui.manager.form.FileListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileListItem.js.map?dt=1702815207531