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

var CometVisuMockup = function (target) {
  'use strict';
  target = target || "source";

  this.url = 'http://localhost:8000/'+target+'/index.html?config=mockup&testMode=true&enableCache=false';

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
    var targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      // adding target only to relative paths
      targetPath = '/' + target + '/' + targetPath;
    }
    if (fs.existsSync(sourceFile)) {
      var content = fs.readFileSync(sourceFile);
      request({
        method: 'POST',
        uri: 'http://localhost:8000/mock' + targetPath,
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

  this.resetMockupFixture = function (fixture) {
    var targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + target + '/' + targetPath;
    }
    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/mock' + targetPath,
    });
  };

  this.pageLoaded = this.and(
    this.isVisible($('#id_')), mockupReady
  );
};
CometVisuMockup.prototype = basePage;
module.exports = CometVisuMockup;
