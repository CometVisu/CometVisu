/* Group-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * Unit tests for group widget
 *
 */
describe('testing a group widget', function() {
  it('should test the group creator', function() {
    const [widget, element] = this.createTestWidgetString('group');

    expect(element).toHaveClass('group');
    expect(element).toHaveClass('widget');
    expect(widget.getColspan()).toBe(6);
    expect(widget.getColspanM()).toBe(6);
    expect(widget.getColspanS()).toBe(12);
  });

  it('should test the group creator with more attributes', function() {
    const [widget, element] = this.createTestWidgetString('group', {
      nowidget: true,
      class: 'test',
      flavour: 'potassium',
      align: 'right',
      name: 'Test',
      target: 'target'
    }, '<text/>');

    expect(element).toHaveClass('group');
    expect(element).toHaveClass('custom_test');
    expect(element).toHaveClass('flavour_potassium');
    expect(element).toHaveClass('clickable');
    expect(element).not.toHaveClass('widget');

    expect(element.querySelector('h2').innerText).toBe('Test');
  });

  it('should trigger the group action', function() {
    var templateEngine = cv.TemplateEngine.getInstance();
    spyOn(templateEngine, 'scrollToPage');
    var res = this.createTestElement('group', { target: 'target' }, '', false);

    this.initWidget(res);
    var Reg = qx.event.Registration;

    var actor = res.getInteractionElement();

    expect(actor).not.toBe(null);

    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(templateEngine.scrollToPage).toHaveBeenCalledWith('target');
  });
});
