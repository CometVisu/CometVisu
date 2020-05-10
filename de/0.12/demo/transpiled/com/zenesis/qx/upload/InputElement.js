(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Browser": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "construct": true
      },
      "com.zenesis.qx.upload.MUploadButton": {
        "construct": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "construct": true,
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "construct": true,
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("com.zenesis.qx.upload.InputElement", {
    extend: qx.html.Element,
    construct: function construct(widget, multiple, name) {
      // styling the input[type=file]
      // element is a bit tricky. Some browsers just ignore the normal
      // css style input. Firefox is especially tricky in this regard.
      // since we are providing our one look via the underlying qooxdoo
      // button anyway, all we have todo is position the ff upload
      // button over the button element. This is tricky in itself
      // as the ff upload button consists of a text and a button element
      // which are not css accessible themselfes. So the best we can do,
      // is align to the top right corner of the upload widget and set its
      // font so large that it will cover even realy large underlying buttons.
      var css = {
        position: "absolute",
        cursor: "pointer",
        hideFocus: "true",
        zIndex: widget.getZIndex() + 11,
        opacity: 0,
        // align to the top right hand corner
        top: '0px',
        right: '0px',
        // ff ignores the width setting pick a realy large font size to get
        // a huge button that covers the area of the upload button
        fontFamily: 'Arial',
        // from valums.com/ajax-upload: 4 persons reported this, the max values
        // that worked for them were 243, 236, 236, 118
        fontSize: '118px'
      };

      if (qx.core.Environment && qx.core.Environment.get('browser.name') == 'ie' && qx.core.Environment.get('browser.version') < 9 || !qx.core.Environment && qx.bom.client.Engine.MSHTML && qx.bom.client.Engine.VERSION < 9.0) {
        css.filter = 'alpha(opacity=0)';
        css.width = '200%';
        css.height = '100%';
      }

      var attrs = {
        type: 'file',
        name: name,
        title: ' '
      };

      if (qx.Class.hasMixin(widget.constructor, com.zenesis.qx.upload.MUploadButton)) {
        var accept = widget.getAcceptUpload();
        if (accept) attrs.accept = accept;
      }

      qx.html.Element.constructor.call(this, 'input', css, attrs);
      this.__relatedWidget = widget;
      this.setMultiple(!!multiple);
    },
    properties: {
      multiple: {
        init: false,
        check: "Boolean",
        apply: "_applyMultiple"
      }
    },
    members: {
      __relatedWidget: null,
      getWidget: function getWidget() {
        return this.__relatedWidget;
      },
      _applyMultiple: function _applyMultiple(value, oldValue) {
        if (value) this.setAttribute("multiple", "multiple");else this.removeAttribute("multiple");
      }
    }
  });
  com.zenesis.qx.upload.InputElement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=InputElement.js.map?dt=1589125254130