/* structure_plugin.js (c) 2012 by Michael Hausl [michael@hausl.com]
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
 */

/**
 * This plugins integrates formated date and clock strings into CometVisu based
 * on strftime.
 * 
 * Thanks to Michael Markstaller for implementing the jqclock as reference.
 */

$('head').append('<link rel="stylesheet" href="plugins/strftime/strftime.css" type="text/css" />');

VisuDesign_Custom.prototype.addCreator("strftime", {
  create : function(page, path) {
    var $p = $(page);
    function uniqid() {
      var newDate = new Date;
      return newDate.getTime();
    }
    var id = "strftime_" + uniqid();

    var ret_val = $('<div class="widget clearfix text strftime"/>');
    ret_val.setWidgetLayout($p);

    var actor = $('<div id="' + id + '" class="strftime_value"></div>');
    ret_val.append(actor);

    var locale = $p.attr('lang');
    var format = '%c';
    if ($p.attr('format')) {
      format = $p.attr('format');
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

    f = function() {
      var d = new Date();
      d.locale = locale;
      var iso = d.strftime(format);
      $("#" + id).html(iso);
      window.setTimeout(f, 1000);
    };
    f();

    return ret_val;
  },
  attributes : {
    lang   : {type : "list"  , required : false, list : {en : "en", de : "de", fr : "fr"}},
    format : {type : "string", required : false},
  },
  content : false
});
