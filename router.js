const Router = require('koa-router');
const router = new Router();

router.post('/donate', (ctx) => {
    console.log(ctx.request.body);
    ctx.res.statusCode = 200;
    ctx.body = {ok: true};
});

module.exports = router;
