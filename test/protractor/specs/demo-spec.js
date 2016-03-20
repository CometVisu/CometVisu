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
    expect(browser.getTitle()).toEqual('CometVisu-Client');
    expect(cvDemo.getPages().count()).toEqual(36);
    expect(cvDemo.getPageTitle()).toEqual('CometVisu Widget Demo');
  });

  it('should navigate to a page', function() {
    cvDemo.goToPage("Format Test");
    expect(cvDemo.getPageTitle()).toEqual('Format Test');
  });

  it('should click a switch', function() {
    var widget = element.all(by.css(".activePage .switch .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function(data) {
        var address;
        for (var addr in data.address) {
          address = addr;
          break;
        }

        widget.click();
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual(0);
        });
        widget.click();
        expect(widget.element(by.css(".value")).getText()).toEqual('An');
        cvDemo.getLastWrite().then(function(lastWrite) {
          expect(lastWrite.value).toEqual(1);
        });

        // send update via backend
        cvDemo.sendUpdate(address, 0);
        expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
      });
    });
  });
});