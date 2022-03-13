(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.viewer.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.message.Bus": {},
      "cv.ui.manager.model.FileItem": {},
      "qx.util.Uri": {},
      "qx.util.LibraryManager": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qx.ui.embed.Iframe": {},
      "qx.ui.basic.Atom": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Config.js 
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
   * Show rendered configs.
   */
  qx.Class.define('cv.ui.manager.viewer.Config', {
    extend: cv.ui.manager.viewer.AbstractViewer,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      cv.ui.manager.viewer.AbstractViewer.constructor.call(this);

      this._setLayout(new qx.ui.layout.Grow());
    },

    /*
      ***********************************************
        PROPERTIES
      ***********************************************
      */
    properties: {
      appearance: {
        refine: true,
        init: 'config-viewer'
      },
      target: {
        check: ['iframe', 'window'],
        init: 'window'
      },
      external: {
        refine: true,
        init: true
      },
      connectToWindow: {
        check: 'Boolean',
        init: false,
        apply: '_applyConnectToWindow'
      }
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      SUPPORTED_FILES: /^(demo|\.)?\/?visu_config.*\.xml/,
      TITLE: qx.locale.Manager.tr('Config viewer'),
      ICON: cv.theme.dark.Images.getIcon('preview', 18)
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _windowRef: null,
      _source: null,
      _reloading: false,
      _applyConnectToWindow: function _applyConnectToWindow(value) {
        this.setExternal(!value);
      },
      _applyFile: function _applyFile(file, old) {
        if (old && old.isConfigFile()) {
          qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
        }

        if (file) {
          if (file.isConfigFile()) {
            var configName = cv.ui.manager.model.FileItem.getConfigName(file.getFullPath());
            var url = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/..') + '?config=' + (configName || '');

            if (this.getTarget() === 'iframe') {
              url += '&preview=1&libraryCheck=false';
              var control = this.getChildControl('iframe');
              this._source = url;
              this.getChildControl('loading').show();
              control.setSource(url);
              control.show();
              var hint = this.getChildControl('hint', true);

              if (hint && hint.isVisible()) {
                hint.exclude();
              }
            } else {
              this._source = url;
              var ref = window.open(url, configName);

              if (this.isConnectToWindow()) {
                this._windowRef = ref;
                this._windowRef.onbeforeunload = this._onClose.bind(this);

                var _hint = this.getChildControl('hint');

                _hint.show();

                var iframe = this.getChildControl('iframe', true);

                if (iframe && iframe.isVisible()) {
                  iframe.exclude();
                }
              } else {
                // no connection close this immediately
                this._onClose();

                return;
              }
            }

            qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
          } else {
            cv.ui.manager.snackbar.Controller.error(this.tr('%1 is no configuration file', file.getFullPath()));
            this._source = null;
          }
        } else {
          if (this.hasChildControl('iframe')) {
            this.getChildControl('iframe').resetSource();
            this.getChildControl('iframe').exclude();
          }

          if (this.hasChildControl('hint')) {
            this.getChildControl('hint').exclude();
          }

          if (this._windowRef) {
            this._windowRef.close();
          }
        }
      },
      _onChange: function _onChange(ev) {
        var _this = this;

        var data = ev.getData();

        if (data.type === 'contentChanged') {
          if (this.hasChildControl('iframe')) {
            var iframe = this.getChildControl('iframe');
            var href = iframe.getDocument().location.href; // use href to get the anchor to keep the currently opened page on reload

            var url = href.startsWith(this._source) ? iframe.getDocument().location.href : this._source;

            if (url && url !== 'about:blank') {
              this._reloading = true;
              this.getChildControl('loading').show();
              iframe.addListenerOnce('load', function () {
                _this._reloading = false;
                iframe.setSource(url);
              }, this);
            }

            iframe.setSource('about:blank');
          } else if (this._windowRef) {
            this._windowRef.reload();
          }
        }
      },
      _onClose: function _onClose() {
        if (this._windowRef) {
          qx.event.message.Bus.dispatchByName('cv.manager.action.close', this.getFile());
          this._windowRef = null;
        }

        this.resetFile();
      },
      openPage: function openPage(page, path) {
        if (this.hasChildControl('iframe')) {
          var element = this.getChildControl('iframe').getContentElement().getDomElement();

          if (element && element.contentWindow.cv) {
            var otherEngine = element.contentWindow.cv.TemplateEngine.getInstance();
            var pageId = path ? otherEngine.getPageIdByPath(page, path) : page;
            otherEngine.scrollToPage(pageId, 0);
          }
        }
      },
      setHighlightWidget: function setHighlightWidget(widgetId) {
        if (this.hasChildControl('iframe')) {
          var element = this.getChildControl('iframe').getContentElement().getDomElement();

          if (element && element.contentWindow.cv) {
            var otherEngine = element.contentWindow.cv.TemplateEngine.getInstance();
            otherEngine.setHighlightedWidget(widgetId);
          }
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var _this2 = this;

        var control;

        switch (id) {
          case 'iframe':
            control = new qx.ui.embed.Iframe();
            control.exclude();
            control.addListener('load', function () {
              if (_this2.hasChildControl('loading') && !_this2._reloading) {
                _this2.getChildControl('loading').exclude();
              }
            }, this);
            this.getChildControl('scroll').add(control);
            break;

          case 'hint':
            control = new qx.ui.basic.Atom(this.tr('This configuration has been opened in another window. When you close this file, the window will also be closed. Click here top jump the the window.'));
            control.set({
              center: true,
              font: 'title'
            });
            control.addListener('tap', function () {
              if (this._windowRef) {
                this._windowRef.focus();
              }
            }, this);
            this.getChildControl('scroll').add(control);
            break;

          case 'loading':
            control = new qx.ui.basic.Atom(this.tr('Loading...'), cv.theme.dark.Images.getIcon('reload', 64));
            control.set({
              center: true,
              font: 'title',
              iconPosition: 'top',
              backgroundColor: 'rgba(0,0,0,0.2)'
            });
            control.addListener('appear', function () {
              qx.event.Timer.once(function () {
                control.exclude();
              }, _this2, 5000);
            });
            control.exclude();

            this._add(control);

            break;
        }

        return control || cv.ui.manager.viewer.Config.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._windowRef = null;
    }
  });
  cv.ui.manager.viewer.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1647161215548