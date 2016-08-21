/* TemplateEngine.js 
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
 * Main Template engine
 *
 * @author Christian Mayer
 * @since 2010
 * @module lib/TemplateEngine
 * @requires dependencies/jquery
 * @requires structure/pure
 * @requires config/structure_custom
 * @requires lib/TrickOMatic
 * @requires lib/PageHandler
 * @requires lib/PagePartsHandler
 * @requires lib/CometVisuClient
 * @requires lib/mockup/Client
 * @requires lib/EventHandler
 */

///////////////////////////////////////////////////////////////////////
//
//  Main:
//
define([
  'jquery', '_common', 'structure_custom', 'TrickOMatic', 'PageHandler', 'PagePartsHandler',
  'CometVisuClient', 'CometVisuMockup', 'EventHandler',
  'Compatibility', 'jquery-ui', 'strftime',
  'jquery.ui.touch-punch', 'jquery.svg.min', 'IconHandler', 
  'widget_break', 'widget_designtoggle',
  'widget_group', 'widget_rgb', 'widget_web', 'widget_image',
  'widget_imagetrigger', 'widget_include', 'widget_info', 'widget_infoaction', 'widget_infotrigger',
  'widget_line', 'widget_multitrigger', 'widget_navbar', 'widget_page', 
  'widget_pagejump', 'widget_refresh', 'widget_reload', 'widget_slide', 
  'widget_switch', 'widget_text', 'widget_toggle', 'widget_trigger', 
  'widget_pushbutton', 'widget_urltrigger', 'widget_unknown', 'widget_audio', 
  'widget_video', 'widget_wgplugin_info', 
  'TransformDefault', 'TransformKnx', 'TransformOpenHab'
], function( $, design, VisuDesign_Custom, Trick_O_Matic, PageHandler, PagePartsHandler, CometVisu, ClientMockup, EventHandler ) {
  "use strict";

  var instance;

  function TemplateEngine( undefined ) {
  var thisTemplateEngine = this;
  this.libraryVersion = 7;
  this.libraryCheck = true;
  if ($.getUrlVar('libraryCheck')) {
    this.libraryCheck = $.getUrlVar('libraryCheck') != 'false'; // true unless set to false
  }

  var loadReady = { page: false, plugins: false };
  function delaySetup( id ) {
    loadReady[ id ] = false;
    return function() {
      delete loadReady[ id ];
      setup_page();
    };
  };
  this.design = new VisuDesign_Custom();
  this.pagePartsHandler = new PagePartsHandler();
    
  this.eventHandler = new EventHandler(this);
  
  var rememberLastPage = false;
  this.currentPage = null;
  this.currentPageUnavailableWidth = -1;
  this.currentPageUnavailableHeight = -1;
  this.currentPageNavbarVisibility = null;
  
  // if true the whole widget reacts on click events
  // if false only the actor in the widget reacts on click events
  this.bindClickToWidget = false;
    
  // threshold where the mobile.css is loaded
  this.maxMobileScreenWidth = 480;
  // threshold where different colspans are used
  this.maxScreenWidthColspanS = 599;
  this.maxScreenWidthColspanM = 839;
  // use to recognize if the screen width has crossed the maxMobileScreenWidth
  var lastBodyWidth=0;

  var mappings = {}; // store the mappings
  var stylings = {}; // store the stylings
 
  var ga_list = {};
  this.widgetData = {}; // hash to store all widget specific data
  /**
   * Return (reference to) widgetData object by path.
   */
  this.widgetDataGet = function( path ) {
    return this.widgetData[ path ] || (this.widgetData[ path ] = {});
  };
  /**
   * Return (reference to) widget data by element
   */
  this.widgetDataGetByElement = function( element ) {
    var
      parent = $(element).parent(),
      path = parent.attr('id');
      
    if( path === undefined )
      path = parent.parent().attr('id');
    
    return this.widgetDataGet( path );
  };
  /**
   * Merge obj in the widgetData.
   */
  this.widgetDataInsert = function( path, obj ) {
    var thisWidgetData = this.widgetDataGet( path );
    
    for( var attrname in obj )
      thisWidgetData[ attrname ] = obj[ attrname ];
    
    return thisWidgetData;
  };
  
  /**
   * Structure where a design can set a default value that a widget or plugin
   * can use.
   * This is especially important for design relevant information like colors
   * that can not be set though CSS.
   * 
   * Useage: templateEngine.defaults.plugin.foo = {bar: 'baz'};
   */
  this.defaults = { widget: {}, plugin: {} };

  /**
   * Function to test if the path is in a valid form.
   * Note: it doesn't check if it exists!
   */
  var pathRegEx = /^id(_[0-9]+)+$/;

  this.callbacks = {}; // Hash of functions to call during page change
  this.main_scroll;
  this.old_scroll = '';
  this.visu;

  this.scrollSpeed;

  this.defaultColumns = 12;
  this.minColumnWidth = 120;
  
  this.enableAddressQueue = $.getUrlVar('enableQueue') ? true : false;
  
  this.backend = 'default';
  this.backendUrl;
  if ($.getUrlVar("backend")) {
    this.backend = $.getUrlVar("backend");
  }

  this.initBackendClient = function() {
    if ($.getUrlVar('testMode')) {
      thisTemplateEngine.visu = new ClientMockup();
      require(['TransformMockup'], function() {});
    }
    else if (thisTemplateEngine.backend=="oh") {
      thisTemplateEngine.visu = new CometVisu('openhab', this.backendUrl);
    }
    else if (thisTemplateEngine.backend=="oh2") {
      thisTemplateEngine.visu = new CometVisu('openhab2', this.backendUrl);
    } else {
      thisTemplateEngine.visu = new CometVisu(thisTemplateEngine.backend, this.backendUrl);
    }
    function update(json) {
      for( var key in json ) {
        //$.event.trigger('_' + key, json[key]);
        if( !(key in ga_list) )
          continue;
        
        var data = json[ key ];
        ga_list[ key ].forEach( function( id ){
          if( typeof id === 'string' )
          {
            var 
              element = document.getElementById( id ),
              type = element.dataset.type || 'page', // only pages have no datatype set
              updateFn = thisTemplateEngine.design.creators[ type ].update;
            if( updateFn )
            {
              var children = element.children;
              if( children[0] )
                updateFn.call( children[0], key, data );
              else
                console.log( element, children, type ); // DEBUG FIXME
            }
            //console.log( element, type, updateFn );
          } else if( typeof id === 'function' ) {
            id.call( key, data );
          }
        });
      }
    };
    thisTemplateEngine.visu.update = function(json) { // overload the handler
      profileCV( 'first data start (' + thisTemplateEngine.visu.retryCounter + ')' );
      update( json );
      profileCV( 'first data updated', true );
      thisTemplateEngine.visu.update = update; // handle future requests directly
    }
    thisTemplateEngine.visu.user = 'demo_user'; // example for setting a user
  };

  this.configSuffix;
  if ($.getUrlVar("config")) {
    this.configSuffix = $.getUrlVar("config");
  }

  this.clientDesign = "";

  if (typeof this.forceReload == "undefined") {
    this.forceReload = false;
  }

  if ($.getUrlVar('forceReload')) {
    this.forceReload = $.getUrlVar('forceReload') != 'false'; // true unless set
    // to false
  }

  if ($.getUrlVar('forceDevice')) {
    this.forceMobile = $.getUrlVar('forceDevice') == 'mobile';
    this.forceNonMobile = !this.forceMobile;
  } else {
    this.forceMobile = false;
    this.forceNonMobile = false;
  }
  var uagent = navigator.userAgent.toLowerCase();
  this.mobileDevice = (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent));
  if (/(nexus 7|tablet)/i.test(uagent)) this.mobileDevice = false;  // Nexus 7 and Android Tablets have a "big" screen, so prevent Navbar from scrolling
  this.mobileDevice |= this.forceMobile;  // overwrite detection when set by URL


  // "Bug"-Fix for ID: 3204682 "Caching on web server"
  // This isn't a real fix for the problem as that's part of the web browser,
  // but
  // it helps to avoid the problems on the client, e.g. when the config file
  // has changed but the browser doesn't even ask the server about it...
  this.forceReload = true;

  // Disable features that aren't ready yet
  // This can be overwritten in the URL with the parameter "maturity"
  this.use_maturity;
  if ($.getUrlVar('maturity')) {
    this.url_maturity = $.getUrlVar('maturity');
    if (!isNaN(this.url_maturity - 0)) {
      this.use_maturity = this.url_maturity - 0; // given directly as number
    } else {
      this.use_maturity = Maturity[this.url_maturity]; // or as the ENUM name
    }
  }

  if (isNaN(this.use_maturity)) {
    this.use_maturity = design.Maturity.release; // default to release
  }

  this.transformEncode = function(transformation, value) {
    var basetrans = transformation.split('.')[0];
    return transformation in Transform ? Transform[transformation]
        .encode(value) : (basetrans in Transform ? Transform[basetrans]
        .encode(value) : value);
  };

  this.transformDecode = function(transformation, value) {
    var basetrans = transformation.split('.')[0];
    return transformation in Transform ? Transform[transformation]
        .decode(value) : (basetrans in Transform ? Transform[basetrans]
        .decode(value) : value);
  };
  
  this.addAddress = function( address, id ) {
    if( address in ga_list )
      ga_list[ address ].push( id );
    else
      ga_list[ address ] = [ id ];
  };
  
  this.getAddresses = function() {
    return Object.keys(ga_list);
  };

  this.bindActionForLoadingFinished = function(fn) {
    $("#pages").bind("done", fn);
  };
  
  function fireLoadingFinishedAction() {
    $("#pages").triggerHandler("done");
  }

  /*
   * this function implements widget stylings 
   */
  this.setWidgetStyling = function(e, value, styling) {
    var sty = stylings[styling];
    if (sty) {    
      e.removeClass(sty['classnames']); // remove only styling classes
      var findValue = function(v, findExact) {
        if (undefined === v) {
          return false;
        }
        if (sty[v]) { // fixed value
          e.addClass(sty[v]);
          return true;
        }
        else { 
          var range = sty['range'];
          if (findExact && range[v]) {
            e.addClass(range[v][1]);
            return true;
          }
          var valueFloat = parseFloat(v);
          for (var min in range) {
            if (min > valueFloat) continue;
            if (range[min][0] < valueFloat) continue; // check max
            e.addClass(range[min][1]);
            return true;
          }
        }
        return false;
      }
      if (!findValue(value, false) && sty['defaultValue'] !== undefined) {
        findValue(sty['defaultValue'], true);
      }
    }
    return this;
  }

  this.map = function(value, this_map) {
    if (this_map && mappings[this_map]) {
      var m = mappings[this_map];

      var ret = value;
      if (m.formula) {
        ret = m.formula(ret);
      }

      var mapValue = function(v) {
        if (m[v]) {
          return m[v];
        } else if (m['range']) {
          var valueFloat = parseFloat(v);
          var range = m['range'];
          for (var min in range) {
            if (min > valueFloat) continue;
            if (range[min][0] < valueFloat) continue; // check max
            return range[min][1];
          }
        }
        return v; // pass through when nothing was found
      }
      var ret = mapValue(ret);
      if (!ret && m['defaultValue']) {
        ret = mapValue(m['defaultValue']);
      }
      if( ret !== undefined ) {
        return ret;
      }
    }
    return value;
  };

  /**
   * Look up the entry for @param value in the mapping @param this_map and
   * @return the next value in the list (including wrap around).
   */
  this.getNextMappedValue = function(value, this_map) {
    if (this_map && mappings[this_map]) {
      var keys = Object.keys(mappings[this_map]);
      return keys[ (keys.indexOf( "" + value ) + 1) % keys.length ];
    }
    return value;
  }

  this.resetPageValues = function() {
    thisTemplateEngine.currentPage = null;
    thisTemplateEngine.currentPageUnavailableWidth=-1;
    thisTemplateEngine.currentPageUnavailableHeight=-1;
    thisTemplateEngine.currentPageNavbarVisibility=null;
  };
  
  this.getCurrentPageNavbarVisibility = function() {
    if (thisTemplateEngine.currentPageNavbarVisibility==null) {
      thisTemplateEngine.currentPageNavbarVisibility = thisTemplateEngine.pagePartsHandler.getNavbarsVisibility(thisTemplateEngine.currentPage);
    }
    return thisTemplateEngine.currentPageNavbarVisibility;
  };

  // return S, M or L depening on the passed width
  function getColspanClass( width )
  {
    if( width <= thisTemplateEngine.maxScreenWidthColspanS )
      return 'S';
    if( width <= thisTemplateEngine.maxScreenWidthColspanM )
      return 'M';
    return 'L';
  }
  
  var oldWidth = -1;
  this.adjustColumns = function() {
    var
      width = thisTemplateEngine.getAvailableWidth(),
      oldClass = getColspanClass( oldWidth ),
      newClass = getColspanClass( width );
      
    oldWidth = width;
    
    return oldClass != newClass;
  };
  
  /**
   * return the available width for a the currently visible page
   * the available width is calculated by subtracting the following elements widths (if they are visible) from the body width
   * - Left-Navbar
   * - Right-Navbar
   */
  this.getAvailableWidth = function() {
    // currently this calculation is done once after every page scroll (where thisTemplateEngine.currentPageUnavailableWidth is reseted)
    // if the screen width falls below the threshold which activates/deactivates the mobile.css
    // the calculation has to be done again, even if the page hasn´t changed (e.g. switching between portrait and landscape mode on a mobile can cause that)
    var bodyWidth = $('body').width();
    var mobileUseChanged = (lastBodyWidth<thisTemplateEngine.maxMobileScreenWidth)!=(bodyWidth<thisTemplateEngine.maxMobileScreenWidth);
    if (thisTemplateEngine.currentPageUnavailableWidth<0 || mobileUseChanged || true) {
      //      console.log("Mobile.css use changed "+mobileUseChanged);
      thisTemplateEngine.currentPageUnavailableWidth=0;
      var navbarVisibility = thisTemplateEngine.getCurrentPageNavbarVisibility(thisTemplateEngine.currentPage);
      var widthNavbarLeft = navbarVisibility.left=="true" && $('#navbarLeft').css('display')!="none" ? Math.ceil( $('#navbarLeft').outerWidth() ) : 0;
      if (widthNavbarLeft>=bodyWidth) {
        // Left-Navbar has the same size as the complete body, this can happen, when the navbar has no content
        // maybe there is a better solution to solve this problem
        widthNavbarLeft = 0;
      }
      var widthNavbarRight = navbarVisibility.right=="true" && $('#navbarRight').css('display')!="none" ? Math.ceil( $('#navbarRight').outerWidth() ) : 0;
      if (widthNavbarRight>=bodyWidth) {
        // Right-Navbar has the same size as the complete body, this can happen, when the navbar has no content
        // maybe there is a better solution to solve this problem
        widthNavbarRight = 0;
      }
      thisTemplateEngine.currentPageUnavailableWidth = widthNavbarLeft + widthNavbarRight + 1; // remove an additional pixel for Firefox
      //      console.log("Width: "+bodyWidth+" - "+widthNavbarLeft+" - "+widthNavbarRight);
    }
    lastBodyWidth = bodyWidth;
    return bodyWidth - thisTemplateEngine.currentPageUnavailableWidth;
  };
  
  /**
   * return the available height for a the currently visible page
   * the available height is calculated by subtracting the following elements heights (if they are visible) from the window height
   * - Top-Navigation
   * - Top-Navbar
   * - Bottom-Navbar
   * - Statusbar
   * 
   * Notice: the former way to use the subtract the $main.position().top value from the total height leads to errors in certain cases
   *         because the value of $main.position().top is not reliable all the time
   */
  this.getAvailableHeight = function() {
    var windowHeight = $(window).height();
    thisTemplateEngine.currentPageUnavailableHeight=0;
    var navbarVisibility = thisTemplateEngine.getCurrentPageNavbarVisibility(thisTemplateEngine.currentPage);
    var heightStr = "Height: "+windowHeight;
    if ($('#top').css('display') != 'none' && $('#top').outerHeight(true)>0) {
      thisTemplateEngine.currentPageUnavailableHeight+= Math.max( $('#top').outerHeight(true), $('.nav_path').outerHeight(true) );
      heightStr+=" - "+Math.max( $('#top').outerHeight(true), $('.nav_path').outerHeight(true) );
    }
    else {
      heightStr+=" - 0";
    }
    //      console.log($('#navbarTop').css('display')+": "+$('#navbarTop').outerHeight(true));
    if ($('#navbarTop').css('display') != 'none' && navbarVisibility.top=="true" && $('#navbarTop').outerHeight(true)>0) {
      thisTemplateEngine.currentPageUnavailableHeight+=$('#navbarTop').outerHeight(true);
      heightStr+=" - "+$('#navbarTop').outerHeight(true);
    }
    else {
      heightStr+=" - 0";
    }
    if ($('#navbarBottom').css('display') != 'none' && navbarVisibility.bottom=="true" && $('#navbarBottom').outerHeight(true)>0) {
      thisTemplateEngine.currentPageUnavailableHeight+=$('#navbarBottom').outerHeight(true);
      heightStr+=" - "+$('#navbarBottom').outerHeight(true);
    }
    else {
      heightStr+=" - 0";
    }
    if ($('#bottom').css('display') != 'none' && $('#bottom').outerHeight(true)>0) {
      thisTemplateEngine.currentPageUnavailableHeight+=$('#bottom').outerHeight(true);
      heightStr+=" - #bottom:"+$('#bottom').outerHeight(true);
    }
    else {
      heightStr+=" - 0";
    }
    if (thisTemplateEngine.currentPageUnavailableHeight>0) {
      thisTemplateEngine.currentPageUnavailableHeight+=1;// remove an additional pixel for Firefox
    }
    //console.log(heightStr);
    //console.log(windowHeight+" - "+thisTemplateEngine.currentPageUnavailableHeight);
    return windowHeight - thisTemplateEngine.currentPageUnavailableHeight;
  };

  /*
   * Make sure everything looks right when the window gets resized. This is
   * necessary as the scroll effect requires a fixed element size
   */
  /**
   * Manager for all resizing issues. It ensures that the real resizing 
   * calculations are only done as often as really necessary.
   */
  this.resizeHandling = (function(){
    var 
      invalidBackdrop   = true,
      invalidNavbar     = true,
      invalidPagesize   = true,
      invalidRowspan    = true,
      invalidScreensize = true,
      $pageSize     = $('#pageSize'),
      $navbarTop    = $('#navbarTop'),
      $navbarBottom = $('#navbarBottom'),
      width  = 0,
      height = 0;
      
    function makeAllSizesValid()
    {
      invalidPagesize && makePagesizeValid(); // must be first due to depencies
      invalidNavbar   && makeNavbarValid();
      invalidRowspan  && makeRowspanValid();
      invalidBackdrop && makeBackdropValid();
    }
    
    function makeBackdropValid()
    {
      if( !templateEngine.currentPage )
        return;
      
      var widgetData = templateEngine.widgetData[  templateEngine.currentPage.attr('id') ];
      if( '2d' === widgetData.type )
      {
        var
          cssPosRegEx = /(\d*)(.*)/,
          backdrop = templateEngine.currentPage.children().children().filter(widgetData.backdroptype)[0],
          backdropSVG      = widgetData.backdroptype === 'embed' ? backdrop.getSVGDocument() : null,
          backdropBBox     = backdropSVG ? backdropSVG.children[0].getBBox() : {},
          backdropNWidth   = backdrop.naturalWidth  || backdropBBox.width  || width,
          backdropNHeight  = backdrop.naturalHeight || backdropBBox.height || height,
          backdropScale    = Math.min( width/backdropNWidth, height/backdropNHeight ),
          backdropWidth    = backdropNWidth  * backdropScale,
          backdropHeight   = backdropNHeight * backdropScale,
          backdropPos      = widgetData.backdropalign.split(' '),
          backdropLeftRaw  = backdropPos[0].match( cssPosRegEx ),
          backdropTopRaw   = backdropPos[1].match( cssPosRegEx ),
          backdropLeft     = backdropLeftRaw[2] === '%' ? (width >backdropWidth  ? ((width -backdropWidth )*(+backdropLeftRaw[1])/100) : 0) : +backdropLeftRaw[1],
          backdropTop      = backdropTopRaw[2]  === '%' ? (height>backdropHeight ? ((height-backdropHeight)*(+backdropTopRaw[1] )/100) : 0) : +backdropTopRaw[1],
          uagent           = navigator.userAgent.toLowerCase();
          
        if( backdrop.complete === false || (widgetData.backdroptype === 'embed' && backdropSVG === null) )
        {
          // backdrop not available yet - reload
          setTimeout( thisTemplateEngine.resizeHandling.invalidateBackdrop, 100);
          return;
        }
        
        // Note 1: this here is a work around for older browsers that can't use
        // the object-fit property yet.
        // Currently (26.05.16) only Safari is known to not support 
        // object-position although object-fit itself does work
        // Note 2: The embed element allways needs it
        if( 
          widgetData.backdroptype === 'embed' ||
          ( uagent.indexOf('safari') !== -1 && uagent.indexOf('chrome') === -1 )
        )
        {
          $( backdrop ).css({
            width:  backdropWidth  + 'px',
            height: backdropHeight + 'px',
            left:   backdropLeft   + 'px',
            top:    backdropTop    + 'px'
          });
        }
        
        templateEngine.currentPage.find('.widget_container').toArray().forEach( function( widgetContainer ){ 
          var widgetData = templateEngine.widgetDataGet( widgetContainer.id );
          if( widgetData.layout )
          {
            var 
              layout = widgetData.layout,
              // this assumes that a .widget_container has only one child and this
              // is the .widget itself
              style  = widgetContainer.children[0].style;
            
            if( 'x' in layout )
            {
              var value = layout.x.match( cssPosRegEx );
              if( 'px' === value[2] )
              {
                style.left = (backdropLeft + value[1]*backdropScale) + 'px';
              } else {
                style.left = layout.x;
              }
            }
            
            if( 'y' in layout )
            {
              var value = layout.y.match( cssPosRegEx );
              if( 'px' === value[2] )
              {
                style.top = (backdropTop + value[1]*backdropScale) + 'px';
              } else {
                style.top = layout.y;
              }
            }
            
            if( 'width' in layout )
              style.width = layout.width;
            
            if( 'height' in layout )
              style.height = layout.height;
          }
        });
      }
      
      invalidBackdrop = false;
    }
    
    function makeNavbarValid()
    {
      if (thisTemplateEngine.mobileDevice) {
        //do nothing
      } else {
        if(
          ($navbarTop.css('display')    !== 'none' && $navbarTop.outerHeight(true)<=2) ||
          ($navbarBottom.css('display') !== 'none' && $navbarBottom.innerHeight() <=2)
        ) {
          // Top/Bottom-Navbar is not initialized yet, wait some time and recalculate available height
          // this is an ugly workaround, if someone can come up with a better solution, feel free to implement it
          window.requestAnimationFrame( thisTemplateEngine.resizeHandling.invalidateNavbar );
          return;
        }
      }
      if (thisTemplateEngine.adjustColumns()) {
        // the amount of columns has changed -> recalculate the widgets widths
        thisTemplateEngine.applyColumnWidths();
      }
      
      invalidNavbar = false;
    }
    
    function makePagesizeValid()
    {
      width = thisTemplateEngine.getAvailableWidth();
      height = thisTemplateEngine.getAvailableHeight();
      $pageSize.text('#main,.page{width:' + (width - 0) + 'px;height:' + height + 'px;}');
      
      invalidPagesize = false;
    }
    
    function makeRowspanValid()
    {
      var 
        dummyDiv = $(
          '<div class="clearfix" id="calcrowspan"><div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv" /></div></div>')
          .appendTo(document.body).show(),
        singleHeight = $('#containerDiv').outerHeight(false),
        singleHeightMargin = $('#containerDiv').outerHeight(true),
        styles = '';

      for( var rowspan in usedRowspans )
      {
        styles += '.rowspan.rowspan' + rowspan
                + ' { height: '
                + ((rowspan - 1) * singleHeightMargin + singleHeight)
                + "px;}\n";
      }
      
      $('#calcrowspan').remove();

      // set css style
      $('#rowspanStyle').text( styles );
      
      invalidRowspan = false;
    }
    
    return {
      invalidateBackdrop: function(){
        invalidBackdrop = true;
        makeAllSizesValid();
      },
      invalidateNavbar: function(){
        invalidNavbar = true;
        invalidPagesize = true;
        makeAllSizesValid();
      },
      invalidateRowspan: function(){
        invalidRowspan = true;
        makeAllSizesValid();
      },
      invalidateScreensize: function(){
        invalidScreensize = true;
        invalidPagesize = true;
        invalidBackdrop = true;
        makeAllSizesValid();
      }
    };
  })();
  
  var usedRowspans = {};
  this.rowspanClass = function(rowspan) {
    usedRowspans[ rowspan ] = true;
    return 'rowspan rowspan' + rowspan;
  };
    
  var pluginsToLoadCount = 0;
  var xml;
  this.parseXML = function(loaded_xml) {
    profileCV( 'parseXML' );
    xml = loaded_xml;
    // erst mal den Cache für AJAX-Requests wieder aktivieren
    /*
    $.ajaxSetup({
      cache : true
    });
    */

    /*
     * First, we try to get a design by url. Secondly, we try to get a predefined
     */
    // read predefined design in config
    var predefinedDesign = $('pages', xml).attr("design");

    if ($('pages', xml).attr("backend")) {
      thisTemplateEngine.backend = $('pages', xml).attr("backend");
    }
    thisTemplateEngine.initBackendClient();

    if( undefined === $('pages', xml).attr( 'scroll_speed' ) )
      thisTemplateEngine.scrollSpeed = 400;
    else
      thisTemplateEngine.scrollSpeed = $('pages', xml).attr('scroll_speed') | 0;
    
    if ($('pages', xml).attr('bind_click_to_widget')!=undefined) {
      thisTemplateEngine.bindClickToWidget = $('pages', xml).attr('bind_click_to_widget')=="true" ? true : false;
    }
    if ($('pages', xml).attr('default_columns')) {
      thisTemplateEngine.defaultColumns = $('pages', xml).attr('default_columns');
    }
    if ($('pages', xml).attr('min_column_width')) {
      thisTemplateEngine.minColumnWidth = $('pages', xml).attr('min_column_width');
    }
    thisTemplateEngine.screensave_time = $('pages', xml).attr('screensave_time');
    thisTemplateEngine.screensave_page = $('pages', xml).attr('screensave_page');

    // design by url
    if ($.getUrlVar("design")) {
      thisTemplateEngine.clientDesign = $.getUrlVar("design");
    }
    // design by config file
    else if (predefinedDesign) {
      thisTemplateEngine.clientDesign = predefinedDesign;
    }
    // selection dialog
    else {
      thisTemplateEngine.selectDesign();
    }
    if ($('pages', xml).attr('max_mobile_screen_width'))
      thisTemplateEngine.maxMobileScreenWidth = $('pages', xml).attr('max_mobile_screen_width');

    var getCSSlist = [];
    if (thisTemplateEngine.clientDesign) {
      getCSSlist.push( 'css!designs/' + thisTemplateEngine.clientDesign + '/basic.css' );
      if (!thisTemplateEngine.forceNonMobile) {
        getCSSlist.push( 'css!designs/' + thisTemplateEngine.clientDesign + '/mobile.css' );
      }
      getCSSlist.push( 'css!designs/' + thisTemplateEngine.clientDesign + '/custom.css' );
      getCSSlist.push( 'designs/' + thisTemplateEngine.clientDesign + '/design_setup' );
    }
    require( getCSSlist, delaySetup('design') );

    // start with the plugins
    var pluginsToLoad = [];
    $('meta > plugins plugin', xml).each(function(i) {
      var name = $(this).attr('name');
      if (name) {
        if (!pluginsToLoad[name]) {
          /*
          pluginsToLoadCount++;
          $.includeScripts( 
              ['plugins/' + name + '/structure_plugin.js'],
              delaySetup( 'plugin_' + name)
            );
          pluginsToLoad[name] = true;
          */
          pluginsToLoad.push( 'plugins/' + name + '/structure_plugin' );
        }
      }
    });
    /*
    if (0 == pluginsToLoadCount) {
      delete loadReady.plugins;
    }
    */
    var delaySetupPluginsCallback = delaySetup('plugins');
    require( pluginsToLoad, delaySetupPluginsCallback, function( err ) {
      console.log( 'Plugin loading error! It happend with: "' + err.requireModules[0] + '". Is the plugin available and written correctly?');
      delaySetupPluginsCallback();
    });
    
    // then the icons
    $('meta > icons icon-definition', xml).each(function(i) {
      var $this = $(this);
      var name = $this.attr('name');
      var uri = $this.attr('uri');
      var type = $this.attr('type');
      var flavour = $this.attr('flavour');
      var color = $this.attr('color');
      var styling = $this.attr('styling');
      var dynamic = $this.attr('dynamic');
      icons.insert(name, uri, type, flavour, color, styling, dynamic);
    });

    // then the mappings
    $('meta > mappings mapping', xml).each(function(i) {
      var $this = $(this);
      var name = $this.attr('name');
      mappings[name] = {};
      var formula = $this.find('formula');
      if (formula.length > 0) {
        var func = eval('var func = function(x){var y;' + formula.text() + '; return y;}; func');
        mappings[name]['formula'] = func;
      }
      $this.find('entry').each(function() {
        var $localThis = $(this);
        var origin = $localThis.contents();
        var value = [];
        for (var i = 0; i < origin.length; i++) {
          var $v = $(origin[i]);
          if ($v.is('icon')) {
            value[i] = icons.getIconElement($v.attr('name'), $v.attr('type'), $v.attr('flavour'), $v.attr('color'), $v.attr('styling'), $v.attr('class'));
          }
          else {
            value[i] = $v.text();
          }
        }
        // check for default entry
        var isDefaultValue = $localThis.attr('default');
        if (isDefaultValue != undefined) {
          isDefaultValue = isDefaultValue == "true";
        }
        else {
          isDefaultValue = false;
        }
        // now set the mapped values
        if ($localThis.attr('value')) {
          mappings[name][$localThis.attr('value')] = value.length == 1 ? value[0] : value;
          if (isDefaultValue) {
            mappings[name]['defaultValue'] = $localThis.attr('value');
          }
        }
        else {
          if (!mappings[name]['range']) {
            mappings[name]['range'] = {};
          }
          mappings[name]['range'][parseFloat($localThis.attr('range_min'))] = [ parseFloat($localThis.attr('range_max')), value ];
          if (isDefaultValue) {
            mappings[name]['defaultValue'] = parseFloat($localThis.attr('range_min'));
          }
        }
      });
    });

    // then the stylings
    $('meta > stylings styling', xml).each(function(i) {
      var name = $(this).attr('name');
      var classnames = '';
      stylings[name] = {};
      $(this).find('entry').each(function() {
        var $localThis = $(this);
        classnames += $localThis.text() + ' ';
        // check for default entry
        var isDefaultValue = $localThis.attr('default');
        if (isDefaultValue != undefined) {
          isDefaultValue = isDefaultValue == "true";
        } else {
          isDefaultValue = false;
        }
        // now set the styling values
        if ($localThis.attr('value')) {
          stylings[name][$localThis.attr('value')] = $localThis.text();
          if (isDefaultValue) {
            stylings[name]['defaultValue'] = $localThis.attr('value');
          }
        } else { // a range
          if (!stylings[name]['range'])
            stylings[name]['range'] = {};
          stylings[name]['range'][parseFloat($localThis.attr('range_min'))] = [parseFloat($localThis.attr('range_max')),$localThis.text()];
          if (isDefaultValue) {
            stylings[name]['defaultValue'] = parseFloat($localThis.attr('range_min'));
          }
        }
      });
      stylings[name]['classnames'] = classnames;
    });

    // then the status bar
    $('meta > statusbar status', xml).each(function(i) {
      var type = $(this).attr('type');
      var condition = $(this).attr('condition');
      var extend = $(this).attr('hrefextend');
      var sPath = window.location.pathname;
      var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

      // @TODO: make this match once the new editor is finished-ish.
      var editMode = 'edit_config.html' == sPage;

      // skip this element if it's edit-only and we are non-edit, or the other
      // way
      // round
      if (editMode && '!edit' == condition)
        return;
      if (!editMode && 'edit' == condition)
        return;

      var text = $(this).text();
      switch (extend) {
      case 'all': // append all parameters
        var search = window.location.search.replace(/\$/g, '$$$$');
        text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
        break;
      case 'config': // append config file info
        var search = window.location.search.replace(/\$/g, '$$$$');
        search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

        var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
        if( 0 < middle.indexOf('?') )
          search = '&' + search;
        else
          search = '?' + search;

        text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
        break;
      }
      $('.footer').html($('.footer').html() + text);
    });

    delete loadReady.page;
    setup_page();
  };
  
  /**
   * applies the correct width to the widgets corresponding to the given colspan setting 
   */
  this.applyColumnWidths = function() {
    var
      width = thisTemplateEngine.getAvailableWidth();
    function dataColspan( data )
    {
      if( width <= thisTemplateEngine.maxScreenWidthColspanS )
        return data.colspanS;
      if( width <= thisTemplateEngine.maxScreenWidthColspanM )
        return data.colspanM;
      return data.colspan;
    }
    
    // all containers
    ['#navbarTop', '#navbarLeft', '#main', '#navbarRight', '#navbarBottom'].forEach( function( area ){
      var 
        allContainer = $(area + ' .widget_container'),
        areaColumns = $( area ).data( 'columns' );
      allContainer.each(function(i, e) {
      var
        $e = $(e),
        data = thisTemplateEngine.widgetDataGet( e.id ),
        ourColspan = dataColspan( data );
        
      var w = 'auto';
      if (ourColspan > 0) {
        var areaColspan = areaColumns || thisTemplateEngine.defaultColumns;
        w = Math.min(100, ourColspan / areaColspan * 100) + '%';
      }
      $e.css('width', w);
    });
      // and elements inside groups
      var areaColumns = $('#main').data('columns');
      var adjustableElements = $('.group .widget_container');
      adjustableElements.each(function(i, e) {
      var 
        $e = $(e),
        data = thisTemplateEngine.widgetData[ e.id ],
        ourColspan = dataColspan( data );
      if (ourColspan == undefined) {
        // workaround for nowidget groups
        ourColspan = dataColspan( thisTemplateEngine.widgetDataGetByElement($e.children('.group')) );
      }
      var w = 'auto';
      if (ourColspan > 0) {
        var areaColspan = areaColumns || thisTemplateEngine.defaultColumns;
        var groupColspan = Math.min(areaColspan, dataColspan(thisTemplateEngine.widgetDataGetByElement($e.parentsUntil(
            '.widget_container', '.group'))));
        w = Math.min(100, ourColspan / groupColspan * 100) + '%'; // in percent
      }
      $e.css('width', w);
    });
    });
  };

  /**
   * Array with all functions that need to be called once the DOM tree was set
   * up.
   */
  this.postDOMSetupFns = [];
  
  function setup_page() {
    // and now setup the pages
    profileCV( 'setup_page start' );
    
    // check if the page and the plugins are ready now
    for( var key in loadReady )  // test for emptines
      return; // we'll be called again...

    // login to backend as it might change some settings needed for further processing
    thisTemplateEngine.visu.login(true, function() {
      profileCV( 'setup_page running' );
   
      // as we are sure that the default CSS were loaded now:
      $('link[href*="mobile.css"]').each(function(){
        this.media = 'only screen and (max-width: ' + thisTemplateEngine.maxMobileScreenWidth + 'px)';
      });
      
      var page = $('pages > page', xml)[0]; // only one page element allowed...
  
      thisTemplateEngine.create_pages(page, 'id');
      thisTemplateEngine.design.getCreator('page').createFinal();
      profileCV( 'setup_page created pages' );
      
      thisTemplateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });
      profileCV( 'setup_page finished postDOMSetupFns' );
      
      var startpage = 'id_';
      if ($.getUrlVar('startpage')) {
        startpage = $.getUrlVar('startpage');
        if( typeof(Storage) !== 'undefined' )
        {
          if( 'remember' === startpage )
          {
            startpage = localStorage.getItem( 'lastpage' );
            rememberLastPage = true;
            if( 'string' !== typeof( startpage ) || 'id_' !== startpage.substr( 0, 3 ) )
              startpage = 'id_'; // fix obvious wrong data
          } else
          if( 'noremember' === startpage )
          {
            localStorage.removeItem( 'lastpage' );
            startpage = 'id_';
            rememberLastPage = false;
          }
        }
      }
      thisTemplateEngine.currentPage = $('#'+startpage);
      
      thisTemplateEngine.adjustColumns();
      thisTemplateEngine.applyColumnWidths();
      
      thisTemplateEngine.main_scroll = new PageHandler();
      if (thisTemplateEngine.scrollSpeed != undefined) {
        thisTemplateEngine.main_scroll.setSpeed( thisTemplateEngine.scrollSpeed );
      }
     
      thisTemplateEngine.scrollToPage(startpage,0);
  
      /* CM, 9.4.16:
       * TODO: Is this really needed?
       * I can't find any source for setting .fast - and when it's set, it's
       * most likely not working as scrollToPage should have been used instead
       * anyway...
       * 
      $('.fast').bind('click', function() {
        thisTemplateEngine.main_scroll.seekTo($(this).text());
      });
     */
  
      // reaction on browser back button
      window.onpopstate = function(e) {
        // where do we come frome?
        lastpage = e.state;
        if (lastpage) {
          // browser back button takes back to the last page
          thisTemplateEngine.scrollToPage(lastpage, 0, true);
        }
      };
  
      // run the Trick-O-Matic scripts for great SVG backdrops
      $('embed').each(function() { this.onload =  Trick_O_Matic });
      
      if (thisTemplateEngine.enableAddressQueue) {
        // identify addresses on startpage
        var startPageAddresses = {};
        $('.actor','#'+startpage).each(function() {
          var $this = $(this),
                data  = $this.data();
          if( undefined === data.address ) data = $this.parent().data();
          for( var addr in data.address )
          {
            startPageAddresses[addr.substring(1)]=1;
          }
        });
        thisTemplateEngine.visu.setInitialAddresses(Object.keys(startPageAddresses));
      }
      var addressesToSubscribe = thisTemplateEngine.getAddresses();
      if( 0 !== addressesToSubscribe.length )
        thisTemplateEngine.visu.subscribe(thisTemplateEngine.getAddresses());
      
      xml = null; // not needed anymore - free the space
      
      $('.icon').each(function(){ fillRecoloredIcon(this);});
      $('.loading').removeClass('loading');
      fireLoadingFinishedAction();
      if( undefined !== thisTemplateEngine.screensave_time )
      {
        thisTemplateEngine.screensave = setTimeout( function(){thisTemplateEngine.scrollToPage();}, thisTemplateEngine.screensave_time*1000 );
        $(document).click( function(){
          clearInterval( thisTemplateEngine.screensave );
          thisTemplateEngine.screensave = setTimeout( function(){thisTemplateEngine.scrollToPage();}, thisTemplateEngine.screensave_time*1000 );
        });
      }
      profileCV( 'setup_page finish' );
    }, this);
  };

  this.create_pages = function(page, path, flavour, type) {
    var creator = thisTemplateEngine.design.getCreator(page.nodeName);
    
    thisTemplateEngine.callbacks[ path + '_' ] = {
      exitingPageChange: [],// called when the current page is left
      beforePageChange: [], // called as soon as a page change is known
      duringPageChange: [], // called when the page is theoretical visible, i.e. "display:none" is removed - CSS calculations shoud work now
      afterPageChange: []   // called together with the global event when the transition is finished
    };
    
    var retval = creator.create(page, path, flavour, type);

    if( undefined === retval )
      return;
    
    var data = thisTemplateEngine.widgetDataGet( path );
    data.type = page.nodeName;
    if( 'string' === typeof retval )
    {
      return '<div class="widget_container '
      + (data.rowspanClass ? data.rowspanClass : '')
      + (data.containerClass ? data.containerClass : '')
      + ('break' === data.type ? 'break_container' : '') // special case for break widget
      + '" id="'+path+'" data-type="'+data.type+'">' + retval + '</div>';
    } else {
      return jQuery(
      '<div class="widget_container '
      + (data.rowspanClass ? data.rowspanClass : '')
      + (data.containerClass ? data.containerClass : '')
      + '" id="'+path+'" data-type="'+data.type+'"/>').append(retval);
    }
  };
  
  /**
   * Little helper to find the relevant page path for a given widget.
   * @param element The XML element
   * @param widgetpath The path / ID of the widget
   * @return The path of the parent
   */
  this.getPageIdForWidgetId = function( element, widgetpath )
  {
    var
      parent = element.parentNode,
      parentpath = widgetpath.replace( /[0-9]*$/, '' );
    
    while( parent && parent.nodeName !== 'page' )
    {
      parent = parent.parentNode;
      parentpath = parentpath.replace( /[0-9]*_$/, '' );
    }
    return parentpath;
  };
  
  this.getPageIdByPath = function(page_name, path) {
    if (page_name==null) return null;
    if (page_name.match(/^id_[0-9_]*$/) != null) {
      // already a page_id
      return page_name;
    } else {
      if (path!=undefined) {
        var scope = templateEngine.traversePath(path);
        if (scope==null) {
          // path is wrong
          console.error("path '"+path+"' could not be traversed, no page found");
          return null;
        }
        return templateEngine.getPageIdByName(page_name,scope);
      } else {
        return templateEngine.getPageIdByName(page_name);
      }
    }
  }
  
  this.traversePath = function(path,root_page_id) {
    var path_scope=null;
    var index = path.indexOf("/");
    if (index>=1) {
      // skip escaped slashes like \/
      while (path.substr(index-1,1)=="\\") {
        var next = path.indexOf("/",index+1);
        if (next>=0) {
          index=next;
        }
      }
    }
    //    console.log("traversePath("+path+","+root_page_id+")");
    if (index>=0) {
      // traverse path one level down
      var path_page_name = path.substr(0,index);
      path_scope = templateEngine.getPageIdByName(path_page_name,root_page_id);
      path = path.substr(path_page_name.length+1);
      path_scope = templateEngine.traversePath(path,path_scope);
      //      console.log(path_page_name+"=>"+path_scope);
      return path_scope;
    } else {
      // bottom path level reached
      path_scope = templateEngine.getPageIdByName(path,root_page_id);
      return path_scope;
    }
    return null;
  }
  
  this.getPageIdByName = function(page_name,scope) {
    if (page_name.match(/^id_[0-9_]*$/) != null) {
      // already a page_id
      return page_name;
    } else {
      var page_id=null;
      // find Page-ID by name
      // decode html code (e.g. like &apos; => ')
      page_name = $("<textarea/>").html(page_name).val();
      // remove escaped slashes
      page_name = page_name.replace("\\\/","/");
      
      //      console.log("Page: "+page_name+", Scope: "+scope);
      var selector = (scope!=undefined && scope!=null) ? '.page[id^="'+scope+'"] h1:contains(' + page_name + ')' :  '.page h1:contains(' + page_name + ')';
      var pages = $(selector, '#pages');
      if (pages.length>1 && thisTemplateEngine.currentPage!=null) {
        // More than one Page found -> search in the current pages descendants first
        var fallback = true;
        pages.each(function(i) {
          var p = $(this).closest(".page");
          if ($(this).text() == page_name) {
            if (p.attr('id').length<thisTemplateEngine.currentPage.attr('id').length) {
              // found pages path is shorter the the current pages -> must be an ancestor
              if (thisTemplateEngine.currentPage.attr('id').indexOf(p.attr('id'))==0) {
                // found page is an ancenstor of the current page -> we take this one
                page_id = p.attr("id");
                fallback = false;
                //break loop
                return false;
              }
            } else {
              if (p.attr('id').indexOf(thisTemplateEngine.currentPage.attr('id'))==0) {
                // found page is an descendant of the current page -> we take this one
                page_id = p.attr("id");
                fallback = false;
                //break loop
                return false;
              }
            }
          }
        });
        if (fallback) {
          // take the first page that fits (old behaviour)
          pages.each(function(i) {
            if ($(this).text() == page_name) {
              page_id = $(this).closest(".page").attr("id");
              // break loop
              return false;
            }
          });
        }
      } else {
        pages.each(function(i) {
          if ($(this).text() == page_name) {
            page_id = $(this).closest(".page").attr("id");
            // break loop
            return false;
          }
        });
      }
    }
    if (page_id!=null && page_id.match(/^id_[0-9_]*$/) != null) {
      return page_id;
    } else {
      // not found
      return null;
    }
  }

  this.scrollToPage = function(target, speed, skipHistory) {
    if( undefined === target )
      target = this.screensave_page;
    var page_id = thisTemplateEngine.getPageIdByPath(target);
    if (page_id==null) {
      return;
    }
    
    if( undefined === speed )
      speed = thisTemplateEngine.scrollSpeed;
    
    if( rememberLastPage )
      localStorage.lastpage = page_id;
    
    // push new state to history
    if (skipHistory === undefined)
      window.history.pushState(page_id, page_id, window.location.href);
    
    thisTemplateEngine.main_scroll.seekTo(page_id, speed); // scroll to it

    thisTemplateEngine.pagePartsHandler.initializeNavbars(page_id);
    $(window).trigger('scrolltopage', page_id);    
  };

  /*
   * Show a popup of type "type". The attributes is an type dependend object
   * This function returnes a jQuery object that points to the whole popup, so
   * it's content can be easily extended
   */
  this.showPopup = function(type, attributes) {
    return thisTemplateEngine.design.getPopup(type).create(attributes);
  };

  /*
   * Remove the popup. The parameter is the jQuery object returned by the
   * showPopup function
   */
  this.removePopup = function(jQuery_object) {
    jQuery_object.remove();
  };

  /** ************************************************************************* */
  /* FIXME - Question: should this belong to the VisuDesign object so that it */
  /* is possible to overload?!? */
  /** ************************************************************************* */
  this.refreshAction = function(target, src) {
    /*
     * Special treatment for (external) iframes: we need to clear it and reload
     * it in another thread as otherwise stays blank for some targets/sites and
     * src = src doesnt work anyway on external This creates though some
     * "flickering" so we avoid to use it on images, internal iframes and others
     */
    var parenthost = window.location.protocol + "//" + window.location.host;
    if (target.nodeName == "IFRAME" && src.indexOf(parenthost) != 0) {
      target.src = '';
      setTimeout(function() {
        target.src = src;
      }, 0);
    } else {
      target.src = src + '&' + new Date().getTime();
    }
  };

  this.setupRefreshAction = function( path, refresh ) {
    if (refresh && refresh > 0) {
      var
        element = $( '#' + path ),
        target = $('img', element)[0] || $('iframe', element)[0],
        src = target.src;
      if (src.indexOf('?') < 0)
        src += '?';
      thisTemplateEngine.widgetDataGet( path ).internal = setInterval(function() {
        thisTemplateEngine.refreshAction(target, src);
      }, refresh);
    }
  };

  this.selectDesign = function() {
    $body = $("body");

    $("body > *").hide();
    $body.css({
      backgroundColor : "black"
    });

    $div = $("<div id=\"designSelector\" />");
    $div.css({
      background : "#808080",
      width : "400px",
      color : "white",
      margin : "auto",
      padding : "0.5em"
    });
    $div.html("Loading ...");

    $body.append($div);

    $.getJSON("./designs/get_designs.php",function(data) {
      $div.empty();

      $div.append("<h1>Please select design</h1>");
      $div.append("<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>");

      $.each(data,function(i, element) {
        var $myDiv = $("<div />");

        $myDiv.css({
          cursor : "pointer",
          padding : "0.5em 1em",
          borderBottom : "1px solid black",
          margin : "auto",
          width : "262px",
          position : "relative"
        });

        $myDiv
        .append("<div style=\"font-weight: bold; margin: 1em 0 .5em;\">Design: "
            + element + "</div>");
        $myDiv
        .append("<iframe src=\"designs/design_preview.html?design="
            + element
            + "\" width=\"160\" height=\"90\" border=\"0\" scrolling=\"auto\" frameborder=\"0\" style=\"z-index: 1;\"></iframe>");
        $myDiv
        .append("<img width=\"60\" height=\"30\" src=\"./demo/media/arrow.png\" alt=\"select\" border=\"0\" style=\"margin: 60px 10px 10px 30px;\"/>");

        $div.append($myDiv);

        var $tDiv = $("<div />");
        $tDiv.css({
          background : "transparent",
          position : "absolute",
          height : "90px",
          width : "160px",
          zIndex : 2
        });
        var pos = $myDiv.find("iframe").position();
        $tDiv.css({
          left : pos.left + "px",
          top : pos.top + "px"
        });
        $myDiv.append($tDiv);

        $myDiv.hover(function() {
          // over
          $myDiv.css({
            background : "#bbbbbb"
          });
        }, function() {
          // out
          $myDiv.css({
            background : "transparent"
          });
        });

        $myDiv.click(function() {
          if (document.location.search == "") {
            document.location.href = document.location.href
            + "?design=" + element;
          } else {
            document.location.href = document.location.href
            + "&design=" + element;
          }
        });
      });
    });
  };

  // tools for widget handling
  /**
   * Return a widget (to be precise: the widget_container) for the given path
   */
  this.lookupWidget = function( path ) {
    var id = path.split( '_' );
    var elementNumber = +id.pop();
    return $( '.page#' + id.join('_') ).children().children()[ elementNumber+1 ];
  };
  
  this.getParentPage = function(page) {
    if (0 === page.length) return null;

    return getParentPageById(page.attr('id'), true);
  };

  function getParentPageById(path, isPageId) {
    if (0 < path.length) {
      var pathParts = path.split('_');
      if (isPageId) pathParts.pop();
      while (pathParts.length > 1) {
        pathParts.pop();
        var path = pathParts.join('_') + '_';
        if ($('#' + path).hasClass("page")) {
          return $('#' + path);
        }
      }
    }
    return null;
  };

  this.getParentPageFromPath = function(path) {
    return getParentPageById(path, false);
  };
  
  /**
   * Load a script and run it before page setup.
   * This is needed for plugin that depend on an external library.
   */
  this.getPluginDependency = function( url ){
    $.getScriptSync( url );
  }

  /**
   * This has to be called by a plugin once it was loaded.
   */
  this.pluginLoaded = function(){
    pluginsToLoadCount--;
    if( 0 >= pluginsToLoadCount )
    {
      delete loadReady.plugins;
      setup_page();
    }
  }
  
  /**
   * Create a new widget.
   */
  this.create = function( path, element ) {
    return "created widget '" + path + "': '" + element + "'";
  };
  
  /**
   * Delete an existing path, i.e. widget, group or even page - including 
   * child elements.
   */
  this.deleteCommand = function( path ) {
    console.log( this.lookupWidget( path ), $( '#'+path ) );
    //$( this.lookupWidget( path ) ).remove();
    return "deleted widget '" + path + "'";
  };
  
  /**
   * Focus a widget.
   */
  this.focus = function( path ) {
    $('.focused').removeClass('focused')
    $( this.lookupWidget( path ) ).addClass( 'focused' );
  };
  
  ////////// Reflection API for possible Editor communication: Start //////////
  /**
   * Return a list of all widgets.
   */
  this.list = function() {
    var widgetTree = {};
    $('.page').each( function(){
      var id = this.id.split( '_' );
      var thisEntry = widgetTree;
      if( 'id' === id.shift() )
      {
        var thisNumber;
        while( thisNumber = id.shift() )
        {
          if( !(thisNumber in thisEntry) )
            thisEntry[ thisNumber ] = {};
          
          thisEntry = thisEntry[ thisNumber ];
        }
        $( this ).children().children( 'div.widget_container' ).each( function( i ){
          if( undefined === thisEntry[ i ] )
          {
            thisEntry[ i ] = {}
          }
          var thisWidget = $( this ).children()[0];
          thisEntry[ i ].name = ('className' in thisWidget) ? thisWidget.className : 'TODO';
          thisEntry[ i ].type = $(this).data('type');
        });
      }
    });
    return widgetTree;
  };
  
  /**
   * Return all attributes of a widget.
   */
  this.read = function( path ) {
    var widget = this.lookupWidget( path ),
        data   = $.extend( {}, $( widget ).children().data() ); // copy
    delete data.basicvalue;
    delete data.value;
    return data;
  };
  
  /**
   * Set the selection state of a widget.
   */
  this.select = function( path, state ) {
    var container = this.lookupWidget( path )
    if( state )
      $( container ).addClass( 'selected');
    else
      $( container ).removeClass( 'selected');
  };
  
  /**
   * Set all attributes of a widget.
   */
  this.write = function( path, attributes ) {
    $( this.lookupWidget( path ) ).children().data( attributes );
  };
  
  /**
   * Reflection API: communication
   * Handle messages that might be sent by the editor
   */
  this.handleMessage = function( event ) {
    // prevend bad or even illegal requests
    if( event.origin  !== window.location.origin ||
        'object'      !== typeof event.data      ||
        !('command'    in event.data )           ||
        !('parameters' in event.data )
    )
      return;
    
    var answer     = 'bad command',
        parameters = event.data.parameters;
    
    // note: as the commands are from external, we have to be a bit more
    //       carefull for corectness testing
    switch( event.data.command )
    {
      case 'create':
        if( 'object'  === typeof parameters   &&
            pathRegEx.test( parameters.path ) &&
            'string' === typeof parameters.element
        )
          answer = thisTemplateEngine.create( parameters.path, parameters.element );
        else 
          answer = 'bad path or element';
        break;
        
      case 'delete':
        if( pathRegEx.test( parameters ) ) 
          answer = thisTemplateEngine.deleteCommand( parameters );
        else 
          answer = 'bad path';
        break;
        
      case 'focus':
        if( pathRegEx.test( parameters ) ) 
          answer = thisTemplateEngine.focus( parameters );
        else 
          answer = 'bad path';
        break;
        
      case 'list':
        answer = thisTemplateEngine.list();
        break;
        
      case 'read':
        if( pathRegEx.test( parameters ) ) 
          answer = thisTemplateEngine.read( parameters );
        else 
          answer = 'bad path';
        break;
        
      case 'select':
        if( 'object'  === typeof parameters   &&
            pathRegEx.test( parameters.path ) &&
            'boolean' === typeof parameters.state
        )
          answer = thisTemplateEngine.select( parameters.path, parameters.state );
        break;
        
      case 'write':
        if( 'object'  === typeof parameters   &&
            pathRegEx.test( parameters.path ) &&
            'object'  === typeof parameters.attributes 
        )
          answer = thisTemplateEngine.write( parameters.path, parameters.attributes );
        break;
    }
    
    event.source.postMessage( answer, event.origin );
  };
  window.addEventListener( 'message', this.handleMessage, false);
  ////////// Reflection API for possible Editor communication: End //////////
}

  return {
    // simulate a singleton
    getInstance : function() {
      if (!instance) {
        instance = new TemplateEngine();
      }
      return instance;
    }
  };
}); // end require
