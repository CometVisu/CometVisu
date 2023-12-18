/* EditorMock.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * Create mock config page test object, which can be used to load configs which are defined in the tests
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
const BasePage = require('../pages/BasePage.js');
const request = require('request');

class CometVisuEditorMockup extends BasePage {
  constructor(target) {
    super(null, target);
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



  editConfig(configName, showPreview) {
    const configFile = configName ? 'visu_config_' + configName + '.xml' : 'visu_config.xml';
    return this.dispatchAction('openWith', {
      file: configFile,
      handler: 'cv.ui.manager.editor.Tree',
      handlerOptions: {
        noPreview: !showPreview,
        noStretch: !showPreview
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  dispatchAction(action, data) {
    return browser.executeAsyncScript(function (action, data, callback) {
      qx.event.message.Bus.dispatchByName('cv.manager.'+action, data);
      callback(true);
    }, action, data);
  }

  // eslint-disable-next-line class-methods-use-this
  enableExpertMode() {
    return browser.executeAsyncScript(function(callback) {
      const editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
      if (editor && editor instanceof cv.ui.manager.editor.Tree) {
        editor.setExpert(true);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  openWidgetElement(selector, edit) {
    return browser.executeAsyncScript(function (selector, edit, callback) {
      /**
       * @param editor
       * @param sel
       * @param edit
       */
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
