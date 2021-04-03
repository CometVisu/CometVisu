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
  construct: function () {
    this.base(arguments);
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

    _applyConnectToWindow: function (value) {
      this.setExternal(!value);
    },

    _applyFile: function (file, old) {
      if (old && old.isConfigFile()) {
        qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
      }
      if (file) {
        if (file.isConfigFile()) {
          var configName = cv.ui.manager.model.FileItem.getConfigName(file.getFullPath());
          var url = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')+ '/..') + '?config=' + (configName || '');
          if (this.getTarget() === 'iframe') {
            url += '&preview=1&libraryCheck=false';
            var control = this.getChildControl('iframe');
            this._source = url;
            this.getChildControl('loading').show();
            control.setSource(url);
            control.show();
            const hint = this.getChildControl('hint', true);
            if (hint && hint.isVisible()) {
              hint.exclude();
            }
          } else {
            this._source = url;
            let ref = window.open(url, configName);
            if (this.isConnectToWindow()) {
              this._windowRef = ref;
              this._windowRef.onbeforeunload = this._onClose.bind(this);
              const hint = this.getChildControl('hint');
              hint.show();
              const iframe = this.getChildControl('iframe', true);
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

    _onChange: function (ev) {
      var data = ev.getData();
      if (data.type === 'contentChanged') {
        if (this.hasChildControl('iframe')) {
          const iframe = this.getChildControl('iframe');
          const href = iframe.getDocument().location.href;
          // use href to get the anchor to keep the currently opened page on reload
          const url = href.startsWith(this._source) ? iframe.getDocument().location.href : this._source;
          if (url && url !== "about:blank") {
            this._reloading = true;
            this.getChildControl('loading').show();
            iframe.addListenerOnce("load", () => {
              this._reloading = false;
              iframe.setSource(url);
            }, this);
          }
          iframe.setSource("about:blank");
        } else if (this._windowRef) {
          this._windowRef.reload();
        }
      }
    },

    _onClose: function () {
      if (this._windowRef) {
        qx.event.message.Bus.dispatchByName('cv.manager.action.close', this.getFile());
      }
    },

    openPage: function (page, path) {
      if (this.hasChildControl('iframe')) {
        const element = this.getChildControl('iframe').getContentElement().getDomElement();
        if (element && element.contentWindow.cv) {
          const otherEngine = element.contentWindow.cv.TemplateEngine.getInstance();
          const pageId = path ? otherEngine.getPageIdByPath(page, path) : page;
          otherEngine.scrollToPage(pageId, 0);
        }
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'iframe':
           control = new qx.ui.embed.Iframe();
           control.exclude();
           control.addListener("load", () => {
             console.log("loaded", this.hasChildControl('loading'));
             if (this.hasChildControl('loading') && !this._reloading) {
               this.getChildControl('loading').exclude();
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
           control = new qx.ui.basic.Atom(this.tr('Loading...'), cv.theme.dark.Images.getIcon("reload", 64));
           control.set({
             center: true,
             font: 'title',
             iconPosition: "top",
             backgroundColor: "rgba(0,0,0,0.2)"
           });
           control.addListener("appear", () => {
             qx.event.Timer.once(() => {
               control.exclude();
             }, this, 5000);
           });
           control.exclude();
           this._add(control);
           break;
       }

       return control || this.base(arguments, id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._windowRef = null;
  }
});
