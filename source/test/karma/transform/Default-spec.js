/* Default-spec.js 
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
 * Test the default transforms
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('checking default transforms', function() {
  it('should transform int values', function() {
    expect(cv.Transform.encode('int', 0)).toEqual('0');
    expect(cv.Transform.decode('int', '0')).toEqual(0);
  });

  it('should transform float values', function() {
    expect(cv.Transform.encode('float', 0.5)).toEqual('0.5');
    expect(cv.Transform.decode('float', '0.5')).toEqual(0.5);
  });

  it('should transform raw values', function() {
    expect(cv.Transform.encode('raw', 0.5)).toEqual(0.5);
    expect(cv.Transform.decode('raw', '0.5')).toEqual('0.5');
  });
});
