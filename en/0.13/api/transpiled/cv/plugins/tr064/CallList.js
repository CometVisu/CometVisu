(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "cv.IconHandler": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {},
      "cv.util.ScriptLoader": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* CallList.js
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
   * The TR-064 plugin and widget creates a interface to routers that are
   * configured by the TR-064 protocol, like the well known Fritz!Box routers.
   *
   * The protocol is described at: https://avm.de/service/schnittstellen/
   *
   * @author Christian Mayer
   * @since 0.11.0
   * @asset(plugins/tr064/*)
   */

  qx.Class.define('cv.plugins.tr064.CallList', {
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.Refresh, cv.ui.common.Update],
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(props) {
      var _this = this;
      cv.ui.structure.pure.AbstractWidget.constructor.call(this, props);
      this.__P_24_0 = {};
      this.addListenerOnce('domReady', function () {
        _this.refreshCalllist('initial');
      });
    },
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       * @return {Map} extracted data from config element as key/value map
       */
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.pure.WidgetParser.parseFormat(xml, path);
        cv.parser.pure.WidgetParser.parseAddress(xml, path);
        cv.parser.pure.WidgetParser.parseRefresh(xml, path);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          device: {},
          max: {
            transform: function transform(value) {
              return +value;
            }
          },
          columns: {
            "default": 'type;date;nameOrCaller;tam'
          },
          TAM: {
            "default": 'phone_answering'
          },
          TAMColor: {
            "default": ''
          },
          TAMwait: {
            "default": 'control_reload'
          },
          TAMwaitColor: {
            "default": ''
          },
          TAMplay: {
            "default": 'audio_play'
          },
          TAMplayColor: {
            "default": ''
          },
          TAMstop: {
            "default": 'phone_answering'
          },
          TAMstopColor: {
            "default": ''
          },
          typeIncoming: {
            "default": 'phone_call_in'
          },
          typeIncomingColor: {
            "default": ''
          },
          typeMissed: {
            "default": 'phone_missed_in'
          },
          typeMissedColor: {
            "default": ''
          },
          typeOutgoing: {
            "default": 'phone_call_out'
          },
          typeOutgoingColor: {
            "default": ''
          },
          typeActiveIncoming: {
            "default": 'phone_ring_in'
          },
          typeActiveIncomingColor: {
            "default": ''
          },
          typeRejectedIncoming: {
            "default": 'phone_call_end_in'
          },
          typeRejectedIncomingColor: {
            "default": ''
          },
          typeActiveOutgoing: {
            "default": 'phone_ring_out'
          },
          typeActiveOutgoingColor: {
            "default": ''
          },
          typeUnknown: {
            "default": 'text_question_mark'
          },
          typeUnknownColor: {
            "default": ''
          }
        };
      }
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      tr064ListRefreshed: 'qx.event.type.Event' // event to support unit test
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      device: {
        check: 'String',
        init: ''
      },
      max: {
        check: 'Number',
        init: 0
      },
      columns: {
        check: 'String'
      },
      TAM: {
        check: 'String'
      },
      TAMColor: {
        check: 'String'
      },
      TAMwait: {
        check: 'String'
      },
      TAMwaitColor: {
        check: 'String'
      },
      TAMplay: {
        check: 'String'
      },
      TAMplayColor: {
        check: 'String'
      },
      TAMstop: {
        check: 'String'
      },
      TAMstopColor: {
        check: 'String'
      },
      typeIncoming: {
        check: 'String'
      },
      typeIncomingColor: {
        check: 'String'
      },
      typeMissed: {
        check: 'String'
      },
      typeMissedColor: {
        check: 'String'
      },
      typeOutgoing: {
        check: 'String'
      },
      typeOutgoingColor: {
        check: 'String'
      },
      typeActiveIncoming: {
        check: 'String'
      },
      typeActiveIncomingColor: {
        check: 'String'
      },
      typeRejectedIncoming: {
        check: 'String'
      },
      typeRejectedIncomingColor: {
        check: 'String'
      },
      typeActiveOutgoing: {
        check: 'String'
      },
      typeActiveOutgoingColor: {
        check: 'String'
      },
      typeUnknown: {
        check: 'String'
      },
      typeUnknownColor: {
        check: 'String'
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_24_1: '',
      __P_24_2: undefined,
      __P_24_3: false,
      /**
       * Prevent warning "Reference values are shared across all instances"
       * as the keys are unique a share doesn't matter:
       * @lint ignoreReferenceField(__TAMeventAttached)
       */
      __P_24_0: null,
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor"><table class="TR064_calllist"><tr><td>Loading TR-064...</td></tr></table></div>';
      },
      _setupRefreshAction: function _setupRefreshAction() {
        var _this2 = this;
        this._timer = new qx.event.Timer(this.getRefresh());
        this._timer.addListener('interval', function () {
          if (!_this2.__P_24_3) {
            _this2.refreshCalllist('timer');
          }
        });
        this._timer.start();
      },
      _update: function _update(address, value) {
        if (!this.__P_24_3) {
          this.refreshCalllist('update');
        }
      },
      _displayCalllist: function _displayCalllist() {
        var self = this;
        var clLi = this.getDomElement().getElementsByClassName('TR064_calllist')[0];
        var sid = this.__P_24_1 ? this.__P_24_1.replace(/.*sid=/, '') : '';
        var html = '';
        var types = {
          0: {
            name: this.getTypeUnknown(),
            color: this.getTypeUnknownColor()
          },
          1: {
            name: this.getTypeIncoming(),
            color: this.getTypeIncomingColor()
          },
          2: {
            name: this.getTypeMissed(),
            color: this.getTypeMissedColor()
          },
          3: {
            name: this.getTypeOutgoing(),
            color: this.getTypeOutgoingColor()
          },
          9: {
            name: this.getTypeActiveIncoming(),
            color: this.getTypeActiveIncomingColor()
          },
          10: {
            name: this.getTypeRejectedIncoming(),
            color: this.getTypeRejectedIncomingColor()
          },
          11: {
            name: this.getTypeActiveOutgoing(),
            color: this.getTypeActiveOutgoingColor()
          }
        };
        this.__P_24_2.forEach(function (cl) {
          var audio = '';
          var type = cl.Type in types ? types[cl.Type] : types[0];
          if (cl.Path) {
            audio = "<audio preload=\"none\"><source src=\"resource/plugins/tr064/proxy.php?device=" + self.getDevice() + '&uri=' + cl.Path + '%26sid=' + sid + '">' + '</audio>' + '<div class="tam clickable">' + cv.IconHandler.getInstance().getIconElement(self.getTAM(), '*', '*', self.getTAMColor(), '', '', true) + '</div>';
          }
          html += '<tr>';
          self.getColumns().split(';').forEach(function (col) {
            switch (col) {
              case 'type':
                html += '<td>' + cv.IconHandler.getInstance().getIconElement(type.name, '*', '*', type.color, '', '', true) + '</td>';
                break;
              case 'date':
                html += '<td>' + cl.Date + '</td>';
                break;
              case 'name':
                html += '<td>' + cl.Name + '</td>';
                break;
              case 'caller':
                html += '<td>' + cl.Caller + '</td>';
                break;
              case 'nameOrCaller':
                if (cl.Name !== '') {
                  html += '<td>' + cl.Name + '</td>';
                } else {
                  html += '<td>' + cl.Caller + '</td>';
                }
                break;
              case 'tam':
                html += '<td>' + audio + '</td>';
                break;
            }
          });
          html += '</tr>';
        });
        clLi.innerHTML = html;
        var tamList = clLi.getElementsByClassName('tam');
        for (var i = 0; i < tamList.length; i++) {
          tamList[i].addEventListener('click', function () {
            self.__P_24_4(this);
          });
        }
      },
      /**
       * Fetch the TR-064 resource
       *   /upnp/control/x_contact urn:dslforum-org:service:X_AVM-DE_OnTel:1
       *   GetCallList
       */
      _getCallListURI: function _getCallListURI() {
        var self = this;
        var url = 'resource/plugins/tr064/soap.php?device=' + this.getDevice() + '&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList';
        window.fetch(url).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          // else:
          cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
            title: qx.locale.Manager.tr('TR-064 communication error'),
            severity: 'urgent',
            message: qx.locale.Manager.tr('Reading URL "%1" failed with status "%2": "%2"', response.url, response.status, response.statusText)
          });
          self.__P_24_1 = '<fail>';
          return null;
        }).then(function (data) {
          if (typeof data === 'string') {
            self.__P_24_1 = data;
            self.refreshCalllist('getCallListURI');
          } else {
            cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
              title: qx.locale.Manager.tr('TR-064 communication response error'),
              severity: 'urgent',
              message: qx.locale.Manager.tr('Reading URL "%1" failed with content: "%2"', url, JSON.stringify(data))
            });
            self.__P_24_1 = '<fail>';
          }
        });
      },
      refreshCalllist: function refreshCalllist(source) {
        this.__P_24_3 = true;
        if (this.__P_24_1 === '<fail>') {
          return; // this problem won't fix anymore during this instance
        }

        if (this.__P_24_1 === '') {
          this._getCallListURI();
          return;
        }
        var self = this;
        var url = 'resource/plugins/tr064/proxy.php?device=' + this.getDevice() + '&uri=' + this.__P_24_1 + '%26max=' + this.getMax();
        window.fetch(url).then(function (response) {
          if (response.ok) {
            return response.text();
          }
          // else:
          cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
            title: qx.locale.Manager.tr('TR-064 communication error'),
            severity: 'urgent',
            message: qx.locale.Manager.tr('Reading URL "%1" failed with status "%2": "%2"', response.url, response.status, response.statusText)
          });
          return '<xml/>';
        }).then(function (str) {
          return new window.DOMParser().parseFromString(str, 'text/xml');
        }).then(function (data) {
          self.__P_24_2 = [];
          var itemList = data.getElementsByTagName('Call');
          for (var i = 0; i < itemList.length; i++) {
            var childrenList = itemList[i].children;
            var entry = {};
            for (var ii = 0; ii < childrenList.length; ii++) {
              entry[childrenList[ii].nodeName] = childrenList[ii].textContent;
            }
            self.__P_24_2.push(entry);
          }
          self._displayCalllist();
          self.__P_24_3 = false;
          self.fireEvent('tr064ListRefreshed');
        })["catch"](function (error) {
          cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
            title: qx.locale.Manager.tr('TR-064 communication error'),
            severity: 'urgent',
            message: qx.locale.Manager.tr('refreshCalllist() error: "%1"', JSON.stringify(error))
          });
          self.error('TR-064 refreshCalllist() error:', error);
        });
      },
      /**
       * The EventListener for click on the TAM button.
       * @param element
       */
      __P_24_4: function __P_24_4(element) {
        var self = this;
        var audio = element.previousElementSibling;
        if (!this.__P_24_0[audio]) {
          audio.addEventListener('ended', function () {
            self.__P_24_5(element);
          });
          this.__P_24_0[audio] = true;
        }
        if (audio.readyState < 4) {
          // not ready yet
          this.__P_24_6(element);
        }
        if (audio.paused) {
          var playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(function () {
              self.__P_24_7(element);
            })["catch"](function () {
              /*NOP*/
            });
          }
        } else {
          audio.pause();
          audio.currentTime = 0;
          this.__P_24_5(element);
        }
      },
      __P_24_6: function __P_24_6(element) {
        element.innerHTML = cv.IconHandler.getInstance().getIconElement(this.getTAMwait(), '*', '*', this.getTAMwaitColor(), '', '', true);
      },
      __P_24_7: function __P_24_7(element) {
        element.innerHTML = cv.IconHandler.getInstance().getIconElement(this.getTAMplay(), '*', '*', this.getTAMplayColor(), '', '', true);
      },
      __P_24_5: function __P_24_5(element) {
        element.innerHTML = cv.IconHandler.getInstance().getIconElement(this.getTAMstop(), '*', '*', this.getTAMstopColor(), '', '', true);
      }
    },
    defer: function defer(statics) {
      var loader = cv.util.ScriptLoader.getInstance();
      loader.addStyles('plugins/tr064/tr064.css');
      cv.parser.pure.WidgetParser.addHandler('calllist', cv.plugins.tr064.CallList);
      cv.ui.structure.WidgetFactory.registerClass('calllist', statics);
    }
  });
  cv.plugins.tr064.CallList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CallList.js.map?dt=1692560683684