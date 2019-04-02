const { getPlan } = require('./getPlanFromUrl');

function merge(first, second) {
    return first.map((el, i) => el.concat(second[i]));
}

exports.default = async code => {
    let data = '';

    for (let i=5;i<=7;++i) {
        let plan = await getPlan(`http://zsm1.bydgoszcz.pl/1plan/plany/o${i}.html`);
        plan = plan.map(hour => {
            return hour.filter(lesson => lesson.teacher === code);
        });

        data += JSON.stringify(plan, null, 2) + '\n\n\n\n\n';
    }

    return data;
};

exports.merge = merge;