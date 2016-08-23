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
var editorMockup = require('../test/protractor/pages/EditorMock');

var cropInFile = function(size, location, srcFile, width, height) {
  if (width && height) {
    easyimg.crop({
      src: srcFile,
      dst: srcFile,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    }).then(function(image) {
        easyimg.resize({
          src: srcFile,
          dst: srcFile,
          width: width,
          height: height
        }).then(
          function(image) { },
          function (err) {
            if (err) throw err;
          });
      },
      function (err) {
        if (err) throw err;
      });
  } else {
    easyimg.crop({
        src: srcFile,
        dst: srcFile,
        cropwidth: size.width,
        cropheight: size.height,
        x: location.x,
        y: location.y,
        gravity: 'North-West'
      },
      function (err) {
        if (err) throw err;
      });
  }
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
    var mockedConfigData = mockupConfig.shift();
    if (mockedConfigData.mode == "cv") {
      cvMockup.mockupConfig(mockedConfigData.data);
      cvMockup.to();
      cvMockup.at();
    } else {
      editorMockup.mockupConfig(mockedConfigData.data);
      editorMockup.to();
      editorMockup.at();
    }
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

            var selectorPrefix = ".activePage ";
            var mockedConfigData = {
              mode: "cv",
              data: example.join("\n")
            };

            if (settings.editor) {
              selectorPrefix = "";
              mockedConfigData.mode = "editor";
            }
            mockupConfig.push(mockedConfigData);

            it('should create a screenshot', function () {
              if (settings.editor) {
                if (settings.complex) {
                  var complexButton = element(by.css(".button.expert"));
                  browser.wait(function() {
                    return complexButton.isDisplayed();
                  }, 1000);
                  complexButton.click();
                }
                // expand pages
                var pagesExpand = element(by.css(".treeType_pages > .tree > .children"));
                var pageExpand = element(by.css(".treeType_page > .tree > .children"));
                var widgetButton = element(by.css(".name.nodeType_"+settings.widget));
                var widgetExpand = element(by.css(".treeType_"+settings.widget+" > .tree > .children"));

                browser.wait(function() {
                  return pagesExpand.isDisplayed();
                }, 1000);
                pagesExpand.click();

                browser.wait(function() {
                  return pageExpand.isDisplayed();
                }, 1000);
                pageExpand.click();

                browser.wait(function() {
                  return widgetExpand.isDisplayed();
                }, 1000);
                widgetExpand.click();

                browser.wait(function() {
                  return widgetButton.isDisplayed();
                }, 1000);
                widgetButton.click();

                // wait for everything to be rendered
                browser.sleep(300);
              }

              var widget = element(by.css(selectorPrefix+settings.selector));
              browser.wait(function() {
                return widget.isDisplayed();
              }, 1000).then(function() {
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

                            if (settings.scale) {
                              var scale = parseInt(settings.scale);
                              var scaledWidth = Math.round(size.width * scale/100);
                              var scaledHeight = Math.round(size.height * scale/100);
                              cropInFile(size, location, imgFile, scaledWidth, scaledHeight);
                            } else {
                              cropInFile(size, location, imgFile);
                            }
                          }
                        });
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