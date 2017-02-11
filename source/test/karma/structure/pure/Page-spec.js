/* Page-spec.js 
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
 * Unit tests for page widget
 *
 */
describe("testing a page widget", function() {
  var templateEngine = cv.TemplateEngine.getInstance();

  it("should test that invisible pages generate no DOM string", function() {

    expect(this.createTestWidgetString("page", {'visible': "false"})[1]).toBe(undefined);

  });

  it("should test the page creator", function() {
    var res = this.createTestWidgetString("page", {'name': 'Testpage'}, "<label>Test</label>");
    var pageLink = res[0];
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    expect(page.getPageType()).toBe("text");

    var widget = qx.bom.Html.clean([res[1]])[0];
    cv.ui.structure.pure.Page.createFinal();
    expect(widget).toHaveClass('pagelink');

    var elem = page.getDomElement();
    expect(elem).toHaveClass("type_text");
    expect(qx.dom.Node.getText(qx.bom.Selector.matches("h1", qx.dom.Hierarchy.getDescendants(elem))[0])).toBe("Testpage");
  });

  it("should test the page creator with some attributes", function() {

    var res = this.createTestWidgetString("page", {
      'name': "TestPage",
      'flavour': 'potassium',
      'bind_click_to_widget': 'true',
      'align': 'right',
      'showtopnavigation': 'true',
      'showfooter': 'true',
      'shownavbar-top': 'true',
      'shownavbar-left': 'true',
      'shownavbar-bottom': 'true',
      'shownavbar-right': 'true'
    });
    var pageLink = res[0];
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");

    var widget = qx.bom.Html.clean([res[1]])[0];
    var actor = this.findChild(widget, ".actor");
    expect(qx.bom.element.Style.get(actor, 'text-align')).toBe('right');
    cv.ui.structure.pure.Page.createFinal();

    expect(page.getShowTopNavigation()).toBeTruthy();
    expect(page.getShowFooter()).toBeTruthy();
    expect(page.getShowNavbarTop()).toBeTruthy();
    expect(page.getShowNavbarBottom()).toBeTruthy();
    expect(page.getShowNavbarLeft()).toBeTruthy();
    expect(page.getShowNavbarRight()).toBeTruthy();

    expect(page.getDomElement()).toHaveClass("flavour_potassium");
  });

  it("should test the 2d-page creator with contained svg backdrop", function() {

    var res = this.createTestWidgetString("page", {
      'name': "TestPage",
      'type': '2d',
      'size': 'contained',
      'backdropalign': 'left',
      'backdrop': 'test.svg'
    });
    var pageLink = res[0];
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    cv.ui.structure.pure.Page.createFinal();

    expect(page.getBackdropAlign()).toBe("left");

    page = qx.bom.Selector.query('#pages .page')[0];

    expect(page).toHaveClass("type_2d");
    var backdrop = qx.bom.Selector.query("embed", page)[0];
    expect(backdrop).toHaveStyleSetting('width', '100%');
    expect(backdrop).toHaveStyleSetting('height', '100%');
    expect(backdrop).toHaveStyleSetting('object-fit', 'contain');
    expect(backdrop).toHaveStyleSetting('object-position', 'left');
    expect(qx.bom.element.Attribute.get(backdrop, 'src')).toBe('test.svg');
  });

  it("should test the 2d-page creator with fixed png backdrop", function() {

    this.createTestWidgetString("page", {
      'name': "TestPage",
      'type': '2d',
      'size': 'fixed',
      'backdrop': 'test.png'
    });

    cv.ui.structure.pure.Page.createFinal();

    var page = qx.bom.Selector.query('#pages .page')[0];

    expect(page).toHaveClass("type_2d");
    var backdrop = qx.bom.Selector.query("img", page)[0];

    expect(qx.bom.element.Attribute.get(backdrop, 'src')).toBe('test.png');
  });

  it("should test the page update", function() {
    spyOn(templateEngine, 'scrollToPage');

    var res = this.createTestWidgetString("page", {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    this.initWidget(res);

    var pageLink = res[0];
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath()+"_");
    spyOn(page, "sendToBackend");
    cv.ui.structure.pure.Page.createFinal();

    page.update('1/0/0', 1);
    expect(page.sendToBackend).toHaveBeenCalledWith('0');
    expect(templateEngine.scrollToPage).toHaveBeenCalledWith('Testpage');
  });

  it("should trigger the page action", function() {
    spyOn(templateEngine, 'scrollToPage');

    var pageLink = this.createTestElement("page", {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    this.initWidget(pageLink);
    qx.event.Registration.fireEvent(pageLink.getActor(), "tap", qx.event.type.Event, []);
    expect(templateEngine.scrollToPage).toHaveBeenCalledWith('id_0_');
  });
});