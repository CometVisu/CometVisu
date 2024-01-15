/* Page-spec.js 
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
 * Unit tests for page widget
 *
 */
describe('testing a page widget', function () {
  it('should test that invisible pages generate no DOM string', function () {
    expect(this.createTestWidgetString('page', {'visible': 'false'})[1]).toBe(undefined);
  });

  it('should test the page creator', function () {
    const [pageLink, element] = this.createTestWidgetString('page', {'name': 'Testpage'}, '<label>Test</label>');
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath() + '_');

    expect(page.getPageType()).toBe('text');

    cv.ui.structure.pure.Page.createFinal();

    expect(element).toHaveClass('pagelink');

    var elem = page.getDomElement();

    expect(elem).toHaveClass('type_text');
    expect(Array.from(elem.getElementsByTagName('*')).filter(function (m) {
      return m.matches('h1');
    })[0].innerText).toBe('Testpage');
  });

  it('should test the page creator with some attributes', function () {
    const [pageLink, element] = this.createTestWidgetString('page', {
      'name': 'TestPage',
      'flavour': 'potassium',
      'bind_click_to_widget': 'true',
      'align': 'right',
      'showtopnavigation': 'true',
      'showfooter': 'true',
      'shownavbar-top': 'true',
      'shownavbar-left': 'true',
      'shownavbar-bottom': 'true',
      'shownavbar-right': 'true'
    });
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath() + '_');

    var actor = this.findChild(element, '.actor');

    expect(actor.style['text-align']).toBe('right');
    cv.ui.structure.pure.Page.createFinal();

    expect(page.getShowTopNavigation()).toBeTruthy();
    expect(page.getShowFooter()).toBeTruthy();
    expect(page.getShowNavbarTop()).toBeTruthy();
    expect(page.getShowNavbarBottom()).toBeTruthy();
    expect(page.getShowNavbarLeft()).toBeTruthy();
    expect(page.getShowNavbarRight()).toBeTruthy();

    expect(page.getDomElement()).toHaveClass('flavour_potassium');
  });

  it('should test the 2d-page creator with contained svg backdrop', function () {
    const [pageLink] = this.createTestWidgetString('page', {
      'name': 'TestPage',
      'type': '2d',
      'size': 'contained',
      'backdropalign': 'left',
      'backdrop': 'test.svg'
    });
    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath() + '_');
    cv.ui.structure.pure.Page.createFinal();

    expect(page.getBackdropAlign()).toBe('left');

    page = document.querySelector('#pages .page');

    expect(page).toHaveClass('type_2d');
    var backdrop = page.querySelector('embed');

    expect(backdrop).toHaveStyleSetting('width', '100%');
    expect(backdrop).toHaveStyleSetting('height', '100%');
    expect(backdrop).toHaveStyleSetting('object-fit', 'contain');
    expect(backdrop).toHaveStyleSetting('object-position', 'left');
    expect(backdrop.getAttribute('src')).toBe('test.svg');
  });

  it('should test the 2d-page creator with fixed png backdrop', function () {
    this.createTestWidgetString('page', {
      'name': 'TestPage',
      'type': '2d',
      'size': 'fixed',
      'backdrop': 'test.png'
    });

    cv.ui.structure.pure.Page.createFinal();

    var page = document.querySelector('#pages .page');

    expect(page).toHaveClass('type_2d');
    var backdrop = page.querySelector('img');

    expect(backdrop.getAttribute('src')).toBe('test.png');
  });

  it('should test the page update', function () {
    const controller = cv.ui.structure.pure.Controller.getInstance();
    spyOn(controller, 'scrollToPage');

    const pageLink = this.createTestElement('page', {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    this.initWidget(pageLink);

    var page = cv.ui.structure.WidgetFactory.getInstanceById(pageLink.getPath() + '_');
    spyOn(page, 'sendToBackend');
    cv.ui.structure.pure.Page.createFinal();

    page.update('1/0/0', 1);

    //expect(page.sendToBackend).toHaveBeenCalledWith('0'); // currently not implemented
    expect(controller.scrollToPage).toHaveBeenCalledWith('id_0_');
  });

  it('should trigger the page action', function () {
    const controller = cv.ui.structure.pure.Controller.getInstance();
    spyOn(controller, 'scrollToPage');

    var pageLink = this.createTestElement('page', {
      'type': 'text',
      'ga': '1/0/0',
      'name': 'Testpage'
    });
    this.initWidget(pageLink);
    qx.event.Registration.fireEvent(pageLink.getActor(), 'tap', qx.event.type.Event, []);

    expect(controller.scrollToPage).toHaveBeenCalledWith('id_0_');
  });
});
