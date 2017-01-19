/* Parser.js 
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


qx.Class.define('cv.xml.Parser', {

  type: "static",

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    __handlers: {},
    __hooks: {
      before: {},
      after: {}
    },
    lookupM : [ 0, 2, 4,  6,  6,  6,  6, 12, 12, 12, 12, 12, 12 ],
    lookupS : [ 0, 3, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],

    addHandler: function (tagName, handler) {
      this.__handlers[tagName.toLowerCase()] = handler;
      this.__applyHooks(tagName, handler);
    },

    /**
     * Traverse through the handlers includes and its superclasses + their includes to add parsing hooks
     * @private
     */
    __applyHooks: function(tagName, clazz) {
      // add include parse hooks
      this.__applyIncludeHooks(tagName, clazz);

      if (clazz.superclass) {
        var parentClass = clazz.superclass;
        while (parentClass && parentClass.classname !== "qx.core.Object") {
          if (parentClass.parse) {
            this.addHook(tagName, "before", parentClass.parse, clazz);
          }
          this.__applyIncludeHooks(tagName, parentClass);
          parentClass = parentClass.superclass;
        }
      }
    },

    __applyIncludeHooks: function(tagName, clazz) {
      if (clazz.$$flatIncludes) {
        // check for parse hooks in includes
        clazz.$$flatIncludes.forEach(function (mixin) {
          if (mixin.parse) {
            this.addHook(tagName, "after", mixin.parse, clazz);
          }
        }, this);
      }
    },

    getHandler: function (tagName) {
      return this.__handlers[tagName.toLowerCase()] || this.__handlers['unknown'];
    },

    addHook: function(tagname, type, callback, context) {
      type = type || "after";
      if (!this.__hooks[type][tagname]) {
        this.__hooks[type][tagname] = [];
      }
      this.__hooks[type][tagname].push([callback, context]);
    },

    getHooks: function(type, tagname) {
      return this.__hooks[type][tagname] || [];
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
      var parser = this.getHandler(xml.nodeName);
      var result = null;
      if (parser) {
        this.getHooks("before", xml.nodeName.toLowerCase()).forEach(function(entry) {
          entry[0].call(entry[1] || this, xml, path, flavour, pageType);
        }, this);
        if (parser.parse) {
          result = parser.parse(xml, path, flavour, pageType);
        } else {
          result = this.__parse(parser, xml, path, flavour, pageType);
        }
        this.getHooks("after", xml.nodeName.toLowerCase()).forEach(function(entry) {
          entry[0].call(entry[1] || this, xml, path, flavour, pageType);
        }, this);
      } else {
        qx.log.Logger.debug("no parse handler registered for type: "+ xml.nodeName.toLowerCase());
      }
      return result;
    },

    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param handler {Class} Handler class that parses this element
     * @param element {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     * @return {Map} HTML code
     */
    __parse: function (handler, element, path, flavour, pageType) {
      // and fill in widget specific data
      var data = this.createDefaultWidget(handler, this.getElementType(element), element, path, flavour, pageType);
      var mappings = this.__getAttributeToPropertyMappings(handler);
      if (mappings) {
        for (var key in mappings) {
          if (mappings.hasOwnProperty(key)) {
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
      return data;
    },

    /**
     * Get the mappings needed for parsing from the handler
     *
     * @param handler {Class} parser handler
     * @return {Map} parser configuration: describes how Attributes are mapped to properties
     * @private
     */
    __getAttributeToPropertyMappings: function(handler) {
      return handler && handler.getAttributeToPropertyMappings ? handler.getAttributeToPropertyMappings() : {};
    },

    getElementType: function(element) {
      var type = element.nodeName.toLowerCase();
      if (type == "img") {
        // workaround for unittests (<image> gets replaced by <img>
        type = "image";
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
      // var clazz = qx.Class.getByName(handler.classname);
      // var properties = qx.Class.getProperties(clazz);

      var layout = this.parseLayout( qx.bom.Selector.matches('layout', qx.dom.Hierarchy.getChildElements(element))[0] );
      var style = qx.lang.Object.isEmpty(layout) ? '' : 'style="' + this.extractLayout( layout, pageType ) + '"';
      var classes = handler.getDefaultClasses ? handler.getDefaultClasses(widgetType) : this.getDefaultClasses(widgetType);
      if ( qx.bom.element.Attribute.get(element, 'align') ) {
        classes+=" "+qx.bom.element.Attribute.get(element, 'align') ;
      }
      // if (qx.lang.Array.contains(properties, "colspan")) {
        classes += ' ' + this.setWidgetLayout(element, path);
      // }
      if( qx.bom.element.Attribute.get(element, 'flavour') ) flavour = qx.bom.element.Attribute.get(element, 'flavour');// sub design choice
      if( flavour ) classes += ' flavour_' + flavour;
      if (qx.bom.element.Attribute.get(element, 'class')) classes += ' custom_' + qx.bom.element.Attribute.get(element, 'class');
      var label = (pageType==='text') ? this.extractLabel( qx.bom.Selector.query("label", element)[0], flavour, '' ) : this.extractLabel( qx.bom.Selector.query("label", element)[0], flavour );

      var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if (qx.bom.element.Attribute.get(element, "bind_click_to_widget")) bindClickToWidget = qx.bom.element.Attribute.get(element, "bind_click_to_widget")=="true";

      var data = {
        'path'    : path,
        '$$type'  : widgetType.toLowerCase(),
        'pageType': pageType
      };
      // if (qx.lang.Array.contains(properties, "bindClickToWidget")) {
        data.bindClickToWidget = bindClickToWidget;
      // }
      ['mapping', 'align', 'align'].forEach(function(prop) {
        // if (qx.lang.Array.contains(properties, prop)) {
          data[prop] = qx.bom.element.Attribute.get(element, prop) || null;
        // }
      }, this);

      // if (qx.lang.Array.contains(properties, "layout")) {
        data.layout = layout || null;
      // }
      // if (qx.lang.Array.contains(properties, "label")) {
        data.label = label || '';
      // }
      // if (qx.lang.Array.contains(properties, "classes")) {
        data.classes = classes || '';
      // }
      // if (qx.lang.Array.contains(properties, "style")) {
        data.style = style || '';
      // }

      return cv.data.Model.getInstance().setWidgetData( path, data);
    },

    /**
     * Parse config file layout element and convert it to an object
     *
     * @param layout
     * @param defaultValues
     * @return {Map}
     */
    parseLayout: function( layout, defaultValues )
    {
      var ret_val = {};

      if( !layout )
        return ret_val;

      if( undefined === defaultValues ) defaultValues = {};
      if( layout.getAttribute('x'     ) ) ret_val.x      = layout.getAttribute('x'     );
      else if( defaultValues.x          ) ret_val.x      = defaultValues.x;

      if( layout.getAttribute('y'     ) ) ret_val.y      = layout.getAttribute('y'     );
      else if( defaultValues.y          ) ret_val.y      = defaultValues.y;

      if( layout.getAttribute('width' ) ) ret_val.width  = layout.getAttribute('width' );
      else if( defaultValues.width      ) ret_val.width  = defaultValues.width;

      if( layout.getAttribute('height') ) ret_val.height = layout.getAttribute('height');
      else if( defaultValues.height     ) ret_val.height = defaultValues.height;

      return ret_val;
    },

    extractLayout: function( layout, pageType )
    {

      var ret_val = (pageType == '2d') ? 'position:absolute;' : '';
      if( layout.x      ) ret_val += 'left:'   + layout.x      + ';';
      if( layout.y      ) ret_val += 'top:'    + layout.y      + ';';
      if( layout.width  ) ret_val += 'width:'  + layout.width  + ';';
      if( layout.height ) ret_val += 'height:' + layout.height + ';';

      return ret_val;
    },

    extractLayout3d: function( layout )
    {
      var ret_val = {};
      if( layout.getAttribute('x'    ) ) ret_val.x     = layout.getAttribute('x'    );
      if( layout.getAttribute('y'    ) ) ret_val.y     = layout.getAttribute('y'    );
      if( layout.getAttribute('z'    ) ) ret_val.z     = layout.getAttribute('z'    );
      if( layout.getAttribute('floor') ) ret_val.floor = layout.getAttribute('floor');
      if( layout.getAttribute('floorFilter') ) ret_val.floorFilter = layout.getAttribute('floorFilter');
      if( layout.getAttribute('roomFilter')  ) ret_val.roomFilter  = layout.getAttribute('roomFilter' );
      return ret_val;
    },

    extractLabel: function( label, flavour, labelClass, style )
    {
      if( !label ) return '';

      var ret_val = '<div class="' + (!labelClass ? 'label' : labelClass) + '"'
        + ( style ? (' style="' + style + '"') : '' ) + '>';

      label.childNodes.forEach(function(elem) {
        if( qx.dom.Node.isNodeName(elem, 'icon') ) {
          ret_val += cv.IconHandler.getInstance().getIconText(
            qx.bom.element.Attribute.get(elem, 'name'),
            qx.bom.element.Attribute.get(elem, 'type'),
            qx.bom.element.Attribute.get(elem, 'flavour') || flavour,
            qx.bom.element.Attribute.get(elem, 'color'),
            qx.bom.element.Attribute.get(elem, 'styling') );
        } else {
          ret_val += elem.textContent;
        }
      });
      return ret_val + '</div>';
    },

    /**
     * this function implements all widget layouts that are identical (JNK)
     * implemented: rowspan, colspan
     *
     * @param page {Element} XML-Element from the config file for this widget
     * @param path {String}
     * @return {String} rowspan class or empty string
     */
    setWidgetLayout: function( page, path ) {
      var
        elementData = cv.data.Model.getInstance().getWidgetData( path ),
        layout      = qx.bom.Selector.query("layout", page)[0],
        ret_val = '',
        rowspan = null;

      if (layout) {
        elementData.colspan = qx.xml.Element.getAttributeNS(layout, '', 'colspan');
        elementData.colspanM = qx.xml.Element.getAttributeNS(layout, '', 'colspan-m');
        elementData.colspanS = qx.xml.Element.getAttributeNS(layout, '', 'colspan-s');
        rowspan = qx.xml.Element.getAttributeNS(layout, '', 'rowspan');
      }
      elementData.colspan = parseFloat(elementData.colspan || qx.bom.element.Dataset.get(qx.bom.Selector.query('head')[0], 'colspanDefault') || 6);
      elementData.colspanM = parseFloat(elementData.colspanM || cv.xml.Parser.lookupM[Math.floor(elementData.colspan)] || elementData.colspan);
      elementData.colspanS = parseFloat(elementData.colspanS || cv.xml.Parser.lookupS[Math.floor(elementData.colspan)] || elementData.colspan);

      if (rowspan) {
        elementData.rowspanClass = cv.layout.Manager.rowspanClass(parseFloat(rowspan || 1));
        ret_val = 'innerrowspan';
      }
      return ret_val;
    }
  }
});