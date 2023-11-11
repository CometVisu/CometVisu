/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
 *
 */
/**
 * Helper functions for SVG elements.
 */
qx.Class.define('cv.util.Svg', {
  type: 'static',
  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    getBBox(element) {
      const bbox = { x: 0, y: 0, cx: 0, cy: 0, width: 0, height: 0 };
      const svg = element.ownerSVGElement || element.localName === "svg" ? element : null;
      if (svg) {
        if (qx.core.Environment.get('browser.name').includes('firefox')) {
          // firefox getScreenCTM does not work well, we have to do it manually
          // works only because we do not use scaling / rotation and transforms yet
          const r = element.getBBox();
          const x = element.x.baseVal.value + r.x;
          const y = element.y.baseVal.value + r.y;
          bbox.x = x;
          bbox.y = y;
          bbox.width = r.width;
          bbox.height = r.height;
          bbox.cx = x + bbox.width / 2;
          bbox.cy = y + bbox.height / 2;
        } else {
          const r = element.getBBox();
          const p = svg.createSVGPoint();
          const matrix = svg.getScreenCTM().inverse().multiply(element.getScreenCTM());
          p.x = r.x;
          p.y = r.y;
          const a = p.matrixTransform(matrix);

          p.x = r.x + r.width;
          p.y = r.y;
          const b = p.matrixTransform(matrix);

          p.x = r.x + r.width;
          p.y = r.y + r.height;
          const c = p.matrixTransform(matrix);

          p.x = r.x;
          p.y = r.y + r.height;
          const d = p.matrixTransform(matrix);

          const minX = Math.min(a.x, b.x, c.x, d.x);
          const maxX = Math.max(a.x, b.x, c.x, d.x);
          const minY = Math.min(a.y, b.y, c.y, d.y);
          const maxY = Math.max(a.y, b.y, c.y, d.y);

          bbox.x = minX;
          bbox.y = minY;
          bbox.width = maxX - minX;
          bbox.height = maxY - minY;
          bbox.cx = minX + bbox.width / 2;
          bbox.cy = minY + bbox.height / 2;
        }
      }
      return bbox;
    }
  }
});

