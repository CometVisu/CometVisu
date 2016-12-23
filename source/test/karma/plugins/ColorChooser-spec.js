/* structure_plugin-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for colorchooser plugin
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a colorchooser plugin", function() {

  /* HINT:
   * Qooxdoo's partloader does not work from within the karma testrunner.
    * The scripts get loaded by qx.bom.request.Script which fails with a native error but no further
    * hint or message whats going wrong which makes debugging really hard.
   */

  // beforeEach(function(done) {
  //   var engine = cv.TemplateEngine.getInstance();
  //   engine.addListenerOnce("changeReady", function() {
  //     console.log("READY");
  //     console.log(qx.io.PartLoader.getInstance().getPart('plugin-colorchooser'));
  //     done();
  //   }, this);
  //   engine.loadPlugins(["plugin-colorchooser"]);
  //   engine.loadScripts([]);
  // });
  //
  // it("should test the colorchooser creator", function() {
  //   var res = this.createTestWidgetString("colorchooser", {id: 'test'}, '<label>Test</label>');
  //   var widget = qx.bom.Html.clean([res[1]])[0];
  //   var widgetInstance = res[0];
  //   console.log(widget);
  //   expect(widget).toHaveClass('colorchooser');
  //   expect(widget).toHaveLabel('Test');
  //
  //   expect(widgetInstance.getPath()).toBe("id_0");
  // });

  // // test bug reported here:
  // // https://knx-user-forum.de/forum/supportforen/cometvisu/963486-problem-milight-colorchooser-mit-oh-als-backend
  // it("should test the colorchooser with incmoning data in RGB mode", function() {
  //   var widgetInstance = this.createTestElement("colorchooser", {}, "", "Rgb_Test", {
  //     transform: 'OH:color',
  //     variant: 'rgb'
  //   });
  //   var farbtastic = jasmine.createSpyObj("farbtastic", ["setColor"]);
  //   spyOn(jQuery, "farbtastic").and.callFake(function () {
  //     return farbtastic;
  //   });
  //
  //   cv.MessageBroker.getInstance().publish("setup.dom.finished");
  //
  //   // simulate the initial incoming data
  //   widgetInstance.update('Rgb_Test', '246,0,20');
  //   expect(farbtastic.setColor).toHaveBeenCalledWith('#333333');
  // });
  //
  // it("should test the colorchooser with incoming data in RGB mode", function() {
  //
  //   var widgetInstance = this.createTestElement("colorchooser", {}, "", "Rgb_Test", {
  //     transform: 'OH:color',
  //     variant: 'r'
  //   });
  //   var farbtastic = jasmine.createSpyObj("farbtastic", ["setColor"]);
  //   spyOn(jQuery, "farbtastic").and.callFake(function() {
  //     return farbtastic;
  //   });
  //
  //   cv.MessageBroker.getInstance().publish("setup.dom.finished");
  //
  //   // simulate the initial incoming data
  //   widgetInstance.update('Rgb_Test', '246');
  //   expect(farbtastic.setColor).toHaveBeenCalledWith('#330000');
  // });
});