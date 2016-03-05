/**
 * Test the demo config file from cometvisu
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

var cvDemo = require('../pages/Demo');

describe('cometvisu demo config tests', function () {
  'use strict';

  beforeEach(function() {
    cvDemo.to();
    cvDemo.at();
  })

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
    widget.click();
    expect(widget.element(by.css(".value")).getText()).toEqual('Aus');
    widget.click();
    expect(widget.element(by.css(".value")).getText()).toEqual('An');
  });
});