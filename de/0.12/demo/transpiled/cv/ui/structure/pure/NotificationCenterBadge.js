(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.NotificationCenter": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(props) {
      var classes = props.classes.trim().split(" "),
          i_right = classes.indexOf("right");

      if (i_right !== -1) {
        // do not align, but float the container instead
        this.setContainerClass("float-right");
        classes.splice(i_right, 1);
        props.classes = classes.join(" ");
      }

      cv.ui.structure.AbstractWidget.constructor.call(this, props);
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
      _onDomReady: function _onDomReady() {
        cv.ui.structure.pure.NotificationCenterBadge.prototype._onDomReady.base.call(this);

        var center = cv.ui.NotificationCenter.getInstance();
        center.getMessages().addListener("changeLength", this._onChangeCounter, this);

        this._onChangeCounter();

        center.addListener("changedGlobalSeverity", this._onChangeGlobalSeverity, this);
      },
      // property apply
      _applyVisible: function _applyVisible(value) {
        // hide NotificationCenters own badge while we are visible
        cv.ui.NotificationCenter.getInstance().disableBadge(value);
      },
      action: function action(ev) {
        if (this._skipNextEvent === ev.getType()) {
          this._skipNextEvent = null;
          return;
        }

        cv.ui.NotificationCenter.getInstance().toggleVisibility();
      },
      __getBadgeElement: function __getBadgeElement() {
        if (!this.__badgeElement) {
          this.__badgeElement = this.getDomElement().querySelector(".badge");
        }

        return this.__badgeElement;
      },
      _onChangeGlobalSeverity: function _onChangeGlobalSeverity(ev) {
        var classList = this.__getBadgeElement().classList;

        classList.remove.apply(classList, cv.ui.NotificationCenter.getInstance().getSeverities());

        if (ev.getData()) {
          classList.add(ev.getData());
        }
      },
      _onChangeCounter: function _onChangeCounter() {
        var messages = cv.ui.NotificationCenter.getInstance().getMessages().length;
        this.__getBadgeElement().innerHTML = "" + messages;

        if (this.isHideWhenEmpty()) {
          this.__getBadgeElement().style.display = messages === 0 ? "none" : "block";
        }
      },
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var style = "";

        if (this.isHideWhenEmpty() && this.getCounter() === 0) {
          style = ' style="display: none;"';
        }

        return '<div class="actor badge"' + style + '>' + this.getCounter() + '</div>';
      }
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      var center = cv.ui.NotificationCenter.getInstance();
      center.getMessages().removeListener("changeLength", this._onChangeCounter, this);
      center.removeListener("changedGlobalSeverity", this._onChangeGlobalSeverity, this);
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("notificationcenterbadge", statics);
    }
  });
  cv.ui.structure.pure.NotificationCenterBadge.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NotificationCenterBadge.js.map?dt=1589401091895