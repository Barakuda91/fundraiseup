const mongoose = require("mongoose");
const fs = require('fs-extra');
const autoIncrement = require('mongoose-auto-increment');
const logger = new (require('./Logger'))({name: 'ORM'});
const Schema = mongoose.Schema;

module.exports = class Orm {
    constructor(struct) {
        Object.assign(this, struct);
        this.mongoose = mongoose;
        this.mongoose.set('useCreateIndex', true);
        this.mongoose.set('useFindAndModify', false);
        this.path = `${ROOT_DIR}/${this.conf.get('db:schemas')}`;
    }

    async init() {
        const dbConf = this.conf.get('db');
        await this.mongoose
            .connect(`mongodb://${dbConf.host}:${dbConf.port}/${dbConf.database}`,
                dbConf.options).catch(this.errorHandler.sendError);
        autoIncrement.initialize(this.mongoose.connection);
    }

    async initModels() {
        await fs.exists(this.path)
            .catch(this.errorHandler.sendError) || await fs.mkdir(this.path)
            .catch(this.errorHandler.sendError);
        const schemas = await fs.readdir(this.path).catch(this.errorHandler.sendError);

        schemas.length
            ? await this.initModelsLoop(schemas).catch(this.errorHandler.sendError)
            : logger.warn(`You do not have a schemas. Create one in ${this.path}`);
    }

    async initModelsLoop(schemas) {
        for (const schemaName of schemas) {
            const schemaJson = Orm.getJson(await fs.readFile(`${this.path}/${schemaName}`));
            const scheme = new Schema(schemaJson);
            const name = Orm.getName(schemaName, 's');
            scheme.plugin(autoIncrement.plugin, name);
            this[name] = mongoose.model(name, scheme);
        }
    }

    static getJson(schemaBuffer) {
        return JSON.parse((schemaBuffer).toString());
    }

    static getName(schemaName, ending) {
        const separatedName = schemaName.split('.');
        return ending ? `${separatedName[0]}${ending}` : separatedName[0];
    }
};
