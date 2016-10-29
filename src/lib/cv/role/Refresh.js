/* _common.js
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

define(['joose', 'lib/cv/utils/Timer'], function() {
  Role("cv.role.Refresh", {

    requires: ['getDomElement'],

    has: {
      refresh : { is: 'r', init: 0 }
    },

    my: {
      after: {
        parse: function( xml, path ) {
          var data = templateEngine.widgetDataGet(path);
          $e = $(xml);
          data.refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
        }
      }
    },
    after : {
      initialize : function (props) {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          this.setupRefreshAction();
        }, this);
      }
    },

    methods: {

      setupRefreshAction: function() {
        if (this.getRefresh() && this.getRefresh() > 0) {
          var
            element = this.getDomElement(),
            target = $('img', element)[0] || $('iframe', element)[0],
            src = target.src;
          if (src.indexOf('?') < 0)
            src += '?';

          cv.utils.Timer.start(this.getRefresh(), function() {
            this.refreshAction(target, src);
          }, this);
        }
      },

      refreshAction: function(target, src) {
        /*
         * Special treatment for (external) iframes: we need to clear it and reload
         * it in another thread as otherwise stays blank for some targets/sites and
         * src = src doesnt work anyway on external This creates though some
         * "flickering" so we avoid to use it on images, internal iframes and others
         */
        var parenthost = window.location.protocol + "//" + window.location.host;
        if (target.nodeName == "IFRAME" && src.indexOf(parenthost) != 0) {
          target.src = '';
          cv.utils.Timer.once(function () {
            target.src = src;
          });
        } else {
          target.src = src + '&' + new Date().getTime();
        }
      }
    }
  });
});