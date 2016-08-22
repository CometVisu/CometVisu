/**
 * Create mock config page test object, which can be used to load configs which are defined in the tests
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var basePage = require("../pages/BasePage.js");
var request = require('request');

var CometVisuEditorMockup = function () {
  'use strict';

  this.url = 'http://localhost:8000/editor/editor.html?config=mockup&testMode=true';

  this.mockupReady = false;

  this.mockupConfig = function(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock/config/visu_config_mockup.xml',
      body: config
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        this.mockupReady = true;
      } else {
        console.log(error);
        console.log(response);
        console.log(body);
      }
    });
  };

  this.pageLoaded = this.and(
    this.isVisible($('#config')), this.mockupReady
  );
};
CometVisuEditorMockup.prototype = basePage;
module.exports = new CometVisuEditorMockup();
