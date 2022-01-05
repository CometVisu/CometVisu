

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
