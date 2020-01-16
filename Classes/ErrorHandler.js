const Logger = require('./Logger');

module.exports = class ErrorHandler {
    constructor(struct) {
        this.name = struct.name;
        this.logger = new Logger({name: 'ErrorHandler'});
        ['sendError', 'throwError'].forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }

    sendError(err) {
        this.logger.error(err.stack ? err.stack : err.message);
    }

    throwError(ex) {
        this.logger.error(ex);
        throw new Error(ex);
    }
};
