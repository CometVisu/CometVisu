const fs = require('fs')
const config = require('../config')
const AbstractHandler = require('../lib/AbstractHandler')

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


}

const dataProviderController = new DataProviderController()

module.exports = dataProviderController