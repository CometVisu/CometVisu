(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.util.Function": {},
      "qx.util.ResourceManager": {},
      "cv.ui.PopupHandler": {},
      "cv.TemplateEngine": {},
      "cv.Transform": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Clock.js 
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
   * @asset(plugins/clock/*)
   */
  qx.Class.define('cv.plugins.Clock', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Update],

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(props) {
      props.value = new Date();
      cv.ui.structure.AbstractWidget.constructor.call(this, props);
    },

    /*
    ******************************************************
    PROPERTIES
    ******************************************************
    */
    properties: {
      src: {
        check: 'String'
      },
      srcPopup: {
        check: 'String'
      },
      titlePopup: {
        check: 'String'
      },
      hide24h: {
        check: 'Boolean',
        init: false
      },
      hide24hPopup: {
        check: 'Boolean',
        init: false
      },
      hideAMPM: {
        check: 'Boolean',
        init: false
      },
      hideAMPMPopup: {
        check: 'Boolean',
        init: false
      },
      hideDigits: {
        check: 'Boolean',
        init: false
      },
      hideDigitsPopup: {
        check: 'Boolean',
        init: false
      },
      hideSeconds: {
        check: 'Boolean',
        init: false
      },
      hideSecondsPopup: {
        check: 'Boolean',
        init: false
      },
      sendOnFinish: {
        check: 'Boolean',
        init: false
      }
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
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        var transformValueTrue = function transformValueTrue(value) {
          return value === 'true';
        };

        return {
          'src': {
            'default': 'plugins/clock/clock_pure.svg'
          },
          'src_popup': {
            target: 'srcPopup',
            'default': ''
          },
          'title_popup': {
            target: 'titlePopup',
            'default': ''
          },
          'hide_24h': {
            target: 'hide24h',
            'default': false,
            transform: transformValueTrue
          },
          'hide_24h_popup': {
            target: 'hide24hPopup',
            'default': false,
            transform: transformValueTrue
          },
          'hide_am_pm': {
            target: 'hideAMPM',
            'default': false,
            transform: transformValueTrue
          },
          'hide_am_pm_popup': {
            target: 'hideAMPMPopup',
            'default': false,
            transform: transformValueTrue
          },
          'hide_digits': {
            target: 'hideDigits',
            'default': false,
            transform: transformValueTrue
          },
          'hide_digits_popup': {
            target: 'hideDigitsPopup',
            'default': false,
            transform: transformValueTrue
          },
          'hide_seconds': {
            target: 'hideSeconds',
            'default': false,
            transform: transformValueTrue
          },
          'hide_seconds_popup': {
            target: 'hideSecondsPopup',
            'default': false,
            transform: transformValueTrue
          },
          'send_on_finish': {
            target: 'sendOnFinish',
            'default': false,
            transform: transformValueTrue
          }
        };
      },
      getElements: function getElements(svg, hide24h, hideAMPM, hideDigits, hideSeconds) {
        var elements = {
          hour24: svg.querySelector('#Hour24'),
          hour: svg.querySelector('#Hour'),
          minute: svg.querySelector('#Minute'),
          second: svg.querySelector('#Second'),
          am: svg.querySelector('#AM'),
          pm: svg.querySelector('#PM'),
          digits: svg.querySelector('#Digits')
        };
        var tspan;

        while (elements.digits !== null && (tspan = elements.digits.querySelector('tspan')) !== null) {
          elements.digits = tspan;
        }

        var hour24Group = svg.querySelector('#Hour24Group');

        if (hide24h && hour24Group !== null) {
          hour24Group.setAttribute('display', 'none');
        }

        if (hideAMPM) {
          if (elements.am !== null) {
            elements.am.setAttribute('display', 'none');
            elements.am = null;
          }

          if (elements.pm !== null) {
            elements.pm.setAttribute('display', 'none');
            elements.pm = null;
          }
        }

        if (hideDigits && elements.digits !== null) {
          elements.digits.setAttribute('display', 'none');
        }

        if (hideSeconds && elements.second !== null) {
          elements.second.setAttribute('display', 'none');
        }

        return elements;
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_8_0: null,
      // cached access to the SVG in the DOM
      __P_8_1: null,
      // cached access to the individual clock parts
      __P_8_2: 0,
      // is the handle currently dragged?
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor" style="width:100%;height:100%"></div>';
      },
      _onDomReady: function _onDomReady() {
        var _this = this;

        var args = arguments;
        this.__P_8_3 = cv.util.Function.throttle(this.dragAction, 250, {
          trailing: true
        }, this);
        var uri = qx.util.ResourceManager.getInstance().toUri(this.getSrc());
        var uriPopup = this.getSrcPopup();
        var promises = [window.fetch(uri)];

        if ('' !== uriPopup) {
          uriPopup = qx.util.ResourceManager.getInstance().toUri(uriPopup);
          promises.push(window.fetch(uriPopup));
        }

        Promise.all(promises).then(function (responses) {
          var result = [];

          if (!responses[0].ok) {
            throw new Error('Not 2xx response for URI "' + uri + '"');
          } else {
            result.push(responses[0].text());
          }

          if ('' !== uriPopup) {
            if (!responses[1].ok) {
              throw new Error('Not 2xx response for popup URI "' + uriPopup + '"');
            } else {
              result.push(responses[1].text());
            }
          }

          return Promise.all(result);
        }).then(function (texts) {
          var actor = _this.getActor();

          actor.innerHTML = texts[0];
          var svg = actor.firstElementChild; // make sure that the SVG fits exactly to the available space

          if (!svg.getAttribute('viewBox')) {
            // fix SVGs that don't contain a viewBox
            var width = svg.getAttribute('width') || 300;
            var height = svg.getAttribute('height') || 150;
            svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
          }

          svg.setAttribute('width', '100%');
          svg.setAttribute('height', '100%');
          _this.__P_8_1 = [cv.plugins.Clock.getElements(svg, _this.getHide24h(), _this.getHideAMPM(), _this.getHideDigits(), _this.getHideSeconds())];

          if (texts.length > 1) {
            var popup = document.createElement('div');

            var title = _this.getTitlePopup();

            popup.setAttribute('style', 'width:100%;height:100%;position:absolute;');
            popup.innerHTML = texts[1];
            svg.addEventListener('click', function () {
              cv.ui.PopupHandler.showPopup('clock', {
                title: title,
                content: popup
              });
            });
            svg = popup.firstElementChild; // make sure that also this SVG fits exactly to the available space

            if (!svg.getAttribute('viewBox')) {
              // fix SVGs that don't contain a viewBox
              var _width = svg.getAttribute('width') || 300;

              var _height = svg.getAttribute('height') || 150;

              svg.setAttribute('viewBox', '0 0 ' + _width + ' ' + _height);
            }

            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');

            _this.__P_8_1.push(cv.plugins.Clock.getElements(svg, _this.getHide24hPopup(), _this.getHideAMPMPopup(), _this.getHideDigitsPopup(), _this.getHideSecondsPopup()));
          }

          svg.setAttribute('style', 'touch-action: none'); // prevent scroll interference

          var HotSpotHour = svg.getElementById('HotSpotHour');

          if (HotSpotHour) {
            HotSpotHour.addEventListener('pointerdown', _this);
          }

          var HotSpotMinute = svg.getElementById('HotSpotMinute');

          if (HotSpotMinute) {
            HotSpotMinute.addEventListener('pointerdown', _this);
          }

          var HotSpotSecond = svg.getElementById('HotSpotSecond');

          if (HotSpotSecond) {
            HotSpotSecond.addEventListener('pointerdown', _this);
          }

          _this.__P_8_0 = svg; // call parents _onDomReady method

          cv.plugins.Clock.prototype._onDomReady.base.call(_this);
        })["catch"](function (error) {
          console.error('There has been a problem with the reading of the clock SVG:', error);
        });
      },
      // overridden
      initListeners: function initListeners() {},
      // overridden
      _update: function _update(address, data, isDataAlreadyHandled) {
        var value = isDataAlreadyHandled ? data : this.defaultValueHandling(address, data);
        var time = value.split(':');

        this._updateHands(time[0], time[1], time[2]);
      },
      handleEvent: function handleEvent(event) {
        var dragMode = {
          none: 0,
          hour: 1,
          minute: 2,
          second: 3
        };

        switch (event.type) {
          case 'pointerdown':
            switch (event.target.id) {
              case 'HotSpotHour':
                this.__P_8_2 = dragMode.hour;
                break;

              case 'HotSpotMinute':
                this.__P_8_2 = dragMode.minute;
                break;

              case 'HotSpotSecond':
                this.__P_8_2 = dragMode.second;
                break;

              default:
                this.__P_8_2 = dragMode.none;
                return;
              // early exit
            }

            document.addEventListener('pointermove', this);
            document.addEventListener('pointerup', this);
            event.preventDefault();
            event.stopPropagation();
            break;

          case 'pointermove':
            if (this.__P_8_2 === dragMode.none) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (event.buttons > 0) {
              this.dragHelper(event);
              break;
            }

          // jshint ignore:line
          // pass through to end drag when no buttons are pressed anymore

          case 'pointerup':
          case 'pointercancel':
            this.dragHelper(event);
            this.__P_8_2 = dragMode.none;
            document.removeEventListener('pointermove', this);
            document.removeEventListener('pointerup', this);
            break;
        }

        if (!this.getSendOnFinish() || event.type === 'pointerup') {
          this.__P_8_3.call();
        }
      },
      dragHelper: function dragHelper(event) {
        var dragMode = {
          none: 0,
          hour: 1,
          minute: 2,
          second: 3
        };

        var CTM = this.__P_8_0.getScreenCTM(); // get the Current Transformation Matrix


        var x = (event.clientX - CTM.e) / CTM.a - 60;
        var y = 60 - (event.clientY - CTM.f) / CTM.d;
        var angle = (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
        var time = this.getValue();
        var minutes;

        switch (this.__P_8_2) {
          case dragMode.hour:
            var oldHours = time.getHours();
            var pm = oldHours >= 12;
            var hours = Math.floor(angle / 30);
            minutes = angle % 30 * 2;

            if (oldHours % 12 > 9 && hours < 3) {
              if (pm) {
                pm = false;
                time.setDate(time.getDate() + 1);
              } else {
                pm = true;
              }
            } else if (hours > 9 && oldHours % 12 < 3) {
              if (pm) {
                pm = false;
              } else {
                pm = true;
                time.setDate(time.getDate() - 1);
              }
            }

            time.setHours(hours + pm * 12);
            time.setMinutes(minutes);
            break;

          case dragMode.minute:
            if (this.getHideSeconds()) {
              minutes = Math.round(angle / 6);
            } else {
              minutes = Math.floor(angle / 6);
            }

            var oldMinutes = time.getMinutes();

            if (oldMinutes > 45 && minutes < 15) {
              time.setHours(time.getHours() + 1);
            } else if (minutes > 45 && oldMinutes < 15) {
              time.setHours(time.getHours() - 1);
            }

            time.setMinutes(minutes);
            time.setSeconds(angle % 6 * 10);
            break;

          case dragMode.second:
            var seconds = Math.round(angle / 6) % 60;
            var oldSeconds = time.getSeconds();

            if (oldSeconds > 45 && seconds < 15) {
              time.setMinutes(time.getMinutes() + 1);
            } else if (seconds > 45 && oldSeconds < 15) {
              time.setMinutes(time.getMinutes() - 1);
            }

            time.setSeconds(seconds);
            break;
        }

        if (this.getHideSeconds()) {
          time.setSeconds(0);
        }

        this._updateHands(time.getHours(), time.getMinutes(), time.getSeconds());
      },
      dragAction: function dragAction() {
        var address = this.getAddress();

        for (var addr in address) {
          if (address[addr].mode === true) {
            continue;
          } // skip read only


          cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(address[addr].transform, this.getValue()));
        }
      },
      _updateHands: function _updateHands(hour, minute, second) {
        var _this2 = this;

        this.__P_8_1.forEach(function (e) {
          var showSeconds = true;

          if (e.hour !== null) {
            if (showSeconds) {
              e.hour.setAttribute("transform", 'rotate(' + (hour % 12 * 360 / 12 + minute * 30 / 60 + second * 30 / 60 / 60) + ',0,0)');
            } else {
              e.hour.setAttribute("transform", 'rotate(' + (hour % 12 * 360 / 12 + minute * 30 / 60) + ',0,0)');
            }
          }

          if (e.minute !== null) {
            if (showSeconds) {
              e.minute.setAttribute("transform", 'rotate(' + (minute * 6 + second * 6 / 60) + ',0,0)');
            } else {
              e.minute.setAttribute("transform", 'rotate(' + minute * 6 + ',0,0)');
            }
          }

          if (e.second !== null) {
            e.second.setAttribute("transform", 'rotate(' + second * 6 + ',0,0)');
          }

          if (e.hour24 !== null) {
            e.hour24.setAttribute("transform", 'rotate(' + (hour % 24 * 360 / 24 + minute * 15 / 60) + ',0,0)');
          }

          if (e.am !== null) {
            e.am.setAttribute('display', hour < 12 ? '' : 'none');
          }

          if (e.pm !== null) {
            e.pm.setAttribute('display', hour < 12 ? 'none' : '');
          }

          if (e.digits !== null) {
            if (_this2.getHideSeconds()) {
              e.digits.textContent = sprintf('%02d:%02d', hour, minute);
            } else {
              e.digits.textContent = sprintf('%02d:%02d:%02d', hour, minute, second);
            }
          }
        });
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("clock", cv.plugins.Clock);
      cv.ui.structure.WidgetFactory.registerClass("clock", statics);
    }
  });
  cv.plugins.Clock.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Clock.js.map?dt=1619362515864