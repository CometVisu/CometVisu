/* WidgetParser.js 
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


//noinspection JSUnusedGlobalSymbols
qx.Class.define('cv.parser.WidgetParser', {
  type: 'static',

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    __handlers: {},
    lookupM : [ 0, 2, 4, 6, 6, 6, 6, 12, 12, 12, 12, 12, 12 ],
    lookupS : [ 0, 3, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
    model: cv.data.Model.getInstance(),
    __templates: {},

    getTemplates: function () {
      return this.__templates;
    },

    addTemplate: function(name, templateData) {
      this.__templates[name] = templateData;
    },

    addHandler: function (tagName, handler) {
      this.__handlers[tagName.toLowerCase()] = handler;
    },

    getHandler: function (tagName) {
      return this.__handlers[tagName.toLowerCase()] || this.__handlers.unknown;
    },

    /**
     * Renders templates into the config file, if they are used
     * @param rootPage
     */
    renderTemplates: function (rootPage) {
      rootPage.querySelectorAll('template').forEach(function (elem) {
        const templateName = elem.getAttribute('name');
        const variables = {};
        Array.prototype.forEach.call(elem.children, function (variable) {
          variables[variable.getAttribute('name')] = variable.innerHTML;
        });

        if (Object.prototype.hasOwnProperty.call(this.__templates, templateName)) {
          const renderedString = qx.bom.Template.render(this.__templates[templateName], variables).replace('\n', '').trim();
          const helperNode = elem.ownerDocument.createElement('template');
          helperNode.innerHTML = renderedString.substring(6, renderedString.length - 7).trim();
          // replace existing element with the rendered templates child
          const replacement = helperNode.firstElementChild;
          const next = elem.nextElementSibling;
          const parent = elem.parentNode;
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
    parse: function (xml, path, flavour, pageType) {
      let tag = xml.nodeName.toLowerCase();
      if (tag === 'custom') {
        // use the child of the custom element
        xml = xml.children[0];
        tag = xml.nodeName.toLowerCase();
      }
      const parser = this.getHandler(tag);
      let result = null;
      if (parser) {
        result = parser.parse(xml, path, flavour, pageType);
      } else {
        qx.log.Logger.debug(this, 'no parse handler registered for type: '+ tag.toLowerCase());
      }
      return result;
    },

    parseBasicElement: function (element, path, flavour, pageType) {
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
    parseElement: function (handler, element, path, flavour, pageType, mappings) {
      // and fill in widget specific data
      const data = this.createDefaultWidget(handler, this.getElementType(element), element, path, flavour, pageType);
      if (mappings) {
        for (let key in mappings) {
          if (Object.prototype.hasOwnProperty.call(mappings, key)) {
            const map = mappings[key];
            let value = element.getAttribute(key);
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
    __getAttributeToPropertyMappings: function(handler) {
      return handler && handler.getAttributeToPropertyMappings ? handler.getAttributeToPropertyMappings() : {};
    },

    getElementType: function(element) {
      let type = element.nodeName.toLowerCase();
      if (type === 'img') {
        // workaround for unittests (<image> gets replaced by <img>
        type = 'image';
      }
      return type;
    },

    getDefaultClasses: function(type) {
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
    createDefaultWidget: function(handler, widgetType, element, path, flavour, pageType) {
      if (handler.createDefaultWidget) {
        return handler.createDefaultWidget(widgetType, element, path, flavour, pageType);
      }

      const layout = this.parseLayout(Array.from(element.children).filter(function (m) {
        return m.matches('layout');
      })[0]);
      const style = Object.keys(layout).length === 0 ? '' : 'style="' + this.extractLayout(layout, pageType) + '"';
      let classes = handler.getDefaultClasses ? handler.getDefaultClasses(widgetType) : this.getDefaultClasses(widgetType);
      // the group widgets align attribute is just targeting the group header and is handled by the widget itself, so we skip it here
      if (element.getAttribute('align') && widgetType !== 'group') {
        classes+=' '+element.getAttribute('align');
      }
      classes += ' ' + this.setWidgetLayout(element, path);
      if (element.getAttribute('flavour')) {
        flavour = element.getAttribute('flavour');
      }// sub design choice
      if (flavour) {
        classes += ' flavour_' + flavour;
      }
      if (element.getAttribute('class')) {
        element.getAttribute('class').split(' ').forEach(className => {
          classes += ' custom_' + className;  
        });
      }
      const label = (widgetType === 'text') ? this.parseLabel(element.querySelector('label'), flavour, '') : this.parseLabel(element.querySelector('label'), flavour);

      let bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if (element.getAttribute('bind_click_to_widget')) {
        bindClickToWidget = element.getAttribute('bind_click_to_widget') === 'true';
      }

      const data = {
        'path': path,
        '$$type': widgetType.toLowerCase(),
        'pageType': pageType
      };
      data.bindClickToWidget = bindClickToWidget;
      ['mapping', 'align', 'align'].forEach(function(prop) {
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
    parseLayout: function(layout, defaultValues) {
      const ret_val = {};

      if (!layout) {
        return ret_val;
      }

      if (undefined === defaultValues) {
        defaultValues = {};
      }
      ['x', 'y', 'width', 'height', 'scale', 'rowspan', 'colspan'].forEach(function (prop) {
        this.__extractLayoutAttribute(ret_val, prop, layout, defaultValues);
        this.__extractLayoutAttribute(ret_val, prop + '-m', layout, defaultValues);
        this.__extractLayoutAttribute(ret_val, prop + '-s', layout, defaultValues);
      }, this);
      return ret_val;
    },

    __extractLayoutAttribute: function (ret_val, property, layout, defaultValues) {
      if (layout.getAttribute(property)) {
        ret_val[property] = layout.getAttribute(property);
      } else if (defaultValues[property]) {
        ret_val[property] = defaultValues[property];
      }
    },

    extractLayout: function(layout, pageType) {
      let ret_val = (pageType === '2d') ? 'position:absolute;' : '';
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

    extractLayout3d: function(layout) {
      const ret_val = {};
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

    parseLabel: function(label, flavour, labelClass, style) {
      return cv.Application.structureController.parseLabel(label, flavour, labelClass, style);
    },

    /**
     * this function implements all widget layouts that are identical (JNK)
     * implemented: rowspan, colspan
     *
     * @param element {Element} XML-Element from the config file for this widget
     * @param path {String}
     * @return {String} rowspan class or empty string
     */
    setWidgetLayout: function(element, path) {
      const elementData = this.model.getWidgetData(path);
      const layout = Array.from(element.children).filter(function (m) {
        return m.matches('layout');
      })[0];
      let ret_val = '';
      let rowspan = null;

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
    parseFormat: function (xml, path) {
      const data = this.model.getWidgetData(path);
      const value = xml.getAttribute('format');
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
    parseAddress: function (xml, path, makeAddressListFn) {
      if (xml.nodeName.toLowerCase() !== 'page') {
        const data = this.model.getWidgetData(path);
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
    makeAddressList: function (element, id, makeAddressListFn, skipAdding) {
      let address = {};
      element.querySelectorAll('address').forEach(function (elem) {
        let
          src = elem.textContent;
          let transform = elem.getAttribute('transform');
          let addressInfo = {};
          let formatPos = +(elem.getAttribute('format-pos') || 1) | 0; // force integer
          let mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite

        if (cv.Config.backend === 'mqtt') {
          addressInfo.qos = (elem.getAttribute('qos') || 0) | 0; // force integer
          addressInfo.retain = elem.getAttribute('retain') === 'true';
        }

        if ((!src) || (!transform)) { // fix broken address-entries in config
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
        let variantInfo = makeAddressListFn ? makeAddressListFn(src, transform, mode, elem.getAttribute('variant')) : [true, undefined];
        if (!skipAdding && (mode & 1) && variantInfo[0]) { // add only addresses when reading from them
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

    parseRefresh: function (xml, path, doCacheControl) {
      const data = this.model.getWidgetData(path);
      data.refresh = xml.getAttribute('refresh') ? parseInt(xml.getAttribute('refresh')) * 1000 : 0;
      if (doCacheControl) {
        data.cachecontrol = (function(x) {
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
        })(xml.getAttribute('cachecontrol'));
      }
    },

    parseStyling: function (xml, path) {
      const data = this.model.getWidgetData(path);
      data.styling = xml.getAttribute('styling');
    },

    // this might have been called from the cv.parser.WidgetParser with the including class as context
    parseChildren: function (xml, path, flavour, pageType) {
      const data = this.model.getWidgetData(this.getStoragePath(xml, path));

      if (!data.children) {
        data.children = [];
      }
      const childs = Array.from(xml.children).filter(function (child) {
        return ['layout', 'label', 'address'].indexOf(child.nodeName.toLowerCase()) === -1;
      }, this);
      childs.forEach(function (child, idx) {
        const childData = cv.parser.WidgetParser.parse(child, path + '_' + idx, flavour, pageType);
        if (childData) {
          if (Array.isArray(childData)) {
            let i = 0;
            const l = childData.length;
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
    getStoragePath: function (xml, path) {
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
