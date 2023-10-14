/**
 * SvgValue for energy entities.
 */
qx.Class.define('cv.ui.structure.tile.components.EnergyEntity', {
  extend: cv.ui.structure.tile.components.SvgValue,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this._connections = [];
    this._inverseConnections = [];
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      check: ['pv', 'battery', 'grid', 'house', 'charger', 'heatpump', 'consumer'],
      nullable: true,
      apply: '_applyType'
    },

    row: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    column: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    connectTo: {
      check: 'String',
      nullable: true,
      apply: '_applyConnectTo'
    },

    connectFrom: {
      check: 'String',
      nullable: true,
      apply: '_applyConnectFrom'
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
    },

    useConnectionSum: {
      check: 'Boolean',
      init: false,
      apply: '_applyUseConnectionSum'
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
      },
      charger: {
        icon: 'knxuf-veh_wallbox'
      },
      heatpump: {
        icon: 'knxuf-sani_earth_source_heat_pump'
      },
      consumer: {
        icon: 'knxuf-measure_smart_meter'
      }
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _connectorTo: null,
    _connectorFrom: null,
    _noValue: null,
    _useConnectionsSumAsValue: null,
    /**
     * @type {Array<cv.ui.structure.tile.components.EnergyEntity>}
     */
    _connections: null,
    /**
     * @type {Array<cv.ui.structure.tile.components.EnergyEntity>}
     */
    _inverseConnections: null,

    _parseInt(val) {
      return parseInt(val);
    },

    _parseFloat(val) {
      return parseFloat(val);
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
      this.setUseConnectionSum(this._noValue && this.getType() === 'house');
      if (this._noValue && this.getType() !== 'house') {
        // this has no addresses and therefore no values, we only show the icon then without circle
        for (const elem of this._svg.querySelectorAll('circle, text:not(.icon)')) {
          elem.remove();
        }
        this._iconSize = 32;
        this._iconPosition = {
          x: '50%',
          y: '50%'
        };
        const icon = this._svg.querySelector('text.icon');
        if (icon) {
          icon.style.fontSize = this._iconSize + 'px';
        }
      }
      this._applyPosition();
      window.requestAnimationFrame(() => {
        this._applyConnectTo(this.getConnectTo());
        this._applyConnectFrom(this.getConnectFrom());
      });

      this.addListener('changeValue', this._updateDirection, this);
    },

    preMappingHook(value) {
      // we only show positive values here, energy flow is shown via connection direction
      return Math.abs(value);
    },

    /**
     * Adds an incoming connection from another EnergyEntity
     * @param other {cv.ui.structure.tile.components.EnergyEntity} connected from other to this
     */
    addConnection(other) {
      if (!this._connections.includes(other)) {
        this._connections.push(other);
        if (this.getUseConnectionSum()) {
          other.addListener('changeValue', this._updateConnectionsSum, this);
        }
      }
    },

    /**
     * Adds an incoming inverse connection from another EnergyEntity.
     * Inverse connection means that the sign of the other entity is flipped for summing all values
     * @param other {cv.ui.structure.tile.components.EnergyEntity} connected from other to this
     */
    addInverseConnection(other) {
      if (!this._inverseConnections.includes(other)) {
        this._inverseConnections.push(other);
        if (this.getUseConnectionSum()) {
          other.addListener('changeValue', this._updateConnectionsSum, this);
        }
      }
    },

    /**
     * Remove an incoming connection from another EnergyEntity
     * @param other {cv.ui.structure.tile.components.EnergyEntity}
     */
    removeConnection(other) {
      if (this._connections.includes(other)) {
        this._connections.remove(other);
        if (this.getUseConnectionSum()) {
          other.removeListener('changeValue', this._updateConnectionsSum, this);
        }
      }
    },

    /**
     * Remove an incoming inverse connection from another EnergyEntity
     * @param other {cv.ui.structure.tile.components.EnergyEntity}
     */
    removeInverseConnection(other) {
      if (this._inverseConnections.includes(other)) {
        this._inverseConnections.remove(other);
        if (this.getUseConnectionSum()) {
          other.removeListener('changeValue', this._updateConnectionsSum, this);
        }
      }
    },

    _applyUseConnectionSum(value) {
      if (value) {
        for (const other of this._connections) {
          // refresh connections
          other.removeListener('changeValue', this._updateConnectionsSum, this);
          other.addListener('changeValue', this._updateConnectionsSum, this);
        }
        for (const other of this._inverseConnections) {
          // refresh connections
          other.removeListener('changeValue', this._updateConnectionsSum, this);
          other.addListener('changeValue', this._updateConnectionsSum, this);
        }
      }
    },

    _updateConnectionsSum() {
      let sum = 0.0;
      for (const other of this._connections) {
        sum += other.getValue();
      }
      for (const other of this._inverseConnections) {
        sum -= other.getValue();
      }
      this.setValue(sum);
    },

    _updateDirection() {
      const value = Math.round(this.getValue());
      const connectors = [this._connectorTo, this._connectorFrom];
      for (const connector of connectors) {
        if (connector) {
          if (value < 0) {
            connector.setShowDirection('source');
          } else if (value > 0) {
            connector.setShowDirection('target');
          } else {
            connector.setShowDirection('none');
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

    _applyPosition() {
      if (this._parentGridLayout && this._svg) {
        this._parentGridLayout.layout(this._svg, this.getRow(), this.getColumn());
      }
    },

    _applyConnectTo(targetId) {
      if (this._svg && targetId) {
        const parent = this._element.parentElement
        const target = parent.querySelector('#' + targetId);
        if (target && target.nodeName.toLowerCase() === 'cv-energy-entity') {
          if (!this._connectorTo) {
            this._connectorTo = this._initConnection(this, target._instance);
            this._applyConnectionPoints(this.getConnectionPoints());
            this._updateDirection();
            // we are the energy source for the target
            target._instance.addConnection(this);
          } else {
            this._connectorTo.setTarget(target._instance);
          }
        }
      }
      if (targetId) {
        this.registerPreMappingHook(this.preMappingHook, this);
      } else {
        this.unregisterPreMappingHook(this.preMappingHook);
      }
    },

    _applyConnectFrom(sourceId) {
      if (this._svg && sourceId) {
        const parent = this._element.parentElement
        const source = parent.querySelector('#' + sourceId);
        if (source && source.nodeName.toLowerCase() === 'cv-energy-entity') {
          if (!this._connectorFrom) {
            this._connectorFrom = this._initConnection(source._instance, this);
            this._applyConnectionPoints(this.getConnectionPoints());
            this._updateDirection();
            // we take energy from the target
            source._instance.addInverseConnection(this);
          } else {
            this._connectorFrom.setSource(source._instance);
          }
        }
      }
    },

    /**
     *
     * @param source {cv.ui.structure.tile.components.EnergyEntity}
     * @param target {cv.ui.structure.tile.components.EnergyEntity}
     * @returns {cv.ui.structure.tile.components.svg.Connector}
     * @private
     */
    _initConnection(source, target) {
      const connector = new cv.ui.structure.tile.components.svg.Connector(source, target);
      if (source.hasNoValue()) {
        const targetId = target.getElement().getAttribute('id');
        const parentElement = this._element.parentElement.querySelector('#' + targetId);
        if (parentElement && parentElement._instance && parentElement._instance instanceof cv.ui.structure.tile.components.EnergyEntity && !parentElement._instance.hasNoValue()) {
          // use styleClass from target
          parentElement._instance.bind('styleClass', connector, 'styleClass');
        }
      } else {
        this.bind('styleClass', connector, 'styleClass');
      }
      return connector;
    },

    _applyConnectionPoints(value) {
      if (value) {
        const connectors = [];
        if (this._connectorTo) {
          connectors.push(this._connectorTo);
        }
        if (this._connectorFrom) {
          connectors.push(this._connectorFrom);
        }
        for (const connector of connectors) {
          if (value === 'auto') {
            connector.set({
              sourceConnectionPoint: 'auto',
              targetConnectionPoint: 'auto'
            });
          } else {
            const [source, target] = value.split('-');
            connector.set({
              sourceConnectionPoint: source,
              targetConnectionPoint: target
            });
          }
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
    this._disposeObjects('_connectorTo', '_connectorFrom');
    this._connections.clear();
    this._inverseConnections.clear();
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'energy-entity',
      class extends QxConnector {
        static observedAttributes = ['icon', 'type', 'stroke', 'radius', 'row', 'column', 'x', 'y', 'foreground-color', 'connect-to', 'connect-from', 'connection-points'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
