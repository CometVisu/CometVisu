/* Designtoggle-spec.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for designtoggle widget
 *
 */
describe('testing a designtoggle widget', function() {
  const origValues = cv.Config.designStructureMap.pure;

  beforeEach(() => {
    cv.Config.designStructureMap.pure = ['metal', 'pure'];
  });

  afterEach(() => {
    cv.Config.designStructureMap.pure = origValues;
  });

  it('should test the designtoggle creator', function() {
    const [widget, element] = this.createTestWidgetString('designtoggle', {}, '<label>Test</label>');

    expect(element).toHaveClass('toggle');
    expect(element).toHaveLabel('Test');

    expect(widget.getPath()).toBe('id_0');
  });

  it('should trigger the designtoggle action', function() {
    var parts = window.location.href.split('#');
    var loc = parts[0];
    var anchor = parts[1] ? '#'+parts[1] : '';
    var creator = this.createTestElement('designtoggle');
    spyOn(cv.util.Location, 'setHref');

    var actor = creator.getActor();

    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;
    this.initWidget(creator);

    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(cv.util.Location.setHref).toHaveBeenCalledWith(loc+'?design=metal'+anchor);

    spyOn(cv.util.Location, 'getHref').and.returnValue(loc+'?design=pure'+anchor);
    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(cv.util.Location.setHref).toHaveBeenCalledWith(loc+'?design=metal'+anchor);

    cv.util.Location.getHref.and.returnValue(loc+'?other=parameter'+anchor);
    Reg.fireEvent(actor, 'tap', qx.event.type.Event, []);

    expect(cv.util.Location.setHref).toHaveBeenCalledWith(loc+'?other=parameter&design=metal'+anchor);
  });
});
