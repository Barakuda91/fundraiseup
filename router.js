const Router = require('koa-router');
const router = new Router();

router.get('/startParams', (ctx) => {
  ctx.res.statusCode = 200;
  ctx.body = {
    currencies: [
      {name: "US Dollar", code: "USD", symbol: "$", rate: 1},
      {name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
      {name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
      {name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}
    ],
    presets: [40, 100, 200, 1000, 2500, 5000],
    currencyId: 0,
    suggestion: 40
  };
});

router.post('/donate', async (ctx) => {
  const body = ctx.request.body;
  let res;
  body.amount && (res = await (new ctx.connect.donations(body)).save());
  res.errors || !body.amount ? (ctx.body = {ok: false}) : (ctx.body = {ok: true});
});

module.exports = router;
