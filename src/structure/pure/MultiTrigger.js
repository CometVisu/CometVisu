/* MultiTrigger.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * TODO: complete docs
 * @module structure/pure/Multitrigger
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.MultiTrigger', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Operate, cv.role.Update],

    has: {
      showstatus: {is: 'r', init: false},
      button1label: {is: 'r'},
      button1value: {is: 'r'},
      button2label: {is: 'r'},
      button2value: {is: 'r'},
      button3label: {is: 'r'},
      button3value: {is: 'r'},
      button4label: {is: 'r'},
      button4value: {is: 'r'}
    },

    my: {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            showstatus: {
              transform: function (value) {
                return value === 'true';
              }
            },
            button1label: {},
            button1value: {},
            button2label: {},
            button2value: {},
            button3label: {},
            button3value: {},
            button4label: {},
            button4value: {}
          }
        },

        makeAddressListFn: function (src, transform, mode, variant) {
          return [true, variant];
        }
      }
    },

    after: {
      initialize: function (data) {
        if (this.getMapping()) {
          cv.MessageBroker.my.subscribe("setup.dom.finished", function () {
            var
              $actor = this.getActor(),
              v0 = this.defaultValueHandling(undefined, this.getButton1value(), data),
              $v0 = $actor.filter(':eq(0)'),
              v1 = this.defaultValueHandling(undefined, this.getButton1value(), data),
              $v1 = $actor.filter(':eq(1)'),
              v2 = this.defaultValueHandling(undefined, this.getButton1value(), data),
              $v2 = $actor.filter(':eq(2)'),
              v3 = this.defaultValueHandling(undefined, this.getButton1value(), data),
              $v3 = $actor.filter(':eq(3)');
            $v0.empty();
            this.defaultValue2DOM(v0, function (e) {
              $v0.append(e)
            });
            $v1.empty();
            this.defaultValue2DOM(v1, function (e) {
              $v1.append(e)
            });
            $v2.empty();
            this.defaultValue2DOM(v2, function (e) {
              $v2.append(e)
            });
            $v3.empty();
            this.defaultValue2DOM(v3, function (e) {
              $v3.append(e)
            });
          }, this);
        }
      }
    },

    augment: {
      getDomString: function () {
        // create the actor
        var ret_val = '<div class="actor_container" style="float:left">';

        if (this.getButton1label()) {
          ret_val += '<div class="actor switchUnpressed">';
          ret_val += '<div class="value">' + this.getButton1label() + '</div>';
          ret_val += '</div>';
        }

        if (this.getButton2label()) {
          ret_val += '<div class="actor switchUnpressed">';
          ret_val += '<div class="value">' + this.getButton2label() + '</div>';
          ret_val += '</div>';
          ret_val += '<br/>';
        }

        if (this.getButton3label()) {
          ret_val += '<div class="actor switchUnpressed">';
          ret_val += '<div class="value">' + this.getButton3label() + '</div>';
          ret_val += '</div>';
        }

        if (this.getButton4label()) {
          ret_val += '<div class="actor switchUnpressed">';
          ret_val += '<div class="value">' + this.getButton4label() + '</div>';
          ret_val += '</div>';
          ret_val += '<br/>';
        }
        return ret_val + '</div></div>';
      }
    },

    before: {
      action: function (path, actor, isCanceled, event) {
        this.defaultButtonUpAnimation(path, actor);
      }
    },

    methods: {

      // overridden, only transform the value, do not apply it to DOM
      processIncomingValue: function(address, data) {
        var transform = this.getAddress()[ address ][0];
        return templateEngine.transformDecode( transform, data );
      },

      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function (value) {
        var that = this;
        this.getDomElement().find('.actor').each(function () {
          var $this = $(this),
            index = $this.index() < 3 ? $this.index() + 1 : $this.index(),
            isPressed = value === that['getButton'+index+'value']();
          $this.removeClass(isPressed ? 'switchUnpressed' : 'switchPressed')
            .addClass(isPressed ? 'switchPressed' : 'switchUnpressed');
        });
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function (path, actor, isCanceled, event) {
        var
          $actor = $(actor),
          index = $actor.index() < 3 ? $actor.index()+1 : $actor.index();

        return this['getButton'+index+'value']();
      },

      downaction: function (path, actor, isCanceled, event) {
        this.defaultButtonDownAnimation();
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("multitrigger", cv.structure.pure.MultiTrigger);
}); // end define