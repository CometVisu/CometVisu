/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Mixin for all SVG based components that can be connected to each other.
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Mixin.define('cv.ui.structure.tile.components.energy.MConnectable', {

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this._connections = [];
    this._inverseConnections = [];
  },


  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
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

    useConnectionSum: {
      check: 'Boolean',
      init: false,
      apply: '_applyUseConnectionSum'
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
    _useConnectionsSumAsValue: null,
    /**
     * @type {Array<cv.ui.structure.tile.components.energy.PowerEntity>}
     */
    _connections: null,
    /**
     * @type {Array<cv.ui.structure.tile.components.energy.PowerEntity>}
     */
    _inverseConnections: null,


    /**
     * Adds an incoming connection from another PowerEntity
     * @param other {cv.ui.structure.tile.components.energy.PowerEntity} connected from other to this
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
     * Adds an incoming inverse connection from another PowerEntity.
     * Inverse connection means that the sign of the other entity is flipped for summing all values
     * @param other {cv.ui.structure.tile.components.energy.PowerEntity} connected from other to this
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
     * Remove an incoming connection from another PowerEntity
     * @param other {cv.ui.structure.tile.components.energy.PowerEntity}
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
     * Remove an incoming inverse connection from another PowerEntity
     * @param other {cv.ui.structure.tile.components.energy.PowerEntity}
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

    _applyConnectTo(targetId) {
      if (this._svg && targetId) {
        const parent = this._element.parentElement;
        const target = parent.querySelector('#' + targetId);
        if (target && target.nodeName.toLowerCase() === 'cv-power-entity') {
          if (!this._connectorTo) {
            this._connectorTo = this._initConnection(this, target._instance);
            this._applyConnectionPoints(this.getConnectionPoints());
            this._updateDirection();
            // we are the power source for the target
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
        const parent = this._element.parentElement;
        const source = parent.querySelector('#' + sourceId);
        if (source && source.nodeName.toLowerCase() === 'cv-power-entity') {
          if (!this._connectorFrom) {
            this._connectorFrom = this._initConnection(source._instance, this);
            this._applyConnectionPoints(this.getConnectionPoints());
            this._updateDirection();
            // we take power from the target
            source._instance.addInverseConnection(this);
          } else {
            this._connectorFrom.setSource(source._instance);
          }
        }
      }
    },

    /**
     *
     * @param source {cv.ui.structure.tile.components.energy.PowerEntity}
     * @param target {cv.ui.structure.tile.components.energy.PowerEntity}
     * @returns {cv.ui.structure.tile.components.svg.Connector}
     * @private
     */
    _initConnection(source, target) {
      const connector = new cv.ui.structure.tile.components.svg.Connector(source, target);
      if (source.hasNoValue()) {
        const targetId = target.getElement().getAttribute('id');
        const parentElement = this._element.parentElement.querySelector('#' + targetId);
        if (parentElement && parentElement._instance && parentElement._instance instanceof cv.ui.structure.tile.components.energy.PowerEntity && !parentElement._instance.hasNoValue()) {
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
    const source = this.getSource();
    const target = this.getTarget();
    if (target) {
      target.removeConnection(this);
    }
    if (source) {
      source.removeInverseConnection(this);
    }

    this._disposeObjects('_connectorTo', '_connectorFrom');
    this._connections.clear();
    this._inverseConnections.clear();
  }
});
