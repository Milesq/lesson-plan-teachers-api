const watch = require('node-watch');
const { exec } = require('child_process');
const readline = require('readline');
const rli = readline.createInterface(process.stdin, process.stdout);

const directories = ['app', 'spec'];

const options = {
    recursive: true
};

function callback() {
    exec('yarn test', (err, stdout) => {
        readline.cursorTo(rli, 0, 0);
        readline.clearScreenDown(rli);
        rli.write(stdout);
    });
}

for (let directory of directories) {
    watch(`./${directory}`, options, callback);
}

callback();