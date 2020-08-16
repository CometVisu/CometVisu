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
  construct: function (props) {
    props.value = new Date();
    this.base(arguments, props);
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
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path);
      return data;
    },

    getAttributeToPropertyMappings: function () {
      return {
        'src': {
          'default': 'plugins/clock/clock_pure.svg'
        },
        'send_on_finish': {
          target: 'sendOnFinish',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
        }
      };
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __svg: null,       // cached access to the SVG in the DOM
    __inDrag: 0,       // is the handle currently dragged?

    _getInnerDomString: function () {
      return '<div class="actor" style="width:100%;height:100%"></div>';
    },

    _onDomReady: function () {
      let args = arguments;

      this.__throttled = cv.util.Function.throttle(this.dragAction, 250, {trailing: true}, this);

      let uri = qx.util.ResourceManager.getInstance().toUri(this.getSrc());
      fetch(uri)
        .then(response => {
          if(!response.ok)
          {
            throw new Error('Not 2xx response for URI "' + uri + '"');
          } else {
            return response.text();
          }
        })
        .then(text => {
          let actor = this.getActor();
          actor.innerHTML = text;
          let svg = actor.firstElementChild;

          // make sure that the SVG fits exactly to the available space
          if( !svg.getAttribute('viewBox') ) {
            // fix SVGs that don't contain a viewBox
            let width = svg.getAttribute('width') || 300;
            let height = svg.getAttribute('height') || 150;
            svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height );
          }
          svg.setAttribute('width', '100%' );
          svg.setAttribute('height', '100%' );

          svg.getElementById('HotSpotHour').addEventListener('pointerdown', this);
          svg.getElementById('HotSpotMinute').addEventListener('pointerdown', this);
          this.__svg = svg;

          // call parents _onDomReady method
          this.base(args);
        })
        .catch(error => {
          console.error('There has been a problem with the reading of the clock SVG:', error);
        });
    },

    // overridden
    initListeners: function () {},

    // overridden
    _update: function (address, data, isDataAlreadyHandled) {
      var element = this.getDomElement();
      var value = isDataAlreadyHandled ? data : this.defaultValueHandling(address, data);
      var svg = element.querySelector('svg');
      var time = value.split(':');
      var hourElem = svg.querySelector('#Hour');
      var minuteElem = svg.querySelector('#Minute');
      if( hourElem !== undefined && minuteElem !== undefined ) {
        hourElem.setAttribute("transform", 'rotate(' + ((time[0] % 12) * 360 / 12 + time[1] * 30 / 60) + ',50,50)');
        minuteElem.setAttribute("transform", 'rotate(' + (time[1] * 6) + ',50,50)');
      } else {
        console.error('Error: trying to update unknown clock SVG elements #Hour and/or #Minute');
      }
    },

    handleEvent: function (event) {
      const dragMode = {
        none: 0,
        hour: 1,
        minute: 2,
      };

      switch (event.type) {
        case 'pointerdown':
          switch(event.target.id) {
            case 'HotSpotMinute':
              this.__inDrag = dragMode.minute;
              break;

            case 'HotSpotHour':
              this.__inDrag = dragMode.hour;
              break;

            default:
              this.__inDrag = dragMode.none;
              return; // early exit
          }
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          break;

        case 'pointermove':
          if(this.__inDrag === dragMode.none) {
            return;
          }
          this.dragHelper(event);
          break;

        case 'pointerup':
          this.dragHelper(event);
          this.__inDrag = dragMode.none;
          document.removeEventListener('pointermove', this);
          document.removeEventListener('pointerup', this);
          break;
      }

      if (!this.getSendOnFinish() || event.type === 'pointerup') {
        this.__throttled.call();
      }
    },

    dragHelper: function (event) {
      let CTM = this.__svg.getScreenCTM(); // get the Current Transformation Matrix
      let x = (event.clientX - CTM.e) / CTM.a - 50;
      let y = 50 - (event.clientY - CTM.f) / CTM.d;
      let angle = (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;

      let time = this.getValue();
      let minutes;
      if (this.__inDrag === 1)  // 1 = hour
      {
        let oldHours = time.getHours();
        let pm = oldHours >= 12;
        let hours = Math.floor(angle / 30);
        minutes = (angle % 30) * 2;

        if (oldHours % 12 > 9 && hours < 3) {
          if (pm) {
            pm = false;
            time.setDate(time.getDate() + 1);
          }
          else {
            pm = true;
          }
        } else if (hours > 9 && oldHours % 12 < 3) {
          if (pm) {
            pm = false;
          }
          else {
            pm = true;
            time.setDate(time.getDate() - 1);
          }
        }

        time.setHours(hours + pm * 12);
        time.setMinutes(minutes);
      } else { // minute
        minutes = Math.round(angle / 6);
        let oldMinutes = time.getMinutes();

        if (oldMinutes > 45 && minutes < 15) {
          time.setHours(time.getHours() + 1);
        }
        else if (minutes > 45 && oldMinutes < 15) {
          time.setHours(time.getHours() - 1);
        }
        time.setMinutes(minutes);
      }
      this.__svg.getElementById('Hour').setAttribute('transform', 'rotate(' + ((time.getHours() % 12) * 360 / 12 + time.getMinutes() * 30 / 60) + ',50,50)');
      this.__svg.getElementById('Minute').setAttribute('transform', 'rotate(' + (time.getMinutes() * 6) + ',50,50)');
    },

    dragAction: function () {
      var address = this.getAddress();
      for (var addr in address) {
        if (address[addr][1] === true) { continue; } // skip read only
        cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(address[addr][0], this.getValue()));
      }
    }
  },

  defer: function(statics) {
    cv.parser.WidgetParser.addHandler("clock", cv.plugins.Clock);
    cv.ui.structure.WidgetFactory.registerClass("clock", statics);
  }
});