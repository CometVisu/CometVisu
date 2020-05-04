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
    expect(cvDemo.getPages().count()).toEqual(37);
    expect(cvDemo.getPageTitle()).toEqual('CometVisu Widget Demo');
  });

  it('should navigate to a page', function() {
    cvDemo.goToPage("Format Test");
    browser.driver.sleep(500);
    expect(cvDemo.getPageTitle()).toEqual('Format Test');
  });

  it('should use a switch', function() {
    var widget = element.all(by.css(".activePage .switch .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function(data) {
        var address;
        for (var addr in data.address) {
          address = addr;
          break;
        }

        browser.actions().click(widget).perform();
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual("0");
        });

        browser.actions().click(widget).perform();
        expect(widget.element(by.css(".value")).getText()).toEqual('An');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual("1");
        });

        // send update via backend
        cvDemo.sendUpdate(address, 0);
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
      });
    });
  });

  it('should use a trigger', function() {
    var widget = element.all(by.css(".activePage .trigger .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        var sendValue = data.sendValue;

        widget.click();
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual(sendValue);
        });
        widget.click();
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual(sendValue);
        });
      });
    });
  });

  it('should use a pushbutton', function() {
    var widget = element.all(by.css(".activePage .pushbutton .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        var address;
        for (var addr in data.address) {
          address = addr;
          break;
        }

        browser.actions().mouseDown(widget).perform();

        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual(data.downValue);
        });

        browser.actions().mouseUp(widget).perform();
        expect(widget.element(by.css(".value")).getText()).toEqual('An');
        cvDemo.getLastWrite().then(function (lastWrite) {
          expect(lastWrite.value).toEqual(data.upValue);
        });
      });
    });
  });

  it('should use a slider', function() {
    var widget = element.all(by.css(".activePage .slide .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        var address;
        for (var addr in data.address) {
          address = addr;
          break;
        }

        // find the slider knob
        var knob = widget.element(by.css(".ui-slider-handle"));
        browser.actions().mouseMove(knob, {x: 10, y:10}).mouseDown().perform();
        cvDemo.getLastWrite().then(function (lastWrite1) {
          browser.actions().mouseMove(knob, {x: 30, y:10}).mouseUp().perform();
          browser.sleep(500);
          cvDemo.getLastWrite().then(function (lastWrite2) {
            expect(lastWrite2.value).toBeGreaterThan(lastWrite1.value);
          });
        });
        var borderWidth = 1; // depending from design, but as the demo is in pure design, we use a hardcoded value here

        widget.getLocation().then(function(rangePosition) {
          widget.getSize().then(function(rangeSize) {
            // move the slider by updates from backend
            knob.getLocation().then(function (pos) {
              knob.getSize().then(function(knobSize) {
                // slider min
                cvDemo.sendUpdate(address, data.min || 0);
                // give the slider some time to reach its position
                browser.sleep(1500);
                knob.getLocation().then(function (newPos) {
                  // check with some tolerance
                  expect(Math.abs(newPos.x-(rangePosition.x + borderWidth - Math.round(knobSize.width/2)))).toBeLessThan(25);
                  expect(newPos.y).toEqual(pos.y);
                });

                // slider max
                cvDemo.sendUpdate(address, data.max || 100);
                // give the slider some time to reach its position
                browser.sleep(1500);
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