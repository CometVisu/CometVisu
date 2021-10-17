/* Audio-spec.js 
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
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing a audio widget', function() {
  it('should test the audio creator', function() {
    const [widget, element] = this.createTestWidgetString('audio', {id: 'test'}, '<label>Test</label>');

    expect(element).toHaveClass('audio');
    expect(element).toHaveLabel('Test');

    const audio = element.querySelector('audio');

    expect(audio).not.toHaveAttribute('autoplay');
    expect(audio).not.toHaveAttribute('loop');
    expect(audio).not.toHaveAttribute('style');
    expect(audio).toHaveAttribute('controls');

    expect(widget.getPath()).toBe('id_0');
  });

  it('should test the audio creator with more attributes', function() {
    const [widget, element] = this.createTestWidgetString('audio', {
      id: 'test',
      width: '50%',
      height: '50%',
      autoplay: 'true',
      loop: 'true'
    }, '<label>Test</label>');

    expect(element).toHaveClass('audio');
    expect(element).toHaveLabel('Test');

    const audio = element.querySelector('audio');

    expect(audio).toHaveAttribute('autoplay');
    expect(audio).toHaveAttribute('loop');
    expect(audio).toHaveAttribute('controls');
    expect(audio.getAttribute('style')).toBe('width:50%;height:50%;');
    expect(audio.getAttribute('id')).toBe('test');
  });

  it('should update a audio item', function() {
    var widgetInstance = this.createTestElement('audio', {id: 'test'});

    var actor = widgetInstance.getActor();
    spyOn(actor, 'play');

    spyOn(widgetInstance, 'getActor').and.callFake(function() {
      return actor;
    });

    widgetInstance.update('12/7/37', 0);

    expect(actor.play).not.toHaveBeenCalled();

    widgetInstance.update('12/7/37', 1);

    expect(actor.play).toHaveBeenCalled();
  });
});
