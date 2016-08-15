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

var createDir = function(dir) {
  try {
    fs.statSync(dir);
  } catch(e) {
    var create = [dir];
    var parts = dir.split(path.sep);
    parts.pop();
    var parentDir = parts.join(path.sep);
    var exists = false;
    while(!exists && parentDir) {
      try {
        fs.statSync(parentDir);
        exists = true;
      } catch(e) {
        create.unshift(parentDir);
        parts = parentDir.split(path.sep);
        parts.pop();
        parentDir = parts.join(path.sep);
      }
    }
    create.forEach(function(newDir) {
      fs.mkdirSync(newDir, "0744");
    });
  }
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

  fs.readdirSync(examplesDir).forEach(function(fileName) {
    var subDir = path.join(examplesDir, fileName);
    if (browser.onlySubDir && browser.onlySubDir!=fileName) {
      return;
    }
    if (fs.statSync(subDir).isDirectory()) {
      fs.readdirSync(subDir).forEach(function(fileName) {
        var filePath = path.join(subDir, fileName);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
          var example = fs.readFileSync(filePath, "utf-8").split("\n");
          if (example[0].substr(0,1) == "{") {
            var settings = JSON.parse(example.shift());
            createDir(settings.screenshotDir);

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
                      var imgFile = path.join(settings.screenshotDir, setting.name + ".png");
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
    }
  });
});