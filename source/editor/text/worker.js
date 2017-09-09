/*
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
 * Webworker for CometVisu's XML text editor. Detects changes in document,
 * Syntax errors and other stuff.
 *
 * @since 0.11.0
 * @author Tobias Bräutigam
 */
importScripts('xmllint.js');

var initialHash = null;
var initialCode = null;
var schema = null;

/**
 * Calculate HashCode from string
 *
 * @see http://stackoverflow.com/q/7616461/940217
 * @return {number}
 */
function hashCode(string) {
  if (Array.prototype.reduce){
    return string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);
  }
  var hash = 0;
  if (string.length === 0) {
    return hash;
  }
  for (var i = 0, l = string.length; i < l; i++) {
    var character  = string.charCodeAt(i);
    hash  = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}


function openFile(data) {
  initialCode = data.code.split("\n");
  initialHash = hashCode(data.code);
  schema = data.schema;
}

function contentChange(data) {
  var newHash = hashCode(data.code);
  // check modifications
  postMessage(["modified", (newHash !== initialHash)]);

  var lint = xmllint.validateXML({
    xml: data.code,
    schema: schema
  });
  postMessage(["errors", lint.errors]);
}

/**
 * Handle messages from application
 */
onmessage = function(ev) {
  var topic = ev.data.shift();
  if (topic in this) {
    // dispatch message to handler
    this[topic].apply(this, ev.data);
  }
};
