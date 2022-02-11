/* Image.js 
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


/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * The image class displays an image file
 *
 * This class supports image clipping, which means that multiple images can be combined
 * into one large image and only the relevant part is shown.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   var image = new qx.ui.basic.Image("icon/32/actions/format-justify-left.png");
 *
 *   this.getRoot().add(image);
 * </pre>
 *
 * This example create a widget to display the image
 * <code>icon/32/actions/format-justify-left.png</code>.
 *
 * *External Documentation*
 *
 * <a href='http://qooxdoo.org/docs/#desktop/widget/image.md' target='_blank'>
 * Documentation of this widget in the qooxdoo manual.</a>
 *
 * NOTE: Instances of this class must be disposed of after use
 *
 */
qx.Class.define('cv.ui.manager.basic.Image',
  {
    extend : qx.ui.core.Widget,



    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param source {String?null} The URL of the image to display.
     */
    construct : function(source) {
      this.__contentElements = {};

      this.base(arguments);

      if (source) {
        this.setSource(source);
      }
    },




    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties :
      {
        /** The URL of the image. Setting it will possibly abort loading of current image. */
        source :
          {
            check : 'String',
            init : null,
            nullable : true,
            event : 'changeSource',
            apply : '_applySource',
            themeable : true
          },


        /**
         * Whether the image should be scaled to the given dimensions
         *
         * This is disabled by default because it prevents the usage
         * of image clipping when enabled.
         */
        scale :
          {
            check : 'Boolean',
            init : false,
            event : 'changeScale',
            themeable : true,
            apply : '_applyScale'
          },

        /**
         * Whether to preserve the image ratio (ie prevent distortion), and which dimension
         * to prioritise
         */
        forceRatio : {
          init : 'auto',
          check : [ 'disabled', 'height', 'width', 'auto' ],
          apply : '_applyDimension'
        },

        /**
         * Whether to allow scaling the image up
         */
        allowScaleUp : {
          init : false,
          check : 'Boolean',
          apply : '_applyDimension'
        },

        // overridden
        appearance :
          {
            refine : true,
            init : 'image'
          },


        // overridden
        allowShrinkX :
          {
            refine : true,
            init : false
          },


        // overridden
        allowShrinkY :
          {
            refine : true,
            init : false
          },


        // overridden
        allowGrowX :
          {
            refine : true,
            init : false
          },


        // overridden
        allowGrowY :
          {
            refine : true,
            init : false
          }
      },


    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events :
      {
        /**
         * Fired if the image source can not be loaded. This event can only be
         * fired for the first loading of an unmanaged resource (external image).
         */
        loadingFailed : 'qx.event.type.Event',


        /**
         * Fired if the image has been loaded. This is even true for managed
         * resources (images known by generator).
         */
        loaded : 'qx.event.type.Event',


        /** Fired when the pending request has been aborted. */
        aborted : 'qx.event.type.Event'
      },


    statics:
      {
        PLACEHOLDER_IMAGE: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members :
      {
        __width : null,
        __height : null,
        __mode : null,
        __contentElements : null,
        __currentContentElement : null,
        __wrapper : null,
        __requestId : 0,


        // overridden
        _onChangeTheme : function() {
          this.base(arguments);
          // restyle source (theme change might have changed the resolved url)
          this._styleSource();
        },

        /*
        ---------------------------------------------------------------------------
          WIDGET API
        ---------------------------------------------------------------------------
        */

        // overridden
        getContentElement : function() {
          return this.__getSuitableContentElement();
        },


        // overridden
        _createContentElement : function() {
          return this.__getSuitableContentElement();
        },


        // overridden
        _getContentHint : function() {
          return {
            width : this.__width || 0,
            height : this.__height || 0
          };
        },

        // overridden
        _applyDecorator : function(value, old) {
          this.base(arguments, value, old);

          let source = this.getSource();
          source = qx.util.AliasManager.getInstance().resolve(source);
          let el = this.getContentElement();
          if (this.__wrapper) {
            el = el.getChild(0);
          }
          this.__setSource(el, source);
        },

        // overridden
        _applyTextColor : function(value) {
          if (this.__getMode() === 'font') {
            let el = this.getContentElement();
            if (this.__wrapper) {
              el = el.getChild(0);
            }

            if (value) {
              el.setStyle('color', qx.theme.manager.Color.getInstance().resolve(value));
            } else {
              el.removeStyle('color');
            }
          }
        },

        // overridden
        _applyPadding : function(value, old, name) {
          this.base(arguments, value, old, name);

          const element = this.getContentElement();
          if (this.__wrapper) {
            element.getChild(0).setStyles({
              top: this.getPaddingTop() || 0,
              left: this.getPaddingLeft() || 0
            });
          } else if (this.__getMode() === 'font') {
            element.setStyles({
              top: this.getPaddingTop() || 0,
              left: this.getPaddingLeft() || 0
            });
          } else if (element instanceof qx.html.Image) {
            element.setPadding(
              this.getPaddingLeft() || 0, this.getPaddingTop() || 0
            );
          }
        },

        renderLayout : function(left, top, width, height) {
          this.base(arguments, left, top, width, height);

          const element = this.getContentElement();
          if (this.__wrapper) {
            element.getChild(0).setStyles({
              width: width - (this.getPaddingLeft() || 0) - (this.getPaddingRight() || 0),
              height: height - (this.getPaddingTop() || 0) - (this.getPaddingBottom() || 0),
              top: this.getPaddingTop() || 0,
              left: this.getPaddingLeft() || 0
            });
          }
        },




        /*
        ---------------------------------------------------------------------------
          IMAGE API
        ---------------------------------------------------------------------------
        */

        // property apply, overridden
        _applyEnabled : function(value, old) {
          this.base(arguments, value, old);

          if (this.getSource()) {
            this._styleSource();
          }
        },


        // property apply
        _applySource : function(value, old) {
          // abort loading current image
          if (old) {
            if (qx.io.ImageLoader.isLoading(old)) {
              qx.io.ImageLoader.abort(old);
            }
          }

          this._styleSource();
        },


        // property apply
        _applyScale : function(value) {
          this._styleSource();
        },


        /**
         * Remembers the mode to keep track which contentElement is currently in use.
         * @param mode {String} internal mode (alphaScaled|scaled|nonScaled)
         */
        __setMode : function(mode) {
          this.__mode = mode;
        },


        /**
         * Returns the current mode if set. Otherwise checks the current source and
         * the current scaling to determine the current mode.
         *
         * @return {String} current internal mode
         */
        __getMode : function() {
          if (this.__mode === null) {
            const source = this.getSource();

            if (source && qx.lang.String.startsWith(source, '@')) {
              this.__mode = 'font';
            } else if (source && qx.lang.String.startsWith(source, '<svg')) {
              this.__mode = 'svg';
            } else {
              let isPng = false;
              if (source !== null) {
                isPng = source.endsWith('.png');
              }

              if (this.getScale() && isPng && qx.core.Environment.get('css.alphaimageloaderneeded')) {
                this.__mode = 'alphaScaled';
              } else if (this.getScale()) {
                this.__mode = 'scaled';
              } else {
                this.__mode = 'nonScaled';
              }
            }
          }

          return this.__mode;
        },


        /**
         * Creates a contentElement suitable for the current mode
         *
         * @param mode {String} internal mode
         * @return {qx.html.Image} suitable image content element
         */
        __createSuitableContentElement : function(mode) {
          let scale;
          let tagName;
          let Clazz = qx.html.Image;

          switch (mode) {
            case 'svg':
              Clazz = qx.html.Element;
              tagName = 'div';
              break;
            case 'font':
              Clazz = qx.html.Label;
              scale = true;
              tagName = 'div';
              break;
            case 'alphaScaled':
              scale = true;
              tagName = 'div';
              break;
            case 'nonScaled':
              scale = false;
              tagName = 'div';
              break;
            default:
              scale = true;
              tagName = 'img';
              break;
          }

          const element = new (Clazz)(tagName);
          element.connectWidget(this);
          element.setStyles({
            'overflowX': 'hidden',
            'overflowY': 'hidden',
            'boxSizing': 'border-box'
          });

          if (mode === 'font') {
            element.setRich(true);
          } else if (mode !== 'svg') {
            element.setScale(scale);

            if (qx.core.Environment.get('css.alphaimageloaderneeded')) {
              const wrapper = this.__wrapper = new qx.html.Element('div');
              element.connectWidget(this);
              wrapper.setStyle('position', 'absolute');
              wrapper.add(element);
              return wrapper;
            }
          }

          return element;
        },


        /**
         * Returns a contentElement suitable for the current mode
         *
         * @return {qx.html.Image} suitable image contentElement
         */
        __getSuitableContentElement : function() {
          if (this.$$disposed) {
            return null;
          }

          const mode = this.__getMode();

          if (!this.__contentElements[mode]) {
            this.__contentElements[mode] = this.__createSuitableContentElement(mode);
          }

          const element = this.__contentElements[mode];

          if (!this.__currentContentElement) {
            this.__currentContentElement = element;
          }

          return element;
        },


        /**
         * Applies the source to the clipped image instance or preload
         * an image to detect sizes and apply it afterwards.
         *
         */
        _styleSource : function() {
          const AliasManager = qx.util.AliasManager.getInstance();
          const ResourceManager = qx.util.ResourceManager.getInstance();

          let source = AliasManager.resolve(this.getSource());

          let element = this.getContentElement();
          if (this.__wrapper) {
            element = element.getChild(0);
          }

          if (!source) {
            this.__resetSource(element);
            return;
          }

          this.__checkForContentElementSwitch(source);

          if ((qx.core.Environment.get('engine.name') == 'mshtml') &&
            (parseInt(qx.core.Environment.get('engine.version'), 10) < 9 ||
              qx.core.Environment.get('browser.documentmode') < 9)) {
            const repeat = this.getScale() ? 'scale' : 'no-repeat';
            element.tagNameHint = qx.bom.element.Decoration.getTagName(repeat, source);
          }

          const contentEl = this.__getContentElement();

          // Detect if the image registry knows this image
          if (ResourceManager.isFontUri(source)) {
            this.__setManagedImage(contentEl, source);
            const color = this.getTextColor();
            if (qx.lang.Type.isString(color)) {
              this._applyTextColor(color, null);
            }
          } else if (source && source.startsWith('<svg')) {
            this.__setManagedImage(contentEl, source);
          } else if (ResourceManager.has(source)) {
            const highResolutionSource = ResourceManager.findHighResolutionSource(source);
            if (highResolutionSource) {
              const imageWidth = ResourceManager.getImageWidth(source);
              const imageHeight = ResourceManager.getImageHeight(source);
              this.setWidth(imageWidth);
              this.setHeight(imageHeight);

              // set background size on current element (div or img)
              const backgroundSize = imageWidth + 'px, ' + imageHeight + 'px';
              this.__currentContentElement.setStyle('background-size', backgroundSize);

              this.setSource(highResolutionSource);
              source = highResolutionSource;
            }
            this.__setManagedImage(contentEl, source);
            this.__fireLoadEvent();
          } else if (qx.io.ImageLoader.isLoaded(source)) {
            this.__setUnmanagedImage(contentEl, source);
            this.__fireLoadEvent();
          } else {
            this.__loadUnmanagedImage(contentEl, source);
          }
        },


        /**
         * Helper function, which fires <code>loaded</code> event asynchronously.
         * It emulates native <code>loaded</code> event of an image object. This
         * helper will be called, if you try to load a managed image or an
         * previously loaded unmanaged image.
         */
        __fireLoadEvent : function() {
          this.__requestId++;
          qx.bom.AnimationFrame.request(function(rId) {
            // prevent firing of the event if source changed in the meantime
            if (rId === this.__requestId) {
              this.fireEvent('loaded');
            } else {
              this.fireEvent('aborted');
            }
          }.bind(this, this.__requestId));
        },


        /**
         * Returns the content element.
         * @return {qx.html.Image} content element
         */
        __getContentElement : function() {
          let contentEl = this.__currentContentElement;
          if (this.__wrapper) {
            contentEl = contentEl.getChild(0);
          }

          return contentEl;
        },


        /**
         * Checks if the current content element is capable to display the image
         * with the current settings (scaling, alpha PNG)
         *
         * @param source {String} source of the image
         */
        __checkForContentElementSwitch : qx.core.Environment.select('engine.name',
          {
            'mshtml' : function(source) {
              const alphaImageLoader = qx.core.Environment.get('css.alphaimageloaderneeded');
              const isPng = source.endsWith('.png');
              const isFont = source.startsWith('@');
              const isSvg = source.startsWith('<svg');

              if (isFont) {
                this.__setMode('font');
              } else if (isSvg) {
                this.__setMode('svg');
              } else if (alphaImageLoader && isPng) {
                if (this.getScale() && this.__getMode() != 'alphaScaled') {
                  this.__setMode('alphaScaled');
                } else if (!this.getScale() && this.__getMode() != 'nonScaled') {
                  this.__setMode('nonScaled');
                }
              } else if (this.getScale() && this.__getMode() != 'scaled') {
                  this.__setMode('scaled');
                } else if (!this.getScale() && this.__getMode() != 'nonScaled') {
                  this.__setMode('nonScaled');
                }

              this.__checkForContentElementReplacement(this.__getSuitableContentElement());
            },

            'default' : function(source) {
              const isFont = source && qx.lang.String.startsWith(source, '@');
              const isSvg = source.startsWith('<svg');

              if (isFont) {
                this.__setMode('font');
              } else if (isSvg) {
                this.__setMode('svg');
              } else if (this.getScale() && this.__getMode() != 'scaled') {
                this.__setMode('scaled');
              } else if (!this.getScale() && this.__getMode() != 'nonScaled') {
                this.__setMode('nonScaled');
              }

              this.__checkForContentElementReplacement(this.__getSuitableContentElement());
            }
          }),


        /**
         * Checks the current child and replaces it if necessary
         *
         * @param elementToAdd {qx.html.Image} content element to add
         */
        __checkForContentElementReplacement : function(elementToAdd) {
          const currentContentElement = this.__currentContentElement;

          if (currentContentElement !== elementToAdd) {
            if (currentContentElement !== null) {
              const pixel = 'px';
              const styles = {};

              //inherit styles from current element
              const currentStyles = currentContentElement.getAllStyles();
              if (currentStyles) {
                for (let prop in currentStyles) {
                  styles[prop] = currentStyles[prop];
                }
              }

              // Don't transfer background image when switching from image to icon font
              if (this.__getMode() === 'font' || this.__getMode() === 'svg') {
                delete styles.backgroundImage;
              }

              // Copy dimension and location of the current content element
              const bounds = this.getBounds();
              if (bounds !== null) {
                styles.width = bounds.width + pixel;
                styles.height = bounds.height + pixel;
              }

              const insets = this.getInsets();
              styles.left = parseInt(currentContentElement.getStyle('left') || insets.left) + pixel;
              styles.top = parseInt(currentContentElement.getStyle('top') || insets.top) + pixel;

              styles.zIndex = 10;

              const newEl = this.__wrapper ? elementToAdd.getChild(0) : elementToAdd;
              newEl.setStyles(styles, true);
              newEl.setSelectable(this.getSelectable());

              if (!currentContentElement.isVisible()) {
                elementToAdd.hide();
              } else if (!elementToAdd.isVisible()) {
                elementToAdd.show();
              }

              if (!currentContentElement.isIncluded()) {
                elementToAdd.exclude();
              } else if (!elementToAdd.isIncluded()) {
                elementToAdd.include();
              }

              const container = currentContentElement.getParent();

              if (container) {
                const index = container.getChildren().indexOf(currentContentElement);
                container.removeAt(index);
                container.addAt(elementToAdd, index);
              }
              // force re-application of source so __setSource is called again
              const hint = newEl.getNodeName();
              if (newEl.setSource) {
                newEl.setSource(null);
              } else if (newEl.setValue) {
                newEl.setValue('');
              } else {
                newEl.removeAll();
              }
              const currentEl = this.__getContentElement();
              newEl.tagNameHint = hint;
              newEl.setAttribute('class', currentEl.getAttribute('class'));

              // Flush elements to make sure the DOM elements are created.
              qx.html.Element.flush();
              const currentDomEl = currentEl.getDomElement();
              const newDomEl = elementToAdd.getDomElement();

              // copy event listeners
              const listeners = currentContentElement.getListeners() || [];
              listeners.forEach(function(listenerData) {
                elementToAdd.addListener(listenerData.type, listenerData.handler, listenerData.self, listenerData.capture);
              });

              if (currentDomEl && newDomEl) {
                // Switch the DOM elements' hash codes. This is required for the event
                // layer to work [BUG #7447]
                const currentHash = currentDomEl.$$hash;
                currentDomEl.$$hash = newDomEl.$$hash;
                newDomEl.$$hash = currentHash;
              }

              this.__currentContentElement = elementToAdd;
            }
          }
        },


        /**
         * Use the ResourceManager to set a managed image
         *
         * @param el {Element} image DOM element
         * @param source {String} source path
         */
        __setManagedImage : function(el, source) {
          const ResourceManager = qx.util.ResourceManager.getInstance();
          const isFont = ResourceManager.isFontUri(source);
          const isSvg = source.startsWith('<svg');

          // Try to find a disabled image in registry
          if (!this.getEnabled()) {
            const disabled = source.replace(/\.([a-z]+)$/, '-disabled.$1');
            if (!isFont && ResourceManager.has(disabled)) {
              source = disabled;
              this.addState('replacement');
            } else {
              this.removeState('replacement');
            }
          }

          // Optimize case for enabled changes when no disabled image was found
          if (!isFont && !isSvg && el.getSource() === source) {
            return;
          }

          // Special case for non resource manager handled font icons
          if (isFont) {
            // Don't use scale if size is set via postfix
            if (this.getScale() && parseInt(source.split('/')[2], 10)) {
              this.setScale(false);
            }

            // Adjust size if scaling is applied
            let width;
            let height;
            if (this.getScale()) {
              const hint = this.getSizeHint();
              width = this.getWidth() || hint.width;
              height = this.getHeight() || hint.height;
            } else {
              const font = qx.theme.manager.Font.getInstance().resolve(source.match(/@([^/]+)/)[1]);
              if (qx.core.Environment.get('qx.debug')) {
                this.assertObject(font, 'Virtual image source contains unkown font descriptor');
              }
              const size = parseInt(source.split('/')[2] || font.getSize(), 10);
              width = ResourceManager.getImageWidth(source) || size;
              height = ResourceManager.getImageHeight(source) || size;
            }

            this.__updateContentHint(width, height);
            this.__setSource(el, source);
          } else if (isSvg) {
            // Apply source
            this.__setSource(el, source);

            // Adjust size
            this.__updateContentHint(40, 40);
          } else {
            // Apply source
            this.__setSource(el, source);

            // Compare with old sizes and relayout if necessary
            this.__updateContentHint(
              ResourceManager.getImageWidth(source),
              ResourceManager.getImageHeight(source)
            );
          }
        },

        _applyDimension : function() {
          this.base(arguments);

          const isFont = this.getSource() && qx.lang.String.startsWith(this.getSource(), '@');
          if (isFont) {
            const el = this.getContentElement();
            if (el) {
              if (this.getScale()) {
                const hint = this.getSizeHint();
                const width = this.getWidth() || hint.width || 40;
                const height = this.getHeight() || hint.height || 40;
                el.setStyle('fontSize', (width > height ? height : width) + 'px');
              } else {
                const font = qx.theme.manager.Font.getInstance().resolve(this.getSource().match(/@([^/]+)/)[1]);
                el.setStyle('fontSize', font.getSize() + 'px');
              }
            }
          } else {
            this.__updateContentHint();
          }
        },

        /**
         * Use the infos of the ImageLoader to set an unmanaged image
         *
         * @param el {Element} image DOM element
         * @param source {String} source path
         */
        __setUnmanagedImage : function(el, source) {
          const ImageLoader = qx.io.ImageLoader;

          // Apply source
          this.__setSource(el, source);

          // Compare with old sizes and relayout if necessary
          const width = ImageLoader.getWidth(source);
          const height = ImageLoader.getHeight(source);
          this.__updateContentHint(width, height);
        },


        /**
         * Use the ImageLoader to load an unmanaged image
         *
         * @param el {Element} image DOM element
         * @param source {String} source path
         */
        __loadUnmanagedImage : function(el, source) {
          const ImageLoader = qx.io.ImageLoader;

          if (qx.core.Environment.get('qx.debug')) {
            // loading external images via HTTP/HTTPS is a common usecase, as is
            // using data URLs.
            const sourceLC = source.toLowerCase();
            if (!sourceLC.startsWith('http') &&
              !sourceLC.startsWith('data:image/')) {
              const self = this.self(arguments);

              if (!self.__warned) {
                self.__warned = {};
              }

              if (!self.__warned[source]) {
                this.debug('try to load an unmanaged relative image: ' + source);
                self.__warned[source] = true;
              }
            }
          }

          // only try to load the image if it not already failed
          if (!ImageLoader.isFailed(source)) {
            ImageLoader.load(source, this.__loaderCallback, this);
          } else {
            this.__resetSource(el);
          }
        },

        /**
         * Reset source displayed by the DOM element.
         *
         * @param el {Element} image DOM element
         */
        __resetSource : function(el) {
          if (el !== null) {
            if (el instanceof qx.html.Image) {
              el.resetSource();
            } else if (el instanceof qx.html.Label) {
              el.resetValue();
            } else {
              el.removeAll();
            }
          }
        },

        /**
         * Combines the decorator's image styles with our own image to make sure
         * gradient and backgroundImage decorators work on Images.
         *
         * @param el {Element} image DOM element
         * @param source {String} source path
         */
        __setSource: function (el, source) {
          const isFont = source && qx.lang.String.startsWith(source, '@');
          const isSvg = source && qx.lang.String.startsWith(source, '<svg');

          if (isSvg) {
            const child = new qx.html.Element('svg');
            child.useMarkup(source);
            el.removeAll();
            el.add(child);
          } else if (isFont) {
            const sparts = source.split('/');
            let fontSource = source;
            if (sparts.length > 2) {
              fontSource = sparts[0] + '/' + sparts[1];
            }


            const ResourceManager = qx.util.ResourceManager.getInstance();
            const font = qx.theme.manager.Font.getInstance().resolve(source.match(/@([^/]+)/)[1]);
            const fontStyles = qx.lang.Object.clone(font.getStyles());
            delete fontStyles.color;
            el.setStyles(fontStyles);
            el.setStyle('font');
            el.setStyle('display', 'table-cell');
            el.setStyle('verticalAlign', 'middle');
            el.setStyle('textAlign', 'center');

            if (this.getScale()) {
              el.setStyle('fontSize', (this.__width > this.__height ? this.__height : this.__width) + 'px');
            } else {
              const size = parseInt(sparts[2] || qx.theme.manager.Font.getInstance().resolve(source.match(/@([^/]+)/)[1]).getSize());
              el.setStyle('fontSize', size + 'px');
            }

            const resource = ResourceManager.getData(fontSource);
            if (resource) {
              el.setValue(String.fromCharCode(resource[2]));
            } else {
              const charCode = parseInt(qx.theme.manager.Font.getInstance().resolve(source.match(/@([^/]+)\/(.*)$/)[2]), 16);
              if (qx.core.Environment.get('qx.debug')) {
                this.assertNumber(charCode, 'Font source needs either a glyph name or the unicode number in hex');
              }
              el.setValue(String.fromCharCode(charCode));
            }

            return;
          } else if (el.getNodeName() == 'div') {
            // checks if a decorator already set.
            // In this case we have to merge background styles
            const decorator = qx.theme.manager.Decoration.getInstance().resolve(this.getDecorator());
            if (decorator) {
              const hasGradient = (decorator.getStartColor() && decorator.getEndColor());
              const hasBackground = decorator.getBackgroundImage();
              if (hasGradient || hasBackground) {
                const repeat = this.getScale() ? 'scale' : 'no-repeat';

                // get the style attributes for the given source
                const attr = qx.bom.element.Decoration.getAttributes(source, repeat);
                // get the background image(s) defined by the decorator
                const decoratorStyle = decorator.getStyles(true);

                const combinedStyles = {
                  'backgroundImage': attr.style.backgroundImage,
                  'backgroundPosition': (attr.style.backgroundPosition || '0 0'),
                  'backgroundRepeat': (attr.style.backgroundRepeat || 'no-repeat')
                };

                if (hasBackground) {
                  combinedStyles['backgroundPosition'] += ',' + decoratorStyle['background-position'] || '0 0';
                  combinedStyles['backgroundRepeat'] += ', ' + decorator.getBackgroundRepeat();
                }

                if (hasGradient) {
                  combinedStyles['backgroundPosition'] += ', 0 0';
                  combinedStyles['backgroundRepeat'] += ', no-repeat';
                }

                combinedStyles['backgroundImage'] += ',' + (decoratorStyle['background-image'] || decoratorStyle['background']);

                // apply combined background images
                el.setStyles(combinedStyles);

                return;
              }
            } else if (el.setSource) {
              // force re-apply to remove old decorator styles
              el.setSource(null);
            }
          }
          if (el.setSource) {
            el.setSource(source);
          }
        },

        /**
         * Event handler fired after the preloader has finished loading the icon
         *
         * @param source {String} Image source which was loaded
         * @param imageInfo {Map} Dimensions of the loaded image
         */
        __loaderCallback : function(source, imageInfo) {
          // Ignore the callback on already disposed images
          if (this.$$disposed === true) {
            return;
          }

          // Ignore when the source has already been modified
          if (source !== qx.util.AliasManager.getInstance().resolve(this.getSource())) {
            this.fireEvent('aborted');
            return;
          }

          /// Output a warning if the image could not loaded and quit
          if (imageInfo.failed) {
            this.warn('Image could not be loaded: ' + source);
            this.fireEvent('loadingFailed');
          } else if (imageInfo.aborted) {
            this.fireEvent('aborted');
            return;
          } else {
            this.fireEvent('loaded');
          }

          // Update image
          this.__setUnmanagedImage(this.__getContentElement(), source);
        },


        /**
         * Updates the content hint when the image size has been changed
         *
         * @param width {Integer} width of the image
         * @param height {Integer} height of the image
         */
        __updateContentHint : function(width, height) {
          if (width === undefined) {
            width = this.__width;
          }
          if (height === undefined) {
            height = this.__height;
          }
          if (this._recalc(width, height)) {
            qx.ui.core.queue.Layout.add(this);
          }
        },


        /**
         * Recalculates the size of the image, according to scaling parameters
         * @param originalWidth
         * @param originalHeight
         */
        _recalc: function(originalWidth, originalHeight) {
          const maxWidth = this.getMaxWidth();
          const maxHeight = this.getMaxHeight();
          const minWidth = this.getMinWidth();
          const minHeight = this.getMinHeight();

          let width = originalWidth;
          let height = originalHeight;

          const ratio = originalHeight / originalWidth;

          switch (this.getForceRatio()) {
            case 'height':
              if (maxHeight !== null && height > maxHeight) {
                height = maxHeight;
                width = height / ratio;
              } else if (height < minHeight) {
                height = minHeight;
                width = height / ratio;
              }
              if (height < maxHeight && this.isAllowScaleUp()) {
                height = maxHeight;
                width = height / ratio;
              }
              break;

            case 'width':
              if (maxWidth !== null && width > maxWidth) {
                width = maxWidth;
                height = width * ratio;
              } else if (width < minWidth) {
                width = minWidth;
                height = width * ratio;
              }
              if (width < maxWidth && this.isAllowScaleUp()) {
                width = maxWidth;
                height = width * ratio;
              }
              break;

            case 'auto':
            case 'bestfit':
              if (maxWidth !== null && width > maxWidth) {
                width = maxWidth;
                height = width * ratio;
              } else if (width < minWidth) {
                width = minWidth;
                height = width * ratio;
              }
              if (width < maxWidth && this.isAllowScaleUp()) {
                width = maxWidth;
                height = width * ratio;
              }
              if (maxHeight !== null && height > maxHeight) {
                height = maxHeight;
                width = height / ratio;
              }
              break;
          }

          width = Math.round(width);
          height = Math.round(height);
          if (width != this.__width || height != this.__height) {
            this.__width = width;
            this.__height = height;
            return true;
          }
          return false;
        }
      },


    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct : function() {
      for (let mode in this.__contentElements) {
        if (Object.prototype.hasOwnProperty.call(this.__contentElements, mode)) {
          this.__contentElements[mode].disconnectWidget(this);
        }
      }

      delete this.__currentContentElement;
      if (this.__wrapper) {
        delete this.__wrapper;
      }

      this._disposeMap('__contentElements');
    }
  });
