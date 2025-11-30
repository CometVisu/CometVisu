/**
 * Generate screenshots from widget examples using Playwright
 * Replaces the Protractor-based screenshot generation
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

/**
 * Calculate a hash code for a string
 */
function hashCode(s) {
  return s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

/**
 * Create directory recursively if it doesn't exist
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
    console.error('Error cropping image:', error.message);
  }
}

/**
 * Prepare screenshot directory and index
 */
function prepareScreenshotDir(screenshotDir) {
  createDir(screenshotDir);
  const indexFile = path.join(screenshotDir, 'shot-index.json');
  
  if (fs.existsSync(indexFile)) {
    try {
      const indexData = fs.readFileSync(indexFile, 'utf-8');
      shotIndex[screenshotDir] = JSON.parse(indexData);
      if (!shotIndexFiles.includes(indexFile)) {
        shotIndexFiles.push(indexFile);
      }
    } catch (e) {
      console.error('Error parsing screenshot index:', indexFile, e.message);
      shotIndex[screenshotDir] = {};
    }
  } else {
    shotIndex[screenshotDir] = {};
  }
  
  return indexFile;
}

/**
 * Save shot index files
 */
function saveShotIndex() {
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
      }
    } catch (e) {
      console.error('Error saving shot index:', indexFile, e.message);
    }
  }
}

// Determine examples directory
const examplesDir = config.source || path.join('cache', 'widget_examples');
const subDirsMode = !config.source;

// Collect all screenshot definition files
function collectFiles() {
  const files = [];
  
  if (!fs.existsSync(examplesDir)) {
    console.error('Examples directory not found:', examplesDir);
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
          files.push(path.join(subDir, subFileName));
        });
      }
    } else {
      if (config.screenshots.length > 0 && !config.screenshots.includes(fileName)) {
        return;
      }
      if (!fileName.endsWith('.json')) {
        return;
      }
      files.push(subDir);
    }
  });
  
  return files;
}

const files = collectFiles();

// Generate tests for each screenshot file
test.describe('Screenshot Generation', () => {
  test.afterAll(() => {
    // Print summary
    const color = stats.error > 0 ? '\x1b[31m' : '\x1b[32m';
    const result = `${stats.success}/${stats.total} screenshots created. ${stats.skipped} skipped. ${stats.error} failed`;
    const separator = '#'.repeat(result.length + 8);
    
    console.log(color);
    console.log('\n' + separator);
    console.log('#  ', result, '  #');
    console.log(separator);
    console.log('\x1b[0m');
    
    // Save shot index files
    saveShotIndex();
  });

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
        console.error('Error parsing settings:', filePath, e.message);
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
          }
        }
      }

      // Check which screenshots need to be created
      const skippedScreenshots = [];
      const screenshots = [];
      let allSkipped = true;

      const checkExists = (setting, screenshotDir) => {
        const imgPath = path.join(screenshotDir, setting.name + '.png');
        
        if (!fs.existsSync(imgPath)) {
          if (config.verbose) {
            console.log('File not found, creating screenshot:', imgPath);
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
              console.log('Hash mismatch, creating screenshot:', imgPath);
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
      const loadManager = settings.mode === 'editor' || settings.mode === 'manager';

      if (settings.mode === 'real') {
        mockup = new CometVisuDemo(page, settings.config, settings.pageLoaded, config.target);
      } else if (settings.mode === 'editor' || settings.editor) {
        mockup = new CometVisuEditorMockup(page, config.target);
        selectorPrefix = '';
      } else {
        mockup = new CometVisuMockup(page, config.target);
      }

      if (settings.selector.includes('.activePage') || settings.selector.includes('#')) {
        selectorPrefix = '';
      }

      // Mock the configuration
      if (settings.mode !== 'real') {
        await mockup.mockupConfig(settings.config);
      }

      // Mock fixtures
      if (settings.fixtures) {
        for (const fixture of settings.fixtures) {
          await mockup.mockupFixture(fixture);
          if (config.verbose) {
            console.log('Mocked fixture:', fixture.targetPath);
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
        await page.waitForSelector('#manager', { state: 'visible', timeout: 2000 });

        if (settings.mode === 'editor' || settings.editor) {
          const editorMockup = mockup;
          await editorMockup.editConfig(
            settings.configFileName || 'mockup',
            settings.showPreview
          );

          await page.waitForSelector(
            'div[qxclass="qx.ui.tree.VirtualTree"] div[qxclass="cv.ui.manager.tree.VirtualElementItem"]',
            { state: 'visible', timeout: 2000 }
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
            timeout: 2000
          });
        }

        if (settings.rightClickOn) {
          const ele = page.locator(settings.rightClickOn).first();
          await ele.click({ button: 'right' });
          await page.mouse.move(400, 0);
        }
      }

      // Wait for rendering
      await page.waitForTimeout(settings.sleep || 1000);

      // Wait for the target widget
      const widget = page.locator(selectorPrefix + settings.selector).first();
      await widget.waitFor({ state: 'visible', timeout: 2000 });

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
                  console.error('Error parsing JSON data:', e.message);
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
            await page.waitForSelector(waitFor, { state: 'visible', timeout: 1000 });
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
            await page.waitForSelector(setting.waitFor, { state: 'visible', timeout: 1000 });
          }

          // Select different widget for screenshot
          if (setting.selector) {
            shotWidget = page.locator(selectorPrefix + setting.selector).first();
            await shotWidget.waitFor({ state: 'visible', timeout: 2000 });
          }

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
                console.log(result);
              }
            }

            // Take screenshot
            const imgFile = path.join(screenshotDir, setting.name + '.png');
            
            if (config.verbose) {
              console.log(`Creating screenshot: ${setting.name} (${locale})`);
            }

            // Take full page screenshot
            await page.screenshot({ path: imgFile, fullPage: false });

            // Crop to element
            let scaledWidth, scaledHeight;
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

            stats.success++;
            stats.total++;
          }
        } catch (error) {
          console.error(`Error creating screenshot ${setting.name}:`, error.message);
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
