/* UrlTrigger.js 
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
 *
 * @module structure/pure/UrlTrigger
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/MessageBroker', 'lib/cv/role/HasAddress', 'lib/cv/role/UpdateDOM'], function() {
  "use strict";

  Class('cv.structure.pure.UrlTrigger', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.Operate,
      cv.role.HasAddress,
      cv.role.HasAnimatedButton,
      cv.role.UpdateDOM
    ],

    has: {
      sendValue: { is: 'r', init: 0 },
      params: { is: 'r', init: '' },
      url: { is: 'r' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'value' : { target: 'sendValue', default: 0 },
            'params'  : { default: '' },
            'url': { }
          };
        }
      }
    },

    after : {
      initialize : function () {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          this.updateDOM(this.getSendValue());
        }, this);
      }
    },

    augment: {
      getDomString: function () {
        var actor = '<div class="actor switchUnpressed ';
        if ( this.getAlign() )
          actor += this.getAlign();
        actor += '"><div class="value"></div></div>';
        return actor;
      }
    },

    methods: {

      action: function( path, actor, isCanceled ) {
        if( isCanceled ) return;

        $.ajax({
          type: "GET",
          datatype: "html",
          data: encodeURI(this.getParams()),
          url: this.getUrl(),
          success: function(data){
            //maybe do something useful with the response?
          }
        });
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("urltrigger", cv.structure.pure.UrlTrigger);
}); // end define
