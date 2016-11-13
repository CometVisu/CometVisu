

define( [
  'joose',
  'jquery',
  'lib/cv/Config',
  'lib/cv/Object',
  '_common', 'structure_custom', 'TrickOMatic', 'lib/cv/PageHandler', 'lib/cv/PagePartsHandler',
  'lib/cv/io/Client', 'lib/cv/io/Mockup', 'lib/cv/event/Handler',
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
  'TransformDefault', 'TransformKnx', 'TransformOpenHab',
  'lib/cv/xml/Parser',
  'lib/cv/MessageBroker'
  ], function(joose, $, Config, obj, design, custom, Trick_O_Matic ) {
    Class('cv.TemplateEngine', {
      isa: cv.Object,

      have: {

        loadReady: {page: false, plugins: false},
        pagePartsHandler: new cv.PagePartsHandler(),

        rememberLastPage: false,
        currentPage: null,


        // if true the whole widget reacts on click events
        // if false only the actor in the widget reacts on click events
        bindClickToWidget: false,

        widgetData: {}, // hash to store all widget specific data
        /**
         * Structure where a design can set a default value that a widget or plugin
         * can use.
         * This is especially important for design relevant information like colors
         * that can not be set though CSS.
         *
         * Useage: templateEngine.defaults.plugin.foo = {bar: 'baz'};
         */
        defaults: {widget: {}, plugin: {}},
        /**
         * Function to test if the path is in a valid form.
         * Note: it doesn't check if it exists!
         */
        pathRegEx: /^id(_[0-9]+)+$/,

        callbacks: {}, // Hash of functions to call during page change
        main_scroll: null,
        old_scroll: '',
        visu: null,

        pluginsToLoadCount: 0,
        xml: null
      },

      has: {
        mappings: {is: 'rw', init: Joose.I.Object}, // store the mappings
        stylings: {is: 'rw', init: Joose.I.Object}, // store the stylings
        addressList: {is: 'rw', init: Joose.I.Object}, // aka ga_list
      },

      after: {
        initialize: function() {
          Config.eventHandler = new cv.event.Handler({templateEngine: this});
          Config.templateEngine = this;
        }
      },

      methods: {
        delaySetup: function (id) {
          this.loadReady[id] = false;
          return function () {
            delete this.loadReady[id];
            this.setup_page();
          }.bind(this);
        },

        /**
         * Return (reference to) widgetData object by path.
         */
        getWidgetData: function (path) {
          return this.widgetData[path] || (this.widgetData[path] = {});
        },


        /**
         * Return (reference to) widget data by element
         */
        getWidgetDataByElement: function (element) {
          var
            parent = $(element).parent(),
            path = parent.attr('id');

          if (path === undefined)
            path = parent.parent().attr('id');

          return this.getWidgetData(path);
        },
        /**
         * Merge obj in the widgetData.
         */
        setWidgetData: function (path, obj) {
          var data = this.getWidgetData(path);

          for (var attrname in obj)
            data[attrname] = obj[attrname];

          return data;
        },

        /**
         * @deprecated Please use setWidgetData
         */
        widgetDataInsert: function(path, obj) {
          return this.setWidgetData(path, obj);
        },

        /**
         * @deprecated Please use setWidgetData
         */
        widgetDataGet: function(path) {
          return this.getWidgetData(path);
        },

        update : function (json) {
          for (var key in json) {
            //$.event.trigger('_' + key, json[key]);
            if (!(key in this.addressList))
              continue;

            var data = json[key];
            this.addressList[key].forEach(function (id) {
              if (typeof id === 'string') {
                var element = document.getElementById(id);
                var type = element.dataset.type || 'page'; // only pages have no datatype set
                var widget = cv.structure.WidgetFactory.getInstanceById(id);
                if (widget.update) {
                  widget.update(key, data);
                }
                //console.log( element, type, updateFn );
              } else if (typeof id === 'function') {
                id.call(key, data);
              }
            });
          }
        },

        initBackendClient: function () {
          if ($.getUrlVar('testMode')) {
            this.visu = new cv.io.Mockup();
            require(['TransformMockup'], function () {
            });
          }
          else if (Config.backend == "oh") {
            this.visu = new cv.io.Client({
              backendName: 'openhab',
              backendUrl: Config.backendUrl
            });
          }
          else if (Config.backend == "oh2") {
            this.visu = new cv.io.Client({
              backendName: 'openhab2',
              backendUrl: Config.backendUrl
            });
          } else {
            this.visu = new cv.io.Client({
              backendName: Config.backend,
              backendUrl: Config.backendUrl
            });
          }

          this.visu.update = function (json) { // overload the handler
            profileCV('first data start (' + this.visu.retryCounter + ')');
            this.update(json);
            profileCV('first data updated', true);
            this.visu.update = this.update.bind(this); // handle future requests directly
          }.bind(this);
          this.user = 'demo_user'; // example for setting a user
        },

        addAddress: function (address, id) {
          if (address in this.addressList) {
            this.addressList[address].push(id);
          }
          else {
            this.addressList[address] = [id];
          }
        },

        getAddresses: function () {
          return Object.keys(this.addressList);
        },

        bindActionForLoadingFinished: function (fn) {
          $("#pages").bind("done", fn);
        },

        fireLoadingFinishedAction: function () {
          $("#pages").triggerHandler("done");
        },

        resetPageValues: function () {
          this.currentPage = null;
          cv.layout.Manager.my.currentPageUnavailableWidth = -1;
          cv.layout.Manager.my.currentPageUnavailableHeight = -1;
          cv.layout.Manager.my.currentPageNavbarVisibility = null;
        },


        parseXML: function (loaded_xml) {
          profileCV('parseXML');
          this.xml = loaded_xml;
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
          var predefinedDesign = $('pages', this.xml).attr("design");

          if ($('pages', this.xml).attr("backend")) {
            Config.backend = $('pages', this.xml).attr("backend");
          }
          this.initBackendClient();

          if (undefined === $('pages', this.xml).attr('scroll_speed'))
            Config.scrollSpeed = 400;
          else
            Config.scrollSpeed = $('pages', this.xml).attr('scroll_speed') | 0;

          if ($('pages', this.xml).attr('bind_click_to_widget') != undefined) {
            Config.bindClickToWidget = $('pages', this.xml).attr('bind_click_to_widget') == "true" ? true : false;
          }
          if ($('pages', this.xml).attr('default_columns')) {
            Config.defaultColumns = $('pages', this.xml).attr('default_columns');
          }
          if ($('pages', this.xml).attr('min_column_width')) {
            Config.minColumnWidth = $('pages', this.xml).attr('min_column_width');
          }
          this.screensave_time = $('pages', this.xml).attr('screensave_time');
          this.screensave_page = $('pages', this.xml).attr('screensave_page');

          // design by url
          if ($.getUrlVar("design")) {
            Config.clientDesign = $.getUrlVar("design");
          }
          // design by config file
          else if (predefinedDesign) {
            Config.clientDesign = predefinedDesign;
          }
          // selection dialog
          else {
            this.selectDesign();
          }
          if ($('pages', this.xml).attr('max_mobile_screen_width'))
            Config.maxMobileScreenWidth = $('pages', this.xml).attr('max_mobile_screen_width');

          var getCSSlist = [];
          if (Config.clientDesign) {
            getCSSlist.push('css!designs/' + Config.clientDesign + '/basic.css');
            if (!Config.forceNonMobile) {
              getCSSlist.push('css!designs/' + Config.clientDesign + '/mobile.css');
            }
            getCSSlist.push('css!designs/' + Config.clientDesign + '/custom.css');
            getCSSlist.push('designs/' + Config.clientDesign + '/design_setup');
          }
          require(getCSSlist, this.delaySetup('design'));

          // start with the plugins
          var pluginsToLoad = [];
          $('meta > plugins plugin', this.xml).each(function (i) {
            var name = $(this).attr('name');
            if (name) {
              if (!pluginsToLoad[name]) {
                /*
                 pluginsToLoadCount++;
                 $.includeScripts(
                 ['plugins/' + name + '/structure_plugin.js'],
                 this.delaySetup( 'plugin_' + name)
                 );
                 pluginsToLoad[name] = true;
                 */
                pluginsToLoad.push('plugins/' + name + '/structure_plugin');
              }
            }
          });
          /*
           if (0 == pluginsToLoadCount) {
           delete loadReady.plugins;
           }
           */
          var delaySetupPluginsCallback = this.delaySetup('plugins').bind(this);
          require(pluginsToLoad, delaySetupPluginsCallback, function (err) {
            console.log('Plugin loading error! It happend with: "' + err.requireModules[0] + '". Is the plugin available and written correctly?');
            delaySetupPluginsCallback();
          });

          // then the icons
          $('meta > icons icon-definition', this.xml).each(function (i, elem) {
            var $this = $(elem);
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
          $('meta > mappings mapping', this.xml).each(function (i, elem) {
            var $this = $(elem);
            var name = $this.attr('name');
            this.mappings[name] = {};
            var formula = $this.find('formula');
            if (formula.length > 0) {
              var func = eval('var func = function(x){var y;' + formula.text() + '; return y;}; func');
              this.mappings[name]['formula'] = func;
            }
            $this.find('entry').each(function (j, subElem) {
              var $localThis = $(subElem);
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
                this.mappings[name][$localThis.attr('value')] = value.length == 1 ? value[0] : value;
                if (isDefaultValue) {
                  this.mappings[name]['defaultValue'] = $localThis.attr('value');
                }
              }
              else {
                if (!this.mappings[name]['range']) {
                  this.mappings[name]['range'] = {};
                }
                this.mappings[name]['range'][parseFloat($localThis.attr('range_min'))] = [parseFloat($localThis.attr('range_max')), value];
                if (isDefaultValue) {
                  this.mappings[name]['defaultValue'] = parseFloat($localThis.attr('range_min'));
                }
              }
            }.bind(this));
          }.bind(this));

          // then the stylings
          $('meta > stylings styling', this.xml).each(function (i, elem) {
            var name = $(elem).attr('name');
            var classnames = '';
            this.stylings[name] = {};
            $(elem).find('entry').each(function (k, subElem) {
              var $localThis = $(subElem);
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
                this.stylings[name][$localThis.attr('value')] = $localThis.text();
                if (isDefaultValue) {
                  this.stylings[name]['defaultValue'] = $localThis.attr('value');
                }
              } else { // a range
                if (!this.stylings[name]['range'])
                  this.stylings[name]['range'] = {};
                this.stylings[name]['range'][parseFloat($localThis.attr('range_min'))] = [parseFloat($localThis.attr('range_max')), $localThis.text()];
                if (isDefaultValue) {
                  this.stylings[name]['defaultValue'] = parseFloat($localThis.attr('range_min'));
                }
              }
            }.bind(this));
            this.stylings[name]['classnames'] = classnames;
            cv.ui.Stylings.my.addStyling(name, this.stylings[name]);
          }.bind(this));

          // then the status bar
          $('meta > statusbar status', this.xml).each(function (i, elem) {
            var type = $(elem).attr('type');
            var condition = $(elem).attr('condition');
            var extend = $(elem).attr('hrefextend');
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

            var text = $(elem).text();
            switch (extend) {
              case 'all': // append all parameters
                var search = window.location.search.replace(/\$/g, '$$$$');
                text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
                break;
              case 'config': // append config file info
                var search = window.location.search.replace(/\$/g, '$$$$');
                search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

                var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
                if (0 < middle.indexOf('?'))
                  search = '&' + search;
                else
                  search = '?' + search;

                text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
                break;
            }
            $('.footer').html($('.footer').html() + text);
          }.bind(this));

          delete this.loadReady.page;
          this.setup_page();
        },

        setup_page: function () {
          // and now setup the pages
          profileCV('setup_page start');

          // check if the page and the plugins are ready now
          for (var key in this.loadReady)  // test for emptines
            return; // we'll be called again...

          if (!this.xml) {
            return;
          }

          // login to backend as it might change some settings needed for further processing
          this.visu.login(true, function () {
            profileCV('setup_page running');

            // as we are sure that the default CSS were loaded now:
            $('link[href*="mobile.css"]').each(function () {
              this.media = 'only screen and (max-width: ' + Config.maxMobileScreenWidth + 'px)';
            });

            var page = $('pages > page', this.xml)[0]; // only one page element allowed...

            this.create_pages(page, 'id');
            cv.structure.pure.Page.createFinal();
            profileCV('setup_page created pages');

            cv.MessageBroker.my.publish("setup.dom.finished");
            profileCV('setup_page finished postDOMSetupFns');

            var startpage = 'id_';
            if ($.getUrlVar('startpage')) {
              startpage = $.getUrlVar('startpage');
              if (typeof(Storage) !== 'undefined') {
                if ('remember' === startpage) {
                  startpage = localStorage.getItem('lastpage');
                  this.rememberLastPage = true;
                  if ('string' !== typeof( startpage ) || 'id_' !== startpage.substr(0, 3))
                    startpage = 'id_'; // fix obvious wrong data
                } else if ('noremember' === startpage) {
                  localStorage.removeItem('lastpage');
                  startpage = 'id_';
                  this.rememberLastPage = false;
                }
              }
            }
            this.currentPage = $('#' + startpage);

            cv.layout.Manager.adjustColumns();
            cv.layout.Manager.applyColumnWidths();

            this.main_scroll = new cv.PageHandler();
            if (this.scrollSpeed != undefined) {
              this.main_scroll.setSpeed(this.scrollSpeed);
            }

            this.scrollToPage(startpage, 0);

            /* CM, 9.4.16:
             * TODO: Is this really needed?
             * I can't find any source for setting .fast - and when it's set, it's
             * most likely not working as scrollToPage should have been used instead
             * anyway...
             *
             $('.fast').bind('click', function() {
             this.main_scroll.seekTo($(this).text());
             });
             */

            // reaction on browser back button
            window.onpopstate = function (e) {
              // where do we come frome?
              var lastpage = e.state;
              if (lastpage) {
                // browser back button takes back to the last page
                this.scrollToPage(lastpage, 0, true);
              }
            };

            // run the Trick-O-Matic scripts for great SVG backdrops
            $('embed').each(function () {
              this.onload = Trick_O_Matic
            });

            if (Config.enableAddressQueue) {
              // identify addresses on startpage
              var startPageAddresses = {};
              $('.actor', '#' + startpage).each(function () {
                var $this = $(this),
                  data = $this.data();
                if (undefined === data.address) data = $this.parent().data();
                for (var addr in data.address) {
                  startPageAddresses[addr.substring(1)] = 1;
                }
              });
              this.visu.setInitialAddresses(Object.keys(startPageAddresses));
            }
            var addressesToSubscribe = this.getAddresses();
            if (0 !== addressesToSubscribe.length)
              this.visu.subscribe(this.getAddresses());

            this.xml = null; // not needed anymore - free the space

            $('.icon').each(function () {
              fillRecoloredIcon(this);
            });
            $('.loading').removeClass('loading');
            this.fireLoadingFinishedAction();
            if (undefined !== this.screensave_time) {
              this.screensave = setTimeout(function () {
                this.scrollToPage();
              }, this.screensave_time * 1000);
              $(document).click(function () {
                clearInterval(this.screensave);
                this.screensave = setTimeout(function () {
                  this.scrollToPage();
                }, this.screensave_time * 1000);
              });
            }
            profileCV('setup_page finish');
          }, this);
        },

        create_pages: function (page, path, flavour, type) {
          this.callbacks[path + '_'] = {
            exitingPageChange: [],// called when the current page is left
            beforePageChange: [], // called as soon as a page change is known
            duringPageChange: [], // called when the page is theoretical visible, i.e. "display:none" is removed - CSS calculations shoud work now
            afterPageChange: []   // called together with the global event when the transition is finished
          };

          var parsedData = cv.xml.Parser.parse(page, path, flavour, type);
          if (!Array.isArray(parsedData)) {
            parsedData = [parsedData];
          }

          for (var i = 0, l = parsedData.length; i < l; i++) {
            var data = parsedData[i];
            var widget = cv.structure.WidgetFactory.createInstance(data.$$type, data);

            var retval = widget ? widget.getDomString() : undefined;

            if (undefined === retval)
              return;

            if ('string' === typeof retval) {
              return '<div class="widget_container '
                + (data.rowspanClass ? data.rowspanClass : '')
                + (data.containerClass ? data.containerClass : '')
                + ('break' === data.$$type ? 'break_container' : '') // special case for break widget
                + '" id="' + path + '" data-type="' + data.$$type + '">' + retval + '</div>';
            } else {
              return jQuery(
                '<div class="widget_container '
                + (data.rowspanClass ? data.rowspanClass : '')
                + (data.containerClass ? data.containerClass : '')
                + '" id="' + path + '" data-type="' + data.$$type + '"/>').append(retval);
            }
          }
        },

        /**
         * Little helper to find the relevant page path for a given widget.
         * @param element The this.xml element
         * @param widgetpath The path / ID of the widget
         * @return The path of the parent
         */
        getPageIdForWidgetId: function (element, widgetpath) {
          var
            parent = element.parentNode,
            parentpath = widgetpath.replace(/[0-9]*$/, '');

          while (parent && parent.nodeName !== 'page') {
            parent = parent.parentNode;
            parentpath = parentpath.replace(/[0-9]*_$/, '');
          }
          return parentpath;
        },

        getPageIdByPath: function (page_name, path) {
          if (page_name == null) return null;
          if (page_name.match(/^id_[0-9_]*$/) != null) {
            // already a page_id
            return page_name;
          } else {
            if (path != undefined) {
              var scope = templateEngine.traversePath(path);
              if (scope == null) {
                // path is wrong
                console.error("path '" + path + "' could not be traversed, no page found");
                return null;
              }
              return templateEngine.getPageIdByName(page_name, scope);
            } else {
              return templateEngine.getPageIdByName(page_name);
            }
          }
        },

        traversePath: function (path, root_page_id) {
          var path_scope = null;
          var index = path.indexOf("/");
          if (index >= 1) {
            // skip escaped slashes like \/
            while (path.substr(index - 1, 1) == "\\") {
              var next = path.indexOf("/", index + 1);
              if (next >= 0) {
                index = next;
              }
            }
          }
          //    console.log("traversePath("+path+","+root_page_id+")");
          if (index >= 0) {
            // traverse path one level down
            var path_page_name = path.substr(0, index);
            path_scope = templateEngine.getPageIdByName(path_page_name, root_page_id);
            path = path.substr(path_page_name.length + 1);
            path_scope = templateEngine.traversePath(path, path_scope);
            //      console.log(path_page_name+"=>"+path_scope);
            return path_scope;
          } else {
            // bottom path level reached
            path_scope = templateEngine.getPageIdByName(path, root_page_id);
            return path_scope;
          }
          return null;
        },

        getPageIdByName: function (page_name, scope) {
          if (page_name.match(/^id_[0-9_]*$/) != null) {
            // already a page_id
            return page_name;
          } else {
            var page_id = null;
            // find Page-ID by name
            // decode html code (e.g. like &apos; => ')
            page_name = $("<textarea/>").html(page_name).val();
            // remove escaped slashes
            page_name = page_name.replace("\\\/", "/");

            //      console.log("Page: "+page_name+", Scope: "+scope);
            var selector = (scope != undefined && scope != null) ? '.page[id^="' + scope + '"] h1:contains(' + page_name + ')' : '.page h1:contains(' + page_name + ')';
            var pages = $(selector, '#pages');
            if (pages.length > 1 && this.currentPage != null) {
              // More than one Page found -> search in the current pages descendants first
              var fallback = true;
              pages.each(function (i) {
                var p = $(this).closest(".page");
                if ($(this).text() == page_name) {
                  if (p.attr('id').length < this.currentPage.attr('id').length) {
                    // found pages path is shorter the the current pages -> must be an ancestor
                    if (this.currentPage.attr('id').indexOf(p.attr('id')) == 0) {
                      // found page is an ancenstor of the current page -> we take this one
                      page_id = p.attr("id");
                      fallback = false;
                      //break loop
                      return false;
                    }
                  } else {
                    if (p.attr('id').indexOf(this.currentPage.attr('id')) == 0) {
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
                pages.each(function (i) {
                  if ($(this).text() == page_name) {
                    page_id = $(this).closest(".page").attr("id");
                    // break loop
                    return false;
                  }
                });
              }
            } else {
              pages.each(function (i) {
                if ($(this).text() == page_name) {
                  page_id = $(this).closest(".page").attr("id");
                  // break loop
                  return false;
                }
              });
            }
          }
          if (page_id != null && page_id.match(/^id_[0-9_]*$/) != null) {
            return page_id;
          } else {
            // not found
            return null;
          }
        },

        scrollToPage: function (target, speed, skipHistory) {
          if (undefined === target)
            target = this.screensave_page;
          var page_id = this.getPageIdByPath(target);
          if (page_id == null) {
            return;
          }

          if (undefined === speed)
            speed = Config.scrollSpeed;

          if (this.rememberLastPage)
            localStorage.lastpage = page_id;

          // push new state to history
          if (skipHistory === undefined)
            window.history.pushState(page_id, page_id, window.location.href);

          this.main_scroll.seekTo(page_id, speed); // scroll to it

          this.pagePartsHandler.initializeNavbars(page_id);
          $(window).trigger('scrolltopage', page_id);
        },

        /*
         * Show a popup of type "type". The attributes is an type dependend object
         * This function returnes a jQuery object that points to the whole popup, so
         * it's content can be easily extended
         */
        showPopup: function (type, attributes) {
          return cv.structure.pure.AbstractWidget.getPopup(type).create(attributes);
        },

        /*
         * Remove the popup. The parameter is the jQuery object returned by the
         * showPopup function
         */
        removePopup: function (jQuery_object) {
          jQuery_object.remove();
        },


        selectDesign: function () {
          var $body = $("body");

          $("body > *").hide();
          $body.css({
            backgroundColor: "black"
          });

          var $div = $("<div id=\"designSelector\" />");
          $div.css({
            background: "#808080",
            width: "400px",
            color: "white",
            margin: "auto",
            padding: "0.5em"
          });
          $div.html("Loading ...");

          $body.append($div);

          $.getJSON("./designs/get_designs.php", function (data) {
            $div.empty();

            $div.append("<h1>Please select design</h1>");
            $div.append("<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>");

            $.each(data, function (i, element) {
              var $myDiv = $("<div />");

              $myDiv.css({
                cursor: "pointer",
                padding: "0.5em 1em",
                borderBottom: "1px solid black",
                margin: "auto",
                width: "262px",
                position: "relative"
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
                background: "transparent",
                position: "absolute",
                height: "90px",
                width: "160px",
                zIndex: 2
              });
              var pos = $myDiv.find("iframe").position();
              $tDiv.css({
                left: pos.left + "px",
                top: pos.top + "px"
              });
              $myDiv.append($tDiv);

              $myDiv.hover(function () {
                // over
                $myDiv.css({
                  background: "#bbbbbb"
                });
              }, function () {
                // out
                $myDiv.css({
                  background: "transparent"
                });
              });

              $myDiv.click(function () {
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
        },

        // tools for widget handling
        /**
         * Return a widget (to be precise: the widget_container) for the given path
         */
        lookupWidget: function (path) {
          var id = path.split('_');
          var elementNumber = +id.pop();
          return $('.page#' + id.join('_')).children().children()[elementNumber + 1];
        },

        getParentPage: function (page) {
          if (0 === page.length) return null;

          return this.getParentPageById(page.attr('id'), true);
        },

        getParentPageById: function (path, isPageId) {
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
        },

        getParentPageFromPath: function (path) {
          return this.getParentPageById(path, false);
        },

        /**
         * Load a script and run it before page setup.
         * This is needed for plugin that depend on an external library.
         */
        getPluginDependency: function (url) {
          $.getScriptSync(url);
        },

        /**
         * This has to be called by a plugin once it was loaded.
         */
        pluginLoaded: function () {
          this.pluginsToLoadCount--;
          if (0 >= this.pluginsToLoadCount) {
            delete this.loadReady.plugins;
            this.setup_page();
          }
        },

        /**
         * Create a new widget.
         * FIXME: this does nothing, should be removed?
         */
        create: function (path, element) {
          return "created widget '" + path + "': '" + element + "'";
        },

        /**
         * Delete an existing path, i.e. widget, group or even page - including
         * child elements.
         * FIXME: this does nothing, should be removed?
         */
        deleteCommand: function (path) {
          console.log(this.lookupWidget(path), $('#' + path));
          //$( this.lookupWidget( path ) ).remove();
          return "deleted widget '" + path + "'";
        },

        /**
         * Focus a widget.
         */
        focus: function (path) {
          $('.focused').removeClass('focused');
          $(this.lookupWidget(path)).addClass('focused');
        }
      }
    });

    return {
      // simulate a singleton
      getInstance : function() {
        if (!Config.templateEngine) {
          Config.templateEngine = new cv.TemplateEngine();
        }
        return Config.templateEngine;
      }
    };
  }
);


// /** ************************************************************************* */
// /* FIXME - Question: should this belong to the VisuDesign object so that it */
// /* is possible to overload?!? */
// /** ************************************************************************* */
// this.refreshAction = function(target, src) {
//   /*
//    * Special treatment for (external) iframes: we need to clear it and reload
//    * it in another thread as otherwise stays blank for some targets/sites and
//    * src = src doesnt work anyway on external This creates though some
//    * "flickering" so we avoid to use it on images, internal iframes and others
//    */
//   var parenthost = window.location.protocol + "//" + window.location.host;
//   if (target.nodeName == "IFRAME" && src.indexOf(parenthost) != 0) {
//     target.src = '';
//     setTimeout(function() {
//       target.src = src;
//     }, 0);
//   } else {
//     target.src = src + '&' + new Date().getTime();
//   }
// };
//
// this.setupRefreshAction = function( path, refresh ) {
//   if (refresh && refresh > 0) {
//     var
//       element = $( '#' + path ),
//       target = $('img', element)[0] || $('iframe', element)[0],
//       src = target.src;
//     if (src.indexOf('?') < 0)
//       src += '?';
//     this.widgetDataGet( path ).internal = setInterval(function() {
//       this.refreshAction(target, src);
//     }, refresh);
//   }
// };
