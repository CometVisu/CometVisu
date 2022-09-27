/* Address-spec.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for <cv-address> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-address> component of the tile structure', () => {
  let oldController;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should register itself', () => {
    const address = document.createElement('cv-address');
    spyOn(address, 'addEventListener');
    const model = cv.data.Model.getInstance();
    spyOn(model, 'addUpdateListener');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    expect(addr).toBeInstanceOf(cv.ui.structure.tile.elements.Address);
    expect(addr.getConnected()).toBeTruthy();

    // test if the address has been registered
    const addresses = model.getAddresses('main');

    expect(addresses).toHaveSize(1);
    expect(addresses).toContain('Test');

    // as this is a readwrite address (default) if must have add as listener to the stateEvent
    expect(address.addEventListener).toHaveBeenCalledOnceWith('sendState', jasmine.any(Function));
    // also this address must have subscribed itself to the updates (read)
    expect(model.addUpdateListener).toHaveBeenCalledOnceWith('Test', addr.fireStateUpdate, addr, jasmine.falsy());

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should be a readonly address', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('mode', 'read');
    spyOn(address, 'addEventListener');
    const model = cv.data.Model.getInstance();
    spyOn(model, 'addUpdateListener');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    expect(addr).toBeInstanceOf(cv.ui.structure.tile.elements.Address);
    expect(addr.getConnected()).toBeTruthy();

    // test if the address has been registered
    const addresses = model.getAddresses('main');

    expect(addresses).toHaveSize(1);
    expect(addresses).toContain('Test');

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(address.addEventListener).not.toHaveBeenCalled();
    // but it must have subscribed itself to the updates (read)
    expect(model.addUpdateListener).toHaveBeenCalledOnceWith('Test', addr.fireStateUpdate, addr, jasmine.falsy());

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should be a writeonly address', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('mode', 'write');
    spyOn(address, 'addEventListener');
    const model = cv.data.Model.getInstance();
    spyOn(model, 'addUpdateListener');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    expect(addr).toBeInstanceOf(cv.ui.structure.tile.elements.Address);
    expect(addr.getConnected()).toBeTruthy();

    // test if the address has been registered
    const addresses = model.getAddresses('main');

    expect(addresses).toHaveSize(1);
    expect(addresses).toContain('Test');

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(address.addEventListener).toHaveBeenCalledOnceWith('sendState', jasmine.any(Function));
    // but it must have subscribed itself to the updates (read)
    expect(model.addUpdateListener).not.toHaveBeenCalled();

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should apply the transform to the receivedValue', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    spyOn(address, 'dispatchEvent');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    addr.fireStateUpdate('Test', 'ON');

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(address.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
    const ev = address.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      address: 'Test',
      state: 1,
      raw: 'ON',
      mapping: '',
      target: '',
      source: addr,
      addressValue: null,
      variant: null
    });

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should apply the mapping to the receivedValue', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    address.setAttribute('mapping', 'testMapping');
    spyOn(cv.Application.structureController, 'mapValue').and.returnValue('MappedOn');
    spyOn(address, 'dispatchEvent');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    addr.fireStateUpdate('Test', 'ON');

    expect(cv.Application.structureController.mapValue).toHaveBeenCalledOnceWith('testMapping', 1);

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(address.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
    const ev = address.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      address: 'Test',
      state: 'MappedOn',
      raw: 'ON',
      mapping: 'testMapping',
      target: '',
      source: addr,
      addressValue: null,
      variant: null
    });

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should send a write request to the client on an sendState event', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    const client = cv.io.BackendConnections.getClient('main');
    spyOn(client, 'write');

    // make sure that nothing is sent when there is no value
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
      }
    }));

    expect(client.write).not.toHaveBeenCalled();

    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(client.write).toHaveBeenCalledOnceWith('Test', 'ON', address);

    // make sure that the same value is not sent again
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));

    expect(client.write).toHaveBeenCalledOnceWith('Test', 'ON', address);

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should always send the fixed value for a trigger', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    address.setAttribute('value', '1');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    const client = cv.io.BackendConnections.getClient('main');
    spyOn(client, 'write');

    expect(client.write).not.toHaveBeenCalled();

    const button = new cv.ui.structure.tile.components.Button();
    button.setType('trigger');

    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '0',
        source: button
      }
    }));

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(client.write).toHaveBeenCalledOnceWith('Test', 'ON', address);

    // make sure that the same value is not sent again
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        source: button
      }
    }));

    expect(client.write).toHaveBeenCalledTimes(2);

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should always send the fixed value for a pushbutton', () => {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    address.setAttribute('value', '1');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    const client = cv.io.BackendConnections.getClient('main');
    spyOn(client, 'write');

    expect(client.write).not.toHaveBeenCalled();

    const button = new cv.ui.structure.tile.components.Button();
    button.setType('push');

    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '0',
        source: button
      }
    }));

    // as this is a read address if must NOT have add as listener to the stateEvent
    expect(client.write).toHaveBeenCalledOnceWith('Test', 'ON', address);

    // make sure that the same value is not sent again
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        source: button
      }
    }));

    expect(client.write).toHaveBeenCalledTimes(2);

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should initialized if a state exists already', () => {
    const model = cv.data.Model.getInstance();
    spyOn(model, 'getState').and.returnValue('ON');

    const address = document.createElement('cv-address');
    address.setAttribute('backend', 'test-backend');
    spyOn(address, 'dispatchEvent');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    expect(model.getState).toHaveBeenCalledOnceWith('Test', 'test-backend');

    // as this is a read address it must NOT have been added as listener to the stateEvent
    expect(address.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
    const ev = address.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      address: 'Test',
      state: 'ON',
      raw: 'ON',
      mapping: '',
      target: '',
      source: addr,
      addressValue: null,
      variant: null
    });

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });

  it('should not sent the same value twice', () => {
    const client = cv.io.BackendConnections.getClient('main');
    spyOn(client, 'write');

    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'raw');
    address.setAttribute('mode', 'readwrite');
    address.textContent = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));

    expect(client.write).toHaveBeenCalledOnceWith('Test', '1', address);

    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));

    expect(client.write).toHaveBeenCalledOnceWith('Test', '1', address);

    // send same value as update back -> should still block duplicated
    addr.fireStateUpdate('Test', '1');
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));
    expect(addr.getValue()).toBe('1');

    expect(client.write).toHaveBeenCalledOnceWith('Test', '1', address);

    // now sent an update with a different value -> should unblock
    addr.fireStateUpdate('Test', '0');
    address.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        value: '1'
      }
    }));

    expect(client.write).toHaveBeenCalledTimes(2);
    address.remove();
  });
});
