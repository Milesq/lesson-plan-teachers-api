const axios = require('axios');
const { JSDOM } = require('jsdom');

function parse(str) {
    return (new JSDOM(str)).window.document;
}

function clear(document) {
    document.querySelector('tr').outerHTML = '';
    document.querySelectorAll('tr').forEach(el => {
        el.querySelector('td').outerHTML = '';
        el.querySelector('td').outerHTML = '';
        el.querySelectorAll('td')[el.querySelectorAll('td').length - 1].outerHTML = '';
    });

    return document;
}

module.exports = async code => {
    const hours =  [];
    const { data } = await axios.get('http://zsm1.bydgoszcz.pl/1plan/plany/o8.html');
    let document = parse(data).querySelectorAll('table')[2];
    document = clear(document);
    document.querySelectorAll('tr').forEach(el => {
        el.querySelectorAll('td').forEach(el => {
            const data = {};
            data['subject'] = el.querySelectorAll('span.p');
            data['teacher'] = el.querySelectorAll('span.n');
            data['room'] = el.querySelectorAll('span.s');
            hours.push(data);
        });
    });

    return document.outerHTML;
};