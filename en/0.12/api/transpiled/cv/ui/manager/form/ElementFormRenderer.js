(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.FormRenderer": {
        "require": true
      },
      "qx.ui.form.RadioGroup": {},
      "qx.ui.basic.Label": {},
      "qx.ui.menu.Separator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Special form renderer for editing XML-Config elements (allows special help texts for items)
   */
  qx.Class.define('cv.ui.manager.form.ElementFormRenderer', {
    extend: qxl.dialog.FormRenderer,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      addItems: function addItems(items, names, title) {
        if (title !== null) {
          this._add(this._createHeader(title), {
            row: this._row,
            column: 0,
            colSpan: 2
          });

          this._row++;
        }

        for (var i = 0; i < items.length; i++) {
          var item = items[i],
              widget = void 0,
              label = void 0;

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
    }
  });
  cv.ui.manager.form.ElementFormRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ElementFormRenderer.js.map?dt=1620144796464