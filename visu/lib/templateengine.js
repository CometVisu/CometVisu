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

var design = new VisuDesign_Custom();
var icons = new icon();

var mappings = {}; // store the mappings
var stylings = {}; // store the stylings
var navbars = { // store informations about the nav bars
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

var ga_list = [];

var main_scroll;
var old_scroll = '';

var scrollSpeed;

var resizeAfterScroll = false;
var defaultColumns = 12;
var minColumnWidth = 150;
var enableColumnAdjustment = false;
if (backend == undefined) {
  var backend = "cgi";
}
if ($.getUrlVar("backend")) {
  backend = $.getUrlVar("backend");
}

var backendConfig = {
  baseUrl : '/cgi-bin/',
};

function initBackendClient(backend) {
  if (backend.toLowerCase() == 'oh') {
    backendConfig.baseUrl = '/cv/';
  }

  visu = new CometVisu(backendConfig.baseUrl);
  visu.update = function(json) { // overload the handler
    for (key in json) {
      $.event.trigger('_' + key, json[key]);
    }
  };
  visu.user = 'demo_user'; // example for setting a user
}

var configSuffix;
if ($.getUrlVar("config")) {
  configSuffix = $.getUrlVar("config");
}

var clientDesign = "";

if (typeof forceReload == "undefined") {
  var forceReload = false;
}

if ($.getUrlVar('forceReload')) {
  forceReload = $.getUrlVar('forceReload') != 'false'; // true unless set to
                                                        // false
}

// "Bug"-Fix for ID: 3204682 "Caching on web server"
// This isn't a real fix for the problem as that's part of the web browser, but
// it helps to avoid the problems on the client, e.g. when the config file
// has changed but the browser doesn't even ask the server about it...
forceReload = true;

// Disable features that aren't ready yet
// This can be overwritten in the URL with the parameter "maturity"
var use_maturity;
if ($.getUrlVar('maturity')) {
  var url_maturity = $.getUrlVar('maturity');
  if (!isNaN(url_maturity - 0)) {
    use_maturity = url_maturity - 0; // given directly as number
  } else {
    use_maturity = Maturity[url_maturity]; // or as the ENUM name
  }
}

if (isNaN(use_maturity)) {
  use_maturity = Maturity.release; // default to release
}

$(document)
    .ready(
        function() {
          // get the data once the page was loaded
          $
              .ajax({
                url : 'visu_config' + (configSuffix ? '_' + configSuffix : '')
                    + '.xml',
                cache : !forceReload,
                success : parseXML,
                error : function(jqXHR, textStatus, errorThrown) {
                  var message = 'Config-File Error! ';
                  switch (textStatus) {
                  case 'parsererror':
                    message += '<br />Invalid config file!<br /><a href="check_config.php?config='
                        + configSuffix + '">Please check!</a>';
                  }
                  $('#loading').html(message);
                },
                dataType : 'xml'
              });
        });

$(window).unload(function() {
  visu.stop();
});

function transformEncode(transformation, value) {
  var basetrans = transformation.split('.')[0];
  return transformation in Transform ? Transform[transformation].encode(value)
      : (basetrans in Transform ? Transform[basetrans].encode(value) : value);
}

function transformDecode(transformation, value) {
  var basetrans = transformation.split('.')[0];
  return transformation in Transform ? Transform[transformation].decode(value)
      : (basetrans in Transform ? Transform[basetrans].decode(value) : value);
}

function map(value, this_map) {
  if (this_map && mappings[this_map]) {
    var m = mappings[this_map];

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
}

function adjustColumns() {
  if (enableColumnAdjustment == false)
    return false;

  var factor = window.devicePixelRatio || 1;
  var widthNavbarLeft = $('#navbarLeft').css('display') != 'none' ? $(
      '#navbarLeft').width() : 0;
  var widthNavbarRight = $('#navbarRight').css('display') != 'none' ? $(
      '#navbarRight').width() : 0;
  var width = $('body').width() - widthNavbarLeft - widthNavbarRight - 1; // remove
                                                                          // an
                                                                          // additional
                                                                          // pixel
                                                                          // for
                                                                          // Firefox
  width = width / factor;

  var $main = $('#main');
  var newColumns = $main.data('columns');
  newColumns = (Math.ceil(width / minColumnWidth) % 2) > 0 ? Math.ceil(width
      / minColumnWidth) + 1 : Math.ceil(width / minColumnWidth);
  newColumns = Math.min(defaultColumns, newColumns);
  if (newColumns > defaultColumns / 2 && defaultColumns > newColumns)
    newColumns = defaultColumns;

  if (newColumns != $main.data('columns')) {
    $main.data({
      'columns' : newColumns
    });
    return true;
  } else {
    return false;
  }
}

/*
 * Make sure everything looks right when the window gets resized. This is
 * necessary as the scroll effect requires a fixed element size
 */
function handleResize(resize, skipScrollFix) {
  var uagent = navigator.userAgent.toLowerCase();
  var widthNavbarLeft = $('#navbarLeft').css('display') != 'none' ? $(
      '#navbarLeft').width() : 0;
  var widthNavbarRight = $('#navbarRight').css('display') != 'none' ? $(
      '#navbarRight').width() : 0;
  var width = $('body').width() - widthNavbarLeft - widthNavbarRight - 1; // remove
                                                                          // an
                                                                          // additional
                                                                          // pixel
                                                                          // for
                                                                          // Firefox

  var $main = $('#main');
  if (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i
      .test(uagent)) {
    $main.css('width', width);
    $('#pageSize').text('.page{width:' + (width - 0) + 'px;}');
    // do nothing
  } else {
    var height = $(window).height() - $main.position().top;
    if ($('#navbarBottom').css('display') != 'none') {
      height -= $('#navbarBottom').outerHeight(true) - 1;
    }
    if ($('#bottom').css('display') != 'none') {
      height -= $('#bottom').outerHeight(true) - 1;
    }
    $main.css('width', width).css('height', height);
    $('#pageSize').text(
        '.page{width:' + (width - 0) + 'px;height:' + height + 'px;}');
  }
  if (skipScrollFix === undefined) {
    if (adjustColumns()) {
      var allContainer = $('.widget_container');
      allContainer.each(function(i, e) {
        var $e = $(e);
        var ourColspan = $e.children('*:first-child').data('colspan');
        if (ourColspan <= 0)
          return;
        var areaColspan = $e.parentsUntil('#centerContainer').last().data(
            'columns')
            || defaultColumns;
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
        var areaColspan = $e.parentsUntil('#centerContainer').last().data(
            'columns')
            || defaultColumns;
        var groupColspan = Math.min(areaColspan, $e.parentsUntil(
            '.widget_container', '.group').data('colspan'));
        var ourWidth = Math.min(100, ourColspan / groupColspan * 100); // in
                                                                        // percent
        $e.css('width', ourWidth + '%');
      });
    }
    // main_scroll != undefined && main_scroll.seekTo( main_scroll.getIndex(), 0
    // ); // fix scroll
  }
}
$(window).bind('resize', handleResize);

function rowspanClass(rowspan) {
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
}

function parseXML(xml) {
  // erst mal den Cache für AJAX-Requests wieder aktivieren
  $.ajaxSetup({
    cache : true
  });

  /*
   * First, we try to get a design by url Secondly, we try to get a predefined
   * design in the config file Otherwise we show the design selection dialog
   */

  // read predefined design in config
  predefinedDesign = $('pages', xml).attr("design");

  if ($('pages', xml).attr("backend")) {
    backend = $('pages', xml).attr("backend");
  }
  initBackendClient(backend);

  scrollSpeed = $('pages', xml).attr("scroll_speed");
  if ($('pages', xml).attr('enable_column_adjustment') == "true") {
    enableColumnAdjustment = true;
  } else if (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i
      .test(navigator.userAgent.toLowerCase())) {
    enableColumnAdjustment = true;
  }
  if ($('pages', xml).attr('default_columns')) {
    defaultColumns = $('pages', xml).attr('default_columns');
  }
  if ($('pages', xml).attr('min_column_width')) {
    minColumnWidth = $('pages', xml).attr('min_column_width');
  }

  // design by url
  if ($.getUrlVar("design")) {
    clientDesign = $.getUrlVar("design");
  }
  // design by config file
  else if (predefinedDesign) {
    clientDesign = predefinedDesign;
  }
  // selection dialog
  else {
    selectDesign();
  }
  var maxMobileScreenWidth = $('pages', xml).attr('max_mobile_screen_width') || 480;

  $('head')
      .append(
          '<link rel="stylesheet" type="text/css" href="designs/designglobals.css" />');
  $('head').append(
      '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign
          + '/basic.css" />');
  $('head').append(
      '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign
          + '/mobile.css" media="only screen and (max-device-width: '
          + maxMobileScreenWidth + 'px)" />');
  $('head').append(
      '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign
          + '/custom.css" />');
  $('head').append(
      '<script src="designs/' + clientDesign
          + '/design_setup.js" type="text/javascript" />');

  // start with the plugins
  var pluginsToLoad = 0;
  $('meta > plugins plugin', xml).each(function(i) {
    pluginsToLoad += 1;
    var name = 'plugins/' + $(this).attr('name') + '/structure_plugin.js';
    if (forceReload)
      name += '?_=' + (new Date().getTime());
    var html_doc = document.getElementsByTagName('body')[0];
    js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', name);
    html_doc.appendChild(js);

    js.onreadystatechange = function() {
      if (js.readyState == 'complete') {
        pluginsToLoad -= 1;
        if (pluginsToLoad <= 0) {
          setup_page(xml);
        }
      }
    };

    js.onload = function() {
      pluginsToLoad -= 1;
      if (pluginsToLoad <= 0) {
        setup_page(xml);
      }
    };
  });

  // then the mappings
  $('meta > mappings mapping', xml).each(
      function(i) {
        var $this = $(this);
        var name = $this.attr('name');
        mappings[name] = {};
        var formula = $this.find('formula');
        if (formula.length > 0) {
          eval('var func = function(x){' + formula.text() + '; return y;}');
          mappings[name]['formula'] = func;
        } else {
          $this.find('entry').each(
              function() {
                var $localThis = $(this);
                var value = $localThis.contents();
                for ( var i = 0; i < value.length; i++) {
                  var $v = $(value[i]);
                  if ($v.is('icon'))
                    value[i] = icons.getIcon($v.attr('name'));
                }

                if ($localThis.attr('value')) {
                  mappings[name][$localThis.attr('value')] = value;
                } else {
                  if (!mappings[name]['range'])
                    mappings[name]['range'] = {};
                  mappings[name]['range'][parseFloat($localThis
                      .attr('range_min'))] = [
                      parseFloat($localThis.attr('range_max')), value ];
                }
              });
        }
      });

  // then the stylings
  $('meta > stylings styling', xml)
      .each(
          function(i) {
            var name = $(this).attr('name');
            var classnames = '';
            stylings[name] = {};
            $(this).find('entry')
                .each(
                    function() {
                      classnames += $(this).text() + ' ';
                      if ($(this).attr('value')) {
                        stylings[name][$(this).attr('value')] = $(this).text();
                      } else { // a range
                        if (!stylings[name]['range'])
                          stylings[name]['range'] = {};
                        stylings[name]['range'][parseFloat($(this).attr(
                            'range_min'))] = [
                            parseFloat($(this).attr('range_max')),
                            $(this).text() ];

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

    // skip this element if it's edit-only and we are non-edit, or the other way
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

  if (pluginsToLoad <= 0) {
    setup_page(xml);
  }
}

function setup_page(xml) {
  // and now setup the pages
  var page = $('pages > page', xml)[0]; // only one page element allowed...

  // read topbar datetime format
  var topbar_datetime = $('meta > topbar_datetime > strftime', xml);

  // if definition exists in xml
  if (topbar_datetime.length) {
    // get creator for strftime plugin
    var creator = design.getCreator('strftime');
    // get rendered datetime div
    var retval = creator.create(topbar_datetime, 'id_0').html();
    // show on top right corner
    $('#top .nav_additional').html(retval);
  }

  create_pages(page, 'id_0');

  adjustColumns();
  // all containers
  var allContainer = $('.widget_container');
  allContainer.each(function(i, e) {
    var $e = $(e);
    var ourColspan = $e.children('*:first-child').data('colspan');
    if (ourColspan <= 0)
      return;
    var areaColspan = $e.parentsUntil('#centerContainer').last()
        .data('columns')
        || defaultColumns;
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
    var areaColspan = $e.parentsUntil('#centerContainer').last()
        .data('columns')
        || defaultColumns;
    var groupColspan = Math.min(areaColspan, $e.parentsUntil(
        '.widget_container', '.group').data('colspan'));
    var ourWidth = Math.min(100, ourColspan / groupColspan * 100); // in
                                                                    // percent
    $e.css('width', ourWidth + '%');
  });

  // setup the scrollable
  main_scroll = $('#main').scrollable({
    keyboard : false,
    touch : false
  }).data('scrollable');
  main_scroll.onSeek(updateTopNavigation);
  if (scrollSpeed != undefined) {
    main_scroll.getConf().speed = scrollSpeed;
  }

  if ($.getUrlVar('startpage')) {
    scrollToPage('id_' + $.getUrlVar('startpage'), 0);
  } else {
    scrollToPage('id_0', 0); // simple solution to show page name on top at
                              // start
  }

  $('.fast').bind('click', function() {
    main_scroll.seekTo($(this).text());
  });

  // reaction on browser back button
  window.onpopstate = function(e) {
    // where do we come frome?
    lastpage = e.state;
    if (lastpage) {
      // browser back button takes back to the last page
      scrollToPage(lastpage, 0, true);
    }
  };

  $('embed')
      .each(
          function() {
            this.onload = function() {
              var svg = this.getSVGDocument();

              // Pipe-O-Matic:
              var pipes = svg.getElementsByClassName('pipe_group');
              $(pipes)
                  .each(
                      function() {
                        var pipe_group = this;
                        $(this)
                            .find('path')
                            .each(
                                function() {
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
              $(pipes)
                  .each(
                      function() {
                        var pipe_group = this;
                        var length = 0.0;
                        $(this)
                            .find('path')
                            .each(
                                function() {
                                  var path = this;
                                  if (path.className.animVal.split(' ')
                                      .indexOf('pipe-o-matic_clone') > 0)
                                    return;
                                  var stroke = path.style.stroke;
                                  var r, g, b;
                                  if (stroke[0] == '#') {
                                    r = parseInt(path.style.stroke.substring(1,
                                        3), 16);
                                    g = parseInt(path.style.stroke.substring(3,
                                        5), 16);
                                    b = parseInt(path.style.stroke.substring(5,
                                        7), 16);
                                  } else if (stroke.indexOf('rgb(') == 0) {
                                    var colors = stroke.replace(/[^0-9,.]*/g,
                                        '').split(',');
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
                                    n.style.stroke = '#'
                                        + toHex(r * factor + rTarget
                                            * (1 - factor))
                                        + toHex(g * factor + gTarget
                                            * (1 - factor))
                                        + toHex(b * factor + bTarget
                                            * (1 - factor));
                                    if (high > offset) {
                                      n.style.strokeDasharray = [
                                          high - offset, low, offset, 0 ];
                                    } else {
                                      n.style.strokeDasharray = [ 0,
                                          low - (offset - high), high,
                                          offset - high ];
                                    }
                                    n.style.strokeDashoffset = length
                                        % (0.5 * segmentLength);
                                    pipe_group.insertBefore(n,
                                        path.nextElementSibling);
                                  }
                                  length += path.getTotalLength();
                                });
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
                    + value + ";\n" + '-webkit-' + style + ': ' + value + ";\n";
              }
              keyframes += ".flow_active path {\n"
                  + createCSSRules('animation-duration', '3s')
                  + createCSSRules('animation-name', 'move')
                  + createCSSRules('animation-timing-function', 'linear')
                  + createCSSRules('animation-iteration-count', 'infinite')
                  + "}\n";
              var s = svg
                  .createElementNS('http://www.w3.org/2000/svg', 'style');
              s.setAttribute('type', 'text/css');
              s.textContent = keyframes;
              $('svg', svg).prepend(s);
            };
          });

  visu.subscribe(ga_list);
  $(window).trigger('resize');
  $("#pages").triggerHandler("done");
}

function create_pages(page, path, flavour, type) {

  var creator = design.getCreator(page.nodeName);
  var retval = creator.create(page, path, flavour, type);

  if (jQuery(retval).is(".widget") || (jQuery(retval).is(".group"))) {
    retval = jQuery(
        "<div class='widget_container "
            + (retval.data("rowspanClass") ? retval.data("rowspanClass") : '')
            + "' />").append(retval);
  }

  return retval;
}

function scrollToPage(page_id, speed, skipHistory) {
  $('.activePage', '#pages').removeClass('activePage');
  $('.pageActive', '#pages').removeClass('pageActive');
  $('.pagejump.active').removeClass('active');
  $('.pagejump.active_ancestor').removeClass('active_ancestor');

  if (page_id.match(/^id_[0-9_]+$/) == null) {
    // find Page-ID by name
    $('.page h1:contains(' + page_id + ')', '#pages').each(function(i) {
      if ($(this).text() == page_id) {
        page_id = $(this).closest(".page").attr("id");
      }
    });
  }
  var page = $('#' + page_id);

  page.addClass('pageActive activePage');// show new page
  // update visibility ob navbars, top-navigation, footer
  updatePageParts(page);

  if (main_scroll.getConf().speed > 0) {
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

  main_scroll.seekTo(page, speed); // scroll to it

  // show the navbars for this page
  /*
   * $('#'+page_id+'_top_navbar').addClass('navbarActive');
   * $('#'+page_id+'_right_navbar').addClass('navbarActive');
   * $('#'+page_id+'_bottom_navbar').addClass('navbarActive');
   * $('#'+page_id+'_left_navbar').addClass('navbarActive');
   */
  initializeNavbars(page_id);

  var pagedivs = $('div', '#' + page_id);
  for ( var i = 0; i < pagedivs.length; i++) { // check for inline diagrams &
                                                // refresh
    if (/diagram_inline/.test(pagedivs[i].className)) {
      refreshDiagram(pagedivs[i]);
    }
  }
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
              activePageJump = actor.parent();
              return false;
            }
          });
        } else if (page_id == target) {
          activePageJump = actor.parent();
        }
        if (activePageJump != null) {
          activePageJump.addClass('active');
          var parentPage = getParentPage(page);
          while (parentPage != null) {
            if (parentPage.attr('id') == "id_0") {
              // root is always an active ancestor, no need to specify that
              break;
            }
            $(".pagejump > .actor").each(
                function(i) {
                  var parentActor = $(this);
                  var parentTarget = parentActor.data().target;
                  if (parentTarget.match(/^id_[0-9_]+$/) == null) {
                    // get page id by name
                    $('h1:contains(' + parentTarget + ')',
                        '#' + parentPage.attr('id')).each(function(i) {
                      if ($(this).text() == parentTarget) {
                        parentActor.parent().addClass('active_ancestor');
                        return false;
                      }
                    });
                  } else if (parentPage.attr('id') == parentTarget) {
                    parentActor.parent().addClass('active_ancestor');
                  }
                });
            parentPage = getParentPage(parentPage);
          }
        }
      });
  $(window).trigger('scrolltopage', page_id);
  if (resizeAfterScroll) {
    // handleResize(null,true);
    resizeAfterScroll = false;
  }
}

function updateTopNavigation() {
  var path = $('#main .page').eq(this.getIndex()).attr('id').split('_');
  var id = 'id_'; // path[0];
  var nav = '';
  for ( var i = 1; i < path.length; i++) { // element 0 is id_ (JNK)
    id += path[i];
    if ($('#' + id).hasClass("page")) {
      nav += ((1 == i) ? '' : '<span> &#x25ba; </span>')
          + '<a href="javascript:scrollToPage(\'' + id + '\')">'
          + $('#' + id + ' h1').text() + '</a>';
    }
    id += '_';
  }
  $('.nav_path').html(nav);
}

/*
 * Show a popup of type "type". The attributes is an type dependend object This
 * function returnes a jQuery object that points to the whole popup, so it's
 * content can be easily extended
 */
function showPopup(type, attributes) {
  // var retval = design.popups[ type ].create( attributes ); //page, path );
  // return retval;
  if (!design.popups[type])
    type = 'unknown';

  return design.popups[type].create(attributes);
}

/*
 * Remove the popup. The parameter is the jQuery object returned by the
 * showPopup function
 */
function removePopup(jQuery_object) {
  jQuery_object.remove();
}

/** ************************************************************************* */
/* FIXME - Question: should this belong to the VisuDesign object so that it */
/* is possible to overload?!? */
/** ************************************************************************* */
function refreshAction(target, src) {
  /*
   * Special treatment for (external) iframes: we need to clear it and reload it
   * in another thread as otherwise stays blank for some targets/sites and src =
   * src doesnt work anyway on external This creates though some "flickering" so
   * we avoid to use it on images, internal iframes and others
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
}

function setupRefreshAction() {
  var refresh = $(this).data('refresh');
  if (refresh && refresh > 0) {
    var target = $('img', $(this))[0] || $('iframe', $(this))[0];
    var src = target.src;
    if (src.indexOf('?') < 0)
      src += '?';
    $(this).data('interval', setInterval(function() {
      refreshAction(target, src);
    }, refresh));
  }
}

function selectDesign() {
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

  $
      .getJSON(
          "get_designs.php",
          function(data) {
            $div.empty();

            $div.append("<h1>Please select design</h1>");
            $div
                .append("<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>");

            $
                .each(
                    data,
                    function(i, element) {
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
}

/**
 * Change the size of the selected navbar
 * 
 * currently only "left" and "right" are implemented
 */
function navbarSetSize(position, size) {
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
  handleResize();
}

/**
 * parse a string with up to four, space-separated values usage like css
 * settings, e.g width: 1px 2px 3px 4px (top-, right-, bottom-, left-width)
 * 
 * @param value
 */
function parseTopRightBottomLeftString(value) {
  var parts = value.split(" ");
  if (parts.length == 4) {
    return {
      top : parts[0],
      right : parts[1],
      bottom : parts[2],
      left : parts[3]
    };
  } else if (parts.length == 3) {
    return {
      top : parts[0],
      right : parts[1],
      bottom : parts[2],
      left : parts[1]
    };
  } else if (parts.length == 2) {
    return {
      top : parts[0],
      right : parts[1],
      bottom : parts[0],
      left : parts[1]
    };
  } else if (parts.length == 1) {
    return {
      top : parts[0],
      right : parts[0],
      bottom : parts[0],
      left : parts[0]
    };
  } else
    return {
      top : '',
      right : '',
      bottom : '',
      left : ''
    };
}

/**
 * update the visibility ob top-navigation, footer and navbar for this page
 * 
 * @param page
 */
function updatePageParts(page) {
  // default values
  var showtopnavigation = true;
  var showfooter = true;
  var shownavbar = {
    top : "true",
    right : "true",
    bottom : "true",
    left : "true"
  };

  if (page.data() != null) {
    if (page.data().showtopnavigation != undefined) {
      showtopnavigation = page.data().showtopnavigation != "false";
    } else {
      // traverse up the page tree
      var parentPage = getParentPage(page);
      while (parentPage != null) {
        if (parentPage.data().showtopnavigation != undefined) {
          showtopnavigation = parentPage.data().showtopnavigation != "false";
          break;
        }
        parentPage = getParentPage(parentPage);
      }
    }
    if (page.data().showfooter != undefined) {
      showfooter = page.data().showfooter != "false";
    } else {
      // traverse up the page tree
      var parentPage = getParentPage(page);
      while (parentPage != null) {
        if (parentPage.data().showfooter != undefined) {
          showfooter = parentPage.data().showfooter != "false";
          break;
        }
        parentPage = getParentPage(parentPage);
      }
    }
    if (page.data().shownavbar != undefined) {
      shownavbar = parseTopRightBottomLeftString(page.data().shownavbar);
    } else {
      // traverse up the page tree
      var inheritedShowNavbar = {
        top : 'inherit',
        right : 'inherit',
        bottom : 'inherit',
        left : 'inherit'
      };
      var parentPage = getParentPage(page);
      while (parentPage != null) {
        if (parentPage.data().shownavbar != undefined) {
          var pageShowNavBar = parseTopRightBottomLeftString(parentPage.data().shownavbar);
          for ( var pos in pageShowNavBar) {
            if (pageShowNavBar[pos] != 'inherit'
                && inheritedShowNavbar[pos] == 'inherit') {
              inheritedShowNavbar[pos] = pageShowNavBar[pos];
            }
          }
          if (inheritedShowNavbar.top != 'inherit'
              && inheritedShowNavbar.right != 'inherit'
              && inheritedShowNavbar.bottom != 'inherit'
              && inheritedShowNavbar.left != 'inherit') {
            // we are done
            break;
          }
        }
        parentPage = getParentPage(parentPage);
      }
      // set default values if not set otherwise
      for ( var pos in inheritedShowNavbar) {
        if (inheritedShowNavbar[pos] == 'inherit') {
          inheritedShowNavbar[pos] = shownavbar[pos];
        }
      }
      shownavbar = inheritedShowNavbar;
    }
  }
  var resize = false;
  if (showtopnavigation) {
    if ($('#top').css("display") == "none") {
      $('#top, #top > *').css("display", "block");
      resize = true;
      // console.log("#top hidden");
    }
  } else {
    $('#top.loading').removeClass('loading');
    if ($('#top').css("display") != "none") {
      $('#top').css("display", "none");
      resize = true;
      // console.log("#top visible");
    }
  }
  if (showfooter) {
    if ($('#bottom').css("display") == "none") {
      $('#bottom').css("display", "block");
      // console.log("#bottom hidden");
      resize = true;
    }
  } else {
    // the loading class prevents any element from beeing disabled, we have to
    // remove it
    $('#bottom.loading').removeClass('loading');
    if ($('#bottom').css("display") != "none") {
      $('#bottom').css("display", "none");
      // console.log("#bottom "+$('#bottom').css("display"));
      resize = true;
    }
  }
  $.each([ 'Left', 'Top', 'Right', 'Bottom' ], function(index, value) {
    var key = value.toLowerCase();
    if (shownavbar[key] == "true") {
      if ($('#navbar' + value).css("display") == "none") {
        fadeNavbar(value, "in");
        removeInactiveNavbars(page.attr('id'));
        // resize=true;
      }
    } else if (shownavbar[key] == "false") {
      // the loading class prevents any element from beeing disabled, we have to
      // remove it
      $('#navbar' + value + '.loading').removeClass('loading');
      if ($('#navbar' + value).css("display") != "none") {
        fadeNavbar(value, "out");
        // resize=true;
      }
    }
  });
  if (resize) {
    resizeAfterScroll = true;
  } else {
    removeInactiveNavbars(page.attr('id'));
  }
}

/**
 * fades in/out a navbar
 * 
 * @param position
 *                [Top|Left|Right|Bottom]
 * @param direction
 *                [in|out]
 */
function fadeNavbar(position, direction) {
  var initCss = {};
  var targetCss = {};
  var navbar = $('#navbar' + position);
  var key = position.toLowerCase();
  var fn = function() {
    handleResize(true);
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
        handleResize(true);
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
  if (main_scroll.getConf().speed == 0) {
    navbar.css(targetCss);
    fn();
  } else {
    navbar.animate(targetCss, main_scroll.getConf().speed, main_scroll
        .getConf().easing, fn);
  }
}

/**
 * traverse down the page tree from root page id_0 -> .. -> page_id activate all
 * navbars in that path deactivate all others
 * 
 * @param page_id
 */
function initializeNavbars(page_id) {
  removeInactiveNavbars(page_id);
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
  $(tree).each(
      function(i) {
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
          if (rightNav.data('scope') == undefined || rightNav.data('scope') < 0
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
}

function removeInactiveNavbars(page_id) {
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
}

function getParentPage(page) {
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
}
