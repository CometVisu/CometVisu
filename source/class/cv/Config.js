/* Config.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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


qx.Class.define('cv.Config', {
  type:"static",

  statics: {
    libraryVersion: 7,
    libraryCheck: true,
    // threshold where the mobile.css is loaded
    maxMobileScreenWidth: 480,
    // threshold where different colspans are used
    maxScreenWidthColspanS: 599,
    maxScreenWidthColspanM: 839,
    scrollSpeed : 0,

    defaultColumns : 12,
    minColumnWidth : 120,

    enableAddressQueue : false,

    backend : 'default',
    backendUrl : null,
    configSuffix : null,
    clientDesign : "",
    Uri : false,
    use_maturity : false
  },

  defer: function() {
    var req = qx.util.Uri.parseUri(window.location.href);

    if (req.queryKey.enableQueue) {
      cv.Config.enableAddressQueue = true;
    }

    if (req.queryKey.libraryCheck) {
      cv.Config.libraryCheck = req.queryKey.libraryCheck != 'false'; // true unless set to false
    }
    if (req.queryKey.backend) {
      cv.Config.backend = req.queryKey.backend;
    }

    if (req.queryKey.design) {
      cv.Config.clientDesign = req.queryKey.design;
    }

    if (req.queryKey.startpage) {
      cv.Config.startpage = req.queryKey.startpage;
    }

    if (req.queryKey.testMode) {
      cv.Config.testMode = req.queryKey.testMode === "true";
    }

    if (req.queryKey.config) {
      cv.Config.configSuffix = req.queryKey.config;
    }

    if (req.queryKey.forceReload) {
      cv.Config.forceReload = req.queryKey.forceReload != 'false'; // true unless set
      // to false
    }

    // "Bug"-Fix for ID: 3204682 "Caching on web server"
    // Config isn't a real fix for the problem as that's part of the web browser,
    // but
    // it helps to avoid the problems on the client, e.g. when the config file
    // has changed but the browser doesn't even ask the server about it...
    cv.Config.forceReload = true;

    if (req.queryKey.forceDevice) {
      cv.Config.forceMobile = req.queryKey.forceDevice == 'mobile';
      cv.Config.forceNonMobile = !cv.Config.forceMobile;
    } else {
      cv.Config.forceMobile = false;
      cv.Config.forceNonMobile = false;
    }
    var uagent = navigator.userAgent.toLowerCase();
    cv.Config.mobileDevice = (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent));
    if (/(nexus 7|tablet)/i.test(uagent)) cv.Config.mobileDevice = false;  // Nexus 7 and Android Tablets have a "big" screen, so prevent Navbar from scrolling
    cv.Config.mobileDevice |= cv.Config.forceMobile;  // overwrite detection when set by URL


    // Disable features that aren't ready yet
    // Config can be overwritten in the URL with the parameter "maturity"

    if (req.queryKey.maturity) {
      cv.Config.url_maturity = req.queryKey.maturity;
      if (!isNaN(cv.Config.url_maturity - 0)) {
        cv.Config.use_maturity = cv.Config.url_maturity - 0; // given directly as number
      } else {
        cv.Config.use_maturity = cv.structure.pure.AbstractBasicWidget.Maturity[cv.Config.url_maturity]; // or as the ENUM name
      }
    }

    if (isNaN(cv.Config.use_maturity)) {
      cv.Config.use_maturity = cv.structure.pure.AbstractBasicWidget.Maturity.release; // default to release
    }
  }
});