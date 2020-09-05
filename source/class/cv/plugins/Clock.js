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
    hide24h: {
      check: 'Boolean',
      init: false
    },
    hideAMPM: {
      check: 'Boolean',
      init: false
    },
    hideDigits: {
      check: 'Boolean',
      init: false
    },
    hideSeconds: {
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
        'hide_24h': {
          target: 'hide24h',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
        },
        'hide_am_pm': {
          target: 'hideAMPM',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
        },
        'hide_digits': {
          target: 'hideDigits',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
        },
        'hide_seconds': {
          target: 'hideSeconds',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
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
    __hour24Elem: null,
    __hourElem: null,
    __minuteElem: null,
    __secondElem: null,
    __amElem: null,
    __pmElem: null,
    __digitsElem: null,
    __inDrag: 0,       // is the handle currently dragged?

    _getInnerDomString: function () {
      return '<div class="actor" style="width:100%;height:100%"></div>';
    },

    _onDomReady: function () {
      let args = arguments;

      this.__throttled = cv.util.Function.throttle(this.dragAction, 250, {trailing: true}, this);

      let uri = qx.util.ResourceManager.getInstance().toUri(this.getSrc());
      window.fetch(uri)
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

          svg.setAttribute('style', 'touch-action: none' ); // prevent scroll interference

          let HotSpotHour = svg.getElementById('HotSpotHour');
          if(HotSpotHour) { HotSpotHour.addEventListener('pointerdown', this); }
          let HotSpotMinute = svg.getElementById('HotSpotMinute');
          if(HotSpotMinute) { HotSpotMinute.addEventListener('pointerdown', this); }
          let HotSpotSecond = svg.getElementById('HotSpotSecond');
          if(HotSpotSecond) { HotSpotSecond.addEventListener('pointerdown', this); }
          this.__svg = svg;
          this.__hour24Elem = svg.querySelector('#Hour24');
          let hour24Group = svg.querySelector('#Hour24Group');
          this.__hourElem = svg.querySelector('#Hour');
          this.__minuteElem = svg.querySelector('#Minute');
          this.__secondElem = svg.querySelector('#Second');
          this.__amElem = svg.querySelector('#AM');
          this.__pmElem = svg.querySelector('#PM');
          this.__digitsElem = svg.querySelector('#Digits');
          let tspan;
          while( this.__digitsElem !== null && (tspan = this.__digitsElem.querySelector('tspan')) !== null ) {
            this.__digitsElem = tspan;
          }

          if( this.getHide24h() && hour24Group !== null ) {
            hour24Group.setAttribute( 'display', 'none' );
          }
          if( this.getHideAMPM() ) {
            if( this.__amElem !== null ) {
              this.__amElem.setAttribute( 'display', 'none' );
            }
            if( this.__pmElem !== null ) {
              this.__pmElem.setAttribute( 'display', 'none' );
            }
          }
          if( this.getHideDigits() && this.__digitsElem !== null ) {
            this.__digitsElem.setAttribute( 'display', 'none' );
          }
          if( this.getHideSeconds() && this.__secondElem !== null ) {
            this.__secondElem.setAttribute( 'display', 'none' );
          }

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
      let value = isDataAlreadyHandled ? data : this.defaultValueHandling(address, data);
      let time = value.split(':');
      this._updateHands( time[0], time[1], time[2] );
    },

    handleEvent: function (event) {
      const dragMode = {
        none: 0,
        hour: 1,
        minute: 2,
        second: 3
      };

      switch (event.type) {
        case 'pointerdown':
          switch(event.target.id) {
            case 'HotSpotHour':
              this.__inDrag = dragMode.hour;
              break;

            case 'HotSpotMinute':
              this.__inDrag = dragMode.minute;
              break;

            case 'HotSpotSecond':
              this.__inDrag = dragMode.second;
              break;

            default:
              this.__inDrag = dragMode.none;
              return; // early exit
          }
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          event.preventDefault();
          event.stopPropagation();
          break;

        case 'pointermove':
          if(this.__inDrag === dragMode.none) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if( event.buttons > 0 ) {
            this.dragHelper(event);
            break;
          } // jshint ignore:line
          // pass through to end drag when no buttons are pressed anymore

        case 'pointerup':
        case 'pointercancel':
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
      const dragMode = {
        none: 0,
        hour: 1,
        minute: 2,
        second: 3
      };

      let CTM = this.__svg.getScreenCTM(); // get the Current Transformation Matrix
      let x = (event.clientX - CTM.e) / CTM.a - 60;
      let y = 60 - (event.clientY - CTM.f) / CTM.d;
      let angle = (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;

      let time = this.getValue();
      let minutes;
      switch( this.__inDrag )
      {
        case dragMode.hour:
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
          break;

        case dragMode.minute:
          if( this.getHideSeconds() ) {
            minutes = Math.round(angle / 6);
          } else {
            minutes = Math.floor(angle / 6);
          }
          let oldMinutes = time.getMinutes();

          if (oldMinutes > 45 && minutes < 15) {
            time.setHours(time.getHours() + 1);
          }
          else if (minutes > 45 && oldMinutes < 15) {
            time.setHours(time.getHours() - 1);
          }
          time.setMinutes(minutes);
          time.setSeconds((angle % 6) * 10);
          break;

        case dragMode.second:
          let seconds = Math.round(angle / 6) % 60;
          let oldSeconds = time.getSeconds();

          if (oldSeconds > 45 && seconds < 15) {
            time.setMinutes(time.getMinutes() + 1);
          }
          else if (seconds > 45 && oldSeconds < 15) {
            time.setMinutes(time.getMinutes() - 1);
          }
          time.setSeconds(seconds);
          break;
      }
      if( this.getHideSeconds() ) {
        time.setSeconds( 0 );
      }
      this._updateHands( time.getHours(), time.getMinutes(), time.getSeconds() );
    },

    dragAction: function () {
      var address = this.getAddress();
      for (var addr in address) {
        if (address[addr][1] === true) { continue; } // skip read only
        cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(address[addr][0], this.getValue()));
      }
    },

    _updateHands: function ( hour, minute, second ) {
      let showSeconds = true;
      if( this.__hourElem !== null ) {
        if( showSeconds ) {
          this.__hourElem.setAttribute("transform", 'rotate(' + ((hour % 12) * 360 / 12 + minute * 30 / 60 + second * 30 / 60 / 60) + ',0,0)');
        } else {
          this.__hourElem.setAttribute("transform", 'rotate(' + ((hour % 12) * 360 / 12 + minute * 30 / 60) + ',0,0)');
        }
      }
      if( this.__minuteElem !== null ) {
        if( showSeconds ) {
          this.__minuteElem.setAttribute("transform", 'rotate(' + (minute * 6 + second * 6 / 60) + ',0,0)');
        } else {
          this.__minuteElem.setAttribute("transform", 'rotate(' + (minute * 6) + ',0,0)');
        }
      }
      if( this.__secondElem !== null ) {
        this.__secondElem.setAttribute("transform", 'rotate(' + (second * 6) + ',0,0)');
      }
      if( this.__hour24Elem !== null ) {
        this.__hour24Elem.setAttribute("transform", 'rotate(' + ((hour % 24) * 360 / 24 + minute * 15 / 60) + ',0,0)');
      }
      if( this.__amElem !== null && !this.getHideAMPM() ) {
        this.__amElem.setAttribute(  'display', hour < 12 ? '' : 'none' );
      }
      if( this.__pmElem !== null && !this.getHideAMPM() ) {
        this.__pmElem.setAttribute(  'display', hour < 12 ? 'none' : '' );
      }
      if( this.__digitsElem !== null ) {
        if( this.getHideSeconds() ) {
          this.__digitsElem.textContent = sprintf('%02d:%02d', hour, minute);
        } else {
          this.__digitsElem.textContent = sprintf('%02d:%02d:%02d', hour, minute, second);
        }
      }
    }
  },

  defer: function(statics) {
    cv.parser.WidgetParser.addHandler("clock", cv.plugins.Clock);
    cv.ui.structure.WidgetFactory.registerClass("clock", statics);
  }
});