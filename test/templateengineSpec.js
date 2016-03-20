define(['jquery', 'templateengine'], function($, TemplateEngine) {

  describe('just checking', function() {

    it('should be a singleton TemplateEngine object', function() {
      var engine1 = TemplateEngine.getInstance();
      var engine2 = TemplateEngine.getInstance();

      expect(engine1.constructor.name).toEqual('TemplateEngine');
      expect(engine1).toEqual(engine2);
    });

  });
});