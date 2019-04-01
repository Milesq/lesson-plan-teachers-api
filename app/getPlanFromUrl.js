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

module.exports = async url => {
    let hours =  [];
    const { data } = await axios.get(url);
    let document = parse(data).querySelectorAll('table')[2];
    document = clear(document);
    document.querySelectorAll('tr').forEach(el => {
        const hour = [];
        el.querySelectorAll('td').forEach((el, i) => {
            const data = {};
            const teacher = el.querySelector('.n');
            if (teacher) {
                data['subject'] = (el.querySelector('.p') || {innerHTML: ''}).innerHTML;
                data['teacher'] = teacher.innerHTML;
                data['room'] = (el.querySelector('.s') || {innerHTML: ''}).innerHTML;
            }

            data['day'] = i + 1;
            hour.push(data);
        });

        hours.push(hour);
    });

    return hours
};