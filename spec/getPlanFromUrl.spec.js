const { getPlan } = require('../app/getPlanFromUrl.js');
const isEqual = require('lodash.isequal');

describe('getPlan function', () => {
    it('exist', () => {
        expect(typeof getPlan).toBe(typeof(() => {}));
        expect(getPlan.length).toBe(1);
    });
});