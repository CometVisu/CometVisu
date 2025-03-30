/*
 * Copyright (c) 2025, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for <cv-power-entity> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-power-entity> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
    cv.ui.structure.tile.elements.AddressGroup.DEBOUNCE_TIME = 0;
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
    cv.ui.structure.tile.elements.AddressGroup.DEBOUNCE_TIME = 10;
  });

  it('should create a default power-entity', function() {
    const element = this.createTileWidgetWithComponent('cv-power-entity', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-POWER-ENTITY');
    expect(element._instance instanceof cv.ui.structure.tile.components.energy.PowerEntity).toBe(true);
  });

  it('should create a pv power-entity', function() {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-power-entity', { type: 'pv'}, '');
    expect(element.getAttribute('icon')).toBe('knxuf-weather_sun');
    expect(element.getAttribute('styling')).toBe('tile-pv-power');
  });

  it('should connect two power-entities', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {
    }, '<cv-power-entity type="pv" id="pv" connect-to="house"></cv-power-entity>' +
      '<cv-power-entity type="house" id="house"></cv-power-entity>');
    window.requestAnimationFrame(function() {
      const connector = element.querySelector('svg > path#pv-house');
      expect(connector).not.toBeNull();
      expect(connector.getAttribute('class')).toBe('connection');

      const pv = element.querySelector('cv-power-entity#pv');
      const house = element.querySelector('cv-power-entity#house');
      expect(house._instance._connections.includes(pv._instance)).toBeTrue();
      house._instance.removeConnection(pv._instance);
      expect(house._instance._connections.includes(pv._instance)).toBeFalse();
      done();
    });
  });

  it('should connect two power-entities inverse', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {
    }, '<cv-power-entity type="pv" id="pv"></cv-power-entity>' +
      '<cv-power-entity type="house" id="house" connect-from="pv"></cv-power-entity>');
    window.requestAnimationFrame(function() {
      const connector = element.querySelector('svg > path#pv-house');
      expect(connector).not.toBeNull();
      expect(connector.getAttribute('class')).toBe('connection');

      const pv = element.querySelector('cv-power-entity#pv');
      const house = element.querySelector('cv-power-entity#house');
      expect(pv._instance._inverseConnections.includes(house._instance)).toBeTrue();
      pv._instance.removeInverseConnection(house._instance);
      expect(pv._instance._inverseConnections.includes(house._instance)).toBeFalse();
      done();
    });
  });

  it('should sum a group of address values', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {}, '<cv-power-entity id="pv" type="pv">\n' +
      '                        <cv-address-group operator="+">\n' +
      '                            <cv-address transform="OH:number" mode="read">V1</cv-address>\n' +
      '                            <cv-address transform="OH:number" mode="read">V2</cv-address>\n' +
      '                        </cv-address-group>\n' +
      '                    </cv-power-entity>');

    spyOn(cv.Application.structureController, 'mapValue').and.callFake(function(mapping, value) {
      return value;
    });

    const model = cv.data.Model.getInstance();
    model.onUpdate('V1', '100');
    model.onUpdate('V2', '200');
    window.requestAnimationFrame(function() {
      const pv = element.querySelector('cv-power-entity#pv');
      const svg = pv._instance.getSvg();
      expect(pv._instance.getAmount()).toBe(2);
      const amount = svg.querySelector('text.amount');
      const value = svg.querySelector('text.value');
      expect(amount).not.toBeNull();
      expect(value).not.toBeNull();
      expect(amount.textContent).toBe('2x');
      expect(value.textContent).toBe('300');
      model.onUpdate('V2', 0);
      expect(pv._instance.getAmount()).toBe(1);
      expect(svg.querySelector('text.amount')).toBeNull();
      expect(value.textContent).toBe('100');
      done();
    });
  });

  it('should show power-entity with progress', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {
    }, '<cv-power-entity type="pv" id="pv"><cv-address transform="OH:number" mode="read" target="progress">V1</cv-address></cv-power-entity>');

    cv.data.Model.getInstance().onUpdate('V1', '50');
    window.requestAnimationFrame(function() {
      const pv = element.querySelector('cv-power-entity#pv');
      const svg = pv._instance.getSvg();
      const progress = svg.querySelector('circle.bar');
      expect(progress).not.toBeNull();
      expect(progress.getAttribute('stroke-dasharray')).toBe('50 50');
      expect(svg.querySelector('title').textContent).toBe('50%');

      pv.setAttribute('foreground-color', 'red');
      expect(progress.style.stroke).toBe('red');

      done();
    });
  });

  it('should sum up all connection values', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {
    }, '<cv-power-entity type="pv" id="pv1" connect-to="house"><cv-address transform="OH:number" mode="read">V1</cv-address></cv-power-entity>' +
      '<cv-power-entity type="pv" id="pv2" connect-to="house"><cv-address transform="OH:number" mode="read">V2</cv-address></cv-power-entity>' +
      '<cv-power-entity type="house" id="house"></cv-power-entity>');

    const model = cv.data.Model.getInstance();
    const send = (v1, v2) => {
      model.onUpdate('V1', v1);
      model.onUpdate('V2', v2);
    };

    window.requestAnimationFrame(function() {
      send(50, 25);
      const house = element.querySelector('#house');
      const c1 = element.querySelector('svg > path#pv1-house');
      const c2 = element.querySelector('svg > path#pv2-house');
      expect(house._instance.getUseConnectionSum()).toBeTrue();
      expect(house._instance.getValue()).toBe(75);
      expect(c1._instance.getShowDirection()).toBe('target');
      expect(c2._instance.getShowDirection()).toBe('target');
      send(0, -25);
      expect(house._instance.getValue()).toBe(-25);
      expect(c1._instance.getShowDirection()).toBe('none');
      expect(c2._instance.getShowDirection()).toBe('source');
      done();
    });
  });
});
