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
 * Unit tests for cv.io.timeseries.Plugin
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.timeseries.Plugin', () => {
  let instance;
  let mockChart;

  beforeEach(() => {
    mockChart = {};
    cv.io.timeseries.Plugin._registry = {};
    cv.io.timeseries.Plugin._waitingForType = {};
  });

  afterEach(() => {
    cv.io.timeseries.Plugin.clearWaiting();
    cv.io.timeseries.Plugin._registry = {};
    cv.io.timeseries.Plugin._waitingForType = {};
    if (instance && !instance.isDisposed()) {
      instance.dispose();
    }
  });

  it('should be defined', () => {
    expect(cv.io.timeseries.Plugin).toBeDefined();
  });

  it('should extend AbstractTimeSeriesSource', () => {
    // Register a mock plugin first to avoid timeout
    cv.io.timeseries.Plugin._registry['testplugin'] = function() {
      this.getRequestConfig = () => ({ url: '', options: {}, proxy: false });
    };
    
    instance = new cv.io.timeseries.Plugin('plugin+testplugin://name', mockChart);
    expect(instance instanceof cv.io.timeseries.AbstractTimeSeriesSource).toBe(true);
  });

  it('should register a plugin class', () => {
    const mockPluginClass = function() {};
    
    cv.io.timeseries.Plugin.registerPlugin('mytype', mockPluginClass);
    
    expect(cv.io.timeseries.Plugin._registry['mytype']).toBe(mockPluginClass);
  });

  it('should initialize waiting instances when plugin is registered', () => {
    const mockPluginClass = function() {
      this.getRequestConfig = () => ({});
    };
    
    // Create instance that will wait for plugin
    instance = new cv.io.timeseries.Plugin('plugin+custom://name', mockChart);
    
    expect(cv.io.timeseries.Plugin._waitingForType['custom']).toBeDefined();
    expect(cv.io.timeseries.Plugin._waitingForType['custom'].length).toBe(1);
    
    // Register the plugin - should initialize waiting instance
    cv.io.timeseries.Plugin.registerPlugin('custom', mockPluginClass);
    
    expect(cv.io.timeseries.Plugin._waitingForType['custom']).toBeUndefined();
    expect(instance._plugin).toBeDefined();
  });

  it('should clear all waiting timeouts', () => {
    // Register plugins first - clearWaiting only clears for registered types
    cv.io.timeseries.Plugin._registry['type1'] = function() {};
    cv.io.timeseries.Plugin._registry['type2'] = function() {};
    
    // Create some waiting entries for registered types
    cv.io.timeseries.Plugin._waitingForType['type1'] = [
      { instance: {}, timeout: setTimeout(() => {}, 10000) }
    ];
    cv.io.timeseries.Plugin._waitingForType['type2'] = [
      { instance: {}, timeout: setTimeout(() => {}, 10000) }
    ];
    
    cv.io.timeseries.Plugin.clearWaiting();
    
    // Should not throw and should clear waiting
    expect(cv.io.timeseries.Plugin._waitingForType['type1']).toBeUndefined();
    expect(cv.io.timeseries.Plugin._waitingForType['type2']).toBeUndefined();
    
    // Cleanup
    delete cv.io.timeseries.Plugin._registry['type1'];
    delete cv.io.timeseries.Plugin._registry['type2'];
  });

  it('should initialize only once', () => {
    const mockPluginClass = jasmine.createSpy('PluginClass').and.callFake(function() {
      this.getRequestConfig = () => ({});
    });
    cv.io.timeseries.Plugin.registerPlugin('initonce', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+initonce://name', mockChart);
    instance.init();
    instance.init();
    
    expect(mockPluginClass.calls.count()).toBe(1);
  });

  it('should wait for unregistered plugin type', () => {
    instance = new cv.io.timeseries.Plugin('plugin+unknowntype://name', mockChart);
    
    expect(cv.io.timeseries.Plugin._waitingForType['unknowntype']).toBeDefined();
    expect(instance._initialized).toBeFalsy();
  });

  it('should create plugin instance for registered type', () => {
    const mockPluginClass = function(config, chart) {
      this.config = config;
      this.chart = chart;
      this.getRequestConfig = () => ({});
    };
    cv.io.timeseries.Plugin.registerPlugin('registered', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+registered://name', mockChart);
    
    expect(instance._initialized).toBe(true);
    expect(instance._plugin).toBeDefined();
    expect(instance._plugin.chart).toBe(mockChart);
  });

  it('should delegate to plugin', () => {
    const mockConfig = { url: 'test-url', options: { method: 'GET' }, proxy: true };
    const mockPluginClass = function() {
      this.getRequestConfig = jasmine.createSpy('getRequestConfig').and.returnValue(mockConfig);
    };
    cv.io.timeseries.Plugin.registerPlugin('delegatetest', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+delegatetest://name', mockChart);
    const result = instance.getRequestConfig('start', 'end', 'day', 0);
    
    expect(instance._plugin.getRequestConfig).toHaveBeenCalledWith('start', 'end', 'day', 0);
    expect(result).toBe(mockConfig);
  });

  it('should delegate to plugin fetchData', async () => {
    const mockData = [[1, 10], [2, 20]];
    const mockPluginClass = function() {
      this.getRequestConfig = () => ({});
      this.fetchData = jasmine.createSpy('fetchData').and.returnValue(Promise.resolve(mockData));
    };
    cv.io.timeseries.Plugin.registerPlugin('fetchtest', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+fetchtest://name', mockChart);
    const result = await instance.fetchData('start', 'end', 'day', 0);
    
    expect(instance._plugin.fetchData).toHaveBeenCalledWith('start', 'end', 'day', 0);
    expect(result).toBe(mockData);
  });

  it('should delegate to plugin processResponse when available', () => {
    const mockPluginClass = function() {
      this.getRequestConfig = () => ({});
      this.processResponse = jasmine.createSpy('processResponse').and.callFake(data => data.map(x => x * 2));
    };
    cv.io.timeseries.Plugin.registerPlugin('processtest', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+processtest://name', mockChart);
    const result = instance.processResponse([1, 2, 3]);
    
    expect(instance._plugin.processResponse).toHaveBeenCalledWith([1, 2, 3]);
    expect(result).toEqual([2, 4, 6]);
  });

  it('should return data unchanged when plugin has no processResponse', () => {
    const mockPluginClass = function() {
      this.getRequestConfig = () => ({});
    };
    cv.io.timeseries.Plugin.registerPlugin('noprocess', mockPluginClass);
    
    instance = new cv.io.timeseries.Plugin('plugin+noprocess://name', mockChart);
    const data = [1, 2, 3];
    const result = instance.processResponse(data);
    
    expect(result).toBe(data);
  });

  it('should return data unchanged when plugin is not initialized', () => {
    instance = new cv.io.timeseries.Plugin('plugin+notregistered://name', mockChart);
    const data = [1, 2, 3];
    const result = instance.processResponse(data);
    
    expect(result).toBe(data);
  });
});
