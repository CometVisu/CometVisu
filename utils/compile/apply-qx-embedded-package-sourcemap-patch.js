/* apply-qx-embedded-package-sourcemap-patch.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TARGET_FILE_RELATIVE_PATH = path.join(
  'source',
  'class',
  'qx',
  'tool',
  'compiler',
  'targets',
  'meta',
  'PackageJavascript.js'
);

const BEFORE = [
  '      if (pkg.isEmbedAllJavascript()) {',
  '        this.__sourceMapOffsets = [];',
  '        let strip = new qx.tool.utils.Utils.StripSourceMapTransform();',
  '        strip.pipe(ws);',
  '        await new Promise(async resolve => {',
  '          for (let i = 0; i < pkg.getJavascriptMetas().length; i++) {',
  '            let js = pkg.getJavascriptMetas()[i];',
  '            this.__sourceMapOffsets.push(ws.getLineNumber());',
  '            await js.unwrap().writeSourceCodeToStream(strip);',
  '            strip.write("\\n");',
  '          }',
  '          strip.end();',
  '          strip.once("end", resolve);',
  '        });'
].join('\n');

const AFTER = [
  '      if (pkg.isEmbedAllJavascript()) {',
  '        this.__sourceMapOffsets = [];',
  '        let packageWs = new qx.tool.utils.Utils.LineCountingTransform();',
  '        let strip = new qx.tool.utils.Utils.StripSourceMapTransform();',
  '        strip.pipe(packageWs);',
  '        packageWs.pipe(ws, {',
  '          end: false',
  '        });',
  '        await new Promise(async resolve => {',
  '          for (let i = 0; i < pkg.getJavascriptMetas().length; i++) {',
  '            let js = pkg.getJavascriptMetas()[i];',
  '            this.__sourceMapOffsets.push(packageWs.getLineNumber());',
  '            await js.unwrap().writeSourceCodeToStream(strip);',
  '            strip.write("\\n");',
  '          }',
  '          strip.end();',
  '          strip.once("end", resolve);',
  '        });'
].join('\n');

/**
 *
 * @param message
 */
function fail(message) {
  console.error(message);
  process.exit(1);
}

/**
 *
 * @returns {string}
 */
function resolveTargetFile() {
  try {
    const compilerPackageJson = require.resolve('@qooxdoo/compiler/package.json', {
      paths: [ROOT]
    });
    const compilerRoot = path.dirname(compilerPackageJson);
    const frameworkPackageJson = require.resolve('@qooxdoo/framework/package.json', {
      paths: [compilerRoot]
    });

    return path.join(path.dirname(frameworkPackageJson), TARGET_FILE_RELATIVE_PATH);
  } catch (error) {
    fail(`Could not resolve installed Qooxdoo compiler/framework package: ${error.message}`);
    return '';
  }
}

const TARGET_FILE = resolveTargetFile();

if (!fs.existsSync(TARGET_FILE)) {
  fail(`Qooxdoo target file not found: ${TARGET_FILE}`);
}

const source = fs.readFileSync(TARGET_FILE, 'utf8');

if (source.includes(AFTER)) {
  console.log(`Qooxdoo sourcemap patch already applied: ${TARGET_FILE}`);
  process.exit(0);
}

if (!source.includes(BEFORE)) {
  fail(`Could not find expected unpatched source in ${TARGET_FILE}`);
}

fs.writeFileSync(TARGET_FILE, source.replace(BEFORE, AFTER), 'utf8');
console.log(`Applied Qooxdoo sourcemap patch: ${TARGET_FILE}`);
