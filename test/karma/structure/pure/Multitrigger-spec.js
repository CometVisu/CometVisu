/**
 * Unit tests for multitrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_multitrigger'], function(engine, design) {

  describe("testing a multitrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the multitrigger creator", function() {

      var widget = $(this.createTestWidgetString("multitrigger", {}, "<label>Test</label>")[1]);

      expect(widget).toHaveClass('multitrigger');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");

      widget = $(this.createTestWidgetString("multitrigger", {
        'button1label': 'B1',
        'button2label': 'B2',
        'button3label': 'B3',
        'button4label': 'B4',
        'button1value': '1',
        'button2value': '2',
        'button3value': '3',
        'button4value': '4',
        'showstatus': 'true',
        'mapping': 'test'
      })[1]);

      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });

      var values = $(widget.find("div.actor > div.value"));
      expect($(values.get(0)).text()).toBe('B1');
      expect($(values.get(1)).text()).toBe('B2');
      expect($(values.get(2)).text()).toBe('B3');
      expect($(values.get(3)).text()).toBe('B4');
    });

    it("should update an multitrigger widget", function() {
      var creator = this.createTestElement('multitrigger', {
        'button1label': 'B1',
        'button2label': 'B2',
        'button3label': 'B3',
        'button4label': 'B4',
        'button1value': 1,
        'button2value': 2,
        'button3value': 3,
        'button4value': 4,
        'showstatus': 'true'
      }, null, null, {'transform': '4.001'});

      var check = function(index) {
        $($(this.container.children[0]).find('.actor')).each(function(i, actor) {
          $actor = $(actor);
          if (index === i) {
            expect($actor).toHaveClass('switchPressed');
            expect($actor).not.toHaveClass('switchUnpressed');
          } else {
            expect($actor).not.toHaveClass('switchPressed');
            expect($actor).toHaveClass('switchUnpressed');
          }
        });
      }.bind(this);

      for (var i=1; i<=4; i++) {
        creator.update.call(this.container.children[0], '12/7/37', i.toString());
        check(i-1);
      }
    });

    it('should trigger the multitrigger action', function() {
      spyOn(templateEngine.visu, 'write');
      var creator = this.createTestElement('multitrigger', {
        'button1label': 'B1',
        'button2label': 'B2',
        'button3label': 'B3',
        'button4label': 'B4',
        'button1value': 1,
        'button2value': 2,
        'button3value': 3,
        'button4value': 4,
        'showstatus': 'true'
      }, '<address transform="DPT:4001" mode="read">1/0/0</address>', null, {'transform': '4.001'});

      var actors = $(this.container.children[0]).find('.actor');
      expect(actors).not.toBe(null);

      //canceled call
      creator.action('id_0', actors[0], true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      creator.action('id_0', actors[0], false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '1');
      expect(templateEngine.visu.write).not.toHaveBeenCalledWith('1/0/0', '1');

      creator.action('id_0', actors[1], false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '2');
      expect(templateEngine.visu.write).not.toHaveBeenCalledWith('1/0/0', '1');

      creator.action('id_0', actors[2], false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '3');
      expect(templateEngine.visu.write).not.toHaveBeenCalledWith('1/0/0', '1');

      creator.action('id_0', actors[3], false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '4');
      expect(templateEngine.visu.write).not.toHaveBeenCalledWith('1/0/0', '1');
    });
  });
});