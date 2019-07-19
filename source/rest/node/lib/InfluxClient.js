const request = require('request-promise-native')
const configHandler = require('../controllers/HiddenConfigController')

class InfluxClient {
  constructor() {
    configHandler.load();
  }

  /**
   *
   * @param query {String}
   * @param db {String} database name
   * @param influxKey {String}
   * @returns {Promise}
   */
  query(query, db, influxKey) {
    if (db) {
      db = '&db=' + db
    } else {
      db = ''
    }

    let opts = {
      url: 'http://localhost:8086/query'
    }

    if (!influxKey) {
      influxKey = 'influx'
    }

    const influxConfig = configHandler.getSection(influxKey)

    if (influxConfig) {
      if (influxConfig.hasOwnProperty('uri')) {
        opts.url = influxConfig.uri;
      }

      opts.headers = {
        'Authorization': 'Basic ' + Buffer.from(influxConfig.user + ':' + influxConfig.pass).toString('base64')
      }

      if (influxConfig.hasOwnProperty('selfsigned') && influxConfig.selfsigned === true) {
        opts.rejectUnauthorized = false
        opts.requestCert = true
        opts.agent = false
      }
    }
    opts.url += '?q=' + encodeURIComponent(query) + db
    return request.get(opts)
  }

  getSeries(database, measurement, influxKey) {
    const measurements = {};
    let query = 'SHOW SERIES';
    if (measurement) {
      query += ' FROM ' + measurement
    }
    return this.query(query, database, influxKey).then(seriesRes => {
      const series = JSON.parse(seriesRes).results[0].series[0].values;
      if (series) {
        series.forEach(serie => {
          const list = serie[0].split(',');
          const measurement = list.shift();
          if( !measurements.hasOwnProperty(measurement)) {
            measurements[measurement] = [];
          }

          list.forEach(tag => {
            const tagKV = tag.split('=')
            if (!measurements[measurement].hasOwnProperty(tagKV[0])) {
              measurements[measurement][tagKV[0]] = {};
            }
            measurements[measurement][tagKV[0]][tagKV[1]] = 1 // fake set operation
          })
        })
      }
      return measurements
    })
  }
}

const influxClient = new InfluxClient()

module.exports = influxClient