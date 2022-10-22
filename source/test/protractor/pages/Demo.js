/* Demo.js 
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
