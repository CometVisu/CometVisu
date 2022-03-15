/**
 * Unit tests for <cv-styling> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-styling> component of the tile structure', () => {
  let oldController;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should find the exact matches', function() {
    const styling = document.createElement('cv-styling');
    styling.setAttribute('name', 'test');

    styling.innerHTML = `
        <entry value="1">ON</entry>
        <entry value="0">OFF</entry>
        <entry value="NULL">is_null</entry>
        <entry value="*">wildcard</entry>
    `;
    document.body.appendChild(styling);
    const inst = styling._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Styling);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.mapValue('1')).toEqual('ON');
    expect(inst.mapValue('0')).toEqual('OFF');
    expect(inst.mapValue(null)).toEqual('is_null');
    expect(inst.mapValue('anything')).toEqual('wildcard');

    styling.remove();

    expect(inst.getConnected()).toBeFalsy();
  });

  it('should test if the default value is used', function() {
    const styling = document.createElement('cv-styling');
    styling.setAttribute('name', 'test');

    styling.innerHTML = `
        <entry value="1" default="true">ON</entry>
        <entry value="0">OFF</entry>
    `;
    document.body.appendChild(styling);
    const inst = styling._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Styling);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.mapValue('1')).toEqual('ON');
    expect(inst.mapValue('0')).toEqual('OFF');
    expect(inst.mapValue('anything')).toEqual('ON');

    styling.remove();

    expect(inst.getConnected()).toBeFalsy();
  });

  it('should match ranges', function() {
    const styling = document.createElement('cv-styling');
    styling.setAttribute('name', 'test');

    styling.innerHTML = `
        <entry range-_min="-30" range-max="0">freezing</entry>
        <entry value="0">zero</entry>
        <entry range-min="0" range-max="10">cold</entry>
        <entry range-min="11" range-max="25" default="true">warm</entry>
        <entry range-min="25" range-max="50">hot</entry>
    `;
    document.body.appendChild(styling);
    const inst = styling._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Styling);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.mapValue('22')).toEqual('warm');
    expect(inst.mapValue('1')).toEqual('cold');
    expect(inst.mapValue('0')).toEqual('zero');
    expect(inst.mapValue('25')).toEqual('warm');
    expect(inst.mapValue('26')).toEqual('hot');

    // test is default is used
    expect(inst.mapValue('99')).toEqual('warm');

    styling.remove();

    expect(inst.getConnected()).toBeFalsy();
  });

  it('should match a formula', function() {
    const styling = document.createElement('cv-styling');
    styling.setAttribute('name', 'test');

    styling.innerHTML = `
        <formula>y = x * 1000</formula>
    `;
    document.body.appendChild(styling);
    const inst = styling._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Styling);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.mapValue(1)).toEqual(1000);

    styling.remove();

    expect(inst.getConnected()).toBeFalsy();
  });
});
