(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
      getBBox: function getBBox(element) {
        var bbox = {
          x: 0,
          y: 0,
          cx: 0,
          cy: 0,
          width: 0,
          height: 0
        };
        var svg = element.ownerSVGElement;
        if (svg) {
          if (qx.core.Environment.get('browser.name').includes('firefox')) {
            // firefox getScreenCTM does not work well, we have to do it manually
            // works only because we do not use scaling / rotation and transforms yet
            var r = element.getBBox();
            var x = element.x.baseVal.value + r.x;
            var y = element.y.baseVal.value + r.y;
            bbox.x = x;
            bbox.y = y;
            bbox.width = r.width;
            bbox.height = r.height;
            bbox.cx = x + bbox.width / 2;
            bbox.cy = y + bbox.height / 2;
          } else {
            var _r = element.getBBox();
            var p = svg.createSVGPoint();
            var matrix = svg.getScreenCTM().inverse().multiply(element.getScreenCTM());
            p.x = _r.x;
            p.y = _r.y;
            var a = p.matrixTransform(matrix);
            p.x = _r.x + _r.width;
            p.y = _r.y;
            var b = p.matrixTransform(matrix);
            p.x = _r.x + _r.width;
            p.y = _r.y + _r.height;
            var c = p.matrixTransform(matrix);
            p.x = _r.x;
            p.y = _r.y + _r.height;
            var d = p.matrixTransform(matrix);
            var minX = Math.min(a.x, b.x, c.x, d.x);
            var maxX = Math.max(a.x, b.x, c.x, d.x);
            var minY = Math.min(a.y, b.y, c.y, d.y);
            var maxY = Math.max(a.y, b.y, c.y, d.y);
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
  cv.util.Svg.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Svg.js.map?dt=1735222454370