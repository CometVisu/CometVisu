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
      "qx.util.ResourceManager": {},
      "cv.data.Model": {},
      "cv.TemplateEngine": {},
      "cv.Transform": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      },
      "cv.util.ScriptLoader": {
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
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path);
        return data;
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor" style="width:200px; height: 200px"></div>';
      },
      _onDomReady: function _onDomReady() {
        //this.base(arguments);
        var args = arguments;
        var $actor = $(this.getActor());
        $actor.svg({
          loadURL: qx.util.ResourceManager.getInstance().toUri('plugins/clock/clock_pure.svg'),
          onLoad: function (svg) {
            $(svg.root().getElementById('HotSpotHour')).draggable().bind('drag', {
              type: 'hour',
              actor: $actor
            }, this.dragHelper.bind(this)).bind('dragstop', {
              actor: $actor
            }, this.dragAction.bind(this));
            $(svg.root().getElementById('HotSpotMinute')).draggable().bind('drag', {
              type: 'minute',
              actor: $actor
            }, this.dragHelper.bind(this)).bind('dragstop', {
              actor: $actor
            }, this.dragAction.bind(this)); // call parents _onDomReady method

            cv.plugins.Clock.prototype._onDomReady.base.call(this);

            Object.getOwnPropertyNames(this.getAddress()).filter(function (address) {
              return cv.data.Model.isReadAddress(this.getAddress()[address]);
            }.bind(this)).forEach(function (address) {
              this._update(address, this.getValue().getHours() + ':' + this.getValue().getMinutes() + ':00', true);
            }, this);
          }.bind(this)
        });
      },
      // overridden
      initListeners: function initListeners() {},
      // overidden
      _update: function _update(address, data, isDataAlreadyHandled) {
        var element = this.getDomElement();
        var value = isDataAlreadyHandled ? data : this.defaultValueHandling(address, data);
        var svg = element.querySelector('svg');
        var time = value.split(':');
        var hourElem = svg.querySelector('#Hour');
        var minuteElem = svg.querySelector('#Minute');

        if (hourElem !== undefined && minuteElem !== undefined) {
          hourElem.setAttribute("transform", 'rotate(' + (time[0] % 12 * 360 / 12 + time[1] * 30 / 60) + ',50,50)');
          minuteElem.setAttribute("transform", 'rotate(' + time[1] * 6 + ',50,50)');
        } else {
          console.error('Error: trying to update unknown clock SVG elements #Hour and/or #Minute');
        }
      },
      dragHelper: function dragHelper(event) {
        var $container = event.data.actor;
        var $svg = $container.find('svg');
        var x = event.originalEvent.pageX - $svg.offset().left - 50;
        var y = 50 - (event.originalEvent.pageY - $svg.offset().top);
        var angle = (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
        var time = this.getValue();
        var minutes;

        if (event.data.type === 'hour') {
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
        } else {
          // minute
          minutes = Math.round(angle / 6);
          var oldMinutes = time.getMinutes();

          if (oldMinutes > 45 && minutes < 15) {
            time.setHours(time.getHours() + 1);
          } else if (minutes > 45 && oldMinutes < 15) {
            time.setHours(time.getHours() - 1);
          }

          time.setMinutes(minutes);
        }

        $container.find('#Hour').attr('transform', 'rotate(' + (time.getHours() % 12 * 360 / 12 + time.getMinutes() * 30 / 60) + ',50,50)');
        $container.find('#Minute').attr('transform', 'rotate(' + time.getMinutes() * 6 + ',50,50)');
      },
      dragAction: function dragAction() {
        var address = this.getAddress();

        for (var addr in address) {
          if (address[addr][1] === true) {
            continue;
          } // skip read only


          cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(address[addr][0], this.getValue()));
        }
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("clock", cv.plugins.Clock);
      cv.ui.structure.WidgetFactory.registerClass("clock", statics);
      var loader = cv.util.ScriptLoader.getInstance();
      {
        loader.addScripts(['resource/libs/jquery-ui.min.js', 'resource/libs/jquery.svg.min.js'], [0]);
      }
    }
  });
  cv.plugins.Clock.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Clock.js.map?dt=1588445433131