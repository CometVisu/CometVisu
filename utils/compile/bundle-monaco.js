#!/usr/bin/env node
/**
 * Bundles Monaco editor ESM into self-contained modules that can be
 * loaded natively in the browser (handling CSS imports, font assets, etc.).
 *
 * Output goes to source/resource/monaco/ so it integrates with the
 * Qooxdoo resource system automatically.
 */
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '../..');
const monacoDir = path.join(rootDir, 'node_modules/monaco-editor');
const outDir = path.join(rootDir, 'source/resource/monaco');

if (!fs.existsSync(monacoDir)) {
  console.log('monaco-editor not found in node_modules, skipping bundle');
  process.exit(0);
}

async function bundle() {
  const esbuild = require('esbuild');

  // Ensure output directory exists
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Bundling Monaco editor ESM...');

  // Bundle main editor (CSS is extracted to editor.main.css automatically)
  await esbuild.build({
    entryPoints: [path.join(monacoDir, 'esm/vs/editor/editor.main.js')],
    bundle: true,
    format: 'esm',
    outfile: path.join(outDir, 'editor.main.js'),
    loader: { '.ttf': 'file' },
    assetNames: '[name]'
  });
  console.log('  editor.main.js + editor.main.css');

  // Bundle workers
  const workers = [
    ['editor.worker.js', 'esm/vs/editor/editor.worker.js'],
    ['json.worker.js', 'esm/vs/language/json/json.worker.js'],
    ['css.worker.js', 'esm/vs/language/css/css.worker.js'],
    ['html.worker.js', 'esm/vs/language/html/html.worker.js'],
    ['ts.worker.js', 'esm/vs/language/typescript/ts.worker.js']
  ];

  for (const [outName, entry] of workers) {
    await esbuild.build({
      entryPoints: [path.join(monacoDir, entry)],
      bundle: true,
      format: 'esm',
      outfile: path.join(outDir, outName)
    });
    console.log('  ' + outName);
  }

  // Copy NLS message files for locale support
  const esmDir = path.join(monacoDir, 'esm');
  const nlsFiles = fs.readdirSync(esmDir).filter(
    f => f.startsWith('nls.messages.') && f.endsWith('.js') && f !== 'nls.messages.js'
  );

  for (const nlsFile of nlsFiles) {
    fs.copyFileSync(path.join(esmDir, nlsFile), path.join(outDir, nlsFile));
    console.log('  ' + nlsFile);
  }

  patchWebKitClipboardWorkaround(path.join(outDir, 'editor.main.js'));

  console.log('Monaco bundles created in source/resource/monaco/');
}

/**
 * Monaco calls navigator.clipboard.write() in its WebKit workaround without checking that the
 * async clipboard API is there. Outside a secure context - plain http on anything but localhost -
 * it is not, and the handler runs on every click and keydown, so Safari throws on each of them.
 * Worse, the handler sets webKitPendingClipboardWritePromise before that call, which makes
 * writeText() take its early exit and skip the execCommand fallback - copying then silently does
 * nothing. Returning early leaves that promise untouched and keeps copying working.
 *
 * Proposed upstream in https://github.com/microsoft/vscode/pull/334878, so this can go once the
 * fix reaches a monaco-editor release.
 *
 * @param {string} file the bundled editor.main.js
 */
function patchWebKitClipboardWorkaround(file) {
  const anchor =
    'installWebKitWriteTextWorkaround() {\n' +
    '        const handler = () => {\n' +
    '          const currentWritePromise = new DeferredPromise();';
  const guard =
    'installWebKitWriteTextWorkaround() {\n' +
    '        const handler = () => {\n' +
    '          if (!getActiveWindow().navigator.clipboard) {\n' +
    '            return;\n' +
    '          }\n' +
    '          const currentWritePromise = new DeferredPromise();';

  const code = fs.readFileSync(file, 'utf8');
  const found = code.split(anchor).length - 1;
  if (found !== 1) {
    throw new Error(
      `cannot patch the WebKit clipboard workaround: expected the anchor once, found it ${found} times. ` +
        'Monaco has changed - check whether the fix has landed upstream and drop this patch, or adjust it.'
    );
  }

  fs.writeFileSync(file, code.replace(anchor, guard));
  console.log('  patched the WebKit clipboard workaround for insecure contexts');
}

bundle().catch(err => {
  console.error('Failed to bundle Monaco:', err);
  process.exit(1);
});
