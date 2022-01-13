#!/usr/bin/env node

/* backend_transform_parse.js
 *
 * copyright (c) 2022-2022, Christian Mayer and the CometVisu contributers.
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
 * Extract the transform information as JSON string
 */

'use strict';

function convertData( dataParsed ) {
  // postprocessing:
  // step 1: remove encode and decode functions
  Object.keys(dataParsed[1]).forEach( key => {
    delete dataParsed[1][key].encode;
    delete dataParsed[1][key].decode;
  });

  // step 2: replace links by data
  Object.keys(dataParsed[1]).forEach( key => {
    if ('link' in dataParsed[1][key]) {
      dataParsed[1][key] = Object.assign({}, dataParsed[1][dataParsed[1][key].link], dataParsed[1][key]);
      delete dataParsed[1][key].link;
    }
  });

  // step 3: turn inside out by placing language first
  let finalData = [
    dataParsed[0],
    {
      de: {},
      en: {}
    }
  ];
  Object.keys(finalData[1]).forEach( lang => {
    Object.keys(dataParsed[1]).forEach( key => {
      const keyNew = (dataParsed[0] !== '') ? (dataParsed[0] + ':' + key) : key;
      finalData[1][lang][keyNew] = Object.assign({}, dataParsed[1][key]); // just (deep) copy
      if ('lname' in finalData[1][lang][keyNew]) {     // then filter
        finalData[1][lang][keyNew].lname = finalData[1][lang][keyNew].lname[lang];
      }
    });
  });

  // done -> write output as JSON string
  console.log(JSON.stringify(finalData));
}

const fs = require('fs');

const sourceFile = process.argv[2];

// Check if the sourceFile hasn't been provided.
if (!sourceFile) {
  // Extract the filename
  const appName = process.argv[1].split(require('path').sep).pop();

  //  Give the user an example on how to use the app.
    console.error('Missing argument! Example: %s SOURCE_FILE', appName);

    process.exit(1); // error
}

try {
  if (sourceFile.indexOf('Transform.js') > 0) {
    // special case: Transform.js
    const data = fs.readFileSync(sourceFile, 'utf8');
    const task = 'let qx={"Class":{"define":(x,y) => y.statics.registry}};' + data + ';';
    let dataParsed = eval(task);
    convertData(['',dataParsed]);
  } else {
    // normal case: backend specific transform
    const data = fs.readFileSync(sourceFile, 'utf8').match(/addTransform\((.*})\).*}\)/s);
    if (data !== null) {
      let dataParsed = eval('[' + data[1] + ']');
      convertData(dataParsed);
    }
  }

  process.exit(0); // success
} catch (err) {
  console.error(err);
}

process.exit(1); // error
