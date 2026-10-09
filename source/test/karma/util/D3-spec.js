/* D3-spec.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for the shared d3 loader.
 */
describe('testing the d3 loader', function () {
  it('should load the library once and hand out the same promise', async function () {
    const first = cv.util.D3.load();
    const second = cv.util.D3.load();

    expect(second).toBe(first);

    await first;

    expect(typeof window.d3).toBe('object');
    expect(document.querySelectorAll('script[src*="d3.min.js"]').length).toBe(1);
  });

  it('should bring a time format that follows the locale', async function () {
    await cv.util.D3.load();

    expect(cv.util.D3.TF).not.toBeNull();
    expect(typeof cv.util.D3.TF.format).toBe('function');
    expect(cv.util.D3.TF.format('%H:%M')(new Date(Date.UTC(2024, 0, 2, 15, 30)))).toMatch(/^\d{2}:\d{2}$/);
  });
});
