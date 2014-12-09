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

define("plugins/strftime/structure_plugin",["structure_custom","css!plugins/strftime/strftime"],function(e){(function(){function n(){return t++}function s(){if(!i){var e=function(){var t=new Date;$.each(r,function(e,n){t.locale=n.data("locale"),n.html(t.strftime(n.data("format")))}),window.setTimeout(e,1e3)};e(),i=!0}}e.prototype.addCreator("strftime",{create:function(e,t){var i=$(e),o="strftime_"+n(),u=$('<div class="widget clearfix text strftime"/>');i.attr("class")&&u.addClass("custom_"+i.attr("class")),templateEngine.design.setWidgetLayout(u,i);var a=$('<div id="'+o+'" class="strftime_value"></div>');return u.append(a),a.data({locale:i.attr("lang"),format:i.attr("format")||"%c"}),r[o]=a,s(),u}});var t=0,r={},i=!1;Date.ext.locales.de={a:["So","Mo","Di","Mi","Do","Fr","Sa"],A:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],b:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],B:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],c:"%a %d %b %Y %T %Z",p:["",""],P:["",""],x:"%d.%m.%Y",X:"%T"},Date.ext.locales.fr={a:["dim","lun","mar","mer","jeu","ven","sam"],A:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],b:["jan","fév","mar","avr","mai","jun","jui","aoû","sep","oct","nov","déc"],B:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],c:"%a %d %b %Y %T %Z",p:["",""],P:["",""],x:"%d.%m.%Y",X:"%T"}})()});