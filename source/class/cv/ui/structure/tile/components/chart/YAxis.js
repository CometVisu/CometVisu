/**
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.YAxis', {
    extend: cv.ui.structure.tile.components.chart.AbstractAxis,

    /**
     * 
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     * @param right
     */
    construct(chart, type = 'axis', right = false) {
        super(chart, type);
        this.initScale(d3.scaleLinear());
        this._right = right;

        if (this._right) {
            this._chart.addListener('changeMarginRight', this._updateTransform, this);
            this._chart.addListener('changeWidth', this._updateTransform, this);
        } else {
            this._chart.addListener('changeMarginLeft', this._updateTransform, this);
        }

        this._chart.addListener('changeHeight', this._updateRange, this);
        this._chart.addListener('changeMarginTop', this._updateRange, this);
        this._chart.addListener('changeMarginBottom', this._updateRange, this);
        this._updateRange();

        this._chart.bind('height', this, 'ticks', {
            converter: height => Math.round(height / 60)
        });

        this._axis = this._right ? d3.axisRight(this.getScale()) : d3.axisLeft(this.getScale());
        this._axis.ticks(this.getTicks(), this.getTickFormat());        
    },

    members: {
        _applyDomain(domain) {
            super._applyDomain(domain);
            if (this.isShow()) {
                const maxValue = this.getTickFormat() ? this.getTickFormat()(domain[1]) : domain[1].toFixed(domain[1] < 1 ? 2 : 1);
                // check if we need more space for the y-axis
                if (maxValue.length >= 2) {
                    this._chart.setMarginLeft(maxValue.length * 8);
                }
            }
        },

        render() {
            if (this.isShow()) {
                if (!this._element) {
                    this._element = this._chart.getSvgElement('g', [this.getType(), 'y', this.right ? 'right' : 'left']);
                }
                this._updateTransform();

                if (this.getLabel() && this._element.select('text').empty()) {
                    this._element.append('text')
                        .attr('x', this._right ? this._chart.getWidth() + this._chart.getMarginRight() : -this._chart.getMarginLeft())
                        .attr('y', 10)
                        .attr('fill', 'currentColor')
                        .attr('text-anchor', 'start')
                        .text(this.getLabel());
                }                

                this._element.call(this._axis);                
                this._applyShowLine(this.getShowLine());
                this._applyShowGrid(this.getShowGrid());

                this._rendered = true;
            } else {
                if (this._element) {
                    this._element.remove();
                    this._element = null;
                }
                this._rendered = false;               
            }
        },

        setRangeOverride(range) {
            if (range) {
                this._chart.removeListener('changeHeight', this._updateRange, this);
                this._chart.removeListener('changeMarginTop', this._updateRange, this);
                this._chart.removeListener('changeMarginBottom', this._updateRange, this);
                this.setRange(range);
            } else {
                this._chart.addListener('changeHeight', this._updateRange, this);
                this._chart.addListener('changeMarginTop', this._updateRange, this);
                this._chart.addListener('changeMarginBottom', this._updateRange, this);
                this._updateRange();
            }
        },

        _updateTransform() {
            if (!this._element) {
                return;
            }
            const text = this._element.select('text');
            if (this._right) {
                this._element.attr('transform', `translate(${this._chart.getWidth() - this._chart.getMarginRight()},0)`);
                if (!text.empty()) {
                    text.attr('x', this._chart.getWidth() + this._chart.getMarginRight());
                }
            } else {
                this._element.attr('transform', `translate(${this._chart.getMarginLeft()},0)`);
                if (!text.empty()) {
                    text.attr('x', -this._chart.getMarginLeft());
                }
            }
        },

        _updateRange() {
            const range = this.getRange();
            const rangeStart = this._chart.getHeight() - this._chart.getMarginBottom();
            const rangeEnd = this._chart.getMarginTop();
            if (range[0] !== rangeStart || range[1] !== rangeEnd) {
                this.setRange([rangeStart, rangeEnd]);
            }
        },

        _applyShowGrid(value) {
            if (value) {
                this._chart.addListener('changeWidth', this._updateTickSize, this);
                this._chart.addListener('changeMarginLeft', this._updateTickSize, this);
                this._chart.addListener('changeMarginRight', this._updateTickSize, this);       
            } else {
                this._chart.removeListener('changeWidth', this._updateTickSize, this);
                this._chart.removeListener('changeMarginLeft', this._updateTickSize, this);
                this._chart.removeListener('changeMarginRight', this._updateTickSize, this);
            }
            this._updateTickSize();
        },

        _updateTickSize() {
            if (this.getShowGrid()) {
                this._axis
                    .tickSizeInner((-this._chart.getWidth() + this._chart.getMarginRight() + this._chart.getMarginLeft()))
                    .tickSizeOuter(0);
            } else {
                // back to default
                this._axis.tickSize(6);
            }
        }
    }
});
