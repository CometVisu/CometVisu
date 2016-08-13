/**
 * Generate screenshots from widget examples
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var fs = require('fs'),
  path = require('path'),
  easyimg = require('easyimage');
var cvMockup = require('../test/protractor/pages/Mock');

var cropInFile = function(size, location, srcFile) {
  easyimg.crop({
      src: srcFile,
      dst: srcFile,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    },
    function(err) {
      if (err) throw err;
    });
};

describe('generation screenshots from jsdoc examples', function () {
  'use strict';
  var mockupConfig = [];

  beforeEach(function () {
    cvMockup.mockupConfig(mockupConfig.shift());
    cvMockup.to();
    cvMockup.at();
  });

  var examplesDir = path.join("cache", "widget_examples");
  var screenshotsDir = path.join("doc", "static");
  try {
    fs.statSync(screenshotsDir);
  } catch(e) {
    fs.mkdirSync(screenshotsDir, "0744");
  }

  fs.readdirSync(examplesDir).forEach(function(fileName) {
    var filePath = path.join(examplesDir, fileName);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      var example = fs.readFileSync(filePath, "utf-8").split("\n");
      if (example[0].substr(0,1) == "{") {
        var settings = JSON.parse(example.shift());

        mockupConfig.push(example.join("\n"));
        it('should create a screenshot', function () {
          var widget = element.all(by.css(".activePage "+settings.selector)).first();
          settings.screenshots.forEach(function(setting) {
            for (var ga in setting.data) {
              cvMockup.sendUpdate(ga, setting.data[ga]);
            }
            widget.getSize().then(function (size) {
              widget.getLocation().then(function (location) {
                browser.takeScreenshot().then(function (data) {
                  var base64Data = data.replace(/^data:image\/png;base64,/, "");
                  var imgFile = path.join(screenshotsDir, setting.name + ".png");
                  fs.writeFile(imgFile, base64Data, 'base64', function (err) {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      cropInFile(size, location, imgFile);
                    }
                  });
                });
              });
            });
          });
        });
      }
    }
  });
});