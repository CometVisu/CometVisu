/* Mock.js 
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
 * Create mock config page test object for Playwright
 * Replaces the Protractor version
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
const BasePage = require('./BasePage.js');

class CometVisuMockup extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} target - 'source' or 'build'
   */
  constructor(page, target = 'source') {
    super(page, 'pure', target);
    this.url = this.baseUrl + '/' + this.target + '/index.html?config=mockup&testMode=true&enableCache=false';
  }

  /**
   * Mock a configuration
   * @param {string} config - XML configuration content
   */
  async mockupConfig(config) {
    const targetPath = '/' + this.target + '/resource/config/visu_config_mockup.xml';
    
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
        console.error('Failed to mock config:', response.status(), response.statusText());
      }
    } catch (error) {
      console.error('Error mocking config:', error);
    }
  }

  /**
   * Wait for the page to be loaded
   */
  async at() {
    try {
      await this.page.waitForSelector('#id_', { 
        state: 'visible', 
        timeout: this.timeout.xl 
      });
      return true;
    } catch (error) {
      console.error('Page did not load:', error.message);
      return false;
    }
  }

  /**
   * Navigate to the mockup page
   * @param {string} urlModification - Optional URL modification
   */
  async to(urlModification = '') {
    await this.page.goto(this.url + urlModification, {
      waitUntil: 'domcontentloaded',
      timeout: this.timeout.xl
    });
    return this.at();
  }
}

module.exports = CometVisuMockup;
