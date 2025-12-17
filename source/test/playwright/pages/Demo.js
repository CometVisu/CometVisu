/* Demo.js 
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
 * Demo page object for Playwright
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
const BasePage = require('./BasePage.js');

class CometVisuDemo extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} configUrl - Configuration URL
   * @param {Function} pageLoadedFn - Custom page loaded check function
   * @param {string} target - 'source' or 'build'
   */
  constructor(page, configUrl, pageLoadedFn, target = 'source') {
    super(page, 'pure', target);
    this.url = configUrl;
    this.pageLoadedFn = pageLoadedFn;
  }

  /**
   * Wait for the demo page to be loaded
   */
  async at() {
    if (this.pageLoadedFn) {
      // Custom page loaded check
      try {
        await this.page.waitForFunction(this.pageLoadedFn, {
          timeout: this.timeout.xl
        });
        return true;
      } catch (error) {
        console.error('Demo page did not load:', error.message);
        return false;
      }
    }
    
    // Default: wait for #id_ element
    try {
      await this.page.waitForSelector('#id_', { 
        state: 'visible', 
        timeout: this.timeout.xl 
      });
      return true;
    } catch (error) {
      console.error('Demo page did not load:', error.message);
      return false;
    }
  }
}

module.exports = CometVisuDemo;
