// create the demo PageObject
var basePage = require("../pages/BasePage.js");

var CometVisuDemo = function () {
  'use strict';

  this.url = 'http://localhost/cometvisu/src/?config=demo&forceReload=true';
  this.rootPage = element(by.id("id_"));

  this.pageLoaded = this.and(
    this.isVisible($('#id_40_5_2'))
  );

  this.getPageTitle = function () {
    return this.rootPage.element(by.tagName("h1")).getText();
  };

  this.getPages = function () {
    return element.all(by.css(".page"));
  };
};
CometVisuDemo.prototype = basePage;
module.exports = new CometVisuDemo();
