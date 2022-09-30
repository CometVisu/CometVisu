function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* IController.js 
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
   * Interface for structure controllers.
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Interface.define('cv.ui.structure.IController', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      /**
       * The target this structure should be inserted into as CSS selector string
       */
      renderTarget: {
        check: 'String'
      },

      /**
       * Namespace for path ids
       */
      namespace: {
        check: 'String'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * Returns the main HTML structure needed by this structure, this content will be injected to the document
       * body as innerHTML
       * @return {String} HTML code
       */
      getHtmlStructure: function getHtmlStructure() {},

      /**
       * Extract backend specific settings from the config
       * @param xml {XMLDocument} loaded config
       * @return {Boolean} true if backend setting have been parsed
       */
      parseBackendSettings: function parseBackendSettings(xml) {},

      /**
       * Parses structure specific settings
       * @param xml {XMLDocument} loaded config
       */
      parseSettings: function parseSettings(xml) {},

      /**
       * Pre parsing hook, do everything here that is needed before the real parsing process can start
       * @param xml {XMLDocument}
       */
      preParse: function preParse(xml) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },

      /**
       * Generate the UI code from the config file
       * @param config {Object} loaded config file usually an XMLDocument but other structures might use different formats
       */
      createUI: function createUI(config) {},

      /**
       * Handle fired event from screensaver
       * @return {Array<string>} Array with addresses
       */
      doScreenSave: function doScreenSave() {},

      /**
       * Return the addresses needed to update all states on the initially loaded page
       * @param backendName {string} name of the backend
       * @return {Array<string>} list of addresses
       */
      getInitialAddresses: function getInitialAddresses(backendName) {},

      /**
       * Returns the widget id of the page item initially loaded
       * @returns {String} widget path like 'id_'...
       */
      getInitialPageId: function getInitialPageId() {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },

      /**
       * Check this structure for feature support
       * @param feature {String} name of the feature ti check, e.g. 'navbar'
       * @param subfeature {String?} optional name of a sub feature to check
       */
      supports: function supports(feature, subfeature) {},

      /**
       * handle browser history events that are used to navigate inside the visu
       * @param anchor {String}
       */
      onHistoryRequest: function onHistoryRequest(anchor) {}
    }
  });
  cv.ui.structure.IController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IController.js.map?dt=1664560781032