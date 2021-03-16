/**
 * Generate screenshots from widget examples
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
const fs = require('fs'),
  path = require('path'),
  easyimg = require('easyimage');
const CometVisuMockup = require('../source/test/protractor/pages/Mock');
const cvMockup = new CometVisuMockup(browser.target || 'source');
const CometVisuEditorMockup = require('../source/test/protractor/pages/EditorMock');
const editorMockup = new CometVisuEditorMockup(browser.target || 'source');
let devicePixelRatio = 1;
browser.executeAsyncScript(function (callback) { callback(window.devicePixelRatio); }).then(function(value) {
   devicePixelRatio = value;
})
const errorHandler = function(err) {
  if (err) {
    throw err;
  }
};

const cropInFile = function(size, location, srcFile, width, height) {
  var args = {
    src: srcFile,
    dst: srcFile,
    cropwidth: size.width * devicePixelRatio,
    cropheight: size.height * devicePixelRatio,
    x: location.x * devicePixelRatio,
    y: location.y * devicePixelRatio,
    gravity: 'North-West'
  };
  easyimg.crop(args).then(function() {
    if (width && height) {
      // scale image to the requested size
      args = {
        src: srcFile,
        dst: srcFile,
        width: width,
        height: height
      };
      easyimg.resize(args).then(function () { }, errorHandler);
    }
  }, errorHandler);
};

const createDir = function(dir) {
  if (dir.substring(dir.length-1) === "/") {
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
      fs.mkdirSync(newDir, "0755");
    });
  }
};

describe('generation screenshots from jsdoc examples', function () {
  'use strict';
  let mockupConfig = [];
  let mockedFixtures = [];
  let mockup = null;

  beforeEach(function () {
    var mockedConfigData = mockupConfig.shift();
    mockup = (mockedConfigData.mode === "cv") ? cvMockup : editorMockup;
    if (mockedConfigData.hasOwnProperty('fixtures')) {
      mockedFixtures = mockedConfigData.fixtures;
      mockedConfigData.fixtures.forEach(fix => mockup.mockupFixture(fix));
    } else {
      mockedFixtures = [];
    }
    mockup.mockupConfig(mockedConfigData.data);
    mockup.to();
    mockup.at();
  });

  afterEach(function () {
    mockedFixtures.forEach(fix => mockup.resetMockupFixture(fix));
    browser.manage().logs().get('browser').then(function(browserLogs) {
      // browserLogs is an array of objects with level and message fields
      browserLogs.forEach(function(log){
        console.log('>> ', log.message);
      });
    });
  });

  let examplesDir = path.join("cache", "widget_examples");
  let whiteList = browser.screenshots ? browser.screenshots.split(",") : [];

  fs.readdirSync(examplesDir).forEach(function(fileName) {
    var subDir = path.join(examplesDir, fileName);
    if (browser.onlySubDir && browser.onlySubDir !== fileName) {
      return;
    }
    if (fs.statSync(subDir).isDirectory()) {
      fs.readdirSync(subDir).forEach(async function(fileName) {
        if (whiteList.length > 0 && whiteList.indexOf(fileName) < 0) {
          // skip this one
          return;
        }
        let filePath = path.join(subDir, fileName);
        let stat = fs.statSync(filePath);
        if (stat.isFile()) {
          let example = fs.readFileSync(filePath, "utf-8").split("\n");
          if (example[0].substr(0,1) === "{") {
            let settings = JSON.parse(example.shift());
            createDir(settings.screenshotDir);

            let selectorPrefix = ".activePage ";
            let mockedConfigData = {
              mode: "cv",
              data: example.join("\n"),
              fixtures: settings.fixtures
            };

            if (settings.editor) {
              selectorPrefix = "";
              mockedConfigData.mode = "editor";
            }
            if (settings.selector.includes(".activePage") || settings.selector.includes("#")) {
              selectorPrefix = "";
            }
            mockupConfig.push(mockedConfigData);

            it('should create a screenshot', async function () {
              console.log(">>> processing " + filePath + "...");
              let widget;
              if (settings.editor) {
                widget = element(by.css('#manager'));
                await browser.wait(function () {
                  return widget.isDisplayed();
                }, 2000);

                await editorMockup.editConfig('mockup');
                widget = element(by.css('div[qxclass="qx.ui.tree.VirtualTree"] div[qxclass="cv.ui.manager.tree.VirtualElementItem"]'));
                await browser.wait(function () {
                  return widget.isDisplayed();
                }, 2000);

                if (settings.complex) {
                  await editorMockup.enableExpertMode();
                  console.log("expert mode enabled");
                }
                await editorMockup.openWidgetElement(settings.widget, settings.editor === "attributes");
              }

              // wait for everything to be rendered
              browser.sleep(settings.sleep || 1000);
              widget = element(by.css(selectorPrefix + settings.selector));
              await browser.wait(function () {
                return widget.isDisplayed();
              }, 2000)

              settings.screenshots.forEach(function (setting) {
                if (setting.data && Array.isArray(setting.data)) {
                  setting.data.forEach(function (data) {
                    var value = data.value;
                    if (data.type) {
                      switch (data.type) {
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
                    var waitFor = setting.waitFor ? setting.waitFor : selectorPrefix + settings.selector;
                    widget = element(by.css(waitFor));
                    browser.wait(function () {
                      return widget.isDisplayed();
                    }, 1000);
                  }
                }

                widget.getSize().then(function (size) {
                  widget.getLocation().then(function (location) {
                    if (setting.sleep) {
                      browser.sleep(setting.sleep);
                    }
                    console.log("  - creating screenshot '" + setting.name + "'");
                    browser.takeScreenshot().then(function (data) {
                      var base64Data = data.replace(/^data:image\/png;base64,/, "");
                      var imgFile = path.join(settings.screenshotDir, setting.name + ".png");
                      fs.writeFile(imgFile, base64Data, 'base64', function (err) {
                        if (err) {
                          console.log(err);
                        } else {

                          if (settings.scale) {
                            var scale = parseInt(settings.scale);
                            var scaledWidth = Math.round(size.width * scale / 100);
                            var scaledHeight = Math.round(size.height * scale / 100);
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
          }
        }
      });
    }
  });
});