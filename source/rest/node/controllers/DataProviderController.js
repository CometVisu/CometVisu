const fs = require('fs')
const config = require('../config')
const ini = require('ini');
const AbstractHandler = require('../lib/AbstractHandler')
const influxClient = require('../lib/InfluxClient')

class DataProviderController extends AbstractHandler {
  constructor() {
    super()
  }

  /**
   * Return folder listing or file content, depending on the path type
   * @param context {Context}
   * @returns {*}
   */
  getDesigns(context) {
    return fs.readdirSync(config.designsDir, {withFileTypes: true}).filter(file => {
      return file.isDirectory();
    }).map(file => file.name);
  }

  getAddresses(context) {
    // read addresses
    let addresses, mainGroups, middleGroups;
    config.addressFiles.addresses.some(file => {
      if (fs.existsSync(file)) {
        addresses = ini.parse(fs.readFileSync(file, 'utf-8'));
        return true;
      }
    })
    config.addressFiles.mainGroups.some(file => {
      if (fs.existsSync(file)) {
        mainGroups = ini.parse(fs.readFileSync(file, 'utf-8'));
        return true;
      }
    })
    config.addressFiles.middleGroups.some(file => {
      if (fs.existsSync(file)) {
        middleGroups = ini.parse(fs.readFileSync(file, 'utf-8'));
        return true;
      }
    })

    // create a list of ALL group-addresses, multi-dimensional
    const res = {};

    if (addresses) {
      let gas = Object.keys(addresses)

      // sort gas
      gas.sort(function (a, b) {
        const pa = a.split('/');
        const pb = b.split('/');
        let diff = parseInt(pa.shift(), 10) - parseInt(pb.shift(), 10);
        while (diff === 0) {
          diff = parseInt(pa.shift(), 10) - parseInt(pb.shift(), 10);
        }
        return diff;
      })

      let mainGroup, middleGroup, key;
      gas.forEach(ga => {
        const gaParts = ga.split('/');

        mainGroup = '';
        middleGroup = '';
        if (mainGroups && mainGroups.hasOwnProperty(gaParts[0])) {
          mainGroup = mainGroups[gaParts[0]].name;
        }
        if (middleGroups && middleGroups.hasOwnProperty(gaParts[1])) {
          middleGroup = middleGroups[gaParts[1]].name;
        }
        key = mainGroup + ' ' + middleGroup;
        if (!res.hasOwnProperty(key)) {
          res[key] = [];
        }
        const gaData = addresses[ga];
        res[key].push({
          value: ga,
          label: gaData.name,
          hints: {
            transform: `DPT:${gaData.DPTSubId}`
          }
        })
      })
    }
    return res;
  }

  getRRDs(context) {
    let sensors;

    config.onewire.sensors.some(file => {
      if (fs.existsSync(file)) {
        sensors = ini.parse(fs.readFileSync(file, 'utf-8'));
        return true;
      }
    })

    const res = []
    if (sensors) {
      let rrdParts, fileBasename
      fs.readdirSync(config.onewire.rrdDir)
        .filter(file => path.extname(file) === '.rrd')
        .forEach(file => {
          fileBasename = path.basename(file, '.rrd');
          rrdParts = fileBasename.split('_', 2)

          res.push({
            value: file,
            label: sensors[rrdParts[0]]['name'],
          });
        })
    }
    return res
  }

  getInfluxDBs(context) {
    const auth = context.params.query.auth;
    const res = [];
    try {
      return influxClient.query('show databases', null, auth).then(response => {
        const dbs = JSON.parse(response);
        const seriesPromises = [];
        dbs.results[0].series[0].values.map(dbEntry => dbEntry[0]).forEach(database => {
          if (database !== '_internal') {
            seriesPromises.push(influxClient.getSeries(database, null, auth).then(measurements => {
              // translate fake set to real set/array
              Object.keys(measurements).forEach(measurement => {
                Object.keys(measurements[measurement]).forEach(tag => {
                  measurements[measurement][tag] = Object.keys(measurements[measurement][tag])
                })
                res.push({
                  label: database + '/' + measurement,
                  value: database + '/' + measurement
                })
              })
            }));
          }
        })
        return Promise.all(seriesPromises).then( () => {
          return res;
        })
      })
    } catch (e) {
      console.error(e)
      return res;
    }
  }

  getInfluxDBFields(context) {
    const auth = context.params.query.auth;
    const [database, measurement] = context.params.query.measurement ? context.params.query.measurement.split('/', 2) : ['', ''];
    if (!database || !measurement) {
      this.respondMessage(context, 406, 'Error: wrong measurement parameter [' + context.params.query.measurement + ']')
    } else {
      const res = [];
      try {
        return influxClient.query('SHOW FIELD KEYS FROM ' + measurement, database, auth).then(response => {
          res.push({
            value: '*',
            label: 'Default: *',
            forceOnlyLabel: 1
          })

          const fields = JSON.parse(response).results[0].series[0].values
          fields.forEach(field => {
            let l = ''
            let r = ''
            if (field[1] === 'string') {
              l = '['
              r = ']'
            }
            res.push({
              value: field[0],
              label: `${l}${field[0]} (${field[1]})${r}`,
              forceOnlyLabel: 1
            })
          })
          return res
        })
      } catch (e) {
        console.error(e)
        return res;
      }
    }
  }

  getInfluxDBTags(context) {
    const auth = context.params.query.auth;
    const [database, measurement] = context.params.query.measurement ? context.params.query.measurement.split('/', 2) : ['', ''];
    if (!database || !measurement) {
      this.respondMessage(context, 406, 'Error: wrong measurement parameter [' + context.params.query.measurement + ']')
    } else {
      const res = {};
      try {
        return influxClient.getSeries(database, measurement, auth).then(seriesMeasurements => {
          Object.keys(seriesMeasurements).forEach(measurementName => {
            Object.keys(seriesMeasurements[measurementName]).forEach(tag => {
              res[tag] = Object.keys(seriesMeasurements[measurement][tag])
            })
          })
          return res
        })
      } catch (e) {
        console.error(e)
        return res;
      }
    }
  }
}

const dataProviderController = new DataProviderController()

module.exports = dataProviderController