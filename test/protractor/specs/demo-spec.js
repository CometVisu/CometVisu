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

  it('should navigate to a page and back', function() {
    element(by.id("id_0"))
  });
});