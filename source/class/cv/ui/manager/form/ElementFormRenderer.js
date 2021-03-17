/**
 * Special form renderer for editing XML-Config elements (allows special help texts for items)
 */
qx.Class.define('cv.ui.manager.form.ElementFormRenderer', {
  extend: dialog.FormRenderer,
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    addItems: function(items, names, title) {
      if (title !== null) {
        this._add(
          this._createHeader(title), {
            row: this._row,
            column: 0,
            colSpan: 2
          }
        );
        this._row++;
      }
      for (let i = 0; i < items.length; i++) {
        let item = items[i],widget,label;
        if (item instanceof qx.ui.form.RadioGroup) {
          if (item.getUserData("orientation") === "horizontal") {
            widget = this._createHBoxForRadioGroup(item);
          } else {
            widget = this._createWidgetForRadioGroup(item);
          }
        } else {
          widget = item;
        }
        if (names[i] && item.getUserData("excluded")) {
          label = new qx.ui.basic.Label(names[i]);
          label.setRich(true);
          this._add(label, {
            row: this._row,
            column: 0,
            colSpan: 2
          });
        } else if (!names[i]) {
          this._add(widget, {
            row: this._row,
            column: 0,
            colSpan: 2
          });
        } else {
          label = this._createLabel(names[i], item);
          label.setRich(true);
          this._add(label, {
            row: this._row,
            column: 0
          });
          this._add(widget, {
            row: this._row,
            column: 1
          });
        }
        this._row++;
        if (item.getUserData("help")) {
          label = new qx.ui.basic.Label(item.getUserData("help"));
          label.setRich(true);
          label.setAppearance("helptext");
          this._add(label, {
            row: this._row,
            column: 1
          });
          this._row++;
        }
        this._add(new qx.ui.menu.Separator(), {
          row: this._row,
          column: 0,
          colSpan: 2
        });
        this._row++;
        if (i === 0) {
          widget.focus();
        }
      }
    }
  },
});
