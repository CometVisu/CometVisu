(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.Bootstrap": {
        "construct": true
      },
      "cv.Config": {},
      "cv.util.Tree": {},
      "cv.ui.structure.WidgetFactory": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* AbstractBasicWidget.js 
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
   *
   */
  qx.Class.define('cv.ui.structure.AbstractBasicWidget', {
    extend: qx.core.Object,
    type: 'abstract',

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      for (var prop in props) {
        if (this['set' + qx.Bootstrap.firstUp(prop)] !== undefined) {
          this.set(prop, props[prop]);
        }
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      /**
       * Internal path to the widget
       */
      path: {
        check: 'String'
      },

      /**
       * The widget type
       */
      $$type: {
        check: 'String'
      },

      /**
       * The parents page type
       */
      pageType: {
        check: ['text', '2d', '3d'],
        init: 'text'
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_508_0: null,
      _domElement: null,

      /**
       * Override DomElement
       * @param node {Node}
       */
      setDomElement: function setDomElement(node) {
        this._domElement = node;
      },
      setParentWidget: function setParentWidget(value) {
        this.__P_508_0 = value;
      },
      getParentWidget: function getParentWidget() {
        if (cv.Config.lazyLoading === true && this.__P_508_0 === null && this.getPath() !== 'id_') {
          // creating parent widget on demand
          var parentData = cv.util.Tree.getParentData(this.getPath()); // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + this.get$$type() + " (" + this.getPath() + ")");

          var parent = cv.ui.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
          this.setParentWidget(parent);
        }

        return this.__P_508_0;
      },

      /**
       * Returns the DOMElement of this widget
       * @return {Element}
       */
      getDomElement: function getDomElement() {
        if (!this._domElement) {
          this._domElement = document.querySelector('#' + this.getPath());
        }

        return this._domElement;
      },

      /**
       * Generates the DOM string for this widget
       * @return {String|null}
       */
      getDomString: function getDomString() {
        return this._getInnerDomString ? this._getInnerDomString() : undefined;
      },

      /**
       * Get the widgets parent page. This might not be the same as the parent widget.
       * @return {cv.ui.structure.pure.Page|null}
       */
      getParentPage: function getParentPage() {
        var parent = this.getParentWidget();

        while (parent) {
          if (parent.get$$type() === 'page') {
            return parent;
          }

          parent = parent.getParentWidget();
        }

        return null;
      },

      /**
       * Get the parent element that defines if this widget is visible. Can be either a page or a navbar
       * @return {cv.ui.structure.pure.Page|cv.ui.structure.pure.NavBar|null}
       */
      getVisibilityParent: function getVisibilityParent() {
        var parent = this.getParentWidget();

        while (parent) {
          if (parent.get$$type() === 'page' || parent.get$$type() === 'navbar') {
            return parent;
          }

          parent = parent.getParentWidget();
        }

        return null;
      }
    }
  });
  cv.ui.structure.AbstractBasicWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractBasicWidget.js.map?dt=1656748420180