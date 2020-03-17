/* Multitrigger-spec.js 
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
 * Unit tests for multitrigger widget
 *
 */
describe("testing a multitrigger widget", function() {

  it("should test the multitrigger creator", function() {

    var res = this.createTestWidgetString("multitrigger", {}, "<label>Test</label>");
    var widget = cv.util.String.htmlStringToDomElement(res[1]);

    expect(widget).toHaveClass('multitrigger');
    expect(widget).toHaveLabel('Test');

    expect(res[0].getPath()).toBe("id_0");
  });

  it("should test the multitrigger creator", function() {

    var res = this.createTestWidgetString("multitrigger", {
      'showstatus': 'true',
      'mapping': 'test'
    }, '<buttons><button label="B1">1</button><button label="B2">2</button><button label="B3">3</button><button label="B4">4</button></buttons>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);

    qx.event.message.Bus.dispatchByName("setup.dom.finished");

    var values = widget.querySelectorAll("div.actor > div.value");
    for (var i=0; i<4; i++) {
      expect(values[i].innerText).toBe('B'+(i+1));
    }
  });

  it("should update an multitrigger widget", function(done) {
    var creator = this.createTestElement('multitrigger', {
      'showstatus': 'true'
    }, '<buttons><button label="B1">1</button><button label="B2">2</button><button label="B3">3</button><button label="B4">4</button></buttons>', null, {'transform': '4.001'});
    this.initWidget(creator);

    var check = function(index) {
      this.container.children[0].querySelectorAll(".actor_container .actor").forEach(function(actor, i) {
        if (index === i) {
          expect(actor).toHaveClass('switchPressed');
          expect(actor).not.toHaveClass('switchUnpressed');
        } else {
          expect(actor).not.toHaveClass('switchPressed');
          expect(actor).toHaveClass('switchUnpressed');
        }
      });
    }.bind(this);

    var i = 1;
    new Promise(function(resolve) {
      creator.update('12/7/37', i.toString());
      qx.event.Timer.once(function() {
        check(i-1);
        i++;
        resolve();
      }, this, 10);
    }).then(function() {
      return new Promise(function(resolve) {
        creator.update('12/7/37', i.toString());
        qx.event.Timer.once(function () {
          check(i - 1);
          i++;
          resolve();
        }, this, 10);
      });
    }).then(function() {
      return new Promise(function(resolve) {
        creator.update('12/7/37', i.toString());
        qx.event.Timer.once(function () {
          check(i - 1);
          i++;
          resolve();
        }, this, 10);
      });
    }).then(function() {
      return new Promise(function(resolve) {
        creator.update('12/7/37', i.toString());
        qx.event.Timer.once(function () {
          check(i - 1);
          i++;
          resolve();
        }, this, 10);
      });
    }).then(done);
  });

  it('should trigger the multitrigger action', function() {

    var creator = this.createTestElement('multitrigger', {
      'showstatus': 'true'
    }, '<buttons><button label="B1">1</button><button label="B2">2</button><button label="B3">3</button><button label="B4">4</button></buttons>', '<address transform="DPT:4001" mode="read">1/0/0</address>', {'transform': '4.001'});
    spyOn(creator, "sendToBackend");
    var actors = this.container.children[0].querySelectorAll(".actor_container .actor");
    expect(actors.length).not.toBe(0);

    this.initWidget(creator);
    var Reg = qx.event.Registration;

    Reg.fireEvent(actors[0], "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('1');

    Reg.fireEvent(actors[1], "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('2');

    Reg.fireEvent(actors[2], "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('3');

    Reg.fireEvent(actors[3], "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('4');
  });
});