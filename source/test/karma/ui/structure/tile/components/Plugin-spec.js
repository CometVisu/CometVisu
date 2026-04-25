/*
 * Copyright (c) 2025-2026, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Unit tests for <cv-plugin> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-plugin> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
    cv.util.ScriptLoader.getInstance().setAllQueued(true);
    cv.util.ScriptLoader.getInstance().setFinished(true);
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should load a pure-structure plugin', function(done) {
    const engine = cv.TemplateEngine.getInstance();
    const lid = engine.addListener('changeDomFinished', () => {
      if (engine.isDomFinished()) {
        expect(cv.plugins['Link']).not.toBeNull();
        expect(element.querySelector('.widget_container > .widget > a')).not.toBeNull();
        engine.removeListenerById(lid);
        done();
      }
    });
    const element = this.createTileWidgetWithComponent('cv-plugin', {}, '<link></link>');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-PLUGIN');
    expect(element._instance instanceof cv.ui.structure.tile.components.Plugin).toBe(true);
  });

  it('should load a pure-structure plugin by name', function(done) {
    const engine = cv.TemplateEngine.getInstance();
    const lid = engine.addListener('changeDomFinished', () => {
      if (engine.isDomFinished()) {
        expect(cv.plugins['Link']).not.toBeNull();
        expect(element.querySelector('.widget_container > .widget > a')).not.toBeNull();
        engine.removeListenerById(lid);
        done();
      }
    });
    const element = this.createTileWidgetWithComponent('cv-plugin', {name: 'link'}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-PLUGIN');
    expect(element._instance instanceof cv.ui.structure.tile.components.Plugin).toBe(true);
  });


  it('should load a pure-structure plugin that loads extra scripts', function(done) {
    const engine = cv.TemplateEngine.getInstance();
    const lid = engine.addListener('changeDomFinished', () => {
      if (engine.isDomFinished()) {
        expect(cv.plugins['OpenweatherMap']).not.toBeNull();
        expect(element.querySelector('.widget_container .openweathermap_value')).not.toBeNull();
        engine.removeListenerById(lid);
        done();
      }
    });
    const element = this.createTileWidgetWithComponent('cv-plugin', {}, '<openweathermap></openweathermap>');
  });

});
