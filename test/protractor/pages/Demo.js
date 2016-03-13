/**
 * Create the Demo page test object
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var basePage = require("../pages/BasePage.js");

var CometVisuDemo = function () {
  'use strict';

  this.url = 'http://localhost:8000/?config=demo&forceReload=true&testMode=true';

  this.pageLoaded = this.and(
    this.isVisible($('#id_40_5_2'))
  );
};
CometVisuDemo.prototype = basePage;
module.exports = new CometVisuDemo();
