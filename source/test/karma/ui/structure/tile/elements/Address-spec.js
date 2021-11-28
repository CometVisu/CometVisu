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

  it('should get updates for read addresses', function() {
    const address = document.createElement('cv-address');
    address.setAttribute('transform', 'OH:switch');
    address.innerHTML = 'Test';
    document.body.appendChild(address);
    const addr = address._instance;

    expect(addr).toBeInstanceOf(cv.ui.structure.tile.elements.Address);
    expect(addr.getConnected()).toBeTruthy();

    address.remove();

    expect(addr.getConnected()).toBeFalsy();
  });
});
