/* Reflection.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Reflection API for possible Editor communication
 */
qx.Class.define('cv.io.Reflection', {
  extend: qx.core.Object,
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Function to test if the path is in a valid form.
     * Note: it doesn't check if it exists!
     */
    pathRegEx : /^id(_[0-9]+)+$/,

    /**
     * Return a list of all widgets.
     */
    list: function () {
      var widgetTree = {};
      qx.bom.Selector.query('.page').forEach(function (elem) {
        var id = qx.bom.element.Attribute.get(elem, "id").split('_');
        var thisEntry = widgetTree;
        if ('id' === id.shift()) {
          var thisNumber;
          while (thisNumber = id.shift()) { // jshint ignore:line
            if (!(thisNumber in thisEntry)) {
              thisEntry[thisNumber] = {};
            }
            thisEntry = thisEntry[thisNumber];
          }
          qx.bom.Selector.matches('div.widget_container', qx.dom.Hierarchy.getDescendants(elem)).forEach(function(widget, i) {
            if (undefined === thisEntry[i]) {
              thisEntry[i] = {};
            }
            thisEntry[i].name = widget.classname;
            thisEntry[i].type = widget.get$$type();
          });
        }
      });
      return widgetTree;
    },

    /**
     * Return all attributes of a widget.
     */
    read: function (path) {
      var widget = this.lookupWidget(path),
        data = qx.lang.Object.mergeWith({}, cv.data.Model.getInstance().getWidgetDataByElement(widget)); // copy
      delete data.basicvalue;
      delete data.value;
      return data;
    },

    /**
     * Set the selection state of a widget.
     */
    select: function (path, state) {
      var container = this.lookupWidget(path);
      if (state) {
        qx.bom.element.Class.set(container, 'selected');
      }
      else {
        qx.bom.element.Class.remove(container, 'selected');
      }
    },

    /**
     * Set all attributes of a widget.
     */
    write: function (path, attributes) {
      qx.bom.element.Dataset.setData(qx.dom.Hierarchy.getChildElements(this.lookupWidget(path))[0], attributes);
    },

    /**
     * Reflection API: communication
     * Handle messages that might be sent by the editor
     */
    handleMessage: function (event) {
      // prevend bad or even illegal requests
      if (event.origin !== window.location.origin ||
        'object' !== typeof event.data || !('command' in event.data ) || !('parameters' in event.data )) {
        return;
      }
      var answer = 'bad command',
        parameters = event.data.parameters;

      // note: as the commands are from external, we have to be a bit more
      //       carefull for corectness testing
      switch (event.data.command) {
        case 'create':
          if ('object' === typeof parameters && this.pathRegEx.test(parameters.path) &&
              'string' === typeof parameters.element ) {
            answer = this.create(parameters.path, parameters.element);
          } else {
            answer = 'bad path or element';
          }
          break;

        case 'delete':
          if (this.pathRegEx.test(parameters)) {
            answer = this.deleteCommand(parameters);
          } else {
            answer = 'bad path';
          }
          break;

        case 'focus':
          if (this.pathRegEx.test(parameters)) {
            answer = this.focus(parameters);
          } else {
            answer = 'bad path';
          }
          break;

        case 'list':
          answer = this.list();
          break;

        case 'read':
          if (this.pathRegEx.test(parameters)) {
            answer = this.read(parameters);
          } else {
            answer = 'bad path';
          }
          break;

        case 'select':
          if ('object' === typeof parameters && this.pathRegEx.test(parameters.path) && 'boolean' === typeof parameters.state) {
            answer = this.select(parameters.path, parameters.state);
          }
          break;

        case 'write':
          if ('object' === typeof parameters && this.pathRegEx.test(parameters.path) &&
              'object' === typeof parameters.attributes ) {
            answer = this.write(parameters.path, parameters.attributes);
          }
          break;
      }

      event.source.postMessage(answer, event.origin);
    },

    // tools for widget handling
    /**
     * Return a widget (to be precise: the widget_container) for the given path
     */
    lookupWidget: function (path) {
      return qx.bom.Selector.query('.page#' + path)[0];
    },

    getParentPage: function (page) {
      if (0 === page.length) { return null; }

      return this.getParentPageById(qx.bom.element.Attribute.get(page, 'id'), true);
    },

    getParentPageById: function (path, isPageId) {
      if (0 < path.length) {
        var pathParts = path.split('_');
        if (isPageId) { pathParts.pop(); }
        while (pathParts.length > 1) {
          pathParts.pop();
          path = pathParts.join('_') + '_';
          var page = qx.bom.Selector.query('#' + path)[0];
          if (qx.bom.element.Class.has(page, "page")) {
            return page;
          }
        }
      }
      return null;
    },

    /**
     * Create a new widget.
     */
    create: function (path, element) {
      return "created widget '" + path + "': '" + element + "'";
    },

    /**
     * Delete an existing path, i.e. widget, group or even page - including
     * child elements.
     */
    deleteCommand: function (path) {
      this.debug(this.lookupWidget(path), qx.bom.Selector.query('#' + path)[0]);
      //this.lookupWidget( path ).remove();
      return "deleted widget '" + path + "'";
    },

    /**
     * Focus a widget.
     */
    focus: function (path) {
      qx.bom.element.Class.remove(qx.bom.Selector.query('.focused')[0], 'focused');
      qx.bom.element.Class.add(this.lookupWidget(path), 'focused');
    }
  },

  defer: function() {
    window.addEventListener('message', cv.io.Reflection.handleMessage, false);
  }
});