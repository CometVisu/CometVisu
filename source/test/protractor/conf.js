/* conf.js 
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
 * Protractor end-to-end test settings
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
exports.config = {
  framework: 'jasmine',

  // so not use a selenium server
  directConnect: true,

  suites: {
    common: ['specs/d*spec.js'],
    widgets: ['specs/widgets/*spec.js']
  },
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      binary: process.env.CHROME_BIN,
      args: [
        '--headless',
        '--disable-gpu',
        '--window-size=1024,800'
      ]
    }
  },

  jasmineNodeOpts: {
    showColors: true // Use colors in the command line report.
  },

  onPrepare: function() {
    browser.waitForAngularEnabled(false);

    // set implicit wait times in ms...
    browser.manage().timeouts().implicitlyWait(5000);
    // set browser size...
    browser.manage().window().setSize(1024, 800);
  }
};
