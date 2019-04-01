const getPlan = require('./getPlanFromUrl');

module.exports = async code => {
    const plan = await getPlan('http://zsm1.bydgoszcz.pl/1plan/plany/o8.html');

    return JSON.stringify(plan, null, 2);
};