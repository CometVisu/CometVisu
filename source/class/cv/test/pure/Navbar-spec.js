/**
 * Unit tests for navbar widget
 *
 */
describe("testing a navbar widget", function() {
  var templateEngine = cv.TemplateEngine.getInstance();

  function testNavbar(pos) {
    spyOn(templateEngine.pagePartsHandler, "navbarSetSize");

    var bar = document.createElement('div');
    var barContainerId = 'navbar'+pos[0].toUpperCase() + pos.substring(1);
    bar.setAttribute("id", barContainerId);

    document.body.appendChild(bar);

    var attrs = {
      'position': pos
    };
    if (pos == "left") {
      // test with flavour + name + dynamic
      attrs.flavour = 'potassium';
      attrs.name = "Testbar";
      attrs.dynamic = "true";
      attrs.width = "200";
      attrs.scope = 1;
    }
    var res = this.createTestWidgetString("navbar", attrs, "<text>Test</text>");
    var obj = res[0];

    cv.MessageBroker.getInstance().publish("setup.dom.finished");

    var navbar = qx.bom.Selector.query('#'+barContainerId+' .navbar')[0];
    expect(navbar).not.toBeNull();
    expect(qx.bom.element.Attribute.get(navbar, 'id')).toBe('id_'+pos+'_navbar');

    if (pos == "left") {
      expect(navbar).toHaveClass("flavour_potassium");
      expect(qx.dom.Node.getText(qx.bom.Selector.query("h2", navbar)[0])).toBe('Testbar');
      expect(templateEngine.pagePartsHandler.navbarSetSize).toHaveBeenCalledWith(pos,"200");
      expect(obj.getScope()).toBe(1);
    }
    else {
      expect(templateEngine.pagePartsHandler.navbarSetSize).not.toHaveBeenCalled();
      expect(obj.getScope()).toBe(-1);
    }
    document.body.removeChild(bar);
    templateEngine.pagePartsHandler.navbarSetSize.calls.reset();
  };

  it("should test the top navbar creator", function() {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", cv.structure.pure.NavBar.initializeNavbars, cv.structure.pure.NavBar, 100);
    testNavbar.call(this, "top");
  });

  it("should test the left navbar creator", function() {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", cv.structure.pure.NavBar.initializeNavbars, cv.structure.pure.NavBar, 100);
    testNavbar.call(this, "left");
  });

  it("should test the right navbar creator", function() {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", cv.structure.pure.NavBar.initializeNavbars, cv.structure.pure.NavBar, 100);
    testNavbar.call(this, "right");
  });

  it("should test the bottom navbar creator", function() {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", cv.structure.pure.NavBar.initializeNavbars, cv.structure.pure.NavBar, 100);
    testNavbar.call(this, "bottom");
  });
});