/* Page.js
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
 * Creates a new sub page and adds a corresponding link to the current page.
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.ui.structure.pure.Page', {
  extend: cv.ui.structure.pure.AbstractWidget,

  include: [cv.ui.common.HasChildren, cv.ui.common.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct(props) {
    this.__waitForProperties = ['showNavbarTop', 'showNavbarBottom', 'showNavbarLeft', 'showNavbarRight'];

    super(props);

    this.addListener('changeVisible', this._onChangeVisible, this);

    // prevent listening to the first message to the GA in the first second
    // as it might be of the trigger type and still be in the knxd cache
    this.__inhibitGA4Startup = setTimeout(() => {
      this.__inhibitGA4Startup = null;
    }, 1000);

    // break out of the constructor
    new qx.util.DeferredCall(function () {
      const parentPage = this.getParentPage();
      if (!parentPage) {
        this.__waitForProperties = [];
      } else {
        this.debug('binding navbar visibility from ' + parentPage.getPath() + ' to ' + this.getPath());
      }
      [
        ['showTopNavigation', true],
        ['showFooter', true],
        ['showNavbarTop', false],
        ['showNavbarBottom', false],
        ['showNavbarLeft', false],
        ['showNavbarRight', false]
      ].forEach(function (tuple) {
        const property = tuple[0];
        const defaultValue = tuple[1];
        if (this['get' + property.charAt(0).toUpperCase() + property.slice(1)]() === null) {
          // inherit from parent
          if (parentPage) {
            parentPage.bind(property, this, property);
          } else {
            // we have not parent page, because we are the root page, use the default value
            this['set' + property.charAt(0).toUpperCase() + property.slice(1)](defaultValue);
          }
        }
        if (!parentPage) {
          this.setInitialized(true);
        }
      }, this);
    }, this).schedule();

    if (this.getAddress()) {
      this._initOnCreate = true;
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    allPages: '',

    /**
     * Append the complete generated HTML code to the DOM tree at the end of the generation process
     */
    createFinal() {
      // special function - only for pages!
      const target = cv.ui.structure.pure.Controller.getInstance().getRenderTarget();
      document.querySelector(target).innerHTML = this.allPages;
      qx.event.message.Bus.unsubscribe('setup.dom.append', this.createFinal, this);
    }
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    initialized: {
      check: 'Boolean',
      init: false,
      event: 'changeInitialized'
    },

    anonymous: {
      refine: true,
      init: true
    },

    name: {
      check: 'String',
      init: '',
      nullable: true
    },

    showTopNavigation: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowTopNavigation'
    },

    showFooter: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowFooter'
    },

    showNavbarTop: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowNavbarTop',
      apply: '_applyNavbarVisibility'
    },

    showNavbarBottom: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowNavbarBottom',
      apply: '_applyNavbarVisibility'
    },

    showNavbarLeft: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowNavbarLeft',
      apply: '_applyNavbarVisibility'
    },

    showNavbarRight: {
      check: 'Boolean',
      nullable: true,
      event: 'changeShowNavbarRight',
      apply: '_applyNavbarVisibility'
    },

    backdropAlign: {
      init: '50% 50%',
      nullable: true
    },

    backdropType: { check: 'String', nullable: true },
    linkVisible: { check: 'Boolean', init: true, nullable: true },
    size: { check: 'String', nullable: true },
    backdrop: { check: 'String', nullable: true }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __waitForProperties: null,
    __colspanClass: null,
    __normalizedDomId: null,
    __inhibitGA4Startup: null,

    _applyNavbarVisibility(value, old, name) {
      if (value !== null) {
        const i_name = this.__waitForProperties.indexOf(name);
        if (i_name !== -1) {
          this.__waitForProperties.splice(i_name, 1);
        }
        if (this.__waitForProperties.length === 0) {
          this.setInitialized(true);
        }
      }
    },

    /**
     * If the page gets visible the colspan sized must be checked
     * @param ev {Event}
     */
    _onChangeVisible(ev) {
      if (ev.getData()) {
        if (this.__colspanClass !== cv.ui.structure.pure.layout.Manager.COLSPAN_CLASS) {
          this.applyColumnWidths();
        }
        if (this.getBackdrop()) {
          cv.ui.structure.pure.layout.ResizeHandler.invalidateBackdrop();
        }
      }
    },

    /**
     * Set children column widths
     */
    applyColumnWidths() {
      cv.ui.structure.pure.layout.Manager.applyColumnWidths('#' + this.getPath(), false);

      this.__colspanClass = cv.ui.structure.pure.layout.Manager.COLSPAN_CLASS;
    },

    // overridden
    getDomString() {
      const pageType = this.getPageType();

      const subpageClass = this.getFlavour() ? ' flavour_' + this.getFlavour() : '';
      let subpage = '<div class="page type_' + pageType + subpageClass + '" id="' + this.getPath() + '">';
      let container = '<div class="clearfix"><h1>' + this.getName() + '</h1>';

      if (pageType === '2d') {
        let size = 'width:100%;height:100%;';
        switch (this.getSize()) {
          case 'fixed':
            size += 'object-fit:none;';
            if (this.getBackdropAlign()) {
              size += 'object-position:' + this.getBackdropAlign() + ';';
            }
            break;

          case 'contained':
            size += 'object-fit:contain;';
            if (this.getBackdropAlign()) {
              size += 'object-position:' + this.getBackdropAlign() + ';';
            }
            break;

          default: // default: assume scaled
        }

        const backdrop = this.getBackdrop();
        if (backdrop) {
          container +=
            '<' +
            this.getBackdropType() +
            ' src="' +
            qx.util.ResourceManager.getInstance().toUri(backdrop) +
            '" style="position: absolute; top: 0px; left: 0px;z-index:-1;' +
            size +
            '"/>';
        }
      } /* ---Disable 3D for 0.8---
      else if (pageType === "3d" && false) {
      var floorplan = JSFloorPlan3D( container, backdrop );
      floorplan.moveToRoom( 'Underground', false, true, false );
      container.data( 'JSFloorPlan3D', floorplan );
      container.find('canvas').css({position: 'absolute', top: '0px', left: '0px', 'z-index':'-1', width:'100%',height:'100%'});
      subpage.click( {JSFloorPlan3D:floorplan,callback:function(event){
      var j = this.JSFloorPlan3D;
      j.moveToRoom( j.getState('showFloor'), event.room.room, true, true, function(){
      container.trigger( 'update3d', j );
      });
      }}, floorplan.translateMouseEvent );
      $(window).bind( 'resize', function(){ floorplan.resize($('.page').width(), $('.page').height(), true);} );
      if (page.getAttribute('azimut')) {
      cv.TemplateEngine.getInstance().addAddress( page.getAttribute('azimut'), path + '_' );
      address[ page.getAttribute('azimut') ] = [ 'DPT:9.001', 0, 'azimut' ];
      }
      if (page.getAttribute('elevation')) {
      cv.TemplateEngine.getInstance().addAddress( page.getAttribute('elevation'), path + '_' );
      address[ page.getAttribute('elevation') ] = [ 'DPT:9.001', 0, 'elevation' ];
      };
      if (page.getAttribute('floor')) {
      cv.TemplateEngine.getInstance().addAddress( page.getAttribute('floor'), path + '_' );
      address[ page.getAttribute('floor') ] = [ 'DPT:5.004', 0, 'floor' ];
      };
      $( childs ).each( function(i,a){
      if( this.tagName === 'filter' )
      {
      var floorFilter = $(this).attr('floor');
      var roomFilter  = $(this).attr('room');
      childs.splice( i, 1 );                 // remove filter element
      $(this).children().each( function(j){  // and add it's children
      $(this).find('layout').attr({floorFilter:floorFilter,roomFilter:roomFilter});
      childs.splice( i+j, 0, this );
      });
      }
      });
      } */

      container += this.getChildrenDomString();
      subpage += container + '</div></div>';
      cv.ui.structure.pure.Page.allPages = subpage + cv.ui.structure.pure.Page.allPages;
      return undefined;
    },

    _update(address, data) {
      // widgetData  = cv.data.Model.getInstance().getWidgetDataByElement( element );
      // var value = this.defaultValueHandling( ga, data, widgetData );
      // var type = widgetData.address[ ga ][2];
      // switch( type )
      // {
      //   case 'azimut':
      //     widgetData.JSFloorPlan3D.setState('currentAzimut', value, true);
      //     element.trigger( 'update3d', widgetData.JSFloorPlan3D );
      //     break;
      //
      //   case 'elevation':
      //     widgetData.JSFloorPlan3D.setState('currentElevation', value, true);
      //     element.trigger( 'update3d', widgetData.JSFloorPlan3D );
      //     break;
      //
      //   case 'floor':
      //     widgetData.JSFloorPlan3D.moveToRoom( value, false, true, true, function(){
      //       element.trigger( 'update3d', widgetData.JSFloorPlan3D );
      //     });
      //     break;
      //
      //   default:

      if (this.__inhibitGA4Startup !== null) {
        // ignore first bus message during this timeout
        clearTimeout(this.__inhibitGA4Startup);
        this.__inhibitGA4Startup = null;
        return;
      }

      const value = this.applyTransform(address, data);
      const filters = this.getAddress()[address]?.clients ?? '';
      let filterMatch = parseInt(data) === 1; // fallback for old behavior
      if (cv.Config.clientID !== null && filters !== '') {
        // apply filter
        filterMatch = false;
        for (const filter of filters.split(',')) {
          const [, id, , triggerValue] = filter.match(/ *([^: ]+) *(: *([^ ]+))? */);
          if (id === cv.Config.clientID || (id.at(-1) === '*' && id.substring(0, id.length-1) === cv.Config.clientID.substring(0, id.length-1))) {
            // the clientID matches the filter
            if (triggerValue === undefined || triggerValue === `${value}`) {
              // the value matches the filter as well
              filterMatch = true;
            }
          }
        }
      }
      if (filterMatch) {
        cv.Application.structureController.scrollToPage(this.getPath());
        // TODO: the page used to send a '0' when the page was switched.
        // But as that was completely hard coded it is now disabled to prevent
        // any side effects. It is also not documented.
        // When the infrastructure for bus initiated page switches is moved
        // from using the attribute `ga` to a full blown `address` element
        // it can be activated again by respecting the `write` mode.
        //this.sendToBackend('0');
      }
      // }
    },

    sendToBackend(value) {
      if (this.getAddress) {
        const list = this.getAddress();
        for (let id in list) {
          if (Object.prototype.hasOwnProperty.call(list, id)) {
            const address = list[id];
            const client = cv.io.BackendConnections.getClient(address.backendType);
            if (cv.data.Model.isWriteAddress(address) && client) {
              client.write(id, cv.Transform.encode(address, value));
            }
          }
        }
      }
    }
  },

  defer(statics) {
    qx.event.message.Bus.subscribe('setup.dom.append', statics.createFinal, statics);
  }
});
