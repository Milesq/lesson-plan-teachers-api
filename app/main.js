const { getPlan } = require('./getPlanFromUrl');

function merge(first, second) {
    return first.map((el, i) => el.concat(second[i]));
}

exports.default = async code => {
    let data = [];

    for (let i=5;i<=7;++i) {
        let plan = await getPlan(`http://zsm1.bydgoszcz.pl/1plan/plany/o${i}.html`);
        plan = plan.map(hour => {
            return hour.filter(lesson => lesson.teacher === code);
        });

        while (plan.length < data.length) plan.push([]);
        while (plan.length > data.length) data.push([]);

        data = merge(data, plan);
    }

    return JSON.stringify(data, null, 2);
};

exports.merge = merge;