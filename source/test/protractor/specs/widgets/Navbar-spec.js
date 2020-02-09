/**
 * switch-spec: Test cases for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

var CometVisuMockup = require('../../pages/Mock');
var cvMockup = new CometVisuMockup();

describe('navbar widget testing', function () {
  'use strict';
  var mockupConfig = [];
  var configParts = {
    start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
    end :   '</pages>'
  };

  beforeEach(function () {
    var config = mockupConfig.shift();
    var configString = typeof config === 'string' ? config : config[0];
    var configURLModification =  typeof config === 'string' ? undefined : '&' + config[1];
    cvMockup.mockupConfig(configString);
    cvMockup.to(configURLModification);
    cvMockup.at();
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page name="">'+
    '<navbar name="Navbar1" position="left" width="250px" dynamic="false">'+
    '</navbar>'+
    '</page>'+configParts.end);
  
  it('should show a simple navbar', function() {
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('0px');
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page name="page1">'+
    '<navbar name="Navbar1" position="left" width="200px" dynamic="false">'+
    '</navbar>'+
    '<page name="page2">'+
    '<navbar name="Navbar2" position="left" width="300px" dynamic="false">'+
    '</navbar>'+
    '<text>text2</text>'+
    '</page>'+
    '<text>text1</text>'+
    '</page>'+configParts.end);

  it('should show a nested navbar with different widths', function() {
    var navbar = element.all(by.css('#navbarLeft')).first();

    expect(navbar.getCssValue('width')).toEqual('200px');

    cvMockup.goToPage('page2');
    expect(navbar.getCssValue('width')).toEqual('300px');
  });

  mockupConfig.push([
    configParts.start +
    '<meta/>'+
    '<page name="">'+
    '<navbar name="Navbar1" position="left" width="250px" dynamic="true">'+
    '</navbar>'+
    '</page>'+configParts.end,
    'forceDevice=mobile'
  ]);

  it('should show a dynamic navbar on mobile devices', function() {
    // 1st check: it should be hidden
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('-250px');

    // 2nd check: a vertical drag should do nothing
    browser.driver.touchActions()
    .tapAndHold({x:10,y:10})
    .move({x:10,y:100})
    .release({x:10,y:100})
    .perform();
    browser.driver.sleep(300);
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('-250px');

    // 3rd check: a drag to the right should show it
    browser.driver.touchActions()
    .tapAndHold({x:10,y:100})
    .move({x:100,y:100})
    .release({x:100,y:100})
    .perform();
    browser.driver.sleep(300);
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('0px');

    // 4th check: a vertical drag should do nothing
    browser.driver.touchActions()
      .tapAndHold({x:10,y:10})
      .move({x:10,y:100})
      .release({x:10,y:100})
      .perform();
    browser.driver.sleep(300);
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('0px');

    // final check: it should be hidden again
    browser.driver.touchActions()
    .tapAndHold({x:1000,y:100})
    .move({x:10,y:100})
    .release({x:10,y:100})
    .perform();
    browser.driver.sleep(300);
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('width')).toEqual('250px');
    expect(element.all(by.css('#navbarLeft')).first().getCssValue('left')).toEqual('-250px');
  });
});