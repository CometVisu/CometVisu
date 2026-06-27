/**
 * TODO: Describe your plugin here
 *
 * @author add your name here
 * @since ###SINCE###
 */
class $0ChartSource {
  _chart = null;
  _config = null;

  /**
   *
   * @param config {object} the parsed src value of the dataset
   * @param chart {cv.ui.structure.tile.components.Chart} instance of the chart that uses this plugin
   */
  constructor(config, chart) {
    /*
    <dataset src="plugin+mychartsource://authority@name/path?key=value" /> will be parsed to a config like this:
    {
       type: 'plugin,
       subType: 'mychartsource,
       authority: 'authority',
       name: 'name',
       path: '/path',
       params: {
          key: 'value',
      }
    */
    this._config = config;
    this._chart = chart;
  }

  /**
   * Generate the request configuration for the chart component or disable it if the plugin
   * fetches the data itself.
   *
   * If this plugin fetches the data itself, it should return {fetch: false} to disable the charts builtin data fetching.
   * And it must implement the fetchData method.
   *
   * @param start {number} start time as unix timestamp
   * @param end {number} end time as unix timestamp
   * @param series {string} series name e.g. 'day', 'month', 'year'
   * @param offset {number} can be used as alternative to calculate the start together with series, e.g. series 'day' and offset 1 -> start = end - 1 day
   * @returns {
   *    url: string,
   *    options: object,
   *    proxy: boolean
   * } | { fetch: boolean }
   */
  getRequestConfig(start, end, series, offset) {
    // return either a configuration to fetch the data from or {fetch: false} if the plugin fetches the data itself
    // you can look at CometVisus builtin chart sources to see working examples: https://github.com/CometVisu/CometVisu/tree/develop/source/class/cv/io/timeseries
  }

  /**
   * If the plugin request the data from an external source this function is called.
   * getRequestConfig() must return {fetch: false} to disable the charts builtin data fetching and
   * call this function instead.
   * @param start {number} start time as unix timestamp
   * @param end {number} end time as unix timestamp
   * @param series {string} series name e.g. 'day', 'month', 'year'
   * @param offset {number} series offset, can be used together with series to calculate the start date e.g. series: day, offset: 1 -> start = end - 1 day
   * @returns {Promise<Array<[timestamp: number, value: number]>>}
   */
  async fetchData(start, end, series, offset) {
    // implement this method if the plugin fetches the data itself
  }

  /**
   * Process the response data before it is used in the chart.
   * If this plugin implements the fetchData method, the conversion should be done there.
   * This is only useful if this plugin lets the chart fetch the data, but the source does not deliver the data in the correct format.
   * The target format for charts is [[timestamp, value], ...]
   * @param data
   * @returns {*}
   */
  processResponse(data) {
    return data;
  }
}

/*
If you have changed the classname of the plugin you must also change the name in the following line.
This registers the plugin and makes it available to the chart component as value for the 'src' attribute.
You can freely choose the name of the plugin, but it must be unique. With this example it can be used like this:
<dataset src="plugin+mychartsource://..." />
*/
cv.io.timeseries.Plugin.registerPlugin('mychartsource', ChartSource);

/*
  How to create a chart source plugin based on this file
  1. Rename the class to a unique name, e.g. MyChartSource
  2. Update that classname and a name for the subtype in the registerPlugin call at the end of the file
  3. Make sure that this file is loaded my adding it to the <cv-meta> section of the config.xml, add an entry like this:
    <cv-loader type="js" src="resource/config/media/<pluginfilename>.js"/> replace <pluginfilename> with the name of this file
*/
