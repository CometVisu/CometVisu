#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */
const https = require('https');
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const targetDir = path.resolve(__dirname, '../source/resource/sentry');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const data = [];
    https
      .request(url, res => {
        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
          const asBytes = Buffer.concat(data);
          const asString = asBytes.toString('utf8');
          resolve({
            arrayBuffer: async () => asBytes,
            json: async () => JSON.parse(asString),
            text: async () => asString
          });
        });
        res.on('error', e => reject(e));
      })
      .end();
  });
}

async function load(file, version) {
  let url = `https://browser.sentry-cdn.com/${version}/${file}`;
  try {
    const data = await fetch(url);
    const buffer = await data.arrayBuffer();
    fs.writeFileSync(path.join(targetDir, file), buffer);
  } catch (e) {
    console.error(e);
  }
}

let version;
for (const depName in pkg.dependencies) {
  switch (depName) {
    case '@sentry/browser':
      version = pkg.dependencies[depName].substring(1);
      break;
  }
}
const bundles = ['bundle.tracing', 'rewriteframes'];
for (const bundle of bundles) {
  console.log(`loading ${bundle}`, version);
  load(`${bundle}.min.js`, version);
  load(`${bundle}.min.js.map`, version);
}
