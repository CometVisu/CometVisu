import { group, pointer, transition } from "d3";
import { line, area, curveLinear, curveStep, curveStepAfter, curveNatural, stack, stackOrderNone, stackOffsetDiverging } from "d3-shape";
import { formatDefaultLocale, format } from "d3-format";
import { timeFormatDefaultLocale, timeFormat } from "d3-time-format";
import { scaleTime, scaleLinear, scaleUtc, scaleBand, scaleOrdinal } from "d3-scale";
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { timeParse } from "d3-time-format";
import { select, pointers } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import { extent, min, max, mean, InternSet, least, map, range, groupSort, rollup, index, union } from "d3-array";
import { timeDay, timeSecond, timeHour, timeMinute, timeMonday, timeMonth, timeYear, timeWeek, utcDay, utcSecond, utcHour, utcMinute, utcMonday, utcMonth, utcYear, utcWeek } from "d3-time";
import { easeLinear } from "d3";
// import {hsl, rgb, color} from 'd3-color';
// import {hsv} from 'd3-hsv';
// import {interpolateSpectral, interpolateSinebow} from 'd3-scale-chromatic';

export default {
  group: group,
  pointer: pointer,
  line: line,
  area: area,
  curveLinear: curveLinear,
  curveStep: curveStep,
  curveStepAfter: curveStepAfter,
  curveNatural: curveNatural,
  stack: stack,
  stackOrderNone: stackOrderNone,
  stackOffsetDiverging: stackOffsetDiverging,
  formatDefaultLocale: formatDefaultLocale,  
  format: format,
  timeFormatDefaultLocale: timeFormatDefaultLocale,
  timeFormat: timeFormat,
  scaleTime: scaleTime,
  scaleLinear: scaleLinear,
  scaleUtc: scaleUtc,
  scaleBand: scaleBand,
  scaleOrdinal,
  axisBottom: axisBottom,
  axisLeft: axisLeft,
  axisRight: axisRight,
  timeParse: timeParse,
  select: select,
  pointers: pointers,
  zoom: zoom,
  zoomIdentity: zoomIdentity,
  extent: extent,
  min: min,
  max: max,
  mean: mean,
  InternSet: InternSet,
  least: least,
  map: map,
  range: range,
  groupSort: groupSort,
  rollup: rollup,
  index,
  union,
  timeSecond, timeDay, timeMinute, timeHour, timeMonday, timeMonth, timeYear, timeWeek,
  utcDay, utcSecond, utcHour, utcMinute, utcMonday, utcMonth, utcYear, utcWeek,
  easeLinear,
  transition
  // hsl: hsl,
  // rgb: rgb,
  // hsv: hsv,
  // color: color,
  // interpolateSpectral: interpolateSpectral,
  // interpolateSinebow: interpolateSinebow
}
