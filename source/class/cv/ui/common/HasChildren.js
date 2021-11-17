/* HasChildren.js 
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
 * Mixin for all widgets that can have other widgets as children, this mixin includes the static parsing part
 * and the methods for the widget instance.
 */
qx.Mixin.define('cv.ui.common.HasChildren', {

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    const children = [];
    // create children
    const model = cv.data.Model.getInstance();
    if (cv.Config.lazyLoading === false || cv.Config.treePath.indexOf(props.path) >= 0) {
      // this.debug(props.$$type+" INIT ["+props.path+"] with "+props.children.length+" children");
      props.children.forEach(function (path) {
        const data = model.getWidgetData(path);
        const widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
        if (widget) {
          children.push(widget);
          widget.setParentWidget(this);
        }
      }, this);
      this.setChildWidgets(children);
    }
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    /**
     * Array with child paths
     */
    children: {
      check: 'Array',
      init: []
    },

    /**
     * Array with child widget objects
     */
    childWidgets: {
      check: 'Array',
      init: []
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    /**
     * Creates the HTML code for the children if this widget
     *
     * @param noWidgetContainer {Boolean} if false: do not surround the childrens with a div-element with class 'widget_container'
     * @return {String} HTML code
     */
    getChildrenDomString: function (noWidgetContainer) {
      let container = '';

      this.getChildWidgets().forEach(function (widget) {
        const subelement = widget.getDomString();
        if (undefined === subelement) {
          return;
        }
        if (noWidgetContainer === true) {
          container += subelement;
        } else {
          container += '<div class="widget_container' +
            (widget.getRowspanClass ? ' '+widget.getRowspanClass() : '') +
            (widget.getContainerClass && widget.getContainerClass() ? ' '+widget.getContainerClass() : '') +
            (widget.get$$type() === 'break' ? ' break_container' : '') + // special case for break widget
            '" id="' + widget.getPath() + '" data-type="' + widget.get$$type() + '">' + subelement + '</div>';
        }
      }, this);
      return container;
    },

    /**
     * Create a collection of html elements of the children
     * @returns {DocumentFragment}
     */
    getChildrenDom: function() {
      const fragment = document.createDocumentFragment();
      this.getChildWidgets().forEach(function (widget) {
        const subelement = widget.getDom();
        subelement.setAttribute('id', widget.getPath());
        subelement.setAttribute('data-type', widget.get$$type());
        if (subelement) {
          fragment.appendChild(subelement);
        }
      }, this);
      return fragment;
    }
  }
});
