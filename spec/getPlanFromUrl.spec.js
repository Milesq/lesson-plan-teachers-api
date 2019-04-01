const { getPlan } = require('../app/getPlanFromUrl.js');
const isEqual = require('lodash.isequal');

describe('getPlan function', () => {
    it('exist', () => {
        expect(typeof getPlan).toBe(typeof(() => {}));
        expect(getPlan.length).toBe(1);
    });

    it('work', async () => {
        let correct = [ [ { day: 1 },
            { subject: 'r_fizyka', teacher: 'NA', room: 'S_12', day: 2 },
            { day: 3 },
            { day: 4 },
            { day: 5 } ],
        [ { day: 1 },
            { subject: 'r_fizyka', teacher: 'NA', room: 'S_12', day: 2 },
            { subject: 'mat', teacher: 'Za', room: 'S_10', day: 3 },
            { day: 4 },
            { subject: 'mat', teacher: 'Za', room: 'S_10', day: 5 } ],
        [ { day: 1 },
            { subject: 'r_fizyka', teacher: 'NA', room: 'S_12', day: 2 },
            { subject: 'mat', teacher: 'Za', room: 'S_10', day: 3 },
            { subject: 'religia-rel', teacher: 'DP', room: 'S_2', day: 4 },
            { subject: 'r_matematyka', teacher: 'Za', room: 'S_10', day: 5 } ],
        [ { day: 1 },
            { subject: 'j.rosyjski-1/2', teacher: 'PW', room: 'S_32', day: 2 },
            { subject: 'r_fizyka', teacher: 'Ka', room: 'S_18', day: 3 },
            { subject: 'religia-rel', teacher: 'DP', room: 'S_1', day: 4 },
            { subject: 'r_fizyka', teacher: 'Ka', room: 'S_18', day: 5 } ],
        [ { subject: 'j.polsk', teacher: 'TJ', room: 'S_18', day: 1 },
            { subject: 'j.rosyjski-1/2', teacher: 'PW', room: 'S_32', day: 2 },
            { subject: 'r_fizyka', teacher: 'Ka', room: 'S_18', day: 3 },
            { subject: 'r_matematyka', teacher: 'Za', room: 'S_10', day: 4 },
            { subject: 'r_matematyka', teacher: 'Za', room: 'S_10', day: 5 } ],
        [ { subject: 'j.polsk', teacher: 'TJ', room: 'S_6', day: 1 },
            { day: 2 },
            { subject: 'j.angielski-1/2',
                teacher: 'JZ',
                room: 'S_11a',
                day: 3 },
            { subject: 'r_fizyka', teacher: 'Ka', room: 'S_18', day: 4 },
            { subject: 'j.polsk', teacher: 'TJ', room: 'S_13', day: 5 } ],
        [ { subject: 'u_hist.i sp.', teacher: 'WM', room: 'S_25', day: 1 },
            { day: 2 },
            { subject: 'r_matematyka', teacher: 'Za', room: 'S_10', day: 3 },
            { subject: 'j.angielski-1/2',
                teacher: 'JZ',
                room: 'S_11a',
                day: 4 },
            { subject: 'j.angielski-2/2',
                teacher: 'JZ',
                room: 'S_11a',
                day: 5 } ],
        [ { subject: 'j.polsk', teacher: 'TJ', room: 'S_24', day: 1 },
            { day: 2 },
            { day: 3 },
            { subject: 'u_hist.i sp.', teacher: 'WM', room: 'S_25', day: 4 },
            { day: 5 } ],
        [ { day: 1 },
            { day: 2 },
            { day: 3 },
            { subject: 'godz.wy', teacher: 'EV', room: 'S_P1', day: 4 },
            { day: 5 } ],
        [ { day: 1 },
            { day: 2 },
            { day: 3 },
            { subject: 'j.angielski-1/2',
                teacher: 'JZ',
                room: 'S_11a',
                day: 4 },
            { day: 5 } ]];
        const plan = await getPlan('http://zsm1.bydgoszcz.pl/1plan/plany/o8.html');
        let content = plan;
        expect(isEqual(content, correct)).toBeTruthy();

        content = plan;
        content = content.map(hour => {
            return hour.filter(lesson => lesson.teacher === '___');
        });
        expect(isEqual(content, new Array(10).fill([]))).toBeTruthy();

        correct = [[],[],[],[],[{"subject": "j.polsk","teacher": "TJ","room": "S_18",  "day": 1  }  ],[  {  "subject": "j.polsk",  "teacher": "TJ",  "room": "S_6", "day": 1 }, { "subject": "j.polsk", "teacher": "TJ", "room": "S_13", "day": 5 } ], [], [ { "subject": "j.polsk", "teacher": "TJ", "room": "S_24", "day": 1 } ], [], []];

        content = plan;
        content = content.map(hour => {
            return hour.filter(lesson => lesson.teacher === 'TJ');
        });
        expect(isEqual(content, correct)).toBeTruthy();
    });
});