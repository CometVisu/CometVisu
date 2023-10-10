/**
 * SvgValue for energy entities.
 */
qx.Class.define('cv.ui.structure.tile.components.EnergyEntity', {
  extend: cv.ui.structure.tile.components.SvgValue,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      check: ['pv', 'battery', 'grid', 'house'],
      nullable: true,
      apply: '_applyType'
    },

    cell: {
      check: 'Number',
      init: 0,
      apply: '_applyCell',
      transform: '_parseInt'
    },

    connectTo: {
      check: 'String',
      nullable: true,
      apply: '_applyConnectTo'
    },

    connectionPoints: {
      check: 'String',
      init: 'auto',
      apply: '_applyConnectionPoints'
    },

    foregroundColor: {
      check: 'String',
      nullable: true,
      apply: '_applyForegroundColor'
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    typeSettings: {
      pv: {
        icon: 'knxuf-weather_sun',
        styling: 'tile-pv-power'
      },
      battery: {
        icon: 'knxuf-measure_battery_100',
        styling: 'tile-battery-power',
        'foreground-color': 'var(--batteryConsumeColor)'
      },
      grid: {
        icon: 'knxuf-scene_power_grid',
        styling: 'tile-grid-power'
      },
      house: {
        icon: 'knxuf-control_building_empty'
      }
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _connector: null,
    _noValue: null,

    _parseInt(val) {
      return parseInt(val);
    },

    hasNoValue() {
      return this._noValue;
    },

    _init() {
      super._init();
      const element = this._element;
      if (element.hasAttribute('id')) {
        this._svg.setAttribute('id', element.getAttribute('id'));
      }
      if (!element.hasAttribute('mapping')) {
        element.setAttribute('mapping', 'tile-kilo-watts');
      }
      this._noValue = element.querySelectorAll(':scope > cv-address').length === 0;
      if (this._noValue) {
        // this has no addresses and therefore no values, we only show the icon then without circle
        for (const elem of this._svg.querySelectorAll('circle, text:not(.icon)')) {
          elem.remove();
        }
        this._iconSize = '32px';
        this._iconPosition = {
          x: '50%',
          y: '50%'
        };
        const icon = this._svg.querySelector('text.icon');
        if (icon) {
          icon.style.fontSize = this._iconSize;
        }
      }
      this._applyCell(this.getCell());
      window.requestAnimationFrame(() => {
        this._applyConnectTo(this.getConnectTo());
      });

      this.addListener('changeValue', this._updateDirection, this);
    },

    _updateDirection() {
      if (this._connector) {
        const value = Math.round(this.getValue());
        if (value < 0) {
          this._connector.setShowDirection('source');
        } else if (value > 0) {
          this._connector.setShowDirection('target');
        } else {
          if (value < 0) {
            this._connector.setShowDirection('none');
          }
        }
      }
    },

    _applyType(value) {
      const settings = cv.ui.structure.tile.components.EnergyEntity.typeSettings[value];
      if (settings) {
        for (const attribute in settings) {
          this._element.setAttribute(attribute, settings[attribute]);
        }
      }
    },

    _applyForegroundColor(value) {
      const bar = this._svg.querySelector('circle.bar');
      if (bar) {
        bar.style.stroke = value;
      }
    },

    _applyCell(value) {
      if (value > 0 && this._radius !== null) {
        value--; //start at 0
        const column = value % 3;
        const row = Math.floor(value / 3);
        if (row === 0) {
          this._element.setAttribute('y', '4px');
        } else if (row === 1) {
          this._element.setAttribute('y', `calc(50% - ${this._radius}px)`);
        } else if (row === 2) {
          this._element.setAttribute('y', `calc(100% - ${this._radius*2 + 8}px)`);
        }
        if (column === 0) {
          this._element.setAttribute('x', '8px');
        } else if (column === 1) {
          this._element.setAttribute('x', `calc(50% - ${this._radius}px)`);
        } else if (column === 2) {
          this._element.setAttribute('x', `calc(100% - ${this._radius*2 + 8}px)`);
        }
      }
    },

    _applyConnectTo(targetId) {
      if (this._svg && targetId) {
        const parent = this._svg.ownerSVGElement || this._svg;
        const target = parent.querySelector('#' + targetId);
        if (target) {
          if (!this._connector) {
            this._connector = new cv.ui.structure.tile.components.svg.Connector(this._svg, target);
            this._applyConnectionPoints(this.getConnectionPoints());
            this._updateDirection();
            if (this._noValue) {
              const parentElement = this._element.parentElement.querySelector('#' + targetId);
              if (parentElement && parentElement._instance && parentElement._instance instanceof cv.ui.structure.tile.components.EnergyEntity && !parentElement._instance.hasNoValue()) {
                // use styleClass from target
                parentElement._instance.bind('styleClass', this._connector, 'styleClass');
              }
            } else {
              this.bind('styleClass', this._connector, 'styleClass');
            }
          } else {
            this._connector.setTarget(target);
          }
        }
      }
    },

    _applyConnectionPoints(value) {
      if (this._connector && value) {
        if (value === 'auto') {
          this._connector.set({
            sourceConnectionPoint: 'auto',
            targetConnectionPoint: 'auto'
          });
        } else {
          const [source, target] = value.split('-');
          this._connector.set({
            sourceConnectionPoint: source,
            targetConnectionPoint: target
          });
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeObjects('_connector');
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'energy-entity',
      class extends QxConnector {
        static observedAttributes = ['icon', 'type', 'cell', 'x', 'y', 'foreground-color', 'connect-to', 'connection-points'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
