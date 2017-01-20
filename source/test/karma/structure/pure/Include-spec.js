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

  // TODO: find out how to spy and reactivate test
  it("should test the include creator", function() {

    // create the request to be able to spy the send method
    var req = cv.xml.parser.widgets.Include.getRequest('');
    spyOn(req, "send");

    var child = qx.bom.Html.clean(['<page name="Start"></page>'])[0];

    var fakeResponseEvent = jasmine.createSpyObj("response", ['getTarget']);
    fakeResponseEvent.getTarget.and.callFake(function() {
      var fakeResponse = jasmine.createSpyObj("target", ['getResponse']);
      fakeResponse.getResponse.and.callFake(function() {
        return child;
      });
      return fakeResponse;
    });
    spyOn(cv.TemplateEngine.getInstance(), "createPages");
    cv.xml.parser.widgets.Include._onSuccess("id_0", null, "text", fakeResponseEvent);

    this.createTestWidgetString("include", {'src': 'test'});

    expect(cv.TemplateEngine.getInstance().createPages).toHaveBeenCalledWith(child, 'id_0', null, "text");
  });
});