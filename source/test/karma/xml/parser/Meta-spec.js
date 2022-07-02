/* Meta-spec.js 
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

/**
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing the meta parser', function() {
  it('should test the meta parser', function () {
    // add footer to document
    let footer = qx.dom.Element.create('div', {'class': 'footer'});
    let body = document.querySelector('body');
    body.appendChild(footer);

    // this is loaded from fixtures/karma
    let xml = qx.xml.Document.fromString(window.__html__['meta-config.xml']);
    let parser = new cv.parser.MetaParser();
    parser.parse(xml, function () {
      // check mappings
      expect(cv.Config.hasMapping('Off_On')).toBeTruthy();
      expect(cv.Config.hasMapping('Sign')).toBeTruthy();
      expect(cv.Config.hasMapping('KonnexHVAC')).toBeTruthy();
      expect(cv.Config.hasMapping('One1000th')).toBeTruthy();
      expect(cv.Config.hasMapping('Motion_name')).toBeTruthy();

      // check stylings
      expect(cv.Config.hasStyling('Red_Green')).toBeTruthy();
      expect(cv.Config.hasStyling('Blue_Purple_Red')).toBeTruthy();

      // test plugins
      let plugins = parser.parsePlugins(xml);
      expect(plugins).toContain('plugin-clock');
      expect(plugins).toContain('plugin-diagram');
      expect(plugins).toContain('plugin-strftime');

      // test notifications
      let router = cv.core.notifications.Router.getInstance();
      let config = router.getStateMessageConfig();

      expect(config.hasOwnProperty('Motion_FF_Dining')).toBeTruthy();
      expect(config.hasOwnProperty('Motion_FF_Corridor')).toBeTruthy();
      expect(config.hasOwnProperty('Motion_FF_Kitchen')).toBeTruthy();

      // state listeners must be set
      let model = cv.data.Model.getInstance();
      ['Motion_FF_Dining', 'Motion_FF_Corridor', 'Motion_FF_Kitchen'].forEach(function(address) {
        expect(model.getStateListener().hasOwnProperty(address)).toBeTruthy();
        expect(model.getStateListener()[address].length).toEqual(1);
      });

      // template
      expect(cv.parser.WidgetParser.getTemplates().hasOwnProperty('test')).toBeTruthy();
      expect(cv.parser.WidgetParser.getTemplates().test.trim()).toEqual('<root><text><label>Test template</label></text></root>');

      footer.parentNode.removeChild(footer);
    });
  });
});
