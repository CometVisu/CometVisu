/**
 * Unit tests for navbar widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_navbar'], function(engine, design) {

  describe("testing a navbar widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the navbar creator", function() {
      spyOn(templateEngine.pagePartsHandler, "navbarSetSize");

      //prepare the test dom with navbars

      var positions = ['top', 'left', 'bottom', 'right'];
      var bars = [];
      for (var index in positions) {
        var pos = positions[index];

        var bar = document.createElement('div');
        var barContainerId = 'navbar'+pos[0].toUpperCase() + pos.substring(1);
        bar.setAttribute("id", barContainerId);
        bars.push(bar);
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

        $(this.createTestWidgetString("navbar", attrs, "<text>Test</text>")[1]);

        templateEngine.postDOMSetupFns.forEach( function( thisFn ){
          thisFn();
        });
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
      }


    });
  });
});