/* ColorChooser-spec.js
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
 * Unit tests for colorchooser
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing a colorchooser', function() {
  it('should test the colorchooser creator', function() {
    const [widget, element] = this.createTestWidgetString('colorchooser', {id: 'test'}, '<label>Test</label>');

    expect(element).toHaveClass('colorchooser');
    expect(element).toHaveLabel('Test');

    expect(widget.getPath()).toBe('id_0');
  });

  // test bug reported here:
  // https://knx-user-forum.de/forum/supportforen/cometvisu/963486-problem-milight-colorchooser-mit-oh-als-backend
  it('should test the colorchooser with incoming data in RGB mode', function() {
    let widgetInstance = this.createTestElement('colorchooser', {'controls':'RGB-r;RGB-g;RGB-b'}, '', 'Rgb_Test', {
      transform: 'OH:color',
      variant: 'rgb'
    });

    let actor1 = widgetInstance.getActor();
    expect(actor1).not.toBe(null);
    expect(actor1).toHaveClass('cc_RGB-r');
    let actor2 = actor1.nextElementSibling;
    expect(actor2).toHaveClass('cc_RGB-g');
    let actor3 = actor2.nextElementSibling;
    expect(actor3).toHaveClass('cc_RGB-b');

    let actor1range = actor1.getElementsByClassName('ui-slider-range')[0];
    let actor2range = actor2.getElementsByClassName('ui-slider-range')[0];
    let actor3range = actor3.getElementsByClassName('ui-slider-range')[0];

    expect(actor1range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
    expect(actor2range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
    expect(actor3range.style.clipPath).toBe('inset(0px 100% 0px 0px)');

    widgetInstance.update('Rgb_Test', '94,0,8'); // HSB: 94,0,8 = HSB => RGB = 0.2, 0.2, 0.2

    expect(actor1range.style.clipPath).toBe('inset(0px 80% 0px 0px)');
    expect(actor2range.style.clipPath).toBe('inset(0px 80% 0px 0px)');
    expect(actor3range.style.clipPath).toBe('inset(0px 80% 0px 0px)');

    widgetInstance.update('Rgb_Test', '320, 60, 10'); // HSB: 320, 60, 10 => RGB:  0.25, 0.10, 0.20

    expect(actor1range.style.clipPath).toBe('inset(0px 75% 0px 0px)');
    expect(actor2range.style.clipPath).toBe('inset(0px 90% 0px 0px)');
    expect(actor3range.style.clipPath).toBe('inset(0px 80% 0px 0px)');
  });

  it('should test the colorchooser with incoming data in R variant', function() {
    let widgetInstance = this.createTestElement('colorchooser', {'controls':'RGB-r;RGB-g;RGB-b'}, '', 'Rgb_Test', {
      transform: 'OH:number',
      variant: 'r'
    });

    let actor1 = widgetInstance.getActor();
    expect(actor1).not.toBe(null);
    expect(actor1).toHaveClass('cc_RGB-r');
    let actor2 = actor1.nextElementSibling;
    expect(actor2).toHaveClass('cc_RGB-g');
    let actor3 = actor2.nextElementSibling;
    expect(actor3).toHaveClass('cc_RGB-b');

    let actor1range = actor1.getElementsByClassName('ui-slider-range')[0];
    let actor2range = actor2.getElementsByClassName('ui-slider-range')[0];
    let actor3range = actor3.getElementsByClassName('ui-slider-range')[0];

    expect(actor1range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
    expect(actor2range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
    expect(actor3range.style.clipPath).toBe('inset(0px 100% 0px 0px)');

    // simulate the initial incoming data
    widgetInstance.update('Rgb_Test', '20');

    expect(actor1range.style.clipPath).toBe('inset(0px 80% 0px 0px)');
    expect(actor2range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
    expect(actor3range.style.clipPath).toBe('inset(0px 100% 0px 0px)');
  });
});
