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
 * The protocol is described at: https://avm.de/service/schnittstellen/
 * 
 * @author Christian Mayer
 * @since 0.11.0
 */
/*

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
        'device': {},
        'max': {transform: function(value) { return +value;}},
        'columns': { 'default': 'type;date;nameOrCaller;tam' },
        'TAM':          { 'default': 'phone_answering' },
        'TAMColor':     { 'default': '' },
        'TAMwait':      { 'default': 'control_reload' },
        'TAMwaitColor': { 'default': '' },
        'TAMplay':      { 'default': 'audio_play' },
        'TAMplayColor': { 'default': '' },
        'TAMstop':      { 'default': 'phone_answering' },
        'TAMstopColor': { 'default': '' },
        'typeIncomming':              { 'default': 'phone_call_in' },
        'typeIncommingColor':         { 'default': '' },
        'typeMissed':                 { 'default': 'phone_missed_in' },
        'typeMissedColor':            { 'default': '' },
        'typeOutgoing':               { 'default': 'phone_call_out' },
        'typeOutgoingColor':          { 'default': '' },
        'typeActiveIncomming':        { 'default': 'phone_ring_in' },
        'typeActiveIncommingColor':   { 'default': '' },
        'typeRejectedIncomming':      { 'default': 'phone_call_end_in' },
        'typeRejectedIncommingColor': { 'default': '' },
        'typeActiveOutgoing':         { 'default': 'phone_ring_out' },
        'typeActiveOutgoingColor':    { 'default': '' },
        'typeUnknown':                { 'default': 'text_question_mark' },
        'typeUnknownColor':           { 'default': '' }
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
    max: {
      check: 'Number',
      init: 0
    },
    columns:      { check: 'String' },
    TAM:          { check: 'String' },
    TAMColor:     { check: 'String' },
    TAMwait:      { check: 'String' },
    TAMwaitColor: { check: 'String' },
    TAMplay:      { check: 'String' },
    TAMplayColor: { check: 'String' },
    TAMstop:      { check: 'String' },
    TAMstopColor: { check: 'String' },
    typeIncomming:              { check: 'String' },
    typeIncommingColor:         { check: 'String' },
    typeMissed:                 { check: 'String' },
    typeMissedColor:            { check: 'String' },
    typeOutgoing:               { check: 'String' },
    typeOutgoingColor:          { check: 'String' },
    typeActiveIncomming:        { check: 'String' },
    typeActiveIncommingColor:   { check: 'String' },
    typeRejectedIncomming:      { check: 'String' },
    typeRejectedIncommingColor: { check: 'String' },
    typeActiveOutgoing:         { check: 'String' },
    typeActiveOutgoingColor:    { check: 'String' },
    typeUnknown:                { check: 'String' },
    typeUnknownColor:           { check: 'String' }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __calllistUri: '',
    __calllistList: undefined,
    __TAMeventAttached: {},
    
    _getInnerDomString: function () {
      //this.refreshCalllist();
      this.update();
      return '<div class="actor"><table class="TR064_calllist"></table></div>';
    },
    _onDomReady: function() {
    },
    _update: function(address, value) {
      if( undefined === this.__calllistList )
      {
        this.refreshCalllist();
        return;
      }
      
      var 
        self = this,
        clLi = this.getDomElement().getElementsByClassName('TR064_calllist')[0],
        sid  = this.__calllistUri.replace(/.*sid=/,''),
        html = '',
        types = {
          0:  { name: this.getTypeUnknown()          , color: this.getTypeUnknownColor()           },
          1:  { name: this.getTypeIncomming()        , color: this.getTypeIncommingColor()         },
          2:  { name: this.getTypeMissed()           , color: this.getTypeMissedColor()            },
          3:  { name: this.getTypeOutgoing()         , color: this.getTypeOutgoingColor()          },
          9:  { name: this.getTypeActiveIncomming () , color: this.getTypeActiveIncommingColor()   },
          10: { name: this.getTypeRejectedIncomming(), color: this.getTypeRejectedIncommingColor() },
          11: { name: this.getTypeActiveOutgoing()   , color: this.getTypeActiveOutgoingColor()    }
        };
        /*
        types = {
          0:  { name: this.getTypeUnknown          , color: this.getTypeColorUnknown           },
          1:  { name: this.getTypeIncomming        , color: this.getTypeIncommingColor         },
          2:  { name: this.getTypeMissed           , color: this.getTypeMissedColor            },
          3:  { name: this.getTypeOutgoing         , color: this.getTypeOutgoingColor          },
          9:  { name: this.getTypeActiveIncomming  , color: this.getTypeActiveIncommingColor   },
          10: { name: this.getTypeRejectedIncomming, color: this.getTypeRejectedIncommingColor },
          11: { name: this.getTypeActiveOutgoing   , color: this.getTypeActiveOutgoingColor    }
        };
        */
      
      this.__calllistList.forEach(function(cl){
        console.log(cl);
        var 
          audio = '',
          type = (cl.Type in types) ? types[cl.Type] : types[0];
        
        if( cl.Path )
        {
          audio = '<audio preload="none">'
            + '<source src="resource/plugins/TR064/proxy.php?device=' + self.getDevice() + '&uri='+cl.Path+'%26sid='+sid+'">'
            + '</audio>'
            + '<div class="tam">'
            + cv.IconHandler.getInstance().getIconText( self.getTAM(), '*', '*', self.getTAMColor() )
            + '</div>';
        }
        
        html += '<tr>';
        self.getColumns().split(';').forEach( function(col){
          switch( col )
          {
            case 'type':
//              html += '<td>' + cv.IconHandler.getInstance().getIconText( type.name(), '*', '*', type.color() )  + '</td>;'
              html += '<td>' + cv.IconHandler.getInstance().getIconText( type.name, '*', '*', type.color )  + '</td>';
              break;
            
            case 'date':
              html += '<td>' + cl.Date   + '</td>';
              break;
            
            case 'name':
              html += '<td>' + cl.Name   + '</td>';
              break;
            
            case 'caller':
              html += '<td>' + cl.Caller + '</td>';
              break;
            
            case 'nameOrCaller':
              if( cl.Name !== '' )
                html += '<td>' + cl.Name   + '</td>';
              else
                html += '<td>' + cl.Caller + '</td>';
              break;
            
            case 'tam':
              html += '<td>' + audio + '</td>'
              break;
            
          }
        });
        html += '</tr>';
      });
      clLi.innerHTML = html;
      //// ES6:
      // for( let tam of clLi.getElementsByClassName('tam') )
      //   tam.addEventListener("click", function(){ self.__playTAM(this); } );
      //// ES5:
      var tamList = clLi.getElementsByClassName('tam');
      for( var i = 0; i < tamList.length; i++ )
        tamList[i].addEventListener("click", function(){ self.__playTAM(this); } );
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
        url = 'resource/plugins/TR064/proxy.php?device=' + this.getDevice() + '&uri=' + this.__calllistUri + '%26max=' + this.getMax();
        
      fetch( url )
        .then( function( response ) {
          return response.text(); 
        })
        .then( function( str ) {
          return (new window.DOMParser()).parseFromString(str, "text/xml");
        })
        .then( function( data ) {
          self.__calllistList = [];
          /**
          ES6:
          for( let item of data.getElementsByTagName('Call') ) {
            var entry = {};
            for( let node of item.children ) {
              entry[node.nodeName] = node.textContent;
            }
            self.__calllistList.push( entry );
          }
          ---
          ES5:
          */
          var itemList = data.getElementsByTagName('Call');
          for( var i = 0; i < itemList.length; i++ ) {
            var
              childrenList = itemList[i].children,
              entry = {};
            for( var ii = 0; ii < childrenList.length; ii++ ) {
              entry[childrenList[ii].nodeName] = childrenList[ii].textContent;
            }
            self.__calllistList.push( entry );
          }
          self._update();
        })
        .catch( function( error ) { console.error( error ); } );
    },
    
    /**
     * The EventListener for click on the TAM button.
     */
    __playTAM: function( element ) {
      var
        self = this,
        audio = element.previousElementSibling;
      
      if( !this.__TAMeventAttached[audio] )
      {
        audio.addEventListener( 'ended', function(){self.__TAMstop(element)} );
        this.__TAMeventAttached[audio] = true;
      }
      
      if( audio.readyState < 4 ) // not ready yet
        this.__TAMwait(element);
      
      if( audio.paused )
      {
        var playPromise = audio.play();
        if( playPromise !== undefined )
          playPromise
            .then(function(){self.__TAMplay(element)})
            .catch(function(){/*NOP*/});
      } else {
        audio.pause();
        audio.currentTime = 0;
        this.__TAMstop(element);
      }
    },
    
    __TAMwait: function( element ) {
      element.innerHTML = cv.IconHandler.getInstance().getIconText( this.getTAMwait(), '*', '*', this.getTAMwaitColor() );
    },
    
    __TAMplay: function( element ) {
      element.innerHTML = cv.IconHandler.getInstance().getIconText( this.getTAMplay(), '*', '*', this.getTAMplayColor() );
    },
    
    __TAMstop: function( element ) {
      element.innerHTML = cv.IconHandler.getInstance().getIconText( this.getTAMstop(), '*', '*', this.getTAMstopColor() );
    }
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('resource/plugins/TR064/TR064.css');
    cv.parser.WidgetParser.addHandler("calllist", cv.plugins.TR064.calllist);
    cv.ui.structure.WidgetFactory.registerClass("calllist", statics);
  }

});