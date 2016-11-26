/**
 * Unit tests for include widget
 *
 */
describe("testing a include widget", function() {

  // TODO: find out how to spy and reactivate test
  xit("should test the include creator", function() {

    var spiedXhr;
    var originalConstructor = qx.io.request.Xhr;
    spyOn(qx.io.request, 'Xhr').and.callFake(function() {
      spiedXhr = new originalConstructor();
      return spiedXhr;
    });

    var child = qx.bom.Html.clean(['<page name="Start"></page>'][0]);

    var fakeResponseEvent = jasmine.createSpyObj("response", ['getTarget']);
    fakeResponseEvent.getTarget.add.callFake(function() {
      var fakeResponse = jasmine.createSpyObj("target", ['getResponse']);
      fakeResponse.getResponse.and.callFake(function() {
        return child;
      })
      return fakeResponse;
    })

    spiedXhr.fireDataEvent("success", fakeResponseEvent);

    spyOn(cv.TemplateEngine.getInstance(), "createPages");

    this.createTestWidgetString("include", {'src': 'test'});
    expect(cv.TemplateEngine.getInstance().createPages).toHaveBeenCalledWith(child, 'id_0', null);
  });
});