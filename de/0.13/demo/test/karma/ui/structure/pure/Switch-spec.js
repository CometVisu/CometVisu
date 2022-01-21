/* Switch-spec.js 
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
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing a switch', function() {
  it('should test the switch creator', function() {
    var res = this.createTestElement('switch', {flavour: 'potassium'}, '<label>Test</label>');
    var switchWidget = Array.from(res.getDomElement().children).filter(function(m) {
 return m.matches('.switch'); 
})[0];

    expect(switchWidget).toHaveFlavour('potassium');
    var actor = res.getActor();

    expect(actor).not.toBeNull();
    expect(actor).toHaveClass('switchUnpressed');
    expect(actor).not.toHaveClass('switchPressed');

    var value = res.getValueElement();

    expect(value).not.toBeNull();
    expect(value.innerText).toBe('-');

    var label = Array.from(switchWidget.children).filter(function(m) {
 return m.matches('.label'); 
})[0];

    expect(label).not.toBeNull();
    expect(label.innerText).toBe('Test');

    expect(res.getOnValue()).toBe('1');
    expect(res.getOffValue()).toBe('0');
  });

  it('should test the switch creator with different on/off values', function() {
    var res = this.createTestElement('switch', {on_value: 'turn_on', off_value: 'turn_off'});

    expect(res.getOnValue()).toBe('turn_on');
    expect(res.getOffValue()).toBe('turn_off');
  });

  it('should update a switch', function() {
    var res = this.createTestElement('switch', {}, '<label>Test</label>');

    res.update('12/7/37', 1);
    var actor = res.getActor();

    expect(actor).not.toBe(null);

    expect(actor).toHaveClass('switchPressed');
    expect(actor).not.toHaveClass('switchUnpressed');

    res.update('12/7/37', 0);

    expect(actor).toHaveClass('switchUnpressed');
    expect(actor).not.toHaveClass('switchPressed');
  });

  it('should trigger the switch action', function() {
    var res = this.createTestElement('switch', {}, '<label>Test</label>');
    this.initWidget(res);
    spyOn(res, 'sendToBackend');

    var actor = res.getActor();

    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

    res.update('12/7/37', 0);

    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(res.sendToBackend).toHaveBeenCalledWith('1');

    res.update('12/7/37', 1);

    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(res.sendToBackend).toHaveBeenCalledWith('0');
  });
});
