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

app.use(express.static(resolve('./dist/')));

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

app.get('/', (...[, res]) => {
    res.sendFile(resolve('dist/index.html'));
});

app.listen(8080, () => console.log('Server is online on port 8080'));