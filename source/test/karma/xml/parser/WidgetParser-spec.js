/**
 * @author Tobias Bräutigam
 * @since 2021
 */
describe('testing the widget parser', function() {
  it('should test the label parsing', function () {
    const label = qx.dom.Element.create('label');
    label.innerHTML = 'Test<!--comment-->';
    const result = cv.parser.pure.WidgetParser.parseLabel(label);
    expect(result).toBe('<div class="label">Test</div>');
  });

  it('should test the label parsing with icon', function () {
    const label = qx.dom.Element.create('label');
    label.innerHTML = 'Test<icon name="fts_door_open" color="red" flavour="custom"></icon>';
    const result = cv.parser.pure.WidgetParser.parseLabel(label);
    const element = cv.util.String.htmlStringToDomElement(result);
    expect(element.className).toBe('label');
    expect(element.childNodes.length).toBe(2);
    const [textChild, iconChild] = element.childNodes;
    expect(textChild.nodeType).toBe(Node.TEXT_NODE);
    expect(textChild.textContent).toBe('Test');
    expect(iconChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(iconChild.tagName.toLowerCase()).toBe('svg');
    expect(iconChild.getAttribute('style')).toBe('color:#ff4444;');
    expect(iconChild.getAttribute('class')).toBe('icon');
    expect(iconChild.childNodes.length).toBe(1);
    const useChild = iconChild.childNodes[0];
    expect(useChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(useChild.tagName.toLowerCase()).toBe('use');
    expect(useChild.getAttribute('xlink:href')).toContain('knx-uf-iconset.svg#kuf-fts_door_open');
    expect(useChild.childNodes.length).toBe(0);
  });
});
