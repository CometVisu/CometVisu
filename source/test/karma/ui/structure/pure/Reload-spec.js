/* Reload-spec.js 
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
 * Unit tests for reload widget
 *
 */
describe("testing a reload widget", function() {

  it("should test the reload creator", function() {
    const [widget, element] = this.createTestWidgetString("reload");
    expect(widget.getPath()).toBe("id_0");
  });

  it("should test the reload action", function() {
    var widgetInstance = this.createTestElement("reload", null, null, '1/0/0');
    spyOn(cv.util.Location, "reload");
    widgetInstance._update('1/0/0', 0);
    expect(cv.util.Location.reload).not.toHaveBeenCalled();
    widgetInstance._update('1/0/0', 1);
    expect(cv.util.Location.reload).toHaveBeenCalledWith(true);
  });
});