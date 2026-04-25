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
 * Unit tests for <cv-dynamic> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-dynamic> widget of the tile structure', () => {
  let oldController;
  let element;
  let contentElements = [];


  function createElement(refs) {
    let content = ``;
    for (const ref of refs) {
      let attributesHTML = '';
      for (const key in ref) {
        attributesHTML += `${key}="${ref[key]}" `;
      }
      content += `<cv-ref ${attributesHTML}"></cv-ref>`;
    }
    content +='<cv-address transform="raw">content</cv-address>';
    element = this.createHTMLElement('cv-dynamic', {}, content);
    document.body.appendChild(element);

    for (let i = 1; i <=2; i++) {
      const f1 = document.createElement('div');
      f1.id = 'content'+i;
      f1.innerHTML = `<label>Content ${i}</label>`;
      document.body.appendChild(f1);
      contentElements.push(f1);
    }
  }

  beforeEach(function()  {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    this.createElement = createElement.bind(this);
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    if (element) {
      element.remove();
    }
    for (const elem of contentElements) {
      elem.remove();
    }
  });

  it('should support basic selection of refs', function() {
    this.createElement([
      { selector: '#content1', when: 'first' },
      { selector: '#content2', when: 'second' }
    ]);

    const firstRef = element.querySelector('cv-ref[when="first"]');
    const secondRef = element.querySelector('cv-ref[when="second"]');

    // check that all refs are empty
    expect(firstRef.children.length).toEqual(0);
    expect(secondRef.children.length).toEqual(0);

    cv.data.Model.getInstance().onUpdate('content', 'first');
    expect(firstRef.children.length).toEqual(1);
    expect(secondRef.children.length).toEqual(0);
    expect(firstRef.children[0].tagName).toEqual('DIV');
    expect(firstRef.children[0].id).toEqual('content1');

    cv.data.Model.getInstance().onUpdate('content', 'second');
    expect(firstRef.children.length).toEqual(0);
    expect(secondRef.children.length).toEqual(1);
    expect(secondRef.children[0].tagName).toEqual('DIV');
    expect(secondRef.children[0].id).toEqual('content2');
  });

  it('should support basic modification of cloned refs', function() {
    this.createElement([
      { selector: '#content1', when: 'first', 'modify-selector': 'label', 'modify-attribute': 'class:changed' },
      { selector: '#content2', when: 'second', 'modify-attribute': 'class:changed' },
      { selector: '#content2', when: 'third', 'modify-selector': 'wrong selector', 'modify-attribute': 'class:changed' }
    ]);

    // modify descendant of cloned node
    const firstRef = element.querySelector('cv-ref[when="first"]');
    cv.data.Model.getInstance().onUpdate('content', 'first');
    expect(firstRef.children.length).toEqual(1);
    expect(firstRef.children[0].tagName).toEqual('DIV');
    expect(firstRef.children[0].id).toEqual('content1');
    expect(firstRef.children[0].querySelector('label').getAttribute('class')).toEqual('changed');

    // modify cloned node
    const secondRef = element.querySelector('cv-ref[when="second"]');
    cv.data.Model.getInstance().onUpdate('content', 'second');
    expect(secondRef.children[0].getAttribute('class')).toEqual('changed');

    // do not modify if selector is not found
    const thirdRef = element.querySelector('cv-ref[when="third"]');
    cv.data.Model.getInstance().onUpdate('content', 'third');
    expect(thirdRef.children[0].querySelector('label').hasAttribute('class')).toBeFalsy();
  });

  it('should handle an missing selector', function() {
    this.createElement([
      { selector: '', when: 'first' }
    ]);

    // modify descendant of cloned node
    const firstRef = element.querySelector('cv-ref[when="first"]');
    cv.data.Model.getInstance().onUpdate('content', 'first');
    expect(firstRef.children.length).toEqual(0);
  });

});
