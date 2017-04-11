/* Include-spec.js 
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
 * Unit tests for include widget
 *
 */
describe("testing a include widget", function() {

  it("should test the include creator", function() {

    // create the request to be able to spy the send method
    var req = cv.parser.widgets.Include.getRequest('');

    var child = qx.bom.Html.clean(['<root><text>Start</text></root>'])[0];

    var event = new qx.event.type.Event();
    event.setType("success");
    spyOn(event, "getTarget").and.callFake(function() {
      var fakeResponse = jasmine.createSpyObj("target", ['getResponse']);
      fakeResponse.getResponse.and.callFake(function() {
        return child;
      });
      return fakeResponse;
    });
    spyOn(req, "send").and.callFake(function() {
      qx.event.Registration.dispatchEvent(req, event);
    });
    spyOn(cv.TemplateEngine.getInstance(), "createPages");
    var res = this.createTestWidgetString("include", {'src': 'test'});
    expect(res[1]).toBe('<div class="widget clearfix text " ></div>');
  });
});