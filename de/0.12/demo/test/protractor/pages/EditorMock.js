/**
 * Create mock config page test object, which can be used to load configs which are defined in the tests
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var basePage = require("../pages/BasePage.js");
var request = require('request');
var fs = require('fs');
var path = require('path');
var rootDir = path.join(__dirname, '..', '..', '..', '..');

var CometVisuEditorMockup = function (target) {
  'use strict';
  target = target || "source";

  this.url = 'http://localhost:8000/'+target+'/editor/editor.html?config=mockup&testMode=true';

  var mockupReady = false;

  this.mockupConfig = function(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock/'+target+'/resource/config/visu_config_mockup.xml',
      body: config
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        mockupReady = true;
      } else {
        console.log(error);
        console.log(response);
        console.log(body);
      }
    });
  };

  this.mockupFixture = function (fixture) {
    mockupReady = false;
    var sourceFile = path.join(rootDir, fixture.sourceFile);
    if (fs.existsSync(sourceFile)) {
      var content = fs.readFileSync(sourceFile);
      request({
        method: 'POST',
        uri: 'http://localhost:8000/mock/' + fixture.targetPath,
        body: content
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          mockupReady = true;
        } else {
          console.log(error);
          console.log(response);
          console.log(body);
        }
      });
    } else {
      console.error("fixture file", sourceFile, 'not found');
    }
  };

  this.pageLoaded = this.and(
    this.isVisible($('#config')), mockupReady
  );
};
CometVisuEditorMockup.prototype = basePage;
module.exports = CometVisuEditorMockup;
