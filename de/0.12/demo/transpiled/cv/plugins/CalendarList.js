(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Refresh": {
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "qx.util.ResourceManager": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* CalendarList.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
   * @author mclb
   * @since 2014
   *
   * @ignore(jQuery.*)
   * @asset(plugins/calendarlist/*)
   */
  qx.Class.define('cv.plugins.CalendarList', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Refresh],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      width: {
        check: "String",
        init: ''
      },
      height: {
        check: "String",
        init: ''
      },
      src: {
        check: "String",
        init: "plugins/calendarlist/calendarlist.php"
      },
      days: {
        check: "Number",
        nullable: true
      },
      maxquantity: {
        check: "Number",
        nullable: true
      }
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      calendars: {},

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
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseRefresh(xml, path);
        this.calendars[path] = [];
        xml.querySelectorAll('calendar').forEach(function (cal) {
          var calData = {
            type: cal.getAttribute('type'),
            userid: cal.getAttribute('userid'),
            magiccookie: cal.hasAttribute('magiccookie') ? cal.getAttribute('magiccookie') : '',
            days: cal.hasAttribute('days') ? cal.getAttribute('days') : data.days
          };
          this.calendars[path].push(calData);
        }, this);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'width': {
            transform: function transform(value) {
              return value ? "width:" + value + ";" : "";
            }
          },
          'height': {
            transform: function transform(value) {
              return value ? "height:" + value + ";" : "";
            }
          },
          'maxquantity': {
            transform: function transform(value) {
              return value ? parseInt(value) : null;
            }
          },
          'days': {
            transform: function transform(value) {
              return value ? parseInt(value) : null;
            }
          }
        };
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        return "<div class=\"actor calendarListBody\"><div class=\"calendarList_inline\" id=\"calendarList" + this.getPath() + '" style="' + this.getHeight() + this.getWidth() + '"></div>' + '</div>';
      },
      _onDomReady: function _onDomReady() {
        cv.plugins.CalendarList.prototype._onDomReady.base.call(this);

        this.refreshAction();
      },
      _setupRefreshAction: function _setupRefreshAction() {
        this._timer = new qx.event.Timer(this.getRefresh());

        this._timer.addListener('interval', this._refreshAction, this);

        this._timer.start();
      },
      _refreshAction: function _refreshAction() {
        var calendarList = this.getActor();
        var src = this.getSrc();
        var maxquantity = this.getMaxquantity();
        var calendars = cv.plugins.CalendarList.calendars[this.getPath()]; // TODO: replace jQuery

        $(function () {
          $(calendarList).calendarListlocal({
            src: qx.util.ResourceManager.getInstance().toUri(src),
            maxquantity: maxquantity,
            calendar: calendars
          });
        });
        return false;
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("calendarlist", statics);
      cv.ui.structure.WidgetFactory.registerClass("calendarlist", statics);
    }
  });

  (function ($) {
    jQuery.fn.extend({
      calendarListlocal: function calendarListlocal(options) {
        var defaults = {
          src: '',
          days: 30,
          html: '<span>{date}: {text}{where}</span>',
          wrapper: 'li',
          dataType: 'json',
          datetime: true
        };
        options = jQuery.extend(defaults, options);
        return this.each(function () {
          var o = options;
          var c = jQuery(this);

          if (o.src === '') {
            console.log('calendarListlocal: no src URL');
            return; // avoid the request
          }

          var formData = {
            'maxquantity': o.maxquantity
          };

          for (var i = 0; i < o.calendar.length; i++) {
            var calendarname = 'calendarname' + i;
            var type = 'type' + i;
            var userid = 'userid' + i;
            var magiccookie = 'magiccookie' + i;
            var days = 'days' + i;
            formData[calendarname] = i; //o.calendar[i].textContent;

            formData[type] = o.calendar[i].type;
            formData[userid] = o.calendar[i].userid;
            formData[magiccookie] = o.calendar[i].magiccookie;
            formData[days] = o.calendar[i].days;
          }

          jQuery.ajax({
            url: o.src,
            type: 'POST',
            data: formData,
            dataType: o.dataType,
            error: function error(xhr, status, e) {
              console.log('C: #%s, Error: %s, calendarList: %s', $(c).attr('id'), e, o.src);
            },
            success: function success(result) {
              c.html('');
              var items = result.calendarList.calendarListEntries;
              var itemnum = items.length;
              var date = '';
              var color, format, where;

              for (var i = 0; i < itemnum; i++) {
                var item = items[i];
                var itemHtml = o.html;
                color = '#FFFFFF';

                for (var ix = 0; ix < o.calendar.length; ix++) {
                  if (item.calendarName === ix) {
                    if (o.calendar[ix].hasAttribute('color') === true) {
                      color = o.calendar[ix].getAttribute('color');
                    } else {
                      color = '#FFFFFF';
                    }

                    if (o.calendar[ix].hasAttribute('format') === true) {
                      format = o.calendar[ix].getAttribute('format');
                    } else {
                      format = '{date}: {text}{where}';
                    }

                    itemHtml = '<span>' + format + '</span>';
                  }
                }

                date = item.StartDate;

                if (item.StartTime !== '00:00') {
                  date = date + ', ' + item.StartTime;
                }

                if (item.StartDate !== item.EndDate || item.StartTime !== item.EndTime) {
                  date = date + ' - ';
                }

                if (item.StartDate !== item.EndDate) {
                  date = date + item.EndDate + ', ' + item.EndTime;
                } else {
                  if (item.StartTime !== item.EndTime) {
                    date = date + item.EndTime;
                  }
                }

                itemHtml = itemHtml.replace(/\{text\}/, item.description);

                if (item.where !== '') {
                  where = ' (' + item.where + ')';
                } else {
                  where = item.where;
                }

                itemHtml = itemHtml.replace(/\{where\}/, where);
                itemHtml = itemHtml.replace(/\{date\}/, date); //console.log('%i: %s', i, itemHtml);

                var $row = $('<span style="color:' + color + '">').append(itemHtml).append('</span><br>'); //console.log('%i: %s', i, $row);

                c.append($row);
              }
            }
          });
        });
      }
    });
  })(jQuery);

  cv.plugins.CalendarList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CalendarList.js.map?dt=1612699071297