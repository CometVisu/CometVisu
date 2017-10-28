/* NotificationCenterBadge.js 
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
 * Shows the current number of messages in {@link cv.ui.NotificationCenter} and opens it on click.
 *
 *
 * @widgetexample <settings>
 *   <caption>Configuration example of a centered text widget</caption>
 *   <screenshot name="text_example" />
 * </settings>
 * <notificationcenterbadge>
 *  <layout colspan="0" />
 * </notificationcenterbadge>
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define('cv.ui.structure.pure.NotificationCenterBadge', {
  extend: cv.ui.structure.AbstractWidget,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    var classes = props.classes.trim().split(" ");
    if (classes.indexOf("right")) {
      // do not align, but float the container instead
      this.setContainerClass("float-right");
      qx.lang.Array.remove(classes, "right");
      props.classes = classes.join(" ");
    }
    this.base(arguments, props);
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    counter: {
      check: "Number",
      init: 0,
      apply: "_applyCounter"
    },
    hideWhenEmpty: {
      check: "Boolean",
      init: false
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __badgeElement: null,

    _onDomReady: function() {
      this.base(arguments);
      var center = cv.ui.NotificationCenter.getInstance();
      center.getMessages().addListener("changeLength", this._onChangeCounter, this);
      center.addListener("changeGlobalSeverity", this._onChangeGlobalSeverity, this);
    },

    // property apply
    _applyVisible: function(value) {
      // hide NotificationCenters own badge while we are visible
      cv.ui.NotificationCenter.getInstance().disableBadge(value);
    },

    action: function(ev) {
      if (this._skipNextEvent === ev.getType()) {
        this._skipNextEvent = null;
        return;
      }
      cv.ui.NotificationCenter.getInstance().toggleVisibility();
    },

    __getBadgeElement: function() {
      if (!this.__badgeElement) {
        this.__badgeElement = qx.bom.Selector.query(".badge", this.getDomElement())[0];
      }
      return this.__badgeElement;
    },

    _onChangeGlobalSeverity: function(ev) {
      qx.bom.element.Class.removeClasses(this.__getBadgeElement(), cv.ui.NotificationCenter.getInstance().getSeverities());
      if (ev.getData()) {
        qx.bom.element.Class.add(this.__getBadgeElement(), ev.getData());
      }
    },

    _onChangeCounter: function(ev) {
      qx.bom.element.Attribute.set(this.__getBadgeElement(), "html", ""+ev.getData());
      if (this.isHideWhenEmpty()) {
        qx.bom.element.Style.set(this.__getBadgeElement(), "display", ev.getData() === 0 ? "none" : "block");
      }
    },

    // overridden
    _getInnerDomString: function () {
      var style = "";
      if (this.isHideWhenEmpty() && this.getCounter() === 0) {
        style = ' style="display: none;"';
      }
      return '<div class="actor badge"'+style+'>'+this.getCounter()+'</div>';
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    var center = cv.ui.NotificationCenter.getInstance();
    center.getMessages().removeListener("changeLength", this._onChangeCounter, this);
    center.removeListener("changeGlobalSeverity", this._onChangeGlobalSeverity, this);
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("notificationcenterbadge", statics);
  }
});