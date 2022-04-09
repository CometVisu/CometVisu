/**
 * Unit tests for <cv-mapping> component
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
describe('testing the <cv-backend> component of the tile structure', () => {
  let oldController;
  let clientMock;
  let mockBackendName = 'test';

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();

    clientMock = jasmine.createSpyObj('client', ['login', 'subscribe'], {update: null});

    spyOn(cv.io.BackendConnections, 'addBackendClient').and.returnValue(clientMock);
    const model = cv.data.Model.getInstance();
    spyOn(model, 'getAddresses').and.returnValue(['addr1']);
    spyOn(model, 'setDefaultBackendName');
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should create a client and login', function() {
    const model = cv.data.Model.getInstance();
    const backend = document.createElement('cv-backend');
    backend.setAttribute('name', mockBackendName);
    backend.setAttribute('type', 'simulated');

    document.body.appendChild(backend);
    const b = backend._instance;

    expect(b).toBeInstanceOf(cv.ui.structure.tile.elements.Backend);
    expect(b.getConnected()).toBeTruthy();
    expect(cv.io.BackendConnections.addBackendClient).toHaveBeenCalledOnceWith('test', 'simulated', jasmine.falsy());
    expect(clientMock.login).toHaveBeenCalledOnceWith(true, jasmine.falsy(), jasmine.any(Function));

    const callback = clientMock.login.calls.mostRecent().args[2];
    callback();

    expect(clientMock.subscribe).toHaveBeenCalledOnceWith(['addr1']);
    expect(model.setDefaultBackendName).not.toHaveBeenCalled();

    backend.remove();

    expect(b.getConnected()).toBeFalsy();
  });

  it('should create a default client and login with credentials', function() {
    const model = cv.data.Model.getInstance();

    const backend = document.createElement('cv-backend');
    backend.setAttribute('name', mockBackendName);
    backend.setAttribute('type', 'mqtt');
    backend.setAttribute('uri', 'ws://user:passwd@localhost:1883');
    backend.setAttribute('default', 'true');

    document.body.appendChild(backend);
    const b = backend._instance;

    expect(b).toBeInstanceOf(cv.ui.structure.tile.elements.Backend);
    expect(b.getConnected()).toBeTruthy();
    expect(cv.io.BackendConnections.addBackendClient).toHaveBeenCalledOnceWith('test', 'mqtt', 'ws://user:passwd@localhost:1883/');
    expect(clientMock.login).toHaveBeenCalledOnceWith(true, jasmine.objectContaining({
      username: 'user',
      password: 'passwd'
    }), jasmine.any(Function));

    const callback = clientMock.login.calls.mostRecent().args[2];
    callback();

    expect(clientMock.subscribe).toHaveBeenCalledOnceWith(['addr1']);
    expect(model.setDefaultBackendName).toHaveBeenCalledOnceWith(mockBackendName);

    backend.remove();

    expect(b.getConnected()).toBeFalsy();
  });

  it('should do nothing when no type is given', function() {
    const backend = document.createElement('cv-backend');

    document.body.appendChild(backend);
    const b = backend._instance;

    expect(b).toBeInstanceOf(cv.ui.structure.tile.elements.Backend);
    expect(b.getConnected()).toBeTruthy();
    expect(cv.io.BackendConnections.addBackendClient).not.toHaveBeenCalled();
    backend.remove();

    expect(b.getConnected()).toBeFalsy();
  });

  it('should throw an exception when multiple backends with name "main" are added', function() {
    spyOn(cv.io.BackendConnections, 'hasBackend').and.callFake(() => false);
    const backend = document.createElement('cv-backend');
    backend.setAttribute('type', 'knxd');
    document.body.appendChild(backend);

    expect(cv.io.BackendConnections.addBackendClient).toHaveBeenCalledOnceWith('main', 'knxd', null);

    const second = document.createElement('cv-backend');
    second.setAttribute('name', 'main');
    second.setAttribute('type', 'openhab');
    cv.io.BackendConnections.hasBackend.and.callThrough();

    spyOn(cv.core.notifications.Router, 'dispatchMessage').and.callFake(() => null);
    document.body.appendChild(second);

    expect(cv.io.BackendConnections.addBackendClient).toHaveBeenCalledOnceWith('main', 'knxd', null);
    expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalledOnceWith('cv.config.error', jasmine.objectContaining({
      topic: 'cv.config.error'
    }));
    backend.remove();
    second.remove();
  });
});
