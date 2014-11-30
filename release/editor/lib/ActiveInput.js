/**
 * ActiveInput is a standard-issue input-field with an attached drop-down list.
 * 
 * It will include drill-down
 *
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    editor
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2012 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2012-12-25
 * @requires    -
 */

var ActiveInput=function(){var e=this,t=function(e){var t=$(this),n=t.data("activeInputValue");typeof n!="undefined"&&l.val(n),t.closest(".activeInput").triggerHandler("blur"),e.stopPropagation()},n=function(e){switch(e.which){case h.enter:if(f.find(".selected").length>0){var t=f.find(".selected").data("activeInputValue");t!=undefined&&t!="undefined"&&typeof t!="undefined"&&l.val(t)};default:s()}},r=function(){var e=f.find(".selected"),t;e.length==0?t=f.find(".option:visible").first():(t=e.next(".option:visible"),t.length==0&&(t=e.closest(".group").next(".group:visible").find(".option:visible").first()),t.length==0&&(t=f.find(".option:visible").first())),e.removeClass("selected"),t.addClass("selected")},i=function(){var e=f.find(".selected"),t;e.length==0?t=f.find(".option:visible").last():(t=e.prev(".option:visible"),t.length==0&&(t=e.closest(".group").prev(".group:visible").find(".option:visible").last()),t.length==0&&(t=f.find(".option:visible").last())),e.removeClass("selected"),t.addClass("selected")},s=function(){var e=l.val();if(e==c)return;if(e.trim()==""){f.find(".option, .group, .headline").show();return}var t=f.find(".option").filter(function(){var t=$(this).text();return t.toLowerCase().indexOf(e.toLowerCase())>=0}),n=t.closest(".group");t.show(),n.show(),f.find(".option").not(t).hide(),f.find(".group").not(n).hide(),t.length==0?f.hide():f.show(),c=e};e.setEnumeration=function(e){a=e},e.setValue=function(e){u=e},e.getAsHTML=function(){var e=$("<div />").addClass("activeInput");return l=$("<input />"),typeof u!="undefined"&&l.val(u),l.bind("keyup",n),e.append(l),f=$("<div />").addClass("list"),f.append(o(a)),f.find(".option").click(t),e.append(f),s(),e.find("*").bind("blur",function(e){e.stopPropagation()}),e};var o=function(e){var t=[];return $.each(e,function(e,n){var r=$("<div />").addClass("option"),i,s;if(typeof n=="string")i=s=n;else{if(typeof n.group!="undefined"){$.each(n.group,function(e,n){var r=n.label,i=n.elements,s=$("<div />").addClass("group"),u=$("<div />").addClass("headline").html(r);s.append(u);var a=o(i);s.append(a),t.push(s)});return}i=n.label,s=n.value,s!=i&&s!=""&&s!=undefined&&(i+=" ("+n.value+")")}r.data("activeInputValue",s),r.html(i),t.push(r)}),t},u="",a=undefined,f,l,c="",h={arrowLeft:37,arrowUp:38,arrowRight:39,arrowDown:40,enter:13,escape:27}};