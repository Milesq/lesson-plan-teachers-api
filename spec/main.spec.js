const { merge } = require('../app/main.js');

describe('Merge function', () => {
    it('is not defined', () => {
        expect(merge).toBeDefined();
        expect(merge.length).toBe(2);
    });

    it('not works', () => {
        expect(merge([
            [1, 2],
            [5, 6]
        ],
        [
            [],
            []
        ])).toEqual([[1, 2], [5, 6]]);

        expect(merge([
            [
                2,
                4,
                5
            ],
            [
                5,
                3,
                2
            ]
        ],
        [
            [],
            [
                999,
                345
            ]
        ])).toEqual([
            [2, 4, 5],
            [5, 3, 2, 999, 345]
        ]);
    });
});