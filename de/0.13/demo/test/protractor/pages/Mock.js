/* Mock.js 
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
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..', '..', '..');

class CometVisuMockup extends BasePage {
  constructor(target) {
    super();
    this.target = target || 'source';
    this.url = 'http://localhost:8000/' + this.target + '/index.html?config=mockup&testMode=true&enableCache=false';
    this.mockupReady = false;

    this.pageLoaded = this.and(
      this.isVisible($('#id_')), this.mockupReady
    );
  }

  mockupConfig(config) {
    request({
      method: 'POST',
      uri: 'http://localhost:8000/mock'+encodeURIComponent('/' + this.target + '/resource/config/visu_config_mockup.xml'),
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

  mockupFixture(fixture) {
    this.mockupReady = false;
    let sourceFile = path.join(rootDir, fixture.sourceFile);
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      // adding target only to relative paths
      targetPath = '/' + this.target + '/' + targetPath;
    }
    if (fs.existsSync(sourceFile)) {
      let content = fs.readFileSync(sourceFile);

      let queryString = '';
      if (fixture.mimeType) {
        queryString = '?mimeType='+encodeURIComponent(fixture.mimeType);
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
    } else {
      console.error('fixture file', sourceFile, 'not found');
    }
  }

  resetMockupFixture(fixture) {
    let targetPath = fixture.targetPath;
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + this.target + '/' + targetPath;
    }
    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/mock' + encodeURIComponent(targetPath)
    });
  }
}

module.exports = CometVisuMockup;
