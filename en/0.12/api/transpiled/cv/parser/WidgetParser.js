(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.data.Model": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Template": {},
      "qx.log.Logger": {},
      "cv.TemplateEngine": {},
      "cv.IconHandler": {},
      "qx.xml.Element": {},
      "cv.ui.layout.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* WidgetParser.js 
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
  //noinspection JSUnusedGlobalSymbols
  qx.Class.define('cv.parser.WidgetParser', {
    type: 'static',

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      __P_7_0: {},
      lookupM: [0, 2, 4, 6, 6, 6, 6, 12, 12, 12, 12, 12, 12],
      lookupS: [0, 3, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
      model: cv.data.Model.getInstance(),
      __P_7_1: {},
      getTemplates: function getTemplates() {
        return this.__P_7_1;
      },
      addTemplate: function addTemplate(name, templateData) {
        this.__P_7_1[name] = templateData;
      },
      addHandler: function addHandler(tagName, handler) {
        this.__P_7_0[tagName.toLowerCase()] = handler;
      },
      getHandler: function getHandler(tagName) {
        return this.__P_7_0[tagName.toLowerCase()] || this.__P_7_0.unknown;
      },

      /**
       * Renders templates into the config file, if they are used
       * @param rootPage
       */
      renderTemplates: function renderTemplates(rootPage) {
        rootPage.querySelectorAll('template').forEach(function (elem) {
          var templateName = elem.getAttribute('name');
          var variables = {};
          Array.prototype.forEach.call(elem.children, function (variable) {
            variables[variable.getAttribute('name')] = variable.innerHTML;
          });

          if (Object.prototype.hasOwnProperty.call(this.__P_7_1, templateName)) {
            var renderedString = qx.bom.Template.render(this.__P_7_1[templateName], variables).replace('\n', '').trim();
            var helperNode = elem.ownerDocument.createElement('template');
            helperNode.innerHTML = renderedString.substring(6, renderedString.length - 7).trim(); // replace existing element with the rendered templates child

            var replacement = helperNode.firstElementChild;
            var next = elem.nextElementSibling;
            var parent = elem.parentNode;
            parent.replaceChild(replacement, elem);

            while (helperNode.children.length > 0) {
              // append the rest
              parent.insertBefore(helperNode.children[0], next);
            }
          }
        }, this);
      },

      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       * @return {Map} widget data
       */
      parse: function parse(xml, path, flavour, pageType) {
        var tag = xml.nodeName.toLowerCase();

        if (tag === 'custom') {
          // use the child of the custom element
          xml = xml.children[0];
          tag = xml.nodeName.toLowerCase();
        }

        var parser = this.getHandler(tag);
        var result = null;

        if (parser) {
          result = parser.parse(xml, path, flavour, pageType);
        } else {
          qx.log.Logger.debug(this, 'no parse handler registered for type: ' + tag.toLowerCase());
        }

        return result;
      },
      parseBasicElement: function parseBasicElement(element, path, flavour, pageType) {
        return this.model.setWidgetData(path, {
          'path': path,
          '$$type': cv.parser.WidgetParser.getElementType(element),
          'pageType': pageType
        });
      },

      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       * @param handler {Class} Handler class that parses this element
       * @param element {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       * @param mappings
       * @return {Map} HTML code
       */
      parseElement: function parseElement(handler, element, path, flavour, pageType, mappings) {
        // and fill in widget specific data
        var data = this.createDefaultWidget(handler, this.getElementType(element), element, path, flavour, pageType);

        if (mappings) {
          for (var key in mappings) {
            if (Object.prototype.hasOwnProperty.call(mappings, key)) {
              var map = mappings[key];
              var value = element.getAttribute(key);

              if (map['default'] !== undefined && (value === undefined || value === null)) {
                value = map['default'];
              }

              if (map.transform) {
                value = map.transform(value);
              }

              data[map.target || key] = value;
            }
          }
        }

        this.parseStyling(element, path);
        return data;
      },

      /**
       * Get the mappings needed for parsing from the handler
       *
       * @param handler {Class} parser handler
       * @return {Map} parser configuration: describes how Attributes are mapped to properties
       */
      __P_7_2: function __P_7_2(handler) {
        return handler && handler.getAttributeToPropertyMappings ? handler.getAttributeToPropertyMappings() : {};
      },
      getElementType: function getElementType(element) {
        var type = element.nodeName.toLowerCase();

        if (type === 'img') {
          // workaround for unittests (<image> gets replaced by <img>
          type = 'image';
        }

        return type;
      },
      getDefaultClasses: function getDefaultClasses(type) {
        return 'widget clearfix ' + type.toLowerCase();
      },

      /**
       * Create a default widget to be filled by the creator afterwards.
       * Note: the receiver of the returned string must add an </div> closing element!
       *
       * @param handler {cv.parser.widgets} the parser that can parse this element
       * @param widgetType {String} of the widget type
       * @param element   {Object} the XML element
       * @param path       {String} of the path ID
       * @param flavour   {String} Flavour
       * @param pageType  {String} one of text, 2d and 3d
       * @return {Map} parsed widget data
       */
      createDefaultWidget: function createDefaultWidget(handler, widgetType, element, path, flavour, pageType) {
        if (handler.createDefaultWidget) {
          return handler.createDefaultWidget(widgetType, element, path, flavour, pageType);
        }

        var layout = this.parseLayout(Array.from(element.children).filter(function (m) {
          return m.matches('layout');
        })[0]);
        var style = Object.keys(layout).length === 0 ? '' : 'style="' + this.extractLayout(layout, pageType) + '"';
        var classes = handler.getDefaultClasses ? handler.getDefaultClasses(widgetType) : this.getDefaultClasses(widgetType); // the group widgets align attribute is just targeting the group header and is handled by the widget itself, so we skip it here

        if (element.getAttribute('align') && widgetType !== 'group') {
          classes += ' ' + element.getAttribute('align');
        }

        classes += ' ' + this.setWidgetLayout(element, path);

        if (element.getAttribute('flavour')) {
          flavour = element.getAttribute('flavour');
        } // sub design choice


        if (flavour) {
          classes += ' flavour_' + flavour;
        }

        if (element.getAttribute('class')) {
          element.getAttribute('class').split(' ').forEach(function (className) {
            classes += ' custom_' + className;
          });
        }

        var label = widgetType === 'text' ? this.parseLabel(element.querySelector('label'), flavour, '') : this.parseLabel(element.querySelector('label'), flavour);
        var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;

        if (element.getAttribute('bind_click_to_widget')) {
          bindClickToWidget = element.getAttribute('bind_click_to_widget') === 'true';
        }

        var data = {
          'path': path,
          '$$type': widgetType.toLowerCase(),
          'pageType': pageType
        };
        data.bindClickToWidget = bindClickToWidget;
        ['mapping', 'align', 'align'].forEach(function (prop) {
          data[prop] = element.getAttribute(prop) || null;
        }, this);
        data.layout = layout || null;
        data.label = label || '';
        data.classes = classes || '';
        data.style = style || '';
        data.responsive = !!Object.keys(layout).find(function (prop) {
          return prop.endsWith('-m') || prop.endsWith('-s');
        });
        return this.model.setWidgetData(path, data);
      },

      /**
       * Parse config file layout element and convert it to an object
       *
       * @param layout {Element} XML config element &lt;layout&gt;
       * @param defaultValues {Map} default layout values
       * @return {Map}
       */
      parseLayout: function parseLayout(layout, defaultValues) {
        var ret_val = {};

        if (!layout) {
          return ret_val;
        }

        if (undefined === defaultValues) {
          defaultValues = {};
        }

        ['x', 'y', 'width', 'height', 'scale', 'rowspan', 'colspan'].forEach(function (prop) {
          this.__P_7_3(ret_val, prop, layout, defaultValues);

          this.__P_7_3(ret_val, prop + '-m', layout, defaultValues);

          this.__P_7_3(ret_val, prop + '-s', layout, defaultValues);
        }, this);
        return ret_val;
      },
      __P_7_3: function __P_7_3(ret_val, property, layout, defaultValues) {
        if (layout.getAttribute(property)) {
          ret_val[property] = layout.getAttribute(property);
        } else if (defaultValues[property]) {
          ret_val[property] = defaultValues[property];
        }
      },
      extractLayout: function extractLayout(layout, pageType) {
        var ret_val = pageType === '2d' ? 'position:absolute;' : '';

        if (layout.x) {
          ret_val += 'left:' + layout.x + ';';
        }

        if (layout.y) {
          ret_val += 'top:' + layout.y + ';';
        }

        if (layout.width) {
          ret_val += 'width:' + layout.width + ';';
        }

        if (layout.height) {
          ret_val += 'height:' + layout.height + ';';
        }

        return ret_val;
      },
      extractLayout3d: function extractLayout3d(layout) {
        var ret_val = {};

        if (layout.getAttribute('x')) {
          ret_val.x = layout.getAttribute('x');
        }

        if (layout.getAttribute('y')) {
          ret_val.y = layout.getAttribute('y');
        }

        if (layout.getAttribute('z')) {
          ret_val.z = layout.getAttribute('z');
        }

        if (layout.getAttribute('floor')) {
          ret_val.floor = layout.getAttribute('floor');
        }

        if (layout.getAttribute('floorFilter')) {
          ret_val.floorFilter = layout.getAttribute('floorFilter');
        }

        if (layout.getAttribute('roomFilter')) {
          ret_val.roomFilter = layout.getAttribute('roomFilter');
        }

        return ret_val;
      },
      parseLabel: function parseLabel(label, flavour, labelClass, style) {
        if (!label) {
          return '';
        }

        var ret_val = '<div class="' + (labelClass !== undefined ? labelClass : 'label') + '"' + (style ? ' style="' + style + '"' : '') + '>';
        Array.prototype.forEach.call(label.childNodes, function (elem) {
          if (elem.nodeType === Node.ELEMENT_NODE && elem.nodeName.toLowerCase() === 'icon') {
            ret_val += cv.IconHandler.getInstance().getIconElement(elem.getAttribute('name'), elem.getAttribute('type'), elem.getAttribute('flavour') || flavour, elem.getAttribute('color'), elem.getAttribute('styling'), '', true);
          } else if (elem.nodeType === Node.TEXT_NODE) {
            ret_val += elem.textContent;
          }
        });
        return ret_val + '</div>';
      },

      /**
       * this function implements all widget layouts that are identical (JNK)
       * implemented: rowspan, colspan
       *
       * @param element {Element} XML-Element from the config file for this widget
       * @param path {String}
       * @return {String} rowspan class or empty string
       */
      setWidgetLayout: function setWidgetLayout(element, path) {
        var elementData = this.model.getWidgetData(path);
        var layout = Array.from(element.children).filter(function (m) {
          return m.matches('layout');
        })[0];
        var ret_val = '';
        var rowspan = null;

        if (layout) {
          elementData.colspan = qx.xml.Element.getAttributeNS(layout, '', 'colspan');
          elementData.colspanM = qx.xml.Element.getAttributeNS(layout, '', 'colspan-m');
          elementData.colspanS = qx.xml.Element.getAttributeNS(layout, '', 'colspan-s');
          rowspan = qx.xml.Element.getAttributeNS(layout, '', 'rowspan');
        }

        elementData.colspan = parseFloat(elementData.colspan || document.querySelector('head').dataset['colspanDefault'] || 6);
        elementData.colspanM = parseFloat(elementData.colspanM || cv.parser.WidgetParser.lookupM[Math.floor(elementData.colspan)] || elementData.colspan);
        elementData.colspanS = parseFloat(elementData.colspanS || cv.parser.WidgetParser.lookupS[Math.floor(elementData.colspan)] || elementData.colspan);

        if (rowspan) {
          elementData.rowspanClass = cv.ui.layout.Manager.rowspanClass(parseFloat(rowspan || 1));
          ret_val = 'innerrowspan';
        }

        return ret_val;
      },

      /**
       * Parse the format setting
       * @param xml {Element} XML-Element from config
       * @param path {String} path to the widget
       */
      parseFormat: function parseFormat(xml, path) {
        var data = this.model.getWidgetData(path);
        var value = xml.getAttribute('format');

        if (value) {
          data.format = value;
        }
      },

      /**
       * Parses the address element
       * @param xml {Element} address XML-Element from config
       * @param path {String} path to the widget
       * @param makeAddressListFn {Function?} callback for parsing address variants
       */
      parseAddress: function parseAddress(xml, path, makeAddressListFn) {
        if (xml.nodeName.toLowerCase() !== 'page') {
          var data = this.model.getWidgetData(path);
          data.address = cv.parser.WidgetParser.makeAddressList(xml, path, makeAddressListFn);
        }
      },

      /**
       * this function extracts all addresses with attributes (JNK)
       *                       elements. The first is a boolean that determins if
       *                       the visu should listen for that address. The second
       *                       is added as it is to the returned object.
       *
       * @param element {Element} address XML-Element from the config file
       * @param id {String} id / path to the widget
       * @param makeAddressListFn {Function?} callback for parsing address variants
       * @param skipAdding {Boolean?} do not add address to model if true
       * @return {Object} address
       */
      makeAddressList: function makeAddressList(element, id, makeAddressListFn, skipAdding) {
        var address = {};
        element.querySelectorAll('address').forEach(function (elem) {
          var src = elem.textContent;
          var transform = elem.getAttribute('transform');
          var addressInfo = {};
          var formatPos = +(elem.getAttribute('format-pos') || 1) | 0; // force integer

          var mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite

          addressInfo.selector = elem.getAttribute('selector');
          addressInfo.ignoreError = elem.getAttribute('ignore-error') === 'true';
          addressInfo.qos = (elem.getAttribute('qos') || 0) | 0; // force integer

          addressInfo.retain = elem.getAttribute('retain') === 'true';

          if (!src || !transform) {
            // fix broken address-entries in config
            qx.log.Logger.error(this, 'Either address or transform is missing in address element %1', element.outerHTML);
            return;
          }

          switch (elem.getAttribute('mode')) {
            case 'disable':
              mode = 0;
              break;

            case 'read':
              mode = 1;
              break;

            case 'write':
              mode = 2;
              break;

            case 'readwrite':
              mode = 1 | 2;
              break;
          }

          var variantInfo = makeAddressListFn ? makeAddressListFn(src, transform, mode, elem.getAttribute('variant')) : [true, undefined];

          if (!skipAdding && mode & 1 && variantInfo[0]) {
            // add only addresses when reading from them
            this.model.addAddress(src, id);
          }

          if (address[src]) {
            // we already have an entry for this address, merge the modes if the other attribute values are equal
            if (address[src].transform === transform && address[src].variantInfo === variantInfo[1] && address[src].formatPos === formatPos) {
              mode |= address[src].mode;
            } else {
              qx.log.Logger.error(this, 'multiple address entries with different configuration:', address[src], [transform, mode, variantInfo[1], formatPos], 'they are only allowed to differ in mode');
            }
          }

          addressInfo.transform = transform;
          addressInfo.mode = mode;
          addressInfo.variantInfo = variantInfo[1];
          addressInfo.formatPos = formatPos;
          address[src] = addressInfo;
        }, this);
        return address;
      },
      parseRefresh: function parseRefresh(xml, path, doCacheControl) {
        var data = this.model.getWidgetData(path);
        data.refresh = xml.getAttribute('refresh') ? parseInt(xml.getAttribute('refresh')) * 1000 : 0;

        if (doCacheControl) {
          data.cachecontrol = function (x) {
            switch (x) {
              case 'full':
              case 'force':
              case 'weak':
              case 'none':
                return x;

              case 'false':
                return 'none';

              case 'true':
              default:
                return 'full';
            }
          }(xml.getAttribute('cachecontrol'));
        }
      },
      parseStyling: function parseStyling(xml, path) {
        var data = this.model.getWidgetData(path);
        data.styling = xml.getAttribute('styling');
      },
      // this might have been called from the cv.parser.WidgetParser with the including class as context
      parseChildren: function parseChildren(xml, path, flavour, pageType) {
        var data = this.model.getWidgetData(this.getStoragePath(xml, path));

        if (!data.children) {
          data.children = [];
        }

        var childs = Array.from(xml.children).filter(function (child) {
          return ['layout', 'label', 'address'].indexOf(child.nodeName.toLowerCase()) === -1;
        }, this);
        childs.forEach(function (child, idx) {
          var childData = cv.parser.WidgetParser.parse(child, path + '_' + idx, flavour, pageType);

          if (childData) {
            if (Array.isArray(childData)) {
              var i = 0;
              var l = childData.length;

              for (; i < l; i++) {
                data.children.push(childData[i].path);
              }
            } else if (childData.path) {
              data.children.push(childData.path);
            }
          }
        }, this);
        return data;
      },

      /**
       * Returns the path where the widget data is stored, usually this is the same path, but there are
       * exceptions for pages which are handled here
       *
       * @param xml {Element} widgets XML config element
       * @param path {String} internal widget path e.g. id_0_2
       */
      getStoragePath: function getStoragePath(xml, path) {
        if (xml.length === 1) {
          xml = xml[0];
        }

        switch (xml.nodeName.toLowerCase()) {
          case 'page':
            return path + '_';

          default:
            return path;
        }
      }
    }
  });
  cv.parser.WidgetParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetParser.js.map?dt=1650122767426