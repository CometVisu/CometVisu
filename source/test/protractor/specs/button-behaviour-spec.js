/**
 * Test the different button behaviours
 *
 * @author Tobias Bräutigam
 * @since 2017
 */
var cvDemo = require('../pages/Demo');

describe('cometvisu demo config test:', function () {
  'use strict';
  var dataModel;

  beforeEach(function(done) {
    cvDemo.to();
    cvDemo.at();
    cvDemo.getModel().then(function(result) {
      dataModel = result;
      done();
    });
  });

  var testDownMoveUp = function(widget, displayValue, writeValue) {
    // mouseDown->moveOut->moveIn->mouseUp
    browser.actions()
      .mouseDown(widget)
      .mouseMove({x: 500, y: 500})
      .mouseMove({x: -500, y: -500})
      .mouseUp(widget)
      .perform();

    if (displayValue) {
      expect(widget.element(by.css(".value")).getText()).toEqual(displayValue);
    }

    cvDemo.getLastWrite().then(function(lastWrite) {
      expect(lastWrite.value).toEqual(writeValue);
    });
  };

  var testDownScrollUp = function(widget, displayValue, writeValue) {
    // mouseDown->scrollDown->scrollUp->mouseUp
    browser.actions().mouseDown(widget).perform();
    browser.executeScript('window.scrollTo(0,1000);').then(function () {
      // scroll back
      return browser.executeScript('window.scrollTo(0,0);');
    }).then(function() {
      browser.actions().mouseUp(widget).perform();

      if (displayValue) {
        expect(widget.element(by.css(".value")).getText()).toEqual(displayValue);
      }

      cvDemo.getLastWrite().then(function(lastWrite) {
        expect(lastWrite.value).toEqual(writeValue);
      });
    });
  };

  it('should check if trigger with bind-click-to-widget is animated on click', function() {
    var labelPromise = null;
    var actorPromise = null;
    var widgetData = null;
    var address = null;
    Object.getOwnPropertyNames(dataModel).some(function (path) {
      if (dataModel[path].bindClickToWidget === true && dataModel[path].$$type === 'trigger') {
        labelPromise = element(by.css('#' + path + ' .label'));
        actorPromise = element(by.css('#' + path + ' .actor'));
        widgetData = dataModel[path];
        address = widgetData.address[Object.getOwnPropertyNames(widgetData.address).shift()];
        return true;
      }
    });
    expect(labelPromise).not.toBeNull();
    expect(actorPromise).not.toBeNull();

    Promise.all([labelPromise, actorPromise]).then(function (elements) {
      var label = elements[0];
      var actor = elements[1];

      // click on actor and check the animation + value sending
      expect(actor.getAttribute('class')).not.toContain('switchPressed');
      expect(actor.getAttribute('class')).toContain('switchUnpressed');
      browser.actions().mouseDown(actor).perform();
      expect(actor.getAttribute('class')).toContain('switchPressed');
      expect(actor.getAttribute('class')).not.toContain('switchUnpressed');
      browser.actions().mouseUp(actor).perform();
      expect(actor.getAttribute('class')).toContain('switchUnpressed');
      expect(actor.getAttribute('class')).not.toContain('switchPressed');

      // check if value has been send
      cvDemo.getLastWrite().then(function (lastWrite) {
        expect(lastWrite.value).toEqual(widgetData.sendValue);
      });
      expect(labelPromise).not.toBeNull();
      expect(actorPromise).not.toBeNull();

      // same with click on label
      expect(actor.getAttribute('class')).not.toContain('switchPressed');
      expect(actor.getAttribute('class')).toContain('switchUnpressed');
      browser.actions().mouseDown(label).perform();
      expect(actor.getAttribute('class')).toContain('switchPressed');
      expect(actor.getAttribute('class')).not.toContain('switchUnpressed');
      browser.actions().mouseUp(label).perform();
      expect(actor.getAttribute('class')).toContain('switchUnpressed');
      expect(actor.getAttribute('class')).not.toContain('switchPressed');
    });
  });
  
  it('should trigger the button action after mouseDown->moveOut->moveIn->mouseUp', function() {
    var widget = element.all(by.css(".activePage .switch .actor")).first();

    // get widget data from parent
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function(data) {
        // mouseDown->moveOut->moveIn->mouseUp
        testDownMoveUp(widget, "Aus", data.offValue);
      });
    });
  });

  it('should trigger the button action after mouseDown->scrollDown->scrollUp->mouseUp', function() {
    var widget = element.all(by.css(".activePage .switch .actor")).first();
    widget.element(by.xpath("parent::div/parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function (data) {
        testDownScrollUp(widget, "Aus", data.offValue);
      });
    });
  });

  it('should animate the multitrigger buttons and show the current state as pressed button', function() {
    var widget = element.all(by.css(".activePage .multitrigger")).first();

    widget.element(by.xpath("parent::div")).getAttribute("id").then(function(id) {
      cvDemo.getWidgetData(id).then(function(data) {

        element.all(by.css('#'+data.path+' .actor')).each(function(actor, index) {
          var buttonPos = index+1;
          testDownMoveUp(actor, data['button'+buttonPos+'label'], data['button'+buttonPos+'value']);
          testDownScrollUp(actor, data['button'+buttonPos+'label'], data['button'+buttonPos+'value']);

          expect(actor.getAttribute('class')).not.toContain('switchUnpressed');
          expect(actor.getAttribute('class')).toContain('switchPressed');
        });
      });
    });
  });
});
