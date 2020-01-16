const colors = require('colors');

module.exports = class Logger {
    constructor(struct) {
        this.name = struct.name;
    }

    info(text) {
        this.write('INFO'.green + ` [${(new Date()).toLocaleString()}] [${this.name}]`.green, text);
    }

    warn(text) {
        this.write('WARNING'.yellow + ` [${(new Date()).toLocaleString()}] [${this.name}]`.yellow, text);
    }

    log(text) {
        this.write('DEBUG'.cyan + ` [${(new Date()).toLocaleString()}] [${this.name}]`.cyan, text);
    }

    error(text) {
        this.write('ERROR'.red + ` [${(new Date()).toLocaleString()}] [${this.name}]`.red, text);
    }

    write(subtext, text) {
        console.log(`${subtext} ${text}`);
    }
};
