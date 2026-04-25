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
 * Unit tests for <cv-list> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-list> component of the tile structure', () => {
  let oldController;

  beforeAll(() => {
    qx.Class.define('cv.test.ListModel', {
      extend: qx.core.Object,
      implement: cv.io.listmodel.IListModel,
      construct() {
        qx.core.Object.constructor.call(this);
        this.initModel(new qx.data.Array());
      },
      events: {
        refresh: 'qx.event.type.Event'
      },
      properties: {
        model: {
          check: 'qx.data.Array',
          deferredInit: true
        },
        p1: {
          check: 'String',
          init: ''
        },
        p2: {
          check: 'String',
          init: ''
        }
      },
      members: {
        async refresh() {
          this.getModel().removeAll();
          this.getModel().push(
            {label: 'Item1'},
            {label: 'Item2'},
            {label: 'Item3'}
          );
        },
        handleEvent(ev, data, model) {
          return false;
        }
      }
    });
    cv.io.listmodel.Registry.register(cv.test.ListModel);
  });

  afterAll(function() {
    cv.io.listmodel.Registry.unregister(cv.test.ListModel);
    qx.Class.undefine('cv.test.ListModel');
  });

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create an empty list', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-LIST');
    expect(element._instance instanceof cv.ui.structure.tile.components.List).toBe(true);
    expect(element.children.length).toBe(0);
  });


  it('should create a list with a script model', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
    `<model>
      <script>
        for (let i = 0; i < 5; i++) {
            model.push({
              label: 'Item ' + i,
            })
          }
      </script>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);

    expect(element.querySelectorAll('ul.content > li').length).toBe(5);

    for (let i = 0; i < 5; i++) {
      expect(element.querySelector(`ul.content > li[data-row="${i}"] > label`).textContent).toBe(`Item ${i}`);
    }
  });

  it('should create a list with a limit', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {},
      `<model limit="2">
      <script>
        for (let i = 0; i < 5; i++) {
            model.push({
              label: 'Item ' + i,
            })
          }
      </script>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);

    expect(element.querySelectorAll('ul.content > li').length).toBe(2);
  });

  it('should create a filtered, sorted list with an item model', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model filter="item.active===true" sort-by="label">
      <cv-address transform="raw" mode="read">members:Lights</cv-address>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    // un-debounced refresh
    element._instance.debouncedRefresh = element._instance.refresh;
    element._instance.setVisible(true);

    element._instance.setValue([
      {
        label: 'z Item 1',
        active: true
      },
      {
        label: 'a Item 2',
        active: false
      },
      {
        label: 'b Item 3',
        active: true
      }
    ]);
    expect(element.querySelectorAll('ul.content > li').length).toBe(2);
    expect(element.querySelector('ul.content > li[data-row="0"] > label').textContent).toBe('b Item 3');
    expect(element.querySelector('ul.content > li[data-row="1"] > label').textContent).toBe('z Item 1');
  });

  it('should create a list from src', function(done) {
    spyOn(cv.io.Fetch, 'cachedFetch').and.returnValue([
      {
        label: 'Item 1',
        index: 1
      },
      {
        label: 'Item 2',
        index: 2
      },
      {
        label: 'Item 3',
        index: 3
      }
    ]);

    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model sort-by="index" sort-mode="desc" src="model.json">
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll('ul.content > li').length).toBe(3);
      expect(element.querySelector('ul.content > li[data-row="0"] > label').textContent).toBe('Item 3');
      expect(element.querySelector('ul.content > li[data-row="1"] > label').textContent).toBe('Item 2');
      expect(element.querySelector('ul.content > li[data-row="2"] > label').textContent).toBe('Item 1');
      done();
    });
  });

  it('should create a list from content', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
        <cv-data label="Item1"></cv-data>
        <cv-data label="Item2"></cv-data>
        <cv-data label="Item3"></cv-data>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll('ul.content > li').length).toBe(3);
      expect(element.querySelector('ul.content > li[data-row="0"] > label').textContent).toBe('Item1');
      expect(element.querySelector('ul.content > li[data-row="1"] > label').textContent).toBe('Item2');
      expect(element.querySelector('ul.content > li[data-row="2"] > label').textContent).toBe('Item3');
      done();
    });
  });

  it('should create a list from a class', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model class="ListModel" parameters="p1=valid,p2=something"></model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll('ul.content > li').length).toBe(3);
      expect(element.querySelector('ul.content > li[data-row="0"] > label').textContent).toBe('Item1');
      expect(element.querySelector('ul.content > li[data-row="1"] > label').textContent).toBe('Item2');
      expect(element.querySelector('ul.content > li[data-row="2"] > label').textContent).toBe('Item3');

      // check parameters
      expect(element._instance._modelInstance.getP1()).toBe('valid');
      expect(element._instance._modelInstance.getP2()).toBe('something');
      done();
    });
  });

  it('should refresh on state update', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
      <cv-data label="Item1"></cv-data>
      <cv-data label="Item2"></cv-data>
      <cv-data label="Item3"></cv-data>
      <cv-address mode="read" target="refresh">test</cv-address>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    spyOn(element._instance, 'refresh');
    expect(element._instance.refresh).not.toHaveBeenCalled();
    cv.data.Model.getInstance().onUpdate('test', '1');
    expect(element._instance.refresh).toHaveBeenCalled();
  });

  it('should show the empty template', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
    </model>
    <template>
      <li>
        <label class="primary">\${label}</label>
      </li>
    </template>
    <template when="empty"><li>empty model</li></template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelector('ul.content > li').textContent).toBe('empty model');
      done();
    })
  });

  it('should remove template content by when condition', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
        <cv-data label="Item1" select="1"></cv-data>
        <cv-data label="Item2" select="2"></cv-data>
        <cv-data label="Item3" select="3"></cv-data>
    </model>
    <template>
      <li>
        <label class="primary" when="\${select}=1">\${label}</label>
        <label class="secondary" when="\${select}=2">\${label}</label>
        <label class="thirdy" when="\${select}=3">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll('ul.content > li[data-row="0"] > label').length).toBe(1);
      expect(element.querySelectorAll('ul.content > li[data-row="1"] > label').length).toBe(1);
      expect(element.querySelectorAll('ul.content > li[data-row="2"] > label').length).toBe(1);
      expect(element.querySelector('ul.content > li[data-row="0"] > label').classList.contains('primary')).toBe(true);
      expect(element.querySelector('ul.content > li[data-row="1"] > label').classList.contains('secondary')).toBe(true);
      expect(element.querySelector('ul.content > li[data-row="2"] > label').classList.contains('thirdy')).toBe(true);
      done();
    });
  });

  it('should create a list with more complex template parameters', function(done) {
    const date = new Date(2025, 0, 1, 12, 0, 0);
    spyOn(cv.io.Fetch, 'cachedFetch').and.returnValue([
      {
        label: 'Item 1',
        index: 1,
        date: date,
        data: {
          something: 'here'
        },
        array: [ 'One', 'Two', 'Three', 'Four']
      },
      {
        label: 'Item 2',
        title: 'Title 2',
        index: 2,
        date: new Date()
      },
      {
        label: 'Item 3',
        index: 3,
        date: new Date()
      }
    ]);

    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model src="model.json">
    </model>
    <template>
      <li>
        <label class="primary">\${title || label}</label>
        <div class="date">\${date|dd.MM.yyyy HH:mm}</div>
        <div class="json">\${data.something}</div>
        <div class="array">\${array[2]}</div>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll('ul.content > li').length).toBe(3);
      expect(element.querySelector('ul.content > li[data-row="0"] > label').textContent).toBe('Item 1');
      expect(element.querySelector('ul.content > li[data-row="1"] > label').textContent).toBe('Title 2');
      expect(element.querySelector('ul.content > li[data-row="2"] > label').textContent).toBe('Item 3');

      expect(element.querySelector('ul.content > li[data-row="0"] > div.date').textContent).toBe('01.01.2025 12:00');
      expect(element.querySelector('ul.content > li[data-row="0"] > div.json').textContent).toBe('here');
      expect(element.querySelector('ul.content > li[data-row="0"] > div.array').textContent).toBe('Three');
      done();
    });
  });

  it('should add the model directly to the element', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
        <cv-data label="Item1"></cv-data>
        <cv-data label="Item2"></cv-data>
        <cv-data label="Item3"></cv-data>
    </model>
    <template wrap="false">
      <label class="primary">\${label}</label>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.querySelectorAll(':scope > label[data-row="0"]').length).toBe(1);
      done();
    });
  });

  it('should add the model directly to the parent', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
        <cv-data label="Item1"></cv-data>
        <cv-data label="Item2"></cv-data>
        <cv-data label="Item3"></cv-data>
    </model>
    <template target="parent">
      <label class="primary">\${label}</label>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      expect(element.style.display).toBe('none');
      expect(element.parentElement.querySelectorAll(':scope > label[data-row="0"]').length).toBe(1);
      done();
    });
  });

  it('should handle clicks on elements', function(done) {
    const element = this.createTileWidgetWithComponent('cv-list', {},
      `<model class="ListModel"></model>
    <template>
      <li>
        <label class="primary" data-action="delete">\${label}</label>
      </li>
    </template>`);
    element._instance.setVisible(true);
    element._instance.refresh().then(() => {
      const modelInstance = element._instance._modelInstance;
      spyOn(modelInstance, 'handleEvent');
      element.querySelector('ul.content > li[data-row="0"] > label').click();

      expect(modelInstance.handleEvent).toHaveBeenCalledWith(jasmine.any(PointerEvent), { action: 'delete' }, {label: 'Item1'});
      done();
    });
  });

  it('should forward events to write addresses', function() {
    const element = this.createTileWidgetWithComponent('cv-list', {refresh: 10},
      `<model>
        <cv-data name="Item1"></cv-data>
        <cv-data name="Item2"></cv-data>
        <cv-data name="Item3"></cv-data>
    </model>
    <cv-address mode="write">test</cv-address>
    <template>
       <cv-listitem>
          <cv-button class="round-button" size="small">
              <cv-address mode="readwrite" transform="OH:switch">${name}</cv-address>
              <cv-icon class="value"/>
          </cv-button>
      </cv-listitem>
    </template>`);
    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent');

    element.dispatchEvent(new CustomEvent('sendState', {
      bubbles: true,
      cancelable: true,
      detail: {
        state: 1
      }
    }));

    expect(address.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
  });
});
