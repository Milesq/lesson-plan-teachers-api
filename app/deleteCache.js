const fs = require('fs');

exports.default = (req, res) => {
    try {
        let cached = fs.readFileSync('cache', 'utf-8');
        cached = cached.split('\n');
        cached.pop();
        cached = cached.forEach(el => {
            fs.unlinkSync(el.split( ': ')[1]);
        });

        fs.unlinkSync('cache');
        res.send('Cache was deleted');
    } catch (err) {
        console.log(err);
        res.send('Cache are empty!');
    }
};