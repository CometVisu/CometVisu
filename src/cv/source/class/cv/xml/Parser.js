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

    addHandler: function (tagName, handler) {
      this.__handlers[tagName.toLowerCase()] = handler;
    },

    getHandler: function (tagName) {
      return this.__handlers[tagName.toLowerCase()];
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
        // console.error("no parse handler registered for type: %s", xml.nodeName.toLowerCase());
        parser = this.getHandler("unknown");
        result = this.__parse(parser, xml, path, flavour, pageType);
      }
      return result;
    },

    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @method create
     * @param {Element} element - XML-Element
     * @param {String} path - internal path of the widget
     * @param {String} flavour - Flavour of the widget
     * @param {String} pageType - Page type (2d, 3d, ...)
     * @return {String} HTML code
     */
    __parse: function (handler, element, path, flavour, pageType) {
      var $e = $(element);

      // and fill in widget specific data
      var data = this.createDefaultWidget(this.getElementType(element), $e, path, flavour, pageType);
      var mappings = this.__getAttributeToPropertyMappings(handler);
      if (mappings) {
        for (var key in mappings) {
          if (mappings.hasOwnProperty(key)) {
            var map = mappings[key];
            var value = $e.attr(key);
            if (map['default'] !== undefined && value === undefined) {
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

    __getAttributeToPropertyMappings: function(handler) {
      var mappings = handler && handler.getAttributeToPropertyMappings ? handler.getAttributeToPropertyMappings() : {};
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
     * Note: the reciever of the returned string must add an </div> closing element!
     * @method createDefaultWidget
     * @param widgetType {String} of the widget type
     * @param $element   {Object} the XML element
     * @param path       {String} of the path ID
     * @param flavour
     * @param pageType
     * @return ret_val
     */
    createDefaultWidget: function( widgetType, $element, path, flavour, pageType ) {
      var layout = this.parseLayout( $element.children('layout')[0] );
      var style = $.isEmptyObject(layout) ? '' : 'style="' + this.extractLayout( layout, pageType ) + '"';
      var classes = this.getDefaultClasses(widgetType);
      if ( $element.attr('align') ) {
        classes+=" "+$element.attr('align');
      }
      classes += ' ' + this.setWidgetLayout( $element, path );
      if( $element.attr('flavour') ) flavour = $element.attr('flavour');// sub design choice
      if( flavour ) classes += ' flavour_' + flavour;
      if ($element.attr('class')) classes += ' custom_' + $element.attr('class');
      var label = (pageType==='text') ? this.extractLabel( $element.find('label')[0], flavour, '' ) : this.extractLabel( $element.find('label')[0], flavour );

      var bindClickToWidget = cv.TemplateEngine.getInstance().bindClickToWidget;
      if ($element.attr("bind_click_to_widget")) bindClickToWidget = $element.attr("bind_click_to_widget")=="true";

      return cv.TemplateEngine.getInstance().widgetDataInsert( path, {
        'bindClickToWidget': bindClickToWidget,
        'mapping' : $element.attr('mapping'),
        'format'  : $element.attr('format'),
        'align'   : $element.attr('align'),
        'layout'  : layout,
        'path'    : path,
        'label'   : label,
        'classes' : classes,
        'style'   : style,
        '$$type'  : widgetType.toLowerCase(),
        'pageType': pageType
      });
    },

    /**
     * Parse config file layout element and convert it to an object
     * @method parseLayout
     * @param {} layout
     * @param {} defaultValues
     * @return ret_val
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

    /**
     * Description
     * @method extractLayout
     * @param {} layout
     * @param {} pageType
     * @return ret_val
     */
    extractLayout: function( layout, pageType )
    {

      var ret_val = (pageType == '2d') ? 'position:absolute;' : '';
      if( layout.x      ) ret_val += 'left:'   + layout.x      + ';';
      if( layout.y      ) ret_val += 'top:'    + layout.y      + ';';
      if( layout.width  ) ret_val += 'width:'  + layout.width  + ';';
      if( layout.height ) ret_val += 'height:' + layout.height + ';';

      return ret_val;
    },

    /**
     * Description
     * @method extractLayout3d
     * @param {} layout
     * @return ret_val
     */
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

    /**
     * Description
     * @method extractLabel
     * @param {} label
     * @param {} flavour
     * @param {} labelClass
     * @param {} style
     * @return BinaryExpression
     */
    extractLabel: function( label, flavour, labelClass, style )
    {
      if( !label ) return '';

      var ret_val = '<div class="' + (!labelClass ? 'label' : labelClass) + '"'
        + ( style ? (' style="' + style + '"') : '' ) + '>';

      $( label ).contents().each( function(){
        var $v = $(this);
        if( $v.is('icon') )
        {
          ret_val += cv.IconHandler.getInstance().getIconText($v.attr('name'), $v.attr('type'), $v.attr('flavour') || flavour, $v.attr('color'), $v.attr('styling') );
        } else
          ret_val += this.textContent;
      });
      return ret_val + '</div>';
    },

    /**
     * this function implements all widget layouts that are identical (JNK)
     * implemented: rowspan, colspan
     * @method setWidgetLayout
     * @param {} page
     * @param {} path
     * @return ret_val
     */
    setWidgetLayout: function( page, path ) {
      var
        elementData = cv.TemplateEngine.getInstance().widgetDataGet( path ),
        layout      = page.children('layout'),
        lookupM     = [ 0, 2, 4,  6,  6,  6,  6, 12, 12, 12, 12, 12, 12 ],
        lookupS     = [ 0, 3, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
        ret_val = '';
      elementData.colspan = layout.attr('colspan') || $('head').data('colspanDefault') || 6;
      elementData.colspanM = layout.attr('colspan-m') || lookupM[Math.floor(elementData.colspan)] || elementData.colspan;
      elementData.colspanS = layout.attr('colspan-s') || lookupS[Math.floor(elementData.colspan)] || elementData.colspan;
      if( layout.attr('rowspan') )
      {
        elementData.rowspanClass = cv.layout.Manager.rowspanClass( layout.attr('rowspan') || 1 );
        ret_val = 'innerrowspan';
      }
      return ret_val;
    }
  }
});