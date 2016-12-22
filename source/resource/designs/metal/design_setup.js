/* design_setup.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarLeft')[0], 'columns', 6);
qx.bom.element.Dataset.set(qx.bom.Selector.query('#main')[0], 'columns', 12);
qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarRight')[0], 'columns', 6);

cv.MessageBroker.getInstance().subscribe("setup.dom.finished", function() {
  qx.bom.Selector.query('#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label').forEach(function(label) {

    if (label.textContent.trim()!="") {
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

