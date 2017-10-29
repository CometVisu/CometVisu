//
//  Design setup for the pure design
//
//   Copyright (C) 2012 by Christian Mayer
//   cometvisu (at) ChristianMayer.de
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program; if not, write to the
//   Free Software Foundation, Inc.,
//   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
//////////////////////////////////////////////////////////////////////////////

qx.event.message.Bus.subscribe("setup.dom.finished.before", function() {
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarLeft')[0], 'columns', 6);
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#main')[0], 'columns', 12);
  qx.bom.element.Dataset.set(qx.bom.Selector.query('#navbarRight')[0], 'columns', 6);
});
/*
templateEngine.defaults = { plugin: { controllerinput: {
  sparklineWidth: 1.5,
  sparklineSpotradius: 3,
  colorActual:   'hsl(225,80%,50%)',
  colorSetpoint: 'hsl(45,80%,50%)',
  colorControl:  'hsl(345,80%,50%)'
}}};
*/
