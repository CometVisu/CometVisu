/* NavBar.js 
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
 * @module structure/pure/NavBar
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( [
  '_common',
  'lib/cv/role/HasChildren'
], function() {
  "use strict";

  Class('cv.structure.pure.NavBar', {
    isa: cv.structure.pure.AbstractWidget,

    does: cv.role.HasChildren,

    has: {
      name      : { is: 'r' },
      scope     : { is: 'r', init: -1 },
      width     : { is: 'r', init: 300 },
      position  : { is: 'r', init: 'left' },
      dynamic   : { is: 'r', init: false }
    },

    my: {
      has: {
        isNotSubscribed  : true,
        navbarTop        : '',
        navbarLeft       : '',
        navbarRight      : '',
        navbarBottom     : '',
        $navbarLeftSize  : $( '#navbarLeft'  ).data('size'),
        $navbarRightSize : $( '#navbarRight' ).data('size')
      },

      methods: {

        createDefaultWidget: function( widgetType, $n, path, flavour, pageType ) {

          var classes = "navbar clearfix";
          if ( $n.attr('flavour') ) {
            classes += "flavour_"+$n.attr('flavour');
          }// sub design choice

          // store scope globally
          var id = path.split("_"); id.pop();
          var pos = $n.attr('position') || 'left';
          templateEngine.widgetDataInsert( id.join('_')+'_'+pos+'_navbar', {
            'scope'   : $n.attr('scope') || -1
          });

          return templateEngine.widgetDataInsert( this.getStoragePath($n, path), {
            'path'    : path,
            'classes' : classes,
            '$$type'  : widgetType
          });
        },

        getAttributeToPropertyMappings: function () {
          return {
            'scope'   : { default: -1 },
            'name'    : {},
            'dynamic' : { transform: function(value) {
              return value === "true";
            }},
            'width'   : { default: 300 },
            'position': { default: 'left' }
          };
        }
      }
    },

    methods: {
      getGlobalPath: function() {
        var id = this.getPath().split("_"); id.pop();
        return id.join('_')+'_'+this.getPosition()+'_navbar';
      },

      getDomString: function() {

        var container = '<div class="' + this.getClasses() + '" id="' + this.getGlobalPath() + '">';
        if( this.getName() ) {
          container += '<h2>' + this.getName() + '</h2>';
        }
        container += this.getChildrenDomString();

        container+='</div>';

        // add this to the navbars in DOM not inside the page
        switch( this.getPosition() )
        {
          case 'top':
            this.my.navbarTop += container;
            break;

          case 'left':
            this.my.navbarLeft += container;
            var thisSize = this.my.$navbarLeftSize || this.getWidth(); // FIXME - only a temporal solution
            if (this.getDynamic()) {
              templateEngine.pagePartsHandler.navbarSetSize( 'left', thisSize );
            }
            break;

          case 'right':
            this.my.navbarRight += container;
            var thisSize = this.my.$navbarRightSize || this.getWidth(); // FIXME - only a temporal solution
            if (this.getDynamic()) {
              templateEngine.pagePartsHandler.navbarSetSize( 'right', thisSize );
            }
            break;

          case 'bottom':
            this.my.navbarBottom += container;
            break;
        }
        templateEngine.pagePartsHandler.navbars[this.getPosition()].dynamic |= this.getDynamic();

        if( this.my.isNotSubscribed )
        {
          this.my.isNotSubscribed = false;
          cv.MessageBroker.my.subscribe("setup.dom.finished", function(){
            if( this.my.navbarTop    ) $( '#navbarTop'    ).append( this.my.navbarTop    );
            if( this.my.navbarLeft   ) $( '#navbarLeft'   ).append( this.my.navbarLeft   );
            if( this.my.navbarRight  ) $( '#navbarRight'  ).append( this.my.navbarRight  );
            if( this.my.navbarBottom ) $( '#navbarBottom' ).append( this.my.navbarBottom );
          }, this, 100);
        }

        return '';
      }
    }
  });
  cv.xml.Parser.addHandler("navbar", cv.structure.pure.NavBar);
}); // end define