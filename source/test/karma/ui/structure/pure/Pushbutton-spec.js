/* Pushbutton-spec.js 
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
 * Unit tests for pushbutton widget
 *
 */
describe('testing a pushbutton widget', function() {
  var realClient;
  beforeEach(function() {
    realClient = cv.TemplateEngine.getInstance().visu;
    var client = new cv.io.Mockup();
    cv.TemplateEngine.getInstance().visu = client;
    spyOn(client, 'write');
  });

  afterEach(function () {
    cv.TemplateEngine.getInstance().visu = realClient;
  });

  it('should test the pushbutton creator', function() {
    const [widget, element] = this.createTestWidgetString('pushbutton', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('pushbutton');
    expect(element).toHaveLabel('Test');
  });

  it('should check if the up/down values are used corrent', function() {
    var button = this.createTestElement('pushbutton');

    expect(button.getActionValue({type: 'pointerup'})).toBe('0');
    expect(button.getActionValue({type: 'pointerdown'})).toBe('1');
  });

  it('should test the events', function() {
    var button = this.createTestElement('pushbutton');
    var actor = button.getActor();

    this.initWidget(button);
    spyOn(button, 'sendToBackend');
    var Reg = qx.event.Registration;

    Reg.fireEvent(actor, 'pointerdown');

    expect(button.sendToBackend).toHaveBeenCalledWith('1', jasmine.any(Function));
    Reg.fireEvent(actor, 'pointerup');

    expect(button.sendToBackend).toHaveBeenCalledWith('0', jasmine.any(Function));
  });

  it('should send up/down to different addresses', function() {
    var button = this.createTestElement('pushbutton', null, null, ['UpAddress', 'DownAddress'], [
      {
        transform: 'Switch',
        variant: 'up',
        mode: 'write'
      },
      {
        transform: 'Switch',
        variant: 'down',
        mode: 'write'
      }
    ]);
    var actor = button.getActor();

    this.initWidget(button);
    const client = cv.TemplateEngine.getInstance().visu;
    var Reg = qx.event.Registration;

    Reg.fireEvent(actor, 'pointerdown');

    expect(client.write).toHaveBeenCalledWith('DownAddress', '1', jasmine.objectContaining({
      transform: 'Switch', mode: 2, variantInfo: 'down', formatPos: 1
    }));
    expect(client.write.calls.count()).toBe(1);
    Reg.fireEvent(actor, 'pointerup');
    expect(client.write.calls.count()).toBe(2);
    expect(client.write).toHaveBeenCalledWith('UpAddress', '0', jasmine.objectContaining({
      transform: 'Switch', mode: 2, variantInfo: 'up', formatPos: 1
    }));
  });
});
