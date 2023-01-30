/**
 * Generate screenshots from widget examples
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
const fs = require('fs');
const path = require('path');
const easyimg = require('easyimage');
const CometVisuMockup = require('../source/test/protractor/pages/Mock');
const cvMockup = new CometVisuMockup(browser.target || 'source');
const CometVisuEditorMockup = require('../source/test/protractor/pages/EditorMock');
const CometVisuDemo = require('../source/test/protractor/pages/Demo');
const editorMockup = new CometVisuEditorMockup(browser.target || 'source');

let devicePixelRatio = 1;
const stats = {
  total: 0,
  success: 0,
  error: 0,
  skipped: 0
};
const shotIndexFiles = [];
const defaultWidth = 1300; // from protractor conf
const defaultHeight = 800; // from protractor conf

browser.executeAsyncScript(function (callback) {
  callback(window.devicePixelRatio);
}).then(function(value) {
  devicePixelRatio = value;
});

const errorHandler = function(err) {
  if (err) {
    console.error(err.toString());
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
      return easyimg.resize(args);
    }
    return null;
  }).catch(errorHandler);
};

const changeBrowserSize = function (width, height) {
  browser.driver.manage().window().setSize(width, height || defaultHeight);
};

const createDir = function(dir) {
  if (dir.substring(dir.length-1) === '/') {
    dir = dir.substring(0, dir.length-1);
  }
  try {
    fs.statSync(dir);
  } catch (e) {
    var create = [dir];
    var parts = dir.split(path.sep);
    parts.pop();
    var parentDir = parts.join(path.sep);
    var exists = false;
    while (!exists && parentDir) {
      try {
        fs.statSync(parentDir);
        exists = true;
      } catch (e) {
        create.unshift(parentDir);
        parts = parentDir.split(path.sep);
        parts.pop();
        parentDir = parts.join(path.sep);
      }
    }
    create.forEach(function(newDir) {
      fs.mkdirSync(newDir, '0755');
    });
  }
};

const hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}
describe('generation screenshots from jsdoc examples', function () {
  'use strict';
  let mockupConfig = [];
  let mockedFixtures = [];
  let mockup = null;
  let results = [];
  let runResult = {};
  let shotIndex = {};

  let examplesDir = browser.source ? browser.source : path.join('cache', 'widget_examples');
  let subDirsMode = !browser.source;
  let whiteList = browser.screenshots ? browser.screenshots.split(',') : [];

  beforeEach(function () {
    const mockedConfigData = mockupConfig.shift();
    if (mockedConfigData.mode === 'real') {
      mockup = new CometVisuDemo(mockedConfigData.data, mockedConfigData.pageLoaded);
    } else {
      mockup = (mockedConfigData.mode === 'cv') ? cvMockup : editorMockup;
      mockup.mockupConfig(mockedConfigData.data);
    }
    if (mockedConfigData.hasOwnProperty('fixtures')) {
      mockedFixtures = mockedConfigData.fixtures;
      if (browser.verbose) {
        console.log('\n');
        mockedConfigData.fixtures.forEach(fix => console.log('Provide fix: use "' + fix.sourceFile + '" for URI "' + fix.targetPath + '" with MIME', fix.mimeType));
      }
      mockedConfigData.fixtures.forEach(fix => mockup.mockupFixture(fix));
    } else {
      mockedFixtures = [];
    }
    mockup.to();
    mockup.at();
    runResult = {};
    browser.executeAsyncScript(function (callback) {
      if (typeof window._receive !== 'function') {
        cv.io.BackendConnections.initBackendClient();
      }
      callback();
    });
  });

  afterEach(function () {
    let showLog = browser.verbose || false;
    mockedFixtures.forEach(fix => mockup.resetMockupFixture(fix));
    if (runResult) {
      if (runResult.failed || runResult.success !== true) {
        runResult.failed = true;
        runResult.browserErrors = [];
        showLog = true;
      } else if (runResult.success) {
        // save shotIndex
        if (runResult.shotIndexFiles) {
          for (let i = 0; i < runResult.shotIndexFiles.length; i++) {
            const [file, dir] = runResult.shotIndexFiles[i];
            fs.writeFileSync(file, JSON.stringify(shotIndex[dir], null, 4), function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        }

      } else if (runResult.skipped) {
        return;
      }
      if (showLog) {
        browser.manage().logs().get('browser').then(function (browserLogs) {
          console.log(runResult.failed ? '\x1b[31mFailed run\x1b[0m log message:' : '\x1b[32mSuccessful run\x1b[0m log message:');
          // browserLogs is an array of objects with level and message fields
          browserLogs.forEach(function (log) {
            if (runResult.failed) {
              runResult.browserErrors.push(log.message);
            }
            console.log(log.level.name_ + ':', log.message.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
          });
        });
      }
    }
    results.push(runResult);
  });

  afterAll(function () {
    const color = stats.error > 0 ? '\x1b[31m' : '\x1b[32m';
    const result = stats.success + '/' + stats.total + ' screenshots created. ' + stats.skipped + ' skipped. ' + stats.error + ' failed';
    const separator = ''.padEnd(result.length + 8, '#');
    console.log(color);
    console.log('\n' + separator);
    console.log('#  ', result, '  #');
    console.log(separator);
    console.log('\x1b[0m');

    if (stats.error > 0) {
      console.log('Failed screenshots:');
      results.filter(res => res.failed).forEach(res => {
        console.log('\n\n###################################################');
        console.log('File:        ', res.file);
        console.log('Screenshot:  ', res.screenshot);
        console.log('Stacktrace:  ', res.error);
      });
    }

    // delete index entries that are not available anymore
    for (let indexFile of shotIndexFiles) {
      let indexData = '';
      try {
        indexData = fs.readFileSync(indexFile, 'utf-8');
        const shotIndexData = JSON.parse(indexData);
        const existingFiles = fs.readdirSync(path.dirname(indexFile))
          .filter(file => file.endsWith('.png'))
          .map(file => file.substring(0, file.lastIndexOf('.')));
        for (let file in shotIndexData) {
          if (!existingFiles.includes(file)) {
            delete shotIndexData[file];
          }
        }
        fs.writeFileSync(indexFile, JSON.stringify(shotIndexData, null, 4), function (err) {
          if (err) {
            console.log(err);
          }
        });
      } catch (e) {
        console.error(indexFile);
        console.error(e.message);
        console.error(indexData);
      }
    }
  });

  const files = [];
  fs.readdirSync(examplesDir).forEach(function(fileName) {
    const subDir = path.join(examplesDir, fileName);
    if (subDirsMode) {
      if (browser.onlySubDir && browser.onlySubDir !== fileName) {
        return;
      }
      if (fs.statSync(subDir).isDirectory()) {
        fs.readdirSync(subDir).forEach(async function (fileName) {
          if (whiteList.length > 0 && whiteList.indexOf(fileName) < 0) {
            // skip this one
            return;
          }
          if (fileName.split('.').pop() !== 'json') {
            return;
          }
          let filePath = path.join(subDir, fileName);
          files.push(filePath);
        });
      }
    } else {
      if (whiteList.length > 0 && whiteList.indexOf(fileName) < 0) {
        // skip this one
        return;
      }
      if (fileName.split('.').pop() !== 'json') {
        return;
      }
      files.push(subDir);
    }
  });

  function prepare(screenshotDir) {
    createDir(screenshotDir);
    const indexFile = path.join(screenshotDir, 'shot-index.json');
    if (fs.existsSync(indexFile)) {
      const indexData = fs.readFileSync(indexFile, 'utf-8');
      try {
        shotIndex[screenshotDir] = JSON.parse(indexData);
        if (!shotIndexFiles.includes(indexFile)) {
          shotIndexFiles.push(indexFile);
        }
      } catch (e) {
        console.error('\n>>> error parsing screenshot index data', indexData, indexFile);
        console.error(e.message);
      }
    } else {
      shotIndex[screenshotDir] = {};
    }
    return indexFile;
  }

  files.forEach(async function(filePath) {
    let stat = fs.statSync(filePath);
    if (stat.isFile()) {
      runResult.file = filePath;
      const rawData = fs.readFileSync(filePath, 'utf-8');
      let settings;
      try {
        settings = JSON.parse(rawData);
      } catch (e) {
        console.error('\n>>> error parsing settings', rawData, filePath);
        console.error(e.message);
        runResult.failed = true;
        runResult.error = e;
        stats.error++;
        stats.total++;
        return;
      }
      const runIndexFiles = []

      let settingsHash;
      if (!settings.baseDir) {
        // when we have a baseDir the screenshot dir is different for each screenshot, most likely because of different locales
        runIndexFiles.push([prepare(settings.screenshotDir), settings.screenshotDir]);
      } else {
        for (const setting of settings.screenshots) {
          if (setting.locales) {
            for (const locale of setting.locales) {
              const dir = path.join(...[settings.baseDir, locale, settings.screenshotDir].filter(name => !!name));
              runIndexFiles.push([prepare(dir), dir]);
            }
          }
        }
      }

      // check if we have to renew any ob the screenshots
      const skippedScreenshots = [];
      const screenshots = [];
      let allSkipped = true;

      const checkExists = (setting, screenshotDir) => {
        if (!fs.existsSync(path.join(screenshotDir, setting.name + '.png'))) {
          console.log('file not found, creating screenshot', path.join(screenshotDir, setting.name + '.png'));
          screenshots.push(setting.name);
          allSkipped = false;
        } else if (setting.hasOwnProperty('hash')) {
          if (shotIndex[screenshotDir].hasOwnProperty(setting.name) && setting.hash === shotIndex[screenshotDir][setting.name] && !browser.forced) {
            // skip this screenshot because is has not changed since last generation
            stats.skipped++;
            stats.total++;
            skippedScreenshots.push(screenshotDir + setting.name);
          } else {
            console.log('hash mismatch, creating screenshot', path.join(screenshotDir, setting.name + '.png'), setting.hash, shotIndex[screenshotDir][setting.name]);
            screenshots.push(setting.name);
            allSkipped = false;
          }
        } else {
          // skip this screenshot because it has no hash to check and the file exists
          stats.skipped++;
          stats.total++;
          skippedScreenshots.push(screenshotDir + setting.name);
        }
      }

      for (const setting of settings.screenshots) {
        if (!setting.hash) {
          if (!settingsHash) {
            settingsHash = hashCode(JSON.stringify(settings));
          }
          setting.hash = settingsHash;
        }
        if (setting.locales) {
          for (const locale of setting.locales) {
            checkExists(setting, path.join(...[settings.baseDir, locale, settings.screenshotDir].filter(name => !!name)));
          }
        } else {
          checkExists(setting, settings.screenshotDir);
        }
      }
      if (allSkipped) {
        // nothing to do
        return;
      }

      let selectorPrefix = settings.structure === 'tile' ? '' : '.activePage ';
      let mockedConfigData = {
        mode: 'cv',
        data: settings.config,
        fixtures: settings.fixtures,
        pageLoaded: settings.pageLoaded,
        locale: settings.locale
      };

      if (settings.mode) {
        selectorPrefix = '';
        mockedConfigData.mode = settings.mode;
      } else if (settings.editor) {
        selectorPrefix = '';
        mockedConfigData.mode = 'editor';
      }
      let loadManager = mockedConfigData.mode === 'editor' || mockedConfigData.mode === 'manager';
      if (settings.selector.includes('.activePage') || settings.selector.includes('#')) {
        selectorPrefix = '';
      }
      mockupConfig.push(mockedConfigData);

      it('should create a screenshot', async function () {
        if (browser.verbose) {
          console.log('>>> processing ' + filePath + '...');
        }
        let currentScreenshot = {};
        runResult.shotIndexFiles = runIndexFiles;
        try {
          let widget;
          if (loadManager) {
            widget = element(by.css('#manager'));
            await browser.wait(function () {
              return widget.isDisplayed();
            }, 2000);

            if (mockedConfigData.mode === 'editor') {
              await editorMockup.editConfig(settings.hasOwnProperty('configFileName') ? settings.configFileName : 'mockup', settings.showPreview);
              widget = element.all(by.css('div[qxclass="qx.ui.tree.VirtualTree"] div[qxclass="cv.ui.manager.tree.VirtualElementItem"]')).first();
              await browser.wait(function () {
                return widget.isDisplayed();
              }, 2000);

              if (settings.complex) {
                await editorMockup.enableExpertMode();
              }
              await editorMockup.openWidgetElement(settings.widget, settings.editor === 'attributes');

              if (settings.special) {
                if (settings.special.contextMenu) {
                  const ele = element(by.css('div[data-nodename="'+settings.widget+'"]'));
                  browser.actions().click(ele, protractor.Button.RIGHT).perform();
                }
              }
            }
            if (settings.openFile) {
              if (settings.openFile.config) {
                await editorMockup.dispatchAction('openWith', Object.assign({file: settings.openFile.name}, settings.openFile.config));
              } else {
                await editorMockup.dispatchAction('open', settings.openFile.name);
              }
              widget = element.all(by.css(settings.openFile.waitFor)).first();
              await browser.wait(function () {
                return widget.isDisplayed();
              }, 2000);
            }

            if (settings.rightClickOn) {
              const ele = element.all(by.css(settings.rightClickOn)).first();
              browser.actions().click(ele, protractor.Button.RIGHT).mouseMove({x: 400, y: 0}).perform();
            }
          }

          // wait for everything to be rendered
          browser.sleep(settings.sleep || 1000);
          widget = element.all(by.css(selectorPrefix + settings.selector)).first();
          await browser.wait(function () {
            return widget.isDisplayed();
          }, 2000, 'widget did not appear');

          runResult.screenshots = [];
          for (const setting of settings.screenshots.filter(setting => !skippedScreenshots.includes(setting.name))) {
            currentScreenshot = setting;
            let shotWidget = widget;
            changeBrowserSize(
              setting.screenWidth > 0 ? setting.screenWidth : defaultWidth,
              settings.screenHeight > 0 ? settings.screenHeight : defaultHeight);
            if (setting.data && Array.isArray(setting.data)) {
              for (let data of setting.data) {
                let value = data.value;
                if (data.type) {
                  switch (data.type) {
                    case 'json':
                      try {
                        value = JSON.parse(value);
                      } catch (e) {
                        console.error('error parsing JSON data', e.message);
                      }
                      break;

                    case 'time': {
                      const date = new Date();
                      const parts = value.split(':').map(v => parseInt(v, 10));
                      date.setHours(...parts);
                      value = await cvMockup.encode({transform: data.transform}, date);
                      break;
                    }

                    case 'date': {
                      value = await cvMockup.encode({transform: data.transform}, new Date(value));
                      break;
                    }

                    default:
                      console.error('unhandled data type:', data.type)
                      break;
                  }
                } else if (data.transform && data.transform !== 'raw') {
                  value = await cvMockup.encode({transform: data.transform}, value);
                }
                cvMockup.sendUpdate(data.address, value);
              }
            }
            if (setting.clickPath) {
              var actor = element.all(by.css(setting.clickPath)).first();
              if (actor) {
                actor.click();
                const waitFor = setting.waitFor ? setting.waitFor : selectorPrefix + settings.selector;
                const waitForWidget = element(by.css(waitFor));
                browser.wait(function () {
                  return waitForWidget.isDisplayed();
                }, 1000);
              }
            }
            if (setting.hoverOn) {
              const ele = element.all(by.css(setting.hoverOn)).first();
              browser.actions().mouseMove(ele).mouseMove(ele).perform();
            }
            if (setting.waitFor) {
              const waitForWidget = element(by.css(setting.waitFor));
              browser.wait(function () {
                return waitForWidget.isDisplayed();
              }, 1000);
            }
            if (setting.selector) {
              shotWidget = element.all(by.css(selectorPrefix + setting.selector)).first();
              await browser.wait(function () {
                return shotWidget.isDisplayed();
              }, 2000, 'widget did not appear');
            }
            let size;
            let location;
            if (setting.size) {
              size = setting.size;
            } else {
              size = await shotWidget.getSize();
            }
            if (setting.location) {
              location = setting.location;
            } else {
              location = await shotWidget.getLocation();
            }
            if (setting.locationOffset) {
              location.x += setting.locationOffset.x;
              location.y += setting.locationOffset.y;
            }
            if (setting.margin) {
              if (!Array.isArray(setting.margin)) {
                // top, right, bottom, left
                setting.margin = [setting.margin, setting.margin, setting.margin, setting.margin];
              }
              location.y -= setting.margin[0];
              location.x -= setting.margin[3];
              size.width += setting.margin[1]+setting.margin[3];
              size.height += setting.margin[0]+setting.margin[2];
            }
            location.x = Math.max(0, location.x);
            location.y = Math.max(0, location.y);
            const sleepTime = setting.sleep ? parseInt(setting.sleep) : 0;
            if (!isNaN(sleepTime) && sleepTime > 0) {
              browser.sleep(sleepTime);
            }
            //console.log("  - creating screenshot '" + setting.name + "'");
            const locales = setting.locales ? setting.locales : [settings.locale || ''];
            for (const locale of locales) {
              const screenshotDir = settings.baseDir
                ? path.join(...[settings.baseDir, locale, settings.screenshotDir].filter(name => !!name))
                : settings.screenshotDir;
              if (skippedScreenshots.includes(screenshotDir + setting.name)) {
                continue;
              }
              runResult.shotIndexFiles.push([path.join(screenshotDir, 'shot-index.json'), screenshotDir]);
              if (locale) {
                mockup.setLocale(locale);
              }
              const data = await browser.takeScreenshot();
              let base64Data = data.replace(/^data:image\/png;base64,/, '');
              const imgFile = path.join(screenshotDir, setting.name + '.png');
              try {
                fs.writeFileSync(imgFile, base64Data, 'base64');
                if (settings.scale) {
                  let scale = parseInt(settings.scale);
                  let scaledWidth = Math.round(size.width * scale / 100);
                  let scaledHeight = Math.round(size.height * scale / 100);
                  cropInFile(size, location, imgFile, scaledWidth, scaledHeight);
                } else {
                  cropInFile(size, location, imgFile);
                }
                stats.success++;
                stats.total++;
                runResult.success = true;
                if (setting.hash) {
                  shotIndex[screenshotDir][setting.name] = setting.hash;
                }
              } catch (err) {
                runResult.failed = true;
                runResult.error = err;
                stats.error++;
                stats.total++;
              }
            }
          }
        } catch (e) {
          const name = currentScreenshot.name || settings.screenshots.map(e => e.name).join(',');
          console.error('>>> error creating screenshot(s)', name, 'from file', filePath);
          stats.error++;
          stats.total++;
          runResult.failed = true;
          runResult.error = e;
          runResult.screenshot = name;
        }
      });
    }
  });
  // save the shotindex
});
