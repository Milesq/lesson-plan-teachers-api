const express = require('express');
const { resolve } = require('path');
const app = express();
const cors = require('cors');
const {
    writeFileSync,
    readFileSync,
    existsSync
} = require('fs');

app.use(cors());

// app.use(express.static(resolve('./dist/')));

app.get('/', (...[, res]) => {
    res.send('Hello World');
});

app.get('/reset/cache', require('./deleteCache.js').default);

app.get('/:code', ({ params }, res, next) => {
    next(/^\w{2}$/.test(params.code)? undefined : 'route');
}, async (req, res) => {
    if(existsSync('cache')) {
        let cache = readFileSync('cache', 'utf-8');
        cache =  cache.split('\n');
        cache.pop();
        let inCache = false;

        cache.forEach(line => {
            if (line.split(': ')[1] == req.params.code) {
                inCache = true;
            }
        });

        if (inCache) {
            res.send(readFileSync(req.params.code, 'utf-8'));
            return;
        }
    }

    const response = await require('./main.js').default(req.params.code);

    writeFileSync('cache', `${(new Date).getTime()}: ${req.params.code}\n`, {flag: 'a'});
    writeFileSync(req.params.code, response);
    res.send(response);
});

const second = 1000,
    minute = 60 * second,
    hour = 60 * minute,
    day = 24 * hour;

setInterval(require('./deleteCache.js').default, day * 1.5);
setTimeout(require('./deleteCache.js').default, 2 * hour);

app.listen(80, () => console.log('Server is online on port 80'));