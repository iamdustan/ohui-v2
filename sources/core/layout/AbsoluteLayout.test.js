import { expect }  from 'chai';

import { Element } from '../dom/Element';
import { Screen }  from '../elements/Screen';

describe(`AbsoluteLayout`, () => {

    it(`should correctly position an element inside another`, () => {

        let screen = new Screen();
        screen.style.width = 800;
        screen.style.height = 600;

        let element = new Element();
        element.style.position = `absolute`;
        element.style.width = 100;
        element.style.height = 100;
        element.style.left = 100;
        element.style.top = 100;
        screen.appendChild(element);

        screen.triggerUpdates();

        expect(screen.elementRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 600 });
        expect(element.elementRect).to.deep.equal({ x: 100, y: 100, width: 100, height: 100 });

    });

    it(`should change width: auto behaviour to be as small as possible`, () => {

        let screen = new Screen();
        screen.style.width = 800;
        screen.style.height = 600;

        let elementA = new Element();
        elementA.style.position = `absolute`;
        elementA.style.left = 50;
        elementA.style.top = 50;
        screen.appendChild(elementA);

        let elementB = new Element();
        elementB.style.width = 200;
        elementB.style.height = 100;
        elementA.appendChild(elementB);

        screen.triggerUpdates();

        expect(screen.elementRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 600 });
        expect(elementA.elementRect).to.deep.equal({ x: 50, y: 50, width: 200, height: 100 });
        expect(elementB.elementRect).to.deep.equal({ x: 0, y: 0, width: 200, height: 100 });

    });

    it(`should correctly set an element width when using both left & right positions`, () => {

        let screen = new Screen();
        screen.style.width = 800;
        screen.style.height = 600;

        let element = new Element();
        element.style.position = `absolute`;
        element.style.left = 100;
        element.style.right = 100;
        element.style.height = 100;
        screen.appendChild(element);

        screen.triggerUpdates();

        expect(screen.elementRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 600 });
        expect(element.elementRect).to.deep.equal({ x: 100, y: 0, width: 600, height: 100 });

    });

    it(`should ignore parent borders and padding when computing an element's rects`, () => {

        let screen = new Screen();
        screen.style.width = 800;
        screen.style.height = 600;

        let element = new Element();
        element.style.position = `relative`;
        element.style.borderCharacter = `simple`;
        element.style.padding = 10;
        screen.appendChild(element);

        let inner = new Element();
        inner.style.position = `absolute`;
        inner.style.left = 0;
        inner.style.right = 0;
        inner.style.top = 0;
        inner.style.bottom = 0;
        element.appendChild(inner);

        screen.triggerUpdates();

        expect(element.elementRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 22 });
        expect(element.contentRect).to.deep.equal({ x: 11, y: 11, width: 778, height: 0 });

        expect(inner.elementRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 22 });
        expect(inner.contentRect).to.deep.equal({ x: 0, y: 0, width: 800, height: 22 });

    });

});