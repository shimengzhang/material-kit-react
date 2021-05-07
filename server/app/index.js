const Koa = require('koa');

const mongoose = require('mongoose');
// 解析请求体参数中间件
// const bodyparser = require('koa-bodyparser');
const koabody = require('koa-body');
const koaStatic = require('koa-static');
// json 格式错误处理中间件
const error = require('koa-json-error');
// 校验参数中间件
const parameter = require('koa-parameter');
const path = require('path');

const routing = require('./routes');
const { connectionStr } = require('./config');

const app = new Koa();

mongoose.connect(
  connectionStr,
  {
    useNewUrlParser: true, // mongoose 5.0 以上需要加入的参数
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log('mongodb 连接成功');
  }
);

mongoose.connection.on('error', console.error);

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
);

// 自定义错误处理中间件
// app.use(async (ctx, next) => {
//   // 捕获不到 404 ，不走这里，在前面就报错了
//   try {
//     await next();
//   } catch (err) {
//     console.log(err.statusCode);
//     ctx.status = err.status || err.statusCode || 500;
//     ctx.body = { message: err.message };
//   }
// });

// app.use(bodyparser());
app.use(
  koabody({
    multipart: true, // 支持文件格式
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true //
    }
  })
);
// 一般是用来校验请求体的
app.use(parameter(app)); // 传入 app ，为了给全局挂载方法，eg. verifyParams
routing(app);

app.listen(3000, () => {
  console.log('服务启动在 3000 端口 ...');
});
