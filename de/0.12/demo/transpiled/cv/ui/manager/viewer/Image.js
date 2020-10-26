(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.viewer.AbstractViewer": {
        "require": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.io.ImageLoader": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Show images.
   */
  qx.Class.define('cv.ui.manager.viewer.Image', {
    extend: cv.ui.manager.viewer.AbstractViewer,

    /*
      ***********************************************
        PROPERTIES
      ***********************************************
      */
    properties: {
      appearance: {
        refine: true,
        init: 'image-viewer'
      }
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      SUPPORTED_FILES: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
      TITLE: qx.locale.Manager.tr('Show image'),
      ICON: cv.theme.dark.Images.getIcon('image', 18),

      /**
       * Returns size information for images
       * @param source {String} path to image
       * @returns {{width: *, aspectRatio: number, height: *}|any | ({aspectRatio: number} & Map)}
       */
      getImageData: function getImageData(source) {
        var data = qx.util.ResourceManager.getInstance().getData(source);

        if (data) {
          return {
            width: data[0],
            height: data[1],
            aspectRatio: data[0] / data[1]
          };
        } else {
          data = qx.io.ImageLoader.getSize(source);

          if (data && data.width && data.height) {
            return Object.assign({
              aspectRatio: data.width / data.height
            }, data);
          }
        }

        return null;
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyFile: function _applyFile(file) {
        var control = this.getChildControl('image');

        if (file) {
          control.setIcon(file.getServerPath());
          control.setLabel(file.getFullPath());

          if (!cv.ui.manager.viewer.Image.getImageData(file.getServerPath())) {
            control.getChildControl('icon').addListenerOnce('loaded', this._scaleImage, this);
          } else {
            this._scaleImage();
          }

          this.addListener('resize', this._scaleImage, this);
        } else {
          control.resetIcon();
          control.resetLabel();
          this.removeListener('resize', this._scaleImage, this);
        }
      },
      _scaleImage: function _scaleImage() {
        var bounds = this.getBounds();

        if (!bounds) {
          this.addListenerOnce('appear', this._scaleImage, this);
          return;
        }

        var file = this.getFile();

        if (!file) {
          return;
        }

        var icon = this.getChildControl('image').getChildControl('icon');
        var data = cv.ui.manager.viewer.Image.getImageData(file.getServerPath());
        var paddingX = 10;
        var paddingY = 20;
        var availableHeight = bounds.height - paddingY * 2;
        var availableWidth = bounds.width - paddingX * 2;
        var width = availableWidth;
        var height = Math.round(1 / data.aspectRatio * width);

        if (height > availableHeight) {
          height = availableHeight;
          width = Math.round(data.aspectRatio * availableHeight);
        }

        icon.set({
          width: width,
          height: height,
          scale: true
        });
      }
    }
  });
  cv.ui.manager.viewer.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1603737738838