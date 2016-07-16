/**
 * Unit tests for page widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_page'], function(engine, design) {

  describe("testing a page widget", function() {
    var templateEngine = engine.getInstance();

    beforeEach(function() {
      this.pages = document.createElement('div');
      this.pages.setAttribute('id', 'pages');
      document.body.appendChild(this.pages);
    });

    afterEach(function() {
      document.body.removeChild(this.pages);
      this.pages = null;
    });

    it("should test the page creator", function() {

      expect(this.createTestWidgetString("page", {'visible': "false"})[1]).toBe('');

      var res = this.createTestWidgetString("page", {'name': 'Testpage'}, "<label>Test</label>");
      var creator = res[0];
      var widget = $(res[1]);
      creator.createFinal();
      expect(widget).toHaveClass('pagelink');

      var data = templateEngine.widgetDataGet('id_0_');
      expect(data.type).toBe("text");

      var page = $($('.page', '#pages')[0]);
      expect(page).toHaveClass("type_text");

      expect($(page.find('h1')).text()).toBe("Testpage");
    });

    it("should test the page creator with some attributes", function() {

      var res = this.createTestWidgetString("page", {
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
      var creator = res[0];
      var widget = $(res[1]);
      var actor = $(widget.find(".actor").get(0));
      expect(actor.css('text-align')).toBe('right');
      creator.createFinal();

      var data = templateEngine.widgetDataGet('id_0_');
      expect(data.showtopnavigation).toBe("true");
      expect(data.showfooter).toBe("true");
      expect(data.shownavbar.top).toBe("true");
      expect(data.shownavbar.bottom).toBe("true");
      expect(data.shownavbar.left).toBe("true");
      expect(data.shownavbar.right).toBe("true");

      var page = $($('.page', '#pages')[0]);
      expect(page).toHaveClass("flavour_potassium");
    });

    it("should test the 2d-page creator with contained svg backdrop", function() {

      var res = this.createTestWidgetString("page", {
        'type': '2d',
        'size': 'contained',
        'backdropalign': 'left',
        'backdrop': 'test.svg'
      });
      var creator = res[0];
      creator.createFinal();

      var data = templateEngine.widgetDataGet('id_0_');
      expect(data.backdropalign).toBe("left");

      var page = $($('.page', '#pages')[0]);

      expect(page).toHaveClass("type_2d");
      var backdrop = page.find('embed')[0];
      expect(backdrop).toHaveStyleSetting('width', '100%');
      expect(backdrop).toHaveStyleSetting('height', '100%');
      expect(backdrop).toHaveStyleSetting('object-fit', 'contain');
      expect(backdrop).toHaveStyleSetting('object-position', 'left');
      expect($(backdrop).attr('src')).toBe('test.svg');
    });

    it("should test the 2d-page creator with fixed png backdrop", function() {

      var res = this.createTestWidgetString("page", {
        'type': '2d',
        'size': 'fixed',
        'backdrop': 'test.png'
      });
      var creator = res[0];
      creator.createFinal();

      var page = $($('.page', '#pages')[0]);

      expect(page).toHaveClass("type_2d");
      var backdrop = page.find('img')[0];

      expect($(backdrop).attr('src')).toBe('test.png');
    });

    it("should test the page update", function() {
      spyOn(templateEngine.visu, 'write');
      spyOn(templateEngine, 'scrollToPage');

      var res = this.createTestWidgetString("page", {
        'type': 'text',
        'ga': '1/0/0',
        'name': 'Testpage'
      });
      var creator = res[0];
      creator.createFinal();

      var container = document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = res[1];
      document.body.appendChild(container);
      this.container = container;

      var page = $('.page > div', '#pages')[0];
      creator.update.call(page, '1/0/0', 1);

      expect(templateEngine.visu.write).toHaveBeenCalledWith('1/0/0', '80');
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('Testpage');
    });

    it("should trigger the page action", function() {
      spyOn(templateEngine, 'scrollToPage');

      var res = this.createTestWidgetString("page", {
        'type': 'text',
        'ga': '1/0/0',
        'name': 'Testpage'
      });
      var creator = res[0];
      //canceled
      creator.action('id_0', null, true);
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();
      creator.action('id_0', null, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('id_0_');
    });
  });
});