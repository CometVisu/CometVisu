/* Mapping-spec.js 
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
 * Unit tests for <cv-mapping> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-mapping> component of the tile structure', () => {
  let oldController;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should find the exact matches', function() {
    const mapping = document.createElement('cv-mapping');
    mapping.setAttribute('name', 'test');

    mapping.innerHTML = `
        <entry value="1">ON</entry>
        <entry value="0">OFF</entry>
        <entry value="NULL">is_null</entry>
        <entry value="*">wildcard</entry>
    `;
    document.body.appendChild(mapping);
    const map = mapping._instance;

    expect(map).toBeInstanceOf(cv.ui.structure.tile.elements.Mapping);
    expect(map.getConnected()).toBeTruthy();
    expect(map.mapValue('1')).toEqual('ON');
    expect(map.mapValue('0')).toEqual('OFF');
    expect(map.mapValue(null)).toEqual('is_null');
    expect(map.mapValue('anything')).toEqual('wildcard');

    mapping.remove();

    expect(map.getConnected()).toBeFalsy();
  });

  it('should test if the default value is used', function() {
    const mapping = document.createElement('cv-mapping');
    mapping.setAttribute('name', 'test');

    mapping.innerHTML = `
        <entry value="1" default="true">ON</entry>
        <entry value="0">OFF</entry>
    `;
    document.body.appendChild(mapping);
    const map = mapping._instance;

    expect(map).toBeInstanceOf(cv.ui.structure.tile.elements.Mapping);
    expect(map.getConnected()).toBeTruthy();
    expect(map.mapValue('1')).toEqual('ON');
    expect(map.mapValue('0')).toEqual('OFF');
    expect(map.mapValue('anything')).toEqual('ON');

    mapping.remove();

    expect(map.getConnected()).toBeFalsy();
  });

  it('should match ranges', function() {
    const mapping = document.createElement('cv-mapping');
    mapping.setAttribute('name', 'test');

    mapping.innerHTML = `
        <entry range-min="-30" range-max="0">freezing</entry>
        <entry value="0">zero</entry>
        <entry range-min="0" range-max="10">cold</entry>
        <entry range-min="11" range-max="25" default="true">warm</entry>
        <entry range-min="25" range-max="50">hot</entry>
    `;
    document.body.appendChild(mapping);
    const map = mapping._instance;

    expect(map).toBeInstanceOf(cv.ui.structure.tile.elements.Mapping);
    expect(map.getConnected()).toBeTruthy();
    expect(map.mapValue('22')).toEqual('warm');
    expect(map.mapValue('1')).toEqual('cold');
    expect(map.mapValue('0')).toEqual('zero');
    expect(map.mapValue('25')).toEqual('warm');
    expect(map.mapValue('26')).toEqual('hot');

    // test is default is used
    expect(map.mapValue('99')).toEqual('warm');

    mapping.remove();

    expect(map.getConnected()).toBeFalsy();
  });

  it('should match a formula', function() {
    const mapping = document.createElement('cv-mapping');
    mapping.setAttribute('name', 'test');

    mapping.innerHTML = `
        <formula>y = x * 1000</formula>
    `;
    document.body.appendChild(mapping);
    const map = mapping._instance;

    expect(map).toBeInstanceOf(cv.ui.structure.tile.elements.Mapping);
    expect(map.getConnected()).toBeTruthy();
    expect(map.mapValue(1)).toEqual(1000);

    mapping.remove();

    expect(map.getConnected()).toBeFalsy();
  });
});
