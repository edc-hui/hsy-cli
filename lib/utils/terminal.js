const {spawn, exec} = require('child_process');


const spawnYarnCommand = (projectName) => {
    const yarn = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    return new Promise((resole, reject) => {
        const childProcess = spawn(yarn, ['install'], {cwd: `./${projectName}`});
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        childProcess.on('close', () => {
            resole();
        })
    })
}

const execCommand = (...args) => {
    return new Promise((resolve, reject) => {
        exec(...args, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(stdout.replace('\n', ''));
            // console.log(stderr);
            resolve();
        })
    })
}

module.exports = {
    spawnYarnCommand: spawnYarnCommand,
    exec: execCommand
};