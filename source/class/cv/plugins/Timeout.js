/* structure_plugin.js 
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


/**
 * This plugins jumps back to a defined page after a given timeout period
 *
 * @author Carsten Tschach (Carsten@Tschach.com)
 * @since 2012
 */
qx.Class.define('cv.plugins.Timeout', {
  extend: cv.structure.AbstractBasicWidget,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    this.__timeoutIdleCount = 0;
  },


  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function() {
      return {
        'target': { "default": "id_" },
        'time': { "default": 600, transform: parseFloat },
        'debug': {
          "default": false,
          transform: function(value) {
            return value === "true";
          }
        }
      }
    }
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    target: {
      check: "String",
      init: "id_"
    },
    time: {
      check: "Number",
      init: 600
    },
    debug: {
      check: "Boolean",
      init: false
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __timeoutIdleCount: null,
    __timeoutCurrentPage: null,
    __timeoutCurrentPageTitle: null,
    __timeoutTargetPage: null,

    timeoutPrintDebug: function (s) {
      if (this.isDebug()) {
        this.debug(s);
      }
    },

    _onDomReady: function () {
      this.timeoutPrintDebug("Timeout Set to : " + this.getTimeout());
      this.timeoutPrintDebug("Target Page: " + this.getTarget());

      var deltaT = this.getTimeout() * 100;
      this.__timer = new qx.event.Timer(deltaT);
      this.__timer.addListener("interval", this.timeoutTrigger, this);
      this.__timer.start();

      // Reset Counter on every interaction
      qx.event.Registration.addListener(document, 'scroll', this._onUserAction, this);
      qx.event.Registration.addListener(document, 'keypress', this._onUserAction, this);
      qx.event.Registration.addListener(document, 'roll', this._onUserAction, this);
      qx.event.Registration.addListener(document, 'pointerdown', this._onUserAction, this);

      // Keep track of current page
      qx.event.message.Bus.subscribe("path.pageChanged", function (ev) {
        var path = ev.getData();
        this.__timeoutCurrentPage = path;
        this.__timeoutCurrentPageTitle = qx.dom.Node.getText(qx.bom.Selector.query("#" + path+ " div > h1")[0]);
        this.__timeoutIdleCount = 0;
        /* We could trun on and off the above binds if we are already on the right page

         if (timeoutCurrentPage == timeoutTargetPage) {
         console.log("XXXXXX TIMEOUT: Scrolled to Target Page: " + path);
         } else {
         console.log("XXXXXX TIMEOUT: Scrolled to: " + path + " ("+timeoutTargetPage + ")");
         }
         */
      });
    },

    _onUserAction: function() {
      this.__timeoutIdleCount = 0;
    },

    timeoutTrigger: function () {
      this.timeoutPrintDebug("TIMEOUT: Got Trigger (" + this.__timeoutIdleCount + ")");
      this.__timeoutIdleCount++;
      this.__timeoutTargetPage = this.getTarget();
      if (this.__timeoutIdleCount >= 10) {
        this.__timeoutIdleCount = 0;
        var templateEngine = cv.TemplateEngine.getInstance();

        if (this.__timeoutCurrentPage != this.__timeoutTargetPage && this.__timeoutCurrentPageTitle != this.__timeoutTargetPage) {
          this.timeoutPrintDebug("TIMEOUT: Got Timeout - Now Goto Page " + this.__timeoutTargetPage);
          templateEngine.scrollToPage(this.__timeoutTargetPage);
          templateEngine.currentPage.scrollTop(0);
          //templateEngine.updateTopNavigation();
        } else {
          this.timeoutPrintDebug("TIMEOUT: Already on page " + this.__timeoutTargetPage);
          templateEngine.currentPage.scrollTop(0);
        }
      }
    }
  },

  defer: function(statics) {
    cv.xml.Parser.addHandler("timeout", cv.plugins.Timeout);
    cv.structure.WidgetFactory.registerClass("timeout", statics);
  }

});

