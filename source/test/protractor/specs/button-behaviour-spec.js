/**
 * Test the different button behaviours
 *
 * @author Tobias Bräutigam
 * @since 2017
 */
var cvDemo = require('../pages/Demo');

describe('cometvisu demo config test:', function () {
  'use strict';

  beforeEach(function() {
    cvDemo.to();
    cvDemo.at();
  });

  it('should check if trigger with bind-click-to-widget is animated on click', function() {
    cvDemo.getModel().then(function(dataModel) {
      var labelPromise = null;
      var actorPromise = null;
      var widgetData = null;
      var address = null;
      Object.getOwnPropertyNames(dataModel).some(function (path) {
        if (dataModel[path].bindClickToWidget === true && dataModel[path].$$type === "trigger") {
          labelPromise = element(by.css("#" + path + " .label"));
          actorPromise = element(by.css("#" + path + " .actor"));
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
  });
});