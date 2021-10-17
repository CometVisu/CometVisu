/* structure_plugin-spec.js 
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
 * Unit tests for colorchooser plugin
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing a colorchooser plugin', function() {
  beforeAll(function(done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(['plugin-colorchooser'], function () {
      cv.util.ScriptLoader.getInstance().addListenerOnce('finished', function () {
        done();
      }, this);
      qx.event.Timer.once(function() {
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
        cv.TemplateEngine.getInstance().setPartsLoaded(true);
      }, this, 10);
    }, this);
  });

  it('should test the colorchooser creator', function() {
    const [widget, element] = this.createTestWidgetString('colorchooser', {id: 'test'}, '<label>Test</label>');

    expect(element).toHaveClass('colorchooser');
    expect(element).toHaveLabel('Test');

    expect(widget.getPath()).toBe('id_0');
  });

  // test bug reported here:
  // https://knx-user-forum.de/forum/supportforen/cometvisu/963486-problem-milight-colorchooser-mit-oh-als-backend
  it('should test the colorchooser with incoming data in RGB mode', function() {
    var widgetInstance = this.createTestElement('colorchooser', {}, '', 'Rgb_Test', {
      transform: 'OH:color',
      variant: 'rgb'
    });
    var farbtastic = jasmine.createSpyObj('farbtastic', ['setColor', 'linkTo']);
    spyOn(jQuery, 'farbtastic').and.callFake(function () {
      return farbtastic;
    });

    this.initWidget(widgetInstance);

    // simulate the initial incoming data
    widgetInstance.update('Rgb_Test', '94,0,8');

    expect(farbtastic.setColor).toHaveBeenCalledWith('#333333');
  });

  it('should test the colorchooser with incoming data in R variant', function() {
    var widgetInstance = this.createTestElement('colorchooser', {}, '', 'Rgb_Test', {
      transform: 'OH:number',
      variant: 'r'
    });
    var farbtastic = jasmine.createSpyObj('farbtastic', ['setColor', 'linkTo']);
    spyOn(jQuery, 'farbtastic').and.callFake(function() {
      return farbtastic;
    });

    this.initWidget(widgetInstance);

    // simulate the initial incoming data
    widgetInstance.update('Rgb_Test', '20');

    expect(farbtastic.setColor).toHaveBeenCalledWith('#330000');
  });
});
