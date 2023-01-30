/* BasePage.js 
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


const path = require('path');
const fs = require('fs');
const request = require('request');
const rootDir = path.join(__dirname, '..', '..', '..', '..');

/**
 * Wrappers for expected conditions
 *
 * I find ECs are generally poorly named, so we wrap them in
 * methods that are 9% more sexy, and allow us to add logging, etc...
 *
 * @return {ExpectedCondition}
 */
const EC = protractor.ExpectedConditions;

/**
 * The basic PageObject supplies generic helper functions needed for testing the CometVisu app
 * @author Tobias Bräutigam
 * @since 2016
 */
class BasePage {
  constructor(structure, target) {
    this.structure = structure || 'pure';
    this.target = target || 'source';
    /**
     * wrap this.timeout. (ms) in t-shirt sizes
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
   * wait and verify that a page is loaded
   * @return {promise}
   * @requires a page to include `pageLoaded` method
   */
  at() {
    return browser.wait(this.pageLoaded(), this.timeout.xl, 'timeout waiting for page to load');
  }

  /**
   * navigate to a page via it's `url` var
   * and verify/wait via at()
   * @param urlModification
   * @requires page have both `url` and `pageLoaded` properties
   */
  to(urlModification) {
    if (urlModification === undefined) {
      urlModification = '';
    }

    browser.get(this.url + urlModification, this.timeout.xl);
    return this.at();
  }

  // eslint-disable-next-line class-methods-use-this
  isVisible(locator) {
    return EC.visibilityOf(locator);
  }

  // eslint-disable-next-line class-methods-use-this
  isNotVisible(locator) {
    return EC.invisibilityOf(locator);
  }

  // eslint-disable-next-line class-methods-use-this
  inDom(locator) {
    return EC.presenceOf(locator);
  }

  // eslint-disable-next-line class-methods-use-this
  notInDom(locator) {
    return EC.stalenessOf(locator);
  }

  // eslint-disable-next-line class-methods-use-this
  isClickable(locator) {
    return EC.elementToBeClickable(locator);
  }

  // eslint-disable-next-line class-methods-use-this
  hasText(locator, text) {
    return EC.textToBePresentInElement(locator, text);
  }

  // eslint-disable-next-line class-methods-use-this
  and(arrayOfFunctions) {
    return EC.and(arrayOfFunctions);
  }

  // eslint-disable-next-line class-methods-use-this
  titleIs(title) {
    return EC.titleIs(title);
  }

  // eslint-disable-next-line class-methods-use-this
  getPageTitle() {
    if (this.structure === 'tile') {
      const page = document.querySelector('cv-page.active');
      return page ? page.getAttribute('name') : '';
    }
    // Note: as some designs (like "metal") are hiding the h1 the page name
    // must be extracted by this little detour
    return browser.executeAsyncScript(function (callback) {
      callback(document.querySelectorAll('.activePage h1')[0].textContent);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getPages() {
    if (this.structure === 'tile') {
      return element.all(by.css('cv-page'));
    }
    return element.all(by.css('.page'));
  }

  // eslint-disable-next-line class-methods-use-this
  getPage(name) {
    if (this.structure === 'tile') {
      return element.one(by.css('cv-page[name="'+name+'"]'));
    }
    return element.all(by.css('.page')).then(function(pages) {
      return pages.find(function(page) {
        if (page.element(by.tagName('h1')).getText() === name) {
          return page;
        }
        return null;
      });
    });
  }

  async disablePageAnimations() { // eslint-disable-line class-methods-use-this
    await browser.driver.executeAsyncScript(function (callback) {
      cv.Config.configSettings.scrollSpeed = 0;
      callback();
    });
  }

  /**
   * Navigate to a page by name
   * @param name {String}
   * @param force
   */
  async goToPage(name, force) { // eslint-disable-line class-methods-use-this
    if (force || this.structure === 'tile') {
      await browser.driver.executeAsyncScript(function (name, callback) {
        cv.Application.structureController.scrollToPage(name, 0);
        callback();
      }, name);
    }
    let done = false;
    const links = await element.all(by.css('.activePage div.pagelink'));
    for (let i = 0; i < links.length; i++) {
      const actor = links[i].element(by.css('.actor'));
      const linkName = await actor.element(by.tagName('a')).getText();
      if (linkName === name) {
        done = true;
        actor.click();
        break;
      }
    }
    if (!done) {
      // not found - probably it was a parent page
      element.all(by.css('.nav_path > a')).each(function (link) {
        link.getText().then(function (linkName) {
          if (linkName === name) {
            done = true;
            link.click();
          }
        });
      });
    }
  }

  /**
   * Get the last message that has been sent to the backend (aka write message)
   * @return {Map}
   */
  // eslint-disable-next-line class-methods-use-this
  getLastWrite() {
    return browser.executeAsyncScript(function (callback) {
      callback(window.writeHistory[window.writeHistory.length - 1]);
    });
  }

  /**
   * Get the complete list of write messages, which have been sent to the backend
   * @return {Promise<Array>}
   */
  // eslint-disable-next-line class-methods-use-this
  getWriteHistory() {
    return browser.executeAsyncScript(function (callback) {
      callback(window.writeHistory);
    });
  }

  /**
   * Send an update to the backend
   * @param address {String}
   * @param value {String}
   */
  // eslint-disable-next-line class-methods-use-this
  sendUpdate(address, value) {
    let data = {
      i: Date.now(),
      d: {}
    };
    data.d[address] = value;
    return browser.executeAsyncScript(function (data, callback) {
      window._receive(data);
      callback();
    }, data);
  }

  // eslint-disable-next-line class-methods-use-this
  setLocale(locale) {
    return browser.executeAsyncScript(function (locale, callback) {
      qx.locale.Manager.getInstance().setLocale(locale);
      callback();
    }, locale);
  }

  decode(address, value) {
    return browser.executeAsyncScript(function (address, value, callback) {
      const transformedValue = cv.Transform.decode(address, value);
      callback(transformedValue);
    }, address, value);
  }

  encode(address, value) {
    const isDate = value instanceof Date;
    // executeAsyncScript convers Date into string representation, so we need to undo that inside the browser
    return browser.executeAsyncScript(function (address, value, isDate, callback) {
      if (isDate) {
        value = new Date(value);
      }
      const transformedValue = cv.Transform.encodeBusAndRaw(address, value);
      callback(transformedValue.raw);
    }, address, value, isDate);
  }

  /**
   * Get widget data
   * @param path
   * @return {Map}
   */
  // eslint-disable-next-line class-methods-use-this
  getWidgetData(path) {
    return browser.executeAsyncScript(function (path, callback) {
      callback(window._widgetDataGet(path));
    }, path);
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return browser.executeAsyncScript(function (callback) {
      callback(window._getWidgetDataModel());
    });
  }

  getWidgetAddress(path) {
    this.getWidgetData(path).then(function(data) {
      for (var addr in data.address) {
        return addr;
      }
      return null;
    });
  }

  mockupFixture(fixture) {
    this.mockupReady = false;
    let content;
    if (fixture.hasOwnProperty('sourceFile')) {
      let sourceFile = path.join(rootDir, fixture.sourceFile);
      if (fs.existsSync(sourceFile)) {
        content = fs.readFileSync(sourceFile);
      } else {
        console.error('fixture file', sourceFile, 'not found');
      }
    } else if (fixture.hasOwnProperty('data')) {
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
  }

  resetMockupFixture(fixture) {
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      // adding target only to relative paths
      targetPath = '/' + this.target + '/' + targetPath;
    }
    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/mock' + encodeURIComponent(targetPath)
    });
  }
}
module.exports = BasePage;
