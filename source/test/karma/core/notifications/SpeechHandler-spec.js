/* SpeechHandler-spec.js 
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



describe('test the SpeechHandler', function () {
  var handler = null;
  var spiedSay = null;

  beforeEach(function() {
    handler = cv.core.notifications.SpeechHandler.getInstance();
    spyOn(handler, 'say');
  });

  it('should handle a message', function() {
    var message = {
      topic: 'cv.test',
      message: 'test message'
    };
    var config = {
      skipInitial: true
    };

    handler.handleMessage(message, config);
    // skip initial message
    expect(handler.say).not.toHaveBeenCalled();

    // second call should work
    handler.handleMessage(message, config);

    expect(handler.say).toHaveBeenCalled();
    handler.say.calls.reset();

    message.message = '';
    // nothing to say
    handler.handleMessage(message, config);

    expect(handler.say).not.toHaveBeenCalled();
    message.message = 'test message';

    // test condition
    message.condition = false;
    handler.handleMessage(message, config);

    expect(handler.say).not.toHaveBeenCalled();
    message.condition = true;
    handler.handleMessage(message, config);

    expect(handler.say).toHaveBeenCalled();
    handler.say.calls.reset();

    // test repeat timeout
    config.repeatTimeout = 0;
    handler.handleMessage(message, config);

    expect(handler.say).not.toHaveBeenCalled();
    // override by text
    message.message = '!'+message.message;
    handler.handleMessage(message, config);

    expect(handler.say).toHaveBeenCalled();
    handler.say.calls.reset();
  });
});
