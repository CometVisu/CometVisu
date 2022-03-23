(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.core.AbstractVirtualBox": {
        "construct": true,
        "require": true
      },
      "qx.data.controller.ISelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.core.Spacer": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.basic.Image": {},
      "qx.ui.core.queue.Widget": {},
      "qx.data.SingleValueBinding": {},
      "qx.util.Delegate": {},
      "qx.ui.form.TextField": {},
      "qx.theme.manager.Appearance": {},
      "qx.module.util.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A form virtual widget which allows a single selection. Looks somewhat like
   * a normal button, but opens a virtual list of items to select when tapping
   * on it.
   *
   * @childControl spacer {qx.ui.core.Spacer} Flexible spacer widget.
   * @childControl atom {qx.ui.basic.Atom} Shows the text and icon of the content.
   * @childControl arrow {qx.ui.basic.Image} Shows the arrow to open the drop-down list.
   *
   * Item labels are plain text by default. Property <code>rich</code> can be used
   * to enable HTML formatting.
   *
   * Incremental search can be enabled by setting property <code>incrementalSearch</code>
   * to <code>true</code>. Highlightung of the search string is controlled by property
   * <code>highlightMode</code>. BEWARE that html highlighting sets property <code>rich</code>
   * automatically to <code>true</code>.
   *
   * With <code>highlightMode=='html'</code> item label parts and search value are all HTML-escaped.
   * If HTML-formatted item labels are used, this might lead to unexpected or undesirable (but save)
   * results. In this case you might want to override the various protected methods involved.
   *
   */
  qx.Class.define("qx.ui.form.VirtualSelectBox", {
    extend: qx.ui.form.core.AbstractVirtualBox,
    implement: [qx.data.controller.ISelection, qx.ui.form.IField],
    construct: function construct(model) {
      qx.ui.form.core.AbstractVirtualBox.constructor.call(this, model);

      this._createChildControl("atom");

      this._createChildControl("spacer");

      this._createChildControl("arrow"); // Register listener


      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.__P_325_0 = [];
      this.initSelection(this.getChildControl("dropdown").getSelection());
      this.__P_325_1 = new qx.event.Timer(500);

      this.__P_325_1.addListener("interval", this.__P_325_2, this);

      this.getSelection().addListener("change", this._updateSelectionValue, this);

      if (this.isIncrementalSearch()) {
        this.__P_325_3();
      }

      this.initHtmlMarkers(['<span style="' + this.__P_325_4() + '">', '</span>']);
    },
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "virtual-selectbox"
      },
      // overridden
      width: {
        refine: true,
        init: 120
      },

      /**
       * Whether or not to use incremental search.
       */
      incrementalSearch: {
        apply: '_applyIncrementalSearch',
        init: false,
        check: "Boolean"
      },

      /**
       * Array of non-HTML strings for opening an closing marker for incremental search highlighting
       */
      plainMarkers: {
        apply: "__P_325_5",
        init: ['|', '|'],
        check: "Array"
      },

      /**
       * Array of HTML strings for opening an closing marker for incremental search highlighting.
       * Initialized from 'list-search-highlight' theme if not set explicitly.
       */
      htmlMarkers: {
        apply: "__P_325_5",
        deferredInit: true,
        check: "Array"
      },

      /**
       * Setting rich to true sets both the select box atom and the list items to rich.
       */
      rich: {
        apply: '_applyRich',
        init: null,
        check: "Boolean"
      },

      /**
       * Define how to highlight the incremental search string.
       *
       * none: no highlighting (this is the default)
       * plain: use characters from plainMarkers property
       * html: use HTML for highlighting; this automatically calls <code>this.setRich(true)</code> and thus sets item labels to rich as well.
       *
       */
      highlightMode: {
        apply: '_applyHighlightMode',
        init: "none",
        check: ["plain", "html", "none"]
      },

      /** Current selected items. */
      selection: {
        check: "qx.data.Array",
        event: "changeSelection",
        apply: "_applySelection",
        nullable: false,
        deferredInit: true
      }
    },
    events: {
      /**
       * This event is fired as soon as the content of the selection property changes, but
       * this is not equal to the change of the selection of the widget. If the selection
       * of the widget changes, the content of the array stored in the selection property
       * changes. This means you have to listen to the change event of the selection array
       * to get an event as soon as the user changes the selected item.
       * <pre class="javascript">obj.getSelection().addListener("change", listener, this);</pre>
       */
      "changeSelection": "qx.event.type.Data",

      /** Fires after the value was modified */
      "changeValue": "qx.event.type.Data"
    },
    members: {
      /** @type {String} The search value to {@link #__preselect} an item. */
      __P_325_6: "",

      /**
       * @type {qx.event.Timer} The time which triggers the search for pre-selection.
       */
      __P_325_1: null,

      /** @type {Array} Contains the id from all bindings. */
      __P_325_0: null,

      /**
       * @param selected {var|null} Item to select as value.
       * @returns {null|TypeError} The status of this operation.
       */
      setValue: function setValue(selected) {
        if (null === selected) {
          this.getSelection().removeAll();
          return null;
        }

        this.getSelection().setItem(0, selected);
        return null;
      },

      /**
       * @returns {null|var} The currently selected item or null if there is none.
       */
      getValue: function getValue() {
        var s = this.getSelection();
        return s.length === 0 ? null : s.getItem(0);
      },
      resetValue: function resetValue() {
        this.setValue(null);
      },
      // overridden
      syncWidget: function syncWidget(jobs) {
        this._removeBindings();

        this._addBindings();
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAl API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "spacer":
            control = new qx.ui.core.Spacer();

            this._add(control, {
              flex: 1
            });

            break;

          case "atom":
            control = new qx.ui.form.ListItem("");
            control.setCenter(false);
            control.setAnonymous(true);

            this._add(control, {
              flex: 1
            });

            break;

          case "arrow":
            control = new qx.ui.basic.Image();
            control.setAnonymous(true);

            this._add(control);

            break;
        }

        return control || qx.ui.form.VirtualSelectBox.prototype._createChildControlImpl.base.call(this, id, hash);
      },
      // overridden
      _getAction: function _getAction(event) {
        var keyIdentifier = event.getKeyIdentifier();
        var isOpen = this.getChildControl("dropdown").isVisible();

        var isModifierPressed = this._isModifierPressed(event);

        if (!isOpen && !isModifierPressed && (keyIdentifier === "Enter" || keyIdentifier === "Space")) {
          return "open";
        } else if (isOpen && event.isPrintable()) {
          return "search";
        } else {
          return qx.ui.form.VirtualSelectBox.prototype._getAction.base.call(this, event);
        }
      },

      /**
       * This method is called when the binding can be added to the
       * widget. For e.q. bind the drop-down selection with the widget.
       */
      _addBindings: function _addBindings() {
        var atom = this.getChildControl("atom");

        var modelPath = this._getBindPath("selection", "");

        var id = this.bind(modelPath, atom, "model", null);

        this.__P_325_0.push(id);

        var labelSourcePath = this._getBindPath("selection", this.getLabelPath());

        id = this.bind(labelSourcePath, atom, "label", this.getLabelOptions());

        this.__P_325_0.push(id);

        if (this.getIconPath() != null) {
          var iconSourcePath = this._getBindPath("selection", this.getIconPath());

          id = this.bind(iconSourcePath, atom, "icon", this.getIconOptions());

          this.__P_325_0.push(id);
        }
      },

      /**
       * This method is called when the binding can be removed from the
       * widget. For e.q. remove the bound drop-down selection.
       */
      _removeBindings: function _removeBindings() {
        while (this.__P_325_0.length > 0) {
          var id = this.__P_325_0.pop();

          this.removeBinding(id);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      _onBlur: function _onBlur() {
        if (!this.isIncrementalSearch()) {
          this.close();
        }
      },
      // overridden
      _handlePointer: function _handlePointer(event) {
        qx.ui.form.VirtualSelectBox.prototype._handlePointer.base.call(this, event);

        var type = event.getType();

        if (type === "tap") {
          this.toggle();
        }
      },
      // overridden
      _handleKeyboard: function _handleKeyboard(event) {
        var action = this._getAction(event);

        switch (action) {
          case "search":
            if (!this.isIncrementalSearch()) {
              this.__P_325_6 += this.__P_325_7(event.getKeyIdentifier());

              this.__P_325_1.restart();
            }

            break;

          default:
            qx.ui.form.VirtualSelectBox.prototype._handleKeyboard.base.call(this, event);

            break;
        }
      },

      /**
       * Listener method for "pointerover" event.
       *
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state
       *   is set)</li>
       * </ul>
       *
       * @param event {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(event) {
        if (!this.isEnabled() || event.getTarget() !== this) {
          return;
        }

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }

        this.addState("hovered");
      },

      /**
       * Listener method for "pointerout" event.
       *
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state
       *   is set)</li>
       * </ul>
       *
       * @param event {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(event) {
        if (!this.isEnabled() || event.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
        }
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySelection: function _applySelection(value, old) {
        this.getChildControl("dropdown").setSelection(value);
        qx.ui.core.queue.Widget.add(this);
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Preselects an item in the drop-down, when item starts with the
       * __searchValue value.
       */
      __P_325_2: function __P_325_2() {
        this.__P_325_1.stop();

        var searchValue = this.__P_325_6;

        if (searchValue === null || searchValue === "") {
          return;
        }

        var model = this.getModel();
        var list = this.getChildControl("dropdown").getChildControl("list");
        var selection = list.getSelection();

        var length = list._getLookupTable().length;

        var startIndex = model.indexOf(selection.getItem(0));

        var startRow = list._reverseLookup(startIndex);

        for (var i = 1; i <= length; i++) {
          var row = (i + startRow) % length;
          var item = model.getItem(list._lookup(row));

          if (!item) {
            // group items aren't in the model
            continue;
          }

          var value = item;

          if (this.getLabelPath()) {
            value = qx.data.SingleValueBinding.resolvePropertyChain(item, this.getLabelPath());
            var labelOptions = this.getLabelOptions();

            if (labelOptions) {
              var converter = qx.util.Delegate.getMethod(labelOptions, "converter");

              if (converter) {
                value = converter(value, item);
              }
            }
          }

          if (value.toLowerCase().startsWith(searchValue.toLowerCase())) {
            selection.push(item);
            break;
          }
        }

        this.__P_325_6 = "";
      },

      /**
       * Converts the keyIdentifier to a printable character e.q. <code>"Space"</code>
       * to <code>" "</code>.
       *
       * @param keyIdentifier {String} The keyIdentifier to convert.
       * @return {String} The converted keyIdentifier.
       */
      __P_325_7: function __P_325_7(keyIdentifier) {
        if (keyIdentifier === "Space") {
          return " ";
        } else {
          return keyIdentifier;
        }
      },

      /**
       * Called when selection changes.
       *
       * @param event {qx.event.type.Data} {@link qx.data.Array} change event.
       */
      _updateSelectionValue: function _updateSelectionValue(event) {
        var d = event.getData();
        var old = d.removed.length ? d.removed[0] : null;
        this.fireDataEvent("changeValue", d.added[0], old);
      },

      /*
      ---------------------------------------------------------------------------
        INCREMENTAL SEARCH
      ---------------------------------------------------------------------------
      */
      __P_325_8: null,
      __P_325_9: '',
      // prevent recursion problems when deleting unsucessful filtering
      __P_325_10: 0,
      __P_325_11: null,
      __P_325_12: null,
      _highlightFilterValueFunction: null,
      _searchRegExp: null,
      __P_325_13: function __P_325_13() {
        var input = this.__P_325_11 = new qx.ui.form.TextField().set({
          appearance: 'widget',
          liveUpdate: true,
          height: 0,
          width: 1 // must be > 0

        }); // we don't want the browser to set this
        // works with Chrome even

        input.getContentElement().setAttribute('autocomplete', 'new-password');

        this._add(input);

        var dropdown = this.getChildControl("dropdown");
        dropdown.addListener('appear', function () {
          // we must delay so that the focus is only set once the list is ready
          window.setTimeout(function () {
            input.focus();
          }, 0);
        }, this);
        dropdown.addListener('disappear', function () {
          input.blur(); // clear filter

          var sel = this.getValue();
          input.resetValue();
          this.setValue(sel);
        }, this);
        input.addListener("blur", function (e) {
          this.close();
        }, this);
        input.addListener('changeValue', function (e) {
          if (this.__P_325_10 === 0) {
            this.__P_325_14();
          }
        }, this);
      },
      __P_325_4: function __P_325_4() {
        var highlightAppearance = qx.theme.manager.Appearance.getInstance().styleFrom("list-search-highlight"); // default style        

        if (!highlightAppearance) {
          this.debug('The current theme is missing the "list-search-highlight" appearance setting, using default.');
          highlightAppearance = {
            backgroundColor: 'rgba(255, 251, 0, 0.53)',
            textDecorationStyle: 'dotted',
            textDecorationLine: 'underline'
          };
        }

        var highlightStyle = '',
            styles = [];
        var keys = Object.keys(highlightAppearance);

        for (var k = 0; k < keys.length; k++) {
          var key = qx.module.util.String.hyphenate(keys[k]);
          styles.push(key + ':' + highlightAppearance[keys[k]]);
        }

        highlightStyle = styles.join(';') + ';';
        return highlightStyle;
      },
      // filterValue is passed below to allow usage in overridden _searchMatch
      // we use _searchRegExp here for efficiency
      _searchMatch: function _searchMatch(item, filterValue) {
        return item.match(this._searchRegExp);
      },
      // highlight plain
      _highlightFilterValuePlainFunction: function _highlightFilterValuePlainFunction(parts) {
        // the array elements will contain '' if empty
        return parts[1] + this.__P_325_12[0] + parts[2] + this.__P_325_12[1] + parts[3];
      },
      // htmlEscape all label parts
      _highlightFilterValueHtmlFunction: function _highlightFilterValueHtmlFunction(parts) {
        // the array elements will contain '' if empty
        // the markers will be HTML strings
        return qx.module.util.String.escapeHtml(parts[1]) + this.__P_325_12[0] + qx.module.util.String.escapeHtml(parts[2]) + this.__P_325_12[1] + qx.module.util.String.escapeHtml(parts[3]);
      },
      _configureItemRich: function _configureItemRich(item) {
        item.setRich(true);
      },
      _configureItemPlain: function _configureItemPlain(item) {
        item.setRich(false);
      },
      __P_325_14: function __P_325_14(lastFilterValue) {
        this.__P_325_10++;
        var filterValue = lastFilterValue !== undefined ? lastFilterValue : this.__P_325_11.getValue();
        this.__P_325_8 = filterValue; // _searchRegExp is used in default _searchMatch function to avoid recreation of regexp object
        // for each list item

        var filterValueEscaped = filterValue != null ? qx.module.util.String.escapeRegexpChars(filterValue) : '';
        this._searchRegExp = new RegExp('(.*?)(' + filterValueEscaped + ')(.*)', 'i'); // create and apply new filter

        var that = this;
        var delegate = {
          filter: function filter(item) {
            if (that.getLabelPath() != null) {
              item = qx.data.SingleValueBinding.resolvePropertyChain(item, that.getLabelPath());
            } // we pass filterValue in case _searchMatch() is overridden and wants to use it.


            return that._searchMatch(item, filterValue);
          }
        }; // needed for newly created items on filterValue backspacing

        if (this.isRich()) {
          delegate.configureItem = this._configureItemRich;
        }

        this.setDelegate(delegate); // update selection if there is at least one item left,
        // otherwise shorten filterValue and re-run filtering
        // This deals with multi-char input like for ü on MacOS where
        // where this is entered as option-: followed by u on a keyboard
        // without a separat key for it.

        var item = this.getModel().getItem(this.getChildControl('dropdown').getChildControl('list')._lookup(0));

        if (item) {
          this.__P_325_9 = filterValue;
          this.getSelection().setItem(0, item);
        } else {
          var len = filterValue.length;
          var last = len > this.__P_325_9.length + 1 ? this.__P_325_11.getValue().charAt(len - 1) : '';
          filterValue = this.__P_325_9 + last;

          this.__P_325_14(filterValue);
        } // make sure length of dropdown is updated


        this.__P_325_10--;
      },
      __P_325_3: function __P_325_3() {
        // add search input field
        this.__P_325_13(); // set label converter


        var that = this;
        var labelOptions = this.getLabelOptions() || {};

        labelOptions.converter = function (data, model, source, target) {
          var filterValue = that.__P_325_8;

          if (filterValue && data && that._highlightFilterValueFunction) {
            var match = that._searchMatch(data, filterValue);

            if (match) {
              data = that._highlightFilterValueFunction(match);
            }
          }

          if (data === undefined) {
            data = '';
          }

          return data;
        };

        this.setLabelOptions(labelOptions);
      },
      _applyDelegate: function _applyDelegate(value, old) {
        // we assume that if the user sets configureItem himself
        // he keeps this consistent with rich
        if (this.isRich() && !value.configureItem) {
          value.configureItem = this._configureItemRich;
        }

        qx.ui.form.VirtualSelectBox.prototype._applyDelegate.base.call(this, value, old);
      },
      _applyRich: function _applyRich(value, old) {
        if (!value && this.getHighlightMode() == 'html') {
          this.debug('highlightMode html requires rich==true, ignoring setting it to false');
          return;
        }

        this.getChildControl('atom').setRich(value);
        var configureItemFunction = value ? this._configureItemRich : this._configureItemPlain;
        this.setDelegate({
          configureItem: configureItemFunction
        });
      },
      _applyHighlightMode: function _applyHighlightMode(value, old) {
        switch (value) {
          case 'html':
            // set rich item labels
            this.setRich(true);
            this._highlightFilterValueFunction = this._highlightFilterValueHtmlFunction;
            this.__P_325_12 = this.getHtmlMarkers();
            break;

          case 'plain':
            this._highlightFilterValueFunction = this._highlightFilterValuePlainFunction;
            this.__P_325_12 = this.getPlainMarkers();
            break;

          default:
            this._highlightFilterValueFunction = null;
            break;
        }
      },
      __P_325_5: function __P_325_5(value, old) {
        this.__P_325_12 = value; // make sure we have strings for both markers

        if (value.length < 1) {
          this.__P_325_12[0] = '';
        } // this most likely won't work for HTML highlighting


        if (value.length < 2) {
          this.__P_325_12[1] = this.__P_325_12[0];
        }
      },
      _applyIncrementalSearch: function _applyIncrementalSearch(value, old) {
        if (value) {
          this.__P_325_1.stop();

          this.__P_325_1.setEnabled(false);

          this.__P_325_3();
        } else {
          this.__P_325_1.setEnabled(true);
        }
      }
    },
    destruct: function destruct() {
      this._removeBindings();

      this.getSelection().removeListener("change", this._updateSelectionValue, this);

      this.__P_325_1.removeListener("interval", this.__P_325_2, this);

      this.__P_325_1.dispose();

      this.__P_325_1 = null;
    }
  });
  qx.ui.form.VirtualSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualSelectBox.js.map?dt=1648068882782