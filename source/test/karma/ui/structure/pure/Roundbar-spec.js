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
describe('testing a roundbar widget', function() {
  it('should test the roundbar creator', function() {
    const [widget, element] = this.createTestWidgetString('roundbar', {}, '<label>Test</label>');

    expect(element).toHaveClass('roundbar');
    expect(element).toHaveLabel('Test');
    expect(widget.getPath()).toBe('id_0');
  });

  it('should update a roundbar widget', function(done) {
    var creator = this.createTestElement('roundbar', {format:'%.1f'}, null, null, {transform:'DPT:5.004'});
    var actor = creator.getActor();
    var value = actor.querySelector('.value > tspan');
    var axis = actor.querySelectorAll('path.axis');
    var bar = actor.querySelectorAll('path.indicator');

    expect(axis.length).toBe(1);

    // as it is hard to do a test with the precise path (rounding issues, etc. pp.) this test is using a different
    // approach: just test the size of the bounding box as that should already give a good hint:
    expect(axis[0].getBBox().width).toBeCloseTo(100, -1);
    expect(axis[0].getBBox().height).toBeCloseTo(100, -1);

    expect(bar[0].getBBox().width).toBeCloseTo(0, -1);
    expect(bar[0].getBBox().height).toBeCloseTo(0, -1);

    creator.update('12/7/37', '64'); // 0x64 hex === 100 decimal
    setTimeout(function () {
      expect(value).not.toBe(null);
      expect(value.textContent).toBe('100.0');
      expect(bar[0].getBBox().width).toBeCloseTo(120, -1);
      expect(bar[0].getBBox().height).toBeCloseTo(120, -1);

      // prepare for test at 800ms:
      creator.update('12/7/37', '00');
    }, 500);

    setTimeout(function () {
      expect(value.textContent).toBe('0.0');
      expect(bar[0].getBBox().width).toBeCloseTo(0, -1);
      expect(bar[0].getBBox().height).toBeCloseTo(10, -1);
      done();
    }, 1000);
  });

  it('should update a multiple bar roundbar widget', function(done) {
    var creator = this.createTestElement('roundbar', {
        labels:'0,100;75;100;inside:1,90;25;,parallel:20;50;,perpendicular:40;83.3333,,83;,roundstart:0,62,roundstart;,roundmiddle:50,,roundmiddle;,roundend:100,,roundend',
        labelstyle:'font-size:50%',
        linespace:'26'
      }, null,
      ['12/7/30', '12/7/31', '12/7/32', '12/7/33'],
      [
        {showvalue:'true', radius:'10', width:'1', transform:'DPT:5.004'},
        {showvalue:'false', radius:'20', width:'10', transform:'DPT:5.004'},
        {showvalue:'true', radius:'40', type:'pointer', transform:'DPT:5.004'},
        {showvalue:'false', radius:'50', type:'pointer', thickness:'10', style:'stroke:red; fill:yellow', transform:'DPT:5.004'}
      ]
    );
    var actor = creator.getActor();
    var value = actor.querySelectorAll('.value > tspan');
    var bar = actor.querySelectorAll('path.indicator');
    var label = actor.querySelectorAll('text.axislabel');

    expect(value.length).toBe(2);
    expect(bar.length).toBe(4);
    expect(label.length).toBe(12);

    expect(bar[0].style.stroke).toBe('');
    expect(bar[0].style.fill).toBe('');
    expect(bar[1].style.stroke).toBe('');
    expect(bar[1].style.fill).toBe('');
    expect(bar[2].style.stroke).toBe('');
    expect(bar[2].style.fill).toBe('');
    expect(bar[3].style.stroke).toBe('red');
    expect(bar[3].style.fill).toBe('yellow');

    expect(label[0].textContent).toBe('0');
    expect(label[1].textContent).toBe('75');
    expect(label[2].textContent).toBe('100');
    expect(label[3].textContent).toBe('1');
    expect(label[4].textContent).toBe('25');
    expect(label[5].textContent).toBe('20');
    expect(label[6].textContent).toBe('50');
    expect(label[7].textContent).toBe('40');
    expect(label[8].textContent).toBe('83');
    expect(label[9].textContent).toBe('roundstart');
    expect(label[10].textContent).toBe('roundmiddle');
    expect(label[11].textContent).toBe('roundend');

    expect(label[0].x.baseVal[0].value).toBeCloseTo(0, -1);
    expect(label[0].y.baseVal[0].value).toBeCloseTo(100, -1);
    expect(label[0].getAttribute('dominant-baseline')).toBe('hanging');
    expect(label[0].getAttribute('text-anchor')).toBe('middle');
    expect(label[1].x.baseVal[0].value).toBeCloseTo(38.3, -1);
    expect(label[1].y.baseVal[0].value).toBeCloseTo(-92.4, -1);
    expect(label[1].getAttribute('dominant-baseline')).toBe('baseline');
    expect(label[1].getAttribute('text-anchor')).toBe('start');
    expect(label[2].x.baseVal[0].value).toBeCloseTo(100, -1);
    expect(label[2].y.baseVal[0].value).toBeCloseTo(0, -1);
    expect(label[2].getAttribute('dominant-baseline')).toBe('middle');
    expect(label[2].getAttribute('text-anchor')).toBe('start');
    expect(label[3].x.baseVal[0].value).toBeCloseTo(-4, -1);
    expect(label[3].y.baseVal[0].value).toBeCloseTo(90, -1);
    expect(label[3].getAttribute('dominant-baseline')).toBe('baseline');
    expect(label[3].getAttribute('text-anchor')).toBe('start');
    expect(label[4].x.baseVal[0].value).toBeCloseTo(-83, -1);
    expect(label[4].y.baseVal[0].value).toBeCloseTo(34, -1);
    expect(label[4].getAttribute('dominant-baseline')).toBe('baseline');
    expect(label[4].getAttribute('text-anchor')).toBe('start');
    expect(label[5].x.baseVal[0].value).toBeCloseTo(-72.8, -1);
    expect(label[5].y.baseVal[0].value).toBeCloseTo(52.9, -1);
    expect(label[5].getAttribute('dominant-baseline')).toBe('baseline');
    expect(label[5].getAttribute('text-anchor')).toBe('middle');
    expect(label[6].x.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[6].y.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[6].getAttribute('dominant-baseline')).toBe('hanging');
    expect(label[6].getAttribute('text-anchor')).toBe('middle');
    expect(label[7].x.baseVal[0].value).toBeCloseTo(-85.6, -1);
    expect(label[7].y.baseVal[0].value).toBeCloseTo(-27.8, -1);
    expect(label[7].getAttribute('dominant-baseline')).toBe('middle');
    expect(label[7].getAttribute('text-anchor')).toBe('start');
    expect(label[8].x.baseVal[0].value).toBeCloseTo(63.6, -1);
    expect(label[8].y.baseVal[0].value).toBeCloseTo(-63.6, -1);
    expect(label[8].getAttribute('dominant-baseline')).toBe('middle');
    expect(label[8].getAttribute('text-anchor')).toBe('end');
    expect(label[9].firstChild.startOffset.baseVal.valueAsString).toBe('0');
    expect(label[9].firstChild.getAttribute('text-anchor')).toBeNull();
    expect(label[10].firstChild.startOffset.baseVal.valueAsString).toBe('50%');
    expect(label[10].firstChild.getAttribute('text-anchor')).toBe('middle');
    expect(label[11].firstChild.startOffset.baseVal.valueAsString).toBe('100%');
    expect(label[11].firstChild.getAttribute('text-anchor')).toBe('end');

    creator.update('12/7/30', '64'); // 0x64 hex === 100 decimal
    creator.update('12/7/31', '00');
    creator.update('12/7/32', '00');
    creator.update('12/7/33', '64'); // 0x64 hex === 100 decimal

    setTimeout(function () {
      expect(value).not.toBe(null);
      expect(value[0].textContent).toBe('100');
      expect(value[1].textContent).toBe('0');
      expect(bar[0].getBBox().width).toBeCloseTo(22, -1);
      expect(bar[0].getBBox().height).toBeCloseTo(22, -1);
      expect(bar[1].getBBox().width).toBeCloseTo(0, -1);
      expect(bar[1].getBBox().height).toBeCloseTo(10, -1);
      expect(bar[2].getBBox().width).toBeCloseTo(0, -1);
      expect(bar[2].getBBox().height).toBeCloseTo(10, -1);
      expect(bar[3].getBBox().width).toBeCloseTo(10, -1);
      expect(bar[3].getBBox().height).toBeCloseTo(10, -1);

      creator.update('12/7/30', '00');
      creator.update('12/7/31', '64'); // 0x64 hex === 100 decimal
      creator.update('12/7/32', '64'); // 0x64 hex === 100 decimal
      creator.update('12/7/33', '00');
    }, 500);

    setTimeout(function () {
      expect(value[0].textContent).toBe('0');
      expect(value[1].textContent).toBe('100');
      expect(bar[0].getBBox().width).toBeCloseTo(5, -1);
      expect(bar[0].getBBox().height).toBeCloseTo(5, -1);
      expect(bar[1].getBBox().width).toBeCloseTo(65, -1);
      expect(bar[1].getBBox().height).toBeCloseTo(65, -1);
      expect(bar[2].getBBox().width).toBeCloseTo(15, -1);
      expect(bar[2].getBBox().height).toBeCloseTo(5, -1);
      expect(bar[3].getBBox().width).toBeCloseTo(15, -1);
      expect(bar[3].getBBox().height).toBeCloseTo(15, -1);

      done();
    }, 1000);
  });

  it('should test 2 factor bboxgrow, debug mode and automated bar spacing of a roundbar widget', function(done) {
    var creator = this.createTestElement('roundbar', {
        debug:'true',
        bboxgrow:'100;300',
        overflowarrow:'false'
      }, null,
      ['12/7/30', '12/7/31', '12/7/32'],
      [
        {transform:'DPT:5.004'},
        {transform:'DPT:5.004'},
        {transform:'DPT:5.004'}
      ]
    );
    var actor = creator.getActor();
    var svg = actor.querySelector('svg');
    var bar = actor.querySelectorAll('path.indicator');

    expect(bar.length).toBe(3);
    expect(svg.childNodes.length).toBe(9);

    // check correctness of bboxgrow calculation
    expect(svg.viewBox.baseVal.x).toBe(-200);
    expect(svg.viewBox.baseVal.y).toBe(-400);
    expect(svg.viewBox.baseVal.width).toBe(400);
    expect(svg.viewBox.baseVal.height).toBe(800);

    // check debug mode
    expect(svg.childNodes[0].nodeName).toBe('rect');
    expect(svg.childNodes[0].x.baseVal.value).toBe(-100);
    expect(svg.childNodes[0].y.baseVal.value).toBe(-100);
    expect(svg.childNodes[0].width.baseVal.value).toBe(200);
    expect(svg.childNodes[0].height.baseVal.value).toBe(200);
    expect(svg.childNodes[1].nodeName).toBe('rect');
    expect(svg.childNodes[1].x.baseVal.value).toBe(-200);
    expect(svg.childNodes[1].y.baseVal.value).toBe(-400);
    expect(svg.childNodes[1].width.baseVal.value).toBe(400);
    expect(svg.childNodes[1].height.baseVal.value).toBe(800);
    expect(svg.childNodes[2].nodeName).toBe('circle');
    expect(svg.childNodes[2].cx.baseVal.value).toBe(0);
    expect(svg.childNodes[2].cy.baseVal.value).toBe(0);
    expect(svg.childNodes[2].r.baseVal.value).toBe(3);

    creator.update('12/7/30', '64'); // 0x64 hex === 100 decimal
    creator.update('12/7/31', '64');
    creator.update('12/7/32', '64');
    setTimeout(function () {
      expect(bar[0].getBBox().width).toBeCloseTo(120, -1);
      expect(bar[0].getBBox().height).toBeCloseTo(120, -1);
      expect(bar[1].getBBox().width).toBeCloseTo(160, -1);
      expect(bar[1].getBBox().height).toBeCloseTo(160, -1);
      expect(bar[2].getBBox().width).toBeCloseTo(200, -1);
      expect(bar[2].getBBox().height).toBeCloseTo(200, -1);

      done();
    }, 600);
  });

  it('should test 4 factor bboxgrow, markers and ranges', function() {
    var creator = this.createTestElement('roundbar', {
        bboxgrow:'100;200;300;400',
        axisradius:'0',
        majorposition:'min;50;max',
        majorradius:'150',
        majorwidth:'15',
        majorcolor:'red',
        minorradius:'45',
        minorwidth:'5',
        minorspacing:'10%',
        minorcolor:'green',
        ranges:'70...90,45,5,yellow;90,40,30,blue;90...100,45,20,red'
      },
      null, null, {transform:'DPT:5.004'}
    );
    var actor = creator.getActor();
    var svg = actor.querySelector('svg');
    var axis = actor.querySelectorAll('path.axis');
    var major = actor.querySelector('path.major');
    var minor = actor.querySelector('path.minor');
    var range = actor.querySelectorAll('path.range');

    expect(axis.length).toBe(0);
    expect(range.length).toBe(3);

    // check correctness of bboxgrow calculation
    expect(svg.viewBox.baseVal.x).toBeCloseTo(-217, -1);
    expect(svg.viewBox.baseVal.y).toBeCloseTo(-317, -1);
    expect(svg.viewBox.baseVal.width).toBeCloseTo(682, -1);
    expect(svg.viewBox.baseVal.height).toBeCloseTo(882, -1);

    // simple check for the markers
    expect(major.getBBox().width).toBeCloseTo(282, -1);
    expect(major.getBBox().height).toBeCloseTo(282, -1);
    expect(major.style.stroke).toBe('red');
    expect(major.style.fill).toBe('');
    expect(major.getAttribute('d').split('L').length).toBe(4); // check correct number of lines / the spacing attribute
    expect(minor.getBBox().width).toBeCloseTo(96, -1);
    expect(minor.getBBox().height).toBeCloseTo(96, -1);
    expect(minor.style.stroke).toBe('green');
    expect(minor.style.fill).toBe('');
    expect(minor.getAttribute('d').split('L').length).toBe(12); // check correct number of lines / the spacing attribute

    // simple check for the ranges
    expect(range[0].getBBox().width).toBeCloseTo(37.6, -1);
    expect(range[0].getBBox().height).toBeCloseTo(29.0, -1);
    expect(range[1].getBBox().width).toBeCloseTo(24.9, -1);
    expect(range[1].getBBox().height).toBeCloseTo(13.6, -1);
  });

  it('should test preset and robust bboxgrow', function() {
    var creator = this.createTestElement('roundbar', {
        bboxgrow:'100;200;300', // 3 elements is wrong on purpose - it should fall back to the first value
        preset: 'A'
      },
      null, null, {transform:'DPT:5.004'}
    );
    var actor = creator.getActor();
    var svg = actor.querySelector('svg');

    // check correctness of bboxgrow calculation
    expect(svg.viewBox.baseVal.x).toBe(-160);
    expect(svg.viewBox.baseVal.y).toBe(-160);
    expect(svg.viewBox.baseVal.width).toBeCloseTo(320, -1);
    expect(svg.viewBox.baseVal.height).toBeCloseTo(306, -1);
  });
});
