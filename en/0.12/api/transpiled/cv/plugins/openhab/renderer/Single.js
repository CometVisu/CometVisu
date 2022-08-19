(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.renderer.AbstractRenderer": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.basic.Label": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.CheckBox": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Single.js 
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
   * {@link qx.ui.form.renderer.Single} with right column flexed.
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   */
  qx.Class.define('cv.plugins.openhab.renderer.Single', {
    extend: qx.ui.form.renderer.AbstractRenderer,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(form) {
      var layout = new qx.ui.layout.VBox(6);

      this._setLayout(layout);

      qx.ui.form.renderer.AbstractRenderer.constructor.call(this, form);
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      bottomText: {
        check: 'String',
        nullable: true,
        apply: '_applyBottomText'
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // property apply
      _applyBottomText: function _applyBottomText(value) {
        var control = this.getChildControl('bottom-text');

        if (value) {
          control.setValue(value);
          control.show();
        } else {
          control.exclude();
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case 'content':
            control = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));

            this._addAt(control, 1);

            break;

          case 'bottom-text':
            control = new qx.ui.basic.Label(this.getBottomText());
            control.set({
              rich: true,
              wrap: true
            });

            this._addAt(control, 2);

            if (this.getBottomText()) {
              control.show();
            } else {
              control.exclude();
            }

            break;

          case 'button-container':
            {
              var hbox = new qx.ui.layout.HBox();
              hbox.setAlignX('right');
              hbox.setSpacing(5);
              control = new qx.ui.container.Composite(hbox);

              this._addAt(control, 3);

              break;
            }
        }

        return control || cv.plugins.openhab.renderer.Single.prototype._createChildControlImpl.base.call(this, id, hash);
      },

      /**
       * Add a group of form items with the corresponding names. The names are
       * displayed as label.
       * The title is optional and is used as grouping for the given form
       * items.
       *
       * @param items {qx.ui.core.Widget[]} An array of form items to render.
       * @param names {String[]} An array of names for the form items.
       * @param title {String?} A title of the group you are adding.
       */
      addItems: function addItems(items, names, title) {
        // add the header
        if (title !== null) {
          this.getChildControl('content').add(this._createHeader(title));
        }

        var container = this.getChildControl('content'); // add the items

        for (var i = 0; i < items.length; i++) {
          var label = this._createLabel(names[i], items[i]);

          var item = items[i];
          label.setBuddy(item);

          if (item instanceof qx.ui.form.CheckBox) {
            // label + checkbox in one line
            var box = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            box.add(label, {
              width: '50%'
            });
            box.add(item, {
              width: '50%'
            });
            container.add(box);
          } else {
            container.add(label);
            container.add(item);
          }

          this._connectVisibility(item, label); // store the names for translation


          {
            this._names.push({
              name: names[i],
              label: label,
              item: items[i]
            });
          }
        }
      },

      /**
       * Adds a button to the form renderer. All buttons will be added in a
       * single row at the bottom of the form.
       *
       * @param button {qx.ui.form.Button} The button to add.
       */
      addButton: function addButton(button) {
        // add the button
        this.getChildControl('button-container').add(button);
      },

      /**
       * Returns the set layout for configuration.
       *
       * @return {qx.ui.layout.Grid} The grid layout of the widget.
       */
      getLayout: function getLayout() {
        return this._getLayout();
      },

      /**
       * Creates a label for the given form item.
       *
       * @param name {String} The content of the label without the
       *   trailing * and :
       * @param item {qx.ui.core.Widget} The item, which has the required state.
       * @return {qx.ui.basic.Label} The label for the given item.
       */
      _createLabel: function _createLabel(name, item) {
        var label = new qx.ui.basic.Label(this._createLabelText(name, item)); // store labels for disposal

        this._labels.push(label);

        label.setRich(true);
        label.setAppearance('form-renderer-label');
        return label;
      },

      /**
       * Creates a header label for the form groups.
       *
       * @param title {String} Creates a header label.
       * @return {qx.ui.basic.Label} The header for the form groups.
       */
      _createHeader: function _createHeader(title) {
        var header = new qx.ui.basic.Label(title); // store labels for disposal

        this._labels.push(header);

        header.setFont('bold');

        if (this._row != 0) {
          header.setMarginTop(10);
        }

        header.setAlignX('left');
        return header;
      }
    }
  });
  cv.plugins.openhab.renderer.Single.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Single.js.map?dt=1660935308185