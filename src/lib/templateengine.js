/* templateengine.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 * 
 * @module Templateengine
 * @title  CometVisu templateengine
 */
var templateEngine = new TemplateEngine();

$(window).bind('resize', templateEngine.handleResize);
$(window).unload(function() {
  templateEngine.visu.stop();
});
$(document).ready(function() {
  // get the data once the page was loaded
  $.ajax({
    url : 'visu_config'+ (templateEngine.configSuffix ? '_' + templateEngine.configSuffix : '') + '.xml',
    cache : !templateEngine.forceReload,
    success : templateEngine.parseXML,
    error : function(jqXHR, textStatus, errorThrown) {
      var message = 'Config-File Error! ';
      switch (textStatus) {
      case 'parsererror':
        message += '<br />Invalid config file!<br /><a href="check_config.php?config='
          + templateEngine.configSuffix + '">Please check!</a>';
      }
      $('#loading').html(message);
    },
    dataType : 'xml'
  });
});

function TemplateEngine() {
  var thisTemplateEngine = this;
  this.pageReady = false;
  this.pluginsReady = false;
  this.designReady = false;
  this.design = new VisuDesign_Custom();
  this.pagePartsHandler = new PagePartsHandler();
  
  this.currentPage = null;
  this.currentPageUnavailableWidth = -1;
  this.currentPageUnavailableHeight = -1;
  this.currentPageNavbarVisibility = null;
  
  // if true the whole widget reacts on click events
  // if false only the actor in the widget reacts on click events
  this.bindClickToWidget = false;
    
  // threshold where the mobile.css is loaded
  this.maxMobileScreenWidth = 480;
  // use to recognize if the screen width has crossed the maxMobileScreenWidth
  var lastBodyWidth=0;

  this.mappings = {}; // store the mappings
  this.stylings = {}; // store the stylings
 
  var ga_list = {};

  this.main_scroll;
  this.old_scroll = '';
  this.visu;

  this.scrollSpeed;

  this.defaultColumns = 12;
  this.minColumnWidth = 120;
  this.enableColumnAdjustment = false;
  
  this.enableAddressQueue = $.getUrlVar('enableQueue') ? true : false;
  
  this.backend = 'cgi-bin'; // default path to backend
  if ($.getUrlVar("backend")) {
    this.backend = $.getUrlVar("backend");
  }

  this.initBackendClient = function() {
    if (thisTemplateEngine.backend=="oh") {
      // the path to the openHAB cometvisu backend is cv 
      thisTemplateEngine.backend = "cv";
    }
    thisTemplateEngine.backend = '/' + thisTemplateEngine.backend + '/';
    thisTemplateEngine.visu = new CometVisu(thisTemplateEngine.backend);
    thisTemplateEngine.visu.update = function(json) { // overload the handler
      for (key in json) {
        $.event.trigger('_' + key, json[key]);
      }
    };
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
  
  if ($.getUrlVar('forceMobile')) {
    this.forceMobile = $.getUrlVar('forceMobile') != 'false'; // true unless set
  } else {                                                    // to false
    this.forceMobile = false;
  }

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
    this.use_maturity = Maturity.release; // default to release
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
  
  this.addAddress = function(address) {
    ga_list[address]=1;
  };
  
  this.getAddresses = function() {
    return Object.keys(ga_list);
  };

  this.map = function(value, this_map) {
    if (this_map && thisTemplateEngine.mappings[this_map]) {
      var m = thisTemplateEngine.mappings[this_map];

      if (m.formula) {
        return m.formula(value);
      } else if (m[value]) {
        return m[value];
      } else if (m['range']) {
        var valueFloat = parseFloat(value);

        var range = m['range'];
        for ( var min in range) {
          if (min > valueFloat)
            continue;
          if (range[min][0] < valueFloat)
            continue; // check max
          return range[min][1];
        }
      }
    }
    return value;
  };
  
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

  this.adjustColumns = function() {
    if (thisTemplateEngine.enableColumnAdjustment == false)
      return false;
    var width = thisTemplateEngine.getAvailableWidth();

    var $main = $('#main');
    var newColumns = Math.ceil(width / thisTemplateEngine.minColumnWidth);
    if (newColumns > (thisTemplateEngine.defaultColumns / 2) && thisTemplateEngine.defaultColumns > newColumns) {
      // don´t accept values between 50% and 100% of defaultColumns
      // e.g if default is 12, then skip column-reduction to 10 and 8
      newColumns = thisTemplateEngine.defaultColumns;
    }
    else {
      // the value should be a divisor of defaultColumns-value
      while ((thisTemplateEngine.defaultColumns % newColumns)>0 && newColumns < thisTemplateEngine.defaultColumns) {
        newColumns++;
      }
      // make sure that newColumns does not exceed defaultColumns
      newColumns = Math.min(thisTemplateEngine.defaultColumns, newColumns);
    }
    if (newColumns != $main.data('columns')) {
      $main.data({
        'columns' : newColumns
      });
      return true;
    } else {
      return false;
    }
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
    if (thisTemplateEngine.currentPageUnavailableWidth<0 || mobileUseChanged) {
//      console.log("Mobile.css use changed "+mobileUseChanged);
      thisTemplateEngine.currentPageUnavailableWidth=0;
      var navbarVisibility = thisTemplateEngine.getCurrentPageNavbarVisibility(thisTemplateEngine.currentPage);
      var widthNavbarLeft = navbarVisibility.left=="true" && $('#navbarLeft').css('display')!="none" ? $('#navbarLeft').width() : 0;
      if (widthNavbarLeft>=bodyWidth) {
        // Left-Navbar has the same size as the complete body, this can happen, when the navbar has no content
        // maybe there is a better solution to solve this problem
        widthNavbarLeft = 0;
      }
      var widthNavbarRight = navbarVisibility.right=="true" && $('#navbarRight').css('display')!="none" ? $('#navbarRight').width() : 0;
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
  this.getAvailableHeight = function(force) {
    var windowHeight = $(window).height();
    if (thisTemplateEngine.currentPageUnavailableHeight<0 || force==true) {
      thisTemplateEngine.currentPageUnavailableHeight=0;
      var navbarVisibility = thisTemplateEngine.getCurrentPageNavbarVisibility(thisTemplateEngine.currentPage);
      var heightStr = "Height: "+windowHeight;
      if ($('#top').css('display') != 'none' && $('#top').outerHeight(true)>0) {
        thisTemplateEngine.currentPageUnavailableHeight+=$('#top').outerHeight(true);
        heightStr+=" - "+$('#top').outerHeight(true);
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
        heightStr+=" - "+$('#bottom').outerHeight(true);
      }
      else {
        heightStr+=" - 0";
      }
      if (thisTemplateEngine.currentPageUnavailableHeight>0) {
        thisTemplateEngine.currentPageUnavailableHeight+=1;// remove an additional pixel for Firefox
      }
//      console.log(heightStr);
//      console.log(windowHeight+" - "+thisTemplateEngine.currentPageUnavailableHeight);
    }
    return windowHeight - thisTemplateEngine.currentPageUnavailableHeight;
  };

  /*
   * Make sure everything looks right when the window gets resized. This is
   * necessary as the scroll effect requires a fixed element size
   */
  this.handleResize = function(resize, skipScrollFix) {
    var uagent = navigator.userAgent.toLowerCase();
    var width = thisTemplateEngine.getAvailableWidth();
    var $main = $('#main');
    // if (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent)) {
    var mobileDevice = (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent));
    if (/(nexus 7|tablet)/i.test(uagent)) mobileDevice = false;  // Nexus 7 and Android Tablets have a "big" screen, so prevent Navbar from scrolling
    mobileDevice |= thisTemplateEngine.forceMobile;  // overwrite detection when set by URL
    if (mobileDevice) {
      $main.css('width', width);
      $('#pageSize').text('.page{width:' + (width - 0) + 'px;}');
      //do nothing
    } else {
      var height = thisTemplateEngine.getAvailableHeight();
      $main.css('width', width).css('height', height);
      $('#pageSize').text('.page{width:' + (width - 0) + 'px;height:' + height + 'px;}');
      if (($('#navbarTop').css('display')!="none" && $('#navbarTop').outerHeight(true)<=2)
          || ($('#navbarBottom').css('display')!="none" && $('#navbarBottom').innerHeight(true)<=2)) {
        // Top/Bottom-Navbar is not initialized yet, wait some time and recalculate available height
        // this is an ugly workaround, if someone can come up with a better solution, feel free to implement it
        window.setTimeout("templateEngine.correctHeight()",100);
      }
    }
    if (skipScrollFix === undefined) {
      if (thisTemplateEngine.adjustColumns()) {
        // the amount of columns has changed -> recalculate the widgets widths
        thisTemplateEngine.applyColumnWidths();
      }
    }
  };
  
  this.correctHeight = function() {
    var width = thisTemplateEngine.getAvailableWidth();
    var height = thisTemplateEngine.getAvailableHeight(true);
//    console.log("Correcting Height to "+height);
    $('#main').css('height', height);
    $('#pageSize').text('.page{width:' + (width - 0) + 'px;height:' + height + 'px;}');
  };
  

  this.rowspanClass = function(rowspan) {
    var className = 'rowspan rowspan' + rowspan;
    var styleId = className.replace(" ", "_") + 'Style';
    if (!$('#' + styleId).get(0)) {
      var dummyDiv = $(
          '<div class="clearfix" id="calcrowspan"><div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv" /></div></div>')
          .appendTo(document.body).show();

      var singleHeight = $('#containerDiv').outerHeight(false);
      var singleHeightMargin = $('#containerDiv').outerHeight(true);

      $('#calcrowspan').remove();

      // append css style
      $('head').append(
          '<style id="' + styleId + '">.rowspan.rowspan' + rowspan
              + ' { height: '
              + ((rowspan - 1) * singleHeightMargin + singleHeight)
              + 'px;} </style>').data(className, 1);
    }
    return className;
  };

  var pluginsToLoadCount = 0;
  var xml;
  this.parseXML = function(loaded_xml) {
    xml = loaded_xml;
    // erst mal den Cache für AJAX-Requests wieder aktivieren
    /*
    $.ajaxSetup({
      cache : true
    });
    */

    /*
     * First, we try to get a design by url Secondly, we try to get a predefined
     * design in the config file Otherwise we show the design selection dialog
     */

    // read predefined design in config
    predefinedDesign = $('pages', xml).attr("design");

    if ($('pages', xml).attr("backend")) {
      thisTemplateEngine.backend = $('pages', xml).attr("backend");
    }
    thisTemplateEngine.initBackendClient();

    thisTemplateEngine.scrollSpeed = $('pages', xml).attr("scroll_speed");
    var enableColumnAdjustment = null;
    if ($('pages', xml).attr('enable_column_adjustment')!=undefined) {
      enableColumnAdjustment = $('pages', xml).attr('enable_column_adjustment')=="true" ? true : false;
    }
    if ($('pages', xml).attr('bind_click_to_widget')!=undefined) {
      thisTemplateEngine.bindClickToWidget = $('pages', xml).attr('bind_click_to_widget')=="true" ? true : false;
    }
    if (enableColumnAdjustment) {
      thisTemplateEngine.enableColumnAdjustment = true;
    } else if (enableColumnAdjustment==null && /(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i
        .test(navigator.userAgent.toLowerCase())) {
      thisTemplateEngine.enableColumnAdjustment = true;
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

    $.getCSS( 'designs/designglobals.css' );
    $.getCSS( 'designs/' + thisTemplateEngine.clientDesign + '/basic.css' );
    $.getCSS( 'designs/' + thisTemplateEngine.clientDesign + '/mobile.css',
              thisTemplateEngine.forceMobile ? {} : 
              {media: 'only screen and (max-width: '
              + thisTemplateEngine.maxMobileScreenWidth + 'px)'} );
    $.getCSS( 'designs/' + thisTemplateEngine.clientDesign + '/custom.css' );
    $.getOrderedScripts( ['designs/' + thisTemplateEngine.clientDesign + '/design_setup.js'],
      function(){
        thisTemplateEngine.designReady = true;
        thisTemplateEngine.setup_page();
      }
    );

    // start with the plugins
    var pluginsToLoad = [];
    $('meta > plugins plugin', xml).each(function(i) {
      pluginsToLoadCount++;
      $.getOrderedScripts( ['plugins/' + $(this).attr('name') + '/structure_plugin.js'] );
    });
    if (pluginsToLoadCount==0) {
      // there are no plugins to load
      thisTemplateEngine.pluginsReady = true;
      thisTemplateEngine.setup_page();
    }

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
      thisTemplateEngine.mappings[name] = {};
      var formula = $this.find('formula');
      if (formula.length > 0) {
        eval('var func = function(x){' + formula.text() + '; return y;}');
        thisTemplateEngine.mappings[name]['formula'] = func;
      } else {
        $this.find('entry').each(function() {
          var $localThis = $(this);
          var origin = $localThis.contents();
          var value = [];
          for ( var i = 0; i < origin.length; i++) {
             var $v = $(origin[i]);
             if ($v.is('icon'))
               value[i] = icons.getIcon($v.attr('name'), $v.attr('type'), $v.attr('flavour'), $v.attr('color'));
             else
               value[i] = $v.text();
          }
          if ($localThis.attr('value')) {
            thisTemplateEngine.mappings[name][$localThis.attr('value')] = value.length == 1 ? value[0] : value;
          } else {
            if (!thisTemplateEngine.mappings[name]['range'])
              thisTemplateEngine.mappings[name]['range'] = {};
            thisTemplateEngine.mappings[name]['range'][parseFloat($localThis.attr('range_min'))] = [ parseFloat($localThis.attr('range_max')), value ];
          }
        });
      }
    });

    // then the stylings
    $('meta > stylings styling', xml).each(function(i) {
      var name = $(this).attr('name');
      var classnames = '';
      thisTemplateEngine.stylings[name] = {};
      $(this).find('entry').each(function() {
        classnames += $(this).text() + ' ';
        if ($(this).attr('value')) {
          thisTemplateEngine.stylings[name][$(this).attr('value')] = $(this).text();
        } else { // a range
          if (!thisTemplateEngine.stylings[name]['range'])
            thisTemplateEngine.stylings[name]['range'] = {};
          thisTemplateEngine.stylings[name]['range'][parseFloat($(this).attr('range_min'))] = [parseFloat($(this).attr('range_max')),$(this).text()];
        }
      });
      thisTemplateEngine.stylings[name]['classnames'] = classnames;
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
        search = search.replace(/.*(config=[^&]*).*|.*/, '?$1');

        // text = $(text).replaceWith( /(href="[^"]*)(")/g, '$1' + search + '$2'
        // );

        text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
        break;
      }
      $('.footer').html($('.footer').html() + text);
    });

    thisTemplateEngine.pageReady = true;
    thisTemplateEngine.setup_page();
  };
  
  /**
   * applies the correct width to the widgets corresponding to the given colspan setting 
   */
  this.applyColumnWidths = function() {
    // all containers
    var allContainer = $('.widget_container');
    allContainer.each(function(i, e) {
      var $e = $(e);
      var ourColspan = $e.children('*:first-child').data('colspan');
      if (ourColspan <= 0)
        return;
      var areaColspan = $e.parentsUntil('#centerContainer').last().data('columns') || thisTemplateEngine.defaultColumns;
      var ourWidth = Math.min(100, ourColspan / areaColspan * 100);
      $e.css('width', ourWidth + '%');
    });
    // and elements inside groups
    var adjustableElements = $('.group .widget_container');
    adjustableElements.each(function(i, e) {
      var $e = $(e);
      var ourColspan = $e.children('.widget').data('colspan');
      if (ourColspan <= 0)
        return;
      if (ourColspan == undefined) {
        // workaround for nowidget groups
        ourColspan = $e.children('.group').data('colspan');
      }
      var areaColspan = $e.parentsUntil('#centerContainer').last().data('columns') || thisTemplateEngine.defaultColumns;
      var groupColspan = Math.min(areaColspan, $e.parentsUntil(
          '.widget_container', '.group').data('colspan'));
      var ourWidth = Math.min(100, ourColspan / groupColspan * 100); // in
      // percent
      $e.css('width', ourWidth + '%');
    });
  };

  
  this.setup_page = function() {
    // and now setup the pages
    
    // check if the page and the plugins are ready now
    if( !this.pageReady || !this.pluginsReady || !this.designReady)
      return; // we'll be called again...
    
    var page = $('pages > page', xml)[0]; // only one page element allowed...

    thisTemplateEngine.create_pages(page, 'id_0');
    
    var startpage = 'id_0';
    if ($.getUrlVar('startpage')) {
      startpage='id_' + $.getUrlVar('startpage');
    }
    thisTemplateEngine.currentPage = $('#'+startpage);
    
    thisTemplateEngine.adjustColumns();
    thisTemplateEngine.applyColumnWidths();
    
    // Prevent elastic scrolling apart the main pane for iOS devices
    $(document).bind( 'touchmove', function(e) {
      e.preventDefault();
    });
    $('.page,#navbarTop>.navbar,#navbarBottom>.navbar').bind( 'touchmove', function(e) {
      var elem = $(e.currentTarget);
      var startTopScroll = elem.scrollTop();
      var startLeftScroll = elem.scrollLeft();
      
      // prevent scrolling of an element that takes full height and width
      // as it doesn't need scrolling
      if( (startTopScroll  <= 0) && (startTopScroll  + elem[0].offsetHeight >= elem[0].scrollHeight) &&
          (startLeftScroll <= 0) && (startLeftScroll + elem[0].offsetWidth  >= elem[0].scrollWidth ) )
      {
        return;
      }
      
      e.stopPropagation();
    });
    // stop the propagation if scrollable is at the end
    // inspired by https://github.com/joelambert/ScrollFix
    $('.page,#navbarTop>.navbar,#navbarBottom>.navbar').bind( 'touchstart', function(event) {
      var elem = $(event.currentTarget);
      var startTopScroll = elem.scrollTop();

      if(startTopScroll <= 0)
        elem.scrollTop(1);

      if(startTopScroll + elem[0].offsetHeight >= elem[0].scrollHeight)
        elem.scrollTop( elem[0].scrollHeight - elem[0].offsetHeight - 1 );
    });
    
    // setup the scrollable
    thisTemplateEngine.main_scroll = $('#main').scrollable({
      keyboard : false,
      touch : false
    }).data('scrollable');
    thisTemplateEngine.main_scroll.onSeek(thisTemplateEngine.pagePartsHandler.updateTopNavigation);
    if (thisTemplateEngine.scrollSpeed != undefined) {
      thisTemplateEngine.main_scroll.getConf().speed = thisTemplateEngine.scrollSpeed;
    }
   
    thisTemplateEngine.scrollToPage(startpage,0);

    $('.fast').bind('click', function() {
      thisTemplateEngine.main_scroll.seekTo($(this).text());
    });

    // reaction on browser back button
    window.onpopstate = function(e) {
      // where do we come frome?
      lastpage = e.state;
      if (lastpage) {
        // browser back button takes back to the last page
        thisTemplateEngine.scrollToPage(lastpage, 0, true);
      }
    };

    $('embed').each(function() {
      this.onload = function() {
        var svg = this.getSVGDocument();
        if( !svg ) return;
        
        // Pipe-O-Matic:
        var pipes = svg.getElementsByClassName('pipe_group');
        $(pipes).each(function() {
          var pipe_group = this;
          $(this).find('path').each(function() {
            var path = this;
            var halfsize = parseInt(parseFloat(path.style.strokeWidth) / 2);
            var opacity = 0.15;
            for ( var width = halfsize - 1; width > 0; width--) {
              opacity -= 0.1 / halfsize;
              var n = path.cloneNode();
              n.className.baseVal += ' pipe-o-matic_clone';
              n.style.strokeWidth = width * 2;
              n.style.stroke = '#ffffff';
              n.style.strokeOpacity = opacity;
              pipe_group.insertBefore(n,
                  path.nextElementSibling);
            }
          });
        });

        // Flow-O-Matic: add Paths
        var segmentLength = 40;
        var pipes = svg.getElementsByClassName('show_flow');
        $(pipes).each(function() {
          var pipe_group = this;
          var length = 0.0;
          $(this).find('path').each(function() {
            var path = this;
            if (path.className.animVal.split(' ')
                .indexOf('pipe-o-matic_clone') > 0)
              return;
            var stroke = path.style.stroke;
            var r, g, b;
            if (stroke[0] == '#') {
              r = parseInt(path.style.stroke.substring( 1, 3), 16);
              g = parseInt(path.style.stroke.substring( 3, 5), 16);
              b = parseInt(path.style.stroke.substring( 5, 7), 16);
            } else if (stroke.indexOf('rgb(') == 0) {
              var colors = stroke.replace(/[^0-9,.]*/g,'').split(',');
              r = colors[0];
              g = colors[1];
              b = colors[2];
            }
            var rTarget = 0; // this color should be
            // somehow user setable -
            // but how?
            var gTarget = 0;
            var bTarget = 0;
            function toHex(v) {
              var ret = parseInt(v).toString(16);
              return (ret.length < 2) ? '0' + ret : ret;
            }
            for ( var i = segmentLength / 2; i > 0; i -= 2) {
              var factor = 1 - i / (segmentLength / 2);
              var offset = (length + segmentLength / 2 - i)
              % segmentLength;
              var low = 2 * i;
              var high = segmentLength - low;
              var n = path.cloneNode();
              n.className.baseVal += ' flow-o-matic_clone';
              n.style.stroke = '#'+ toHex(r * factor + rTarget * (1 - factor))+ toHex(g * factor + gTarget* (1 - factor))+ toHex(b * factor + bTarget* (1 - factor));
              if (high > offset) {
                n.style.strokeDasharray = [high - offset, low, offset, 0 ];
              } else {
                n.style.strokeDasharray = [ 0,low - (offset - high), high, offset - high ];
              }
              n.style.strokeDashoffset = length % (0.5 * segmentLength);
              pipe_group.insertBefore(n, path.nextElementSibling);
            }
            length += path.getTotalLength();
          });
          if (this.attributes.getNamedItem('data-cometvisu-active')) {
            activeValues = this.attributes.getNamedItem('data-cometvisu-active').value;
            $(activeValues.split(' ')).each(function() {
              $('body').bind('_' + this,function(e, data, passedElement) {
                if (data == '01')
                  // pipe_group.classList.add('flow_active');
                  pipe_group.setAttribute('class',pipe_group.getAttribute('class').replace(' flow_active', '')+ ' flow_active');
                else
                  pipe_group.setAttribute('class',pipe_group.getAttribute('class').replace(' flow_active', ''));
                // pipe_group.classList.remove('flow_active');
              });
            });
          }
        });

        // Flow-O-Matic: add CSS
        // helper for multiple bowser support
        function createKeyframe(name, content) {
          return '@keyframes ' + name + " {\n" + content + "}\n"
          + '@-moz-keyframes ' + name + " {\n" + content + "}\n"
          + '@-webkit-keyframes ' + name + " {\n" + content + "}\n";
        }
        var keyframes = createKeyframe('move',
            "from {  stroke-dashoffset: " + segmentLength + ";  }\n"
            + "to   {  stroke-dashoffset: 0;  }\n");
        function createCSSRules(style, value) {
          return style + ': ' + value + ";\n" + '-moz-' + style + ': '
          + value + ";\n" + '-webkit-' + style + ': ' + value
          + ";\n";
        }
        keyframes += ".flow_active path {\n"
          + createCSSRules('animation-duration', '3s')
          + createCSSRules('animation-name', 'move')
          + createCSSRules('animation-timing-function', 'linear')
          + createCSSRules('animation-iteration-count', 'infinite')
          + "}\n";
        var s = svg.createElementNS('http://www.w3.org/2000/svg',
        'style');
        s.setAttribute('type', 'text/css');
        s.textContent = keyframes;
        $('svg', svg).prepend(s);
      };
    });
    if (thisTemplateEngine.enableAddressQueue) {
      // identify addresses on startpage
      var startPageAddresses = {};
      $('.actor','#'+startpage).each(function() {
        var address = $(this).data('address');
        for (var ga in address) {
          startPageAddresses[ga.substring(1)]=1;
        }
      });
      thisTemplateEngine.visu.setInitialAddresses(Object.keys(startPageAddresses));
    }
    thisTemplateEngine.visu.subscribe(thisTemplateEngine.getAddresses());
    
    delete xml; // not needed anymore - free the space
//    $(window).trigger('resize');
    $("#pages").triggerHandler("done");
    if( undefined !== thisTemplateEngine.screensave_time )
    {
      thisTemplateEngine.screensave = setTimeout( function(){thisTemplateEngine.scrollToPage();}, thisTemplateEngine.screensave_time*1000 );
      $(document).click( function(){
        clearInterval( thisTemplateEngine.screensave );
        thisTemplateEngine.screensave = setTimeout( function(){thisTemplateEngine.scrollToPage();}, thisTemplateEngine.screensave_time*1000 );
      });
    }
  };

  this.create_pages = function(page, path, flavour, type) {

    var creator = thisTemplateEngine.design.getCreator(page.nodeName);
    var retval = creator.create(page, path, flavour, type);

    if (jQuery(retval).is(".widget") || (jQuery(retval).is(".group"))) {
      retval = jQuery(
          "<div class='widget_container "
              + (retval.data("rowspanClass") ? retval.data("rowspanClass") : '')
              + "' />").append(retval);
    }

    return retval;
  };

  this.scrollToPage = function(page_id, speed, skipHistory) {
    if( undefined === page_id )
      page_id = this.screensave_page;
    
    if (page_id.match(/^id_[0-9_]+$/) == null) {
      // find Page-ID by name
      $('.page h1:contains(' + page_id + ')', '#pages').each(function(i) {
        if ($(this).text() == page_id) {
          page_id = $(this).closest(".page").attr("id");
        }
      });
    }
    // don't scroll when target is already active
    if( thisTemplateEngine.currentPageID == page_id )
      return;
    thisTemplateEngine.currentPageID = page_id;
    
    $('.activePage', '#pages').removeClass('activePage');
    $('.pageActive', '#pages').removeClass('pageActive');
    $('.pagejump.active').removeClass('active');
    $('.pagejump.active_ancestor').removeClass('active_ancestor');
    thisTemplateEngine.resetPageValues();
    
    var page = $('#' + page_id);
    
    thisTemplateEngine.currentPage = page;

    page.addClass('pageActive activePage');// show new page
    // update visibility ob navbars, top-navigation, footer
    thisTemplateEngine.pagePartsHandler.updatePageParts(page);

    if (thisTemplateEngine.main_scroll.getConf().speed > 0) {
      var scrollLeft = true;
      if (skipHistory) {
        // moving back in history -> scroll right
        scrollLeft = false;
      } else {
        var expr = new RegExp("^" + page_id + ".*", "i");
        if (expr.test(window.history.state)) {
          // moving up the page tree -> scroll right
          scrollLeft = false;
        }
      }
      // jump to the page on the left of the page we need to scroll to
      if (scrollLeft) {
        $('#pages').css('left', -page.position().left + page.width());
      } else {
        $('#pages').css('left', -page.position().left - page.width());
      }
    }
    // push new state to history
    if (skipHistory === undefined)
      window.history.pushState(page_id, page_id, window.location.href);

    thisTemplateEngine.main_scroll.seekTo(page, speed); // scroll to it

    // show the navbars for this page
    /*
     * $('#'+page_id+'_top_navbar').addClass('navbarActive');
     * $('#'+page_id+'_right_navbar').addClass('navbarActive');
     * $('#'+page_id+'_bottom_navbar').addClass('navbarActive');
     * $('#'+page_id+'_left_navbar').addClass('navbarActive');
     */
    thisTemplateEngine.pagePartsHandler.initializeNavbars(page_id);

    // set pagejump for this page to active if it exists
    $(".pagejump > .actor").each(
        function(i) {
          var activePageJump = null;
          var actor = $(this);
          var target = actor.data().target;
          if (target.match(/^id_[0-9_]+$/) == null) {
            // get page id by name
            $('h1:contains(' + target + ')', '#' + page_id).each(function(i) {
              if ($(this).text() == target) {
            	activePageJump = actor.closest('.pagejump');
                return false;
              }
            });
          } else if (page_id == target) {
            activePageJump = actor.closest('.pagejump');
          }
          if (activePageJump != null) {
            activePageJump.addClass('active');
          }
          if (page.attr('id')!="id_0") {
            var parentPage = thisTemplateEngine.getParentPage(page);
            while (parentPage != null) {
              if (parentPage.attr('id') == "id_0") {
                // root is always an active ancestor, no need to specify that
                break;
              }
              $(".pagejump > .actor").each(
                  function(i) {
                    var parentActor = $(this);
                    var parentTarget = parentActor.data().target;
                    if (parentTarget==undefined) return true;
                    if (parentTarget.match(/^id_[0-9_]+$/) == null) {
                      // get page id by name
                      $('h1:contains(' + parentTarget + ')',
                          '#' + parentPage.attr('id')).each(function(i) {
                        if ($(this).text() == parentTarget) {
                          parentActor.closest('.pagejump').addClass('active_ancestor');
                          return false;
                        }
                      });
                    } else if (parentPage.attr('id') == parentTarget) {
                      parentActor.closest('.pagejump').addClass('active_ancestor');
                    }
                  });
              parentPage = thisTemplateEngine.getParentPage(parentPage);
            }
          }
        });
    $(window).trigger('scrolltopage', page_id);    
  };

 

  /*
   * Show a popup of type "type". The attributes is an type dependend object
   * This function returnes a jQuery object that points to the whole popup, so
   * it's content can be easily extended
   */
  this.showPopup = function(type, attributes) {
    // var retval = design.popups[ type ].create( attributes ); //page, path );
    // return retval;
    if (!thisTemplateEngine.design.popups[type])
      type = 'unknown';

    return thisTemplateEngine.design.popups[type].create(attributes);
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

  this.setupRefreshAction = function() {
    var refresh = $(this).data('refresh');
    if (refresh && refresh > 0) {
      var target = $('img', $(this))[0] || $('iframe', $(this))[0];
      var src = target.src;
      if (src.indexOf('?') < 0)
        src += '?';
      $(this).data('interval', setInterval(function() {
        thisTemplateEngine.refreshAction(target, src);
      }, refresh));
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

    $.getJSON("get_designs.php",function(data) {
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
        .append("<img width=\"60\" height=\"30\" src=\"media/arrow.png\" alt=\"select\" border=\"0\" style=\"margin: 60px 10px 10px 30px;\"/>");

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

  this.getParentPage = function(page) {
    var pathParts = page.attr('id').split('_');
    if (pathParts.length == 2) {
      // top-level (id_x)-> no parent pages
      return null;
    }
    while (pathParts.length > 1) {
      pathParts.pop();
      var path = pathParts.join('_');
      if ($('#' + path).hasClass("page")) {
        return $('#' + path);
      }
    }
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
    if( 0 == pluginsToLoadCount )
    {
      thisTemplateEngine.pluginsReady = true;
      thisTemplateEngine.setup_page();
    }
  }
}

function PagePartsHandler() {
  var thisPagePartsHandler = this;
  this.navbars = { // store informations about the nav bars
      top : {
        dynamic : false
      },
      left : {
        dynamic : false
      },
      right : {
        dynamic : false
      },
      bottom : {
        dynamic : false
      }
    };
  
  this.updateTopNavigation = function() {
    var path = $('#main .page').eq(this.getIndex()).attr('id').split('_');
    var id = 'id_'; // path[0];
    var nav = '';
    for ( var i = 1; i < path.length; i++) { // element 0 is id_ (JNK)
      id += path[i];
      if ($('#' + id).hasClass("page")) {
        nav += ((1 == i) ? '' : '<span> &#x25ba; </span>')
            + '<a href="javascript:templateEngine.scrollToPage(\'' + id + '\')">'
            + $('#' + id + ' h1').text() + '</a>';
      }
      id += '_';
    }
    $('.nav_path').html(nav);
    templateEngine.handleResize();    
  };

  /**
   * Change the size of the selected navbar
   * 
   * currently only "left" and "right" are implemented
   */
  this.navbarSetSize = function(position, size) {
    var cssSize = size + (isFinite(size) ? 'px' : '');
    switch (position) {
    case 'left':
      $('#navbarLeft').css({
        width : cssSize
      });
      break;

    case 'right':
      $('#centerContainer').css('padding-right', cssSize);
      $('#navbarRight').css({
        width : cssSize,
        'margin-right' : '-' + cssSize
      });
      break;
    }
  };
  
  this.getNavbarsVisibility = function(page) {
    if (templateEngine.currentPageNavbarVisibility==null) {
      if (page==null) {
        page = templateEngine.currentPage;
      }
      if (page==null || page.data()==null) return { top : 'true', bottom : 'true', left : 'true', right : 'true' };
      var shownavbar = (page.data().shownavbar != undefined ? page.data().shownavbar : {
        top : 'inherit',
        bottom : 'inherit',
        left : 'inherit',
        right : 'inherit'
      });
      
      // set inherit for undefined 
      for (var pos in shownavbar) {
        if (shownavbar[pos] == undefined) {
          shownavbar[pos] = 'inherit';
        }
      }
      if (page.data() != null) {
        // traverse up the page tree for shownavbar
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          // do we need to go further? Check for inheritance
          var inherit = false;
          for (var pos in shownavbar) {
            if (shownavbar[pos] == 'inherit') {
              inherit = true;
              break;
            }
          }
          if (inherit) {
            if (parentPage.data().shownavbar != undefined) {
              for (var pos in shownavbar) {
                if (shownavbar[pos] == 'inherit') {
                  // set value of parent page
                  shownavbar[pos] = parentPage.data().shownavbar[pos];
                  if (shownavbar[pos] == undefined) {
                    shownavbar[pos] = 'inherit';
                  }
                }
              }
            }
          } else {
            // we are done
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
      // set default values for shownavbar if not set otherwise
      for (var pos in shownavbar) {
        if (shownavbar[pos] == undefined || shownavbar[pos] == 'inherit') {
          shownavbar[pos] = 'true';
        }
      }
      templateEngine.currentPageNavbarVisibility = shownavbar;
//      console.log(shownavbar);
    }
    return templateEngine.currentPageNavbarVisibility;
  };

  /**
   * update the visibility ob top-navigation, footer and navbar for this page
   * 
   * @param page
   */
  this.updatePageParts = function(page) {
    // default values
    var showtopnavigation = true;
    var showfooter = true;
    var shownavbar = thisPagePartsHandler.getNavbarsVisibility(page);
    if (page.data() != null) {
      if (page.data().showtopnavigation != undefined) {
        showtopnavigation = page.data().showtopnavigation != "false";
      } else {
        // traverse up the page tree
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          if (parentPage.data().showtopnavigation != undefined) {
            showtopnavigation = parentPage.data().showtopnavigation != "false";
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
      if (page.data().showfooter != undefined) {
        showfooter = page.data().showfooter != "false";
      } else {
        // traverse up the page tree
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          if (parentPage.data().showfooter != undefined) {
            showfooter = parentPage.data().showfooter != "false";
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
    }
    
    if (showtopnavigation) {
      if ($('#top').css("display") == "none") {
        $('#top, #top > *').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    } else {
      $('#top.loading').removeClass('loading');
      if ($('#top').css("display") != "none") {
        $('#top').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    }
    if (showfooter) {
      if ($('#bottom').css("display") == "none") {
        $('#bottom').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    } else {
      // the loading class prevents any element from beeing disabled, we have to
      // remove it
      $('#bottom.loading').removeClass('loading');
      if ($('#bottom').css("display") != "none") {
        $('#bottom').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    }
    $.each([ 'Left', 'Top', 'Right', 'Bottom' ], function(index, value) {
      var key = value.toLowerCase();
      if (shownavbar[key] == 'true') {
        if ($('#navbar' + value).css("display") == "none") {
          thisPagePartsHandler.fadeNavbar(value, "in");
          thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
        }
      } else {
        // the loading class prevents any element from being disabled, we have
        // to remove it
        $('#navbar' + value + '.loading').removeClass('loading');
        if ($('#navbar' + value).css("display") != "none") {
          thisPagePartsHandler.fadeNavbar(value, "out");
        }
      }
    });
  };

  /**
   * fades in/out a navbar
   * 
   * @param position
   *                [Top|Left|Right|Bottom]
   * @param direction
   *                [in|out]
   */
  this.fadeNavbar = function(position, direction) {
    var initCss = {};
    var targetCss = {};
    var navbar = $('#navbar' + position);
    var key = position.toLowerCase();
    var fn = function() {
      
    };
    switch (direction) {
    case "in":
      if (navbar.css('display') == 'none') {
        initCss.display = 'block';
      }
      targetCss[key] = 0;
      switch (position) {
      case "Top":
      case "Bottom":
        initCss[key] = -navbar.height();
        break;
      case "Left":
      case "Right":
        initCss[key] = -navbar.width();
        break;
      }
      break;
    case "out":
      if (navbar.css("display") != "none") {
        fn = function() {
          navbar.css("display", "none");
        };
      }
      switch (position) {
      case "Top":
      case "Bottom":
        targetCss[key] = -navbar.height();
        break;
      case "Left":
      case "Right":
        targetCss[key] = -navbar.width();
        break;
      }
      break;
    }
    navbar.css(initCss);
    if (templateEngine.main_scroll.getConf().speed == 0) {
      navbar.css(targetCss);
      fn();
    } else {
      navbar.animate(targetCss, templateEngine.main_scroll.getConf().speed, templateEngine.main_scroll.getConf().easing, fn);
    }
  };

  /**
   * traverse down the page tree from root page id_0 -> .. -> page_id activate
   * all navbars in that path deactivate all others
   * 
   * @param page_id
   */
  this.initializeNavbars = function(page_id) {
    thisPagePartsHandler.removeInactiveNavbars(page_id);
    var tree = [ $('#id_0').get(0) ];
    if (page_id != "id_0") {
      var parts = page_id.split("_");
      parts = parts.slice(2, parts.length);
      for ( var i = 0; i < parts.length; i++) {
        var item = $('#id_0_' + parts.slice(0, i + 1).join('_') + ".page",
            '#pages');
        if (item.size() == 1) {
          tree.push(item.get(0));
        }
      }
    }
    var level = 1;
    $(tree).each(function(i) {
      var id = $(this).attr('id');
      var topNav = $('#' + id + '_top_navbar');
      var rightNav = $('#' + id + '_right_navbar');
      var bottomNav = $('#' + id + '_bottom_navbar');
      var leftNav = $('#' + id + '_left_navbar');
      // console.log(tree.length+"-"+level+"<="+topNav.data('scope'));
      if (topNav.size() > 0) {
        if (topNav.data('scope') == undefined || topNav.data('scope') < 0
            || tree.length - level <= topNav.data('scope')) {
          topNav.addClass('navbarActive');
        } else {
          topNav.removeClass('navbarActive');
        }
      }
      if (rightNav.size() > 0) {
        if (rightNav.data('scope') == undefined
            || rightNav.data('scope') < 0
            || tree.length - level <= rightNav.data('scope')) {
          rightNav.addClass('navbarActive');
        } else {
          rightNav.removeClass('navbarActive');
        }
      }
      if (bottomNav.size() > 0) {
        if (bottomNav.data('scope') == undefined
            || bottomNav.data('scope') < 0
            || tree.length - level <= bottomNav.data('scope')) {
          bottomNav.addClass('navbarActive');
        } else {
          bottomNav.removeClass('navbarActive');
        }
      }
      if (leftNav.size() > 0) {
        if (leftNav.data('scope') == undefined || leftNav.data('scope') < 0
            || tree.length - level <= leftNav.data('scope')) {
          leftNav.addClass('navbarActive');
        } else {
          leftNav.removeClass('navbarActive');
        }
      }
      level++;
    });
  };

  this.removeInactiveNavbars = function(page_id) {
    // remove all navbars that do not belong to this page
    $('.navbar.navbarActive').each(function(i) {
      var navBarPath = this.id.split('_');
      // skip last 2 elements e.g. '_top_navbar'
      navBarPath = navBarPath.slice(0, navBarPath.length - 2).join('_');
      var expr = new RegExp("^" + navBarPath + ".*", "i");
      if (navBarPath != page_id && !expr.test(page_id)) {
        $(this).removeClass('navbarActive');
      }
    });
  };
}