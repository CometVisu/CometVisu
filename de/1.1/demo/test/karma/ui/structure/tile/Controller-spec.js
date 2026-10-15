/*
 * Copyright (c) 2026, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for tile structure controller
 *
 * @author Tobias Braeutigam
 * @since 2026
 */
describe('testing the tile structure controller', () => {
  let controller;
  let main;

  beforeEach(() => {
    controller = cv.ui.structure.tile.Controller.getInstance();
    main = document.createElement('main');
    document.body.appendChild(main);
  });

  afterEach(() => {
    if (main) {
      main.remove();
    }
    document.body.querySelectorAll('iframe[data-src], img[data-src]').forEach(elem => elem.remove());
  });

  it('should observe lazy-loaded media relative to the main scroll container', () => {
    const frame = document.createElement('iframe');
    frame.setAttribute('data-src', 'https://example.com');
    document.body.appendChild(frame);

    const observeSpy = jasmine.createSpy('observe');
    const originalIntersectionObserver = window.IntersectionObserver;
    /**
     *
     * @param callback
     * @param options
     */
    function IntersectionObserverMock(callback, options) {
      this.observe = observeSpy;
      this.disconnect = jasmine.createSpy('disconnect');
      this.unobserve = jasmine.createSpy('unobserve');
    }
    window.IntersectionObserver = jasmine.createSpy('IntersectionObserver').and.callFake(function(callback, options) {
      return new IntersectionObserverMock(callback, options);
    });

    try {
      controller.observeVisibility();

      expect(window.IntersectionObserver).toHaveBeenCalled();
      expect(window.IntersectionObserver.calls.mostRecent().args[1].root).toBe(main);
      expect(observeSpy).toHaveBeenCalledWith(frame);
    } finally {
      window.IntersectionObserver = originalIntersectionObserver;
      frame.remove();
    }
  });

  it('should remove the previous system-theme listener before re-registering it', async () => {
    const mediaQueryOne = {
      matches: false,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener')
    };
    const mediaQueryTwo = {
      matches: true,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener')
    };
    spyOn(window, 'matchMedia').and.returnValues(mediaQueryOne, mediaQueryTwo);

    const xml = new DOMParser().parseFromString('<config theme="system"/>', 'text/xml');

    await controller.preParse(xml);
    await controller.preParse(xml);

    expect(mediaQueryOne.addEventListener).toHaveBeenCalledTimes(1);
    expect(mediaQueryOne.removeEventListener).toHaveBeenCalledTimes(1);
    expect(mediaQueryTwo.addEventListener).toHaveBeenCalledTimes(1);
  });
});
