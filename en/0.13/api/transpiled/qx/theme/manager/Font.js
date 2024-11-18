(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ValueManager": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.Font": {},
      "qx.lang.Object": {},
      "qx.bom.webfonts.WebFontLoader": {},
      "qx.lang.String": {},
      "qx.bom.webfonts.WebFont": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Manager for font themes
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @ignore(qx.$$fontBootstrap)
   */
  qx.Class.define("qx.theme.manager.Font", {
    type: "singleton",
    extend: qx.util.ValueManager,
    implement: [qx.core.IDisposable],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.util.ValueManager.constructor.call(this);

      // Grab bootstrap info
      if (qx.$$fontBootstrap) {
        this._manifestFonts = qx.$$fontBootstrap;
        delete qx.$$fontBootstrap;
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** the currently selected font theme */
      theme: {
        check: "Theme",
        nullable: true,
        apply: "_applyTheme",
        event: "changeTheme"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _manifestFonts: null,
      /**
       * Returns the dynamically interpreted result for the incoming value
       *
       * @param value {String} dynamically interpreted identifier
       * @return {var} return the (translated) result of the incoming value
       */
      resolveDynamic: function resolveDynamic(value) {
        var dynamic = this._dynamic;
        return value instanceof qx.bom.Font ? value : dynamic[value];
      },
      /**
       * Returns the dynamically interpreted result for the incoming value,
       * (if available), otherwise returns the original value
       * @param value {String} Value to resolve
       * @return {var} either returns the (translated) result of the incoming
       * value or the value itself
       */
      resolve: function resolve(value) {
        var cache = this._dynamic;
        var resolved = cache[value];
        if (resolved) {
          return resolved;
        }

        // If the font instance is not yet cached create a new one to return
        // This is true whenever a runtime include occurred (using "qx.Theme.include"
        // or "qx.Theme.patch"), since these methods only merging the keys of
        // the theme and are not updating the cache
        var theme = this.getTheme();
        if (theme !== null && theme.fonts[value]) {
          var createdFonts = this.__P_458_0(theme.fonts);
          var font = createdFonts[value] || null;
          if (font) {
            cache[value] = font;
          }
          return font;
        }
        return value;
      },
      /**
       * Whether a value is interpreted dynamically
       *
       * @param value {String} dynamically interpreted identifier
       * @return {Boolean} returns true if the value is interpreted dynamically
       */
      isDynamic: function isDynamic(value) {
        var cache = this._dynamic;
        if (value && (value instanceof qx.bom.Font || cache[value] !== undefined)) {
          return true;
        }

        // If the font instance is not yet cached create a new one to return
        // This is true whenever a runtime include occurred (using "qx.Theme.include"
        // or "qx.Theme.patch"), since these methods only merging the keys of
        // the theme and are not updating the cache
        var theme = this.getTheme();
        if (theme !== null && value && theme.fonts[value]) {
          var fontClass = this.__P_458_1(theme.fonts[value]);
          var font = new fontClass();

          // Inject information about custom charcter set tests before we apply the
          // complete blob in one.
          if (theme.fonts[value].comparisonString) {
            font.setComparisonString(theme.fonts[value].comparisonString);
          }
          cache[value] = font.set(theme.fonts[value]);
          return true;
        }
        return false;
      },
      /**
       * Checks for includes and resolves them recursively
       *
       * @param fonts {Map} all fonts of the theme
       * @param fontName {String} font name to include
       */
      __P_458_2: function __P_458_2(fonts, fontName) {
        if (fonts[fontName].include) {
          // get font infos out of the font theme
          var fontToInclude = fonts[fonts[fontName].include];

          // delete 'include' key - not part of the merge
          fonts[fontName].include = null;
          delete fonts[fontName].include;
          fonts[fontName] = qx.lang.Object.mergeWith(fonts[fontName], fontToInclude, false);
          this.__P_458_2(fonts, fontName);
        }
      },
      /**
       * Initialises fonts from a set of font definitions (eg from a theme Font configuration)
       *
       * @param {Map<String,Object>} fontDefs indexed by font ID
       * @return {Map<String,qx.bom.Font>} created fonts
       */
      __P_458_0: function __P_458_0(fontDefs) {
        var _this = this;
        var webFontDefs = [];
        var createdFonts = {};
        var _loop = function _loop() {
            var fontDef = fontDefs[fontId];
            if (fontDef.include && fontDefs[fontDef.include]) {
              _this.__P_458_2(fontDefs, fontId);
            }
            if (fontDef.fontName) {
              var preset = _this._manifestFonts[fontDef.fontName];
              Object.keys(preset).forEach(function (presetKey) {
                if (fontDef[presetKey] === undefined) {
                  fontDef[presetKey] = preset[presetKey];
                }
              });
            }

            // If the theme font is defining sources, then we want to intercept that and either
            //  fabricate a Manifest font, or if the qx.bom.webfonts.WebFont has already been
            //  created we need to add the font face definition to the existing one
            if (fontDef.sources) {
              // Make sure the font family is specified in the font definition (it was previously allowable to
              //  only specify the font family in the sources object)
              if (fontDef.sources.family && fontDef.family.indexOf(fontDef.sources.family) < 0) {
                fontDef.family.unshift(fontDef.sources.family);
              }
              var family = fontDef.family[0];

              // Make sure that there is a font definition
              if (!fontDefs[family]) {
                fontDefs[family] = {
                  fontFaces: []
                };
              }

              // Create a lookup of the fontFaces within the font definition
              var fontFacesLookup = {};
              fontDefs[family].fontFaces.forEach(function (fontFace) {
                var fontKey = qx.bom.webfonts.WebFontLoader.createFontLookupKey(fontFace.family, fontFace.fontWeight, fontFace.fontStyle);
                fontFacesLookup[fontKey] = fontFace;
              });
              var fontKey = qx.bom.webfonts.WebFontLoader.createFontLookupKey(fontDef.sources.family, fontDef.sources.fontWeight, fontDef.sources.fontStyle);
              if (!fontFacesLookup[fontKey]) {
                var fontFace = {
                  fontFamily: fontDef.sources.family,
                  fontWeight: fontDef.sources.fontWeight,
                  fontStyle: fontDef.sources.fontStyle
                };
                fontDefs[family].fontFaces.push(fontFace);
              }
            }
            if (fontDef.css || fontDef.fontFaces) {
              webFontDefs.push(fontDef);
            }
            fontClass = _this.__P_458_1(fontDef);
            font = new fontClass(); // Inject information about custom charcter set tests before we apply the
            // complete blob in one.
            if (fontDef.comparisonString) {
              font.setComparisonString(fontDef.comparisonString);
            }
            createdFonts[fontId] = font;
            qx.Class.getProperties(qx.bom.Font).forEach(function (propertyName) {
              var value = fontDef[propertyName];
              if (value !== undefined) {
                font["set" + qx.lang.String.firstUp(propertyName)](value);
              }
            });
            createdFonts[fontId].themed = true;
          },
          fontClass,
          font;
        for (var fontId in fontDefs) {
          _loop();
        }

        // Load all of the web fonts
        var _loop2 = function _loop2() {
          var webFontDef = _webFontDefs[_i];
          var loader = qx.bom.webfonts.WebFontLoader.getLoader(webFontDef.family[0], true);
          ["css", "fontFaces", "comparisonString", "version"].forEach(function (propertyName) {
            if (webFontDef[propertyName]) {
              loader["set" + qx.lang.String.firstUp(propertyName)](webFontDef[propertyName]);
            }
          });
          loader.load();
        };
        for (var _i = 0, _webFontDefs = webFontDefs; _i < _webFontDefs.length; _i++) {
          _loop2();
        }

        // Initialise the fonts, including those that refer to the loaded web fonts
        for (var _fontId in createdFonts) {
          var _font = createdFonts[_fontId];
          _font.loadComplete();
        }
        return createdFonts;
      },
      // apply method
      _applyTheme: function _applyTheme(value) {
        var createdFonts = this._dynamic = {};
        for (var key in createdFonts) {
          if (createdFonts[key].themed) {
            createdFonts[key].dispose();
            delete createdFonts[key];
          }
        }
        if (value) {
          var fonts = this._manifestFonts ? Object.assign(value.fonts, this._manifestFonts) : value.fonts;
          createdFonts = this.__P_458_0(fonts);
        }
        this._setDynamic(createdFonts);
      },
      /**
       * Decides which Font class should be used based on the theme configuration
       *
       * @param config {Map} The font's configuration map
       * @return {Class}
       */
      __P_458_1: function __P_458_1(config) {
        if (config.fontFaces || config.css) {
          return qx.bom.webfonts.WebFont;
        }
        return qx.bom.Font;
      },
      /**
       * Returns the font information output by the compiler
       * @internal subject to change
       * @return {Object}
       */
      getManifestFonts: function getManifestFonts() {
        return this._manifestFonts;
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeMap("_dynamic");
    }
  });
  qx.theme.manager.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1731948123702