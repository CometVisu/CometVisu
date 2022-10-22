/* Switch-spec.js 
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
 * switch-spec: Test cases for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

const CometVisuMockup = require('../../pages/Mock');
const cvMockup = new CometVisuMockup();

describe('switch widget testing', function () {
  'use strict';
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
    '<page visible="false">'+
    '<switch>'+
    '<label>Test switch</label>'+
    '<address transform="DPT:1.001" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);
  
  it('should trigger a simple switch', function() {
    // test for lithium flavour #ff0000
    var widget = element.all(by.css('.activePage .widget.switch')).first();
    var actor = widget.all(by.css('.actor')).first();

    actor.click();

    expect(actor.element(by.css('.value')).getText()).toEqual('0');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('80');
    });
    actor.click();

    expect(actor.element(by.css('.value')).getText()).toEqual('1');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('81');
    });

    // send update via backend
    cvMockup.sendUpdate('12/7/37', 0).then(() => {
      expect(actor.element(by.css('.value')).getText()).toEqual('0');
    });

    // test that clicking on widgets does nothing
    // we have to move the mouse somewhere where the actor is not, before clicking it
    browser.actions().mouseMove(widget, {x: 2, y: 10}).click().perform();

    expect(actor.element(by.css('.value')).getText()).toEqual('0');
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page visible="false">'+
    '<switch bind_click_to_widget="true">'+
    '<label>Test switch</label>'+
    '<address transform="DPT:1.001" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);

  it('should trigger a switch with bind_click_to_widget = true', function() {
    // test for lithium flavour #ff0000
    var widget = element.all(by.css('.activePage .switch')).first();
    var actor = element.all(by.css('.activePage .switch .actor')).first();

    // we have to move the mouse somewhere where the actor is not, before clicking it
    browser.actions().mouseMove(widget, {x: 2, y: 10}).click().perform();

    expect(actor.element(by.css('.value')).getText()).toEqual('0');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('80');
    });

    // we have to move the mouse somewhere where the actor is not, before clicking it
    browser.actions().mouseMove(widget, {x: 2, y: 10}).click().perform();

    expect(actor.element(by.css('.value')).getText()).toEqual('1');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('81');
    });

    // send update via backend
    cvMockup.sendUpdate('12/7/37', 0).then(() => {
      expect(actor.element(by.css('.value')).getText()).toEqual('0');
      // test that clicking on actor also works
      actor.click();

      expect(actor.element(by.css('.value')).getText()).toEqual('1');
    });
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page visible="false">'+
    '<switch on_value="turn_on" off_value="turn_off">'+
    '<label>Test switch</label>'+
    '<address transform="raw" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);

  it('should trigger a switch with specified on / off values', function() {
    // test for lithium flavour #ff0000
    var widget = element.all(by.css('.activePage .switch .actor')).first();

    widget.click();

    expect(widget.element(by.css('.value')).getText()).toEqual('turn_off');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('turn_off');
    });
    widget.click();

    expect(widget.element(by.css('.value')).getText()).toEqual('turn_on');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('turn_on');
    });

    // send update via backend
    cvMockup.sendUpdate('12/7/37', 'turn_off').then(() => {
      expect(widget.element(by.css('.value')).getText()).toEqual('turn_off');
    });
  });

  mockupConfig.push(configParts.start +
    '<meta>'+
    ' <mappings>'+
    '  <mapping name="test">'+
    '   <entry value="0">Off</entry>'+
    '   <entry value="1">On</entry>'+
    '  </mapping>'+
    ' </mappings>'+
    ' <stylings>'+
    '  <styling name="Red_Green">'+
    '   <entry value="0">red</entry>'+
    '   <entry value="1">green</entry>'+
    '  </styling>'+
    ' </stylings>'+
    '</meta>'+
    '<page visible="false">'+
    '<switch mapping="test" styling="Red_Green">'+
    '<label>Test switch</label>'+
    '<address transform="DPT:1.001" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);

  it('should test the mapping and styling on switches', function() {
    // test for lithium flavour #ff0000
    var actor = element.all(by.css('.activePage .switch .actor')).first();

    actor.click();

    expect(actor.element(by.css('.value')).getText()).toEqual('Off');
    expect(actor.getAttribute('class')).toMatch('red');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('80');
    });

    actor.click();

    expect(actor.element(by.css('.value')).getText()).toEqual('On');
    expect(actor.getAttribute('class')).toMatch('green');
    cvMockup.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual('81');
    });

    // send update via backend
    cvMockup.sendUpdate('12/7/37', '0').then(() => {
      expect(actor.element(by.css('.value')).getText()).toEqual('Off');
      expect(actor.getAttribute('class')).toMatch('red');
    });
  });

  mockupConfig.push(configParts.start +
    '<meta/>'+
    '<page visible="false">'+
    '<switch align="center" flavour="potassium">'+
    '<label>Test switch</label>'+
    '<address transform="DPT:1.001" mode="readwrite">12/7/37</address>'+
    '</switch>'+
    '</page>'+configParts.end);

  it('should test align and flavour settings are used', function() {
    var widget = element.all(by.css('.activePage .switch')).first();

    expect(widget.getAttribute('class')).toMatch('flavour_potassium');
    expect(widget.getAttribute('class')).toMatch('center');
  });
});
