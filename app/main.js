const getPlan = require('./getPlanFromUrl');

module.exports = async code => {
    let plan = await getPlan('http://zsm1.bydgoszcz.pl/1plan/plany/o8.html');
    plan = plan.map(hour => {
        return hour.filter(lesson => lesson.teacher === code);
    });

    return JSON.stringify(plan, null, 2);
};