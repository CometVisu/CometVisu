/* Slide.js 
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


/**
 * TODO: complete docs
 *
 * @require(qx.module.Attribute,qx.module.Css,qx.module.Traversing,qx.module.Manipulating,qx.module.event.Keyboard)
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.Slide', {
  extend: cv.structure.pure.AbstractWidget,
  include: [cv.role.Operate, cv.role.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    // check provided address-items for at least one address which has write-access
    var readonly = true;
    for (var addrIdx in this.getAddress()) {
      if (this.getAddress()[addrIdx][1] & 2) {
        // write-access detected --> no read-only mode
        readonly = false;
        break;
      }
    }
    this.__readonly = readonly;
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    min: {
      check: "Number",
      init: 0
    },
    max: {
      check: "Number",
      init: 100
    },
    step: {
      check: "Number",
      init: 0.5
    },
    sendOnFinish: {
      check: "Boolean",
      init: false
    },
    valueInternal: {
      check: "Boolean",
      init: true
    },
    inAction: {
      check: "Boolean",
      init: false
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'step': {"default": 0.5, transform: parseFloat},
        'send_on_finish': {target: 'sendOnFinish', "default": false}
      };
    },

    afterParse: function (xml, path) {

      var datatype_min = undefined;
      var datatype_max = undefined;
      qx.bom.Selector.matches("address", qx.dom.Hierarchy.getChildElements(xml)).forEach(function(elem) {
        var transform = elem.getAttribute('transform');
        if (cv.Transform.registry[transform] && cv.Transform.registry[transform].range) {
          if (!( datatype_min > cv.Transform.registry[transform].range.min ))
            datatype_min = cv.Transform.registry[transform].range.min;
          if (!( datatype_max < cv.Transform.registry[transform].range.max ))
            datatype_max = cv.Transform.registry[transform].range.max;
        }
      });
      var min = parseFloat(xml.getAttribute('min') || datatype_min || 0);
      var max = parseFloat(xml.getAttribute('max') || datatype_max || 100);

      var data = cv.data.Model.getInstance().getWidgetData(path);
      data.min = min;
      data.max = max;
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __main: null,
    __timerId: null,
    __slider : null,
    __readonly: null,
    __initialized: null,

    _onDomReady: function() {
      this.base(arguments);
      var actor = this.getActor();
      var slider = this.__slider = new cv.ui.website.Slider(actor);
      slider.setFormat(this.getFormat());
      slider.setConfig("step", this.getStep());
      slider.setConfig("minimum", this.getMin());
      slider.setConfig("maximum", this.getMax());
      // set initial value
      slider.setValue(parseFloat(this.applyMapping(this.getMin())));

      if (this.__readonly) {
        slider.setEnabled(false);
      }
      slider.init();

      slider.on("changeValue", qx.util.Function.debounce(this._onChangeValue, 250, true), this);

      this.addListener("changeValue", function(ev) {
        slider.setValue(parseFloat(ev.getData()));
      }, this);

      // add CSS classes for compability with old sliders
      slider.addClasses(["ui-slider", "ui-slider-horizontal", "ui-widget", "ui-widget-content", "ui-corner-all"]);
      var knob = slider.find(".qx-slider-knob");
      knob.addClasses(["ui-slider-handle", "ui-state-default", "ui-corner-all"]);
      this.__initialized= true;

      var pageId = this.getParentPage().getPath();
      var broker = cv.MessageBroker.getInstance();

      broker.subscribe("page." + pageId + ".appear", function() {
        this.__slider.updatePositions();
      }, this);
    },

    _getInnerDomString: function () {
      return '<div class="actor"></div>';
    },

    _update: function (ga, d) {
      if (this.__initialized !== true) return;
      // var actor = $(this.getActor());

      if (this.getInAction())
        return;

      var value = this.applyTransform(ga, d);

      try {
        if (this.getValue() != value) {
          this.setValue(value);
          this.setValueInternal(false);
          if (this.__slider) {
            this.__slider.setValue(value);
          }
          this.setValueInternal(true);
        }
      } catch(e) {
        this.error(e);
      }
    },

    /**
     * Handle incoming value changes send by the slider widget (e.g. triggered by user interaction)
     * @param value {Number}
     * @private
     */
    _onChangeValue: function(value) {
      if (this.isSendOnFinish() === false || this.__slider.isInPointerMove()) {
        var addresses = this.getAddress();
        for (var addr in addresses) {
          if (!(addresses[addr][1] & 2)) continue; // skip when write flag not set
          var dv = this.applyTransformEncode(addr, value);
          if (dv != this.applyTransformEncode(addr, this.getValue()) && !isNaN(dv))
            cv.TemplateEngine.getInstance().visu.write(addr, dv);
        }
      }
      this.setValue(value);
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     */
    getActionValue: function () {
      return "";
    }
  },

  defer: function () {
    // register the parser
    cv.xml.Parser.addHandler("slide", cv.structure.pure.Slide);
  }
}); // end define
