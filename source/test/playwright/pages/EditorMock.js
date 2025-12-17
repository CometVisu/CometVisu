/* EditorMock.js 
 * 
 * copyright (c) 2010-2025, Christian Mayer and the CometVisu contributers.
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
 * Create mock config page test object for the editor - Playwright version
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
const BasePage = require('./BasePage.js');

class CometVisuEditorMockup extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} target - 'source' or 'build'
   */
  constructor(page, target = 'source') {
    super(page, null, target);
    this.url = this.baseUrl + '/' + this.target + '/index.html?testMode=true&manager=1';
  }

  /**
   * Mock a configuration for the editor
   * @param {string} config - XML configuration content
   */
  async mockupConfig(config) {
    const targetPath = '/' + this.target + '/rest/manager/index.php/fs?path=visu_config_mockup.xml';
    
    try {
      // Use page.request to send POST request to the mock endpoint
      const response = await this.page.request.post(
        this.baseUrl + '/mock' + encodeURIComponent(targetPath),
        {
          data: config,
          headers: {
            'Content-Type': 'text/xml'
          }
        }
      );
      
      if (!response.ok()) {
        console.error('Failed to mock editor config:', response.status(), response.statusText());
      }
    } catch (error) {
      console.error('Error mocking editor config:', error);
    }
  }

  /**
   * Wait for the editor page to be loaded
   */
  async at() {
    try {
      await this.page.waitForSelector('#manager', { 
        state: 'visible', 
        timeout: this.timeout.xl 
      });
      return true;
    } catch (error) {
      console.error('Editor page did not load:', error.message);
      return false;
    }
  }

  /**
   * Edit a configuration file
   * @param {string} configName - Configuration name (without visu_config_ prefix)
   * @param {boolean} showPreview - Whether to show preview
   */
  async editConfig(configName, showPreview = false) {
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

  /**
   * Dispatch an action via the message bus
   * @param {string} action - Action name
   * @param {*} data - Action data
   */
  async dispatchAction(action, data) {
    return this.page.evaluate(({ action, data }) => {
      qx.event.message.Bus.dispatchByName('cv.manager.' + action, data);
      return true;
    }, { action, data });
  }

  /**
   * Enable expert mode in the editor
   */
  async enableExpertMode() {
    return this.page.evaluate(() => {
      const editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
      if (editor && editor instanceof cv.ui.manager.editor.Tree) {
        editor.setExpert(true);
      }
    });
  }

  /**
   * Open a widget element in the editor
   * @param {string} selector - Widget selector
   * @param {boolean} edit - Whether to open in edit mode
   */
  async openWidgetElement(selector, edit = false) {
    return this.page.evaluate(({ selector, edit }) => {
      return new Promise((resolve) => {
        function open(editor, sel, editMode) {
          if (editor instanceof cv.ui.manager.editor.Tree) {
            editor.openByQuerySelector(sel, editMode);
            resolve(true);
          } else {
            resolve(false);
          }
        }
        
        let editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
        if (!editor) {
          setTimeout(() => {
            editor = cv.ui.manager.control.ActionDispatcher.getInstance().getFocusedWidget();
            if (editor) {
              open(editor, selector, edit);
            } else {
              resolve(false);
            }
          }, 2000);
        } else {
          open(editor, selector, edit);
        }
      });
    }, { selector, edit });
  }
}

module.exports = CometVisuEditorMockup;
