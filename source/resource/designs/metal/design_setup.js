/* design_setup.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
 * Design setup  for the metal design
 *
 * @author Tobias Bräutigam
 * @since 2012
 */
qx.event.message.Bus.subscribe("setup.dom.finished.before", function() {
  document.querySelector('#navbarLeft').dataset['columns'] = 6;
  document.querySelector('#main').dataset['columns'] = 12;
  document.querySelector('#navbarRight').dataset['columns'] = 6;
});

function getOffsetCorners(elem) {
  var bounds = elem.getBoundingClientRect();
  return {
    top_left: {top: Math.round(bounds.top), left: Math.round(bounds.left) },
    bottom_left: {top: Math.round(bounds.top+bounds.height), left: Math.round(bounds.left) },
    top_right: {top: Math.round(bounds.top), left: Math.round(bounds.left+bounds.width) },
    bottom_right: {top: Math.round(bounds.top+bounds.height), left: Math.round(bounds.left+bounds.width) }
  };
}

function setRadius(elem, type, value) {
  elem.style[type] = value;
  Array.from(elem.children).forEach(function(subElem) {
    subElem.style[type] = value;
  }, this);
}

function roundCorners() {
  // find elements in each groups corners
  document.querySelectorAll('.page.activePage .group').forEach(function(group) {
    var bounds = group.getBoundingClientRect();
    // skip invisible groups
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }
    // do not use this in navbars
    if (Array.prototype.filter.call(qx.dom.Hierarchy.getAncestors(group),function(m){return m.matches('.navbar');}).length > 0) { return; }
    var groupCorners = getOffsetCorners(group);
    // if the group has a headline (=name) we must not round the upper corners
    var topRight = window.getComputedStyle(group)['border-top-right-radius'];
    var bottomRight = window.getComputedStyle(group)['border-bottom-right-radius'];
    var bottomLeft = window.getComputedStyle(group)['border-bottom-left-radius'];
    var roundUpperCorners = (group.querySelectorAll('.widget_container:first-child').length>0) && topRight !== "0px";
    var threshold=5;
    group.querySelectorAll('.widget_container').forEach(function (elem) {
      var elemCorners = getOffsetCorners(elem);
      if (roundUpperCorners) {
        // upper left corner is done by regular  css-rule  upper right corner
        if (Math.abs(elemCorners.top_right.top-groupCorners.top_right.top)<threshold && Math.abs(elemCorners.top_right.left-groupCorners.top_right.left)<threshold) {
          setRadius(elem, 'border-top-right-radius', topRight);
        }
      }
      if (bottomRight!=="0px" && Math.abs(elemCorners.bottom_right.top-groupCorners.bottom_right.top)<threshold && Math.abs(elemCorners.bottom_right.left-groupCorners.bottom_right.left)<threshold) {
        setRadius(elem, 'border-bottom-right-radius', bottomRight);
      }
      if (bottomLeft!=="0px" && Math.abs(elemCorners.bottom_left.top-groupCorners.bottom_left.top)<threshold && Math.abs(elemCorners.bottom_left.left-groupCorners.bottom_left.left)<threshold) {
        setRadius(elem, 'border-bottom-left-radius', bottomLeft);
      }
    });
  });
}
var deferredRoundCorners = new qx.util.DeferredCall(roundCorners);
if (/(opera|chrome|safari)/i.test(navigator.userAgent.toLowerCase())) {
  qx.event.message.Bus.subscribe("path.pageChanged", function () {
    deferredRoundCorners.schedule();
  });

  qx.event.Registration.addListener(window, 'resize', function () {
    deferredRoundCorners.schedule();
  });
}

qx.event.message.Bus.subscribe("setup.dom.finished", function() {
  document.querySelectorAll('#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label').forEach(function(label) {

    if (label.textContent.trim()!=="") {
      var actor = Array.prototype.filter.call(qx.dom.Hierarchy.getSiblings(label),function(m){return m.matches('.actor');})[0];
      if (actor && Array.from(label.children).filter(function(m){return m.matches('img');}).length === 0) {
        var value = Array.from(actor.children).filter(function(m){return m.matches('.value');})[0];
        if (value && value.textContent.trim() !== "") {
          actor.style['padding-top'] = '0.5em';
        }
      }
    }
  });
  // Disable borders for groups that contain widget-group as children
  document.querySelectorAll('.page > div > .widget_container > .group:not(.widget)').forEach(function(elem) {
    if (elem.querySelectorAll('.clearfix > .widget_container > .group.widget').length > 0) {
      Object.entries({'border': 'none', 'margin': 0}).forEach(function(key_value){elem.style[key_value[0]]=key_value[1];});
    }
  });
});

