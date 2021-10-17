
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
  constructor() {
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
    // Note: as some designs (like "metal") are hiding the h1 the page name
    // must be extracted by this little detour
    return browser.executeAsyncScript(function (callback) {
 callback(document.querySelectorAll('.activePage h1')[0].textContent); 
});
  }

  // eslint-disable-next-line class-methods-use-this
  getPages() {
    return element.all(by.css('.page'));
  }

  // eslint-disable-next-line class-methods-use-this
  getPage(name) {
    return element.all(by.css('.page')).then(function(pages) {
      return pages.find(function(page) {
        if (page.element(by.tagName('h1')).getText() === name) {
          return page;
        }
        return null;
      });
    });
  }

  /**
   * Navigate to a page by name
   * @param name {String}
   * @param force
   */
  async goToPage(name, force) { // eslint-disable-line class-methods-use-this
    if (force) {
      await browser.driver.executeAsyncScript(function (name, callback) {
        cv.TemplateEngine.getInstance().scrollToPage(name, 0);
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
   * Get the last message that has been send to the backend (aka write message)
   * @return {Map}
   */
  // eslint-disable-next-line class-methods-use-this
  getLastWrite() {
    return browser.executeAsyncScript(function (callback) {
      callback(window.writeHistory[window.writeHistory.length - 1]);
    });
  }

  /**
   * Get the complete list of write messages, which have been send to the backend
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
      i: new Date().getTime(),
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
}
module.exports = BasePage;
