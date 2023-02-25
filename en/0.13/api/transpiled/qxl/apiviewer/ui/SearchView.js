(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.lang.Object": {},
      "qx.ui.layout.Grid": {},
      "qx.ui.form.TextField": {},
      "qx.data.Array": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.ToggleButton": {},
      "qx.ui.basic.Label": {},
      "qx.ui.table.model.Simple": {},
      "qx.ui.table.columnmodel.Resize": {},
      "qx.ui.table.Table": {},
      "qx.ui.table.cellrenderer.Image": {},
      "qxl.apiviewer.TreeUtil": {},
      "qxl.apiviewer.dao.Class": {},
      "qx.core.Init": {},
      "qxl.apiviewer.UiModel": {},
      "qx.ui.popup.Popup": {},
      "qx.ui.layout.Canvas": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Stefan Kloiber (skloiber)
       * Jonathan Weiß (jonathan_rass)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  /**
   * Shows the search pane.
   */
  qx.Class.define("qxl.apiviewer.ui.SearchView", {
    extend: qx.ui.container.Composite,
    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      var layout = new qx.ui.layout.VBox();
      this.setLayout(layout);
      this.setBackgroundColor("white");
      this.__P_567_0 = false;
      this.listdata = [];
      this.apiindex = {};
      this._showSearchForm();
    },
    /*
    *****************************************************************************
     EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when a search operation has finished
       */
      searchFinished: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */

    members: {
      __P_567_1: null,
      __P_567_0: null,
      __P_567_2: null,
      __P_567_3: null,
      __P_567_4: null,
      __P_567_5: null,
      /**
       * Enters a term into the search box and selects the
       * first result
       *
       * @param term {String} Search term
       */
      search: function search(term) {
        this.addListenerOnce("searchFinished", function () {
          // select the first result
          // the timeout is needed since the detail view might not
          // be done rendering the initially selected item, in
          // which case it won't update when the selection changes
          setTimeout(function () {
            this._selectionModel.addSelectionInterval(0, 0);
          }.bind(this), 300);
        }, this);
        if (qx.lang.Object.getLength(this.apiindex) == 0) {
          // Index not ready yet, defer search
          this.__P_567_5 = term;
        } else {
          this.__P_567_5 = null;
          // Set search box value
          this.sinput.setValue(term);
        }
      },
      /**
       * Generate the search form.
       */
      _showSearchForm: function _showSearchForm() {
        //--------------------------------------------------------
        // Outputs the generated index file content to a textarea
        //--------------------------------------------------------

        // Search form
        var layout = new qx.ui.layout.Grid(4, 4);
        layout.setColumnFlex(1, 1);
        layout.setRowAlign(2, "left", "middle");
        var sform = new qx.ui.container.Composite(layout);
        sform.setPadding(10);

        // Search form - input field
        this.sinput = new qx.ui.form.TextField().set({
          placeholder: "Enter search term ...",
          liveUpdate: true
        });
        sform.add(this.sinput, {
          row: 0,
          column: 0,
          colSpan: 2
        });
        this.__P_567_4 = {
          PACKAGE: 0,
          ENTRY: 4,
          CLASS: 1,
          INTERFACE: 1,
          METHOD_PUB: 2,
          METHOD_PROT: 2,
          METHOD_PRIV: 2,
          PROPERTY_PUB: 4,
          EVENT: 5,
          CONSTANT: 3,
          CHILDCONTROL: 6
        };
        this.__P_567_3 = new qx.data.Array([true, true, true, true, true, true, true]);
        var types = ["Packages", "Classes, Mixins, Interfaces", "Methods", "Constants", "Properties", "Events", "Child Controls"];
        var iconNameParts = ["package", "class", "method_public", "constant", "property", "event", "childcontrol"];
        var typeContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox());
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          var iconNamePart = iconNameParts[i];
          var typeToggleButton = new qx.ui.form.ToggleButton("", "qxl/apiviewer/image/" + iconNamePart + "18.gif");
          typeToggleButton.setToolTipText(type);
          // we need variable paddingLeft in order to accommodate the icons in the center of the toggleButton
          var paddingLeft = 0;
          var paddingBottom = 0;
          var paddingTop = 0;
          if (["class", "interface"].indexOf(iconNamePart) != -1) {
            paddingLeft = 2;
          } else if (["package", "childcontrol"].indexOf(iconNamePart) != -1) {
            paddingLeft = 1;
            if (iconNamePart === "childcontrol") {
              paddingBottom = 2;
            }
          } else if (iconNamePart === "constant") {
            paddingTop = 1;
          }
          typeToggleButton.setFocusable(false);
          typeToggleButton.setPadding(paddingTop, 0, paddingBottom, paddingLeft);
          typeToggleButton.setMarginRight(2);
          typeToggleButton.setGap(0);
          typeToggleButton.setIconPosition("top");
          typeToggleButton.setShow("icon");
          typeToggleButton.bind("value", this.__P_567_3, "[" + i + "]");
          typeToggleButton.setKeepFocus(true);
          typeToggleButton.setValue(true);
          typeContainer.add(typeToggleButton);
          typeToggleButton.addListener("changeValue", function (e) {
            this._searchResult(this.sinput.getValue() || "");
          }, this);
          this.__P_567_3.bind("[" + i + "]", typeToggleButton, "value");
        }
        var typeToggleButtonAll = new qx.ui.form.ToggleButton("Toggle Filters");
        typeToggleButtonAll.setFocusable(false);
        typeToggleButtonAll.setPadding(1, 3, 1, 3);
        typeToggleButtonAll.setShow("label");
        typeToggleButtonAll.setValue(true);
        typeToggleButtonAll.setGap(0);
        typeToggleButtonAll.setToolTipText("Deactivate all filters");
        typeToggleButtonAll.setKeepFocus(true);
        typeToggleButtonAll.setMarginLeft(10);
        typeContainer.add(typeToggleButtonAll);
        typeToggleButtonAll.addListener("changeValue", function (e) {
          for (var i = 0; i < this.__P_567_3.length; i++) {
            this.__P_567_3.setItem(i, e.getData());
          }
          this._searchResult(this.sinput.getValue() || "");
          typeToggleButtonAll.setToolTipText(e.getData() ? "Deactivate all filters" : "Activate all filters");
        }, this);
        sform.add(typeContainer, {
          row: 1,
          column: 0,
          colSpan: 2
        });
        this.namespaceTextField = new qx.ui.form.TextField().set({
          placeholder: ""
        });
        sform.add(new qx.ui.basic.Label("Namespace filter: "), {
          row: 2,
          column: 0
        });
        sform.add(this.namespaceTextField, {
          row: 2,
          column: 1
        });
        this.namespaceTextField.addListener("keyup", function (e) {
          this._searchResult(this.sinput.getValue() || "");
        }, this);
        this.add(sform);

        // Create the initial data
        var rowData = [];

        // table model
        var tableModel = this._tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(["", "Results"]);
        tableModel.setData(rowData);
        var customModel = {
          tableColumnModel: function tableColumnModel(obj) {
            return new qx.ui.table.columnmodel.Resize(obj);
          }
        };

        // table
        var table = new qx.ui.table.Table(tableModel, customModel);
        table.setDecorator(null);
        table.setShowCellFocusIndicator(false);
        table.setStatusBarVisible(false);
        table.setColumnVisibilityButtonVisible(false);
        this._selectionModel = table.getSelectionManager().getSelectionModel();
        this._selectionModel.addListener("changeSelection", this._callDetailFrame, this);
        this._table = table;
        // resize behavior
        var tcm = table.getTableColumnModel();
        var resizeBehavior = tcm.getBehavior();
        resizeBehavior.set(0, {
          width: "0*",
          minWidth: 42,
          maxWidth: 100
        });
        resizeBehavior.set(1, {
          width: "1*"
        });
        tcm.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Image(20, 20));
        this.__P_567_0 = true;
        this.__P_567_2 = table;

        // table.addListener("appear", this.__handleNote, this);

        // table.addListener("disappear", function(e) {
        //  this.__note.hide();
        // }, this);

        this.add(table, {
          flex: 1
        });

        // Give keyboard focus to the search field
        this.sinput.focus();

        // Submit events
        this.sinput.addListener("changeValue", function (e) {
          this._searchResult(this.sinput.getValue() || "");
        }, this);
      },
      /**
       * Execute the search query.
       *
       * @param svalue {String} input value
       */
      _searchResult: function _searchResult(svalue) {
        // Trim search string
        svalue = svalue.trim();

        // Hide the note if text is typed into to search field.
        //      if (svalue.length > 0) {
        //        this.__note.hide();
        //      } else {
        //        this.__note.show();
        //      }

        // If all toggle butons are disabled stop here
        var allFiltersDisabled = true;
        for (var i = 0; i < this.__P_567_3.length; i++) {
          if (this.__P_567_3.getItem(i) === true) {
            allFiltersDisabled = false;
            break;
          }
        }

        // If empty or too short search string stop here
        if (svalue.length < 3 || allFiltersDisabled) {
          // Reset the result list
          if (this.__P_567_0) {
            this.listdata.splice(0, this.listdata.length);
          }
          this._resetElements();
          return;
        }
        var sresult = [];
        try {
          var search = this._validateInput(svalue);
          /* eslint-disable-next-line no-new */
          new RegExp(search[0]);
        } catch (ex) {
          // Reset the result list
          if (this.__P_567_0) {
            this.listdata.splice(0, this.listdata.length);
          }
          this._resetElements();
          return;
        }
        sresult = this._searchIndex(search[0], search[1]);
        sresult.sort(this._sortByIcons);
        this._tableModel.setColumns(["", sresult.length + " Result" + (sresult.length != 1 ? "s" : "")]);
        this._tableModel.setData(sresult);

        // Clear old selection
        this._table.resetSelection();
        setTimeout(function () {
          this.fireEvent("searchFinished");
        }.bind(this), 0);
      },
      /**
       * Validation
       *
       * @param svalue {String} input value
       */
      _validateInput: function _validateInput(svalue) {
        var validated = [];

        // RegExp matches full pathname (RegExp.$1) and
        // method (RegExp.$2) stated with path#method or path.method()
        // ([\w\.]*\w+) -> RegExp.$1: Matches any alphanumeric character including the dot (.) e.g. "qx.application.basic"
        // (#\w+|\.\w+\(\)|#\.[\*|\+|\?]?)? -> RegExp.$2: Matches a method statement noted with a hash (#meth) or parentheses (.meth())
        if (/^([\w\.]*\w+)(#\w+|\.\w+\(\)|#\.[\*|\+|\?]?)?$/.test(svalue)) {
          if (RegExp.$2 && RegExp.$2.length > 1) {
            validated = [RegExp.$2, RegExp.$1];
          } else if (RegExp.$1.length > 1) {
            validated = [RegExp.$1, null];
          } else {
            return null;
          }
        } else {
          validated = [svalue, null];
        }
        return validated;
      },
      /**
       * Sets the output
       *
       * @param svalue {String} input value or 1st RegExp subexpression from _validateInput
       * @param spath {String} matched 2nd subexpression from _validateInput
       */
      _searchIndex: function _searchIndex(svalue, spath) {
        var sresult = [];
        // Match object

        var mo = new RegExp(svalue, /^.*[A-Z].*$/.test(svalue) ? "" : "i");
        var index = this.apiindex.index;
        var fullNames = this.apiindex.fullNames;
        var types = this.apiindex.types;
        var namespaceFilter = this.namespaceTextField.getValue() ? this.namespaceTextField.getValue().trim() : "";
        var namespaceRegexp = new RegExp(".*");
        if (namespaceFilter.length > 0) {
          try {
            var search = this._validateInput(namespaceFilter);
            namespaceRegexp = new RegExp(search[0], /^.*[A-Z].*$/.test(search[0]) ? "" : "i");
          } catch (ex) {
            namespaceRegexp = new RegExp(".*");
          }
        }
        for (var key in index) {
          if (mo.test(key)) {
            if (spath) {
              for (var i = 0, l = index[key].length; i < l; i++) {
                var fullname = fullNames[index[key][i][1]];
                if (namespaceRegexp && namespaceRegexp.test(fullname)) {
                  if (new RegExp(spath, "i").test(fullname)) {
                    var elemtype = types[index[key][i][0]].toUpperCase();
                    if (this._isTypeFilteredIn(elemtype)) {
                      var icon = qxl.apiviewer.TreeUtil["ICON_" + elemtype];
                      sresult.push([icon, fullname + key]);
                    }
                  }
                }
              }
            } else {
              for (var _i = 0, _l = index[key].length; _i < _l; _i++) {
                elemtype = types[index[key][_i][0]].toUpperCase();
                fullname = fullNames[index[key][_i][1]];
                if (this._isTypeFilteredIn(elemtype)) {
                  if (namespaceRegexp && namespaceRegexp.test(fullname)) {
                    if (elemtype == "CLASS") {
                      icon = qxl.apiviewer.TreeUtil.getIconUrl(qxl.apiviewer.dao.Class.getClassByName(fullname));
                    } else {
                      if (elemtype != "PACKAGE" && elemtype != "INTERFACE") {
                        // just consider attribute types
                        fullname += key;
                      }
                      if (elemtype === "ENTRY") {
                        fullname = key.substring(1);
                      }
                      icon = qxl.apiviewer.TreeUtil["ICON_" + elemtype];
                    }
                    sresult.push([icon, fullname]);
                  }
                }
              }
            }
          }
        }
        return sresult;
      },
      /**
       * Checks whether the type passed as argument is in the filter list or not
       *
       * @param type {String} the type in uppercase
       */
      _isTypeFilteredIn: function _isTypeFilteredIn(type) {
        return this.__P_567_3.getItem(this.__P_567_4[type]);
      },
      /**
       * Set data for the listview
       *
       * @param sresult {Array} search value
       */
      _setListdata: function _setListdata(sresult) {
        sresult.sort(function (a, b) {
          if (a[1] < b[1]) {
            return -1;
          }
          if (a[1] > b[1]) {
            return 1;
          }
          return 0;
        });
        for (var i = 0, l = sresult.length; i < l; i++) {
          var iconDisplay = sresult[i][0];
          var ldicon = {
            icon: iconDisplay,
            html: "",
            iconWidth: 18,
            iconHeight: 18
          };
          this.listdata.push({
            icon: ldicon,
            result: {
              text: sresult[i][1]
            }
          });
        }
      },
      /**
       * Sort elements in order of type
       *
       * @param a {String} icon url first argument
       * @param b {String} icon url second argument
       */
      _sortByIcons: function _sortByIcons(a, b) {
        var icons = {
          "package": 0,
          class_abstract: 1,
          "class": 2,
          class_singleton: 3,
          class_static: 4,
          class_warning: 5,
          class_static_warning: 6,
          class_abstract_warning: 7,
          class_singleton_warning: 8,
          "interface": 9,
          mixin: 10,
          mixin_warning: 11,
          method_public: 12,
          method_protected: 13,
          method_private: 14,
          property: 15,
          property_protected: 16,
          property_private: 17,
          event: 18,
          constructor: 19,
          constant: 20,
          childcontrol: 21
        };

        // Get the filename
        var aType = a[0];
        var bType = b[0];
        var iconfile = aType.substr(aType.lastIndexOf("/") + 1);
        var iconfileNext = bType.substr(bType.lastIndexOf("/") + 1);
        // Map the type to a number
        aType = icons[iconfile.substr(0, iconfile.length - 6)];
        bType = icons[iconfileNext.substr(0, iconfileNext.length - 6)];
        var diff = aType - bType;
        if (diff == 0) {
          if (a[1] < b[1]) {
            return -1;
          }
          if (a[1] > b[1]) {
            return 1;
          }
          return 0;
        }
        return aType - bType;
      },
      /**
       * Display information in the detail frame
       */
      _callDetailFrame: function _callDetailFrame() {
        var sel = this._selectionModel.getAnchorSelectionIndex();
        var selected = this._tableModel.getData()[sel];
        var controller = qx.core.Init.getApplication().controller;
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        if (selected != undefined) {
          var fullItemName = selected[1];
          var itemType = selected[0];
          var elemType = itemType.substr(itemType.lastIndexOf("/") + 1);
          elemType = elemType.substr(0, elemType.length - 6);

          // Display protected stated items
          if (/protected/.test(itemType)) {
            uiModel.setShowProtected(true);
          } else if (/private/.test(itemType)) {
            // Display private stated items
            uiModel.setShowPrivate(true);
          } else if (/internal/.test(itemType)) {
            // Display internal stated items
            uiModel.setShowInternal(true);
          }
          // Highlight item
          if (elemType.indexOf("method") != -1 || elemType.indexOf("property") != -1 || elemType.indexOf("event") != -1 || elemType.indexOf("constant") != -1 || elemType.indexOf("childcontrol") != -1) {
            controller._updateHistory(fullItemName + "!" + elemType);
          } else {
            controller._updateHistory(fullItemName);
          }
        }
      },
      _resetElements: function _resetElements() {
        this._tableModel.setData([]);
        this._tableModel.setColumns(["", ""]);
      },
      __P_567_6: function __P_567_6(table) {
        this.__P_567_1 = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
          autoHide: false,
          width: 170
        });
        var hintText = this.tr("Hint: You can use regular expressions in the search field.");
        var hint = new qx.ui.basic.Label(hintText);
        hint.setRich(true);
        this.__P_567_1.add(hint, {
          edge: 3
        });
        this.__P_567_1.setPosition("bottom-left");
        this.__P_567_1.placeToWidget(this.sinput, false);
        this.__P_567_1.show();
      },
      __P_567_7: function __P_567_7(e) {
        if (this.__P_567_1) {
          if ((this.sinput.getValue() || "").trim().length == 0) {
            this.__P_567_1.show();
          }
        } else {
          this.__P_567_6();
        }
      }
    },
    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.apiindex = this._table = this.__P_567_2 = this._tableModel = this.__P_567_3 = this.__P_567_4 = this._selectionModel = null;
      this._disposeObjects("sinput", "__P_567_1");
      this._disposeArray("listdata");
    }
  });
  qxl.apiviewer.ui.SearchView.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SearchView.js.map?dt=1677345963963