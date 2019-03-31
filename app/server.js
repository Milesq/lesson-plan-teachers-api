const express = require('express');
const { resolve } = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static(resolve('./dist/')));

app.get('/:code', ({ params }, res, next) => {
    next(/^\w{2}$/.test(params.code)? undefined : 'route');
}, require('./main.js'));

app.get('/', (...[, res]) => {
    res.sendFile(resolve('dist/index.html'));
});

app.listen(8080, () => console.log('Server is online'));