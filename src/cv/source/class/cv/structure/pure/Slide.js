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
 * @module structure/pure/Slide
 * @requires structure/pure
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
    this.__main = $('#main');
    // check provided address-items for at least one address which has write-access
    var readonly = true;
    for (var addrIdx in this.getAddress()) {
      if (this.getAddress()[addrIdx][1] & 2) {
        // write-access detected --> no read-only mode
        readonly = false;
        break;
      }
    }
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", function () {
      var $actor = $( '#' + this.getPath() + ' .actor' );
      $actor.slider({
        step:    this.getStep(),
        min:     this.getMin(),
        max:     this.getMax(),
        range:   'min',
        animate: true,
        send_on_finish : this.getSendOnFinish(),
        start:   this.slideStart.bind(this),
        change:  this.slideChange.bind(this)
      });
      // disable slider interaction if in read-only mode --> just show the value
      if (readonly) {
        $actor.slider({ disabled: true });
      }
      $actor.on( 'slide', this.slideUpdateValue.bind(this) );

      if(this.getFormat()) {
        // initially setting a value
        $actor.children('.ui-slider-handle').text(sprintf(this.getFormat(), this.applyMapping(this.getMin())));
      }
    }, this);
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

    _getInnerDomString: function () {
      return '<div class="actor"></div>';
    },

    _update: function (ga, d) {
      var actor = $(this.getActor());

      if (this.getInAction())
        return;

      var value = this.applyTransform(ga, d);
      if (this.getValue() != value) {
        this.setValue(value);
        this.setValueInternal(false);
        actor.slider('value', value);
        this.setValueInternal(true);
        if (this.getFormat() != null)
          actor.children('.ui-slider-handle').text(sprintf(this.getFormat(), this.applyMapping(value)));
      }
      this.transformSlider(value, actor.children('.ui-slider-handle'));
    },

    transformSlider: function (value, handle) {
      if (!this.__main.data('disableSliderTransform')) {
        if (!isNaN(value)) {
          value = parseFloat(value); // force any (string) value to float
          var sliderMax = $(handle).parent().slider("option", "max") + ($(handle).parent().slider("option", "min") * -1);
          var percent = Math.round((100 / sliderMax) * (value + ($(handle).parent().slider("option", "min") * -1)));
          //console.log("Value: "+value+", Max/Min: "+sliderMax+", %: "+percent+" => "+percent);
          $(handle).css('transform', 'translateX(-' + percent + '%)');
        }
      }
    },

    slideUpdateValue: function (event, ui) {
      if (this.getFormat()) {
        $(ui.handle).text(sprintf(this.getFormat(), this.applyMapping(ui.value)));
      }
      this.transformSlider(ui.value, ui.handle);
    },

    /**
     * Start a thread that regularly sends the slider position to the bus
     * @method slideStart
     * @param {} event
     * @param {} ui
     */
    slideStart: function (event, ui) {
      var actor = $(this.getActor());

      if (this.getSendOnFinish() === true) return;

      this.setInAction(true);
      this.setValueInternal(true);
      this.__timerId = setInterval(function () {
        var asv = actor.slider('value');

        if (this.getValue() == asv) return;

        var addresses = this.getAddress();
        for (var addr in addresses) {
          if (!(addresses[addr][1] & 2)) continue; // skip when write flag not set
          var dv = this.applyTransformEncode(addr, asv);
          if (dv != this.applyTransformEncode(addr, this.getValue()))
            cv.TemplateEngine.getInstance().visu.write(addr, dv);
        }
        this.setValue(asv);
      }.bind(this), 250); // update KNX every 250 ms
    },
    /**
     * Delete the update thread and send the final value of the slider to the bus
     * @method slideChange
     * @param {} event
     * @param {} ui
     */
    slideChange: function (event, ui) {
      clearInterval(this.__timerId);
      this.setInAction(false);
      if (this.getValueInternal() && this.getValue() != ui.value) {
        var addresses = this.getAddress();
        for (var addr in addresses) {
          if (!(addresses[addr][1] & 2)) continue; // skip when write flag not set
          var uv = this.applyTransformEncode(addr, ui.value);
          if (uv != this.applyTransformEncode(addr, this.getValue()))
            cv.TemplateEngine.getInstance().visu.write(addr, uv);
        }
      }
      this.transformSlider(ui.value, ui.handle);
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     *
     * @method getActionValue
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
