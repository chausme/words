import { createCustomElement } from '../main';

describe('createCustomElement', () => {
    test('should create a new element with the specified tag name', () => {
        const el = createCustomElement('div');
        expect(el.tagName).toBe('DIV');
    });

    test('should set the textContent of the new element if provided', () => {
        const textContent = 'Hello, world!';
        const el = createCustomElement('div', textContent);
        expect(el.textContent).toBe(textContent);
    });

    test('should add the specified classes to the new element if provided', () => {
        const classes = ['class1', 'class2', 'class3'];
        const el = createCustomElement('div', null, classes);
        expect(el.classList.contains(classes[0])).toBe(true);
        expect(el.classList.contains(classes[1])).toBe(true);
        expect(el.classList.contains(classes[2])).toBe(true);
    });

    test('should return the new element', () => {
        const el = createCustomElement('div');
        expect(el instanceof Element).toBe(true);
    });
});
