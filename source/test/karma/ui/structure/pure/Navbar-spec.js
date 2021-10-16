/* Navbar-spec.js 
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
 * Unit tests for navbar widget
 *
 */
describe("testing a navbar widget", function() {
  /**
   * @param pos
   */
  function testNavbar(pos) {
    var templateEngine = cv.TemplateEngine.getInstance();
    spyOn(templateEngine.pagePartsHandler, "navbarSetSize");

    var bar = document.createElement("div");
    var barContainerId = "navbar"+pos[0].toUpperCase() + pos.substring(1);
    bar.setAttribute("id", barContainerId);

    document.body.appendChild(bar);

    var attrs = {
      "position": pos
    };
    if (pos === "left") {
      // test with flavour + name + dynamic
      attrs.flavour = "potassium";
      attrs.name = "Testbar";
      attrs.dynamic = "true";
      attrs.width = "200";
      attrs.scope = 1;
    }
    const [widget] = this.createTestWidgetString("navbar", attrs, "<text>Test</text>");

    qx.event.message.Bus.dispatchByName("setup.dom.finished.before");
    qx.event.message.Bus.dispatchByName("setup.dom.finished");

    var navbar = document.querySelector("#"+barContainerId+" .navbar");

    expect(navbar).not.toBeNull();
    expect(navbar.getAttribute("id")).toBe("id_"+pos+"_navbar");

    if (pos === "left") {
      expect(navbar).toHaveClass("flavour_potassium");
      expect(navbar.querySelector("h2").innerText).toBe("Testbar");
      expect(widget.getScope()).toBe(1);
    } else {
      expect(templateEngine.pagePartsHandler.navbarSetSize).not.toHaveBeenCalled();
      expect(widget.getScope()).toBe(-1);
    }
    document.body.removeChild(bar);
    templateEngine.pagePartsHandler.navbarSetSize.calls.reset();
  }

  beforeEach(() => {
    qx.event.message.Bus.subscribe("setup.dom.finished.before", cv.ui.structure.pure.NavBar.initializeNavbars, cv.ui.structure.pure.NavBar);
  });

  afterEach(() => {
    qx.event.message.Bus.unsubscribe("setup.dom.finished.before", cv.ui.structure.pure.NavBar.initializeNavbars, cv.ui.structure.pure.NavBar);
  });

  it("should test the top navbar creator", function() {
    testNavbar.call(this, "top");
  });

  it("should test the left navbar creator", function() {
    testNavbar.call(this, "left");
  });

  it("should test the right navbar creator", function() {
    testNavbar.call(this, "right");
  });

  it("should test the bottom navbar creator", function() {
    testNavbar.call(this, "bottom");
  });
});
