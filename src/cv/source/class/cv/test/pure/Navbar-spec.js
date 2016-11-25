/**
 * Unit tests for navbar widget
 *
 */
describe("testing a navbar widget", function() {

  function testNavbar(pos, that) {
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
      attrs.scope = "1";
    }
    var res = that.createTestWidgetString("navbar", attrs, "<text>Test</text>");

    cv.MessageBroker.my.publish("setup.dom.finished");

    var navbar = $('.navbar', '#'+barContainerId);
    expect(navbar).not.toBeNull();
    expect($(navbar).attr('id')).toBe('id_'+pos+'_navbar');

    var data = templateEngine.widgetDataGet('id_'+pos+'_navbar');

    if (pos == "left") {
      expect($(navbar)).toHaveClass("flavour_potassium");
      expect($($(navbar).find('h2')).text()).toBe('Testbar');
      expect(templateEngine.pagePartsHandler.navbarSetSize).toHaveBeenCalledWith(pos,"200");
      expect(data.scope).toBe("1");
    }
    else {
      expect(templateEngine.pagePartsHandler.navbarSetSize).not.toHaveBeenCalled();
      expect(data.scope).toBe(-1);
    }
    document.body.removeChild(bar);
    templateEngine.pagePartsHandler.navbarSetSize.calls.reset();
    cv.structure.pure.NavBar.my.isNotSubscribed = true;
  };

  it("should test the top navbar creator", function() {
    testNavbar("top", this);
  });

  it("should test the left navbar creator", function() {
    testNavbar("left", this);
  });

  it("should test the right navbar creator", function() {
    testNavbar("right", this);
  });

  it("should test the bottom navbar creator", function() {
    testNavbar("bottom", this);
  });
});