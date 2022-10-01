/* demo-spec.js 
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
 * Test the demo config file from cometvisu
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var cvDemo = require('../pages/Demo');

describe('cometvisu demo config test:', function () {
  'use strict';

  beforeEach(function() {
    cvDemo.to();
    cvDemo.at();
  });

  it('should load the demo page', function () {
    expect(browser.getTitle()).toEqual('CometVisu Widget Demo - CometVisu');
    expect(cvDemo.getPages().count()).toEqual(39);
    expect(cvDemo.getPageTitle()).toEqual('CometVisu Widget Demo');
  });

  it('should navigate to a page', async function() {
    await cvDemo.disablePageAnimations();
    await cvDemo.goToPage('Format Test');
    browser.driver.sleep(200);
    expect(cvDemo.getPageTitle()).toEqual('Format Test');
  });

  it('should use a switch', function() {
    var widget = element.all(by.css('.activePage .switch .actor')).first();

    // get widget data from parent
    widget.element(by.xpath('parent::div/parent::div')).getAttribute('id').then(function(id) {
      cvDemo.getWidgetData(id).then(function(data) {
        var address;
        for (var addr in data.address) {
          address = addr;
          break;
        }

        browser.actions().click(widget).perform();

        expect(widget.element(by.css('.value')).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual('80');
        });

        browser.actions().click(widget).perform();

        expect(widget.element(by.css('.value')).getText()).toEqual('An');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual('81');
        });

        // send update via backend
        cvDemo.sendUpdate(address, 0).then(() => {
          expect(widget.element(by.css('.value')).getText()).toEqual('Aus');
        });
      });
    });
  });

  it('should use a trigger', function() {
    var widget = element.all(by.css('.activePage .trigger .actor')).first();

    // get widget data from parent
    widget.element(by.xpath('parent::div/parent::div')).getAttribute('id').then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        var sendValue = data.sendValue;

        widget.click();

        expect(widget.element(by.css('.value')).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual('8' + sendValue);
        });
        widget.click();

        expect(widget.element(by.css('.value')).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual('8' + sendValue);
        });
      });
    });
  });

  it('should use a pushbutton', function() {
    var widget = element.all(by.css('.activePage .pushbutton .actor')).first();

    // get widget data from parent
    widget.element(by.xpath('parent::div/parent::div')).getAttribute('id').then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        browser.actions().mouseDown(widget).perform();

        expect(widget.element(by.css('.value')).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual('8'+data.downValue);
        });

        browser.actions().mouseUp(widget).perform();

        expect(widget.element(by.css('.value')).getText()).toEqual('An');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual('8'+data.upValue);
        });
      });
    });
  });

  it('should use a slider', function() {
    var widget = element.all(by.css('.activePage .slide .actor')).first();

    // get widget data from parent
    widget.element(by.xpath('parent::div/parent::div')).getAttribute('id').then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        let address;
        let transform;
        for (var addr in data.address) {
          address = addr;
          transform = data.address[addr].transform;
          break;
        }

        // find the slider knob
        var knob = widget.element(by.css('.ui-slider-handle'));
        browser.actions().mouseMove(knob, {x: 10, y:10}).mouseDown().perform();

        cvDemo.getLastWrite().then(function (lastWrite1) {
          browser.actions().mouseMove(knob, {x: 30, y:10}).mouseUp().perform();
          browser.sleep(500);
          cvDemo.getLastWrite().then(async function (lastWrite2) {
            const firstWrittenValue = await cvDemo.decode({transform: transform}, lastWrite1.transformedValue);
            const secondWrittenValue = await cvDemo.decode({transform: transform}, lastWrite2.transformedValue);
            expect(secondWrittenValue).toBeGreaterThan(firstWrittenValue);
          });
        });
        var borderWidth = 1; // depending on design, but as the demo is in pure design, we use a hardcoded value here

        widget.getLocation().then(function(rangePosition) {
          widget.getSize().then(function(rangeSize) {
            // move the slider by updates from backend
            knob.getLocation().then(function (pos) {
              knob.getSize().then(async function(knobSize) {
                // slider min
                const minValue = await cvDemo.encode({transform: transform}, data.min || 0);
                const maxValue = await cvDemo.encode({transform: transform}, data.max || 100);
                await cvDemo.sendUpdate(address, minValue);
                // give the slider some time to reach its position
                browser.sleep(500);
                knob.getLocation().then(function (newPos) {
                  // check with some tolerance
                  expect(Math.abs(newPos.x-(rangePosition.x + borderWidth - Math.round(knobSize.width/2)))).toBeLessThan(25);
                  expect(newPos.y).toEqual(pos.y);
                });

                // slider max
                await cvDemo.sendUpdate(address, maxValue);
                // give the slider some time to reach its position
                browser.sleep(500);
                knob.getLocation().then(function (newPos) {
                  // check with some tolerance
                  expect(Math.abs(newPos.x-(rangePosition.x + rangeSize.width - knobSize.width - borderWidth))).toBeLessThan(25);
                  expect(newPos.y).toEqual(pos.y);
                });
              });
            });
          });
        });
      });
    });
  });
});
