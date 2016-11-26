/**
 * Unit tests for imagetrigger widget
 *
 */
var templateEngine = cv.TemplateEngine.getInstance();

describe("testing a imagetrigger widget", function() {

  it("should test the imagetrigger creator", function() {

    var res = this.createTestWidgetString("imagetrigger", {flavour: 'potassium'}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('imagetrigger');
    expect(widget).toHaveClass('image');
    expect(widget).toHaveClass('flavour_potassium');
    expect(widget.find("div.label").text()).toBe('Test');

    expect(res[0].getPath()).toBe("id_0");
  });

  xit("should test the imagetriggers refresh behaviour", function() {
    var res = this.createTestElement("imagetrigger", {
      flavour: 'potassium',
      sendValue: 'on',
      refresh: '5',
      type: 'show',
      src: 'imgs',
      suffix: 'jpg'
    });

    spyOn(cv.utils.Timer, "start");
    cv.MessageBroker.my.publish("setup.dom.finished");
    expect(cv.utils.Timer.start).toHaveBeenCalled();
    expect(res.getSendValue()).toBe("on");
  });

  it("should update a imagetrigger in show mode", function() {
    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'show'
    });

    res.update('12/7/37', 1);
    var actor = $(this.container.children[0].querySelectorAll('.actor img')[0]);
    expect(actor).toBeVisible();
    expect(actor.attr('src')).toBe('imgs.jpg');

    res.update('12/7/37', 0);
    expect(actor).not.toBeVisible();
  });

  it("should update a imagetrigger in select mode", function() {
    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'select'
    });

    res.update('12/7/37', 1);
    var actor = $(this.container.children[0].querySelectorAll('.actor img')[0]);
    expect(actor).toBeVisible();
    expect(actor.attr('src')).toBe('imgs1.jpg');

    res.update('12/7/37', 0);
    expect(actor).not.toBeVisible();
  });

  it('should trigger the imagetrigger action', function() {

    spyOn(templateEngine.visu, "write");

    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'show',
      sendValue: "1"
    });

    var actor = this.container.children[0].querySelectorAll('.actor')[0];
    expect(actor).not.toBe(null);

    //canceled call
    res.action('id_0', actor, true);
    expect(templateEngine.visu.write).not.toHaveBeenCalled();

    // no write flag
    data = templateEngine.widgetDataGet('id_0');
    res.getAddress()['12/7/37'][1] = 1;

    res.action('id_0', actor, false);
    expect(templateEngine.visu.write).not.toHaveBeenCalled();

    res.getAddress()['12/7/37'][1] = 3;
    res.setSendValue("");
    res.action('id_0', actor, false);
    expect(templateEngine.visu.write).not.toHaveBeenCalled();
    res.setSendValue("1");

    res.action('id_0', actor, false);
    expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');
  });
});