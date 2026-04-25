/* XAxis.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.XAxis', {
    extend: cv.ui.structure.tile.components.chart.AbstractAxis,

    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     * @param top
     */
    construct(chart, type ='axis', top = false) {
        super(chart, type);
        this.initScale(d3.scaleTime());
        this._top = top;

        if (this._top) {
            this._chart.addListener('changeMarginTop', this._updateTransform, this);
        } else {
            this._chart.addListener('changeHeight', this._updateTransform, this);
            this._chart.addListener('changeMarginBottom', this._updateTransform, this);
        }

        this._chart.addListener('changeWidth', this._updateRange, this);
        this._chart.addListener('changeMarginLeft', this._updateRange, this);
        this._chart.addListener('changeMarginRight', this._updateRange, this);
        this._updateRange();

        this._chart.bind('width', this, 'ticks', {
            converter: width => Math.round(width / 80)
        });
        this._axis = this._top ? d3.axisTop(this.getScale()) : d3.axisBottom(this.getScale());
        this._axis.ticks(this.getTicks(), this.getTickFormat());
    },

    members: {
        render() {
            if (this.isShow()) {                
                if (!this._element) {
                    this._element = this._chart.getSvgElement('g', [this.getType(), 'x', this._top ? 'top' : 'bottom']);
                }
                
                this._element.call(this._axis);

                this._applyShowLine(this.getShowLine());
                this._applyShowGrid(this.getShowGrid());

                this._updateTransform();

                this._rendered = true;
            } else  {
                 if (this._element) {
                    this._element.remove();
                    this._element = null;
                }
                this._rendered = false;   
            }
        },

        setRangeOverride(range) {
            if (range) {
                this._chart.removeListener('changeWidth', this._updateRange, this);
                this._chart.removeListener('changeMarginLeft', this._updateRange, this);
                this._chart.removeListener('changeMarginRight', this._updateRange, this);
                this.setRange(range);
            } else {
                this._chart.addListener('changeWidth', this._updateRange, this);
                this._chart.addListener('changeMarginLeft', this._updateRange, this);
                this._chart.addListener('changeMarginRight', this._updateRange, this);
                this._updateRange();
            }
        },

        _updateTransform() {
             if (!this._element) {
                return;
            }
            if (this._top) {
                this._element.attr('transform', `translate(0,${this._chart.getMarginTop()})`);
            } else {
                this._element.attr('transform', `translate(0,${this._chart.getHeight() - this._chart.getMarginBottom()})`);
            }
        },

        _updateRange() {
            const range = this.getRange();
            const additionalXRangePadding = this._chart.isInBackground() ? 0 : 2;
            let rangeStart = this._chart.getMarginLeft() + additionalXRangePadding;
            let rangeEnd = this._chart.getWidth() - this._chart.getMarginRight() - additionalXRangePadding;
            if (this.getRangeConverter()) {
                [rangeStart, rangeEnd] = this.getRangeConverter()([rangeStart, rangeEnd]);
            }

            if (range[0] !== rangeStart || range[1] !== rangeEnd) {
                this.setRange([rangeStart, rangeEnd]);
            }
        },

        _applyShowGrid(value) {
            if (value) {
                this._chart.addListener('changeHeight', this._updateTickSize, this);
                this._chart.addListener('changeMarginBottom', this._updateTickSize, this);
                this._chart.addListener('changeMarginTop', this._updateTickSize, this);
            } else {
                this._chart.removeListener('changeHeight', this._updateTickSize, this);
                this._chart.removeListener('changeMarginBottom', this._updateTickSize, this);
                this._chart.removeListener('changeMarginTop', this._updateTickSize, this);
            }
            this._updateTickSize();
        },

        _updateTickSize() {
            if (this.getShowGrid()) {
                this._axis
                    .tickSizeInner(-this._chart.getHeight() + this._chart.getMarginBottom() + this._chart.getMarginTop())
                    .tickSizeOuter(0);
            } else {
                // back to default
                this._axis.tickSize(6);
            }
        }
    }
});
