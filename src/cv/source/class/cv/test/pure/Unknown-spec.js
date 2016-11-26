/**
 * Unit tests for unkown widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a unknown widget", function() {

  it("should test the unknown creator", function() {

    var data = cv.xml.Parser.parse(qx.dom.Element.create('unknown_widget'), 'id_0', null, "text");
    var inst = cv.structure.WidgetFactory.createInstance("unknown", data);
    var unknown = qx.bom.Html.clean([inst.getDomString()])[0];

    expect(qx.bom.Selector.query("pre", unknown)[0].textContent).toBe('unknown: unknown_widget');
  });
});