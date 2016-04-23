define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";

  VisuDesign_Custom.prototype.addCreator("calendarlist", {
    create: function (element, path, flavour, type) {
      var $el = $(element);

      var id = "calendarList_" + path;

      var classes = templateEngine.design.setWidgetLayout( $el, path );
      var ret_val = '<div class="widget clearfix calendarList ' + classes + '">';
        
      ret_val += templateEngine.design.extractLabel( page.find('label')[0], flavour );
      
      var style = ''
        + $el.attr("width" ) ? ("width:"  + $el.attr("width") + ';') : ''
        + $el.attr("height") ? ("height:" + $el.attr("height")     ) : '';
      var actor = '<div class="actor calendarListBody"><div class="calendarList_inline" id="' + id + '" style="'+style+'"></div></div>';

      var data = templateEngine.widgetDataInsert( path, {
          src:         "plugins/calendarlist/calendarlist.php",
          maxquantity: $el.attr("maxquantity"),
          refresh:     $el.attr("refresh"),
          calendar:    $el.find('calendar'),
          days:        $el.find('days')
        });

      templateEngine.bindActionForLoadingFinished(function () {
        refreshcalendarList( path );
      });

      return ret_val + actor + '</div>';
    }
  });

  function refreshcalendarList( path ) {
    var 
      calendarList = $('#' + path + ' .actor'),
      data = templateEngine.widgetDataGet( path );

    var refresh = data.refresh;
    var src = data.src;
    var maxquantity = data.maxquantity;
    var calendar = data.calendar;
    var days = data.days;

    $(function () {
      $(calendarList).calendarListlocal({
        src: src,
        maxquantity: maxquantity,
        calendar: calendar
      });
    });

    if (typeof (refresh) != "undefined" && refresh) {
      // reload regularly
      window.setTimeout(function (calendarList) {
        refreshcalendarList(calendarList)
      }, refresh * 1000 * 60, calendarList);
    }

    return false;
  };

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
            formData[type] = o.calendar[i].getAttribute('type');
            formData[userid] = o.calendar[i].getAttribute('userid');
            if (o.calendar[i].hasAttribute('magiccookie') === true) {
              formData[magiccookie] = o.calendar[i].getAttribute('magiccookie');
            } else {
              formData[magiccookie] = '';
            }
            if (o.calendar[i].hasAttribute('days') === true) {
              formData[days] = o.calendar[i].getAttribute('days');
            } else {
              formData[days] = o.days;
            }
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

                itemHtml = itemHtml.replace(/{text}/, item.description);
                if (item.where != '') {
                  where = ' (' + item.where + ')';
                } else {
                  where = item.where;
                }
                itemHtml = itemHtml.replace(/{where}/, where);
                itemHtml = itemHtml.replace(/{date}/, date);
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