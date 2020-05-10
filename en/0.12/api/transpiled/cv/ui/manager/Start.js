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
      "cv.ui.manager.editor.IEditor": {
        "require": true
      },
      "cv.ui.manager.IActionHandler": {
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "cv.theme.dark.Images": {},
      "cv.ui.manager.model.Preferences": {},
      "qx.ui.container.Scroll": {},
      "qx.ui.container.Composite": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Part": {},
      "qx.ui.toolbar.RadioButton": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.layout.HBox": {},
      "cv.ui.manager.ToolBar": {},
      "cv.ui.manager.model.FileItem": {},
      "cv.ui.manager.viewer.Folder": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Simple view that provides all of the file-related features of the old editor in an easy to use way.
   */
  qx.Class.define('cv.ui.manager.Start', {
    extend: qx.ui.core.Widget,
    implement: [cv.ui.manager.editor.IEditor, cv.ui.manager.IActionHandler],

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.VBox());

      this._configRegex = /^visu_config_?([^.]+)?\.xml$/;
      ['toolbar', 'configs-title', 'configs-toolbar', 'configs', 'demo-configs-title', 'demo-configs', 'media-title', 'media-toolbar', 'media', 'misc-title', 'misc'].forEach(this._createChildControl, this);
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      file: {
        check: 'cv.ui.manager.model.FileItem',
        apply: '_loadRoot',
        event: 'changeFile'
      },
      appearance: {
        refine: true,
        init: 'cv-start'
      },
      selectedItem: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_applySelectedItem'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _configRegex: null,
      _ignoreSelectionChanges: false,
      _previewButton: null,
      _listButton: null,
      _radioGroup: null,
      save: function save() {},
      getCurrentContent: function getCurrentContent() {},
      canHandleAction: function canHandleAction() {
        return false;
      },
      handleAction: function handleAction() {},
      _loadRoot: function _loadRoot(value) {
        this.getChildControl('configs').setFile(value);
        var found = 0;
        value.load(function () {
          value.getChildren().some(function (file) {
            if (file.getName() === 'media') {
              this.getChildControl('media').setFile(file);
              this.getChildControl('media-toolbar').setFolder(file);
              found++;
            } else if (file.getName() === 'demo') {
              this.getChildControl('demo-configs').setFile(file);
              found++;
            }

            return found === 2;
          }, this);
        }, this);
      },
      _onChangeSelection: function _onChangeSelection(ev) {
        if (this._ignoreSelectionChanges === false) {
          var list = ev.getTarget();
          var selection = ev.getData();
          this._ignoreSelectionChanges = true; // unselect the other lists

          ['configs', 'demo-configs', 'media'].forEach(function (name) {
            var control = this.getChildControl(name);

            if (control !== list) {
              control.resetSelection();
            }
          }, this);
          this._ignoreSelectionChanges = false;

          if (selection.length > 0) {
            this.setSelectedItem(selection[0].getModel());
          }
        }
      },
      _applySelectedItem: function _applySelectedItem() {},
      _onToggleExpand: function _onToggleExpand(ev) {
        var control = this.getChildControl(ev.getTarget().getUserData('control'));

        if (control.getVisibility() === 'visible') {
          control.exclude();
          ev.getTarget().setIcon(cv.theme.dark.Images.getIcon('drop-down', 18));
        } else {
          control.show();
          ev.getTarget().setIcon(cv.theme.dark.Images.getIcon('drop-up', 18));
        }
      },
      _onChangeViewMode: function _onChangeViewMode() {
        switch (cv.ui.manager.model.Preferences.getInstance().getStartViewMode()) {
          case 'list':
            this._radioGroup.setSelection([this._listButton]);

            break;

          case 'preview':
            this._radioGroup.setSelection([this._previewButton]);

            break;
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'scroll-container':
            control = new qx.ui.container.Scroll();

            this._add(control, {
              flex: 1
            });

            break;

          case 'content':
            control = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
            this.getChildControl('scroll-container').add(control);
            break;

          case 'toolbar':
            control = new qx.ui.toolbar.ToolBar();
            var part = new qx.ui.toolbar.Part();
            var listButton = this._listButton = new qx.ui.toolbar.RadioButton('', cv.theme.dark.Images.getIcon('listViewMode', 22));
            listButton.setUserData('mode', 'list');
            listButton.set({
              show: 'icon',
              toolTipText: this.tr('List mode')
            });
            var previewButton = this._previewButton = new qx.ui.toolbar.RadioButton('', cv.theme.dark.Images.getIcon('previewMode', 22));
            previewButton.setUserData('mode', 'preview');
            previewButton.set({
              show: 'icon',
              toolTipText: this.tr('Preview mode')
            });
            part.add(listButton);
            part.add(previewButton);
            control.add(part);
            this._radioGroup = new qx.ui.form.RadioGroup(listButton, previewButton);

            this._onChangeViewMode();

            this._radioGroup.addListener('changeSelection', function (ev) {
              var selection = ev.getData()[0];
              cv.ui.manager.model.Preferences.getInstance().setStartViewMode(selection.getUserData('mode'));
            }, this);

            cv.ui.manager.model.Preferences.getInstance().addListener('changeStartViewMode', this._onChangeViewMode, this);

            this._add(control);

            break;

          case 'configs-title':
            control = new qx.ui.basic.Atom(this.tr('Configurations'), cv.theme.dark.Images.getIcon('drop-up', 18));
            control.setUserData('control', 'configs');
            control.addListener('tap', this._onToggleExpand, this);
            this.getChildControl('configs-header').add(control);
            break;

          case 'configs-header':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            this.getChildControl('content').add(control);
            break;

          case 'configs-toolbar':
            control = new cv.ui.manager.ToolBar(null, ['new-config-file', 'upload', 'reload']);
            control.setFolder(cv.ui.manager.model.FileItem.ROOT);
            control.addListener('reload', function () {
              cv.ui.manager.model.FileItem.ROOT.reload();
            }, this);
            this.getChildControl('configs-header').add(control);
            break;

          case 'configs':
            control = new cv.ui.manager.viewer.Folder(true);
            control.set({
              showTextFilter: false,
              permanentFilter: function (file) {
                var match = this._configRegex.exec(file.getName());

                return !!match && (!match[1] || !match[1].endsWith('temp'));
              }.bind(this),
              labelConverter: function labelConverter(name, file) {
                if (file.isFake()) {
                  return name;
                }

                var configName = cv.ui.manager.model.FileItem.getConfigName(name);
                return configName ? configName : '<Default>';
              },
              file: cv.ui.manager.model.FileItem.ROOT,
              disableScrolling: true
            });
            control.addListener('changeSelection', this._onChangeSelection, this);
            this.getChildControl('content').add(control);
            break;

          case 'demo-configs-title':
            control = new qx.ui.basic.Atom(this.tr('Demo configurations'), cv.theme.dark.Images.getIcon('drop-down', 18));
            control.setUserData('control', 'demo-configs');
            control.addListener('tap', this._onToggleExpand, this);
            this.getChildControl('content').add(control);
            break;

          case 'demo-configs':
            control = new cv.ui.manager.viewer.Folder(true);
            control.set({
              showTextFilter: false,
              permanentFilter: function (file) {
                return this._configRegex.test(file.getName());
              }.bind(this),
              labelConverter: function labelConverter(name) {
                var configName = cv.ui.manager.model.FileItem.getConfigName(name);
                return configName ? configName : '<Default>';
              },
              disableScrolling: true
            });
            control.exclude();
            control.addListener('changeSelection', this._onChangeSelection, this);
            this.getChildControl('content').add(control);
            break;

          case 'media-title':
            control = new qx.ui.basic.Atom(this.tr('Media files'), cv.theme.dark.Images.getIcon('drop-up', 18));
            control.setUserData('control', 'media');
            control.addListener('tap', this._onToggleExpand, this);
            this.getChildControl('media-header').add(control);
            break;

          case 'media-header':
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            this.getChildControl('content').add(control);
            break;

          case 'media-toolbar':
            control = new cv.ui.manager.ToolBar(null, ['new-file', 'upload', 'reload']);
            control.addListener('reload', function () {
              control.getFolder().reload();
            }, this);
            this.getChildControl('media-header').add(control);
            break;

          case 'media':
            control = new cv.ui.manager.viewer.Folder(true);
            control.set({
              showTextFilter: false,
              disableScrolling: true
            });
            control.addListener('changeSelection', this._onChangeSelection, this);
            this.getChildControl('content').add(control);
            break;

          case 'misc-title':
            control = new qx.ui.basic.Atom(this.tr('Miscellaneous'), cv.theme.dark.Images.getIcon('drop-up', 18));
            control.setUserData('control', 'misc');
            control.addListener('tap', this._onToggleExpand, this);
            this.getChildControl('content').add(control);
            break;

          case 'misc':
            control = new cv.ui.manager.viewer.Folder(true);
            control.set({
              showTextFilter: false,
              disableScrolling: true
            });

            this.__initMiscFolder(control);

            this.getChildControl('content').add(control, {
              flex: 1
            });
            break;
        }

        return control || cv.ui.manager.Start.prototype._createChildControlImpl.base.call(this, id);
      },
      __initMiscFolder: function __initMiscFolder(folderWidget) {
        if (!cv.ui.manager.model.FileItem.ROOT.isLoaded()) {
          cv.ui.manager.model.FileItem.ROOT.addListenerOnce('changeLoaded', function () {
            this.__initMiscFolder(folderWidget);
          }, this);
          return;
        } // find the real 'hidden.php' in the root folder


        var specialFiles = [cv.ui.manager.model.FileItem.getIconFile()];
        cv.ui.manager.model.FileItem.ROOT.getChildren().some(function (file) {
          if (file.getFullPath() === 'hidden.php') {
            // set some special flags needed to configure the special hidden configuration file
            file.set({
              overrideIcon: true,
              icon: cv.theme.dark.Images.getIcon('hidden-config', 15),
              displayName: qx.locale.Manager.tr('Hidden configuration'),
              fake: true
            });
            specialFiles.unshift(file);
            return true;
          }
        });
        var fakeFolder = new cv.ui.manager.model.FileItem('fake', 'fake', cv.ui.manager.model.FileItem.ROOT, specialFiles).set({
          fake: true,
          type: 'dir',
          loaded: true
        });
        folderWidget.setFile(fakeFolder);
        folderWidget.addListener('changeSelection', this._onChangeSelection, this);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._configRegex = null;
      cv.ui.manager.model.Preferences.getInstance().removeListener('changeStartViewMode', this._onChangeViewMode, this);

      this._disposeObjects('_previewButton', '_listButton', '_radioGroup');
    }
  });
  cv.ui.manager.Start.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Start.js.map?dt=1589124678521