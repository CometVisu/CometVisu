/**
 * This plugins integrates formated date and clock strings into based on strftime.
 *
 * @author Michael Hausl [michael at hausl dot com]
 * @since 0.8.0
 */
define( ['structure_custom', 'css!plugins/strftime/strftime' ], function( VisuDesign_Custom ) {
  "use strict";

  (function() {
  VisuDesign_Custom.prototype.addCreator("strftime", {
    create : function(page, path) {
      var $p = $(page);
      var id = "strftime_" + uniqid();

      var classes = 'widget clearfix text strftime';
      if ($p.attr('class')) {
        classes += ' custom_'+$p.attr('class');
      }
      classes += templateEngine.design.setWidgetLayout( $p, path );
      var ret_val = '<div class="'+ classes + '">';

      ret_val += '<div id="' + id + '" class="strftime_value"></div>';

      var data = templateEngine.widgetDataInsert( path, {
        'locale' : $p.attr('lang'),
        'format' : $p.attr('format') || '%c'
      } );

      elements[id] = path;
      startTimer();

      return ret_val + '</div>';
    }
  });

  var internalCounter = 0;
  function uniqid() {
    return internalCounter++;
  }
  var elements = {};
  var timerStarted = false;

  function startTimer() {
    if (!timerStarted) {
      var f = function() {
        var d = new Date();
        $.each(elements, function(index, path ) {
          var data = templateEngine.widgetDataGet( path );
          d.locale = data.locale;
          if( undefined === data.actor )
          {
            data.actor = $('#' + index );
            if( 0 === data.actor.length )
            {
              data.actor = undefined;
              return;
            } 
          }
          data.actor.html(d.strftime( data.format ));
        });
        window.setTimeout(f, 1000);
      };
      f();
      timerStarted = true;
    }
  }

  // extend locales by German and French
  Date.ext.locales['de'] = {
    a: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    A: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    b: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    B: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    c: '%a %d %b %Y %T %Z',
    p: ['', ''],
    P: ['', ''],
    x: '%d.%m.%Y',
    X: '%T'
  };
  Date.ext.locales['fr'] = {
    a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    A: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    b: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
    B: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    c: '%a %d %b %Y %T %Z',
    p: ['', ''],
    P: ['', ''],
    x: '%d.%m.%Y',
    X: '%T'
  };
})();

});