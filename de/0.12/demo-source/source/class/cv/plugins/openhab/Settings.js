/* Settings.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Show and edit openHAB CometVisu backends settings via openHAB api.
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 *
 */
qx.Class.define("cv.plugins.openhab.Settings", {
  extend: qx.ui.core.Widget,

  /*
 *****************************************************************************
    CONSTRUCTOR
 *****************************************************************************
 */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox());
    this.set({
      padding: 10,
      backgroundColor: "rgba(216, 216, 216, 1.0)",
      textColor: "rgb(61, 61, 61)"
    });
    // override text-shadow setting
    if (!this.getBounds()) {
      this.addListenerOnce("appear", function() {
        this.getContentElement().setStyle("text-shadow", "none");
      }, this);
    } else {
      this.getContentElement().setStyle("text-shadow", "none");
    }

    this.__servicePid = "org.openhab.cometvisu";
    this.__uri = "ui:cometvisu";

    this._initConfigRestClient();
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {

    modified: {
      check: "Boolean",
      init: false,
      event: "changeModified"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __servicePid: null,
    __uri: null,
    __configDescriptionResource: null,
    __service: null,
    __configDescription: null,
    __inDom: false,
    _store: null,
    __initialValues: null,

    _initStore: function(pid) {
      var serviceDesc = {
        "get": { method: "GET", url: "/rest/services/"+pid+"/config" },
        "delete": { method: "DELETE", url: "/rest/services/"+pid+"/config" },
        "put": { method: "PUT", url: "/rest/services/"+pid+"/config" }
      };
      var service = this.__service = new qx.io.rest.Resource(serviceDesc);
      this._store = new qx.data.store.Rest(service, "get", {
        configureRequest: function(req) {
          req.setRequestHeader("Content-Type", "application/json");
        },
        manipulateData: function(data) {
          // normalize the keys (replace .> with _) for the marshaller
          var n = {};
          Object.getOwnPropertyNames(data).forEach(function(key) {
            n[key.replace(/[\.>]/g, "_")] = data[key];
          });
          if (!n.hasOwnProperty("autoDownload")) {
            n.autoDownload = false;
          }
          return n;
        }
      });
      // load data
      service.get();
      this._store.addListenerOnce("changeModel", function() {
        this.__initialValues = JSON.parse(qx.util.Serializer.toJson(this._store.getModel()));
      }, this);
    },

    _saveConfig: function() {
      var data = qx.util.Serializer.toJson(this._store.getModel());
      data = data.replace(/icons_mapping_/g, "icons.mapping>");
      data = JSON.parse(data.replace("icons_enableMapping", "icons>enableMapping"));
      this.__service.put(null, data);
      this.__service.addListenerOnce("putSuccess", this.close, this);
    },

    _initConfigRestClient: function() {
      var description = {
        "get": { method: "GET", url: "/rest/config-descriptions/"+this.__uri }
      };

      var config = this.__configDescriptionResource = new qx.io.rest.Resource(description);
      config.addListener("getSuccess", function(ev) {
        this._createForm(ev.getRequest().getResponse());
      }, this);
      config.configureRequest(function(req) {
        req.setRequestHeader("Content-Type", "application/json");
      });
      config.get();

      this._initStore(this.__servicePid);
    },

    _createForm: function(config) {
      this._createChildControl("title");
      var form = this.getChildControl("form");
      config.parameters.forEach(function(param) {
        var field;
        switch(param.type) {
          case "TEXT":
            field = new qx.ui.form.TextField();
            if (param.defaultValue) {
              field.setPlaceholder(param.defaultValue);
            }
            break;
          case "BOOLEAN":
            field = new qx.ui.form.CheckBox();
            field.setValue(param.defaultValue === "true");
            break;
        }
        if (param.readOnly) {
          field.setReadOnly(true);
        }
        if (param.required) {
          field.setRequired(true);
        }
        field.setToolTipText(param.description);
        field.addListener("changeValue", this._onFormFieldChange, this);
        form.add(field, param.label, null, param.name, null, param);
      }, this);

      var renderer = new cv.plugins.openhab.renderer.Single(form);
      if (cv.Config.guessIfProxied()) {
        renderer.setBottomText(this.tr("The CometVisu seems to be delivered by a proxied webserver. Changing configuration values might not have the expected effect. Please proceed only if you know what you are doing."));
        renderer.getChildControl("bottom-text").set({
          padding: 10,
          textAlign: "center",
          font: "bold"
        });
      }
      renderer.addButton(this.getChildControl("cancel-button"));
      renderer.addButton(this.getChildControl("save-button"));

      this._addAt(renderer, 1);
      var controller = new qx.data.controller.Form(null, form);

      this._store.bind("model", controller, "model");

      this.setModified(false);
    },

    _onFormFieldChange: function() {
      var modified = false;
      var items = this.getChildControl("form").getItems();
      Object.getOwnPropertyNames(items).some(function(name) {
        // noinspection EqualityComparisonWithCoercionJS
        if (this.__initialValues[name] != items[name].getValue()) { // jshint ignore:line
          this.debug(name+" has changed from "+this.__initialValues[name]+" to "+items[name].getValue());
          modified = true;
          return true;
        }
      }, this);
      this.setModified(modified);
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
      var control;
      switch(id) {

        case "title":
          control = new qx.ui.basic.Label(this.tr("openHAB backend settings"));
          control.set({
            font: "bold",
            marginBottom: 5,
            allowGrowX: true,
            decorator: "window-caption"
          });
          this._addAt(control, 0);
          break;

        case "form":
          control = new qx.ui.form.Form();
          break;

        case "cancel-button":
          control = new qx.ui.form.Button(qx.locale.Manager.tr("Cancel"));
          control.addListener("execute", this.close, this);
          break;

        case "save-button":
          control = new qx.ui.form.Button(qx.locale.Manager.tr("Save"));
          control.addListener("execute", this._saveConfig, this);
          this.bind("modified", control, "enabled");
          break;
      }
      return control || this.base(arguments, id, hash);
    },

    close: function() {
      this.setVisibility("excluded");
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    this._disposeObjects("__configDescriptionResource", "__service", "__root", "_store", "_window");
  }
});
