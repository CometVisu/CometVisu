(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.util.AliasManager": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "qx.theme.manager.Appearance": {
        "construct": true
      },
      "qx.io.ImageLoader": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.element.BoxSizing": {},
      "qx.ui.treevirtual.SimpleTreeDataModel": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * David Perez Carmona (david-perez)
  
  ************************************************************************ */

  /**
   * A data cell renderer for the tree column of a simple tree
   *
   * This cell renderer has provisions for subclasses to easily extend the
   * appearance of the tree. If the tree should contain images, labels,
   * etc. before the indentation, the subclass should override the method
   * _addExtraContentBeforeIndentation(). Similarly, content can be added before
   * the icon by overriding _addExtraContentBeforeIcon(), and before the label
   * by overriding _addExtraContentBeforeLabel().
   *
   * Each of these overridden methods that calls _addImage() can provide, as
   * part of the map passed to _addImage(), a member called "tooltip" which
   * contains the tool tip to present when the mouse is hovered over the image.
   *
   * If this class is subclassed to form a new cell renderer, an instance of it
   * must be provided, via the 'custom' parameter, to the TreeVirtual
   * constructor.
   */
  qx.Class.define("qx.ui.treevirtual.SimpleTreeDataCellRenderer", {
    extend: qx.ui.table.cellrenderer.Abstract,
    construct: function construct() {
      var STDCR = qx.ui.treevirtual.SimpleTreeDataCellRenderer; // Begin preloading of the tree images, if not already requested.

      if (STDCR.__P_432_0) {
        STDCR.__P_432_1();

        STDCR.__P_432_0 = false;
      }

      qx.ui.table.cellrenderer.Abstract.constructor.call(this);
      this.__P_432_2 = qx.util.AliasManager.getInstance();
      this.__P_432_3 = qx.util.ResourceManager.getInstance();
      this.__P_432_4 = qx.theme.manager.Appearance.getInstance(); // Base URL used for indentation

      this.BLANK = this.__P_432_3.toUri(this.__P_432_2.resolve("static/blank.png"));
    },
    statics: {
      /** File names of each of the tree icons */
      __P_432_5: {},

      /** Whether we have not yet requested pre-loading of images */
      __P_432_0: true,

      /**
       * Request preloading of images so they appear immediately upon rendering
       */
      __P_432_1: function __P_432_1() {
        var STDCR = qx.ui.treevirtual.SimpleTreeDataCellRenderer;
        var ImageLoader = qx.io.ImageLoader;
        var am = qx.util.AliasManager.getInstance();
        var rm = qx.util.ResourceManager.getInstance();
        var tm = qx.theme.manager.Appearance.getInstance();

        var loadImage = function loadImage(f) {
          ImageLoader.load(rm.toUri(am.resolve(f)));
        };

        STDCR.__P_432_5.line = tm.styleFrom("treevirtual-line");
        loadImage(STDCR.__P_432_5.line.icon);
        STDCR.__P_432_5.contract = tm.styleFrom("treevirtual-contract");
        loadImage(STDCR.__P_432_5.contract.icon);
        STDCR.__P_432_5.expand = tm.styleFrom("treevirtual-expand");
        loadImage(STDCR.__P_432_5.expand.icon);
        STDCR.__P_432_5.onlyContract = tm.styleFrom("treevirtual-only-contract");
        loadImage(STDCR.__P_432_5.onlyContract.icon);
        STDCR.__P_432_5.onlyExpand = tm.styleFrom("treevirtual-only-expand");
        loadImage(STDCR.__P_432_5.onlyExpand.icon);
        STDCR.__P_432_5.startContract = tm.styleFrom("treevirtual-start-contract");
        loadImage(STDCR.__P_432_5.startContract.icon);
        STDCR.__P_432_5.startExpand = tm.styleFrom("treevirtual-start-expand");
        loadImage(STDCR.__P_432_5.startExpand.icon);
        STDCR.__P_432_5.endContract = tm.styleFrom("treevirtual-end-contract");
        loadImage(STDCR.__P_432_5.endContract.icon);
        STDCR.__P_432_5.endExpand = tm.styleFrom("treevirtual-end-expand");
        loadImage(STDCR.__P_432_5.endExpand.icon);
        STDCR.__P_432_5.crossContract = tm.styleFrom("treevirtual-cross-contract");
        loadImage(STDCR.__P_432_5.crossContract.icon);
        STDCR.__P_432_5.crossExpand = tm.styleFrom("treevirtual-cross-expand");
        loadImage(STDCR.__P_432_5.crossExpand.icon);
        STDCR.__P_432_5.end = tm.styleFrom("treevirtual-end");
        loadImage(STDCR.__P_432_5.end.icon);
        STDCR.__P_432_5.cross = tm.styleFrom("treevirtual-cross");
        loadImage(STDCR.__P_432_5.cross.icon);
      }
    },
    properties: {
      /**
       * Set whether lines linking tree children shall be drawn on the tree
       * if the theme supports tree lines.
       */
      useTreeLines: {
        check: "Boolean",
        init: true
      },

      /**
       * When true, exclude only the first-level tree lines, creating,
       * effectively, multiple unrelated root nodes.
       */
      excludeFirstLevelTreeLines: {
        check: "Boolean",
        init: false
      },

      /**
       * Set whether the open/close button should be displayed on a branch, even
       * if the branch has no children.
       */
      alwaysShowOpenCloseSymbol: {
        check: "Boolean",
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_432_2: null,
      __P_432_4: null,
      __P_432_3: null,
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.treevirtual.SimpleTreeDataCellRenderer.prototype._onChangeTheme.base.call(this);

        qx.ui.treevirtual.SimpleTreeDataCellRenderer.__P_432_1();
      },
      // overridden
      _getCellStyle: function _getCellStyle(cellInfo) {
        var node = cellInfo.value; // Return the style for the div for the cell.  If there's cell-specific
        // style information provided, append it.

        var html = qx.ui.treevirtual.SimpleTreeDataCellRenderer.prototype._getCellStyle.base.call(this, cellInfo) + (node.cellStyle ? node.cellStyle + ";" : "");
        return html;
      },
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        var html = ""; // Horizontal position

        var pos = 0; // If needed, add extra content before indentation

        var extra = this._addExtraContentBeforeIndentation(cellInfo, pos);

        html += extra.html;
        pos = extra.pos; // Add the indentation (optionally with tree lines)

        var indentation = this._addIndentation(cellInfo, pos);

        html += indentation.html;
        pos = indentation.pos; // If needed, add extra content before icon

        extra = this._addExtraContentBeforeIcon(cellInfo, pos);
        html += extra.html;
        pos = extra.pos; // Add the node icon

        var icon = this._addIcon(cellInfo, pos);

        html += icon.html;
        pos = icon.pos; // If needed, add extra content before label

        extra = this._addExtraContentBeforeLabel(cellInfo, pos);
        html += extra.html;
        pos = extra.pos; // store this position on the node so we can use it for the NodeEditor without recalculation

        cellInfo.value.labelPos = pos; // Add the node's label

        html += this._addLabel(cellInfo, pos);
        return html;
      },

      /**
       * Add an image to the tree.  This might be a visible icon or it may be
       * part of the indentation.
       *
       * @param imageInfo {Map}
       *   How to display the image.  It optionally includes any of the
       *   following:
       *   <dl>
       *     <dt>position {Map}</dt>
       *     <dd>
       *       If provided, a div is created to hold the image.  The div's top,
       *       right, bottom, left, width, and/or height may be specified with
       *       members of this map.  Each is expected to be an integer value.
       *     </dd>
       *     <dt>imageWidth, imageHeight</dt>
       *     <dd>
       *       The image's width and height.  These are used only if both are
       *       specified.
       *     </dd>
       *   </dl>
       *
       * @return {String}
       *   The html for this image, possibly with a surrounding div (see
       *   'position', above).
       */
      _addImage: function _addImage(imageInfo) {
        var html = []; // Resolve the URI

        var source = this.__P_432_3.toUri(this.__P_432_2.resolve(imageInfo.url)); // If we've been given positioning attributes, enclose image in a div


        if (imageInfo.position) {
          var pos = imageInfo.position;
          html.push('<div style="position:absolute;');

          if (qx.core.Environment.get("css.boxsizing")) {
            html.push(qx.bom.element.BoxSizing.compile("content-box"));
          }

          if (pos.top !== undefined) {
            html.push('top:' + pos.top + 'px;');
          }

          if (pos.right !== undefined) {
            html.push('right:' + pos.right + 'px;');
          }

          if (pos.bottom !== undefined) {
            html.push('bottom:' + pos.bottom + 'px;');
          }

          if (pos.left !== undefined) {
            html.push('left:' + pos.left + 'px;');
          }

          if (pos.width !== undefined) {
            html.push('width:' + pos.width + 'px;');
          }

          if (pos.height !== undefined) {
            html.push('height:' + pos.height + 'px;');
          }

          html.push('">');
        } // Don't use an image tag.  They render differently in Firefox and IE7
        // even if both are enclosed in a div specified as content box.  Instead,
        // add the image as the background image of a div.


        html.push('<div style="');
        html.push('background-image:url(' + source + ');');
        html.push('background-repeat:no-repeat;');

        if (imageInfo.imageWidth && imageInfo.imageHeight) {
          html.push(';width:' + imageInfo.imageWidth + 'px' + ';height:' + imageInfo.imageHeight + 'px');
        }

        var tooltip = imageInfo.tooltip;

        if (tooltip != null) {
          html.push('" title="' + tooltip);
        }

        html.push('">&nbsp;</div>');

        if (imageInfo.position) {
          html.push('</div>');
        }

        return html.join("");
      },

      /**
       * Add the indentation for this node of the tree.
       *
       * The indentation optionally includes tree lines.  Whether tree lines are
       * used depends on (a) the properties 'useTreeLines' and
       * 'excludeFirstLevelTreelines' within this class; and (b) the widget
       * theme in use (some themes don't support tree lines).
       *
       * @param cellInfo {Map} The information about the cell.
       *   See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {Map}
       *   The returned map contains an 'html' member which contains the html for
       *   the indentation, and a 'pos' member which is the starting position
       *   plus the width of the indentation.
       */
      _addIndentation: function _addIndentation(cellInfo, pos) {
        var node = cellInfo.value;
        var imageData;
        var html = ""; // Generate the indentation.  Obtain icon determination values once
        // rather than each time through the loop.

        var bUseTreeLines = this.getUseTreeLines();
        var bExcludeFirstLevelTreeLines = this.getExcludeFirstLevelTreeLines();
        var bAlwaysShowOpenCloseSymbol = this.getAlwaysShowOpenCloseSymbol();

        for (var i = 0; i < node.level; i++) {
          imageData = this._getIndentSymbol(i, node, bUseTreeLines, bAlwaysShowOpenCloseSymbol, bExcludeFirstLevelTreeLines);
          var rowHeight = cellInfo.table.getRowHeight();
          html += this._addImage({
            url: imageData.icon,
            position: {
              top: 0 + (imageData.paddingTop || 0),
              left: pos + (imageData.paddingLeft || 0),
              width: rowHeight + 3,
              height: rowHeight
            },
            imageWidth: rowHeight,
            imageHeight: rowHeight
          });
          pos += rowHeight + 3;
        }

        return {
          html: html,
          pos: pos
        };
      },

      /**
       * Add the icon for this node of the tree.
       *
       * @param cellInfo {Map} The information about the cell.
       *   See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {Map}
       *   The returned map contains an 'html' member which contains the html for
       *   the icon, and a 'pos' member which is the starting position plus the
       *   width of the icon.
       */
      _addIcon: function _addIcon(cellInfo, pos) {
        var node = cellInfo.value; // Add the node's icon

        var imageUrl = node.bSelected ? node.iconSelected : node.icon;

        if (!imageUrl) {
          if (node.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF) {
            var o = this.__P_432_4.styleFrom("treevirtual-file");
          } else {
            var states = {
              opened: node.bOpened
            };

            var o = this.__P_432_4.styleFrom("treevirtual-folder", states);
          }

          imageUrl = o.icon;
        }

        var rowHeight = cellInfo.table.getRowHeight();

        var html = this._addImage({
          url: imageUrl,
          position: {
            top: 0,
            left: pos,
            width: rowHeight + 3,
            height: rowHeight
          },
          imageWidth: rowHeight,
          imageHeight: rowHeight
        });

        return {
          html: html,
          pos: pos + rowHeight + 3
        };
      },

      /**
       * Add the label for this node of the tree.
       *
       * @param cellInfo {Map} The information about the cell.
       *   See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *   Additionally, if defined, the labelSpanStyle member is used to apply
       *   style to the span containing the label.  (This member is for use by
       *   subclasses; it's not otherwise used by this class.)
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {String}
       *   The html for the label.
       */
      _addLabel: function _addLabel(cellInfo, pos) {
        var node = cellInfo.value;
        var label = node.label;
        {
          if (label && label.translate) {
            label = label.translate();
          }
        } // Add the node's label.  We calculate the "left" property with: each
        // tree line (indentation) icon is 19 pixels wide; the folder icon is 16
        // pixels wide, there are two pixels of padding at the left, and we want
        // 2 pixels between the folder icon and the label

        var html = "<div style=\"position:absolute;left:" + pos + 'px;' + 'top:0;' + (node.labelStyle ? node.labelStyle + ";" : "") + '">' + '<span' + (cellInfo.labelSpanStyle ? 'style="' + cellInfo.labelSpanStyle + ';"' : "") + '>' + label + '</span>' + '</div>';
        return html;
      },

      /**
       * Adds extra content just before the indentation.
       *
       * @param cellInfo {Map} The information about the cell.
       *      See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {Map}
       *   The returned map contains an 'html' member which contains the html for
       *   the indentation, and a 'pos' member which is the starting position
       *   plus the width of the indentation.
       */
      _addExtraContentBeforeIndentation: function _addExtraContentBeforeIndentation(cellInfo, pos) {
        return {
          html: '',
          pos: pos
        };
      },

      /**
       * Adds extra content just before the icon.
       *
       * @param cellInfo {Map} The information about the cell.
       *      See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {Map}
       *   The returned map contains an 'html' member which contains the html for
       *   the indentation, and a 'pos' member which is the starting position
       *   plus the width of the indentation.
       */
      _addExtraContentBeforeIcon: function _addExtraContentBeforeIcon(cellInfo, pos) {
        return {
          html: '',
          pos: pos
        };
      },

      /**
       * Adds extra content just before the label.
       *
       * @param cellInfo {Map} The information about the cell.
       *      See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @param pos {Integer}
       *   The position from the left edge of the column at which to render this
       *   item.
       *
       * @return {Map}
       *   The returned map contains an 'html' member which contains the html for
       *   the indentation, and a 'pos' member which is the starting position
       *   plus the width of the indentation.
       */
      _addExtraContentBeforeLabel: function _addExtraContentBeforeLabel(cellInfo, pos) {
        return {
          html: '',
          pos: pos
        };
      },

      /**
       * Determine the symbol to use for indentation of a tree row, at a
       * particular column.  The indentation to use may be just white space or
       * may be a tree line.  Tree lines come in numerous varieties, so the
       * appropriate one is selected.
       *
       * @param column {Integer}
       *   The column of indentation being requested, zero-relative
       *
       * @param node {Node}
       *   The node being displayed in the row.  The properties of a node are
       *   described in {@link qx.ui.treevirtual.SimpleTreeDataModel}
       *
       * @param bUseTreeLines {Boolean}
       *   Whether to find an appropriate tree line icon, or simply provide
       *   white space.
       *
       * @param bAlwaysShowOpenCloseSymbol {Boolean}
       *   Whether to display the open/close icon for a node even if it has no
       *   children.
       *
       * @param bExcludeFirstLevelTreeLines {Boolean}
       *   If bUseTreeLines is enabled, then further filtering of the left-most
       *   tree line may be specified here.  If <i>true</i> then the left-most
       *   tree line, between top-level siblings, will not be displayed.
       *   If <i>false</i>, then the left-most tree line will be displayed
       *   just like all of the other tree lines.
       *
       * @return {Map} map of image properties.
       */
      _getIndentSymbol: function _getIndentSymbol(column, node, bUseTreeLines, bAlwaysShowOpenCloseSymbol, bExcludeFirstLevelTreeLines) {
        var STDCR = qx.ui.treevirtual.SimpleTreeDataCellRenderer; // If we're in column 0 and excludeFirstLevelTreeLines is enabled, then
        // we treat this as if no tree lines were requested.

        if (column == 0 && bExcludeFirstLevelTreeLines) {
          bUseTreeLines = false;
        } // If we're not on the final column...


        if (column < node.level - 1) {
          // then return either a line or a blank icon, depending on
          // bUseTreeLines
          return bUseTreeLines && !node.lastChild[column] ? STDCR.__P_432_5.line : {
            icon: this.BLANK
          };
        }

        var bLastChild = node.lastChild[node.lastChild.length - 1]; // Is this a branch node that does not have the open/close button hidden?

        if (node.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH && !node.bHideOpenClose) {
          // Does this node have any children, or do we always want the
          // open/close symbol to be shown?
          if (node.children.length > 0 || bAlwaysShowOpenCloseSymbol) {
            // If we're not showing tree lines...
            if (!bUseTreeLines) {
              // ... then just use an expand or contract
              return node.bOpened ? STDCR.__P_432_5.contract : STDCR.__P_432_5.expand;
            } // Are we looking at a top-level, first child of its parent?


            if (column == 0 && node.bFirstChild) {
              // Yup.  If it's also a last child...
              if (bLastChild) {
                // ... then use no tree lines.
                return node.bOpened ? STDCR.__P_432_5.onlyContract : STDCR.__P_432_5.onlyExpand;
              } else {
                // otherwise, use descender lines but no ascender.
                return node.bOpened ? STDCR.__P_432_5.startContract : STDCR.__P_432_5.startExpand;
              }
            } // It's not a top-level, first child.  Is this the last child of its
            // parent?


            if (bLastChild) {
              // Yup.  Return an ending expand or contract.
              return node.bOpened ? STDCR.__P_432_5.endContract : STDCR.__P_432_5.endExpand;
            } // Otherwise, return a crossing expand or contract.


            return node.bOpened ? STDCR.__P_432_5.crossContract : STDCR.__P_432_5.crossExpand;
          }
        } // This node does not have any children.  Return an end or cross, if
        // we're using tree lines.


        if (bUseTreeLines) {
          // If this is a child of the root node...
          if (node.parentNodeId == 0) {
            // If this is the only child...
            if (bLastChild && node.bFirstChild) {
              // ... then return a blank.
              return {
                icon: this.BLANK
              };
            } // Otherwise, if this is the last child...


            if (bLastChild) {
              // ... then return an end line.
              return STDCR.__P_432_5.end;
            } // Otherwise if this is the first child and is a branch...


            if (node.bFirstChild && node.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH) {
              // ... then return a start line.
              return node.bOpened ? STDCR.__P_432_5.startContract : STDCR.__P_432_5.startExpand;
            }
          } // If this is a last child, return and ending line; otherwise cross.


          return bLastChild ? STDCR.__P_432_5.end : STDCR.__P_432_5.cross;
        }

        return {
          icon: this.BLANK
        };
      },

      /**
       * Determine the position in the cell of the open/close button image
       *
       * @param table {Table}
       *   The column of indentation being requested, zero-relative
       *
       * @param node {Node}
       *   The node being displayed in the row.  The properties of a node are
       *   described in {@link qx.ui.treevirtual.SimpleTreeDataModel}
       *
       * @return {Object} Position of the Open/Close Button
       */
      getOpenCloseButtonPosition: function getOpenCloseButtonPosition(table, node) {
        var padding = 2;
        var width = table.getRowHeight() + 3;
        return {
          top: 0,
          left: (node.level - 1) * width + padding,
          width: width,
          height: table.getRowHeight()
        };
      }
    },
    destruct: function destruct() {
      this.__P_432_2 = this.__P_432_3 = this.__P_432_4 = null;
    }
  });
  qx.ui.treevirtual.SimpleTreeDataCellRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SimpleTreeDataCellRenderer.js.map?dt=1650122800063