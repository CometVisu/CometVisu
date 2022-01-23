/* Link-spec.js 
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



describe('testing the Link action', function() {
  it('should create a button DOM element and open an url on click', function() {
    var action = new cv.core.notifications.actions.Link({
      title: 'Title',
      url: 'http://localhost/test',
      needsConfirmation: false
    });

    var actionButton = action.getDomElement();

    expect(actionButton.innerText).toBe('Title');
    expect(actionButton).toHaveClass('action');

    spyOn(cv.util.Location, 'open');
    var event = new qx.event.type.Event();
    event.init(true, true);
    event.setType('tap');

    qx.event.Registration.dispatchEvent(actionButton, event);

    expect(cv.util.Location.open).toHaveBeenCalledWith('http://localhost/test', '_blank');
  });

  it('should transform string values of action property to functions', function() {
    var action = new cv.core.notifications.actions.Link({
      title: 'Title',
      action: 'reload',
      needsConfirmation: false
    });

    expect(typeof action.getAction()).toBe('function');

    action = new cv.core.notifications.actions.Link({
      title: 'Title',
      action: 'unknown',
      needsConfirmation: false
    });

    expect(action.getAction()).toBeNull();

    action = new cv.core.notifications.actions.Link({
      title: 'Title',
      action: function() {},
      needsConfirmation: false
    });

    expect(typeof action.getAction()).toBe('function');
  });

  it('should execute the actions', function() {
    spyOn(cv.util.Location, 'reload');
    var action = new cv.core.notifications.actions.Link({
      title: 'Title',
      action: 'reload',
      needsConfirmation: false
    });
    action.handleAction();

    expect(cv.util.Location.reload).toHaveBeenCalled();

    spyOn(cv.util.Location, 'open');
    action = new cv.core.notifications.actions.Link({
      title: 'Title',
      url: '/test',
      hidden: false,
      needsConfirmation: false
    });
    action.handleAction();

    expect(cv.util.Location.open).toHaveBeenCalled();

    var Con = qx.io.request.Xhr;
    var spiedXhr;
    spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
      var obj = new Con(url);
      spiedXhr = spyOn(obj, 'send');
      return obj;
    });

    // open url in background
    action = new cv.core.notifications.actions.Link({
      title: 'Title',
      url: '/test',
      hidden: true,
      needsConfirmation: false
    });
    action.handleAction();

    expect(spiedXhr).toHaveBeenCalled();
  });
});
