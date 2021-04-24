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

class CometVisuEditorMockup extends BasePage {

  constructor(target) {
    super();
    this.target = target || "source";
    this.url = 'http://localhost:8000/' + this.target + '/index.html?testMode=true&manager=1';
    this.pageLoaded = this.and(
      this.isVisible($('#manager')), this.mockupReady
    );
  }

  mockupConfig(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock'+encodeURIComponent('/' + this.target+'/rest/manager/index.php/fs?path=visu_config_mockup.xml'),
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
    let content;
    if (fixture.hasOwnProperty("sourceFile")) {
      let sourceFile = path.join(rootDir, fixture.sourceFile);
      if (fs.existsSync(sourceFile)) {
        content = fs.readFileSync(sourceFile);
      } else {
        console.error("fixture file", sourceFile, 'not found');
      }
    } else if (fixture.hasOwnProperty("data")) {
      if (typeof fixture.data === 'object') {
        content = JSON.stringify(fixture.data);
      } else {
        content = fixture.data;
      }
    }

    let queryString = '';
    if (fixture.mimeType) {
      queryString = '?mimeType='+encodeURIComponent(fixture.mimeType);
    }

    if (content !== undefined) {
      let targetPath = fixture.targetPath;
      if (!targetPath.startsWith('/')) {
        // adding target only to relative paths
        targetPath = '/' + this.target + '/' + targetPath;
      }
      request({
        method: 'POST',
        uri: 'http://localhost:8000/mock' + encodeURIComponent(targetPath) + queryString,
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
    }
  };

  resetMockupFixture(fixture) {
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      // adding target only to relative paths
      targetPath = '/' + this.target + '/' + targetPath;
    }
    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/mock/' + encodeURIComponent(targetPath),
    });
  }

  editConfig(configName, showPreview) {
    const configFile = configName ? 'visu_config_' + configName + '.xml' : 'visu_config.xml';
    return this.dispatchAction('openWith', {
      file: configFile,
      handler: 'cv.ui.manager.editor.Tree',
      handlerOptions: {
        noPreview: !showPreview
      }
    });
  }

  dispatchAction(action, data) {
    return browser.executeAsyncScript(function (action, data, callback) {
      qx.event.message.Bus.dispatchByName('cv.manager.'+action, data);
      callback(true);
    }, action, data);
  }

  enableExpertMode() {
    return browser.executeAsyncScript(function(callback) {
      const editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
      if (editor && editor instanceof cv.ui.manager.editor.Tree) {
        editor.setExpert(true);
      }
    });
  }

  openWidgetElement(selector, edit) {
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
}

module.exports = CometVisuEditorMockup;
