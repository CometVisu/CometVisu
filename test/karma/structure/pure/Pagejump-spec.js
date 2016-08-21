/**
 * Unit tests for pagejump widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_pagejump'], function(engine, design) {

  describe("testing a pagejump widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the pagejump creator", function() {

      var res = this.createTestWidgetString("pagejump", {'name': 'Testpage'}, "<label>Test</label>");
      var widget = $(res[1]);

      expect(widget).toHaveClass('pagejump');
      expect(widget.find("div.label").text()).toBe('Test');
      expect(widget.find("div.value").text()).toBe('Testpage');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
      expect(data.active_scope).toBe("target");
    });

    it("should test the pagejump creator with some extra settings", function() {

      var res = this.createTestWidgetString("pagejump", {
        'align': 'right',
        'flavour': 'potassium',
        'target': 'OtherPage',
        'path': 'ParentPage',
        'active_scope': 'path'
      }, '<layout colspan="6" rowspan="2"></layout>');
      var widget = $(res[1]);

      expect(widget).toHaveClass('right');
      expect(widget).toHaveClass('innerrowspan');
      expect(widget).toHaveClass('flavour_potassium');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
      expect(data.target_path).toBe("ParentPage");
      expect(data.target).toBe("OtherPage");
      expect(data.align).toBe("right");
      expect(data.active_scope).toBe("path");
      expect(data.colspan).toBe("6");
      expect(data.rowspanClass).toBe("rowspan rowspan2");
    });

    it("should test the pagejump creator with infoaction embedded", function() {

      var res = this.createTestWidgetString("pagejump", {},
        '<widgetinfo><text>Test</text></widgetinfo>');
      var widget = $(res[1]);

      expect(widget).toHaveClass('infoaction');

      var data = templateEngine.widgetDataGet('id_0_0');
      expect(data.containerClass).toBe("widgetinfo");
    });

    it("should trigger the pagejumps downaction", function() {
      spyOn(design.basicdesign, 'defaultButtonDownAnimationInheritAction');

      var creator = this.createTestElement("pagejump", {
        'target': 'test'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];
      creator.downaction('id_0', actor, false);
      expect(design.basicdesign.defaultButtonDownAnimationInheritAction).toHaveBeenCalledWith('id_0', actor);

    });

    it("should trigger the pagejumps action", function() {
      spyOn(templateEngine, 'scrollToPage');
      spyOn(design.basicdesign, 'defaultButtonUpAnimationInheritAction');

      var creator = this.createTestElement("pagejump", {
        'target': 'test'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];

      // canceled
      creator.action('id_0', actor, true);
      expect(design.basicdesign.defaultButtonUpAnimationInheritAction).toHaveBeenCalledWith('id_0', actor);
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('test');
    });

    it("should trigger the pagejumps action with target path", function() {
      spyOn(templateEngine, 'scrollToPage');
      spyOn(templateEngine, 'getPageIdByPath').and.returnValue('id_1');
      spyOn(design.basicdesign, 'defaultButtonUpAnimationInheritAction');

      var creator = this.createTestElement("pagejump", {
        'target': 'test',
        'path': 'path'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];

      // canceled
      creator.action('id_0', actor, true);
      expect(design.basicdesign.defaultButtonUpAnimationInheritAction).toHaveBeenCalledWith('id_0', actor);
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('id_1');
    });

    it("should test the scrolltopage listener", function() {

    });
  });
});