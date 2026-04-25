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
 * Unit tests for component features inherited from AbstractComponent.
 * Uses Button component as a test case.
 *
 * @author Tobias Bräutigam
 * @since 2025
 */

const matrix = [
  {
    name: 'cv-button',
    exclude: ['format']
  },
  {
    name: 'cv-value',
    exclude: ['hooks']
  }
]

for (const config of matrix) {
  describe(`testing inherited features from AbstractComponent for ${config.name} component of the tile structure`, () => {
    let oldController;

    beforeEach(function() {
      oldController = cv.Application.structureController;
      cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    });

    afterEach(() => {
      cv.Application.structureController = oldController;
    });

    if (!config.exclude.includes('replacements')) {
      it('should apply mobile replacements', function() {
        qx.core.Init.getApplication().setMobile(false);
        const element = this.createTileWidgetWithComponent(config.name,
          {},
          '',
          'cv-widget',
          { class: 'btn', 'mobile-class': 'mobile-btn' }
        );
        const widget = element.parentElement.parentElement;
        expect(widget.classList.contains('btn')).toBeTrue();
        expect(widget.classList.contains('mobile-btn')).toBeFalse();

        qx.core.Init.getApplication().setMobile(true);
        expect(widget.classList.contains('btn')).toBeFalse();
        expect(widget.classList.contains('mobile-btn')).toBeTrue();
        qx.core.Init.getApplication().setMobile(false);
      });
    }

    if (!config.exclude.includes('targets')) {
      it('should handle address targets', function() {
        const element = this.createTileWidgetWithComponent(config.name,
          {styling: 'c-style'},
          '<cv-address transform="OH:switch" target="enabled">E</cv-address>' +
          '<cv-address transform="OH:switch" target="show-exclude">SE</cv-address>' +
          '<cv-address transform="OH:switch" target="show-hide">SH</cv-address>' +
          '<cv-address transform="OH:switch" target="styling:my-style">ST</cv-address>' +
          '<cv-address transform="OH:switch" target="styling">STA</cv-address>' +
          '<cv-address transform="OH:number" target="store:val1">S1</cv-address>' +
          '<cv-address transform="OH:number" target="store">S2</cv-address>'
        );
        const instance = element._instance;

        const model = cv.data.Model.getInstance();
        expect(instance.isEnabled()).toBeTrue();
        expect(instance.getVisibility()).toBe('visible');

        model.onUpdate('E', 'OFF');
        expect(instance.isEnabled()).toBeFalse();
        model.onUpdate('E', 'ON');
        expect(instance.isEnabled()).toBeTrue();

        model.onUpdate('SE', 'OFF');
        expect(instance.getVisibility()).toBe('excluded');
        model.onUpdate('SE', 'ON');
        expect(instance.getVisibility()).toBe('visible');

        model.onUpdate('SH', 'OFF');
        expect(instance.getVisibility()).toBe('hidden');
        model.onUpdate('SH', 'ON');
        expect(instance.getVisibility()).toBe('visible');

        spyOn(cv.Application.structureController, 'styleValue').and.returnValue('style-class');
        model.onUpdate('ST', 'ON');
        expect(cv.Application.structureController.styleValue).toHaveBeenCalledOnceWith('my-style', 1);
        expect(instance.getStyleClass()).toBe('style-class');

        cv.Application.structureController.styleValue.calls.reset();
        // test callback to component style
        model.onUpdate('STA', 'ON');
        expect(cv.Application.structureController.styleValue).toHaveBeenCalledOnceWith('c-style', 1);

        // store with custom key
        model.onUpdate('S1', 99);
        expect(instance._store.has('val1')).toBeTrue();
        expect(instance._store.get('val1')).toBe(99);

        // store with address as key
        model.onUpdate('S2', 9);
        expect(instance._store.has('S2')).toBeTrue();
        expect(instance._store.get('S2')).toBe(9);
      });
    }

    if (!config.exclude.includes('hooks')) {
      it('should apply a registered preMappingHook', function() {
        const element = this.createTileWidgetWithComponent(config.name,
          { mapping: 'test' },
          '<cv-address transform="OH:switch" mode="read">T</cv-address>'
        );
        const instance = element._instance;
        const hook = jasmine.createSpy('preMappingHook');
        instance.registerPreMappingHook(hook);
        expect(hook).not.toHaveBeenCalled();
        cv.data.Model.getInstance().onUpdate('T', 'ON');
        expect(hook).toHaveBeenCalledOnceWith('1');

        instance.unregisterPreMappingHook(hook);
        hook.calls.reset();
        cv.data.Model.getInstance().onUpdate('T', 'OFF');
        expect(hook).not.toHaveBeenCalled();
      });
    }

    if (!config.exclude.includes('format')) {
      it('should format the value', function() {
        const element = this.createTileWidgetWithComponent(config.name,
          { format: '%d %%' },
          '<cv-address transform="OH:date" mode="read">T</cv-address>'
        );
        const instance = element._instance;
        spyOn(instance, '_updateValue');
        cv.data.Model.getInstance().onUpdate('T', 80);
        expect(instance._updateValue).toHaveBeenCalledOnceWith('80 %', 80)
      });

      it('should format a date value', function() {
        const element = this.createTileWidgetWithComponent(config.name,
          { format: 'HH:mm:ss' },
          '<cv-address transform="OH:datetime" mode="read">T</cv-address>'
        );
        const instance = element._instance;
        spyOn(instance, '_updateValue');
        cv.data.Model.getInstance().onUpdate('T', '2025-01-01T12:34:56');
        expect(instance._updateValue).toHaveBeenCalledOnceWith('12:34:56', jasmine.any(Date));
      });

      it('should format a mapped value', function() {
        const element = this.createTileWidgetWithComponent(config.name,
          { format: '%d %%', mapping: 'test' },
          '<cv-address transform="OH:date" mode="read">T</cv-address>'
        );
        const instance = element._instance;
        spyOn(instance, '_updateValue');
        spyOn(cv.Application.structureController, 'mapValue').and.returnValue(99);
        cv.data.Model.getInstance().onUpdate('T', 80);
        expect(instance._updateValue).toHaveBeenCalledOnceWith('99 %', 80)
      });
    }
  });
}
