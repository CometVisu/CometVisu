/* calllist.js 
 * 
 * copyright (c) 2018, Christian Mayer and the CometVisu contributers.
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
 * The TR-064 plugin and widget creates a interface to routers that are
 * configured by the TR-064 protocol, like the well known Fritz!Box routers.
 * 
 * @author Christian Mayer
 * @since 0.11.0
 */
/*

https://avm.de/service/schnittstellen/
https://fritz.box:49443/tr64desc.xml

http://wiregate/CometVisuGit/source/resource/plugins/TR064/soap.php?device=fritzbox
&location=upnp/control/x_tam&uri=urn:dslforum-org:service:X_AVM-DE_TAM:1&fn=GetMessageList&p[]=NewIndex&v[]=0
&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetInfoByIndex&p[]=NewIndex&v[]=1
&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList
&location=upnp/control/wlanconfig1&uri=urn:dslforum-org:service:WLANConfiguration:1&fn=GetInfo

&location=&uri=&fn=&p[]=&v[]=

*/
qx.Class.define('cv.plugins.TR064.calllist', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  //construct: function(props) {
  //},

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
        'device': {}
      };
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    device: {
      check: 'String',
      init: ''
    },
    index: {
      check: 'Number',
      init: 0
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __calllistUri: '',
    
    _getInnerDomString: function () {
      this.refreshCalllist();
      return '<div class="actor"><div class="TR064">Liste</div></div>';
    },
    _onDomReady: function() {
    },
    _update: function(address, value) {
    },
    
    /**
     * Fetch the TR-064 resource
     *   /upnp/control/x_contact urn:dslforum-org:service:X_AVM-DE_OnTel:1 
     *   GetCallList
     */
    _getCallListURI: function() {
      var
        self = this,
        url = 'resource/plugins/TR064/soap.php?device=' + this.getDevice() + '&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList';
      
      fetch( url )
       // .then( function(response){ response.json().then( function(data){
        .then( function( response ) {
          return response.json(); 
        })
        .then( function( data ) {
          self.__calllistUri = data;
          self.refreshCalllist();
        });
    },

    refreshCalllist: function() {
      if( this.__calllistUri === '' )
      {
        this._getCallListURI();
        return;
      }
      
      var
        self = this,
        url = 'resource/plugins/TR064/proxy.php?device=' + this.getDevice() + '&uri=' + this.__calllistUri;
        
      fetch( url )
        .then( function( response ) {
          return response.text(); 
        })
        .then( function( str ) {
          return (new window.DOMParser()).parseFromString(str, "text/xml");
        })
        .then( function( data ) {
          console.log(data);
        });
    }
  },

  defer: function(statics) {
    cv.parser.WidgetParser.addHandler("calllist", cv.plugins.TR064.calllist);
    cv.ui.structure.WidgetFactory.registerClass("calllist", statics);
  }

});