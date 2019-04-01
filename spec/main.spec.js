const { readFileSync } = require('fs');
const { resolve } = require('path');
const { clear } = require('../app/getPlanFromUrl.js');
const { JSDOM } = require('JSDOM');

describe('Clear function', () => {
    it('exist', () => {
        expect(typeof clear).toBe(typeof(() => {}));
        expect(clear.length).toBe(1);
    });

    it('work', () => {
        const before = readFileSync(resolve('./spec/helpers/htmlBeforeClean.txt')),
            after = readFileSync(resolve('./spec/helpers/htmlAfterClean.txt'));
        let content = (new JSDOM(before)).window.document;
        content = content.querySelectorAll('table')[2];
        expect(clear(content)).toBe(after);
    });
});