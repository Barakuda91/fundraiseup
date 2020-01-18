const colors = require('colors');

module.exports = class Logger {
    constructor(struct) {
        this.name = struct.name;
    }

    info(text) {
        this.write(' INFO    '.bgGreen.black + `[${(new Date()).toLocaleString().bold}][${this.name}]`.green, text);
    }

    warn(text) {
        this.write(' WARNING '.bgYellow.black + `[${(new Date()).toLocaleString().bold}][${this.name}]`.yellow, text);
    }

    log(text) {
        this.write(' DEBUG   '.bgCyan.black + `[${(new Date()).toLocaleString().bold}][${this.name}]`.cyan, text);
    }

    error(text) {
        this.write(' ERROR   '.bgRed.black + `[${(new Date()).toLocaleString().bold}][${this.name}]`.red, text);
    }

    write(subtext, text) {
        console.log(`${subtext} ${text}`);
    }
};
