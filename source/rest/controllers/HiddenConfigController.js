const config = require('../config')
const path = require('path')
const fs = require('fs')
const AbstractHandler = require('../lib/AbstractHandler')

class HiddenConfigHandler extends AbstractHandler {
  constructor() {
    super()
    this.configFile = path.join(config.configDir, 'hidden.php');
    this.template = `
<?php
// File for configurations that shouldn't be shared with the user
$hidden = array(
  ###VALUES###
);
?>`
    this.valueRegex = /'([^']+)' => array\(([^)]*)\)/g
    this.load()
  }

  load() {
    this._entries = {};
    let match
    while ((match = this.valueRegex.exec(fs.readFileSync(this.configFile))) !== null) {
      for (let i = 1, l = match.length; i < l; i++) {
        eval('this._entries["' + match[1] + '"] = {' + match[2].replace(/ =>/g, ':') + '}')
      }
    }
  }

  dump() {
    var data = []
    Object.keys(this._entries).forEach(group => {
      let line = `'${group}' => array(`;
      line += Object.keys(this._entries[group]).map(key => {
        return `'${key}' => '${this._entries[group][key]}'`
      }).join(', ')
      line += ')';
      data.push(line)
    })
    const content = this.template.replace('###VALUES###', data.join(',\n  '))
    fs.writeFileSync(this.configFile, content)
  }

  saveHiddenConfig(context) {
    this._entries = {};
    context.requestBody.forEach(section => {
      this._entries[section.name] = section.options.reduce((map, obj) => {
        map[obj.key] = obj.value;
        return map;
      }, {});
    })
    this.dump();
    this.respondMessage(context, 200, 'ok')
  }

  getHiddenConfig(context) {
    const section = context.params.path.section
    const key = context.params.path.key
    if (section === '*') {
      // return everything
      return this._entries;
    }
    if (this._entries.hasOwnProperty(section) && (!key || this._entries[section].hasOwnProperty(key))) {
      if (!key) {
        return this._entries[section]
      } else {
        return this._entries[section][key]
      }
    } else {
      this.respondMessage(context, 404, 'Config option not found')
    }
  }

  createHiddenConfig(context) {
    const section = context.params.path.section
    const key = context.params.path.key
    // TODO: sanitize key / value
    let value = context.requestBody
    if (!this._entries.hasOwnProperty(section) || !this._entries[section].hasOwnProperty(key)) {
      if (!this._entries.hasOwnProperty(section)) {
        this._entries[section] = {}
      }
      this._entries[section][key] = value
      this.dump()
    } else {
      this.respondMessage(context, 406, 'Config option already exists')
    }
  }

  updateHiddenConfig(context) {
    const section = context.params.path.section
    const key = context.params.path.key
    // TODO: sanitize key / value
    let value = context.requestBody
    if (this._entries.hasOwnProperty(section) && this._entries[section].hasOwnProperty(key)) {
      this._entries[section][key] = value
      this.dump()
    } else {
      this.respondMessage(context, 403, 'Config option not found')
    }
  }

  deleteHiddenConfig(context) {
    const section = context.params.path.section
    const key = context.params.path.key
    if (this._entries.hasOwnProperty(section)) {
      if (key) {
        delete this._entries[section][key]
      } else {
        // delete complete section
        delete this._entries[section]
      }
      this.dump()
    } else {
      this.respondMessage(context, 403, 'Config option not found')
    }
  }
}

const configHandler = new HiddenConfigHandler()

module.exports = configHandler
