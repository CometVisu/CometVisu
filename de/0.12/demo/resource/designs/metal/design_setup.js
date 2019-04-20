/* design_setup.js 
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
 * Design setup  for the metal design
 *
 * @author Tobias Bräutigam
 * @since 2012
 */
qx.event.message.Bus.subscribe("setup.dom.finished.before", function() {
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarLeft')[0], 'columns', 6);
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#main')[0], 'columns', 12);
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarRight')[0], 'columns', 6);
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
  qx.bom.element.Style.set(elem, type, value);
  qx.dom.Hierarchy.getChildElements(elem).forEach(function(subElem) {
    qx.bom.element.Style.set(subElem, type, value);
  }, this);
}

function roundCorners() {
  // find elements in each groups corners
  qx.bom.Selector.query('.page.activePage .group').forEach(function(group) {
    var bounds = group.getBoundingClientRect();
    // skip invisible groups
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }
    // do not use this in navbars
    if (qx.bom.Selector.matches('.navbar', qx.dom.Hierarchy.getAncestors(group)).length > 0) { return; }
    var groupCorners = getOffsetCorners(group);
    // if the group has a headline (=name) we must not round the upper corners
    var topRight = qx.bom.element.Style.get(group, 'border-top-right-radius');
    var bottomRight = qx.bom.element.Style.get(group, 'border-bottom-right-radius');
    var bottomLeft = qx.bom.element.Style.get(group, 'border-bottom-left-radius');
    var roundUpperCorners = (qx.bom.Selector.query('.widget_container:first-child', group).length>0) && topRight !== "0px";
    var threshold=5;
    qx.bom.Selector.query('.widget_container', group).forEach(function (elem) {
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
  qx.bom.Selector.query('#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label').forEach(function(label) {

    if (label.textContent.trim()!=="") {
      var actor = qx.bom.Selector.matches('.actor', qx.dom.Hierarchy.getSiblings(label))[0];
      if (actor && qx.bom.Selector.matches('img', qx.dom.Hierarchy.getChildElements(label)).length === 0) {
        var value = qx.bom.Selector.matches('.value', qx.dom.Hierarchy.getChildElements(actor))[0];
        if (value && value.textContent.trim() !== "") {
          qx.bom.element.Style.set(actor, 'padding-top', '0.5em');
        }
      }
    }
  });
  // Disable borders for groups that contain widget-group as children
  qx.bom.Selector.query('.page > div > .widget_container > .group:not(.widget)').forEach(function(elem) {
    if (qx.bom.Selector.query('.clearfix > .widget_container > .group.widget', elem).length > 0) {
      qx.bom.element.Style.setStyles(elem, {'border': 'none', 'margin': 0});
    }
  });
});

