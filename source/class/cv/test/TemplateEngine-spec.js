/**
 * Unit tests for the templateengine
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('just checking', function () {

  it('should be a singleton TemplateEngine object', function () {
    var engine1 = cv.TemplateEngine.getInstance();
    var engine2 = cv.TemplateEngine.getInstance();

    expect(engine1.classname).toEqual('cv.TemplateEngine');
    expect(engine1).toEqual(engine2);
  });

});