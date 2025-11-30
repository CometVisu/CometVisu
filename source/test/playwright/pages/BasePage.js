/* BasePage.playwright.js 
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
 * The basic PageObject supplies generic helper functions needed for testing the CometVisu app
 * Playwright version - replaces Protractor BasePage
 * 
 * @author Tobias Bräutigam
 * @since 2025
 */
const path = require('path');
const fs = require('fs');
// rootDir points to the project root (cometvisu/)
const rootDir = path.join(__dirname, '..', '..', '..', '..');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {string} structure - 'pure' or 'tile'
   * @param {string} target - 'source' or 'build'
   */
  constructor(page, structure = 'pure', target = 'source') {
    this.page = page;
    this.structure = structure;
    this.target = target;
    this.baseUrl = 'http://localhost:8000';
    
    /**
     * Timeout presets in ms
     */
    this.timeout = {
      'xs': 420,
      's': 1000,
      'm': 2000,
      'l': 5000,
      'xl': 9000,
      'xxl': 15000
    };
  }

  /**
   * Navigate to a page via its URL and wait for it to load
   * @param {string} urlModification - Optional URL modification
   */
  async to(urlModification = '') {
    await this.page.goto(this.url + urlModification, { 
      waitUntil: 'networkidle',
      timeout: this.timeout.xl 
    });
    return this.at();
  }

  /**
   * Wait and verify that a page is loaded
   */
  async at() {
    // Override in subclasses
    return true;
  }

  /**
   * Get the page title
   */
  async getPageTitle() {
    if (this.structure === 'tile') {
      return this.page.evaluate(() => {
        const page = document.querySelector('cv-page.active');
        return page ? page.getAttribute('name') : '';
      });
    }
    return this.page.evaluate(() => {
      const h1 = document.querySelector('.activePage h1');
      return h1 ? h1.textContent : '';
    });
  }

  /**
   * Navigate to a page by name
   * @param {string} name - Page name
   * @param {boolean} force - Force navigation via script
   */
  async goToPage(name, force = false) {
    if (force || this.structure === 'tile') {
      await this.page.evaluate((pageName) => {
        cv.Application.structureController.scrollToPage(pageName, 0);
      }, name);
      return;
    }

    const links = await this.page.locator('.activePage div.pagelink').all();
    for (const link of links) {
      const actor = link.locator('.actor');
      const linkName = await actor.locator('a').textContent();
      if (linkName === name) {
        await actor.click();
        return;
      }
    }

    // Try parent page navigation
    const navLinks = await this.page.locator('.nav_path > a').all();
    for (const link of navLinks) {
      const linkName = await link.textContent();
      if (linkName === name) {
        await link.click();
        return;
      }
    }
  }

  /**
   * Disable page animations
   */
  async disablePageAnimations() {
    await this.page.evaluate(() => {
      cv.Config.configSettings.scrollSpeed = 0;
    });
  }

  /**
   * Get the last message that has been sent to the backend
   */
  async getLastWrite() {
    return this.page.evaluate(() => {
      return window.writeHistory[window.writeHistory.length - 1];
    });
  }

  /**
   * Get the complete list of write messages
   */
  async getWriteHistory() {
    return this.page.evaluate(() => {
      return window.writeHistory;
    });
  }

  /**
   * Send an update to the backend
   * @param {string} address - Address
   * @param {*} value - Value to send
   */
  async sendUpdate(address, value) {
    const data = {
      i: Date.now(),
      d: { [address]: value }
    };
    await this.page.evaluate((data) => {
      window._receive(data);
    }, data);
  }

  /**
   * Set locale
   * @param {string} locale - Locale code
   */
  async setLocale(locale) {
    return this.page.evaluate((loc) => {
      qx.locale.Manager.getInstance().setLocale(loc);
      return `Currently used locales: Navigator=${navigator.language}, DateTimeFormat=${Intl.DateTimeFormat().resolvedOptions().locale}, Qooxdoo: ${qx.locale.Manager.getInstance().getLocale()}`;
    }, locale);
  }

  /**
   * Decode a value using transform
   * @param {Object} address - Address config with transform
   * @param {*} value - Value to decode
   */
  async decode(address, value) {
    return this.page.evaluate(({ address, value }) => {
      return cv.Transform.decode(address, value);
    }, { address, value });
  }

  /**
   * Encode a value using transform
   * @param {Object} address - Address config with transform
   * @param {*} value - Value to encode
   */
  async encode(address, value) {
    const isDate = value instanceof Date;
    const valueToSend = isDate ? value.toISOString() : value;
    
    return this.page.evaluate(({ address, value, isDate }) => {
      if (isDate) {
        value = new Date(value);
      }
      const transformedValue = cv.Transform.encodeBusAndRaw(address, value);
      return transformedValue.raw;
    }, { address, value: valueToSend, isDate });
  }

  /**
   * Get widget data
   * @param {string} path - Widget path
   */
  async getWidgetData(path) {
    return this.page.evaluate((p) => {
      return window._widgetDataGet(p);
    }, path);
  }

  /**
   * Get model data
   */
  async getModel() {
    return this.page.evaluate(() => {
      return window._getWidgetDataModel();
    });
  }

  /**
   * Mock a fixture via HTTP POST to the mock server
   * @param {Object} fixture - Fixture configuration
   */
  async mockupFixture(fixture) {
    let content;
    
    if (fixture.sourceFile) {
      const sourceFile = path.join(rootDir, fixture.sourceFile);
      if (fs.existsSync(sourceFile)) {
        content = fs.readFileSync(sourceFile, 'utf-8');
      } else {
        console.error('fixture file', sourceFile, 'not found');
        return;
      }
    } else if (fixture.data) {
      content = typeof fixture.data === 'object' 
        ? JSON.stringify(fixture.data) 
        : fixture.data;
    }

    if (content === undefined) {
      return;
    }

    let queryString = '';
    if (fixture.mimeType) {
      queryString = '?mimeType=' + encodeURIComponent(fixture.mimeType);
    }

    let targetPaths = Array.isArray(fixture.targetPath) 
      ? fixture.targetPath 
      : [fixture.targetPath];

    for (let targetPath of targetPaths) {
      if (!targetPath.startsWith('/')) {
        targetPath = '/' + this.target + '/' + targetPath;
      }
      
      try {
        await fetch(
          this.baseUrl + '/mock' + encodeURIComponent(targetPath) + queryString,
          {
            method: 'POST',
            body: content
          }
        );
      } catch (error) {
        console.error('Error mocking fixture:', error);
      }
    }
  }

  /**
   * Reset a mocked fixture
   * @param {Object} fixture - Fixture configuration
   */
  async resetMockupFixture(fixture) {
    let targetPaths = Array.isArray(fixture.targetPath) 
      ? fixture.targetPath 
      : [fixture.targetPath];

    for (let targetPath of targetPaths) {
      if (!targetPath.startsWith('/')) {
        targetPath = '/' + this.target + '/' + targetPath;
      }
      
      try {
        await fetch(
          this.baseUrl + '/mock' + encodeURIComponent(targetPath),
          { method: 'DELETE' }
        );
      } catch (error) {
        console.error('Error resetting fixture:', error);
      }
    }
  }
}

module.exports = BasePage;
