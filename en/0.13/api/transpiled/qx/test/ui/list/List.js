(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.list.AbstractListTest": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.data.Array": {},
      "qx.data.marshal.Json": {},
      "qx.event.Timer": {},
      "qx.event.type.Data": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * @asset(qx/icon/${qx.icontheme}/16/places/folder.png)
   */

  qx.Class.define("qx.test.ui.list.List", {
    extend: qx.test.ui.list.AbstractListTest,
    include: qx.dev.unit.MMock,
    members: {
      createModelData: function createModelData() {
        var model = new qx.data.Array();
        for (var i = 0; i < 100; i++) {
          model.push("item " + (i + 1));
        }
        return model;
      },
      testCreation: function testCreation() {
        this._list.setWidth(300);
        this._list.setItemHeight(30);
        this.flush();
        this.assertEquals(this._list.getPane().getBounds().width, this._list.getPane().getColumnConfig().getItemSize(0));
        this.assertEquals(30, this._list.getPane().getRowConfig().getDefaultItemSize());
        this.assertEquals(this._model.getLength(), this._list.getPane().getRowConfig().getItemCount());
        this.assertEquals(this._model, this._list.getModel());
        this.assertEquals(0, this._list.getSelection().getLength());
      },
      testNullModel: function testNullModel() {
        this._list.setModel(null);
        this.assertEquals(0, this._list.getPane().getRowConfig().getItemCount());
        this.assertEquals(0, this._list.getSelection().getLength());
      },
      testChangeModelSize: function testChangeModelSize() {
        this._model.push("new item");
        this.assertModelEqualsRowData(this._model, this._list);
        this.assertEquals(this._model.getLength(), this._list.getPane().getRowConfig().getItemCount());
        this._model.dispose();
        this._model = new qx.data.Array();
        this._model.push("item");
        this._list.setModel(this._model);
        this.assertModelEqualsRowData(this._model, this._list);
        this.assertEquals(this._model.getLength(), this._list.getPane().getRowConfig().getItemCount());
      },
      testChangeModelContent: function testChangeModelContent() {
        this._model.setItem(0, "new item");
        this.flush();
        this.assertModelEqualsRowData(this._model, this._list);
        this.assertEquals(this._model.getLength(), this._list.getPane().getRowConfig().getItemCount());
        this.assertEquals("new item", this._list._layer.getRenderedCellWidget(0, 0).getLabel());
      },
      testResetModel: function testResetModel() {
        var model = new qx.data.Array();
        model.push("item");
        this._list.setModel(model);
        this.flush();
        this.assertModelEqualsRowData(model, this._list);
        this._list.resetModel();
        this.flush();
        this.assertModelEqualsRowData(this._model, this._list);
        this.assertEquals(this._model, this._list.getModel());
        this.assertEquals(this._list.getModel().getLength(), this._list.getPane().getRowConfig().getItemCount(), "b");
        model.dispose();
      },
      testComplexModel: function testComplexModel() {
        var rawData = [];
        for (var i = 0; i < 10; i++) {
          rawData[i] = {
            label: "Item " + i,
            icon: "icon/16/places/folder.png"
          };
        }
        var model = qx.data.marshal.Json.createModel(rawData);
        this._list.setLabelPath("label");
        this._list.setIconPath("icon");
        this._list.setModel(model);
        this.flush();
        this.assertModelEqualsRowData(model, this._list);
        this.assertEquals(model.getLength(), this._list.getPane().getRowConfig().getItemCount());
        this.assertEquals("Item 5", this._list._layer.getRenderedCellWidget(5, 0).getLabel());
        this.assertEquals("icon/16/places/folder.png", this._list._layer.getRenderedCellWidget(0, 0).getIcon());
        model.dispose();
      },
      testReverseBinding: function testReverseBinding() {
        var delegate = {
          bindItem: function bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
            controller.bindPropertyReverse(null, "label", null, item, id);
          }
        };
        this._list.setDelegate(delegate);
        this.flush();
        var widget = this._list._layer.getRenderedCellWidget(0, 0);
        widget.setLabel("abcde");
        this.flush();
        this.assertEquals(this._model.getLength(), this._list.getPane().getRowConfig().getItemCount(), "Model size <-> pane size");
        this.assertEquals("abcde", this._list._layer.getRenderedCellWidget(0, 0).getLabel(), "Widget value");
        this.assertEquals("abcde", this._list.getModel().getItem(0), "Model value");
      },
      testFilter: function testFilter() {
        var filteredModel = new qx.data.Array();
        for (var i = 0; i < this._model.getLength(); i++) {
          if (i % 2 == 0) {
            filteredModel.push("item " + (i + 1));
          }
        }
        var delegate = {
          filter: function filter(data) {
            return (parseInt(data.slice(5, data.length), 10) - 1) % 2 == 0;
          }
        };
        this._list.setDelegate(delegate);
        this.flush();
        this.assertModelEqualsRowData(filteredModel, this._list);
        this.assertEquals(filteredModel.getLength(), this._list.getPane().getRowConfig().getItemCount(), "two");
        filteredModel.dispose();
      },
      testSorter: function testSorter() {
        var sortedModel = new qx.data.Array();
        var sorter = function sorter(a, b) {
          return a < b ? 1 : a > b ? -1 : 0;
        };
        for (var i = 0; i < this._model.getLength(); i++) {
          sortedModel.push(this._model.getItem(i));
        }
        sortedModel.sort(sorter);
        var delegate = {
          sorter: sorter
        };
        this._list.setDelegate(delegate);
        this.flush();
        this.assertModelEqualsRowData(sortedModel, this._list);
        this.assertEquals(sortedModel.getLength(), this._list.getPane().getRowConfig().getItemCount(), "two");
        sortedModel.dispose();
      },
      testSorterWithFilter: function testSorterWithFilter() {
        var filteredModel = new qx.data.Array();
        for (var i = 0; i < this._model.getLength(); i++) {
          if (i % 2 == 0) {
            filteredModel.push("item " + (i + 1));
          }
        }
        var sortedModel = new qx.data.Array();
        var sorter = function sorter(a, b) {
          return a < b ? 1 : a > b ? -1 : 0;
        };
        for (var i = 0; i < filteredModel.getLength(); i++) {
          sortedModel.push(filteredModel.getItem(i));
        }
        sortedModel.sort(sorter);
        var delegate = {
          sorter: sorter,
          filter: function filter(data) {
            return (parseInt(data.slice(5, data.length), 10) - 1) % 2 == 0;
          }
        };
        this._list.setDelegate(delegate);
        this.flush();
        this.assertModelEqualsRowData(sortedModel, this._list);
        this.assertEquals(sortedModel.getLength(), this._list.getPane().getRowConfig().getItemCount(), "two");
        sortedModel.dispose();
        filteredModel.dispose();
      },
      testDisabledElements: function testDisabledElements() {
        var disabledItem = 3;
        var rawData = [];
        for (var i = 0; i < 10; i++) {
          rawData[i] = {
            label: "Item " + i,
            icon: "icon/16/places/folder.png",
            enabled: i != disabledItem
          };
        }
        var model = qx.data.marshal.Json.createModel(rawData);
        this._list.setDelegate({
          bindItem: function bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
            controller.bindProperty("enabled", "enabled", null, item, id);
          }
        });
        this._list.setLabelPath("label");
        this._list.setIconPath("icon");
        this._list.setModel(model);
        this.flush();
        for (var i = 0; i < 10; i++) {
          var widget = this._list._layer.getRenderedCellWidget(i, 0);
          if (widget == null) {
            // row is not rendered
            continue;
          }
          if (i != disabledItem) {
            this.assertTrue(widget.isEnabled());
          } else {
            this.assertFalse(widget.isEnabled());
          }
        }
        model.dispose();
      },
      testOnPool: function testOnPool() {
        var delegate = {
          onPool: function onPool(item) {}
        };
        var spy = this.spy(delegate, "onPool");
        this._list._provider.setDelegate(delegate);
        var widget = this._list._provider.getCellWidget(4, 0);
        this._list._provider.poolCellWidget(widget);
        this.assertCalledOnce(spy);
        this.assertCalledWith(spy, widget);
        widget.dispose();
      },
      testMultiSelectionMode: function testMultiSelectionMode() {
        var model = qx.data.marshal.Json.createModel(["a", "b", "c"]);
        this._list.setModel(model);
        this._list.setSelectionMode("multi");
        this._list.getSelection().push(model.getItem(0));
        this._list.getSelection().removeAll();
        this.assertNull(this._list._manager.getLeadItem());
        model.dispose();
      },
      testVariableItemHeight: function testVariableItemHeight() {
        this._list.setModel(null);
        this.flush();
        this._list.getPane().getRowConfig().resetItemSizes();
        var sizes = [16, 32, 48, 16, 32, 48, 16, 32, 48, 16, 32, 48];
        var rawData = [];
        for (var i = 0; i < sizes.length; i++) {
          rawData[i] = {
            label: "Item " + sizes[i] + "px",
            icon: "icon/" + sizes[i] + "/places/folder.png"
          };
        }
        var model = qx.data.marshal.Json.createModel(rawData);
        this._list.setVariableItemHeight(true);
        this._list.setDelegate({
          bindItem: function bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
          }
        });
        this._list.setLabelPath("label");
        this._list.setIconPath("icon");
        this._list.setModel(model);
        this.flush();
        qx.event.Timer.once(function () {
          this.resume(function () {
            var rowConfig = this._list.getPane().getRowConfig();
            var testedWidgets = 0;
            for (var i = 0; i < rawData.length; i++) {
              var widget = this._list._layer.getRenderedCellWidget(i, 0);
              if (widget == null) {
                // row is not rendered
                continue;
              }
              this.assertEquals(widget.getSizeHint().height, rowConfig.getItemSize(i));
              testedWidgets++;
            }
            this.assertTrue(testedWidgets >= 3);
            this._list.setVariableItemHeight(false);
            model.dispose();
          });
        }, this, 100);
        this.wait();
      },
      testChangeModelLengthListener: function testChangeModelLengthListener() {
        var model = new qx.data.Array(["a"]);
        this._list.setModel(model);
        this.assertEquals(1, model.getLength());
        this.assertEventFired(this._list, "changeModelLength", function () {
          model.push("b");
        }, function (ev) {
          this.assertInstance(ev, qx.event.type.Data);
          this.assertPositiveInteger(ev.getData());
          this.assertEquals(2, ev.getData());
          this.assertPositiveInteger(ev.getOldData());
          this.assertEquals(1, ev.getOldData());
        }.bind(this));
        this._list.setModel(null);
        model.dispose();
      }
    }
  });
  qx.test.ui.list.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1735222432204