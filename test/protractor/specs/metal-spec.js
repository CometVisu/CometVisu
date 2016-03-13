/**
 * Test the metal design
 * @author Tobias Bräutigam
 * @since 2016
 */

var cvMockup = require('../pages/Mock');
var mockupConfig;

describe('cometvisu metal design config test:', function () {
  'use strict';

  beforeEach(function () {
    cvMockup.mockupConfig(mockupConfig);
    cvMockup.to();
    cvMockup.at();
  });

  mockupConfig = '' +
    '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd">'+
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
    '</group></page></pages>';

  // see: https://github.com/CometVisu/CometVisu/issues/287
  it('should set slider flavours correct in a flavoured group', function() {

    // test for lithium flavour #ff0000
    var widget = element.all(by.css(".activePage .slide .actor .ui-slider-range")).get(0);
    expect(widget.getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)');

    // test for boron flavour #00ff11
    widget = element.all(by.css(".activePage .slide .actor .ui-slider-range")).get(1);
    expect(widget.getCssValue('background-color')).toBe('rgba(0, 255, 17, 1)');

    // test for antimony flavour #00ddff
    widget = element.all(by.css(".activePage .slide .actor .ui-slider-range")).get(2);
    expect(widget.getCssValue('background-color')).toBe('rgba(0, 221, 255, 1)');
  });
});

