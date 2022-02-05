/**
 * Unit tests for <cv-icon> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-icon> component of the tile structure', () => {
  let oldController;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should handle a remix icon', function() {
    const icon = document.createElement('cv-icon');
    icon.textContent = 'ri-test-icon';
    document.body.appendChild(icon);
    const inst = icon._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Icon);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.getId()).toEqual('ri-test-icon');
    expect(icon.classList.contains('ri-test-icon')).toBeTruthy();
    expect(icon.textContent).toBeFalsy();

    inst.setId('ri-another-icon');

    expect(icon.classList.contains('ri-test-icon')).toBeFalsy();
    expect(icon.classList.contains('ri-another-icon')).toBeTruthy();

    icon.remove();

    expect(inst.getConnected()).toBeFalsy();
  });

  it('should handle icons that are already used as className', function() {
    const icon = document.createElement('cv-icon');
    icon.classList.add('ri-test-icon');
    document.body.appendChild(icon);
    const inst = icon._instance;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Icon);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.getId()).toEqual('ri-test-icon');
    expect(icon.classList.contains('ri-test-icon')).toBeTruthy();
    expect(icon.textContent).toBeFalsy();

    inst.setId('ri-another-icon');

    expect(icon.classList.contains('ri-test-icon')).toBeFalsy();
    expect(icon.classList.contains('ri-another-icon')).toBeTruthy();

    icon.remove();

    expect(inst.getConnected()).toBeFalsy();
  });

/*  it('should handle an knx-uf icon', function() {
    const icon = document.createElement('cv-icon');
    icon.setAttribute('set', 'knx-uf');
    icon.textContent = 'svg-icon';
    document.body.appendChild(icon);
    const inst = icon._instance;
    let svg = icon.firstChild;

    expect(inst).toBeInstanceOf(cv.ui.structure.tile.elements.Icon);
    expect(inst.getConnected()).toBeTruthy();
    expect(inst.getId()).toEqual('svg-icon');
    expect(icon.textContent).toBeFalsy();
    expect(icon.children.length).toEqual(1);
    expect(svg.tagName.toLowerCase()).toEqual('svg');
    expect(svg.firstChild.getAttribute('xlink:href'), qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg') + '#kux-svg-icon');

    inst.setId('another-icon');

    expect(icon.firstChild.firstChild.getAttribute('xlink:href'), qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg') + '#kux-svg-icon');

    expect(icon.children.length).toEqual(1);

    icon.remove();

    expect(inst.getConnected()).toBeFalsy();
  });*/
});
