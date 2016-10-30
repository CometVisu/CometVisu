/* DesignToggle.js 
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
 * Adds a button to toggle through the available designs
 * @widget_example
 * <designtoggle>
 *   <layout colspan="6"/>
 *   <label>Change Design</label>
 * </designtoggle>
 *
 * @module structure/pure/DesignToggle
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.5.3 (2010)
 */
define( ['_common', 'lib/cv/role/Operate'], function() {
  "use strict";

  Class('cv.structure.pure.DesignToggle', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Operate],

    has: {
      availableDesigns: { is: 'r', init: [] }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {};
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor switchUnpressed"><div class="value">' + templateEngine.clientDesign + '</div></div>';
      }
    },

    after: {
      initialize: function(props) {
        $.getJSON("./designs/get_designs.php",function(d) {
          this.availableDesigns = d;
        }.bind(this));
      }
    },

    methods: {
      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function () {
        return (this.getBasicValue() == this.getOffValue() ? this.getOnValue() : this.getOffValue());
      },
      getAddress: function() {
        return [];
      },
      /**
       * Action performed when the widget got clicked
       *
       * @method action
       * @param {String} path - Internal path of the widget
       * @param {Element} actor - DOMElement
       * @param {Boolean} isCanceled - If true the action does nothing
       */
      action: function( path, actor, isCanceled ) {
        this.defaultButtonUpAnimationInheritAction( path, actor );
        if( isCanceled ) return;

        var designs = this.getAvailableDesigns();

        var oldDesign = $('.value',this.getDomElement()).text();
        var newDesign = designs[ (designs.indexOf(oldDesign) + 1) % designs.length ];

        var URL = this.getLocation();
        var regexp = new RegExp("design="+oldDesign);
        if (URL.search(regexp) != -1) { // has URL-parameter design
          this.setLocation(URL.replace(regexp, "design="+newDesign));
        }
        else {
          if (URL.indexOf("?") != -1) { // has other parameters, append design
            this.setLocation(URL+"&design="+newDesign);
          }
          else { // has now parameters
            this.setLocation(URL+"?design="+newDesign);
          }
        }
      },

      downaction: function(path, actor) {
        this.defaultButtonDownAnimationInheritAction(path, actor);
      },
      /**
       * Wrapper for getting the `window.location.href` value
       *
       * @method getLocation
       * @return {String} URI of the page the browser is currently showing
       */
      getLocation : function() {
        return window.location.href;
      },

      /**
       * Changes `window.location.href` to trigger a redirect
       *
       * @method setLocation
       * @param {String} loc - URI of the location the browser should be redirected to
       */
      setLocation : function(loc) {
        window.location.href = loc;
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("designtoggle", cv.structure.pure.DesignToggle);
}); // end define