/**
 * Generate screenshots from widget examples using Playwright
 * Browser-driven screenshot generation used by the Playwright workflow
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
const { test, chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CometVisuMockup = require('../source/test/playwright/pages/Mock');
const CometVisuEditorMockup = require('../source/test/playwright/pages/EditorMock');
const CometVisuDemo = require('../source/test/playwright/pages/Demo');

/**
 * Log to stdout (visible in Playwright output)
 * @param {...any} args
 */
function log(...args) {
  process.stdout.write(args.join(' ') + '\n');
}

/**
 * Log error to stderr (visible in Playwright output)
 * @param {...any} args
 */
function logError(...args) {
  process.stderr.write(args.join(' ') + '\n');
}

// Configuration from environment/command line
const config = {
  source: process.env.CV_SOURCE || null,
  subDir: process.env.CV_SUBDIR || null,
  screenshots: process.env.CV_SCREENSHOTS ? process.env.CV_SCREENSHOTS.split(',') : [],
  target: process.env.CV_TARGET || 'source',
  targetDir: process.env.CV_TARGET_DIR || null,
  forced: process.env.CV_FORCED === 'true',
  verbose: process.env.CV_VERBOSE === 'true',
  language: process.env.CV_LANGUAGE || null
};

const defaultWidth = 1300;
const defaultHeight = 800;

const stats = {
  total: 0,
  success: 0,
  error: 0,
  skipped: 0
};

const shotIndexFiles = [];
const shotIndex = {};
// Track screenshots created in this session to avoid duplicates
const createdScreenshots = new Set();

/**
 * Calculate a hash code for a string
 * @param s
 */
function hashCode(s) {
  return s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

/**
 * Create directory recursively if it doesn't exist
 * @param dir
 */
function createDir(dir) {
  if (dir.endsWith('/')) {
    dir = dir.slice(0, -1);
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
  }
}

/**
 * Crop and optionally resize an image
 * @param srcFile
 * @param size
 * @param location
 * @param targetWidth
 * @param targetHeight
 */
async function cropImage(srcFile, size, location, targetWidth, targetHeight) {
  try {
    const image = sharp(srcFile);
    const metadata = await image.metadata();
    
    // Get device pixel ratio (assume 1 for headless)
    const dpr = 1;
    
    // Calculate crop region
    const cropX = Math.max(0, Math.round(location.x * dpr));
    const cropY = Math.max(0, Math.round(location.y * dpr));
    const cropWidth = Math.min(Math.round(size.width * dpr), metadata.width - cropX);
    const cropHeight = Math.min(Math.round(size.height * dpr), metadata.height - cropY);
    
    let pipeline = image.extract({
      left: cropX,
      top: cropY,
      width: cropWidth,
      height: cropHeight
    });
    
    // Resize if target dimensions are specified
    if (targetWidth && targetHeight) {
      pipeline = pipeline.resize(targetWidth, targetHeight);
    }
    
    await pipeline.toFile(srcFile + '.tmp');
    fs.renameSync(srcFile + '.tmp', srcFile);
  } catch (error) {
    logError('Error cropping image:', error.message);
  }
}

/**
 * Prepare screenshot directory and index
 * @param screenshotDir
 */
function prepareScreenshotDir(screenshotDir) {
  createDir(screenshotDir);
  const indexFile = path.join(screenshotDir, 'shot-index.json');
  
  if (fs.existsSync(indexFile)) {
    try {
      const indexData = fs.readFileSync(indexFile, 'utf-8');
      shotIndex[screenshotDir] = JSON.parse(indexData);
    } catch (e) {
      logError('Error parsing screenshot index:', indexFile, e.message);
      shotIndex[screenshotDir] = {};
    }
  } else {
    shotIndex[screenshotDir] = {};
  }
  
  // Always register the index file for saving
  if (!shotIndexFiles.includes(indexFile)) {
    shotIndexFiles.push(indexFile);
  }
  
  return indexFile;
}

/**
 * Save shot index files
 */
function saveShotIndex() {
  if (config.verbose) {
    log(`Saving ${shotIndexFiles.length} shot index file(s)...`);
  }
  for (const indexFile of shotIndexFiles) {
    try {
      const dir = path.dirname(indexFile);
      if (shotIndex[dir]) {
        // Clean up entries for non-existent files
        const existingFiles = fs.readdirSync(dir)
          .filter(file => file.endsWith('.png'))
          .map(file => file.replace('.png', ''));
        
        for (const file in shotIndex[dir]) {
          if (!existingFiles.includes(file)) {
            delete shotIndex[dir][file];
          }
        }
        
        fs.writeFileSync(indexFile, JSON.stringify(shotIndex[dir], null, 4));
        if (config.verbose) {
          log(`Saved shot index: ${indexFile}`);
        }
      }
    } catch (e) {
      logError('Error saving shot index:', indexFile, e.message);
    }
  }
}

// Determine examples directory
const examplesDir = config.source || path.join('cache', 'widget_examples');
const subDirsMode = !config.source;

/**
 * Check if a screenshot file needs any screenshots to be generated.
 * This is used for pre-filtering before test registration to avoid
 * starting tests that will be entirely skipped.
 * @param filePath
 */
function needsScreenshots(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const settings = JSON.parse(rawData);
    
    // Determine language
    if (!settings.language) {
      const fileName = path.basename(filePath);
      const langMatch = fileName.match(/^([a-z]{2})_/);
      settings.language = langMatch ? langMatch[1] : 'de';
    }
    
    // Calculate settings hash for screenshots without individual hash
    const settingsHash = hashCode(JSON.stringify(settings));
    
    for (const setting of settings.screenshots) {
      const hash = setting.hash || settingsHash;
      
      if (setting.locales) {
        for (const locale of setting.locales) {
          const screenshotDir = path.join(
            ...[settings.baseDir, locale, settings.screenshotDir].filter(Boolean)
          );
          if (needsScreenshot(setting.name, hash, screenshotDir)) {
            return true;
          }
        }
      } else if (needsScreenshot(setting.name, hash, settings.screenshotDir)) {
        return true;
      }
    }
    
    // All screenshots exist and are up-to-date
    return false;
  } catch (e) {
    // On error, assume we need to process this file
    return true;
  }
}

/**
 * Check if a single screenshot needs to be created.
 * A screenshot needs to be created if:
 * - The file doesn't exist, OR
 * - Forced regeneration is enabled
 * 
 * Note: Hash mismatches are ignored for pre-filtering because multiple
 * source files may produce the same screenshot with different hashes.
 * The screenshot only needs to exist.
 * @param name
 * @param hash
 * @param screenshotDir
 */
function needsScreenshot(name, hash, screenshotDir) {
  const imgPath = path.join(screenshotDir, name + '.png');
  
  // File doesn't exist
  if (!fs.existsSync(imgPath)) {
    return true;
  }
  
  // Forced regeneration
  if (config.forced) {
    return true;
  }
  
  // Screenshot exists - no need to recreate
  // (Hash mismatches between multiple source files are handled at runtime)
  return false;
}

/**
 * Check for duplicate screenshot definitions across all files.
 * Returns an object mapping "screenshotDir/name" to array of source files.
 * @param allFiles
 */
function findDuplicates(allFiles) {
  const screenshotSources = {}; // Map: "dir/name" -> [sourceFile1, sourceFile2, ...]
  
  for (const filePath of allFiles) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const settings = JSON.parse(rawData);
      
      for (const setting of settings.screenshots) {
        if (setting.locales) {
          for (const locale of setting.locales) {
            const screenshotDir = path.join(
              ...[settings.baseDir, locale, settings.screenshotDir].filter(Boolean)
            );
            const key = `${screenshotDir}/${setting.name}`;
            if (!screenshotSources[key]) {
              screenshotSources[key] = [];
            }
            screenshotSources[key].push(filePath);
          }
        } else {
          const key = `${settings.screenshotDir}/${setting.name}`;
          if (!screenshotSources[key]) {
            screenshotSources[key] = [];
          }
          screenshotSources[key].push(filePath);
        }
      }
    } catch (e) {
      // Skip files with parse errors
    }
  }
  
  // Find duplicates (more than one source file for the same screenshot)
  const duplicates = {};
  for (const [key, sources] of Object.entries(screenshotSources)) {
    if (sources.length > 1) {
      duplicates[key] = sources;
    }
  }
  
  return duplicates;
}

// Collect all screenshot definition files
/**
 *
 */
function collectFiles() {
  const files = [];
  
  if (!fs.existsSync(examplesDir)) {
    logError('Examples directory not found:', examplesDir);
    return files;
  }
  
  fs.readdirSync(examplesDir).forEach(fileName => {
    const subDir = path.join(examplesDir, fileName);
    
    if (subDirsMode) {
      if (config.subDir && config.subDir !== fileName) {
        return;
      }
      
      if (fs.statSync(subDir).isDirectory()) {
        fs.readdirSync(subDir).forEach(subFileName => {
          if (config.screenshots.length > 0 && !config.screenshots.includes(subFileName)) {
            return;
          }
          if (!subFileName.endsWith('.json')) {
            return;
          }
          if (config.language && !subFileName.startsWith(config.language + '_')) {
            return;
          }
          const fullPath = path.join(subDir, subFileName);
          if (needsScreenshots(fullPath)) {
            files.push(fullPath);
          } else {
            skippedFiles.push(fullPath);
          }
        });
      }
    } else {
      if (config.screenshots.length > 0 && !config.screenshots.includes(fileName)) {
        return;
      }
      if (!fileName.endsWith('.json')) {
        return;
      }
      if (needsScreenshots(subDir)) {
        files.push(subDir);
      } else {
        skippedFiles.push(subDir);
      }
    }
  });
  
  return files;
}

const skippedFiles = [];
const files = collectFiles();

// Check for duplicate screenshot definitions
const allFilesToCheck = [...files, ...skippedFiles];
const duplicates = findDuplicates(allFilesToCheck);

if (Object.keys(duplicates).length > 0) {
  logError('\n\x1b[31m========== DUPLICATE SCREENSHOT DEFINITIONS FOUND ==========\x1b[0m');
  for (const [screenshot, sources] of Object.entries(duplicates)) {
    logError(`\n\x1b[31mDuplicate:\x1b[0m ${screenshot}`);
    logError('  Defined in:');
    for (const source of sources) {
      logError(`    - ${source}`);
    }
  }
  logError('\n\x1b[31mPlease fix the duplicate definitions before continuing.\x1b[0m\n');
  process.exit(1);
}

// Log pre-filtered files count
if (config.verbose && skippedFiles.length > 0) {
  log(`Pre-filtered ${skippedFiles.length} file(s) with up-to-date screenshots`);
}

// Generate tests for each screenshot file
test.describe('Screenshot Generation', () => {
  test.afterAll(() => {
    // Print summary
    const color = stats.error > 0 ? '\x1b[31m' : '\x1b[32m';
    const filesInfo = skippedFiles.length > 0 ? ` (${skippedFiles.length} files pre-filtered)` : '';
    const result = `${stats.success}/${stats.total} screenshots created. ${stats.skipped} skipped. ${stats.error} failed${filesInfo}`;
    const separator = '#'.repeat(result.length + 8);
    
    log(color);
    log('\n' + separator);
    log('#  ', result, '  #');
    log(separator);
    log('\x1b[0m');
    
    // Save shot index files
    saveShotIndex();
  });

  // Add a placeholder test when all files are pre-filtered to avoid "no tests found" error
  if (files.length === 0) {
    test('All screenshots up-to-date', () => {
      // Nothing to do - all screenshots were pre-filtered as up-to-date
    });
  }

  for (const filePath of files) {
    test(`Generate screenshots from ${path.basename(filePath)}`, async ({ browser }) => {
      if (!fs.existsSync(filePath)) {
        return;
      }

      const rawData = fs.readFileSync(filePath, 'utf-8');
      let settings;
      
      try {
        settings = JSON.parse(rawData);
      } catch (e) {
        logError('Error parsing settings:', filePath, e.message);
        stats.error++;
        stats.total++;
        return;
      }

      // Determine language: from settings.language, from filename prefix, or default 'de'
      if (!settings.language) {
        const fileName = path.basename(filePath);
        const langMatch = fileName.match(/^([a-z]{2})_/);
        if (langMatch) {
          settings.language = langMatch[1];
        } else {
          settings.language = 'de';
        }
      }

      // Create a new browser context with the correct locale
      const context = await browser.newContext({
        locale: settings.language,
        viewport: { width: defaultWidth, height: defaultHeight }
      });
      const page = await context.newPage();

      // Prepare screenshot directories
      const runIndexFiles = [];
      let settingsHash;
      
      if (!settings.baseDir) {
        runIndexFiles.push([
          prepareScreenshotDir(settings.screenshotDir),
          settings.screenshotDir
        ]);
      } else {
        for (const setting of settings.screenshots) {
          if (setting.locales) {
            for (const locale of setting.locales) {
              const dir = path.join(
                ...[settings.baseDir, locale, settings.screenshotDir].filter(Boolean)
              );
              runIndexFiles.push([prepareScreenshotDir(dir), dir]);
            }
          } else {
            // Also prepare for settings without locales
            const dir = path.join(
              ...[settings.baseDir, settings.language, settings.screenshotDir].filter(Boolean)
            );
            if (!runIndexFiles.some(([_, d]) => d === dir)) {
              runIndexFiles.push([prepareScreenshotDir(dir), dir]);
            }
          }
        }
      }
      
      // Also ensure the default screenshotDir is prepared
      if (!runIndexFiles.some(([_, d]) => d === settings.screenshotDir)) {
        prepareScreenshotDir(settings.screenshotDir);
      }

      // Check which screenshots need to be created
      const skippedScreenshots = [];
      const screenshots = [];
      let allSkipped = true;

      const checkExists = (setting, screenshotDir) => {
        const imgPath = path.join(screenshotDir, setting.name + '.png');
        const cacheKey = `${screenshotDir}/${setting.name}`;
        
        // Check if already created in this session
        if (createdScreenshots.has(cacheKey)) {
          if (config.verbose) {
            log('Already created in this session, skipping:', imgPath);
          }
          stats.skipped++;
          stats.total++;
          skippedScreenshots.push(screenshotDir + setting.name);
          return;
        }
        
        if (!fs.existsSync(imgPath)) {
          if (config.verbose) {
            log('File not found, creating screenshot:', imgPath);
          }
          screenshots.push(setting.name);
          allSkipped = false;
        } else if (setting.hash) {
          if (shotIndex[screenshotDir]?.[setting.name] === setting.hash && !config.forced) {
            stats.skipped++;
            stats.total++;
            skippedScreenshots.push(screenshotDir + setting.name);
          } else {
            if (config.verbose) {
              log('Hash mismatch, creating screenshot:', imgPath);
            }
            screenshots.push(setting.name);
            allSkipped = false;
          }
        } else {
          stats.skipped++;
          stats.total++;
          skippedScreenshots.push(screenshotDir + setting.name);
        }
      };

      for (const setting of settings.screenshots) {
        if (!setting.hash) {
          if (!settingsHash) {
            settingsHash = hashCode(JSON.stringify(settings));
          }
          setting.hash = settingsHash;
        }
        
        if (setting.locales) {
          for (const locale of setting.locales) {
            checkExists(
              setting,
              path.join(...[settings.baseDir, locale, settings.screenshotDir].filter(Boolean))
            );
          }
        } else {
          checkExists(setting, settings.screenshotDir);
        }
      }

      if (allSkipped) {
        return;
      }

      // Determine mockup type and create page object
      let mockup;
      let selectorPrefix = settings.structure === 'tile' ? '' : '.activePage ';
      const loadManager = settings.mode === 'editor' || settings.mode === 'manager' || settings.editor;

      if (settings.mode === 'real') {
        mockup = new CometVisuDemo(page, settings.config, settings.pageLoaded, config.target);
      } else if (settings.mode === 'editor' || settings.editor) {
        mockup = new CometVisuEditorMockup(page, config.target);
        selectorPrefix = '';
      } else {
        mockup = new CometVisuMockup(page, config.target, settings.structure === 'tile');
      }

      if (settings.selector.includes('.activePage') || settings.selector.includes('#')) {
        selectorPrefix = '';
      }

      const uiWaitTimeout = loadManager ? mockup.timeout.xl : mockup.timeout.l;

      // Mock the configuration
      if (settings.mode !== 'real') {
        await mockup.mockupConfig(settings.config);
      }

      // Mock fixtures
      if (settings.fixtures) {
        for (const fixture of settings.fixtures) {
          await mockup.mockupFixture(fixture);
          if (config.verbose) {
            log('Mocked fixture:', fixture.targetPath);
          }
        }
      }

      // Navigate to the page
      await mockup.to();

      // Initialize backend connections
      await page.evaluate(() => {
        if (typeof window._receive !== 'function') {
          cv.io.BackendConnections.initBackendClients();
        }
      });

      // Handle editor/manager specific setup
      if (loadManager) {
        await page.waitForSelector('#manager', { state: 'visible', timeout: uiWaitTimeout });

        if (settings.mode === 'editor' || settings.editor) {
          const editorMockup = mockup;
          await editorMockup.editConfig(
            settings.configFileName || 'mockup',
            settings.showPreview
          );

          await page.waitForSelector(
            'div[qxclass="qx.ui.tree.VirtualTree"] div[qxclass="cv.ui.manager.tree.VirtualElementItem"]',
            { state: 'visible', timeout: uiWaitTimeout }
          );

          if (settings.complex) {
            await editorMockup.enableExpertMode();
          }

          await editorMockup.openWidgetElement(
            settings.widget,
            settings.editor === 'attributes'
          );

          if (settings.special?.contextMenu) {
            const ele = page.locator(`div[data-nodename="${settings.widget}"]`);
            await ele.click({ button: 'right' });
          }
        }

        if (settings.openFile) {
          if (settings.openFile.config) {
            await mockup.dispatchAction('openWith', {
              file: settings.openFile.name,
              ...settings.openFile.config
            });
          } else {
            await mockup.dispatchAction('open', settings.openFile.name);
          }
          await page.waitForSelector(settings.openFile.waitFor, {
            state: 'visible',
            timeout: uiWaitTimeout
          });
        }

        if (settings.rightClickOn) {
          const ele = page.locator(settings.rightClickOn).first();
          await ele.click({ button: 'right' });
          await page.mouse.move(400, 0);
        }
      }

      // Wait for rendering
      const initialSleep = Number.parseInt(settings.sleep, 10);
      await page.waitForTimeout(Number.isNaN(initialSleep) ? 1000 : initialSleep);

      // Wait until the base widget exists. Some examples only become visible
      // after data updates or screenshot-specific interactions.
      const widget = page.locator(selectorPrefix + settings.selector).first();
      await widget.waitFor({ state: 'attached', timeout: uiWaitTimeout });

      // Process each screenshot
      for (const setting of settings.screenshots) {
        if (skippedScreenshots.includes(setting.name)) {
          continue;
        }

        try {
          let shotWidget = widget;

          // Set viewport size
          await page.setViewportSize({
            width: setting.screenWidth > 0 ? setting.screenWidth : defaultWidth,
            height: settings.screenHeight > 0 ? settings.screenHeight : defaultHeight
          });

          // Send data updates
          if (setting.data && Array.isArray(setting.data)) {
            for (const data of setting.data) {
              let value = data.value;

              if (data.type === 'json') {
                try {
                  value = JSON.parse(value);
                } catch (e) {
                  logError('Error parsing JSON data:', e.message);
                }
              } else if (data.type === 'time') {
                const date = new Date();
                const parts = value.split(':').map(v => parseInt(v, 10));
                date.setHours(...parts);
                value = await mockup.encode({ transform: data.transform }, date);
              } else if (data.type === 'date') {
                value = await mockup.encode({ transform: data.transform }, new Date(value));
              } else if (data.transform && data.transform !== 'raw') {
                value = await mockup.encode({ transform: data.transform }, value);
              }

              await mockup.sendUpdate(data.address, value);
            }
          }

          // Handle click actions
          if (setting.clickPath) {
            const actor = page.locator(setting.clickPath).first();
            await actor.click();
            const waitFor = setting.waitFor || selectorPrefix + settings.selector;
            await page.waitForSelector(waitFor, { state: 'visible', timeout: uiWaitTimeout });
          }

          // Handle page navigation
          if (setting.gotoPage) {
            await mockup.goToPage(setting.gotoPage, true);
            await page.waitForTimeout(10);
          }

          // Handle hover
          if (setting.hoverOn) {
            const ele = page.locator(setting.hoverOn).first();
            await ele.hover();
          }

          // Wait for specific element
          if (setting.waitFor) {
            await page.waitForSelector(setting.waitFor, { state: 'visible', timeout: uiWaitTimeout });
          }

          // Select different widget for screenshot
          if (setting.selector) {
            shotWidget = page.locator(selectorPrefix + setting.selector).first();
          }

          await shotWidget.waitFor({ state: 'visible', timeout: uiWaitTimeout });

          // Get element dimensions
          let size = setting.size || await shotWidget.boundingBox();
          let location = setting.location || await shotWidget.boundingBox();

          if (!size || !location) {
            throw new Error('Could not get element dimensions');
          }

          // Apply location offset
          if (setting.locationOffset) {
            location.x += setting.locationOffset.x;
            location.y += setting.locationOffset.y;
          }

          // Apply margin
          if (setting.margin) {
            const margins = Array.isArray(setting.margin)
              ? setting.margin
              : [setting.margin, setting.margin, setting.margin, setting.margin];
            
            location.y -= margins[0];
            location.x -= margins[3];
            size.width += margins[1] + margins[3];
            size.height += margins[0] + margins[2];
          }

          location.x = Math.max(0, location.x);
          location.y = Math.max(0, location.y);

          // Additional sleep
          if (setting.sleep) {
            await page.waitForTimeout(parseInt(setting.sleep));
          }

          // Process locales
          const locales = setting.locales || [settings.language || 'de'];

          for (const locale of locales) {
            const screenshotDir = settings.baseDir
              ? path.join(...[settings.baseDir, locale, settings.screenshotDir].filter(Boolean))
              : settings.screenshotDir;

            if (skippedScreenshots.includes(screenshotDir + setting.name)) {
              continue;
            }

            // Set locale
            if (locale) {
              const result = await mockup.setLocale(locale);
              if (config.verbose) {
                log(result);
              }
            }

            // Take screenshot
            const imgFile = path.join(screenshotDir, setting.name + '.png');
            
            if (config.verbose) {
              log(`Creating screenshot: ${setting.name} (${locale})`);
            }

            // Take full page screenshot
            await page.screenshot({ path: imgFile, fullPage: false });

            // Crop to element
            let scaledWidth; 
            let scaledHeight;
            if (settings.scale) {
              const scale = parseInt(settings.scale) / 100;
              scaledWidth = Math.round(size.width * scale);
              scaledHeight = Math.round(size.height * scale);
            }

            await cropImage(imgFile, size, location, scaledWidth, scaledHeight);

            // Update shot index
            if (setting.hash) {
              if (!shotIndex[screenshotDir]) {
                shotIndex[screenshotDir] = {};
              }
              shotIndex[screenshotDir][setting.name] = setting.hash;
              
              // Save index for this directory
              const indexFile = path.join(screenshotDir, 'shot-index.json');
              fs.writeFileSync(indexFile, JSON.stringify(shotIndex[screenshotDir], null, 4));
            }
            
            // Mark as created in this session to prevent duplicates
            createdScreenshots.add(`${screenshotDir}/${setting.name}`);

            stats.success++;
            stats.total++;
          }
        } catch (error) {
          logError(`Error creating screenshot ${setting.name}:`, error.message);
          stats.error++;
          stats.total++;
        }
      }

      // Reset fixtures
      if (settings.fixtures) {
        for (const fixture of settings.fixtures) {
          await mockup.resetMockupFixture(fixture);
        }
      }

      // Close the browser context
      await context.close();
    });
  }
});
