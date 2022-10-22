/* MDragUpload.js
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
 * Add upload via drag&drop feature to this widget. The including widget must have a
 * "upload-dropbox" childcontrol or add
 *  <pre class="javascript">
 *   if (!control) {
        control = this._createMDragUploadChildControlImpl(id);
      }
 *   </pre>
 *   to their own _createChildControlImpl method
 */
qx.Mixin.define('cv.ui.manager.upload.MDragUpload', {
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct() {
    this.setDroppable(true);
    if (this.getBounds()) {
      this._applyStartDragListeners();
    } else {
      this.addListenerOnce('appear', () => {
        this._applyStartDragListeners();
      });
    }
    const layout = this._getLayout();
    if (!(layout instanceof qx.ui.layout.Grow) && !(layout instanceof qx.ui.layout.Canvas)) {
      this.addListener('resize', this.__syncBounds, this);
    }
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties: {
    uploadMode: {
      check: 'Boolean',
      init: false,
      apply: '__applyUploadMode'
    },

    uploadHint: {
      check: 'String',
      init: ''
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Handles HTML5 drop events (dropping external files on dom element)
     * @param ev {Event}
     */
    onHtml5Drop(ev) {
      ev.preventDefault();
      this.getFiles(ev).forEach(this.uploadFile, this);
    },

    /**
     * Uploads the dropped file to the correct folder:
     * - config files to the resources/config folder
     * - accepted media files to the resources/config/media folder
     * @param file {File}
     * @param replaceFile {cv.ui.manager.model.FileItem?} optional, if set this files content gets replaced with the uploaded ones
     */
    uploadFile(file, replaceFile) {
      const isConfig = cv.ui.manager.model.FileItem.isConfigFile(file.name);

      let folder;
      if (isConfig) {
        // upload to root folder
        folder = new cv.ui.manager.model.FileItem('.');
      } else if (cv.ui.manager.tree.FileSystem.isAccepted(file.type)) {
        // upload to media folder
        folder = new cv.ui.manager.model.FileItem('media');
      }
      if (folder) {
        folder.set({
          type: 'dir'
        });

        const manager = new cv.ui.manager.upload.UploadMgr();
        if (replaceFile) {
          manager.replaceFile(file, replaceFile);
        } else {
          manager.setFolder(folder);
          manager.uploadFile(file);
        }
      }
    },

    hasDroppableFile(ev) {
      return this.getFiles(ev).length > 0;
    },

    /**
     * Extracts acceptable files from event
     * @param ev {Event}
     * @private
     */
    getFiles(ev) {
      const files = [];
      let i;
      let l;
      let file;

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (i = 0, l = ev.dataTransfer.items.length; i < l; i++) {
          // If dropped items aren't files, reject them
          const item = ev.dataTransfer.items[i];
          if (item.kind === 'file' && cv.ui.manager.tree.FileSystem.isAccepted(item.type)) {
            file = item.getAsFile();
            files.push(file);
          }
        }
      } else {
        for (i = 0, l = ev.dataTransfer.files.length; i < l; i++) {
          file = ev.dataTransfer.files[i];
          if (cv.ui.manager.tree.FileSystem.isAccepted(file.type)) {
            files.push(file);
          }
        }
      }
      return files;
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __hasEmptyInfo: null,
    _boundOnStop: null,

    __syncBounds() {
      const bounds = this.getBounds();
      this.getChildControl('upload-overlay').setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);

      this.getChildControl('upload-dropbox').setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
    },

    // overridden
    _createMDragUploadChildControlImpl(id) {
      let control;
      const bounds = this.getBounds();
      const layout = this._getLayout();

      switch (id) {
        case 'upload-overlay':
          control = new qx.ui.container.Composite();
          control.setZIndex(1000000);
          control.exclude();
          if (layout instanceof qx.ui.layout.Canvas) {
            this._add(control, { edge: 0 });
          } else if (!(this._getLayout() instanceof qx.ui.layout.Grow) && bounds) {
            control.setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
          }
          this._add(control);
          this.getChildControl('upload-dropbox').bind('visibility', control, 'visibility');

          break;

        case 'upload-dropbox': {
          control = new qx.ui.container.Composite(new qx.ui.layout.Grow());
          control.setBackgroundColor('rgba(32, 32, 32, 0.9)');
          control.setZIndex(1000);
          const dropBox = new qx.ui.basic.Atom(this.getUploadHint(), cv.theme.dark.Images.getIcon('upload', 32));

          dropBox.set({
            iconPosition: 'top',
            rich: true,
            center: true
          });

          // control.bind('width', dropBox, 'maxWidth');
          dropBox.getChildControl('label').setWrap(true);
          control.setAnonymous(true);
          control.add(dropBox);
          control.exclude();
          if (layout instanceof qx.ui.layout.Canvas) {
            this._add(control, { edge: 0 });
          } else if (!(this._getLayout() instanceof qx.ui.layout.Grow) && bounds) {
            control.setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
          }
          this._add(control);
          break;
        }
      }

      return control;
    },

    _onStopDragging(ev) {
      ev.preventDefault();
      this.setUploadMode(false);
      document.removeEventListener('dragend', this._boundOnStop, false);
    },

    /**
     * Apply dragover/-leave listeners to the dashboard to recognize File uploads via Drag&Drop
     */
    _applyStartDragListeners() {
      // add the start listener to this widget
      this.getContentElement()
        .getDomElement()
        .addEventListener(
          'dragenter',
          function (ev) {
            // ev.preventDefault();
            if (this._isDroppable) {
              if (this._isDroppable(ev.dataTransfer.items)) {
                // we have something to drop
                this.setUploadMode(true);
              }
            } else if (cv.ui.manager.upload.MDragUpload.hasDroppableFile(ev)) {
              // we have something to drop
              this.setUploadMode(true);
            }
          }.bind(this),
          false
        );

      if (this.getChildControl('upload-overlay').getBounds()) {
        this._applyDragListeners();
      } else {
        this.getChildControl('upload-overlay').addListenerOnce('appear', () => {
          this._applyDragListeners();
        });
      }
    },

    /**
     * Apply dragover/-leave listeners to the dashboard to recognize File uploads via Drag&Drop
     */
    _applyDragListeners() {
      const element = this.getChildControl('upload-overlay').getContentElement().getDomElement();
      if (!element) {
        const lid = this.getChildControl('upload-overlay').addListener('visibility', ev => {
          if (ev.getData() === 'visible') {
            this._applyDragListeners();
            this.getChildControl('upload-overlay').removeListenerById(lid);
          }
        });

        return;
      }
      element.addEventListener(
        'dragexit',
        function () {
          this.setUploadMode(false);
        }.bind(this),
        false
      );

      element.addEventListener(
        'dragover',
        function (ev) {
          ev.preventDefault();
          let uploadable = false;
          if (this._isDroppable) {
            uploadable = this._isDroppable(ev.dataTransfer.items);
          } else if (cv.ui.manager.upload.MDragUpload.hasDroppableFile(ev)) {
            uploadable = true;
          }
          this.setUploadMode(uploadable);
        }.bind(this),
        false
      );

      this._boundOnStop = this._onStopDragging.bind(this);

      element.addEventListener('dragleave', this._boundOnStop, false);
      element.addEventListener(
        'dragend',
        function () {
          this.setUploadMode(false);
        }.bind(this),
        false
      );

      document.addEventListener('dragend', this._boundOnStop, false);

      if (this._onDrop) {
        element.addEventListener('drop', this._onDrop.bind(this), false);
      } else {
        element.addEventListener(
          'drop',
          function (ev) {
            cv.ui.manager.upload.MDragUpload.onHtml5Drop(ev);
            this._onStopDragging(ev);
          }.bind(this),
          false
        );
      }
    },

    // property apply
    __applyUploadMode(value) {
      if (value === true) {
        this.getChildControl('upload-dropbox').show();
        if (this.hasChildControl('empty-info') && this.getChildControl('empty-info').isVisible()) {
          this.getChildControl('empty-info').exclude();
          this.__hasEmptyInfo = true;
        } else {
          this.__hasEmptyInfo = false;
        }
      } else {
        this.getChildControl('upload-dropbox').exclude();
        if (this.__hasEmptyInfo === true) {
          this.getChildControl('empty-info').show();
        }
      }
    }
  }
});
