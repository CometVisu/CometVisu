/* Roundbar.js
 * 
 * copyright (c) 2010-2020, Christian Mayer and the CometVisu contributers.
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
 * Adds a display to the visu that can represent values from the BUS
 * and shows them with a round bar.
 *
 * @widgetexample <settings>
 *    <caption>Example roundbar widget</caption>
 *    <screenshot name="roundbar_simple">
 *      <data address="3/3/1">63.3</data>
 *    </screenshot>
 *  </settings>
 *  <roundbar>
 *      <address transform="DPT:9.001" mode="read">3/3/1</address>
 *  </roundbar>
 *
 * @author Christian Mayer
 * @since 0.12.0 (2020)
 */
qx.Class.define('cv.ui.structure.pure.Roundbar', {
  extend: cv.ui.structure.AbstractWidget,
  include: cv.ui.common.Update,

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    coord: function(position) {
      return position.x.toFixed(1) + ' ' + position.y.toFixed(1);
    },
    /**
     * Create the SVG path for the round bar.
     * Angle = 0 === horizontal on the right
     *
     * @param startAngle {Float}
     * @param startArrowPoint {Float}
     * @param endAngle {Float}
     * @param endArrowPoint {Float}
     * @param radius {Float}
     * @param width {Float}
     * @param getBBox {Boolean} return the bounding box instead of the path itself
     */
    createBarPath: function(startAngle, startArrowPoint, endAngle, endArrowPoint, radius, width, getBBox) {
      var
        startArrowPointAngle = startAngle + startArrowPoint,
        endArrowPointAngle   = endAngle + endArrowPoint;

      // The path to generate is using those positions:
      // rO             -- outer --
      // rMO        /// outermiddle \\\
      // rM      //       middle        \\
      // rIM   /        innermiddle        \
      // rI   /         -- inner --         \
      //     |        /             \        |
      //     |_______|               |_______|
      //       start      center        end
      var
        clockwise   = startAngle > endAngle ? 1 : 0,
        rI  = radius,
        rIM = radius + width*1/4,
        rM  = radius + width*2/4,
        rMO = radius + width*3/4,
        rO  = radius + width,
        startInner  = {x: Math.cos(startAngle             )*rI, y: -Math.sin(startAngle             )*rI},
        startMiddle = {x: Math.cos(startArrowPointAngle   )*rM, y: -Math.sin(startArrowPointAngle   )*rM},
        startOuter  = {x: Math.cos(startAngle             )*rO, y: -Math.sin(startAngle             )*rO},
        centerInner = {x: Math.cos((startAngle+endAngle)/2)*rI, y: -Math.sin((startAngle+endAngle)/2)*rI},
        centerOuter = {x: Math.cos((startAngle+endAngle)/2)*rO, y: -Math.sin((startAngle+endAngle)/2)*rO},
        endInner    = {x: Math.cos(endAngle               )*rI, y: -Math.sin(endAngle               )*rI},
        endMiddle   = {x: Math.cos(endArrowPointAngle     )*rM, y: -Math.sin(endArrowPointAngle     )*rM},
        endOuter    = {x: Math.cos(endAngle               )*rO, y: -Math.sin(endAngle               )*rO},
        startMiddleFlag = Math.abs(startAngle - startArrowPointAngle)   > Math.PI ? 1 : 0,
        startEndFlag    = Math.abs(startAngle - endAngle            )/2 > Math.PI ? 1 : 0,
        endMiddleFlag   = Math.abs(endAngle   - endArrowPointAngle  )   > Math.PI ? 1 : 0,
        startMiddleDir  = startAngle < startArrowPointAngle ? 1 : 0,
        endMiddleDir    = endAngle   < endArrowPointAngle   ? 1 : 0;

      function arc(start, end, r, flag, cw) {
        return (start.x===end.x) && (start.y===end.y)
          ? ''
          : (Math.abs(start.x-end.x)+Math.abs(start.y-end.y) < 2)
            ? 'L' + cv.ui.structure.pure.Roundbar.coord(end)
            : ['A', r, r, 0, flag, cw, cv.ui.structure.pure.Roundbar.coord(end)].join(' ');
      }

      if (getBBox) {
        var
          rMax = Math.max(rI, rO),
          isInside = function(a) {return  (startAngle < a && a < endAngle) || (startAngle > a && a > endAngle);},
          rMiddle = isInside(-Math.PI*4/2) || isInside(Math.PI*0/2) ?  rMax : startInner.x,
          uMiddle = isInside(-Math.PI*3/2) || isInside(Math.PI*1/2) ? -rMax : startInner.y,
          lMiddle = isInside(-Math.PI*2/2) || isInside(Math.PI*2/2) ? -rMax : startInner.x,
          dMiddle = isInside(-Math.PI*1/2) || isInside(Math.PI*3/2) ?  rMax : startInner.y;
        return {
          u: Math.min(startInner.y, startMiddle.y, startOuter.y, endInner.y, endMiddle.y, endOuter.y, uMiddle),
          d: Math.max(startInner.y, startMiddle.y, startOuter.y, endInner.y, endMiddle.y, endOuter.y, dMiddle),
          l: Math.min(startInner.x, startMiddle.x, startOuter.x, endInner.x, endMiddle.x, endOuter.x, lMiddle),
          r: Math.max(startInner.x, startMiddle.x, startOuter.x, endInner.x, endMiddle.x, endOuter.x, rMiddle)
        };
      }

      // a thin bar path should just be a single line
      if( width < 1.0 ) {
        return [
          'M', cv.ui.structure.pure.Roundbar.coord(startOuter),
          arc(startOuter, centerOuter, rO, startEndFlag, clockwise),
          arc(centerOuter, endOuter, rO, startEndFlag, clockwise)
        ].join('');
      }

      return ['M', cv.ui.structure.pure.Roundbar.coord(startInner),
        startArrowPointAngle === startAngle
          ? 'L' + cv.ui.structure.pure.Roundbar.coord(startOuter)
          : arc(startInner, startMiddle, rIM, startMiddleFlag, 1-startMiddleDir) +
            arc(startMiddle, startOuter, rMO, startMiddleFlag, startMiddleDir),
        arc(startOuter , centerOuter, rO, startEndFlag, clockwise),
        arc(centerOuter, endOuter   , rO, startEndFlag, clockwise),
        endArrowPointAngle === endAngle
          ? 'L' + cv.ui.structure.pure.Roundbar.coord(endInner)
          : arc(endOuter, endMiddle, rMO, endMiddleFlag, 1-endMiddleDir) +
            arc(endMiddle, endInner, rIM, endMiddleFlag, endMiddleDir),
        arc(startInner , centerInner, rI, startEndFlag, 1-clockwise),
        arc(centerInner, startInner , rI, startEndFlag, 1-clockwise),
        'Z'
      ].join('');
    },
    /**
     * Create the SVG path for an pointer.
     * @param angle {Float}
     * @param p {Object} Indicator object
     */
    createPointerPath: function(angle, p) {
      var
        s = Math.sin(angle),
        c = Math.cos(angle),
        wx = c * p.width,
        wy = s * p.width;

      if(p.thickness > 0) {
        var
          tx = -s * p.thickness/2,
          ty =  c * p.thickness/2;
        return [
          'M', this.coord({x:c*p.radius+wx-tx,y: -(s*p.radius+wy-ty)}),
          'L', this.coord({x:c*p.radius      ,y: -(s*p.radius      )}),
          'L', this.coord({x:c*p.radius+wx+tx,y: -(s*p.radius+wy+ty)})
        ].join('');
      } else {
        return [
          'M', this.coord({x:c*p.radius   ,y: -(s*p.radius   )}),
          'L', this.coord({x:c*p.radius+wx,y: -(s*p.radius+wy)})
        ].join('');
      }
    }
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    type: { check: "Array" },
    indicators: { check: "Array" },

    min: { check: "Number" },
    max: { check: "Number" },
    axisradius: { check: "Number" },
    axiswidth: { check: "Number" },
    axiscolor: { check: "String" },
    ranges: { check: "Array" },
    minorradius: { check: "Number" },
    minorwidth: { check: "Number" },
    minorspacing: { check: "String" },
    minorcolor: { check: "String" },
    majorradius: { check: "Number" },
    majorwidth: { check: "Number" },
    majorposition: { check: "String" },
    majorcolor: { check: "String" },
    labels: { check: "Array" },
    labelstyle: { check: "String" },
    start: { check: "Number" },
    end: { check: "Number" },
    arrowtype: { check: "Number" },
    spacing: { check: "Number" },
    overflowarrow: { check: "Boolean" },
    fontsize: { check: "Number" },
    textx: { check: "Number" },
    texty: { check: "Number" },
    textlength: { check: "Number" },
    textanchor: { check: "String" },
    linespace: { check: "Number" },
    bboxgrow: { check: "Object" },
    debug: { check: "Boolean" },
    currentRatioValue: { check: "Array", init: [] },
    targetRatioValue: { check: "Array", init: [] }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // overridden
    _getInnerDomString: function () {
      /**
       * Grow the bounding box to also contain the parameters x and y
       * @param bbox {Object} The initial bounding box
       * @param x {Float}
       * @param y {Float}
       * @returns {Object} The enlarged bounding box
       */
      function bboxAdd(bbox, x, y) {
        if (bbox.u > y) { bbox.u = y; }
        if (bbox.d < y) { bbox.d = y; }
        if (bbox.l > x) { bbox.l = x; }
        if (bbox.r < x) { bbox.r = x; }
        return bbox;
      }

      this.setCurrentRatioValue(Array(this.getIndicators().length).fill(0));
      this.setTargetRatioValue(Array(this.getIndicators().length).fill([0,false,false]));

      var
        self = this,
        s = this.getStart(),
        e = this.getEnd(),
        min = this.getMin(),
        max = this.getMax(),
        cntValues = 0,
        svgMajor = '',
        svgMinor = '',
        svgLabels = '',
        svgRanges = '',
        svgIndicators = '',
        svgText = '',
        createBarPath = cv.ui.structure.pure.Roundbar.createBarPath;

      // Determine the bounding box, first get the biggest radius that must fit
      var
        rMax = this.getAxisradius()+this.getAxiswidth(),
        sMax = 0,
        eMax = 0;
      this.getIndicators().forEach(function (indicator) {
        rMax = Math.max(rMax, indicator.radius, indicator.radius+indicator.width);
        sMax = Math.max(sMax, indicator.startarrow);
        eMax = Math.max(eMax, indicator.endarrow);
      });
      var BBox = createBarPath( s, sMax, e, eMax, rMax, 0, true );

      if (this.getMinorwidth() > 0) {
        var
          spacing = parseFloat(this.getMinorspacing()),
          rIn = this.getMinorradius(),
          rOut = this.getMinorwidth() + rIn;

        if (/^[0-9]+%/.test(this.getMinorspacing())) { // special case: percentage
          spacing = (max-min) * spacing / 100;
        }

        svgMinor += '<path class="minor" d="';
        for (var angle=s, delta = (e-s)*spacing/(max-min), cnt=(max-min)/spacing; cnt >= 0; angle+=delta,cnt--) {
          var
            sin = Math.sin(angle),
            cos = Math.cos(angle);
          svgMinor += [
            'M', cv.ui.structure.pure.Roundbar.coord({x:cos*rIn , y:-sin*rIn }),
            'L', cv.ui.structure.pure.Roundbar.coord({x:cos*rOut, y:-sin*rOut})
          ].join('');

          BBox = bboxAdd(BBox, cos*rIn , -sin*rIn );
          BBox = bboxAdd(BBox, cos*rOut, -sin*rOut);
        }
        if (this.getMinorcolor() !== '') svgMinor += '" style="stroke:' + this.getMinorcolor();
        svgMinor += '" />';
      }

      if (this.getMajorwidth() > 0) {
        var
          rIn = this.getMajorradius(),
          rOut = this.getMajorwidth() + rIn;

        svgMajor += '<path class="major" d="';

        this.getMajorposition().split(';').forEach(function (position) {
          switch (position) {
            case 'min':
              position = min;
              break;

            case 'max':
              position = max;
              break;
          }
          var
            angle = s+(e-s)*(position-min)/(max-min),
            sin = Math.sin(angle),
            cos = Math.cos(angle);
          svgMajor += [
            'M', cv.ui.structure.pure.Roundbar.coord({x:cos*rIn , y:-sin*rIn }),
            'L', cv.ui.structure.pure.Roundbar.coord({x:cos*rOut, y:-sin*rOut})
          ].join('');

          BBox = bboxAdd(BBox, cos*rIn , -sin*rIn );
          BBox = bboxAdd(BBox, cos*rOut, -sin*rOut);
        });
        if (this.getMajorcolor() !== '') { svgMajor += '" style="stroke:' + this.getMajorcolor(); }
        svgMajor += '" />';
      }

      var labelstyle = this.getLabelstyle();
      this.getLabels().forEach(function (label, labelnumber) {
        var
          angle = s+(e-s)*(label.value-min)/(max-min),
          x = label.radius * Math.cos(angle),
          y = label.radius * -Math.sin(angle),
          alignmentBaseline = '',
          textAnchor = '';

        if (label.orientation < 3) {
          svgLabels += '<text class="axislabel" x="' + x + '" y="' + y + '"';
          switch (label.orientation) {
            default:
            case 0: // horizontal
              if (x < 0) {
                textAnchor = (['end', 'middle', 'start'])[label.position];
              } else {
                textAnchor = (['start', 'middle', 'end'])[label.position];
              }
              if (Math.abs(x) < 1) {
                textAnchor = 'middle';
              }
              if (y < 0) {
                alignmentBaseline = (['baseline', 'middle', 'hanging'])[label.position];
              } else {
                alignmentBaseline = (['hanging', 'middle', 'baseline'])[label.position];
              }
              if (Math.abs(y) < 1) {
                alignmentBaseline = 'middle';
              }
              break;

            case 1: // parallel
              var textAngle = -angle * 180 / Math.PI + 90;
              if (y < 0) {
                alignmentBaseline = (['baseline', 'middle', 'hanging'])[label.position];
              } else {
                alignmentBaseline = (['hanging', 'middle', 'baseline'])[label.position];
                textAngle += 180;
              }
              textAnchor = 'middle';
              svgLabels += ' transform="rotate(' + textAngle + ',' + x + ',' + y + ')"';
              break;

            case 2: // perpendicular
              textAngle = -angle * 180 / Math.PI;
              if (x < 0) {
                textAnchor = (['end', 'middle', 'start'])[label.position];
                textAngle += 180;
              } else {
                textAnchor = (['start', 'middle', 'end'])[label.position];
              }
              alignmentBaseline = 'middle';
              svgLabels += ' transform="rotate(' + textAngle + ',' + x + ',' + y + ')"';
              break;
          }
          svgLabels += ' dominant-baseline="' + alignmentBaseline + '"';
          svgLabels += ' text-anchor="' + textAnchor + '"';

          if (labelstyle !== '') {
            svgLabels += ' style="' + labelstyle + '"';
          }

          svgLabels += '>' + label.name + '</text>';
        } else { // label.orientation >= 3 -> round
          var
            labelid = self.$$user_path + '_label' + labelnumber,
            cw = s < e ? 0 : 1,
            path = '',
            align = '';

          switch (label.orientation) {
            case 3: // roundstart
              path = ['M', x, y, 'A', label.radius, label.radius, 0, 0, cw, -x, -y, 'A', label.radius, label.radius, 0, 0, cw, x, y].join(' ');
              break;

            case 4: // roundmiddle
              path = ['M', -x, -y, 'A', label.radius, label.radius, 0, 0, cw, x, y, 'A', label.radius, label.radius, 0, 0, cw, -x,-y].join(' ');
              align = ' startOffset="50%" text-anchor="middle"';
              break;

            case 5: // roundend
              path = ['M', x, y, 'A', label.radius, label.radius, 0, 0, cw, -x, -y, 'A', label.radius, label.radius, 0, 0, cw, x, y].join(' ');
              align = ' startOffset="100%" text-anchor="end"';
              break;
          }
          svgLabels += '<path style="stroke:none; fill:none; stroke-width:0" id="' + labelid + '" d="' + path + '"/>';
          svgLabels += '<text class="axislabel"';

          if (labelstyle !== '') {
            svgLabels += ' style="' + labelstyle + '"';
          }

          svgLabels += '><textPath href="#'+labelid+'"' + align + '>' + label.name + '</textPath></text>';
        }
      });

      this.getRanges().forEach(function (range) {
        var
          sRange = (e-s)*(range.start-min)/(max-min)+s,
          eRange = (e-s)*(range.end  -min)/(max-min)+s,
          rRange = range.radius || self.getAxisradius(),
          wRange = range.width  || self.getAxiswidth(),
          thisBBox = createBarPath(sRange,0,eRange,0,rRange,wRange, true);
        svgRanges += '<path class="range" d="';
        svgRanges += createBarPath(sRange,0,eRange,0,rRange,wRange);
        if (range.style) {
          svgRanges += '" style="' + range.style;
        }
        svgRanges += '" />';

        BBox = bboxAdd(BBox, thisBBox.l, thisBBox.u);
        BBox = bboxAdd(BBox, thisBBox.r, thisBBox.d);
      });

      this.getIndicators().forEach(function (indicator) {
        svgIndicators += '<path class="indicator" style="' + indicator.style + '" />';

        if (indicator.showValue) { cntValues++; }
      });

      if (cntValues>0) {
        svgText += '<text class="value" y="'+this.getTexty()+'"'
          + ' text-anchor="' + this.getTextanchor() +'"'
          + ' font-size="' + this.getFontsize() + '">'
          + '<tspan x="'+this.getTextx()+'" dy="0">-</tspan>'
          + ('<tspan x="'+this.getTextx()+'" dy="' + this.getLinespace() + '">-</tspan>').repeat(cntValues-1)
          + '</text>';

        var
          textDistribution = ({start:[0,1],middle:[0.5,0.5],end:[1,0]})[this.getTextanchor()] || [0,1],
          textU = Math.min(0, -this.getFontsize(), this.getLinespace()*(cntValues-1)-(this.getLinespace()<0?this.getFontsize():0)),
          textD = Math.max(0, -this.getFontsize(), this.getLinespace()*(cntValues-1)-(this.getLinespace()<0?this.getFontsize():0));
        BBox = bboxAdd(BBox, this.getTextx()-textDistribution[0]*this.getTextlength(), this.getTexty()+textU);
        BBox = bboxAdd(BBox, this.getTextx()+textDistribution[1]*this.getTextlength(), this.getTexty()+textD);
      }

      var html = '<div class="actor">'
        + '<svg width="100%" height="100%" viewBox="' + [
          BBox.l - this.getBboxgrow().l,
          BBox.u - this.getBboxgrow().u,
          BBox.r - BBox.l + this.getBboxgrow().l + this.getBboxgrow().r,
          BBox.d - BBox.u + this.getBboxgrow().u + this.getBboxgrow().d
        ].join(' ') + '">';
      if(this.getDebug()) {
        html += '<rect width="'+(BBox.r-BBox.l)+'" height="'+(BBox.d-BBox.u)+'" x="'+(BBox.l)+'" y="'+(BBox.u)+'" stroke="blue" fill="none" />'
          + '<rect width="'+(BBox.r-BBox.l + this.getBboxgrow().l + this.getBboxgrow().r)+'" height="'+(BBox.d-BBox.u + this.getBboxgrow().u + this.getBboxgrow().d)+'" x="'+(BBox.l - this.getBboxgrow().l)+'" y="'+(BBox.u - this.getBboxgrow().u)+'" stroke="green" fill="none" />'
          + '<circle cx="0" cy="0" r="3" fill="red" />';
      }

      if (this.getAxisradius() > 0) {
        var
          sectorPath = createBarPath(s,0,e,0,this.getAxisradius(),0),
          axisPath = createBarPath(s,0,e,0,this.getAxisradius(),this.getAxiswidth()),
          stroke = this.getAxiscolor() === '' ? undefined : this.getAxiscolor(),
          fill   = this.getAxiswidth() < 1 ? 'none' : stroke;
        html +=
          '<path class="sector" d="'+sectorPath+' L0 0Z"/>' +
          '<path class="axis" d="'+axisPath+'" style="' +
          (stroke ? 'stroke:'+stroke : '') +
          (fill   ? ';fill:' +fill   : '') +
          '"/>';
      }

      html += svgMinor + svgMajor + svgRanges + svgLabels + svgIndicators + svgText;
      html += '</svg></div>';

      return html;
    },

    /**
     * Updates the roundbar widget
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param data {var} incoming data
     */
    _update: function(address, data) {
      if (data === undefined || address === undefined) { return; }
      var
        value = cv.Transform.decode( this.getAddress()[ address ][0], data ),
        target = this.getTargetRatioValue(),
        tspan = Array.from(this.getDomElement().getElementsByTagName('tspan')),
        valueFormat = this.applyFormat(address, value);

      this.getIndicators().forEach(function(indicator,i){
        if(address === indicator.address) {
          target[i] = [
            (Math.min(Math.max(value,indicator.min),indicator.max)-indicator.min)/(indicator.max-indicator.min),
            value < indicator.min,
            value > indicator.max
          ];
          if (tspan[i] !== undefined) {
            tspan[i].textContent = valueFormat;
          }
        }
      });

      this.setTargetRatioValue(target);

      if(!this.animationFrame) {
        // TODO: only animate when widget is visible
        var
          indicators = Array.from(this.getDomElement().getElementsByClassName('indicator'));
        this.animateIndicators(indicators,false);
      }
    },

    /**
     * Update the display of the indicators.
     *
     * Note: It is a design decision not to pool multiple updates in one requestAnimationFrame which might be beneficial
     * performace wise. But as it's assumed that a typical visu config is only containing one roundbar per address
     * a pooling wouldn't make a difference on the one hand but complicate the code on the other hand.
     * Even with a few roundbars using the same address the performance impact is negligible.
     *
     * @param indicatorElements Array with the bars to modify
     * @param jumpToTarget skip animation
     */
    animateIndicators: function (indicatorElements, jumpToTarget) {
      var
        current = this.getCurrentRatioValue(),
        target = this.getTargetRatioValue(),
        indicators = this.getIndicators();

      // current is already at target
      if (current.every(function(this_i,i){return this_i === target[i][0];})) {
        this.animationFrame = 0;
        return; // then nothing to do
      }
      var
        finished = true,
        startAngle = this.getStart(),
        endAngle = this.getEnd(),
        overflowarrow = this.getOverflowarrow();

      // calculate new values to show by applying two types of rate limiting:
      // first do an exponential smoothing and then limit that to stay in range
      // Note: for simplicity we don't care about the elapsed time, which would be the perfect way to do it
      var expSmoothing = 0.2;
      var rateLimit = 0.05;
      indicatorElements.forEach(function(indicator,i){
        if( jumpToTarget===true || Math.abs(current[i] - target[i][0]) < 0.01 ) {
          current[i] = target[i][0];
        } else {
          finished = false;
          var expSmoothedValue = current[i] * (1-expSmoothing) + target[i][0] * expSmoothing;
          if( current[i] > expSmoothedValue ) {
            current[i] = current[i]-expSmoothedValue > rateLimit ? current[i]-rateLimit : expSmoothedValue;
          } else {
            current[i] = current[i]-expSmoothedValue < -rateLimit ? current[i]+rateLimit : expSmoothedValue;
          }
        }

        var targetAngle = startAngle + current[i]*(endAngle-startAngle);
        if (!overflowarrow) {
          targetAngle = (endAngle > startAngle)
            ? Math.max(startAngle,targetAngle - indicators[i].endarrow)
            : Math.min(startAngle,targetAngle - indicators[i].endarrow);
        }

        if (indicators[i].isBar) {
          indicator.setAttribute('d',
            cv.ui.structure.pure.Roundbar.createBarPath(
              startAngle,
              (overflowarrow&&!(target[i][1]&&current[i]<0.01)) ? 0 : indicators[i].startarrow,
              targetAngle,
              (overflowarrow&&!(target[i][2]&&current[i]>0.99)) ? 0 : indicators[i].endarrow,
              indicators[i].radius,
              indicators[i].width
            )
          );
        } else {
          indicator.setAttribute('d',
            cv.ui.structure.pure.Roundbar.createPointerPath( targetAngle, indicators[i] )
          );
        }
      });
      this.setCurrentRatioValue(current);

      this.animationFrame = window.requestAnimationFrame(this.animateIndicators.bind(this,indicatorElements,false));
    }
  }
});

