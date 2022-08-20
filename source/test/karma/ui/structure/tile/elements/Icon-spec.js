/* Icon-spec.js 
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
