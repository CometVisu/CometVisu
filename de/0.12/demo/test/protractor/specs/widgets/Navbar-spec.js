/**
 * navbar-spec: Test cases for switch widget
 *
 * @author Christian Mayer
 * @since 2020
 */

var CometVisuMockup = require('../../pages/Mock');
var cvMockup = new CometVisuMockup();

xdescribe('navbar widget testing', function () {
  'use strict';
  var mockupConfig = [];
  var configParts = {
    start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
    end :   '</pages>'
  };

  beforeEach(function () {
    var config = mockupConfig.shift();
    var configString = typeof config === 'string' ? config : config[0];
    var configURLModification = typeof config === 'string' ? undefined : '&' + config[1];
    cvMockup.mockupConfig(configString);
    cvMockup.to(configURLModification);
    cvMockup.at();
  });

  /**
   * @param direction
   */
  function doSwipe(direction) {
    var position = {
      'toLeft':  {start:{x:100, y:100}, end:{x:10, y:100}},
      'toRight': {start:{x:10, y:100}, end:{x:100, y:100}},
      'toUp':    {start:{x:10, y:100}, end:{x:10, y:10 }},
      'toDown':  {start:{x:10, y:10 }, end:{x:10, y:100}}
    };

    browser.driver.touchActions()
      .tapAndHold(position[direction].start)
      .move(position[direction].end)
      .release(position[direction].end)
      .perform();
    browser.driver.sleep(300);
  }

  /**
   * @param navbar
   * @param size
   */
  function expectVisible(navbar, size) {
    expect(navbar.getCssValue('width')).toEqual(size);
    expect(navbar.getCssValue('left')).toEqual('0px');
  }
  /**
   * @param navbar
   * @param size
   */
  function expectNotVisible(navbar, size) {
    expect(navbar.getCssValue('width')).toEqual(size);
    expect(navbar.getCssValue('left')).toEqual('-'+size);
  }

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page name="">'+
    '<navbar name="Navbar1" position="left" width="250px">'+
    '</navbar>'+
    '</page>'+configParts.end);

  it('should show a simple navbar: desktop', function() {
    var navbar = element.all(by.css('#navbarLeft')).first();

    expectVisible(navbar, '250px');

    // on a desktop system it should default to dynamic=false behaviour
    doSwipe('toLeft');
    expectVisible(navbar, '250px');
  });

  mockupConfig.push([
    configParts.start +
    '<meta/>'+
    '<page name="">'+
    '<navbar name="Navbar1" position="left" width="250px">'+
    '</navbar>'+
    '</page>'+configParts.end,
    'forceDevice=mobile'
  ]);

  it('should show a simple navbar: mobile', function() {
    var navbar = element.all(by.css('#navbarLeft')).first();

    expectNotVisible(navbar, '250px');

    // on a desktop system it should default to dynamic=true behaviour
    doSwipe('toRight');
    expectVisible(navbar, '250px');

    doSwipe('toLeft');
    expectNotVisible(navbar, '250px');
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page name="page1">'+
    '<navbar name="Navbar1" position="left" width="200px" dynamic="false">'+
    '</navbar>'+
    '<page name="page2">'+
    '<navbar name="Navbar2" position="left" width="300px" dynamic="false">'+
    '</navbar>'+
    '</page>'+
    '</page>'+configParts.end);

  it('should show a nested navbar with different widths', function() {
    var navbar = element.all(by.css('#navbarLeft')).first();

    expectVisible(navbar, '200px');

    cvMockup.goToPage('page2');
    expectVisible(navbar, '300px');
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
    var navbar = element.all(by.css('#navbarLeft')).first();

    // 1st check: it should be hidden
    expectNotVisible(navbar, '250px');

    // 2nd check: a vertical drag should do nothing
    doSwipe('toDown');
    expectNotVisible(navbar, '250px');

    // 3rd check: a drag to the right should show it
    doSwipe('toRight');
    expectVisible(navbar, '250px');

    // 4th check: a vertical drag should do nothing
    doSwipe('toDown');
    expectVisible(navbar, '250px');

    // final check: it should be hidden again
    doSwipe('toLeft');
    expectNotVisible(navbar, '250px');
  });

  var nestedPagesConfig = configParts.start +
    '<meta/>'+
    '<page name="page1">'+
    ' <navbar name="Navbar1" position="left" width="200px">'+
    ' </navbar>'+
    ' <page name="page2">'+
    '  <navbar name="Navbar2" position="left" width="250px" dynamic="false">'+
    '  </navbar>'+
    '  <page name="page3">'+
    '   <navbar name="Navbar3" position="left" width="300px" dynamic="true">'+
    '   </navbar>'+
    '   <page name="page4">'+
    '    <navbar name="Navbar4" position="left" width="350px">'+
    '    </navbar>'+
    '    <page name="page5">'+
    '     <navbar name="Navbar5" position="left" width="400px" dynamic="false">'+
    '     </navbar>'+
    '     <page name="page6">'+
    '      <navbar name="Navbar6" position="left" width="450px">'+
    '      </navbar>'+
    '      <page name="page7">'+
    '       <navbar name="Navbar7" position="left" width="500px" dynamic="true">'+
    '       </navbar>'+
    '      </page>'+
    '     </page>'+
    '    </page>'+
    '   </page>'+
    '  </page>'+
    ' </page>'+
    '</page>'+configParts.end;
  mockupConfig.push(nestedPagesConfig);

  it('should show all different behaviours of dynamic on a desktop browser', function() {
    var pageSwitchDelay = 500;
    var navbar = element.all(by.css('#navbarLeft')).first();

    //
    // part 1: going deeper, checking inheritance
    //

    // page1: dynamic not set
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectVisible(navbar, '200px');

    // page2: dynamic = false
    cvMockup.goToPage('page2', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page2');
    expectVisible(navbar, '250px');
    doSwipe('toLeft');
    expectVisible(navbar, '250px');

    // page3: dynamic = true
    cvMockup.goToPage('page3');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectVisible(navbar, '300px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '300px');
    doSwipe('toRight');
    expectVisible(navbar, '300px');

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');

    // page5: dynamic = false
    cvMockup.goToPage('page5');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    // page6: dynamic not set - inherit false
    cvMockup.goToPage('page6');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page6');
    expectVisible(navbar, '450px');
    doSwipe('toLeft');
    expectVisible(navbar, '450px');

    // page7: dynamic = true
    cvMockup.goToPage('page7');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page7');
    expectVisible(navbar, '500px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '500px');
    doSwipe('toRight');
    expectVisible(navbar, '500px');

    //
    // part 2: going up again, checking inheritance stays the same
    //

    // page6: dynamic not set - inherit false
    cvMockup.goToPage('page6');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page6');
    expectVisible(navbar, '450px');
    doSwipe('toLeft');
    expectVisible(navbar, '450px');

    // page5: dynamic = false
    cvMockup.goToPage('page5');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');

    // page3: dynamic = true
    cvMockup.goToPage('page3');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectVisible(navbar, '300px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '300px');
    doSwipe('toRight');
    expectVisible(navbar, '300px');

    // page2: dynamic = false
    cvMockup.goToPage('page2');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page2');
    expectVisible(navbar, '250px');
    doSwipe('toLeft');
    expectVisible(navbar, '250px');

    // page1: dynamic not set
    cvMockup.goToPage('page1');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page1');
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectVisible(navbar, '200px');

    //
    // part 3: going up again, checking automatic reset of visibility
    //

    cvMockup.goToPage('page2');
    browser.driver.sleep(pageSwitchDelay);
    // page3: dynamic = true
    cvMockup.goToPage('page3');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectVisible(navbar, '300px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '300px');
    // didn't reset to visible - but next page should be visible again

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');
    // didn't reset to visible - but next page should be visible again

    // page5: dynamic = false
    cvMockup.goToPage('page5');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    //
    // part 4: jumping down to check inheritance there
    //

    cvMockup.goToPage('page6');
    browser.driver.sleep(pageSwitchDelay);
    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');

    // page1: dynamic not set
    cvMockup.goToPage('page1');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page1');
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectVisible(navbar, '200px');
  });

  mockupConfig.push([
    nestedPagesConfig,
    'forceDevice=mobile'
  ]);

  it('should show all different behaviours of dynamic on a mobile browser', function() {
    var pageSwitchDelay = 500;
    var navbar = element.all(by.css('#navbarLeft')).first();

    //
    // part 1: going deeper, checking inheritance
    //

    // page1: dynamic not set
    expectNotVisible(navbar, '200px');
    doSwipe('toRight');
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '200px');

    // page2: dynamic = false
    cvMockup.goToPage('page2');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page2');
    expectVisible(navbar, '250px');
    doSwipe('toLeft');
    expectVisible(navbar, '250px');

    // page3: dynamic = true
    cvMockup.goToPage('page3', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectNotVisible(navbar, '300px');
    doSwipe('toRight');
    expectVisible(navbar, '300px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '300px');

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');

    // page5: dynamic = false
    cvMockup.goToPage('page5');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    // page6: dynamic not set - inherit false
    cvMockup.goToPage('page6', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page6');
    expectVisible(navbar, '450px');
    doSwipe('toLeft');
    expectVisible(navbar, '450px');

    // page7: dynamic = true
    cvMockup.goToPage('page7', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page7');
    expectNotVisible(navbar, '500px');
    doSwipe('toRight');
    expectVisible(navbar, '500px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '500px');

    //
    // part 2: going up again, checking inheritance stays the same
    //

    // page6: dynamic not set - inherit false
    cvMockup.goToPage('page6');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page6');
    expectVisible(navbar, '450px');
    doSwipe('toLeft');
    expectVisible(navbar, '450px');

    // page5: dynamic = false
    cvMockup.goToPage('page5', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');

    // page3: dynamic = true
    cvMockup.goToPage('page3');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectNotVisible(navbar, '300px');
    doSwipe('toRight');
    expectVisible(navbar, '300px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '300px');

    // page2: dynamic = false
    cvMockup.goToPage('page2');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page2');
    expectVisible(navbar, '250px');
    doSwipe('toLeft');
    expectVisible(navbar, '250px');

    // page1: dynamic not set
    cvMockup.goToPage('page1', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page1');
    expectNotVisible(navbar, '200px');
    doSwipe('toRight');
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '200px');

    //
    // part 3: going up again, checking automatic reset of visibility
    //

    cvMockup.goToPage('page2');
    browser.driver.sleep(pageSwitchDelay);
    // page3: dynamic = true
    cvMockup.goToPage('page3');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page3');
    expectNotVisible(navbar, '300px');
    doSwipe('toRight');
    expectVisible(navbar, '300px');
    // didn't reset to not visible - but next page should be not visible again

    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');
    // didn't reset to not visible - and next page should also be visible

    // page5: dynamic = false
    cvMockup.goToPage('page5', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page5');
    expectVisible(navbar, '400px');
    doSwipe('toLeft');
    expectVisible(navbar, '400px');

    //
    // part 4: jumping down to check inheritance there
    //

    cvMockup.goToPage('page6', true);
    browser.driver.sleep(pageSwitchDelay);
    // page4: dynamic not set - inherit true
    cvMockup.goToPage('page4', true);
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page4');
    expectNotVisible(navbar, '350px');
    doSwipe('toRight');
    expectVisible(navbar, '350px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '350px');

    // page1: dynamic not set
    cvMockup.goToPage('page1');
    browser.driver.sleep(pageSwitchDelay);

    expect(cvMockup.getPageTitle()).toEqual('page1');
    expectNotVisible(navbar, '200px');
    doSwipe('toRight');
    expectVisible(navbar, '200px');
    doSwipe('toLeft');
    expectNotVisible(navbar, '200px');
  });
});
