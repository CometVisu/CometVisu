define( ['joose', 'lib/cv/role/Refresh' ], function(  ) {
  "use strict";
  Class('cv.structure.pure.CalendarList', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Refresh],

    has: {
      width: { is: 'ro', init: '' },
      height: { is: 'ro', init: '' },
      src: { is: 'ro', init: "plugins/calendarlist/calendarlist.php" },
      calendars: { is: 'ro' },
      days: { is: 'ro' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'width': {
              transform: function (value) {
                return value ? "width:" + value + ";" : "";
              }
            },
            'height': {
              transform: function (value) {
                return value ? "height:" + value + ";" : "";
              }
            },
            'maxquantity': {},
            'days': {},
            'refresh': {}
          };
        }
      },
      after: {
        parse: function (xml, path) {
          var $el = $(xml);
          var data = templateEngine.getWidgetData(path);
          var calendars = this.calendars = [];
          $el.find('calendar').each(function(cal) {
            var calData = {
              type: cal.getAttribute('type'),
              userid : cal.getAttribute('userid'),
              magiccookie: cal.hasAttribute('magiccookie') ? cal.getAttribute('magiccookie') : '',
              days: cal.hasAttribute('days') ? cal.getAttribute('days') : data.days
            };
            calendars.push(calData);
          });
        }
      }
    },
    augment: {
      getDomString: function () {
        return '<div class="actor calendarListBody">' +
          '<div class="calendarList_inline" id="calendarList' + this.getPath()+ '" style="'+this.getHeight()+this.getWidth()+'"></div>' +
          '</div>';
      }
    },

    after: {
      initialize: function() {
        cv.MessageBroker.my.subscribe("setup.dom.finished", this.refreshAction, this);
      }
    },

    methods: {
      refreshAction: function() {
        var calendarList = this.getActor();

        var src = this.getSrc();
        var maxquantity = this.getMaxquantity();
        var calendars = this.getCalendars();

        $(function () {
          $(calendarList).calendarListlocal({
            src: src,
            maxquantity: maxquantity,
            calendar: calendars
          });
        });
        return false;
      }
    }
  });
  cv.xml.Parser.addHandler("calendarlist", cv.structure.pure.CalendarList);

  (function ($) {
    jQuery.fn.extend({
      calendarListlocal: function (options) {
        var defaults = {
          src: '',
          days: 30,
          html: '<span>{date}: {text}{where}</span>',
          wrapper: 'li',
          dataType: 'json',
          datetime: true
        }
        var options = jQuery.extend(defaults, options);

        return this.each(function () {
          var o = options;
          var c = jQuery(this);

          if (o.src == '') {
            console.log('calendarListlocal: no src URL');
            return; // avoid the request
          }

          var formData = {
            'maxquantity': o.maxquantity,
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
            error: function (xhr, status, e) {
              console.log('C: #%s, Error: %s, calendarList: %s', $(c).attr('id'), e, o.src);
            },
            success: function (result) {
              c.html('');
              var items = result.calendarList.calendarListEntries;
              var itemnum = items.length;
              var date = '';
              var time = '';
              var color, format, where;

              for (var i = 0; i < itemnum; i++) {
                var item = items[i];
                var itemHtml = o.html;

                color = '#FFFFFF';
                for (var ix = 0; ix < o.calendar.length; ix++) {
                  if (item.calendarName == ix) {
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
                    itemHtml = '<span>' + format + '</span>'
                  }
                }

                date = item.StartDate;
                if (item.StartTime != '00:00') {
                  date = date + ', ' + item.StartTime;
                }
                if (item.StartDate != item.EndDate || item.StartTime != item.EndTime) {
                  date = date + ' - ';
                }
                if (item.StartDate != item.EndDate) {
                  date = date + item.EndDate + ', ' + item.EndTime;
                } else {
                  if (item.StartTime != item.EndTime) {
                    date = date + item.EndTime;
                  }
                }

                itemHtml = itemHtml.replace(/\{text\}/, item.description);
                if (item.where != '') {
                  where = ' (' + item.where + ')';
                } else {
                  where = item.where;
                }
                itemHtml = itemHtml.replace(/\{where\}/, where);
                itemHtml = itemHtml.replace(/\{date\}/, date);
                //console.log('%i: %s', i, itemHtml);

                var $row = $('<span style="color:' + color + '">').append(itemHtml).append('</span><br>');
                //console.log('%i: %s', i, $row);

                c.append($row);
              }
            }
          });
        });
      }
    });
  })(jQuery);
});