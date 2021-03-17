/**
 * Create mock config page test object, which can be used to load configs which are defined in the tests
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
const BasePage = require("../pages/BasePage.js");
const request = require('request');
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..', '..', '..');

class CometVisuMockup extends BasePage {

  constructor(target) {
    super();
    this.target = target || "source";
    this.url = 'http://localhost:8000/' + this.target + '/index.html?config=mockup&testMode=true&enableCache=false';
    this.mockupReady = false;

    this.pageLoaded = this.and(
      this.isVisible($('#id_')), this.mockupReady
    );
  }

  mockupConfig(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock/'+this.target+'/resource/config/visu_config_mockup.xml',
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
  }

  mockupFixture(fixture) {
    this.mockupReady = false;
    let sourceFile = path.join(rootDir, fixture.sourceFile);
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      // adding target only to relative paths
      targetPath = '/' + this.target + '/' + targetPath;
    }
    if (fs.existsSync(sourceFile)) {
      let content = fs.readFileSync(sourceFile);
      request({
        method: 'POST',
        uri: 'http://localhost:8000/mock' + targetPath,
        body: content
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          this.mockupReady = true;
        } else {
          console.log(error);
          console.log(response);
          console.log(body);
        }
      });
    } else {
      console.error("fixture file", sourceFile, 'not found');
    }
  }

  resetMockupFixture(fixture) {
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + this.target + '/' + targetPath;
    }
    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/mock' + targetPath,
    });
  }
}

module.exports = CometVisuMockup;
