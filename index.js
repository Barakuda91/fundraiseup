Object.assign(global, {ROOT_DIR: __dirname});

const Koa = require('koa');
const cors = require('@koa/cors');
const body = require('koa-body');
const json = require('koa-json');
const serve = require('koa-static');
const router = require('./router');
const conf = require('nconf');

const app = new Koa();
const namedObj = {name: 'APP'};
conf.argv().env().file({ file: 'config/config.json' });

const logger = new (require('./Classes/Logger'))(namedObj);
const errorHandler = new (require('./Classes/ErrorHandler'))(namedObj);
const connect = new (require('./Classes/Orm.js'))({errorHandler, conf});

(async () => {
  await connect.init().catch(errorHandler.sendError);
  await connect.initModels().catch(errorHandler.sendError);

  app.use(serve('./dist'));
  app.use(cors());
  app.use(json());
  app.use(body());
  app.use(async (ctx, next) => {
    ctx.connect = connect;
    await next();
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.on('error', errorHandler.sendError);

  const server = app.listen(conf.get('server:port'), () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`App listening at http://${host === '::' ? 'localhost' : host}:${port}`);
  });
})();
