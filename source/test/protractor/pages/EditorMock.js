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

  this.url = 'http://localhost:8000/'+target+'/index.html?testMode=true&manager=1';

  var mockupReady = false;

  this.mockupConfig = function(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock/'+target+'/rest/manager/index.php/fs?path=visu_config_mockup.xml',
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
    this.isVisible($('#manager')), mockupReady
  );

  this.editConfig = function (configName) {
    const configFile = configName ? 'visu_config_' + configName + '.xml' : 'visu_config.xml';
    return this.dispatchAction('openWith', {
      file: configFile,
      handler: 'cv.ui.manager.editor.Tree',
      handlerOptions: {
        noPreview: true
      }
    });
  };

  this.dispatchAction = function (action, data) {
    return browser.executeAsyncScript(function (action, data, callback) {
      qx.event.message.Bus.dispatchByName('cv.manager.'+action, data);
      callback(true);
    }, action, data);
  };

  this.enableExpertMode = function () {
    return browser.executeAsyncScript(function(callback) {
      const editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
      if (editor && editor instanceof cv.ui.manager.editor.Tree) {
        editor.setExpert(true);
      }
    });
  }

  this.openWidgetElement = function (selector, edit) {
    return browser.executeAsyncScript(function (selector, edit, callback) {
      function open (editor, sel, edit) {
        if (editor instanceof cv.ui.manager.editor.Tree) {
          editor.openByQuerySelector(sel, edit);
          callback(true);
        } else {
          callback(false);
        }
      }
      let editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
      if (!editor) {
        setTimeout(() => {
          editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
          if (editor) {
            open(editor, selector, edit);
          } else {
            callback(typeof editor);
          }
        }, 2000);
      } else {
        open(editor, selector, edit);
      }

    }, selector, edit);
  }
};
CometVisuEditorMockup.prototype = basePage;
module.exports = CometVisuEditorMockup;
