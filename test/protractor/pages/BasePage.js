
var BasePage = function () {
  /**
   * wait and verify that a page is loaded
   * @returns {promise}
   * @requires a page to include `pageLoaded` method
   */
  this.at = function () {
    return browser.wait(this.pageLoaded(), this.timeout.xl);
  };

  /**
   * navigate to a page via it's `url` var
   * and verify/wait via at()
   *
   * @requires page have both `url` and `pageLoaded` properties
   */
  this.to = function () {
    browser.get(this.url, this.timeout.xl);
    return this.at();
  };

  /**
   * Wrappers for expected conditions
   *
   * I find ECs are generally poorly named, so we wrap them in
   * methods that are 9% more sexy, and allow us to add logging, etc...
   *
   * @returns {ExpectedCondition}
   */
  var EC = protractor.ExpectedConditions;

  this.isVisible = function (locator) {
    return EC.visibilityOf(locator);
  };

  this.isNotVisible = function (locator) {
    return EC.invisibilityOf(locator);
  };

  this.inDom = function (locator) {
    return EC.presenceOf(locator);
  };

  this.notInDom = function (locator) {
    return EC.stalenessOf(locator);
  };

  this.isClickable = function (locator) {
    return EC.elementToBeClickable(locator);
  };

  this.hasText = function (locator, text) {
    return EC.textToBePresentInElement(locator, text);
  };

  this.and = function (arrayOfFunctions) {
    return EC.and(arrayOfFunctions);
  };

  this.titleIs = function (title) {
    return EC.titleIs(title);
  };

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

  this.getPageTitle = function () {
    return element(by.css(".activePage")).element(by.tagName("h1")).getText();
  };

  this.getPages = function () {
    return element.all(by.css(".page"));
  };

  this.getPage = function(name) {
    return element.all(by.css(".page")).then(function(pages) {
      return pages.find(function(page) {
        if (page.element(by.tagName("h1")).getText() === name) {
          return page;
        }
      });
    });
  };

  /**
   * Navigate to a page by name
   * @param name {String}
   */
  this.goToPage = function(name) {
    element.all(by.css("div.pagelink")).then(function(links) {
      links.some(function(link) {
        var actor = link.element(by.css(".actor"));
        actor.element(by.tagName("a")).getText().then(function(linkName) {
          if (linkName === name) {
            actor.click();
            return true;
          }
        });
      });
    });
  };

};
module.exports = new BasePage();