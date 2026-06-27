/* metal-spec.js 
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
 * Test the metal design
 * @author Tobias Bräutigam
 * @since 2016
 */

var CometVisuMockup = require('../pages/Mock');
var cvMockup = new CometVisuMockup();

describe('cometvisu metal design config test:', function () {
  'use strict';

  var isChrome = browser.getCapabilities().then(function(s) {
    return /chrome/.test(s.get('browserName'));
  });

  var mockupConfig = [];
  var configParts = {
    start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
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
    '<group name="Ambientelicht" flavour="potassium">'+
    '<slide min="0" max="100" flavour="lithium">'+
    '<label>Helligkeit Rot</label>'+
    '<address transform="DPT:5.001" mode="readwrite">12/7/37</address>'+
    '</slide>'+
    '<slide min="0" max="100" flavour="boron">'+
    '<label>Helligkeit Grün</label>'+
    '<address transform="DPT:5.001" mode="readwrite">12/7/38</address>'+
    '</slide>'+
    '<slide min="0" max="100" flavour="antimony">'+
    '<label>Helligkeit Blau</label>'+
    '<address transform="DPT:5.001" mode="readwrite">12/7/39</address>'+
    '</slide>'+
    '</group></page>'+configParts.end);

  // see: https://github.com/CometVisu/CometVisu/issues/287
  it('should set slider flavours correct in a flavoured group', function() {
    // test for lithium flavour #ff0000
    var widget = element.all(by.css('.activePage .slide .actor .ui-slider-range')).first();

    expect(widget.getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)');

    // test for boron flavour #00ff11
    widget = element.all(by.css('.activePage .slide .actor .ui-slider-range')).get(1);

    expect(widget.getCssValue('background-color')).toBe('rgba(0, 255, 17, 1)');

    // test for antimony flavour #00ddff
    widget = element.all(by.css('.activePage .slide .actor .ui-slider-range')).get(2);

    expect(widget.getCssValue('background-color')).toBe('rgba(0, 221, 255, 1)');
  });

  if (!isChrome) {
    // widgetinfo in pagejumps
    mockupConfig.push(configParts.start +
      '<meta/>' +
      '<page name="Start"><navbar position="top">' +
      ' <pagejump target="Start">' +
      '   <layout colspan="0" />' +
      '   <label>Wohnen</label>' +
      '   <widgetinfo>' +
      '     <info format="%d">' +
      '       <layout colspan="0" />' +
      '       <address transform="DPT:9" mode="read" variant="">1/0/1</address>' +
      '     </info>' +
      '   </widgetinfo>' +
      ' </pagejump></navbar>' +
      '</page>' + configParts.end);

    it('should show the info value correctly styled in the pagejump', function () {
      // border radius 20px leads to computed radius of 11px in firefox (???)
      var widget = element(by.css('.navbar .pagejump .widgetinfo .info'));

      expect(widget.getCssValue('border-top-left-radius')).toBe('11px');
      expect(widget.getCssValue('border-top-right-radius')).toBe('11px');
      expect(widget.getCssValue('border-bottom-left-radius')).toBe('11px');
      expect(widget.getCssValue('border-bottom-right-radius')).toBe('11px');
      expect(widget.getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
      expect(widget.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');

      // send value to widget
      cvMockup.sendUpdate('1/0/1', 10.2).then(() => {
        expect(widget.element(by.css('.actor .value')).getText()).toBe('10');
      });
    });

    // infoaction widget
    mockupConfig.push(configParts.start +
      '<meta/>' +
      '<page name="Start">' +
      ' <infoaction>' +
      '   <layout colspan="3" />' +
      '   <label>Label</label>' +
      '   <widgetinfo>' +
      '     <info format="%d">' +
      '       <address transform="DPT:9" mode="read" variant="">1/0/1</address>' +
      '     </info>' +
      '   </widgetinfo>' +
      '   <widgetaction>' +
      '     <switch>' +
      '       <address transform="DPT:1.001">1/0/0</address>' +
      '     </switch>' +
      '   </widgetaction>' +
      ' </infoaction>' +
      '</page>' + configParts.end);

    it('should show the infoaction widget', function () {
      // border radius 20px leads to computed radius of 11px in firefox (???)
      var widget = element(by.css('.infoaction .widgetinfo .info'));

      expect(widget.getCssValue('border-top-left-radius')).toBe('0px');
      expect(widget.getCssValue('border-top-right-radius')).toBe('0px');
      expect(widget.getCssValue('border-bottom-left-radius')).toBe('30px');
      expect(widget.getCssValue('border-bottom-right-radius')).toBe('0px');
      expect(widget.getCssValue('background-color')).toBe('rgba(102, 102, 102, 1)');
      expect(widget.getCssValue('color')).toBe('rgba(153, 153, 153, 1)');

      // send value to widget
      cvMockup.sendUpdate('1/0/1', 10.2).then(() => {
        expect(widget.element(by.css('.actor .value')).getText()).toBe('10');
      });

      // click the action part
      var action = element(by.css('.infoaction .widgetaction .switch .actor'));
      action.click();

      expect(action.element(by.css('.value')).getText()).toEqual('0');
      cvMockup.getLastWrite().then(function (lastWrite) {
        expect(lastWrite.value).toEqual(0);
      });
    });

    // see: https://knx-user-forum.de/forum/supportforen/cometvisu/824414-vorstellung-infoaction-plugin?p=922987#post922987
    mockupConfig.push(configParts.start +
      '<meta/>' +
      '<page>' +
      ' <pagejump target="Netzwerk">' +
      '   <label><icon name="it_network"/></label>' +
      '   <widgetinfo>' +
      '     <info>' +
      '       <address transform="DPT:5.010">1/0/1</address>' +
      '     </info>' +
      '   </widgetinfo>' +
      ' </pagejump>' +
      '</page>' + configParts.end);

    it('should show a pagejump with widgetinfo inside a page, styled like the infoaction->widgetinfo part', function () {
      // border radius 20px leads to computed radius of 11px in firefox (???)
      var widget = element(by.css('.pagejump .widgetinfo .info'));

      expect(widget.getCssValue('border-top-left-radius')).toBe('0px');
      expect(widget.getCssValue('border-top-right-radius')).toBe('0px');
      expect(widget.getCssValue('border-bottom-left-radius')).toBe('30px');
      expect(widget.getCssValue('border-bottom-right-radius')).toBe('0px');
      expect(widget.getCssValue('background-color')).toBe('rgba(102, 102, 102, 1)');
      expect(widget.getCssValue('color')).toBe('rgba(153, 153, 153, 1)');

      // send value to widget
      cvMockup.sendUpdate('1/0/1', 10.2).then(() => {
        expect(widget.element(by.css('.actor .value')).getText()).toBe('10.2');
      });
    });
  }
});

