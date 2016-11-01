/**
 * Unit tests for pagejump widget
 *
 */

define( ['widget_pagejump'], function() {

  describe("testing a pagejump widget", function() {

    it("should test the pagejump creator", function() {

      var res = this.createTestWidgetString("pagejump", {'name': 'Testpage'}, "<label>Test</label>");
      var widget = $(res[1]);

      expect(widget).toHaveClass('pagejump');
      expect(widget.find("div.label").text()).toBe('Test');
      expect(widget.find("div.value").text()).toBe('Testpage');

      expect(res[0].getPath()).toBe("id_0");
      expect(res[0].getActiveScope()).toBe("target");
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

      expect(res[0].getPath()).toBe("id_0");
      expect(res[0].getTargetPath()).toBe("ParentPage");
      expect(res[0].getTarget()).toBe("OtherPage");
      expect(res[0].getAlign()).toBe("right");
      expect(res[0].getActiveScope()).toBe("path");
      expect(res[0].getColspan()).toBe("6");
      expect(res[0].getRowspanClass()).toBe("rowspan rowspan2");
    });

    it("should test the pagejump creator with infoaction embedded", function() {

      var res = this.createTestWidgetString("pagejump", {},
        '<widgetinfo><text>Test</text></widgetinfo>');
      var widget = $(res[1]);

      expect(widget).toHaveClass('infoaction');
    });

    it("should trigger the pagejumps downaction", function() {

      var creator = this.createTestElement("pagejump", {
        'target': 'test'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];
      creator.downaction('id_0', actor, false);
      expect($(actor)).toHaveClass("switchPressed");

    });

    it("should trigger the pagejumps action", function() {
      spyOn(templateEngine, 'scrollToPage');

      var creator = this.createTestElement("pagejump", {
        'target': 'test'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];

      // canceled
      creator.action('id_0', actor, true);

      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();
      expect($(actor)).toHaveClass("switchUnpressed");
      creator.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('test');
    });

    it("should trigger the pagejumps action with target path", function() {
      spyOn(templateEngine, 'scrollToPage');
      spyOn(templateEngine, 'getPageIdByPath').and.returnValue('id_1');

      var creator = this.createTestElement("pagejump", {
        'target': 'test',
        'path': 'path'
      });
      var actor = this.container.children[0].querySelectorAll('.actor')[0];

      // canceled
      creator.action('id_0', actor, true);
      expect($(actor)).toHaveClass("switchUnpressed");
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith('id_1');
    });

    it("should test the scrolltopage listener", function() {

    });
  });
});