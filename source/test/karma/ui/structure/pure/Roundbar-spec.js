/* Roundbar-spec.js
 * 
 * copyright (c) 2020-2020, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for roundbar widget
 *
 */
describe("testing a roundbar widget", function() {

  it("should test the roundbar creator", function() {
    var res = this.createTestWidgetString('roundbar', {}, '<label>Test</label>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);
    var obj = res[0];

    expect(widget).toHaveClass('roundbar');
    expect(widget).toHaveLabel('Test');
    expect(obj.getPath()).toBe('id_0');
  });

  it("should update an roundbar widget", function(done) {
    var creator = this.createTestElement('roundbar',{format:'%.1f'},null, null,{transform:'DPT:5.004'});
    var actor = creator.getActor();
    var value = actor.querySelector('.value > tspan');
    var bar   = actor.querySelectorAll('path.indicator');

    // as it is hard to do a test with the precise path (rounding issues, etc. pp.) this test is using a different
    // approach: just test the size of the bounding box as that should already give a good hint:
    expect(bar[0].getBBox().width ).toBeLessThan(10); // should be 0 +/- tolerance
    expect(bar[0].getBBox().height).toBeLessThan(10); // should be 0 +/- tolerance

    creator.update('12/7/37', '64'); // 0x64 hex === 100 decimal
    setTimeout(function () {
      expect(value).not.toBe(null);
      expect(value.textContent).toBe('100.0');
      expect(bar[0].getBBox().width ).toBeGreaterThan(100); // should be ~120 +/- tolerance
      expect(bar[0].getBBox().height).toBeGreaterThan(100); // should be ~120 +/- tolerance

      // prepare for test at 800ms:
      creator.update('12/7/37', '00');
    }, 400);

    setTimeout(function () {
      expect(value.textContent).toBe('0.0');
      expect(bar[0].getBBox().width ).toBeLessThan(10); // should be 0 +/- tolerance
      expect(bar[0].getBBox().height).toBeLessThan(20); // should be 10 +/- tolerance
      done();
    }, 800);
  });

  it("should update an multiple bar roundbar widget", function(done) {
    var creator = this.createTestElement('roundbar',{
        labels:'0,100;75;100;inside:1,90;25;,parallel:50;perpendicular:83.3333,,83;,roundstart:0,62,roundstart;,roundend:100,,roundend'
      },null,
      ['12/7/30','12/7/31','12/7/32','12/7/33'],
      [
        {showvalue:'true', radius:'10', width:'1', transform:'DPT:5.004'},
        {showvalue:'false', radius:'20', width:'10', transform:'DPT:5.004'},
        {showvalue:'true', radius:'40', type:'pointer', transform:'DPT:5.004'},
        {showvalue:'false', radius:'50',  type:'pointer', thickness:'10', style:'stroke:red; fill:yellow', transform:'DPT:5.004'}
      ]
    );
    var actor = creator.getActor();
    var value = actor.querySelectorAll('.value > tspan');
    var bar   = actor.querySelectorAll('path.indicator');
    var label = actor.querySelectorAll('text.axislabel');

    expect(value.length).toBe(2);
    expect(bar.length).toBe(4);
    expect(label.length).toBe(9);

    expect(bar[0].style.stroke).toBe('');
    expect(bar[0].style.fill  ).toBe('');
    expect(bar[1].style.stroke).toBe('');
    expect(bar[1].style.fill  ).toBe('');
    expect(bar[2].style.stroke).toBe('');
    expect(bar[2].style.fill  ).toBe('');
    expect(bar[3].style.stroke).toBe('red');
    expect(bar[3].style.fill  ).toBe('yellow');

    expect(label[0].textContent).toBe('0');
    expect(label[1].textContent).toBe('75');
    expect(label[2].textContent).toBe('100');
    expect(label[3].textContent).toBe('1');
    expect(label[4].textContent).toBe('25');
    expect(label[5].textContent).toBe('50');
    expect(label[6].textContent).toBe('83');
    expect(label[7].textContent).toBe('roundstart');
    expect(label[8].textContent).toBe('roundend');

    expect(label[0].x.baseVal[0].value).toBeCloseTo(0, -1);
    expect(label[0].y.baseVal[0].value).toBeCloseTo(100, -1);
    expect(label[0].getAttribute('alignment-baseline')).toBe('hanging');
    expect(label[0].getAttribute('text-anchor')).toBe('middle');
    expect(label[1].x.baseVal[0].value).toBeCloseTo(38.3, -1);
    expect(label[1].y.baseVal[0].value).toBeCloseTo(-92.4, -1);
    expect(label[1].getAttribute('alignment-baseline')).toBe('baseline');
    expect(label[1].getAttribute('text-anchor')).toBe('start');
    expect(label[2].x.baseVal[0].value).toBeCloseTo(100, -1);
    expect(label[2].y.baseVal[0].value).toBeCloseTo(0, -1);
    expect(label[2].getAttribute('alignment-baseline')).toBe('middle');
    expect(label[2].getAttribute('text-anchor')).toBe('start');
    expect(label[3].x.baseVal[0].value).toBeCloseTo(-4, -1);
    expect(label[3].y.baseVal[0].value).toBeCloseTo(90, -1);
    expect(label[3].getAttribute('alignment-baseline')).toBe('baseline');
    expect(label[3].getAttribute('text-anchor')).toBe('start');
    expect(label[4].x.baseVal[0].value).toBeCloseTo(-83, -1);
    expect(label[4].y.baseVal[0].value).toBeCloseTo(34, -1);
    expect(label[4].getAttribute('alignment-baseline')).toBe('baseline');
    expect(label[4].getAttribute('text-anchor')).toBe('start');
    expect(label[5].x.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[5].y.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[5].getAttribute('alignment-baseline')).toBe('hanging');
    expect(label[5].getAttribute('text-anchor')).toBe('middle');
    expect(label[6].x.baseVal[0].value).toBeCloseTo(63.6, -1);
    expect(label[6].y.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[6].getAttribute('alignment-baseline')).toBe('baseline');
    expect(label[6].getAttribute('text-anchor')).toBe('start');
    expect(label[7].firstChild.startOffset.baseVal.valueAsString).toBe('0');
    expect(label[7].firstChild.getAttribute('text-anchor')).toBeNull();
    expect(label[8].firstChild.startOffset.baseVal.valueAsString).toBe('100%');
    expect(label[8].firstChild.getAttribute('text-anchor')).toBe('end');

    creator.update('12/7/30', '64'); // 0x64 hex === 100 decimal
    creator.update('12/7/31', '00');
    creator.update('12/7/32', '00');
    creator.update('12/7/33', '64'); // 0x64 hex === 100 decimal

    setTimeout(function () {
      expect(value).not.toBe(null);
      expect(value[0].textContent).toBe('100');
      expect(value[1].textContent).toBe('0');
      expect(bar[0].getBBox().width ).toBeGreaterThan(20); // should be 22 +/- tolerance
      expect(bar[0].getBBox().height).toBeGreaterThan(20); // should be 22 +/- tolerance
      expect(bar[0].getBBox().width ).toBeLessThan(25); // should be 22 +/- tolerance
      expect(bar[0].getBBox().height).toBeLessThan(25); // should be 22 +/- tolerance
      expect(bar[1].getBBox().width ).toBeLessThan(5); // should be 0 +/- tolerance
      expect(bar[1].getBBox().height).toBeLessThan(15); // should be 10 +/- tolerance
      expect(bar[2].getBBox().width ).toBeLessThan(5); // should be 0 +/- tolerance
      expect(bar[2].getBBox().height).toBeLessThan(15); // should be 10 +/- tolerance
      expect(bar[3].getBBox().width ).toBeLessThan(15); // should be 10 +/- tolerance
      expect(bar[3].getBBox().height).toBeLessThan(15); // should be 10 +/- tolerance

      creator.update('12/7/30', '00'); // 0x64 hex === 100 decimal
      creator.update('12/7/31', '64');
      creator.update('12/7/32', '64');
      creator.update('12/7/33', '00'); // 0x64 hex === 100 decimal
    }, 400);

    setTimeout(function () {
      expect(value[0].textContent).toBe('0');
      expect(value[1].textContent).toBe('100');
      expect(bar[0].getBBox().width ).toBeLessThan(5); // should be 0 +/- tolerance
      expect(bar[0].getBBox().height).toBeLessThan(5); // should be 1 +/- tolerance
      expect(bar[1].getBBox().width ).toBeGreaterThan(55); // should be 60 +/- tolerance
      expect(bar[1].getBBox().height).toBeGreaterThan(55); // should be 60 +/- tolerance
      expect(bar[1].getBBox().width ).toBeLessThan(65); // should be 60 +/- tolerance
      expect(bar[1].getBBox().height).toBeLessThan(65); // should be 60 +/- tolerance
      expect(bar[2].getBBox().width ).toBeLessThan(15); // should be 10 +/- tolerance
      expect(bar[2].getBBox().height).toBeLessThan(5); // should be 0 +/- tolerance
      expect(bar[3].getBBox().width ).toBeLessThan(15); // should be 10 +/- tolerance
      expect(bar[3].getBBox().height).toBeLessThan(15); // should be 10 +/- tolerance

      done();
    }, 800);
  });
});