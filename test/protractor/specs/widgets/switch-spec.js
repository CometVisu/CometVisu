/**
 * switch-spec: Test cases for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

var cvMockup = require('../../pages/Mock');

describe('switch widget testing', function () {
  'use strict';
  var mockupConfig = [];
  var configParts = {
    start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
    end :   '</pages>'
  };

  beforeEach(function () {
    cvMockup.mockupConfig(mockupConfig.shift());
    cvMockup.to();
    cvMockup.at();
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page>'+
    '<switch>'+
    '<label>Test switch</label>'+
    '<address transform="DPT:1.001" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);

  // see: https://github.com/CometVisu/CometVisu/issues/287
  it('should trigger a simple switch', function() {

    // test for lithium flavour #ff0000
    var widget = element.all(by.css(".activePage .switch .actor")).first();
    
    widget.click();
    expect(widget.element(by.css(".value")).getText()).toEqual('0');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual(0);
    });
    widget.click();
    expect(widget.element(by.css(".value")).getText()).toEqual('1');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual(1);
    });

    // send update via backend
    cvMockup.sendUpdate("12/7/37", 0);
    expect(widget.element(by.css(".value")).getText()).toEqual('0');
  });
});