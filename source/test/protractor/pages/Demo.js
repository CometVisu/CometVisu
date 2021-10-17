/**
 * Create the Demo page test object
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
const BasePage = require('../pages/BasePage.js');

class CometVisuDemo extends BasePage {
  constructor() {
    super();

    this.url = 'http://localhost:8000/source/index.html?config=demo&forceReload=true&testMode=true&enableCache=false';

    this.pageLoaded = this.and(
      this.isVisible($('#id_40_5_2'))
    );
  }
}
module.exports = new CometVisuDemo();
