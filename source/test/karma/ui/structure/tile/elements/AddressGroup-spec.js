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
 * Unit tests for <cv-address-group> element
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-address-group> element of the tile structure', () => {
  let oldController;
  let clientMock;
  let groupElement;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    cv.ui.structure.tile.elements.AddressGroup.DEBOUNCE_TIME = 0;

    clientMock = jasmine.createSpyObj('client', [
      'login',
      'subscribe',
      'terminate',
      'dispose',
      'isConnected',
      'write'
    ], { update: null, configuredIn: 'config' });

    spyOn(cv.io.BackendConnections, 'getClient').and.returnValue(clientMock);
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    cv.ui.structure.tile.elements.AddressGroup.DEBOUNCE_TIME = 10;
    cv.ui.structure.tile.elements.AddressGroup.C = 0;
    if (groupElement) {
      groupElement.remove();
      groupElement = null;
    }
  });

  function createAddressGroup(operator, val1, val2, groupAttributes) {
    const template = document.createElement('template');
    if (!groupAttributes) {
      groupAttributes = {};
    }
    groupAttributes.operator = operator;
    let attributesHTML = '';
    for (const key in groupAttributes) {
      attributesHTML += `${key}="${groupAttributes[key]}" `;
    }
    template.innerHTML = `<cv-address-group ${attributesHTML}><cv-address transform="OH:number">val1</cv-address><cv-address transform="OH:number">val2</cv-address></cv-address-group>`;
    const group = template.content.firstChild;
    document.body.appendChild(group);

    spyOn(group._instance, 'fireStateUpdate');
    groupElement = group;

    const model = cv.data.Model.getInstance();
    model.onUpdate('val1', val1);
    model.onUpdate('val2', val2);

    return group._instance;
  }

  it('should + values', () => {
    const group = createAddressGroup('+', 6, 3);

    expect(group).toBeInstanceOf(cv.ui.structure.tile.elements.AddressGroup);
    expect(group.getConnected()).toBeTruthy();

    expect(group.getValue()).toEqual(9);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 9);
  });

  it('should - values', () => {
    const group = createAddressGroup('-', 6, 3);
    expect(group.getValue()).toEqual(3);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 3);
  });

  it('should * values', () => {
    const group = createAddressGroup('*', 6, 3);
    expect(group.getValue()).toEqual(18);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 18);
  });

  it('should / values', () => {
    const group = createAddressGroup('/', 6, 3);
    expect(group.getValue()).toEqual(2);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 2);
  });

  it('should round values', () => {
    const group = createAddressGroup('/', 15, 4, {round: 'true'});
    expect(group.getValue()).toEqual(4);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 4);
  });

  it('should calculate with string numbers values', () => {
    const group = createAddressGroup('-', '6', '3');
    expect(group.getValue()).toEqual(3);
    expect(group.fireStateUpdate).toHaveBeenCalledWith('address-group_0', 3);
  });
});
