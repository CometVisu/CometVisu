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
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.io.rest.Resource": {},
      "cv.TemplateEngine": {},
      "qx.data.store.Rest": {},
      "cv.io.openhab.Rest": {},
      "qx.util.Serializer": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.CheckBox": {},
      "cv.plugins.openhab.renderer.Single": {},
      "cv.Config": {},
      "qx.data.controller.Form": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.Form": {},
      "qx.ui.form.Button": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Settings.js 
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
   * Show and edit openHAB CometVisu backends settings via openHAB api.
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   *
   */
  qx.Class.define('cv.plugins.openhab.Settings', {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
      CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.VBox());

      this.set({
        padding: 10,
        backgroundColor: 'rgba(216, 216, 216, 1.0)',
        textColor: 'rgb(61, 61, 61)'
      }); // override text-shadow setting

      if (!this.getBounds()) {
        this.addListenerOnce('appear', function () {
          this.getContentElement().setStyle('text-shadow', 'none');
        }, this);
      } else {
        this.getContentElement().setStyle('text-shadow', 'none');
      }

      this.__P_21_0 = 'org.openhab.cometvisu';
      this.__P_21_1 = 'ui:cometvisu';

      this._initConfigRestClient();
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      modified: {
        check: 'Boolean',
        init: false,
        event: 'changeModified'
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_21_0: null,
      __P_21_1: null,
      __P_21_2: null,
      __P_21_3: null,
      __P_21_4: null,
      __P_21_5: false,
      _store: null,
      __P_21_6: null,
      _initStore: function _initStore(pid) {
        var serviceDesc = {
          'get': {
            method: 'GET',
            url: '/rest/services/' + pid + '/config'
          },
          'delete': {
            method: 'DELETE',
            url: '/rest/services/' + pid + '/config'
          },
          'put': {
            method: 'PUT',
            url: '/rest/services/' + pid + '/config'
          }
        };
        var service = this.__P_21_3 = new qx.io.rest.Resource(serviceDesc);
        var client = cv.TemplateEngine.getInstance().visu;
        this._store = new qx.data.store.Rest(service, 'get', {
          configureRequest: function configureRequest(req) {
            req.setRequestHeader('Content-Type', 'application/json');

            if (client instanceof cv.io.openhab.Rest) {
              client.authorize(req);
            }
          },
          manipulateData: function manipulateData(data) {
            // normalize the keys (replace .> with _) for the marshaller
            var n = {};
            Object.getOwnPropertyNames(data).forEach(function (key) {
              n[key.replace(/[\.>]/g, '_')] = data[key];
            });

            if (!Object.prototype.hasOwnProperty.call(n, 'autoDownload')) {
              n.autoDownload = false;
            }

            return n;
          }
        }); // load data

        service.get();

        this._store.addListenerOnce('changeModel', function () {
          this.__P_21_6 = JSON.parse(qx.util.Serializer.toJson(this._store.getModel()));
        }, this);
      },
      _saveConfig: function _saveConfig() {
        var data = qx.util.Serializer.toJson(this._store.getModel());
        data = data.replace(/icons_mapping_/g, 'icons.mapping>');
        data = JSON.parse(data.replace('icons_enableMapping', 'icons>enableMapping'));

        this.__P_21_3.put(null, data);

        this.__P_21_3.addListenerOnce('putSuccess', this.close, this);
      },
      _initConfigRestClient: function _initConfigRestClient() {
        var description = {
          'get': {
            method: 'GET',
            url: '/rest/config-descriptions/' + this.__P_21_1
          }
        };
        var config = this.__P_21_2 = new qx.io.rest.Resource(description);
        var client = cv.TemplateEngine.getInstance().visu;
        config.addListener('getSuccess', function (ev) {
          this._createForm(ev.getRequest().getResponse());
        }, this);
        config.configureRequest(function (req) {
          req.setRequestHeader('Content-Type', 'application/json');

          if (client instanceof cv.io.openhab.Rest) {
            client.authorize(req);
          }
        });
        config.get();

        this._initStore(this.__P_21_0);
      },
      _createForm: function _createForm(config) {
        if (config && Object.prototype.hasOwnProperty.call(config, 'parameters') && Array.isArray(config.parameters)) {
          this._createChildControl('title');

          var form = this.getChildControl('form');
          config.parameters.forEach(function (param) {
            var field;

            switch (param.type) {
              case 'TEXT':
                field = new qx.ui.form.TextField();

                if (param.defaultValue) {
                  field.setPlaceholder(param.defaultValue);
                }

                break;

              case 'BOOLEAN':
                field = new qx.ui.form.CheckBox();
                field.setValue(param.defaultValue === 'true');
                break;
            }

            if (param.readOnly) {
              field.setReadOnly(true);
            }

            if (param.required) {
              field.setRequired(true);
            }

            field.setToolTipText(param.description);
            field.addListener('changeValue', this._onFormFieldChange, this);
            form.add(field, param.label, null, param.name, null, param);
          }, this);
          var renderer = new cv.plugins.openhab.renderer.Single(form);

          if (cv.Config.guessIfProxied()) {
            renderer.setBottomText(this.tr('The CometVisu seems to be delivered by a proxied webserver. Changing configuration values might not have the expected effect. Please proceed only if you know what you are doing.'));
            renderer.getChildControl('bottom-text').set({
              padding: 10,
              textAlign: 'center',
              font: 'bold'
            });
          }

          renderer.addButton(this.getChildControl('cancel-button'));
          renderer.addButton(this.getChildControl('save-button'));

          this._addAt(renderer, 1);

          var controller = new qx.data.controller.Form(null, form);

          this._store.bind('model', controller, 'model');

          this.setModified(false);
        }
      },
      _onFormFieldChange: function _onFormFieldChange() {
        var modified = false;
        var items = this.getChildControl('form').getItems();
        Object.getOwnPropertyNames(items).some(function (name) {
          // noinspection EqualityComparisonWithCoercionJS
          if (this.__P_21_6[name] != items[name].getValue()) {
            // jshint ignore:line
            this.debug(name + ' has changed from ' + this.__P_21_6[name] + ' to ' + items[name].getValue());
            modified = true;
            return true;
          }

          return false;
        }, this);
        this.setModified(modified);
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case 'title':
            control = new qx.ui.basic.Label(this.tr('openHAB backend settings'));
            control.set({
              font: 'bold',
              marginBottom: 5,
              allowGrowX: true,
              decorator: 'window-caption'
            });

            this._addAt(control, 0);

            break;

          case 'form':
            control = new qx.ui.form.Form();
            break;

          case 'cancel-button':
            control = new qx.ui.form.Button(qx.locale.Manager.tr('Cancel'));
            control.addListener('execute', this.close, this);
            break;

          case 'save-button':
            control = new qx.ui.form.Button(qx.locale.Manager.tr('Save'));
            control.addListener('execute', this._saveConfig, this);
            this.bind('modified', control, 'enabled');
            break;
        }

        return control || cv.plugins.openhab.Settings.prototype._createChildControlImpl.base.call(this, id, hash);
      },
      close: function close() {
        this.setVisibility('excluded');
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_21_2", "__P_21_3", '__root', '_store', '_window');
    }
  });
  cv.plugins.openhab.Settings.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Settings.js.map?dt=1648710475315