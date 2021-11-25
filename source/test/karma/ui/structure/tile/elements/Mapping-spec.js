/**
 * Unit tests for <cv-mapping> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-mapping> component', function() {
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
        <entry range_min="-30" range_max="0">freezing</entry>
        <entry value="0">zero</entry>
        <entry range_min="0" range_max="10">cold</entry>
        <entry range_min="11" range_max="25" default="true">warm</entry>
        <entry range_min="25" range_max="50">hot</entry>
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
