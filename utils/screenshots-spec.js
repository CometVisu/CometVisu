/**
 * Generate screenshots from widget examples
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
var fs = require('fs'),
  path = require('path'),
  easyimg = require('easyimage');
var CometVisuMockup = require('../source/test/protractor/pages/Mock');
var cvMockup = new CometVisuMockup(browser.target || 'source');
var CometVisuEditorMockup = require('../source/test/protractor/pages/EditorMock');
var editorMockup = new CometVisuEditorMockup(browser.target || 'source');

var errorHandler = function(err) {
  if (err) throw err;
};

var getCropArgs = function(options) {

    options.cropheight = options.cropheight || options.cropwidth;
    options.gravity = options.gravity || 'Center';
    options.x = options.x || 0;
    options.y = options.y || 0;

    var args = [options.src];

    args.push('-auto-orient');
    args.push('-gravity');
    args.push(options.gravity);
    args.push('-strip');
    args.push('-crop');
    args.push(options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y);
    if (options.quality) {
      args.push('-quality');
      args.push(options.quality)
    }
    if (options.background) {
      args.push('-background');
      args.push(options.background)
    }
    args.push(options.dst);
    return args;
};

var getResizeArgs = function(options) {

  options.height = options.height || options.width;

  var args = [options.src];

  if (options.flatten) {
    args.push('-flatten');
    if (options.background) {
      args.push('-background');
      args.push(options.background);
    }
  }
  else {
    if (options.background) {
      args.push('-background');
      args.push(options.background);
      args.push('-flatten');
    }
  }

  args.push('-auto-orient');
  args.push('-strip');
  args.push('-resize');
  args.push(options.width + 'x' + options.height);
  if (options.ignoreAspectRatio) {
    args[args.length-1] += '!';
  }
  if (options.quality) {
    args.push('-quality');
    args.push(options.quality);
  }
  if (options.background) {
    args.push('-background');
    args.push(options.background);
  }
  args.push(options.dst);
  return args;
};

var cropInFile = function(size, location, srcFile, width, height) {
  if (width && height) {
    var args = getCropArgs({
      src: srcFile,
      dst: srcFile,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    });
    args.unshift('convert');
    easyimg.exec(args.join(" ")).then(function(image) {
      var resizeArgs = getResizeArgs({
        src: srcFile,
        dst: srcFile,
        width: width,
        height: height
      });
      resizeArgs.unshift('convert');
      easyimg.exec(resizeArgs.join(" ")).then(function (img) { }, errorHandler);
    }, errorHandler);
  } else {
    var args = getCropArgs({
      src: srcFile,
      dst: srcFile,
      cropwidth: size.width,
      cropheight: size.height,
      x: location.x,
      y: location.y,
      gravity: 'North-West'
    });
    args.unshift('convert');
    easyimg.exec(args.join(" ")).then(function(img) { }, errorHandler);
  }
};

var createDir = function(dir) {
  if (dir.substring(dir.length-1) == "/") {
    dir = dir.substring(0,dir.length-1);
  }
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
  var whiteList = browser.screenshots ? browser.screenshots.split(",") : [];

  fs.readdirSync(examplesDir).forEach(function(fileName) {
    var subDir = path.join(examplesDir, fileName);
    if (browser.onlySubDir && browser.onlySubDir!=fileName) {
      return;
    }
    if (fs.statSync(subDir).isDirectory()) {
      fs.readdirSync(subDir).forEach(function(fileName) {
        if (whiteList.length > 0 && whiteList.indexOf(fileName) < 0) {
          // skip this one
          return;
        }
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
            if (settings.selector.includes(".activePage") || settings.selector.includes("#")) {
              selectorPrefix = "";
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
              }

              // wait for everything to be rendered
              browser.sleep(settings.sleep || 300);

              var widget = element(by.css(selectorPrefix+settings.selector));
              browser.wait(function() {
                return widget.isDisplayed();
              }, 1000).then(function() {
                console.log(">>> processing "+filePath+"...");
                settings.screenshots.forEach(function(setting) {
                  if (setting.data && Array.isArray(setting.data)) {
                    setting.data.forEach(function (data) {
                      var value = data.value;
                      if (data.type) {
                        switch(data.type) {
                          case "float":
                            value = parseFloat(value);
                            break;
                          case "int":
                            value = parseInt(value);
                            break;
                        }
                      }
                      cvMockup.sendUpdate(data.address, value);
                    });
                  }
                  if (setting.clickPath) {

                    var actor = element(by.css(setting.clickPath));
                    if (actor) {
                      actor.click();
                      var waitFor = setting.waitFor ? setting.waitFor : selectorPrefix+settings.selector;
                      widget = element(by.css(waitFor));
                      browser.wait(function() {
                        return widget.isDisplayed();
                      }, 1000);
                    }
                  }

                  widget.getSize().then(function (size) {
                    widget.getLocation().then(function (location) {
                      if (setting.sleep) {
                        browser.sleep(setting.sleep);
                      }
                      console.log("  - creating screenshot '"+setting.name+"'");
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
                            console.log("  -> OK");
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